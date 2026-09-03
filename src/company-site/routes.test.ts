import { describe, expect, it } from "vitest";
import { getRoute, getRouteMetadata, isInternalHref } from "./routes";

describe("company-site routes", () => {
  it("resolves every public route and falls back safely", () => {
    expect(getRoute("/").key).toBe("home");
    expect(getRoute("/about/").key).toBe("about");
    expect(getRoute("/denzel-rigaud/").key).toBe("denzel-rigaud");
    expect(getRoute("/press/").key).toBe("press");
    expect(getRoute("/terms").key).toBe("terms");
    expect(getRoute("/privacy").key).toBe("privacy");
    expect(getRoute("/accessibility").key).toBe("accessibility");
    expect(getRoute("/mybiblelensstore").key).toBe("mybiblelens-store");
    expect(getRoute("/thewatercheckstore/").key).toBe("watercheck-store");
    expect(getRoute("/thewatercheckpage/").key).toBe("watercheck-page");
    expect(getRoute("/not-a-real-page").key).toBe("not-found");
  });

  it.each([
    "/thewatercheck",
    "/thewatercheck/",
    "/thewatercheck/privacy",
    "/thewatercheck/terms",
    "/thewatercheck/health-and-ai-disclaimer",
    "/thewatercheck/consumer-health-data",
  ])("retires %s as a not-found route", (path) => {
    expect(getRoute(path).key).toBe("not-found");
    expect(getRouteMetadata(path)).toMatchObject({
      title: "Page not found — Expected End",
      canonical: "https://expectedend.co/",
    });
  });

  it("provides route-aware title, description, and canonical metadata", () => {
    const metadata = getRouteMetadata("/privacy");
    expect(metadata.title).toContain("Privacy");
    expect(metadata.description).toContain("Expected End");
    expect(metadata.canonical).toBe("https://expectedend.co/privacy");

    const storeMetadata = getRouteMetadata("/mybiblelensstore");
    expect(storeMetadata.title).toContain("MyBibleLens Store");
    expect(storeMetadata.canonical).toBe("https://expectedend.co/mybiblelensstore");

    const waterCheckMetadata = getRouteMetadata("/thewatercheckpage");
    expect(waterCheckMetadata.title).toContain("Hydration Calculator");
    expect(waterCheckMetadata.description).toContain("hydration estimate");
    expect(waterCheckMetadata.canonical).toBe("https://expectedend.co/thewatercheckpage");

    const founderMetadata = getRouteMetadata("/denzel-rigaud");
    expect(founderMetadata.title).toBe("Denzel Rigaud — Founder of Expected End");
    expect(founderMetadata.description).toBe(
      "Denzel Rigaud is the founder and solo full-stack developer behind Expected End, MyBibleLens — the World's First Sanctuary App for Christianity — and The Water Check."
    );
    expect(founderMetadata.canonical).toBe("https://expectedend.co/denzel-rigaud");
    expect(founderMetadata.image).toBe("https://expectedend.co/media/denzel-rigaud-founder.png");

    const pressMetadata = getRouteMetadata("/press");
    expect(pressMetadata).toMatchObject({
      title: "Press & Media — Expected End",
      canonical: "https://expectedend.co/press",
      image: "https://expectedend.co/media/denzel-rigaud-founder-hero.png",
    });
  });

  it("only intercepts same-origin public links", () => {
    expect(isInternalHref("/about", "https://expectedend.co")).toBe(true);
    expect(isInternalHref("/#projects", "https://expectedend.co")).toBe(true);
    expect(isInternalHref("https://mybiblelens.us/", "https://expectedend.co")).toBe(false);
    expect(isInternalHref("mailto:hello@example.com", "https://expectedend.co")).toBe(false);
  });
});
