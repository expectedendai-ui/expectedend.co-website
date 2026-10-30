import type * as React from "react";
import { PROOF_OF_WORK, type ProofIcon, type ProofItem } from "./content";
import cyber from "./cyber.module.css";
import { CountUp } from "./home-motion";
import styles from "./home.module.css";

type LineIcon = Exclude<ProofIcon, "mybiblelens" | "watercheck" | "android">;

const LINE_ICONS: Record<LineIcon, React.ReactNode> = {
  canvas: <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z" />,
  route: (
    <>
      <circle cx="6" cy="19" r="3" />
      <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
      <circle cx="18" cy="5" r="3" />
    </>
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  widgets: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  drop: <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7Z" />,
  building: (
    <>
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2M10 6h4M10 10h4M10 14h4M10 18h4" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" />
    </>
  ),
  browser: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 9h20M6 6.5h.01M9 6.5h.01" />
    </>
  ),
  sparkle: <path d="m12 3 2.1 6.9L21 12l-6.9 2.1L12 21l-2.1-6.9L3 12l6.9-2.1Z" />,
  egg: (
    <>
      <path d="M12 22c4.4 0 7-3.1 7-7.5S15.5 2 12 2 5 10.1 5 14.5 7.6 22 12 22Z" />
      <path d="M8.5 14.5c.6 1.8 1.9 3 3.5 3.3" />
    </>
  ),
  star: <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01Z" />,
  play: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="m10 8 6 4-6 4Z" />
    </>
  ),
  film: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="2.5" />
      <path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </>
  ),
  book: <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2ZM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7Z" />,
  shirt: (
    <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23Z" />
  ),
  bag: (
    <>
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4ZM3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </>
  ),
};

function WorkIcon({ icon }: { icon: ProofIcon }) {
  if (icon === "mybiblelens" || icon === "watercheck") {
    return <img src={`/brand/${icon === "mybiblelens" ? "mybiblelens" : "thewatercheck"}.png`} alt="" width="48" height="48" loading="lazy" decoding="async" />;
  }
  if (icon === "android") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        <path d="M17.6 9.48 19.44 6.3a.38.38 0 0 0-.66-.38l-1.86 3.23a11.5 11.5 0 0 0-9.84 0L5.22 5.92a.38.38 0 0 0-.66.38L6.4 9.48A10.8 10.8 0 0 0 1 18h22a10.8 10.8 0 0 0-5.4-8.52ZM7 15.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm10 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {LINE_ICONS[icon]}
    </svg>
  );
}

function WorkCard({ item }: { item: ProofItem }) {
  return (
    <li className={styles.work}>
      <span className={styles.workIcon}>
        <WorkIcon icon={item.icon} />
      </span>
      <span className={styles.workText}>
        <span className={styles.workName}>{item.name}</span>
        <span className={styles.workCategory}>{item.category}</span>
      </span>
      <span className={styles.workStatus} data-tone={item.tone}>
        {item.status}
      </span>
    </li>
  );
}

const PROOF_STATS = [
  {
    strong: "2 apps",
    rest: " on the App Store",
    icon: (
      <path
        fill="currentColor"
        stroke="none"
        d="M16.4 12.6c0-2.4 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.1 1-4 2.4-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.1-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8 0 0-2.5-1-2.5-3.9ZM14 5.5c.7-.8 1.1-1.9 1-3-1 0-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.9 1 .1 2.1-.6 2.8-1.4Z"
      />
    ),
  },
  { strong: "43 languages", rest: " in MyBibleLens", icon: LINE_ICONS.globe },
  { strong: "10 years", rest: " writing code", icon: <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" /> },
  {
    strong: "Idea to launch",
    rest: ", all in-house",
    icon: (
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09ZM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2ZM9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    ),
  },
] as const;

/** "20+ projects" proof: a counted-up number, proof points, a giant outlined line and two rows of real projects. */
export function ProofOfWork() {
  return (
    <section className={`${cyber.section} ${styles.proof}`} id="proof" aria-labelledby="proof-title">
      <div className={`${cyber.wrap} ${styles.proofHead}`}>
        <p className={styles.proofCount} data-reveal>
          <span className={styles.proofNumber}>
            <CountUp to={20} />
          </span>
          <span className={styles.proofPlus}>+</span>
          <span className={styles.proofCaption}>Projects built</span>
        </p>
        <div data-reveal style={{ "--reveal-delay": "100ms" } as React.CSSProperties}>
          <p className={cyber.eyebrow}>03 / Proof of work</p>
          <h2 className={cyber.title} id="proof-title">
            Built from zero. <em>The work speaks for itself.</em>
          </h2>
          <p className={cyber.lead}>Apps, websites, AI tools, films and campaigns, designed, coded and launched in-house. Here is some of it.</p>
          <ul className={styles.proofStats}>
            {PROOF_STATS.map((stat) => (
              <li key={stat.strong}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                  {stat.icon}
                </svg>
                <span>
                  <strong>{stat.strong}</strong>
                  {stat.rest}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.bigline} aria-hidden="true">
        <div className={styles.biglineTrack}>
          {["first", "second"].map((copy) => (
            <span key={copy}>
              <b>20+</b> PROJECTS <i>✦</i> BUILT <i>✦</i> SHIPPED <i>✦</i> LIVE <i>✦</i>
            </span>
          ))}
        </div>
      </div>

      {PROOF_OF_WORK.map((row, index) => (
        <div
          key={row.id}
          className={styles.marquee}
          data-reverse={index % 2 === 1 ? "" : undefined}
          style={{ "--marquee-duration": `${75 + index * 10}s` } as React.CSSProperties}
        >
          <div className={styles.marqueeTrack}>
            <ul className={styles.marqueeCopy} aria-label={index === 0 ? "Apps and products" : "Websites, AI and creative work"}>
              {row.items.map((item) => (
                <WorkCard key={item.name} item={item} />
              ))}
            </ul>
            <ul className={styles.marqueeCopy} aria-hidden="true">
              {row.items.map((item) => (
                <WorkCard key={item.name} item={item} />
              ))}
            </ul>
          </div>
        </div>
      ))}

      <div className={cyber.wrap}>
        <div className={styles.proofCta} data-reveal>
          <p>
            Your project could be <em>next.</em>
          </p>
          <a className={`${cyber.btn} ${cyber.btnLight}`} href="#services">
            Start yours
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
