import * as React from "react";
import styles from "./style.module.css";

const ORBITERS = [
  { src: "/brand/mybiblelens.png", size: 1, shape: "tile" },
  { src: "", size: 0.09, shape: "mote" },
  { src: "/brand/thewatercheck.png", size: 1, shape: "round" },
  { src: "", size: 0.12, shape: "mote" },
  { src: "", size: 0.07, shape: "mote" },
] as const;

function prefersReducedMotion() {
  return typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// The Expected End emblem sits in the middle; the app logos ride a tilted ellipse around it.
// Items on the far side of the ellipse drop behind the emblem, near-side items pass in front.
export function HeroStage() {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef<Array<HTMLSpanElement | null>>([]);

  React.useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const reduced = prefersReducedMotion();
    let frame = 0;
    let visible = true;
    const start = performance.now();

    const place = (now: number) => {
      const { width } = stage.getBoundingClientRect();
      // Unlaid-out stage (hidden tab, test DOM): stop; the observer restarts the loop once it is visible.
      if (!width) return;
      const rx = width * 0.46;
      const ry = width * 0.12;
      const t = reduced ? 0.6 : (now - start) / 1000;
      itemRefs.current.forEach((item, index) => {
        if (!item) return;
        const angle = t * 0.32 + (index / ORBITERS.length) * Math.PI * 2;
        const depth = Math.sin(angle);
        const x = Math.cos(angle) * rx;
        const y = depth * ry - Math.cos(angle) * width * 0.05;
        const scale = 0.7 + (depth + 1) * 0.17;
        item.style.transform = `translate(-50%, -50%) translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) scale(${scale.toFixed(3)})`;
        item.style.zIndex = depth > 0 ? "4" : "1";
        item.style.filter = depth > 0 ? "none" : `blur(${(-depth * 1.6).toFixed(2)}px) brightness(${(0.8 + depth * 0.15).toFixed(2)})`;
      });
      if (!reduced && visible) frame = requestAnimationFrame(place);
    };

    const observer = typeof IntersectionObserver === "function"
      ? new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
          cancelAnimationFrame(frame);
          if (visible && !reduced) frame = requestAnimationFrame(place);
        })
      : null;
    observer?.observe(stage);
    frame = requestAnimationFrame(place);
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, []);

  return (
    <div className={styles.heroStage} ref={stageRef}>
      <span className={styles.heroHalo} />
      <span className={styles.heroOrbitRing} />
      <span className={styles.heroEmblem}>
        <img src="/android-chrome-512x512.png" alt="" width="512" height="512" decoding="async" fetchPriority="high" />
      </span>
      <span className={styles.heroOrbitCenter}>
        {ORBITERS.map((orbiter, index) => (
          <span
            key={index}
            className={styles.heroOrbiter}
            data-shape={orbiter.shape}
            style={{ "--orbiter-size": orbiter.size } as React.CSSProperties}
            ref={(element) => { itemRefs.current[index] = element; }}
          >
            {orbiter.src ? <img src={orbiter.src} alt="" width="160" height="160" decoding="async" /> : null}
          </span>
        ))}
      </span>
    </div>
  );
}

// Scroll reveals for anything marked data-reveal, plus the hero parallax progress.
export function useHomeMotion(rootRef: React.RefObject<HTMLElement | null>) {
  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (typeof IntersectionObserver !== "function" || prefersReducedMotion()) {
      targets.forEach((target) => target.setAttribute("data-revealed", ""));
      return;
    }
    root.setAttribute("data-reveal-ready", "");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.setAttribute("data-revealed", "");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    targets.forEach((target) => observer.observe(target));
    // A fast scroll can jump clean past a card without it ever intersecting; reveal anything above the fold.
    const revealPassed = () => {
      targets.forEach((target) => {
        if (target.hasAttribute("data-revealed") || target.getBoundingClientRect().top > window.innerHeight) return;
        target.setAttribute("data-revealed", "");
        observer.unobserve(target);
      });
    };

    const hero = root.querySelector<HTMLElement>("[data-hero]");
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const progress = Math.min(1, Math.max(0, window.scrollY / Math.max(1, hero?.offsetHeight ?? 1)));
        hero?.style.setProperty("--hero-progress", progress.toFixed(3));
        revealPassed();
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      root.removeAttribute("data-reveal-ready");
    };
  }, [rootRef]);
}

// Pointer tilt for the app icons: sets CSS variables the stylesheet turns into a 3D lean and glare.
export function tiltHandlers() {
  return {
    onPointerMove(event: React.PointerEvent<HTMLElement>) {
      if (event.pointerType !== "mouse") return;
      const rect = event.currentTarget.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      event.currentTarget.style.setProperty("--tilt-x", `${((0.5 - py) * 16).toFixed(2)}deg`);
      event.currentTarget.style.setProperty("--tilt-y", `${((px - 0.5) * 18).toFixed(2)}deg`);
      event.currentTarget.style.setProperty("--glare-x", `${(px * 100).toFixed(1)}%`);
      event.currentTarget.style.setProperty("--glare-y", `${(py * 100).toFixed(1)}%`);
    },
    onPointerLeave(event: React.PointerEvent<HTMLElement>) {
      ["--tilt-x", "--tilt-y", "--glare-x", "--glare-y"].forEach((name) => event.currentTarget.style.removeProperty(name));
    },
  };
}

