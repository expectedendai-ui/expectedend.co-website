import * as React from "react";
import { Trans, useTranslation } from "react-i18next";
import { Bubbles, type BubblesTrick } from "./water-check-bubbles";
import "./water-check-landing.css";

type Props = { onNavigate?: (event: React.MouseEvent<HTMLAnchorElement>) => void };

const INSTAGRAM = "https://www.instagram.com/thewatercheck?stkn=dW00MHRucTY1Nmto";
const CALCULATOR = "/thewatercheck-calculator";

/** A real screen from the app in a phone, cut off by the bottom of its band. Screens come from a test account with made-up data. */
function Phone({ screen, alt }: { screen: string; alt: string }) {
  return (
    <div className="wcs-phone">
      <img src={`/media/water-check/screen-${screen}.webp`} alt={alt} width={660} height={1434} loading="lazy" decoding="async" />
    </div>
  );
}

const Drop = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.6c3.4 4.4 7 8.2 7 12.1a7 7 0 0 1-14 0C5 10.8 8.6 7 12 2.6Z" />
  </svg>
);

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const TRICKS: BubblesTrick[] = ["puff", "spin", "flip", "wave", "cheer"];
const FREE_ITEMS = ["number", "log", "barcode", "guide", "widgets", "crew"] as const;
const FOREVER_ITEMS = ["widgets", "bars", "journal", "summaries", "crews", "later"] as const;
const FAQ = ["medical", "phone", "audience", "deleteAccount"] as const;

/** One idea per band: a short headline, two short lines and one screen. */
const FEATURES = [
  { id: "workout", tone: "deep", screen: "lock" },
  { id: "log", tone: "green", screen: "add" },
  { id: "scan", tone: "coral", screen: "drink-check" },
  { id: "widgets", tone: "orchid", screen: "widgets" },
  { id: "crew", tone: "sun", screen: "crew" },
  { id: "days", tone: "ocean", screen: "calendar" },
] as const;

/**
 * /thewatercheckpage. The app's public home, made simple on November 16, 2026: one idea per color band,
 * short words, one real screen each, then what it costs, four questions and every legal page in the footer.
 */
