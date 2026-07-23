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

## VR-027 — Adjustable desktop panes

- **Status:** PARTIAL
- **Date:** 2026-07-23
- **Coverage:** V3 `E-02`, accessible pointer/keyboard separators, bounded widths, collapse/restore, account-scoped P0 persistence, behavioral contracts, and the source-only release boundary.
- **Report:** [reports/VR-027/README.md](reports/VR-027/README.md)
- **Conclusion:** focused source contracts passed `90/90`; native Telegram Desktop/WebView drag, keyboard, visual, and restart acceptance remains `UNVERIFIED`.
- **Українське дзеркало:** [docs/uk/verification-reports/INDEX.md](../../uk/verification-reports/INDEX.md)

## VR-026 — Telegram Mini App viewport events

- **Status:** PARTIAL
- **Date:** 2026-07-23
- **Coverage:** V3 `E-01`, the Telegram viewport/safe-area event bridge, stable-height layout, the behavioral source contract, and the source-only release boundary.
- **Report:** [reports/VR-026/README.md](reports/VR-026/README.md)
- **Conclusion:** the source correction is prepared with a behavioral contract; native Desktop/mobile keyboard, resize, and safe-area acceptance remains `UNVERIFIED`.
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

## VR-008 — Dynamic active-mail context

- **Status:** PARTIAL
- **Date:** 2026-07-22
- **Coverage:** current multi-account state source, static fallback root causes, a derived active/shared view model, accessibility, responsive contract, and the release boundary.
- **Report:** [reports/VR-008/README.md](reports/VR-008/README.md)
- **Conclusion:** the source candidate removes the static identity model without changing the Gmail/OAuth contract; production verification is absent and v60 was not created.
- **Українське дзеркало:** [docs/uk/verification-reports/INDEX.md](../../uk/verification-reports/INDEX.md)

## VR-010 — v62 cumulative release attempt and exact rollback

- **Status:** BLOCKED
- **Date:** 2026-07-22
- **Coverage:** merged P0 source, immutable v62, local/CI gates, staging and production UI readbacks, delivery dedupe boundary, unavailable Apps Script execution evidence, and exact rollback to v57.
- **Report:** [reports/VR-010/README.md](reports/VR-010/README.md)
- **Conclusion:** client acceptance passed, but the inherited GT-030 worker risk was not closed by an execution trace; production was restored to exact v57, staging is `0`, and immutable v62 is preserved.
- **Українське дзеркало:** [docs/uk/verification-reports/INDEX.md](../../uk/verification-reports/INDEX.md)

## VR-011 — Immutable v63 and GT-030 runtime closure

- **Status:** VERIFIED
- **Date:** 2026-07-22
- **Coverage:** GT-030 causal correction, cumulative immutable v63, source/CI gates, owner-only native staging, production activation, seven-run no-overlap trace, cleanup and exact residual boundaries.
- **Report:** [reports/VR-011/README.md](reports/VR-011/README.md)
- **Conclusion:** stable/HEAD are exact v63, staging is `0`, and the worker no-overlap gate is verified; scenario-specific P0 items remain partial where their own evidence is absent.
- **Українське дзеркало:** [docs/uk/verification-reports/INDEX.md](../../uk/verification-reports/INDEX.md)

## VR-012 — GT-031 narrow active-account header source correction

- **Status:** PARTIAL
- **Date:** 2026-07-22
- **Coverage:** observed production-v63 clipping, render-layer root cause, stable-ID disclosure implementation, focused/full automated contracts, immutable-v63 boundary and required live acceptance.
- **Report:** [reports/VR-012/README.md](reports/VR-012/README.md)
- **Conclusion:** the source correction is locally verified; production remains v63 and native staging/production visual acceptance is still unverified.
- **Українське дзеркало:** [docs/uk/verification-reports/INDEX.md](../../uk/verification-reports/INDEX.md)

## VR-013 — v64 production acceptance and GT-031/GT-037 closure

