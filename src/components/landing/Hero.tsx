import Link from "next/link";
import { ArrowRight, Check, CircleDashed } from "lucide-react";
import { t } from "@/content/translations";
import type { Lang } from "@/content/site";
import { TrackedLink } from "./TrackedLink";

function HeroVisual({ lang }: { lang: Lang }) {
  const steps = [
    {
      label: { en: "Eligibility", es: "Elegibilidad" },
      status: "complete",
    },
    {
      label: { en: "Documents", es: "Documentos" },
      status: "next",
    },
    {
      label: { en: "Legal review", es: "Revisión legal" },
      status: null,
    },
    {
      label: { en: "Filing", es: "Presentación" },
      status: null,
    },
    {
      label: { en: "Resolution", es: "Resolución" },
      status: null,
    },
    {
      label: { en: "Residency documentation", es: "Documentos de residencia" },
      status: null,
    },
  ] as const;

  const statusLabel = {
    complete: { en: "Complete", es: "Completado" },
    next: { en: "Next", es: "Siguiente" },
  };

  return (
    <div className="relative">
      {/* Location cue */}
      <p
        aria-hidden="true"
        className="mb-3 text-right font-mono text-[11px] tracking-wider text-ink-faint"
      >
        9.9281° N · 84.0907° W — San José, CR
      </p>

      <div className="rounded-2xl border border-line bg-paper shadow-lifted">
        <div className="flex items-center justify-between border-b border-line-soft px-5 py-3.5 sm:px-6">
          <p className="text-sm font-semibold tracking-tight text-ink">
            {lang === "en" ? "Your path" : "Su camino"}
          </p>
          <span className="rounded-full bg-forest-tint px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-forest-deep">
            {lang === "en" ? "Case preview" : "Vista del caso"}
          </span>
        </div>

        <ol className="px-5 py-2 sm:px-6">
          {steps.map((step, i) => (
            <li key={step.label.en} className="relative flex items-start gap-3.5 py-2.5">
              {/* Connector */}
              {i < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className={`absolute left-[9px] top-8 h-[calc(100%-1rem)] w-px ${
                    step.status === "complete" ? "bg-forest/40" : "bg-line"
                  }`}
                />
              )}
              <span
                className={`mt-0.5 flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-full ${
                  step.status === "complete"
                    ? "bg-forest text-ivory"
                    : step.status === "next"
                      ? "border-2 border-sand bg-sand-tint text-sand"
                      : "border border-line bg-paper"
                }`}
              >
                {step.status === "complete" && <Check size={11} strokeWidth={3} />}
                {step.status === "next" && <CircleDashed size={10} strokeWidth={3} />}
              </span>
              <span className="flex flex-1 flex-wrap items-baseline justify-between gap-x-3 pb-0.5">
                <span
                  className={`text-[15px] ${step.status ? "font-medium text-ink" : "text-ink-faint"}`}
                >
                  {step.label[lang]}
                </span>
                {(step.status === "complete" || step.status === "next") && (
                  <span
                    className={`text-xs font-medium ${
                      step.status === "complete" ? "text-forest" : "text-sand"
                    }`}
                  >
                    {statusLabel[step.status][lang]}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ol>

        <div className="mx-5 mb-5 rounded-xl bg-forest-mist px-4 py-3 sm:mx-6">
          <p className="text-[13px] leading-relaxed text-forest-deep">
            {lang === "en"
              ? "This is the guided experience your case moves through — organized for you, reviewed by professionals."
              : "Esta es la experiencia guiada por la que avanza su caso, organizada para usted y revisada por profesionales."}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Hero({ lang }: { lang: Lang }) {
  return (
    <section className="relative overflow-hidden">
      {/* Soft botanical wash, top-right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-forest-mist), transparent)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 pb-16 pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:px-8 lg:pb-24 lg:pt-20">
        <div>
          <h1 className="rise-in font-serif text-[2.5rem] font-medium leading-[1.08] tracking-heading text-ink sm:text-5xl lg:text-[3.4rem]">
            {lang === "en" ? (
              <>
                Your path to Costa Rica residency,{" "}
                <em className="italic text-forest">made clear.</em>
              </>
            ) : (
              <>
                Su camino a la residencia en Costa Rica,{" "}
                <em className="italic text-forest">con claridad.</em>
              </>
            )}
          </h1>

          <p className="rise-in rise-in-delay-1 mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
            {t.hero.subcopy[lang]}
          </p>

          <div className="rise-in rise-in-delay-2 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <TrackedLink
              event="hero_cta_click"
              payload={{ location: "hero" }}
              href="/start"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-forest px-7 py-4 text-base font-medium text-ivory shadow-card transition-all hover:bg-forest-deep hover:shadow-lifted"
            >
              {t.hero.primaryCta[lang]}
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </TrackedLink>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-full border border-line bg-paper px-7 py-4 text-base font-medium text-ink transition-colors hover:border-ink-faint/50 hover:bg-parchment/60"
            >
              {t.hero.secondaryCta[lang]}
            </a>
          </div>

          <dl className="mt-10 grid max-w-xl grid-cols-1 gap-x-6 gap-y-4 border-t border-line-soft pt-7 sm:grid-cols-3">
            {t.hero.trust.map((item) => (
              <div key={item.title.en}>
                <dt className="text-sm font-semibold text-ink">{item.title[lang]}</dt>
                <dd className="mt-0.5 text-[13px] leading-snug text-ink-faint">
                  {item.detail[lang]}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rise-in rise-in-delay-2 mx-auto w-full max-w-md lg:max-w-none">
          <HeroVisual lang={lang} />
        </div>
      </div>
    </section>
  );
}
