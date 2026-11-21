import * as React from "react";
import { Trans, useTranslation } from "react-i18next";
import { ArrowDownIcon, ArrowUpRightIcon } from "./action-icons";
import { FOUNDER_DESCRIPTION } from "./content";
import { useContentText } from "./content-i18n";
import page from "./company-page.module.css";
import cyber from "./cyber.module.css";
import { useHomeMotion } from "./home-motion";

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
  const mainRef = React.useRef<HTMLElement>(null);
  useHomeMotion(mainRef);
  const inquiry = (className: string) => (
    // biome-ignore lint/a11y/useValidAnchor: opens the contact popup on "Press or media" (CompanySite handles #contact)
    <a className={className} href="/about#contact" data-contact-reason="Press or media" onClick={onNavigate}>
      {t("inquiry")} <ArrowUpRightIcon />
    </a>
  );
  const portraitDownload = (label?: string) => (
    <a
      className={cyber.btn}
      href="/media/denzel-rigaud-founder-hero.png"
      download="denzel-rigaud-founder-portrait.png"
      aria-label={label}
    >
      {label ?? t("hero.downloadPortrait")} <ArrowDownIcon />
    </a>
  );

  return (
    <main className={cyber.page} ref={mainRef}>
      <script type="application/ld+json">{JSON.stringify(PRESS_PAGE_SCHEMA)}</script>

      <header className={page.head}>
        <div className={`${cyber.wrap} ${page.headGrid}`}>
          <div>
            <p className={`${cyber.eyebrow} ${cyber.rise}`}>{t("hero.kicker")}</p>
            <h1 className={`${page.h1} ${cyber.rise}`} style={{ animationDelay: ".15s" }}>
              {t("hero.title")}
            </h1>
            <p className={`${cyber.lead} ${cyber.rise}`} style={{ animationDelay: ".3s" }}>
              {t("hero.intro")}
            </p>
            <div className={`${cyber.actions} ${cyber.rise}`} style={{ animationDelay: ".45s" }}>
              {inquiry(`${cyber.btn} ${cyber.btnLight}`)}
              {portraitDownload()}
            </div>
          </div>
          <figure className={`${page.portrait} ${cyber.rise}`} style={{ animationDelay: ".3s" }}>
            <img src="/media/denzel-rigaud-founder-hero.png" alt={t("portrait.alt")} />
            <figcaption>
              <strong>Denzel Rigaud</strong>
              <span>{t("role")}</span>
            </figcaption>
          </figure>
        </div>
      </header>

      <nav className={cyber.wrap} aria-label={t("contents.label")}>
        <div className={page.contents}>
          <span>{t("contents.kit")}</span>
          <a href="#biographies">{t("contents.biographies")}</a>
          <a href="#facts">{t("contents.facts")}</a>
          <a href="#projects">{t("contents.projects")}</a>
          <a href="#licensing">{t("contents.licensing")}</a>
        </div>
      </nav>

      <section className={cyber.section} id="biographies" aria-labelledby="biographies-title">
        <div className={cyber.wrap}>
          <div data-reveal>
            <p className={cyber.eyebrow}>{t("bios.kicker")}</p>
            <h2 id="biographies-title" className={cyber.title}>
              {t("bios.title")}
            </h2>
            <p className={cyber.lead}>{t("bios.text")}</p>
          </div>
          <div className={page.cardRow}>
            <article className={page.card} data-reveal>
              <span className={page.label}>{t("bios.shortLabel")}</span>
              <p data-testid="short-bio">{founderDescription(FOUNDER_DESCRIPTION)}</p>
            </article>
            <article className={page.card} data-reveal style={{ "--reveal-delay": "100ms" } as React.CSSProperties}>
              <span className={page.label}>{t("bios.fullLabel")}</span>
              <div data-testid="full-bio" className={page.copy}>
                <p>{t("bios.fullFirst")}</p>
                <p>{t("bios.fullSecond")}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className={cyber.section} style={{ paddingTop: 0 }} id="facts" aria-label={t("facts.title")}>
        <div className={cyber.wrap}>
          <div data-reveal>
            <p className={cyber.eyebrow}>{t("facts.kicker")}</p>
            <h2 className={cyber.title}>{t("facts.title")}</h2>
            <p className={cyber.lead}>{t("facts.text")}</p>
          </div>
          <dl className={page.facts} data-reveal>
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
          <div className={page.entities} data-reveal>
            {ENTITY_LINKS.map((entity) => (
              <a key={entity.identifier} href={entity.href} target="_blank" rel="noopener noreferrer" aria-label={t("facts.entityLabel", { name: entity.name })}>
                <span>{entity.name}</span>
                <small>Wikidata / {entity.identifier}</small>
                <ArrowUpRightIcon />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className={cyber.section} style={{ paddingTop: 0 }} id="projects" aria-labelledby="projects-title">
        <div className={cyber.wrap}>
          <div data-reveal>
            <p className={cyber.eyebrow}>{t("projects.kicker")}</p>
            <h2 id="projects-title" className={cyber.title}>
              {t("projects.title")}
            </h2>
            <p className={cyber.lead}>{t("projects.text")}</p>
          </div>
          <div className={page.cardRow}>
            <article className={`${page.card} ${page.product}`} data-reveal>
              <img src="/brand/mybiblelens.png" alt={t("projects.mybiblelens.alt")} loading="lazy" />
              <div>
                <span className={page.label}>{t("projects.mybiblelens.kicker")}</span>
                <h3>MyBibleLens</h3>
                <p>{t("projects.mybiblelens.text")}</p>
                <a href="https://mybiblelens.us/" target="_blank" rel="noopener noreferrer">
                  {t("projects.mybiblelens.visit")} <ArrowUpRightIcon />
                </a>
              </div>
            </article>
            <article className={`${page.card} ${page.product}`} data-reveal style={{ "--reveal-delay": "100ms" } as React.CSSProperties}>
              <img src="/brand/thewatercheck.png" alt={t("projects.watercheck.alt")} loading="lazy" />
              <div>
                <span className={page.label}>{t("projects.watercheck.kicker")}</span>
                <h3>The Water Check</h3>
                <p>{t("projects.watercheck.text")}</p>
                <a href="/thewatercheckpage" onClick={onNavigate}>
                  {t("projects.watercheck.visit")} <ArrowUpRightIcon />
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className={cyber.section} style={{ paddingTop: 0 }} id="licensing" aria-labelledby="licensing-title">
        <div className={`${cyber.wrap} ${page.split}`}>
          <div data-reveal>
            <p className={cyber.eyebrow}>{t("license.kicker")}</p>
            <h2 id="licensing-title" className={cyber.title}>
              {t("license.title")}
            </h2>
          </div>
          <div className={page.copy} data-reveal style={{ "--reveal-delay": "100ms" } as React.CSSProperties}>
            <p>
              <Trans
                t={t}
                i18nKey="license.text"
                components={{
                  // biome-ignore lint/a11y/useAnchorContent: Trans puts the link words inside.
                  license: <a className={page.licenseLink} href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="license noopener noreferrer" />,
                }}
              />
            </p>
            {portraitDownload(t("license.download"))}
          </div>
        </div>
      </section>

      <section className={cyber.section} style={{ paddingTop: 0 }} aria-labelledby="press-contact-title">
        <div className={cyber.wrap}>
          <div className={page.closing} data-reveal>
            <div>
              <p className={cyber.eyebrow}>{t("contact.kicker")}</p>
              <h2 id="press-contact-title" style={{ marginTop: 18 }}>
                {t("contact.title")}
              </h2>
            </div>
            {inquiry(`${cyber.btn} ${cyber.btnLight}`)}
          </div>
        </div>
      </section>
    </main>
  );
}
