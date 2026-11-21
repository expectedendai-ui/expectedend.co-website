import * as React from "react";
import { useTranslation } from "react-i18next";
import { AboutPage } from "./about";
import { ContactDialog } from "./contact-dialog";
import { DenzelPage } from "./denzel-page";
import { Footer } from "./footer";
import { HomePage } from "./home";
import { InfoPage } from "./info-page";
import { LanguageChooser } from "./language-chooser";
import { LEGAL_CONTENT, type LegalPageKey } from "./legal-content";
import { Navigation } from "./navigation";
import { FOUNDER_NAV, HOME_NAV, PillNavigation } from "./pill-navigation";
import { PressPage } from "./press-page";
import { getRoute, getRouteMetadata, isInternalHref } from "./routes";
import { Storefront } from "./storefront";
import styles from "./style.module.css";
import { FounderFooter } from "./founder-footer";
import { WaterCheckFooter } from "./water-check-footer";
import { WaterCheckPage } from "./water-check-page";
import { WaterCheckLanding } from "./water-check-landing";

type CompanySiteProps = {
  leaving: boolean;
  onOpenArtWorld: () => void;
};

type Translate = ReturnType<typeof useTranslation>["t"];

const updateDocumentMetadata = (pathname: string, t: Translate) => {
  const { key, ...english } = getRouteMetadata(pathname);
  // The title and description follow the chosen language (meta.json); English stays the source of truth.
  const metadata = {
    ...english,
    title: t(`meta:${key}.title`, { defaultValue: english.title }),
    description: t(`meta:${key}.description`, { defaultValue: english.description }),
  };
  document.title = metadata.title;

  let description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (!description) {
    description = document.createElement("meta");
    description.name = "description";
    document.head.append(description);
  }
  description.content = metadata.description;

  let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.append(canonical);
  }
  canonical.href = metadata.canonical;

  const socialMetadata = [
    ["meta[property='og:title']", "property", "og:title", metadata.title],
    ["meta[property='og:description']", "property", "og:description", metadata.description],
    ["meta[property='og:url']", "property", "og:url", metadata.canonical],
    ["meta[property='og:type']", "property", "og:type", metadata.type],
    [
      "meta[property='og:image']",
      "property",
      "og:image",
      metadata.image ?? "https://expectedend.co/media/expected-end-hero-poster.jpg",
    ],
    ["meta[name='twitter:card']", "name", "twitter:card", "summary_large_image"],
    ["meta[name='twitter:title']", "name", "twitter:title", metadata.title],
    ["meta[name='twitter:description']", "name", "twitter:description", metadata.description],
    [
      "meta[name='twitter:image']",
      "name",
      "twitter:image",
      metadata.image ?? "https://expectedend.co/media/expected-end-hero-poster.jpg",
    ],
  ] as const;

  for (const [selector, attribute, name, content] of socialMetadata) {
    let meta = document.querySelector<HTMLMetaElement>(selector);
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute(attribute, name);
      document.head.append(meta);
    }
    meta.content = content;
  }
};

const scrollToHash = (hash: string) => {
  if (!hash) {
    window.scrollTo({ top: 0 });
    return;
  }
  window.requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView?.({ block: "start" }));
};

/** Any link to #contact (the nav, footers, "/about#contact" from older pages) opens the contact form as a popup. */
const CONTACT_HASH = "#contact";

/** Pages in the new dark look: they share the pill menu and the dark footer. */
const DARK_PAGES = new Set(["home", "about", "press"]);

type ContactRequest = { reason: string; opener: HTMLElement };

