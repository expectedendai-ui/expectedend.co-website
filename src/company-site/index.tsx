import * as React from "react";
import { AboutPage } from "./about";
import { DenzelPage } from "./denzel-page";
import { Footer } from "./footer";
import { HomePage } from "./home";
import { InfoPage } from "./info-page";
import { LEGAL_CONTENT } from "./legal-content";
import { Navigation } from "./navigation";
import { PressPage } from "./press-page";
import { getRoute, getRouteMetadata, isInternalHref } from "./routes";
import { Storefront } from "./storefront";
import styles from "./style.module.css";
import { WaterCheckPage } from "./water-check-page";

type CompanySiteProps = {
  leaving: boolean;
  onOpenArtWorld: () => void;
};

const updateDocumentMetadata = (pathname: string) => {
  const metadata = getRouteMetadata(pathname);
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

export function CompanySite({ leaving, onOpenArtWorld }: CompanySiteProps) {
  const [route, setRoute] = React.useState(() => getRoute(window.location.pathname));

  React.useEffect(() => {
    updateDocumentMetadata(route.path);
  }, [route.path]);

  React.useEffect(() => {
    const onPopState = () => {
      setRoute(getRoute(window.location.pathname));
      scrollToHash(window.location.hash);
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
    const destination = `${url.pathname}${url.hash}`;
    if (`${window.location.pathname}${window.location.hash}` !== destination) window.history.pushState({}, "", destination);
    setRoute(getRoute(url.pathname));
    scrollToHash(url.hash);
  };

  const renderCompanyRoute = () => {
    if (route.key === "home") return <HomePage onNavigate={onNavigate} />;
    if (route.key === "mybiblelens-store") return <Storefront brand="mybiblelens" onNavigate={onNavigate} />;
    if (route.key === "watercheck-store") return <Storefront brand="watercheck" onNavigate={onNavigate} />;
    if (route.key === "watercheck-page") return <WaterCheckPage onNavigate={onNavigate} />;
    if (route.key === "about") return <AboutPage onNavigate={onNavigate} />;
    if (route.key === "denzel-rigaud") return <DenzelPage onNavigate={onNavigate} />;
    if (route.key === "press") return <PressPage onNavigate={onNavigate} />;
    if (route.key === "terms" || route.key === "privacy" || route.key === "accessibility") {
      return <InfoPage content={LEGAL_CONTENT[route.key]} />;
    }
    return (
      <main className={styles.notFound}>
        <p className={styles.kicker}>404</p>
        <h1>That page isn’t here.</h1>
        <a href="/" onClick={onNavigate}>
          Return home
        </a>
      </main>
    );
  };

  return (
    <div className={`${styles.site} ${leaving ? styles.leaving : ""}`} data-site-theme="blue">
      {route.key !== "mybiblelens-store" && route.key !== "watercheck-store" && (
        <Navigation isHome={route.key === "home"} theme={route.navTheme} onNavigate={onNavigate} />
      )}
      {renderCompanyRoute()}
      {route.key !== "mybiblelens-store" && route.key !== "watercheck-store" && (
        <Footer onNavigate={onNavigate} onOpenArtWorld={route.key === "denzel-rigaud" ? onOpenArtWorld : undefined} />
      )}
    </div>
  );
}
