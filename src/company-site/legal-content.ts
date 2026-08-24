export type LegalSection = {
  heading: string;
  paragraphs: string[];
};

export type LegalPageContent = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: LegalSection[];
};

export const LEGAL_CONTENT = {
  terms: {
    eyebrow: "Company information",
    title: "Website Terms of Use",
    intro: "These terms govern your use of the Expected End website. By accessing the site, you agree to these terms. If you do not agree, please do not use the site.",
    sections: [
      { heading: "About this website", paragraphs: ["This website shares general information about Expected End LLC, its projects, and selected services. Website content may change as the company and its work develop.", "Nothing on this website is a binding offer, professional advice, or a guarantee that a project, feature, service, price, or timeline will be available."] },
      { heading: "Project and service inquiries", paragraphs: ["Preparing or sending a message through the Contact page does not create a client relationship, partnership, confidentiality obligation, or contract. Any paid work will require a separate written agreement signed by the appropriate parties.", "Please do not send passwords, financial account information, trade secrets, or other highly sensitive or confidential information through the Contact page unless Expected End has agreed in writing to receive it securely."] },
      { heading: "Acceptable use", paragraphs: ["You may use this website for lawful informational purposes. You may not misuse the site, attempt unauthorized access, interfere with its operation or security, introduce malicious code, impersonate another person, violate another person’s rights, or use automated activity that unreasonably burdens the site."] },
      { heading: "Intellectual property", paragraphs: ["Unless otherwise noted, Expected End LLC owns or is authorized to use the original text, visuals, branding, layout, and other materials created for this website. You may view the site for personal or internal business evaluation, but you may not reproduce, sell, publish, or create derivative works from protected materials without permission.", "Third-party names, marks, software, fonts, and linked materials remain the property of their respective owners. Their appearance does not transfer ownership to Expected End."] },
      { heading: "Third-party destinations", paragraphs: ["Links to projects, social platforms, and other websites lead to services operated by third parties. Expected End does not control their availability, security, content, terms, or privacy practices. Visiting them is at your discretion and subject to their own policies."] },
      { heading: "No warranties", paragraphs: ["To the extent permitted by law, this website is provided “as is” and “as available.” Expected End does not promise that the site will always be uninterrupted, error-free, secure, or complete, or that every item of information will remain current."] },
      { heading: "Limitation of liability", paragraphs: ["To the maximum extent permitted by law, Expected End LLC and its owner, personnel, and service providers will not be liable for indirect, incidental, special, consequential, or punitive damages arising from use of, inability to use, or reliance on this website or a third-party destination. Nothing in these terms excludes liability that cannot legally be excluded."] },
      { heading: "Florida law", paragraphs: ["These terms are governed by Florida law, without regard to conflict-of-law principles, to the extent permitted by applicable law. Any dispute must be brought in a court with proper jurisdiction over Expected End LLC’s principal place of business, unless applicable law requires otherwise."] },
      { heading: "Changes, severability, and contact", paragraphs: ["Expected End may revise these terms as the website changes. The effective date above identifies the current version. Continued use after an update means the revised terms apply from their effective date.", "If any provision is found unenforceable, the remaining provisions will continue in effect. Questions about these terms may be sent through the Contact page."] },
    ],
  },
  privacy: {
    eyebrow: "Company information",
    title: "Privacy Statement",
    intro: "Expected End LLC aims to collect as little personal information as this public website needs. This statement explains the current website and Contact experience; separate Expected End projects may provide their own privacy notices.",
    sections: [
      { heading: "Information used on your device", paragraphs: ["This website has no public accounts, advertising trackers, analytics, or payment flow. The website may use essential browser features needed to display pages and preserve basic functionality, but it does not currently use a public account system."] },
      { heading: "Contact messages", paragraphs: ["The guided Contact form prepares a message in your own email application. Expected End does not receive the form details unless you review and send that email.", "If you send the message, Expected End receives the name, reply email, inquiry selections, message, and source information displayed in the prepared email. Source information is limited to the Expected End page and supported campaign parameters. Expected End uses this information to review the inquiry, respond, keep appropriate business records, prevent abuse, and protect its rights."] },
      { heading: "Hosting and technical information", paragraphs: ["Expected End uses service providers to deliver, route, and protect the website and company email. Those providers may process standard technical information such as IP address, browser type, requested pages, timestamps, and security logs as needed to provide their services."] },
      { heading: "Fonts and external destinations", paragraphs: ["The site serves its font files locally, so loading a page does not request fonts from an external font provider. The website also links to MyBibleLens, Instagram, and other destinations. An external provider receives a request only after you intentionally follow its link, and that provider then handles information under its own terms and privacy practices."] },
      { heading: "Sharing and selling", paragraphs: ["Expected End does not sell personal information collected through this website and does not use it for targeted advertising. Information may be handled by providers supporting website hosting, security, email, and business operations; disclosed when reasonably necessary to comply with law or protect rights and safety; or transferred as part of a legitimate business reorganization, subject to applicable law."] },
      { heading: "Retention and security", paragraphs: ["Contact emails and related business records are kept only as long as reasonably necessary for the inquiry, business operations, legal obligations, dispute resolution, and security. Retention may vary depending on the relationship and the nature of the message.", "Expected End uses reasonable administrative and technical measures appropriate to the information it handles, but no website, email service, or transmission method can be guaranteed completely secure."] },
      { heading: "Children’s information", paragraphs: ["This company website is intended for a general audience and is not designed to collect personal information from children under 13. Children under 13 should not send a Contact message. A parent or guardian who believes a child provided information may contact Expected End to request review or deletion."] },
      { heading: "Your choices and requests", paragraphs: ["You may choose not to send a prepared email or use the Contact page to ask about information you previously sent. Depending on applicable law, you may request access, correction, or deletion. Expected End may need to verify a request and may retain information when legally permitted or required."] },
      { heading: "Changes and contact", paragraphs: ["Expected End may update this statement when the website, providers, or legal requirements change. The effective date above identifies the current version. Privacy questions and requests may be submitted through the Contact page by selecting “General question” and writing “Privacy request” at the beginning of the message."] },
    ],
  },
  accessibility: {
    eyebrow: "Company information",
    title: "Accessibility",
    intro: "Expected End wants its website and digital experiences to be welcoming and usable for as many people as possible.",
    sections: [
      { heading: "Our approach", paragraphs: ["We work toward clear structure, keyboard access, readable contrast, meaningful labels, responsive layouts, and reduced-motion support across this site."] },
      { heading: "Ongoing work", paragraphs: ["Accessibility is an ongoing practice. As the site changes, we will continue to test its core paths and improve barriers we find."] },
      { heading: "Feedback", paragraphs: ["If something on this website is difficult to use or access, please tell us through the Contact link below. Include the page and the problem you encountered so we can investigate."] },
    ],
  },
} satisfies Record<"terms" | "privacy" | "accessibility", LegalPageContent>;
