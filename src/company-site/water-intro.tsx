import * as React from "react";
import "./water-intro.css";

type WaterIntroProps = {
  /** When set, the intro plays once per browser session under this key. */
  sessionKey?: string;
};

const hasPlayedThisSession = (sessionKey: string) => {
  try {
    return window.sessionStorage.getItem(sessionKey) === "1";
  } catch {
    return false;
  }
};

const markPlayed = (sessionKey: string) => {
  try {
    window.sessionStorage.setItem(sessionKey, "1");
  } catch {
    // Storage can be unavailable in private modes; the intro simply replays.
  }
};

export function WaterIntro({ sessionKey }: WaterIntroProps) {
  const [visible] = React.useState(() => (sessionKey ? !hasPlayedThisSession(sessionKey) : true));

  React.useEffect(() => {
    if (visible && sessionKey) markPlayed(sessionKey);
  }, [visible, sessionKey]);

  if (!visible) return null;

  return (
    <div className="waterIntro" data-water-intro aria-hidden="true">
      <div className="waterIntroLogo">
        <img src="/brand/watercheck-store/c-mark-magic-eraser.png" alt="" width="700" height="700" decoding="async" />
      </div>
      <div className="waterIntroFill waterIntroFillBack">
        <svg viewBox="0 0 1440 190" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <path d="M0 112C218 20 438 171 705 92C946 20 1177 161 1440 66V190H0Z" />
        </svg>
      </div>
      <div className="waterIntroFill waterIntroFillFront">
        <svg viewBox="0 0 1440 190" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <path d="M0 78C244 164 476 18 735 99C970 173 1199 25 1440 108V190H0Z" />
        </svg>
      </div>
      <p className="waterIntroWordmark">The Water Check</p>
    </div>
  );
}
