import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";
// @ts-expect-error The Pages Function is plain JavaScript with no type declarations.
import { joinPage } from "../../functions/join/[code].js";

/** Loads the Crew invite page with its script running, as a browser with these languages and this storage would. */
function open(code: string | null, { saved, languages = ["en-US"] }: { saved?: string; languages?: string[] } = {}) {
  const dom = new JSDOM(joinPage(code), {
    url: "https://expectedend.co/join/ABCD-EFG",
    runScripts: "dangerously",
    beforeParse(window) {
      Object.defineProperty(window.navigator, "languages", { value: languages });
      window.HTMLElement.prototype.scrollIntoView = () => {};
      if (saved) window.localStorage.setItem("ee_lang", saved);
    },
  });
  const { document } = dom.window;
  return { dom, document, chooser: document.getElementById("chooser") as HTMLElement };
}

describe("Crew invite page languages", () => {
  it("asks on a first visit with the browser's language lit, and closing keeps English for good", () => {
    const { dom, document, chooser } = open("ABCD-EFG", { languages: ["es-MX", "en"] });
    expect(chooser.hidden).toBe(false);
    expect(document.querySelectorAll("#chooser-list button")).toHaveLength(43);
    expect(document.querySelector('#chooser-list [aria-pressed="true"]')?.getAttribute("lang")).toBe("es");
    expect(document.getElementById("chooser-title")?.textContent).toBe("Elige tu idioma");

    (document.getElementById("chooser-close") as HTMLButtonElement).click();
    expect(chooser.hidden).toBe(true);
    expect(dom.window.localStorage.getItem("ee_lang")).toBe("en");
    expect(document.querySelector("h1")?.textContent).toBe("You’re invited to a Crew");
  });

  it("switches the words when a language is picked and remembers it", () => {
    const { dom, document } = open("ABCD-EFG");
    (document.querySelector('#chooser-list [lang="es"]') as HTMLButtonElement).click();
    expect(dom.window.localStorage.getItem("ee_lang")).toBe("es");
    expect(document.documentElement.lang).toBe("es");
    expect(document.querySelector("h1")?.textContent).not.toBe("You’re invited to a Crew");
    expect(document.getElementById("code")?.textContent).toBe("ABCD-EFG");
  });

  it("uses a saved pick without asking, on the broken-link page too", () => {
    const { document, chooser } = open(null, { saved: "en" });
    expect(chooser.hidden).toBe(true);
    expect(document.querySelector("h1")?.textContent).toBe("That invite link is not complete");
  });
});
