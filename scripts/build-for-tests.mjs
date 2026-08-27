import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const nextBin = fileURLToPath(new URL("../node_modules/next/dist/bin/next", import.meta.url));
const env = { ...process.env };
delete env.TURBOPACK;

const result = spawnSync(process.execPath, [nextBin, "build", "--webpack"], {
  env,
  stdio: "inherit",
});

if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
