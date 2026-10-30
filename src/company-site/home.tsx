import * as React from "react";
import { ArrowDownIcon, ArrowUpRightIcon } from "./action-icons";
import { BioDialog } from "./bio-dialog";
import { ContactDialog } from "./contact-dialog";
import { PROJECTS, SERVICES } from "./content";
import { type ArcStat, CyberHero, Ticker } from "./cyber-hero";
import cyber from "./cyber.module.css";
import { AndroidMark, AppStoreMark, ServiceArt, tiltHandlers, useHomeMotion } from "./home-motion";
import styles from "./home.module.css";
import { ProofOfWork } from "./proof-of-work";

type HomePageProps = {
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

const HERO_STATS: readonly ArcStat[] = [
  { value: "20", suffix: "+", label: "PROJECTS BUILT" },
  { value: "43", label: "LANGUAGES" },
  { value: "2", label: "ON THE APP STORE" },
];

export function HomePage({ onNavigate }: HomePageProps) {
  const [bioOpener, setBioOpener] = React.useState<HTMLButtonElement | null>(null);
  const [activeService, setActiveService] = React.useState<{ reason: string; opener: HTMLButtonElement } | null>(null);
  const [previewIndex, setPreviewIndex] = React.useState(0);
  const mainRef = React.useRef<HTMLElement>(null);
  useHomeMotion(mainRef);
  const tilt = tiltHandlers();

  return (
    <main className={cyber.page} ref={mainRef}>
      <CyberHero variant="home" labelledBy="hero-title" photoAlt="Denzel Rigaud, founder of Expected End" stats={HERO_STATS} lens>
        <p className={`${cyber.heroEyebrow} ${cyber.rise}`} style={{ animationDelay: ".15s" }}>
          Gateway to your <em>expected end</em>
        </p>
        <h1 id="hero-title" className={`${cyber.heroTitle} ${cyber.rise}`} style={{ animationDelay: ".3s" }}>
          Purpose, <br />
          built <br />
          beautifully.
        </h1>
        <p className={`${cyber.heroText} ${cyber.rise}`} style={{ animationDelay: ".5s" }}>
          Expected End creates thoughtful software, productivity tools, digital experiences, and communities that bring people closer to God in exciting and easy ways!
        </p>
        <div className={cyber.rise} style={{ animationDelay: ".7s" }}>
          <a className={cyber.cta} href="#projects">
            <span className={cyber.shine} aria-hidden="true" />
            <span className={cyber.ctaLabel}>See the work</span>
            <ArrowDownIcon />
          </a>
        </div>
      </CyberHero>

      <Ticker items={SERVICES.map(([, title]) => title)} />

      <section className={cyber.section} id="projects" aria-labelledby="projects-title">
        <div className={cyber.wrap}>
          <div data-reveal>
            <p className={cyber.eyebrow}>01 / Projects</p>
            <h2 className={cyber.title} id="projects-title">
              Two apps on the App Store. <br />
              <em>Android coming soon.</em>
            </h2>
          </div>
          <div className={styles.projectGrid}>
            {PROJECTS.filter((project) => !project.artVariant.endsWith("-store")).map((project, index) => (
              <article
                className={styles.card}
                key={project.name}
                data-reveal
                data-tone={project.artVariant}
                style={{ "--reveal-delay": `${index * 100}ms` } as React.CSSProperties}
              >
                <a
                  className={styles.stage}
                  {...tilt}
                  href={project.destination.href}
                  {...(project.destination.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : { onClick: onNavigate })}
                  aria-label={`Visit ${project.name}`}
                >
                  <span className={styles.stageTag} aria-hidden="true">
                    EE / {String(index + 1).padStart(3, "0")}
                  </span>
                  <img className={styles.icon} src={project.image} alt="" width="148" height="148" loading="lazy" decoding="async" />
                  <span className={styles.stageGlow} aria-hidden="true" />
                </a>
                <div className={styles.body}>
                  <div className={styles.meta}>
                    {project.badge ? (
                      <span className={styles.chip}>
                        <AppStoreMark />
                        {project.badge}
                      </span>
                    ) : null}
                    <span className={`${styles.chip} ${styles.chipSoft}`}>
                      <AndroidMark />
                      Android coming soon
                    </span>
                  </div>
                  <h3 className={styles.name}>{project.name}</h3>
                  <p className={styles.category}>{project.category}</p>
                  <p className={styles.tagline}>{project.tagline}</p>
                  <div className={cyber.actions}>
                    <a
                      className={`${cyber.btn} ${cyber.btnLight}`}
                      href={project.destination.href}
                      {...(project.destination.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : { onClick: onNavigate })}
                    >
                      {project.destination.actionLabel}
                      <ArrowUpRightIcon />
                    </a>
                    {project.name === "The Water Check" ? (
                      <button className={cyber.btn} type="button" aria-label="Bio for The Water Check" onClick={(event) => setBioOpener(event.currentTarget)}>
                        Bio
                      </button>
                    ) : "secondaryAction" in project ? (
                      <a
                        className={cyber.btn}
                        href={project.secondaryAction.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.secondaryAction.label} for ${project.name}`}
                      >
                        {project.secondaryAction.label}
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${cyber.section} ${styles.behindSection}`} aria-labelledby="behind-title">
        <div className={cyber.wrap}>
          <div className={styles.behind} data-reveal>
            <img className={styles.behindPhoto} src="/media/denzel-founder-scroll-poster.jpg" alt="" width="2560" height="1136" loading="lazy" decoding="async" />
            <div className={styles.behindCopy}>
              <p className={cyber.eyebrow}>02 / Behind the work</p>
              <h2 id="behind-title" className={cyber.title}>
                Every product here started with a question in a <em>fifth-grade classroom.</em>
              </h2>
              <p className={cyber.lead}>Grief, faith and a lot of late nights came between that question and these apps. The rest of the story is on its own page.</p>
              <div className={cyber.actions}>
                <a className={`${cyber.btn} ${cyber.btnLight}`} href="/denzel-rigaud" onClick={onNavigate}>
                  Read the story <ArrowUpRightIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProofOfWork />

      <section className={`${cyber.section} ${styles.services}`} id="services" aria-labelledby="services-title">
        <div className={cyber.wrap}>
          <div data-reveal>
            <p className={cyber.eyebrow}>04 / Selected services</p>
            <h2 id="services-title" className={cyber.title}>
              You dream it, <em>I build it.</em>
            </h2>
            <p className={cyber.lead}>The products come first. When the fit is right, the same thoughtfulness goes into selected work for others.</p>
            <p className={cyber.note}>Please include a price range for all inquiries and mention in your message if an NDA is needed.</p>
          </div>
          <div className={styles.picker}>
            <div className={styles.serviceList}>
              {SERVICES.map(([number, title, description, contactReason], index) => (
                <button
                  className={styles.service}
                  type="button"
                  key={number}
                  data-reveal
                  data-active={index === previewIndex ? "" : undefined}
                  style={{ "--reveal-delay": `${index * 50}ms` } as React.CSSProperties}
                  onPointerEnter={() => setPreviewIndex(index)}
                  onFocus={() => setPreviewIndex(index)}
                  onClick={(event) => setActiveService({ reason: contactReason, opener: event.currentTarget })}
                >
                  <span className={styles.serviceNumber}>{number}</span>
                  <span className={styles.serviceMain}>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </span>
                  <svg className={styles.serviceArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                    <path d="M7 17 17 7" />
                    <path d="M8 7h9v9" />
                  </svg>
                  <span className={styles.serviceMini}>
                    <ServiceArt number={number} />
                  </span>
                </button>
              ))}
            </div>
            <div className={styles.preview} data-reveal>
              <div className={styles.previewArt} aria-hidden="true">
                {SERVICES.map(([number], index) => (
                  <span key={number} data-active={index === previewIndex ? "" : undefined}>
                    <ServiceArt number={number} />
                  </span>
                ))}
              </div>
              <div className={styles.previewFoot}>
                <p className={styles.previewCount}>
                  Service {SERVICES[previewIndex][0]} / {SERVICES.length.toString().padStart(2, "0")}
                </p>
                <p className={styles.previewTitle}>{SERVICES[previewIndex][1]}</p>
                <button
                  className={`${cyber.btn} ${cyber.btnLight}`}
                  type="button"
                  onClick={(event) => setActiveService({ reason: SERVICES[previewIndex][3], opener: event.currentTarget })}
                >
                  Start this project
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {activeService && <ContactDialog initialReason={activeService.reason} returnFocusTo={activeService.opener} onClose={() => setActiveService(null)} />}

      {bioOpener && <BioDialog returnFocusTo={bioOpener} onClose={() => setBioOpener(null)} />}
    </main>
  );
}
