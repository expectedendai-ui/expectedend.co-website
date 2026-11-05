import type * as React from "react";
import { useTranslation } from "react-i18next";
import type { NavTheme } from "./routes";
import styles from "./style.module.css";

type NavigationProps = {
  theme?: NavTheme;
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

export function Navigation({ theme = "blue", onNavigate }: NavigationProps) {
  const { t } = useTranslation("shell");
  return (
    <nav className={styles.nav} data-nav-theme={theme} aria-label={t("nav.label")}>
      <div className={styles.navLinks}>
        {/* biome-ignore lint/a11y/useValidAnchor: this is an addressable cross-route section link */}
        <a className={styles.sectionLink} href="/#projects" onClick={onNavigate}>
          {t("nav.projects")}
        </a>
        {/* biome-ignore lint/a11y/useValidAnchor: this is an addressable cross-route section link */}
        <a className={styles.sectionLink} href="/#services" onClick={onNavigate}>
          {t("nav.services")}
        </a>
        <a className={styles.companyNav} href="/about" onClick={onNavigate}>
          {t("nav.company")}
        </a>
        {/* biome-ignore lint/a11y/useValidAnchor: this is an addressable cross-route section link */}
        <a className={styles.contactNav} href="/about#contact" onClick={onNavigate}>
          {t("nav.contact")}
        </a>
      </div>
    </nav>
  );
}
