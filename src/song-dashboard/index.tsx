import * as React from "react";
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

// Full-screen entry gate shown after the binary loader. Picking a track is the
// user gesture that unlocks audio and triggers the canvas dolly-in.
export function SongGate({ leaving, onPick }: { leaving: boolean; onPick: (i: number) => void }) {
  return (
    <div className={`${styles.gate} ${leaving ? styles.leaving : ""}`}>
      <div className={styles.archiveNote}>
        <span className={styles.archiveYears}>2021-2025</span>
        <span>- I got bored, and my iCloud storage was full.</span>
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
