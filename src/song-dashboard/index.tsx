import * as React from "react";
import { createPortal } from "react-dom";
import styles from "./style.module.css";

// Secret door: the blinking underscore after "select your track" opens the HUD,
// but ONLY when it is lit (opacity > 0). Looks like an ordinary blinking cursor.
// TODO: before deploying, set this to the hosted Cloudflare HUD URL.
const HUD_URL = "https://andre-hud.pages.dev";
function secretDoor(e: React.MouseEvent<HTMLSpanElement>) {
  const lit = Number.parseFloat(getComputedStyle(e.currentTarget).opacity) > 0;
  if (lit) window.location.href = HUD_URL;
}

// noBass: true → the track plays without the bass-driven page shake / name jitter.
export type Track = { name: string; artist: string; src: string; noBass?: boolean };

// Michael Jackson first (default). Audio files live in /public/audio (gitignored).
export const TRACKS: Track[] = [
  { name: "Rock With You", artist: "Michael Jackson", src: "/audio/track-mj.mp4", noBass: true },
  { name: "All The Way Turnt Up", artist: "Roscoe Dash", src: "/audio/track.mp4" },
  { name: "These Words", artist: "Natasha Bedingfield", src: "/audio/track-natasha.mp4", noBass: true },
  { name: "Boogie Oogie", artist: "Brooke Valentine ft. Fabolous & Yo-Yo", src: "/audio/track-brooke.mp4" },
  { name: "WE ON GO", artist: "BIA", src: "/audio/track-bia.mp4" },
  { name: "Candle Flame", artist: "Jungle ft. Erick The Architect", src: "/audio/track-jungle.mp4" },
  { name: "I Met God On The Dancefloor", artist: "Rave Jesus", src: "/audio/track-ravejesus.mp4" },
];

// The easter egg behind the "Read Me..." button on the gate.
const EASTER_EGG = [
  "You found the Easter egg! 🎉",
  "Honestly, my phone ran out of storage, and I couldn't bring myself to delete my past. So I figured, why not build a time capsule for the future?",
  "Looking back at these photos, I see a life full of mini-endeavors. I was raised by incredibly strong women who made me grow up early, and the greatest lesson they taught me was this: whenever you fall, God is there to catch you.",
  "A lot of life happened in these frames. After my dad passed away, I lived on my own through my junior and senior years of high school, in an apartment at University Pointe, right off Griffin Road. It was a heavy season, but when I look at these photos, I have zero regrets. Every moment shaped my character and made me who I am today.",
  "People can judge, blame, or criticize all they want. But as the Bible reminds us, God is the ultimate forgiver, so who are any of us to judge?",
  "Whoever you are, reading this: it doesn't matter where you come from or where you started. It's all about where you're going.",
];

function ReadMe() {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <>
      <button type="button" className={styles.readMe} onClick={() => setOpen(true)}>
        Read Me...
      </button>
      {open &&
        createPortal(
          // biome-ignore lint/a11y: the backdrop click is a convenience; Escape and the Close button also close it
          <div className={styles.eggBackdrop} onClick={() => setOpen(false)}>
            <div
              className={styles.egg}
              role="dialog"
              aria-modal="true"
              aria-label="Read Me"
              onClick={(e) => e.stopPropagation()}
            >
              {EASTER_EGG.map((line, i) => (
                <p key={line} className={i === 0 ? styles.eggTitle : undefined}>
                  {line}
                </p>
              ))}
              <button type="button" className={styles.eggClose} onClick={() => setOpen(false)}>
                Close
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

// Full-screen entry gate shown after the binary loader. Picking a track is the
// user gesture that unlocks audio and triggers the canvas dolly-in.
export function SongGate({ leaving, onPick }: { leaving: boolean; onPick: (i: number) => void }) {
  return (
    <div className={`${styles.gate} ${leaving ? styles.leaving : ""}`}>
      <div className={styles.archiveNote}>
        <span className={styles.archiveYears}>2021-2025</span>
        <ReadMe />
      </div>
      <h1 className={styles.title}>
        select your track
        {/* biome-ignore lint/a11y: intentional hidden door, not a public control */}
        <span className={styles.blink} onClick={secretDoor}>
          _
        </span>
      </h1>
      <div className={styles.grid}>
        {TRACKS.map((t, i) => (
          <button key={t.src} type="button" className={styles.song} onClick={() => onPick(i)}>
            <span className={styles.num}>{`0${i + 1}`}</span>
            <span className={styles.name}>{t.name}</span>
            <span className={styles.artist}>{t.artist}</span>
          </button>
        ))}
      </div>
      <div className={styles.hint}>tap a track to enter</div>
    </div>
  );
}

// Tiny bottom switcher to change songs while exploring the canvas.
export function SongSwitcher({ active, onSwitch }: { active: number; onSwitch: (i: number) => void }) {
  return (
    <div className={styles.switcher}>
      {TRACKS.map((t, i) => (
        <button
          key={t.src}
          type="button"
          className={`${styles.dot} ${i === active ? styles.active : ""}`}
          title={`${t.name} — ${t.artist}`}
          aria-label={`Play ${t.name} by ${t.artist}`}
          onClick={() => onSwitch(i)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
