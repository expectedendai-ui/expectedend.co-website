import type * as React from "react";
import { Trans, useTranslation } from "react-i18next";
import { CONTACT_HREF } from "./content";

type WaterCheckFooterProps = {
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  backToTopHref?: string;
};

const YEAR = 2026;

/**
 * Footer for /thewatercheckpage only. The Water Check is for everyone, so this footer stays
 * neutral: no mission paragraph, no verse. The company appears as one small credit line.
 */
export function WaterCheckFooter({ onNavigate, backToTopHref = "#water-check-title" }: WaterCheckFooterProps) {
  const { t } = useTranslation("water");
  return (
    <footer className="waterCheckFooter" data-water-check-footer>
      <div className="waterCheckFooterInner">
        <div className="waterCheckFooterBrand">
          <a className="waterCheckFooterMark" href="/thewatercheckpage" onClick={onNavigate}>
            <img src="/brand/watercheck-store/c-mark-magic-eraser.png" alt="" width="64" height="64" loading="lazy" decoding="async" />
            <span>{t("brand")}</span>
          </a>
          <p className="waterCheckFooterNote">{t("footer.note")}</p>
        </div>

        <nav className="waterCheckFooterLinks" aria-label={t("footer.navLabel")}>
          <div>
            <p className="waterCheckFooterHeading">{t("brand")}</p>
            <a href="/thewatercheckpage#calculator">{t("footer.calculator")}</a>
            <a href="/thewatercheckpage#the-app">{t("footer.explore")}</a>
            <a href="https://www.instagram.com/thewatercheck/" target="_blank" rel="noopener noreferrer">
              {t("footer.instagram")}
            </a>
            <a href="/thewatercheckstore" onClick={onNavigate}>
              {t("footer.store")}
            </a>
            <a href="/denzel-rigaud" onClick={onNavigate}>
              {t("footer.builder")}
            </a>
          </div>
          <div>
            <p className="waterCheckFooterHeading">{t("footer.finePrint")}</p>
            <a href="/thewatercheck/terms" onClick={onNavigate}>
              {t("footer.terms")}
            </a>
            <a href="/thewatercheck/privacy" onClick={onNavigate}>
              {t("footer.privacy")}
            </a>
            <a href="/thewatercheck/community-guidelines" onClick={onNavigate}>
              {t("footer.community")}
            </a>
            <a href="/thewatercheck/consumer-health-data" onClick={onNavigate}>
              {t("footer.healthData")}
            </a>
            <a href="/thewatercheck/delete-account" onClick={onNavigate}>
              {t("footer.deleteAccount")}
            </a>
            <a href="/accessibility" onClick={onNavigate}>
              {t("footer.accessibility")}
            </a>
            <a href={CONTACT_HREF} onClick={onNavigate}>
              {t("footer.contact")}
            </a>
          </div>
        </nav>
      </div>

      <div className="waterCheckFooterBottom">
        <p>© {YEAR} The Water Check</p>
        <p>
          <Trans
            t={t}
            i18nKey="footer.project"
            // biome-ignore lint/a11y/useAnchorContent: Trans puts the link words inside.
            components={{ company: <a href="/" onClick={onNavigate} /> }}
          />
        </p>
        <a className="waterCheckFooterTop" href={backToTopHref}>
          {t("footer.backToTop")}
        </a>
      </div>
    </footer>
  );
}
