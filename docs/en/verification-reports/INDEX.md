# Verification report index

[Home](README.md) | [Schema](REPORT_SCHEMA.md) | [Evidence policy](EVIDENCE_POLICY.md) | [Українська](../../uk/verification-reports/INDEX.md)

Source request: `REQ-0004`.

| Report | Date | Target | Coverage | Result |
|---|---|---|---:|---|
| [VR-001](reports/VR-001/README.md) | 2026-07-19 | `2b3b9e2f678f` | 245/245 | `verified` 17, `contradicted` 13, `partial` 82, `unverified` 35, `blocked` 7, `recommendation` 91 |
| [VR-002](reports/VR-002/README.md) | 2026-07-20 | `f96d8f0` + production v42 | 8/8 | `verified` 5, `partial` 2, `blocked` 1 |

[Machine-readable index](../../verification-reports/index.json).

A historical report is not rewritten after publication to hide an error. A new independent contradiction or stronger evidence is added under a new report ID or an explicitly traced correction change.

## VR-003 (2026-07-21)

[VR-003](reports/VR-003/README.md) is the two-corpus factual verification for Versie 1. It publishes 32 sanitized atomic claims, complete source coverage metadata, confirmed root causes, and explicit runtime/release gates. Machine-readable artifacts: [manifest](../../verification-reports/VR-003/manifest.json), [claims](../../verification-reports/VR-003/claims.json), and [source manifest](../../verification-reports/VR-003/source-manifest.json).

## VR-004 (2026-07-21)

[VR-004](reports/VR-004/README.md) is the stabilization/root-cause audit after the v56 rollback and v57 staging. It separates production-accepted v55 from the candidate line, records the shared URLFetch quota blocker, and defines a fail-closed A/B plan. Appendices contain the [complete audit of 26 CI failures](reports/VR-004/CI_FAILURE_AUDIT.md), [v55/v57 runtime evidence](reports/VR-004/RUNTIME_QUOTA_EVIDENCE.md), the [Stage 1 continuation audit](reports/VR-004/STAGE_1_CONTINUATION_AUDIT.md), and the [Advanced Gmail compatibility analysis](reports/VR-004/ADVANCED_GMAIL_COMPATIBILITY.md). The current VR-003 machine index is unchanged without a separate validator-contract change.

## VR-005 — Gmail label management

- **Status:** PARTIAL
- **Date:** 2026-07-22
- **Coverage:** official Gmail API constraints, mutation-free production baseline, root cause, implementation, automated and responsive visual checks, and release boundary.
- **Report:** [reports/VR-005/README.md](reports/VR-005/README.md)
- **Note:** the shared machine index remains at VR-003; VR-005 does not change the machine-report contract.
- **Українське дзеркало:** [docs/uk/verification-reports/INDEX.md](../../uk/verification-reports/INDEX.md)

## VR-007 — v59 release attempt and exact rollback

- **Status:** PARTIAL
- **Date:** 2026-07-22
- **Coverage:** bounded authority, PR #16/#11 integration, immutable v59, local/CI gates, owner-only UI acceptance, promotion, production launches, cleanup, post-cleanup execution overlap, and exact rollback.
- **Report:** [reports/VR-007/README.md](reports/VR-007/README.md)
- **Conclusion:** UI/stale-route acceptance passed, but the runtime gate failed; safe production was restored to v57, staging is `0`, and v60 was not created.
- **Українське дзеркало:** [docs/uk/verification-reports/INDEX.md](../../uk/verification-reports/INDEX.md)

## VR-006 — Cumulative v58 staging A/B

- **Status:** BLOCKED
- **Date:** 2026-07-22
- **Coverage:** PR #16/#11 integration, immutable v58, local/CI gates, owner-only staging, controlled v57/v58 A/B, Apps Script execution localization, and the safe-state boundary.
- **Report:** [reports/VR-006/README.md](reports/VR-006/README.md)
- **Conclusion:** no candidate-specific regression is proven; the shared pre-handler transport/deployment-access cause remains UNVERIFIED, so promotion is blocked.
- **Українське дзеркало:** [docs/uk/verification-reports/INDEX.md](../../uk/verification-reports/INDEX.md)
