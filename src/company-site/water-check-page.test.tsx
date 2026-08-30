import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { WaterCheckPage } from "./water-check-page";

describe("WaterCheckPage", () => {
  it("shows the default estimate and its medical context", () => {
    render(<WaterCheckPage />);

    expect(screen.getByRole("heading", { level: 1, name: "Ditch the influencers. Learn your actual baseline." })).toBeInTheDocument();
    expect(screen.getByLabelText("Weight (lbs)")).toHaveValue("160");
    expect(screen.getByLabelText("Daily Activity (minutes)")).toHaveValue("30");
    expect(screen.getByText("Your Daily Goal: 92 Ounces")).toBeInTheDocument();
    expect(screen.getByText(/general estimate for adults, not a medical prescription/i)).toBeInTheDocument();
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
    expect(container.querySelector("iframe")).not.toBeInTheDocument();
    expect(container.querySelector("[data-water-decoration]")).toHaveAttribute("aria-hidden", "true");
  });
});
