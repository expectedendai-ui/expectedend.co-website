import * as React from "react";
import { ArrowDownIcon, ArrowUpRightIcon, InstagramIcon, LinkedInIcon, YouTubeIcon } from "./action-icons";
import { FOUNDER_DESCRIPTION } from "./content";
import pageStyles from "./denzel-page.module.css";
import { VerseDialog } from "./verse-dialog";

type DenzelPageProps = {
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

const EXTERNAL_RECORDS = [
  {
    label: "World Athletics profile",
    href: "https://worldathletics.org/athletes/united-states/denzel-rigaud-15142195",
  },
  {
    label: "Lynn University athlete profile",
    href: "https://lynnfightingknights.com/sports/mens-cross-country/roster/denzel-rigaud/7913",
  },
  { label: "Wikidata", href: "https://www.wikidata.org/wiki/Q140198525" },
] as const;

const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://expectedend.co/denzel-rigaud#person",
  name: "Denzel Rigaud",
  url: "https://expectedend.co/denzel-rigaud",
  image: {
    "@type": "ImageObject",
    "@id": "https://expectedend.co/press#founder-portrait",
    contentUrl: "https://expectedend.co/media/denzel-rigaud-founder.png",
    width: 1058,
    height: 1487,
    caption: "Denzel Rigaud, founder of Expected End",
    creditText: "Denzel Rigaud / Expected End",
    license: "https://creativecommons.org/licenses/by-sa/4.0/",
    acquireLicensePage: "https://expectedend.co/press#licensing",
  },
  jobTitle: "Founder and Full-Stack Developer",
  description: FOUNDER_DESCRIPTION,
  worksFor: {
    "@type": "Organization",
    "@id": "https://expectedend.co/#organization",
    name: "Expected End",
    legalName: "Expected End LLC",
    url: "https://expectedend.co/",
  },
  memberOf: {
    "@type": "CollegeOrUniversity",
    "@id": "https://www.wikidata.org/wiki/Q3269570",
    name: "Lynn University",
    url: "https://www.lynn.edu/",
  },
  owns: [
    {
      "@type": "SoftwareApplication",
      "@id": "https://expectedend.co/#mybiblelens",
      name: "MyBibleLens",
      url: "https://mybiblelens.us/",
      sameAs: ["https://www.wikidata.org/wiki/Q141251174", "https://apps.apple.com/us/app/mybiblelens/id6764069602"],
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://expectedend.co/thewatercheckpage#application",
      name: "The Water Check",
      url: "https://expectedend.co/thewatercheckpage",
      sameAs: ["https://www.wikidata.org/wiki/Q141251206", "https://www.instagram.com/thewatercheck/"],
    },
  ],
  sameAs: [
    "https://www.instagram.com/smiledenzel/",
    "https://www.linkedin.com/in/denzel-rigaud-2b0200210/",
    "https://www.youtube.com/@expectedendco",
    "https://github.com/blackdynamitee",
    ...EXTERNAL_RECORDS.map(({ href }) => href),
  ],
};

const PROFILE_PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": "https://expectedend.co/denzel-rigaud#profile",
  url: "https://expectedend.co/denzel-rigaud",
  name: "Denzel Rigaud — Founder of Expected End",
  description: FOUNDER_DESCRIPTION,
  dateModified: "2026-09-03",
  mainEntity: PERSON_SCHEMA,
};

const MEMORY_PHOTOS = [
  {
    src: "/media/denzel-memory-01-father.jpg",
    download: "/media/denzel-memory-01-father.jpg",
    filename: "denzel-rigaud-father-memory.jpg",
    alt: "Denzel as a child with his father",
    title: "My father and me",
  },
  {
    src: "/media/denzel-memory-02-real-work.jpg",
    download: "/media/denzel-memory-02-real-work.jpg",
    filename: "denzel-rigaud-real-work-memory.jpg",
    alt: "Denzel working at a laptop with two collaborators around a table",
    title: "The work around the table",
  },
  {
    src: "/media/denzel-memory-03-workspace-display.jpg",
    download: "/media/denzel-memory-03-workspace.jpg",
    filename: "denzel-rigaud-mybiblelens-workspace.jpg",
    alt: "The MyBibleLens and The Water Check workspace",
    title: "Where MyBibleLens took shape",
  },
  {
    src: "/media/denzel-memory-04-real-work-archive-display.jpg",
    download: "/media/denzel-memory-04-real-work-archive.png",
    filename: "denzel-rigaud-real-work-archive.png",
    alt: "Denzel's Real Work video archive on his phone",
    title: "The Real Work archive",
  },
] as const;

