import { Check } from "lucide-react";
import { t } from "@/content/translations";
import type { Lang } from "@/content/site";

export function Services({ lang }: { lang: Lang }) {
  return (
    <section id="services" aria-labelledby="services-heading" className="scroll-mt-20 border-y border-line-soft bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <h2 id="services-heading" className="font-serif text-3xl font-medium tracking-heading text-ink sm:text-4xl">
            {t.services.heading[lang]}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-ink-soft">{t.services.subheading[lang]}</p>
        </div>

        {/* Editorial columns rather than icon-card grid */}
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {t.services.groups.map((group, gi) => (
            <div
              key={group.title.en}
              className={gi > 0 ? "border-t border-line pt-8 md:border-t-0 md:pt-0" : ""}
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-sand">
                {group.title[lang]}
              </p>
              <ul className="mt-4 space-y-3.5 border-t border-line-soft pt-5">
                {group.items.map((item) => (
                  <li key={item.en} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-forest-tint text-forest"
                    >
                      <Check size={11} strokeWidth={3} />
                    </span>
                    <span className="text-[15px] leading-snug text-ink-soft">{item[lang]}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
