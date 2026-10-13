import * as React from "react";
import manifest from "~/src/artworks/manifest.json";
import { foundEggs, lastEggClaim, subscribeEggs } from "./store";
import styles from "./style.module.css";

// The fun layer on the art world: a gold burst when someone first gets in, then a
// hunt for golden eggs hidden on photos (tag any photo or video with "egg": true).
export const EGG_COUNT = (manifest as { egg?: boolean }[]).filter((m) => m.egg).length;

function useFound() {
  return React.useSyncExternalStore(subscribeEggs, foundEggs, foundEggs).length;
}

// A short rising chime made on the fly, so there is no sound file to ship.
function chime(step: number) {
  try {
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    const base = 660 * 2 ** (step / 12);
    [0, 4, 7, 12].forEach((semi, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = base * 2 ** (semi / 12);
      const t = ctx.currentTime + i * 0.07;
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.18, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.5);
    });
    window.setTimeout(() => void ctx.close(), 1200);
  } catch {
    // No audio available: the sparkle still plays.
  }
}

const SPARKS = Array.from({ length: 26 }, (_, i) => i);
function Sparks({ big }: { big?: boolean }) {
  return (
    <div className={styles.sparks} aria-hidden="true">
      {SPARKS.map((i) => (
        <i
          key={i}
          style={{ "--a": `${(360 / SPARKS.length) * i}deg`, "--d": `${(big ? 120 : 60) + (i % 4) * (big ? 45 : 22)}px` } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

export function FoundBurst() {
  const [show, setShow] = React.useState(true);
  React.useEffect(() => {
    const t = window.setTimeout(() => setShow(false), 4600);
    return () => window.clearTimeout(t);
  }, []);
  if (!show) return null;
  return (
    <div className={styles.burst} aria-live="polite">
      <Sparks big />
      <p className={styles.found}>
        You found the hidden art world.
        <small>Only a few people ever do. {EGG_COUNT} golden eggs are hiding in these photos. Look closer.</small>
      </p>
    </div>
  );
}

export function EggHunt() {
  const found = useFound();
  const [pops, setPops] = React.useState<{ id: number; x: number; y: number }[]>([]);
  const [bump, setBump] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const seen = React.useRef(found);

  React.useEffect(() => {
    if (found <= seen.current) return;
    seen.current = found;
    const claim = lastEggClaim();
    if (claim) {
      const id = claim.at;
      setPops((p) => [...p, { id, x: claim.x, y: claim.y }]);
      window.setTimeout(() => setPops((p) => p.filter((q) => q.id !== id)), 1400);
    }
    chime(found * 2);
    setBump(true);
    const t = window.setTimeout(() => setBump(false), 600);
    if (found === EGG_COUNT) window.setTimeout(() => setDone(true), 900);
    return () => window.clearTimeout(t);
  }, [found]);

  return (
    <>
      <div className={`${styles.counter} ${bump ? styles.bump : ""}`} aria-live="polite">
        <img src="/brand/golden-egg.png" alt="" width="16" height="16" />
        {found}/{EGG_COUNT}
      </div>
      {pops.map((p) => (
        <div key={p.id} className={styles.pop} style={{ left: p.x, top: p.y }}>
          <Sparks />
          <b>+1</b>
        </div>
      ))}
      {done && (
        // biome-ignore lint/a11y: the backdrop click is a convenience; the button also closes it
        <div className={styles.doneBackdrop} onClick={() => setDone(false)}>
          <div
            className={styles.done}
            role="dialog"
            aria-modal="true"
            aria-label="All eggs found"
            onClick={(e) => e.stopPropagation()}
          >
            <Sparks big />
            <p className={styles.doneTitle}>All {EGG_COUNT} golden eggs. 🥚✨</p>
            <p>You looked closer than almost anyone. Thank you for taking the time to walk through these years with me.</p>
            <p>Keep looking closer at your own life too. The good stuff is usually hiding in plain sight.</p>
            <button type="button" className={styles.doneClose} onClick={() => setDone(false)}>
              Keep exploring
            </button>
          </div>
        </div>
      )}
    </>
  );
}
