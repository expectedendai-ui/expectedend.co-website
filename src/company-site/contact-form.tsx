import * as React from "react";
import { Trans, useTranslation } from "react-i18next";
import { ArrowUpRightIcon } from "./action-icons";
import { SERVICES } from "./content";
import { useContentText } from "./content-i18n";
import styles from "./style.module.css";

type ContactDetails = {
  name: string;
  replyEmail: string;
  project: string;
  reason: string;
  priceRange: string;
  timeline: string;
  discovery: string;
  message: string;
};

const CONTACT_ADDRESS = "expectedendai@gmail.com";

const CONTACT_SOURCE_PARAMETERS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "ref"];

export const getContactSource = (href: string) => {
  const source = new URL(href);
  const safeParameters = new URLSearchParams();

  for (const parameter of CONTACT_SOURCE_PARAMETERS) {
    const value = source.searchParams.get(parameter);
    if (value) safeParameters.set(parameter, value.slice(0, 160));
  }

  source.search = safeParameters.toString();
  return source.toString();
};

const buildContactEmail = (details: ContactDetails, source: string) => {
  const subject = `Expected End inquiry — ${details.reason}`;
  const body = [
    "Hi Expected End,",
    "",
    `Name: ${details.name}`,
    `Reply email: ${details.replyEmail}`,
    `Project: ${details.project}`,
    `Reason: ${details.reason}`,
    `Price range: ${details.priceRange}`,
    `Timeline: ${details.timeline}`,
    `Found Expected End through: ${details.discovery}`,
    "",
    details.message,
    "",
    `Source: ${source}`,
  ].join("\n");

  return { subject, body };
};

export const buildContactMailto = (details: ContactDetails, source: string) => {
  const { subject, body } = buildContactEmail(details, source);
  return `mailto:${CONTACT_ADDRESS}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

export const buildOutlookComposeUrl = (details: ContactDetails, source: string) => {
  const { subject, body } = buildContactEmail(details, source);
  const parameters = new URLSearchParams({ to: CONTACT_ADDRESS, subject, body });
  return `https://outlook.office.com/mail/deeplink/compose?${parameters}`;
};

export const buildGmailComposeUrl = (details: ContactDetails, source: string) => {
  const { subject, body } = buildContactEmail(details, source);
  const parameters = new URLSearchParams({ view: "cm", fs: "1", to: CONTACT_ADDRESS, su: subject, body });
  return `https://mail.google.com/mail/?${parameters}`;
};

export const buildYahooComposeUrl = (details: ContactDetails, source: string) => {
  const { subject, body } = buildContactEmail(details, source);
  const parameters = new URLSearchParams({ to: CONTACT_ADDRESS, subj: subject, body });
  return `https://compose.mail.yahoo.com/?${parameters}`;
};

const readField = (formData: FormData, name: string) => String(formData.get(name) ?? "").trim();

// Trans supplies the link words, so the anchor gets its children at render time.
function ComposeLink({ href, children }: { href: string; children?: React.ReactNode }) {
  return <a href={href}>{children}</a>;
}

type ContactFormProps = {
  initialProject?: string;
  initialReason?: string;
};

