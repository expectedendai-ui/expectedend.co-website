import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { isLanguageId, type LanguageId } from "./languages";

/** Where the visitor's pick lives: in this browser only. No cookie, nothing sent anywhere. */
export const LANGUAGE_KEY = "ee_lang";

type Bundle = Record<string, unknown>;

// English ships with the page. Every other language is its own small set of files, fetched only once chosen.
// join.json belongs to the Crew invite page (functions/join), which carries its own copy.
const english = import.meta.glob<Bundle>(["../locales/en/*.json", "!../locales/en/join.json"], { eager: true, import: "default" });
const others = import.meta.glob<Bundle>(["../locales/*/*.json", "!../locales/en/*.json", "!../locales/*/join.json"], {
  import: "default",
});

const namespaceOf = (path: string) => path.slice(path.lastIndexOf("/") + 1, -".json".length);
const languageOf = (path: string) => path.split("/").at(-2);

i18next.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  ns: Object.keys(english).map(namespaceOf),
  defaultNS: "common",
  resources: { en: Object.fromEntries(Object.entries(english).map(([path, bundle]) => [namespaceOf(path), bundle])) },
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
  initAsync: false,
});

async function load(id: LanguageId) {
  if (id === "en" || i18next.hasResourceBundle(id, "common")) return;
  const files = Object.entries(others).filter(([path]) => languageOf(path) === id);
  const bundles = await Promise.all(files.map(async ([path, read]) => [namespaceOf(path), await read()] as const));
  for (const [namespace, bundle] of bundles) i18next.addResourceBundle(id, namespace, bundle, true, true);
}

async function show(id: LanguageId) {
  await load(id);
  await i18next.changeLanguage(id);
  document.documentElement.lang = id;
}

/** The language this visitor picked before, or null on a first visit (or when the browser keeps no storage). */
export function savedLanguage(): LanguageId | null {
  try {
    const value = localStorage.getItem(LANGUAGE_KEY);
    return isLanguageId(value) ? value : null;
  } catch {
    return null;
  }
}

/** Remembers the pick on this device and switches the page to it. Closing the chooser picks English. */
export async function chooseLanguage(id: LanguageId) {
  try {
    localStorage.setItem(LANGUAGE_KEY, id);
  } catch {
    // Storage blocked (a private window): the pick still holds until the tab closes.
  }
  await show(id);
}

/** Runs before the first paint, so a returning visitor's page never flashes English first. */
export async function startLanguage() {
  const saved = savedLanguage();
  if (!saved || saved === "en") return;
  try {
    await show(saved);
  } catch {
    // A file that will not load leaves the page in English; the chooser can still switch.
  }
}

export { i18next };