export function CompanySite({ leaving, onOpenArtWorld }: CompanySiteProps) {
  const [route, setRoute] = React.useState(() => getRoute(window.location.pathname));
  const [contact, setContact] = React.useState<ContactRequest | null>(() =>
    window.location.hash === CONTACT_HASH ? { reason: "", opener: document.body } : null,
  );
  const { t, i18n } = useTranslation();

  React.useEffect(() => {
    updateDocumentMetadata(route.path, t);
  }, [route.path, t, i18n.language]);

  React.useEffect(() => {
    const onPopState = () => {
      setRoute(getRoute(window.location.pathname));
      if (window.location.hash === CONTACT_HASH) setContact({ reason: "", opener: document.body });
      else scrollToHash(window.location.hash);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const onNavigate = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const href = event.currentTarget.getAttribute("href");
    if (!href || !isInternalHref(href)) return;
    event.preventDefault();
    const url = new URL(href, window.location.href);
    if (url.hash === CONTACT_HASH) {
      setContact({ reason: event.currentTarget.dataset.contactReason ?? "", opener: event.currentTarget });
      return;
    }
    const destination = `${url.pathname}${url.hash}`;
    if (`${window.location.pathname}${window.location.hash}` !== destination) window.history.pushState({}, "", destination);
    setRoute(getRoute(url.pathname));
    scrollToHash(url.hash);
  };

  const renderCompanyRoute = () => {
    if (route.key === "home") return <HomePage onNavigate={onNavigate} />;
    if (route.key === "mybiblelens-store") return <Storefront brand="mybiblelens" onNavigate={onNavigate} />;
    if (route.key === "watercheck-store") return <Storefront brand="watercheck" onNavigate={onNavigate} />;
    if (route.key === "watercheck-page") return <WaterCheckLanding onNavigate={onNavigate} />;
    if (route.key === "watercheck-calculator") return <WaterCheckPage onNavigate={onNavigate} />;
    if (route.key === "about") return <AboutPage onNavigate={onNavigate} />;
    if (route.key === "denzel-rigaud") return <DenzelPage onNavigate={onNavigate} />;
    if (route.key === "press") return <PressPage onNavigate={onNavigate} />;
    if (route.key in LEGAL_CONTENT) {
      return <InfoPage content={LEGAL_CONTENT[route.key as LegalPageKey]} onNavigate={onNavigate} />;
    }
    return (
      <main className={styles.notFound}>
        <p className={styles.kicker}>404</p>
        <h1>{t("notFound.title")}</h1>
        <a href="/" onClick={onNavigate}>
          {t("notFound.home")}
        </a>
      </main>
    );
  };

  return (
    <div className={`${styles.site} ${leaving ? styles.leaving : ""}`} data-site-theme="blue" data-page={DARK_PAGES.has(route.key) ? "home" : undefined}>
      {DARK_PAGES.has(route.key) ? (
        <PillNavigation links={HOME_NAV} currentHref={route.path} onNavigate={onNavigate} />
      ) : route.key === "denzel-rigaud" ? (
        <PillNavigation links={FOUNDER_NAV} contactHref="#channel-title" founder onNavigate={onNavigate} />
      ) : (
        route.key !== "mybiblelens-store" &&
        route.key !== "watercheck-store" &&
        route.key !== "watercheck-page" && (
          <Navigation theme={route.navTheme} onNavigate={onNavigate} />
        )
      )}
      {renderCompanyRoute()}
      {route.key === "watercheck-calculator" || (route.navTheme === "water" && route.key !== "watercheck-page") ? (
        <WaterCheckFooter onNavigate={onNavigate} backToTopHref={route.key === "watercheck-calculator" ? "#water-check-title" : "#top"} />
      ) : route.key === "denzel-rigaud" ? (
        <FounderFooter onNavigate={onNavigate} onOpenArtWorld={onOpenArtWorld} />
      ) : (
        route.key !== "mybiblelens-store" && route.key !== "watercheck-store" && route.key !== "watercheck-page" && <Footer onNavigate={onNavigate} />
      )}
      {contact && (
        <ContactDialog
          initialReason={contact.reason}
          initialProject=""
          returnFocusTo={contact.opener}
          onClose={() => {
            setContact(null);
            if (window.location.hash === CONTACT_HASH) window.history.replaceState({}, "", window.location.pathname);
          }}
        />
      )}
      {!leaving && <LanguageChooser theme={route.navTheme === "water" || route.key === "watercheck-store" ? "water" : "dark"} />}
    </div>
  );
}
