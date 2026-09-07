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
import "./water-check-page.css";
import { WaterIntro } from "./water-intro";

const ESTIMATE_GUIDANCE =
  "This is an educational planning estimate for adults—not a diagnosis, treatment, or clinical prescription. Food also supplies water, and individual needs vary. Do not force fluids. Ask a healthcare professional about your needs if you are pregnant or breastfeeding, take medicines that affect fluid balance, have a kidney or heart condition, follow a fluid restriction, or have concerning symptoms.";

const GRACE_NOTE =
  "The mirror and the way your clothes fit can change from water retention, digestion, hormones, sleep, and other normal shifts. One bloated day does not define your body. Drink with care, give yourself time, and let curiosity replace shame. Persistent bloating, swelling, rapid weight changes, or symptoms that worry you deserve a conversation with a healthcare professional.";

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

const TIPS = [
  {
    title: "The Schedule",
    body: "Start your morning with water, sip with meals, and let thirst, weather, and activity guide the rest.",
    Icon: Clock3,
  },
  {
    title: "Electrolytes",
    body: "Most people replace electrolytes through regular meals. After long or heavy sweating, choose a balanced electrolyte drink; do not add salt routinely if you have been advised to limit sodium.",
    Icon: Waves,
  },
  {
    title: "The Visual Check",
    body: "Pale yellow urine can be one rough sign of hydration. Food, vitamins, medicines, and health conditions can change color, so it is not a diagnosis.",
    Icon: Eye,
  },
] as const;

const formatOunces = (ounces: number) => (Number.isInteger(ounces) ? String(ounces) : ounces.toFixed(1));
const formatCount = (count: number) => {
  const rounded = count >= 10 ? Math.round(count) : Math.round(count * 2) / 2;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
};

// Roughly a fifth of most people's daily water arrives in food (National Academies; Harvard Health).
const FOOD_WATER_SHARE = 0.2;
const OUNCES_PER_LITER = 33.814;
const OUNCES_PER_BOTTLE = 16.9;

