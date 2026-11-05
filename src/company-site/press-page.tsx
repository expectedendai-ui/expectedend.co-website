import type * as React from "react";
import { Trans, useTranslation } from "react-i18next";
import { ArrowDownIcon, ArrowUpRightIcon } from "./action-icons";
import { FOUNDER_DESCRIPTION } from "./content";
import { useContentText } from "./content-i18n";
import styles from "./press-page.module.css";

type PressPageProps = {
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

const PRESS_PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://expectedend.co/press#webpage",
  url: "https://expectedend.co/press",
  name: "Press & Media — Expected End",
  description:
    "Approved biographies, verified facts, entity links, and downloadable media for coverage of Expected End and Denzel Rigaud.",
  dateModified: "2026-09-03",
  about: [
    {
      "@type": "Organization",
      "@id": "https://expectedend.co/#organization",
      name: "Expected End",
      legalName: "EXPECTEDEND LLC",
      url: "https://expectedend.co/",
    },
    {
      "@type": "Person",
      "@id": "https://expectedend.co/denzel-rigaud#person",
      name: "Denzel Rigaud",
      url: "https://expectedend.co/denzel-rigaud",
    },
  ],
  primaryImageOfPage: {
    "@type": "ImageObject",
    "@id": "https://expectedend.co/press#founder-portrait",
    contentUrl: "https://expectedend.co/media/denzel-rigaud-founder-hero.png",
    caption: "Denzel Rigaud, founder of Expected End",
    creditText: "Denzel Rigaud / Expected End",
    license: "https://creativecommons.org/licenses/by-sa/4.0/",
    acquireLicensePage: "https://expectedend.co/press#licensing",
  },
};

const ENTITY_LINKS = [
  {
    name: "Denzel Rigaud",
    href: "https://www.wikidata.org/wiki/Q140198525",
    identifier: "Q140198525",
  },
  {
    name: "MyBibleLens",
    href: "https://www.wikidata.org/wiki/Q141251174",
    identifier: "Q141251174",
  },
  {
    name: "The Water Check",
    href: "https://www.wikidata.org/wiki/Q141251206",
    identifier: "Q141251206",
  },
] as const;