export function ContactForm({ initialProject = "", initialReason = "" }: ContactFormProps = {}) {
  const { t } = useTranslation("contact");
  const { service } = useContentText();
  const [preparedEmail, setPreparedEmail] = React.useState("");
  const [gmailComposeUrl, setGmailComposeUrl] = React.useState("");
  const [outlookComposeUrl, setOutlookComposeUrl] = React.useState("");
  const [yahooComposeUrl, setYahooComposeUrl] = React.useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const details: ContactDetails = {
      name: readField(formData, "name"),
      replyEmail: readField(formData, "replyEmail"),
      project: readField(formData, "project"),
      reason: readField(formData, "reason"),
      priceRange: readField(formData, "priceRange"),
      timeline: readField(formData, "timeline"),
      discovery: readField(formData, "discovery"),
      message: readField(formData, "message"),
    };
    const href = buildContactMailto(details, getContactSource(window.location.href));
    setPreparedEmail(href);
    setGmailComposeUrl(buildGmailComposeUrl(details, getContactSource(window.location.href)));
    setOutlookComposeUrl(buildOutlookComposeUrl(details, getContactSource(window.location.href)));
    setYahooComposeUrl(buildYahooComposeUrl(details, getContactSource(window.location.href)));
    const emailLink = document.createElement("a");
    emailLink.href = href;
    document.body.append(emailLink);
    emailLink.click();
    emailLink.remove();
  };

  return (
    <section className={styles.contactSection} id="contact" aria-labelledby="contact-title">
      <div className={styles.contactHeader}>
        <div>
          <p className={styles.kicker}>{t("header.kicker")}</p>
          <h2 id="contact-title"><Trans t={t} i18nKey="header.title" components={{ em: <em /> }} /></h2>
        </div>
        <p>{t("header.intro")}</p>
      </div>

      <form className={styles.contactForm} onSubmit={onSubmit}>
        <label className={styles.contactField}>
          <span>{t("fields.name")}</span>
          <input name="name" type="text" autoComplete="name" maxLength={80} required />
        </label>

        <label className={styles.contactField}>
          <span>{t("fields.email")}</span>
          <input name="replyEmail" type="email" autoComplete="email" maxLength={120} required />
        </label>

        <label className={styles.contactField}>
          <span>{t("fields.reason")}</span>
          <select name="reason" defaultValue={initialReason} required>
            <option value="" disabled>{t("fields.chooseOne")}</option>
            {SERVICES.map(service).map(({ reason, reasonLabel }) => (
              <option key={reason} value={reason}>{reasonLabel}</option>
            ))}
            <option value="Partnership or collaboration">{t("reasons.partnership")}</option>
            <option value="Press or media">{t("reasons.press")}</option>
            <option value="General question">{t("reasons.general")}</option>
          </select>
        </label>

        <label className={styles.contactField}>
          <span>{t("fields.project")}</span>
          <select name="project" defaultValue={initialProject} required>
            <option value="" disabled>{t("fields.chooseOne")}</option>
            <option>Expected End</option>
            <option>MyBibleLens</option>
            <option value="The Water Check community">{t("projects.waterCheckCommunity")}</option>
            <option value="A new idea">{t("projects.newIdea")}</option>
          </select>
        </label>

        <label className={styles.contactField}>
          <span>{t("fields.priceRange")}</span>
          <select name="priceRange" defaultValue="" required>
            <option value="" disabled>{t("fields.chooseOne")}</option>
            <option>$100-$1,000</option>
            <option>$1,000-$2,000</option>
            <option>$2,000-$10,000</option>
            <option>$10,000-$50,000</option>
            <option>$50,000-$500,000+</option>
          </select>
        </label>

        <label className={styles.contactField}>
          <span>{t("fields.timeline")}</span>
          <select name="timeline" defaultValue="" required>
            <option value="" disabled>{t("fields.chooseOne")}</option>
            <option value="Just exploring">{t("timelines.exploring")}</option>
            <option value="Within a month">{t("timelines.month")}</option>
            <option value="Within three months">{t("timelines.threeMonths")}</option>
            <option value="Later this year">{t("timelines.laterThisYear")}</option>
            <option value="Not sure yet">{t("timelines.notSure")}</option>
          </select>
        </label>

        <label className={styles.contactField}>
          <span>{t("fields.discovery")}</span>
          <select name="discovery" defaultValue="" required>
            <option value="" disabled>{t("fields.chooseOne")}</option>
            <option>Instagram</option>
            <option>MyBibleLens</option>
            <option value="The Water Check community">{t("discovery.waterCheckCommunity")}</option>
            <option value="Search">{t("discovery.search")}</option>
            <option value="A referral">{t("discovery.referral")}</option>
            <option value="Somewhere else">{t("discovery.elsewhere")}</option>
          </select>
        </label>

        <label className={`${styles.contactField} ${styles.contactMessage}`}>
          <span>{t("fields.message")}</span>
          <textarea
            name="message"
            rows={8}
            maxLength={2400}
            defaultValue={"Here is what I have in mind:\n\nThe outcome I’m hoping for:\n\nAnything else that would be helpful to know:"}
            required
          />
        </label>

        <div className={styles.contactSubmit}>
          <p>
            {t("submit.note")}
            {preparedEmail && gmailComposeUrl && outlookComposeUrl && yahooComposeUrl ? (
              <>
                {" "}
                <Trans
                  t={t}
                  i18nKey="submit.apps"
                  components={{
                    app: <ComposeLink href={preparedEmail} />,
                    gmail: <ComposeLink href={gmailComposeUrl} />,
                    outlook: <ComposeLink href={outlookComposeUrl} />,
                    yahoo: <ComposeLink href={yahooComposeUrl} />,
                  }}
                />
              </>
            ) : null}
          </p>
          <button className={styles.actionWithIcon} type="submit">
            {t("submit.button")} <ArrowUpRightIcon className={styles.actionIcon} />
          </button>
        </div>
      </form>
    </section>
  );
}
