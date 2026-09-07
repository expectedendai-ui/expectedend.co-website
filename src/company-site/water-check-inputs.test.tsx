import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CompanySite } from ".";
import { WaterCheckPage } from "./water-check-page";

describe("Water Check footer", () => {
  it("replaces the company footer with a neutral Water Check footer on this page only", () => {
    vi.stubGlobal("scrollTo", vi.fn());
    window.history.replaceState({}, "", "/thewatercheckpage");
    render(<CompanySite leaving={false} onOpenArtWorld={vi.fn()} />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveAttribute("data-water-check-footer");
    const nav = within(footer).getByRole("navigation", { name: "Footer navigation" });
    expect(within(nav).getByRole("link", { name: "Hydration calculator" })).toHaveAttribute("href", "#calculator");
    expect(within(nav).getByRole("link", { name: "@thewatercheck on Instagram" })).toHaveAttribute(
      "href",
      "https://www.instagram.com/thewatercheck/"
    );
    expect(within(nav).getByRole("link", { name: "The store" })).toHaveAttribute("href", "/thewatercheckstore");
    expect(within(nav).getByRole("link", { name: "Privacy Statement" })).toHaveAttribute("href", "/privacy");
    expect(within(footer).getByRole("link", { name: "Expected End LLC" })).toHaveAttribute("href", "/");
    // The account is for everyone: no verse, no blessing, no company mission on this page.
    expect(within(footer).queryByText(/Jeremiah/)).not.toBeInTheDocument();
    expect(within(footer).queryByText(/Jesus loves you/)).not.toBeInTheDocument();
    expect([...footer.querySelectorAll("a")].every((link) => link.getAttribute("href") !== "#")).toBe(true);
  });
});

// Regression: the number boxes used to clamp on every keystroke, so clearing the age snapped to 18,
// typing "22" on top became 1822 then 100, and typing "6" after "5" in feet became 56 then 8.
describe("Water Check number inputs", () => {
  const goal = () => screen.getByText(/Your Daily Goal/).textContent ?? "";

  it("lets you clear the age and type a new one", async () => {
    const user = userEvent.setup();
    render(<WaterCheckPage />);
    const age = screen.getByLabelText("Age") as HTMLInputElement;
    await user.clear(age);
    expect(age.value).toBe("");
    await user.type(age, "22");
    expect(age.value).toBe("22");
    await user.tab();
    expect(age.value).toBe("22");
  });

  it("lets you replace the height feet with 6 and the inches with 0", async () => {
    const user = userEvent.setup();
    render(<WaterCheckPage />);
    const feet = screen.getByLabelText("Height (ft)") as HTMLInputElement;
    const inches = screen.getByLabelText("Height (in)") as HTMLInputElement;
    const before = goal();
    await user.clear(feet);
    await user.type(feet, "6");
    await user.tab();
    expect(feet.value).toBe("6");
    await user.clear(inches);
    await user.type(inches, "0");
    await user.tab();
    expect(inches.value).toBe("0");
    expect(feet.value).toBe("6");
    // 160 lb at 6 ft is a lower BMI than at 5 ft 10, so the height correction is still zero and the goal is unchanged.
    expect(goal()).toBe(before);
  });

  it("only clamps out-of-range values when you leave the field", async () => {
    const user = userEvent.setup();
    render(<WaterCheckPage />);
    const age = screen.getByLabelText("Age") as HTMLInputElement;
    await user.clear(age);
    await user.type(age, "250");
    expect(age.value).toBe("250");
    await user.tab();
    expect(age.value).toBe("100");
    const feet = screen.getByLabelText("Height (ft)") as HTMLInputElement;
    await user.clear(feet);
    await user.type(feet, "12");
    await user.tab();
    expect(feet.value).toBe("8");
  });

  it("restores the previous value if you leave the field empty", async () => {
    const user = userEvent.setup();
    render(<WaterCheckPage />);
    const age = screen.getByLabelText("Age") as HTMLInputElement;
    await user.clear(age);
    await user.tab();
    expect(age.value).toBe("35");
  });

  it("keeps the calculation live while a valid number is typed", async () => {
    const user = userEvent.setup();
    render(<WaterCheckPage />);
    const before = goal();
    const weight = screen.getByLabelText("Weight (lbs)") as HTMLInputElement;
    // 200 lb at 5 ft 10 is above the BMI threshold, so the goal changes through the height correction.
    fireEvent.change(weight, { target: { value: "200" } });
    expect(goal()).not.toBe(before);
    const feet = screen.getByLabelText("Height (ft)") as HTMLInputElement;
    const atFiveTen = goal();
    await user.clear(feet);
    await user.type(feet, "6");
    // Still focused, but 6 is valid, so the goal already moved.
    expect(goal()).not.toBe(atFiveTen);
  });
});
