import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { WaterCheckPage } from "./water-check-page";

describe("WaterCheckPage", () => {
  it("shows the default estimate and its medical context", () => {
    render(<WaterCheckPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Ditch the influencers. Learn your actual baseline." })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Weight (lbs)")).toHaveValue("160");
    expect(screen.getByLabelText("Daily Activity (minutes)")).toHaveValue("30");
    expect(screen.getByText("Your Daily Goal: 92 Ounces")).toBeInTheDocument();
    expect(screen.getByText(/educational planning estimate for adults/i)).toBeInTheDocument();
  });

  it("updates the estimate at fractional and boundary values", () => {
    render(<WaterCheckPage />);
    const weight = screen.getByLabelText("Weight (lbs)");
    const activity = screen.getByLabelText("Daily Activity (minutes)");

    fireEvent.change(weight, { target: { value: "81" } });
    fireEvent.change(activity, { target: { value: "0" } });
    expect(screen.getByText("Your Daily Goal: 40.5 Ounces")).toBeInTheDocument();

    fireEvent.change(weight, { target: { value: "300" } });
    fireEvent.change(activity, { target: { value: "120" } });
    expect(screen.getByText("Your Daily Goal: 198 Ounces")).toBeInTheDocument();

    fireEvent.change(weight, { target: { value: "80" } });
    expect(screen.getByText("Your Daily Goal: 88 Ounces")).toBeInTheDocument();
  });

  it("switches between pounds and kilograms without changing the underlying estimate", async () => {
    const user = userEvent.setup();
    render(<WaterCheckPage />);

    expect(screen.getByRole("radio", { name: "Pounds (lb)" })).toBeChecked();
    await user.click(screen.getByRole("radio", { name: "Kilograms (kg)" }));

    expect(screen.getByLabelText("Weight (kg)")).toHaveValue("72.6");
    expect(screen.getByText("Your Daily Goal: 92 Ounces")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Weight (kg)"), { target: { value: "80" } });
    expect(screen.getByText("Your Daily Goal: 100.2 Ounces")).toBeInTheDocument();
  });

  it("applies transparent pregnancy and breastfeeding adjustments", async () => {
    const user = userEvent.setup();
    render(<WaterCheckPage />);
    const lifeStage = screen.getByLabelText("Life stage");

    await user.selectOptions(lifeStage, "pregnant");
    expect(screen.getByText("Your Daily Goal: 102 Ounces")).toBeInTheDocument();
    expect(screen.getByText("Pregnancy adjustment")).toBeInTheDocument();
    expect(screen.getByText("+10 oz")).toBeInTheDocument();

    await user.selectOptions(lifeStage, "breastfeeding");
    expect(screen.getByText("Your Daily Goal: 116 Ounces")).toBeInTheDocument();
    expect(screen.getByText("Breastfeeding adjustment")).toBeInTheDocument();
    expect(screen.getByText("+24 oz")).toBeInTheDocument();
  });

  it("uses cycle, age, and heat inputs as evidence notes without fake-precision adjustments", async () => {
    const user = userEvent.setup();
    render(<WaterCheckPage />);

    await user.clear(screen.getByLabelText("Age"));
    await user.type(screen.getByLabelText("Age"), "48");
    await user.click(screen.getByLabelText("Week before your period"));
    await user.click(screen.getByLabelText("Hot or humid conditions"));

    expect(screen.getByText("Your Daily Goal: 92 Ounces")).toBeInTheDocument();
    expect(screen.getByText("Luteal phase guidance")).toBeInTheDocument();
    expect(screen.getByText("No fixed +oz")).toBeInTheDocument();
    expect(
      screen.getByText(/cycle-related fluid shifts are real, but studies do not establish a universal fixed-ounce increase/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/age alone does not determine menopause status/i)).toBeInTheDocument();
    expect(screen.getByText(/about 8 ounces every 15–20 minutes/i)).toBeInTheDocument();
  });

  it("places emotional relief and overhydration safety directly after the result", () => {
    render(<WaterCheckPage />);
    const result = screen.getByText("Your Daily Goal: 92 Ounces");
    const grace = screen.getByRole("heading", { level: 2, name: "A Quick Note on Giving Yourself Grace" });
    const warning = screen.getByRole("heading", { level: 3, name: "The Danger of Forced Hydration" });

    expect(result.compareDocumentPosition(grace) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(grace.compareDocumentPosition(warning) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getByText(/drinking faster than you lose fluid can dilute blood sodium/i)).toBeInTheDocument();
    expect(screen.queryByText(/flushing out essential water-soluble vitamins/i)).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "NIH exercise-associated hyponatremia guidance" })).toBeInTheDocument();
  });

  it("shows a food-first electrolyte reminder and Denzel's anti-influencer philosophy", () => {
    render(<WaterCheckPage />);

    expect(screen.getByText("Electrolyte check")).toBeInTheDocument();
    expect(screen.getByText("Food usually covers it")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Why I Built This (And Why You Shouldn't Just Listen To Me)" })
    ).toBeInTheDocument();
    expect(screen.getByText(/more than nine years running the 400 meters and hurdles/i)).toBeInTheDocument();
    expect(screen.getByText(/closer to yourself and to God/i)).toBeInTheDocument();
  });

  it("keeps calculator values ephemeral when remounted", () => {
    const localStorageSpy = vi.spyOn(Storage.prototype, "setItem");
    const startingUrl = window.location.href;
    const { unmount } = render(<WaterCheckPage />);

    fireEvent.change(screen.getByLabelText("Weight (lbs)"), { target: { value: "205" } });
    fireEvent.change(screen.getByLabelText("Daily Activity (minutes)"), { target: { value: "75" } });
    expect(screen.getByText("Your Daily Goal: 132.5 Ounces")).toBeInTheDocument();
    expect(window.location.href).toBe(startingUrl);
    expect(localStorageSpy).not.toHaveBeenCalled();

    unmount();
    render(<WaterCheckPage />);
    expect(screen.getByLabelText("Weight (lbs)")).toHaveValue("160");
    expect(screen.getByLabelText("Daily Activity (minutes)")).toHaveValue("30");
    expect(screen.getByLabelText("Age")).toHaveValue(35);
    expect(screen.getByLabelText("Life stage")).toHaveValue("standard");
  });

  it("exposes native controls, safe external navigation, and non-interactive placeholders", async () => {
    const user = userEvent.setup();
    const { container } = render(<WaterCheckPage />);
    const weight = screen.getByLabelText("Weight (lbs)");

    await user.click(weight);
    expect(weight).toHaveFocus();
    expect(weight).toHaveAttribute("type", "range");
    expect(weight).toHaveAttribute("min", "80");
    expect(weight).toHaveAttribute("max", "300");
    expect(screen.getAllByText("Instagram Reel coming soon")).toHaveLength(3);

    const instagram = screen.getByRole("link", { name: /follow @thewatercheck on instagram/i });
    expect(instagram).toHaveAttribute("href", "https://www.instagram.com/thewatercheck/");
    expect(instagram).toHaveAttribute("target", "_blank");
    expect(instagram).toHaveAttribute("rel", "noopener noreferrer");
    expect(instagram).toHaveAttribute("data-instagram-button");
    expect(instagram.querySelector(".waterCheckInstagramIcon svg")).toHaveAttribute("viewBox", "0 0 448 512");
    expect(instagram.querySelector(".waterCheckInstagramGradient")).toBeInTheDocument();
    expect(container.querySelector("iframe")).not.toBeInTheDocument();
    expect(container.querySelector("[data-water-decoration]")).toHaveAttribute("aria-hidden", "true");
  });

  it("uses the stable store-style liquid bubble without an SVG displacement filter", () => {
    const { container } = render(<WaterCheckPage />);
    const logoLink = screen.getByRole("link", { name: "Use the Water Check calculator" });

    expect(logoLink).toHaveAttribute("href", "#calculator");
    expect(logoLink).toHaveAttribute("data-water-logo-orb");
    expect(logoLink.querySelector("img")).toHaveAttribute("src", "/brand/watercheck-store/c-mark-magic-eraser.png");
    expect(container.querySelector("[data-water-field]")).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelector("#water-check-liquid-distortion")).not.toBeInTheDocument();
    expect(container.querySelector(".waterCheckLogoSheen")).not.toBeInTheDocument();
  });
});
