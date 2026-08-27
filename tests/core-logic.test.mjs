import assert from "node:assert/strict";
import test from "node:test";

import { checkRateLimit } from "../src/lib/intake/rate-limit.ts";
import { intakeSchema } from "../src/lib/intake/schema.ts";
import { getIntakeStore } from "../src/lib/intake/store.ts";
import { buildSteps } from "../src/lib/intake/steps.ts";

const baseDraft = {
  qualificationAnswers: {},
  household: { spouseOrPartner: false, dependents: 0 },
};

const validPayload = {
  language: "en",
  goal: "unsure",
  currentlyInCostaRica: "no",
  qualificationAnswers: {},
  household: { spouseOrPartner: false, dependents: 0 },
  name: "Core Flow Test",
  email: "core-flow@example.invalid",
  phone: "",
  contactPreference: "email",
  preferredLanguage: "english",
  additionalInformation: "Automated local core-flow test.",
  consentToContact: true,
  companyWebsite: "",
};

test("the intake uses the short path for an unsure applicant outside Costa Rica", () => {
  assert.deepEqual(
    buildSteps({ ...baseDraft, goal: "unsure", currentlyInCostaRica: "no" }),
    ["goal", "inCR", "location", "household", "timing", "contact", "additional", "review"],
  );
});

test("the intake adds status and qualification steps when applicable", () => {
  assert.deepEqual(
    buildSteps({ ...baseDraft, goal: "pensionado", currentlyInCostaRica: "yes" }),
    [
      "goal",
      "inCR",
      "location",
      "status",
      "qualification",
      "household",
      "timing",
      "contact",
      "additional",
      "review",
    ],
  );
});

test("submission validation accepts the user flow and preserves honeypot detection", () => {
  assert.equal(intakeSchema.safeParse(validPayload).success, true);

  const invalid = intakeSchema.safeParse({ ...validPayload, email: "not-an-email" });
  assert.equal(invalid.success, false);
  assert(invalid.error.issues.some((issue) => issue.path.join(".") === "email"));

  const bot = intakeSchema.safeParse({ ...validPayload, companyWebsite: "https://spam.invalid" });
  assert.equal(bot.success, true);
  assert.equal(bot.data.companyWebsite, "https://spam.invalid");
});

test("the console persistence boundary returns a user-facing reference", async () => {
  const previousStore = process.env.INTAKE_STORE;
  const previousInfo = console.info;
  process.env.INTAKE_STORE = "console";
  console.info = () => {};

  try {
    const parsed = intakeSchema.parse(validPayload);
    const result = await getIntakeStore().save(parsed);
    assert.equal(result.ok, true);
    assert.match(result.referenceId, /^[0-9A-F]{8}$/);
  } finally {
    console.info = previousInfo;
    if (previousStore === undefined) delete process.env.INTAKE_STORE;
    else process.env.INTAKE_STORE = previousStore;
  }
});

test("rate limiting blocks requests after the configured allowance", () => {
  const key = `core-flow:${crypto.randomUUID()}`;
  assert.deepEqual(checkRateLimit(key, 2, 60_000), { allowed: true });
  assert.deepEqual(checkRateLimit(key, 2, 60_000), { allowed: true });
  const blocked = checkRateLimit(key, 2, 60_000);
  assert.equal(blocked.allowed, false);
  assert(blocked.retryAfterSeconds > 0);
});
