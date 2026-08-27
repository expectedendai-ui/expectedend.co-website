export const CONTACT_HREF = "/about#contact";

// Denzel Rigaud approved the governed public content, service/inquiry copy,
// and self-hosted-font disclosure for production release on 2026-08-08.
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
    artVariant: "mybiblelens",
    titleClassName: "mblTitle",
  },
  {
    name: "The Water Check",
    category: "Hydration community",
    destination: {
      href: "https://www.instagram.com/thewatercheck/",
      actionLabel: "Visit community",
    },
    image: "/brand/thewatercheck.png",
    artVariant: "watercheck",
    titleClassName: "",
  },
  {
    name: "MyBibleLens Store",
    category: "Goods for the journey",
    destination: {
      href: "/mybiblelensstore",
      actionLabel: "Enter store",
    },
    image: "/brand/mybiblelens-store/store-mark.png",
    artVariant: "mybiblelens-store",
    titleClassName: "mblTitle",
  },
  {
    name: "The Water Check Store",
    category: "First drop coming soon",
    destination: {
      href: "/thewatercheckstore",
      actionLabel: "Enter store",
    },
    image: "/brand/watercheck-store/c-mark-magic-eraser.png",
    artVariant: "watercheck-store",
    titleClassName: "",
  },
] as const;

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
