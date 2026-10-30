import { Menu, X } from "lucide-react";
import * as React from "react";
import { CONTACT_HREF } from "./content";
import styles from "./pill-navigation.module.css";

type NavLink = { label: string; href: string; current?: boolean };

export const HOME_NAV: readonly NavLink[] = [
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Story", href: "/denzel-rigaud" },
  { label: "About", href: "/about" },
  { label: "Press", href: "/press" },
];

export const FOUNDER_NAV: readonly NavLink[] = [
  { label: "Denzel Rigaud", href: "/denzel-rigaud", current: true },
  { label: "Story", href: "#memoir" },
  { label: "Projects", href: "/#projects" },
  { label: "Water Check", href: "/thewatercheckpage" },
];

type PillNavigationProps = {
  links: readonly NavLink[];
  contactHref?: string;
  /** Marks the founder page variant (kept for the story page's own anchors). */
  founder?: boolean;
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

/** Floating pill nav for the home and founder pages; phones get a logo pill, a menu button and a drop-down. */
export function PillNavigation({ links, contactHref = CONTACT_HREF, founder = false, onNavigate }: PillNavigationProps) {
  const [open, setOpen] = React.useState(false);
  const menuId = React.useId();

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const follow = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
    onNavigate(event);
  };
  const logo = <img src="/android-chrome-192x192.png" alt="" width="22" height="22" decoding="async" />;

  return (
    <nav className={styles.nav} aria-label="Main navigation" data-founder-nav={founder ? "" : undefined}>
      <div className={`${styles.pill} ${styles.desktop}`}>
        <a className={styles.logo} href="/" onClick={follow} aria-label="Expected End home">
          {logo}
        </a>
        {links.map((link) => (
          <a key={link.href} className={styles.link} href={link.href} onClick={follow} aria-current={link.current ? "page" : undefined}>
            {link.label}
          </a>
        ))}
        <a className={styles.cta} href={contactHref} onClick={follow}>
          Contact
        </a>
      </div>

      <a className={`${styles.pill} ${styles.mobileLogo}`} href="/" onClick={follow} aria-label="Expected End home">
        {logo}
      </a>
      <button
        className={`${styles.pill} ${styles.toggle}`}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
      </button>

      <div className={styles.menu} id={menuId} hidden={!open}>
        {links.map((link) => (
          <a key={link.href} className={styles.menuLink} href={link.href} onClick={follow} aria-current={link.current ? "page" : undefined}>
            {link.label}
          </a>
        ))}
        <a className={styles.menuCta} href={contactHref} onClick={follow}>
          Contact
        </a>
      </div>
    </nav>
  );
}
