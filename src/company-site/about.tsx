import * as React from "react";
import { ArrowDownIcon } from "./action-icons";
import { ContactForm } from "./contact-form";
import styles from "./style.module.css";
import { VerseDialog } from "./verse-dialog";

export function AboutPage() {
  const [showFounderStory, setShowFounderStory] = React.useState(() => window.location.hash === "#founder-story");
  const [showVerse, setShowVerse] = React.useState(false);

  React.useEffect(() => {
    const openFounderStoryFromHash = () => {
      if (window.location.hash === "#founder-story") setShowFounderStory(true);
    };

    openFounderStoryFromHash();
    window.addEventListener("hashchange", openFounderStoryFromHash);
    return () => window.removeEventListener("hashchange", openFounderStoryFromHash);
  }, []);

  return (
    <main className={styles.aboutMain}>
      <section className={styles.aboutLayout}>
        <p className={styles.kicker}>About Expected End</p>
        <h1>Technology with purpose, built for real life.</h1>
        <div className={styles.aboutCopy}>
          <p className={styles.aboutLead}>Expected End LLC creates software, productivity tools, digital experiences, and communities that bring people closer to God.</p>
          <p>We design products that help people learn, create, work, and find peace while leaving room for family, friends, and life beyond the screen.</p>
          <p>MyBibleLens and The Water Check are the first expressions of that mission. Each project meets a different need, and both make technology feel useful, human, and easy to leave when its work is done.</p>
        </div>
      </section>

      <div className={styles.aboutStory}>
        <section className={styles.missionStory} id="mission" aria-labelledby="about-mission-title">
          <div>
            <p className={styles.kicker}>Our mission</p>
            <h2 id="about-mission-title">Technology should help you return to your life.</h2>
          </div>
          <div className={styles.missionCopy}>
            <p>Technology can shape the way we seek attention and reward. Constant comparison, dating apps, and polished versions of other people’s lives can make real relationships and quiet moments feel less valuable. Children enter those systems before they understand the pressure behind them.</p>
            <p>Expected End gives people a better use for the screen. We build tools for children and adults to learn, create, work, find a safe place, or move closer to God. Each product should return them to the life in front of them.</p>
            <p className={styles.missionLine}>Our mission is to bring people closer to God through productive, useful, and joyful technology that leaves room for real life.</p>
          </div>
        </section>

        <section className={styles.founderReveal} id="founder-story" aria-labelledby="founder-reveal-title">
          <div className={styles.founderRevealIntro}>
            <p className={styles.kicker}>Behind the company</p>
            <h2 id="founder-reveal-title">The story behind Expected End.</h2>
            <p>The personal road from fifth-grade technology experiments to grief, faith, MyBibleLens, and a new beginning.</p>
          </div>
          <button
            className={styles.founderToggle}
            type="button"
            aria-expanded={showFounderStory}
            aria-controls="founder-story-content"
            onClick={() => setShowFounderStory((isOpen) => !isOpen)}
          >
            <span>{showFounderStory ? "Close Founder Story" : "The Founder Story"}</span>
            <span aria-hidden="true">{showFounderStory ? "−" : "+"}</span>
          </button>

          {showFounderStory && (
            <div className={styles.founderPanel} id="founder-story-content">
              <div className={styles.founderIntro}>
                <p className={styles.kicker}>Founder story</p>
                <h2>Hi, my name is Denzel Rigaud.</h2>
                <p>Technology has been part of my life since fifth grade. School had frustrated me from an early age. I failed second grade while facing a language barrier, and I did not believe that failure should define me. I decided to start by hacking my grades. It began small, but when I realized how far I could penetrate systems and jailbreak technology, I became curious about the systems around me and started having fun.</p>
                <p>That curiosity carried me into Instagram bot farming, coding, automation, machine learning, online communities, digital growth, and the darkest corners of the internet. I learned how powerful technology could be. Some choices also taught me to use better judgment.</p>
              </div>

              <section className={styles.storyChapter} aria-labelledby="family-title">
                <div className={styles.storyHeading}>
                  <p className={styles.kicker}>The people who taught me</p>
                  <h3 id="family-title">My first web wizard.</h3>
                </div>
                <div className={styles.storyCopy}>
                  <p>My father and <a href="https://www.linkedin.com/in/kareem-rigaud-2b61b97a" target="_blank" rel="noopener noreferrer">brother</a> were the smartest people I knew, but I rarely saw them. We had a phone-call relationship. Every second I got to speak with them, they taught me something I needed to know. In time, I learned that I still had to decide what was right for me. My father was a web wizard, and I felt unstoppable on the internet. My brother works for the NSA.</p>
                  <p>In 2021, I moved to Florida after 17 years of living with my two mothers and two sisters. I survived, haha. Then I got to live with my father for the first time. Six months later, he died, so I closed the door on technology because every skill reminded me of him.</p>
                  <p>My father had been Muslim for much of his life. I followed Islam in part because I wanted to be like him. Before he died, he gave his life to Christ. His decision stayed with me long after I put my own tools away.</p>
                </div>
              </section>

              <section className={styles.storyChapter} aria-labelledby="return-title">
                <div className={styles.storyHeading}>
                  <p className={styles.kicker}>The return</p>
                  <h3 id="return-title">I opened the door again.</h3>
                </div>
                <div className={styles.storyCopy}>
                  <p>I spent years avoiding the part of myself that reminded me of my father. I still touched technology from time to time, but grief made it hard to stay. I filled that empty space with the sin of lust and moved farther from the person I could have become.</p>
                  <p>In January 2026, I knew I needed to change. On February 25, 2026, I gave my life to Christ, and I’ve been up ever since. WOOAH.</p>
                  <p>MyBibleLens came from that decision. I did not have a complete plan. I began building and kept moving. The work let me open the door I had closed after my father died. I brought back The Water Check and started picking up dreams I had carried since childhood.</p>
                </div>
              </section>

              <section className={styles.truthBehindCode} aria-labelledby="truth-code-title">
                <div className={styles.truthBehindCodeHeader}>
                  <p className={styles.kicker}>The Draft</p>
                  <h2 id="truth-code-title">“The Truth Behind the Code”</h2>
                </div>

                <section className={styles.truthChapter} aria-labelledby="digital-venom-title">
                  <h3 id="digital-venom-title">The Digital Venom</h3>
                  <div className={styles.truthCopy}>
                    <p>It happens the second we wake up. Before our feet even touch the floor, the hand reaches out. We grab the phone. We all do it. But that single, reflexive motion immediately disrupts your brain’s neural pathways, throwing you into a critical, anxious state before the day has even begun.</p>
                    <p>As a solo software developer for 10 years, and having a father who was a solo cyber security hacker that taught me a thing or two when I finally met him, I see the code behind the screen. I know exactly how the algorithm works, and the truth is, it’s venom. It doesn’t matter how pure you or your children’s search history is, or how clean your feed seems; the system is designed to drag you back. It pulls you toward negativity, toward superficiality, and toward get-rich-quick gurus that force us to put Money over God, <strong>1 Timothy 6:10</strong> creating people with the mammon spirit. It makes our beautiful sisters not know their true beauty isn’t makeup, isn’t how a guy thinks of her, or how many Instagram likes she gets… it’s her heart and her angelic ways with God. It is a machine built to hijack your mind and control your habits.</p>
                    <p>They want us distracted. They want our kids’ brains turning to mush, forever trapped at the lowest tier of <strong>Bloom’s Taxonomy</strong>: just “remembering” and consuming, never asking questions, never creating, never going deeper. We are watching an entire generation delay the critical <strong>Erikson</strong> stages of life, paralyzed by the fake, curated realities they see on screens, terrified of actually growing up because nothing feels authentic anymore. The world is entirely sick and tired of the lies. If you don’t see it, no worries; my generation does, and the future generation will too.</p>
                  </div>
                </section>

                <section className={styles.truthChapter} aria-labelledby="crucible-title">
                  <h3 id="crucible-title">The Crucible That Built Me</h3>
                  <div className={styles.truthCopy}>
                    <p>I didn’t just learn this by studying data; I lived it: selling dope just to build the life I’d promised myself, one that’d make it to a bright future. Kicked out of loved ones’ houses, homeless. Offered a way into the adult industry when I needed money the most, 10k waved right in front of my face, but momma raised me with morals. <a href="https://unicourt.com/case/fl-pal-rigaud-denzel-v-hall-aaron-914059" target="_blank" rel="noreferrer">Two</a> lawsuits <a href="https://www.google.com/search?sca_esv=4f4e6eb4e747ddd2&rlz=1C5CHFA_enUS943US944&sxsrf=APpeQnuG9TE471N73TYP7yCoA2imGwD_zA%3A1782396826570&q=rigaud+vs+pineapple+scuba&sa=X&ved=2ahUKEwjM5sjNyaKVAxUhnWoFHVgDL1IQ7xYoAHoECBAQAQ&biw=1041&bih=872&dpr=2" target="_blank" rel="noreferrer">in</a> high school. I started hacking my grades in 5th grade because I got sick and tired of failing, especially when I realized I’d been held back in 2nd grade over the accent I came in with. That later turned into hacking a whole lot more… truly meeting my <a href="https://www.google.com/search?q=clifford+rigaud" target="_blank" rel="noreferrer">father</a> one day, I see where I get it from.</p>
                    <p>For the longest time, I thought God would never take me back after all that. I thought I was too far gone. But then I learned about the Apostle Paul. Paul literally murdered Christians, and God still turned around and gave him a massive gift. And that’s when it hit me: if God could use a man like Paul, my past was never too much for Him to build a future with.</p>
                    <p>That survival instinct started early. Growing up surrounded by 4 women for 16 years shaped my psyche in ways I am still unpacking. My mind was trained to work simultaneously across different psychological wavelengths. I navigated twisted psychology, complex dynamics, and manipulation that sculpted me into who I am. And I love them for that; it saved me energy with girls when I truly decided to think about what my momma’s was talking about. And after heartbreaks and being cheated on, I still believe in <a href="https://www.youtube.com/watch?v=SHVKb2j6rfc&list=RDSHVKb2j6rfc&start_radio=1" target="_blank" rel="noreferrer">chivalry</a>.</p>
                    <p>What I’m saying is, to survive in a house full of women you have to think like one, and when I left them I had to become the young man I am today, with the numerous amount of struggles I went through. It was a chaotic environment, and I only found clarity when I actively chose to eliminate my one sin “lust” and the noise through prayer. When I finally put God first, I realized who I actually was. I saw the challenges that shaped me not as curses, but as the exact training I needed to get closer to God, and to build a way out for others.</p>
                    <p>Finding God led me to learn more about myself. Following God taught me about my wounds and my gifts, and understanding myself made me want to know Him more. That is when my life began to prosper: I had direction, purpose, and a reason to care for what God gave me. The Water Check belongs to that mission. Paying attention to what affects your body can help you understand and care for the person God made you to be. I want to build technology that helps you become the most capable version of that person.</p>
                    <p className={styles.closingMission}>Everything I build under this company points toward the same mission: bring people closer to God and help them use technology to live, create, love, and serve with intention. That is the expected ending I am working toward. <button className={styles.inlineVerse} type="button" aria-haspopup="dialog" onClick={() => setShowVerse(true)}>Jeremiah 29:11</button></p>
                  </div>
                </section>
              </section>
            </div>
          )}
        </section>

        <section className={styles.pressSection} id="press" aria-labelledby="press-title">
          <div>
            <p className={styles.kicker}>Press</p>
            <h2 id="press-title">Tell the story with us.</h2>
          </div>
          <div>
            <p>Expected End welcomes conversations about faith-centered technology, digital well-being, founder grief, MyBibleLens, The Water Check, and products that return time to real life.</p>
            <a className={styles.actionWithIcon} href="#contact">
              Start a press inquiry <ArrowDownIcon className={styles.actionIcon} />
            </a>
          </div>
        </section>
      </div>

      <ContactForm />
      {showVerse && <VerseDialog onClose={() => setShowVerse(false)} />}
    </main>
  );
}
