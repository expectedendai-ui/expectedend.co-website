import { describe, expect, it } from "vitest";
import { getRoute, getRouteMetadata, isInternalHref } from "./routes";

describe("company-site routes", () => {
  it("resolves every public route and falls back safely", () => {
    expect(getRoute("/").key).toBe("home");
    expect(getRoute("/about/").key).toBe("about");
    expect(getRoute("/terms").key).toBe("terms");
    expect(getRoute("/privacy").key).toBe("privacy");
    expect(getRoute("/accessibility").key).toBe("accessibility");
    expect(getRoute("/not-a-real-page").key).toBe("not-found");
  });

  it("keeps the paused Water Check landing page hidden", () => {
    const directRoute = getRoute("/thewatercheck");
    const trailingSlashRoute = getRoute("/thewatercheck/");

    expect(directRoute).toMatchObject({ key: "not-found", family: "company" });
    expect(trailingSlashRoute).toEqual(directRoute);
    expect(getRouteMetadata("/thewatercheck/").canonical).toBe("https://expectedend.co/");
  });

  it.each([
    ["/thewatercheck/privacy", "water-check-privacy", "Privacy"],
    ["/thewatercheck/terms", "water-check-terms", "Terms"],
    ["/thewatercheck/health-and-ai-disclaimer", "water-check-health-and-ai-disclaimer", "Health & AI Disclaimer"],
    ["/thewatercheck/consumer-health-data", "water-check-consumer-health-data", "Consumer Health Data"],
  ])("resolves %s with distinct product metadata", (path, key, title) => {
    const route = getRoute(`${path}/`);
    const metadata = getRouteMetadata(path);

    expect(route).toMatchObject({ key, family: "water-check", path });
    expect(metadata.title).toContain(title);
    expect(metadata.description).toContain("Water Check");
    expect(metadata.canonical).toBe(`https://expectedend.co${path}`);
  });

  it("provides route-aware title, description, and canonical metadata", () => {
    const metadata = getRouteMetadata("/privacy");
    expect(metadata.title).toContain("Privacy");
    expect(metadata.description).toContain("Expected End");
    expect(metadata.canonical).toBe("https://expectedend.co/privacy");
  });

  it("only intercepts same-origin public links", () => {
    expect(isInternalHref("/about", "https://expectedend.co")).toBe(true);
    expect(isInternalHref("/#projects", "https://expectedend.co")).toBe(true);
    expect(isInternalHref("https://mybiblelens.us/", "https://expectedend.co")).toBe(false);
    expect(isInternalHref("mailto:hello@example.com", "https://expectedend.co")).toBe(false);
  });
});
