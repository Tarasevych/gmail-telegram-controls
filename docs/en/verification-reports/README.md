# Independent factual verification reports

[Index](INDEX.md) | [Schema](REPORT_SCHEMA.md) | [Evidence policy](EVIDENCE_POLICY.md) | [Українська](../../uk/verification-reports/README.md)

Source request: `REQ-0004`.

This area is a separate evidence layer between the report-derived knowledge hub and current PROJECT/ROADMAP/ISSUES. It does not repeat summaries as truth: every atomic claim receives its own scope, status, evidence grade, provenance, dependencies, conflicts, sensitivity, and limitations.

## Current report

- [VR-001](reports/VR-001/README.md): independent verification of 245/245 KH claims.
- [Atomic claim ledger](reports/VR-001/CLAIMS.md): one result for every canonical ID.
- [Machine index](../../verification-reports/index.json) and [machine claims](../../verification-reports/VR-001/claims.json).

## Reading order

1. Start with INDEX and select the required report ID.
2. Read the report README and its limitations.
3. Open only the required claim in CLAIMS.
4. Follow the immutable Git evidence link to the real file or commit.
5. Require E4/E5 for runtime or production, not E1/E2.

A permission claim is verified only against a canonical owner-granted record. A recommendation is not authority. This area does not create a new Versie, deployment, or runtime change.

## Latest report

[VR-047](reports/VR-047/README.md) records P0-F source verification of the encrypted offline bootstrap and read-only cache unlock. Focused contracts pass `33/33` and the complete Apps Script suite passes `701/701` in `25.944s`; exact owner/bootstrap AAD, transient-only fallback, and RPC blocking have source evidence. Fresh offline document launch, native Telegram target-device acceptance, staging, and production remain `UNVERIFIED` or `BLOCKED`.
