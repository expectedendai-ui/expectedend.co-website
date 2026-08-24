import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CompanySite } from ".";

describe("Expected End About page", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/about");
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("keeps the egg invisible-sized and requires two pointer or keyboard activations", async () => {
    const user = userEvent.setup();
    const onOpenArtWorld = vi.fn();
    render(<CompanySite leaving={false} onOpenArtWorld={onOpenArtWorld} />);

    expect(screen.getByRole("heading", { level: 1, name: "Technology with purpose, built for real life." })).toBeInTheDocument();
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

  it("leads with company information and expands the founder story in place", async () => {
    const user = userEvent.setup();
    render(<CompanySite leaving={false} onOpenArtWorld={vi.fn()} />);

    expect(screen.getByRole("heading", { name: "Technology should help you return to your life." })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Two ideas, one purpose." })).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Tell the story with us." })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Hi, my name is Denzel Rigaud." })).not.toBeInTheDocument();

    const storyToggle = screen.getByRole("button", { name: "The Founder Story" });
    expect(storyToggle).toHaveAttribute("aria-expanded", "false");
    await user.click(storyToggle);
    expect(screen.getByRole("heading", { name: "Hi, my name is Denzel Rigaud." })).toBeInTheDocument();
    expect(screen.queryByText(/I am a jack of all trades/i)).not.toBeInTheDocument();
    expect(screen.getByText(/I decided to start by hacking my grades/i)).toBeInTheDocument();
    expect(screen.getByText(/Instagram bot farming/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Denzel Rigaud on Instagram" })).toHaveAttribute("href", "https://www.instagram.com/smiledenzel/");
    expect(screen.getByRole("link", { name: "Denzel Rigaud on LinkedIn" })).toHaveAttribute("href", "https://www.linkedin.com/feed/");
    const brother = screen.getByRole("link", { name: "brother" });
    expect(brother).toHaveAttribute("href", "https://www.linkedin.com/in/kareem-rigaud-2b61b97a");
    expect(brother).toHaveAttribute("target", "_blank");
    expect(brother).toHaveAttribute("rel", expect.stringMatching(/noopener/));
    expect(brother).toHaveAttribute("rel", expect.stringMatching(/noreferrer/));
    expect(screen.getByText(/I filled that empty space with the sin of lust/i)).toBeInTheDocument();
    expect(screen.getByText(/I’ve been up ever since\. WOOAH\./i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "“The Truth Behind the Code”" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Two" })).toHaveAttribute("href", "https://unicourt.com/case/fl-pal-rigaud-denzel-v-hall-aaron-914059");
    expect(screen.getByRole("link", { name: "father" })).toHaveAttribute("href", "https://www.google.com/search?q=clifford+rigaud");
    expect(screen.getByRole("link", { name: "chivalry" })).toHaveAttribute("href", "https://www.youtube.com/watch?v=SHVKb2j6rfc&list=RDSHVKb2j6rfc&start_radio=1");
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
    expect(screen.getByRole("button", { name: "Close Founder Story" })).toHaveAttribute("aria-expanded", "true");

    await user.click(screen.getByRole("button", { name: /Jeremiah 29:11/ }));
    expect(screen.getByRole("dialog", { name: "Jeremiah 29:11" })).toHaveTextContent("to give you an expected end");
    await user.click(screen.getByRole("button", { name: "Close Bible verse" }));
    expect(screen.queryByRole("dialog", { name: "Jeremiah 29:11" })).not.toBeInTheDocument();
  });

  it("opens the founder story when linked from MyBibleLens", () => {
    render(<CompanySite leaving={false} onOpenArtWorld={vi.fn()} />);

    act(() => {
      window.history.pushState({}, "", "/about#founder-story");
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    });

    expect(screen.getByRole("button", { name: "Close Founder Story" })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("heading", { name: "“The Truth Behind the Code”" })).toBeInTheDocument();
  });

  it("uses a vector arrow for the press inquiry action", () => {
    const { container } = render(<CompanySite leaving={false} onOpenArtWorld={vi.fn()} />);
    const pressLink = screen.getByRole("link", { name: "Start a press inquiry" });

    expect(container.textContent).not.toContain("↓");
    expect(pressLink.querySelector('svg[data-action-icon="down"]')).toBeInTheDocument();
  });

  it("does not show the egg on the homepage", () => {
    window.history.replaceState({}, "", "/");
    render(<CompanySite leaving={false} onOpenArtWorld={vi.fn()} />);
    expect(screen.queryByRole("button", { name: "Enter the hidden art world" })).not.toBeInTheDocument();
  });
});

const withinEgg = (button: HTMLElement) => {
  const image = button.querySelector("img");
  if (!image) throw new Error("Golden egg image missing");
  return image;
};
