import * as React from "react";
import styles from "./cyber.module.css";

export type ArcStat = { value: string; suffix?: string; label: string };
type Variant = "home" | "founder";
// ax/ay mark where the face sits in each photo; that point is lined up with the centre of the arcs.
type Photo = { src: string; width: number; height: number; ax: number; ay: number };
type Placement = { photo: Photo; x: number; y: number; w: number; h: number; feather: boolean };

const PORTRAIT: Photo = { src: "/media/denzel-rigaud-founder-hero.jpg", width: 1058, height: 1487, ax: 0.51, ay: 0.33 };
const CLOSEUP: Photo = { src: "/media/denzel-founder-scroll-poster.jpg", width: 2560, height: 1136, ax: 0.5, ay: 0.47 };
const CLOSEUP_MEDIA = "(min-width: 640px) and (min-aspect-ratio: 11/10)";

const ARCS = [
  { r: 330, from: -92, to: 16, dot: -46 },
  { r: 395, from: -56, to: 60, dot: 2 },
  { r: 460, from: -14, to: 72, dot: 44 },
] as const;

// Jeremiah 29:11 (KJV) hidden inside the source of Expected End; the lens draws the founder out of it.
const CODE =
  'import { faith, craft, people } from "expected-end";  const purpose = await build({ faith, craft, people });  // For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end. Jeremiah 29:11  export function lens(world) { return world.filter(isTrue).map(drawCloser); }  while (alive) { read(); reflect(); hydrate(); ship(); }  if (doubt) pray(); else build();  const apps = ["MyBibleLens", "The Water Check"];  ';

const round = (value: number) => Math.round(value * 100) / 100;
const polar = (radius: number, degrees: number) => {
  const angle = (degrees * Math.PI) / 180;
  return [-110 + radius * Math.cos(angle), 300 + radius * Math.sin(angle)] as const;
};

// The arcs share a centre at (-110, 300) inside a 380x700 box pinned to the hero's right edge.
const arcsCentre = (width: number, height: number) => [width - 0.7 * height, (300 / 700) * height] as const;

function cover(photo: Photo, width: number, height: number, fx: number, fy: number): Placement {
  const scale = Math.max(width / photo.width, height / photo.height);
  const w = photo.width * scale;
  const h = photo.height * scale;
  return {
    photo,
    w,
    h,
    feather: false,
    x: Math.min(0, Math.max(width - w, fx - photo.ax * w)),
    y: Math.min(0, Math.max(height - h, fy - photo.ay * h)),
  };
}

function placePhoto(variant: Variant, photo: Photo, width: number, height: number): Placement {
  const [cx, cy] = arcsCentre(width, height);
  if (photo === CLOSEUP) return cover(CLOSEUP, width, height, cx, cy);
  if (variant === "founder" || width < 640 || width / height < 0.9) return cover(PORTRAIT, width, height, width * 0.5, height * 0.3);
  const h = height * 1.3;
  const w = (h * PORTRAIT.width) / PORTRAIT.height;
  return { photo: PORTRAIT, w, h, feather: true, x: cx - PORTRAIT.ax * w, y: Math.min(0, cy - PORTRAIT.ay * h) };
}

// Matches the radial mask on .feather so the code fades out exactly where the photo does.
function featherAt(placement: Placement, x: number, y: number) {
  if (!placement.feather) return 1;
  const distance = Math.hypot(((x - placement.x) / placement.w - 0.5) / 0.58, ((y - placement.y) / placement.h - 0.4) / 0.7);
  if (distance < 0.55) return 1;
  if (distance < 0.75) return 1 - ((distance - 0.55) / 0.2) * 0.4;
  if (distance < 1) return 0.6 * (1 - (distance - 0.75) / 0.25);
  return 0;
}

