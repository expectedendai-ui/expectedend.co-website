import { FOUNDER_DESCRIPTION } from "./content";

export type CompanyRouteKey =
  | "home"
  | "about"
  | "denzel-rigaud"
  | "press"
  | "terms"
  | "privacy"
  | "watercheck-privacy"
  | "watercheck-terms"
  | "watercheck-health-data"
  | "watercheck-delete-account"
  | "watercheck-community"
  | "accessibility"
  | "mybiblelens-store"
  | "watercheck-store"
  | "watercheck-page"
  | "watercheck-calculator"
  | "not-found";

export type NavTheme = "blue" | "water";

type RouteMetadata = {
  path: string;
  /** Visual theme for the floating main navigation. Defaults to the site blue. */
  navTheme?: NavTheme;
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
    image: "https://expectedend.co/media/denzel-rigaud-founder-hero.png",
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
    key: "watercheck-privacy",
    family: "company",
    path: "/thewatercheck/privacy",
    navTheme: "water",
    title: "The Water Check Privacy Policy | Expected End",
    description: "What The Water Check collects, what stays on your phone, who helps run the app, and your choices.",
  },
  {
    key: "watercheck-terms",
    family: "company",
    path: "/thewatercheck/terms",
    navTheme: "water",
    title: "The Water Check Terms and Conditions | Expected End",
    description: "Terms for using The Water Check app, including health and safety, AI, Crew rules and purchases.",
  },
  {
    key: "watercheck-health-data",
    family: "company",
    path: "/thewatercheck/consumer-health-data",
    navTheme: "water",
    title: "The Water Check Consumer Health Data Privacy Policy | Expected End",
    description: "How The Water Check handles consumer health data, and how to access, delete or appeal.",
  },
  {
    key: "watercheck-delete-account",
    family: "company",
    path: "/thewatercheck/delete-account",
    navTheme: "water",
    title: "Delete your account | The Water Check",
    description: "How to delete your The Water Check account and data, in the app or by email.",
  },
  {
    key: "watercheck-community",
    family: "company",
    path: "/thewatercheck/community-guidelines",
    navTheme: "water",
    title: "Community Guidelines | The Water Check",
    description: "How Crews in The Water Check stay friendly: the rules, reporting and blocking, and what happens when rules are broken.",
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
    navTheme: "water",
    title: "The Water Check — Hydration App & Free Calculator",
    description: "Explore The Water Check app and try a free, private hydration estimate on Expected End.",
  },
  {
    key: "watercheck-calculator",
    family: "company",
    path: "/thewatercheck-calculator",
    navTheme: "water",
    title: "Free Hydration Calculator — The Water Check",
    description: "Get a free, private daily hydration estimate with The Water Check calculator.",
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
