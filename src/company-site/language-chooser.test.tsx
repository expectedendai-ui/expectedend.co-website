import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { i18next, LANGUAGE_KEY } from "~/src/i18n";
import { CompanySite } from "./index";

const visit = (path: string) => {
  window.history.pushState({}, "", path);
  return render(<CompanySite leaving={false} onOpenArtWorld={() => {}} />);
};

describe("language chooser", () => {
  beforeEach(() => localStorage.removeItem(LANGUAGE_KEY));
  afterEach(async () => {
    await act(() => i18next.changeLanguage("en"));
    document.documentElement.lang = "en";
  });

  it("opens on a first visit to any page, even one reached from a link", () => {
    for (const path of ["/", "/thewatercheckpage", "/thewatercheck/privacy", "/no-such-page"]) {
      localStorage.removeItem(LANGUAGE_KEY);
      const { unmount } = visit(path);
      const dialog = screen.getByRole("dialog", { name: "Choose your language" });
      // 43 languages and the close button.
      expect(within(dialog).getAllByRole("button"), path).toHaveLength(44);
      unmount();
    }
  }, 20_000);

  it("counts closing as English and never asks again", () => {
    const first = visit("/about");
    fireEvent.click(screen.getByRole("button", { name: "Close language settings" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(localStorage.getItem(LANGUAGE_KEY)).toBe("en");
    first.unmount();

    visit("/thewatercheckpage");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("counts Escape as English too", () => {
    visit("/");
    // Escape on a modal <dialog> fires its cancel event.
    fireEvent(screen.getByRole("dialog"), new Event("cancel", { cancelable: true }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(localStorage.getItem(LANGUAGE_KEY)).toBe("en");
  });

  it("switches the page to the language picked, remembers it, and the globe opens the chooser again", async () => {
    visit("/");
    fireEvent.click(screen.getByTestId("language-es"));
    await waitFor(() => expect(document.documentElement.lang).toBe("es"));
    expect(localStorage.getItem(LANGUAGE_KEY)).toBe("es");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId("language-globe"));
    const dialog = screen.getByRole("dialog", { name: "Elige tu idioma" });
    expect(screen.getByTestId("language-es")).toHaveAttribute("aria-pressed", "true");
    // Closing it now only closes it; Spanish stays.
    fireEvent(dialog, new Event("cancel", { cancelable: true }));
    expect(dialog).not.toBeInTheDocument();
    expect(localStorage.getItem(LANGUAGE_KEY)).toBe("es");
  });

  it("does not open for someone who already chose", () => {
    localStorage.setItem(LANGUAGE_KEY, "en");
    visit("/press");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByTestId("language-globe")).toBeInTheDocument();
  });
});