function drawCode(canvas: HTMLCanvasElement, photo: HTMLImageElement, placement: Placement, width: number, height: number) {
  const context = canvas.getContext("2d");
  if (!context) return;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.fillStyle = "#040407";
  context.fillRect(0, 0, width, height);

  // A dim black-and-white ghost of the photo keeps the face readable under the code.
  const ghost = document.createElement("canvas");
  ghost.width = canvas.width;
  ghost.height = canvas.height;
  const ghostContext = ghost.getContext("2d");
  if (ghostContext) {
    ghostContext.setTransform(ratio, 0, 0, ratio, 0, 0);
    ghostContext.filter = "grayscale(1) brightness(.42) contrast(1.3)";
    ghostContext.drawImage(photo, placement.x, placement.y, placement.w, placement.h);
    ghostContext.filter = "none";
    if (placement.feather) {
      ghostContext.globalCompositeOperation = "destination-in";
      ghostContext.translate(placement.x + placement.w * 0.5, placement.y + placement.h * 0.4);
      ghostContext.scale(placement.w * 0.58, placement.h * 0.7);
      const fade = ghostContext.createRadialGradient(0, 0, 0, 0, 0, 1);
      fade.addColorStop(0, "#000");
      fade.addColorStop(0.55, "#000");
      fade.addColorStop(0.75, "rgba(0, 0, 0, .6)");
      fade.addColorStop(1, "rgba(0, 0, 0, 0)");
      ghostContext.fillStyle = fade;
      ghostContext.fillRect(-1, -1, 2, 2);
    }
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.drawImage(ghost, 0, 0);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  const fontSize = width < 640 ? 9 : 10;
  const cellWidth = fontSize * 0.6;
  const cellHeight = Math.round(fontSize * 1.2);
  const columns = Math.ceil(width / cellWidth);
  const rows = Math.ceil(height / cellHeight);
  const sample = document.createElement("canvas");
  sample.width = columns;
  sample.height = rows;
  const sampleContext = sample.getContext("2d", { willReadFrequently: true });
  if (!sampleContext) return;
  sampleContext.imageSmoothingQuality = "high";
  sampleContext.drawImage(photo, placement.x / cellWidth, placement.y / cellHeight, placement.w / cellWidth, placement.h / cellHeight);
  const pixels = sampleContext.getImageData(0, 0, columns, rows).data;

  context.font = `500 ${fontSize}px "JetBrains Mono", ui-monospace, monospace`;
  context.textBaseline = "top";
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const cell = row * columns + column;
      const glyph = CODE[cell % CODE.length];
      if (glyph === " ") continue;
      const red = pixels[cell * 4];
      const green = pixels[cell * 4 + 1];
      const blue = pixels[cell * 4 + 2];
      const light = ((0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255) * (pixels[cell * 4 + 3] / 255);
      const fade = featherAt(placement, (column + 0.5) * cellWidth, (row + 0.5) * cellHeight);
      const alpha = Math.min(1, Math.max(0, (light - 0.03) / 0.42)) * fade;
      // Gold, tinted toward the photo's own colour, burning to near-white in the highlights.
      const peak = Math.max(red, green, blue, 1);
      const highlight = alpha > 0.8 ? (alpha - 0.8) / 0.2 : 0;
      const r = 133 + (red / peak) * 115;
      const g = 119 + (green / peak) * 115;
      const b = 76 + (blue / peak) * 115;
      context.fillStyle = `rgba(${Math.round(r + (255 - r) * highlight)}, ${Math.round(g + (248 - g) * highlight)}, ${Math.round(b + (232 - b) * highlight)}, ${(0.07 + alpha * 0.93).toFixed(3)})`;
      context.fillText(glyph, column * cellWidth, row * cellHeight);
    }
  }
}

