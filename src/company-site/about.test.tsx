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