// Approximate fluid ounces of water per serving, from USDA FoodData Central water percentages.
const FOOD_EQUIVALENTS = [
  { key: "watermelon", emoji: "🍉", label: "cups of watermelon", serving: "1 cup diced", ounces: 4.7, water: "92% water" },
  { key: "cucumber", emoji: "🥒", label: "cucumbers", serving: "1 medium", ounces: 9.6, water: "95% water" },
  { key: "strawberries", emoji: "🍓", label: "cups of strawberries", serving: "1 cup", ounces: 4.7, water: "91% water" },
  { key: "oranges", emoji: "🍊", label: "oranges", serving: "1 medium", ounces: 3.9, water: "87% water" },
  { key: "salad", emoji: "🥗", label: "bowls of salad", serving: "2 cups mixed", ounces: 5, water: "about 94% water" },
  { key: "soup", emoji: "🍲", label: "bowls of broth soup", serving: "1 cup", ounces: 7.5, water: "about 92% water" },
  { key: "tomatoes", emoji: "🍅", label: "tomatoes", serving: "1 medium", ounces: 3.9, water: "95% water" },
  { key: "grapes", emoji: "🍇", label: "cups of grapes", serving: "1 cup", ounces: 4.1, water: "81% water" },
  { key: "peaches", emoji: "🍑", label: "peaches", serving: "1 medium", ounces: 4.5, water: "89% water" },
  { key: "cantaloupe", emoji: "🍈", label: "cups of cantaloupe", serving: "1 cup diced", ounces: 4.7, water: "90% water" },
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

const LIFE_STAGE_DETAILS: Record<LifeStage, { adjustment: number; breakdownLabel: string }> = {
  standard: { adjustment: 0, breakdownLabel: "Life-stage adjustment" },
  pregnant: { adjustment: 10, breakdownLabel: "Pregnancy adjustment" },
  breastfeeding: { adjustment: 24, breakdownLabel: "Breastfeeding adjustment" },
};

type WaterCheckPageProps = {
  onNavigate?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

export function WaterCheckPage({ onNavigate }: WaterCheckPageProps = {}) {
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
  const electrolyteGuidance = isHotOrHumid || activity >= 60 ? "Consider after heavy sweat" : "Food usually covers it";
  const displayedWeight = weightUnit === "lb" ? weight : Number((weight / POUNDS_PER_KILOGRAM).toFixed(1));
  const weightRange = weightUnit === "lb" ? { min: 80, max: 300, step: 1 } : { min: 36.3, max: 136.1, step: 0.1 };
  const weightLabel = weightUnit === "lb" ? "Weight (lbs)" : "Weight (kg)";
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
                The Water Check
              </p>
              <h1
                id="water-check-title"
                className="tw:max-w-4xl tw:text-balance tw:font-serif tw:text-5xl tw:leading-[0.98] tw:tracking-[-0.045em] tw:sm:text-7xl tw:lg:text-[5.6rem]"
              >
                Ditch the influencers. Learn your actual biology.
              </h1>
              <p className="tw:mt-8 tw:max-w-2xl tw:text-lg tw:leading-8 tw:text-[#e1f9ff] tw:sm:text-xl">
                No sign-ups. Just a practical starting point for your daily hydration.
              </p>
            </div>
            <div className="waterCheckLogoStage tw:justify-self-center tw:lg:justify-self-end">
              <a href="#calculator" aria-label="Use the Water Check calculator" data-water-logo-orb>
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
                <span className="tw:sr-only">Use the Water Check calculator</span>
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
              <p className="tw:text-sm tw:font-bold tw:uppercase tw:tracking-[0.18em] tw:text-[#0f7cd5]">Hydration calculator</p>
              <h2 className="tw:mt-3 tw:font-serif tw:text-4xl tw:leading-tight tw:tracking-[-0.03em] tw:text-[#082d52] tw:sm:text-5xl">
                Start with the numbers you know.
              </h2>
            </div>

            <fieldset className="waterCheckUnitSwitch tw:mb-6">
              <legend>Weight unit</legend>
              <label>
                <input
                  type="radio"
                  name="water-check-weight-unit"
                  value="lb"
                  checked={weightUnit === "lb"}
                  onChange={() => setWeightUnit("lb")}
                />
                <span>Pounds (lb)</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="water-check-weight-unit"
                  value="kg"
                  checked={weightUnit === "kg"}
                  onChange={() => setWeightUnit("kg")}
                />
                <span>Kilograms (kg)</span>
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
                  aria-valuetext={`${displayedWeight} ${weightUnit === "lb" ? "pounds" : "kilograms"}`}
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
                  <legend>Height</legend>
                  {weightUnit === "lb" ? (
                    <>
                      <label htmlFor="water-check-height-feet">
                        <span>Height (ft)</span>
                        <input
                          id="water-check-height-feet"
                          type="number"
                          inputMode="numeric"
                          min={3}
                          max={8}
                          step={1}
                          value={heightFeet}
                          onChange={(event) => {
                            const feet = Math.min(8, Math.max(3, Number(event.currentTarget.value) || 0));
                            setHeightInches(feet * 12 + heightRemainderInches);
                          }}
                        />
                      </label>
                      <label htmlFor="water-check-height-inches">
                        <span>Height (in)</span>
                        <input
                          id="water-check-height-inches"
                          type="number"
                          inputMode="numeric"
                          min={0}
                          max={11}
                          step={1}
                          value={heightRemainderInches}
                          onChange={(event) => {
                            const inches = Math.min(11, Math.max(0, Number(event.currentTarget.value) || 0));
                            setHeightInches(heightFeet * 12 + inches);
                          }}
                        />
                      </label>
                    </>
                  ) : (
                    <label htmlFor="water-check-height-cm">
                      <span>Height (cm)</span>
                      <input
                        id="water-check-height-cm"
                        type="number"
                        inputMode="numeric"
                        min={120}
                        max={230}
                        step={1}
                        value={heightCentimeters}
                        onChange={(event) => {
                          const centimeters = Math.min(230, Math.max(120, Number(event.currentTarget.value) || 0));
                          setHeightInches(Math.round(centimeters / CENTIMETERS_PER_INCH));
                        }}
                      />
                    </label>
                  )}
                  <p>Fluid needs follow lean mass, so height matters most when weight is high for your frame.</p>
                </fieldset>
              </div>

              <div className="tw:rounded-3xl tw:bg-[#f5eff4] tw:p-6">
                <div className="tw:flex tw:items-baseline tw:justify-between tw:gap-4">
                  <label className="tw:text-base tw:font-bold tw:text-[#082d52]" htmlFor="water-check-activity">
                    Daily Activity (minutes)
                  </label>
                  <span className="tw:text-2xl tw:font-bold tw:text-[#0f7cd5]" aria-hidden="true">
                    {activity} min
                  </span>
                </div>
                <input
                  id="water-check-activity"
                  type="range"
                  min="0"
                  max="120"
                  step="1"
                  value={activity}
                  aria-valuetext={`${activity} minutes`}
                  onChange={(event) => setActivity(Number(event.currentTarget.value))}
                />
                <div className="tw:flex tw:justify-between tw:text-xs tw:font-bold tw:text-[#47718d]" aria-hidden="true">
                  <span>0 min</span>
                  <span>120 min</span>
                </div>
              </div>
            </div>

            <fieldset className="waterCheckFactors tw:mt-8 tw:rounded-3xl tw:border tw:border-[#e3d5df] tw:bg-[#fbf8fa] tw:p-6 tw:sm:p-8">
              <legend className="tw:px-2 tw:text-lg tw:font-bold tw:text-[#082d52]">Factors that can change fluid needs</legend>
              <p className="tw:mb-6 tw:max-w-3xl tw:text-sm tw:leading-6 tw:text-[#47718d]">
                We apply a number only where a defensible daily adjustment exists. The other answers personalize your guidance
                without pretending the science supports an exact dose.
              </p>

              <div className="tw:grid tw:gap-5 tw:md:grid-cols-2">
                <label className="waterCheckField" htmlFor="water-check-age">
                  <span>
                    <strong>Age</strong>
                    <small>Age provides context; it does not diagnose menopause.</small>
                  </span>
                  <input
                    id="water-check-age"
                    aria-label="Age"
                    type="number"
                    min="18"
                    max="100"
                    inputMode="numeric"
                    value={age}
                    onChange={(event) => setAge(Math.min(100, Math.max(18, Number(event.currentTarget.value) || 18)))}
                  />
                </label>

                <label className="waterCheckField" htmlFor="water-check-life-stage">
                  <span>
                    <strong>Life stage</strong>
                    <small>Uses a transparent pregnancy or milk-production adjustment.</small>
                  </span>
                  <select
                    id="water-check-life-stage"
                    aria-label="Life stage"
                    value={lifeStage}
                    onChange={(event) => setLifeStage(event.currentTarget.value as LifeStage)}
                  >
                    <option value="standard">Standard</option>
                    <option value="pregnant">Pregnant</option>
                    <option value="breastfeeding">Breastfeeding</option>
                  </select>
                </label>

                <label className="waterCheckField" htmlFor="water-check-sex">
                  <span>
                    <strong>Sex</strong>
                    <small>Optional. Refines the ideal-weight and reference-intake math.</small>
                  </span>
                  <select
                    id="water-check-sex"
                    aria-label="Sex"
                    value={sex}
                    onChange={(event) => setSex(event.currentTarget.value as Sex)}
                  >
                    <option value="unspecified">Prefer not to say</option>
                    <option value="woman">Woman</option>
                    <option value="man">Man</option>
                  </select>
                </label>

                <label className="waterCheckToggle" htmlFor="water-check-luteal">
                  <span className="waterCheckToggleIcon" aria-hidden="true">
                    <CalendarDays size={22} />
                  </span>
                  <span className="tw:flex-1">
                    <strong>Week before your period</strong>
                    <small>Tracks luteal-phase water retention and hormonal bloating. No fixed add applies to everyone.</small>
                  </span>
                  <input
                    id="water-check-luteal"
                    aria-label="Week before your period"
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
                    <strong>Hot or humid conditions</strong>
                    <small>Heat guidance depends on exposure and sweat—not location alone.</small>
                  </span>
                  <input
                    id="water-check-heat"
                    aria-label="Hot or humid conditions"
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
                Your Daily Goal: {formatOunces(ounces)} Ounces
              </output>
              <fieldset className="tw:mt-7 tw:grid tw:gap-3 tw:sm:grid-cols-2 tw:lg:grid-cols-4">
                <legend className="tw:sr-only">Calculation breakdown</legend>
                <div className="waterCheckResultPart">
                  <span>Weight baseline</span>
                  <strong>{formatOunces(weightBaseline)} oz</strong>
                </div>
                <div className="waterCheckResultPart">
                  <span>Height and build</span>
                  <strong>{heightAdjustment < 0 ? `−${formatOunces(Math.abs(heightAdjustment))} oz` : "+0 oz"}</strong>
                </div>
                <div className="waterCheckResultPart">
                  <span>Sex reference</span>
                  <strong>
                    {sex === "unspecified"
                      ? "Not set"
                      : `${sexAdjustment < 0 ? "−" : "+"}${formatOunces(Math.abs(sexAdjustment))} oz`}
                  </strong>
                </div>
                <div className="waterCheckResultPart">
                  <span>Activity adjustment</span>
                  <strong>+{formatOunces(activityAdjustment)} oz</strong>
                </div>
                <div className="waterCheckResultPart">
                  <span>{lifeStageDetails.breakdownLabel}</span>
                  <strong>+{formatOunces(lifeStageAdjustment)} oz</strong>
                </div>
                {isLutealPhase && (
                  <div className="waterCheckResultPart waterCheckResultPartWarm">
                    <span>Luteal phase guidance</span>
                    <strong>No fixed +oz</strong>
                  </div>
                )}
                <div className="waterCheckResultPart waterCheckResultPartWarm">
                  <span>Electrolyte check</span>
                  <strong>{electrolyteGuidance}</strong>
                </div>
              </fieldset>
              <div className="waterCheckEquivalents tw:mt-7">
                <p className="waterCheckEquivalentsTitle">
                  <GlassWater aria-hidden="true" size={18} />
                  That's about
                </p>
                <ul className="waterCheckEquivalentsRow">
                  <li>
                    <strong>{formatCount(cups)} cups</strong>
                    <span>8 oz each</span>
                  </li>
                  <li>
                    <strong>{liters.toFixed(1)} liters</strong>
                    <span>metric</span>
                  </li>
                  <li>
                    <strong>{formatCount(bottles)} bottles</strong>
                    <span>16.9 oz size</span>
                  </li>
                </ul>
              </div>

              <div className="waterCheckEatYourWater tw:mt-6" data-eat-your-water>
                <div className="waterCheckEatHeader">
                  <span className="waterCheckEatIcon" aria-hidden="true">
                    <Salad size={22} />
                  </span>
                  <div>
                    <p className="waterCheckEatKicker">Eat your water</p>
                    <h3 className="waterCheckEatTitle">Not all of it has to come from a glass.</h3>
                  </div>
                </div>
                <p className="waterCheckEatCopy">
                  About a fifth of most people's daily water arrives in food. Most fresh fruits and vegetables are 70 to 95
                  percent water, and once it reaches your bloodstream it hydrates you exactly like a drink does.
                </p>
                <div className="waterCheckEatSplit">
                  <div className="waterCheckEatSplitCard">
                    <span>Drink</span>
                    <strong>≈ {formatOunces(Math.round(drinkOunces * 10) / 10)} oz</strong>
                    <small>{formatCount(drinkOunces / 8)} cups of water, tea, or milk</small>
                  </div>
                  <div className="waterCheckEatSplitCard waterCheckEatSplitCardFood">
                    <span>Eat</span>
                    <strong>≈ {formatOunces(Math.round(foodOunces * 10) / 10)} oz</strong>
                    <small>from water-rich food</small>
                  </div>
                </div>
                <fieldset className="waterCheckFoodChips">
                  <legend>Picture the food share as</legend>
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
                        {item.label}
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
                      ≈ {formatCount(foodCount)} {food.label}
                    </strong>
                    <small>
                      {food.serving} is about {food.ounces} oz of water ({food.water}).
                    </small>
                  </span>
                </output>
              </div>

              <p className="tw:mt-5 tw:max-w-4xl tw:text-sm tw:leading-6 tw:text-[#c8e9f8]">{ESTIMATE_GUIDANCE}</p>
            </div>

            <aside
              className="waterCheckFoodNotes tw:mt-7 tw:rounded-3xl tw:p-7 tw:sm:p-9"
              aria-labelledby="water-check-food-notes-title"
            >
              <div className="tw:flex tw:items-center tw:gap-3 tw:text-[#2f7a55]">
                <Salad aria-hidden="true" size={20} />
                <p className="tw:text-xs tw:font-bold tw:uppercase tw:tracking-[0.18em]">Why food water counts</p>
              </div>
              <h2
                id="water-check-food-notes-title"
                className="tw:mt-4 tw:font-serif tw:text-3xl tw:leading-tight tw:tracking-[-0.03em] tw:text-[#1f3b2e] tw:sm:text-4xl"
              >
                Water from a watermelon is the same water.
              </h2>
              <div className="waterCheckFoodNotesGrid">
                <p>
                  <strong>Same molecule.</strong> H2O from a cucumber and H2O from a tap are identical. Once it crosses your gut
                  into your bloodstream, your body sends it to your muscles the same way.
                </p>
                <p>
                  <strong>Slow release.</strong> Water in produce is held inside fibers and cell walls, so it's absorbed more
                  gradually than a fast-chugged glass, which your kidneys tend to pass quickly.
                </p>
                <p>
                  <strong>Comes with electrolytes.</strong> Cucumbers, spinach, melon, and berries carry potassium and magnesium,
                  minerals your cells use to hold onto water.
                </p>
                <p>
                  <strong>Fuel and storage together.</strong> Muscles store carbohydrate as glycogen, and every gram of glycogen
                  is stored with roughly three grams of water. Water-rich, carb-rich foods deliver both.
                </p>
              </div>
              <p className="waterCheckFoodNotesCaveat">
                You still need to drink. Food usually covers about a fifth of the total; the rest comes from water and other
                beverages. Dried fruit, nuts, and bread carry very little water.
              </p>
            </aside>

            <section
              className="waterCheckInlineGrace tw:mt-7 tw:rounded-3xl tw:p-7 tw:sm:p-9"
              aria-labelledby="water-grace-title"
            >
              <div className="tw:flex tw:items-center tw:gap-3 tw:text-[#8b5f83]">
                <Heart aria-hidden="true" size={21} />
                <p className="tw:text-xs tw:font-bold tw:uppercase tw:tracking-[0.18em]">Body kindness</p>
              </div>
              <h2
                id="water-grace-title"
                className="tw:mt-4 tw:font-serif tw:text-3xl tw:leading-tight tw:tracking-[-0.03em] tw:text-[#432f47] tw:sm:text-4xl"
              >
                A Quick Note on Giving Yourself Grace
              </h2>
              <p className="tw:mt-5 tw:max-w-4xl tw:text-base tw:leading-8 tw:text-[#655267] tw:sm:text-lg">{GRACE_NOTE}</p>
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
                    The Danger of Forced Hydration
                  </h3>
                  <div className="tw:mt-4 tw:grid tw:gap-4 tw:text-sm tw:leading-7 tw:text-[#7f3030] tw:sm:text-base">
                    <p>
                      Your kidneys need time to clear water. During prolonged exercise, drinking faster than you lose fluid can
                      dilute blood sodium and cause exercise-associated hyponatremia. Early symptoms can include headache, nausea,
                      dizziness, fatigue, or confusion. Severe cases can cause brain swelling, seizures, coma, and death.
                    </p>
                    <p>
                      Do not chase this estimate by chugging. Spread drinks across the day. During exercise, match intake to
                      thirst, conditions, and your own sweat losses. Seek urgent medical care for confusion, seizure, collapse, or
                      severe symptoms.
                    </p>
                  </div>
                  <p className="tw:mt-5 tw:text-xs tw:italic tw:leading-5 tw:text-[#9b4545]">
                    Sources:{" "}
                    <a href="https://www.ncbi.nlm.nih.gov/books/NBK572128/" target="_blank" rel="noopener noreferrer">
                      NIH exercise-associated hyponatremia guidance
                    </a>{" "}
                    and{" "}
                    <a href="https://www.nationalacademies.org/read/10925/chapter/6" target="_blank" rel="noopener noreferrer">
                      National Academies fluid recommendations
                    </a>
                    .
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
                    Your evidence notes
                  </h3>
                </div>
                <div className="tw:mt-5 tw:grid tw:gap-4">
                  {sex !== "unspecified" && (
                    <p>
                      <strong>Sex:</strong> National Academies reference intakes are about 3.7 liters of total water a day for men
                      and 2.7 for women. Body weight explains most of that gap, so the remainder appears here as a 4 percent{" "}
                      {sex === "man" ? "increase" : "decrease"} to the weight baseline, and the height-and-build check uses the{" "}
                      {sex === "man" ? "male" : "female"} ideal-weight formula.
                    </p>
                  )}
                  {heightAdjustment < 0 && (
                    <p>
                      <strong>Height and build:</strong> Fluid needs track lean mass more than total weight. Because your weight
                      sits above the usual range for your height, the estimate uses adjusted body weight (ideal weight plus 40
                      percent of the difference), a common clinical convention. It is a rough planning number, not a judgment
                      about your body.
                    </p>
                  )}
                  {isLutealPhase && (
                    <p>
                      <strong>Cycle phase:</strong> Cycle-related fluid shifts are real, but studies do not establish a universal
                      fixed-ounce increase. No automatic ounces were added. Regular meals usually cover electrolytes; magnesium or
                      potassium supplements are not a universal recommendation.
                    </p>
                  )}
                  {age >= 45 && (
                    <p>
                      <strong>Age and menopause:</strong> Age alone does not determine menopause status. Hormonal changes can
                      affect thirst and fluid regulation, but there is no validated “over 45” ounce adjustment, so your age did
                      not change the total.
                    </p>
                  )}
                  {isHotOrHumid && (
                    <p>
                      <strong>Heat:</strong> A fixed climate bonus can under- or overestimate your needs. For moderate work in
                      heat under two hours, NIOSH advises about 8 ounces every 15–20 minutes; longer heavy sweating needs an
                      individualized replacement plan.
                    </p>
                  )}
                </div>
              </aside>
            )}

            <div className="waterCheckSources tw:mt-6 tw:flex tw:flex-wrap tw:items-center tw:gap-x-5 tw:gap-y-2 tw:text-xs tw:font-bold tw:text-[#47718d]">
              <span className="tw:inline-flex tw:items-center tw:gap-2">
                <Baby aria-hidden="true" size={16} /> Evidence:
              </span>
              <a href="https://www.nationalacademies.org/read/10925/chapter/6" target="_blank" rel="noopener noreferrer">
                National Academies water intake guidance
              </a>
              <a
                href="https://www.health.harvard.edu/healthy-aging-and-longevity/using-food-to-stay-hydrated"
                target="_blank"
                rel="noopener noreferrer"
              >
                Harvard Health on food and hydration
              </a>
              <a href="https://pubmed.ncbi.nlm.nih.gov/3354712/" target="_blank" rel="noopener noreferrer">
                Menstrual-cycle osmoregulation study
              </a>
              <a href="https://pubmed.ncbi.nlm.nih.gov/24492487/" target="_blank" rel="noopener noreferrer">
                Menopause fluid-regulation review
              </a>
              <a
                href="https://www.cdc.gov/niosh/heat-stress/recommendations/index.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                CDC/NIOSH heat guidance
              </a>
            </div>
          </div>
        </section>

        <section className="waterCheckTipsSection tw:px-5 tw:py-24 tw:sm:px-8" aria-labelledby="water-tips-title">
          <div className="tw:mx-auto tw:max-w-6xl">
            <div className="tw:max-w-2xl">
              <p className="tw:text-sm tw:font-bold tw:uppercase tw:tracking-[0.18em] tw:text-[#0f7cd5]">Useful, not obsessive</p>
              <h2
                id="water-tips-title"
                className="tw:mt-3 tw:font-serif tw:text-4xl tw:leading-tight tw:tracking-[-0.03em] tw:text-[#082d52] tw:sm:text-5xl"
              >
                Three checks for real life.
              </h2>
            </div>
            <div className="tw:mt-8 tw:grid tw:gap-3 tw:md:grid-cols-3">
              {TIPS.map(({ title, body, Icon }) => (
                <article
                  className="tw:rounded-[1.1rem] tw:border tw:border-[#d0eaf5] tw:bg-white tw:p-4 tw:shadow-[0_10px_28px_rgba(23,94,132,0.06)]"
                  key={title}
                >
                  <div className="tw:flex tw:items-center tw:gap-2.5">
                    <Icon aria-hidden="true" color="#0f7cd5" size={18} strokeWidth={1.8} />
                    <h3 className="tw:text-sm tw:font-bold tw:text-[#082d52]">{title}</h3>
                  </div>
                  <p className="tw:mt-2 tw:text-xs tw:leading-5 tw:text-[#47718d]">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="waterCheckAuthorSection tw:px-5 tw:py-24 tw:sm:px-8" aria-labelledby="water-author-title">
          <div className="tw:mx-auto tw:max-w-6xl">
            <div className="tw:max-w-3xl">
              <p className="tw:text-sm tw:font-bold tw:uppercase tw:tracking-[0.18em] tw:text-[#8b5f83]">
                From the person who built it
              </p>
              <h2
                id="water-author-title"
                className="tw:mt-4 tw:font-serif tw:text-4xl tw:leading-tight tw:tracking-[-0.03em] tw:text-[#3f3046] tw:sm:text-5xl"
              >
                Why I Built This (And Why You Shouldn't Just Listen To Me)
              </h2>
              <div className="tw:mt-7 tw:grid tw:gap-5 tw:text-lg tw:leading-8 tw:text-[#67566b]">
                <p>
                  My name is Denzel Rigaud. I spent more than nine years running the 400 meters and hurdles, so hydration became
                  part of how I trained, recovered, and learned to read my body.
                </p>
                <p>
                  I built The Water Check to help you hear your body above online noise. I do not want you to treat my experience
                  as a prescription. Your biology, environment, medical history, and life stage shape what you need.
                </p>
                <p>
                  Technology isn't for us to doom-scroll and live other people's lives. It should keep our lives productive and
                  better our spirit, soul, mind, and flesh, so we become the best version of who we want to be. So stop listening
                  to everyone else, because what works for you, works for you.
                </p>
                <p>
                  Learn your patterns and bring medical concerns to a qualified professional. Caring for your physical vessel can
                  bring you closer to yourself and to God, who placed a spark in each of us worth tending.
                </p>
                <p className="tw:font-bold tw:text-[#3f3046]">Don't follow influencers. Learn yourself.</p>
                <p className="waterCheckAuthorDate">
                  <time dateTime="2021-03-15">March 15, 2021</time>
                </p>
                <a className="waterCheckFounderButton" href="/denzel-rigaud" onClick={onNavigate}>
                  <span className="waterCheckFounderLabel waterCheckFounderLabelTop">Founder Page</span>
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
                <p className="tw:text-sm tw:font-bold tw:uppercase tw:tracking-[0.18em] tw:text-[#82d6fb]">Keep it human</p>
                <h2
                  id="water-community-title"
                  className="tw:mt-3 tw:font-serif tw:text-4xl tw:leading-tight tw:tracking-[-0.03em] tw:sm:text-6xl"
                >
                  Join the actual community.
                </h2>
              </div>
              <a
                className="waterCheckInstagramButton"
                href="https://www.instagram.com/thewatercheck/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow @thewatercheck on Instagram"
                data-instagram-button
              >
                <span className="tw:sr-only">Follow @thewatercheck on Instagram</span>
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
                    <p className="tw:mt-4 tw:font-bold tw:text-white">Instagram Reel coming soon</p>
                    <p className="tw:mt-2 tw:text-sm tw:text-[#a9d7eb]">Community story {position}</p>
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
