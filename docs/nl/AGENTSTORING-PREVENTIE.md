# Agent failure prevention

[Українською](../uk/AGENT_FAILURE_PREVENTION.md)

This playbook is a quality procedure, not an authority source. Before acting, the agent reads the current `AGENTS.md`, `Інструкції`, the relevant `Повноваження` record, the source request, and the [RCA registry](ERROR_RCA_REGISTRY.md). If they conflict, the higher-priority source wins; this file grants no additional permission.

## 1. Recovery first

- Inspect the worktree, local/remote commits, open PRs, checkpoint, runtime, and any active atomic operation.
- A checkpoint is guidance, not proof of completion.
- Do not repeat OAuth, migrations, releases, tests, or processes when live state proves completion.
- Before switching tasks set `paused_with_checkpoint`; after terminal state release the lease.

## 2. One resource owner

- One lease-owner per Git worktree/index, browser/Mini App, Telegram, phone, live Gmail mutation lane, and Apps Script release state.
- Do not terminate generic Chrome, Node, PowerShell, Codex, RustDesk, Tailscale, or unknown PIDs.
- Clean up only an exact task-owned process/session/worktree/branch after ownership is proven.
- Edit shared code, especially `MailApp.html`, sequentially or first modularize without behavioral change.

## 3. Identity and deduplication

- Use stable Gmail message/thread/attachment IDs or an opaque derived token, never an ordinal, name, or UI position.
- Use one canonical eligibility function for realtime, frozen backlog, and manual checks.
- Create at-most-once reservation before external delivery and reconcile uncertain outcomes.
- Cross-account keys always include owner scope and stable connection ID.

## 4. Locks and external I/O

- A lock covers only bounded claim/commit/release work.
- Gmail, Telegram, Drive, Box, and HTTP I/O never runs under a shared user lock.
- A lease has a token, expiry, crash recovery, and overlap tests.
- Slow maintenance cannot block the realtime lane.

## 5. Schema, IDs, and bilingual parity

- Before `REQ/GT/B1/VR` allocation: fetch authoritative main, inspect open PRs and maxima, then reserve the ID in one contour.
- Parse machine metadata by schema, not a brittle monolithic regex.
- Report unknown, missing, duplicate-key, and invalid-value failures separately.
- Every UK page has a separate EN mirror with reciprocal links.
- Canonicalize line endings before hashing; LF/CRLF fixtures are mandatory.

## 6. Immutable release discipline

- Never rewrite a historical immutable version, helper, or hash.
- Mutable HEAD may advance after release; a historical test verifies the pinned artifact/helper, not permanent HEAD equality.
- A new code fix receives another cumulative immutable only under exact owner authority.
- Create staging once after clean preflight; promote only after acceptance.
- A shared stable/candidate failure stops release switching and opens an external/runtime blocker.
- Rollback, abandon, and cleanup verify exact deployment ID, version, journal state, and production boundary.

## 7. Evidence discipline

- `VERIFIED` requires evidence at the same level: source, integration, native staging, or production.
- A regex/source test does not prove Telegram WebView, provider OAuth, transfer, or device behavior.
- HTTP 200 does not prove the correct file, callback, or UI state.
- Never invent performance, progress, cache-hit, or transfer percentages.
- Sensitive evidence stays private; Git receives content-free/sanitized traces only.

## 8. Bounded failure handling

- Make one bounded attempt for an external blocker, then checkpoint and continue independent work.
- Hard stop on CAPTCHA, OTP/2FA, passkey/biometric/hardware key, new or broader OAuth scope, payment, or ambiguous Gmail/Telegram zone.
- Do not mask a shared quota/network failure with repeated promotion/rollback.
- If a fix lacks native proof, status remains `PARTIAL` or `UNVERIFIED`.

## 9. Mandatory pre-merge gate

1. The worktree contains only task-owned changes.
2. Targeted behavioral tests cover the root cause and negative/fail-closed path.
3. Cumulative suite plus bilingual, knowledge-hub, verification, and release-state checks pass.
4. Added lines are scanned for credentials and private content without publishing matches.
5. Paired `ISSUES`, `ROADMAP`, `VR`, and navigation are updated.
6. The normal PR states cause, evidence, release boundary, and explicit residual status.
7. Merge and both mirrors receive authenticated readback.

## 10. Post-task gate

- Update the private ledger and sanitized checkpoint.
- Record source, staging, and production statuses separately.
- Release leases and remove only task-owned temporary artifacts.
- Leave one exact owner action for every genuinely manual blocker.
- Do not mark the goal complete until every requirement has terminal status and evidence.
