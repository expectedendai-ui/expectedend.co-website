import type * as React from "react";
import { ArrowDownIcon, ArrowUpRightIcon } from "./action-icons";
import { ContactForm } from "./contact-form";
import styles from "./style.module.css";

type AboutPageProps = {
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <main className={styles.aboutMain}>
      <section className={styles.aboutLayout}>
        <p className={styles.kicker}>About Expected End</p>
        <h1>Technology with purpose, built for real life.</h1>
        <div className={styles.aboutCopy}>
          <p className={styles.aboutLead}>
            Expected End LLC creates software, productivity tools, digital experiences, and communities that bring people closer
            to God.
          </p>
          <p>
            We design products that help people learn, create, work, and find peace while leaving room for family, friends, and
            life beyond the screen.
          </p>
          <p>
            MyBibleLens and The Water Check community are the first expressions of that mission. Each meets a different need and
            helps make technology feel useful, human, and easy to leave when its work is done.
          </p>
        </div>
      </section>

      <div className={styles.aboutStory}>
        <section className={styles.founderReveal} id="founder-story" aria-labelledby="founder-reveal-title">
          <div className={styles.founderRevealIntro}>
            <p className={styles.kicker}>Behind the company</p>
            <h2 id="founder-reveal-title">The story behind Expected End.</h2>
            <p>
              The personal road from fifth-grade technology experiments to grief, faith, MyBibleLens, and a new beginning.{" "}
              <span className={styles.founderReadMore}>Read more</span>
            </p>
          </div>
          <a className={styles.founderToggle} href="/denzel-rigaud" onClick={onNavigate}>
            <span>The Founder Story, Denzel Rigaud</span>
            <ArrowUpRightIcon className={styles.founderToggleIcon} />
          </a>
        </section>

        <section className={styles.missionStory} id="mission" aria-labelledby="about-mission-title">
          <div>
            <p className={styles.kicker}>Our mission</p>
            <h2 id="about-mission-title">Technology should help you return to your life.</h2>
          </div>
          <div className={styles.missionCopy}>
            <p>
              Technology can shape the way we seek attention and reward. Constant comparison, dating apps, and polished versions
              of other people’s lives can make real relationships and quiet moments feel less valuable. Children enter those
              systems before they understand the pressure behind them.
            </p>
            <p>
              Expected End gives people a better use for the screen. We build tools for children and adults to learn, create,
              work, find a safe place, or move closer to God. Each product should return them to the life in front of them.
            </p>
            <p className={styles.missionLine}>
              Our mission is to bring people closer to God through productive, useful, and joyful technology that leaves room for
              real life.
            </p>
          </div>
        </section>

        <section className={styles.pressSection} id="press" aria-labelledby="press-title">
          <div>
            <p className={styles.kicker}>Press</p>
            <h2 id="press-title">Tell the story with us.</h2>
          </div>
          <div>
            <p>
              Expected End welcomes conversations about faith-centered technology, digital well-being, founder grief, MyBibleLens,
              The Water Check, and products that return time to real life.
            </p>
            <a className={styles.actionWithIcon} href="/press" onClick={onNavigate}>
              Open the press and media kit <ArrowDownIcon className={styles.actionIcon} />
            </a>
          </div>
        </section>
      </div>

      <ContactForm />
    </main>
  );
}
