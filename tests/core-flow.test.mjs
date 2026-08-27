import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { fileURLToPath } from "node:url";
import { createServer } from "node:net";
import test from "node:test";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));

async function availablePort() {
  const server = createServer();
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  assert(address && typeof address === "object");
  const { port } = address;
  await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
  return port;
}

async function waitForServer(url, child, output) {
  const deadline = Date.now() + 15_000;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(`Next.js exited before becoming ready.\n${output()}`);
    }
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // The server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`Timed out waiting for Next.js.\n${output()}`);
}

async function stopServer(child) {
  if (child.exitCode !== null) return;
  child.kill("SIGTERM");
  await Promise.race([
    once(child, "exit"),
    new Promise((resolve) => setTimeout(resolve, 5_000)),
  ]);
  if (child.exitCode === null) child.kill("SIGKILL");
}

test("production core flow renders and accepts a valid intake", { timeout: 30_000 }, async () => {
  const port = await availablePort();
  const baseUrl = `http://127.0.0.1:${port}`;
  const nextBin = fileURLToPath(new URL("../node_modules/next/dist/bin/next", import.meta.url));
  const env = { ...process.env, NODE_ENV: "production", INTAKE_STORE: "console" };
  delete env.DATABASE_URL;

  const child = spawn(process.execPath, [nextBin, "start", "-H", "127.0.0.1", "-p", String(port)], {
    cwd: projectRoot,
    env,
    stdio: ["ignore", "pipe", "pipe"],
  });

  let serverOutput = "";
  const capture = (chunk) => {
    serverOutput = `${serverOutput}${chunk}`.slice(-12_000);
  };
  child.stdout.on("data", capture);
  child.stderr.on("data", capture);

  try {
    await waitForServer(baseUrl, child, () => serverOutput);

    const home = await fetch(baseUrl);
    const homeHtml = await home.text();
    assert.equal(home.status, 200);
    assert.match(homeHtml, /Your path to Costa Rica residency/);
    assert.match(homeHtml, /href="\/start"/);

    const start = await fetch(`${baseUrl}/start`);
    const startHtml = await start.text();
    assert.equal(start.status, 200);
    assert.match(startHtml, /Start your assessment/);
    assert.match(startHtml, /What is your main goal/);

    const malformed = await fetch(`${baseUrl}/api/intake`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{",
    });
    assert.equal(malformed.status, 400);
    assert.deepEqual(await malformed.json(), {
      error: "invalid_json",
      message: "Malformed submission.",
    });

    const payload = {
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
      additionalInformation: "Automated local integration test.",
      consentToContact: true,
      companyWebsite: "",
    };

    const invalid = await fetch(`${baseUrl}/api/intake`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...payload, email: "not-an-email" }),
    });
    assert.equal(invalid.status, 400);
    const invalidBody = await invalid.json();
    assert.equal(invalidBody.error, "validation_failed");
    assert(invalidBody.issues.some((issue) => issue.path === "email"));

    const bot = await fetch(`${baseUrl}/api/intake`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...payload, companyWebsite: "https://spam.invalid" }),
    });
    assert.equal(bot.status, 200);
    assert.deepEqual(await bot.json(), { ok: true });

    const submission = await fetch(`${baseUrl}/api/intake`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    assert.equal(submission.status, 201);
    const submissionBody = await submission.json();
    assert.equal(submissionBody.ok, true);
    assert.match(submissionBody.referenceId, /^[0-9A-F]{8}$/);
  } finally {
    await stopServer(child);
  }
});
