import {
  AlertTriangle,
  AtSign,
  Baby,
  CalendarDays,
  Clock3,
  Droplets,
  Eye,
  Flame,
  GlassWater,
  Heart,
  Info,
  Salad,
  Waves,
} from "lucide-react";
import * as React from "react";
import { Trans, useTranslation } from "react-i18next";
import "./water-check-page.css";
import { WaterIntro } from "./water-intro";
import { WaterCheckApp } from "./water-check-app";

const WATER_CHECK_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": "https://expectedend.co/thewatercheckpage#application",
  name: "The Water Check",
  url: "https://expectedend.co/thewatercheckpage",
  description: "A private hydration estimate, practical water habits, and The Water Check community.",
  operatingSystem: "Web",
  creator: {
    "@type": "Person",
    "@id": "https://expectedend.co/denzel-rigaud#person",
    name: "Denzel Rigaud",
    url: "https://expectedend.co/denzel-rigaud",
  },
  about: {
    "@type": "Thing",
    name: "hydration",
    sameAs: "https://www.wikidata.org/wiki/Q25394518",
  },
  sameAs: ["https://www.instagram.com/thewatercheck/", "https://www.wikidata.org/wiki/Q141251206"],
};

// Each tip's title and body live in calculator.json under tips.<id>.
const TIPS = [
  { id: "schedule", Icon: Clock3 },
  { id: "electrolytes", Icon: Waves },
  { id: "visualCheck", Icon: Eye },
] as const;

const formatOunces = (ounces: number) => (Number.isInteger(ounces) ? String(ounces) : ounces.toFixed(1));
const formatCount = (count: number) => {
  const rounded = count >= 10 ? Math.round(count) : Math.round(count * 2) / 2;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
};

type ClampedNumberInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "min" | "max"> & {
  value: number;
  min: number;
  max: number;
  onCommit: (value: number) => void;
};

/**
 * A number box that lets you type freely and only clamps when you leave the field.
 * The previous version clamped on every keystroke, so clearing "35" snapped to the minimum and
 * typing "22" on top of it became "1822" then the maximum. Typing "6" after "5" became 56, then 8.
 */
function ClampedNumberInput({ value, min, max, onCommit, onBlur, onFocus, ...rest }: ClampedNumberInputProps) {
  const [draft, setDraft] = React.useState(String(value));
  const [focused, setFocused] = React.useState(false);
  React.useEffect(() => {
    if (!focused) setDraft(String(value));
  }, [value, focused]);
  const clamp = (next: number) => Math.min(max, Math.max(min, next));
  return (
    <input
      {...rest}
      type="number"
      inputMode="numeric"
      min={min}
      max={max}
      value={draft}
      onFocus={(event) => {
        setFocused(true);
        event.currentTarget.select();
        onFocus?.(event);
      }}
      onChange={(event) => {
        const raw = event.currentTarget.value;
        setDraft(raw);
        const parsed = Number(raw);
        // Update the result live while the typed number is already valid; otherwise wait for blur.
        if (raw.trim() !== "" && Number.isFinite(parsed) && parsed >= min && parsed <= max) onCommit(parsed);
      }}
      onBlur={(event) => {
        setFocused(false);
        const parsed = Number(event.currentTarget.value);
        const next = event.currentTarget.value.trim() === "" || !Number.isFinite(parsed) ? value : clamp(parsed);
        onCommit(next);
        setDraft(String(next));
        onBlur?.(event);
      }}
    />
  );
}