- **Status:** VERIFIED
- **Date:** 2026-07-22
- **Coverage:** exact v63 rollback, cumulative v64 hashes, bounded deployment reconciliation, one staging deployment, native account-context acceptance, live promotion, two production launches, cleanup and explicit runtime limits.
- **Report:** [reports/VR-013/README.md](reports/VR-013/README.md)
- **Conclusion:** immutable v64 is production/HEAD with staging `0` and journal `cleaned`; GT-031 and GT-037 are verified, while the remaining P0 scenarios stay partial.
- **Українське дзеркало:** [docs/uk/verification-reports/INDEX.md](../../uk/verification-reports/INDEX.md)

## VR-014 — GT-036 production client release detection correction

- **Status:** PARTIAL
- **Date:** 2026-07-22
- **Coverage:** canonical manifest-field mismatch, stale v60 marker in production-v64 source, exact v65 source marker, and real-manifest one-reload/no-loop regression contract.
- **Report:** [reports/VR-014/README.md](reports/VR-014/README.md)
- **Conclusion:** the source correction is deployed in v65 and fresh launches pass; the defective v64-to-v65 automatic transition remains unprovable.
- **Українське дзеркало:** [docs/uk/verification-reports/INDEX.md](../../uk/verification-reports/INDEX.md)

## VR-015 — SENT+INBOX exactly-once delivery correction

- **Status:** PARTIAL
- **Date:** 2026-07-23
- **Coverage:** controlled production observation, worker telemetry, deterministic source root cause, exactly-once regression contract, and v65/v66 release boundary.
- **Report:** [reports/VR-015/README.md](reports/VR-015/README.md)
- **Conclusion:** the production-v65 exclusion is verified and the source correction passed `161/161`; live acceptance requires cumulative v66.
- **Українське дзеркало:** [docs/uk/verification-reports/INDEX.md](../../uk/verification-reports/INDEX.md)

## VR-016 — P0 ONE-SECOND launch and offline-first boundary

- **Status:** PARTIAL
- **Date:** 2026-07-23
- **Coverage:** v66 safe terminal state, duplicate-launch root cause, bridge/boot single-flight source correction, cache security ordering, platform boundary and v67 release gates.
- **Report:** [reports/VR-016/README.md](reports/VR-016/README.md)
- **Conclusion:** local contracts `5/5 + 14/14 + 88/88` are green; production remains v65 and native one-second/offline/account-switch acceptance has not run.
- **Українське дзеркало:** [docs/uk/verification-reports/INDEX.md](../../uk/verification-reports/INDEX.md)

- **VR-016 final local gate:** cumulative `518/518` and every documentation validator passed.

## VR-017 — V3 cache-first launch hardening

- **Status:** PARTIAL
- **Date:** 2026-07-23
- **Coverage:** REQ-0035 recovery boundary, confirmed v67 source defects, the immutable v68 code correction, owner/account cache isolation, local/CI gates, owner-only native staging, platform limits, and fail-closed abandon.
- **Report:** [reports/VR-017/README.md](reports/VR-017/README.md)
- **Conclusion:** the final suite is `531/531`; multi-account switching/shared context passed partial native acceptance, but the one-second/offline/draft gate did not. v68 was not promoted; production is v65, staging is `0`, immutable v68 is retained, and the journal is `abandoned`.
- **Українське дзеркало:** [docs/uk/verification-reports/INDEX.md](../../uk/verification-reports/INDEX.md)

## VR-018 — Exact identity for Telegram attachments

- **Status:** PARTIAL
- **Date:** 2026-07-23
- **Coverage:** V3 `B-01`, the ordinal-callback root cause, opaque exact identity, fail-closed matching, historical callback compatibility, the complete role/zone/invite/revocation access matrix, and the release boundary.
- **Report:** [reports/VR-018/README.md](reports/VR-018/README.md)
- **Conclusion:** the source correction, prior local `532/532` suite, and focused `7/7` access matrix are VERIFIED; closing the access gap required no `MultiAccount.gs` change. Native Telegram download, staging acceptance, and deployment remain `UNVERIFIED`.
- **Українське дзеркало:** [docs/uk/verification-reports/INDEX.md](../../uk/verification-reports/INDEX.md)

## VR-019 — Error/RCA registry and agent failure prevention

