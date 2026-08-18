import type * as React from "react";
import type { WaterCheckLegalContent } from "./water-check-legal-content";
import {
  getWaterCheckRenderedReleaseFacts,
  WATER_CHECK_PENDING_APPROVAL_LABEL,
  WATER_CHECK_RELEASE_RECORD,
} from "./water-check-release-content";
import styles from "./water-check-legal-page.module.css";

type WaterCheckLegalPageProps = {
  content: WaterCheckLegalContent;
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

export function WaterCheckLegalPage({ content, onNavigate }: WaterCheckLegalPageProps) {
  const releaseFacts = getWaterCheckRenderedReleaseFacts(WATER_CHECK_RELEASE_RECORD);
  const entityName = releaseFacts.entityName ?? WATER_CHECK_PENDING_APPROVAL_LABEL;
  const effectiveDate = releaseFacts.effectiveDate ?? WATER_CHECK_PENDING_APPROVAL_LABEL;

  return (
    <main className={styles.page} aria-label={`${content.footerLabel} information`}>
      <article aria-label={content.title}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{content.eyebrow}</p>
          <h1>{content.title}</h1>
          <p className={styles.intro}>{content.intro}</p>
          <p className={styles.effectiveDate}>Entity: {entityName}</p>
          <p className={styles.effectiveDate}>Effective date: {effectiveDate}</p>
          <p className={styles.effectiveDate}>
            Contact:{" "}
            {releaseFacts.contactPath ? (
              <a href={releaseFacts.contactPath} onClick={onNavigate}>
                {releaseFacts.contactPath}
              </a>
            ) : (
              WATER_CHECK_PENDING_APPROVAL_LABEL
            )}
          </p>
        </header>

        <div className={styles.sections}>
          {content.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>

        <aside className={styles.returnCard} aria-label="Return to product page">
          <a href="https://www.instagram.com/thewatercheck/" target="_blank" rel="noreferrer">
            Visit The Water Check on Instagram
          </a>
        </aside>
      </article>
    </main>
  );
}
