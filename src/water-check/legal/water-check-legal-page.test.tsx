import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CompanySite } from "../../company-site";
import { WATER_CHECK_LEGAL_CONTENT, type WaterCheckLegalKey } from "./water-check-legal-content";
import { WaterCheckLegalPage } from "./water-check-legal-page";
import {
  getWaterCheckRenderedReleaseFacts,
  WATER_CHECK_RELEASE_RECORD,
  type WaterCheckReleaseFacts,
} from "./water-check-release-content";
import {
  createWaterCheckGovernedDigest,
  createWaterCheckDeploymentInventoryDigest,
  validateWaterCheckRelease,
  WATER_CHECK_RELEASE_EVIDENCE,
  type WaterCheckReleaseArtifacts,
  type WaterCheckReleaseEvidence,
} from "./water-check-release-evidence";

const ROUTES: Array<[string, WaterCheckLegalKey, string]> = [
  ["/thewatercheck/privacy", "privacy", "Privacy"],
  ["/thewatercheck/terms", "terms", "Terms"],
  ["/thewatercheck/health-and-ai-disclaimer", "health-and-ai-disclaimer", "Health & AI Disclaimer"],
  ["/thewatercheck/consumer-health-data", "consumer-health-data", "Consumer Health Data"],
];

const APPROVED_FACTS: WaterCheckReleaseFacts = {
  entityName: "Example Product Company",
  contactPath: "/about#contact",
  effectiveDate: "2026-09-15",
};

const RESOLVED_DEPLOYMENT_INVENTORY = `# Water Check Deployment Data Inventory

Status: **Approved**

| Area | Facts to verify | Evidence location or capture | Status |
| --- | --- | --- | --- |
| Hosting and CDN services | Account and domains | Evidence bundle section 1 | Verified |
| Request and log fields | Request fields | Evidence bundle section 2 | Verified |
| Purposes and system owners | Purposes and owners | Evidence bundle section 3 | Verified |
| Authorized access | Authorized roles | Evidence bundle section 4 | Verified |
| Recipients and subprocessors | Recipients | Evidence bundle section 5 | Verified |
| Protection | Protections | Evidence bundle section 6 | Verified |
| Retention and deletion | Configured rules | Evidence bundle section 7 | Verified |
| Cookies and browser storage | Client state | Evidence bundle section 8 | Verified |
| Response headers | Route captures | Evidence bundle section 9 | Verified |
| Nonessential behavior | Optional products | Evidence bundle section 10 | Verified |

| Field | Approved value |
| --- | --- |
| Deployment inventory approver | Infrastructure owner |
| Approval date | 2026-09-14 |
| Evidence capture date | 2026-09-13 |
| Pages project and account confirmed | Yes — production and preview |
| Inventory version or attachment digest | inventory-v1 |
| Privacy copy reconciled to this inventory | Yes — 2026-09-14 |
`;

const validEvidence = (
  governedSources: readonly string[],
  facts: WaterCheckReleaseFacts = APPROVED_FACTS
): WaterCheckReleaseEvidence => ({
  candidates: WATER_CHECK_RELEASE_EVIDENCE.candidates,
  approvedContent: {
    facts,
    approvedBy: "Product owner",
    approvedAt: "2026-09-14",
    governedContentDigest: createWaterCheckGovernedDigest([...governedSources, JSON.stringify(facts)]),
  },
  deploymentInventoryApproval: {
    approvedBy: "Infrastructure owner",
    approvedAt: "2026-09-14",
    contentDigest: createWaterCheckDeploymentInventoryDigest(RESOLVED_DEPLOYMENT_INVENTORY),
  },
});

const releaseArtifacts = (
  governedSources: readonly string[],
  evidence: WaterCheckReleaseEvidence,
  deploymentInventoryDocument = RESOLVED_DEPLOYMENT_INVENTORY
): WaterCheckReleaseArtifacts => ({
  governedSources,
  renderedFacts: getWaterCheckRenderedReleaseFacts(evidence),
  deploymentInventoryDocument,
});

