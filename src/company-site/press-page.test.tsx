import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PressPage } from "./press-page";

describe("Expected End press page", () => {
  it("publishes approved bios, verified entity links, and press contact details", () => {
    const { container } = render(<PressPage onNavigate={vi.fn()} />);

    expect(screen.getByRole("heading", { level: 1, name: "Press resources for Expected End." })).toBeInTheDocument();
    expect(screen.getByTestId("short-bio")).toHaveTextContent(
      "Denzel Rigaud is the founder and solo full-stack developer behind Expected End, MyBibleLens — the World's First Sanctuary App for Christianity — and The Water Check."
    );
    expect(screen.getByTestId("full-bio")).toHaveTextContent("built MyBibleLens and The Water Check independently");

    const facts = screen.getByRole("region", { name: "Verified facts" });
    expect(within(facts).getByText("Expected End LLC")).toBeInTheDocument();
    expect(within(facts).getByText("Founder and solo full-stack developer")).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Denzel Rigaud on Wikidata" })).toHaveAttribute(
      "href",
      "https://www.wikidata.org/wiki/Q140198525"
    );
    expect(screen.getByRole("link", { name: "MyBibleLens on Wikidata" })).toHaveAttribute(
      "href",
      "https://www.wikidata.org/wiki/Q141251174"
    );
    expect(screen.getByRole("link", { name: "The Water Check on Wikidata" })).toHaveAttribute(
      "href",
      "https://www.wikidata.org/wiki/Q141251206"
    );
    for (const pressLink of screen.getAllByRole("link", { name: "Start a press inquiry" })) {
      expect(pressLink).toHaveAttribute("href", "/about#contact");
    }

    const schema = JSON.parse(container.querySelector('script[type="application/ld+json"]')?.textContent ?? "{}") as {
      "@type"?: string;
      about?: Array<{ "@id": string }>;
      primaryImageOfPage?: { license?: string; creditText?: string; acquireLicensePage?: string };
    };
    expect(schema["@type"]).toBe("WebPage");
    expect(schema.about?.map((entity) => entity["@id"])).toEqual([
      "https://expectedend.co/#organization",
      "https://expectedend.co/denzel-rigaud#person",
    ]);
    expect(schema.primaryImageOfPage).toMatchObject({
      license: "https://creativecommons.org/licenses/by-sa/4.0/",
      creditText: "Denzel Rigaud / Expected End",
      acquireLicensePage: "https://expectedend.co/press#licensing",
    });
  });

  it("offers the founder portrait with its CC BY-SA 4.0 attribution", () => {
    render(<PressPage onNavigate={vi.fn()} />);

    expect(screen.getByRole("img", { name: "Denzel Rigaud in a navy suit and orange-tinted glasses" })).toHaveAttribute(
      "src",
      "/media/denzel-rigaud-founder.png"
    );
    expect(screen.getByRole("link", { name: "Download founder portrait" })).toHaveAttribute(
      "download",
      "denzel-rigaud-founder-portrait.png"
    );
    expect(screen.getByRole("link", { name: "Creative Commons Attribution-ShareAlike 4.0" })).toHaveAttribute(
      "href",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    );
  });
});
