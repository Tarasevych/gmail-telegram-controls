# Roadmap

Updated: **2026-07-21**. Single active version: **Versie 1**.

| ID | Status | Step | Completion evidence |
|---|---|---|---|
| B1-01 | Completed | Restore the v45 source of truth and inspect Git/production | correct remote; production v37 confirmed |
| B1-02 | Completed | Identify the cause of duplicate Telegram cards | legacy + OAuth double scan found; one trigger confirmed |
| B1-03 | Completed locally | Owner mailbox dedupe, avatar, direct OAuth start, stale account count | local contracts pass |
| B1-04 | Completed locally | Neutral GitHub OAuth callback with a credentialless POST to Apps Script | query cleared before transfer; one-use user/chat/zone state; Google multi-login cookies omitted |
| B1-05 | Completed | Save the new redirect URI in the Google OAuth client | `OAuth client saved`; exact URI read back |
| B1-06 | Completed | Credentialless OAuth relay and sequential immutable v41/v42 | stable v42, staging 0, exact v41 rollback |
| B1-07 | Unverified | Add a new controlled Gmail account through a fresh OAuth flow | existing connections work; no new account choice/consent/callback was performed during E4/E5 |
| B1-08 | Completed in production for the owner lane | Full real-time acceptance in @TarasevychGmailNotifierBot | stable v55 automatically delivered one card; two `/check` runs created no duplicate; exact-marker count remained 1 |
| B1-09 | Completed | Promote, clean up, and install the production Web App menu | stable v55, staging 0, legacy staging 0, journal `cleaned`; menu opens the neutral GitHub Pages bridge |
| B1-10 | Completed | Update UK/EN docs, commit, and push | postmortem and lessons published at c98e69e; three documentation Actions passed; release tag remains gated by B1-07/B1-08 |

| B1-11 | Completed in production | Separate realtime delivery from the frozen backlog and run it before maintenance | the bounded recent-window lane in stable v55 delivered the controlled message before backlog maintenance |
| B1-12 | Partially staging verified | Aggregate every notification account into one physical Telegram feed with account identity and account-scoped actions | three isolated account roots and one-click switching passed; independent live fan-out from a second account remains unverified |

## Movement rule

Versie 2 is not opened without the exact owner instruction `Next Versie authorization: yes, Versie 2`. Until that instruction, every authorized change remains on the active Versie 1 line, but no existing immutable Apps Script artifact is rewritten. New findings receive a `GT-*` record in [ISSUES.md](ISSUES.md).

## B1-20–B1-22 superseding update after v59 — 2026-07-22

- **B1-20:** the owner-only Advanced Gmail adapter is integrated into immutable v59, but the protected flag remained disabled; mailbox acceptance does not prove quota reduction. Status: `PARTIAL`.
- **B1-21:** the label UI was live-verified on v59 staging: create/manage controls, USER/SYSTEM separation, bounded scrolling, and long nested names worked without overlap. Mutating label operations were not run; production is v57 again after GT-030. Status: `PARTIAL`.
- **B1-22:** stale automatic-route recovery was live-verified on v59 staging and two production launches. The fix is not part of current v63 after the exact rollback. Status: `PARTIAL`.

## B1-23 — v59 runtime gate and exact rollback

- **Status:** BLOCKED; safe state restored.
- **Completed:** immutable v59 was staged once, UI acceptance passed, promotion and two production launches passed, and cleanup removed staging.
- **Blocker:** a post-cleanup `214.96 s` execution exceeded the 150-second target and overlapped the next execution window; root cause is `UNVERIFIED`.
- **Protection:** exact rollback to v63; stable and HEAD v63, staging `0`, journal `rolled_back`; a fresh rollback mailbox launch passed.
- **Next:** investigate GT-030 without creating a repeat immutable. The next cumulative candidate is allowed only for a new causal code delta, not an endless staging loop.
- **Evidence:** [VR-007](verification-reports/reports/VR-007/README.md). Source requests: `REQ-0030`, `REQ-0031`.

## Cumulative research roadmap

Long-term report-derived phases, dependencies, and evidence gates are in the [Master Roadmap](knowledge-hub/MASTER_ROADMAP.md). The current `B1-*` release gates above remain authoritative for Versie 1.

## Verification gate

`VR-001` completed repository/test classification for 245/245 `KH-*` claims: [report](verification-reports/reports/VR-001/README.md). E4/E5 for the existing owner connection and the v55 promotion are now evidenced; they do not close B1-07 fresh OAuth or B1-12 second-account fan-out. Current continuation: `REQ-0018`.

### B1-13 — Concurrent Gmail OAuth refresh isolation

- **Status:** deployed in stable v55; concurrency verified by deterministic local tests.
- **Result:** each Gmail connection now uses a short ScriptLock only for claim/commit/release plus a lease in protected Script Properties; HTTP refresh runs outside the lock.
- **Invariants:** an active lease prevents a second provider fetch; connection ID, email, token generation, and the current token record are rechecked before commit; a failure releases its owned lease without changing the protected token.
- **Evidence:** deterministic local tests and the candidate hash pin for the current Versie 1.
- **Source request:** REQ-0015.
- **Production evidence:** immutable v55, E4/E5, and cleanup passed; no forced live token refresh or fresh OAuth cycle was performed.

### B1-14 — Conflict-free bridge and product integration

- **Status:** completed.
- **Result:** bridge-only PR #2 (`a7df53c`) and product PR #1 (`ee9286e`) merged normally; the `delete/modify` conflict kept the verified bridge from `main`.
- **No loss:** product fixes, immutable history, and rollback v50 remain; the obsolete bridge deletion was not carried forward.

### B1-15 — Cold start and production observability

- **Status:** in progress.
- **GT-021:** the first Web App open can require a refresh after a prolonged skeleton.
- **GT-022:** `clasp logs` requires the exact verified GCP project ID; do not guess identity.

### B1-16 — Close the delivery-worker overlap gate

- **Status:** VERIFIED
- **Release:** immutable v64 is production and HEAD; staging is `0`. The worker code accepted in v63 is unchanged in v64.
- **Completed:** deterministic reproduction, tokenized seven-minute crash lease, 150-second soft stage deadline, token-matched release, focused `17/17`, cumulative `501/501`, v63 owner acceptance and seven successive no-overlap runtime executions.
- **v64 observation:** six post-cleanup executions completed. One 3.164-second process shell overlapped the preceding row by about 5.7 seconds; no concurrent long-running worker body was observed, while the exact lease-rejection substage remains UNVERIFIED.
- **Evidence:** [VR-011](verification-reports/reports/VR-011/README.md), [v63 release report](reports/VERSIE_001_V63_RELEASE_AND_GT030_CLOSURE_2026-07-22.md), and [VR-013](verification-reports/reports/VR-013/README.md).
- **Residual boundary:** History-substage telemetry and external automatic INBOX after v64 remain separate evidence items, not a rewrite of the verified GT-030 source/runtime gate.
### B1-17 — Google primary-source gate and publication surfaces

