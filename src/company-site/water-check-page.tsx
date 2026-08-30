import {
  AlertTriangle,
  AtSign,
  Baby,
  CalendarDays,
  Clock3,
  Droplets,
  Eye,
  Flame,
  Heart,
  Info,
  Sparkles,
  Waves,
} from "lucide-react";
import * as React from "react";
import "./water-check-page.css";

const ESTIMATE_GUIDANCE =
  "This is an educational planning estimate for adults—not a diagnosis, treatment, or clinical prescription. Food also supplies water, and individual needs vary. Do not force fluids. Ask a healthcare professional about your needs if you are pregnant or breastfeeding, take medicines that affect fluid balance, have a kidney or heart condition, follow a fluid restriction, or have concerning symptoms.";

const GRACE_NOTE =
  "The mirror and the way your clothes fit can change from water retention, digestion, hormones, sleep, and other normal shifts. One bloated day does not define your body. Drink with care, give yourself time, and let curiosity replace shame. Persistent bloating, swelling, rapid weight changes, or symptoms that worry you deserve a conversation with a healthcare professional.";

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

type LifeStage = "standard" | "pregnant" | "breastfeeding";
type WeightUnit = "lb" | "kg";

const POUNDS_PER_KILOGRAM = 2.2046226218;

const LIFE_STAGE_DETAILS: Record<LifeStage, { adjustment: number; breakdownLabel: string }> = {
  standard: { adjustment: 0, breakdownLabel: "Life-stage adjustment" },
  pregnant: { adjustment: 10, breakdownLabel: "Pregnancy adjustment" },
  breastfeeding: { adjustment: 24, breakdownLabel: "Breastfeeding adjustment" },
};

