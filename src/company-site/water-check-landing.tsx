import * as React from "react";
import { Bubbles, type BubblesTrick } from "./water-check-bubbles";
import "./water-check-landing.css";

type Props = { onNavigate?: (event: React.MouseEvent<HTMLAnchorElement>) => void };

const INSTAGRAM = "https://www.instagram.com/thewatercheck?stkn=dW00MHRucTY1Nmto";

/** A real screen from the app, in a phone. Screens come from the current TestFlight build with made-up data. */
function Phone({ screen, alt, tilt = 0, className = "" }: { screen: string; alt: string; tilt?: number; className?: string }) {
  return (
    <div className={`wcl-phone ${className}`} style={{ rotate: `${tilt}deg` }}>
      <img src={`/media/water-check/screen-${screen}.webp`} alt={alt} width={660} height={1428} loading="lazy" decoding="async" />
    </div>
  );
}

const Drop = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.6c3.4 4.4 7 8.2 7 12.1a7 7 0 0 1-14 0C5 10.8 8.6 7 12 2.6Z" />
  </svg>
);

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const TRICKS: { trick: BubblesTrick; label: string }[] = [
  { trick: "puff", label: "Puff up" },
  { trick: "spin", label: "Spin" },
  { trick: "flip", label: "Backflip" },
  { trick: "wave", label: "Wave" },
  { trick: "cheer", label: "Big finish" },
];

const FAQ = [
  {
    q: "Is The Water Check medical advice?",
    a: "No. It is a general wellness app. Your water number is an educational estimate, not a prescription, and nothing in the app diagnoses or treats anything. If you are pregnant or breastfeeding, take medicine that affects fluids, or have a kidney, heart or other condition, ask your doctor what is right for you.",
  },
  {
    q: "Where does my number come from?",
    a: "From your weight, height, activity, climate and life stage, starting from public guidance such as the US National Academies' water references. The free calculator shows its working, so you can see every step. It is a starting point, not a rule.",
  },
  {
    q: "What happens to my drink photos?",
    a: "Drink Check sends the photo through our server to Google's Gemini AI, which reads the label and sends back what it found. We do not keep the photo. AI can be wrong, so check the real label, and never use Drink Check for allergies or medical diets.",
  },
  {
    q: "What stays on my phone?",
    a: "Your drink log, Drink Journal, saved drinks and foods, Guide pearls and cycle notes. Your account, sign-up answers and daily totals are kept with your account so they follow you to a new phone. We do not sell your information.",
  },
  {
    q: "Who is it for?",
    a: "Anyone 13 or older. If you are under 18, use it with a parent's or guardian's permission. Fruit Fast and alcohol logging are only for adults, and the app keeps them that way.",
  },
  {
    q: "What does it cost?",
    a: "The app is free to start: log water and food, get your number, see your calendar, join a Crew and use the Classic widget. During our opening year, one optional purchase unlocks everything, once, with no subscription. The App Store or Google Play shows the price in your currency before you buy.",
  },
  {
    q: "How do I delete my account?",
    a: "In the app: Profile, then Settings, then Delete account. It is gone right away. No app? Our Delete your account page explains how to ask by email.",
  },
  {
    q: "When can I download it?",
    a: "The Water Check is in testing now and coming soon to the App Store and Google Play. Follow @thewatercheck on Instagram to hear first.",
  },
];

/**
 * /thewatercheckpage. The app's public home: what it does, Bubbles, what it costs, where your data
 * lives, and every legal page one tap away. One underwater look on purpose (the app's own), so it does
 * not follow the viewer's light or dark setting.
 */
