import * as React from "react";
import { ArrowDownIcon, ArrowUpRightIcon } from "./action-icons";
import { BioDialog } from "./bio-dialog";
import { ContactDialog } from "./contact-dialog";
import { PROJECTS, SERVICES } from "./content";
import styles from "./style.module.css";

type HomePageProps = {
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

function MerchSticker({ kind, brand = "mybiblelens" }: { kind: "tee" | "hoodie"; brand?: "mybiblelens" | "watercheck" }) {
  const shape = kind === "tee"
    ? "M23 20 36 12 46 21H58L68 12 81 20 94 42 79 51 73 42 70 91H34L31 42 25 51 10 42Z"
    : "M31 23C34 9 66 9 69 23L84 31 95 53 81 61 76 51 73 93H27L24 51 19 61 5 53 16 31ZM40 23C44 32 56 32 60 23 56 17 44 17 40 23Z";

  return (
    <svg
      className={`${styles.merchSticker} ${styles[kind]} ${brand === "watercheck" ? styles.waterApparel : ""}`}
      data-merch-sticker={brand === "mybiblelens" ? kind : undefined}
      data-water-apparel={brand === "watercheck" ? kind : undefined}
      viewBox="0 0 100 105"
      aria-hidden="true"
      focusable="false"
    >
      <path className={styles.merchStickerEdge} d={shape} />
      <path className={styles.merchStickerBody} d={shape} />
      {brand === "mybiblelens" && (
        <path className={styles.merchStickerCross} data-faith-mark d="M47 43h7v10h10v7H54v17h-7V60H37v-7h10Z" />
      )}
    </svg>
  );
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [bioOpener, setBioOpener] = React.useState<HTMLButtonElement | null>(null);
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
                {...(project.destination.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : { onClick: onNavigate })}
                aria-label={`Visit ${project.name}`}
              >
                <span className={styles.projectArtClip}>
                  {project.artVariant === "mybiblelens-store" ? (
                    <span className={styles.storeCollage} data-store-collage="mybiblelens">
                      <img className={styles.storeMark} src={project.image} alt="" width="700" height="700" loading="lazy" decoding="async" />
                      <img className={`${styles.pixelSticker} ${styles.pixelCross}`} src="/brand/mybiblelens-store/pixel-cross.png" alt="" width="420" height="420" loading="lazy" decoding="async" />
                      <img className={`${styles.pixelSticker} ${styles.pixelDove}`} src="/brand/mybiblelens-store/pixel-dove.png" alt="" width="420" height="420" loading="lazy" decoding="async" />
                      <img className={`${styles.pixelSticker} ${styles.pixelChurch}`} src="/brand/mybiblelens-store/pixel-church.png" alt="" width="420" height="420" loading="lazy" decoding="async" />
                      <MerchSticker kind="tee" />
                      <MerchSticker kind="hoodie" />
                    </span>
                  ) : project.artVariant === "watercheck-store" ? (
                    <span className={styles.waterStoreCollage} data-store-collage="watercheck">
                      <span className={styles.waterRipple} aria-hidden="true" />
                      <span className={styles.waterOrb} data-water-orb>
                        <img className={styles.waterStoreMark} src={project.image} alt="" width="700" height="700" loading="lazy" decoding="async" />
                      </span>
                      <span className={`${styles.waterBubble} ${styles.waterBubbleTwo}`} aria-hidden="true" />
                      <span className={`${styles.waterBubble} ${styles.waterBubbleThree}`} aria-hidden="true" />
                      <MerchSticker kind="tee" brand="watercheck" />
                      <MerchSticker kind="hoodie" brand="watercheck" />
                      <span className={styles.waterApparelBadge} aria-hidden="true">
                        <strong>Water Check</strong>
                        <small>Hydration Dept.</small>
                      </span>
                    </span>
                  ) : (
                    <img src={project.image} alt="" width="640" height="640" loading="lazy" decoding="async" />
                  )}
                </span>
              </a>
              <div className={styles.projectText}>
                <p className={styles.status}>{project.category}</p>
                <h3 className={project.titleClassName ? styles[project.titleClassName] : ""}>{project.name}</h3>
                <div className={styles.projectActions}>
                  {project.name === "The Water Check" ? (
                    <button
                      className={styles.bioAction}
                      type="button"
                      aria-label="Bio for The Water Check"
                      onClick={(event) => setBioOpener(event.currentTarget)}
                    >
                      Bio
                    </button>
                  ) : "secondaryAction" in project ? (
                    <a
                      className={styles.bioAction}
                      href={project.secondaryAction.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.secondaryAction.label} for ${project.name}`}
                    >
                      {project.secondaryAction.label}
                    </a>
                  ) : null}
                  <a
                    className={styles.actionWithIcon}
                    href={project.destination.href}
                    {...(project.destination.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : { onClick: onNavigate })}
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

      {bioOpener && <BioDialog returnFocusTo={bioOpener} onClose={() => setBioOpener(null)} />}
    </main>
  );
}
