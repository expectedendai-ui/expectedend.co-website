import * as React from "react";
import { Trans, useTranslation } from "react-i18next";
import styles from "./style.module.css";

type BioDialogProps = {
  onClose: () => void;
  returnFocusTo: HTMLButtonElement;
};

export function BioDialog({ onClose, returnFocusTo }: BioDialogProps) {
  const { t } = useTranslation("founder");
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const titleId = React.useId();

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
    closeRef.current?.focus();

    return () => returnFocusTo.focus();
  }, [returnFocusTo]);

  return (
    <dialog
      ref={dialogRef}
      className={styles.bioDialog}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={styles.bioDialogInner}>
        <div className={styles.bioDialogHead}>
          <div>
            <p className={styles.waterBioEyebrow}>{t("bio.eyebrow")}</p>
            <h2 id={titleId}>{t("bio.title")}</h2>
          </div>
          <button ref={closeRef} type="button" aria-label={t("bio.close")} onClick={onClose}>×</button>
        </div>

        <div className={styles.waterBioContent}>
          <p>{t("bio.first")}</p>
          <p>
            <Trans t={t} i18nKey="bio.second" components={{ em: <em />, proverb: <span className={styles.waterBioSource} /> }} />
          </p>
          <p>
            <Trans
              t={t}
              i18nKey="bio.third"
              components={{
                // biome-ignore lint/a11y/useAnchorContent: Trans puts the link words inside.
                father: <a href="https://www.linkedin.com/in/cliffordrigaud/" target="_blank" rel="noreferrer" />,
                strong: <strong />,
              }}
            />
          </p>

          <div className={styles.waterBioStat}>
            <span className={styles.waterBioStatFrom}>{t("bio.stat.from")}</span>
            <span className={styles.waterBioStatArrow} aria-hidden="true">⟶</span>
            <span className={styles.waterBioStatTo}>{t("bio.stat.to")}</span>
            <span className={styles.waterBioStatCaption}>{t("bio.stat.caption")}</span>
          </div>

          <section className={styles.waterBioWhat} aria-labelledby={`${titleId}-what`}>
            <p className={styles.waterBioEyebrow}>{t("bio.what.eyebrow")}</p>
            <h3 id={`${titleId}-what`}>{t("bio.what.title")}</h3>
            <p>
              <Trans t={t} i18nKey="bio.what.first" components={{ em: <em /> }} />
            </p>
            <p>{t("bio.what.second")}</p>
          </section>
        </div>
      </div>
    </dialog>
  );
}
