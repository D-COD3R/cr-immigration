import { t } from "@/content/translations";
import type { Lang } from "@/content/site";

const statusStyles: Record<string, string> = {
  done: "bg-forest text-ivory",
  current: "bg-sand-tint border-2 border-sand",
  waiting: "bg-ocean-tint border border-ocean/40",
  upcoming: "bg-paper border border-line",
};

/**
 * Visual preview of the guided case journey. Communicates what the service
 * actually provides — organization and guidance through a long process.
 */
export function JourneyPreview({ lang }: { lang: Lang }) {
  const stages = t.journey.stages;

  return (
    <section aria-labelledby="journey-heading" className="bg-forest-deep text-ivory">
      <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <h2 id="journey-heading" className="font-serif text-3xl font-medium tracking-heading sm:text-4xl">
            {t.journey.heading[lang]}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-ivory/75">{t.journey.subheading[lang]}</p>
        </div>

        <ol className="mt-12 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage, i) => (
            <li key={stage.name.en} className="relative">
              {i < stages.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute left-full top-4 hidden h-px w-8 translate-x-0 bg-ivory/15 lg:block"
                />
              )}
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${statusStyles[stage.status]}`}
              >
                <span className={`text-sm font-semibold ${stage.status === "current" ? "text-sand" : stage.status === "waiting" ? "text-ocean" : stage.status === "upcoming" ? "text-ink-faint" : ""}`}>
                  {i + 1}
                </span>
              </div>
              <p className={`mt-3 font-medium ${stage.status === "upcoming" ? "text-ivory/60" : "text-ivory"}`}>
                {stage.name[lang]}
              </p>
              <p
                className={`mt-1 text-[13px] ${
                  stage.status === "done"
                    ? "text-emerald-300"
                    : stage.status === "current"
                      ? "text-sand"
                      : stage.status === "waiting"
                        ? "text-sky-300"
                        : "text-ivory/40"
                }`}
              >
                {t.journey.statusLabels[stage.status][lang]}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-12 max-w-xl border-t border-ivory/10 pt-6 text-sm leading-relaxed text-ivory/50">
          {lang === "en"
            ? "Illustrative stages for orientation only. Actual steps, order and timelines depend on your category and government processing."
            : "Etapas ilustrativas solo con fines de orientación. Los pasos reales, su orden y los plazos dependen de su categoría y del procesamiento gubernamental."}
        </p>
      </div>
    </section>
  );
}
