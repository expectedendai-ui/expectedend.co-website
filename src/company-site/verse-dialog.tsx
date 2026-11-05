import * as React from "react";
import { useTranslation } from "react-i18next";
import styles from "./style.module.css";

type VerseDialogProps = {
  onClose: () => void;
};

export function VerseDialog({ onClose }: VerseDialogProps) {
  const { t } = useTranslation("founder");
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const openerRef = React.useRef<HTMLElement | null>(null);
  const titleId = React.useId();
  const verseId = React.useId();

  React.useEffect(() => {
    openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
    closeRef.current?.focus();

    return () => openerRef.current?.focus();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className={styles.verseDialog}
      aria-labelledby={titleId}
      aria-describedby={verseId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={styles.verseDialogInner}>
        <div className={styles.verseDialogHead}>
          <div>
            <p>{t("verse.version")}</p>
            <h2 id={titleId}>{t("verse.reference")}</h2>
          </div>
          <button ref={closeRef} type="button" aria-label={t("verse.close")} onClick={onClose}>×</button>
        </div>
        <blockquote id={verseId}>
          <sup>11</sup> {t("verse.text")}
        </blockquote>
      </div>
    </dialog>
  );
}
