import * as React from "react";
import styles from "./style.module.css";

const ORBITERS = [
  { src: "/brand/mybiblelens.png", size: 1, shape: "tile" },
  { src: "/brand/mybiblelens-store/hero/pixel-dove-clean-v2.png", size: 0.55, shape: "sticker" },
  { src: "/brand/thewatercheck.png", size: 1, shape: "round" },
  { src: "/android-chrome-512x512.png", size: 0.82, shape: "tile" },
  { src: "/brand/mybiblelens-store/hero/pixel-cross-clean-v2.png", size: 0.55, shape: "sticker" },
] as const;

function prefersReducedMotion() {
  return typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// The portrait sits in the middle; the logos ride a tilted ellipse around the head.
// Items on the far side of the ellipse drop behind the cutout, near-side items pass in front.
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
      const rx = width * 0.5;
      const ry = width * 0.13;
      const t = reduced ? 0.6 : (now - start) / 1000;
      itemRefs.current.forEach((item, index) => {
        if (!item) return;
        const angle = t * 0.42 + (index / ORBITERS.length) * Math.PI * 2;
        const depth = Math.sin(angle);
        const x = Math.cos(angle) * rx;
        const y = depth * ry - Math.cos(angle) * width * 0.06;
        const scale = 0.72 + (depth + 1) * 0.2;
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
      <img className={styles.heroPortrait} src="/media/denzel-hero-cutout.webp" alt="" width="1000" height="1405" decoding="async" fetchPriority="high" />
      <span className={styles.heroOrbitCenter}>
        {ORBITERS.map((orbiter, index) => (
          <span
            key={orbiter.src}
            className={styles.heroOrbiter}
            data-shape={orbiter.shape}
            style={{ "--orbiter-size": orbiter.size } as React.CSSProperties}
            ref={(element) => { itemRefs.current[index] = element; }}
          >
            <img src={orbiter.src} alt="" width="160" height="160" decoding="async" />
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

const svc = {
  ink: "#0b2366",
  panel: "#13358f",
  line: "rgba(255,255,255,.22)",
  gold: "#f2d98b",
  goldDeep: "#d4a94e",
  sky: "#7fd6fb",
  white: "#ffffff",
};

// Small illustrated scenes so each service reads at a glance.
export function ServiceArt({ number }: { number: string }) {
  return (
    <svg className={styles.serviceArt} data-service-art={number} viewBox="0 0 240 140" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`svc-bg-${number}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1a46b4" />
          <stop offset="1" stopColor="#0a2467" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="240" height="140" rx="18" fill={`url(#svc-bg-${number})`} />
      <circle cx="200" cy="18" r="46" fill={svc.gold} opacity=".08" />
      {ART[number]}
    </svg>
  );
}

const ART: Record<string, React.ReactNode> = {
  "01": (
    <g>
      <g className={styles.svcFloat}>
        <rect x="58" y="22" width="56" height="104" rx="12" fill={svc.ink} stroke={svc.line} strokeWidth="2" />
        <rect x="64" y="30" width="44" height="88" rx="7" fill="#2a170a" />
        <image href="/brand/mybiblelens.png" x="70" y="46" width="32" height="32" />
        <rect x="72" y="88" width="28" height="4" rx="2" fill={svc.gold} />
        <rect x="76" y="96" width="20" height="3" rx="1.5" fill={svc.line} />
      </g>
      <g className={`${styles.svcFloat} ${styles.svcDelay}`}>
        <rect x="126" y="14" width="56" height="104" rx="12" fill={svc.ink} stroke={svc.line} strokeWidth="2" />
        <rect x="132" y="22" width="44" height="88" rx="7" fill="#0a5fae" />
        <image href="/brand/thewatercheck.png" x="138" y="38" width="32" height="32" />
        <rect x="140" y="80" width="28" height="4" rx="2" fill={svc.sky} />
        <rect x="144" y="88" width="20" height="3" rx="1.5" fill={svc.line} />
      </g>
    </g>
  ),
  "02": (
    <g>
      <g className={styles.svcFloat}>
        <rect x="30" y="20" width="180" height="104" rx="10" fill={svc.ink} stroke={svc.line} strokeWidth="2" />
        <rect x="30" y="20" width="180" height="16" rx="8" fill={svc.panel} />
        <circle cx="42" cy="28" r="3" fill="#ff7a6b" /><circle cx="52" cy="28" r="3" fill={svc.gold} /><circle cx="62" cy="28" r="3" fill="#6ee7a8" />
        <rect x="80" y="24" width="100" height="8" rx="4" fill="rgba(255,255,255,.12)" />
        <rect x="44" y="48" width="70" height="10" rx="5" fill={svc.white} />
        <rect x="44" y="62" width="50" height="10" rx="5" fill={svc.gold} />
        <rect x="44" y="80" width="80" height="4" rx="2" fill={svc.line} />
        <rect x="44" y="88" width="64" height="4" rx="2" fill={svc.line} />
        <rect x="44" y="100" width="34" height="12" rx="6" fill={svc.gold} />
        <rect x="136" y="46" width="60" height="64" rx="8" fill={svc.panel} />
        <circle className={styles.svcPulse} cx="166" cy="72" r="14" fill={svc.sky} opacity=".8" />
        <path d="M142 104l14-14 10 8 12-14 18 20Z" fill="rgba(255,255,255,.25)" />
      </g>
    </g>
  ),
  "03": (
    <g>
      <g stroke={svc.line} strokeWidth="2">
        <line x1="120" y1="70" x2="58" y2="38" /><line x1="120" y1="70" x2="56" y2="104" />
        <line x1="120" y1="70" x2="184" y2="36" /><line x1="120" y1="70" x2="188" y2="102" />
        <line x1="58" y1="38" x2="56" y2="104" /><line x1="184" y1="36" x2="188" y2="102" />
      </g>
      <g className={styles.svcDash} stroke={svc.gold} strokeWidth="2.5" fill="none" strokeLinecap="round">
        <path d="M58 38 120 70 188 102" /><path d="M56 104 120 70 184 36" />
      </g>
      {[[58, 38], [56, 104], [184, 36], [188, 102]].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="9" fill={svc.panel} stroke={svc.sky} strokeWidth="2" />
      ))}
      <g className={styles.svcPulse}>
        <circle cx="120" cy="70" r="24" fill={svc.gold} opacity=".22" />
        <circle cx="120" cy="70" r="16" fill={svc.gold} />
      </g>
      <path d="M120 60l3 7 7 3-7 3-3 7-3-7-7-3 7-3Z" fill={svc.ink} />
    </g>
  ),
  "04": (
    <g>
      <g className={styles.svcFloat}>
        <path d="M46 92c0-30 26-52 56-50 28 2 40 22 32 34-6 9-20 2-24 12-4 9 6 16-2 22-14 10-62 6-62-18Z" fill={svc.white} opacity=".95" />
        <circle cx="70" cy="70" r="8" fill="#ff7a6b" /><circle cx="92" cy="58" r="8" fill={svc.gold} />
        <circle cx="116" cy="64" r="8" fill={svc.sky} /><circle cx="68" cy="96" r="8" fill="#6ee7a8" />
      </g>
      <path className={styles.svcDash} d="M150 112c10-40 30-70 62-80" fill="none" stroke={svc.gold} strokeWidth="3" strokeLinecap="round" />
      <rect x="146" y="106" width="10" height="10" fill={svc.white} stroke={svc.goldDeep} strokeWidth="2" />
      <rect x="207" y="27" width="10" height="10" fill={svc.white} stroke={svc.goldDeep} strokeWidth="2" />
      <g className={`${styles.svcSpin} ${styles.svcOrigin1}`}>
        <path d="M180 76l5 11 12 1-9 8 3 12-11-6-11 6 3-12-9-8 12-1Z" fill={svc.gold} />
      </g>
    </g>
  ),
  "05": (
    <g>
      <rect x="22" y="18" width="196" height="106" rx="10" fill={svc.ink} stroke={svc.line} strokeWidth="2" />
      <rect x="22" y="18" width="40" height="106" rx="10" fill={svc.panel} />
      {[34, 50, 66, 82].map((y, i) => <rect key={y} x="32" y={y} width="20" height="6" rx="3" fill={i === 0 ? svc.gold : svc.line} />)}
      <rect x="72" y="28" width="40" height="22" rx="5" fill={svc.panel} /><rect x="78" y="34" width="18" height="4" rx="2" fill={svc.gold} /><rect x="78" y="41" width="26" height="3" rx="1.5" fill={svc.line} />
      <rect x="118" y="28" width="40" height="22" rx="5" fill={svc.panel} /><rect x="124" y="34" width="18" height="4" rx="2" fill={svc.sky} /><rect x="124" y="41" width="26" height="3" rx="1.5" fill={svc.line} />
      <g className={styles.svcBars}>
        {[[76, 30], [90, 44], [104, 24], [118, 52], [132, 38], [146, 58]].map(([x, h], i) => (
          <rect key={x} x={x} y={114 - h} width="9" height={h} rx="3" fill={i % 2 ? svc.gold : svc.sky} style={{ animationDelay: `${i * 0.12}s` }} />
        ))}
      </g>
      <circle cx="190" cy="56" r="18" fill="none" stroke={svc.panel} strokeWidth="8" />
      <circle className={styles.svcRing} cx="190" cy="56" r="18" fill="none" stroke={svc.gold} strokeWidth="8" strokeDasharray="80 200" strokeLinecap="round" transform="rotate(-90 190 56)" />
      <rect x="172" y="90" width="36" height="5" rx="2.5" fill={svc.line} /><rect x="172" y="100" width="26" height="5" rx="2.5" fill={svc.line} />
    </g>
  ),
  "06": (
    <g>
      <path d="M62 70h46M146 70h36" stroke={svc.line} strokeWidth="3" strokeLinecap="round" />
      <circle className={styles.svcTravel} cx="0" cy="70" r="5" fill={svc.gold} />
      <rect x="22" y="46" width="44" height="48" rx="10" fill={svc.panel} stroke={svc.line} strokeWidth="2" />
      <path d="M34 62h20M34 70h14M34 78h18" stroke={svc.white} strokeWidth="3" strokeLinecap="round" />
      <g className={`${styles.svcSpin} ${styles.svcOrigin2}`}>
        <path d="M127 44l5 1 2 7 6 3 6-4 4 4-4 6 3 6 7 2v6l-7 2-3 6 4 6-4 4-6-4-6 3-2 7h-6l-2-7-6-3-6 4-4-4 4-6-3-6-7-2v-6l7-2 3-6-4-6 4-4 6 4 6-3 2-7Z" fill={svc.gold} />
        <circle cx="127" cy="70" r="9" fill={svc.ink} />
      </g>
      <rect x="182" y="46" width="44" height="48" rx="10" fill={svc.panel} stroke={svc.line} strokeWidth="2" />
      <path d="M194 71l8 8 14-16" stroke="#6ee7a8" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  ),
  "07": (
    <g>
      <g className={styles.svcFloat}>
        <rect x="34" y="16" width="172" height="110" rx="12" fill={svc.ink} stroke={svc.line} strokeWidth="2" />
        <circle cx="56" cy="38" r="11" fill={svc.gold} /><circle cx="56" cy="35" r="4" fill={svc.ink} /><path d="M48 45a8 6 0 0 1 16 0" fill={svc.ink} />
        <rect x="74" y="31" width="56" height="6" rx="3" fill={svc.white} /><rect x="74" y="41" width="38" height="4" rx="2" fill={svc.line} />
        <rect x="46" y="58" width="78" height="56" rx="7" fill={svc.panel} />
        {[0, 1, 2, 3].map((r) => [0, 1, 2, 3, 4].map((c) => (
          <rect key={`${r}-${c}`} x={52 + c * 14} y={64 + r * 12} width="10" height="8" rx="2" fill={r === 1 && c === 2 ? svc.gold : "rgba(255,255,255,.14)"} />
        )))}
        <rect x="134" y="58" width="60" height="26" rx="6" fill={svc.panel} />
        <path d="M142 64h10l4 4v10h-14Z" fill={svc.white} /><rect x="160" y="66" width="28" height="4" rx="2" fill={svc.line} /><rect x="160" y="74" width="18" height="4" rx="2" fill={svc.line} />
        <rect x="134" y="94" width="60" height="8" rx="4" fill="rgba(255,255,255,.14)" />
        <rect className={styles.svcProgress} x="134" y="94" width="42" height="8" rx="4" fill={svc.sky} />
      </g>
    </g>
  ),
  "08": (
    <g>
      <rect x="20" y="30" width="80" height="82" rx="10" fill={svc.ink} stroke="#ff7a6b" strokeWidth="2" opacity=".85" />
      <path d="M50 30l8 20-10 14 12 18-6 30" stroke="#ff7a6b" strokeWidth="2.5" fill="none" />
      <rect x="30" y="44" width="16" height="4" rx="2" fill={svc.line} /><rect x="64" y="96" width="24" height="4" rx="2" fill={svc.line} />
      <path className={styles.svcNudge} d="M108 71h22m-8-8 8 8-8 8" stroke={svc.gold} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <g className={styles.svcFloat}>
        <rect x="140" y="30" width="80" height="82" rx="10" fill={svc.panel} stroke="#6ee7a8" strokeWidth="2" />
        <rect x="150" y="42" width="46" height="6" rx="3" fill={svc.white} /><rect x="150" y="54" width="60" height="4" rx="2" fill={svc.line} />
        <rect x="150" y="62" width="40" height="4" rx="2" fill={svc.line} />
        <circle cx="180" cy="90" r="12" fill="#6ee7a8" /><path d="M174 90l4 4 8-8" stroke={svc.ink} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
  ),
};
