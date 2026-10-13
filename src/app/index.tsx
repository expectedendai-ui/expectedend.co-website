import * as React from "react";
import manifest from "~/src/artworks/manifest.json";
import { ColorSwitcher, THEMES, type ThemeKey } from "~/src/color-switcher";
import { Frame } from "~/src/frame";
import { InfiniteCanvas } from "~/src/infinite-canvas";
import type { MediaItem } from "~/src/infinite-canvas/types";
import { MatrixLoader } from "~/src/loader";
import { CompanySite } from "~/src/company-site";
import { AiNotice, ScareModal, useScareTriggers } from "~/src/scare";
import { EggHunt, FoundBurst } from "~/src/egg-hunt";
import { SongGate, SongSwitcher, TRACKS } from "~/src/song-dashboard";

// Audio files (gitignored, served from /public/audio) are real MP4s — a silent
// 2×2 video stream + AAC audio — so iOS Safari treats them as proper "media"
// (plays on silent mode, plays reliably from a tap). Raw MP3 is iffy on iOS.

// Bass detection tuning — covers ~0–185Hz with default 2048 FFT @ 48kHz.
const BASS_BIN_COUNT = 8;
const BASS_THRESHOLD = 0.72;
const BASS_COOLDOWN_MS = 360;

export function App() {
  const [media] = React.useState<MediaItem[]>(manifest as MediaItem[]);
  const [loading, setLoading] = React.useState(false); // binary takeover — plays on egg tap, not on page load
  const [covered, setCovered] = React.useState(true);
  const [eggLeaving, setEggLeaving] = React.useState(false);
  const [picking, setPicking] = React.useState(false);
  const [gateLeaving, setGateLeaving] = React.useState(false);
  const [entered, setEntered] = React.useState(false);
  const [selected, setSelected] = React.useState(0); // default credit = MJ
  const [scareOpen, setScareOpen] = React.useState(false);
  const [theme, setTheme] = React.useState<ThemeKey>("black");
  const artActive = loading || !covered || picking || entered;

  // Using <video playsinline> instead of <audio> so audio plays even when
  // iOS Safari users have their physical silent switch on.
  const audioRef = React.useRef<HTMLVideoElement>(null);
  const ctxRef = React.useRef<AudioContext | null>(null);
  const wiredRef = React.useRef(false);
  const rafRef = React.useRef(0);
  const lastThumpRef = React.useRef(0);
  const noBassRef = React.useRef(false); // current track opts out of the bass-driven shake

  const triggerScare = React.useCallback(() => setScareOpen(true), []);
  useScareTriggers(triggerScare, entered);

  // On the calmer tracks (no bass shake) the name fades out while someone moves
  // around the canvas, so the photos get the screen, and fades back when they stop.
  React.useEffect(() => {
    if (!entered) return;
    let idle = 0;
    const move = () => {
      if (!noBassRef.current) return;
      document.body.classList.add("name-fade");
      window.clearTimeout(idle);
      idle = window.setTimeout(() => document.body.classList.remove("name-fade"), 1400);
    };
    const drag = (e: PointerEvent) => {
      if (e.buttons) move();
    };
    const events: [string, EventListener][] = [
      ["wheel", move],
      ["touchmove", move],
      ["keydown", move],
      ["pointermove", drag as EventListener],
    ];
    for (const [name, fn] of events) window.addEventListener(name, fn, { passive: true });
    return () => {
      for (const [name, fn] of events) window.removeEventListener(name, fn);
      window.clearTimeout(idle);
      document.body.classList.remove("name-fade");
    };
  }, [entered]);

  // Drive the <body> palette (black/white/brown) from the chosen theme.
  React.useEffect(() => {
    if (artActive) document.body.dataset.theme = theme;
  }, [artActive, theme]);
  const fogColor = THEMES.find((t) => t.key === theme)?.fog ?? "#0a0a0a";

  // Wire the Web Audio analyser ONCE (createMediaElementSource is per-element).
  // The bass loop reacts to whichever track is currently playing.
  const wireAnalyser = React.useCallback(() => {
    if (wiredRef.current) return;
    const el = audioRef.current;
    if (!el) return;
    try {
      const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctor();
      ctxRef.current = ctx;
      const src = ctx.createMediaElementSource(el);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.55;
      src.connect(analyser);
      analyser.connect(ctx.destination);
      wiredRef.current = true;

      const bins = new Uint8Array(analyser.frequencyBinCount);
      const tick = () => {
        analyser.getByteFrequencyData(bins);
        let sum = 0;
        for (let i = 0; i < BASS_BIN_COUNT; i++) sum += bins[i];
        const energy = sum / (BASS_BIN_COUNT * 255);
        const now = performance.now();
        if (!noBassRef.current && energy > BASS_THRESHOLD && now - lastThumpRef.current > BASS_COOLDOWN_MS) {
          lastThumpRef.current = now;
          document.body.classList.add("thump");
          setTimeout(() => document.body.classList.remove("thump"), 360);
          const x = (Math.random() - 0.5) * 90;
          const y = (Math.random() - 0.5) * 80;
          const rot = (Math.random() - 0.5) * 80;
          const scale = 0.7 + Math.random() * 0.9;
          document.body.style.setProperty("--name-x", `${x.toFixed(1)}vw`);
          document.body.style.setProperty("--name-y", `${y.toFixed(1)}vh`);
          document.body.style.setProperty("--name-rot", `${rot.toFixed(1)}deg`);
          document.body.style.setProperty("--name-scale", scale.toFixed(2));
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    } catch {
      wiredRef.current = false;
    }
  }, []);

  // Play a track. Called from the gate (entry) and the switcher (live swap).
  // The click that calls this is the user gesture iOS needs to start audio.
  const playTrack = React.useCallback(
    (i: number) => {
      const el = audioRef.current;
      if (!el) return;
      el.src = TRACKS[i].src;
      el.volume = 0.6;
      el.muted = false;
      el.currentTime = 0;
      // Some tracks (MJ, Natasha) play WITHOUT the bass shake — clear any lingering jitter.
      noBassRef.current = !!TRACKS[i].noBass;
      if (!noBassRef.current) document.body.classList.remove("name-fade");
      if (noBassRef.current) {
        document.body.classList.remove("thump");
        document.body.style.setProperty("--name-x", "0vw");
        document.body.style.setProperty("--name-y", "0vh");
        document.body.style.setProperty("--name-rot", "0deg");
        document.body.style.setProperty("--name-scale", "1");
      }
      void el
        .play()
        .then(() => {
          if (ctxRef.current && ctxRef.current.state === "suspended") void ctxRef.current.resume();
          wireAnalyser();
        })
        .catch(() => {});
      setSelected(i);
    },
    [wireAnalyser]
  );

  // Binary takeover finished its self-fade → unmount it, revealing the song
  // gate that was swapped in underneath while the screen was covered.
  const onLoaderDone = React.useCallback(() => {
    setLoading(false);
  }, []);

  // Easter egg clicked → binary rain slams over the menu (opaque from frame
  // one, z 9999). Under its cover, swap the menu out and the song gate in;
  // the loader's fade then reveals the gate.
  const onEggOpen = React.useCallback(() => {
    setLoading(true);
    setEggLeaving(true);
    window.setTimeout(() => {
      setCovered(false);
      setPicking(true);
    }, 400);
  }, []);

  // A song was picked at the gate → play it, fade the gate, and dolly the
  // canvas in (InfiniteCanvas listens for "ee-entrance").
  const onPick = React.useCallback(
    (i: number) => {
      playTrack(i);
      setGateLeaving(true);
      setEntered(true);
      window.dispatchEvent(new CustomEvent("ee-entrance"));
      window.setTimeout(() => setPicking(false), 650);
    },
    [playTrack]
  );

  React.useEffect(
    () => () => {
      cancelAnimationFrame(rafRef.current);
      void ctxRef.current?.close();
    },
    []
  );

  if (!media.length) {
    return null;
  }

  return (
    <>
      {artActive && <Frame nowPlaying={TRACKS[selected]} />}
      {artActive && <InfiniteCanvas media={media} fogColor={fogColor} />}
      {loading && <MatrixLoader onDone={onLoaderDone} />}
      {/* The menu IS the landing page now — no loader in front of it. The
          binary takeover only runs on egg tap, as the door to the art world. */}
      {covered && <CompanySite leaving={eggLeaving} onOpenArtWorld={onEggOpen} />}
      {picking && <SongGate leaving={gateLeaving} onPick={onPick} />}
      {entered && <SongSwitcher active={selected} onSwitch={playTrack} />}
      {entered && <ColorSwitcher active={theme} onChange={setTheme} />}
      {entered && <ScareModal open={scareOpen} onClose={() => setScareOpen(false)} />}
      {entered && <AiNotice />}
      {entered && <FoundBurst />}
      {entered && <EggHunt />}
      {/* biome-ignore lint/a11y/useMediaCaption: instrumental background track, no spoken content to caption */}
      <video
        ref={audioRef}
        loop
        playsInline
        preload="auto"
        muted={false}
        width={1}
        height={1}
        // Visually hidden but in the DOM. opacity:0 + 1×1 fixed; NOT display:none
        // (display:none would prevent iOS from allowing playback).
        style={{ position: "fixed", top: 0, left: 0, opacity: 0, pointerEvents: "none" }}
      />
    </>
  );
}
