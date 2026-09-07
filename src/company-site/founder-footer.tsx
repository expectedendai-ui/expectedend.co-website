import type * as React from "react";
import { CONTACT_HREF } from "./content";
import "./founder-chrome.css";
import { GoldenEggButton } from "./golden-egg-button";

type FounderFooterProps = {
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  onOpenArtWorld?: () => void;
};

const YEAR = 2026;

/** Personal sign-off footer for /denzel-rigaud only. Dark, in the story page's palette. */
export function FounderFooter({ onNavigate, onOpenArtWorld }: FounderFooterProps) {
  return (
    <footer className="founderFooter" data-founder-footer>
      <div className="founderFooterInner">
        <div className="founderFooterVoice">
          <p className="founderFooterKicker">Denzel Rigaud</p>
          <p className="founderFooterLine">
            Technology isn't for us to doom-scroll and live other people's lives. It should better our spirit, soul, mind,
            and flesh.
          </p>
          <p className="founderFooterSign">Founder, Expected End LLC. Boca Raton, Florida.</p>
        </div>

        <nav className="founderFooterLinks" aria-label="Footer navigation">
          <div>
            <p className="founderFooterHeading">What I build</p>
            <a href="/thewatercheckpage" onClick={onNavigate}>
              The Water Check
            </a>
            <a href="https://mybiblelens.us/" target="_blank" rel="noopener noreferrer">
              MyBibleLens
            </a>
            <a href="/" onClick={onNavigate}>
              Expected End
            </a>
            <a href="/press" onClick={onNavigate}>
              Press kit
            </a>
          </div>
          <div>
            <p className="founderFooterHeading">Find me</p>
            <a href="https://www.instagram.com/smiledenzel/" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="https://www.linkedin.com/in/denzel-rigaud-2b0200210/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="https://www.youtube.com/@expectedendco" target="_blank" rel="noopener noreferrer">
              YouTube
            </a>
            <a href="https://github.com/blackdynamitee" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
          <div>
            <p className="founderFooterHeading">The fine print</p>
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

      <div className="founderFooterBottom">
        <p>© {YEAR} Expected End LLC. All rights reserved.</p>
        <div className="founderFooterBlessing">
          <p>Jesus loves you.</p>
          {onOpenArtWorld && <GoldenEggButton onActivate={onOpenArtWorld} />}
        </div>
      </div>
    </footer>
  );
}
