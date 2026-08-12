import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getWaterCheckRenderedReleaseFacts } from "../water-check/legal/water-check-release-content";
import { validateWaterCheckRelease, WATER_CHECK_RELEASE_EVIDENCE } from "../water-check/legal/water-check-release-evidence";
import { CONTACT_HREF, PUBLIC_CONTENT_APPROVED } from "./content";
import { getRouteMetadata } from "./routes";

const WATER_CHECK_GOVERNED_SOURCE_PATHS = [
  "src/water-check/water-check-page.tsx",
  "src/water-check/water-check-shell.tsx",
  "src/water-check/legal/water-check-legal-content.ts",
  "src/water-check/legal/water-check-legal-page.tsx",
  "docs/legal/water-check-deployment-data-inventory.md",
] as const;

const WATER_CHECK_DEPLOYMENT_INVENTORY_PATH = "docs/legal/water-check-deployment-data-inventory.md";
const AI_CRAWLER_RUNBOOK_PATH = "docs/operations/ai-crawler-controls.md";

const REPRESENTATIVE_AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "CCBot",
  "Google-Extended",
  "Applebot-Extended",
  "Meta-ExternalAgent",
] as const;

const WATER_CHECK_PATHS = [
  "/thewatercheck",
  "/thewatercheck/privacy",
  "/thewatercheck/terms",
  "/thewatercheck/health-and-ai-disclaimer",
  "/thewatercheck/consumer-health-data",
] as const;

const readWaterCheckGovernedSources = () =>
  WATER_CHECK_GOVERNED_SOURCE_PATHS.map((path) => readFileSync(path, "utf8")).concat(
    JSON.stringify(WATER_CHECK_PATHS.map((path) => getRouteMetadata(path)))
  );

const readPublicTextFiles = (directory: string): string[] =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return readPublicTextFiles(path);
    return /\.(?:html|json|txt|xml|webmanifest)$/i.test(entry.name) ? [readFileSync(path, "utf8")] : [];
  });

const readSourceCssFiles = (directory = "src"): Array<{ path: string; styles: string }> =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return readSourceCssFiles(path);
    return entry.name.endsWith(".css") ? [{ path, styles: readFileSync(path, "utf8") }] : [];
  });

const findWaterCheckFamilyDeclarations = (family: "Water Check Bricolage" | "Water Check Inter") =>
  readSourceCssFiles().flatMap(({ path, styles }) =>
    Array.from(styles.matchAll(/([^{}]+)\{([^{}]*)\}/g)).flatMap(([, selector, declarations]) =>
      declarations
        .split(";")
        .map((declaration) => declaration.match(/^\s*([-\w]+)\s*:\s*(.+)$/))
        .filter((match): match is RegExpMatchArray => Boolean(match?.[2].includes(`"${family}"`)))
        .map((match) => ({ path, selector: selector.trim(), property: match[1] }))
    )
  );

