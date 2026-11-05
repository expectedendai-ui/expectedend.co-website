import type * as React from "react";
import { useTranslation } from "react-i18next";
import { CONTACT_HREF } from "./content";
import { GoldenEggButton } from "./golden-egg-button";
import styles from "./style.module.css";

type FooterProps = {
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  onOpenArtWorld?: () => void;
};

export function Footer({ onNavigate, onOpenArtWorld }: FooterProps) {
  const { t } = useTranslation("shell");
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <a className={styles.footerWordmark} href="/" onClick={onNavigate}>
          EXPECTEDEND LLC
        </a>
        <nav className={styles.footerLinks} aria-label={t("footer.label")}>
          <a href="/" onClick={onNavigate}>
            {t("footer.home")}
          </a>
          <a href="/about" onClick={onNavigate}>
            {t("footer.about")}
          </a>
          <a href="/press" onClick={onNavigate}>
            {t("footer.press")}
          </a>
          <a href="/terms" onClick={onNavigate}>
            {t("footer.terms")}
          </a>
          <a href="/privacy" onClick={onNavigate}>
            {t("footer.privacy")}
          </a>
          <a href="/accessibility" onClick={onNavigate}>
            {t("footer.accessibility")}
          </a>
          <a href={CONTACT_HREF} onClick={onNavigate}>
            {t("footer.contact")}
          </a>
        </nav>
      </div>
      <div className={styles.footerMission}>
        <p>{t("footer.mission")}</p>
        <p className={styles.footerVerse}>{t("footer.verse")}</p>
      </div>
      <div className={styles.footerBottom}>
        <p>{t("footer.copyright")}</p>
        <div className={styles.footerBlessing}>
          <p className={styles.blessing}>{t("footer.blessing")}</p>
          {onOpenArtWorld && <GoldenEggButton onActivate={onOpenArtWorld} />}
        </div>
      </div>
    </footer>
  );
}
