import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const nextBin = fileURLToPath(new URL("../node_modules/next/dist/bin/next", import.meta.url));
const fontMocks = fileURLToPath(new URL("../tests/fixtures/google-fonts.cjs", import.meta.url));
const env = { ...process.env };
delete env.TURBOPACK;
env.NEXT_FONT_GOOGLE_MOCKED_RESPONSES = fontMocks;

const result = spawnSync(process.execPath, [nextBin, "build", "--webpack"], {
  env,
  stdio: "inherit",
});

if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
