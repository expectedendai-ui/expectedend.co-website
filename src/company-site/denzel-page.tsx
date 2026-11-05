import * as React from "react";
import { Trans, useTranslation } from "react-i18next";
import { ArrowDownIcon, ArrowUpRightIcon, InstagramIcon, LinkedInIcon, YouTubeIcon } from "./action-icons";
import { FOUNDER_DESCRIPTION } from "./content";
import { type ArcStat, CyberHero, Ticker } from "./cyber-hero";
import cyber from "./cyber.module.css";
import pageStyles from "./denzel-page.module.css";
import { useHomeMotion } from "./home-motion";
import { VerseDialog } from "./verse-dialog";

type DenzelPageProps = {
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

const EXTERNAL_RECORDS = [
  {
    id: "worldAthletics",
    href: "https://worldathletics.org/athletes/united-states/denzel-rigaud-15142195",
  },
  {
    id: "lynn",
    href: "https://lynnfightingknights.com/sports/mens-cross-country/roster/denzel-rigaud/7913",
  },
  { id: "wikidata", href: "https://www.wikidata.org/wiki/Q140198525" },
] as const;

const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://expectedend.co/denzel-rigaud#person",
  name: "Denzel Rigaud",
  url: "https://expectedend.co/denzel-rigaud",
  image: {
    "@type": "ImageObject",
    "@id": "https://expectedend.co/press#founder-portrait",
    contentUrl: "https://expectedend.co/media/denzel-rigaud-founder.png",
    width: 1058,
    height: 1487,
    caption: "Denzel Rigaud, founder of Expected End",
    creditText: "Denzel Rigaud / Expected End",
    license: "https://creativecommons.org/licenses/by-sa/4.0/",
    acquireLicensePage: "https://expectedend.co/press#licensing",
  },
  jobTitle: "Founder and Full-Stack Developer",
  description: FOUNDER_DESCRIPTION,
  worksFor: {
    "@type": "Organization",
    "@id": "https://expectedend.co/#organization",
    name: "Expected End",
    legalName: "EXPECTEDEND LLC",
    url: "https://expectedend.co/",
  },
  memberOf: {
    "@type": "CollegeOrUniversity",
    "@id": "https://www.wikidata.org/wiki/Q3269570",
    name: "Lynn University",
    url: "https://www.lynn.edu/",
  },
  owns: [
    {
      "@type": "SoftwareApplication",
      "@id": "https://expectedend.co/#mybiblelens",
      name: "MyBibleLens",
      url: "https://mybiblelens.us/",
      sameAs: ["https://www.wikidata.org/wiki/Q141251174", "https://apps.apple.com/us/app/mybiblelens/id6764069602"],
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://expectedend.co/thewatercheckpage#application",
      name: "The Water Check",
      url: "https://expectedend.co/thewatercheckpage",
      sameAs: ["https://www.wikidata.org/wiki/Q141251206", "https://www.instagram.com/thewatercheck/"],
    },
  ],
  sameAs: [
    "https://www.instagram.com/smiledenzel/",
    "https://www.linkedin.com/in/denzel-rigaud-2b0200210/",
    "https://www.youtube.com/@expectedendco",
    "https://github.com/blackdynamitee",
    ...EXTERNAL_RECORDS.map(({ href }) => href),
  ],
};

const PROFILE_PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": "https://expectedend.co/denzel-rigaud#profile",
  url: "https://expectedend.co/denzel-rigaud",
  name: "Denzel Rigaud — Founder of Expected End",
  description: FOUNDER_DESCRIPTION,
  dateModified: "2026-09-03",
  mainEntity: PERSON_SCHEMA,
};

