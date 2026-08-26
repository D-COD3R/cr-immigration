import { cookies } from "next/headers";
import { LANGUAGES, LANG_COOKIE, defaultLang, type Lang } from "@/content/site";

export function isLang(value: string | undefined | null): value is Lang {
  return !!value && (LANGUAGES as readonly string[]).includes(value);
}

/**
 * Server-side language resolution: cookie first, then default.
 * The language toggle sets the cookie and refreshes, keeping every page
 * server-rendered in the visitor's language (crawlable for SEO).
 */
export async function getLang(): Promise<Lang> {
  const store = await cookies();
  const value = store.get(LANG_COOKIE)?.value;
  return isLang(value) ? value : defaultLang;
}

export function pick<T extends Record<Lang, string>>(entry: T, lang: Lang): string {
  return entry[lang];
}