export function WaterCheckLanding({ onNavigate }: Props) {
  const { t } = useTranslation("water");
  const [trick, setTrick] = React.useState<{ trick: BubblesTrick; key: number }>({ trick: "idle", key: 0 });
  const next = () => setTrick((current) => ({ trick: TRICKS[current.key % TRICKS.length], key: current.key + 1 }));

  // He says hello once the page has settled.
  React.useEffect(() => {
    const timer = window.setTimeout(() => setTrick((current) => ({ trick: "puff", key: current.key + 1 })), 900);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="waterLanding">
      <main>
        <header className="wcs-hero">
          <div className="wrap">
            <div className="wcs-hero-copy">
              <p className="wcs-brand">
                <Drop />
                {t("brand")}
              </p>
              <h1>
                <Trans t={t} i18nKey="landing.hero.title" components={{ break: <br />, em: <em /> }} />
              </h1>
              <p className="wcs-hero-sub">{t("landing.hero.sub")}</p>
              <div className="wcs-badges">
                <button type="button" className="wcs-store" disabled>
                  <span className="wcs-soon">{t("landing.hero.comingSoon")}</span>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M16.4 12.7c0-2.2 1.8-3.3 1.9-3.4-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.7.8-3.4.8-.7 0-1.8-.8-2.9-.8-1.5 0-2.9.9-3.7 2.2-1.6 2.7-.4 6.8 1.1 9 .8 1.1 1.7 2.3 2.9 2.2 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.2.9-1.2 1.3-2.5 1.3-2.5s-2.5-1-2.8-3.6ZM14.2 5.9c.6-.8 1-1.9.9-3-.9 0-2.1.6-2.7 1.4-.6.7-1.1 1.8-1 2.9 1 .1 2.1-.5 2.8-1.3Z" />
                  </svg>
                  <span>
                    <small>{t("landing.hero.appStoreLead")}</small>
                    <strong>{t("landing.hero.appStore")}</strong>
                  </span>
                </button>
                <button type="button" className="wcs-store" disabled>
                  <span className="wcs-soon">{t("landing.hero.comingSoon")}</span>
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
              <div className="wcs-links">
                <a className="wcs-textlink" href={CALCULATOR} onClick={onNavigate}>
                  {t("landing.hero.calculator")}
                </a>
                <a className="wcs-ig" href={INSTAGRAM} target="_blank" rel="noopener noreferrer" title={t("landing.hero.instagram")}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
                  </svg>
                  <span className="wcs-sr">{t("landing.hero.instagram")}</span>
                </a>
              </div>
            </div>
            <div className="wcs-stage">
              <Phone screen="today" alt={t("landing.hero.todayAlt")} />
              <button type="button" className="wcs-hero-fish" onClick={next} aria-label={t("landing.hero.bubblesLabel")}>
                <Bubbles trick={trick.trick} trickKey={trick.key} size={150} />
                <span className="wcs-say" aria-hidden="true">
                  {t("landing.hero.bubblesSay")}
                </span>
              </button>
            </div>
          </div>
        </header>

        <section className="wcs-band wcs-band--pacific" id="number">
          <div className="wrap">
            <h2>{t("landing.number.title")}</h2>
            <p>{t("landing.number.p1")}</p>
            <p>{t("landing.number.p2")}</p>
            <div className="wcs-numcard">
              <span className="wcs-label">{t("landing.number.label")}</span>
              <span className="wcs-amount">{t("landing.number.amount")}</span>
              <span className="wcs-chips">
                <span>{t("landing.number.chips.body")}</span>
                <span>{t("landing.number.chips.activity")}</span>
                <span>{t("landing.number.chips.weather")}</span>
              </span>
              <a className="wcs-btn" href={CALCULATOR} onClick={onNavigate}>
                {t("landing.number.cta")}
              </a>
            </div>
          </div>
        </section>

        {FEATURES.map(({ id, tone, screen }) => (
          <section key={id} className={`wcs-band wcs-band--${tone}`} id={id}>
            <div className="wrap">
              {id === "workout" && <span className="wcs-tag">{t("landing.workout.tag")}</span>}
              <h2>
                {id === "widgets" ? (
                  <Trans t={t} i18nKey="landing.widgets.title" components={{ count: <span /> }} />
                ) : (
                  t(`landing.${id}.title`)
                )}
              </h2>
              <p>{t(`landing.${id}.p1`)}</p>
              <p>{t(`landing.${id}.p2`)}</p>
              {id === "workout" && <p className="wcs-small">{t("landing.workout.small")}</p>}
              {id === "scan" && <p className="wcs-small">{t("landing.scan.fine")}</p>}
              <Phone screen={screen} alt={t(`landing.${id}.alt`)} />
            </div>
          </section>
        ))}

        <section className="wcs-band wcs-band--aqua" id="bubbles">
          <div className="wrap">
            <h2>{t("landing.bubbles.title")}</h2>
            <p>{t("landing.bubbles.p1")}</p>
            <button type="button" className="wcs-bigfish" onClick={next} aria-label={t("landing.hero.bubblesLabel")}>
              <Bubbles trick={trick.trick} trickKey={trick.key} size={240} />
            </button>
          </div>
        </section>

        <section className="wcs-band wcs-band--paper" id="pricing">
          <div className="wrap">
            <h2>{t("landing.pricing.title")}</h2>
            <div className="wcs-plans">
              <article className="wcs-plan">
                <h3>{t("landing.pricing.free.title")}</h3>
                <p className="wcs-plan-sub">{t("landing.pricing.free.sub")}</p>
                <ul>
                  {FREE_ITEMS.map((item) => (
                    <li key={item}>
                      <Check />
                      {t(`landing.pricing.free.items.${item}`)}
                    </li>
                  ))}
                </ul>
              </article>
              <article className="wcs-plan wcs-plan--forever">
                <h3>{t("landing.pricing.forever.title")}</h3>
                <p className="wcs-plan-sub">{t("landing.pricing.forever.sub")}</p>
                <ul>
                  {FOREVER_ITEMS.map((item) => (
                    <li key={item}>
                      <Check />
                      {t(`landing.pricing.forever.items.${item}`)}
                    </li>
                  ))}
                </ul>
              </article>
            </div>
            <p className="wcs-note">{t("landing.pricing.forever.note")}</p>
          </div>
        </section>

        <section className="wcs-band wcs-band--paper" id="faq" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <h2>{t("landing.faq.title")}</h2>
            <div className="wcs-faq">
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
                  <a href={CALCULATOR} onClick={onNavigate}>
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
