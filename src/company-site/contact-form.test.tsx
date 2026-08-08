import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ContactForm } from "./contact-form";

describe("Expected End contact composer", () => {
  afterEach(() => vi.restoreAllMocks());

  it("requires structured context and prepares an email without displaying the private inbox", async () => {
    const user = userEvent.setup();
    let preparedHref = "";
    vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(function capturePreparedEmail(this: HTMLAnchorElement) {
      preparedHref = this.href;
    });
    window.history.replaceState({}, "", "/about?utm_source=instagram&token=do-not-forward#contact");

    const { container } = render(<ContactForm />);

    expect(screen.queryByText("expectedendai@gmail.com")).not.toBeInTheDocument();
    expect(container.textContent).not.toContain("↗");
    expect(screen.getByRole("button", { name: /Prepare email/ }).querySelector("svg[data-action-icon]")).toBeInTheDocument();
    await user.type(screen.getByLabelText("Your name"), "A Visitor");
    await user.type(screen.getByLabelText("Your email"), "visitor@example.com");
    await user.selectOptions(screen.getByLabelText("What is this about?"), "Building an app or software idea");
    await user.selectOptions(screen.getByLabelText("Which project?"), "Expected End");
    const priceRange = screen.getByLabelText("Price range");
    expect(priceRange).toBeRequired();
    expect(screen.getAllByRole("option", { name: /\$/ }).map((option) => option.textContent)).toEqual([
      "$100-$1,000",
      "$1,000-$2,000",
      "$2,000-$10,000",
      "$10,000-$50,000",
      "$50,000-$500,000+",
    ]);
    await user.selectOptions(priceRange, "$2,000-$10,000");
    await user.selectOptions(screen.getByLabelText("Ideal timeline"), "Within three months");
    await user.selectOptions(screen.getByLabelText("How did you find us?"), "Instagram");
    const message = screen.getByLabelText("Tell us what you have in mind");
    await user.clear(message);
    await user.type(message, "I need a client portal. An NDA may be needed.");
    await user.click(screen.getByRole("button", { name: /Prepare email/ }));

    const preparedEmail = decodeURIComponent(preparedHref);
    expect(preparedEmail).toContain("mailto:info@expectedend.co");
    expect(preparedEmail).toContain("Expected End inquiry — Building an app or software idea");
    expect(preparedEmail).toContain("Reply email: visitor@example.com");
    expect(preparedEmail).toContain("Price range: $2,000-$10,000");
    expect(preparedEmail).toContain("Found Expected End through: Instagram");
    expect(preparedEmail).toContain("I need a client portal. An NDA may be needed.");
    expect(preparedEmail).toContain("utm_source=instagram");
    expect(preparedEmail).not.toContain("do-not-forward");
  });
});
