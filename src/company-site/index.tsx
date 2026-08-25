import * as React from "react";
import { AboutPage } from "./about";
import { Footer } from "./footer";
import { HomePage } from "./home";
import { InfoPage } from "./info-page";
import { LEGAL_CONTENT } from "./legal-content";
import { Navigation } from "./navigation";
import { getRoute, getRouteMetadata, isInternalHref } from "./routes";
import styles from "./style.module.css";

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
    if (route.key === "home") return <HomePage />;
    if (route.key === "about") return <AboutPage />;
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
      <Navigation isHome={route.key === "home"} onNavigate={onNavigate} />
      {renderCompanyRoute()}
      <Footer onNavigate={onNavigate} onOpenArtWorld={route.key === "about" ? onOpenArtWorld : undefined} />
    </div>
  );
}
