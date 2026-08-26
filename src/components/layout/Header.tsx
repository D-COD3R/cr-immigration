import Link from "next/link";
import { t } from "@/content/translations";
import { site, type Lang } from "@/content/site";
import { LanguageToggle } from "./LanguageToggle";

function Wordmark() {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label={site.name}>
      <span
        aria-hidden="true"
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-forest text-ivory"
      >
        {/* Stylized leaf/mountain mark */}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M1 12.5L5.5 5l3.2 4.6L11 6l4 6.5"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-[15px] font-semibold tracking-tight text-ink">
        Costa Rica<span className="font-serif italic text-forest"> Immigration</span>
      </span>
    </Link>
  );
}

export function Header({ lang }: { lang: Lang }) {
  const links = [
    { href: "/#services", label: t.nav.services[lang] },
    { href: "/#how-it-works", label: t.nav.howItWorks[lang] },
    { href: "/#faq", label: t.nav.faq[lang] },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line-soft/80 bg-ivory/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 lg:px-8">
        <Wordmark />

        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[15px] font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
          <LanguageToggle lang={lang} />
          <Link
            href="/start"
            className="rounded-full bg-forest px-5 py-2.5 text-[15px] font-medium text-ivory shadow-card transition-all hover:bg-forest-deep hover:shadow-lifted"
          >
            {t.nav.cta[lang]}
          </Link>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <LanguageToggle lang={lang} />
        </div>
      </div>
    </header>
  );
}

export function MobileCtaBar({ label }: { label: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line-soft bg-paper/95 p-3 backdrop-blur md:hidden">
      <Link
        href="/start"
        className="block rounded-full bg-forest px-5 py-3.5 text-center text-base font-medium text-ivory shadow-lifted active:bg-forest-deep"
      >
        {label}
      </Link>
    </div>
  );
}
