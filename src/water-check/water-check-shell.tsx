import type * as React from "react";
import {
  getWaterCheckRenderedReleaseFacts,
  WATER_CHECK_PENDING_APPROVAL_LABEL,
  WATER_CHECK_RELEASE_RECORD,
} from "./legal/water-check-release-content";
import styles from "./water-check-shell.module.css";

type WaterCheckShellProps = {
  activePath: string;
  children: React.ReactNode;
  leaving: boolean;
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

const LEGAL_LINKS = [
  ["Privacy", "/thewatercheck/privacy"],
  ["Terms", "/thewatercheck/terms"],
  ["Health & AI Disclaimer", "/thewatercheck/health-and-ai-disclaimer"],
  ["Consumer Health Data", "/thewatercheck/consumer-health-data"],
] as const;

export function WaterCheckShell({ activePath, children, leaving, onNavigate }: WaterCheckShellProps) {
  const releaseFacts = getWaterCheckRenderedReleaseFacts(WATER_CHECK_RELEASE_RECORD);

  return (
    <div className={`${styles.shell} ${leaving ? styles.leaving : ""}`} data-site-theme="water-check">
      <header className={styles.header}>
        <nav className={styles.headerNavigation} aria-label="Water Check navigation">
          <a
            className={styles.productMark}
            href="https://www.instagram.com/thewatercheck/"
            target="_blank"
            rel="noreferrer"
          >
            The Water Check
          </a>
          <a className={styles.companyReturn} href="/" onClick={onNavigate}>
            Expected End
          </a>
        </nav>
      </header>

      <div className={styles.content}>{children}</div>

      <footer className={styles.footer}>
        <nav className={styles.legalNavigation} aria-label="Water Check legal navigation">
          {LEGAL_LINKS.map(([label, href]) => (
            <a key={href} href={href} aria-current={activePath === href ? "page" : undefined} onClick={onNavigate}>
              {label}
            </a>
          ))}
          <a href="https://www.instagram.com/thewatercheck/" target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href="/" onClick={onNavigate}>
            Expected End
          </a>
        </nav>
        <p className={styles.copyright}>
          © 2026 The Water Check · Entity: {releaseFacts.entityName ?? WATER_CHECK_PENDING_APPROVAL_LABEL}
        </p>
      </footer>
    </div>
  );
}
