// The invite page's words in every language the site speaks, from src/locales/<id>/join.json, plus the
// language chooser's own words. The page carries them all, so it can switch without loading anything.
import CHOOSER from "../../src/i18n/chooser.json";
import { LANGUAGES } from "../../src/i18n/languages";
import en from "../../src/locales/en/join.json";

export const JOIN_TEXT = { en };
export { CHOOSER, LANGUAGES };