export function AppStoreMark() {
  return (
    <svg className={styles.appStoreMark} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M16.4 12.6c0-2.4 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.1 1-4 2.4-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.1-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8 0 0-2.5-1-2.5-3.9ZM14 5.5c.7-.8 1.1-1.9 1-3-1 0-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.9 1 .1 2.1-.6 2.8-1.4Z" />
    </svg>
  );
}

export function AndroidMark() {
  return (
    <svg className={styles.androidMark} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M17.6 9.48 19.44 6.3a.38.38 0 0 0-.66-.38l-1.86 3.23a11.5 11.5 0 0 0-9.84 0L5.22 5.92a.38.38 0 0 0-.66.38L6.4 9.48A10.8 10.8 0 0 0 1 18h22a10.8 10.8 0 0 0-5.4-8.52ZM7 15.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm10 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z" />
    </svg>
  );
}

// Counts up once the number scrolls into view; renders the final value without IntersectionObserver.
export function CountUp({ to }: { to: number }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [value, setValue] = React.useState(to);

  React.useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver !== "function" || prefersReducedMotion()) return;
    setValue(0);
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const step = (now: number) => {
        const progress = Math.min(1, (now - start) / 1400);
        setValue(Math.round(to * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    }, { threshold: 0.5 });
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to]);

  return <span ref={ref}>{value}</span>;
}

const G = "rgba(242, 217, 139, .92)";
const W = "rgba(255, 255, 255, .34)";
const F = "rgba(255, 255, 255, .14)";

// Fine-line drawings so each service reads at a glance without cartoon colors.
export function ServiceArt({ number }: { number: string }) {
  return (
    <svg className={styles.serviceArt} data-service-art={number} viewBox="0 0 320 200" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {ART[number]}
    </svg>
  );
}