export function WaterCheckPage() {
  const [weight, setWeight] = React.useState(160);
  const [weightUnit, setWeightUnit] = React.useState<WeightUnit>("lb");
  const [activity, setActivity] = React.useState(30);
  const [age, setAge] = React.useState(35);
  const [lifeStage, setLifeStage] = React.useState<LifeStage>("standard");
  const [isLutealPhase, setIsLutealPhase] = React.useState(false);
  const [isHotOrHumid, setIsHotOrHumid] = React.useState(false);
  const weightBaseline = weight / 2;
  const activityAdjustment = (activity / 30) * 12;
  const lifeStageDetails = LIFE_STAGE_DETAILS[lifeStage];
  const lifeStageAdjustment = lifeStageDetails.adjustment;
  const ounces = weightBaseline + activityAdjustment + lifeStageAdjustment;
  const electrolyteGuidance = isHotOrHumid || activity >= 60 ? "Consider after heavy sweat" : "Food usually covers it";
  const displayedWeight = weightUnit === "lb" ? weight : Number((weight / POUNDS_PER_KILOGRAM).toFixed(1));
  const weightRange = weightUnit === "lb" ? { min: 80, max: 300, step: 1 } : { min: 36.3, max: 136.1, step: 0.1 };
  const weightLabel = weightUnit === "lb" ? "Weight (lbs)" : "Weight (kg)";

  return (
    <main data-water-check-page className="waterCheckPage tw:overflow-hidden">
      <section
        className="waterCheckHero tw:relative tw:isolate tw:min-h-[42rem] tw:overflow-hidden tw:px-6 tw:py-24 tw:text-white tw:sm:px-10 tw:lg:px-16"
        aria-labelledby="water-check-title"
      >
        <div
          className="tw:pointer-events-none tw:absolute tw:inset-0 tw:overflow-hidden"
          data-water-decoration
          data-water-field
          aria-hidden="true"
        >
          <span className="waterCheckRipple tw:-right-24 tw:top-12 tw:size-80" />
          <span className="waterCheckRipple tw:-right-6 tw:top-36 tw:size-[28rem]" />
          <span className="waterCheckRipple tw:-left-32 tw:bottom-[-12rem] tw:size-[36rem]" />
          <span className="waterCheckRefraction tw:-inset-x-24 tw:top-1/4 tw:h-64" />
        </div>

        <div className="tw:relative tw:mx-auto tw:grid tw:max-w-7xl tw:items-center tw:gap-14 tw:lg:min-h-[30rem] tw:lg:grid-cols-[minmax(0,1fr)_minmax(19rem,25rem)]">
          <div className="tw:max-w-3xl">
            <div className="tw:mb-7 tw:flex tw:items-center tw:gap-3 tw:text-sm tw:font-bold tw:uppercase tw:tracking-[0.2em] tw:text-[#d7f9ff]">
              <Droplets aria-hidden="true" size={21} strokeWidth={1.8} />
              The Water Check
            </div>
            <h1
              id="water-check-title"
              className="tw:max-w-4xl tw:text-balance tw:font-serif tw:text-5xl tw:leading-[0.98] tw:tracking-[-0.045em] tw:sm:text-7xl tw:lg:text-[5.6rem]"
            >
              Ditch the influencers. Learn your actual baseline.
            </h1>
            <p className="tw:mt-8 tw:max-w-2xl tw:text-lg tw:leading-8 tw:text-[#e1f9ff] tw:sm:text-xl">
              No sign-ups. Just a practical starting point for your daily hydration.
            </p>
          </div>
          <div className="waterCheckLogoStage tw:justify-self-center tw:lg:justify-self-end">
            <a href="#calculator" aria-label="Use the Water Check calculator" data-water-logo-orb>
              <span className="waterCheckLogoRings" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className="waterCheckLogoOrb" aria-hidden="true">
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
              <span className="waterCheckLogoPrompt">
                <span>
                  <strong>Tap the C</strong>
                  <small>Check your baseline</small>
                </span>
                <Droplets aria-hidden="true" size={20} />
              </span>
            </a>
          </div>
        </div>
      </section>

      <section id="calculator" className="waterCheckCalculatorSection tw:relative tw:z-10 tw:-mt-20 tw:px-5 tw:pb-24 tw:sm:px-8">
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
            <p className="tw:mt-5 tw:max-w-4xl tw:text-sm tw:leading-6 tw:text-[#c8e9f8]">{ESTIMATE_GUIDANCE}</p>
          </div>

          <section className="waterCheckInlineGrace tw:mt-7 tw:rounded-3xl tw:p-7 tw:sm:p-9" aria-labelledby="water-grace-title">
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
                    Do not chase this estimate by chugging. Spread drinks across the day. During exercise, match intake to thirst,
                    conditions, and your own sweat losses. Seek urgent medical care for confusion, seizure, collapse, or severe
                    symptoms.
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

          {(isLutealPhase || age >= 45 || isHotOrHumid) && (
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
                {isLutealPhase && (
                  <p>
                    <strong>Cycle phase:</strong> Cycle-related fluid shifts are real, but studies do not establish a universal
                    fixed-ounce increase. No automatic ounces were added. Regular meals usually cover electrolytes; magnesium or
                    potassium supplements are not a universal recommendation.
                  </p>
                )}
                {age >= 45 && (
                  <p>
                    <strong>Age and menopause:</strong> Age alone does not determine menopause status. Hormonal changes can affect
                    thirst and fluid regulation, but there is no validated “over 45” ounce adjustment, so your age did not change
                    the total.
                  </p>
                )}
                {isHotOrHumid && (
                  <p>
                    <strong>Heat:</strong> A fixed climate bonus can under- or overestimate your needs. For moderate work in heat
                    under two hours, NIOSH advises about 8 ounces every 15–20 minutes; longer heavy sweating needs an
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
            <a href="https://pubmed.ncbi.nlm.nih.gov/3354712/" target="_blank" rel="noopener noreferrer">
              Menstrual-cycle osmoregulation study
            </a>
            <a href="https://pubmed.ncbi.nlm.nih.gov/24492487/" target="_blank" rel="noopener noreferrer">
              Menopause fluid-regulation review
            </a>
            <a href="https://www.cdc.gov/niosh/heat-stress/recommendations/index.html" target="_blank" rel="noopener noreferrer">
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
          <div className="tw:mt-12 tw:grid tw:gap-5 tw:md:grid-cols-3">
            {TIPS.map(({ title, body, Icon }) => (
              <article
                className="tw:rounded-[1.75rem] tw:border tw:border-[#d0eaf5] tw:bg-white tw:p-7 tw:shadow-[0_18px_45px_rgba(23,94,132,0.07)]"
                key={title}
              >
                <Icon aria-hidden="true" color="#0f7cd5" size={28} strokeWidth={1.7} />
                <h3 className="tw:mt-8 tw:text-xl tw:font-bold tw:text-[#082d52]">{title}</h3>
                <p className="tw:mt-3 tw:text-base tw:leading-7 tw:text-[#47718d]">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="waterCheckAuthorSection tw:px-5 tw:py-24 tw:sm:px-8" aria-labelledby="water-author-title">
        <div className="tw:mx-auto tw:grid tw:max-w-6xl tw:gap-10 tw:lg:grid-cols-[0.7fr_1.3fr] tw:lg:items-start">
          <div
            className="waterCheckAuthorMark tw:flex tw:aspect-square tw:max-w-sm tw:items-center tw:justify-center tw:rounded-[2.5rem]"
            aria-hidden="true"
          >
            <Sparkles size={54} strokeWidth={1.35} />
          </div>
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
                I built The Water Check to help you hear your body above online noise. I do not want you to treat my experience as
                a prescription. Your biology, environment, medical history, and life stage shape what you need.
              </p>
              <p>
                Learn your patterns and bring medical concerns to a qualified professional. Caring for your physical vessel can
                bring you closer to yourself and to God, who placed a spark in each of us worth tending.
              </p>
              <p className="tw:font-bold tw:text-[#3f3046]">Don't follow influencers. Learn yourself.</p>
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
  );
}
