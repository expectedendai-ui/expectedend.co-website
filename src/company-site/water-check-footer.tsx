import type * as React from "react";
import { CONTACT_HREF } from "./content";

type WaterCheckFooterProps = {
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

const YEAR = 2026;

/**
 * Footer for /thewatercheckpage only. The Water Check is for everyone, so this footer stays
 * neutral: no mission paragraph, no verse. The company appears as one small credit line.
 */
export function WaterCheckFooter({ onNavigate }: WaterCheckFooterProps) {
  return (
    <footer className="waterCheckFooter" data-water-check-footer>
      <div className="waterCheckFooterInner">
        <div className="waterCheckFooterBrand">
          <a className="waterCheckFooterMark" href="/thewatercheckpage" onClick={onNavigate}>
            <img src="/brand/watercheck-store/c-mark-magic-eraser.png" alt="" width="64" height="64" loading="lazy" decoding="async" />
            <span>The Water Check</span>
          </a>
          <p className="waterCheckFooterNote">
            No sign-ups, no account, nothing saved. The calculator runs in your browser and your numbers never leave it.
          </p>
        </div>

        <nav className="waterCheckFooterLinks" aria-label="Footer navigation">
          <div>
            <p className="waterCheckFooterHeading">The Water Check</p>
            <a href="#calculator">Hydration calculator</a>
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
            <a href="/terms" onClick={onNavigate}>
              Terms of Use
            </a>
            <a href="/privacy" onClick={onNavigate}>
              Privacy Statement
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
        <a className="waterCheckFooterTop" href="#water-check-title">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
