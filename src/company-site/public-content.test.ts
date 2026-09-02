import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { runInNewContext } from "node:vm";
import { describe, expect, it } from "vitest";
import { CONTACT_HREF, PUBLIC_CONTENT_APPROVED } from "./content";
import { LEGAL_CONTENT } from "./legal-content";

const AI_CRAWLER_RUNBOOK_PATH = "docs/operations/ai-crawler-controls.md";
const REPRESENTATIVE_AI_CRAWLERS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User", "CCBot", "Google-Extended", "Applebot-Extended", "Meta-ExternalAgent"] as const;

const readPublicTextFiles = (directory: string): string[] =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return readPublicTextFiles(path);
    return /\.(?:html|json|txt|xml|webmanifest)$/i.test(entry.name) ? [readFileSync(path, "utf8")] : [];
  });

type AnalyticsContext = {
  window?: AnalyticsContext;
  location: { hostname: string };
  dataLayer?: ArrayLike<unknown>[];
};

const runAnalyticsScript = (indexHtml: string, hostname: string) => {
  const script = indexHtml.match(/<script>\s*(window\.dataLayer[\s\S]*?)<\/script>/)?.[1];
  expect(script).toBeDefined();

  const context: AnalyticsContext = { location: { hostname } };
  context.window = context;
  runInNewContext(script as string, context);
  return (context.dataLayer ?? []).map((entry) => Array.from(entry));
};

describe("public-content deployment guard", () => {
  it("runs the approval gate before production deploy", () => {
    const packageJson = JSON.parse(readFileSync("package.json", "utf8")) as { scripts: { deploy: string } };
    expect(packageJson.scripts.deploy).toMatch(/^npm run check:public-content &&/);
  });

  it("does not expose a personal Gmail address in public files", () => {
    const publicText = [readFileSync("index.html", "utf8"), ...readPublicTextFiles("public")].join("\n");
    expect(publicText).not.toMatch(/[a-z0-9._%+-]+@gmail\.com/i);
    expect(publicText).not.toMatch(/"email"\s*:/);
  });

  it("publishes the Water Check utility page and keeps Instagram as its community profile", () => {
    const indexHtml = readFileSync("index.html", "utf8");
    const sitemap = readFileSync("public/sitemap.xml", "utf8");
    const organizationSchemaSource = indexHtml.match(/<script type="application\/ld\+json">\s*([\s\S]*?)<\/script>/)?.[1];

    expect(organizationSchemaSource).toBeDefined();
    const organizationSchema = JSON.parse(organizationSchemaSource as string) as {
      founder: { sameAs: string[]; jobTitle: string; description: string };
      sameAs?: string[];
      owns: Array<{ "@id": string; sameAs: string[] }>;
    };
    const myBibleLens = organizationSchema.owns.find((entity) => entity["@id"] === "https://mybiblelens.us/#application");
    const waterCheck = organizationSchema.owns.find(
      (entity) => entity["@id"] === "https://expectedend.co/thewatercheckpage#application",
    );

    expect(indexHtml).toContain('"url": "https://expectedend.co/thewatercheckpage"');
    expect(indexHtml).toContain('"description": "A private hydration estimate and practical water habits."');
    expect(organizationSchema.founder.sameAs).toContain("https://www.wikidata.org/wiki/Q140198525");
    expect(organizationSchema.founder.jobTitle).toBe("Founder and Full-Stack Developer");
    expect(organizationSchema.founder.description).toBe(
      "Denzel Rigaud is the founder and solo full-stack developer behind Expected End, MyBibleLens — the World's First Sanctuary App for Christianity — and The Water Check.",
    );
    expect(organizationSchema.sameAs).toBeUndefined();
    expect(myBibleLens?.sameAs).toContain("https://www.wikidata.org/wiki/Q141251174");
    expect(waterCheck?.sameAs).toEqual(
      expect.arrayContaining(["https://www.instagram.com/thewatercheck/", "https://www.wikidata.org/wiki/Q141251206"]),
    );
    expect(sitemap).toContain("https://expectedend.co/thewatercheckpage");
    expect(sitemap).toContain("https://expectedend.co/denzel-rigaud");
    expect(sitemap).not.toContain("/thewatercheck<");
  });

  it("loads fonts from same-origin assets instead of Google Fonts", () => {
    const indexHtml = readFileSync("index.html", "utf8");
    const globalStyles = readFileSync("src/index.css", "utf8");

    expect(indexHtml).not.toMatch(/fonts\.(?:googleapis|gstatic)\.com/);
    expect(globalStyles).toContain('url("/fonts/dm-sans-latin.woff2") format("woff2")');
    expect(globalStyles).toContain('url("/fonts/hammersmith-one-latin.woff2") format("woff2")');
    expect(globalStyles).toContain('url("/fonts/bricolage-grotesque-variable-latin.woff2") format("woff2")');
    expect(globalStyles).toContain('url("/fonts/inter-variable-latin.woff2") format("woff2")');
    expect(globalStyles).toContain('url("/fonts/instrument-serif-latin.woff2") format("woff2")');
    expect(globalStyles).toContain('url("/fonts/instrument-serif-italic-latin.woff2") format("woff2")');
  });

  it("loads the approved Google Analytics property and discloses analytics use", () => {
    const indexHtml = readFileSync("index.html", "utf8");
    const privacyText = LEGAL_CONTENT.privacy.sections.flatMap((section) => section.paragraphs).join(" ");

    expect(indexHtml).toContain("https://www.googletagmanager.com/gtag/js?id=G-SJ8HBVZXMT");
    expect(indexHtml).toContain("gtag('config', 'G-SJ8HBVZXMT')");
    expect(indexHtml.match(/G-SJ8HBVZXMT/g)).toHaveLength(2);
    expect(privacyText).toMatch(/Google Analytics/i);
    expect(privacyText).not.toMatch(/no public accounts, advertising trackers, analytics/i);

    const productionCalls = runAnalyticsScript(indexHtml, "expectedend.co");
    const localCalls = runAnalyticsScript(indexHtml, "localhost");
    expect(productionCalls).toContainEqual(["config", "G-SJ8HBVZXMT"]);
    expect(localCalls).not.toContainEqual(["config", "G-SJ8HBVZXMT"]);
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
});
