import type { IntakeDraft } from "./schema";

export type StepId =
  | "goal"
  | "inCR"
  | "location"
  | "status"
  | "qualification"
  | "household"
  | "timing"
  | "contact"
  | "additional"
  | "review";

const GOALS_WITH_QUALIFICATION = [
  "pensionado",
  "rentista",
  "inversionista",
  "vinculo",
  "nomada-digital",
] as const;

export function buildSteps(draft: IntakeDraft): StepId[] {
  const steps: StepId[] = ["goal", "inCR", "location"];
  if (draft.currentlyInCostaRica === "yes") steps.push("status");
  if (draft.goal && (GOALS_WITH_QUALIFICATION as readonly string[]).includes(draft.goal)) {
    steps.push("qualification");
  }
  steps.push("household", "timing", "contact", "additional", "review");
  return steps;
}
