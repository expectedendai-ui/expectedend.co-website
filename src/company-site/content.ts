export const CONTACT_HREF = "/about#contact";

export const FOUNDER_DESCRIPTION =
  "Denzel Rigaud is the founder and full-stack developer behind Expected End, MyBibleLens, the World's First Sanctuary App for Christianity, and The Water Check.";

// Denzel Rigaud approved the existing site copy on 2026-08-08 and the new
// Water Check page copy on 2026-08-30.
export const PUBLIC_CONTENT_APPROVED = true;

export const PROJECTS = [
  {
    name: "MyBibleLens",
    category: "Christianity app",
    destination: {
      href: "https://mybiblelens.us/",
      actionLabel: "Visit app",
    },
    secondaryAction: {
      label: "Bio",
      href: "https://mybiblelens.us/legal.html#about",
    },
    image: "/brand/mybiblelens.png",
    tagline: "The World's First Sanctuary App for Christianity.",
    badge: "On the App Store",
    artVariant: "mybiblelens",
    titleClassName: "mblTitle",
  },
  {
    name: "The Water Check",
    category: "Hydration community",
    destination: {
      href: "/thewatercheckpage",
      actionLabel: "Visit app",
    },
    image: "/brand/thewatercheck.png",
    tagline: "Understand what you drink. Your own water number, in a tap.",
    badge: "On the App Store",
    artVariant: "watercheck",
    titleClassName: "",
  },
  {
    name: "MyBibleLens Store",
    category: "Store · Coming soon",
    destination: {
      href: "/mybiblelensstore",
      actionLabel: "Enter store",
    },
    image: "/brand/mybiblelens-store/store-mark.png",
    tagline: "Faith you can wear.",
    badge: "",
    artVariant: "mybiblelens-store",
    titleClassName: "mblTitle",
  },
  {
    name: "The Water Check Store",
    category: "Store · Coming soon",
    destination: {
      href: "/thewatercheckstore",
      actionLabel: "Enter store",
    },
    image: "/brand/watercheck-store/c-mark-magic-eraser.png",
    tagline: "Gear for the Hydration Dept.",
    badge: "",
    artVariant: "watercheck-store",
    titleClassName: "",
  },
] as const;

export type ProofIcon =
  | "mybiblelens"
  | "watercheck"
  | "android"
  | "canvas"
  | "route"
  | "users"
  | "widgets"
  | "drop"
  | "building"
  | "globe"
  | "browser"
  | "sparkle"
  | "egg"
  | "star"
  | "play"
  | "film"
  | "search"
  | "calendar"
  | "book"
  | "shirt"
  | "bag";
export type ProofItem = {
  name: string;
  category: string;
  status: string;
  tone: "live" | "building" | "soon" | "count";
  icon: ProofIcon;
};

// Real work for the scrolling "20+ projects" rows on the home page, one row per direction.
export const PROOF_OF_WORK: ReadonlyArray<{ id: string; items: readonly ProofItem[] }> = [
  {
    id: "products",
    items: [
      { name: "MyBibleLens", category: "Faith app · iOS", status: "On the App Store", tone: "live", icon: "mybiblelens" },
      { name: "The Water Check", category: "Hydration app · iOS", status: "On the App Store", tone: "live", icon: "watercheck" },
      { name: "MyBibleLens for Android", category: "Google Play", status: "Closed testing", tone: "building", icon: "android" },
      { name: "Scripture Canvas", category: "Infinite canvas", status: "Live", tone: "live", icon: "canvas" },
      { name: "Journey plans", category: "Reading plans + seals", status: "Live", tone: "live", icon: "route" },
      { name: "Water Check Crews", category: "Team hydration", status: "Built", tone: "live", icon: "users" },
      { name: "Home Screen widgets", category: "iOS widgets", status: "Built", tone: "live", icon: "widgets" },
      { name: "Hydration calculator", category: "Web tool", status: "Live", tone: "live", icon: "drop" },
      { name: "Expected End HQ", category: "Business HQ app", status: "In development", tone: "building", icon: "building" },
      { name: "43-language rollout", category: "Localization", status: "43 languages", tone: "count", icon: "globe" },
      { name: "MyBibleLens Store", category: "Merch", status: "Coming soon", tone: "soon", icon: "shirt" },
    ],
  },
  {
    id: "web-and-creative",
    items: [
      { name: "mybiblelens.us", category: "App website", status: "Live", tone: "live", icon: "browser" },
      { name: "expectedend.co", category: "Company website", status: "Live", tone: "live", icon: "browser" },
      { name: "Scripture Studio", category: "AI Bible study", status: "AI demo", tone: "count", icon: "sparkle" },
      { name: "Hidden art world", category: "Interactive web art", status: "Easter egg", tone: "soon", icon: "egg" },
      { name: "Sanctuary stickers", category: "Illustration set", status: "550+ stickers", tone: "count", icon: "star" },
      { name: "MyBibleLens pitch film", category: "Brand film", status: "2:51", tone: "count", icon: "play" },
      { name: "Feature reels", category: "Video series", status: "10 videos", tone: "count", icon: "film" },
      { name: "Look Closer series", category: "Social series", status: "60 posts", tone: "count", icon: "search" },
      { name: "25-week campaign", category: "Instagram plan", status: "100 posts", tone: "count", icon: "calendar" },
      { name: "Renewed Strength", category: "Workbook", status: "33 blocks", tone: "count", icon: "book" },
      { name: "Water Check Store", category: "Merch", status: "Coming soon", tone: "soon", icon: "bag" },
    ],
  },
];

export const SERVICES = [
  ["01", "Apps", "Useful, thoughtful products designed around real people.", "Building an app or software idea"],
  ["02", "Websites", "Distinct digital homes that feel clear, alive, and welcoming.", "Website or digital experience"],
  ["03", "AI systems", "Practical intelligence that helps ideas and teams move forward.", "AI system or productivity tool"],
  ["04", "Creative", "Identity, direction, and experiences with meaning at the center.", "Creative direction or design"],
  [
    "05",
    "HeadQuarters",
    "Your custom business home. CRM, finance, projects, team tools, and whatever capability you need next—all in one place.",
    "HeadQuarters",
  ],
  [
    "06",
    "Automations",
    "Replace repetitive work with connected workflows that keep your business moving.",
    "Automations",
  ],
  [
    "07",
    "Client Portals",
    "Give customers or members one polished place to communicate, book, share files, and track progress.",
    "Client Portals",
  ],
  [
    "08",
    "Digital Rescue",
    "Repair, modernize, or rebuild software that no longer works for your business.",
    "Digital Rescue",
  ],
] as const;
