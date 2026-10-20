import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CompanySite } from ".";

describe("Expected End information pages", () => {
  it.each([
    ["/terms", "Website Terms of Use"],
    ["/privacy", "Privacy Statement"],
    ["/thewatercheck/privacy", "The Water Check Privacy Notice"],
    ["/thewatercheck/terms", "The Water Check Terms of Use"],
    ["/thewatercheck/consumer-health-data", "Consumer Health Data Privacy Policy"],
    ["/thewatercheck/delete-account", "Delete your account"],
    ["/accessibility", "Accessibility"],
  ])("renders %s as a direct route", (path, heading) => {
    window.history.replaceState({}, "", path);
    render(<CompanySite leaving={false} onOpenArtWorld={vi.fn()} />);
    expect(screen.getByRole("heading", { level: 1, name: heading })).toBeInTheDocument();
    if (path.startsWith("/thewatercheck/")) {
      expect(screen.getByRole("link", { name: "The Water Check" })).toHaveAttribute("href", "/thewatercheckpage");
    } else {
      expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    }
  });

  it("never ships dead footer destinations", () => {
    window.history.replaceState({}, "", "/");
    render(<CompanySite leaving={false} onOpenArtWorld={vi.fn()} />);
    const links = screen.getByRole("contentinfo").querySelectorAll("a");
    expect([...links].every((link) => link.getAttribute("href") !== "#")).toBe(true);
  });

  it("shows the current privacy statement effective date", () => {
    window.history.replaceState({}, "", "/privacy");
    render(<CompanySite leaving={false} onOpenArtWorld={vi.fn()} />);
    expect(screen.getByText("Effective August 30, 2026")).toBeInTheDocument();
  });

  it("identifies the app privacy contact and Google data use", () => {
    window.history.replaceState({}, "", "/thewatercheck/privacy");
    render(<CompanySite leaving={false} onOpenArtWorld={vi.fn()} />);
    expect(screen.getByText(/We do not request access to your Gmail, contacts, Drive files/)).toBeInTheDocument();
    expect(screen.getByText(/expectedendai@gmail.com with “The Water Check privacy request”/)).toBeInTheDocument();
  });
});
