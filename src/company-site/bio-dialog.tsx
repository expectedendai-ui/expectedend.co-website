import * as React from "react";
import styles from "./style.module.css";

type BioDialogProps = {
  onClose: () => void;
  returnFocusTo: HTMLButtonElement;
};

export function BioDialog({ onClose, returnFocusTo }: BioDialogProps) {
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
            <p className={styles.waterBioEyebrow}>From the Founder</p>
            <h2 id={titleId}>What happened to @thewatercheck?</h2>
          </div>
          <button ref={closeRef} type="button" aria-label="Close bio" onClick={onClose}>×</button>
        </div>

        <div className={styles.waterBioContent}>
          <p>
            Starting at age 15, I was managing and scaling influencer and content pages while still growing my own project, @thewatercheck.
          </p>
          <p>
            I later moved in with my dad at age 17, and the account was dying because <em>“If you chase two rabbits, you will not catch either one.”</em>{" "}
            <span className={styles.waterBioSource}>— Russian proverb</span> At that age, I only cared about the money. I was not giving @thewatercheck my all.
          </p>
          <p>
            Then my <a href="https://www.linkedin.com/in/cliffordrigaud/" target="_blank" rel="noreferrer">father</a> passed away unexpectedly on <strong>July 10, 2021.</strong> I went into survival mode, wondering where my life was going. To deal with the pain of his death, I shut the door on being the web wizard my father once taught me to be—until <strong>January 2026.</strong>
          </p>

          <div className={styles.waterBioStat}>
            <span className={styles.waterBioStatFrom}>200,000 followers</span>
            <span className={styles.waterBioStatArrow} aria-hidden="true">⟶</span>
            <span className={styles.waterBioStatTo}>7,000</span>
            <span className={styles.waterBioStatCaption}>That’s where it is now.</span>
          </div>

          <section className={styles.waterBioWhat} aria-labelledby={`${titleId}-what`}>
            <p className={styles.waterBioEyebrow}>So what was it?</p>
            <h3 id={`${titleId}-what`}>A simple reminder people loved.</h3>
            <p>
              The Water Check was simply this: I posted a picture every single day to remind people to drink water—and it actually helped them drink water. The comments were <em>flooded</em> with people. That was all it did, and people loved it.
            </p>
            <p>Then a bot erased everything from the page, and life happened from there.</p>
          </section>
        </div>
      </div>
    </dialog>
  );
}
