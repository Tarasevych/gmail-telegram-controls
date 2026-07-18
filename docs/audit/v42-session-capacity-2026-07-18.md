# Mini App session-capacity incident and owner-only recovery

## Incident

Production Apps Script v32/product v38 rejected a new Telegram Mini App launch with a 24/24 refresh-family registry. Closing a WebView did not release its 24-hour family, so the old instruction to close a Mini App was not actionable.

Live read-only inspection under `tarasevych.pavlo@gmail.com` found 23 active families for the owner Telegram user and one for another user. No Gmail message, OAuth grant, Telegram card, account zone, or deployment was changed during diagnosis.

## Immediate recovery

A fail-closed tool staged one temporary owner-only helper in Apps Script HEAD, executed it once in the authenticated editor, and restored HEAD from exact immutable v32. The helper derived the owner from `CHAT_ID`, retained the three newest owner families, and preserved every other-user row. Post-action verification showed four active families and 20 free slots. The stable v32 deployment never changed.

Recovery journal: `C:\Users\t\.codex\recovery\019f5d65-8209-7a00-b915-4a522dbcb612-session-capacity.json`.

## Permanent behavior

- Capacity failure returns `SESSION_CAPACITY` plus a two-minute, one-use, owner-bound recovery bearer.
- The Mini App renders an explicit `Завершити старі мої сеанси й відкрити` action instead of claiming that closing a window frees server capacity.
- Recovery preserves the two newest existing sessions for that Telegram user, creates one new session, and never evicts another user.
- The failed Telegram launch claim remains consumed; recovery does not replay initData.
- Recovery calls no Gmail API and changes no Gmail content or account authorization.
- A stolen/expired/replayed recovery value fails closed; it is kept only in the rendered WebView memory and never placed in a URL or browser storage.

## Verification

- Targeted backend/client test: 141/141 PASS.
- Ordinary mutable-product matrix: 363/363 PASS.
- Standalone Chrome rendered QA: 17/17 PASS across 1440x900 and 390x844, including exact one-use invocation, owner-only copy, viewport bounds, fallback restart, and zero application console errors.
- Private rendered evidence: `v42-session-capacity-qa.json`, desktop/mobile screenshots, and the QA script under the thread visualization directory.
- `git diff --check`: PASS.

## Production release

The fix was transplanted onto exact product-v38 commit `07ba3a5dc2f05d67abbd9eb0b46f56ebe85a05f0` and released through the separately pinned v33 gate.

- Preflight reconciled one immutable v33 and exactly one verified staging deployment while stable production remained v32.
- The existing stable deployment ID was atomically promoted from v32 to v33; its public URL did not change.
- The staging deployment was removed after promotion.
- Final provider reconciliation: stable v33, exact candidate HEAD and immutable hashes, zero staging deployments, release journal `cleaned`.
- No Gmail message, OAuth grant, Telegram zone, or other-user refresh family was changed by the release.
