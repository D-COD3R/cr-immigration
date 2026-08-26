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
  async save(_submission: IntakeSubmission): Promise<IntakeStoreResult> {
    // TODO: server-side insert into `intake_submissions` with RLS enabled.
    // Requires SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (server-only).
    throw new Error("Supabase intake store not configured. Set INTAKE_STORE=console or implement it.");
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