export function WaterCheckLanding({ onNavigate }: Props) {
  const root = React.useRef<HTMLDivElement>(null);
  const [trick, setTrick] = React.useState<{ trick: BubblesTrick; key: number }>({ trick: "idle", key: 0 });
  const play = (next: BubblesTrick) => setTrick((current) => ({ trick: next, key: current.key + 1 }));

  // Sections rise in as they scroll into view. Without IntersectionObserver (or with reduced motion,
  // handled in CSS) everything is simply shown.
  React.useEffect(() => {
    const items = root.current?.querySelectorAll<HTMLElement>("[data-rise]");
    if (!items?.length) return;
    if (!("IntersectionObserver" in window)) {
      for (const item of items) item.classList.add("is-in");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    for (const item of items) observer.observe(item);
    return () => observer.disconnect();
  }, []);

  // He says hello once the page has settled.
  React.useEffect(() => {
    const timer = window.setTimeout(() => setTrick((current) => ({ trick: "puff", key: current.key + 1 })), 900);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="waterLanding" ref={root}>
      <main>
        <header className="water wcl-hero-band">
          <span className="sun" aria-hidden="true" />
          <span className="wcl-rise" aria-hidden="true">
            {Array.from({ length: 12 }, (_, n) => (
              <i key={n} style={{ "--n": n, "--s": `${6 + ((n * 5) % 16)}px` } as React.CSSProperties} />
            ))}
          </span>

          <nav className="wrap nav" aria-label="The Water Check">
            <div className="nav-pill">
              <a href="#the-app">The app</a>
              <a href="#drink-check">Drink Check</a>
              <a href="#guide">Guide</a>
              <a href="#widgets">Widgets</a>
              <a href="#pricing">Pricing</a>
              <a href="#faq">FAQ</a>
              <a className="solid" href="/thewatercheck-calculator" onClick={onNavigate}>
                Calculator
              </a>
            </div>
          </nav>

          <div className="wrap wcl-hero">
            <div className="wcl-hero-copy">
              <p className="eyebrow">
                <Drop />
                The Water Check
              </p>
              <h1>
                Drink up.
                <br />
                We'll <em>keep count</em>.
              </h1>
              <p className="sub">
                Your own water number, drinks you can scan, a widget you will actually keep, and a pufferfish named Bubbles
                to show you around. No gallon rules, no influencers, no guilt.
              </p>
              <div className="cta-row">
                <button type="button" className="store" disabled>
                  <span className="soon">Coming soon</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M16.4 12.7c0-2.2 1.8-3.3 1.9-3.4-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.7.8-3.4.8-.7 0-1.8-.8-2.9-.8-1.5 0-2.9.9-3.7 2.2-1.6 2.7-.4 6.8 1.1 9 .8 1.1 1.7 2.3 2.9 2.2 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.2.9-1.2 1.3-2.5 1.3-2.5s-2.5-1-2.8-3.6ZM14.2 5.9c.6-.8 1-1.9.9-3-.9 0-2.1.6-2.7 1.4-.6.7-1.1 1.8-1 2.9 1 .1 2.1-.5 2.8-1.3Z" />
                  </svg>
                  <span>
                    <small>Download on the</small>
                    <strong>App Store</strong>
                  </span>
                </button>
                <button type="button" className="store" disabled>
                  <span className="soon">Coming soon</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="#32C5F4" d="M3.5 2.5v19L13 12Z" />
                    <path fill="#37C86A" d="M3.5 2.5 16.7 9.5 13 12Z" />
                    <path fill="#F7CC48" d="M16.7 9.5 21 12l-4.3 2.5L13 12Z" />
                    <path fill="#F35C5C" d="M3.5 21.5 13 12l3.7 2.5Z" />
                  </svg>
                  <span>
                    <small>Get it on</small>
                    <strong>Google Play</strong>
                  </span>
                </button>
              </div>
              <div className="cta-row">
                <a className="calc-btn" href="/thewatercheck-calculator" onClick={onNavigate}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="4" y="2" width="16" height="20" rx="3" />
                    <path d="M8 6h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15v4" />
                  </svg>
                  Try the free calculator
                </a>
                <a className="social-btn" href={INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label="Follow The Water Check on Instagram" title="Follow The Water Check on Instagram">
                  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                    <defs>
                      <linearGradient id="water-instagram-gradient" x1="3" y1="21" x2="21" y2="3" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FFDC80" />
                        <stop offset=".48" stopColor="#F77737" />
                        <stop offset=".72" stopColor="#E1306C" />
                        <stop offset="1" stopColor="#833AB4" />
                      </linearGradient>
                    </defs>
                    <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#water-instagram-gradient)" />
                    <rect x="6.2" y="6.2" width="11.6" height="11.6" rx="3.25" fill="none" stroke="#fff" strokeWidth="1.7" />
                    <circle cx="12" cy="12" r="2.75" fill="none" stroke="#fff" strokeWidth="1.7" />
                    <circle cx="16.25" cy="7.8" r="1.05" fill="#fff" />
                  </svg>
                  <span className="wcl-sr">Follow The Water Check on Instagram</span>
                </a>
              </div>
              <p className="cta-note">In testing now. The calculator is free and needs no sign-up.</p>
            </div>

            <div className="wcl-hero-art">
              <Phone screen="today" alt="The Water Check Today screen: 40 oz of an 81.2 oz goal, with quick-add buttons and today's log" tilt={-4} className="wcl-hero-phone wcl-hero-phone--back" />
              <Phone screen="widgets" alt="The widget studio, showing a Running widget and rows of widget styles" tilt={5} className="wcl-hero-phone wcl-hero-phone--front" />
              <button type="button" className="wcl-hero-bubbles" onClick={() => play("cheer")} aria-label="Make Bubbles do a trick">
                <Bubbles trick={trick.trick} trickKey={trick.key} size={132} />
                <span className="wcl-say" aria-hidden="true">
                  Hi, I'm Bubbles!
                </span>
              </button>
            </div>
          </div>

          <div className="wrap wcl-stats" data-rise>
            <p>
              <strong>87</strong>
              <span>widget styles</span>
            </p>
            <p>
              <strong>15</strong>
              <span>Guide pearls to find</span>
            </p>
            <p>
              <strong>17</strong>
              <span>water-rich foods, drawn</span>
            </p>
            <p>
              <strong>43</strong>
              <span>languages</span>
            </p>
          </div>
        </header>

        <section className="band band--cream" id="sixty">
          <div className="wrap sixty" data-rise>
            <div>
              <p className="kicker">Why it matters</p>
              <p className="sixty-num">
                60<sub>%</sub>
              </p>
            </div>
            <div>
              <h2>You are made up of 60% water.</h2>
              <p className="lede">
                Not a target to hit. That water is working right now: carrying oxygen, cushioning your joints, cooling you
                down, clearing out what you do not need. Your needs change with activity, weather and health.
              </p>
              <p className="kicker" style={{ marginTop: 34 }}>
                The P-Meter
              </p>
              <div className="pmeter" role="img" aria-label="Eight shades from pale straw to dark amber, grouped into well hydrated, top up, and drink now">
                {["#f7f5d8", "#f4efb2", "#f2e98c", "#efe06a", "#e8cf4b", "#ddb93a", "#c89a2c", "#a9741f"].map((color) => (
                  <i key={color} style={{ background: color }} />
                ))}
              </div>
              <div className="pmeter-key">
                <span style={{ borderTop: "3px solid #f2e98c" }}>Well hydrated</span>
                <span style={{ borderTop: "3px solid #ddb93a" }}>Top up</span>
                <span style={{ borderTop: "3px solid #a9741f" }}>Drink now</span>
              </div>
              <p className="wcl-fine">
                A rough sign, not a diagnosis. Food, vitamins and medicines all change the color. The app explains each band and
                when to talk to a healthcare professional.
              </p>
            </div>
          </div>
        </section>

        <section className="band band--deep water wcl-split" id="drink-check">
          <span id="the-app" className="wcl-anchor" aria-hidden="true" />
          <div className="wrap wcl-split-grid">
            <div className="wcl-split-copy" data-rise>
              <p className="kicker">Drink Check</p>
              <h2>Scan it once. Know it. Tap it forever.</h2>
              <p className="lede">
                Take a photo of a drink and the app reads the label: sugar in teaspoons, caffeine, and every ingredient marked
                Good, Fine, Watch or Avoid. It even draws the drink in its own color.
              </p>
              <ul className="wcl-scores" aria-label="Drink Check score colors">
                <li style={{ "--c": "#3ddc84" } as React.CSSProperties}>Great</li>
                <li style={{ "--c": "#a6e36b" } as React.CSSProperties}>Good</li>
                <li style={{ "--c": "#ffc04d" } as React.CSSProperties}>Okay</li>
                <li style={{ "--c": "#ff6b6b" } as React.CSSProperties}>Poor</li>
              </ul>
              <ul className="wcl-ticks">
                <li>
                  <Check /> Save it, and next time it is one tap on the Add page. No new scan.
                </li>
                <li>
                  <Check /> Scan a food too: a mango adds to your mango, something new becomes its own bubble.
                </li>
                <li>
                  <Check /> Your Drink Journal keeps how each drink made you feel, on your phone.
                </li>
              </ul>
              <p className="wcl-fine wcl-fine--deep">
                A quick read of the label, not a lab test or a rating of any brand. AI can be wrong, so check the real label,
                especially for allergies. Photos are not kept.
              </p>
            </div>
            <div className="wcl-split-art" data-rise>
              <Phone screen="drink-check" alt="A Drink Check result for a sports drink: score 66, Good, with sugar, caffeine and ingredients" tilt={3} />
            </div>
          </div>
        </section>

        <section className="band band--cream wcl-split" id="foods">
          <div className="wrap wcl-split-grid wcl-split-grid--flip">
            <div className="wcl-split-copy" data-rise>
              <p className="kicker">Food counts too</p>
              <h2>About a fifth of your water arrives on a plate.</h2>
              <p className="lede">
                The Add page is a page of drawn fruit bubbles, three to a row: watermelon, cucumber, strawberries, mango and more.
                Tap the plus and it is added, with Undo right there. The foods you add most move to the front.
              </p>
              <ul className="wcl-ticks wcl-ticks--cream">
                <li>
                  <Check /> Glass, bottle or any amount, one tap each.
                </li>
                <li>
                  <Check /> Coffee drinkers get a caffeine card that fills itself in.
                </li>
                <li>
                  <Check /> A ring at the top shows food counting toward your day.
                </li>
              </ul>
            </div>
            <div className="wcl-split-art" data-rise>
              <Phone screen="add" alt="The Add page: a ring at the top, drink buttons, a caffeine card and water-rich food bubbles" tilt={-3} />
            </div>
          </div>
        </section>

        <section className="band band--deep water wcl-split" id="guide">
          <div className="wrap wcl-split-grid">
            <div className="wcl-split-copy" data-rise>
              <p className="kicker">The Water Check Guide</p>
              <h2>Pop a bubble. Keep a pearl.</h2>
              <p className="lede">
                Every chapter is a bubble with a question on it. What is your pee telling you? Is a gallon a day real? What is
                plastic doing in your water? Read one to the end and it pops into a pearl. About one in six is a rare golden one.
              </p>
              <div className="wcl-forher">
                <p className="kicker" style={{ color: "#ff9ac2" }}>
                  For her
                </p>
                <p>
                  Rose-colored chapters about her body and water: pink or neon pee, feeling puffy around your period, why UTIs find
                  women more, a little leak when you laugh, pregnancy and menopause. Kind, plain and sourced.
                </p>
              </div>
              <p className="wcl-fine wcl-fine--deep">
                Every chapter lists its sources and says when to see a doctor. It rewards understanding, not screen time: no
                streaks, no pressure.
              </p>
            </div>
            <div className="wcl-split-art" data-rise>
              <Phone screen="guide" alt="The Water Check Guide: question bubbles, and a For her section in rose" tilt={3} />
            </div>
          </div>
        </section>

        <section className="band wcl-widgets" id="widgets">
          <div className="wrap wcl-split-grid wcl-split-grid--flip">
            <div className="wcl-split-copy" data-rise>
              <p className="kicker">Widgets</p>
              <h2>
                <span className="wcl-big">87</span> styles for your Home Screen.
              </h2>
              <p className="lede">
                Sports, places, seasons, sea life and designs, in small, medium and large, with layouts from rings to waves. Tell
                us your sport at sign-up and your sport's widget shows up first. Log a drink straight from your Home Screen.
              </p>
              <div className="wcl-chips">
                {["Running", "Cross Country", "Volleyball", "Basketball", "Sea Turtle", "Jellyfish", "Beach", "Forest", "girlypopslay", "Seasons"].map(
                  (name) => (
                    <span key={name}>{name}</span>
                  ),
                )}
              </div>
            </div>
            <div className="wcl-split-art" data-rise>
              <Phone screen="widgets" alt="The widget studio with Sports, Places and Designs rows" tilt={-3} />
            </div>
          </div>
        </section>

        <section className="band band--cream" id="crew">
          <div className="wrap" data-rise>
            <p className="kicker">Your month and your people</p>
            <h2>Watch it add up. Bring your friends.</h2>
            <div className="wcl-duo">
              <article>
                <Phone screen="calendar" alt="The calendar: each day fills like a glass, with days logged, days at goal and a streak" />
                <div>
                  <h3>Your water, day by day</h3>
                  <p>Every day you log fills in like a glass. Days at goal, streaks and tide marks, and it follows you to a new phone.</p>
                </div>
              </article>
              <article>
                <Phone screen="crew" alt="A Crew named Track team with quick cheer messages" />
                <div>
                  <h3>Crew</h3>
                  <p>
                    Invite-only groups that cheer each other on. Friends see your percent of your own goal and your streak, never
                    your ounces or your body. Report and Block are always there.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="band band--deep water wcl-meet" id="bubbles">
          <div className="wrap wcl-meet-grid">
            <div className="wcl-meet-stage" data-rise>
              <Bubbles trick={trick.trick} trickKey={trick.key} size={210} />
            </div>
            <div data-rise>
              <p className="kicker">Meet Bubbles</p>
              <h2>Your guide is a pufferfish.</h2>
              <p className="lede">
                Bubbles is the Wellness Officer at The Department. On your first day he takes you on a tour of the app, and he
                cannot help showing off. Go on, give him something to do.
              </p>
              <fieldset className="wcl-tricks">
                <legend className="wcl-sr">Bubbles' tricks</legend>
                {TRICKS.map((item) => (
                  <button key={item.trick} type="button" onClick={() => play(item.trick)}>
                    {item.label}
                  </button>
                ))}
              </fieldset>
            </div>
          </div>
        </section>

        <section className="band band--cream" id="pricing">
          <div className="wrap" data-rise>
            <p className="kicker">Pricing</p>
            <h2>Free to start. Everything, once.</h2>
            <div className="wcl-plans">
              <article>
                <h3>Free</h3>
                <p className="wcl-plan-sub">Everything you need to drink enough.</p>
                <ul>
                  {["Your own water number", "Log drinks and water-rich food", "Your calendar and streaks", "The Classic widget", "Join a friend's Crew", "A free Drink Check scan"].map((item) => (
                    <li key={item}>
                      <Check /> {item}
                    </li>
                  ))}
                </ul>
              </article>
              <article className="wcl-plan--forever">
                <span className="wcl-plan-tag">Opening year</span>
                <h3>Everything Forever</h3>
                <p className="wcl-plan-sub">One purchase, no subscription.</p>
                <ul>
                  {["All 87 widget styles", "Wellness, the Guide and your Drink Journal", "Drink Check photo scans", "Make your own Crews", "Everything we add later"].map((item) => (
                    <li key={item}>
                      <Check /> {item}
                    </li>
                  ))}
                </ul>
                <p className="wcl-plan-note">
                  Offered during our opening year. After that, The Water Check moves to a monthly plan, and a one-time purchase made
                  before then stays unlocked. The price is shown in the App Store or Google Play before you buy.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="band band--deep water" id="privacy">
          <div className="wrap" data-rise>
            <p className="kicker">Your data</p>
            <h2>Most of it never leaves your phone.</h2>
            <div className="wcl-data">
              <article>
                <h3>Stays on your phone</h3>
                <p>Each drink and food you log, your Drink Journal, saved drinks and foods, Guide pearls, cycle notes and reminders.</p>
              </article>
              <article>
                <h3>Kept with your account</h3>
                <p>Your sign-in, sign-up answers, daily water totals and your Crew, so they follow you to a new phone.</p>
              </article>
              <article>
                <h3>Never</h3>
                <p>We do not sell your information or share it with advertising networks. Drink Check photos are not kept.</p>
              </article>
            </div>
            <p className="wcl-data-links">
              <a href="/thewatercheck/privacy" onClick={onNavigate}>
                Privacy Notice
              </a>
              <a href="/thewatercheck/consumer-health-data" onClick={onNavigate}>
                Consumer Health Data Policy
              </a>
              <a href="/thewatercheck/delete-account" onClick={onNavigate}>
                Delete your account
              </a>
            </p>
          </div>
        </section>

        <section className="band band--cream" id="calculator">
          <div className="wrap calc-block" data-rise>
            <p className="kicker">Free, no sign-up</p>
            <h2>Start with the numbers you know.</h2>
            <p className="lede">
              Your weight, your height, how long you move. The calculator gives you a daily target in about twenty seconds, and
              shows its working so you can argue with it. It runs in your browser.
            </p>
            <div className="calc-strip">
              {["Weight baseline", "Height and build", "Activity adjustment", "Life stage", "Heat and humidity", "Electrolyte check"].map((chip) => (
                <span key={chip} className="calc-chip">
                  {chip}
                </span>
              ))}
            </div>
            <p style={{ marginTop: 32 }}>
              <a className="calc-btn" href="/thewatercheck-calculator" onClick={onNavigate}>
                Open the calculator
              </a>
            </p>
            <p className="wcl-fine" style={{ marginInline: "auto", textAlign: "center" }}>
              An educational planning estimate for adults, not a diagnosis or a prescription. Do not force fluids. Ask a healthcare
              professional if you are pregnant or breastfeeding, take medicines that affect fluid balance, or have a kidney or
              heart condition.
            </p>
          </div>
        </section>

        <section className="band band--deep water" id="faq">
          <div className="wrap wcl-faq" data-rise>
            <p className="kicker">Questions</p>
            <h2>The honest answers.</h2>
            <div className="wcl-faq-list">
              {FAQ.map((item) => (
                <details key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="foot" id="legal">
        <div className="wrap">
          <div className="foot-top">
            <div>
              <p className="foot-brand">
                <img src="/brand/watercheck-store/c-mark-magic-eraser.png" alt="" />
                <b>The Water Check</b>
              </p>
              <p className="foot-blurb">Understand what you drink. Built in Florida by a one-person company. For ages 13 and up.</p>
            </div>
            <div>
              <h4>Legal</h4>
              <ul>
                <li>
                  <a href="/thewatercheck/privacy" onClick={onNavigate}>
                    The Water Check Privacy Notice
                  </a>
                </li>
                <li>
                  <a href="/thewatercheck/terms" onClick={onNavigate}>
                    The Water Check Terms of Use
                  </a>
                </li>
                <li>
                  <a href="/thewatercheck/consumer-health-data" onClick={onNavigate}>
                    Consumer Health Data Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/thewatercheck/delete-account" onClick={onNavigate}>
                    Delete your account
                  </a>
                </li>
                <li>
                  <a href="/privacy" onClick={onNavigate}>
                    Website privacy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4>Explore</h4>
              <ul>
                <li>
                  <a href="/thewatercheck-calculator" onClick={onNavigate}>
                    Hydration calculator
                  </a>
                </li>
                <li>
                  <a href="/thewatercheckstore" onClick={onNavigate}>
                    The Water Check store
                  </a>
                </li>
                <li>
                  <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
                    @thewatercheck on Instagram
                  </a>
                </li>
                <li>
                  <a href="/" onClick={onNavigate}>
                    Expected End
                  </a>
                </li>
              </ul>
            </div>
            <div id="support">
              <h4>Help</h4>
              <ul>
                <li>
                  <a href="mailto:expectedendai@gmail.com?subject=The%20Water%20Check%20support">Email support</a>
                </li>
                <li>
                  <a href="/accessibility" onClick={onNavigate}>
                    Accessibility
                  </a>
                </li>
                <li>
                  <a href="/about#contact">Contact</a>
                </li>
              </ul>
            </div>
          </div>
          <p className="foot-note">
            The Water Check is a general wellness app. It does not diagnose, treat or prevent any condition, and it is not a
            substitute for advice from a healthcare professional. In an emergency, call 911 or your local emergency number. App
            screens show a test build with made-up data; features may change before release.
          </p>
          <div className="foot-base">
            <span>© 2026 Expected End LLC</span>
            <span>The Water Check™</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