const MEMORY_PHOTOS = [
  {
    id: "father",
    src: "/media/denzel-memory-01-father.jpg",
    download: "/media/denzel-memory-01-father.jpg",
    filename: "denzel-rigaud-father-memory.jpg",
  },
  {
    id: "work",
    src: "/media/denzel-memory-02-real-work.jpg",
    download: "/media/denzel-memory-02-real-work.jpg",
    filename: "denzel-rigaud-real-work-memory.jpg",
  },
  {
    id: "workspace",
    src: "/media/denzel-memory-03-workspace-display.jpg",
    download: "/media/denzel-memory-03-workspace.jpg",
    filename: "denzel-rigaud-mybiblelens-workspace.jpg",
  },
  {
    id: "archive",
    src: "/media/denzel-memory-04-real-work-archive-display.jpg",
    download: "/media/denzel-memory-04-real-work-archive.png",
    filename: "denzel-rigaud-real-work-archive.png",
  },
] as const;

export function DenzelPage({ onNavigate }: DenzelPageProps) {
  const { t } = useTranslation("founder");
  const mainRef = React.useRef<HTMLElement>(null);
  const [showVerse, setShowVerse] = React.useState(false);
  useHomeMotion(mainRef);
  const turningPoints: readonly ArcStat[] = [
    { value: "5", suffix: t("hero.stats.gradeSuffix"), label: t("hero.stats.grade") },
    { value: "2021", label: t("hero.stats.grief") },
    { value: "2026", label: t("hero.stats.faith") },
  ];

  return (
    <main className={`${cyber.page} ${pageStyles.page}`} ref={mainRef}>
      <script type="application/ld+json">{JSON.stringify(PROFILE_PAGE_SCHEMA)}</script>

      <CyberHero
        variant="founder"
        labelledBy="denzel-hero-title"
        photoAlt={t("hero.photoAlt")}
        stats={turningPoints}
        scan
        hud={
          <>
            <span>
              <Trans t={t} i18nKey="hero.identity" components={{ b: <b /> }} />
            </span>
            <span>
              <Trans t={t} i18nKey="hero.founded" components={{ time: <time dateTime="2026-03-03" /> }} />
            </span>
            <span aria-hidden="true">26.0218° N / 80.1484° W</span>
          </>
        }
      >
        <p className={`${cyber.heroEyebrow} ${cyber.rise}`} style={{ animationDelay: ".15s" }}>
          <Trans t={t} i18nKey="hero.eyebrow" components={{ em: <em /> }} />
        </p>
        <h1 id="denzel-hero-title" className={`${cyber.heroTitle} ${cyber.rise}`} style={{ animationDelay: ".3s" }}>
          <Trans t={t} i18nKey="hero.title" components={{ br: <br /> }} />
        </h1>
        <p className={`${cyber.heroText} ${cyber.rise}`} style={{ animationDelay: ".5s" }}>
          {t("hero.text")}
        </p>
        <div className={cyber.rise} style={{ animationDelay: ".7s" }}>
          <a className={cyber.cta} href="#memoir">
            <span className={cyber.shine} aria-hidden="true" />
            <span className={cyber.ctaLabel}>{t("hero.cta")}</span>
            <ArrowDownIcon />
          </a>
        </div>
      </CyberHero>

      <Ticker
        items={[
          t("ticker.curiosity"),
          t("ticker.grief"),
          t("ticker.faith"),
          t("ticker.code"),
          t("ticker.purpose"),
          t("verse.reference"),
        ]}
      />

      <section className={pageStyles.coordinates} aria-labelledby="coordinates-title">
        <header data-reveal>
          <p className={cyber.eyebrow}>{t("coordinates.eyebrow")}</p>
          <h2 id="coordinates-title">
            <Trans t={t} i18nKey="coordinates.title" components={{ em: <em /> }} />
          </h2>
        </header>
        <ol>
          <li data-reveal>
            <span>{t("coordinates.curiosity.label")}</span>
            <strong>{t("coordinates.curiosity.title")}</strong>
            <p>{t("coordinates.curiosity.body")}</p>
            <span className={pageStyles.coordBig} aria-hidden="true">
              {t("coordinates.curiosity.big")}
            </span>
          </li>
          <li data-reveal>
            <span>{t("coordinates.grief.label")}</span>
            <strong>{t("coordinates.grief.title")}</strong>
            <p>{t("coordinates.grief.body")}</p>
            <span className={pageStyles.coordBig} aria-hidden="true">
              2021
            </span>
          </li>
          <li data-reveal>
            <span>{t("coordinates.faith.label")}</span>
            <strong>{t("coordinates.faith.title")}</strong>
            <p>{t("coordinates.faith.body")}</p>
            <span className={pageStyles.coordBig} aria-hidden="true">
              2026
            </span>
          </li>
        </ol>
      </section>

      <article className={pageStyles.memoir} id="memoir" aria-labelledby="memoir-title">
        <header className={pageStyles.memoirIntro} data-reveal>
          <p className={cyber.eyebrow}>{t("memoir.eyebrow")}</p>
          <h2 id="memoir-title">
            <Trans t={t} i18nKey="memoir.title" components={{ em: <em /> }} />
          </h2>
          <div>
            <p>{t("memoir.intro.first")}</p>
            <p>{t("memoir.intro.second")}</p>
          </div>
          <nav className={pageStyles.socials} aria-label={t("memoir.socials.label")}>
            <a
              href="https://www.instagram.com/smiledenzel/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("memoir.socials.instagram")}
            >
              <InstagramIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/denzel-rigaud-2b0200210/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("memoir.socials.linkedin")}
            >
              <LinkedInIcon />
            </a>
            <a href="https://www.youtube.com/@expectedendco" target="_blank" rel="noopener noreferrer" aria-label={t("memoir.socials.youtube")}>
              <YouTubeIcon />
            </a>
          </nav>
          <nav className={pageStyles.profileRecords} aria-label={t("memoir.records.label")}>
            <span>{t("memoir.records.heading")}</span>
            {EXTERNAL_RECORDS.map(({ id, href }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer">
                {t(`memoir.records.${id}`)}
              </a>
            ))}
          </nav>
        </header>

        <section className={pageStyles.chapter} aria-labelledby="family-title" data-reveal>
          <div className={pageStyles.chapterHeading}>
            <span>{t("family.number")}</span>
            <p>{t("family.kicker")}</p>
            <h3 id="family-title">{t("family.title")}</h3>
          </div>
          <div className={pageStyles.chapterCopy}>
            <p>
              <Trans
                t={t}
                i18nKey="family.first"
                components={{
                  // biome-ignore lint/a11y/useAnchorContent: Trans puts the link words inside.
                  brother: <a href="https://www.linkedin.com/in/kareem-rigaud-2b61b97a" target="_blank" rel="noopener noreferrer" />,
                }}
              />
            </p>
            <p>{t("family.second")}</p>
            <p>{t("family.third")}</p>
          </div>
        </section>

        <section className={pageStyles.chapter} aria-labelledby="return-title" data-reveal>
          <div className={pageStyles.chapterHeading}>
            <span>{t("return.number")}</span>
            <p>{t("return.kicker")}</p>
            <h3 id="return-title">{t("return.title")}</h3>
          </div>
          <div className={pageStyles.chapterCopy}>
            <p>{t("return.first")}</p>
            <p>{t("return.second")}</p>
            <p>{t("return.third")}</p>
          </div>
        </section>

        <section className={pageStyles.draft} aria-labelledby="truth-code-title">
          <header data-reveal>
            <span>{t("draft.label")}</span>
            <h2 id="truth-code-title">{t("draft.title")}</h2>
          </header>
          <section className={pageStyles.draftChapter} aria-labelledby="digital-venom-title" data-reveal>
            <h3 id="digital-venom-title">{t("venom.title")}</h3>
            <div className={pageStyles.chapterCopy}>
              <p>{t("venom.first")}</p>
              <p>{t("venom.second")}</p>
              <p>
                <Trans
                  t={t}
                  i18nKey="venom.third"
                  components={{
                    strong: <strong />,
                  }}
                />
              </p>
              <p>{t("venom.fourth")}</p>
              <p>
                <Trans
                  t={t}
                  i18nKey="venom.fifth"
                  components={{
                    strong: <strong />,
                    // biome-ignore lint/a11y/useAnchorContent: Trans puts the link words inside.
                    bloom: <a href="https://www.google.com/search?q=Bloom%E2%80%99s+Taxonomy&rlz=1C5CHFA_enUS943US944&oq=Bloom%E2%80%99s+Taxonomy&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTINCAEQABiRAhiABBiKBTIHCAIQABiABDIHCAMQABiABDIHCAQQABiABDIHCAUQABiABDIHCAYQABiABDIHCAcQABiABDIHCAgQABiABDIHCAkQABiABNIBBzYxM2owajeoAgCwAgA&sourceid=chrome&source=chrome.ob&ie=UTF-8#sv=CAMSVhozKhFpYy1HNmY1Y0hkMnBHTXd3TTIORzZmNWNIZDJwR013d006DlJma0VGQmdwZUNVZzRNIAQqGwoEc3ZpbRIRaWMtRzZmNWNIZDJwR013d00YATABGAcgs57hCA" target="_blank" rel="noopener noreferrer" />,
                    // biome-ignore lint/a11y/useAnchorContent: Trans puts the link words inside.
                    erikson: <a href="https://www.google.com/search?sca_esv=d99a864848ea4cca&rlz=1C5CHFA_enUS943US944&sxsrf=APpeQnunCsq8WpbDElkjRbmEZUbf8b9yuw:1786282564310&udm=2&fbs=ABfTbFVyMZGZf1hfvX9uKjN_-G8c4u0nXx4bEIpwm1lnNH832SMIiTl3t-JZ4hGJOxPbHYSIu8Q64jU5EwQ-803VaKbd8XGNh2EAGT96nVa30badWZdQJOrgSsOpll5rxyNcIceuSHrD98r42QCy2VpGaYtAW8zKT6mHypPIWJGeeRm7tzF71PjUOVFXsXUiM6lom55kLPulHeTkVQO3xs0VJ3Z6hOEzmQ&q=Erikson+stages+of+life&sa=X&ved=2ahUKEwjy6dqN1ZOWAxUiSzABHXMiOC8QtKgLegQIGRAB&biw=859&bih=872&dpr=2" target="_blank" rel="noopener noreferrer" />,
                  }}
                />
              </p>
            </div>
          </section>

          <section className={pageStyles.draftChapter} aria-labelledby="crucible-title" data-reveal>
            <h3 id="crucible-title">{t("crucible.title")}</h3>
            <div className={pageStyles.chapterCopy}>
              <p>
                <Trans
                  t={t}
                  i18nKey="crucible.first"
                  components={{
                    // biome-ignore lint/a11y/useAnchorContent: Trans puts the link words inside.
                    court: <a href="https://unicourt.com/case/fl-pal-rigaud-denzel-v-hall-aaron-914059" target="_blank" rel="noreferrer" />,
                    // biome-ignore lint/a11y/useAnchorContent: Trans puts the link words inside.
                    search: <a href="https://www.google.com/search?sca_esv=4f4e6eb4e747ddd2&rlz=1C5CHFA_enUS943US944&sxsrf=APpeQnuG9TE471N73TYP7yCoA2imGwD_zA%3A1782396826570&q=rigaud+vs+pineapple+scuba&sa=X&ved=2ahUKEwjM5sjNyaKVAxUhnWoFHVgDL1IQ7xYoAHoECBAQAQ&biw=1041&bih=872&dpr=2" target="_blank" rel="noreferrer" />,
                    // biome-ignore lint/a11y/useAnchorContent: Trans puts the link words inside.
                    father: <a href="https://www.google.com/search?q=clifford+rigaud" target="_blank" rel="noreferrer" />,
                  }}
                />
              </p>
              <p>{t("crucible.second")}</p>
              <p>
                <Trans
                  t={t}
                  i18nKey="crucible.third"
                  components={{
                    // biome-ignore lint/a11y/useAnchorContent: Trans puts the link words inside.
                    chivalry: <a href="https://www.youtube.com/watch?v=SHVKb2j6rfc&list=RDSHVKb2j6rfc&start_radio=1" target="_blank" rel="noreferrer" />,
                  }}
                />
              </p>
              <p>{t("crucible.fourth")}</p>
              <p>{t("crucible.fifth")}</p>
              <p className={pageStyles.closingMission}>
                {t("crucible.mission")}{" "}
                <button
                  className={pageStyles.inlineVerse}
                  type="button"
                  aria-haspopup="dialog"
                  onClick={() => setShowVerse(true)}
                >
                  {t("verse.reference")}
                </button>
              </p>
              <nav className={pageStyles.connectRow} aria-label={t("crucible.connect.label")}>
                <a
                  className={`${pageStyles.connectButton} ${pageStyles.connectYouTube}`}
                  href="https://www.youtube.com/@expectedendco"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("crucible.connect.youtube")}
                >
                  <span className={pageStyles.connectSweep} aria-hidden="true" />
                  <YouTubeIcon />
                </a>
                <a
                  className={`${pageStyles.connectButton} ${pageStyles.connectInstagram}`}
                  href="https://www.instagram.com/smiledenzel/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("crucible.connect.instagram")}
                >
                  <span className={pageStyles.connectSweep} aria-hidden="true" />
                  <InstagramIcon />
                </a>
                <a
                  className={`${pageStyles.connectButton} ${pageStyles.connectLinkedIn}`}
                  href="https://www.linkedin.com/in/denzel-rigaud-2b0200210/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("crucible.connect.linkedin")}
                >
                  <span className={pageStyles.connectSweep} aria-hidden="true" />
                  <LinkedInIcon />
                </a>
              </nav>
            </div>
          </section>

          <section className={pageStyles.memoryArchive} aria-labelledby="memory-archive-title">
            <header className={pageStyles.memoryHeader} data-reveal>
              <span>{t("memory.label")}</span>
              <h3 id="memory-archive-title">{t("memory.title")}</h3>
              <p>{t("memory.text")}</p>
            </header>
            <div className={pageStyles.memoryGrid}>
              {MEMORY_PHOTOS.map((photo, index) => {
                const memoryNumber = String(index + 1).padStart(2, "0");
                const title = t(`memory.photos.${photo.id}.title`);
                return (
                  <figure className={pageStyles.memoryCard} key={photo.download} data-reveal>
                    <div className={pageStyles.memoryFrame}>
                      <img src={photo.src} alt={t(`memory.photos.${photo.id}.alt`)} loading="lazy" decoding="async" />
                      <a
                        className={pageStyles.memoryDownload}
                        href={photo.download}
                        download={photo.filename}
                        aria-label={t("memory.download", { number: memoryNumber, title })}
                      >
                        <ArrowDownIcon />
                      </a>
                    </div>
                    <figcaption>
                      <span>{t("memory.number", { number: memoryNumber })}</span>
                      <strong>{title}</strong>
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </section>
        </section>
      </article>

      <section className={pageStyles.channel} aria-labelledby="channel-title">
        <div className={pageStyles.channelSignal} aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <p className={cyber.eyebrow}>{t("channel.eyebrow")}</p>
        <h2 id="channel-title">
          <Trans t={t} i18nKey="channel.title" components={{ em: <em /> }} />
        </h2>
        <p>{t("channel.text")}</p>
        <div className={pageStyles.channelActions}>
          {/* biome-ignore lint/a11y/useValidAnchor: this is an addressable cross-route section link */}
          <a href="/about#contact" onClick={onNavigate} aria-label={t("channel.contact")}>
            {t("channel.contact")} <ArrowUpRightIcon />
          </a>
          <a href="/about" onClick={onNavigate}>
            {t("channel.back")}
          </a>
        </div>
      </section>

      {showVerse && <VerseDialog onClose={() => setShowVerse(false)} />}
    </main>
  );
}