function ArcStats({ stats, id }: { stats: readonly ArcStat[]; id: string }) {
  return (
    <div className={styles.arcs} aria-hidden="true">
      <svg viewBox="0 0 380 700" preserveAspectRatio="xMaxYMid meet" focusable="false">
        <defs>
          {ARCS.map((arc, index) => {
            const [x1, y1] = polar(arc.r, arc.from);
            const [x2, y2] = polar(arc.r, arc.to);
            return (
              <linearGradient key={arc.r} id={`${id}-${index}`} gradientUnits="userSpaceOnUse" x1={round(x1)} y1={round(y1)} x2={round(x2)} y2={round(y2)}>
                <stop offset="0" stopColor="#fff" stopOpacity="0" />
                <stop offset=".22" stopColor="#fff" stopOpacity=".5" />
                <stop offset=".55" stopColor="#fff" stopOpacity=".5" />
                <stop offset=".85" stopColor="#fff" stopOpacity=".1" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
            );
          })}
        </defs>
        {ARCS.map((arc, index) => {
          const stat = stats[index];
          if (!stat) return null;
          const [x1, y1] = polar(arc.r, arc.from);
          const [x2, y2] = polar(arc.r, arc.to);
          const [dx, dy] = polar(arc.r, arc.dot);
          const length = (arc.r * (arc.to - arc.from) * Math.PI) / 180;
          const lineDelay = 0.4 + index * 0.22;
          const markDelay = lineDelay + 0.9;
          return (
            <g key={arc.r}>
              <path
                className={styles.arcLine}
                d={`M ${round(x1)} ${round(y1)} A ${arc.r} ${arc.r} 0 0 1 ${round(x2)} ${round(y2)}`}
                fill="none"
                stroke={`url(#${id}-${index})`}
                strokeWidth="1.1"
                style={{ "--len": String(round(length)), animationDelay: `${round(lineDelay)}s` } as React.CSSProperties}
              />
              <circle className={styles.arcRing} cx={round(dx)} cy={round(dy)} r="7" fill="none" stroke="#fff" style={{ animationDelay: `${round(markDelay + 0.3)}s` }} />
              <circle className={styles.arcDot} cx={round(dx)} cy={round(dy)} r="3.4" fill="#fff" style={{ animationDelay: `${round(markDelay)}s` }} />
              <text className={`${styles.arcText} ${styles.arcNum}`} x={round(dx + 16)} y={round(dy + 4)} style={{ animationDelay: `${round(markDelay + 0.15)}s` }}>
                {stat.value}
                {stat.suffix ? (
                  <tspan fontSize="19" dy="-10">
                    {stat.suffix}
                  </tspan>
                ) : null}
              </text>
              <text className={`${styles.arcText} ${styles.arcLabel}`} x={round(dx + 18)} y={round(dy + 22)} style={{ animationDelay: `${round(markDelay + 0.3)}s` }}>
                {stat.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

type CyberHeroProps = {
  variant: Variant;
  labelledBy: string;
  photoAlt: string;
  stats: readonly ArcStat[];
  /** The cursor lens that turns the photo into code. */
  lens?: boolean;
  /** An ember scan line that sweeps down the photo. */
  scan?: boolean;
  hud?: React.ReactNode;
  children: React.ReactNode;
};

// Full-screen hero: photo with a slow zoom-in, a grid that drifts with the mouse, optional code lens, and stats on arcs.
export function CyberHero({ variant, labelledBy, photoAlt, stats, lens = false, scan = false, hud, children }: CyberHeroProps) {
  const rootRef = React.useRef<HTMLElement>(null);
  const photoRef = React.useRef<HTMLImageElement>(null);
  const patternRef = React.useRef<SVGPatternElement>(null);
  const lensRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const hintRef = React.useRef<HTMLParagraphElement>(null);
  const gridId = `cyber-grid-${variant}`;

  React.useEffect(() => {
    const root = rootRef.current;
    const photo = photoRef.current;
    const pattern = patternRef.current;
    if (!root || !photo || !pattern) return;
    const lensLayer = lensRef.current;
    const canvas = canvasRef.current;
    const hint = hintRef.current;
    const matches = (query: string) => typeof window.matchMedia === "function" && window.matchMedia(query).matches;
    const reduced = matches("(prefers-reduced-motion: reduce)");
    const finePointer = matches("(hover: hover) and (pointer: fine)");
    if (hint && !finePointer) hint.hidden = true;

    const state = {
      width: 0,
      height: 0,
      placement: null as Placement | null,
      drawn: "",
      lx: 0,
      ly: 0,
      tx: 0,
      ty: 0,
      lr: 1,
      tr: 0,
      gx: 0,
      gy: 0,
      gtx: 0,
      gty: 0,
      lastSteer: Number.NEGATIVE_INFINITY,
      placed: false,
      visible: false,
      frame: 0,
    };

    const paintCode = async () => {
      const placement = state.placement;
      if (!canvas || !placement) return;
      const signature = `${state.width}x${state.height}:${placement.photo.src}`;
      if (state.drawn === signature) return;
      state.drawn = signature;
      await Promise.all([
        typeof photo.decode === "function" ? photo.decode().catch(() => undefined) : undefined,
        document.fonts?.load('500 11px "JetBrains Mono"').catch(() => undefined),
      ]);
      if (state.drawn !== signature || !photo.naturalWidth) return;
      drawCode(canvas, photo, placement, state.width, state.height);
    };

    const layout = () => {
      const rect = root.getBoundingClientRect();
      // Unlaid-out hero (hidden tab, test DOM): nothing to place yet.
      if (!rect.width || !rect.height) return false;
      state.width = rect.width;
      state.height = rect.height;
      const shown = (photo.currentSrc || photo.src).includes("scroll-poster") ? CLOSEUP : PORTRAIT;
      const placement = placePhoto(variant, shown, rect.width, rect.height);
      state.placement = placement;
      Object.assign(photo.style, {
        left: `${placement.x}px`,
        top: `${placement.y}px`,
        width: `${placement.w}px`,
        height: `${placement.h}px`,
        objectFit: "fill",
        transformOrigin: `${placement.photo.ax * placement.w}px ${placement.photo.ay * placement.h}px`,
      });
      photo.classList.toggle(styles.feather, placement.feather);
      const fx = placement.x + placement.photo.ax * placement.w;
      const fy = placement.y + placement.photo.ay * placement.h;
      root.style.setProperty("--fx", `${fx}px`);
      root.style.setProperty("--fy", `${fy}px`);
      if (canvas) {
        canvas.style.transformOrigin = `${fx}px ${fy}px`;
        void paintCode();
      }
      return true;
    };

    const tick = (now: number) => {
      state.frame = 0;
      const placement = state.placement;
      if (lensLayer && placement) {
        // With no recent pointer, the lens drifts over the face on its own (phones always start this way).
        if (!reduced && now - state.lastSteer > (finePointer ? 4000 : 2500)) {
          const seconds = now / 1000;
          const fx = placement.x + placement.photo.ax * placement.w;
          const fy = placement.y + placement.photo.ay * placement.h;
          state.tx = fx + Math.sin(seconds * 0.55) * Math.min(state.width * 0.16, 190);
          state.ty = fy + Math.sin(seconds * 0.83 + 1.2) * Math.min(state.height * 0.15, 140);
          state.tr = state.width < 640 ? 150 : 230;
          if (!state.placed) {
            state.lx = state.tx;
            state.ly = state.ty;
            state.placed = true;
          }
        }
        state.lx += (state.tx - state.lx) * 0.1;
        state.ly += (state.ty - state.ly) * 0.1;
        state.lr += (state.tr - state.lr) * 0.08;
        lensLayer.style.setProperty("--lx", `${state.lx.toFixed(1)}px`);
        lensLayer.style.setProperty("--ly", `${state.ly.toFixed(1)}px`);
        lensLayer.style.setProperty("--lr", `${Math.max(1, state.lr).toFixed(1)}px`);
      }
      if (!reduced) {
        state.gx += (state.gtx - state.gx) * 0.06;
        state.gy += (state.gty - state.gy) * 0.06;
        pattern.setAttribute("x", state.gx.toFixed(2));
        pattern.setAttribute("y", state.gy.toFixed(2));
      }
      if (state.visible) state.frame = requestAnimationFrame(tick);
    };
    const start = () => {
      if (!state.frame && state.visible && state.width) state.frame = requestAnimationFrame(tick);
    };

    const steer = (clientX: number, clientY: number, radius: number) => {
      const rect = root.getBoundingClientRect();
      state.tx = clientX - rect.left;
      state.ty = clientY - rect.top;
      state.tr = radius;
      state.lastSteer = performance.now();
      if (!state.placed) {
        state.lx = state.tx;
        state.ly = state.ty;
        state.placed = true;
      }
      start();
    };
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      steer(event.clientX, event.clientY, 260);
      hint?.setAttribute("data-gone", "");
    };
    const onPointerLeave = (event: PointerEvent) => {
      if (event.pointerType === "mouse") state.tr = 0;
    };
    const onTouch = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) steer(touch.clientX, touch.clientY, 170);
    };
    const onWindowPointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      state.gtx = (event.clientX / window.innerWidth - 0.5) * 16;
      state.gty = (event.clientY / window.innerHeight - 0.5) * 16;
      start();
    };
    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (layout()) start();
      }, 120);
    };
    const onPhotoLoad = () => {
      if (layout()) start();
    };

    if (lensLayer) {
      root.addEventListener("pointermove", onPointerMove);
      root.addEventListener("pointerleave", onPointerLeave);
      root.addEventListener("touchstart", onTouch, { passive: true });
      root.addEventListener("touchmove", onTouch, { passive: true });
    }
    window.addEventListener("pointermove", onWindowPointer);
    window.addEventListener("resize", onResize);
    photo.addEventListener("load", onPhotoLoad);
    const observer =
      typeof IntersectionObserver === "function"
        ? new IntersectionObserver(([entry]) => {
            state.visible = entry.isIntersecting;
            start();
          })
        : null;
    observer?.observe(root);
    layout();

    return () => {
      cancelAnimationFrame(state.frame);
      window.clearTimeout(resizeTimer);
      observer?.disconnect();
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerleave", onPointerLeave);
      root.removeEventListener("touchstart", onTouch);
      root.removeEventListener("touchmove", onTouch);
      window.removeEventListener("pointermove", onWindowPointer);
      window.removeEventListener("resize", onResize);
      photo.removeEventListener("load", onPhotoLoad);
    };
  }, [variant]);

  const photoProps = {
    ref: photoRef,
    className: `${styles.photo} ${styles.kenBurns}`,
    "data-hero-photo": "",
    src: PORTRAIT.src,
    width: PORTRAIT.width,
    height: PORTRAIT.height,
    fetchPriority: "high",
    decoding: "async",
  } as const;

  return (
    <section ref={rootRef} className={styles.hero} data-cyber-hero={variant} aria-labelledby={labelledBy}>
      <div className={styles.glow} aria-hidden="true" />
      {variant === "founder" ? (
        <picture>
          <source media={CLOSEUP_MEDIA} srcSet={CLOSEUP.src} width={CLOSEUP.width} height={CLOSEUP.height} />
          <img {...photoProps} alt={photoAlt} />
        </picture>
      ) : (
        <img {...photoProps} alt={photoAlt} />
      )}
      <svg className={styles.grid} aria-hidden="true" focusable="false">
        <defs>
          <pattern ref={patternRef} id={gridId} width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M48 0H0V48" fill="none" stroke="#64748b" strokeWidth=".6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${gridId})`} />
      </svg>
      {scan && <div className={styles.scan} aria-hidden="true" />}
      {lens && (
        <div ref={lensRef} className={styles.lens} aria-hidden="true">
          <canvas ref={canvasRef} className={`${styles.code} ${styles.kenBurns}`} />
        </div>
      )}
      <div className={styles.shade} aria-hidden="true" />
      <ArcStats stats={stats} id={`arc-${variant}`} />
      {hud && <div className={styles.hud}>{hud}</div>}
      <div className={styles.copy}>{children}</div>
      {lens && (
        <p ref={hintRef} className={styles.hint} aria-hidden="true">
          <i />
          Move your cursor to read the code
        </p>
      )}
    </section>
  );
}

export function Ticker({ items }: { items: readonly string[] }) {
  return (
    <div className={styles.ticker} aria-hidden="true">
      <div className={styles.tickerTrack}>
        {["first", "second"].map((copy) => (
          <span key={copy}>
            {items.map((item) => (
              <React.Fragment key={item}>
                {item}
                <b>/</b>
              </React.Fragment>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
