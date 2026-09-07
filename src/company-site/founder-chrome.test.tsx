import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CompanySite } from ".";

describe("Founder page chrome", () => {
  it("swaps in the dark story nav and the personal footer on /denzel-rigaud only", () => {
    vi.stubGlobal("scrollTo", vi.fn());
    window.history.replaceState({}, "", "/denzel-rigaud");
    render(<CompanySite leaving={false} onOpenArtWorld={vi.fn()} />);

    const nav = screen.getByRole("navigation", { name: "Main navigation" });
    expect(nav).toHaveAttribute("data-founder-nav");
    expect(within(nav).getByRole("link", { name: "Denzel Rigaud" })).toHaveAttribute("href", "/denzel-rigaud");
    expect(within(nav).getByRole("link", { name: "Story" })).toHaveAttribute("href", "#memoir");
    expect(within(nav).getByRole("link", { name: "Water Check" })).toHaveAttribute("href", "/thewatercheckpage");
    expect(within(nav).getByRole("link", { name: "Contact" })).toHaveAttribute("href", "#channel-title");
    expect(document.getElementById("memoir")).not.toBeNull();
    expect(document.getElementById("channel-title")).not.toBeNull();

    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveAttribute("data-founder-footer");
    const links = within(footer).getByRole("navigation", { name: "Footer navigation" });
    expect(within(links).getByRole("link", { name: "MyBibleLens" })).toHaveAttribute("href", "https://mybiblelens.us/");
    expect(within(links).getByRole("link", { name: "Instagram" })).toHaveAttribute("href", "https://www.instagram.com/smiledenzel/");
    expect(within(links).getByRole("link", { name: "Privacy Statement" })).toHaveAttribute("href", "/privacy");
    expect(within(footer).getByText("Jesus loves you.")).toBeInTheDocument();
    expect(within(footer).getByRole("button", { name: "Enter the hidden art world" })).toBeInTheDocument();
    expect(within(footer).queryByText(/Jeremiah/)).not.toBeInTheDocument();
    expect([...footer.querySelectorAll("a")].every((link) => link.getAttribute("href") !== "#")).toBe(true);
  });

  it("keeps the company nav and footer everywhere else", () => {
    vi.stubGlobal("scrollTo", vi.fn());
    window.history.replaceState({}, "", "/about");
    render(<CompanySite leaving={false} onOpenArtWorld={vi.fn()} />);
    expect(screen.getByRole("navigation", { name: "Main navigation" })).not.toHaveAttribute("data-founder-nav");
    expect(screen.getByRole("contentinfo")).not.toHaveAttribute("data-founder-footer");
    expect(screen.getByRole("link", { name: "Expected End LLC" })).toBeInTheDocument();
  });
});
