import type { LegalPageContent } from "./legal-content";
import styles from "./style.module.css";

type InfoPageProps = {
  content: LegalPageContent;
};

export function InfoPage({ content }: InfoPageProps) {
  return (
    <main className={styles.infoMain}>
      <article className={styles.infoArticle}>
        <header className={styles.infoHeader}>
          <p className={styles.kicker}>{content.eyebrow}</p>
          <h1>{content.title}</h1>
          <p>{content.intro}</p>
          <span>Effective {content.effectiveDate}</span>
        </header>
        <div className={styles.infoBody}>
          {content.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
