type Env = {
  CONTACT_FROM?: string;
  RESEND_API_KEY?: string;
};

type ContactDetails = {
  name: string;
  replyEmail: string;
  project: string;
  reason: string;
  priceRange: string;
  timeline: string;
  discovery: string;
  message: string;
  source: string;
};

type PagesContext = {
  env: Env;
  request: Request;
};

const RECIPIENT = "expectedendai@gmail.com";
const FIELD_LIMITS = {
  name: 80,
  replyEmail: 120,
  project: 80,
  reason: 120,
  priceRange: 40,
  timeline: 80,
  discovery: 80,
  message: 2400,
  source: 500,
} as const;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json; charset=utf-8" } });

const readString = (value: unknown, maximumLength: number) =>
  typeof value === "string" && value.trim().length > 0 && value.trim().length <= maximumLength ? value.trim() : null;

const readDetails = (value: unknown): ContactDetails | null => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const values = value as Record<string, unknown>;
  const details = Object.fromEntries(
    Object.entries(FIELD_LIMITS).map(([field, maximumLength]) => [field, readString(values[field], maximumLength)]),
  ) as Record<keyof ContactDetails, string | null>;

  if (Object.values(details).some((field) => field === null) || !/^\S+@\S+\.\S+$/.test(details.replyEmail ?? "")) return null;
  return details as ContactDetails;
};

const formatEmail = (details: ContactDetails) => [
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
  `Source: ${details.source}`,
].join("\n");

export const onRequestPost = async ({ env, request }: PagesContext) => {
  if (!env.RESEND_API_KEY || !env.CONTACT_FROM) return json({ error: "Contact delivery is not configured." }, 503);

  const body = await request.text();
  if (body.length > 6000) return json({ error: "Invalid contact request." }, 400);

  let details: ContactDetails | null = null;
  try {
    details = readDetails(JSON.parse(body));
  } catch {
    return json({ error: "Invalid contact request." }, 400);
  }
  if (!details) return json({ error: "Invalid contact request." }, 400);

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM,
      to: [RECIPIENT],
      reply_to: details.replyEmail,
      subject: `Expected End inquiry — ${details.reason}`,
      text: formatEmail(details),
    }),
  });

  if (!response.ok) return json({ error: "Contact delivery failed." }, 502);
  return json({ delivered: true }, 202);
};