- **Status:** VERIFIED
- **Date:** 2026-07-23
- **Coverage:** V3 `T-04`, a standalone bilingual causal registry, prevention playbook, navigation, authority boundary, and documentation validation.
- **Report:** [reports/VR-019/README.md](reports/VR-019/README.md)
- **Conclusion:** confirmed failures are consolidated without changing historical evidence; the playbook is a quality gate, not an authority source. Runtime/release state is unchanged.
- **Українське дзеркало:** [docs/uk/verification-reports/INDEX.md](../../uk/verification-reports/INDEX.md)

## VR-020 — Reader scroll and focus stability

- **Status:** PARTIAL
- **Date:** 2026-07-23
- **Coverage:** V3 `A-03`, unconditional reader-root replacement, stable content anchors, focus restoration, layout-shift handling, local regression/full-suite evidence, and the release boundary.
- **Report:** [reports/VR-020/README.md](reports/VR-020/README.md)
- **Conclusion:** the source correction and complete `540/540` suite are VERIFIED; native desktop/mobile, real remote-image layout, staging acceptance, and deployment remain `UNVERIFIED`.
- **Українське дзеркало:** [docs/uk/verification-reports/INDEX.md](../../uk/verification-reports/INDEX.md)

## VR-021 — Honest shared transfer-manager foundation

- **Status:** PARTIAL
- **Date:** 2026-07-23
- **Coverage:** V3 `B-03`, fragmented transfer state, the canonical lifecycle/store, bounded scheduling, truthful byte/indeterminate progress, cancellation/retry capability boundaries, local integration evidence, and release limits.
- **Report:** [reports/VR-021/README.md](reports/VR-021/README.md)
- **Conclusion:** the shared source foundation and complete `551/551` suite are VERIFIED; remaining lanes, native slow-network acceptance, resumable restart, staging, and deployment remain `UNVERIFIED`.
- **Українське дзеркало:** [docs/uk/verification-reports/INDEX.md](../../uk/verification-reports/INDEX.md)

## VR-022 — Fail-closed attachment preview matrix

- **Status:** PARTIAL
- **Date:** 2026-07-23
- **Coverage:** V3 `B-02`, the active SVG surface, PDF sandboxing, untrusted ZIP metadata, bounded reads, traversal/encryption/symlink/bomb guards, behavioral/full-suite evidence, and the release boundary.
- **Report:** [reports/VR-022/README.md](reports/VR-022/README.md)
- **Conclusion:** source hardening and the complete `560/560` suite are VERIFIED; native preview/fallback acceptance, staging, and deployment remain `UNVERIFIED`.
- **Українське дзеркало:** [docs/uk/verification-reports/INDEX.md](../../uk/verification-reports/INDEX.md)

## VR-023 — Persistent app session after reload

- **Status:** PARTIAL
- **Date:** 2026-07-23
- **Coverage:** `REQ-0036`, loss of memory-only refresh state, replay of an already-consumed launch proof, Telegram `SecureStorage`, single-flight recovery, bounded idempotent refresh rotation, local regression/full-suite evidence, native v65/v69 and v65/v70 A/B, hard reload, shared quota evidence, and terminal release cleanup.
- **Report:** [reports/VR-023/README.md](reports/VR-023/README.md)
- **Conclusion:** the source/session correction is locally VERIFIED. v69 hard reload ended with `UNTRUSTED_NONCE_REPLAY`; v70 later opened the native mailbox once, but secondary switching and a fresh v65 launch hit the same generic error while execution telemetry confirmed `urlfetch_quota`. v70 was not promoted, exact staging was removed, and production remains v65. One-second, offline, Desktop recovery, mobile, and concurrency acceptance remain `PARTIAL`/`UNVERIFIED`.
- **Українське дзеркало:** [docs/uk/verification-reports/INDEX.md](../../uk/verification-reports/INDEX.md)

## VR-024 — Fail-fast URL Fetch quota circuit

