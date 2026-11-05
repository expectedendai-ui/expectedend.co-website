import type * as React from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("founder");
  return (
    <footer className="founderFooter" data-founder-footer>
      <div className="founderFooterInner">
        <div className="founderFooterVoice">
          <p className="founderFooterKicker">Denzel Rigaud</p>
          <p className="founderFooterLine">{t("footer.line")}</p>
          <p className="founderFooterSign">{t("footer.sign")}</p>
        </div>

        <nav className="founderFooterLinks" aria-label={t("footer.label")}>
          <div>
            <p className="founderFooterHeading">{t("footer.build")}</p>
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
              {t("footer.pressKit")}
            </a>
          </div>
          <div>
            <p className="founderFooterHeading">{t("footer.find")}</p>
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
            <p className="founderFooterHeading">{t("footer.finePrint")}</p>
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
          </div>
        </nav>
      </div>

      <div className="founderFooterBottom">
        <p>{t("footer.copyright", { year: YEAR })}</p>
        <div className="founderFooterBlessing">
          <p>{t("footer.blessing")}</p>
          {onOpenArtWorld && <GoldenEggButton onActivate={onOpenArtWorld} />}
        </div>
      </div>
    </footer>
  );
}
