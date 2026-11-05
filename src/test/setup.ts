import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach } from "vitest";
import "~/src/i18n";

// Every test is a returning visitor who already kept English, so the first-visit language chooser stays shut.
// language-chooser.test.tsx clears this to play a first visit.
beforeEach(() => localStorage.setItem("ee_lang", "en"));

afterEach(cleanup);
