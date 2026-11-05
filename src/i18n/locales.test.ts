import { describe, expect, it } from "vitest";
import CHOOSER from "./chooser.json";
import { LANGUAGES } from "./languages";

type Tree = { [key: string]: string | Tree };

const files = import.meta.glob<Tree>("../locales/*/*.json", { eager: true, import: "default" });
const bundle = (language: string, namespace: string) => files[`../locales/${language}/${namespace}.json`];
const namespaces = Object.keys(files)
  .filter((path) => path.startsWith("../locales/en/"))
  .map((path) => path.slice("../locales/en/".length, -".json".length));

const flatten = (tree: Tree, prefix = ""): Record<string, string> =>
  Object.fromEntries(
    Object.entries(tree).flatMap(([key, value]) =>
      typeof value === "string" ? [[`${prefix}${key}`, value]] : Object.entries(flatten(value, `${prefix}${key}.`)),
    ),
  );

const PLURAL = /_(zero|one|two|few|many|other)$/;
const tokens = (text: string) => [...text.matchAll(/\{\{\s*\w+\s*\}\}|<\/?\w+\s*\/?>/g)].map(([token]) => token.replace(/\s/g, "")).sort();

describe("every language has every line", () => {
  it("lists 43 languages, each with its chooser words", () => {
    expect(LANGUAGES).toHaveLength(43);
    for (const { id } of LANGUAGES) expect(Object.values(CHOOSER[id]).every(Boolean), id).toBe(true);
  });

  for (const { id } of LANGUAGES.filter((language) => language.id !== "en")) {
    it(`${id} matches English`, () => {
      const categories = new Intl.PluralRules(id).resolvedOptions().pluralCategories;
      for (const namespace of namespaces) {
        const english = flatten(bundle("en", namespace));
        const translated = bundle(id, namespace);
        expect(translated, `${id}/${namespace}.json is missing`).toBeDefined();
        const lines = flatten(translated);
        for (const [key, source] of Object.entries(english)) {
          // A plural needs every form this language uses (Russian: one, few, many, other; Japanese: other).
          const wanted = PLURAL.test(key)
            ? [`${key.replace(PLURAL, "")}_other`, ...categories.map((form) => `${key.replace(PLURAL, "")}_${form}`)]
            : [key];
          for (const want of wanted.filter((name, index) => wanted.indexOf(name) === index)) {
            const line = lines[want];
            expect(line, `${id}/${namespace}: ${want}`).toBeTruthy();
            const english_ = PLURAL.test(want) ? (english[`${want.replace(PLURAL, "")}_other`] ?? source) : source;
            expect(tokens(line ?? ""), `${id}/${namespace}: ${want} keeps its {{values}} and <tags>`).toEqual(tokens(english_));
            expect(line, `${id}/${namespace}: ${want} has no em dash`).not.toContain("—");
          }
        }
        for (const key of Object.keys(lines)) {
          const known = key in english || (PLURAL.test(key) && Object.keys(english).some((name) => name.replace(PLURAL, "") === key.replace(PLURAL, "")));
          expect(known, `${id}/${namespace}: ${key} is not an English line`).toBe(true);
        }
      }
    });
  }
});
