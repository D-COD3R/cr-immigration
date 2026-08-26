"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { track } from "@/lib/analytics";
import { LANG_COOKIE } from "@/content/site";
import { t } from "@/content/translations";
import type { Lang } from "@/content/site";

function setLangCookie(value: Lang) {
  document.cookie = `${LANG_COOKIE}=${value};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;
}

export function LanguageToggle({ lang }: { lang: Lang }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function switchTo(nextLang: Lang) {
    setLangCookie(nextLang);
    track("language_changed", { from: lang, to: nextLang });
    startTransition(() => router.refresh());
  }

  return (
    <div
      role="group"
      aria-label={t.nav.languageLabel[lang]}
      className="flex items-center rounded-full border border-line bg-paper text-sm font-medium"
    >
      {(["en", "es"] as Lang[]).map((l) => (
        <button
          key={l}
          type="button"
          disabled={pending}
          onClick={() => switchTo(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-2.5 py-1 uppercase tracking-wide transition-colors ${
            lang === l ? "bg-forest text-ivory" : "text-ink-faint hover:text-ink"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
