import { ChevronDown } from "lucide-react";
import { t } from "@/content/translations";
import { faq } from "@/content/faq";
import type { Lang } from "@/content/site";

export function FaqSection({ lang }: { lang: Lang }) {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-20">
      <div className="mx-auto max-w-3xl px-5 py-16 lg:px-8 lg:py-24">
        <h2 id="faq-heading" className="font-serif text-3xl font-medium tracking-heading text-ink sm:text-4xl">
          {t.faq.heading[lang]}
        </h2>

        <div className="mt-10 divide-y divide-line border-y border-line">
          {faq.map((item) => (
            <details key={item.question.en} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 [&::-webkit-details-marker]:hidden">
                <h3 className="text-[17px] font-medium leading-snug text-ink transition-colors group-hover:text-forest-deep">
                  {item.question[lang]}
                </h3>
                <ChevronDown
                  size={20}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-ink-faint transition-transform duration-200 group-open:rotate-180"
                />
              </summary>
              <p className="mt-3 pr-8 leading-relaxed text-ink-soft">{item.answer[lang]}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
