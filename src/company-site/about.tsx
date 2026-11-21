import * as React from "react";
import { Trans, useTranslation } from "react-i18next";
import { ArrowUpRightIcon } from "./action-icons";
import page from "./company-page.module.css";
import cyber from "./cyber.module.css";
import { useHomeMotion } from "./home-motion";

type AboutPageProps = {
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

/** About in the home page's look: the mission, a link to the founder story and the press kit, and a way to reach out. */
export function AboutPage({ onNavigate }: AboutPageProps) {
  const { t } = useTranslation("about");
  const { t: tContact } = useTranslation("contact");
  const { t: tShell } = useTranslation("shell");
  const mainRef = React.useRef<HTMLElement>(null);
  useHomeMotion(mainRef);

  return (
    <main className={cyber.page} ref={mainRef}>
      <header className={page.head}>
        <div className={cyber.wrap}>
          <p className={`${cyber.eyebrow} ${cyber.rise}`}>{t("intro.kicker")}</p>
          <h1 className={`${page.h1} ${cyber.rise}`} style={{ animationDelay: ".15s" }}>
            {t("intro.title")}
          </h1>
        </div>
      </header>

      <section className={cyber.section} id="mission" aria-labelledby="about-mission-title">
        <div className={`${cyber.wrap} ${page.split}`}>
          <div data-reveal>
            <p className={cyber.eyebrow}>{t("mission.kicker")}</p>
            <h2 id="about-mission-title" className={cyber.title}>
              {t("mission.title")}
            </h2>
          </div>
          <div className={page.copy} data-reveal style={{ "--reveal-delay": "100ms" } as React.CSSProperties}>
            <p>{t("mission.attention")}</p>
            <p>{t("mission.screen")}</p>
            <p className={page.missionLine}>{t("mission.line")}</p>
          </div>
        </div>
      </section>

      <section className={cyber.section} style={{ paddingTop: 0 }} aria-label={t("founder.kicker")}>
        <div className={`${cyber.wrap} ${page.cardRow}`} style={{ marginTop: 0 }}>
          <article className={page.card} id="founder-story" aria-labelledby="about-founder-title" data-reveal>
            <span className={page.label}>{t("founder.kicker")}</span>
            <h3 id="about-founder-title">{t("founder.title")}</h3>
            <p>
              <Trans t={t} i18nKey="founder.body" components={{ more: <span hidden /> }} />
            </p>
            <a className={`${cyber.btn} ${cyber.btnLight} ${page.cardAction}`} href="/denzel-rigaud" onClick={onNavigate}>
              {t("founder.link")} <ArrowUpRightIcon />
            </a>
          </article>
          <article className={page.card} id="press" data-reveal style={{ "--reveal-delay": "100ms" } as React.CSSProperties}>
            <span className={page.label}>{t("press.kicker")}</span>
            <h3>{t("press.title")}</h3>
            <p>{t("press.body")}</p>
            <a className={`${cyber.btn} ${page.cardAction}`} href="/press" onClick={onNavigate}>
              {t("press.link")} <ArrowUpRightIcon />
            </a>
          </article>
        </div>
      </section>

      <section className={cyber.section} style={{ paddingTop: 0 }} aria-labelledby="about-contact-title">
        <div className={cyber.wrap}>
          <div className={page.closing} data-reveal>
            <div>
              <p className={cyber.eyebrow}>{tContact("header.kicker")}</p>
              <h2 id="about-contact-title" style={{ marginTop: 18 }}>
                <Trans t={tContact} i18nKey="header.title" components={{ em: <em className={page.accent} /> }} />
              </h2>
              <p className={cyber.lead}>{tContact("header.intro")}</p>
            </div>
            {/* biome-ignore lint/a11y/useValidAnchor: opens the contact popup (CompanySite handles #contact) */}
            <a className={`${cyber.btn} ${cyber.btnLight}`} href="/about#contact" onClick={onNavigate}>
              {tShell("nav.contact")} <ArrowUpRightIcon />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
