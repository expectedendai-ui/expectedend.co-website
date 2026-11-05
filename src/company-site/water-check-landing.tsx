import * as React from "react";
import { Trans, useTranslation } from "react-i18next";
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

const TRICKS: BubblesTrick[] = ["puff", "spin", "flip", "wave", "cheer"];

const FAQ = ["medical", "number", "scan", "phone", "audience", "cost", "deleteAccount", "download"] as const;

const WIDGET_CHIPS = ["body", "spark", "running", "crossCountry", "volleyball", "basketball", "seaTurtle", "jellyfish", "beach", "girlypopslay", "seasons"] as const;

const FREE_ITEMS = ["number", "log", "barcode", "photo", "guide", "widgets", "crew"] as const;

const FOREVER_ITEMS = ["widgets", "bars", "journal", "photos", "summaries", "crews", "later"] as const;

const CALCULATOR_CHIPS = ["weight", "height", "activity", "lifeStage", "heat", "electrolytes"] as const;

/**
 * /thewatercheckpage. The app's public home: what it does, Bubbles, what it costs, where your data
 * lives, and every legal page one tap away. One underwater look on purpose (the app's own), so it does
 * not follow the viewer's light or dark setting.
 */
export function WaterCheckLanding({ onNavigate }: Props) {
  const { t } = useTranslation("water");
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

          <nav className="wrap nav" aria-label={t("brand")}>
            <div className="nav-pill">
              <a href="#the-app">{t("landing.nav.theApp")}</a>
              <a href="#drink-check">{t("landing.nav.drinkCheck")}</a>
              <a href="#guide">{t("landing.nav.guide")}</a>
              <a href="#widgets">{t("landing.nav.widgets")}</a>
              <a href="#progress">{t("landing.nav.progress")}</a>
              <a href="#pricing">{t("landing.nav.pricing")}</a>
              <a href="#faq">{t("landing.nav.faq")}</a>
              <a className="solid" href="/thewatercheck-calculator" onClick={onNavigate}>
                {t("landing.nav.calculator")}
              </a>
            </div>
          </nav>

          <div className="wrap wcl-hero">
            <div className="wcl-hero-copy">
              <p className="eyebrow">
                <Drop />
                {t("brand")}
              </p>
              <h1>
                <Trans t={t} i18nKey="landing.hero.title" components={{ break: <br />, em: <em /> }} />
              </h1>
              <p className="sub">{t("landing.hero.sub")}</p>
              <div className="cta-row">
                <button type="button" className="store" disabled>
                  <span className="soon">{t("landing.hero.comingSoon")}</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M16.4 12.7c0-2.2 1.8-3.3 1.9-3.4-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.7.8-3.4.8-.7 0-1.8-.8-2.9-.8-1.5 0-2.9.9-3.7 2.2-1.6 2.7-.4 6.8 1.1 9 .8 1.1 1.7 2.3 2.9 2.2 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.2.9-1.2 1.3-2.5 1.3-2.5s-2.5-1-2.8-3.6ZM14.2 5.9c.6-.8 1-1.9.9-3-.9 0-2.1.6-2.7 1.4-.6.7-1.1 1.8-1 2.9 1 .1 2.1-.5 2.8-1.3Z" />
                  </svg>
                  <span>
                    <small>{t("landing.hero.appStoreLead")}</small>
                    <strong>{t("landing.hero.appStore")}</strong>
                  </span>
                </button>
                <button type="button" className="store" disabled>
                  <span className="soon">{t("landing.hero.comingSoon")}</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="#32C5F4" d="M3.5 2.5v19L13 12Z" />
                    <path fill="#37C86A" d="M3.5 2.5 16.7 9.5 13 12Z" />
                    <path fill="#F7CC48" d="M16.7 9.5 21 12l-4.3 2.5L13 12Z" />
                    <path fill="#F35C5C" d="M3.5 21.5 13 12l3.7 2.5Z" />
                  </svg>
                  <span>
                    <small>{t("landing.hero.googlePlayLead")}</small>
                    <strong>{t("landing.hero.googlePlay")}</strong>
                  </span>
                </button>
              </div>
              <div className="cta-row">
                <a className="calc-btn" href="/thewatercheck-calculator" onClick={onNavigate}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="4" y="2" width="16" height="20" rx="3" />
                    <path d="M8 6h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15v4" />
                  </svg>
                  {t("landing.hero.calculator")}
                </a>
                <a className="social-btn" href={INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label={t("landing.hero.instagram")} title={t("landing.hero.instagram")}>
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
                  <span className="wcl-sr">{t("landing.hero.instagram")}</span>
                </a>
              </div>
              <p className="cta-note">{t("landing.hero.note")}</p>
            </div>

            <div className="wcl-hero-art">
              <Phone screen="today" alt={t("landing.hero.todayAlt")} tilt={-4} className="wcl-hero-phone wcl-hero-phone--back" />
              <Phone screen="widgets" alt={t("landing.hero.widgetsAlt")} tilt={5} className="wcl-hero-phone wcl-hero-phone--front" />
              <button type="button" className="wcl-hero-bubbles" onClick={() => play("cheer")} aria-label={t("landing.hero.bubblesLabel")}>
                <Bubbles trick={trick.trick} trickKey={trick.key} size={132} />
                <span className="wcl-say" aria-hidden="true">
                  {t("landing.hero.bubblesSay")}
                </span>
              </button>
            </div>
          </div>

          <div className="wrap wcl-stats" data-rise>
            <p>
              <strong>89</strong>
              <span>{t("landing.stats.widgetStyles")}</span>
            </p>
            <p>
              <strong>21</strong>
              <span>{t("landing.stats.pearls")}</span>
            </p>
            <p>
              <strong>17</strong>
              <span>{t("landing.stats.foods")}</span>
            </p>
            <p>
              <strong>43</strong>
              <span>{t("landing.stats.languages")}</span>
            </p>
          </div>
        </header>

        <section className="band band--cream" id="sixty">
          <div className="wrap sixty" data-rise>
            <div>
              <p className="kicker">{t("landing.sixty.kicker")}</p>
              <p className="sixty-num">
                60<sub>%</sub>
              </p>
            </div>
            <div>
              <h2>{t("landing.sixty.title")}</h2>
              <p className="lede">{t("landing.sixty.lede")}</p>
              <p className="kicker" style={{ marginTop: 34 }}>
                {t("landing.sixty.pmeterKicker")}
              </p>
              <div className="pmeter" role="img" aria-label={t("landing.sixty.pmeterLabel")}>
                {["#f7f5d8", "#f4efb2", "#f2e98c", "#efe06a", "#e8cf4b", "#ddb93a", "#c89a2c", "#a9741f"].map((color) => (
                  <i key={color} style={{ background: color }} />
                ))}
              </div>
              <div className="pmeter-key">
                <span style={{ borderTop: "3px solid #f2e98c" }}>{t("landing.sixty.wellHydrated")}</span>
                <span style={{ borderTop: "3px solid #ddb93a" }}>{t("landing.sixty.topUp")}</span>
                <span style={{ borderTop: "3px solid #a9741f" }}>{t("landing.sixty.drinkNow")}</span>
              </div>
              <p className="wcl-fine">{t("landing.sixty.fine")}</p>
            </div>
          </div>
        </section>

        <section className="band band--deep water wcl-split" id="drink-check">
          <span id="the-app" className="wcl-anchor" aria-hidden="true" />
          <div className="wrap wcl-split-grid">
            <div className="wcl-split-copy" data-rise>
              <p className="kicker">{t("landing.drinkCheck.kicker")}</p>
              <h2>{t("landing.drinkCheck.title")}</h2>
              <p className="lede">{t("landing.drinkCheck.lede")}</p>
              <ul className="wcl-scores" aria-label={t("landing.drinkCheck.scoresLabel")}>
                <li style={{ "--c": "#3ddc84" } as React.CSSProperties}>{t("landing.drinkCheck.scores.great")}</li>
                <li style={{ "--c": "#a6e36b" } as React.CSSProperties}>{t("landing.drinkCheck.scores.good")}</li>
                <li style={{ "--c": "#ffc04d" } as React.CSSProperties}>{t("landing.drinkCheck.scores.okay")}</li>
                <li style={{ "--c": "#ff6b6b" } as React.CSSProperties}>{t("landing.drinkCheck.scores.poor")}</li>
              </ul>
              <ul className="wcl-ticks">
                <li>
                  <Check /> {t("landing.drinkCheck.ticks.electrolytes")}
                </li>
                <li>
                  <Check /> {t("landing.drinkCheck.ticks.save")}
                </li>
                <li>
                  <Check /> {t("landing.drinkCheck.ticks.food")}
                </li>
                <li>
                  <Check /> {t("landing.drinkCheck.ticks.journal")}
                </li>
              </ul>
              <p className="wcl-fine wcl-fine--deep">{t("landing.drinkCheck.fine")}</p>
            </div>
            <div className="wcl-split-art" data-rise>
              <Phone screen="drink-check" alt={t("landing.drinkCheck.alt")} tilt={3} />
            </div>
          </div>
        </section>

        <section className="band band--cream wcl-split" id="foods">
          <div className="wrap wcl-split-grid wcl-split-grid--flip">
            <div className="wcl-split-copy" data-rise>
              <p className="kicker">{t("landing.foods.kicker")}</p>
              <h2>{t("landing.foods.title")}</h2>
              <p className="lede">{t("landing.foods.lede")}</p>
              <ul className="wcl-ticks wcl-ticks--cream">
                <li>
                  <Check /> {t("landing.foods.ticks.amounts")}
                </li>
                <li>
                  <Check /> {t("landing.foods.ticks.caffeine")}
                </li>
                <li>
                  <Check /> {t("landing.foods.ticks.ring")}
                </li>
              </ul>
            </div>
            <div className="wcl-split-art" data-rise>
              <Phone screen="add" alt={t("landing.foods.alt")} tilt={-3} />
            </div>
          </div>
        </section>

        <section className="band band--deep water wcl-split" id="guide">
          <div className="wrap wcl-split-grid">
            <div className="wcl-split-copy" data-rise>
              <p className="kicker">{t("landing.guide.kicker")}</p>
              <h2>{t("landing.guide.title")}</h2>
              <p className="lede">{t("landing.guide.lede")}</p>
              <ul className="wcl-ticks">
                <li>
                  <Check /> {t("landing.guide.electric")}
                </li>
              </ul>
              <div className="wcl-forher">
                <p className="kicker" style={{ color: "#ff9ac2" }}>
                  {t("landing.guide.forHerKicker")}
                </p>
                <p>{t("landing.guide.forHer")}</p>
              </div>
              <p className="wcl-fine wcl-fine--deep">{t("landing.guide.fine")}</p>
            </div>
            <div className="wcl-split-art" data-rise>
              <Phone screen="guide" alt={t("landing.guide.alt")} tilt={3} />
            </div>
          </div>
        </section>

        <section className="band wcl-widgets" id="widgets">
          <div className="wrap wcl-split-grid wcl-split-grid--flip">
            <div className="wcl-split-copy" data-rise>
              <p className="kicker">{t("landing.widgets.kicker")}</p>
              <h2>
                <Trans t={t} i18nKey="landing.widgets.title" components={{ count: <span className="wcl-big" /> }} />
              </h2>
              <p className="lede">{t("landing.widgets.lede")}</p>
              <ul className="wcl-ticks">
                <li>
                  <Check /> {t("landing.widgets.ticks.body")}
                </li>
                <li>
                  <Check /> {t("landing.widgets.ticks.charge")}
                </li>
              </ul>
              <div className="wcl-chips">
                {WIDGET_CHIPS.map((chip) => (
                  <span key={chip}>{t(`landing.widgets.chips.${chip}`)}</span>
                ))}
              </div>
            </div>
            <div className="wcl-split-art" data-rise>
              <Phone screen="widgets" alt={t("landing.widgets.alt")} tilt={-3} />
            </div>
          </div>
        </section>

        <section className="band band--deep water wcl-split" id="progress">
          <div className="wrap wcl-split-grid">
            <div className="wcl-split-copy" data-rise>
              <p className="kicker">{t("landing.progress.kicker")}</p>
              <h2>{t("landing.progress.title")}</h2>
              <p className="lede">{t("landing.progress.lede")}</p>
              <ul className="wcl-ticks">
                <li>
                  <Check /> {t("landing.progress.ticks.dailyValues")}
                </li>
                <li>
                  <Check /> {t("landing.progress.ticks.caffeine")}
                </li>
                <li>
                  <Check /> {t("landing.progress.ticks.journal")}
                </li>
                <li>
                  <Check /> {t("landing.progress.ticks.real")}
                </li>
              </ul>
              <p className="wcl-fine wcl-fine--deep">{t("landing.progress.fine")}</p>
            </div>
            <div className="wcl-split-art" data-rise>
              <Phone screen="progress" alt={t("landing.progress.alt")} tilt={-3} />
            </div>
          </div>
        </section>

        <section className="band band--cream" id="crew">
          <div className="wrap" data-rise>
            <p className="kicker">{t("landing.crew.kicker")}</p>
            <h2>{t("landing.crew.title")}</h2>
            <div className="wcl-duo">
              <article>
                <Phone screen="calendar" alt={t("landing.crew.calendarAlt")} />
                <div>
                  <h3>{t("landing.crew.calendarTitle")}</h3>
                  <p>{t("landing.crew.calendarBody")}</p>
                </div>
              </article>
              <article>
                <Phone screen="crew" alt={t("landing.crew.crewAlt")} />
                <div>
                  <h3>{t("landing.crew.crewTitle")}</h3>
                  <p>{t("landing.crew.crewBody")}</p>
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
              <p className="kicker">{t("landing.bubbles.kicker")}</p>
              <h2>{t("landing.bubbles.title")}</h2>
              <p className="lede">{t("landing.bubbles.lede")}</p>
              <fieldset className="wcl-tricks">
                <legend className="wcl-sr">{t("landing.bubbles.tricksLegend")}</legend>
                {TRICKS.map((item) => (
                  <button key={item} type="button" onClick={() => play(item)}>
                    {t(`landing.bubbles.tricks.${item}`)}
                  </button>
                ))}
              </fieldset>
            </div>
          </div>
        </section>

        <section className="band band--cream" id="pricing">
          <div className="wrap" data-rise>
            <p className="kicker">{t("landing.pricing.kicker")}</p>
            <h2>{t("landing.pricing.title")}</h2>
            <div className="wcl-plans">
              <article>
                <h3>{t("landing.pricing.free.title")}</h3>
                <p className="wcl-plan-sub">{t("landing.pricing.free.sub")}</p>
                <ul>
                  {FREE_ITEMS.map((item) => (
                    <li key={item}>
                      <Check /> {t(`landing.pricing.free.items.${item}`)}
                    </li>
                  ))}
                </ul>
              </article>
              <article className="wcl-plan--forever">
                <span className="wcl-plan-tag">{t("landing.pricing.forever.tag")}</span>
                <h3>{t("landing.pricing.forever.title")}</h3>
                <p className="wcl-plan-sub">{t("landing.pricing.forever.sub")}</p>
                <ul>
                  {FOREVER_ITEMS.map((item) => (
                    <li key={item}>
                      <Check /> {t(`landing.pricing.forever.items.${item}`)}
                    </li>
                  ))}
                </ul>
                <p className="wcl-plan-note">{t("landing.pricing.forever.note")}</p>
              </article>
            </div>
          </div>
        </section>

        <section className="band band--deep water" id="privacy">
          <div className="wrap" data-rise>
            <p className="kicker">{t("landing.privacy.kicker")}</p>
            <h2>{t("landing.privacy.title")}</h2>
            <div className="wcl-data">
              <article>
                <h3>{t("landing.privacy.phoneTitle")}</h3>
                <p>{t("landing.privacy.phoneBody")}</p>
              </article>
              <article>
                <h3>{t("landing.privacy.accountTitle")}</h3>
                <p>{t("landing.privacy.accountBody")}</p>
              </article>
              <article>
                <h3>{t("landing.privacy.neverTitle")}</h3>
                <p>{t("landing.privacy.neverBody")}</p>
              </article>
            </div>
            <p className="wcl-data-links">
              <a href="/thewatercheck/privacy" onClick={onNavigate}>
                {t("landing.privacy.links.privacy")}
              </a>
              <a href="/thewatercheck/consumer-health-data" onClick={onNavigate}>
                {t("landing.privacy.links.healthData")}
              </a>
              <a href="/thewatercheck/delete-account" onClick={onNavigate}>
                {t("landing.privacy.links.deleteAccount")}
              </a>
            </p>
          </div>
        </section>

        <section className="band band--cream" id="calculator">
          <div className="wrap calc-block" data-rise>
            <p className="kicker">{t("landing.calculator.kicker")}</p>
            <h2>{t("landing.calculator.title")}</h2>
            <p className="lede">{t("landing.calculator.lede")}</p>
            <div className="calc-strip">
              {CALCULATOR_CHIPS.map((chip) => (
                <span key={chip} className="calc-chip">
                  {t(`landing.calculator.chips.${chip}`)}
                </span>
              ))}
            </div>
            <p style={{ marginTop: 32 }}>
              <a className="calc-btn" href="/thewatercheck-calculator" onClick={onNavigate}>
                {t("landing.calculator.open")}
              </a>
            </p>
            <p className="wcl-fine" style={{ marginInline: "auto", textAlign: "center" }}>
              {t("landing.calculator.fine")}
            </p>
          </div>
        </section>

        <section className="band band--deep water" id="faq">
          <div className="wrap wcl-faq" data-rise>
            <p className="kicker">{t("landing.faq.kicker")}</p>
            <h2>{t("landing.faq.title")}</h2>
            <div className="wcl-faq-list">
              {FAQ.map((item) => (
                <details key={item}>
                  <summary>{t(`landing.faq.items.${item}.q`)}</summary>
                  <p>{t(`landing.faq.items.${item}.a`)}</p>
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
                <b>{t("brand")}</b>
              </p>
              <p className="foot-blurb">{t("landing.foot.blurb")}</p>
            </div>
            <div>
              <h4>{t("landing.foot.legal")}</h4>
              <ul>
                <li>
                  <a href="/thewatercheck/privacy" onClick={onNavigate}>
                    {t("landing.foot.privacy")}
                  </a>
                </li>
                <li>
                  <a href="/thewatercheck/terms" onClick={onNavigate}>
                    {t("landing.foot.terms")}
                  </a>
                </li>
                <li>
                  <a href="/thewatercheck/community-guidelines" onClick={onNavigate}>
                    {t("landing.foot.community")}
                  </a>
                </li>
                <li>
                  <a href="/thewatercheck/consumer-health-data" onClick={onNavigate}>
                    {t("landing.foot.healthData")}
                  </a>
                </li>
                <li>
                  <a href="/thewatercheck/delete-account" onClick={onNavigate}>
                    {t("landing.foot.deleteAccount")}
                  </a>
                </li>
                <li>
                  <a href="/privacy" onClick={onNavigate}>
                    {t("landing.foot.sitePrivacy")}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4>{t("landing.foot.explore")}</h4>
              <ul>
                <li>
                  <a href="/thewatercheck-calculator" onClick={onNavigate}>
                    {t("landing.foot.calculator")}
                  </a>
                </li>
                <li>
                  <a href="/thewatercheckstore" onClick={onNavigate}>
                    {t("landing.foot.store")}
                  </a>
                </li>
                <li>
                  <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
                    {t("landing.foot.instagram")}
                  </a>
                </li>
                <li>
                  <a href="/" onClick={onNavigate}>
                    {t("landing.foot.expectedEnd")}
                  </a>
                </li>
              </ul>
            </div>
            <div id="support">
              <h4>{t("landing.foot.help")}</h4>
              <ul>
                <li>
                  <a href="mailto:expectedendai@gmail.com?subject=The%20Water%20Check%20support">{t("landing.foot.email")}</a>
                </li>
                <li>
                  <a href="/accessibility" onClick={onNavigate}>
                    {t("landing.foot.accessibility")}
                  </a>
                </li>
                <li>
                  <a href="/about#contact">{t("landing.foot.contact")}</a>
                </li>
              </ul>
            </div>
          </div>
          <p className="foot-note">{t("landing.foot.note")}</p>
          <div className="foot-base">
            <span>© 2026 EXPECTEDEND LLC</span>
            <span>The Water Check™</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
