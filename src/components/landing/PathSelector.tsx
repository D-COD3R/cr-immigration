import { ArrowUpRight } from "lucide-react";
import { t } from "@/content/translations";
import type { Lang } from "@/content/site";
import { immigrationPaths } from "@/content/immigration-paths";
import { TrackedLink } from "./TrackedLink";

/**
 * Goal-first routing into the assessment. Legal categories are secondary
 * labels — visitors should never need immigration vocabulary to self-select.
 */
export function PathSelector({ lang }: { lang: Lang }) {
  const paths = immigrationPaths.filter((p) => p.enabled);

  return (
    <section aria-labelledby="paths-heading" className="border-y border-line-soft bg-parchment/50">
      <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <h2 id="paths-heading" className="font-serif text-3xl font-medium tracking-heading text-ink sm:text-4xl">
            {t.routing.heading[lang]}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-ink-soft">{t.routing.subheading[lang]}</p>
        </div>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {paths.map((path) => (
            <li key={path.id}>
              <TrackedLink
                event="path_selected"
                payload={{ path: path.id }}
                href={`/start?path=${path.id}`}
                className="group flex h-full flex-col rounded-xl border border-line bg-paper p-5 transition-all hover:border-forest/40 hover:bg-forest-mist hover:shadow-card sm:p-6"
              >
                <span className="flex items-start justify-between gap-3">
                  <span className="font-serif text-xl font-medium leading-snug text-ink">
                    {path.plainLanguageTitle[lang]}
                  </span>
                  <ArrowUpRight
                    size={18}
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-ink-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-forest"
                  />
                </span>
                <span className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-forest">
                  {path.legalCategory[lang]}
                </span>
                <span className="mt-2.5 text-sm leading-relaxed text-ink-soft">
                  {path.summary[lang]}
                </span>
              </TrackedLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
