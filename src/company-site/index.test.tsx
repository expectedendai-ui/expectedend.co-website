import { act, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CompanySite } from ".";

describe("Expected End public site", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/");
    window.localStorage.clear();
    vi.stubGlobal("scrollTo", vi.fn());
  });

  it("renders the approved mission and compact project destinations", () => {
    const { container } = render(<CompanySite leaving={false} onOpenArtWorld={vi.fn()} />);

    expect(screen.getByRole("heading", { level: 1, name: "Purpose, built beautifully." })).toBeInTheDocument();
    const heroVideo = container.querySelector("video");
    expect(heroVideo).toHaveAttribute("aria-hidden", "true");
    expect(heroVideo).toHaveAttribute("autoplay");
    expect(heroVideo).toHaveAttribute("loop");
    expect(heroVideo).toHaveProperty("muted", true);
    expect(heroVideo).toHaveAttribute("playsinline");
    expect(heroVideo).toHaveAttribute("poster", "/media/expected-end-hero-poster.jpg");
    expect(heroVideo?.querySelector('source[type="video/webm"]')).toHaveAttribute("src", "/media/expected-end-hero.webm");
    expect(heroVideo?.querySelector('source[type="video/mp4"]')).toHaveAttribute("src", "/media/expected-end-hero.mp4");
    const approvedMission = "We create thoughtful software, productivity tools, digital experiences, and communities that bring people closer to God in exciting and easy ways!";
    expect(screen.getByText((_, element) => element?.tagName === "P" && element.textContent === approvedMission)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Visit MyBibleLens" })).toHaveAttribute("href", "https://mybiblelens.us/");
    expect(screen.getByRole("link", { name: "Bio for MyBibleLens" })).toHaveAttribute(
      "href",
      "https://mybiblelens.us/legal.html#about"
    );
    const waterCheckArtwork = screen.getByRole("link", { name: "Visit The Water Check" });
    expect(waterCheckArtwork).toHaveAttribute("href", "/thewatercheckpage");
    expect(waterCheckArtwork).not.toHaveAttribute("target");
    expect(waterCheckArtwork).not.toHaveAttribute("rel");

    const waterCheckAction = screen.getByRole("link", { name: "Check your baseline" });
    expect(waterCheckAction).toHaveAttribute("href", "/thewatercheckpage");
    expect(waterCheckAction).not.toHaveAttribute("target");
    expect(waterCheckAction).not.toHaveAttribute("rel");
    expect(screen.getByRole("button", { name: "Bio for The Water Check" })).toBeInTheDocument();

    const myBibleLensArtwork = screen.getByRole("link", { name: "Visit MyBibleLens" });
    expect(myBibleLensArtwork).toHaveAttribute("target", "_blank");
    expect(myBibleLensArtwork).toHaveAttribute("rel", "noreferrer");
    expect(screen.getByRole("link", { name: "Visit app" })).toHaveAttribute("target", "_blank");
    expect(screen.getAllByRole("link", { name: "Enter store" })).toHaveLength(2);
    expect(screen.getAllByText("Store · Coming soon")).toHaveLength(2);
    const myBibleLensStoreArtwork = screen.getByRole("link", { name: "Visit MyBibleLens Store" });
    expect(myBibleLensStoreArtwork.querySelector("[data-store-collage='mybiblelens']")).toBeInTheDocument();
    expect(myBibleLensStoreArtwork.querySelectorAll("img")).toHaveLength(4);
    expect(myBibleLensStoreArtwork.querySelectorAll("[data-merch-sticker]")).toHaveLength(2);
    const waterCheckStoreArtwork = screen.getByRole("link", { name: "Visit The Water Check Store" });
    expect(waterCheckStoreArtwork.querySelector("[data-store-collage='watercheck']")).toBeInTheDocument();
    expect(waterCheckStoreArtwork.querySelector("[data-water-orb]")).toBeInTheDocument();
    expect(waterCheckStoreArtwork.querySelectorAll("[data-water-apparel]")).toHaveLength(2);
    expect(waterCheckStoreArtwork.querySelector("img")).toHaveAttribute("src", "/brand/watercheck-store/c-mark-magic-eraser.png");
    expect(waterCheckStoreArtwork.querySelector("[data-faith-mark]")).not.toBeInTheDocument();
    expect(screen.getByText(/Everything I build under this company points toward the same mission/i)).toBeInTheDocument();
    expect(screen.queryByText("JARVIS")).not.toBeInTheDocument();
    expect(screen.queryByText("THE MENU")).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Ideas can feel meaningful and easy to enter." })).not.toBeInTheDocument();
  });

  it("does not intercept modified clicks on project destinations", () => {
    render(<CompanySite leaving={false} onOpenArtWorld={vi.fn()} />);
    const stopJSDOMNavigation = (event: MouseEvent) => event.preventDefault();
    window.addEventListener("click", stopJSDOMNavigation);

    fireEvent.click(screen.getByRole("link", { name: "Check your baseline" }), {
      ctrlKey: true,
    });
    fireEvent.click(screen.getByRole("link", { name: "Visit app" }), {
      ctrlKey: true,
    });
    window.removeEventListener("click", stopJSDOMNavigation);

    expect(window.location.pathname).toBe("/");
  });

  it("opens the Water Check page from its internal homepage card", async () => {
    const user = userEvent.setup();
    render(<CompanySite leaving={false} onOpenArtWorld={vi.fn()} />);

    await user.click(screen.getByRole("link", { name: "Visit The Water Check" }));
    expect(window.location.pathname).toBe("/thewatercheckpage");
    expect(screen.getByRole("heading", { level: 1, name: "Ditch the influencers. Learn your actual baseline." })).toBeInTheDocument();
  });

  it("opens the Water Check bio dialog and restores focus when it closes", async () => {
    const user = userEvent.setup();
    render(<CompanySite leaving={false} onOpenArtWorld={vi.fn()} />);
    const bioButton = screen.getByRole("button", { name: "Bio for The Water Check" });

    await user.click(bioButton);
    const dialog = screen.getByRole("dialog", { name: "What happened to @thewatercheck?" });
    expect(within(dialog).getByText("200,000 followers")).toBeInTheDocument();

    await user.click(within(dialog).getByRole("button", { name: "Close bio" }));
    expect(screen.queryByRole("dialog", { name: "What happened to @thewatercheck?" })).not.toBeInTheDocument();
    expect(bioButton).toHaveFocus();
  });

  it("uses vector action arrows instead of platform-dependent arrow characters", () => {
    const { container } = render(<CompanySite leaving={false} onOpenArtWorld={vi.fn()} />);

    expect(container.textContent).not.toMatch(/[↗↓]/);
    const actionIcons = container.querySelectorAll("svg[data-action-icon]");
    expect(actionIcons).toHaveLength(5);
    actionIcons.forEach((icon) => {
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon).toHaveAttribute("focusable", "false");
    });
  });

  it("opens each branded store internally with launch-ready coming-soon products", async () => {
    const user = userEvent.setup();
    render(<CompanySite leaving={false} onOpenArtWorld={vi.fn()} />);

    await user.click(screen.getAllByRole("link", { name: "Enter store" })[0]);
    expect(window.location.pathname).toBe("/mybiblelensstore");
    expect(screen.getByRole("heading", { level: 1, name: "MyBibleLens" })).toBeInTheDocument();
    const myBibleLensStoreArt = screen.getByRole("img", { name: "MyBibleLens store logo and sticker collage" });
    expect(myBibleLensStoreArt.querySelector("[data-flip-logo]")).toBeInTheDocument();
    expect(myBibleLensStoreArt.querySelectorAll("[data-store-sticker]")).toHaveLength(5);
    expect(screen.getByRole("button", { name: "The Daily Bread Journal coming soon" })).toBeDisabled();

    await user.click(screen.getByRole("link", { name: "Expected End" }));
    await user.click(screen.getAllByRole("link", { name: "Enter store" })[1]);
    expect(window.location.pathname).toBe("/thewatercheckstore");
    expect(screen.getByRole("heading", { level: 1, name: "The Water Check" })).toBeInTheDocument();
    expect(document.querySelector("[data-water-intro]")).toBeInTheDocument();
    const waterCheckStoreLogo = screen.getByRole("img", { name: "The Water Check liquid logo bubble" });
    expect(waterCheckStoreLogo.querySelector("img")).toHaveAttribute(
      "src",
      "/brand/watercheck-store/c-mark-magic-eraser.png",
    );
    expect(screen.getByRole("button", { name: "Refill Hoodie coming soon" })).toBeDisabled();
  });

  it("renders the complete approved service lineup and concise inquiry guidance", () => {
    render(<CompanySite leaving={false} onOpenArtWorld={vi.fn()} />);

    const servicesHeading = screen.getByRole("heading", { level: 2, name: "You dream it — we build it" });
    const servicesSection = servicesHeading.closest("section");
    expect(servicesSection).not.toBeNull();
    expect(within(servicesSection as HTMLElement).getAllByText(/^0[1-8]$/).map((number) => number.textContent)).toEqual([
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
    ]);
    const serviceHeadings = within(servicesSection as HTMLElement).getAllByRole("heading", { level: 3 });
    expect(serviceHeadings.map((heading) => heading.textContent)).toEqual([
      "Apps",
      "Websites",
      "AI systems",
      "Creative",
      "HeadQuarters",
      "Automations",
      "Client Portals",
      "Digital Rescue",
    ]);
    expect(within(servicesSection as HTMLElement).getByText(
      "Your custom business home. CRM, finance, projects, team tools, and whatever capability you need next—all in one place.",
    )).toBeInTheDocument();
    expect(within(servicesSection as HTMLElement).getByText(
      "Replace repetitive work with connected workflows that keep your business moving.",
    )).toBeInTheDocument();
    expect(within(servicesSection as HTMLElement).getByText(
      "Give customers or members one polished place to communicate, book, share files, and track progress.",
    )).toBeInTheDocument();
    expect(within(servicesSection as HTMLElement).getByText(
      "Repair, modernize, or rebuild software that no longer works for your business.",
    )).toBeInTheDocument();

    const sectionCopy = Array.from(servicesHeading.parentElement?.children ?? []).filter(
      (element) => element.tagName === "P",
    );
    expect(sectionCopy[1]).toHaveTextContent(
      "Our products come first. When the fit is right, we bring the same thoughtfulness to selected work for others.",
    );
    expect(sectionCopy[2]).toHaveTextContent(
      "Please include a price range for all inquiries and mention in your message if an NDA is needed.",
    );
  });

  it("opens the guided contact form from a selected service", async () => {
    const user = userEvent.setup();
    render(<CompanySite leaving={false} onOpenArtWorld={vi.fn()} />);

    await user.click(screen.getByRole("button", { name: /AI systems/ }));
    const dialog = screen.getByRole("dialog", { name: "Start with a little context." });
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByLabelText("What is this about?")).toHaveValue("AI system or productivity tool");
    expect(within(dialog).getByLabelText("Which project?")).toHaveValue("A new idea");
    expect(within(dialog).getByLabelText("Price range")).toBeRequired();

    await user.click(within(dialog).getByRole("button", { name: "Close contact form" }));
    expect(screen.queryByRole("dialog", { name: "Start with a little context." })).not.toBeInTheDocument();
  });

  it("routes a new service through the existing contact dialog without an NDA workflow", async () => {
    const user = userEvent.setup();
    const { container } = render(<CompanySite leaving={false} onOpenArtWorld={vi.fn()} />);
    const headquartersButton = screen.getByRole("button", { name: /HeadQuarters/ });

    await user.click(headquartersButton);
    const dialog = screen.getByRole("dialog", { name: "Start with a little context." });
    const reasonSelect = within(dialog).getByLabelText("What is this about?");
    expect(reasonSelect).toHaveValue("HeadQuarters");
    expect(within(reasonSelect).getAllByRole("option").map((option) => option.textContent)).toEqual([
      "Choose one",
      "Building an app or software idea",
      "Website or digital experience",
      "AI system or productivity tool",
      "Creative direction or design",
      "HeadQuarters",
      "Automations",
      "Client Portals",
      "Digital Rescue",
      "Partnership or collaboration",
      "Press or media",
      "General question",
    ]);
    expect(within(dialog).getByLabelText("Which project?")).toHaveValue("A new idea");
    expect(within(dialog).queryByRole("radio")).not.toBeInTheDocument();
    expect(within(dialog).queryByRole("checkbox")).not.toBeInTheDocument();
    expect(container.querySelector('input[type="file"]')).not.toBeInTheDocument();

    await user.click(within(dialog).getByRole("button", { name: "Close contact form" }));
    expect(headquartersButton).toHaveFocus();
  });

  it("restores focus to a pointer-activated service when Escape closes the dialog", () => {
    render(<CompanySite leaving={false} onOpenArtWorld={vi.fn()} />);
    const headquartersButton = screen.getByRole("button", { name: /HeadQuarters/ });

    fireEvent.click(headquartersButton);
    const dialog = screen.getByRole("dialog", { name: "Start with a little context." });
    expect(headquartersButton).not.toHaveFocus();
    fireEvent(dialog, new Event("cancel", { cancelable: true }));

    expect(screen.queryByRole("dialog", { name: "Start with a little context." })).not.toBeInTheDocument();
    expect(headquartersButton).toHaveFocus();
  });

  it("navigates internally and updates route metadata on popstate", async () => {
    const user = userEvent.setup();
    vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
    render(<CompanySite leaving={false} onOpenArtWorld={vi.fn()} />);

    const mainNavigation = screen.getByRole("navigation", { name: "Main navigation" });
    await user.click(within(mainNavigation).getByRole("link", { name: "Mission · About · Press" }));
    expect(window.location.pathname).toBe("/about");
    expect(screen.getByRole("heading", { level: 1, name: "Technology with purpose, built for real life." })).toBeInTheDocument();
    expect(document.title).toBe("About — Expected End");
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute("href", "https://expectedend.co/about");

    act(() => {
      window.history.pushState({}, "", "/privacy");
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
    expect(screen.getByRole("heading", { level: 1, name: "Privacy Statement" })).toBeInTheDocument();
    expect(document.title).toBe("Privacy Statement — Expected End");
  });

  it("shows the standard not-found page for retired Water Check paths", () => {
    window.history.replaceState({}, "", "/thewatercheck");
    render(<CompanySite leaving={false} onOpenArtWorld={vi.fn()} />);

    expect(screen.getByRole("heading", { level: 1, name: "That page isn’t here." })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Main navigation" })).toBeInTheDocument();
    expect(document.title).toBe("Page not found — Expected End");
  });

  it("renders the Water Check page with shared chrome and route metadata", () => {
    window.history.replaceState({}, "", "/thewatercheckpage");
    render(<CompanySite leaving={false} onOpenArtWorld={vi.fn()} />);

    expect(screen.getByRole("heading", { level: 1, name: "Ditch the influencers. Learn your actual baseline." })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Main navigation" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Footer navigation" })).toBeInTheDocument();
    expect(document.title).toBe("Hydration Calculator — The Water Check");
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      "content",
      "A private hydration estimate, practical water habits, and The Water Check community.",
    );
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://expectedend.co/thewatercheckpage",
    );
    expect(document.querySelector("meta[property='og:url']")).toHaveAttribute(
      "content",
      "https://expectedend.co/thewatercheckpage",
    );
  });

  it("keeps the public site blue without showing a theme control", () => {
    const { container } = render(<CompanySite leaving={false} onOpenArtWorld={vi.fn()} />);
    expect(container.firstElementChild).toHaveAttribute("data-site-theme", "blue");
    expect(screen.queryByRole("group", { name: "Color theme" })).not.toBeInTheDocument();
  });

  it("routes the footer Contact link to the guided About form", async () => {
    const user = userEvent.setup();
    vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
    render(<CompanySite leaving={false} onOpenArtWorld={vi.fn()} />);

    const footerNavigation = screen.getByRole("navigation", { name: "Footer navigation" });
    await user.click(within(footerNavigation).getByRole("link", { name: "Contact" }));
    expect(window.location.pathname).toBe("/about");
    expect(window.location.hash).toBe("#contact");
    expect(screen.getByRole("heading", { level: 2, name: "Start with a little context." })).toBeInTheDocument();
    expect(screen.getByLabelText("Price range")).toBeRequired();
  });
});
