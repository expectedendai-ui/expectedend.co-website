import * as React from "react";
import { ArrowUpRightIcon } from "./action-icons";
import { SERVICES } from "./content";
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

const readField = (formData: FormData, name: string) => String(formData.get(name) ?? "").trim();

type ContactFormProps = {
  initialProject?: string;
  initialReason?: string;
};

export function ContactForm({ initialProject = "", initialReason = "" }: ContactFormProps = {}) {
  const [submissionStatus, setSubmissionStatus] = React.useState<"idle" | "sending" | "success" | "error">("idle");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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

    setSubmissionStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...details, source: getContactSource(window.location.href) }),
      });

      if (!response.ok) throw new Error("Contact delivery failed");
      setSubmissionStatus("success");
    } catch {
      setSubmissionStatus("error");
    }
  };

  return (
    <section className={styles.contactSection} id="contact" aria-labelledby="contact-title">
      <div className={styles.contactHeader}>
        <div>
          <p className={styles.kicker}>Contact Expected End</p>
          <h2 id="contact-title">Start with a little <em>context.</em></h2>
        </div>
        <p>Choose a few details and we’ll send your inquiry directly to Expected End.</p>
      </div>

      <form className={styles.contactForm} onSubmit={onSubmit}>
        <label className={styles.contactField}>
          <span>Your name</span>
          <input name="name" type="text" autoComplete="name" maxLength={80} required />
        </label>

        <label className={styles.contactField}>
          <span>Your email</span>
          <input name="replyEmail" type="email" autoComplete="email" maxLength={120} required />
        </label>

        <label className={styles.contactField}>
          <span>What is this about?</span>
          <select name="reason" defaultValue={initialReason} required>
            <option value="" disabled>Choose one</option>
            {SERVICES.map(([, , , contactReason]) => (
              <option key={contactReason}>{contactReason}</option>
            ))}
            <option>Partnership or collaboration</option>
            <option>Press or media</option>
            <option>General question</option>
          </select>
        </label>

        <label className={styles.contactField}>
          <span>Which project?</span>
          <select name="project" defaultValue={initialProject} required>
            <option value="" disabled>Choose one</option>
            <option>Expected End</option>
            <option>MyBibleLens</option>
            <option>The Water Check</option>
            <option>A new idea</option>
          </select>
        </label>

        <label className={styles.contactField}>
          <span>Price range</span>
          <select name="priceRange" defaultValue="" required>
            <option value="" disabled>Choose one</option>
            <option>$100-$1,000</option>
            <option>$1,000-$2,000</option>
            <option>$2,000-$10,000</option>
            <option>$10,000-$50,000</option>
            <option>$50,000-$500,000+</option>
          </select>
        </label>

        <label className={styles.contactField}>
          <span>Ideal timeline</span>
          <select name="timeline" defaultValue="" required>
            <option value="" disabled>Choose one</option>
            <option>Just exploring</option>
            <option>Within a month</option>
            <option>Within three months</option>
            <option>Later this year</option>
            <option>Not sure yet</option>
          </select>
        </label>

        <label className={styles.contactField}>
          <span>How did you find us?</span>
          <select name="discovery" defaultValue="" required>
            <option value="" disabled>Choose one</option>
            <option>Instagram</option>
            <option>MyBibleLens</option>
            <option>The Water Check</option>
            <option>Search</option>
            <option>A referral</option>
            <option>Somewhere else</option>
          </select>
        </label>

        <label className={`${styles.contactField} ${styles.contactMessage}`}>
          <span>Tell us what you have in mind</span>
          <textarea
            name="message"
            rows={8}
            maxLength={2400}
            defaultValue={"Here is what I have in mind:\n\nThe outcome I’m hoping for:\n\nAnything else that would be helpful to know:"}
            required
          />
        </label>

        <div className={styles.contactSubmit}>
          <p aria-live="polite">
            {submissionStatus === "success"
              ? "Thanks — your inquiry has been sent."
              : submissionStatus === "error"
                ? "We couldn’t send your inquiry. Please try again shortly."
                : "Your inquiry is sent directly to Expected End."}
          </p>
          <button className={styles.actionWithIcon} type="submit" disabled={submissionStatus === "sending"}>
            {submissionStatus === "sending" ? "Sending…" : "Send inquiry"} <ArrowUpRightIcon className={styles.actionIcon} />
          </button>
        </div>
      </form>
    </section>
  );
}
