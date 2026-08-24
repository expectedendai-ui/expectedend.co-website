import * as React from "react";
import { ArrowDownIcon, ArrowUpRightIcon } from "./action-icons";
import { BioDialog } from "./bio-dialog";
import { ContactDialog } from "./contact-dialog";
import { PROJECTS, SERVICES } from "./content";
import styles from "./style.module.css";

type HomePageProps = {
  onNavigate: React.MouseEventHandler<HTMLAnchorElement>;
};

export function HomePage({ onNavigate }: HomePageProps) {
  const [activeBio, setActiveBio] = React.useState<string | null>(null);
  const [activeService, setActiveService] = React.useState<{ reason: string; opener: HTMLButtonElement } | null>(null);

  return (
    <main className={styles.home}>
      <section className={styles.hero} aria-labelledby="hero-title">
        <video
          className={styles.heroVideo}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          tabIndex={-1}
          poster="/media/expected-end-hero-poster.jpg"
          preload="metadata"
        >
          <source src="/media/expected-end-hero.webm" type="video/webm" />
          <source src="/media/expected-end-hero.mp4" type="video/mp4" />
        </video>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroInner}>
          <p className={styles.kicker}>Expected End</p>
          <h1 id="hero-title" className={styles.heroTitle}>Purpose, built <em>beautifully.</em></h1>
          <p className={styles.heroStatement}>
            We create thoughtful software, productivity tools, digital experiences, and communities that <em>bring people closer to God in exciting and easy ways!</em>
          </p>
          <a className={`${styles.primaryAction} ${styles.actionWithIcon}`} href="#projects">
            Meet our projects <ArrowDownIcon className={styles.actionIcon} />
          </a>
        </div>
      </section>

      <section className={`${styles.section} ${styles.projectsSection}`} id="projects" aria-labelledby="projects-title">
        <h2 className={styles.srOnly} id="projects-title">Projects</h2>
        <div className={styles.projectGrid}>
          {PROJECTS.map((project) => (
            <article className={styles.project} key={project.name}>
              <a
                className={styles.projectArt}
                data-art-variant={project.artVariant}
                href={project.destination.href}
                onClick={project.destination.kind === "internal" ? onNavigate : undefined}
                target={project.destination.kind === "external" ? "_blank" : undefined}
                rel={project.destination.kind === "external" ? "noreferrer" : undefined}
                aria-label={`Visit ${project.name}`}
              >
                <span className={styles.projectArtClip}>
                  <img src={project.image} alt="" width="640" height="640" loading="lazy" decoding="async" />
                </span>
              </a>
              <div className={styles.projectText}>
                <p className={styles.status}>{project.category}</p>
                <h3 className={project.titleClassName ? styles[project.titleClassName] : ""}>{project.name}</h3>
                <div className={styles.projectActions}>
                  {project.bioHref ? (
                    <a
                      className={styles.bioAction}
                      href={project.bioHref}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Bio for ${project.name}`}
                    >
                      Bio
                    </a>
                  ) : (
                    <button
                      className={styles.bioAction}
                      type="button"
                      aria-label={`Bio for ${project.name}`}
                      onClick={() => setActiveBio(project.name)}
                    >
                      Bio
                    </button>
                  )}
                  <a
                    className={styles.actionWithIcon}
                    href={project.destination.href}
                    onClick={project.destination.kind === "internal" ? onNavigate : undefined}
                    target={project.destination.kind === "external" ? "_blank" : undefined}
                    rel={project.destination.kind === "external" ? "noreferrer" : undefined}
                  >
                    {project.destination.actionLabel}
                    {project.destination.kind === "external" && <ArrowUpRightIcon className={styles.actionIcon} />}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.servicesSection}`} id="services" aria-labelledby="services-title">
        <div className={styles.sectionHead}>
          <p className={styles.kicker}>Selected services</p>
          <h2 id="services-title">You dream it — <em>we build it</em></h2>
          <p className={styles.servicesIntro}>Our products come first. When the fit is right, we bring the same thoughtfulness to selected work for others.</p>
          <p className={styles.servicesGuidance}>Please include a price range for all inquiries and mention in your message if an NDA is needed.</p>
        </div>
        <div className={styles.services}>
          {SERVICES.map(([number, title, description, contactReason]) => (
            <button
              className={styles.service}
              type="button"
              key={number}
              onClick={(event) => setActiveService({ reason: contactReason, opener: event.currentTarget })}
            >
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </button>
          ))}
        </div>
      </section>

      {activeBio && <BioDialog projectName={activeBio} onClose={() => setActiveBio(null)} />}
      {activeService && (
        <ContactDialog
          initialReason={activeService.reason}
          returnFocusTo={activeService.opener}
          onClose={() => setActiveService(null)}
        />
      )}
    </main>
  );
}
