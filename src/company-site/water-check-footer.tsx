import type * as React from "react";
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
  return (
    <footer className="waterCheckFooter" data-water-check-footer>
      <div className="waterCheckFooterInner">
        <div className="waterCheckFooterBrand">
          <a className="waterCheckFooterMark" href="/thewatercheckpage" onClick={onNavigate}>
            <img src="/brand/watercheck-store/c-mark-magic-eraser.png" alt="" width="64" height="64" loading="lazy" decoding="async" />
            <span>The Water Check</span>
          </a>
          <p className="waterCheckFooterNote">
            The free calculator needs no account. It runs in your browser and does not send your numbers to us.
          </p>
        </div>

        <nav className="waterCheckFooterLinks" aria-label="Footer navigation">
          <div>
            <p className="waterCheckFooterHeading">The Water Check</p>
            <a href="/thewatercheckpage#calculator">Hydration calculator</a>
            <a href="/thewatercheckpage#the-app">Explore the app</a>
            <a href="https://www.instagram.com/thewatercheck/" target="_blank" rel="noopener noreferrer">
              @thewatercheck on Instagram
            </a>
            <a href="/thewatercheckstore" onClick={onNavigate}>
              The store
            </a>
            <a href="/denzel-rigaud" onClick={onNavigate}>
              Who built this
            </a>
          </div>
          <div>
            <p className="waterCheckFooterHeading">The fine print</p>
            <a href="/thewatercheck/terms" onClick={onNavigate}>
              Terms of Use
            </a>
            <a href="/thewatercheck/privacy" onClick={onNavigate}>
              Privacy Notice
            </a>
            <a href="/thewatercheck/consumer-health-data" onClick={onNavigate}>
              Consumer Health Data
            </a>
            <a href="/thewatercheck/delete-account" onClick={onNavigate}>
              Delete your account
            </a>
            <a href="/accessibility" onClick={onNavigate}>
              Accessibility
            </a>
            <a href={CONTACT_HREF} onClick={onNavigate}>
              Contact
            </a>
          </div>
        </nav>
      </div>

      <div className="waterCheckFooterBottom">
        <p>© {YEAR} The Water Check</p>
        <p>
          An{" "}
          <a href="/" onClick={onNavigate}>
            Expected End LLC
          </a>{" "}
          project. Educational estimate, not medical advice.
        </p>
        <a className="waterCheckFooterTop" href={backToTopHref}>
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
