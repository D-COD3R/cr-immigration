import Link from "next/link";
import { t } from "@/content/translations";
import { site, type Lang } from "@/content/site";

export function Footer({ lang }: { lang: Lang }) {
  const contactItems = [
    site.contact.email && { label: "Email", value: `mailto:${site.contact.email}`, display: site.contact.email },
    site.contact.whatsapp && {
      label: "WhatsApp",
      value: `https://wa.me/${site.contact.whatsapp}`,
      display: "WhatsApp",
    },
  ].filter(Boolean) as { label: string; value: string; display: string }[];

  return (
    <footer className="border-t border-line-soft bg-parchment/60">
      <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="max-w-sm">
            <p className="text-[15px] font-semibold tracking-tight text-ink">{site.name}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Guided residency and immigration services for people building a life in Costa Rica.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 md:grid-cols-1 md:gap-3">
            <div className="space-y-3 md:space-y-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
                {t.footer.services[lang]}
              </p>
              <ul className="space-y-2 text-sm">
                <li><Link href="/#services" className="text-ink-soft hover:text-ink">{t.nav.services[lang]}</Link></li>
                <li><Link href="/#how-it-works" className="text-ink-soft hover:text-ink">{t.footer.how[lang]}</Link></li>
                <li><Link href="/#faq" className="text-ink-soft hover:text-ink">{t.footer.faq[lang]}</Link></li>
              </ul>
            </div>
            <div className="space-y-3 md:space-y-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
                {site.shortName}
              </p>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="text-ink-soft hover:text-ink">{t.footer.privacy[lang]}</Link></li>
                <li><Link href="/terms" className="text-ink-soft hover:text-ink">{t.footer.terms[lang]}</Link></li>                <li>
                  {contactItems.length > 0 ? (
                    contactItems.map((c) => (
                      <a key={c.label} href={c.value} className="block text-ink-soft hover:text-ink">
                        {c.display}
                      </a>
                    ))
                  ) : (
                    <span className="text-ink-faint">{t.footer.contact[lang]} — coming soon</span>
                  )}
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-12 border-t border-line pt-8">
          <p className="max-w-2xl text-xs leading-relaxed text-ink-faint">
            {site.affiliationDisclosure[lang]}
          </p>
          <p className="mt-3 text-xs text-ink-faint">
            © {new Date().getFullYear()} {site.name}. {t.footer.rights[lang]}
          </p>
        </div>
      </div>
    </footer>
  );
}