/** An outside source that opens in a new tab. Inside a Trans line, the translated words become its children. */
function SourceLink({ href, children }: { href: string; children?: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

// Roughly a fifth of most people's daily water arrives in food (National Academies; Harvard Health).
const FOOD_WATER_SHARE = 0.2;
const OUNCES_PER_LITER = 33.814;
const OUNCES_PER_BOTTLE = 16.9;

// Approximate fluid ounces of water per serving, from USDA FoodData Central water percentages.
// The label, serving size, and water percentage for each food live in calculator.json under foods.<key>.
const FOOD_EQUIVALENTS = [
  { key: "watermelon", emoji: "🍉", ounces: 4.7 },
  { key: "cucumber", emoji: "🥒", ounces: 9.6 },
  { key: "strawberries", emoji: "🍓", ounces: 4.7 },
  { key: "oranges", emoji: "🍊", ounces: 3.9 },
  { key: "salad", emoji: "🥗", ounces: 5 },
  { key: "soup", emoji: "🍲", ounces: 7.5 },
  { key: "tomatoes", emoji: "🍅", ounces: 3.9 },
  { key: "grapes", emoji: "🍇", ounces: 4.1 },
  { key: "peaches", emoji: "🍑", ounces: 4.5 },
  { key: "cantaloupe", emoji: "🍈", ounces: 4.7 },
] as const;
type FoodKey = (typeof FOOD_EQUIVALENTS)[number]["key"];

type LifeStage = "standard" | "pregnant" | "breastfeeding";
type Sex = "unspecified" | "woman" | "man";
type WeightUnit = "lb" | "kg";

const BUBBLES = ["b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9"] as const;

// Light rays: [width px, solid stop %, tint]. Cycled to fill the strip.
const RAY_PATTERN: ReadonlyArray<readonly [number, number, string]> = [
  [20, 40, "#dcf8ff"],
  [20, 30, "#c9f0fb"],
  [15, 20, "#a8e4f4"],
  [5, 10, "#9adff2"],
  [10, 40, "#b4e9f7"],
  [10, 30, "#c4eefa"],
  [10, 20, "#a6e2f3"],
  [5, 40, "#aee6f5"],
  [25, 60, "#95dcf0"],
  [10, 50, "#b4e9f7"],
  [10, 40, "#c4eefa"],
  [10, 20, "#a6e2f3"],
  [5, 10, "#aee6f5"],
];
const RAYS = Array.from({ length: 39 }, (_, index) => {
  const [width, stop, tint] = RAY_PATTERN[index % RAY_PATTERN.length];
  return { id: `ray-${index}`, width, stop, tint, duration: 2.5 + ((index * 7) % 4), delay: (index * 5) % 4 };
});
const RAY_STRIPS = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"] as const;
const SURFACE_TEETH = Array.from({ length: 40 }, (_, index) => `tooth-${index}`);
const WHALES = [
  { id: "xl", top: 46, scale: 0.42, duration: 34, delay: -6, opacity: 0.8 },
  { id: "l", top: 22, scale: 0.28, duration: 42, delay: -25, opacity: 0.62 },
  { id: "m", top: 62, scale: 0.18, duration: 48, delay: -14, opacity: 0.5 },
  { id: "s", top: 34, scale: 0.12, duration: 56, delay: -38, opacity: 0.4 },
] as const;
const ROCKS = ["r1", "r2", "r3", "r4", "r5", "r6"] as const;
const POUNDS_PER_KILOGRAM = 2.2046226218;
const METERS_PER_INCH = 0.0254;
const CENTIMETERS_PER_INCH = 2.54;
// Devine ideal body weight: men 50 kg, women 45.5 kg (midpoint when unspecified), plus 2.3 kg per inch over 5 ft.
const IDEAL_WEIGHT_BASE_KG: Record<Sex, number> = { unspecified: 47.75, woman: 45.5, man: 50 };
// National Academies total-water references differ by sex (3.7 L men, 2.7 L women). Weight explains most of that
// gap, so the remainder is a small, transparent baseline adjustment.
const SEX_BASELINE_FACTOR: Record<Sex, number> = { unspecified: 0, woman: -0.04, man: 0.04 };
const IDEAL_WEIGHT_KG_PER_INCH = 2.3;
const IDEAL_WEIGHT_REFERENCE_INCHES = 60;
// Above this BMI, fluid needs are estimated from adjusted body weight (ideal + 40% of the excess), a clinical convention.
const ADJUSTED_WEIGHT_BMI_THRESHOLD = 25;
const ADJUSTED_WEIGHT_EXCESS_FACTOR = 0.4;

// The breakdown label for each stage lives in calculator.json under result.lifeStage.<stage>.
const LIFE_STAGE_DETAILS: Record<LifeStage, { adjustment: number }> = {
  standard: { adjustment: 0 },
  pregnant: { adjustment: 10 },
  breastfeeding: { adjustment: 24 },
};

type WaterCheckPageProps = {
  onNavigate?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

export function WaterCheckPage({ onNavigate }: WaterCheckPageProps = {}) {
  const { t } = useTranslation("calculator");
  const [weight, setWeight] = React.useState(160);
  const [weightUnit, setWeightUnit] = React.useState<WeightUnit>("lb");
  const [heightInches, setHeightInches] = React.useState(70);
  const [sex, setSex] = React.useState<Sex>("unspecified");
  const [activity, setActivity] = React.useState(30);
  const [age, setAge] = React.useState(35);
  const [lifeStage, setLifeStage] = React.useState<LifeStage>("standard");
  const [isLutealPhase, setIsLutealPhase] = React.useState(false);
  const [isHotOrHumid, setIsHotOrHumid] = React.useState(false);
  const [foodKey, setFoodKey] = React.useState<FoodKey>("watermelon");
  const weightBaseline = weight / 2;
  const weightKg = weight / POUNDS_PER_KILOGRAM;
  const heightMeters = heightInches * METERS_PER_INCH;
  const bmi = weightKg / (heightMeters * heightMeters);
  const idealWeightKg = Math.max(
    30,
    IDEAL_WEIGHT_BASE_KG[sex] + IDEAL_WEIGHT_KG_PER_INCH * (heightInches - IDEAL_WEIGHT_REFERENCE_INCHES)
  );
  const usesAdjustedWeight = bmi > ADJUSTED_WEIGHT_BMI_THRESHOLD && weightKg > idealWeightKg;
  const adjustedWeightKg = usesAdjustedWeight
    ? idealWeightKg + ADJUSTED_WEIGHT_EXCESS_FACTOR * (weightKg - idealWeightKg)
    : weightKg;
  const heightAdjustment = Math.round((((adjustedWeightKg - weightKg) * POUNDS_PER_KILOGRAM) / 2) * 10) / 10;
  const sexAdjustment = Math.round(weightBaseline * SEX_BASELINE_FACTOR[sex] * 10) / 10;
  const activityAdjustment = (activity / 30) * 12;
  const lifeStageDetails = LIFE_STAGE_DETAILS[lifeStage];
  const lifeStageAdjustment = lifeStageDetails.adjustment;
  const ounces = weightBaseline + heightAdjustment + sexAdjustment + activityAdjustment + lifeStageAdjustment;
  const heightFeet = Math.floor(heightInches / 12);
  const heightRemainderInches = heightInches % 12;
  const heightCentimeters = Math.round(heightInches * CENTIMETERS_PER_INCH);
  const electrolyteGuidance =
    isHotOrHumid || activity >= 60 ? t("result.electrolytesAfterSweat") : t("result.electrolytesFromFood");
  const displayedWeight = weightUnit === "lb" ? weight : Number((weight / POUNDS_PER_KILOGRAM).toFixed(1));
  const weightRange = weightUnit === "lb" ? { min: 80, max: 300, step: 1 } : { min: 36.3, max: 136.1, step: 0.1 };
  const weightLabel = weightUnit === "lb" ? t("weight.labelLb") : t("weight.labelKg");
  const cups = ounces / 8;
  const liters = ounces / OUNCES_PER_LITER;
  const bottles = ounces / OUNCES_PER_BOTTLE;
  const foodOunces = ounces * FOOD_WATER_SHARE;
  const drinkOunces = ounces - foodOunces;
  const food = FOOD_EQUIVALENTS.find((item) => item.key === foodKey) ?? FOOD_EQUIVALENTS[0];
  const foodCount = foodOunces / food.ounces;

  return (
    <>
      <WaterIntro />
      <main data-water-check-page className="waterCheckPage tw:overflow-hidden">
        <script type="application/ld+json">{JSON.stringify(WATER_CHECK_SCHEMA)}</script>
        <section
          className="waterCheckHero tw:relative tw:isolate tw:overflow-hidden tw:px-6 tw:pb-32 tw:pt-28 tw:text-white tw:sm:px-10 tw:lg:px-16 tw:lg:pb-40 tw:lg:pt-32"
          aria-labelledby="water-check-title"
        >
          <div className="waterCheckHeroField" data-water-decoration data-water-field aria-hidden="true">
            <span className="waterCheckSun">
              <i />
              <i />
              <i />
              <i />
            </span>
            <span className="waterCheckRays">
              {RAY_STRIPS.map((strip) => (
                <span key={strip} className="waterCheckRayStrip">
                  {RAYS.map((ray) => (
                    <i
                      key={`${strip}-${ray.id}`}
                      style={
                        {
                          "--ray-w": `${ray.width}px`,
                          "--ray-stop": `${ray.stop}%`,
                          "--ray-tint": ray.tint,
                          "--ray-dur": `${ray.duration}s`,
                          "--ray-delay": `${ray.delay}s`,
                        } as React.CSSProperties
                      }
                    />
                  ))}
                </span>
              ))}
            </span>
            <span className="waterCheckWaterline">
              <span className="waterCheckWaterlineBar" />
              <span className="waterCheckWaterlineTeeth">
                {SURFACE_TEETH.map((tooth) => (
                  <i key={tooth} />
                ))}
              </span>
            </span>
            <span className="waterCheckWhales">
              {WHALES.map((whale) => (
                <span
                  key={whale.id}
                  className="waterCheckWhale"
                  style={
                    {
                      "--whale-top": `${whale.top}%`,
                      "--whale-scale": whale.scale,
                      "--whale-dur": `${whale.duration}s`,
                      "--whale-delay": `${whale.delay}s`,
                      "--whale-opacity": whale.opacity,
                    } as React.CSSProperties
                  }
                >
                  <span className="waterCheckWhaleBob">
                    <span className="waterCheckWhaleBody" />
                    <span className="waterCheckWhaleFin" />
                  </span>
                </span>
              ))}
            </span>
            <span className="waterCheckDepth" />
            <span className="waterCheckBubbles">
              {BUBBLES.map((bubble) => (
                <i key={bubble} />
              ))}
            </span>
            <span className="waterCheckRocks">
              {ROCKS.map((rock) => (
                <i key={rock} />
              ))}
            </span>
            <span className="waterCheckGrain" />
          </div>

          <div className="tw:relative tw:z-[3] tw:mx-auto tw:grid tw:max-w-7xl tw:items-center tw:gap-12 tw:lg:min-h-[30rem] tw:lg:grid-cols-[minmax(0,1fr)_minmax(19rem,25rem)] tw:lg:gap-14">
            <div className="tw:max-w-3xl">
              <p className="waterCheckKicker">
                <Droplets aria-hidden="true" size={18} strokeWidth={1.9} />
                {t("hero.kicker")}
              </p>
              <h1
                id="water-check-title"
                className="tw:max-w-4xl tw:text-balance tw:font-serif tw:text-5xl tw:leading-[0.98] tw:tracking-[-0.045em] tw:sm:text-7xl tw:lg:text-[5.6rem]"
              >
                {t("hero.title")}
              </h1>
              <p className="tw:mt-8 tw:max-w-2xl tw:text-lg tw:leading-8 tw:text-[#e1f9ff] tw:sm:text-xl">{t("hero.lead")}</p>
              <a className="waterCheckAppLink" href="#the-app">
                {t("hero.appLink")}
              </a>
            </div>
            <div className="waterCheckLogoStage tw:justify-self-center tw:lg:justify-self-end">
              <a href="#calculator" aria-label={t("hero.logoLabel")} data-water-logo-orb>
                <span className="waterCheckOrbFrame" aria-hidden="true">
                  <span className="waterCheckLogoRings">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="waterCheckLogoOrb">
                    <img
                      src="/brand/watercheck-store/c-mark-magic-eraser.png"
                      alt=""
                      width="700"
                      height="700"
                      loading="eager"
                      decoding="async"
                    />
                    <span className="waterCheckLogoCaustics" />
                    <span className="waterCheckLogoBubble waterCheckLogoBubbleOne" />
                    <span className="waterCheckLogoBubble waterCheckLogoBubbleTwo" />
                  </span>
                </span>
                <span className="tw:sr-only">{t("hero.logoLabel")}</span>
              </a>
            </div>
          </div>

          <div className="waterCheckHeroWave" aria-hidden="true">
            <svg viewBox="0 0 1440 160" preserveAspectRatio="none" aria-hidden="true" focusable="false">
              <path className="waterCheckHeroWaveBack" d="M0 92C210 20 430 150 720 84C990 22 1210 130 1440 60V160H0Z" />
              <path className="waterCheckHeroWaveFront" d="M0 118C260 60 470 158 740 104C1000 54 1220 140 1440 96V160H0Z" />
            </svg>
          </div>
        </section>

        <section
          id="calculator"
          className="waterCheckCalculatorSection tw:relative tw:z-10 tw:-mt-20 tw:px-5 tw:pb-24 tw:sm:px-8"
        >
          <div className="waterCheckCalculatorCard tw:mx-auto tw:max-w-5xl tw:rounded-[2rem] tw:p-6 tw:sm:p-10 tw:lg:p-14">
            <div className="tw:mb-10 tw:max-w-2xl">
              <p className="tw:text-sm tw:font-bold tw:uppercase tw:tracking-[0.18em] tw:text-[#0f7cd5]">{t("intro.kicker")}</p>
              <h2 className="tw:mt-3 tw:font-serif tw:text-4xl tw:leading-tight tw:tracking-[-0.03em] tw:text-[#082d52] tw:sm:text-5xl">
                {t("intro.title")}
              </h2>
            </div>

            <fieldset className="waterCheckUnitSwitch tw:mb-6">
              <legend>{t("units.legend")}</legend>
              <label>
                <input
                  type="radio"
                  name="water-check-weight-unit"
                  value="lb"
                  checked={weightUnit === "lb"}
                  onChange={() => setWeightUnit("lb")}
                />
                <span>{t("units.pounds")}</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="water-check-weight-unit"
                  value="kg"
                  checked={weightUnit === "kg"}
                  onChange={() => setWeightUnit("kg")}
                />
                <span>{t("units.kilograms")}</span>
              </label>
            </fieldset>

            <div className="tw:grid tw:gap-8 tw:lg:grid-cols-2">
              <div className="tw:rounded-3xl tw:bg-[#f5eff4] tw:p-6">
                <div className="tw:flex tw:items-baseline tw:justify-between tw:gap-4">
                  <label className="tw:text-base tw:font-bold tw:text-[#082d52]" htmlFor="water-check-weight">
                    {weightLabel}
                  </label>
                  <span className="tw:text-2xl tw:font-bold tw:text-[#0f7cd5]" aria-hidden="true">
                    {displayedWeight} {weightUnit}
                  </span>
                </div>
                <input
                  id="water-check-weight"
                  type="range"
                  min={weightRange.min}
                  max={weightRange.max}
                  step={weightRange.step}
                  value={displayedWeight}
                  aria-valuetext={t(weightUnit === "lb" ? "weight.valueTextLb" : "weight.valueTextKg", {
                    value: displayedWeight,
                  })}
                  onChange={(event) => {
                    const nextWeight = Number(event.currentTarget.value);
                    setWeight(weightUnit === "lb" ? nextWeight : nextWeight * POUNDS_PER_KILOGRAM);
                  }}
                />
                <div className="tw:flex tw:justify-between tw:text-xs tw:font-bold tw:text-[#47718d]" aria-hidden="true">
                  <span>
                    {weightRange.min} {weightUnit}
                  </span>
                  <span>
                    {weightRange.max} {weightUnit}
                  </span>
                </div>
                <fieldset className="waterCheckHeight">
                  <legend>{t("height.legend")}</legend>
                  {weightUnit === "lb" ? (
                    <>
                      <label htmlFor="water-check-height-feet">
                        <span>{t("height.feet")}</span>
                        <ClampedNumberInput
                          id="water-check-height-feet"
                          min={3}
                          max={8}
                          step={1}
                          value={heightFeet}
                          onCommit={(feet) => setHeightInches(Math.round(feet) * 12 + heightRemainderInches)}
                        />
                      </label>
                      <label htmlFor="water-check-height-inches">
                        <span>{t("height.inches")}</span>
                        <ClampedNumberInput
                          id="water-check-height-inches"
                          min={0}
                          max={11}
                          step={1}
                          value={heightRemainderInches}
                          onCommit={(inches) => setHeightInches(heightFeet * 12 + Math.round(inches))}
                        />
                      </label>
                    </>
                  ) : (
                    <label htmlFor="water-check-height-cm">
                      <span>{t("height.centimeters")}</span>
                      <ClampedNumberInput
                        id="water-check-height-cm"
                        min={120}
                        max={230}
                        step={1}
                        value={heightCentimeters}
                        onCommit={(centimeters) => setHeightInches(Math.round(centimeters / CENTIMETERS_PER_INCH))}
                      />
                    </label>
                  )}
                  <p>{t("height.note")}</p>
                </fieldset>
              </div>

              <div className="tw:rounded-3xl tw:bg-[#f5eff4] tw:p-6">
                <div className="tw:flex tw:items-baseline tw:justify-between tw:gap-4">
                  <label className="tw:text-base tw:font-bold tw:text-[#082d52]" htmlFor="water-check-activity">
                    {t("activity.label")}
                  </label>
                  <span className="tw:text-2xl tw:font-bold tw:text-[#0f7cd5]" aria-hidden="true">
                    {t("activity.value", { minutes: activity })}
                  </span>
                </div>
                <input
                  id="water-check-activity"
                  type="range"
                  min="0"
                  max="120"
                  step="1"
                  value={activity}
                  aria-valuetext={t("activity.valueText", { minutes: activity })}
                  onChange={(event) => setActivity(Number(event.currentTarget.value))}
                />
                <div className="tw:flex tw:justify-between tw:text-xs tw:font-bold tw:text-[#47718d]" aria-hidden="true">
                  <span>{t("activity.value", { minutes: 0 })}</span>
                  <span>{t("activity.value", { minutes: 120 })}</span>
                </div>
              </div>
            </div>

            <fieldset className="waterCheckFactors tw:mt-8 tw:rounded-3xl tw:border tw:border-[#e3d5df] tw:bg-[#fbf8fa] tw:p-6 tw:sm:p-8">
              <legend className="tw:px-2 tw:text-lg tw:font-bold tw:text-[#082d52]">{t("factors.legend")}</legend>
              <p className="tw:mb-6 tw:max-w-3xl tw:text-sm tw:leading-6 tw:text-[#47718d]">{t("factors.intro")}</p>

              <div className="tw:grid tw:gap-5 tw:md:grid-cols-2">
                <label className="waterCheckField" htmlFor="water-check-age">
                  <span>
                    <strong>{t("factors.age.label")}</strong>
                    <small>{t("factors.age.hint")}</small>
                  </span>
                  <ClampedNumberInput
                    id="water-check-age"
                    aria-label={t("factors.age.label")}
                    min={18}
                    max={100}
                    step={1}
                    value={age}
                    onCommit={(next) => setAge(Math.round(next))}
                  />
                </label>

                <label className="waterCheckField" htmlFor="water-check-life-stage">
                  <span>
                    <strong>{t("factors.lifeStage.label")}</strong>
                    <small>{t("factors.lifeStage.hint")}</small>
                  </span>
                  <select
                    id="water-check-life-stage"
                    aria-label={t("factors.lifeStage.label")}
                    value={lifeStage}
                    onChange={(event) => setLifeStage(event.currentTarget.value as LifeStage)}
                  >
                    <option value="standard">{t("factors.lifeStage.options.standard")}</option>
                    <option value="pregnant">{t("factors.lifeStage.options.pregnant")}</option>
                    <option value="breastfeeding">{t("factors.lifeStage.options.breastfeeding")}</option>
                  </select>
                </label>

                <label className="waterCheckField" htmlFor="water-check-sex">
                  <span>
                    <strong>{t("factors.sex.label")}</strong>
                    <small>{t("factors.sex.hint")}</small>
                  </span>
                  <select
                    id="water-check-sex"
                    aria-label={t("factors.sex.label")}
                    value={sex}
                    onChange={(event) => setSex(event.currentTarget.value as Sex)}
                  >
                    <option value="unspecified">{t("factors.sex.options.unspecified")}</option>
                    <option value="woman">{t("factors.sex.options.woman")}</option>
                    <option value="man">{t("factors.sex.options.man")}</option>
                  </select>
                </label>

                <label className="waterCheckToggle" htmlFor="water-check-luteal">
                  <span className="waterCheckToggleIcon" aria-hidden="true">
                    <CalendarDays size={22} />
                  </span>
                  <span className="tw:flex-1">
                    <strong>{t("factors.luteal.label")}</strong>
                    <small>{t("factors.luteal.hint")}</small>
                  </span>
                  <input
                    id="water-check-luteal"
                    aria-label={t("factors.luteal.label")}
                    type="checkbox"
                    checked={isLutealPhase}
                    onChange={(event) => setIsLutealPhase(event.currentTarget.checked)}
                  />
                  <span className="waterCheckSwitch" aria-hidden="true" />
                </label>

                <label className="waterCheckToggle" htmlFor="water-check-heat">
                  <span className="waterCheckToggleIcon" aria-hidden="true">
                    <Flame size={22} />
                  </span>
                  <span className="tw:flex-1">
                    <strong>{t("factors.heat.label")}</strong>
                    <small>{t("factors.heat.hint")}</small>
                  </span>
                  <input
                    id="water-check-heat"
                    aria-label={t("factors.heat.label")}
                    type="checkbox"
                    checked={isHotOrHumid}
                    onChange={(event) => setIsHotOrHumid(event.currentTarget.checked)}
                  />
                  <span className="waterCheckSwitch" aria-hidden="true" />
                </label>
              </div>
            </fieldset>

            <div className="waterCheckResult tw:mt-8 tw:rounded-3xl tw:px-6 tw:py-8 tw:text-white tw:sm:px-10">
              <output
                className="tw:block tw:font-serif tw:text-4xl tw:leading-tight tw:tracking-[-0.03em] tw:sm:text-6xl"
                htmlFor="water-check-weight water-check-activity water-check-age water-check-life-stage water-check-luteal water-check-heat"
                aria-live="polite"
                aria-atomic="true"
              >
                {t("result.goal", { ounces: formatOunces(ounces) })}
              </output>
              <fieldset className="tw:mt-7 tw:grid tw:gap-3 tw:sm:grid-cols-2 tw:lg:grid-cols-4">
                <legend className="tw:sr-only">{t("result.breakdown")}</legend>
                <div className="waterCheckResultPart">
                  <span>{t("result.weightBaseline")}</span>
                  <strong>{formatOunces(weightBaseline)} oz</strong>
                </div>
                <div className="waterCheckResultPart">
                  <span>{t("result.heightAndBuild")}</span>
                  <strong>{heightAdjustment < 0 ? `−${formatOunces(Math.abs(heightAdjustment))} oz` : "+0 oz"}</strong>
                </div>
                <div className="waterCheckResultPart">
                  <span>{t("result.sexReference")}</span>
                  <strong>
                    {sex === "unspecified"
                      ? t("result.notSet")
                      : `${sexAdjustment < 0 ? "−" : "+"}${formatOunces(Math.abs(sexAdjustment))} oz`}
                  </strong>
                </div>
                <div className="waterCheckResultPart">
                  <span>{t("result.activity")}</span>
                  <strong>+{formatOunces(activityAdjustment)} oz</strong>
                </div>
                <div className="waterCheckResultPart">
                  <span>{t(`result.lifeStage.${lifeStage}`)}</span>
                  <strong>+{formatOunces(lifeStageAdjustment)} oz</strong>
                </div>
                {isLutealPhase && (
                  <div className="waterCheckResultPart waterCheckResultPartWarm">
                    <span>{t("result.luteal")}</span>
                    <strong>{t("result.noFixedOunces")}</strong>
                  </div>
                )}
                <div className="waterCheckResultPart waterCheckResultPartWarm">
                  <span>{t("result.electrolytes")}</span>
                  <strong>{electrolyteGuidance}</strong>
                </div>
              </fieldset>
              <div className="waterCheckEquivalents tw:mt-7">
                <p className="waterCheckEquivalentsTitle">
                  <GlassWater aria-hidden="true" size={18} />
                  {t("equivalents.title")}
                </p>
                <ul className="waterCheckEquivalentsRow">
                  <li>
                    <strong>{t("equivalents.cups", { value: formatCount(cups) })}</strong>
                    <span>{t("equivalents.cupsNote")}</span>
                  </li>
                  <li>
                    <strong>{t("equivalents.liters", { value: liters.toFixed(1) })}</strong>
                    <span>{t("equivalents.litersNote")}</span>
                  </li>
                  <li>
                    <strong>{t("equivalents.bottles", { value: formatCount(bottles) })}</strong>
                    <span>{t("equivalents.bottlesNote")}</span>
                  </li>
                </ul>
              </div>

              <div className="waterCheckEatYourWater tw:mt-6" data-eat-your-water>
                <div className="waterCheckEatHeader">
                  <span className="waterCheckEatIcon" aria-hidden="true">
                    <Salad size={22} />
                  </span>
                  <div>
                    <p className="waterCheckEatKicker">{t("eatYourWater.kicker")}</p>
                    <h3 className="waterCheckEatTitle">{t("eatYourWater.title")}</h3>
                  </div>
                </div>
                <p className="waterCheckEatCopy">{t("eatYourWater.copy")}</p>
                <div className="waterCheckEatSplit">
                  <div className="waterCheckEatSplitCard">
                    <span>{t("eatYourWater.drink")}</span>
                    <strong>≈ {formatOunces(Math.round(drinkOunces * 10) / 10)} oz</strong>
                    <small>{t("eatYourWater.drinkNote", { cups: formatCount(drinkOunces / 8) })}</small>
                  </div>
                  <div className="waterCheckEatSplitCard waterCheckEatSplitCardFood">
                    <span>{t("eatYourWater.eat")}</span>
                    <strong>≈ {formatOunces(Math.round(foodOunces * 10) / 10)} oz</strong>
                    <small>{t("eatYourWater.eatNote")}</small>
                  </div>
                </div>
                <fieldset className="waterCheckFoodChips">
                  <legend>{t("eatYourWater.pickLegend")}</legend>
                  {FOOD_EQUIVALENTS.map((item) => (
                    <label key={item.key} htmlFor={`water-check-food-${item.key}`}>
                      <input
                        id={`water-check-food-${item.key}`}
                        type="radio"
                        name="water-check-food"
                        value={item.key}
                        checked={foodKey === item.key}
                        onChange={() => setFoodKey(item.key)}
                      />
                      <span>
                        <i aria-hidden="true">{item.emoji}</i>
                        {t(`foods.${item.key}.label`)}
                      </span>
                    </label>
                  ))}
                </fieldset>
                <output className="waterCheckFoodResult" htmlFor="water-check-food-watermelon" aria-live="polite">
                  <span key={food.key} className="waterCheckFoodResultEmoji" aria-hidden="true">
                    {food.emoji}
                  </span>
                  <span>
                    <strong>
                      {t("eatYourWater.estimate", { amount: formatCount(foodCount), food: t(`foods.${food.key}.label`) })}
                    </strong>
                    <small>
                      {t("eatYourWater.detail", {
                        serving: t(`foods.${food.key}.serving`),
                        ounces: food.ounces,
                        water: t(`foods.${food.key}.water`),
                      })}
                    </small>
                  </span>
                </output>
              </div>

              <p className="tw:mt-5 tw:max-w-4xl tw:text-sm tw:leading-6 tw:text-[#c8e9f8]">{t("result.guidance")}</p>
            </div>

            <aside
              className="waterCheckFoodNotes tw:mt-7 tw:rounded-3xl tw:p-7 tw:sm:p-9"
              aria-labelledby="water-check-food-notes-title"
            >
              <div className="tw:flex tw:items-center tw:gap-3 tw:text-[#2f7a55]">
                <Salad aria-hidden="true" size={20} />
                <p className="tw:text-xs tw:font-bold tw:uppercase tw:tracking-[0.18em]">{t("foodNotes.kicker")}</p>
              </div>
              <h2
                id="water-check-food-notes-title"
                className="tw:mt-4 tw:font-serif tw:text-3xl tw:leading-tight tw:tracking-[-0.03em] tw:text-[#1f3b2e] tw:sm:text-4xl"
              >
                {t("foodNotes.title")}
              </h2>
              <div className="waterCheckFoodNotesGrid">
                <p>
                  <Trans t={t} i18nKey="foodNotes.sameMolecule" components={{ strong: <strong /> }} />
                </p>
                <p>
                  <Trans t={t} i18nKey="foodNotes.slowRelease" components={{ strong: <strong /> }} />
                </p>
                <p>
                  <Trans t={t} i18nKey="foodNotes.electrolytes" components={{ strong: <strong /> }} />
                </p>
                <p>
                  <Trans t={t} i18nKey="foodNotes.glycogen" components={{ strong: <strong /> }} />
                </p>
              </div>
              <p className="waterCheckFoodNotesCaveat">{t("foodNotes.caveat")}</p>
            </aside>

            <section
              className="waterCheckInlineGrace tw:mt-7 tw:rounded-3xl tw:p-7 tw:sm:p-9"
              aria-labelledby="water-grace-title"
            >
              <div className="tw:flex tw:items-center tw:gap-3 tw:text-[#8b5f83]">
                <Heart aria-hidden="true" size={21} />
                <p className="tw:text-xs tw:font-bold tw:uppercase tw:tracking-[0.18em]">{t("grace.kicker")}</p>
              </div>
              <h2
                id="water-grace-title"
                className="tw:mt-4 tw:font-serif tw:text-3xl tw:leading-tight tw:tracking-[-0.03em] tw:text-[#432f47] tw:sm:text-4xl"
              >
                {t("grace.title")}
              </h2>
              <p className="tw:mt-5 tw:max-w-4xl tw:text-base tw:leading-8 tw:text-[#655267] tw:sm:text-lg">{t("grace.body")}</p>
            </section>

            <aside
              className="waterCheckOverhydration tw:mt-7 tw:rounded-3xl tw:p-7 tw:sm:p-9"
              aria-labelledby="water-overhydration-title"
            >
              <div className="tw:flex tw:items-start tw:gap-4">
                <span className="waterCheckWarningIcon" aria-hidden="true">
                  <AlertTriangle size={23} />
                </span>
                <div>
                  <h3 id="water-overhydration-title" className="tw:text-xl tw:font-bold tw:text-[#7f1d1d]">
                    {t("overhydration.title")}
                  </h3>
                  <div className="tw:mt-4 tw:grid tw:gap-4 tw:text-sm tw:leading-7 tw:text-[#7f3030] tw:sm:text-base">
                    <p>{t("overhydration.kidneys")}</p>
                    <p>{t("overhydration.pacing")}</p>
                  </div>
                  <p className="tw:mt-5 tw:text-xs tw:italic tw:leading-5 tw:text-[#9b4545]">
                    <Trans
                      t={t}
                      i18nKey="overhydration.sources"
                      components={{
                        nih: <SourceLink href="https://www.ncbi.nlm.nih.gov/books/NBK572128/" />,
                        academies: <SourceLink href="https://www.nationalacademies.org/read/10925/chapter/6" />,
                      }}
                    />
                  </p>
                </div>
              </div>
            </aside>

            {(isLutealPhase || age >= 45 || isHotOrHumid || heightAdjustment < 0 || sex !== "unspecified") && (
              <aside
                className="waterCheckEvidenceNotes tw:mt-8 tw:rounded-3xl tw:border tw:border-[#dfd1df] tw:bg-[#f4eff5] tw:p-6 tw:sm:p-8"
                aria-labelledby="water-check-notes-title"
              >
                <div className="tw:flex tw:items-center tw:gap-3">
                  <Info aria-hidden="true" size={22} color="#0f7cd5" />
                  <h3 id="water-check-notes-title" className="tw:text-lg tw:font-bold tw:text-[#082d52]">
                    {t("notes.title")}
                  </h3>
                </div>
                <div className="tw:mt-5 tw:grid tw:gap-4">
                  {sex !== "unspecified" && (
                    <p>
                      <Trans
                        t={t}
                        i18nKey={sex === "man" ? "notes.sexMan" : "notes.sexWoman"}
                        components={{ strong: <strong /> }}
                      />
                    </p>
                  )}
                  {heightAdjustment < 0 && (
                    <p>
                      <Trans t={t} i18nKey="notes.height" components={{ strong: <strong /> }} />
                    </p>
                  )}
                  {isLutealPhase && (
                    <p>
                      <Trans t={t} i18nKey="notes.cycle" components={{ strong: <strong /> }} />
                    </p>
                  )}
                  {age >= 45 && (
                    <p>
                      <Trans t={t} i18nKey="notes.age" components={{ strong: <strong /> }} />
                    </p>
                  )}
                  {isHotOrHumid && (
                    <p>
                      <Trans t={t} i18nKey="notes.heat" components={{ strong: <strong /> }} />
                    </p>
                  )}
                </div>
              </aside>
            )}

            <div className="waterCheckSources tw:mt-6 tw:flex tw:flex-wrap tw:items-center tw:gap-x-5 tw:gap-y-2 tw:text-xs tw:font-bold tw:text-[#47718d]">
              <span className="tw:inline-flex tw:items-center tw:gap-2">
                <Baby aria-hidden="true" size={16} /> {t("evidence.label")}
              </span>
              <a href="https://www.nationalacademies.org/read/10925/chapter/6" target="_blank" rel="noopener noreferrer">
                {t("evidence.academies")}
              </a>
              <a
                href="https://www.health.harvard.edu/healthy-aging-and-longevity/using-food-to-stay-hydrated"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("evidence.harvard")}
              </a>
              <a href="https://pubmed.ncbi.nlm.nih.gov/3354712/" target="_blank" rel="noopener noreferrer">
                {t("evidence.cycle")}
              </a>
              <a href="https://pubmed.ncbi.nlm.nih.gov/24492487/" target="_blank" rel="noopener noreferrer">
                {t("evidence.menopause")}
              </a>
              <a
                href="https://www.cdc.gov/niosh/heat-stress/recommendations/index.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("evidence.niosh")}
              </a>
            </div>
          </div>
        </section>

        <WaterCheckApp />

        <section className="waterCheckTipsSection tw:px-5 tw:py-24 tw:sm:px-8" aria-labelledby="water-tips-title">
          <div className="tw:mx-auto tw:max-w-6xl">
            <div className="tw:max-w-2xl">
              <p className="tw:text-sm tw:font-bold tw:uppercase tw:tracking-[0.18em] tw:text-[#0f7cd5]">{t("tips.kicker")}</p>
              <h2
                id="water-tips-title"
                className="tw:mt-3 tw:font-serif tw:text-4xl tw:leading-tight tw:tracking-[-0.03em] tw:text-[#082d52] tw:sm:text-5xl"
              >
                {t("tips.title")}
              </h2>
            </div>
            <div className="tw:mt-8 tw:grid tw:gap-3 tw:md:grid-cols-3">
              {TIPS.map(({ id, Icon }) => (
                <article
                  className="tw:rounded-[1.1rem] tw:border tw:border-[#d0eaf5] tw:bg-white tw:p-4 tw:shadow-[0_10px_28px_rgba(23,94,132,0.06)]"
                  key={id}
                >
                  <div className="tw:flex tw:items-center tw:gap-2.5">
                    <Icon aria-hidden="true" color="#0f7cd5" size={18} strokeWidth={1.8} />
                    <h3 className="tw:text-sm tw:font-bold tw:text-[#082d52]">{t(`tips.${id}.title`)}</h3>
                  </div>
                  <p className="tw:mt-2 tw:text-xs tw:leading-5 tw:text-[#47718d]">{t(`tips.${id}.body`)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="waterCheckAuthorSection tw:px-5 tw:py-24 tw:sm:px-8" aria-labelledby="water-author-title">
          <div className="tw:mx-auto tw:max-w-6xl">
            <div className="tw:max-w-3xl">
              <p className="tw:text-sm tw:font-bold tw:uppercase tw:tracking-[0.18em] tw:text-[#8b5f83]">{t("author.kicker")}</p>
              <h2
                id="water-author-title"
                className="tw:mt-4 tw:font-serif tw:text-4xl tw:leading-tight tw:tracking-[-0.03em] tw:text-[#3f3046] tw:sm:text-5xl"
              >
                {t("author.title")}
              </h2>
              <div className="tw:mt-7 tw:grid tw:gap-5 tw:text-lg tw:leading-8 tw:text-[#67566b]">
                <p>{t("author.athlete")}</p>
                <p>{t("author.purpose")}</p>
                <p>{t("author.technology")}</p>
                <p>{t("author.faith")}</p>
                <p className="tw:font-bold tw:text-[#3f3046]">{t("author.motto")}</p>
                <p className="waterCheckAuthorDate">
                  <time dateTime="2021-03-15">{t("author.date")}</time>
                </p>
                <a className="waterCheckFounderButton" href="/denzel-rigaud" onClick={onNavigate}>
                  <span className="waterCheckFounderLabel waterCheckFounderLabelTop">{t("author.founderPage")}</span>
                  <span className="waterCheckFounderLabel waterCheckFounderLabelBottom" aria-hidden="true">
                    Denzel Rigaud
                  </span>
                  <svg className="waterCheckFounderSurf" viewBox="0 0 2400 800" aria-hidden="true" focusable="false">
                    <defs>
                      <linearGradient id="water-check-surf-grad" x1="50%" y1="0%" x2="50%" y2="100%">
                        <stop offset="0%" stopColor="hsl(37, 99%, 67%)" />
                        <stop offset="100%" stopColor="hsl(316, 73%, 52%)" />
                      </linearGradient>
                    </defs>
                    <g transform="matrix(1,0,0,1,0,-91.0877685546875)" fill="url(#water-check-surf-grad)">
                      <path
                        opacity="0.05"
                        transform="matrix(1,0,0,1,0,35)"
                        d="M 0 305.9828838196134 Q 227.6031525693441 450 600 302.17553022897005 Q 1010.7738828515054 450 1200 343.3024459932802 Q 1379.4406250195766 450 1800 320.38902780838214 Q 2153.573162029817 450 2400 314.38564046970816 L 2400 800 L 0 800 L 0 340.3112176762882 Z"
                      />
                      <path
                        opacity="0.21"
                        transform="matrix(1,0,0,1,0,70)"
                        d="M 0 305.9828838196134 Q 227.6031525693441 450 600 302.17553022897005 Q 1010.7738828515054 450 1200 343.3024459932802 Q 1379.4406250195766 450 1800 320.38902780838214 Q 2153.573162029817 450 2400 314.38564046970816 L 2400 800 L 0 800 L 0 340.3112176762882 Z"
                      />
                      <path
                        opacity="0.37"
                        transform="matrix(1,0,0,1,0,105)"
                        d="M 0 305.9828838196134 Q 227.6031525693441 450 600 302.17553022897005 Q 1010.7738828515054 450 1200 343.3024459932802 Q 1379.4406250195766 450 1800 320.38902780838214 Q 2153.573162029817 450 2400 314.38564046970816 L 2400 800 L 0 800 L 0 340.3112176762882 Z"
                      />
                      <path
                        opacity="0.53"
                        transform="matrix(1,0,0,1,0,140)"
                        d="M 0 305.9828838196134 Q 227.6031525693441 450 600 302.17553022897005 Q 1010.7738828515054 450 1200 343.3024459932802 Q 1379.4406250195766 450 1800 320.38902780838214 Q 2153.573162029817 450 2400 314.38564046970816 L 2400 800 L 0 800 L 0 340.3112176762882 Z"
                      />
                      <path
                        opacity="0.68"
                        transform="matrix(1,0,0,1,0,175)"
                        d="M 0 305.9828838196134 Q 227.6031525693441 450 600 302.17553022897005 Q 1010.7738828515054 450 1200 343.3024459932802 Q 1379.4406250195766 450 1800 320.38902780838214 Q 2153.573162029817 450 2400 314.38564046970816 L 2400 800 L 0 800 L 0 340.3112176762882 Z"
                      />
                      <path
                        opacity="0.84"
                        transform="matrix(1,0,0,1,0,210)"
                        d="M 0 305.9828838196134 Q 227.6031525693441 450 600 302.17553022897005 Q 1010.7738828515054 450 1200 343.3024459932802 Q 1379.4406250195766 450 1800 320.38902780838214 Q 2153.573162029817 450 2400 314.38564046970816 L 2400 800 L 0 800 L 0 340.3112176762882 Z"
                      />
                      <path
                        opacity="1"
                        transform="matrix(1,0,0,1,0,245)"
                        d="M 0 305.9828838196134 Q 227.6031525693441 450 600 302.17553022897005 Q 1010.7738828515054 450 1200 343.3024459932802 Q 1379.4406250195766 450 1800 320.38902780838214 Q 2153.573162029817 450 2400 314.38564046970816 L 2400 800 L 0 800 L 0 340.3112176762882 Z"
                      />
                    </g>
                  </svg>
                  <svg className="waterCheckFounderWave" viewBox="0 0 1440 320" aria-hidden="true" focusable="false">
                    <path d="M0,288L9.2,250.7C18.5,213,37,139,55,133.3C73.8,128,92,192,111,224C129.2,256,148,256,166,256C184.6,256,203,256,222,250.7C240,245,258,235,277,213.3C295.4,192,314,160,332,170.7C350.8,181,369,235,388,229.3C406.2,224,425,160,443,122.7C461.5,85,480,75,498,74.7C516.9,75,535,85,554,101.3C572.3,117,591,139,609,170.7C627.7,203,646,245,665,256C683.1,267,702,245,720,245.3C738.5,245,757,267,775,266.7C793.8,267,812,245,831,234.7C849.2,224,868,224,886,218.7C904.6,213,923,203,942,170.7C960,139,978,85,997,53.3C1015.4,21,1034,11,1052,48C1070.8,85,1089,171,1108,197.3C1126.2,224,1145,192,1163,197.3C1181.5,203,1200,245,1218,224C1236.9,203,1255,117,1274,106.7C1292.3,96,1311,160,1329,170.7C1347.7,181,1366,139,1385,128C1403.1,117,1422,139,1431,149.3L1440,160L1440,320L1430.8,320C1421.5,320,1403,320,1385,320C1366.2,320,1348,320,1329,320C1310.8,320,1292,320,1274,320C1255.4,320,1237,320,1218,320C1200,320,1182,320,1163,320C1144.6,320,1126,320,1108,320C1089.2,320,1071,320,1052,320C1033.8,320,1015,320,997,320C978.5,320,960,320,942,320C923.1,320,905,320,886,320C867.7,320,849,320,831,320C812.3,320,794,320,775,320C756.9,320,738,320,720,320C701.5,320,683,320,665,320C646.2,320,628,320,609,320C590.8,320,572,320,554,320C535.4,320,517,320,498,320C480,320,462,320,443,320C424.6,320,406,320,388,320C369.2,320,351,320,332,320C313.8,320,295,320,277,320C258.5,320,240,320,222,320C203.1,320,185,320,166,320C147.7,320,129,320,111,320C92.3,320,74,320,55,320C36.9,320,18,320,9,320L0,320Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          className="waterCheckCommunitySection tw:px-5 tw:pb-24 tw:pt-40 tw:text-white tw:sm:px-8"
          aria-labelledby="water-community-title"
        >
          <div className="tw:mx-auto tw:max-w-6xl">
            <div className="tw:flex tw:flex-col tw:items-start tw:justify-between tw:gap-8 tw:md:flex-row tw:md:items-end">
              <div className="tw:max-w-3xl">
                <p className="tw:text-sm tw:font-bold tw:uppercase tw:tracking-[0.18em] tw:text-[#82d6fb]">
                  {t("community.kicker")}
                </p>
                <h2
                  id="water-community-title"
                  className="tw:mt-3 tw:font-serif tw:text-4xl tw:leading-tight tw:tracking-[-0.03em] tw:sm:text-6xl"
                >
                  {t("community.title")}
                </h2>
              </div>
              <a
                className="waterCheckInstagramButton"
                href="https://www.instagram.com/thewatercheck/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("community.instagram")}
                data-instagram-button
              >
                <span className="tw:sr-only">{t("community.instagram")}</span>
                <span className="waterCheckInstagramIcon" aria-hidden="true">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 448 512"
                    height="1.5em"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                  </svg>
                </span>
                <span className="waterCheckInstagramGradient" aria-hidden="true" />
              </a>
            </div>

            <div className="tw:mt-12 tw:grid tw:gap-5 tw:md:grid-cols-3">
              {[1, 2, 3].map((position) => (
                <div
                  className="tw:flex tw:aspect-[9/12] tw:items-end tw:overflow-hidden tw:rounded-[1.75rem] tw:border tw:border-white/15 tw:bg-[radial-gradient(circle_at_35%_20%,rgba(99,201,247,0.22),transparent_42%),linear-gradient(145deg,#0b3658,#061b2d)] tw:p-6"
                  key={position}
                >
                  <div>
                    <AtSign aria-hidden="true" color="#82d6fb" size={24} />
                    <p className="tw:mt-4 tw:font-bold tw:text-white">{t("community.reelSoon")}</p>
                    <p className="tw:mt-2 tw:text-sm tw:text-[#a9d7eb]">{t("community.story", { position })}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
