import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const root = process.cwd();
const errors = [];
const skipDirs = new Set([".git", ".next", "node_modules"]);
const skipFiles = new Set(["package-lock.json", "scripts/verify.mjs"]);
const authoredExtensions = new Set([
  ".css",
  ".json",
  ".md",
  ".mjs",
  ".ts",
  ".tsx",
  ".wgsl",
]);
const priorCustomerNames = [
  `${"Data"}${"dog"}`,
  `${"Sea"}${"gate"}`,
  `${"Ac"}${"me"}`,
  ["M", "a", "d", "e", "l", "i", "n", "e", " ", "I", "n", "g", "l", "e", "b", "y"].join(""),
];
const priorCustomerColors = [
  `#${"632c"}${"a6"}`,
  `#${"4c1d"}${"82"}`,
  `#${"6ebe"}${"49"}`,
  `#${"3d6b"}${"28"}`,
];
const requiredArtifacts = [
  "AI Pod steering brief",
  "Workshop handoff",
  "Pod onboarding brief",
];
const requiredHeroJobIds = [
  "steering-brief",
  "workshop-handoff",
  "pod-onboarding",
  "decision-log",
  "action-tracker",
  "source-check",
  "weekly-update",
  "review-queue",
];
const artwork = [
  "public/brand/globant-watercolor-hero.jpg",
  "public/brand/globant-steering.jpg",
  "public/brand/globant-handoff.jpg",
  "public/brand/globant-onboarding.jpg",
];

function walk(directory, files = []) {
  for (const name of readdirSync(directory)) {
    if (skipDirs.has(name)) {
      continue;
    }
    const path = join(directory, name);
    const stats = statSync(path);
    if (stats.isDirectory()) {
      walk(path, files);
    } else if (authoredExtensions.has(extname(name))) {
      files.push(path);
    }
  }
  return files;
}

const packageJson = JSON.parse(
  readFileSync(join(root, "package.json"), "utf8"),
);
if (packageJson.dependencies?.next !== "15.5.24") {
  errors.push("Next must remain at 15.5.24.");
}
if (!packageJson.dependencies?.geist) {
  errors.push("The Geist package dependency is missing.");
}
if (!packageJson.dependencies?.vgpu) {
  errors.push("The vGPU package dependency is missing.");
}
if (!existsSync(join(root, "src"))) {
  errors.push("The canonical src/ tree is missing.");
}

for (const path of walk(root)) {
  const rel = relative(root, path);
  if (skipFiles.has(rel)) {
    continue;
  }
  const text = readFileSync(path, "utf8");
  const lower = text.toLowerCase();
  for (const name of priorCustomerNames) {
    if (lower.includes(name.toLowerCase())) {
      errors.push(`${rel} contains prior-customer residue.`);
    }
  }
  for (const color of priorCustomerColors) {
    if (lower.includes(color)) {
      errors.push(`${rel} contains a prior-customer color.`);
    }
  }
  if (text.includes("\u2014") || text.includes("\u2013")) {
    errors.push(`${rel} contains an em dash or en dash.`);
  }
}

const brand = readFileSync(
  join(root, "src/components/BrandLockup.tsx"),
  "utf8",
);
const officialWordmark =
  "https://stayrelevant.globant.com/wp-content/uploads/2022/03/logo-globant.svg";
if (!brand.includes(officialWordmark)) {
  errors.push("BrandLockup must use the official Globant-hosted wordmark.");
}

const provenance = JSON.parse(
  readFileSync(join(root, "public/brand/provenance.json"), "utf8"),
);
if (
  provenance.globantWordmark?.assetUrl !== officialWordmark ||
  provenance.globantWordmark?.sourcePage !== "https://www.globant.com/"
) {
  errors.push("Globant wordmark provenance is incorrect.");
}

const css = readFileSync(join(root, "src/app/globals.css"), "utf8");
for (const match of css.matchAll(/--brand-h:\s*(\d+(?:\.\d+)?)px/g)) {
  const height = Number(match[1]);
  if (height < 15 || height > 18) {
    errors.push(`Brand lockup height ${height}px is outside 15px to 18px.`);
  }
}

const page = readFileSync(
  join(root, "src/app/(protected)/page.tsx"),
  "utf8",
);
if (!page.includes("Biz Eshetu") || !page.includes("biz.eshetu@cursor.com")) {
  errors.push("The footer must contain Biz Eshetu and the correct email.");
}
if (!page.includes("<HeroDemo />")) {
  errors.push("The protected page must render HeroDemo as the hero.");
}

const heroComponentPath = join(root, "src/components/HeroDemo.tsx");
const heroJobsPath = join(root, "src/data/hero-jobs.ts");
if (!existsSync(heroComponentPath) || !existsSync(heroJobsPath)) {
  errors.push("HeroDemo and its hero job data must remain in the src/ tree.");
} else {
  const heroComponent = readFileSync(heroComponentPath, "utf8");
  const heroJobs = readFileSync(heroJobsPath, "utf8");
  for (const className of [
    "hero-copy",
    "hero-phone-jobs",
    "hero-bot-demo",
    "hero-phone",
    "notch",
    "header",
    "thread",
    "composer",
  ]) {
    if (!heroComponent.includes(className)) {
      errors.push(`HeroDemo is missing the ${className} class.`);
    }
  }
  for (const id of requiredHeroJobIds) {
    if (!heroJobs.includes(`id: "${id}"`)) {
      errors.push(`HeroDemo is missing the ${id} job.`);
    }
  }
  if ([...heroJobs.matchAll(/\bid:\s*"[^"]+"/g)].length !== 8) {
    errors.push("HeroDemo must keep exactly eight jobs.");
  }
  for (const selector of [
    ".hero-phone",
    ".hero-bot-demo",
    ".hero-phone-jobs",
  ]) {
    if (!css.includes(selector)) {
      errors.push(`The hero stylesheet is missing ${selector}.`);
    }
  }
}

const auth = readFileSync(join(root, "src/lib/auth.ts"), "utf8");
if (!auth.includes('"land2expand"')) {
  errors.push("The password fallback must remain land2expand.");
}

const jobs = readFileSync(join(root, "src/data/jobs.ts"), "utf8");
for (const title of requiredArtifacts) {
  if (!jobs.includes(title)) {
    errors.push(`Missing final artifact: ${title}.`);
  }
}

for (const path of artwork) {
  const full = join(root, path);
  if (!existsSync(full) || statSync(full).size < 100_000) {
    errors.push(`${path} is missing or incomplete.`);
  }
}

if (errors.length) {
  console.error("Verify failed.");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Verify passed.");