describe("public-content deployment guard", () => {
  it("runs the approval gate before production deploy", () => {
    const packageJson = JSON.parse(readFileSync("package.json", "utf8")) as {
      scripts: { deploy: string };
    };
    expect(packageJson.scripts.deploy).toMatch(/^npm run check:public-content &&/);
  });

  it("does not expose a personal Gmail address in public files", () => {
    const publicText = [readFileSync("index.html", "utf8"), ...readPublicTextFiles("public")].join("\n");
    expect(publicText).not.toMatch(/[a-z0-9._%+-]+@gmail\.com/i);
    expect(publicText).not.toMatch(/"email"\s*:/);
  });

  it("publishes the Water Check route family in static discovery surfaces", () => {
    const indexHtml = readFileSync("index.html", "utf8");
    const sitemap = readFileSync("public/sitemap.xml", "utf8");

    for (const path of WATER_CHECK_PATHS) {
      expect(sitemap).toContain(`<loc>https://expectedend.co${path}</loc>`);
    }
    expect(indexHtml).toContain('"url": "https://expectedend.co/thewatercheck"');
    expect(indexHtml).toContain('"sameAs": [\n              "https://www.instagram.com/thewatercheck/"\n            ]');
  });

  it("loads fonts from same-origin assets instead of Google Fonts", () => {
    const indexHtml = readFileSync("index.html", "utf8");
    const globalStyles = readFileSync("src/index.css", "utf8");
    const bricolageFont = readFileSync("public/fonts/bricolage-grotesque-variable-latin.woff2");
    const interFont = readFileSync("public/fonts/inter-variable-latin.woff2");
    const bricolageLicense = readFileSync("public/fonts/OFL-Bricolage-Grotesque.txt", "utf8");
    const interLicense = readFileSync("public/fonts/OFL-Inter.txt", "utf8");

    expect(indexHtml).not.toMatch(/fonts\.(?:googleapis|gstatic)\.com/);
    expect(globalStyles).toContain('url("/fonts/dm-sans-latin.woff2") format("woff2")');
    expect(globalStyles).toContain('url("/fonts/hammersmith-one-latin.woff2") format("woff2")');
    expect(globalStyles).toMatch(
      /font-family: "Water Check Bricolage";\s*src: url\("\/fonts\/bricolage-grotesque-variable-latin\.woff2"\) format\("woff2"\);\s*font-style: normal;\s*font-weight: 200 800;\s*font-display: swap;/
    );
    expect(globalStyles).toMatch(
      /font-family: "Water Check Inter";\s*src: url\("\/fonts\/inter-variable-latin\.woff2"\) format\("woff2"\);\s*font-style: normal;\s*font-weight: 100 900;\s*font-display: swap;/
    );
    expect(globalStyles).toContain('url("/fonts/instrument-serif-latin.woff2") format("woff2")');
    expect(globalStyles).toContain('url("/fonts/instrument-serif-italic-latin.woff2") format("woff2")');
    expect(bricolageFont.subarray(0, 4).toString("ascii")).toBe("wOF2");
    expect(interFont.subarray(0, 4).toString("ascii")).toBe("wOF2");
    expect(bricolageFont.byteLength).toBeGreaterThan(40_000);
    expect(interFont.byteLength).toBeGreaterThan(40_000);
    expect(bricolageLicense).toMatch(/The Bricolage Grotesque Project Authors/);
    expect(bricolageLicense).toMatch(/SIL OPEN FONT LICENSE Version 1\.1/);
    expect(interLicense).toMatch(/The Inter Project Authors/);
    expect(interLicense).toMatch(/SIL OPEN FONT LICENSE Version 1\.1/);
    expect(existsSync("public/fonts/inter-medium-latin.woff2")).toBe(false);
  });

  it("gives Water Check a readable, route-scoped typography system", () => {
    const globalStyles = readFileSync("src/index.css", "utf8");
    const shellStyles = readFileSync("src/water-check/water-check-shell.module.css", "utf8");
    const pageStyles = readFileSync("src/water-check/water-check-page.module.css", "utf8");
    const legalStyles = readFileSync("src/water-check/legal/water-check-legal-page.module.css", "utf8");
    const bricolageDeclarations = findWaterCheckFamilyDeclarations("Water Check Bricolage");
    const interDeclarations = findWaterCheckFamilyDeclarations("Water Check Inter");
    const waterCheckStyles = readSourceCssFiles("src/water-check")
      .map(({ styles }) => styles)
      .join("\n");

    expect(globalStyles).toMatch(/html:has\(\[data-site-theme="water-check"\]\)\s*{[^}]*font-size:\s*16px/);
    expect(shellStyles).toContain('--water-font-display: "Water Check Bricolage", system-ui, sans-serif;');
    expect(shellStyles).toContain('--water-font-body: "Water Check Inter", system-ui, sans-serif;');
    expect(shellStyles).toContain("font-family: var(--water-font-body);");
    expect(pageStyles).toContain("font-family: var(--water-font-display);");
    expect(bricolageDeclarations).toEqual([
      { path: "src/index.css", selector: "@font-face", property: "font-family" },
      { path: "src/water-check/water-check-shell.module.css", selector: ".shell", property: "--water-font-display" },
    ]);
    expect(interDeclarations).toEqual([
      { path: "src/index.css", selector: "@font-face", property: "font-family" },
      { path: "src/water-check/water-check-shell.module.css", selector: ".shell", property: "--water-font-body" },
    ]);
    expect(waterCheckStyles).not.toMatch(/font-family:\s*(?:"DM Sans"|"Instrument Serif"|"Water Check (?:Bricolage|Inter)")/);
    expect(shellStyles).toMatch(/\.productMark\s*{[^}]*font-family: var\(--water-font-display\);/);
    expect(pageStyles).toMatch(/\.heroTitle\s*{[^}]*font-family: var\(--water-font-display\);[^}]*font-weight: 500;/);
    expect(pageStyles).toMatch(/\.page \.tagline\s*{[^}]*font-family: var\(--water-font-body\);[^}]*font-weight: 500;/);
    expect(pageStyles).toMatch(/\.sectionIntro h2,\s*\.finalSection h2\s*{[^}]*font-family: var\(--water-font-display\);/);
    expect(legalStyles).toContain("font-family: var(--water-font-display);");
  });

  it("keeps ordinary indexing open while disallowing the documented AI crawler inventory", () => {
    const indexHtml = readFileSync("index.html", "utf8");
    const robots = readFileSync("public/robots.txt", "utf8");

    expect(indexHtml).toContain('name="robots" content="index, follow, noimageai, max-image-preview:large"');
    expect(robots).toMatch(/User-agent: \*\nAllow: \/\nDisallow: \/artworks\/\nDisallow: \/audio\//);
    expect(robots).toContain("Sitemap: https://expectedend.co/sitemap.xml");

    for (const crawler of REPRESENTATIVE_AI_CRAWLERS) {
      expect(robots).toMatch(new RegExp(`User-agent: ${crawler}\\n(?:User-agent: [^\\n]+\\n)*Disallow: /`, "i"));
    }
  });

  it("publishes a closed AI-use policy without pretending the declaration enforces access", () => {
    const aiPolicy = readFileSync("public/ai.txt", "utf8");
    const normalizedAiPolicy = aiPolicy.replace(/^# ?/gm, "").replace(/\s+/g, " ");
    const runbook = readFileSync(AI_CRAWLER_RUNBOOK_PATH, "utf8");

    expect(aiPolicy).toContain("# Policy: NO AUTOMATED AI USE");
    expect(normalizedAiPolicy).toMatch(/does not authorize automated AI search, agent access, crawling, training/i);
    expect(normalizedAiPolicy).toMatch(/does not enforce access/i);
    expect(normalizedAiPolicy).not.toMatch(/public text.+may be.+read and cited/i);

    expect(runbook).toMatch(/Search, Agent, and Training/i);
    expect(runbook).toMatch(/WAF rule order/i);
    expect(runbook).toMatch(/AI Labyrinth/i);
    expect(runbook).toMatch(/false positive/i);
    expect(runbook).toMatch(/rollback/i);
    expect(runbook).toMatch(/quarterly/i);
    expect(runbook).toMatch(/cannot make public content secret/i);
  });
});

describe.skipIf(process.env.RELEASE_CHECK !== "1")("public-content release gate", () => {
  it("requires explicit owner approval before production release", () => {
    expect(CONTACT_HREF).toBe("/about#contact");
    expect(PUBLIC_CONTENT_APPROVED).toBe(true);
  });

  it("requires independent, content-bound Water Check release evidence", () => {
    const validation = validateWaterCheckRelease(WATER_CHECK_RELEASE_EVIDENCE, {
      governedSources: readWaterCheckGovernedSources(),
      renderedFacts: getWaterCheckRenderedReleaseFacts(WATER_CHECK_RELEASE_EVIDENCE),
      deploymentInventoryDocument: readFileSync(WATER_CHECK_DEPLOYMENT_INVENTORY_PATH, "utf8"),
    });
    expect(validation.errors, validation.errors.join("\n")).toEqual([]);
    expect(validation.valid).toBe(true);
  });
});
