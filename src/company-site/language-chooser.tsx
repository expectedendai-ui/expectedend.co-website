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
  const dialog = React.useRef<HTMLDialogElement>(null);

  const close = (pick?: LanguageId) => {
    setOpen(false);
    if (pick || firstVisit) void chooseLanguage(pick ?? "en");
    if (!firstVisit) globe.current?.focus();
    setFirstVisit(false);
  };

  React.useEffect(() => {
    const element = dialog.current;
    if (!open || !element) return;
    if (typeof element.showModal === "function") element.showModal();
    else element.setAttribute("open", "");
    const pressed = element.querySelector<HTMLButtonElement>('[aria-pressed="true"]');
    pressed?.focus({ preventScroll: true });
    pressed?.scrollIntoView?.({ block: "center" });
    // The page underneath holds still while the chooser is up.
    const root = document.documentElement;
    const overflow = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = overflow;
    };
  }, [open]);

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
        <dialog
          ref={dialog}
          className={styles.dialog}
          data-theme={theme}
          aria-labelledby="language-chooser-title"
          aria-describedby="language-chooser-intro"
          translate="no"
          onCancel={(event) => {
            event.preventDefault();
            close();
          }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
          data-testid="language-chooser"
        >
          <div className={styles.card}>
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
            <ul className={styles.list} aria-label={text.list}>
              {LANGUAGES.map((language) => {
                const chosen = language.id === lit;
                return (
                  <li key={language.id}>
                    <button
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
                  </li>
                );
              })}
            </ul>
          </div>
        </dialog>
      )}
    </>
  );
}
