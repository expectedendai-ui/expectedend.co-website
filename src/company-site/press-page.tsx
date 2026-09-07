import type * as React from "react";
import { ArrowDownIcon, ArrowUpRightIcon } from "./action-icons";
import { FOUNDER_DESCRIPTION } from "./content";
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
      legalName: "Expected End LLC",
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
    label: "Denzel Rigaud on Wikidata",
    identifier: "Q140198525",
  },
  {
    name: "MyBibleLens",
    href: "https://www.wikidata.org/wiki/Q141251174",
    label: "MyBibleLens on Wikidata",
    identifier: "Q141251174",
  },
  {
    name: "The Water Check",
    href: "https://www.wikidata.org/wiki/Q141251206",
    label: "The Water Check on Wikidata",
    identifier: "Q141251206",
  },
] as const;

export function PressPage({ onNavigate }: PressPageProps) {
  return (
    <main className={styles.page}>
      <script type="application/ld+json">{JSON.stringify(PRESS_PAGE_SCHEMA)}</script>

      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>Press &amp; media</p>
          <h1>Press resources for Expected End.</h1>
          <p className={styles.intro}>
            Approved biographies, verified facts, and downloadable media for coverage of Expected End and founder Denzel Rigaud.
          </p>
          <div className={styles.actions}>
            {/* biome-ignore lint/a11y/useValidAnchor: this is an addressable cross-route section link */}
            <a className={styles.primaryAction} href="/about#contact" onClick={onNavigate}>
              Start a press inquiry <ArrowUpRightIcon />
            </a>
            <a
              className={styles.secondaryAction}
              href="/media/denzel-rigaud-founder-hero.png"
              download="denzel-rigaud-founder-portrait.png"
            >
              Download portrait <ArrowDownIcon />
            </a>
          </div>
        </div>

        <figure className={styles.portrait}>
          <img src="/media/denzel-rigaud-founder-hero.png" alt="Denzel Rigaud in a navy suit and orange-tinted glasses" />
          <figcaption>
            <strong>Denzel Rigaud</strong>
            <span className={styles.portraitRole}>Founder and solo full-stack developer</span>
          </figcaption>
        </figure>
      </header>

      <nav className={styles.contents} aria-label="Press page sections">
        <span className={styles.contentsLabel}>Press kit / 2026</span>
        <a href="#biographies">Biographies</a>
        <a href="#facts">Verified facts</a>
        <a href="#projects">Projects</a>
        <a href="#licensing">Media use</a>
      </nav>

      <section className={styles.section} id="biographies" aria-labelledby="biographies-title">
        <header className={styles.sectionHeading}>
          <p className={styles.kicker}>Approved copy</p>
          <h2 id="biographies-title">Biographies</h2>
          <p>These versions may be quoted or adapted for editorial coverage.</p>
        </header>
        <div className={styles.bioGrid}>
          <article className={styles.bioCard}>
            <span className={styles.bioLabel}>Short bio / 24 words</span>
            <p data-testid="short-bio">{FOUNDER_DESCRIPTION}</p>
          </article>
          <article className={styles.bioCard}>
            <span className={styles.bioLabel}>Full bio</span>
            <div data-testid="full-bio">
              <p>
                Denzel Rigaud founded Expected End LLC and built MyBibleLens and The Water Check independently. He works as the
                company&apos;s solo full-stack developer, shaping each product from concept through design, engineering, and
                release.
              </p>
              <p>
                His work focuses on faith-centered software, digital well-being, and practical tools that help people use
                technology with intention. MyBibleLens is the World&apos;s First Sanctuary App for Christianity. The Water Check
                combines a private hydration estimate, practical water habits, and a community focused on daily consistency.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className={[styles.section, styles.factSection].join(" ")} id="facts" aria-label="Verified facts">
        <header className={styles.sectionHeading}>
          <p className={styles.kicker}>Fact sheet</p>
          <h2>Verified facts</h2>
          <p>Canonical details for profiles, articles, captions, and databases.</p>
        </header>
        <dl className={styles.factList}>
          <div>
            <dt>Company</dt>
            <dd>Expected End LLC</dd>
          </div>
          <div>
            <dt>Founder</dt>
            <dd>Denzel Rigaud</dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd>Founder and solo full-stack developer</dd>
          </div>
          <div>
            <dt>Products</dt>
            <dd>MyBibleLens and The Water Check</dd>
          </div>
          <div>
            <dt>Official website</dt>
            <dd>
              <a href="https://expectedend.co/">expectedend.co</a>
            </dd>
          </div>
          <div>
            <dt>Founder profile</dt>
            <dd>
              <a href="/denzel-rigaud" onClick={onNavigate}>
                expectedend.co/denzel-rigaud
              </a>
            </dd>
          </div>
        </dl>
        <div className={styles.entityList}>
          {ENTITY_LINKS.map((entity) => (
            <a key={entity.identifier} href={entity.href} target="_blank" rel="noopener noreferrer" aria-label={entity.label}>
              <span className={styles.entityName}>{entity.name}</span>
              <small>Wikidata / {entity.identifier}</small>
              <ArrowUpRightIcon />
            </a>
          ))}
        </div>
      </section>

      <section className={styles.section} id="projects" aria-labelledby="projects-title">
        <header className={styles.sectionHeading}>
          <p className={styles.kicker}>Products</p>
          <h2 id="projects-title">The work</h2>
          <p>Two products, built independently under Expected End.</p>
        </header>
        <div className={styles.projectGrid}>
          <article className={styles.projectCard}>
            <img src="/brand/mybiblelens.png" alt="MyBibleLens app icon" loading="lazy" />
            <div>
              <p>Faith-centered software</p>
              <h3>MyBibleLens</h3>
              <p>The World&apos;s First Sanctuary App for Christianity.</p>
              <a href="https://mybiblelens.us/" target="_blank" rel="noopener noreferrer">
                Visit MyBibleLens <ArrowUpRightIcon />
              </a>
            </div>
          </article>
          <article className={styles.projectCard}>
            <img src="/brand/thewatercheck.png" alt="The Water Check app icon" loading="lazy" />
            <div>
              <p>Hydration and community</p>
              <h3>The Water Check</h3>
              <p>A private hydration estimate, practical water habits, and community.</p>
              <a href="/thewatercheckpage" onClick={onNavigate}>
                Visit The Water Check <ArrowUpRightIcon />
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className={[styles.section, styles.licenseSection].join(" ")} id="licensing" aria-labelledby="licensing-title">
        <div className={styles.licenseCopy}>
          <p className={styles.kicker}>Media use</p>
          <h2 id="licensing-title">Founder portrait</h2>
          <p>
            The portrait may be shared and adapted under the{" "}
            <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="license noopener noreferrer">
              Creative Commons Attribution-ShareAlike 4.0
            </a>{" "}
            license. Credit: Denzel Rigaud / Expected End. Adaptations must use the same license.
          </p>
          <a
            className={styles.primaryAction}
            href="/media/denzel-rigaud-founder-hero.png"
            download="denzel-rigaud-founder-portrait.png"
            aria-label="Download founder portrait"
          >
            Download founder portrait <ArrowDownIcon />
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
        <p className={styles.kicker}>Press contact</p>
        <h2 id="press-contact-title">Need an interview, quote, or additional file?</h2>
        {/* biome-ignore lint/a11y/useValidAnchor: this is an addressable cross-route section link */}
        <a href="/about#contact" onClick={onNavigate}>
          Start a press inquiry <ArrowUpRightIcon />
        </a>
      </section>
    </main>
  );
}
