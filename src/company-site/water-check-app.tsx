import { useTranslation } from "react-i18next";
import "./water-check-app.css";

const screens = [
  { file: "appstore-01", id: "number" },
  { file: "appstore-02", id: "log" },
  { file: "appstore-03", id: "widgets" },
  { file: "appstore-04", id: "wellness" },
  { file: "appstore-05", id: "calendar" },
] as const;

export function WaterCheckApp() {
  const { t } = useTranslation("water");
  return (
    <section id="the-app" className="waterApp" aria-labelledby="water-app-title">
      <div className="waterAppInner">
        <div className="waterAppIntro">
          <p className="waterAppEyebrow">{t("app.eyebrow")}</p>
          <h2 id="water-app-title">{t("app.title")}</h2>
          <p>{t("app.body")}</p>
          <div className="waterAppActions">
            <span className="waterAppComingSoon">{t("app.comingSoon")}</span>
            <a href="#calculator">{t("app.calculator")}</a>
          </div>
          <p className="waterAppCaveat">{t("app.caveat")}</p>
        </div>
        <div className="waterAppScreens">
          {screens.map((screen) => (
            <figure key={screen.file}>
              <img
                src={`/media/water-check/${screen.file}.webp`}
                alt={t(`app.screens.${screen.id}.alt`)}
                width="660"
                height="1434"
                loading="lazy"
                decoding="async"
              />
              <figcaption>{t(`app.screens.${screen.id}.caption`)}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
