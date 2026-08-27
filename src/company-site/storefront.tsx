import type * as React from "react";
import { ArrowDownIcon, ArrowUpRightIcon } from "./action-icons";
import styles from "./storefront.module.css";

type StoreBrand = "mybiblelens" | "watercheck";

type StorefrontProps = {
  brand: StoreBrand;
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

type Product = {
  name: string;
  detail: string;
  kind: string;
  art: "journal" | "pin" | "tee" | "hoodie";
  stripePaymentLink?: string;
};

type Store = {
  name: string;
  eyebrow: string;
  headline: string;
  intro: string;
  wordmarkClassName: string;
  products: Product[];
};

// This is the only place a launch needs to be configured. Add a real product
// image and Stripe Payment Link here when the Tap-Stitch mockups are ready.
const STORES: Record<StoreBrand, Store> = {
  mybiblelens: {
    name: "MyBibleLens",
    eyebrow: "Goods for the journey",
    headline: "Keep what matters close.",
    intro: "A small collection of thoughtful goods made for notes, reminders, and the everyday walk with God.",
    wordmarkClassName: "mbl",
    products: [
      { name: "The Daily Bread Journal", detail: "Guided notebook", kind: "Notebook", art: "journal" },
      { name: "The Lens Pin", detail: "A little reminder", kind: "Pin", art: "pin" },
      { name: "The Word Tee", detail: "Soft everyday layer", kind: "Apparel", art: "tee" },
      { name: "First Light Hoodie", detail: "For cooler mornings", kind: "Apparel", art: "hoodie" },
    ],
  },
  watercheck: {
    name: "The Water Check",
    eyebrow: "The first drop",
    headline: "Drink water. Keep moving.",
    intro: "Hydration-minded layers for the people who show up, refill, and keep the check going.",
    wordmarkClassName: "watercheck",
    products: [
      { name: "The Daily Check Tee", detail: "A bright everyday essential", kind: "Tee", art: "tee" },
      { name: "Refill Hoodie", detail: "For after the long walk", kind: "Hoodie", art: "hoodie" },
      { name: "The Flow Tee", detail: "A second colorway", kind: "Tee", art: "tee" },
      { name: "Hydration Hoodie", detail: "A calm, heavyweight layer", kind: "Hoodie", art: "hoodie" },
    ],
  },
};

const MY_BIBLE_LENS_HERO_STICKERS = [
  { src: "/brand/mybiblelens-store/hero/pixel-cross-clean-v2.png", className: "mblStickerCross" },
  { src: "/brand/mybiblelens-store/hero/pixel-dove-clean-v2.png", className: "mblStickerDove" },
  { src: "/brand/mybiblelens-store/hero/pixel-lion-clean-v2.png", className: "mblStickerLion" },
  { src: "/brand/mybiblelens-store/hero/pixel-open-bible-clean-v2.png", className: "mblStickerBible" },
  { src: "/brand/mybiblelens-store/hero/pixel-first-light-clean-v2.png", className: "mblStickerLight" },
] as const;

export function Storefront({ brand, onNavigate }: StorefrontProps) {
  const store = STORES[brand];

  return (
    <main className={styles.store} data-store-brand={brand}>
      <div className={styles.waterField} aria-hidden="true" />
      {brand === "watercheck" && (
        <div className={styles.waterIntro} data-water-intro aria-hidden="true">
          <div className={styles.waterIntroLogo}>
            <img src="/brand/watercheck-store/c-mark-magic-eraser.png" alt="" width="700" height="700" decoding="async" />
          </div>
          <div className={`${styles.waterIntroFill} ${styles.waterIntroFillBack}`}>
            <svg viewBox="0 0 1440 190" preserveAspectRatio="none" aria-hidden="true" focusable="false">
              <path d="M0 112C218 20 438 171 705 92C946 20 1177 161 1440 66V190H0Z" />
            </svg>
          </div>
          <div className={`${styles.waterIntroFill} ${styles.waterIntroFillFront}`}>
            <svg viewBox="0 0 1440 190" preserveAspectRatio="none" aria-hidden="true" focusable="false">
              <path d="M0 78C244 164 476 18 735 99C970 173 1199 25 1440 108V190H0Z" />
            </svg>
          </div>
          <p className={styles.waterIntroWordmark}>The Water Check</p>
        </div>
      )}
      <nav className={styles.nav} aria-label={`${store.name} store navigation`}>
        <a href="/" onClick={onNavigate} className={styles.backLink}>
          Expected End
        </a>
        <a href="#collection" className={styles.collectionLink}>
          The collection <ArrowDownIcon />
        </a>
      </nav>

      <section className={styles.hero} aria-labelledby="store-title">
        <div className={styles.heroGlow} aria-hidden="true" />
        <p className={styles.eyebrow}>{store.eyebrow}</p>
        <h1 id="store-title" className={styles[store.wordmarkClassName]}>
          {store.name}
        </h1>
        <p className={styles.headline}>{store.headline}</p>
        <p className={styles.intro}>{store.intro}</p>
        <a href="#collection" className={styles.heroAction}>
          Explore the first drop <ArrowDownIcon />
        </a>
        {brand === "mybiblelens" && (
          <div className={styles.mblHeroArt} role="img" aria-label="MyBibleLens store logo and sticker collage">
            <div className={styles.mblFlipStage} data-flip-logo>
              <div className={styles.mblFlipCard}>
                <img
                  className={styles.mblLogoFace}
                  src="/brand/mybiblelens-store/hero/mybiblelens-circle.png"
                  alt=""
                  width="800"
                  height="800"
                  decoding="async"
                />
                <img
                  className={`${styles.mblLogoFace} ${styles.mblLogoBack}`}
                  src="/brand/mybiblelens-store/hero/mybiblelens-circle.png"
                  alt=""
                  width="800"
                  height="800"
                  decoding="async"
                />
              </div>
            </div>
            {MY_BIBLE_LENS_HERO_STICKERS.map((sticker) => (
              <img
                className={`${styles.mblHeroSticker} ${styles[sticker.className]}`}
                data-store-sticker
                src={sticker.src}
                alt=""
                width="420"
                height="420"
                loading="lazy"
                decoding="async"
                key={sticker.src}
              />
            ))}
          </div>
        )}
        {brand === "watercheck" && (
          <div className={styles.waterHeroArt} role="img" aria-label="The Water Check liquid logo bubble">
            <span className={styles.waterHeroBubble}>
              <img src="/brand/watercheck-store/c-mark-magic-eraser.png" alt="" width="700" height="700" decoding="async" />
            </span>
            <span className={`${styles.waterHeroDroplet} ${styles.waterHeroDropletOne}`} aria-hidden="true" />
            <span className={`${styles.waterHeroDroplet} ${styles.waterHeroDropletTwo}`} aria-hidden="true" />
            <span className={`${styles.waterHeroDroplet} ${styles.waterHeroDropletThree}`} aria-hidden="true" />
          </div>
        )}
      </section>

      <section className={styles.collection} id="collection" aria-labelledby="collection-title">
        <div className={styles.collectionHead}>
          <p className={styles.eyebrow}>Coming soon</p>
          <h2 id="collection-title">Made to become part of your day.</h2>
          <p>These are the first pieces. Product photos, options, and checkout links will appear here when the drop is ready.</p>
        </div>
        <div className={styles.productGrid}>
          {store.products.map((product, index) => (
            <article className={styles.product} key={product.name}>
              <div
                className={styles.productArt}
                data-product-art={product.art}
                aria-label={`${product.name} product placeholder`}
                role="img"
              >
                <span className={styles.productNumber}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.productObject} aria-hidden="true" />
              </div>
              <div className={styles.productInfo}>
                <div>
                  <p>{product.kind}</p>
                  <h3>{product.name}</h3>
                  <span>{product.detail}</span>
                </div>
                {product.stripePaymentLink ? (
                  <a className={styles.buyButton} href={product.stripePaymentLink} target="_blank" rel="noreferrer">
                    Buy now <ArrowUpRightIcon />
                  </a>
                ) : (
                  <button className={styles.comingSoon} type="button" disabled aria-label={`${product.name} coming soon`}>
                    Coming soon
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.dropNote} aria-labelledby="drop-note-title">
        <p className={styles.eyebrow}>No account needed</p>
        <h2 id="drop-note-title">When it opens, checkout stays simple.</h2>
        <p>Choose a piece, tap Buy now, and check out securely through Stripe. No store account and no shopping-cart maze.</p>
      </section>

      <footer className={styles.footer}>
        <div>
          <p className={styles.footerMark}>{store.name}</p>
          <p className={styles.footerNote}>
            © {new Date().getFullYear()} Expected End. Store policies will be published before the first drop.
          </p>
        </div>
        <nav aria-label="Store policies" className={styles.policyLinks}>
          <a href="/terms" onClick={onNavigate}>
            Terms
          </a>
          <a href="/privacy" onClick={onNavigate}>
            Privacy
          </a>
          <a href="/accessibility" onClick={onNavigate}>
            Accessibility
          </a>
          <span>Shipping & returns — before drop</span>
        </nav>
      </footer>
    </main>
  );
}