- Review the canonical Advanced Gmail Service and Advanced Google services pages before Gmail/Apps Script changes, and record the access date and decision.
- GitHub remains the canonical code/history repository; Apps Script is runtime; Developer Profile is a discovery index, not a Git mirror.
- CI must test LF/CRLF-stable evidence hashing before factual verification report validation.
- **Status:** tooling/docs candidate; Gmail runtime and Versie are unchanged.
- **Source:** `REQ-0021`.

### B1-18 — Connection-scoped metadata transport

- **GT-025:** remove the hardcoded Apps Script owner token from parallel `threads.get` metadata.
- Keep direct Gmail API transport for external OAuth connections; evaluate Advanced Gmail Service only as a separate owner-lane adapter.
- Next quota-reduction spike: one Gmail HTTP batch with a fail-closed multipart/Content-ID parser and no connection-token mixing.
- **Status:** source candidate; live staging/production is `unverified`.
- **Source:** `REQ-0021`.

### B1-19 — Shared bootstrap A/B after the v56 rollback

- **Status:** completed and verified on 2026-07-22.
- **Safe state:** stable production v63; immutable v56 is historical; exact v55 rollback is preserved; staging is `0`; the Telegram menu points to production.
- **A/B evidence:** two fresh v55 mailbox launches passed; signed v57 staging showed the avatar, three roots, and switching to the controlled second account and back without OAuth; after promotion two v57 production launches passed.
- **Delivery gate:** an independent owner-controlled external `INBOX` automatically created one Telegram card with the correct account marker; two `/check` runs created no duplicate. Self/alias `INBOX+SENT` probes were correctly skipped.
- **Release rule:** do not rewrite immutable v56/v57; do not create Versie 2 or the next immutable without a new exact owner instruction.
- **Source requests:** REQ-0019, REQ-0021.

### B1-20 — Owner-only Advanced Gmail read adapter

- **Status:** PARTIAL — integrated into immutable v58/v59, the protected flag is not enabled, and live evidence awaits v59 acceptance.
- Keep an allowlisted `messages.list`, `messages.get`, and `history.list` adapter behind protected property `GMAIL_OWNER_ADVANCED_READ_V1=enabled`.
- Resolve the current connection through the registry and fail closed unless its provider is `apps_script_owner`; every external OAuth connection keeps its own direct HTTP token path.
- Keep mutations and unsupported reads on direct HTTP, and propagate Advanced Service failures without an automatic fallback.
- **Evidence boundary:** pre-sync deterministic adapter tests passed 8/8. Current `main` evidence is preserved, while the candidate still intentionally differs from immutable v57, so the exact release-hash gate remains expected until a separately authorized next immutable. The flag remains unset, production remains exact v57, staging is `0`, and live quota reduction is `unverified`.
- **Source requests:** `REQ-0024`, `REQ-0027`.

## Roadmap update — 2026-07-22

- [x] Verify automatic delivery for the primary Gmail root.
- [x] Verify automatic delivery for root-2 with the correct account marker.
- [x] Verify automatic delivery for root-3 with the correct account marker.
- [x] Verify deduplication for each secondary root with two repeated /check operations.
- [x] Separate Gmail Spam classification from a product delivery failure.
- [x] Close the secondary-root portion of B1-16 and B1-19 production evidence.
- [ ] New Google OAuth consent remains a separate manual gate and is not initiated without demonstrated technical need.
- [ ] The next Versie is not authorized; all further fixes remain within Versie 1.

## B1-21 — Unified accessible Gmail label management

  - **Status:** CONFLICTING — source regression is VERIFIED, while the current native owner report has not been independently reproduced.
