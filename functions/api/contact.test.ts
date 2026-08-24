import { afterEach, describe, expect, it, vi } from "vitest";
import { onRequestPost } from "./contact";

const details = {
  name: "A Visitor",
  replyEmail: "visitor@example.com",
  project: "Expected End",
  reason: "Building an app or software idea",
  priceRange: "$2,000-$10,000",
  timeline: "Within three months",
  discovery: "Instagram",
  message: "I need a client portal.",
  source: "https://expectedend.co/about?utm_source=instagram#contact",
};

describe("contact Pages Function", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("delivers valid inquiries to the owner's inbox through Resend", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    const response = await onRequestPost({
      env: { RESEND_API_KEY: "re_test", CONTACT_FROM: "Expected End <contact@expectedend.co>" },
      request: new Request("https://expectedend.co/api/contact", { method: "POST", body: JSON.stringify(details) }),
    });

    expect(response.status).toBe(202);
    expect(fetchMock).toHaveBeenCalledWith("https://api.resend.com/emails", expect.objectContaining({ method: "POST" }));
    const request = fetchMock.mock.calls[0][1] as RequestInit;
    expect(request.headers).toEqual({ authorization: "Bearer re_test", "content-type": "application/json" });
    expect(JSON.parse(request.body as string)).toEqual({
      from: "Expected End <contact@expectedend.co>",
      to: ["expectedendai@gmail.com"],
      reply_to: "visitor@example.com",
      subject: "Expected End inquiry — Building an app or software idea",
      text: [
        "Name: A Visitor",
        "Reply email: visitor@example.com",
        "Project: Expected End",
        "Reason: Building an app or software idea",
        "Price range: $2,000-$10,000",
        "Timeline: Within three months",
        "Found Expected End through: Instagram",
        "",
        "I need a client portal.",
        "",
        "Source: https://expectedend.co/about?utm_source=instagram#contact",
      ].join("\n"),
    });
  });

  it("rejects invalid requests before calling the email provider", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const response = await onRequestPost({
      env: { RESEND_API_KEY: "re_test", CONTACT_FROM: "Expected End <contact@expectedend.co>" },
      request: new Request("https://expectedend.co/api/contact", { method: "POST", body: JSON.stringify({ ...details, replyEmail: "not-an-email" }) }),
    });

    expect(response.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