export function DenzelPage({ onNavigate }: DenzelPageProps) {
  const heroRef = React.useRef<HTMLElement>(null);
  const [showVerse, setShowVerse] = React.useState(false);

  React.useEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const rect = hero.getBoundingClientRect();
      const distance = Math.max(hero.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(1, Math.max(0, -rect.top / distance));
      hero.style.setProperty("--founder-progress", progress.toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <main className={pageStyles.page}>
      <script type="application/ld+json">{JSON.stringify(PROFILE_PAGE_SCHEMA)}</script>

      <section ref={heroRef} className={pageStyles.heroJourney} aria-labelledby="denzel-hero-title">
        <div className={pageStyles.heroStage}>
          <img
            className={pageStyles.heroPortrait}
            data-scroll-linked="founder"
            src="/media/denzel-rigaud-founder-hero.png"
            alt="Denzel Rigaud wearing a navy suit and orange-tinted glasses"
            width="1058"
            height="1487"
            fetchPriority="high"
          />
          <div className={pageStyles.heroShade} aria-hidden="true" />
          <div className={pageStyles.coordinateGrid} aria-hidden="true" />
          <div className={pageStyles.lavaGlow} aria-hidden="true" />
          <div className={pageStyles.orbitSystem} aria-hidden="true">
            <span className={pageStyles.orbitOne} />
            <span className={pageStyles.orbitTwo} />
            <span className={pageStyles.orbitThree} />
          </div>

          <div className={pageStyles.heroCopy}>
            <p className={pageStyles.eyebrow}>Denzel Rigaud / Founder &amp; Solo Full-Stack Developer</p>
            <h1 id="denzel-hero-title">The Mind Behind Expected End</h1>
            <p className={pageStyles.heroStatement}>
              A story about curiosity, grief, faith, and turning technology into a way forward.
            </p>
            <time className={pageStyles.foundingDate} dateTime="2026-03-03">
              March 3, 2026
            </time>
          </div>

          <div className={pageStyles.heroTelemetry} aria-hidden="true">
            <span>Identity / Denzel Rigaud</span>
            <span>Depth / Suit ingress</span>
            <span>Signal / Scroll linked</span>
          </div>

          <div className={pageStyles.heroIndex} aria-hidden="true">
            <span>EE / 001</span>
            <span>26.0218° N / 80.1484° W</span>
          </div>
          <a className={pageStyles.scrollCue} href="#memoir">
            <span>Scroll</span>
            <ArrowDownIcon />
          </a>
        </div>
      </section>

      <section className={pageStyles.coordinates} aria-labelledby="coordinates-title">
        <header>
          <p className={pageStyles.eyebrow}>Three coordinates</p>
          <h2 id="coordinates-title">The road here was not a straight line.</h2>
        </header>
        <ol>
          <li>
            <span>01 / Fifth grade</span>
            <strong>Curiosity became a survival skill.</strong>
            <p>I started by refusing to let one failure define the rest of my life.</p>
          </li>
          <li>
            <span>02 / 2021</span>
            <strong>Grief closed the door on technology.</strong>
            <p>Losing my father made every skill he taught me feel impossible to touch.</p>
          </li>
          <li>
            <span>03 / February 25, 2026</span>
            <strong>Faith gave the work a purpose.</strong>
            <p>I came back to build tools that leave people stronger than they found them.</p>
          </li>
        </ol>
      </section>

      <article className={pageStyles.memoir} id="memoir" aria-labelledby="memoir-title">
        <header className={pageStyles.memoirIntro}>
          <p className={pageStyles.eyebrow}>Founder story / First person</p>
          <h2 id="memoir-title">Hi, my name is Denzel Rigaud.</h2>
          <div>
            <p>
              Technology has been part of my life since fifth grade. School had frustrated me from an early age. I failed second
              grade while facing a language barrier, and I did not believe that failure should define me. I decided to start by
              hacking my grades. It began small, but when I realized how far I could penetrate systems and jailbreak technology, I
              became curious about the systems around me and started having fun.
            </p>
            <p>
              That curiosity carried me into Instagram bot farming, coding, automation, machine learning, online communities,
              digital growth, and the darkest corners of the internet. I learned how powerful technology could be. Some choices
              also taught me to use better judgment.
            </p>
          </div>
          <nav className={pageStyles.socials} aria-label="Denzel Rigaud social profiles">
            <a
              href="https://www.instagram.com/smiledenzel/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Denzel Rigaud on Instagram"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/denzel-rigaud-2b0200210/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Denzel Rigaud on LinkedIn"
            >
              <LinkedInIcon />
            </a>
          </nav>
          <nav className={pageStyles.profileRecords} aria-label="Independent identity records">
            <span>External records</span>
            {EXTERNAL_RECORDS.map(({ label, href }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer">
                {label}
              </a>
            ))}
          </nav>
        </header>

        <section className={pageStyles.chapter} aria-labelledby="family-title">
          <div className={pageStyles.chapterHeading}>
            <span>Chapter 01</span>
            <p>The people who taught me</p>
            <h3 id="family-title">My first web wizard.</h3>
          </div>
          <div className={pageStyles.chapterCopy}>
            <p>
              My father and{" "}
              <a href="https://www.linkedin.com/in/kareem-rigaud-2b61b97a" target="_blank" rel="noopener noreferrer">
                brother
              </a>{" "}
              were the smartest people I knew, but I rarely saw them. We had a phone-call relationship. Every second I got to
              speak with them, they taught me something I needed to know. In time, I learned that I still had to decide what was
              right for me. My father was a web wizard, and I felt unstoppable on the internet. My brother works for the NSA.
            </p>
            <p>
              In 2021, I moved to Florida after 17 years of living with my two mothers and two sisters. I survived, haha. Then I
              got to live with my father for the first time. Six months later, he died, so I closed the door on technology because
              every skill reminded me of him.
            </p>
            <p>
              My father had been Muslim for much of his life. I followed Islam in part because I wanted to be like him. Before he
              died, he gave his life to Christ. His decision stayed with me long after I put my own tools away.
            </p>
          </div>
        </section>

        <section className={pageStyles.chapter} aria-labelledby="return-title">
          <div className={pageStyles.chapterHeading}>
            <span>Chapter 02</span>
            <p>The return</p>
            <h3 id="return-title">I opened the door again.</h3>
          </div>
          <div className={pageStyles.chapterCopy}>
            <p>
              I spent years avoiding the part of myself that reminded me of my father. I still touched technology from time to
              time, but grief made it hard to stay. I filled that empty space with the sin of lust and moved farther from the
              person I could have become.
            </p>
            <p>
              In January 2026, I knew I needed to change. I decided to open up the web wizard my dad taught me how to be, stop
              being a carnal man who did not believe in God, and follow Him instead. When I did, my life began to prosper.
            </p>
            <p>
              MyBibleLens came from that decision. I did not have a complete plan. I began building and kept moving. The work let
              me open the door I had closed after my father died. I brought back The Water Check and started picking up dreams I
              had carried since childhood.
            </p>
          </div>
        </section>

        <section className={pageStyles.draft} aria-labelledby="truth-code-title">
          <header>
            <span>Chapter 03 / The Draft</span>
            <h2 id="truth-code-title">“The Truth Behind the Code”</h2>
          </header>
          <section className={pageStyles.draftChapter} aria-labelledby="digital-venom-title">
            <h3 id="digital-venom-title">The Digital Venom</h3>
            <div className={pageStyles.chapterCopy}>
              <p>
                It happens the second we wake up. Before our feet even touch the floor, the hand reaches out. You grab the phone.
                We all do it. But that single, reflexive motion immediately disrupts your brain’s neural pathways, throwing you
                into a critical, anxious state before the day has even begun.
              </p>
              <p>
                As a solo software developer for 10 years, and having a father who was a solo cyber security hacker that taught me
                the dark and mystery ends of the internet, I see the code behind the screen. I know exactly how the algorithm
                works, and the truth is, it’s venom. The overwhelming toxicity you feel online isn&apos;t actually human nature—it
                is an engineered illusion. We are under constant attack by &quot;pseudoism,&quot; where flooded, hostile comment
                sections are rarely spontaneous outbursts from random, everyday internet users. Instead, they are part of a
                deliberate, systematic strategy of computational propaganda. Fake accounts and bot networks are deployed to inject
                synthetic narratives into your feed, designed specifically to manipulate public perception, deepen our divisions,
                and influence your online behavior.
              </p>
              <p>
                It doesn’t matter how pure your or your children’s search history is, or how clean your feed seems; the system is
                designed to drag you back. It pulls you toward negativity, toward superficiality, and toward get-rich-quick gurus
                that force us to put Money over God (<strong>1 Timothy 6:10</strong>), creating people with the mammon spirit. It
                makes our beautiful sisters not know their true beauty isn’t makeup, isn’t how a guy thinks of her, or how many
                Instagram likes she gets… it’s her heart and her angelic ways with God. It is a machine built to hijack your mind
                and control your habits.
              </p>
              <p>
                This constant stream of artificiality traps us in a rushed existence, blinding us to the fact that true things take
                time. Real love, genuine growth, and authentic connections require patience—not the instant gratification a phone
                delivers. It tricks the brain into expecting a constant dopamine rush of agreement. Just like the curated
                algorithms of a &quot;For You&quot; page, it makes people feel blindly entitled to their own opinions, closing
                them off from real human beings and the reality that not everyone is going to agree on the same thing. It is a slow
                surrender, allowing cold technology and artificiality to completely take over the human mind.
              </p>
              <p>
                They want us distracted by these manufactured wars. They want our kids’ brains turning to mush, forever trapped at the lowest tier of{" "}
                <strong>
                  <a
                    href="https://www.google.com/search?q=Bloom%E2%80%99s+Taxonomy&rlz=1C5CHFA_enUS943US944&oq=Bloom%E2%80%99s+Taxonomy&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTINCAEQABiRAhiABBiKBTIHCAIQABiABDIHCAMQABiABDIHCAQQABiABDIHCAUQABiABDIHCAYQABiABDIHCAcQABiABDIHCAgQABiABDIHCAkQABiABNIBBzYxM2owajeoAgCwAgA&sourceid=chrome&source=chrome.ob&ie=UTF-8#sv=CAMSVhozKhFpYy1HNmY1Y0hkMnBHTXd3TTIORzZmNWNIZDJwR013d006DlJma0VGQmdwZUNVZzRNIAQqGwoEc3ZpbRIRaWMtRzZmNWNIZDJwR013d00YATABGAcgs57hCA"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Bloom’s Taxonomy
                  </a>
                </strong>
                : just “remembering” and consuming, never asking questions, never creating, never going deeper. We are watching an
                entire generation delay the critical{" "}
                <strong>
                  <a
                    href="https://www.google.com/search?sca_esv=d99a864848ea4cca&rlz=1C5CHFA_enUS943US944&sxsrf=APpeQnunCsq8WpbDElkjRbmEZUbf8b9yuw:1786282564310&udm=2&fbs=ABfTbFVyMZGZf1hfvX9uKjN_-G8c4u0nXx4bEIpwm1lnNH832SMIiTl3t-JZ4hGJOxPbHYSIu8Q64jU5EwQ-803VaKbd8XGNh2EAGT96nVa30badWZdQJOrgSsOpll5rxyNcIceuSHrD98r42QCy2VpGaYtAW8zKT6mHypPIWJGeeRm7tzF71PjUOVFXsXUiM6lom55kLPulHeTkVQO3xs0VJ3Z6hOEzmQ&q=Erikson+stages+of+life&sa=X&ved=2ahUKEwjy6dqN1ZOWAxUiSzABHXMiOC8QtKgLegQIGRAB&biw=859&bih=872&dpr=2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Erikson stages of life
                  </a>
                </strong>
                , paralyzed by the fake, curated realities they see on screens, terrified of actually growing up because nothing
                feels authentic anymore. The world is entirely sick and tired of the lies. If you don’t see the manipulation in the code, no worries; my
                generation does, and the future generation will too.
              </p>
            </div>
          </section>

          <section className={pageStyles.draftChapter} aria-labelledby="crucible-title">
            <h3 id="crucible-title">The Crucible That Built Me</h3>
            <div className={pageStyles.chapterCopy}>
              <p>
                I didn’t just learn this by studying data; I lived it: selling dope just to build the life I’d promised myself,
                one that’d make it to a bright future. Kicked out of loved ones’ houses, homeless. Offered a way into the adult
                industry when I needed money the most, 10k waved right in front of my face, but momma raised me with morals.{" "}
                <a href="https://unicourt.com/case/fl-pal-rigaud-denzel-v-hall-aaron-914059" target="_blank" rel="noreferrer">
                  Two
                </a>{" "}
                lawsuits{" "}
                <a
                  href="https://www.google.com/search?sca_esv=4f4e6eb4e747ddd2&rlz=1C5CHFA_enUS943US944&sxsrf=APpeQnuG9TE471N73TYP7yCoA2imGwD_zA%3A1782396826570&q=rigaud+vs+pineapple+scuba&sa=X&ved=2ahUKEwjM5sjNyaKVAxUhnWoFHVgDL1IQ7xYoAHoECBAQAQ&biw=1041&bih=872&dpr=2"
                  target="_blank"
                  rel="noreferrer"
                >
                  in
                </a>{" "}
                high school. I started hacking my grades in 5th grade because I got sick and tired of failing, especially when I
                realized I’d been held back in 2nd grade over the accent I came in with. That later turned into hacking a whole
                lot more… truly meeting my{" "}
                <a href="https://www.google.com/search?q=clifford+rigaud" target="_blank" rel="noreferrer">
                  father
                </a>{" "}
                one day, I see where I get it from.
              </p>
              <p>
                For the longest time, I thought God would never take me back after all that. I thought I was too far gone. But
                then I learned about the Apostle Paul. Paul literally murdered Christians, and God still turned around and gave
                him a massive gift. And that’s when it hit me: if God could use a man like Paul, my past was never too much for
                Him to build a future with.
              </p>
              <p>
                That survival instinct started early. Growing up surrounded by 4 women for 16 years shaped my psyche in ways I am
                still unpacking. My mind was trained to work simultaneously across different psychological wavelengths. I
                navigated twisted psychology, complex dynamics, and manipulation that sculpted me into who I am. And I love them
                for that; it saved me energy with girls when I truly decided to think about what my momma’s was talking about. And
                after heartbreaks and being cheated on, I still believe in{" "}
                <a
                  href="https://www.youtube.com/watch?v=SHVKb2j6rfc&list=RDSHVKb2j6rfc&start_radio=1"
                  target="_blank"
                  rel="noreferrer"
                >
                  chivalry
                </a>
                .
              </p>
              <p>
                What I’m saying is, to survive in a house full of women you have to think like one, and when I left them I had to
                become the young man I am today, with the numerous amount of struggles I went through. It was a chaotic
                environment, and I only found clarity when I actively chose to eliminate my one sin “lust” and the noise through
                prayer. When I finally put God first, I realized who I actually was. I saw the challenges that shaped me not as
                curses, but as the exact training I needed to get closer to God, and to build a way out for others.
              </p>
              <p>
                Finding God led me to learn more about myself. Following God taught me about my wounds and my gifts, and
                understanding myself made me want to know Him more. That is when my life began to prosper: I had direction,
                purpose, and a reason to care for what God gave me. The Water Check belongs to that mission. Paying attention to
                what affects your body can help you understand and care for the person God made you to be. I want to build
                technology that helps you become the most capable version of that person.
              </p>
              <p className={pageStyles.closingMission}>
                Everything I build under this company points toward the same mission: bring people closer to God and help them use
                technology to live, create, love, and serve with intention. That is the expected ending I am working toward.{" "}
                <button
                  className={pageStyles.inlineVerse}
                  type="button"
                  aria-haspopup="dialog"
                  onClick={() => setShowVerse(true)}
                >
                  Jeremiah 29:11
                </button>
              </p>
              <nav className={pageStyles.connectRow} aria-label="Follow Denzel Rigaud">
                <a
                  className={`${pageStyles.connectButton} ${pageStyles.connectYouTube}`}
                  href="https://www.youtube.com/@expectedendco"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Expected End on YouTube"
                >
                  <span className={pageStyles.connectSweep} aria-hidden="true" />
                  <YouTubeIcon />
                </a>
                <a
                  className={`${pageStyles.connectButton} ${pageStyles.connectInstagram}`}
                  href="https://www.instagram.com/smiledenzel/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Denzel Rigaud on Instagram"
                >
                  <span className={pageStyles.connectSweep} aria-hidden="true" />
                  <InstagramIcon />
                </a>
                <a
                  className={`${pageStyles.connectButton} ${pageStyles.connectLinkedIn}`}
                  href="https://www.linkedin.com/in/denzel-rigaud-2b0200210/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Connect with Denzel Rigaud on LinkedIn"
                >
                  <span className={pageStyles.connectSweep} aria-hidden="true" />
                  <LinkedInIcon />
                </a>
              </nav>
            </div>
          </section>

          <section className={pageStyles.memoryArchive} aria-labelledby="memory-archive-title">
            <header className={pageStyles.memoryHeader}>
              <span>Personal file / 04 memories</span>
              <h3 id="memory-archive-title">Memory archive</h3>
              <p>The people, rooms, and real work behind the code. Download any frame and keep it.</p>
            </header>
            <div className={pageStyles.memoryGrid}>
              {MEMORY_PHOTOS.map((photo, index) => {
                const memoryNumber = String(index + 1).padStart(2, "0");
                return (
                  <figure className={pageStyles.memoryCard} key={photo.download}>
                    <div className={pageStyles.memoryFrame}>
                      <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
                      <a
                        className={pageStyles.memoryDownload}
                        href={photo.download}
                        download={photo.filename}
                        aria-label={`Download memory ${memoryNumber}: ${photo.title}`}
                      >
                        <ArrowDownIcon />
                        <span>Download</span>
                      </a>
                    </div>
                    <figcaption>
                      <span>Memory {memoryNumber}</span>
                      <strong>{photo.title}</strong>
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </section>
        </section>
      </article>

      <section className={pageStyles.channel} aria-labelledby="channel-title">
        <div className={pageStyles.channelSignal} aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <p className={pageStyles.eyebrow}>End of transmission / The work continues</p>
        <h2 id="channel-title">Let’s build something that gives people their life back.</h2>
        <p>For thoughtful software, press conversations, or the beginning of a good idea, open a channel through Expected End.</p>
        <div className={pageStyles.channelActions}>
          {/* biome-ignore lint/a11y/useValidAnchor: this is an addressable cross-route section link */}
          <a href="/about#contact" onClick={onNavigate} aria-label="Contact Expected End">
            Contact Expected End <ArrowUpRightIcon />
          </a>
          <a href="/about" onClick={onNavigate}>
            Return to the company
          </a>
        </div>
      </section>

      {showVerse && <VerseDialog onClose={() => setShowVerse(false)} />}
    </main>
  );
}
