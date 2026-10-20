import type * as React from "react";
import type { LegalPageContent } from "./legal-content";
import styles from "./style.module.css";

type InfoPageProps = {
  content: LegalPageContent;
  onNavigate?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

const slug = (heading: string) =>
  heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Long pages get an "On this page" list so people can jump straight to the part they need. */
const TOC_AFTER = 6;

export function InfoPage({ content, onNavigate }: InfoPageProps) {
  return (
    <main className={styles.infoMain} id="top">
      <article className={styles.infoArticle}>
        <header className={styles.infoHeader}>
          <p className={styles.kicker}>{content.eyebrow}</p>
          <h1>{content.title}</h1>
          <p>{content.intro}</p>
          <span>Effective {content.effectiveDate}</span>
          {content.related && (
            <nav className={styles.infoRelated} aria-label="Related pages">
              {content.related.map((link) => (
                <a key={link.href} href={link.href} onClick={onNavigate}>
                  {link.label}
                </a>
              ))}
            </nav>
          )}
        </header>
        {content.sections.length > TOC_AFTER && (
          <nav className={styles.infoToc} aria-label="On this page">
            <p>On this page</p>
            <ol>
              {content.sections.map((section) => (
                <li key={section.heading}>
                  <a href={`#${slug(section.heading)}`}>{section.heading}</a>
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className={styles.infoBody}>
          {content.sections.map((section) => (
            <section key={section.heading} id={slug(section.heading)}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets && (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