- **Date:** 2026-07-22
- **Scope:** one USER/SYSTEM label model for the sidebar and profile panel; create, rename, guarded delete, full-path nesting, accessibility, responsive layout, loading/error/retry, and account isolation.
- **Implemented:** VERIFIED locally in [4ac0b90](https://github.com/Tarasevych/gmail-telegram-controls/commit/4ac0b90fbdbe7c9032789da1734bb986795fab91).
  - **Evidence:** [GT-027](ISSUES.md), historical [VR-005](verification-reports/reports/VR-005/README.md), E-04 [VR-033](verification-reports/reports/VR-033/README.md).
  - **E-04 source gate:** `label.type`, not a name prefix or visibility, controls pencils/CRUD; focused `7/7`, full `619/619`.
  - **Remaining:** read-only native acceptance in a clean quota window against current production v65; no create/rename/delete action on real labels during acceptance.
- **Українське дзеркало:** [docs/uk/ROADMAP.md](../uk/ROADMAP.md)

## B1-22 — Recovery from a stale automatic thread route

- **Status:** PARTIAL — root cause and source fix VERIFIED; immutable v59 staged; live acceptance UNVERIFIED.
- **Completed:** direct production v57 inspection proved that mailbox/bootstrap, avatar, Inbox, and delivery work; the failure is localized to replayed automatic thread routing and reader recovery.
- **Source candidate:** the launcher consumes the route once; automatic initial/hash/resume failures return to the list; manual opens retain retry semantics. Targeted `238/238`, non-release `440/440`, and docs validators are green; two release hash guards correctly prevent changed source from masquerading as immutable v57/v58. Source request: `REQ-0029`.
- **Boundary:** production exact v57 is unchanged; immutable v59 and one owner-only staging deployment exist, the historical v58 staging was removed after exact replacement verification, and promotion is forbidden until acceptance passes.
- **Next evidence:** targeted/full/docs tests, a normal PR, and required checks; after separate release authority, run a new immutable staging acceptance with two fresh launches before any promotion.
- **Evidence:** [GT-028](ISSUES.md), [VR-006](verification-reports/reports/VR-006/README.md).
- **Українське дзеркало:** [docs/uk/ROADMAP.md](../uk/ROADMAP.md)

## B1-24 — Dynamic active-mail context

- **Status:** VERIFIED — source, native staging and production acceptance passed in immutable v64.
- **Date:** 2026-07-22.
- **Scope:** replace the static owner heading with a block derived from an opaque connection ID for one account or the actual shared view, without a second state model.
- **Implementation:** full name/email, Ukrainian genitive with a safe fallback, `Спільна пошта` only for two or more included accounts, accessible name-to-email disclosure, loading/empty/error states, responsive wrapping and a narrow-screen full-address disclosure.
- **Acceptance:** three isolated roots, real avatar plus fallback, alternate-account switch and return without OAuth, actual shared mapping, and two fresh production launches.
- **Tests:** focused `88/88`; final cumulative suite `505/505`.
- **Evidence:** [GT-031](ISSUES.md), [VR-013](verification-reports/reports/VR-013/README.md). Source requests: `REQ-0032` and `REQ-0033`.
- **Українське дзеркало:** [docs/uk/ROADMAP.md](../uk/ROADMAP.md).

## B1-35 — Telegram Mini App viewport events

- **Status:** PARTIAL
- **Source request:** `REQ-0035`
- **Completed in source:** idempotent subscriptions to `viewportChanged`, `safeAreaChanged`, and `contentSafeAreaChanged`; frame coalescing; live/stable height separation; app-shell sizing through the stable Telegram viewport.
- **Local acceptance:** the automated behavioral contract and complete suite are publication gates.
- **Release boundary:** source-only cumulative Versie 1; production v65, staging, menu, OAuth, and Gmail are unchanged.
- **Still required:** native Telegram Desktop/mobile acceptance with keyboard resize, safe-area, and a narrow viewport after the shared quota blocker and release-policy conflict are cleared.
- **Evidence:** [GT-055](ISSUES.md), [VR-026](verification-reports/reports/VR-026/README.md).

## B1-36 — Adjustable desktop panes

- **Status:** PARTIAL
- **Source request:** `REQ-0035`
- **Completed in source:** accessible pointer/keyboard separators, bounded rail/list widths, collapse-to-icons with restoration, and persistence through the existing account-scoped P0 cache.
- **Verified locally:** focused Mail App suite `90/90`; the complete suite and documentation/release/privacy gates run before publication.
- **Release boundary:** source-only cumulative Versie 1; production v65, staging, immutable history, menu, OAuth, and Gmail are unchanged.
- **Still required:** native Telegram Desktop/WebView acceptance for drag, keyboard, visual layout, and restoration after restart.
- **Evidence:** [GT-056](ISSUES.md), [VR-027](verification-reports/reports/VR-027/README.md).
## B1-25 — P0 fast navigation, bounded cache, drafts, typography and client updates

- **Status:** PARTIAL
- **Production boundary:** cumulative source is deployed as immutable v65; staging is `0`, journal is `cleaned`, and exact v64 is rollback.
- **Verified:** dynamic active context and narrow full-address disclosure, three isolated roots, switching without OAuth, shared mapping, production app-shell load, GT-030 worker gate, GT-037 bounded promotion and exact release cleanup.
- **F-03 source evidence:** computed desktop/mobile styles confirm a 14 px body and compose reading rhythm with no blanket bold or remote font; missed 10–11 px compose/settings/account surfaces are raised to a 12 px secondary scale and account labels wrap. See `GT-032`, `RCA-018`, and `VR-037`.
- **C-01 source evidence:** autosave status now derives from canonical draft state rather than a local timer: it has an exact acknowledgement time, offline queue, bounded retry, conflict boundary, and one manual retry action only after a terminal state. See `GT-045`, `RCA-021`, and `VR-040`.
- **Current source step:** source and production have different `INBOX+SENT` semantics for `GT-039`; `VR-025` classifies them as `CONFLICTING` and the release contour as `BLOCKED` pending an owner decision. An automatic v66 marker is no longer the valid next action.
- **Still required:** a direct owner decision for self/alias `INBOX+SENT`; future one-reload/no-loop evidence for GT-036; measured cold/warm and `A -> B -> A` traces; scroll/focus restoration; incremental arrival evidence; quota/LRU eviction; native offline/restart/cross-session draft recovery and conflict acceptance; and same-scale production typography comparison.
- **Related issues:** GT-032 through GT-036 and GT-038 remain open/partial; GT-039 is blocked; GT-031 and GT-037 are verified.
- **Rule:** continue within Versie 1. Create another immutable only for a separately tested cumulative code change after a clean preflight boundary.
- **Evidence:** [VR-009](verification-reports/reports/VR-009/README.md), [VR-013](verification-reports/reports/VR-013/README.md), [VR-014](verification-reports/reports/VR-014/README.md), [VR-015](verification-reports/reports/VR-015/README.md), [VR-025](verification-reports/reports/VR-025/README.md), [VR-037](verification-reports/reports/VR-037/README.md), and [VR-040](verification-reports/reports/VR-040/README.md). Source request: `REQ-0035`.

## B1-26 — P0 ONE-SECOND launch

- **Status:** PARTIAL
- **Recovery boundary:** v66 ended fail-closed; stable/HEAD v65, staging `0`, production menu restored.
- **Source candidate:** cumulative v67 removes duplicate launch presentation, single-flights bridge/boot and warms IndexedDB without reading private records before bootstrap.
- **Local gates:** launch `5/5`, P0 cache/navigation `14/14`, MailApp contract `88/88`.
- **Blocked evidence:** production p95 `≤1000 ms`, ten native launches, offline private Inbox, arrival prefetch and bidirectional account switching.
- **Release gate:** one hash-pinned v67 staging only after full suite/CI; promotion only when every native acceptance criterion is VERIFIED.
- **Evidence:** [VR-016](verification-reports/reports/VR-016/README.md), issues [GT-040–GT-047](ISSUES.md), source request `REQ-0034`.

- **Final local gate 2026-07-23:** cumulative `518/518`; bilingual `71` pairs; knowledge hub `17` pairs/`295` source IDs; verification checker passed.

## P0 continuation gate after v67

- [x] Remove the duplicate visible bridge and bootstrap loading sequence.
- [x] Preserve one bootstrap/auth single-flight and keep private cache locked until server account validation.
- [x] Preserve immutable v67, restore the production menu, and remove only the exact temporary v67 staging deployment after incomplete acceptance.
- [ ] Add a reproducible in-app time-to-interactive measurement that excludes desktop-control and screenshot overhead.
- [ ] Approve and implement a device-bound unlock or single-origin architecture before claiming offline private-mail startup.
- [ ] Verify ten native warm launches, offline cached-mail access, draft recovery, and bidirectional multi-account switching before any later promotion.

## B1-27 — V3 cache-first launch hardening

- **Status:** PARTIAL.
- **Source request:** `REQ-0035`.
- **Release candidate:** cumulative Versie 1 is recorded as a separate immutable v68 based on preserved immutable v67.
- **Locally VERIFIED:** duplicate boot copy removed; settled single-flight, correct IndexedDB warmup, cache-first list/thread paths, an opaque owner/account namespace, bounded schema v2, advisory persistent storage, unread-first prefetch without `markRead`, and a non-blocking account-attention flow.
- **Gates:** targeted `25/25`, release `3/3`, MailApp contract `88/88`, final cumulative `531/531`, documentation validators, and required PR checks passed.
- **Native staging:** two launches had no repeated connection overlay/OAuth; three roots, primary-secondary-primary, and the shared context are verified. A real cached Inbox within `≤1000 ms`, ten launches, offline/cache locking, prefetch, and drafts remain `UNVERIFIED` or `BLOCKED`.
- **Terminal state:** no promotion ran; the owner menu returned to production; merged fail-closed helper PR #62 removed the exact staging deployment; production/HEAD v65, staging `0`, immutable v68 retained, journal `abandoned`.
- **Next step:** do not repeat v68 staging without a new measurable acceptance contour or a separate cumulative fix. Prepare an in-app TTI trace and an architecture decision for a device-bound unlock/single-origin offline shell.
- **Evidence:** [VR-017](verification-reports/reports/VR-017/README.md), issues [GT-040–GT-047](ISSUES.md).
- **Українське дзеркало:** [docs/uk/ROADMAP.md](../uk/ROADMAP.md).

## B1-28 — Exact Gmail attachment identity in Telegram

- **Status:** PARTIAL.
- **Source request:** `REQ-0035`; V3 task `B-01`.
- **Locally VERIFIED:** new Telegram cards use an opaque exact-identity callback; the repeated read requires exactly one match; ambiguity fails closed; historical callbacks retain legacy compatibility. A separate focused test proves the complete role-threshold matrix, zone/cross-user isolation, invite lifecycle, revoked visibility, reauth boundary, and exact connection selection without changing product source.
- **Gates:** previous targeted attachment tests `154/154` and cumulative suite `532/532`; new focused access-matrix test `7/7`.
- **Still required:** a normal PR and required CI, owner-only native Telegram download acceptance, and only then a separately authorized cumulative immutable release contour.
- **Release boundary:** production/HEAD v65, staging `0`, immutable v68 historical; this source correction is not deployed and does not change Versie 1.
- **Evidence:** [GT-048](ISSUES.md), [VR-018](verification-reports/reports/VR-018/README.md).
- **Українське дзеркало:** [docs/uk/ROADMAP.md](../uk/ROADMAP.md).

## B1-29 — Active error/RCA registry and agent failure prevention

- **Status:** VERIFIED.
- **Source request:** `REQ-0035`; V3 task `T-04`.
- **Implementation:** standalone bilingual error/RCA registry and prevention playbook, linked from primary navigation and connected to `ISSUES`, `ROADMAP`, and a verification report.
- **Controls:** causal-only records, explicit applicability/status, serialized IDs, one-owner leases, stable identity, lock/I/O isolation, immutable release boundaries, evidence grading, and exact cleanup.
- **Authority boundary:** the documentation creates or expands no permission.
- **Evidence:** [GT-049](ISSUES.md), [VR-019](verification-reports/reports/VR-019/README.md).
- **Українське дзеркало:** [docs/uk/ROADMAP.md](../uk/ROADMAP.md).

## B1-30 — Stable reader position, focus, and honest progress

- **Status:** PARTIAL.
- **Source request:** `REQ-0035`; V3 tasks `A-03`, `F-05`.
- **Locally VERIFIED:** no-op state skips root replacement; necessary renders preserve a stable content anchor, viewport offset, bottom pin, and memory-only focus identity. Reading progress uses actual scroll geometry, avoids false short-content completion, explains its semantics, stays compact when absent, honours reduced motion, and cannot cross a thread or Gmail-connection boundary after debounce.
- **Gates:** focused reader contracts `12/12`, complete Apps Script suite `646/646`, clean diff check, and paired documentation validation.
- **Still required:** native desktop/mobile acceptance with real long, short, quoted, collapsed, resized, and image-delayed content; return-navigation readback; and separately authorized cumulative staging/production acceptance.
- **Release boundary:** source-only cumulative Versie 1 contour; no immutable, staging, production, OAuth, Gmail, or Telegram state changed.
- **Evidence:** [GT-050](ISSUES.md), [VR-020](verification-reports/reports/VR-020/README.md), [VR-039](verification-reports/reports/VR-039/README.md).
- **Українське дзеркало:** [docs/uk/ROADMAP.md](../uk/ROADMAP.md).

## B1-31 — Honest shared transfer-manager foundation

- **Status:** PARTIAL.
- **Source request:** `REQ-0035`; V3 task `B-03`.
- **Locally VERIFIED:** one store and canonical lifecycle, at most three active runners, actual-byte progress with speed/ETA for `FileReader`, indeterminate RPC status without fabricated percent, queued/running cancel contracts, stable-ID retry, aggregate progress, and an accessible movable chip independent of composer minimize.
- **Integrated lanes:** local compose attachments, incoming attachment preview/download fetch, and Drive/Box/public provider preview.
- **Gates:** focused transfer/MailApp contracts `99/99`, complete Apps Script suite `551/551`, clean diff check, and `0` secret-signature matches.
- **Still required:** true byte-resumable server upload and real RPC abort where transport support exists; native slow/stalled-network, restart, minimize, cancel, retry, and provider readback. Thread detail, draft persistence, URL import, and scoped draft restart reconciliation are integrated.
- **Release boundary:** source commit `58933f0`; no immutable, staging, production, OAuth, Gmail, Telegram, Drive, or Box state changed.
- **Evidence:** [GT-051](ISSUES.md), [VR-021](verification-reports/reports/VR-021/README.md).
- **Українське дзеркало:** [docs/uk/ROADMAP.md](../uk/ROADMAP.md).

## B1-32 — Fail-closed attachment preview matrix

- **Status:** PARTIAL.
- **Source request:** `REQ-0035`; V3 task `B-02`.
- **Locally VERIFIED:** SVG uses escaped text rather than an active image surface; the PDF iframe is sandboxed; ZIP metadata preview has byte, entry, size, and ratio limits, blocks traversal, encryption, Unix symlinks, multi-disk, ZIP64, and inconsistent central directories, and never extracts the archive.
- **Gates:** focused preview/MailApp contracts `97/97`, complete Apps Script suite `560/560`, and a clean diff check.
- **Still required:** native Telegram Desktop/mobile/WebView acceptance for supported preview types, real Unicode and malformed ZIP fixtures, fallback/download, and unsupported-format UX.
- **Release boundary:** source commit `d4beb1e`; no immutable, staging, production, OAuth, Gmail, Telegram, Drive, or Box state changed.
- **Evidence:** [GT-052](ISSUES.md), [VR-022](verification-reports/reports/VR-022/README.md).
- **Українське дзеркало:** [docs/uk/ROADMAP.md](../uk/ROADMAP.md).

## B1-33 — Persistent app session after reload without repeated OAuth

- **Status:** PARTIAL; native completion is BLOCKED by the shared daily `URLFETCH` quota incident.
- **Source request:** `REQ-0036`; related P0 contour `REQ-0034`.
- **Locally VERIFIED in source v70:** single-flight recovery remains intact; Telegram `SecureStorage` now exposes only a content-free diagnostic status; replay without a usable secure credential ends in an explicit locked state without a restart loop; a bridge timestamp enables cross-document timing. Focused tests `113/113`, full suite `567/567`, privacy scan `0`.
- **Native v69 result:** production v65 loaded the mailbox twice; staging v69 loaded the mailbox after a bounded repeat, but a hard reload in Telegram Desktop resubmitted the POST and ended with `UNTRUSTED_NONCE_REPLAY`.
- **Completed:** source v70 merged/CI; immutable v70 and exactly one owner-only staging were created; release/bridge gates passed `572/572` and `4/4`. Staging opened the mailbox without a repeated connection screen, restored a cached thread, and exposed three isolated roots.
- **Platform boundary:** browser-level POST resubmission occurs before inner JavaScript. Without a supported device-bound unlock or single-origin app shell, private offline Inbox and automatic Desktop recovery remain `BLOCKED`/`UNVERIFIED`; unprotected web storage is not used.
- **Shared blocker and disposition:** secondary switching on v70 and a fresh production v65 launch returned the same generic error; Apps Script telemetry confirmed daily `urlfetch` quota exhaustion in `legacy_recovery`. v70 was not promoted, the menu is production, exact staging was removed, active staging is `0`, and the journal is `abandoned`.
- **Still required after quota recovery:** one bounded v65/causal-candidate A/B, ten native launches, exact SecureStorage status, hard reload, mobile/WebView reopen, concurrent launch, bidirectional account switching, and measurable p95. Cached-thread restoration is qualitatively observed but not a formal performance result.
- **Evidence:** [GT-053](ISSUES.md), [VR-023](verification-reports/reports/VR-023/README.md), [VR-016](verification-reports/reports/VR-016/README.md).
- **Українське дзеркало:** [docs/uk/ROADMAP.md](../uk/ROADMAP.md).

## 2026-07-23: B1-31 thread-detail increment

Status: PARTIAL

The first unfinished B-03 continuation lane is implemented: thread/message-detail retrieval now participates in the bounded shared transfer queue without blocking cache-first rendering. Focused contract tests pass 104/104 and the full Apps Script suite passes 577/577. The remaining B1-31 work is draft persistence, URL import, server-resumable restart, real abort where transport support exists, and native slow-network/minimize acceptance.

## 2026-07-23: B1-31 draft-persistence increment

Status: PARTIAL

The next B-03 lane is implemented: the existing Gmail draft save RPC now participates in the bounded shared transfer state without replacing compose autosave, idempotency, revision, conflict, or recovery semantics. Focused contracts pass 102/102 and the full Apps Script suite passes 580/580. A line-ending-agnostic regression guard also keeps the prior thread-detail evidence portable across LF and CRLF checkouts.

## 2026-07-23: B1-31 public-HTTPS import increment

Status: PARTIAL

The URL-import lane is implemented without changing the server security boundary: the client now deduplicates the complete public-HTTPS metadata-and-attach operation through the bounded shared transfer manager, keeps private URLs out of task labels and IDs, and fails closed after compose/account changes. Focused contracts pass 111/111 and the full Apps Script suite passes 584/584.

## 2026-07-23: B1-31 restart-reconciliation increment

Status: PARTIAL

The maximum safe restart contract in the current Apps Script architecture is implemented. A content-free operation descriptor survives WebView restart and performs account-scoped, read-only/idempotent Gmail draft outcome reconciliation without resending MIME or attachment bytes. Missing or never-dispatched operations may start a fresh save only when no transient attachment bytes were lost; otherwise the task is `blocked` until explicit reselection. Automatic pending checks stop after three attempts. Six new restart contracts and the complete `590/590` Apps Script suite pass. Official Gmail resumable upload exists, but the current `google.script.run` transport supplies neither streaming bytes nor an abort/progress handle, so byte-resumable upload remains a separate `UNVERIFIED` architecture decision.

## 2026-07-23: B1-31 real-abort capability increment

Status: PARTIAL

The capability gate is now race-safe: queued local reads can be cancelled before execution, while a running transfer exposes cancel only after its transport registers a concrete abort handle. This verifies real `FileReader.abort` behavior and permanently prevents a false cancel control for current Apps Script RPC lanes. Focused suites pass `170/170` and the full suite passes `591/591`. The remaining B1-31 acceptance lane is native slow-network/minimize behavior; a future real RPC abort requires a separately verified cancellable transport architecture.

## 2026-07-23: B1-31 native-acceptance gate

Status: BLOCKED

Authenticated read-only runtime evidence still shows the shared Apps Script daily URL Fetch quota failing the timer worker in `legacy_recovery` with `errorCode=urlfetch_quota`. Native slow-network/minimize observations would therefore be causally invalid. No new candidate or staging deployment is justified by this readback. Resume this acceptance lane only after a clean quota window; keep production v65 and staging `0` until then.

## B1-34 — Fail-fast URL Fetch quota circuit

- **Status:** PARTIAL
- **Source request:** `REQ-0034`
- **Completed in source:** a content-free 15-minute probe circuit, immediate timer-pipeline stop after a classified daily URL Fetch exception, transport propagation from Gmail/Telegram/Google refresh, quota-blocked telemetry, and lease release.
- **Verified locally:** runtime-budget contracts `9/9`, complete Apps Script suite `593/593`, and all documentation/release/privacy gates.
- **Release boundary:** source-only cumulative Versie 1 work. Production remains v65, staging remains `0`, immutable v70 is unchanged, and no new OAuth, Gmail, Telegram, menu, deployment, or release-journal mutation was performed.
- **Still required:** clean-quota readback, one controlled staging candidate only when causally justified, native acceptance, and production promotion only after successful staging acceptance.
- **Evidence:** [GT-054](ISSUES.md), [VR-024](verification-reports/reports/VR-024/README.md).
- **Українське дзеркало:** [docs/uk/ROADMAP.md](../uk/ROADMAP.md).

## B1-37 — Direct Google Drive OAuth contracts

- **Status:** PARTIAL
- **Source request:** `REQ-0035`
- **Completed in source:** a strict Drive callback envelope, fail-closed provider binding after one-use state consumption, and preservation of the current owner/account/token-generation isolation.
- **Local evidence gate:** the focused synthetic test must confirm the exact route/redirect, bounded hash-only state, replay/expiry, sanitized errors, token-free DTOs, refresh failure, and disconnection of only the exact selected Drive account.
- **Release boundary:** this is source-only V3 `D-01`; real Google OAuth, consent, Gmail, Telegram, staging, production, and release helpers are outside the contour.
- **Still required:** native provider redirect, deployed callback, provider refresh/revocation, and Mini App acceptance. Status remains `PARTIAL` until that evidence exists.
- **Evidence:** [GT-057](ISSUES.md), [VR-028](verification-reports/reports/VR-028/README.md).
- **Українське дзеркало:** [docs/uk/ROADMAP.md](../uk/ROADMAP.md).

## B1-38 — Safe separation of Spam list and proactive notification policy

- **Status:** PARTIAL
- **Source request:** `REQ-0035`
- **Completed in source evidence:** explicit `/mail folder:spam` is verified as a read-only exact-`SPAM` list with bounded pagination; the proactive scan separately retains its current-`INBOX` delivery gate. Product source is unchanged.
- **Verified locally:** focused synthetic contract `2/2`, complete Apps Script suite `612/612`, and documentation/release/privacy gates.
- **Release boundary:** source-test/documentation only; production v65 and staging `0` remain unchanged, with no runtime Gmail/Telegram/OAuth mutation.
- **Still required:** native owner acceptance for the Spam list, next-page callback, and empty/error states in a clean runtime window.
- **Evidence:** [GT-058](ISSUES.md), [VR-029](verification-reports/reports/VR-029/README.md).
- **Українське дзеркало:** [docs/uk/ROADMAP.md](../uk/ROADMAP.md).

## B1-39 — Box OAuth hardening within Versie 1

- **Status:** `PARTIAL`
- **Contour result:** explicit read-only scope, fail-closed callback envelope, stable provider account ID, and a regression source contract.
- **Release boundary:** source/docs contour; staging and production are unchanged.
- **Next evidence step:** authenticated owner-only Box acceptance only in an authorized release contour and without repeated consent unless a real need is confirmed.
- **Related:** `GT-059`, `VR-030`, `REQ-0035`.

## B1-40 — D-03 Smart, safe URL resolver

- **Status:** `PARTIAL`
- **Result:** direct files, explicit Google wrappers, search pages, ordinary pages, authenticated/private URLs, and unsafe schemes have separate deterministic outcomes; redirects are bounded and loop-aware.
- **UX:** an ambiguous Google page is not called malformed and never attaches a guessed file; the UI offers link mode or direct-address guidance and shows a licensing warning.
- **Release boundary:** source/docs contour without live URL fetch, staging, or production.
- **Related:** `GT-060`, `RCA-013`, `VR-031`, `REQ-0035`.

## B1-41 — E-03 Navigation and actual mailbox context

- **Status:** `PARTIAL`
- **Result:** list/thread transitions have a canonical hash route and browser history; the context banner accessibly returns to Inbox; the reader does not duplicate account identity without a contextual need.
- **Isolation:** the route uses a stable connection ID, while the account chip appears in shared mode or on an actual thread/account-context mismatch.
- **Locally verified:** focused contract `5/5`; full Apps Script suite `617/617`.
- **Release boundary:** source/docs contour; production v65, staging `0`, and immutable history are unchanged. Native Telegram Desktop/WebView acceptance remains `UNVERIFIED`.
- **Related:** `GT-061`, `RCA-014`, `VR-032`, `REQ-0035`.

## B1-42 — E-05 Mail-list semantics and multi-selection

- **Status:** `PARTIAL`
- **Result:** unread state has textual accessible semantics; checkbox/`Space` selects without opening; `Enter` and single click open through one duplicate-guarded pipeline.
- **Isolation:** the selection namespace includes the current Gmail account/shared context, folder/label, query, and filter; each bulk mutation carries the exact thread `connectionId` and runs sequentially with a limit of 50.
- **Locally verified:** focused contract `4/4`; full Apps Script suite `623/623`.
- **Release boundary:** source/docs contour; production v65, staging `0`, and immutable history are unchanged. Native Telegram Desktop/WebView acceptance remains `UNVERIFIED`.
- **Related:** `GT-062`, `RCA-015`, `VR-034`, `REQ-0035`.

## B1-43 — F-01 Mail-reader fidelity and privacy

- **Status:** `PARTIAL`
- **Result:** valid RTL/language hints survive server sanitization; plain and HTML content use content-derived direction; remote images cannot bypass the attachment-token/MIME boundary or create a tracking request.
- **Fixture evidence:** newsletter, invoice/table, plain fallback, RTL/Unicode, malformed HTML, quoted history, CID boundary, and scroll/focus contracts are covered by the focused `6/6` suite; the full suite is `629/629`.
- **Release boundary:** source/docs contour; no real message was read or changed, and production v65, staging `0`, and immutable history are unchanged.
- **Still required:** native desktop/mobile comparison with representative owner-approved fixtures after the shared quota recovers.
- **Related:** `GT-063`, `RCA-016`, `VR-035`, `REQ-0035`.

## B1-44 — F-02 Consistent message actions and account-correct Gmail handoff

- **Status:** `PARTIAL`
- **Result:** desktop and mobile each have one primary action surface; secondary actions progressively disclose through `More`; unsupported phishing/raw/translate/print contracts do not imitate a Gmail API mutation.
- **Isolation:** Gmail handoff first binds a stable connection ID to the exact account email, uses `authuser`, and fails closed on ambiguity; `/u/0` is not used.
- **Settings hub:** General, Labels, Inbox, Accounts/import, Filters, Forwarding/POP/IMAP, Add-ons, Chat/Meet, Advanced, Offline, and Themes have an explicit capability classification and accessible buttons.
- **Locally verified:** focused `6/6`, Mail App group `98/98`, complete Apps Script suite `635/635`.
- **Release boundary:** source/docs contour; production v65, staging `0`, and immutable history are unchanged. Native popup/deep-link and Telegram WebView acceptance remain `UNVERIFIED`.
- **Related:** `GT-064`, `RCA-017`, `VR-036`, `REQ-0035`.

## B1-45 — F-04 Trustworthy automated analysis and one real next action

- **Status:** `PARTIAL`
- **Result:** secondary automated analysis is collapsed by default and can be expanded or hidden per exact Gmail connection; trivial/signature-only content yields no substantive summary; actionable claims require exact server-bound evidence; an automated next action is a proposal until explicitly accepted.
- **Control:** persisted `Action / Waiting / Info / Later` remains account-scoped and now has an explicit accessible undo without changing Gmail message state.
- **Privacy:** the current local heuristic and Apps Script translation boundary are retained. Gmail Gemini is not assumed to exist in the Gmail REST API and no external AI transfer is added.
- **Locally evidenced:** focused server/UI contracts and the full Apps Script suite are required publication gates.
- **Release boundary:** source/docs contour only; production v65, staging `0`, immutable history, Gmail, OAuth, and Telegram runtime remain unchanged.
- **Still required:** native populated-reader acceptance and current-production verification after the shared quota blocker clears.
- **Related:** `GT-065`, `RCA-019`, `VR-038`, `REQ-0035`.

## B1-46 — C-02 Safe composer close, minimize, and attachment handoff

- **Status:** `PARTIAL`
- **Result:** header `X` is now a one-shot close intent: the mail view returns immediately, the same-session attachment transfer is not cancelled, and canonical Gmail save completes close only after transfer settlement. Minimize/restore retains the draft object, focus, selection, attachments, and stable operation identity.
- **UX:** the compose recovery chip and global transfer chip are accessible, movable, and automatically separated; a transfer row can reopen the exact associated draft. A pending operation no longer holds a blocking editor without an accessible return path.
- **Recovery boundary:** local bytes are not represented as server-resumable after WebView closure. Persistent recovery records missing local jobs and requires reselection, while a canonical Gmail draft remains available through the existing restart reconciliation.
- **Locally verified:** focused `5/5`, complete Apps Script suite `656/656`, synthetic browser close/minimize/restore and simultaneous-chip layout, plus a separate executable pointer contract for drag bounds.
- **Release boundary:** source/docs contour; production v65, staging `0`, immutable history, and Gmail/OAuth/Telegram runtime remain unchanged. Native slow-network/restart acceptance remains `UNVERIFIED`.
- **Related:** `GT-066`, `RCA-022`, `VR-041`, `REQ-0035`.

## B1-47 - P0-A cross-document launch single-flight and canonical proof ledger

- **Status:** `PARTIAL`
- **Source request:** `REQ-0037`.
- **Result:** source now serializes launch ownership across documents through `navigator.locks` with an expiring content-free IndexedDB lease fallback. Ordinary validated launches remain overlay-free, and release reload is mutation-quiescent with the exact `p0-release-reload` session key.
- **Server boundary:** launch issuance and redemption use one `ScriptLock`-backed canonical ledger with HMAC owner/route scopes, a deterministic 60-second nonce lifetime, 11-minute tombstones, a 100-record bound, and no stored secrets or identifiers.
- **Locally verified:** focused `37/37`; complete Apps Script suite `668/668` in `24.229s`; baseline `1d5fb8352ea62f7b25d6980312f277060ce4d0ae`.
- **Still required:** native Telegram target-device p95 `<=1000 ms`, ten real-launch acceptance runs, offline private device-bound unlock, POST-Redirect-GET behavior, incremental MailApp Gmail History, Service Worker/Background Sync, staging, and production. These remain `UNVERIFIED` or `BLOCKED` by shared Apps Script URL Fetch quota and `T-03`.
- **Release boundary:** source/docs contour only; no deployment, staging, production, Gmail, or mailbox mutation.
- **Related:** existing `GT-040-GT-047`, `GT-051`, `GT-053`, `GT-054`; new `GT-067`, `RCA-023`, `VR-042`.

## B1-48 - P0-B account-scoped Gmail History revalidation

- **Status:** `PARTIAL`
- **Source request:** `REQ-0037`.
- **Result:** the 45-second background cycle now reads a bounded Gmail History delta for each exact connection first. When nothing changed, no full list/thread RPC starts and the cursor advances inside the isolated IndexedDB namespace. Concurrent timer/visibility/online checks share one reconciliation promise.
- **Fail-closed boundary:** a missing or expired cursor and more than three History pages require full reconciliation. On a real change, a complex query/shared view also refreshes through one bounded full list rather than inventing membership semantics that Gmail History does not provide.
- **Locally verified:** focused `30/30`; complete Apps Script suite `673/673` in `25.763s`; baseline `28b438e68e1b327308761c246e074558b7ccd53d`.
- **Still required:** live cache-hit/request metrics, entity-level reconciliation for compatible simple views, native multi-account/shared acceptance, staging, and production. Shared Apps Script URL Fetch quota and `T-03` keep the release gate blocked.
- **Release boundary:** source/docs contour only; no OAuth, Gmail/Telegram mutation, staging, production, or immutable release.
- **Related:** `GT-068`, `RCA-024`, `VR-043`, `REQ-0037`.

## B1-49 - P0-C metadata-only entity reconciliation for a simple Inbox

- **Status:** `PARTIAL`
- **Source request:** `REQ-0037`.
- **Result:** a single-account Inbox with no search/filter/custom label applies a bounded History change set through a metadata-only batch: exact rows insert/update/remove without a full list RPC, cached body stays unchanged, and a label-only event does not start a thread-body read.
- **Safety gate:** the batch accepts at most 20 unique IDs, exact-connection viewer access, and explicit missing IDs. Stable timestamp order and loaded-page capacity are retained; foreign-account rows are untouched.
- **Fallback:** shared/query/filter/custom-label views, a full-sync boundary, and an oversized or incomplete delta use the existing bounded full-list reconciliation.
- **Locally verified:** focused `35/35`; complete Apps Script suite `678/678` in `25.414s`; baseline `7bd8270b2e14525dc8e99bd95387a1ef977dde1a`.
- **Still required:** live Gmail change acceptance, request/cache-hit metrics, native multi-account/shared paths, staging, and production; the release gate remains blocked by shared URL Fetch quota and `T-03`.
- **Related:** `GT-069`, `RCA-025`, `VR-044`, `REQ-0037`.

## B1-50 - P0-D verified-session private-cache lock

- **Status:** `PARTIAL`
- **Source request:** `REQ-0037`.
- **Result:** private IndexedDB access now fails closed until the server-established app session, opaque owner `cacheScope`, and exact connected-account set pass one explicit unlock gate. Hydration can no longer self-authorize from mutable client state.
- **Lifecycle:** all five account-changing bootstrap paths rebind the allowlist; account switch, disconnect, and confirmed sign-out lock the cache, clear private memory/DOM, and retain persistent records.
- **Locally verified:** focused `48/48`; complete Apps Script suite `685/685` in `26.020s`; baseline `8c01143411e20f96b7ec4fc885dd1898ac2e4bbb`.
- **Still required:** an encrypted-at-rest cache envelope, evidence-backed device-bound offline unlock, native account-isolation acceptance, staging, and production. Shared URL Fetch quota and `T-03` keep the release gate blocked.
- **Release boundary:** source/docs contour only; no OAuth, Gmail/Telegram mutation, staging, production, or immutable release.
- **Related:** `GT-070`, `RCA-026`, `VR-045`, `REQ-0037`.

## B1-51 - P0-E AES-GCM persistent-cache envelope

- **Status:** `PARTIAL`
- **Source request:** `REQ-0037`.
- **Result:** schema 3 no longer writes private `record.value` plaintext to IndexedDB. AES-256-GCM ciphertext has a random IV and metadata AAD; decrypt failure or metadata swapping fails closed and removes the damaged current-schema record.
- **Key boundary:** one 256-bit content key is stored only in Telegram `SecureStorage` as a compact owner-scoped envelope. `RESTORABLE` is not overwritten without user action; scope mismatch and unavailable crypto disable persistent cache without blocking the online mailbox.
- **Migration:** upgrade from the prior schema clears incompatible plaintext cache; Gmail server data and confirmed drafts are unchanged.
- **Locally verified:** focused `55/55`; complete Apps Script suite `692/692` in `23.540s`; baseline `6f8a357e1a650639c3a16f9d6c7601d89817e3fe`.
- **Still required:** native Telegram/Apps Script crypto acceptance, an encrypted bootstrap snapshot and device-bound offline unlock, staging, and production. Shared URL Fetch quota and `T-03` keep the release gate blocked.
- **Release boundary:** source/docs contour only; no OAuth, Gmail/Telegram mutation, staging, production, or immutable release.
- **Related:** `GT-071`, `RCA-027`, `VR-046`, `REQ-0037`.

## B1-52 - P0-F encrypted offline bootstrap and read-only unlock

- **Status:** `PARTIAL`
- **Source request:** `REQ-0037`.
- **Result:** verified online bootstrap now stores a separate encrypted snapshot containing owner scope, account allowlist, active account, folders, labels, and safe view context without session or OAuth secrets. Snapshot lifetime is bounded to `35` days.
- **Security boundary:** offline restore obtains the content key only from Telegram SecureStorage, accepts only the exact bootstrap key/namespace/AAD, validates age/schema/scope/account set, and opens private cache in read-only mode. RPC, mutation, and background prefetch remain blocked until a verified online session returns.
- **Failure boundary:** fallback runs only after `TRANSIENT_NETWORK_FAILURE`; expired or revoked auth, `RESTORABLE`, malformed envelopes, decrypt failure, and account mismatch are not bypassed.
- **Locally verified:** focused `33/33`; complete Apps Script suite `701/701` in `25.944s`; baseline `2bd7eb52d2f3297929c24c12d8ccbb4611699b84`.
- **Still required:** native Telegram target-device SecureStorage/WebCrypto acceptance, a fresh offline app-shell hosting path, warm-launch measurements, staging, and production. Shared URL Fetch quota and `T-03` keep the release gate blocked.
- **Release boundary:** source/docs contour only; no OAuth, Gmail/Telegram mutation, staging, production, or immutable release.
- **Related:** `GT-072`, `RCA-028`, `VR-047`, `REQ-0037`.

## B1-53 - P0-G conflict-safe Gmail Drafts update

- **Status:** `PARTIAL`
- **Source request:** `REQ-0037`.
- **Result:** updating an existing draft now requires an opaque server version, checks it twice before Gmail `PUT`, and returns a read-only conflict instead of overwriting on mismatch. The client retains the version in encrypted recovery state, starts no automatic retry loop, and offers an explicit local-versus-Gmail choice.
- **Safety gate:** the version token contains no body, address, token, or provider credential; a conflict closes the exact operation reservation as failed before any Gmail mutation.
- **API boundary:** Gmail API documents no atomic revision/ETag precondition for `users.drafts.update`; a narrow race between the second `GET` and `PUT` remains beyond this source contour.
- **Locally verified:** focused `258/258`; complete Apps Script suite `707/707` in `23.349s`; baseline `9b00a335c0016c439a463233b67a16e1499b7222`.
- **Still required:** authenticated two-session acceptance on a controlled draft, staging, and production after the shared URL Fetch quota and `T-03` blockers are cleared.
- **Release boundary:** source/docs contour only; no OAuth, real Gmail/Telegram mutation, staging, production, or immutable release.
- **Related:** `GT-073`, `RCA-029`, `VR-048`, `REQ-0037`.

## B1-54 - C-03 bounded scalable folder upload

- **Status:** `PARTIAL`
- **Source request:** `REQ-0035`.
- **Result:** device-folder and `webkitdirectory` paths now converge on one bounded batch plan before FileReader starts. The plan retains recursive relative paths, aggregate bytes, duplicate state, and per-entry outcome, while the UI presents a progressive summary with retry/cancel and a Drive fallback.
- **Safety gate:** at most `1000` entries are scanned; traversal, hidden/service, empty, and exact-duplicate entries fail closed. Count or aggregate-byte overflow blocks the whole accepted batch before files are read, so no unexpected partial upload starts.
- **Locally verified:** focused `9/9`; Mail App contract `93/93`; complete Apps Script suite `716/716` in `25.980s`; baseline `a33242df9689f6d483825940632df3030663d1a6`.
- **Still required:** native-picker and fallback acceptance on mobile/desktop for `1/10/100/1000`, visual/accessibility evidence, and only after shared URL Fetch quota and `T-03` blockers clear, staging/production.
- **Release boundary:** source/docs contour only; no OAuth, real Gmail/Telegram mutation, staging, production, or immutable release.
- **Related:** `GT-074`, `RCA-030`, `VR-049`, `REQ-0035`.

## B1-55 - C-04 rich compose editing and recipient layout

- **Status:** `PARTIAL`
- **Source request:** `REQ-0035`.
- **Result:** `To/CC/BCC` now use one chip adapter with a quoted-name tokenizer, email validation, duplicate suppression, removal controls, and keyboard navigation, while the canonical draft contract remains string-based. Rich clipboard content passes through the existing sanitizer; the toolbar has primary/secondary disclosure; tables support accessible coordinates, cell traversal, and deletion.
- **Safety gate:** raw clipboard HTML is never assigned to the DOM; the existing sanitizer drops remote/unsafe images, scripts, and event content. Invalid recipients remain visible with `aria-invalid` instead of disappearing. Autosave/minimize/recovery continue through the same draft fields and selection bookmarks.
- **Locally verified:** focused `5/5`; affected compose matrix `116/116`; MailClient `153/153`; complete Apps Script suite `721/721` in `25.457s`; baseline `f790897e8dec4a83e8ab8c7114618109b99b436a`.
- **Still required:** visual desktop/mobile/keyboard-open, native screen-reader/Telegram WebView acceptance, a real controlled Gmail-draft roundtrip, and only after shared URL Fetch quota and `T-03` blockers clear, staging/production.
- **Release boundary:** source/docs contour only; no OAuth, real Gmail/Telegram mutation, staging, production, or immutable release.
- **Related:** `GT-075`, `RCA-031`, `VR-050`, `REQ-0035`.

## B1-56 - V3 task-code coverage reconciliation

- **Status:** `VERIFIED` for knowledge-map coverage; overall V3 execution remains `PARTIAL`.
- **Source requests:** `REQ-0035`, `REQ-0037`.
- **Initial result:** an exact-ID scan of the active Ukrainian registries found `26/31` V3 tasks; five already-implemented source contours had no explicit alias.

| V3 task | Existing execution/evidence contour | Factual status |
| --- | --- | --- |
| `A-04` | `B1-50`–`B1-52`, `GT-070`–`GT-072`, `VR-045`–`VR-047` | `PARTIAL`; native device-bound offline acceptance and a fresh offline shell are not proven |
| `A-05` | `B1-25`, `B1-47`, `GT-036`, `GT-067`, `VR-015`, `VR-042` | `PARTIAL`; native old/new production transition and one-reload proof are incomplete |
| `D-02` | `B1-39`, `GT-059`, `VR-030` | `PARTIAL`; authenticated Box redirect/file acceptance is incomplete |
| `E-01` | `B1-35`, `GT-055`, `VR-026` | `PARTIAL`; the native viewport/keyboard/safe-area matrix is incomplete |
| `E-02` | `B1-36`, `GT-056`, `VR-027` | `PARTIAL`; native drag/keyboard/restart preference acceptance is incomplete |

- **Result:** the active roadmap now contains all `31/31` plan IDs and points to existing evidence instead of duplicating source.
- **Safety gate:** coverage means routing, not complete DoD. No `PARTIAL/BLOCKED/UNVERIFIED` status was elevated.
- **Next step:** do not create a new code candidate because an alias was missing. Native/live acceptance is allowed only after the shared URL Fetch quota and `T-03` gates.
- **Related:** `GT-076`, `RCA-032`, `VR-051`, `REQ-0035`, `REQ-0037`.
