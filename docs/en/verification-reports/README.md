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

[VR-042](reports/VR-042/README.md) records P0-A source verification and synthetic local E2 evidence for cross-document launch single-flight and the canonical launch-proof ledger. Focused contracts pass `37/37`, the complete Apps Script suite passes `668/668` in `24.229s`, and ten local warm reloads observed a `153 ms` maximum/p95-by-10; native target-device, offline, POST-Redirect-GET, incremental Gmail History, Service Worker/Background Sync, staging, and production gates remain `UNVERIFIED` or `BLOCKED`. No screenshot evidence is claimed.