const ART: Record<string, React.ReactNode> = {
  "01": (
    <g strokeWidth="1.2">
      <g className={styles.svcDrift}>
        <rect x="96" y="34" width="70" height="136" rx="14" stroke={W} />
        <rect x="104" y="44" width="54" height="116" rx="8" stroke={F} />
        <image href="/brand/mybiblelens.png" x="115" y="64" width="32" height="32" />
        <path d="M114 112h34M118 122h26M122 132h18" stroke={W} />
      </g>
      <g className={`${styles.svcDrift} ${styles.svcDelay}`}>
        <rect x="178" y="22" width="70" height="136" rx="14" stroke={G} />
        <rect x="186" y="32" width="54" height="116" rx="8" stroke={F} />
        <image href="/brand/thewatercheck.png" x="197" y="52" width="32" height="32" />
        <path d="M196 100h34" stroke={G} /><path d="M200 110h26M204 120h18" stroke={W} />
      </g>
      <path d="M60 170h200" stroke={F} />
    </g>
  ),
  "02": (
    <g strokeWidth="1.2">
      <rect x="40" y="30" width="240" height="140" rx="8" stroke={W} />
      <path d="M40 50h240" stroke={F} />
      <circle cx="54" cy="40" r="3" stroke={W} /><circle cx="66" cy="40" r="3" stroke={W} /><circle cx="78" cy="40" r="3" stroke={W} />
      <path d="M110 40h120" stroke={F} />
      <path d="M62 78h96" stroke={G} strokeWidth="2.4" /><path d="M62 92h70" stroke={G} strokeWidth="2.4" />
      <path d="M62 112h110M62 122h90" stroke={W} />
      <rect x="62" y="138" width="44" height="14" rx="7" stroke={G} />
      <rect x="190" y="70" width="70" height="82" rx="4" stroke={W} />
      <path className={styles.svcDraw} d="M190 136l18-20 14 12 16-22 22 30" stroke={G} />
      <path className={styles.svcCursor} d="M236 96l10 26 4-10 10-4Z" stroke="#fff" fill="rgba(7,28,85,.9)" />
    </g>
  ),
  "03": (
    <g strokeWidth="1.1">
      {[[70, 50], [64, 150], [250, 46], [256, 152], [160, 26], [160, 176]].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <path d={`M160 100L${x} ${y}`} stroke={F} />
          <circle cx={x} cy={y} r="7" stroke={W} />
        </g>
      ))}
      <path d="M70 50 64 150M250 46 256 152M70 50 160 26 250 46M64 150 160 176 256 152" stroke={F} />
      <path className={styles.svcDash} d="M70 50 160 100 256 152M64 150 160 100 250 46M160 26v150" stroke={G} />
      <circle className={styles.svcPulse} cx="160" cy="100" r="26" stroke={G} />
      <circle cx="160" cy="100" r="14" stroke={G} fill="rgba(242,217,139,.12)" />
      <path d="M160 92l2.4 5.6 5.6 2.4-5.6 2.4-2.4 5.6-2.4-5.6-5.6-2.4 5.6-2.4Z" fill={G} />
    </g>
  ),
  "04": (
    <g strokeWidth="1.2">
      <circle cx="130" cy="104" r="62" stroke={F} />
      <circle cx="168" cy="104" r="38" stroke={F} />
      <circle cx="191" cy="104" r="24" stroke={F} />
      <path className={styles.svcDraw} d="M54 160C90 60 170 40 270 54" stroke={G} strokeWidth="1.8" />
      <path d="M54 160l40-92M270 54l-60 38" stroke={W} />
      <rect x="50" y="156" width="8" height="8" stroke={G} /><rect x="266" y="50" width="8" height="8" stroke={G} />
      <circle cx="94" cy="68" r="4" stroke={W} /><circle cx="210" cy="92" r="4" stroke={W} />
      <path d="M232 132l26-26 10 10-26 26-14 4Z" stroke={W} /><path d="M252 112l10 10" stroke={W} />
    </g>
  ),
  "05": (
    <g strokeWidth="1.2">
      <rect x="30" y="26" width="260" height="150" rx="8" stroke={W} />
      <path d="M78 26v150" stroke={F} />
      <path d="M44 48h20M44 64h20M44 80h20M44 96h20" stroke={F} /><path d="M44 48h20" stroke={G} />
      <rect x="94" y="40" width="54" height="30" rx="4" stroke={F} /><path d="M102 52h22" stroke={G} /><path d="M102 60h36" stroke={F} />
      <rect x="158" y="40" width="54" height="30" rx="4" stroke={F} /><path d="M166 52h22" stroke={W} /><path d="M166 60h36" stroke={F} />
      <path d="M94 160h180M94 160V86" stroke={F} />
      <path d="M94 136h180M94 112h180" stroke="rgba(255,255,255,.06)" />
      <path className={styles.svcDraw} d="M94 150l26-12 22 6 24-26 22 8 26-30 24 10 16-18" stroke={G} strokeWidth="1.8" />
      <circle cx="250" cy="56" r="16" stroke={F} strokeWidth="5" />
      <circle className={styles.svcRing} cx="250" cy="56" r="16" stroke={G} strokeWidth="5" strokeDasharray="64 120" transform="rotate(-90 250 56)" />
    </g>
  ),
  "06": (
    <g strokeWidth="1.2">
      <rect x="30" y="76" width="56" height="48" rx="6" stroke={W} />
      <path d="M42 92h32M42 100h22M42 108h28" stroke={F} />
      <path d="M86 100h40M194 100h40" stroke={F} />
      <path className={styles.svcDash} d="M86 100h40M194 100h40" stroke={G} />
      <g className={styles.svcSpin}>
        <circle cx="160" cy="100" r="22" stroke={G} />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <path key={deg} d="M160 72v-8" stroke={G} strokeWidth="3" transform={`rotate(${deg} 160 100)`} />
        ))}
        <circle cx="160" cy="100" r="8" stroke={W} />
      </g>
      <rect x="234" y="76" width="56" height="48" rx="6" stroke={G} />
      <path d="M250 101l8 8 16-18" stroke={G} strokeWidth="1.8" />
      <path d="M58 76V52h204v24M58 124v24h204v-24" stroke={F} strokeDasharray="3 5" />
    </g>
  ),
  "07": (
    <g strokeWidth="1.2">
      <rect x="40" y="24" width="240" height="152" rx="8" stroke={W} />
      <circle cx="68" cy="52" r="12" stroke={G} />
      <path d="M90 46h70" stroke={W} /><path d="M90 58h44" stroke={F} />
      <rect x="56" y="80" width="112" height="80" rx="4" stroke={F} />
      {[0, 1, 2, 3].map((r) => [0, 1, 2, 3, 4, 5].map((c) => (
        <rect key={`${r}-${c}`} x={64 + c * 17} y={88 + r * 17} width="11" height="11" rx="2" stroke={r === 1 && c === 3 ? G : "rgba(255,255,255,.12)"} />
      )))}
      <rect x="182" y="80" width="82" height="36" rx="4" stroke={F} />
      <path d="M192 90h12l5 5v12h-17Z" stroke={W} /><path d="M216 94h38M216 104h24" stroke={F} />
      <path d="M182 140h82" stroke={F} strokeWidth="4" />
      <path className={styles.svcProgress} d="M182 140h58" stroke={G} strokeWidth="4" />
    </g>
  ),
  "08": (
    <g strokeWidth="1.2">
      <rect x="30" y="44" width="100" height="112" rx="6" stroke={W} strokeDasharray="4 4" />
      <path d="M72 44l10 26-14 18 16 22-8 46" stroke="rgba(255,140,120,.7)" />
      <path d="M44 64h20M92 132h26" stroke={F} />
      <path className={styles.svcNudge} d="M146 100h28m-9-9 9 9-9 9" stroke={G} strokeWidth="1.6" />
      <rect x="190" y="44" width="100" height="112" rx="6" stroke={G} />
      <path d="M204 64h52M204 76h72M204 88h44" stroke={W} />
      <circle cx="240" cy="126" r="14" stroke={G} />
      <path d="M233 126l5 5 9-10" stroke={G} strokeWidth="1.6" />
    </g>
  ),
};
