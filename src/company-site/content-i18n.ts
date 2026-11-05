import { useTranslation } from "react-i18next";
import type { PROJECTS, ProofItem, SERVICES } from "./content";

type Project = (typeof PROJECTS)[number];
type Service = (typeof SERVICES)[number];

const slug = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/**
 * content.ts stays the English source the tests and forms read. These give back the same shapes in the
 * visitor's language (locales/<id>/content.json), falling back to the English text for anything missing.
 * A service's contact reason is only relabelled: what the contact form sends stays the English value.
 */
export function useContentText() {
  const { t } = useTranslation("content");
  const text = (key: string, english: string) => (english ? t(key, { defaultValue: english }) : english);

  const project = (item: Project) => {
    const key = `projects.${item.artVariant}`;
    return {
      ...item,
      category: text(`${key}.category`, item.category),
      tagline: text(`${key}.tagline`, item.tagline),
      badge: text(`${key}.badge`, item.badge),
      destination: { ...item.destination, actionLabel: text(`${key}.action`, item.destination.actionLabel) },
      ...("secondaryAction" in item
        ? { secondaryAction: { ...item.secondaryAction, label: text(`${key}.secondary`, item.secondaryAction.label) } }
        : {}),
    };
  };

  const proof = (item: ProofItem): ProofItem => {
    const key = `proof.${slug(item.name)}`;
    return {
      ...item,
      name: text(`${key}.name`, item.name),
      category: text(`${key}.category`, item.category),
      status: text(`${key}.status`, item.status),
    };
  };

  const service = ([number, title, body, reason]: Service) => ({
    number,
    title: text(`services.${number}.title`, title),
    body: text(`services.${number}.body`, body),
    reason,
    reasonLabel: text(`services.${number}.interest`, reason),
  });

  return { project, proof, service, founderDescription: (english: string) => text("founderDescription", english) };
}
