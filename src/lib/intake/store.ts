import type { IntakeSubmission } from "./schema";
import { neon } from "@neondatabase/serverless";

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

class NeonIntakeStore implements IntakeStore {
  async save(submission: IntakeSubmission): Promise<IntakeStoreResult> {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) throw new Error("Neon intake store is missing DATABASE_URL.");

    const id = referenceId();
    const intake = { ...submission };
    delete intake.companyWebsite;
    const sql = neon(databaseUrl);
    await sql`
      insert into intake_submissions (
        reference_id,
        language,
        goal,
        name,
        email,
        phone,
        contact_preference,
        preferred_language,
        consent_to_contact,
        intake_data
      ) values (
        ${id},
        ${intake.language},
        ${intake.goal},
        ${intake.name},
        ${intake.email},
        ${intake.phone || null},
        ${intake.contactPreference},
        ${intake.preferredLanguage},
        ${intake.consentToContact},
        ${JSON.stringify(intake)}::jsonb
      )
    `;

    return { ok: true, referenceId: id };
  }
}

export function getIntakeStore(): IntakeStore {
  switch (process.env.INTAKE_STORE) {
    case "neon":
      return new NeonIntakeStore();
    case "console":
      return new ConsoleIntakeStore();
    default:
      return process.env.DATABASE_URL ? new NeonIntakeStore() : new ConsoleIntakeStore();
  }
}
