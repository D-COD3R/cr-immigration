"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleAlert,
  Minus,
  Plus,
} from "lucide-react";
import { intakeCopy as c } from "@/content/intake-copy";
import type { Lang } from "@/content/site";
import { track } from "@/lib/analytics";
import {
  intakeSchema,
  type IntakeDraft,
} from "@/lib/intake/schema";
import { buildSteps, type StepId } from "@/lib/intake/steps";

const STORAGE_KEY = "cr_intake_draft";

function OptionButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex w-full items-center justify-between gap-3 rounded-xl border px-5 py-4 text-left text-[15px] font-medium transition-all ${
        selected
          ? "border-forest bg-forest-mist text-forest-deep shadow-card"
          : "border-line bg-paper text-ink hover:border-ink-faint/50 hover:bg-parchment/50"
      }`}
    >
      <span>{children}</span>
      {selected && (
        <span aria-hidden="true" className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest text-ivory">
          <Check size={12} strokeWidth={3} />
        </span>
      )}
    </button>
  );
}

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink">
      {children}
    </label>
  );
}

const inputClasses =
  "w-full rounded-lg border border-line bg-paper px-4 py-3 text-[15px] text-ink placeholder:text-ink-faint/60 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20";

interface IntakeFlowProps {
  lang: Lang;
}

export function IntakeFlow({ lang }: IntakeFlowProps) {
  const params = useSearchParams();

  const [draft, setDraft] = useState<IntakeDraft>({
    qualificationAnswers: {},
    household: { spouseOrPartner: false, dependents: 0 },
  });
  const [stepIndex, setStepIndex] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const startedRef = useRef(false);
  const abandonedTrackedRef = useRef(false);

  const utmRef = useRef<{ utmSource?: string; utmMedium?: string; utmCampaign?: string }>({});

  // Hydrate from sessionStorage, prefill goal from ?path=, capture UTM.
  useEffect(() => {
    let initial: IntakeDraft = { qualificationAnswers: {}, household: { spouseOrPartner: false, dependents: 0 } };

    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as { draft: IntakeDraft; stepIndex: number };
        initial = { ...initial, ...parsed.draft };
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from sessionStorage after mount
        setStepIndex(Math.max(0, Math.min(parsed.stepIndex ?? 0, 10)));
      }
    } catch {
      /* corrupted storage — start fresh */
    }

    const pathParam = params.get("path");
    const validGoals = [
      "pensionado",
      "rentista",
      "inversionista",
      "vinculo",
      "nomada-digital",
      "renewal",
      "other",
      "unsure",
    ];
    if (!initial.goal && pathParam && validGoals.includes(pathParam)) {
      initial.goal = pathParam as IntakeDraft["goal"];
    } else if (pathParam && !validGoals.includes(pathParam)) {
      // Invalid path param — ignore it silently rather than breaking the flow.
      console.warn(`[intake] Ignoring unknown path parameter: ${pathParam}`);
    }

    utmRef.current = {
      utmSource: params.get("utm_source") ?? undefined,
      utmMedium: params.get("utm_medium") ?? undefined,
      utmCampaign: params.get("utm_campaign") ?? undefined,
    };

    setDraft(initial);
    setHydrated(true);
  }, [params]);

  useEffect(() => {
    if (!hydrated) return;

    if (!startedRef.current && stepIndex === 0) {
      startedRef.current = true;
      track("assessment_started", { language: lang });
    }
  }, [hydrated, stepIndex, lang]);

  // Persist draft so a refresh mid-assessment doesn't lose answers.
  useEffect(() => {
    if (hydrated && status !== "success") {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ draft, stepIndex }));
    }
  }, [draft, stepIndex, hydrated, status]);

  const handleAbandoned = useCallback(() => {
    if (!abandonedTrackedRef.current && status !== "success") {
      abandonedTrackedRef.current = true;
      track("assessment_abandoned", { language: lang });
    }
  }, [status, lang]);

  useEffect(() => {
    window.addEventListener("pagehide", handleAbandoned);
    return () => window.removeEventListener("pagehide", handleAbandoned);
  }, [handleAbandoned]);

  const steps = useMemo(() => buildSteps(draft), [draft]);
  const stepId = steps[Math.min(stepIndex, steps.length - 1)];
  const questionCount = steps.length - 1; // excluding review
  const isQuestion = stepId !== "review";
  const currentQuestionNumber = steps.slice(0, stepIndex).filter((s) => s !== "review").length + 1;

  function update(patch: Partial<IntakeDraft>) {
    setDraft((d) => ({ ...d, ...patch }));
  }

  function goBack() {
    setSubmitError(null);
    setStepIndex((i) => Math.max(0, i - 1));
  }

  function goNext() {
    setSubmitError(null);
    track("assessment_step_completed", { step: stepId, language: lang });
    setStepIndex((i) => Math.min(steps.length - 1, i + 1));
  }

  function canContinue(): boolean {
    switch (stepId) {
      case "goal":
        return !!draft.goal;
      case "inCR":
        return !!draft.currentlyInCostaRica;
      case "qualification": {
        const answer = draft.qualificationAnswers[qualKeyFor(draft.goal)];
        return answer !== undefined && answer !== "";
      }
      case "contact":
        return true; // validated on submit attempt
      default:
        return true;
    }
  }

  async function handleSubmit() {
    setSubmitError(null);

    const payload = {
      language: lang,
      goal: draft.goal!,
      currentlyInCostaRica: draft.currentlyInCostaRica ?? null,
      countryOfResidence: draft.countryOfResidence || undefined,
      nationality: draft.nationality || undefined,
      currentStatus: draft.currentStatus || undefined,
      qualificationAnswers: draft.qualificationAnswers,
      household: draft.household,
      timeline: draft.timeline,
      name: draft.name ?? "",
      email: draft.email ?? "",
      phone: draft.phone || "",
      contactPreference: draft.contactPreference ?? "email",
      preferredLanguage: draft.preferredLanguage ?? "either",
      additionalInformation: draft.additionalInformation || "",
      consentToContact: draft.consentToContact === true,
      companyWebsite: honeypotRef.current?.value ?? "",
      source: Object.keys(utmRef.current).length ? utmRef.current : undefined,
    };

    const parsed = intakeSchema.safeParse(payload);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      const fieldMessages: Record<string, string> = {
        name: c.error.nameRequired[lang],
        email: c.error.emailRequired[lang],
        consentToContact: c.error.consentRequired[lang],
      };
      const key = String(first.path[0] ?? "");
      setSubmitError(fieldMessages[key] ?? first.message);
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.message ?? "Submission failed");
      }

      const result = await response.json();
      sessionStorage.removeItem(STORAGE_KEY);
      setReferenceId(result.referenceId ?? null);
      setStatus("success");
      track("assessment_submitted", { language: lang });
    } catch (error) {
      setStatus("idle");
      const networkLike = error instanceof TypeError;
      setSubmitError(
        (networkLike ? c.error.network : c.error.generic)[lang]
      );
      track("assessment_submit_failed", { language: lang });
    }
  }

  const qualKey = qualKeyFor(draft.goal);
  const qualAnswer = draft.qualificationAnswers[qualKey];

  if (status === "success") {
    return (
      <div className="mx-auto max-w-xl rise-in">
        <div className="rounded-2xl border border-line bg-paper p-8 text-center shadow-card sm:p-10">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-forest text-ivory">
            <Check size={26} strokeWidth={2.5} aria-hidden="true" />
          </span>
          <h1 className="mt-6 font-serif text-3xl font-medium tracking-heading text-ink">
            {c.success.heading[lang]}
          </h1>
          <p className="mt-4 leading-relaxed text-ink-soft">{c.success.body[lang]}</p>
          {referenceId && (
            <p className="mt-5 inline-block rounded-full bg-forest-mist px-4 py-1.5 text-sm font-medium text-forest-deep">
              {c.success.reference[lang]}: {referenceId}
            </p>
          )}
          <p className="mt-6 border-t border-line-soft pt-5 text-[13px] leading-relaxed text-ink-faint">
            {c.success.note[lang]}
          </p>
          <Link
            href="/"
            className="mt-7 inline-flex items-center justify-center rounded-full bg-forest px-6 py-3 text-[15px] font-medium text-ivory transition-colors hover:bg-forest-deep"
          >
            {c.success.home[lang]}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      {/* Progress */}
      <div className="mb-8 flex items-center justify-between gap-4" aria-live="polite">
        <p className="text-sm font-medium text-ink-faint">
          {isQuestion ? (
            <>
              {c.meta.questionOf[lang]} {currentQuestionNumber} {c.meta.of[lang]} {questionCount}
            </>
          ) : (
            c.meta.reviewTitle[lang]
          )}
        </p>
        {!isQuestion || stepIndex > 0 ? (
          <button
            type="button"
            onClick={goBack}
            disabled={stepIndex === 0}
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-parchment/50 disabled:invisible"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            {c.meta.back[lang]}
          </button>
        ) : null}
      </div>

      <div className="h-1 w-full overflow-hidden rounded-full bg-line-soft">
        <div
          className="h-full rounded-full bg-forest transition-all duration-500"
          style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
          role="progressbar"
          aria-valuenow={stepIndex + 1}
          aria-valuemin={1}
          aria-valuemax={steps.length}
          aria-label="Assessment progress"
        />
      </div>

      <fieldset className="mt-8 min-h-[300px]" disabled={status === "submitting"}>
        <legend className="sr-only">{c.meta.title[lang]}</legend>

        {stepId === "goal" && (
          <Question label={c.questions.goal.label[lang]}>
            <div className="space-y-2.5">
              {(Object.keys(c.questions.goal.options) as (keyof typeof c.questions.goal.options)[]).map((g) => (
                <OptionButton
                  key={g}
                  selected={draft.goal === g}
                  onClick={() => update({ goal: g })}
                >
                  {c.questions.goal.options[g][lang]}
                </OptionButton>
              ))}
            </div>
          </Question>
        )}

        {stepId === "inCR" && (
          <Question label={c.questions.inCR.label[lang]} hint={c.questions.inCR.hint[lang]}>
            <div className="grid grid-cols-2 gap-2.5">
              {(["yes", "no"] as const).map((v) => (
                <OptionButton
                  key={v}
                  selected={draft.currentlyInCostaRica === v}
                  onClick={() => {
                    if (v === "no") {
                      // Leaving Costa Rica answer as "no" invalidates status question.
                      setDraft((d) => ({ ...d, currentlyInCostaRica: v, currentStatus: undefined }));
                    } else {
                      update({ currentlyInCostaRica: v });
                    }
                  }}
                >
                  {c.meta[v][lang]}
                </OptionButton>
              ))}
            </div>
          </Question>
        )}

        {stepId === "location" && (
          <Question label={c.questions.location.label[lang]}>
            <div className="space-y-5">
              <div>
                <FieldLabel htmlFor="country">{c.questions.location.countryOfResidence[lang]}</FieldLabel>
                <input
                  id="country"
                  type="text"
                  autoComplete="country-name"
                  maxLength={100}
                  value={draft.countryOfResidence ?? ""}
                  onChange={(e) => update({ countryOfResidence: e.target.value })}
                  placeholder={c.questions.location.placeholder[lang]}
                  className={inputClasses}
                />
              </div>
              <div>
                <FieldLabel htmlFor="nationality">{c.questions.location.nationality[lang]}</FieldLabel>
                <input
                  id="nationality"
                  type="text"
                  autoComplete="nationality"
                  maxLength={100}
                  value={draft.nationality ?? ""}
                  onChange={(e) => update({ nationality: e.target.value })}
                  placeholder={c.questions.location.placeholder[lang]}
                  className={inputClasses}
                />
              </div>
            </div>
          </Question>
        )}

        {stepId === "status" && (
          <Question label={c.questions.currentStatus.label[lang]} hint={c.questions.currentStatus.hint[lang]}>
            <div className="space-y-2.5">
              {(Object.keys(c.questions.currentStatus.options) as (keyof typeof c.questions.currentStatus.options)[]).map((s) => (
                <OptionButton
                  key={s}
                  selected={draft.currentStatus === s}
                  onClick={() => update({ currentStatus: s })}
                >
                  {c.questions.currentStatus.options[s][lang]}
                </OptionButton>
              ))}
            </div>
          </Question>
        )}

        {stepId === "qualification" && qualKey && (
          <QualificationStep
            lang={lang}
            goal={draft.goal!}
            answer={typeof qualAnswer === "string" ? qualAnswer : undefined}
            booleanAnswer={typeof qualAnswer === "boolean" ? qualAnswer : undefined}
            onSelect={(value) =>
              update({
                qualificationAnswers: { ...draft.qualificationAnswers, [qualKey]: value },
              })
            }
          />
        )}

        {stepId === "household" && (
          <Question label={c.questions.household.label[lang]}>
            <div className="space-y-6">
              <div className="space-y-2.5">
                <OptionButton
                  selected={!draft.household.spouseOrPartner}
                  onClick={() => update({ household: { ...draft.household, spouseOrPartner: false } })}
                >
                  {c.questions.household.alone[lang]}
                </OptionButton>
                <OptionButton
                  selected={draft.household.spouseOrPartner}
                  onClick={() => update({ household: { ...draft.household, spouseOrPartner: true } })}
                >
                  {c.questions.household.spouse[lang]}
                </OptionButton>
              </div>

              <div>
                <p id="dependents-label" className="mb-2 text-sm font-medium text-ink">
                  {c.questions.household.dependentsLabel[lang]}
                </p>
                <div
                  role="group"
                  aria-labelledby="dependents-label"
                  className="inline-flex items-center gap-1 rounded-full border border-line bg-paper p-1"
                >
                  <button
                    type="button"
                    onClick={() =>
                      update({
                        household: {
                          ...draft.household,
                          dependents: Math.max(0, draft.household.dependents - 1),
                        },
                      })
                    }
                    aria-label="Remove dependent"
                    className="flex h-9 w-9 items-center justify-center rounded-full text-ink-soft hover:bg-parchment"
                  >
                    <Minus size={16} aria-hidden="true" />
                  </button>
                  <span aria-live="polite" className="w-10 text-center font-semibold text-ink">
                    {draft.household.dependents}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      update({
                        household: {
                          ...draft.household,
                          dependents: Math.min(12, draft.household.dependents + 1),
                        },
                      })
                    }
                    aria-label="Add dependent"
                    className="flex h-9 w-9 items-center justify-center rounded-full text-ink-soft hover:bg-parchment"
                  >
                    <Plus size={16} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </Question>
        )}

        {stepId === "timing" && (
          <Question label={c.questions.timing.label[lang]}>
            <div className="space-y-2.5">
              {(Object.keys(c.questions.timing.options) as (keyof typeof c.questions.timing.options)[]).map((tl) => (
                <OptionButton
                  key={tl}
                  selected={draft.timeline === tl}
                  onClick={() => update({ timeline: tl })}
                >
                  {c.questions.timing.options[tl][lang]}
                </OptionButton>
              ))}
            </div>
          </Question>
        )}

        {stepId === "contact" && (
          <ContactStep lang={lang} draft={draft} update={update} honeypotRef={honeypotSetter} />
        )}

        {stepId === "additional" && (
          <Question
            label={c.questions.additional.label[lang]}
            hint={c.questions.additional.hint[lang]}
          >
            <textarea
              aria-label={c.questions.additional.label[lang]}
              rows={5}
              maxLength={2000}
              value={draft.additionalInformation ?? ""}
              onChange={(e) => update({ additionalInformation: e.target.value })}
              className={`${inputClasses} resize-y`}
            />
          </Question>
        )}

        {stepId === "review" && <ReviewStep lang={lang} draft={draft} onEdit={(target) => setStepIndex(steps.indexOf(target))} />}
      </fieldset>

      {submitError && (
        <div
          role="alert"
          className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
        >
          <CircleAlert size={18} className="mt-0.5 shrink-0 text-red-600" aria-hidden="true" />
          {submitError}
        </div>
      )}

      <div className="mt-8">
        {stepId === "review" ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={status === "submitting"}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-forest px-7 py-4 text-base font-medium text-ivory shadow-card transition-all hover:bg-forest-deep hover:shadow-lifted disabled:opacity-60 sm:w-auto"
          >
            {status === "submitting" ? c.meta.submitting[lang] : c.meta.submit[lang]}
          </button>
        ) : (
          <button
            type="button"
            onClick={goNext}
            disabled={!canContinue()}
            className={`group inline-flex items-center gap-2 rounded-full px-7 py-4 text-base font-medium transition-all ${
              canContinue()
                ? "bg-forest text-ivory shadow-card hover:bg-forest-deep hover:shadow-lifted"
                : "cursor-not-allowed bg-line-soft text-ink-faint"
            }`}
          >
            {c.meta.continue[lang]}
            <ArrowRight
              size={18}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-0.5"
            />
          </button>
        )}
      </div>
    </div>
  );

  function honeypotSetter(el: HTMLInputElement | null) {
    honeypotRef.current = el;
  }
}

const honeypotRef: { current: HTMLInputElement | null } = { current: null };

function qualKeyFor(goal?: string): string {
  switch (goal) {
    case "pensionado":
      return "has_pension";
    case "rentista":
      return "has_stable_income";
    case "inversionista":
      return "investment_status";
    case "vinculo":
      return "family_relationship";
    case "nomada-digital":
      return "works_remotely";
    default:
      return "";
  }
}

function Question({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rise-in">
      <h2 className="font-serif text-2xl font-medium leading-snug tracking-heading text-ink">{label}</h2>
      {hint && <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-faint">{hint}</p>}
      <div className="mt-6">{children}</div>
    </div>
  );
}

function QualificationStep({
  lang,
  goal,
  answer,
  booleanAnswer,
  onSelect,
}: {
  lang: Lang;
  goal: string;
  answer?: string;
  booleanAnswer?: boolean;
  onSelect: (value: string | boolean) => void;
}) {
  const q = c.questions.qualification as Record<string, { label: Record<Lang, string>; hint?: Record<Lang, string>; options?: Record<string, Record<Lang, string>> }>;
  const content = q[goal];
  if (!content) return null;

  return (
    <Question label={content.label[lang]} hint={content.hint?.[lang]}>
      {content.options ? (
        <div className="space-y-2.5">
          {Object.entries(content.options).map(([key, label]) => (
            <OptionButton key={key} selected={answer === key} onClick={() => onSelect(key)}>
              {label[lang]}
            </OptionButton>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2.5">
          {[true, false].map((v) => (
            <OptionButton key={String(v)} selected={booleanAnswer === v} onClick={() => onSelect(v)}>
              {c.meta[v ? "yes" : "no"][lang]}
            </OptionButton>
          ))}
        </div>
      )}
    </Question>
  );
}

function ContactStep({
  lang,
  draft,
  update,
  honeypotRef: setHoneypot,
}: {
  lang: Lang;
  draft: IntakeDraft;
  update: (patch: Partial<IntakeDraft>) => void;
  honeypotRef: (el: HTMLInputElement | null) => void;
}) {
  const qc = c.questions.contact;

  return (
    <Question label={qc.label[lang]}>
      <div className="space-y-5">
        <div>
          <FieldLabel htmlFor="name">{qc.name[lang]}</FieldLabel>
          <input
            id="name"
            type="text"
            autoComplete="name"
            maxLength={200}
            value={draft.name ?? ""}
            onChange={(e) => update({ name: e.target.value })}
            className={inputClasses}
            required
          />
        </div>
        <div>
          <FieldLabel htmlFor="email">{qc.email[lang]}</FieldLabel>
          <input
            id="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            maxLength={200}
            value={draft.email ?? ""}
            onChange={(e) => update({ email: e.target.value })}
            className={inputClasses}
            required
          />
        </div>
        <div>
          <FieldLabel htmlFor="phone">{qc.phone[lang]}</FieldLabel>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            maxLength={40}
            value={draft.phone ?? ""}
            onChange={(e) => update({ phone: e.target.value })}
            className={inputClasses}
          />
        </div>
        <div>
          <FieldLabel htmlFor="contact-preference">{qc.preference[lang]}</FieldLabel>
          <select
            id="contact-preference"
            value={draft.contactPreference ?? "email"}
            onChange={(e) => update({ contactPreference: e.target.value as IntakeDraft["contactPreference"] })}
            className={inputClasses}
          >
            {(["email", "phone", "whatsapp"] as const).map((v) => (
              <option key={v} value={v}>
                {qc.preferences[v][lang]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <FieldLabel htmlFor="preferred-language">{qc.language[lang]}</FieldLabel>
          <select
            id="preferred-language"
            value={draft.preferredLanguage ?? "either"}
            onChange={(e) => update({ preferredLanguage: e.target.value as IntakeDraft["preferredLanguage"] })}
            className={inputClasses}
          >
            {(["english", "spanish", "either"] as const).map((v) => (
              <option key={v} value={v}>
                {qc.languages[v][lang]}
              </option>
            ))}
          </select>
        </div>

        <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-paper p-4 text-sm leading-relaxed text-ink-soft">
          <input
            type="checkbox"
            checked={draft.consentToContact === true}
            onChange={(e) => update({ consentToContact: e.target.checked })}
            className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--color-forest)]"
            required
          />
          {qc.consent[lang]}
        </label>

        {/* Honeypot — hidden from real users and assistive tech */}
        <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
          <label htmlFor="company-website">{qc.honeypot[lang]}</label>
          <input
            ref={setHoneypot}
            id="company-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
      </div>
    </Question>
  );
}

function formatValue(lang: Lang, draft: IntakeDraft): { label: string; value: string; step: StepId }[] {
  const r = c.review.labels;
  const yesNo = (v?: string) =>
    v === undefined ? r.notProvided[lang] : v === "yes" ? c.meta.yes[lang] : c.meta.no[lang];

  const rows: { label: string; value: string; step: StepId }[] = [];

  if (draft.goal) rows.push({ label: r.goal[lang], value: c.questions.goal.options[draft.goal][lang], step: "goal" });
  rows.push({ label: r.inCostaRica[lang], value: yesNo(draft.currentlyInCostaRica), step: "inCR" });
  if (draft.countryOfResidence)
    rows.push({ label: r.countryOfResidence[lang], value: draft.countryOfResidence, step: "location" });
  if (draft.nationality) rows.push({ label: r.nationality[lang], value: draft.nationality, step: "location" });
  if (draft.currentStatus)
    rows.push({
      label: r.currentStatus[lang],
      value: (c.questions.currentStatus.options as Record<string, Record<Lang, string>>)[draft.currentStatus]?.[lang] ?? draft.currentStatus,
      step: "status",
    });

  const qualKey = qualKeyFor(draft.goal);
  if (qualKey && draft.qualificationAnswers[qualKey] !== undefined) {
    const raw = draft.qualificationAnswers[qualKey];
    let value: string;
    if (typeof raw === "boolean") {
      value = raw ? c.meta.yes[lang] : c.meta.no[lang];
    } else {
      const opts = (c.questions.qualification as Record<string, { options?: Record<string, Record<Lang, string>> }>)[draft.goal!]?.options;
      value = opts?.[raw]?.[lang] ?? raw;
    }
    rows.push({ label: r.qualification[lang], value, step: "qualification" });
  }

  const householdParts: string[] = [];
  householdParts.push(draft.household.spouseOrPartner ? c.questions.household.spouse[lang] : c.questions.household.alone[lang]);
  if (draft.household.dependents > 0) {
    householdParts.push(`${draft.household.dependents} × ${c.questions.household.dependentsLabel[lang].toLowerCase()}`);
  }
  rows.push({ label: r.household[lang], value: householdParts.join(" · "), step: "household" });

  if (draft.timeline)
    rows.push({
      label: r.timeline[lang],
      value: (c.questions.timing.options as Record<string, Record<Lang, string>>)[draft.timeline][lang],
      step: "timing",
    });

  const contactBits = [draft.name, draft.email, draft.phone].filter(Boolean).join(" · ");
  rows.push({ label: r.contact[lang], value: contactBits || r.notProvided[lang], step: "contact" });

  if (draft.additionalInformation)
    rows.push({ label: r.additional[lang], value: draft.additionalInformation, step: "additional" });

  return rows;
}

function ReviewStep({
  lang,
  draft,
  onEdit,
}: {
  lang: Lang;
  draft: IntakeDraft;
  onEdit: (step: StepId) => void;
}) {
  const rows = formatValue(lang, draft);

  return (
    <div className="rise-in">
      <h2 className="font-serif text-2xl font-medium tracking-heading text-ink">
        {c.meta.reviewTitle[lang]}
      </h2>
      <p className="mt-2 text-sm text-ink-faint">{c.meta.reviewNote[lang]}</p>

      <dl className="mt-6 divide-y divide-line-soft rounded-xl border border-line bg-paper">
        {rows.map((row) => (
          <div key={row.label} className="flex items-start justify-between gap-4 px-5 py-3.5">
            <div className="min-w-0">
              <dt className="text-xs font-semibold uppercase tracking-wide text-ink-faint">{row.label}</dt>
              <dd className="mt-0.5 break-words text-[15px] text-ink">{row.value}</dd>
            </div>
            <button
              type="button"
              onClick={() => onEdit(row.step)}
              className="shrink-0 rounded-full px-3 py-1 text-sm font-medium text-forest hover:bg-forest-tint"
            >
              {c.meta.edit[lang]}
            </button>
          </div>
        ))}
      </dl>
    </div>
  );
}
