import { z } from "zod";

/**
 * Shared intake schema — used for client-side validation and re-validated
 * on the server before anything is stored.
 *
 * Deliberately minimal: enough to understand the likely path and follow up.
 * No passport numbers, document numbers, or sensitive financial details.
 */

export const GOALS = [
  "pensionado",
  "rentista",
  "inversionista",
  "vinculo",
  "nomada-digital",
  "renewal",
  "other",
  "unsure",
] as const;

export const QUALIFICATION_KEYS = [
  "has_pension",
  "has_stable_income",
  "investment_status",
  "family_relationship",
  "works_remotely",
] as const;

export const TIMELINES = ["immediately", "1-3-months", "3-6-months", "6-plus-months", "researching"] as const;

export const CONTACT_PREFERENCES = ["email", "phone", "whatsapp"] as const;
export const PREFERRED_LANGUAGES = ["english", "spanish", "either"] as const;

const shortText = z.string().trim().max(200, "Please keep this under 200 characters");
const longText = z.string().trim().max(2000, "Please keep this under 2000 characters");

export const intakeSchema = z.object({
  language: z.enum(["en", "es"]),

  goal: z.enum(GOALS),

  currentlyInCostaRica: z.enum(["yes", "no"]).nullable(),
  countryOfResidence: shortText.optional(),
  nationality: shortText.optional(),
  currentStatus: shortText.optional(),

  qualificationAnswers: z.record(z.string(), z.union([z.string().max(100), z.boolean()])).default({}),

  household: z
    .object({
      spouseOrPartner: z.boolean(),
      dependents: z.number().int().min(0).max(12),
    })
    .default({ spouseOrPartner: false, dependents: 0 }),

  timeline: z.enum(TIMELINES).optional(),

  name: shortText.pipe(z.string().min(2, "Please enter your full name")),
  email: z.email("Please enter a valid email address"),
  phone: shortText.regex(/^[+()\-\s\d]*$/, "Phone can only contain digits and + ( ) -").optional().or(z.literal("")),

  contactPreference: z.enum(CONTACT_PREFERENCES),
  preferredLanguage: z.enum(PREFERRED_LANGUAGES),

  additionalInformation: longText.optional().or(z.literal("")),

  consentToContact: z.literal(true, { message: "We need your permission to contact you" }),

  /** Honeypot — must stay empty. Real users never see this field. */
  companyWebsite: z.literal("").optional(),

  source: z
    .object({
      utmSource: z.string().max(100).optional(),
      utmMedium: z.string().max(100).optional(),
      utmCampaign: z.string().max(100).optional(),
    })
    .optional(),
});

export type IntakeSubmission = z.infer<typeof intakeSchema>;

/** Shape used by the multi-step UI before final validation. */
export interface IntakeDraft {
  goal?: (typeof GOALS)[number];
  currentlyInCostaRica?: "yes" | "no";
  countryOfResidence?: string;
  nationality?: string;
  currentStatus?: string;
  qualificationAnswers: Record<string, string | boolean>;
  household: { spouseOrPartner: boolean; dependents: number };
  timeline?: (typeof TIMELINES)[number];
  name?: string;
  email?: string;
  phone?: string;
  contactPreference?: (typeof CONTACT_PREFERENCES)[number];
  preferredLanguage?: (typeof PREFERRED_LANGUAGES)[number];
  additionalInformation?: string;
  consentToContact?: boolean;
}