- **Status:** PARTIAL
- **Date:** 2026-07-23
- **Coverage:** authenticated continuation evidence after the first daily-quota error, transport signal propagation, the content-free 15-minute probe circuit, timer fail-fast behavior, deterministic/full-suite evidence, and the source-only release boundary.
- **Report:** [reports/VR-024/README.md](reports/VR-024/README.md)
- **Conclusion:** the repeated quota-dependent continuation is VERIFIED and corrected in source. Runtime-budget contracts `9/9` and the complete suite `593/593` pass. Live quota recovery, staging, native acceptance, and production promotion remain `UNVERIFIED`.
- **Українське дзеркало:** [docs/uk/verification-reports/INDEX.md](../../uk/verification-reports/INDEX.md)

## VR-025 — `INBOX+SENT` policy conflict

- **Status:** CONFLICTING
- **Date:** 2026-07-23
- **Coverage:** V3 `T-03`, owner request history, production v65, current source/tests, `GT-039`, and the release boundary.
- **Report:** [reports/VR-025/README.md](reports/VR-025/README.md)
- **Conclusion:** the production skip and current-source exactly-once behavior are both evidenced, but owner policy conflicts; release of this delta is `BLOCKED` until one direct decision.
- **Українське дзеркало:** [docs/uk/verification-reports/INDEX.md](../../uk/verification-reports/INDEX.md)

## VR-028 — Direct Google Drive OAuth contracts

- **Status:** PARTIAL
- **Date:** 2026-07-23
- **Coverage:** V3 `D-01`, owner-bound one-use state, strict callback envelope, provider isolation, token-free DTOs, fail-closed refresh/generation handling, and exact disconnect.
- **Report:** [reports/VR-028/README.md](reports/VR-028/README.md)
- **Conclusion:** a source defect is confirmed and minimally corrected; the focused synthetic matrix provides local evidence. Native Google/deployed callback and user-visible acceptance remain `UNVERIFIED`.
- **Українське дзеркало:** [docs/uk/verification-reports/INDEX.md](../../uk/verification-reports/INDEX.md)

## VR-029 — Separation of the read-only Spam list and proactive policy

- **Status:** PARTIAL
- **Date:** 2026-07-23
- **Coverage:** V3 `G-01`, `/mail folder:spam`, exact `SPAM` system label, bounded pagination, the read-only endpoint boundary, a separate time-slice notification scan, and the current-`INBOX` delivery gate.
- **Report:** [reports/VR-029/README.md](reports/VR-029/README.md)
- **Conclusion:** source already had the correct separation; missing direct regression evidence was added without a product-code mutation. Focused `2/2` and full `612/612` are VERIFIED; native owner acceptance remains `UNVERIFIED`.
- **Українське дзеркало:** [docs/uk/verification-reports/INDEX.md](../../uk/verification-reports/INDEX.md)

| [VR-030](reports/VR-030/README.md) | Box OAuth least privilege, strict callback, and stable identity | `PARTIAL` | `REQ-0035`, `GT-059`, `B1-39`, `RCA-012` |

| [VR-031](reports/VR-031/README.md) | D-03 Smart, safe URL resolver | `PARTIAL` | `REQ-0035`, `GT-060`, `B1-40`, `RCA-013` |

| [VR-032](reports/VR-032/README.md) | E-03 navigation and actual mailbox context | `PARTIAL` | `REQ-0035`, `GT-061`, `B1-41`, `RCA-014` |

| [VR-033](reports/VR-033/README.md) | E-04 Gmail label-management regression audit | `CONFLICTING` | `REQ-0035`, `GT-027`, `B1-21`, `VR-005` |

| [VR-034](reports/VR-034/README.md) | E-05 list semantics, multi-selection, and deterministic activation | `PARTIAL` | `REQ-0035`, `GT-062`, `B1-42`, `RCA-015` |

| [VR-035](reports/VR-035/README.md) | F-01 reader fidelity, RTL, and remote-image privacy | `PARTIAL` | `REQ-0035`, `GT-063`, `B1-43`, `RCA-016` |

| [VR-036](reports/VR-036/README.md) | F-02 consistent message actions and account-correct Gmail handoff | `PARTIAL` | `REQ-0035`, `GT-064`, `B1-44`, `RCA-017` |

| [VR-037](reports/VR-037/README.md) | F-03 computed typography and narrow account-label regression | `PARTIAL` | `REQ-0035`, `GT-032`, `B1-25`, `RCA-018` |