export function PressPage({ onNavigate }: PressPageProps) {
  const { t } = useTranslation("press");
  const { founderDescription } = useContentText();
  return (
    <main className={styles.page}>
      <script type="application/ld+json">{JSON.stringify(PRESS_PAGE_SCHEMA)}</script>

      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>{t("hero.kicker")}</p>
          <h1>{t("hero.title")}</h1>
          <p className={styles.intro}>{t("hero.intro")}</p>
          <div className={styles.actions}>
            {/* biome-ignore lint/a11y/useValidAnchor: this is an addressable cross-route section link */}
            <a className={styles.primaryAction} href="/about#contact" onClick={onNavigate}>
              {t("inquiry")} <ArrowUpRightIcon />
            </a>
            <a
              className={styles.secondaryAction}
              href="/media/denzel-rigaud-founder-hero.png"
              download="denzel-rigaud-founder-portrait.png"
            >
              {t("hero.downloadPortrait")} <ArrowDownIcon />
            </a>
          </div>
        </div>

        <figure className={styles.portrait}>
          <img src="/media/denzel-rigaud-founder-hero.png" alt={t("portrait.alt")} />
          <figcaption>
            <strong>Denzel Rigaud</strong>
            <span className={styles.portraitRole}>{t("role")}</span>
          </figcaption>
        </figure>
      </header>

      <nav className={styles.contents} aria-label={t("contents.label")}>
        <span className={styles.contentsLabel}>{t("contents.kit")}</span>
        <a href="#biographies">{t("contents.biographies")}</a>
        <a href="#facts">{t("contents.facts")}</a>
        <a href="#projects">{t("contents.projects")}</a>
        <a href="#licensing">{t("contents.licensing")}</a>
      </nav>

      <section className={styles.section} id="biographies" aria-labelledby="biographies-title">
        <header className={styles.sectionHeading}>
          <p className={styles.kicker}>{t("bios.kicker")}</p>
          <h2 id="biographies-title">{t("bios.title")}</h2>
          <p>{t("bios.text")}</p>
        </header>
        <div className={styles.bioGrid}>
          <article className={styles.bioCard}>
            <span className={styles.bioLabel}>{t("bios.shortLabel")}</span>
            <p data-testid="short-bio">{founderDescription(FOUNDER_DESCRIPTION)}</p>
          </article>
          <article className={styles.bioCard}>
            <span className={styles.bioLabel}>{t("bios.fullLabel")}</span>
            <div data-testid="full-bio">
              <p>{t("bios.fullFirst")}</p>
              <p>{t("bios.fullSecond")}</p>
            </div>
          </article>
        </div>
      </section>

      <section className={[styles.section, styles.factSection].join(" ")} id="facts" aria-label={t("facts.title")}>
        <header className={styles.sectionHeading}>
          <p className={styles.kicker}>{t("facts.kicker")}</p>
          <h2>{t("facts.title")}</h2>
          <p>{t("facts.text")}</p>
        </header>
        <dl className={styles.factList}>
          <div>
            <dt>{t("facts.company")}</dt>
            <dd>EXPECTEDEND LLC</dd>
          </div>
          <div>
            <dt>{t("facts.founder")}</dt>
            <dd>Denzel Rigaud</dd>
          </div>
          <div>
            <dt>{t("facts.role")}</dt>
            <dd>{t("role")}</dd>
          </div>
          <div>
            <dt>{t("facts.products")}</dt>
            <dd>{t("facts.productsValue")}</dd>
          </div>
          <div>
            <dt>{t("facts.website")}</dt>
            <dd>
              <a href="https://expectedend.co/">expectedend.co</a>
            </dd>
          </div>
          <div>
            <dt>{t("facts.profile")}</dt>
            <dd>
              <a href="/denzel-rigaud" onClick={onNavigate}>
                expectedend.co/denzel-rigaud
              </a>
            </dd>
          </div>
        </dl>
        <div className={styles.entityList}>
          {ENTITY_LINKS.map((entity) => (
            <a key={entity.identifier} href={entity.href} target="_blank" rel="noopener noreferrer" aria-label={t("facts.entityLabel", { name: entity.name })}>
              <span className={styles.entityName}>{entity.name}</span>
              <small>Wikidata / {entity.identifier}</small>
              <ArrowUpRightIcon />
            </a>
          ))}
        </div>
      </section>

      <section className={styles.section} id="projects" aria-labelledby="projects-title">
        <header className={styles.sectionHeading}>
          <p className={styles.kicker}>{t("projects.kicker")}</p>
          <h2 id="projects-title">{t("projects.title")}</h2>
          <p>{t("projects.text")}</p>
        </header>
        <div className={styles.projectGrid}>
          <article className={styles.projectCard}>
            <img src="/brand/mybiblelens.png" alt={t("projects.mybiblelens.alt")} loading="lazy" />
            <div>
              <p>{t("projects.mybiblelens.kicker")}</p>
              <h3>MyBibleLens</h3>
              <p>{t("projects.mybiblelens.text")}</p>
              <a href="https://mybiblelens.us/" target="_blank" rel="noopener noreferrer">
                {t("projects.mybiblelens.visit")} <ArrowUpRightIcon />
              </a>
            </div>
          </article>
          <article className={styles.projectCard}>
            <img src="/brand/thewatercheck.png" alt={t("projects.watercheck.alt")} loading="lazy" />
            <div>
              <p>{t("projects.watercheck.kicker")}</p>
              <h3>The Water Check</h3>
              <p>{t("projects.watercheck.text")}</p>
              <a href="/thewatercheckpage" onClick={onNavigate}>
                {t("projects.watercheck.visit")} <ArrowUpRightIcon />
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className={[styles.section, styles.licenseSection].join(" ")} id="licensing" aria-labelledby="licensing-title">
        <div className={styles.licenseCopy}>
          <p className={styles.kicker}>{t("license.kicker")}</p>
          <h2 id="licensing-title">{t("license.title")}</h2>
          <p>
            <Trans
              t={t}
              i18nKey="license.text"
              components={{
                // biome-ignore lint/a11y/useAnchorContent: Trans puts the link words inside.
                license: <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="license noopener noreferrer" />,
              }}
            />
          </p>
          <a
            className={styles.primaryAction}
            href="/media/denzel-rigaud-founder-hero.png"
            download="denzel-rigaud-founder-portrait.png"
            aria-label={t("license.download")}
          >
            {t("license.download")} <ArrowDownIcon />
          </a>
        </div>
        <img
          className={styles.licensePortrait}
          src="/media/denzel-rigaud-founder-hero.png"
          alt=""
          loading="lazy"
          aria-hidden="true"
        />
      </section>

      <section className={styles.contact} aria-labelledby="press-contact-title">
        <p className={styles.kicker}>{t("contact.kicker")}</p>
        <h2 id="press-contact-title">{t("contact.title")}</h2>
        {/* biome-ignore lint/a11y/useValidAnchor: this is an addressable cross-route section link */}
        <a href="/about#contact" onClick={onNavigate}>
          {t("inquiry")} <ArrowUpRightIcon />
        </a>
      </section>
    </main>
  );
}
