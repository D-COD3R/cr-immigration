import { t } from "@/content/translations";
import type { Lang } from "@/content/site";

export function HowItWorks({ lang }: { lang: Lang }) {
  return (
    <section id="how-it-works" aria-labelledby="how-heading" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-20">
          <div>
            <h2 id="how-heading" className="font-serif text-3xl font-medium tracking-heading text-ink sm:text-4xl">
              {t.how.heading[lang]}
            </h2>
            <p className="mt-3 max-w-md text-lg leading-relaxed text-ink-soft">
              {t.how.subheading[lang]}
            </p>
          </div>

          <ol className="space-y-0 border-t border-line">
            {t.how.steps.map((step, i) => (
              <li
                key={step.title.en}
                className="grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-1 border-b border-line py-6 sm:gap-x-8"
              >
                <span className="font-serif text-2xl italic text-sand sm:text-3xl" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-ink">{step.title[lang]}</h3>
                  <p className="mt-1.5 max-w-xl leading-relaxed text-ink-soft">{step.body[lang]}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
