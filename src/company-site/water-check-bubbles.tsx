import type * as React from "react";

export type BubblesTrick = "idle" | "puff" | "spin" | "flip" | "wave" | "cheer";

/**
 * Bubbles, the pufferfish who shows people around The Water Check. The same drawing and tricks as in
 * the app (src/components/tour/Bubbles.tsx there), so the site and the app feel like one place.
 * A new `trickKey` replays the trick. Decorative: the words around him carry the meaning.
 */
export function Bubbles({ trick, trickKey, size = 120 }: { trick: BubblesTrick; trickKey: number; size?: number }) {
  const burst = trick === "cheer" ? 14 : 8;
  return (
    <span className={`wcb wcb--${trick}`} style={{ width: size, height: size }} aria-hidden="true">
      <span key={trickKey} className="wcb__trick">
        <svg viewBox="0 0 100 100" className="wcb__fish">
          <g className="wcb__spikes" stroke="#e0a83a" strokeWidth="3.2" strokeLinecap="round">
            <path d="M50 10v8M50 82v8M10 50h8M20 20l6 6M74 74l6 6M80 20l-6 6M26 74l-6 6M34 12l3 7M66 12l-3 7M34 88l3-7M66 88l-3-7M13 34l7 3M13 66l7-3" />
          </g>
          <path className="wcb__tail" d="M80 50c9-10 16-8 16-8s-3 8-3 8 3 8 3 8-7 2-16-8Z" fill="#ffb84d" />
          <circle cx="50" cy="50" r="32" fill="#ffd66b" />
          <ellipse cx="50" cy="62" rx="21" ry="13" fill="#fff1c2" />
          <path className="wcb__fin" d="M44 64c-4 8-12 10-16 7 3-5 8-9 16-7Z" fill="#ffb84d" />
          <g className="wcb__eyes">
            <circle cx="40" cy="44" r="8" fill="#fff" />
            <circle cx="61" cy="44" r="8" fill="#fff" />
            <circle cx="41.5" cy="45" r="4.6" fill="#0a2940" />
            <circle cx="62.5" cy="45" r="4.6" fill="#0a2940" />
            <circle cx="43" cy="43" r="1.6" fill="#fff" />
            <circle cx="64" cy="43" r="1.6" fill="#fff" />
          </g>
          <ellipse cx="32" cy="57" rx="5" ry="3" fill="#ff8fa3" className="wcb__cheek" />
          <ellipse cx="69" cy="57" rx="5" ry="3" fill="#ff8fa3" className="wcb__cheek" />
          <path className="wcb__smile" d="M45 59q5.5 5.5 11 0" stroke="#0a2940" strokeWidth="2.6" fill="none" strokeLinecap="round" />
          <ellipse className="wcb__o" cx="50.5" cy="61" rx="3.6" ry="4.2" fill="#0a2940" />
          <circle cx="30" cy="30" r="5" fill="#fff" opacity="0.7" />
        </svg>
        {(trick === "puff" || trick === "cheer") && <span className="wcb__ring" />}
        {(trick === "cheer" || trick === "spin" || trick === "puff") && (
          <span className="wcb__burst">
            {Array.from({ length: burst }, (_, index) => (
              <i key={index} style={{ "--a": `${(360 / burst) * index}deg`, "--d": `${index * 25}ms` } as React.CSSProperties} />
            ))}
          </span>
        )}
      </span>
    </span>
  );
}
