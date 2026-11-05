import * as React from "react";
import { useTranslation } from "react-i18next";
import styles from "./style.module.css";

type GoldenEggButtonProps = {
  onActivate: () => void;
};

export function GoldenEggButton({ onActivate }: GoldenEggButtonProps) {
  const { t } = useTranslation("founder");
  const [armed, setArmed] = React.useState(false);
  const armedRef = React.useRef(false);
  const resetTimerRef = React.useRef<number | null>(null);

  const clearActivation = React.useCallback(() => {
    if (resetTimerRef.current !== null) window.clearTimeout(resetTimerRef.current);
    resetTimerRef.current = null;
    armedRef.current = false;
    setArmed(false);
  }, []);

  React.useEffect(
    () => () => {
      if (resetTimerRef.current !== null) window.clearTimeout(resetTimerRef.current);
    },
    []
  );

  const handleActivate = () => {
    if (armedRef.current) {
      clearActivation();
      onActivate();
      return;
    }

    armedRef.current = true;
    setArmed(true);
    resetTimerRef.current = window.setTimeout(clearActivation, 1_000);
  };

  return (
    <>
      <button
        className={styles.eggButton}
        type="button"
        aria-label={t("egg.label")}
        onClick={handleActivate}
      >
        <img src="/brand/golden-egg.png" alt="" width="20" height="20" />
      </button>
      <output className={styles.srOnly} aria-live="polite">
        {armed ? t("egg.armed") : ""}
      </output>
    </>
  );
}
