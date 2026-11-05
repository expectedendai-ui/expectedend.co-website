import { Menu, X } from "lucide-react";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { CONTACT_HREF } from "./content";
import styles from "./pill-navigation.module.css";

/** `label` is the English; `id` picks its translation in shell.json (nav.links.<id>). */
type NavLink = { id: string; label: string; href: string; current?: boolean };

export const HOME_NAV: readonly NavLink[] = [
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "services", label: "Services", href: "#services" },
  { id: "story", label: "Story", href: "/denzel-rigaud" },
  { id: "about", label: "About", href: "/about" },
  { id: "press", label: "Press", href: "/press" },
];

export const FOUNDER_NAV: readonly NavLink[] = [
  { id: "founder", label: "Denzel Rigaud", href: "/denzel-rigaud", current: true },
  { id: "story", label: "Story", href: "#memoir" },
  { id: "projects", label: "Projects", href: "/#projects" },
  { id: "waterCheck", label: "Water Check", href: "/thewatercheckpage" },
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
  const { t } = useTranslation("shell");
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
  const label = (link: NavLink) => t(`nav.links.${link.id}`, { defaultValue: link.label });
  const logo = <img src="/android-chrome-192x192.png" alt="" width="22" height="22" decoding="async" />;

  return (
    <nav className={styles.nav} aria-label={t("nav.label")} data-founder-nav={founder ? "" : undefined}>
      <div className={`${styles.pill} ${styles.desktop}`}>
        <a className={styles.logo} href="/" onClick={follow} aria-label={t("nav.home")}>
          {logo}
        </a>
        {links.map((link) => (
          <a key={link.href} className={styles.link} href={link.href} onClick={follow} aria-current={link.current ? "page" : undefined}>
            {label(link)}
          </a>
        ))}
        <a className={styles.cta} href={contactHref} onClick={follow}>
          {t("nav.contact")}
        </a>
      </div>

      <a className={`${styles.pill} ${styles.mobileLogo}`} href="/" onClick={follow} aria-label={t("nav.home")}>
        {logo}
      </a>
      <button
        className={`${styles.pill} ${styles.toggle}`}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
      </button>

      <div className={styles.menu} id={menuId} hidden={!open}>
        {links.map((link) => (
          <a key={link.href} className={styles.menuLink} href={link.href} onClick={follow} aria-current={link.current ? "page" : undefined}>
            {label(link)}
          </a>
        ))}
        <a className={styles.menuCta} href={contactHref} onClick={follow}>
          {t("nav.contact")}
        </a>
      </div>
    </nav>
  );
}
