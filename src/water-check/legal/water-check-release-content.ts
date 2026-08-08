export type WaterCheckReleaseFacts = {
  entityName: string;
  contactPath: string;
  effectiveDate: string;
};

export type WaterCheckReleaseRecord = {
  candidates: {
    entityName: string;
    contactPath: string;
  };
  approvedContent: {
    facts: WaterCheckReleaseFacts;
    approvedBy: string;
    approvedAt: string;
    governedContentDigest: string;
  } | null;
  deploymentInventoryApproval: {
    approvedBy: string;
    approvedAt: string;
    contentDigest: string;
  } | null;
};

export type WaterCheckRenderedReleaseFacts = {
  entityName: string | null;
  contactPath: string | null;
  effectiveDate: string | null;
};

export const WATER_CHECK_PENDING_APPROVAL_LABEL = "Pending owner approval";

export const WATER_CHECK_RELEASE_RECORD: WaterCheckReleaseRecord = {
  candidates: {
    entityName: "Expected End LLC",
    contactPath: "/about#contact",
  },
  approvedContent: {
    facts: {
      entityName: "Expected End LLC",
      contactPath: "/about#contact",
      effectiveDate: "2026-08-08",
    },
    approvedBy: "Denzel Rigaud",
    approvedAt: "2026-08-08",
    governedContentDigest: "sha256:d9dc2729e2fb555c82828d8a2bc6dd17db0dfff838a3a092e17e2c5e232eec39",
  },
  deploymentInventoryApproval: {
    approvedBy: "Denzel Rigaud",
    approvedAt: "2026-08-08",
    contentDigest: "sha256:f14cff2749281a5723608829076699fdb737d8729b62d97dd0d0846416ef323e",
  },
};

export const getWaterCheckRenderedReleaseFacts = (
  releaseRecord: WaterCheckReleaseRecord
): WaterCheckRenderedReleaseFacts => ({
  entityName: releaseRecord.approvedContent?.facts.entityName ?? null,
  contactPath: releaseRecord.approvedContent?.facts.contactPath ?? null,
  effectiveDate: releaseRecord.approvedContent?.facts.effectiveDate ?? null,
});
