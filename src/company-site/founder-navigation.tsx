import type * as React from "react";
import "./founder-chrome.css";

type FounderNavigationProps = {
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

/** Dark, minimal nav for /denzel-rigaud only. The story page keeps its own palette. */
export function FounderNavigation({ onNavigate }: FounderNavigationProps) {
  const projectsHref = `/${"#projects"}`;
  return (
    <nav className="founderNav" data-founder-nav aria-label="Main navigation">
      <a className="founderNavName" href="/denzel-rigaud" onClick={onNavigate}>
        Denzel Rigaud
      </a>
      <div className="founderNavLinks">
        <a href="#memoir">Story</a>
        <a href={projectsHref} onClick={onNavigate}>
          Projects
        </a>
        <a href="/thewatercheckpage" onClick={onNavigate}>
          Water Check
        </a>
        <a className="founderNavContact" href="#channel-title">
          Contact
        </a>
      </div>
    </nav>
  );
}
