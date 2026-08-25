import * as React from "react";
import { ArrowDownIcon, ArrowUpRightIcon } from "./action-icons";
import { ContactDialog } from "./contact-dialog";
import { PROJECTS, SERVICES } from "./content";
import styles from "./style.module.css";

export function HomePage() {
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
                target="_blank"
                rel="noreferrer"
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
                  <a
                    className={styles.bioAction}
                    href={project.secondaryAction.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${project.secondaryAction.label} for ${project.name}`}
                  >
                    {project.secondaryAction.label}
                  </a>
                  <a
                    className={styles.actionWithIcon}
                    href={project.destination.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {project.destination.actionLabel}
                    <ArrowUpRightIcon className={styles.actionIcon} />
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