describe("Water Check legal pages", () => {
  it.each(ROUTES)("renders substantive product-owned content at %s", (path, key, heading) => {
    window.history.replaceState({}, "", path);
    vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
    render(<CompanySite leaving={false} onOpenArtWorld={vi.fn()} />);

    const article = screen.getByRole("article", { name: heading });
    expect(within(article).getByRole("heading", { level: 1, name: heading })).toBeInTheDocument();
    expect(within(article).getByText(/entity: expected end llc/i)).toBeInTheDocument();
    expect(within(article).getByText(/effective date: 2026-08-08/i)).toBeInTheDocument();
    expect(within(article).getByRole("link", { name: "/about#contact" })).toHaveAttribute("href", "/about#contact");
    expect(within(article).queryByText(/product-specific information will be published here/i)).not.toBeInTheDocument();
    const instagramLink = within(article).getByRole("link", { name: /visit the water check on instagram/i });
    expect(instagramLink).toHaveAttribute("href", "https://www.instagram.com/thewatercheck/");
    expect(instagramLink).toHaveAttribute("target", "_blank");
    expect(instagramLink).toHaveAttribute("rel", "noreferrer");
    expect(within(article).getAllByRole("heading", { level: 2 }).length).toBeGreaterThanOrEqual(4);

    const footer = screen.getByRole("navigation", { name: "Water Check legal navigation" });
    expect(within(footer).getByRole("link", { name: WATER_CHECK_LEGAL_CONTENT[key].footerLabel })).toHaveAttribute(
      "aria-current",
      "page"
    );
  });

  it("states the current no-submission contract without claiming zero operational processing", () => {
    render(<WaterCheckLegalPage content={WATER_CHECK_LEGAL_CONTENT.privacy} onNavigate={vi.fn()} />);
    const article = screen.getByRole("article", { name: "Privacy" });

    expect(article).toHaveTextContent(/archived water check information pages/i);
    expect(article).toHaveTextContent(/app is paused/i);
    expect(article).toHaveTextContent(/do not provide a way to submit health information/i);
    expect(article).toHaveTextContent(
      /product scans, ai conversations, email addresses, accounts, age, gender, ethnicity, or racial identity/i
    );
    expect(article).toHaveTextContent(/18\+.*eligibility.*not.*collect/i);
    expect(article).toHaveTextContent(/cloudflare pages hosts and delivers this website/i);
    expect(article).toHaveTextContent(/ip address.*requested host and path.*security or network signals/i);
    expect(article).toHaveTextContent(/no server-side water check function.*application database.*health journal/i);
    expect(article).toHaveTextContent(/does not set a cookie or write to local storage or session storage/i);
    expect(article).not.toHaveTextContent(/collect(?:s|ed)? no (?:personal|technical|operational) (?:data|information)/i);
    expect(article.querySelector("form, input, select, textarea")).not.toBeInTheDocument();
  });

  it("keeps future app intentions conditional and avoids unsupported current rights or vendors", () => {
    const allLegalCopy = JSON.stringify(WATER_CHECK_LEGAL_CONTENT);

    expect(allLegalCopy).toMatch(/future app/i);
    expect(allLegalCopy).toMatch(/planned/i);
    expect(allLegalCopy).toMatch(/new notice/i);
    expect(allLegalCopy).toMatch(/optional.*purpose-specific/i);
    expect(allLegalCopy).toMatch(/prefer not to say/i);
    expect(allLegalCopy).toMatch(/privacy and equity review/i);
    expect(allLegalCopy).not.toMatch(/cal ai|flo health/i);
    expect(allLegalCopy).not.toMatch(/you (?:may|can) (?:delete|export|download) your data/i);
    expect(allLegalCopy).not.toMatch(/retained? for \d+ (?:days?|months?|years?)/i);
    expect(allLegalCopy).not.toMatch(/hipaa|washington my health my data|nevada sb 370|gdpr|ccpa/i);
  });

  it("makes the website and future product informational, approximate, adult-only, and non-medical", () => {
    const terms = JSON.stringify(WATER_CHECK_LEGAL_CONTENT.terms);
    const disclaimer = JSON.stringify(WATER_CHECK_LEGAL_CONTENT["health-and-ai-disclaimer"]);
    const consumerHealth = JSON.stringify(WATER_CHECK_LEGAL_CONTENT["consumer-health-data"]);

    expect(terms).toMatch(/18 and older/i);
    expect(terms).toMatch(/informational/i);
    expect(disclaimer).toMatch(/educational/i);
    expect(disclaimer).toMatch(/approximate/i);
    expect(disclaimer).toMatch(/potentially incomplete/i);
    expect(disclaimer).toMatch(/does not diagnose, treat, or prevent/i);
    expect(disclaimer).toMatch(/definitive cause/i);
    expect(consumerHealth).toMatch(/archived water check information pages/i);
    expect(consumerHealth).toMatch(/if work resumes/i);
    expect(consumerHealth).toMatch(/do not provide a way to submit consumer health data/i);
    expect(consumerHealth).toMatch(/does not assert that any particular consumer-health law applies/i);
  });

  it("does not repeat the campaign hook in legal copy or headings", () => {
    const allLegalCopy = JSON.stringify(WATER_CHECK_LEGAL_CONTENT);
    expect(allLegalCopy).not.toMatch(/you(?:'|’)re not fat/i);
    expect(allLegalCopy).not.toMatch(/snap\. track\. debloat/i);
    expect(allLegalCopy).not.toMatch(/coming soon/i);
  });
});

describe("Water Check release evidence", () => {
  const governedSources = ["approved landing health claims", "approved legal copy", RESOLVED_DEPLOYMENT_INVENTORY];

  it("publishes exact owner-approved facts while still rejecting unresolved evidence", () => {
    const unresolvedInventory = "Status: **Unresolved**";
    const unresolvedDraftSources = ["landing health claims", JSON.stringify(WATER_CHECK_LEGAL_CONTENT), unresolvedInventory];
    const unresolvedEvidence: WaterCheckReleaseEvidence = {
      candidates: WATER_CHECK_RELEASE_EVIDENCE.candidates,
      approvedContent: null,
      deploymentInventoryApproval: null,
    };

    expect(WATER_CHECK_RELEASE_EVIDENCE).toBe(WATER_CHECK_RELEASE_RECORD);
    expect(WATER_CHECK_RELEASE_EVIDENCE.candidates.entityName).toBe("Expected End LLC");
    expect(WATER_CHECK_RELEASE_EVIDENCE.candidates.contactPath).toBe("/about#contact");
    expect(WATER_CHECK_RELEASE_EVIDENCE.approvedContent?.facts).toEqual({
      entityName: "Expected End LLC",
      contactPath: "/about#contact",
      effectiveDate: "2026-08-08",
    });
    expect(WATER_CHECK_RELEASE_EVIDENCE.approvedContent?.approvedBy).toBe("Denzel Rigaud");
    expect(WATER_CHECK_RELEASE_EVIDENCE.deploymentInventoryApproval?.approvedBy).toBe("Denzel Rigaud");
    expect(
      validateWaterCheckRelease(unresolvedEvidence, {
        governedSources: unresolvedDraftSources,
        renderedFacts: getWaterCheckRenderedReleaseFacts(unresolvedEvidence),
        deploymentInventoryDocument: unresolvedInventory,
      })
    ).toMatchObject({
      valid: false,
      errors: expect.arrayContaining([expect.stringMatching(/unresolved token/i)]),
    });
  });

  it("accepts exact, synthetic owner and deployment approval evidence", () => {
    const evidence = validEvidence(governedSources);
    expect(validateWaterCheckRelease(evidence, releaseArtifacts(governedSources, evidence))).toEqual({
      valid: true,
      errors: [],
    });
  });

  it("rejects approved legal facts that differ from any rendered release fact", () => {
    const evidence = validEvidence(governedSources);
    const artifacts = releaseArtifacts(governedSources, evidence);
    const mismatchedRenderedFacts = [
      { ...artifacts.renderedFacts, entityName: "Different Public Entity" },
      { ...artifacts.renderedFacts, contactPath: "/different-contact" },
      { ...artifacts.renderedFacts, effectiveDate: "2026-09-16" },
    ];

    for (const renderedFacts of mismatchedRenderedFacts) {
      expect(validateWaterCheckRelease(evidence, { ...artifacts, renderedFacts }).errors).toEqual(
        expect.arrayContaining([expect.stringMatching(/rendered entity.*does not match/i)])
      );
    }
  });

  it("rejects changed legal facts even when the rendered facts change with them", () => {
    const evidence = validEvidence(governedSources);
    const changedFacts = { ...APPROVED_FACTS, entityName: "Changed Product Company" };
    const changedEvidence: WaterCheckReleaseEvidence = {
      ...evidence,
      approvedContent: evidence.approvedContent && {
        ...evidence.approvedContent,
        facts: changedFacts,
      },
    };

    expect(validateWaterCheckRelease(changedEvidence, releaseArtifacts(governedSources, changedEvidence)).errors).toEqual(
      expect.arrayContaining([expect.stringMatching(/governed-content digest/i)])
    );
  });

  it("rejects missing owner facts, unresolved tokens, and stale governed copy", () => {
    const approved = validEvidence(governedSources);
    const missingOwnerFacts: WaterCheckReleaseEvidence = {
      ...approved,
      approvedContent: null,
    };
    expect(validateWaterCheckRelease(missingOwnerFacts, releaseArtifacts(governedSources, missingOwnerFacts)).errors).toEqual(
      expect.arrayContaining([expect.stringMatching(/legal facts.*approval/i)])
    );

    const unresolvedCopy = ["approved landing health claims", "TODO: decide this claim", RESOLVED_DEPLOYMENT_INVENTORY];
    const unresolvedEvidence = validEvidence(unresolvedCopy);
    expect(validateWaterCheckRelease(unresolvedEvidence, releaseArtifacts(unresolvedCopy, unresolvedEvidence)).errors).toEqual(
      expect.arrayContaining([expect.stringMatching(/unresolved token/i)])
    );

    const staleSources = [...governedSources, "changed after approval"];
    expect(validateWaterCheckRelease(approved, releaseArtifacts(staleSources, approved)).errors).toEqual(
      expect.arrayContaining([expect.stringMatching(/digest/i)])
    );
  });

  it("rejects unsupported data-rights promises and invented fixed retention periods", () => {
    const approved = validEvidence(governedSources);
    expect(
      validateWaterCheckRelease(
        approved,
        releaseArtifacts([...governedSources, "You can export and delete your data."], approved)
      ).errors
    ).toEqual(
      expect.arrayContaining([expect.stringMatching(/unsupported deletion or export promise/i)])
    );
    expect(
      validateWaterCheckRelease(
        approved,
        releaseArtifacts([...governedSources, "We retain request logs for 30 days."], approved)
      ).errors
    ).toEqual(
      expect.arrayContaining([expect.stringMatching(/unverified fixed retention period/i)])
    );
  });

  it("rejects an unresolved deployment inventory despite synthetically valid approval metadata", () => {
    const unresolvedInventory = RESOLVED_DEPLOYMENT_INVENTORY.replace("Status: **Approved**", "Status: **Unresolved**").replace(
      "| Request and log fields | Request fields | Evidence bundle section 2 | Verified |",
      "| Request and log fields | Request fields | Evidence bundle section 2 | Pending |"
    );
    const unresolvedSources = ["approved landing health claims", "approved legal copy", unresolvedInventory];
    const evidence = validEvidence(unresolvedSources);
    const syntheticallyApprovedEvidence: WaterCheckReleaseEvidence = {
      ...evidence,
      deploymentInventoryApproval: {
        approvedBy: "Infrastructure owner",
        approvedAt: "2026-09-14",
        contentDigest: createWaterCheckDeploymentInventoryDigest(unresolvedInventory),
      },
    };

    expect(
      validateWaterCheckRelease(
        syntheticallyApprovedEvidence,
        releaseArtifacts(unresolvedSources, syntheticallyApprovedEvidence, unresolvedInventory)
      ).errors
    ).toEqual(
      expect.arrayContaining([
        expect.stringMatching(/inventory status/i),
        expect.stringMatching(/request and log fields/i),
      ])
    );
  });

  it("rejects a deployment inventory changed after its approval", () => {
    const evidence = validEvidence(governedSources);
    const changedInventory = `${RESOLVED_DEPLOYMENT_INVENTORY}\nConfiguration changed after approval.\n`;
    const changedSources = ["approved landing health claims", "approved legal copy", changedInventory];

    expect(
      validateWaterCheckRelease(evidence, releaseArtifacts(changedSources, evidence, changedInventory)).errors
    ).toEqual(expect.arrayContaining([expect.stringMatching(/deployment-inventory digest/i)]));
  });

  it("rejects a deployment inventory omitted from the governed-content sources", () => {
    const sourcesWithoutInventory = ["approved landing health claims", "approved legal copy"];
    const evidence = validEvidence(sourcesWithoutInventory);

    expect(
      validateWaterCheckRelease(evidence, releaseArtifacts(sourcesWithoutInventory, evidence)).errors
    ).toEqual(expect.arrayContaining([expect.stringMatching(/included in the governed-content sources/i)]));
  });

  it("rejects malformed or unverified entity, effective-date, contact, and inventory evidence", () => {
    const evidence: WaterCheckReleaseEvidence = {
      ...validEvidence(governedSources),
      approvedContent: {
        facts: {
          entityName: "UNRESOLVED",
          contactPath: "mailto:unknown@example.com",
          effectiveDate: "soon",
        },
        approvedBy: "Product owner",
        approvedAt: "2026-09-14",
        governedContentDigest: createWaterCheckGovernedDigest([
          ...governedSources,
          JSON.stringify({
            entityName: "UNRESOLVED",
            contactPath: "mailto:unknown@example.com",
            effectiveDate: "soon",
          }),
        ]),
      },
      deploymentInventoryApproval: {
        approvedBy: "Infrastructure owner",
        approvedAt: "soon",
        contentDigest: createWaterCheckDeploymentInventoryDigest(RESOLVED_DEPLOYMENT_INVENTORY),
      },
    };
    expect(validateWaterCheckRelease(evidence, releaseArtifacts(governedSources, evidence)).errors).toEqual(
      expect.arrayContaining([
        expect.stringMatching(/entity name/i),
        expect.stringMatching(/contact path/i),
        expect.stringMatching(/effective date/i),
        expect.stringMatching(/deployment inventory/i),
      ])
    );
  });
});
