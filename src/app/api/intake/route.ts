import { NextResponse, type NextRequest } from "next/server";
import { intakeSchema } from "@/lib/intake/schema";
import { getIntakeStore } from "@/lib/intake/store";
import { checkRateLimit } from "@/lib/intake/rate-limit";

export const runtime = "nodejs";

function clientKey(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return (forwarded?.split(",")[0] ?? request.headers.get("x-real-ip") ?? "unknown").trim();
}

export async function POST(request: NextRequest) {
  const rate = checkRateLimit(`intake:${clientKey(request)}`);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "rate_limited", message: "Too many submissions from this connection. Please try again later." },
      { status: 429, headers: { "Retry-After": String(rate.retryAfterSeconds ?? 3600) } }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json", message: "Malformed submission." }, { status: 400 });
  }

  const parsed = intakeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "validation_failed",
        issues: parsed.error.issues.map((i) => ({ path: i.path.join("."), message: i.message })),
      },
      { status: 400 }
    );
  }

  // Bot mitigation: real users never see or populate this honeypot field.
  if (parsed.data.companyWebsite) {
    return NextResponse.json({ ok: true }); // silently discard bot submissions
  }

  try {
    const store = getIntakeStore();
    const result = await store.save(parsed.data);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("[intake] store failure:", error);
    return NextResponse.json(
      { error: "storage_failed", message: "We couldn’t save your assessment right now. Please try again." },
      { status: 500 }
    );
  }
}
