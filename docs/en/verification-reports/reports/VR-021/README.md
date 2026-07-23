# VR-021 — Honest shared transfer-manager foundation

[Українською](../../../../uk/verification-reports/reports/VR-021/README.md)

- **Date:** 2026-07-23
- **Overall status:** PARTIAL
- **Source request:** `REQ-0035`
- **Verification framework:** `REQ-0004`
- **Product task:** `B1-31` / V3 `B-03`
- **Issue:** `GT-051`
- **Source commit:** `58933f0`
- **Release boundary:** source only; no immutable, staging, production, OAuth, Gmail, Telegram, Drive, or Box mutation

## Confirmed root cause

The client had no shared transfer truth. Local device files used compose-only `FileReader` jobs with byte progress and cancel, while incoming attachment and provider previews used independent loading copy, spinners, and snackbars. Every accepted local file could begin without a shared concurrency scheduler. Apps Script RPC supplies neither trustworthy incremental byte callbacks nor a real client abort handle, so showing a transport percentage or cancel control for those lanes would be fabricated.

## Implemented foundation

1. Compose and global tasks share one underlying transfer store with separate domains.
2. The lifecycle covers `queued`, `preparing`, `transferring`, `processing`, `attaching`, `completed`, `cancelled`, `failed`, `blocked`, `retryable`, and capability-aware `paused`.
3. A bounded scheduler permits at most three runners and deduplicates an active task Promise.
4. Actual `FileReader` callbacks drive bytes, percentage, smoothed speed, ETA, and real abort.
5. RPC lanes show phase-only indeterminate status and expose no fake percentage or nonfunctional cancel.
6. A movable accessible chip survives composer minimize while the Mini App remains alive.
7. Local compose attachment reads, incoming attachment fetch, and provider preview use the foundation.

## Atomic claims

| ID | Claim | Status | Evidence |
|---|---|---|---|
| VR-021-01 | Transfer state was fragmented between compose jobs and independent preview/download UI. | VERIFIED | source inspection |
| VR-021-02 | One underlying store and canonical lifecycle serve compose and global transfer domains. | VERIFIED | behavioral/source contracts |
| VR-021-03 | Scheduler concurrency never exceeds three runners. | VERIFIED | deterministic seven-task behavioral test |
| VR-021-04 | Unknown RPC totals produce no percentage, speed, or ETA. | VERIFIED | behavioral contract |
| VR-021-05 | Actual byte callbacks produce bytes, percentage, speed, and ETA. | VERIFIED | behavioral contract |
| VR-021-06 | Queued cancel prevents execution; running cancel invokes the registered abort callback; retry keeps the stable transfer ID. | VERIFIED | behavioral contracts |
| VR-021-07 | Related transfer/MailApp contracts pass `99/99`; the complete Apps Script suite passes `551/551`. | VERIFIED | local Node test traces |
| VR-021-08 | Thread detail, draft persistence, URL import, and scoped draft restart reconciliation use the complete manager; real RPC abort, byte-resumable upload, and native slow-network behavior remain open. | PARTIAL | local behavioral contracts; native acceptance absent |

## Platform and release boundary

The manager does not claim JavaScript continuation after Telegram unloads the WebView. It can reconcile the outcome of a server-journaled draft operation after restart, but it cannot resume browser bytes. Gmail documents a true resumable upload protocol, while `google.script.run` exposes asynchronous success/failure callbacks without a trustworthy transport byte stream or abort handle; Apps Script execution and URL Fetch limits still apply. Therefore `resumableUpload` remains `false`. A separately authorized cumulative candidate and native slow/stalled-network acceptance are required before production claims. Primary sources: [Gmail upload guide](https://developers.google.com/workspace/gmail/api/guides/uploads), [google.script.run](https://developers.google.com/apps-script/guides/html/reference/run), [Apps Script quotas](https://developers.google.com/apps-script/guides/services/quotas).

## 2026-07-23: thread-detail continuation evidence

Status: PARTIAL

REQ-0035 extends the shared transfer-state implementation to thread/message-detail retrieval. The implementation preserves cache-first rendering, queues the Apps Script RPC as indeterminate progress, omits unsupported cancellation, reuses the task identity for retry, and retains the generation guard against stale paint. Focused contract tests pass 104/104 and the full Apps Script suite passes 577/577. Bilingual, knowledge-hub, verification-report, release-state, diff, and added-line secret checks pass. Native slow-network/minimize acceptance remains outside this increment.

## 2026-07-23: draft-persistence continuation evidence

Status: PARTIAL

REQ-0035 extends the shared transfer-state implementation to the existing Gmail draft persistence RPC. The exact compose snapshot and operation ID remain authoritative; progress is indeterminate, unsupported cancellation is absent, retry reuses the exact task identity, and changed compose/account context fails closed. Focused contracts pass 102/102 and the full Apps Script suite passes 580/580. No live Gmail mutation, OAuth action, staging deployment, or production promotion was used for this source increment.

## 2026-07-23: public-HTTPS import continuation evidence

Status: PARTIAL

REQ-0035 extends shared transfer-state coverage to the complete public-HTTPS source submit. Runtime tests verify one RPC and one attachment for parallel submits, generic content-free task identity, honest indeterminate progress, and account/session fail-closed retry. The existing server SSRF and content-bound contracts remain covered by the full suite. Focused contracts pass 111/111 and the full Apps Script suite passes 584/584. No live external URL, Gmail mutation, OAuth action, staging deployment, or production promotion was used.

## 2026-07-23: restart-reconciliation continuation evidence

Status: PARTIAL

REQ-0035 now covers the maximum safe restart behavior available without a new upload infrastructure. Before dispatch, IndexedDB receives only an account-scoped operation ID, local fingerprint, counters, and timestamps; no MIME, attachment bytes, provider URL, token, or resumable session URI is added to the descriptor. `draftOperationStatus` is responder-scoped and returns only `missing`, `not_dispatched`, `failed`, `pending`, or a canonical committed draft. A reserved operation is terminalized only before the dispatch boundary; uncertain/committed operations are reconciled through Gmail reads and never repeat the mutation. The client bounds automatic checks to three and blocks lost local bytes until reselection. Six new behavioral contracts and the full suite `590/590` pass. This source-only increment used no live Gmail mutation, external URL, OAuth action, staging deployment, or production promotion.
