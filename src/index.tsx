import * as React from "react";
import { createRoot } from "react-dom/client";
import "~/src/index.css";
import { App } from "~/src/app";
import { startLanguage } from "~/src/i18n";

// A returning visitor's language loads first, so the page never flashes English before switching.
void startLanguage().finally(() => {
  createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
