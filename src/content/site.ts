export const LANGUAGES = ["en", "es"] as const;
export type Lang = (typeof LANGUAGES)[number];

export const defaultLang: Lang = "en";

/** Cookie used to persist the visitor's language. Client-safe constant. */
export const LANG_COOKIE = "cr_lang";

/**
 * Central working configuration for the service.
 *
 * The company name, contact details and legal entity are placeholders.
 * Replace them here — every consumer reads from this file.
 */
export const site = {
  /**
   * Working label only. Do not build visual identity around this string.
   */
  name: "Costa Rica Immigration",
  shortName: "CR Immigration",

  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://cr-immigration.vercel.app",

  /**
   * Placeholder contact channels. Wire real ones before launch.
   */
  contact: {
    email: null as string | null,
    whatsapp: null as string | null, // e.g. "50688887777" — digits only, international format
    phone: null as string | null,
  },

  /**
   * Legal entity details — required before production.
   */
  legalEntity: {
    name: "[Legal entity name — pending]",
    registration: "[Company registration — pending]",
    address: "[Registered address — pending]",
  },

  /**
   * Disclosure shown in footer and legal pages.
   */
  affiliationDisclosure: {
    en: "Independent immigration service. Not affiliated with the Dirección General de Migración y Extranjería or the Government of Costa Rica.",
    es: "Servicio migratorio independiente. Sin afiliación con la Dirección General de Migración y Extranjería ni con el Gobierno de Costa Rica.",
  },
} as const;
