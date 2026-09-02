import { FOUNDER_DESCRIPTION } from "./content";

export type CompanyRouteKey =
  | "home"
  | "about"
  | "denzel-rigaud"
  | "press"
  | "terms"
  | "privacy"
  | "accessibility"
  | "mybiblelens-store"
  | "watercheck-store"
  | "watercheck-page"
  | "not-found";

type RouteMetadata = {
  path: string;
  title: string;
  description: string;
  image?: string;
  type?: "website" | "profile";
};

export type PublicRoute = RouteMetadata & { key: CompanyRouteKey; family: "company" };

const ROUTES: PublicRoute[] = [
  {
    key: "home",
    family: "company",
    path: "/",
    title: "Expected End — Purpose, built beautifully",
    description: "Expected End creates thoughtful software, productivity tools, digital experiences, and communities.",
  },
  {
    key: "about",
    family: "company",
    path: "/about",
    title: "About — Expected End",
    description: "Denzel Rigaud's founder story, the mission behind Expected End, and the projects built from faith and purpose.",
  },
  {
    key: "denzel-rigaud",
    family: "company",
    path: "/denzel-rigaud",
    title: "Denzel Rigaud — Founder of Expected End",
    description: FOUNDER_DESCRIPTION,
    image: "https://expectedend.co/media/denzel-rigaud-founder.png",
    type: "profile",
  },
  {
    key: "press",
    family: "company",
    path: "/press",
    title: "Press & Media — Expected End",
    description:
      "Approved biographies, verified facts, entity links, and downloadable media for coverage of Expected End and Denzel Rigaud.",
    image: "https://expectedend.co/media/denzel-rigaud-founder.png",
  },
  {
    key: "terms",
    family: "company",
    path: "/terms",
    title: "Website Terms of Use — Expected End",
    description: "Terms governing use of the Expected End website.",
  },
  {
    key: "privacy",
    family: "company",
    path: "/privacy",
    title: "Privacy Statement — Expected End",
    description: "How Expected End handles information on this website.",
  },
  {
    key: "accessibility",
    family: "company",
    path: "/accessibility",
    title: "Accessibility — Expected End",
    description: "Expected End's commitment to an accessible website experience.",
  },
  {
    key: "mybiblelens-store",
    family: "company",
    path: "/mybiblelensstore",
    title: "MyBibleLens Store — Expected End",
    description: "Thoughtful goods for a closer walk with the Word. The MyBibleLens store is coming soon.",
  },
  {
    key: "watercheck-store",
    family: "company",
    path: "/thewatercheckstore",
    title: "The Water Check Store — Expected End",
    description: "Hydration-inspired essentials from The Water Check. The first drop is coming soon.",
  },
  {
    key: "watercheck-page",
    family: "company",
    path: "/thewatercheckpage",
    title: "Hydration Calculator — The Water Check",
    description: "A private hydration estimate, practical water habits, and The Water Check community.",
  },
];

const NOT_FOUND_ROUTE: PublicRoute = {
  key: "not-found",
  family: "company",
  path: "/404",
  title: "Page not found — Expected End",
  description: "The requested Expected End page could not be found.",
};

const normalizePath = (pathname: string) => {
  if (pathname === "/") return pathname;
  return pathname.replace(/\/+$/, "") || "/";
};

export const getRoute = (pathname: string): PublicRoute => {
  const path = normalizePath(pathname);
  return ROUTES.find((route) => route.path === path) ?? NOT_FOUND_ROUTE;
};

export const getRouteMetadata = (pathname: string) => {
  const route = getRoute(pathname);
  const canonicalPath = route.key === "not-found" ? "/" : route.path;
  return {
    title: route.title,
    description: route.description,
    canonical: `https://expectedend.co${canonicalPath === "/" ? "/" : canonicalPath}`,
    image: route.image,
    type: route.type ?? "website",
  };
};

export const isInternalHref = (href: string, origin = window.location.origin) => {
  if (href.startsWith("mailto:") || href.startsWith("tel:")) return false;
  try {
    const url = new URL(href, origin);
    return url.origin === origin;
  } catch {
    return false;
  }
};
