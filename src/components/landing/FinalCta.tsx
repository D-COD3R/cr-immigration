import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { t } from "@/content/translations";
import type { Lang } from "@/content/site";

export function FinalCta({ lang }: { lang: Lang }) {
  return (
    <section aria-labelledby="final-cta-heading" className="border-t border-line-soft bg-parchment/60">
      <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="final-cta-heading" className="font-serif text-3xl font-medium leading-tight tracking-heading text-ink sm:text-[2.6rem] sm:leading-[1.15]">
            {t.finalCta.heading[lang]}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
            {t.finalCta.body[lang]}
          </p>
          <Link
            href="/start"
            className="group mt-9 inline-flex items-center justify-center gap-2 rounded-full bg-forest px-8 py-4 text-base font-medium text-ivory shadow-card transition-all hover:bg-forest-deep hover:shadow-lifted"
          >
            {t.finalCta.cta[lang]}
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
