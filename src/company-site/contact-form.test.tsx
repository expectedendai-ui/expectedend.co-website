import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ContactForm } from "./contact-form";

describe("Expected End contact form", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("submits the complete inquiry to the secure contact endpoint", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    window.history.replaceState({}, "", "/about?utm_source=instagram&token=do-not-forward#contact");

    const { container } = render(<ContactForm />);

    expect(container.textContent).not.toContain("↗");
    expect(screen.getByRole("button", { name: /Send inquiry/ }).querySelector("svg[data-action-icon]")).toBeInTheDocument();
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
    await user.click(screen.getByRole("button", { name: /Send inquiry/ }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(fetchMock).toHaveBeenCalledWith("/api/contact", expect.objectContaining({ method: "POST" }));
    const request = fetchMock.mock.calls[0][1] as RequestInit;
    expect(request.headers).toEqual({ "Content-Type": "application/json" });
    expect(JSON.parse(request.body as string)).toEqual({
      name: "A Visitor",
      replyEmail: "visitor@example.com",
      project: "Expected End",
      reason: "Building an app or software idea",
      priceRange: "$2,000-$10,000",
      timeline: "Within three months",
      discovery: "Instagram",
      message: "I need a client portal. An NDA may be needed.",
      source: "http://localhost:3000/about?utm_source=instagram#contact",
    });
    expect(await screen.findByText("Thanks — your inquiry has been sent.")).toBeInTheDocument();
  });

  it("keeps the inquiry on screen when delivery fails", async () => {
    const user = userEvent.setup();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    const { container } = render(<ContactForm />);

    await user.type(screen.getByLabelText("Your name"), "A Visitor");
    await user.type(screen.getByLabelText("Your email"), "visitor@example.com");
    await user.selectOptions(screen.getByLabelText("What is this about?"), "Building an app or software idea");
    await user.selectOptions(screen.getByLabelText("Which project?"), "Expected End");
    await user.selectOptions(screen.getByLabelText("Price range"), "$2,000-$10,000");
    await user.selectOptions(screen.getByLabelText("Ideal timeline"), "Within three months");
    await user.selectOptions(screen.getByLabelText("How did you find us?"), "Instagram");
    const message = screen.getByLabelText("Tell us what you have in mind");
    await user.clear(message);
    await user.type(message, "I need a client portal.");
    await user.click(screen.getByRole("button", { name: /Send inquiry/ }));

    expect(await screen.findByText("We couldn’t send your inquiry. Please try again shortly.")).toBeInTheDocument();
    expect(container.querySelector("textarea")).toHaveValue("I need a client portal.");
  });
});
