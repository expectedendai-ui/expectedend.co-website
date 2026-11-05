import * as React from "react";
import { useTranslation } from "react-i18next";
import { chooseLanguage, savedLanguage } from "~/src/i18n";
import CHOOSER from "~/src/i18n/chooser.json";
import { browserLanguage, isLanguageId, LANGUAGES, type LanguageId } from "~/src/i18n/languages";
import styles from "./language-chooser.module.css";

type Theme = "gold" | "water";

const words = (id: LanguageId) => CHOOSER[id] ?? CHOOSER.en;

/**
 * The language chooser. It opens by itself on a visitor's first page, whichever link brought them in, with the
 * browser's language lit, and never again once they pick one or close it (closing keeps English). The globe in
 * the corner opens it any time after.
 */
export function LanguageChooser({ theme }: { theme: Theme }) {
  const { i18n } = useTranslation();
  const [firstVisit, setFirstVisit] = React.useState(() => savedLanguage() === null);
  const [open, setOpen] = React.useState(firstVisit);
  const [guess] = React.useState(browserLanguage);
  const current = (isLanguageId(i18n.language) ? i18n.language : "en") as LanguageId;
  const lit = firstVisit ? guess : current;
  const text = words(lit);
  const globe = React.useRef<HTMLButtonElement>(null);
  const card = React.useRef<HTMLDivElement>(null);

  const close = React.useCallback(
    (pick?: LanguageId) => {
      setOpen(false);
      if (pick || firstVisit) void chooseLanguage(pick ?? "en");
      setFirstVisit(false);
      if (!firstVisit) globe.current?.focus();
    },
    [firstVisit],
  );

  React.useEffect(() => {
    if (!open) return;
    card.current?.querySelector<HTMLButtonElement>('[aria-pressed="true"]')?.focus({ preventScroll: true });
    card.current?.querySelector('[aria-pressed="true"]')?.scrollIntoView?.({ block: "center" });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key !== "Tab" || !card.current) return;
      // Keep Tab inside the card while it is open.
      const stops = [...card.current.querySelectorAll<HTMLButtonElement>("button")];
      const [first, last] = [stops[0], stops.at(-1)];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    const root = document.documentElement;
    const overflow = root.style.overflow;
    root.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      root.style.overflow = overflow;
    };
  }, [open, close]);

  return (
    <>
      <button
        ref={globe}
        type="button"
        className={styles.globe}
        data-theme={theme}
        aria-label={words(current).languages}
        title={words(current).languages}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        data-testid="language-globe"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18" />
        </svg>
      </button>
      {open && (
        <div
          className={styles.backdrop}
          data-theme={theme}
          onClick={(event) => event.target === event.currentTarget && close()}
          data-testid="language-chooser"
        >
          <div
            ref={card}
            className={styles.card}
            role="dialog"
            aria-modal="true"
            aria-labelledby="language-chooser-title"
            aria-describedby="language-chooser-intro"
            translate="no"
          >
            <button type="button" className={styles.close} aria-label={text.close} onClick={() => close()}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
            <span className={styles.mark} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18" />
              </svg>
            </span>
            <h2 id="language-chooser-title" className={styles.title} lang={lit}>
              {text.title}
            </h2>
            <p id="language-chooser-intro" className={styles.intro} lang={lit}>
              {text.intro}
            </p>
            {lit !== "en" && (
              <p className={styles.english} lang="en">
                {CHOOSER.en.title}
              </p>
            )}
            <div className={styles.list} role="group" aria-label={text.list}>
              {LANGUAGES.map((language) => {
                const chosen = language.id === lit;
                return (
                  <button
                    key={language.id}
                    type="button"
                    className={styles.option}
                    aria-pressed={chosen}
                    lang={language.id}
                    onClick={() => close(language.id)}
                    data-testid={`language-${language.id}`}
                  >
                    <span className={styles.flag} aria-hidden="true">
                      {language.flag}
                    </span>
                    <span className={styles.names}>
                      <span className={styles.native}>{language.nativeName}</span>
                      {language.englishName !== language.nativeName && (
                        <span className={styles.englishName} lang="en">
                          {language.englishName}
                        </span>
                      )}
                    </span>
                    {chosen && <span className={styles.check} aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
