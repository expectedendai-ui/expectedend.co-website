import * as React from "react";
import { ArrowUpRight, AtSign, Clock3, Droplets, Eye, Waves } from "lucide-react";
import "./water-check-page.css";

const ESTIMATE_GUIDANCE =
  "This calculator gives a general estimate for adults, not a medical prescription. Needs vary with health, climate, pregnancy, diet, medicines, and exercise. Do not force fluids. Ask a healthcare professional about your needs if you have a kidney or heart condition, a fluid restriction, or concerning symptoms.";

const GRACE_NOTE =
  "We spend so much time stressing over the mirror or feeling frustrated when our clothes fit differently than they did two days ago. Bodies change day to day for many reasons, and hydration can be one part of that picture. You do not need to punish yourself for a normal fluctuation. Drink water regularly, listen to thirst, and let care—not shame—set the pace. Persistent bloating, swelling, rapid weight changes, or symptoms that worry you deserve a conversation with a healthcare professional.";

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

export function WaterCheckPage() {
  const [weight, setWeight] = React.useState(160);
  const [activity, setActivity] = React.useState(30);
  const ounces = weight / 2 + (activity / 30) * 12;

  return (
    <main data-water-check-page className="tw:overflow-hidden tw:bg-[#f7fbfd]">
      <section
        className="tw:relative tw:isolate tw:min-h-[42rem] tw:overflow-hidden tw:bg-[#051b2f] tw:px-6 tw:py-24 tw:text-white tw:sm:px-10 tw:lg:px-16"
        aria-labelledby="water-check-title"
      >
        <div
          className="tw:pointer-events-none tw:absolute tw:inset-0 tw:overflow-hidden"
          data-water-decoration
          aria-hidden="true"
        >
          <span className="waterCheckRipple tw:-right-24 tw:top-12 tw:size-80" />
          <span className="waterCheckRipple tw:-right-6 tw:top-36 tw:size-[28rem]" />
          <span className="waterCheckRipple tw:-left-32 tw:bottom-[-12rem] tw:size-[36rem]" />
          <span className="waterCheckRefraction tw:-inset-x-24 tw:top-1/4 tw:h-64" />
        </div>

        <div className="tw:relative tw:mx-auto tw:flex tw:max-w-6xl tw:flex-col tw:items-start tw:gap-10 tw:lg:min-h-[30rem] tw:lg:flex-row tw:lg:items-center tw:lg:justify-between">
          <div className="tw:max-w-3xl">
            <div className="tw:mb-7 tw:flex tw:items-center tw:gap-3 tw:text-sm tw:font-bold tw:uppercase tw:tracking-[0.2em] tw:text-[#82d6fb]">
              <Droplets aria-hidden="true" size={21} strokeWidth={1.8} />
              The Water Check
            </div>
            <h1
              id="water-check-title"
              className="tw:max-w-4xl tw:text-balance tw:font-serif tw:text-5xl tw:leading-[0.98] tw:tracking-[-0.045em] tw:sm:text-7xl tw:lg:text-[6.5rem]"
            >
              Ditch the influencers. Learn your actual baseline.
            </h1>
            <p className="tw:mt-8 tw:max-w-2xl tw:text-lg tw:leading-8 tw:text-[#c8e9f8] tw:sm:text-xl">
              No sign-ups. Just a practical starting point for your daily hydration.
            </p>
          </div>
          <a
            className="tw:inline-flex tw:min-h-12 tw:items-center tw:gap-2 tw:rounded-full tw:border tw:border-white/25 tw:bg-white/10 tw:px-6 tw:py-3 tw:font-bold tw:text-white tw:backdrop-blur-sm tw:transition tw:hover:border-white/50 tw:hover:bg-white/15 tw:focus-visible:outline-3 tw:focus-visible:outline-offset-4 tw:focus-visible:outline-[#63c9f7]"
            href="#calculator"
          >
            Find your starting point
            <Droplets aria-hidden="true" size={19} />
          </a>
        </div>
      </section>

      <section id="calculator" className="tw:relative tw:z-10 tw:mx-auto tw:-mt-20 tw:max-w-5xl tw:px-5 tw:pb-24 tw:sm:px-8">
        <div className="waterCheckResultGlow tw:rounded-[2rem] tw:border tw:border-[#b9e3f5] tw:bg-white tw:p-6 tw:sm:p-10 tw:lg:p-14">
          <div className="tw:mb-10 tw:max-w-2xl">
            <p className="tw:text-sm tw:font-bold tw:uppercase tw:tracking-[0.18em] tw:text-[#0f7cd5]">Hydration calculator</p>
            <h2 className="tw:mt-3 tw:font-serif tw:text-4xl tw:leading-tight tw:tracking-[-0.03em] tw:text-[#082d52] tw:sm:text-5xl">
              Start with the numbers you know.
            </h2>
          </div>

          <div className="tw:grid tw:gap-8 tw:lg:grid-cols-2">
            <div className="tw:rounded-3xl tw:bg-[#eef8fc] tw:p-6">
              <div className="tw:flex tw:items-baseline tw:justify-between tw:gap-4">
                <label className="tw:text-base tw:font-bold tw:text-[#082d52]" htmlFor="water-check-weight">
                  Weight (lbs)
                </label>
                <span className="tw:text-2xl tw:font-bold tw:text-[#0f7cd5]" aria-hidden="true">
                  {weight} lbs
                </span>
              </div>
              <input
                id="water-check-weight"
                type="range"
                min="80"
                max="300"
                step="1"
                value={weight}
                aria-valuetext={`${weight} pounds`}
                onChange={(event) => setWeight(Number(event.currentTarget.value))}
              />
              <div className="tw:flex tw:justify-between tw:text-xs tw:font-bold tw:text-[#47718d]" aria-hidden="true">
                <span>80 lbs</span>
                <span>300 lbs</span>
              </div>
            </div>

            <div className="tw:rounded-3xl tw:bg-[#eef8fc] tw:p-6">
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

          <div className="tw:mt-8 tw:rounded-3xl tw:bg-[#082d52] tw:px-6 tw:py-8 tw:text-white tw:sm:px-10">
            <output
              className="tw:block tw:font-serif tw:text-4xl tw:leading-tight tw:tracking-[-0.03em] tw:sm:text-6xl"
              htmlFor="water-check-weight water-check-activity"
              aria-live="polite"
              aria-atomic="true"
            >
              Your Daily Goal: {formatOunces(ounces)} Ounces
            </output>
            <p className="tw:mt-5 tw:max-w-4xl tw:text-sm tw:leading-6 tw:text-[#c8e9f8]">{ESTIMATE_GUIDANCE}</p>
          </div>
        </div>
      </section>

      <section className="tw:bg-[#eaf6fb] tw:px-5 tw:py-24 tw:sm:px-8" aria-labelledby="water-grace-title">
        <div className="tw:mx-auto tw:max-w-4xl tw:rounded-[2rem] tw:border tw:border-[#c3e5f3] tw:bg-white/70 tw:p-8 tw:shadow-[0_24px_70px_rgba(21,103,148,0.08)] tw:backdrop-blur-sm tw:sm:p-14">
          <p className="tw:text-sm tw:font-bold tw:uppercase tw:tracking-[0.18em] tw:text-[#0f7cd5]">Body kindness</p>
          <h2 id="water-grace-title" className="tw:mt-4 tw:font-serif tw:text-4xl tw:leading-tight tw:tracking-[-0.03em] tw:text-[#082d52] tw:sm:text-5xl">
            A Quick Note on Giving Yourself Grace
          </h2>
          <p className="tw:mt-7 tw:text-lg tw:leading-8 tw:text-[#315a73] tw:sm:text-xl tw:sm:leading-9">{GRACE_NOTE}</p>
        </div>
      </section>

      <section className="tw:px-5 tw:py-24 tw:sm:px-8" aria-labelledby="water-tips-title">
        <div className="tw:mx-auto tw:max-w-6xl">
          <div className="tw:max-w-2xl">
            <p className="tw:text-sm tw:font-bold tw:uppercase tw:tracking-[0.18em] tw:text-[#0f7cd5]">Useful, not obsessive</p>
            <h2 id="water-tips-title" className="tw:mt-3 tw:font-serif tw:text-4xl tw:leading-tight tw:tracking-[-0.03em] tw:text-[#082d52] tw:sm:text-5xl">
              Three checks for real life.
            </h2>
          </div>
          <div className="tw:mt-12 tw:grid tw:gap-5 tw:md:grid-cols-3">
            {TIPS.map(({ title, body, Icon }) => (
              <article className="tw:rounded-[1.75rem] tw:border tw:border-[#d0eaf5] tw:bg-white tw:p-7 tw:shadow-[0_18px_45px_rgba(23,94,132,0.07)]" key={title}>
                <Icon aria-hidden="true" color="#0f7cd5" size={28} strokeWidth={1.7} />
                <h3 className="tw:mt-8 tw:text-xl tw:font-bold tw:text-[#082d52]">{title}</h3>
                <p className="tw:mt-3 tw:text-base tw:leading-7 tw:text-[#47718d]">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="tw:bg-[#051b2f] tw:px-5 tw:py-24 tw:text-white tw:sm:px-8" aria-labelledby="water-community-title">
        <div className="tw:mx-auto tw:max-w-6xl">
          <div className="tw:flex tw:flex-col tw:items-start tw:justify-between tw:gap-8 tw:md:flex-row tw:md:items-end">
            <div className="tw:max-w-3xl">
              <p className="tw:text-sm tw:font-bold tw:uppercase tw:tracking-[0.18em] tw:text-[#82d6fb]">Keep it human</p>
              <h2 id="water-community-title" className="tw:mt-3 tw:font-serif tw:text-4xl tw:leading-tight tw:tracking-[-0.03em] tw:sm:text-6xl">
                Join the actual community.
              </h2>
            </div>
            <a
              className="tw:inline-flex tw:min-h-12 tw:items-center tw:gap-3 tw:rounded-full tw:bg-[#63c9f7] tw:px-6 tw:py-3 tw:font-bold tw:text-[#051b2f] tw:transition tw:hover:bg-white tw:focus-visible:outline-3 tw:focus-visible:outline-offset-4 tw:focus-visible:outline-[#63c9f7]"
              href="https://www.instagram.com/thewatercheck/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow @thewatercheck on Instagram"
            >
              <AtSign aria-hidden="true" size={20} />
              @thewatercheck
              <ArrowUpRight aria-hidden="true" size={18} />
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
