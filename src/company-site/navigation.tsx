import type * as React from "react";
import type { NavTheme } from "./routes";
import styles from "./style.module.css";

type NavigationProps = {
  isHome: boolean;
  theme?: NavTheme;
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

export function Navigation({ isHome, theme = "blue", onNavigate }: NavigationProps) {
  const sectionRoot = isHome ? "" : "/";

  return (
    <nav className={styles.nav} data-nav-theme={theme} aria-label="Main navigation">
      <div className={styles.navLinks}>
        <a className={styles.sectionLink} href={`${sectionRoot}#projects`} onClick={onNavigate}>
          Projects
        </a>
        <a className={styles.sectionLink} href={`${sectionRoot}#services`} onClick={onNavigate}>
          Services
        </a>
        <a className={styles.companyNav} href="/about" onClick={onNavigate}>
          Mission · About · Press
        </a>
        {/* biome-ignore lint/a11y/useValidAnchor: this is an addressable cross-route section link */}
        <a className={styles.contactNav} href="/about#contact" onClick={onNavigate}>
          Contact
        </a>
      </div>
    </nav>
  );
}
