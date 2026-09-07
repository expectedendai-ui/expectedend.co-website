import { act, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CompanySite } from ".";

describe("Expected End About page", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/about");
    vi.stubGlobal("scrollTo", vi.fn());
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
      callback(0);
      return 1;
    });
    vi.stubGlobal("cancelAnimationFrame", vi.fn());
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("keeps the egg on the founder page and requires two pointer or keyboard activations", async () => {
    window.history.replaceState({}, "", "/denzel-rigaud");
    const user = userEvent.setup();
    const onOpenArtWorld = vi.fn();
    render(<CompanySite leaving={false} onOpenArtWorld={onOpenArtWorld} />);

    expect(screen.getByRole("heading", { level: 1, name: "The Mind Behind Expected End" })).toBeInTheDocument();
    const egg = screen.getByRole("button", { name: "Enter the hidden art world" });
    const image = withinEgg(egg);
    expect(image).toHaveAttribute("width", "20");
    expect(image).toHaveAttribute("height", "20");
    await user.click(egg);
    expect(onOpenArtWorld).not.toHaveBeenCalled();
    expect(screen.getByRole("status")).toHaveTextContent("One more press to enter the hidden art world.");
    await user.click(egg);
    expect(onOpenArtWorld).toHaveBeenCalledTimes(1);

    egg.focus();
    await user.keyboard("{Enter}{Enter}");
    expect(onOpenArtWorld).toHaveBeenCalledTimes(2);

    await user.keyboard("[Space][Space]");
    expect(onOpenArtWorld).toHaveBeenCalledTimes(3);
  });

  it("expires an unfinished activation sequence and cleans up its timer", () => {
    window.history.replaceState({}, "", "/denzel-rigaud");
    vi.useFakeTimers();
    const onOpenArtWorld = vi.fn();
    const { unmount } = render(<CompanySite leaving={false} onOpenArtWorld={onOpenArtWorld} />);
    const egg = screen.getByRole("button", { name: "Enter the hidden art world" });

    fireEvent.click(egg);
    act(() => vi.advanceTimersByTime(1_001));
    fireEvent.click(egg);
    expect(onOpenArtWorld).not.toHaveBeenCalled();
    fireEvent.click(egg);
    expect(onOpenArtWorld).toHaveBeenCalledTimes(1);

    fireEvent.click(egg);
    expect(vi.getTimerCount()).toBe(1);
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("leads with company information and opens the founder story as its own page", async () => {
    const user = userEvent.setup();
    render(<CompanySite leaving={false} onOpenArtWorld={vi.fn()} />);

    expect(screen.getByRole("heading", { name: "Technology should help you return to your life." })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Two ideas, one purpose." })).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Tell the story with us." })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Hi, my name is Denzel Rigaud." })).not.toBeInTheDocument();

    const founderStory = screen.getByRole("region", { name: "The story behind Expected End." });
    const missionStory = screen.getByRole("region", { name: "Technology should help you return to your life." });
    expect(founderStory.compareDocumentPosition(missionStory) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

    const storyLink = screen.getByRole("link", { name: "The Founder Story, Denzel Rigaud" });
    expect(storyLink).toHaveAttribute("href", "/denzel-rigaud");
    await user.click(storyLink);
    expect(window.location.pathname).toBe("/denzel-rigaud");
    expect(screen.getByRole("heading", { level: 1, name: "The Mind Behind Expected End" })).toBeInTheDocument();
    expect(screen.getByText("March 3, 2026")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Hi, my name is Denzel Rigaud." })).toBeInTheDocument();
    const founderPortrait = document.querySelector<HTMLImageElement>("img[data-scroll-linked='founder']");
    expect(founderPortrait).toHaveAttribute("src", "/media/denzel-rigaud-founder-hero.png");
    expect(founderPortrait).toHaveAccessibleName("Denzel Rigaud wearing a navy suit and orange-tinted glasses");
    expect(document.querySelector("video[data-scroll-scrub='founder']")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Scroll" })).toHaveAttribute("href", "#memoir");
    expect(screen.queryByText("Scroll to enter the memoir")).not.toBeInTheDocument();

    const hero = founderPortrait?.closest("section");
    expect(hero).not.toBeNull();
    Object.defineProperty(hero, "offsetHeight", { configurable: true, value: 2000 });
    vi.spyOn(hero as HTMLElement, "getBoundingClientRect").mockReturnValue({
      top: -616,
      bottom: 1384,
      left: 0,
      right: 1280,
      width: 1280,
      height: 2000,
      x: 0,
      y: -616,
      toJSON: () => ({}),
    });
    fireEvent.scroll(window);
    expect(hero).toHaveStyle({ "--founder-progress": "0.500" });
    expect(screen.queryByText(/I am a jack of all trades/i)).not.toBeInTheDocument();
    expect(screen.getByText(/I decided to start by hacking my grades/i)).toBeInTheDocument();
    expect(screen.getByText(/Instagram bot farming/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Denzel Rigaud on Instagram" })).toHaveAttribute(
      "href",
      "https://www.instagram.com/smiledenzel/"
    );
    expect(screen.getByRole("link", { name: "Denzel Rigaud on LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/denzel-rigaud-2b0200210/"
    );
    const connectRow = screen.getByRole("navigation", { name: "Follow Denzel Rigaud" });
    expect(within(connectRow).getByRole("link", { name: "Expected End on YouTube" })).toHaveAttribute(
      "href",
      "https://www.youtube.com/@expectedendco"
    );
    expect(within(connectRow).getByRole("link", { name: "Follow Denzel Rigaud on Instagram" })).toHaveAttribute(
      "href",
      "https://www.instagram.com/smiledenzel/"
    );
    expect(within(connectRow).getByRole("link", { name: "Connect with Denzel Rigaud on LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/denzel-rigaud-2b0200210/"
    );
    expect(screen.getByRole("link", { name: "World Athletics profile" })).toHaveAttribute(
      "href",
      "https://worldathletics.org/athletes/united-states/denzel-rigaud-15142195"
    );
    expect(screen.getByRole("link", { name: "Lynn University athlete profile" })).toHaveAttribute(
      "href",
      "https://lynnfightingknights.com/sports/mens-cross-country/roster/denzel-rigaud/7913"
    );
    const brother = screen.getByRole("link", { name: "brother" });
    expect(brother).toHaveAttribute("href", "https://www.linkedin.com/in/kareem-rigaud-2b61b97a");
    expect(brother).toHaveAttribute("target", "_blank");
    expect(brother).toHaveAttribute("rel", expect.stringMatching(/noopener/));
    expect(brother).toHaveAttribute("rel", expect.stringMatching(/noreferrer/));
    expect(screen.getByText(/I filled that empty space with the sin of lust/i)).toBeInTheDocument();
    expect(screen.getByText(/When I did, my life began to prosper\./i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "“The Truth Behind the Code”" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Two" })).toHaveAttribute(
      "href",
      "https://unicourt.com/case/fl-pal-rigaud-denzel-v-hall-aaron-914059"
    );
    expect(screen.getByRole("link", { name: "father" })).toHaveAttribute(
      "href",
      "https://www.google.com/search?q=clifford+rigaud"
    );
    expect(screen.getByRole("link", { name: "chivalry" })).toHaveAttribute(
      "href",
      "https://www.youtube.com/watch?v=SHVKb2j6rfc&list=RDSHVKb2j6rfc&start_radio=1"
    );
    const bloomTaxonomy = screen.getByRole("link", { name: "Bloom’s Taxonomy" });
    const eriksonStages = screen.getByRole("link", { name: "Erikson stages of life" });
    expect(bloomTaxonomy).toHaveAttribute(
      "href",
      "https://www.google.com/search?q=Bloom%E2%80%99s+Taxonomy&rlz=1C5CHFA_enUS943US944&oq=Bloom%E2%80%99s+Taxonomy&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTINCAEQABiRAhiABBiKBTIHCAIQABiABDIHCAMQABiABDIHCAQQABiABDIHCAUQABiABDIHCAYQABiABDIHCAcQABiABDIHCAgQABiABDIHCAkQABiABNIBBzYxM2owajeoAgCwAgA&sourceid=chrome&source=chrome.ob&ie=UTF-8#sv=CAMSVhozKhFpYy1HNmY1Y0hkMnBHTXd3TTIORzZmNWNIZDJwR013d006DlJma0VGQmdwZUNVZzRNIAQqGwoEc3ZpbRIRaWMtRzZmNWNIZDJwR013d00YATABGAcgs57hCA"
    );
    expect(eriksonStages).toHaveAttribute(
      "href",
      "https://www.google.com/search?sca_esv=d99a864848ea4cca&rlz=1C5CHFA_enUS943US944&sxsrf=APpeQnunCsq8WpbDElkjRbmEZUbf8b9yuw:1786282564310&udm=2&fbs=ABfTbFVyMZGZf1hfvX9uKjN_-G8c4u0nXx4bEIpwm1lnNH832SMIiTl3t-JZ4hGJOxPbHYSIu8Q64jU5EwQ-803VaKbd8XGNh2EAGT96nVa30badWZdQJOrgSsOpll5rxyNcIceuSHrD98r42QCy2VpGaYtAW8zKT6mHypPIWJGeeRm7tzF71PjUOVFXsXUiM6lom55kLPulHeTkVQO3xs0VJ3Z6hOEzmQ&q=Erikson+stages+of+life&sa=X&ved=2ahUKEwjy6dqN1ZOWAxUiSzABHXMiOC8QtKgLegQIGRAB&biw=859&bih=872&dpr=2"
    );
    for (const referenceLink of [bloomTaxonomy, eriksonStages]) {
      expect(referenceLink).toHaveAttribute("target", "_blank");
      expect(referenceLink).toHaveAttribute("rel", expect.stringMatching(/noopener/));
      expect(referenceLink).toHaveAttribute("rel", expect.stringMatching(/noreferrer/));
      expect(referenceLink.closest("strong")).toHaveTextContent(referenceLink.textContent ?? "");
    }
    expect(screen.getByText(/Finding God led me to learn more about myself/i)).toBeInTheDocument();
    expect(screen.getByText(/The Water Check belongs to that mission/i)).toBeInTheDocument();
    expect(screen.getByText(/helps you become the most capable version of that person/i)).toBeInTheDocument();
    const memoryArchive = screen.getByRole("region", { name: "Memory archive" });
    expect(within(memoryArchive).getAllByRole("img")).toHaveLength(4);
    const memoryDownloads = within(memoryArchive).getAllByRole("link", { name: /^Download memory /i });
    expect(memoryDownloads).toHaveLength(4);
    expect(new Set(memoryDownloads.map((link) => link.getAttribute("href"))).size).toBe(4);
    for (const download of memoryDownloads) {
      expect(download).toHaveAttribute("download");
    }
    expect(document.title).toBe("Denzel Rigaud — Founder of Expected End");
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute("href", "https://expectedend.co/denzel-rigaud");
    expect(document.querySelector('meta[property="og:image"]')).toHaveAttribute(
      "content",
      "https://expectedend.co/media/denzel-rigaud-founder.png"
    );
    const profileSchema = JSON.parse(document.querySelector('main script[type="application/ld+json"]')?.textContent ?? "{}") as {
      "@type"?: string;
      mainEntity?: {
        sameAs?: string[];
        jobTitle?: string;
        description?: string;
        "@id"?: string;
        image?: { contentUrl?: string; width?: number; height?: number; license?: string };
        memberOf?: { "@id"?: string; name?: string };
        owns?: Array<{ "@id"?: string; name?: string; sameAs?: string[] }>;
      };
    };
    expect(profileSchema["@type"]).toBe("ProfilePage");
    expect(profileSchema.mainEntity?.["@id"]).toBe("https://expectedend.co/denzel-rigaud#person");
    expect(profileSchema.mainEntity?.sameAs).toContain("https://www.wikidata.org/wiki/Q140198525");
    expect(profileSchema.mainEntity?.sameAs).toEqual(
      expect.arrayContaining([
        "https://worldathletics.org/athletes/united-states/denzel-rigaud-15142195",
        "https://lynnfightingknights.com/sports/mens-cross-country/roster/denzel-rigaud/7913",
        "https://github.com/blackdynamitee",
        "https://www.youtube.com/@expectedendco",
      ])
    );
    expect(profileSchema.mainEntity?.image).toMatchObject({
      contentUrl: "https://expectedend.co/media/denzel-rigaud-founder.png",
      width: 1058,
      height: 1487,
      license: "https://creativecommons.org/licenses/by-sa/4.0/",
    });
    expect(profileSchema.mainEntity?.memberOf).toMatchObject({
      "@id": "https://www.wikidata.org/wiki/Q3269570",
      name: "Lynn University",
    });
    expect(profileSchema.mainEntity?.owns?.map((entity) => entity["@id"])).toEqual([
      "https://expectedend.co/#mybiblelens",
      "https://expectedend.co/thewatercheckpage#application",
    ]);
    expect(profileSchema.mainEntity?.owns?.[0]?.sameAs).toEqual(
      expect.arrayContaining([
        "https://www.wikidata.org/wiki/Q141251174",
        "https://apps.apple.com/us/app/mybiblelens/id6764069602",
      ])
    );
    expect(profileSchema.mainEntity?.jobTitle).toBe("Founder and Full-Stack Developer");
    expect(profileSchema.mainEntity?.description).toBe(
      "Denzel Rigaud is the founder and solo full-stack developer behind Expected End, MyBibleLens — the World's First Sanctuary App for Christianity — and The Water Check."
    );

    await user.click(screen.getByRole("button", { name: /Jeremiah 29:11/ }));
    expect(screen.getByRole("dialog", { name: "Jeremiah 29:11" })).toHaveTextContent("to give you an expected end");
    await user.click(screen.getByRole("button", { name: "Close Bible verse" }));
    expect(screen.queryByRole("dialog", { name: "Jeremiah 29:11" })).not.toBeInTheDocument();
  });

  it("keeps legacy founder-story links on the About preview", () => {
    render(<CompanySite leaving={false} onOpenArtWorld={vi.fn()} />);

    act(() => {
      window.history.pushState({}, "", "/about#founder-story");
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    });

    expect(screen.getByRole("link", { name: "The Founder Story, Denzel Rigaud" })).toHaveAttribute("href", "/denzel-rigaud");
    expect(screen.queryByRole("heading", { name: "“The Truth Behind the Code”" })).not.toBeInTheDocument();
  });

  it("opens the press kit from the press introduction", () => {
    const { container } = render(<CompanySite leaving={false} onOpenArtWorld={vi.fn()} />);
    const pressLink = screen.getByRole("link", { name: "Open the press and media kit" });

    expect(container.textContent).not.toContain("↓");
    expect(pressLink).toHaveAttribute("href", "/press");
    expect(pressLink.querySelector('svg[data-action-icon="down"]')).toBeInTheDocument();
  });

  it.each(["/", "/about"])("does not show the egg on %s", (path) => {
    window.history.replaceState({}, "", path);
    render(<CompanySite leaving={false} onOpenArtWorld={vi.fn()} />);
    expect(screen.queryByRole("button", { name: "Enter the hidden art world" })).not.toBeInTheDocument();
  });
});

const withinEgg = (button: HTMLElement) => {
  const image = button.querySelector("img");
  if (!image) throw new Error("Golden egg image missing");
  return image;
};
