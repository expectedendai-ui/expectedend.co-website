import type * as React from "react";
import { Trans, useTranslation } from "react-i18next";
import { ArrowDownIcon, ArrowUpRightIcon } from "./action-icons";
import { ContactForm } from "./contact-form";
import styles from "./style.module.css";

type AboutPageProps = {
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

export function AboutPage({ onNavigate }: AboutPageProps) {
  const { t } = useTranslation("about");
  return (
    <main className={styles.aboutMain}>
      <section className={styles.aboutLayout}>
        <p className={styles.kicker}>{t("intro.kicker")}</p>
        <h1>{t("intro.title")}</h1>
      </section>

      <div className={styles.aboutStory}>
        <section className={styles.founderReveal} id="founder-story" aria-labelledby="founder-reveal-title">
          <div className={styles.founderRevealIntro}>
            <p className={styles.kicker}>{t("founder.kicker")}</p>
            <h2 id="founder-reveal-title">{t("founder.title")}</h2>
            <p>
              <Trans t={t} i18nKey="founder.body" components={{ more: <span className={styles.founderReadMore} /> }} />
            </p>
          </div>
          <a className={styles.founderToggle} href="/denzel-rigaud" onClick={onNavigate}>
            <span>{t("founder.link")}</span>
            <ArrowUpRightIcon className={styles.founderToggleIcon} />
          </a>
        </section>

        <section className={styles.missionStory} id="mission" aria-labelledby="about-mission-title">
          <div>
            <p className={styles.kicker}>{t("mission.kicker")}</p>
            <h2 id="about-mission-title">{t("mission.title")}</h2>
          </div>
          <div className={styles.missionCopy}>
            <p>{t("mission.attention")}</p>
            <p>{t("mission.screen")}</p>
            <p className={styles.missionLine}>{t("mission.line")}</p>
          </div>
        </section>

        <section className={styles.pressSection} id="press" aria-labelledby="press-title">
          <div>
            <p className={styles.kicker}>{t("press.kicker")}</p>
            <h2 id="press-title">{t("press.title")}</h2>
          </div>
          <div>
            <p>{t("press.body")}</p>
            <a className={styles.actionWithIcon} href="/press" onClick={onNavigate}>
              {t("press.link")} <ArrowDownIcon className={styles.actionIcon} />
            </a>
          </div>
        </section>
      </div>

      <ContactForm />
    </main>
  );
}
