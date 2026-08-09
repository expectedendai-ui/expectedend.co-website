import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { WaterCheckPage } from "./water-check-page";

describe("Water Check Coming Soon page", () => {
  it("pairs the fixed hook with an immediate limitation and an honest planned product story", () => {
    const { container } = render(<WaterCheckPage onNavigate={vi.fn()} />);

    expect(screen.getByRole("main", { name: "The Water Check Coming Soon" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: "The Water Check" })).toBeInTheDocument();

    const hero = screen.getByRole("region", { name: "Water Check introduction" });
    expect(within(hero).getByText("You’re not fat, just bloated.")).toBeInTheDocument();
    expect(within(hero).getByText("Snap. Track. Debloat.")).toBeInTheDocument();
    expect(within(hero).getByText(/bloating can have many causes/i)).toHaveTextContent(
      /explores possible patterns.*not body composition or a diagnosis/i
    );
    expect(within(hero).getByText("Coming Soon")).toBeInTheDocument();
    expect(within(hero).queryByText("For adults 18+")).not.toBeInTheDocument();

    expect(screen.queryByRole("button", { name: /app store/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /google play/i })).not.toBeInTheDocument();
    expect(screen.queryByAltText("App Store")).not.toBeInTheDocument();
    expect(screen.queryByAltText("Google Play")).not.toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    const timeline = screen.getByRole("region", { name: "A fictional drink journal" });
    expect(within(timeline).getByText("Fictional example")).toBeInTheDocument();
    expect(within(timeline).getByText(/drink logged/i)).toBeInTheDocument();
    expect(within(timeline).getByText(/later bloat check-in/i)).toBeInTheDocument();
    expect(within(timeline).getByText("Qualified possible pattern")).toBeInTheDocument();

    expect(screen.getByText(/planned scan or described-drink logging/i)).toBeInTheDocument();
    expect(screen.getByText(/planned hydration and nutrient tracking/i)).toBeInTheDocument();
    expect(screen.getByText(/planned bloat check-ins/i)).toBeInTheDocument();
    expect(screen.getByText(/educational, approximate AI/i)).toBeInTheDocument();
    expect(screen.getByText(/may be incomplete and cannot diagnose/i)).toBeInTheDocument();

    const featurePreviews = Array.from(container.querySelectorAll("[data-feature-preview]"));
    expect(featurePreviews).toHaveLength(4);
    expect(featurePreviews.map((preview) => preview.getAttribute("data-feature-preview"))).toEqual([
      "scanner",
      "calendar",
      "day-track",
      "insight",
    ]);
    for (const preview of featurePreviews) {
      expect(preview).toHaveAttribute("aria-hidden", "true");
    }

    expect(screen.queryByText(/the quiet part is the point/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/no form between curiosity and the story/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("list", { name: /current website boundaries/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/no submission/i)).not.toBeInTheDocument();

    expect(container.querySelector("form, input, select, textarea, video, track")).not.toBeInTheDocument();
    expect(container.querySelector("[src*='water-check-demo'], [srcset*='water-check-demo'], [poster]")).not.toBeInTheDocument();
    expect(container).not.toHaveTextContent(/testimonial|five-star|5-star|clinically proven|certified|real users/i);

    const instagramLinks = screen.getAllByRole("link", {
      name: "Join our community to help you stay hydrated!",
    });
    expect(instagramLinks).toHaveLength(2);
    for (const instagram of instagramLinks) {
      expect(instagram).toHaveAttribute("href", "https://www.instagram.com/thewatercheck/");
      expect(instagram).toHaveAttribute("target", "_blank");
      expect(instagram).toHaveAttribute("rel", expect.stringMatching(/noopener/));
      expect(instagram).toHaveAttribute("rel", expect.stringMatching(/noreferrer/));
      expect(within(instagram).getByRole("img", { name: "Instagram" })).toHaveAttribute("src", "/instagram-logo.webp");
    }
  });

  it("places Denzel's governed founder story and future personalization context before the product walkthrough", () => {
    const { container } = render(<WaterCheckPage onNavigate={vi.fn()} />);
    const founderStory = screen.getByRole("region", { name: "What we’re building, and why" });
    const personalization = screen.getByRole("region", { name: "How will it be special to you?" });
    const walkthroughKicker = screen.getByText("One drink. One check-in. More context.");
    const founderText = founderStory.textContent ?? "";
    const personalizationText = personalization.textContent ?? "";

    expect(within(founderStory).getByText("Aug 2026")).toBeInTheDocument();
    expect(within(founderStory).getByText("Denzel Rigaud, Founder of Expected End")).toBeInTheDocument();
    expect(
      within(founderStory).getByText(
        "I grew up around women I love and heard how quickly feeling different could turn into harsh judgment about their bodies. I wanted to create a gentler pause: a way to notice what changed, keep the day in context, and ask better questions before blaming your body. Bloating can have many causes, and lasting or concerning symptoms deserve a conversation with a qualified healthcare professional."
      )
    ).toBeInTheDocument();
    expect(within(founderStory).getByText(/carried The Water Check with me for 6 years/i)).toBeInTheDocument();
    expect(within(founderStory).getByText(/hydration needs vary with the person/i)).toBeInTheDocument();
    expect(
      within(founderStory).getByText(/will not diagnose a condition or prove that one drink caused a symptom/i)
    ).toBeInTheDocument();
    const linkedIn = within(founderStory).getByRole("link", { name: "Denzel Rigaud on LinkedIn" });
    const instagram = within(founderStory).getByRole("link", { name: "Denzel Rigaud on Instagram" });
    expect(linkedIn).toHaveAttribute("href", "https://www.linkedin.com/in/denzel-rigaud-2b0200210/");
    expect(instagram).toHaveAttribute("href", "https://www.instagram.com/smiledenzel/");
    expect(linkedIn.querySelector("img")).toHaveAttribute("src", "/linkedin-icon.webp");
    expect(instagram.querySelector("img")).toHaveAttribute("src", "/instagram-logo.webp");
    for (const social of [linkedIn, instagram]) {
      expect(social).toHaveAttribute("target", "_blank");
      expect(social).toHaveAttribute("rel", expect.stringMatching(/noopener/));
      expect(social).toHaveAttribute("rel", expect.stringMatching(/noreferrer/));
    }
    expect(
      within(personalization).getByText(
        "We are designing the future app so you can decide which context belongs in your journal. Personalization should help the record fit your life without turning a sensitive detail into a label."
      )
    ).toBeInTheDocument();
    const personalizationItems = within(personalization).getAllByRole("listitem");
    expect(personalizationItems).toHaveLength(5);
    expect(personalizationItems.map((item) => item.querySelector("strong")?.textContent)).toEqual([
      "Context you choose.",
      "Your own patterns.",
      "Cycle context, if it applies to you.",
      "Your choice comes first.",
      "Inclusive evaluation.",
    ]);
    expect(personalizationItems[2]).toHaveTextContent(
      "Optional cycle check-ins could sit beside drink and bloating notes to help you notice possible patterns over time. They will not set universal phase targets or explain a symptom."
    );
    expect(personalizationItems[3]).toHaveTextContent("The current Water Check page has no health or demographic fields.");
    expect(personalizationItems[4]).toHaveTextContent(
      "adults across age groups, cultures, skin tones, body types, and life stages"
    );
    expect(personalizationItems[4]).toHaveTextContent(
      "Ethnicity and racial identity will not become hydration profile fields or biological shortcuts."
    );
    expect(founderStory.compareDocumentPosition(walkthroughKicker)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(founderStory.compareDocumentPosition(personalization)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(personalization.compareDocumentPosition(walkthroughKicker)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(founderStory.querySelector("time")).toHaveAttribute("datetime", "2026-08");
    expect(founderText).not.toMatch(/water (?:flushes|flushed).*vitamin/i);
    expect(founderText).not.toMatch(/everyone (?:needs|should drink) (?:a )?gallon/i);
    expect(personalizationText).not.toMatch(/(?:enter|provide|submit|select) (?:your )?(?:ethnicity|race|cycle|menstrual)/i);
    expect(container.querySelector("form, input, select, textarea")).not.toBeInTheDocument();
  });
});
