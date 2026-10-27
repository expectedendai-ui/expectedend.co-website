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
    expect(container.querySelector("video")).toBeNull();
    const heroScene = container.querySelector("[class*='heroScene']");
    expect(heroScene).toHaveAttribute("aria-hidden", "true");
    expect(heroScene?.querySelectorAll("img")).toHaveLength(2);
    const approvedMission =
      "Expected End creates thoughtful software, productivity tools, digital experiences, and communities that bring people closer to God in exciting and easy ways!";
    expect(
      screen.getByText((_, element) => element?.tagName === "P" && element.textContent === approvedMission)
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Visit MyBibleLens" })).toHaveAttribute("href", "https://mybiblelens.us/");
    expect(screen.getByRole("link", { name: "Bio for MyBibleLens" })).toHaveAttribute(
      "href",
      "https://mybiblelens.us/legal.html#about"
    );
    const waterCheckArtwork = screen.getByRole("link", { name: "Visit The Water Check" });
    expect(waterCheckArtwork).toHaveAttribute("href", "/thewatercheckpage");
    expect(waterCheckArtwork).not.toHaveAttribute("target");
    expect(waterCheckArtwork).not.toHaveAttribute("rel");

    const waterCheckAction = screen.getAllByRole("link", { name: "Visit app" }).find((link) => link.getAttribute("href") === "/thewatercheckpage")!;
    expect(waterCheckAction).toHaveAttribute("href", "/thewatercheckpage");
    expect(waterCheckAction).not.toHaveAttribute("target");
    expect(waterCheckAction).not.toHaveAttribute("rel");
    expect(screen.getByRole("button", { name: "Bio for The Water Check" })).toBeInTheDocument();

    const myBibleLensArtwork = screen.getByRole("link", { name: "Visit MyBibleLens" });
    expect(myBibleLensArtwork).toHaveAttribute("target", "_blank");
    expect(myBibleLensArtwork).toHaveAttribute("rel", "noreferrer");
    expect(screen.getAllByRole("link", { name: "Visit app" })[0]).toHaveAttribute("target", "_blank");
    expect(screen.queryByRole("link", { name: "Enter store" })).not.toBeInTheDocument();
    expect(screen.queryByText("Store · Coming soon")).not.toBeInTheDocument();
    expect(screen.getByText(/Everything I build under this company points toward the same mission/i)).toBeInTheDocument();
    expect(screen.queryByText("JARVIS")).not.toBeInTheDocument();
    expect(screen.queryByText("THE MENU")).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Ideas can feel meaningful and easy to enter." })).not.toBeInTheDocument();
  });

  it("does not intercept modified clicks on project destinations", () => {
    render(<CompanySite leaving={false} onOpenArtWorld={vi.fn()} />);
    const stopJSDOMNavigation = (event: MouseEvent) => event.preventDefault();
    window.addEventListener("click", stopJSDOMNavigation);

    fireEvent.click(screen.getAllByRole("link", { name: "Visit app" }).find((link) => link.getAttribute("href") === "/thewatercheckpage")!, {
      ctrlKey: true,
    });
    fireEvent.click(screen.getAllByRole("link", { name: "Visit app" })[0], {
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
    expect(screen.getByRole("heading", { level: 1, name: /Drink up.*keep count/ })).toBeInTheDocument();
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
    expect(actionIcons).toHaveLength(4);
    actionIcons.forEach((icon) => {
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon).toHaveAttribute("focusable", "false");
    });
  });

  it("opens each branded store internally with launch-ready coming-soon products", async () => {
    window.history.pushState({}, "", "/mybiblelensstore");
    const view = render(<CompanySite leaving={false} onOpenArtWorld={vi.fn()} />);
    expect(window.location.pathname).toBe("/mybiblelensstore");
    expect(screen.getByRole("heading", { level: 1, name: "MyBibleLens" })).toBeInTheDocument();
    const myBibleLensStoreArt = screen.getByRole("img", { name: "MyBibleLens store logo and sticker collage" });
    expect(myBibleLensStoreArt.querySelector("[data-flip-logo]")).toBeInTheDocument();
    expect(myBibleLensStoreArt.querySelectorAll("[data-store-sticker]")).toHaveLength(5);
    expect(screen.getByRole("button", { name: "The Daily Bread Journal coming soon" })).toBeDisabled();

    view.unmount();
    window.history.pushState({}, "", "/thewatercheckstore");
    render(<CompanySite leaving={false} onOpenArtWorld={vi.fn()} />);
    expect(window.location.pathname).toBe("/thewatercheckstore");
    expect(screen.getByRole("heading", { level: 1, name: "The Water Check" })).toBeInTheDocument();
    expect(document.querySelector("[data-water-intro]")).toBeInTheDocument();
    const waterCheckStoreLogo = screen.getByRole("img", { name: "The Water Check liquid logo bubble" });
    expect(waterCheckStoreLogo.querySelector("img")).toHaveAttribute("src", "/brand/watercheck-store/c-mark-magic-eraser.png");
    expect(screen.getByRole("button", { name: "Refill Hoodie coming soon" })).toBeDisabled();
  });

  it("renders the complete approved service lineup and concise inquiry guidance", () => {
    render(<CompanySite leaving={false} onOpenArtWorld={vi.fn()} />);

    const servicesHeading = screen.getByRole("heading", { level: 2, name: "You dream it, I build it." });
    const servicesSection = servicesHeading.closest("section");
    expect(servicesSection).not.toBeNull();
    expect(
      within(servicesSection as HTMLElement)
        .getAllByText(/^0[1-8]$/)
        .map((number) => number.textContent)
    ).toEqual(["01", "02", "03", "04", "05", "06", "07", "08"]);
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
    expect(
      within(servicesSection as HTMLElement).getByText(
        "Your custom business home. CRM, finance, projects, team tools, and whatever capability you need next—all in one place."
      )
    ).toBeInTheDocument();
    expect(
      within(servicesSection as HTMLElement).getByText(
        "Replace repetitive work with connected workflows that keep your business moving."
      )
    ).toBeInTheDocument();
    expect(
      within(servicesSection as HTMLElement).getByText(
        "Give customers or members one polished place to communicate, book, share files, and track progress."
      )
    ).toBeInTheDocument();
    expect(
      within(servicesSection as HTMLElement).getByText(
        "Repair, modernize, or rebuild software that no longer works for your business."
      )
    ).toBeInTheDocument();

    const sectionCopy = Array.from(servicesHeading.parentElement?.children ?? []).filter((element) => element.tagName === "P");
    expect(sectionCopy[1]).toHaveTextContent(
      "The products come first. When the fit is right, the same thoughtfulness goes into selected work for others."
    );
    expect(sectionCopy[2]).toHaveTextContent(
      "Please include a price range for all inquiries and mention in your message if an NDA is needed."
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
    expect(
      within(reasonSelect)
        .getAllByRole("option")
        .map((option) => option.textContent)
    ).toEqual([
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

  it("publishes the Claude landing design with the approved headline and working links", () => {
    window.history.replaceState({}, "", "/thewatercheckpage");
    render(<CompanySite leaving={false} onOpenArtWorld={vi.fn()} />);

    expect(screen.getByRole("heading", { level: 1, name: /Drink up.*keep count/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Scan it once. Know it. Tap it forever." })).toBeInTheDocument();
    for (const link of screen.getAllByRole("link", { name: "Delete your account" })) {
      expect(link).toHaveAttribute("href", "/thewatercheck/delete-account");
    }
    expect(screen.getByRole("link", { name: "Consumer Health Data Privacy Policy" })).toHaveAttribute("href", "/thewatercheck/consumer-health-data");
    expect(screen.queryByText("Three ways to open.")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Try the free calculator" })).toHaveAttribute("href", "/thewatercheck-calculator");
    expect(screen.getByRole("link", { name: "Open the calculator" })).toHaveAttribute("href", "/thewatercheck-calculator");
    expect(screen.getByRole("link", { name: "Follow The Water Check on Instagram" })).toHaveAttribute(
      "href",
      "https://www.instagram.com/thewatercheck?stkn=dW00MHRucTY1Nmto"
    );
    expect(screen.getByRole("link", { name: "The Water Check Privacy Policy" })).toHaveAttribute("href", "/thewatercheck/privacy");
    expect(document.title).toBe("The Water Check — Hydration App & Free Calculator");
    expect(screen.queryByRole("navigation", { name: "Main navigation" })).not.toBeInTheDocument();
  });

  it("renders the Water Check calculator with shared chrome and route metadata", () => {
    window.history.replaceState({}, "", "/thewatercheck-calculator");
    render(<CompanySite leaving={false} onOpenArtWorld={vi.fn()} />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Ditch the influencers. Learn your actual biology." })
    ).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Main navigation" })).toHaveAttribute("data-nav-theme", "water");
    expect(screen.getByRole("navigation", { name: "Footer navigation" })).toBeInTheDocument();
    expect(document.title).toBe("Free Hydration Calculator — The Water Check");
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      "content",
      "Get a free, private daily hydration estimate with The Water Check calculator."
    );
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute("href", "https://expectedend.co/thewatercheck-calculator");
    expect(document.querySelector("meta[property='og:url']")).toHaveAttribute(
      "content",
      "https://expectedend.co/thewatercheck-calculator"
    );
    const waterCheckSchema = JSON.parse(
      document.querySelector('main[data-water-check-page] script[type="application/ld+json"]')?.textContent ?? "{}"
    ) as {
      "@id"?: string;
      creator?: { "@id": string };
      sameAs?: string[];
    };
    expect(waterCheckSchema["@id"]).toBe("https://expectedend.co/thewatercheckpage#application");
    expect(waterCheckSchema.creator?.["@id"]).toBe("https://expectedend.co/denzel-rigaud#person");
    expect(waterCheckSchema.sameAs).toEqual(
      expect.arrayContaining(["https://www.wikidata.org/wiki/Q141251206", "https://www.instagram.com/thewatercheck/"])
    );
  });

  it("renders the press kit with shared chrome and route metadata", () => {
    window.history.replaceState({}, "", "/press");
    render(<CompanySite leaving={false} onOpenArtWorld={vi.fn()} />);

    expect(screen.getByRole("heading", { level: 1, name: "Press resources for Expected End." })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Main navigation" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Footer navigation" })).toBeInTheDocument();
    expect(document.title).toBe("Press & Media — Expected End");
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute("href", "https://expectedend.co/press");
    expect(screen.getByRole("link", { name: "Expected End LLC" })).toBeInTheDocument();
    expect(screen.queryByText("Expected End Inc")).not.toBeInTheDocument();
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
