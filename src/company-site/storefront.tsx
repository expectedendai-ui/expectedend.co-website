import type * as React from "react";
import { useTranslation } from "react-i18next";
import { ArrowDownIcon, ArrowUpRightIcon } from "./action-icons";
import styles from "./storefront.module.css";
import { WaterIntro } from "./water-intro";

type StoreBrand = "mybiblelens" | "watercheck";

type StorefrontProps = {
  brand: StoreBrand;
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

type Product = {
  id: string;
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
// The English here is the fallback; locales/<id>/store.json holds each language's words by brand and id.
const STORES: Record<StoreBrand, Store> = {
  mybiblelens: {
    name: "MyBibleLens",
    eyebrow: "Goods for the journey",
    headline: "Keep what matters close.",
    intro: "A small collection of thoughtful goods made for notes, reminders, and the everyday walk with God.",
    wordmarkClassName: "mbl",
    products: [
      { id: "dailyBreadJournal", name: "The Daily Bread Journal", detail: "Guided notebook", kind: "Notebook", art: "journal" },
      { id: "lensPin", name: "The Lens Pin", detail: "A little reminder", kind: "Pin", art: "pin" },
      { id: "wordTee", name: "The Word Tee", detail: "Soft everyday layer", kind: "Apparel", art: "tee" },
      { id: "firstLightHoodie", name: "First Light Hoodie", detail: "For cooler mornings", kind: "Apparel", art: "hoodie" },
    ],
  },
  watercheck: {
    name: "The Water Check",
    eyebrow: "The first drop",
    headline: "Drink water. Keep moving.",
    intro: "Hydration-minded layers for the people who show up, refill, and keep the check going.",
    wordmarkClassName: "watercheck",
    products: [
      { id: "dailyCheckTee", name: "The Daily Check Tee", detail: "A bright everyday essential", kind: "Tee", art: "tee" },
      { id: "refillHoodie", name: "Refill Hoodie", detail: "For after the long walk", kind: "Hoodie", art: "hoodie" },
      { id: "flowTee", name: "The Flow Tee", detail: "A second colorway", kind: "Tee", art: "tee" },
      { id: "hydrationHoodie", name: "Hydration Hoodie", detail: "A calm, heavyweight layer", kind: "Hoodie", art: "hoodie" },
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
  const { t } = useTranslation("store");
  const store = STORES[brand];
  const text = (key: string, english: string) => t(`${brand}.${key}`, { defaultValue: english });
  const products = store.products.map((product) => ({
    ...product,
    name: text(`products.${product.id}.name`, product.name),
    detail: text(`products.${product.id}.detail`, product.detail),
    kind: text(`products.${product.id}.kind`, product.kind),
  }));

  return (
    <main className={styles.store} data-store-brand={brand}>
      <div className={styles.waterField} aria-hidden="true" />
      {brand === "watercheck" && <WaterIntro />}
      <nav className={styles.nav} aria-label={t("nav.label", { store: store.name })}>
        <a href="/" onClick={onNavigate} className={styles.backLink}>
          Expected End
        </a>
        <a href="#collection" className={styles.collectionLink}>
          {t("nav.collection")} <ArrowDownIcon />
        </a>
      </nav>

      <section className={styles.hero} aria-labelledby="store-title">
        <div className={styles.heroGlow} aria-hidden="true" />
        <p className={styles.eyebrow}>{text("eyebrow", store.eyebrow)}</p>
        <h1 id="store-title" className={styles[store.wordmarkClassName]}>
          {store.name}
        </h1>
        <p className={styles.headline}>{text("headline", store.headline)}</p>
        <p className={styles.intro}>{text("intro", store.intro)}</p>
        <a href="#collection" className={styles.heroAction}>
          {t("hero.action")} <ArrowDownIcon />
        </a>
        {brand === "mybiblelens" && (
          <div className={styles.mblHeroArt} role="img" aria-label={t("hero.mybiblelensArt")}>
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
          <div className={styles.waterHeroArt} role="img" aria-label={t("hero.watercheckArt")}>
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
          <p className={styles.eyebrow}>{t("collection.eyebrow")}</p>
          <h2 id="collection-title">{t("collection.title")}</h2>
          <p>{t("collection.body")}</p>
        </div>
        <div className={styles.productGrid}>
          {products.map((product, index) => (
            <article className={styles.product} key={product.id}>
              <div
                className={styles.productArt}
                data-product-art={product.art}
                aria-label={t("product.placeholder", { name: product.name })}
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
                    {t("product.buy")} <ArrowUpRightIcon />
                  </a>
                ) : (
                  <button className={styles.comingSoon} type="button" disabled aria-label={t("product.comingSoonLabel", { name: product.name })}>
                    {t("product.comingSoon")}
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.dropNote} aria-labelledby="drop-note-title">
        <p className={styles.eyebrow}>{t("checkout.eyebrow")}</p>
        <h2 id="drop-note-title">{t("checkout.title")}</h2>
        <p>{t("checkout.body")}</p>
      </section>

      <footer className={styles.footer}>
        <div>
          <p className={styles.footerMark}>{store.name}</p>
          <p className={styles.footerNote}>{t("footer.note", { year: new Date().getFullYear() })}</p>
        </div>
        <nav aria-label={t("footer.policies")} className={styles.policyLinks}>
          <a href="/terms" onClick={onNavigate}>
            {t("footer.terms")}
          </a>
          <a href="/privacy" onClick={onNavigate}>
            {t("footer.privacy")}
          </a>
          <a href="/accessibility" onClick={onNavigate}>
            {t("footer.accessibility")}
          </a>
          <span>{t("footer.shipping")}</span>
        </nav>
      </footer>
    </main>
  );
}
