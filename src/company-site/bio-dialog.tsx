import * as React from "react";
import styles from "./style.module.css";

type BioDialogProps = {
  projectName: string;
  onClose: () => void;
};

export function BioDialog({ projectName, onClose }: BioDialogProps) {
  const isWaterCheck = projectName === "The Water Check";
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const openerRef = React.useRef<HTMLElement | null>(null);
  const titleId = React.useId();

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
      className={`${styles.bioDialog} ${isWaterCheck ? styles.waterBioDialog : ""}`}
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
            {isWaterCheck && <p className={styles.waterBioEyebrow}>From the Founder</p>}
            <h2 id={titleId}>{isWaterCheck ? "What happened to @thewatercheck?" : `${projectName} bio`}</h2>
          </div>
          <button ref={closeRef} type="button" aria-label="Close bio" onClick={onClose}>×</button>
        </div>

        {isWaterCheck ? (
          <div className={styles.waterBioContent}>
            <div className={styles.waterBioStory}>
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
              <p>
                The Water Check community still matters to me, but <strong>the app is paused for now.</strong> Follow @thewatercheck on Instagram for any future updates.
              </p>
            </div>

            <div className={styles.waterBioStat}>
              <span className={styles.waterBioStatFrom}>200,000 followers</span>
              <span className={styles.waterBioStatArrow} aria-hidden="true">⟶</span>
              <span className={styles.waterBioStatTo}>7,000</span>
              <span className={styles.waterBioStatCaption}>That’s where it is now.</span>
            </div>

            <section className={styles.waterBioWhat} aria-labelledby={`${titleId}-what`}>
              <p className={styles.waterBioEyebrow}>So what was it?</p>
              <h3 id={`${titleId}-what`}>A simple reminder people loved.</h3>
              <div className={styles.waterBioStory}>
                <p>
                  The Water Check was simply this: I posted a picture every single day to remind people to drink water—and it actually helped them drink water. The comments were <em>flooded</em> with people. That was all it did, and people loved it.
                </p>
                <p>Then I had a bot erase everything from the page, and life happened from there.</p>
              </div>

              <div className={styles.waterBioPhone}>
                <span className={styles.waterBioPhoneNotch} aria-hidden="true" />
                {/* biome-ignore lint/a11y/useMediaCaption: silent Instagram screen recording with no spoken content */}
                <video
                  className={styles.waterBioVideo}
                  src="/watercheck-demo.mp4"
                  poster="/watercheck-poster.jpg"
                  controls
                  playsInline
                  preload="metadata"
                />
              </div>
              <p className={styles.waterBioVideoCaption}>Look how many people loved it.</p>
            </section>
          </div>
        ) : (
          <div className={styles.bioBlank} aria-hidden="true" />
        )}
      </div>
    </dialog>
  );
}
