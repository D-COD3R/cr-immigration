import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const nextRoot = `${projectRoot}/.next`;

const routes = {
  landing: {
    manifest: "server/app/page_client-reference-manifest.js",
    clientModules: ["src/components/layout/LanguageToggle.tsx", "src/components/landing/TrackedLink.tsx"],
    gzipBudgetKiB: 150,
  },
  assessment: {
    manifest: "server/app/start/page_client-reference-manifest.js",
    clientModules: ["src/components/layout/LanguageToggle.tsx", "src/components/intake/IntakeFlow.tsx"],
    gzipBudgetKiB: 180,
  },
};

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function readClientManifest(relativePath) {
  const source = readFileSync(`${nextRoot}/${relativePath}`, "utf8");
  const match = source.match(/globalThis\.__RSC_MANIFEST\["[^"]+"\]=(\{.*\});$/s);
  assert(match, `Could not parse ${relativePath}`);
  return JSON.parse(match[1]);
}

function assetSize(relativePath) {
  const absolutePath = `${nextRoot}/${relativePath}`;
  const contents = readFileSync(absolutePath);
  return {
    rawBytes: statSync(absolutePath).size,
    gzipBytes: gzipSync(contents).length,
  };
}

function sumAssets(paths) {
  return [...paths].reduce(
    (total, path) => {
      const size = assetSize(path);
      total.rawBytes += size.rawBytes;
      total.gzipBytes += size.gzipBytes;
      return total;
    },
    { rawBytes: 0, gzipBytes: 0 },
  );
}

function kib(bytes) {
  return Number((bytes / 1024).toFixed(1));
}

const buildManifest = readJson(`${nextRoot}/build-manifest.json`);
const rootJavaScript = new Set(buildManifest.rootMainFiles);
const measurements = {};

for (const [routeName, route] of Object.entries(routes)) {
  const manifest = readClientManifest(route.manifest);
  const routeJavaScript = new Set(rootJavaScript);

  for (const [modulePath, moduleInfo] of Object.entries(manifest.clientModules)) {
    if (!route.clientModules.some((suffix) => modulePath.endsWith(suffix))) continue;
    for (const chunk of moduleInfo.chunks) {
      if (typeof chunk === "string" && chunk.startsWith("static/")) routeJavaScript.add(chunk);
    }
  }

  const css = new Set(
    Object.values(manifest.entryCSSFiles)
      .flat()
      .map((entry) => entry.path),
  );
  const javascriptSize = sumAssets(routeJavaScript);
  const cssSize = sumAssets(css);
  const gzipKiB = kib(javascriptSize.gzipBytes);

  measurements[routeName] = {
    javascript: {
      files: routeJavaScript.size,
      rawKiB: kib(javascriptSize.rawBytes),
      gzipKiB,
      budgetKiB: route.gzipBudgetKiB,
    },
    css: {
      files: css.size,
      rawKiB: kib(cssSize.rawBytes),
      gzipKiB: kib(cssSize.gzipBytes),
    },
  };

  assert(
    gzipKiB <= route.gzipBudgetKiB,
    `${routeName} JavaScript is ${gzipKiB} KiB gzip; budget is ${route.gzipBudgetKiB} KiB`,
  );
}

console.log(JSON.stringify({ measuredFrom: "offline production build", measurements }, null, 2));
