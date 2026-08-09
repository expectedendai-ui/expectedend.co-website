import type * as React from "react";
import { ArrowRightIcon, ArrowUpRightIcon, CheckInIcon, PlusIcon, SparkleIcon } from "./water-check-icons";
import styles from "./water-check-page.module.css";

type WaterCheckPageProps = {
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

const FEATURES = [
  {
    number: "01",
    eyebrow: "Planned input",
    title: "Planned scan or described-drink logging",
    copy: "Photograph a label or describe a drink in plain language. The future product is intended to turn either into a simple journal entry.",
    accent: "sky",
    preview: "scanner",
  },
  {
    number: "02",
    eyebrow: "Planned context",
    title: "Planned hydration and nutrient tracking",
    copy: "See estimated water, sugar, sodium, and other nutritional details together, so a drink has context beyond a single number.",
    accent: "aqua",
    preview: "calendar",
  },
  {
    number: "03",
    eyebrow: "Planned reflection",
    title: "Planned bloat check-ins",
    copy: "A quick later check-in is intended to help build a private record of how different days and drinks felt over time.",
    accent: "violet",
    preview: "day-track",
  },
  {
    number: "04",
    eyebrow: "Planned explanation",
    title: "Educational, approximate AI",
    copy: "Future explanations may surface possible patterns in a journal. They may be incomplete and cannot diagnose, treat, prevent, or establish a definitive cause.",
    accent: "coral",
    preview: "insight",
  },
] as const;

type FeaturePreviewKind = (typeof FEATURES)[number]["preview"];

const CALENDAR_WEEKDAYS = [
  ["mon", "M"],
  ["tue", "T"],
  ["wed", "W"],
  ["thu", "T"],
  ["fri", "F"],
  ["sat", "S"],
  ["sun", "S"],
] as const;

const CALENDAR_DAYS = [
  ["jul-27", "27", "outside"],
  ["jul-28", "28", "outside"],
  ["jul-29", "29", "outside"],
  ["jul-30", "30", "outside"],
  ["jul-31", "31", "outside"],
  ["aug-1", "1", "tracked"],
  ["aug-2", "2", "tracked"],
  ["aug-3", "3", "tracked"],
  ["aug-4", "4", "tracked"],
  ["aug-5", "5", "tracked"],
  ["aug-6", "6", "tracked"],
  ["aug-7", "7", "tracked"],
  ["aug-8", "8", "today"],
  ["aug-9", "9", ""],
] as const;

const FAQS = [
  {
    question: "Is The Water Check available now?",
    answer: "Not yet. The Water Check is in development, and this page has no download links or live store listings.",
  },
  {
    question: "Will a possible pattern explain why bloating happened?",
    answer:
      "No. Bloating can have many causes. Any future AI or nutritional explanation is planned to be educational, approximate, and potentially incomplete; it will not diagnose a condition or prove causation.",
  },
  {
    question: "Does this page collect health information?",
    answer:
      "No. This Coming Soon page has no waitlist, account, scan upload, symptom form, or demographic questionnaire. Following Instagram is optional and opens Instagram only after an intentional click.",
  },
  {
    question: "Who is the future product for?",
    answer:
      "The planned experience is for adults age 18 and older who want a calmer way to reflect on drinks, hydration, and possible personal patterns.",
  },
] as const;

function FeaturePreview({ kind }: { kind: FeaturePreviewKind }) {
  if (kind === "scanner") {
    return (
      <div className={styles.featurePreview} data-feature-preview={kind} aria-hidden="true">
        <div className={styles.previewBar}>
          <span>Scan a drink</span>
          <span className={styles.livePill}>Camera ready</span>
        </div>
        <div className={styles.scanViewport}>
          <span className={styles.scanCornerTopLeft} />
          <span className={styles.scanCornerTopRight} />
          <span className={styles.scanCornerBottomLeft} />
          <span className={styles.scanCornerBottomRight} />
          <div className={styles.bottleMockup}>
            <span className={styles.bottleCap} />
            <span className={styles.bottleLabel}>H₂O</span>
          </div>
          <span className={styles.scanBeam} />
        </div>
        <div className={styles.scanResult}>
          <span className={styles.resultIcon}>+</span>
          <span>
            <strong>Electrolyte water</strong>
            <small>12 fl oz · ready to review</small>
          </span>
          <span className={styles.resultAction}>Add</span>
        </div>
      </div>
    );
  }

  if (kind === "calendar") {
    return (
      <div className={styles.featurePreview} data-feature-preview={kind} aria-hidden="true">
        <div className={styles.previewBar}>
          <span>August 2026</span>
          <span className={styles.calendarArrows}>‹ &nbsp; ›</span>
        </div>
        <div className={styles.weekdays}>
          {CALENDAR_WEEKDAYS.map(([id, day]) => (
            <span key={id}>{day}</span>
          ))}
        </div>
        <div className={styles.calendarGrid}>
          {CALENDAR_DAYS.map(([id, day, state]) => (
            <span className={state ? styles[state] : undefined} key={id}>
              {day}
            </span>
          ))}
        </div>
        <div className={styles.calendarSummary}>
          <span className={styles.progressRing}>74%</span>
          <span>
            <strong>6 day rhythm</strong>
            <small>Hydration logs this week</small>
          </span>
          <span className={styles.summaryBars}>
            <i />
            <i />
            <i />
          </span>
        </div>
      </div>
    );
  }

  if (kind === "day-track") {
    return (
      <div className={`${styles.featurePreview} ${styles.dayTrackPreview}`} data-feature-preview={kind} aria-hidden="true">
        <div className={styles.previewBar}>
          <span>Today · Aug 8</span>
          <span className={styles.dayScore}>Day 06</span>
        </div>
        <div className={styles.dayProgress}>
          <span>
            <strong>52</strong>
            <small>oz logged</small>
          </span>
          <div>
            <i />
          </div>
          <span>
            <strong>3</strong>
            <small>drinks</small>
          </span>
        </div>
        <div className={styles.miniTimeline}>
          <div>
            <time>8:10</time>
            <i />
            <span>
              <strong>Morning water</strong>
              <small>16 oz · water</small>
            </span>
            <b>✓</b>
          </div>
          <div>
            <time>12:18</time>
            <i />
            <span>
              <strong>Sparkling lemon</strong>
              <small>12 oz · carbonated</small>
            </span>
            <b>✓</b>
          </div>
          <div className={styles.timelineCurrent}>
            <time>3:42</time>
            <i />
            <span>
              <strong>Bloat check-in</strong>
              <small>A little uncomfortable</small>
            </span>
            <b>→</b>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.featurePreview} ${styles.insightPreview}`} data-feature-preview={kind} aria-hidden="true">
      <div className={styles.previewBar}>
        <span>Water Check AI</span>
        <span className={styles.educationPill}>Educational only</span>
      </div>
      <div className={styles.insightChart}>
        <span className={styles.insightLabel}>7-day journal signal</span>
        <svg viewBox="0 0 300 74" role="presentation">
          <path d="M4 55 C38 57, 45 36, 76 40 S123 67, 151 41 S199 14, 225 28 S269 52, 296 16" />
          <circle cx="76" cy="40" r="4" />
          <circle cx="151" cy="41" r="4" />
          <circle cx="225" cy="28" r="4" />
          <circle cx="296" cy="16" r="5" />
        </svg>
        <div className={styles.chartDays}>
          <span>M</span>
          <span>T</span>
          <span>W</span>
          <span>T</span>
          <span>F</span>
          <span>S</span>
          <span>S</span>
        </div>
      </div>
      <div className={styles.insightMessage}>
        <span className={styles.sparkleMark}>✦</span>
        <span>
          <small>Possible pattern</small>
          <strong>Carbonation may be worth noticing.</strong>
          <em>Explore the journal—not a diagnosis.</em>
        </span>
      </div>
    </div>
  );
}

function CommunityLink({ compact = false }: { compact?: boolean }) {
  return (
    <a
      aria-label="Join our community to help you stay hydrated!"
      className={`${styles.communityLink} ${compact ? styles.communityLinkCompact : ""}`}
      href="https://www.instagram.com/thewatercheck/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        className={styles.instagramLogo}
        src="/instagram-logo.webp"
        alt="Instagram"
        width="256"
        height="256"
        loading="lazy"
        decoding="async"
      />
      <span>Join our community to help you stay hydrated!</span>
      <ArrowUpRightIcon className={styles.inlineIcon} />
    </a>
  );
}

export function WaterCheckPage({ onNavigate }: WaterCheckPageProps) {
  return (
    <div className={styles.pageFrame}>
      <main className={styles.page} aria-label="The Water Check Coming Soon">
        <section className={styles.hero} aria-label="Water Check introduction">
          <div className={styles.heroAtmosphere} aria-hidden="true">
            <span className={styles.heroOrbA} />
            <span className={styles.heroOrbB} />
            <span className={styles.heroGrid} />
          </div>

          <div className={styles.heroCopy}>
            <h1 className={styles.srOnly}>The Water Check</h1>
            <p className={styles.eyebrow}>A future drink + bloat journal</p>
            <h2 className={styles.heroTitle}>You’re not fat, just bloated.</h2>
            <p className={styles.tagline}>Snap. Track. Debloat.</p>
            <p className={styles.heroLimit}>
              Bloating can have many causes. The future product explores possible patterns in a personal drink journal—not body
              composition or a diagnosis.
            </p>
            <CommunityLink />
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.brandHalo}>
              <div className={styles.brandGlass}>
                <span className={styles.brandGlint} aria-hidden="true" />
                <picture>
                  <source
                    type="image/webp"
                    srcSet="/brand/thewatercheck-liquid-glass-720.webp 720w, /brand/thewatercheck-liquid-glass-1080.webp 1080w"
                    sizes="(max-width: 900px) 88vw, 35rem"
                  />
                  <img
                    className={styles.brandImage}
                    src="/brand/thewatercheck-liquid-glass.png"
                    alt="The Water Check liquid-glass C emblem"
                    width="720"
                    height="720"
                    decoding="async"
                    fetchPriority="high"
                  />
                </picture>
              </div>
            </div>
            <div className={styles.visualNote}>
              <SparkleIcon className={styles.iconSvg} />
              <p>
                <strong>Notice, don’t diagnose.</strong> A quieter way to look back at the day.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.founderStory} aria-labelledby="founder-story-title">
          <div className={styles.founderStoryHeader}>
            <time dateTime="2026-08">Aug 2026</time>
            <h2 id="founder-story-title">What we’re building, and why</h2>
            <p className={styles.founderByline}>Denzel Rigaud, Founder of Expected End</p>
            <nav className={styles.founderSocials} aria-label="Denzel Rigaud social profiles">
              <a
                aria-label="Denzel Rigaud on LinkedIn"
                className={styles.founderSocialLink}
                href="https://www.linkedin.com/in/denzel-rigaud-2b0200210/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img className={styles.founderSocialIcon} src="/linkedin-icon.webp" alt="" width="28" height="28" />
                <span>LinkedIn</span>
              </a>
              <a
                aria-label="Denzel Rigaud on Instagram"
                className={styles.founderSocialLink}
                href="https://www.instagram.com/smiledenzel/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img className={styles.founderSocialIcon} src="/instagram-logo.webp" alt="" width="28" height="28" />
                <span>Instagram</span>
              </a>
            </nav>
          </div>

          <div className={styles.founderStoryBody}>
            <p>
              I grew up around women I love and heard how quickly feeling different could turn into harsh judgment about their
              bodies. I wanted to create a gentler pause: a way to notice what changed, keep the day in context, and ask better
              questions before blaming your body. Bloating can have many causes, and lasting or concerning symptoms deserve a
              conversation with a qualified healthcare professional.
            </p>
            <p>
              I watched people skip meals or restrict themselves because they did not know why their body felt different that day.
              The feeling might follow food, a fizzy drink, an energy drink, a salty meal, training, or a change in routine.
              Bloating has many possible causes, and those everyday details are easy to forget once discomfort takes over.
            </p>
            <p>
              I know that frustration as an athlete. Feeling bloated before training or competition distracts me and changes how
              comfortable I feel in my body. Hydration advice can become another rigid rule. “Drink a gallon a day” sounds
              universal, but hydration needs vary with the person, their activity, the climate, and their life stage.
            </p>
            <p>
              The problem is that we remember the discomfort and lose the context. Then we guess, blame our bodies, or make a
              sudden change without a clear record of what happened.
            </p>
            <p>
              The Water Check is my attempt to replace that guess with a private record. The planned app will let adults log or
              scan a drink, review approximate hydration and nutrient context, and check in later about bloating. Over time, it
              may help someone notice possible patterns and prepare better questions for a doctor or dietitian. It will not
              diagnose a condition or prove that one drink caused a symptom.
            </p>
            <p>
              I have carried The Water Check with me for 6 years. Now I am building the version I wanted as an athlete and the
              version I wish the women I grew up around had: calm, private, and free from shame. You deserve information before
              you blame your body.
            </p>
          </div>
        </section>

        <section className={styles.personalizationSection} aria-labelledby="personalization-title">
          <h2 id="personalization-title">How will it be special to you?</h2>
          <p className={styles.personalizationIntro}>
            We are designing the future app so you can decide which context belongs in your journal. Personalization should help
            the record fit your life without turning a sensitive detail into a label.
          </p>
          <ol className={styles.personalizationList}>
            <li>
              <strong>Context you choose.</strong> The future app is being designed to let activity, climate, routine, and life
              stage sit beside your journal when you decide that context is useful.
            </li>
            <li>
              <strong>Your own patterns.</strong> Look back at your entries instead of measuring yourself against another
              person&apos;s hydration target.
            </li>
            <li>
              <strong>Cycle context, if it applies to you.</strong> Optional cycle check-ins could sit beside drink and bloating
              notes to help you notice possible patterns over time. They will not set universal phase targets or explain a
              symptom.
            </li>
            <li>
              <strong>Your choice comes first.</strong> We plan to keep sensitive context optional and explain why it is useful
              before asking for it. The current Water Check page has no health or demographic fields.
            </li>
            <li>
              <strong>Inclusive evaluation.</strong> We plan to test with adults across age groups, cultures, skin tones, body
              types, and life stages. Ethnicity and racial identity will not become hydration profile fields or biological
              shortcuts.
            </li>
          </ol>
        </section>

        <section className={styles.storySection} aria-labelledby="story-title">
          <div className={styles.sectionIntro}>
            <p className={styles.sectionKicker}>One drink. One check-in. More context.</p>
            <h2 id="story-title">The space between “I had this” and “I felt that.”</h2>
            <p>
              The planned experience is a journal, not a verdict. It is designed to place a drink log and a later feeling on the
              same gentle timeline.
            </p>
          </div>

          <section className={styles.journalStage} aria-label="A fictional drink journal">
            <div className={styles.journalTopline}>
              <span>Fictional example</span>
              <span>Thursday · personal journal</span>
            </div>
            <ol className={styles.timeline}>
              <li className={styles.timelineItem}>
                <div className={styles.timelineTime}>12:18</div>
                <article className={`${styles.timelineCard} ${styles.drinkCard}`}>
                  <span className={styles.timelineIcon} aria-hidden="true">
                    <PlusIcon className={styles.iconSvg} />
                  </span>
                  <div>
                    <p className={styles.timelineLabel}>Drink logged</p>
                    <h3>Sparkling lemon water</h3>
                    <p>Described in a few words · estimated details planned</p>
                  </div>
                  <span className={styles.timelinePill}>Saved to day</span>
                </article>
              </li>
              <li className={styles.timelineItem}>
                <div className={styles.timelineTime}>15:42</div>
                <article className={`${styles.timelineCard} ${styles.checkinCard}`}>
                  <span className={styles.timelineIcon} aria-hidden="true">
                    <CheckInIcon className={styles.iconSvg} />
                  </span>
                  <div>
                    <p className={styles.timelineLabel}>Later bloat check-in</p>
                    <h3>“A little uncomfortable”</h3>
                    <p>A fictional reflection recorded later—not a clinical measurement.</p>
                  </div>
                  <span className={styles.timelinePill}>Check-in</span>
                </article>
              </li>
              <li className={styles.timelineItem}>
                <div className={styles.timelineTime}>Over time</div>
                <article className={`${styles.timelineCard} ${styles.patternCard}`}>
                  <span className={styles.timelineIcon} aria-hidden="true">
                    <SparkleIcon className={styles.iconSvg} />
                  </span>
                  <div>
                    <p className={styles.timelineLabel}>Qualified possible pattern</p>
                    <h3>Carbonated drinks might be worth noticing.</h3>
                    <p>Educational and approximate. A possible pattern is not a cause, diagnosis, or medical conclusion.</p>
                  </div>
                  <span className={styles.timelinePill}>Explore, don’t conclude</span>
                </article>
              </li>
            </ol>
          </section>
        </section>

        <section className={styles.featuresSection} aria-labelledby="features-title">
          <div className={styles.sectionIntro}>
            <p className={styles.sectionKicker}>Planned, not live</p>
            <h2 id="features-title">A future toolkit for the everyday detective work.</h2>
            <p>
              Every capability below describes the direction in development. Nothing on this website performs these actions today.
            </p>
          </div>
          <div className={styles.featureGrid}>
            {FEATURES.map((feature) => (
              <article className={`${styles.featureCard} ${styles[feature.accent]}`} key={feature.number}>
                <div className={styles.featureTopline}>
                  <span>{feature.eyebrow}</span>
                  <span>{feature.number}</span>
                </div>
                <FeaturePreview kind={feature.preview} />
                <h3>{feature.title}</h3>
                <p>{feature.copy}</p>
              </article>
            ))}
          </div>
          <aside className={styles.limitationBand} aria-label="Health and AI limitation">
            <span className={styles.limitMark} aria-hidden="true">
              i
            </span>
            <div>
              <h3>Context, never a conclusion.</h3>
              <p>
                Bloating can have many causes. Planned AI and nutritional estimates are educational, approximate, and may be
                incomplete. They do not determine body composition, diagnose or treat a condition, prevent illness, or establish
                definitive causation.
              </p>
              <a href="/thewatercheck/health-and-ai-disclaimer" onClick={onNavigate}>
                Read the Health &amp; AI Disclaimer <ArrowRightIcon className={styles.inlineIcon} />
              </a>
            </div>
          </aside>
        </section>

        <section className={styles.faqSection} aria-labelledby="faq-title">
          <div className={styles.sectionIntro}>
            <p className={styles.sectionKicker}>Before the first sip</p>
            <h2 id="faq-title">A few clear answers.</h2>
          </div>
          <div className={styles.faqList}>
            {FAQS.map((faq, index) => (
              <details className={styles.faqItem} key={faq.question} open={index === 0}>
                <summary>
                  <span>{faq.question}</span>
                  <span className={styles.faqControl} aria-hidden="true">
                    ＋
                  </span>
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={styles.finalSection} aria-labelledby="final-title">
          <div className={styles.finalGlow} aria-hidden="true" />
          <p className={styles.sectionKicker}>Coming Soon · 18+</p>
          <h2 id="final-title">The next check is not ready to download. It is ready to be built carefully.</h2>
          <p className={styles.finalCopy}>
            Follow the optional Instagram community link for launch updates. No release date is promised.
          </p>
          <CommunityLink compact />
        </section>
      </main>
    </div>
  );
}
