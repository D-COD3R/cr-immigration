import type { IntakeSubmission } from "./schema";

export interface IntakeStoreResult {
  ok: true;
  referenceId: string;
}

export interface IntakeStore {
  save(submission: IntakeSubmission): Promise<IntakeStoreResult>;
}

function referenceId(): string {
  const bytes = new Uint8Array(4);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("").toUpperCase();
}

/**
 * V1 development store: logs the validated submission server-side.
 *
 * ⚠️ INTEGRATION BOUNDARY — replace before production.
 *
 * Nothing persists between restarts and no one receives these leads yet.
 * The next integration should implement `IntakeStore` against Supabase,
 * a database, or an email/notification provider, selected via env var:
 *
 *   INTAKE_STORE=supabase|console   (default: console)
 */
class ConsoleIntakeStore implements IntakeStore {
  async save(submission: IntakeSubmission): Promise<IntakeStoreResult> {
    const id = referenceId();
    console.info(
      `[intake] New submission ${id} (dev store — wire a real IntakeStore implementation):\n` +
        JSON.stringify({ ...submission, name: "***", email: "***", phone: "***" }, null, 2)
    );
    return { ok: true, referenceId: id };
  }
}

class SupabaseIntakeStore implements IntakeStore {
  async save(submission: IntakeSubmission): Promise<IntakeStoreResult> {
    const url = process.env.SUPABASE_URL;
    const secretKey = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !secretKey) {
      throw new Error("Supabase intake store is missing SUPABASE_URL or SUPABASE_SECRET_KEY.");
    }

    let endpoint: URL;
    try {
      endpoint = new URL("/rest/v1/intake_submissions", url);
    } catch {
      throw new Error("SUPABASE_URL is not a valid URL.");
    }

    if (endpoint.protocol !== "https:" && endpoint.hostname !== "127.0.0.1" && endpoint.hostname !== "localhost") {
      throw new Error("SUPABASE_URL must use HTTPS outside local development.");
    }

    const id = referenceId();
    const intake = { ...submission };
    delete intake.companyWebsite;
    const headers: Record<string, string> = {
      apikey: secretKey,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    };
    // Legacy service-role keys are JWTs. New sb_secret_* keys must only be
    // sent as `apikey`; using one as a bearer token produces an Invalid JWT.
    if (!secretKey.startsWith("sb_secret_")) {
      headers.Authorization = `Bearer ${secretKey}`;
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({
        reference_id: id,
        language: intake.language,
        goal: intake.goal,
        name: intake.name,
        email: intake.email,
        phone: intake.phone || null,
        contact_preference: intake.contactPreference,
        preferred_language: intake.preferredLanguage,
        consent_to_contact: intake.consentToContact,
        intake_data: intake,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      const requestId = response.headers.get("x-request-id");
      throw new Error(
        `Supabase intake insert failed (${response.status})${requestId ? ` [request ${requestId}]` : ""}.`
      );
    }

    return { ok: true, referenceId: id };
  }
}

export function getIntakeStore(): IntakeStore {
  switch (process.env.INTAKE_STORE) {
    case "supabase":
      return new SupabaseIntakeStore();
    default:
      return new ConsoleIntakeStore();
  }
}
