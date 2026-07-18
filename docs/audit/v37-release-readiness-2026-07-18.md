# Product v37 release-readiness audit — 2026-07-18

## Scope and source of truth

This audit covers the Gmail/Telegram Mail Client only. It is based on the current repository, the recovery checkpoint for thread `019f5d65-8209-7a00-b915-4a522dbcb612`, the verified Apps Script release state, the connected-phone acceptance evidence, and `C:\Users\t\Documents\Codex\deep-research-report.md` (SHA-256 `49F1C7BFFDE5D613AE4A5782581DA5F4A2204E0075F324734A95BD75117EFE06`). It contains no mail content, OAuth material, bot tokens, or provider secrets.

## Executive status

| Area | Verified state | Release consequence |
| --- | --- | --- |
| Stable production | Apps Script immutable v29 | Healthy and unchanged |
| Historical candidate | Immutable v30/product v36 with a separate staging deployment | Must never be promoted |
| Current candidate | Product v37 source preserved at `45262d02df023bd08c5b410dd30fe1b5e378c705` | Awaiting immutable v31 staging |
| Release automation | Guarded v31 helper preserved at `3cf675897beecec9771cf8b65497ffc75b084b25` | Fail-closed and rollback-readback hardened |
| First v31 staging attempt | HTTP 429 `RESOURCE_EXHAUSTED` during initial HEAD upload | No accepted provider mutation; do not repeat in the same phase |
| Real-phone acceptance | Product v36 loaded in Telegram WebView; account-ID compatibility defect found and fixed in v37 | v37 must repeat the same non-mutating acceptance |
| Promotion | Not authorized by technical state | Forbidden until immutable v31 passes phone acceptance |
| Codex Security | Audit artifacts frozen; no active scan process | Do not restart attack-path or exploit-style checks |

Immediate reconciliation after the 429 proved: stable v29, HEAD exact prior v30, immutable v31 absent, product-v37 staging absent, and v31 journal absent. Therefore the failed request did not create an immutable version, staging deployment, or stable update.

## Research requirements already implemented

The integrated v37 candidate contains the verified v28–v36 neuroinclusive slices plus the account bootstrap compatibility fix:

- Focus View with four bounded states, one editable next action, and Resume Rail.
- Low-energy and available-time presets, with no more than one thread and three primary actions in the lowest-energy mode.
- User/account-scoped priorities and Gmail label synchronization foundations.
- Three low-pressure reply starters and durable scheduled send with cancellation/readback boundaries.
- Exactly three onboarding screens, stable help, skip, preserved selections, and per-Gmail-connection preference isolation.
- Soft, digest, and urgent-only reminders with quiet hours authoritative.
- One neutral soft reminder followed only by selected digest-window continuation until fresh activity.
- Content-free bounded reminder and preference records; no subject, sender, body, summary, attachment name, or reply text is persisted in those records.
- Account identity fallback fixed so onboarding receives the exact authorized connection ID instead of attempting to derive identity from an email address.

## Verification evidence

- Product-v37 MailApp and MailClient targeted contracts: 212/212 pass.
- Ordinary functional matrix: 360/360 pass.
- Release helper static contracts: 2/2 pass.
- Release helper PowerShell parse: pass.
- Added-line secret-pattern scan for the recovery hardening: zero hits.
- Git preservation: local HEAD, tracking branch, and remote branch all equal `3cf675897beecec9771cf8b65497ffc75b084b25`; working tree was clean before this audit document.
- Real Huawei Telegram WebView already proved product-v36 mailbox rendering, exact Telegram owner zone, folders, live Gmail labels, Focus view, reachable mobile Support/Rules controls, and read-only rules loading.
- The temporary acceptance bridge and temporary Telegram messages were removed; the production owner menu was restored; the ADB DevTools forward was removed.

No acceptance step changed a Gmail message, draft, label, priority, focus preference, account role, OAuth grant, attachment, provider object, or Telegram zone.

## Remaining release gates

1. Wait for Apps Script write quota cooldown.
2. Run one fresh GET-only preflight. It must again prove stable v29, exact prior-v30 HEAD, exact immutable v30, no v31, no product-v37 staging, and no conflicting journal.
3. If and only if preflight is clean, run `-StageOnly` once. Stop on another 429 or any ambiguous provider outcome.
4. Prove immutable v31 and its unique staging deployment are bound to the exact product-v37 hashes while stable remains v29.
5. Repeat the controlled Telegram WebView test on the connected phone. Verify the exact Gmail account card and that `Підтримка` opens the three-screen onboarding without completing or saving it.
6. Verify mobile scrolling, reply starters, scheduled-send surface, reminder settings, and account identity without changing a random real message.
7. Promote only after all acceptance checks pass and a final read-only release reconciliation is exact.
8. After promotion, run bounded read-only synchronization checks and restore/clean all temporary acceptance surfaces.

## Product gaps after v37

These are genuine roadmap gaps, not release blockers for the integrated P1 candidate:

| Priority | Gap | Safe next slice |
| --- | --- | --- |
| P1 | Trustworthy summary evidence is not yet fully expressed as an explicit AI label, confidence, and linked source fragments in every surface | Add a shared evidence DTO and render contract; never let email HTML instruct the tool layer |
| P1/P2 | Backlog rescue does not yet select a bounded, non-shaming work set | Add an account-scoped read-only rescue queue with 1/3/5-thread presets |
| P2 | Privacy-preserving functional-relief metrics are not implemented | Store bounded event names, timestamps, durations, and counts only; no mail content |
| P2 | Calendar/task extraction remains a suggestion rather than an integrated confirmed action | Add explicit confirmation and exact-account routing |
| P2 | Co-processing/body-doubling session is absent | Add an optional quiet presence timer with gentle check-ins and no public streaks |
| P2 | Adaptive information density is incomplete | Add minimum/standard/analytical density per Telegram user and Gmail connection |
| P2 | Multi-provider attachment UX remains incomplete | Continue resumable upload, preview, cancellation, provider account choice, and link resolution as a separate subsystem |

New slices must branch from the finally accepted immutable source, not be mixed into the v31 release candidate before acceptance.

## Crash/blocker disposition

- Current blocker: recoverable external Apps Script API quota exhaustion.
- User action required now: none.
- OTP/CAPTCHA/new OAuth consent encountered: none.
- Retry policy: no immediate loop. One later StageOnly attempt is allowed only after a fresh clean read-only preflight.
- Safe autonomous work while waiting: documentation, tests, design contracts, and isolated code review that do not change product-v37 Apps Script hashes or live provider state.
