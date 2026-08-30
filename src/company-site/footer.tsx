import * as React from "react";
import { CONTACT_HREF } from "./content";
import { GoldenEggButton } from "./golden-egg-button";
import styles from "./style.module.css";

type FooterProps = {
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  onOpenArtWorld?: () => void;
};

export function Footer({ onNavigate, onOpenArtWorld }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <a className={styles.footerWordmark} href="/" onClick={onNavigate}>Expected End Inc</a>
        <nav className={styles.footerLinks} aria-label="Footer navigation">
          <a href="/" onClick={onNavigate}>Home</a>
          <a href="/about" onClick={onNavigate}>About</a>
          <a href="/terms" onClick={onNavigate}>Terms of Use</a>
          <a href="/privacy" onClick={onNavigate}>Privacy Statement</a>
          <a href="/accessibility" onClick={onNavigate}>Accessibility</a>
          <a href={CONTACT_HREF} onClick={onNavigate}>Contact</a>
        </nav>
      </div>
      <div className={styles.footerMission}>
        <p>Everything I build under this company points toward the same mission: bring people closer to God and help them use technology to live, create, love, and serve with intention. That is the expected ending I am working toward.</p>
        <p className={styles.footerVerse}>Jeremiah 29:11</p>
      </div>
      <div className={styles.footerBottom}>
        <p>© 2026 EXPECTED END LLC. All rights reserved.</p>
        <div className={styles.footerBlessing}>
          <p className={styles.blessing}>Jesus loves you.</p>
          {onOpenArtWorld && <GoldenEggButton onActivate={onOpenArtWorld} />}
        </div>
      </div>
    </footer>
  );
}
