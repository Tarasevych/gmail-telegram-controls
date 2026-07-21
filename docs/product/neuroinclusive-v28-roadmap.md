# Neuroinclusive mail service v28

The product is designed for people with ADHD, depression, low energy, and executive dysfunction. It reduces decisions and restart cost without hiding the original email or pretending AI output is authoritative.

## Existing foundations

- Per-user, per-Gmail-account isolation and account switching.
- Manual and automatic importance priorities with colors.
- Quiet hours, snooze, drafts/autosave, Telegram-native actions.
- Gmail labels/settings metadata, Drive and Box connection foundations.
- Whole-thread Ukrainian summaries, original HTML/text, attachments, and bidirectional Gmail history.
- Base architecture source refresh: `deep-research-report3.md` (2026-07-18), with explicit hybrid architecture constraint:
  - Gmail add-on = fast contextual triage (card-based, low cognitive load),
  - Apps Script Web App = richer control surfaces,
  - Gmail API `watch`/`history` + optional external queue (Pub/Sub + worker) for durable event ingestion and retries.

## P0 — Functional Focus

- Focus View shows one thread and no more than three primary actions.
- Four persistent states: `Дія`, `Чекаю`, `Інфо`, `Пізніше`.
- One editable minimal next action per thread.
- Resume Rail restores account, folder/filter, thread, reading position, draft, and unfinished triage after reload.
- Reversible actions use immediate execution plus Undo; irreversible send/rule/destructive actions keep explicit confirmation.

Acceptance:

- Fully keyboard/touch usable; max three primary actions in low-energy mode.
- Triage persists per Telegram user and Gmail connection and never crosses zones.
- Reload restores the exact safe working context without repeating a Gmail mutation.

## P0 — Trustworthy AI assist

- Ukrainian summary answers: who, what happened, deadline/date, requested action, and risk of ignoring.
- Explicit AI label, confidence level, and links/quotes to source fragments.
- Editable next action; original message is always one tap away.
- Email HTML and linked content are untrusted data and cannot instruct the assistant or tool layer.

## P1 — Gentle Action and Attention Control

- Three low-pressure reply styles and scheduled send with cancellation.
- Reminder modes: soft, digest/batch, and urgent-only.
- Compassionate copy with no streaks, shame, punishment, or false urgency.
- Priority list for bills, social workers, healthcare, deadlines, and user-defined people/domains.

## P1/P2 — Recovery and personalization

- Low-energy and available-time modes.
- Backlog rescue that selects a bounded set instead of exposing an infinite inbox.
- Progressive onboarding in at most three screens.
- Privacy-preserving metrics that never store message content.

## Delivery slices

1. Preserve and verify v27 baseline.
2. Implement Focus state model, next action, and Resume Rail with tests.
3. Add the simplified Mini App surface and Telegram controls.
4. Add summary evidence/confidence contract.
5. Add gentle replies, send later, reminder modes, and onboarding.
6. Run desktop/mobile/phone functional QA; guarded v28 release only after exact preflight.
7. Close v45 architecture gaps: isolate event ingestion from UI and Telegram control plane, with lock-safe continuation and replay-safe webhook handling.
8. Add production security proof bundle: scope matrix + webhook safety + state transition contract + endpoint map.

## Current preserved progress

- Production: immutable v32/product v38 integrated P1, including the exact account-identity compatibility fix and zero-scroll mobile access to Support/Rules before all dynamic lists.
- Separate preserved candidates: v30 low-pressure reply starters; v31/v32 durable send-later backend and UI; v33 three-screen per-account onboarding; v34 compassionate reminder delivery; v35 soft-to-digest continuation.
- v33 stores only bounded preference metadata. v34 stores only IDs, states, revisions, and timestamps; neither stores message bodies, summaries, attachment names, or subjects in the reminder ledger.
- v34 passes the 354-test ordinary functional matrix and independent read-only review. It defers every mode through quiet hours and provides exact-account `Пізніше` / suppression callbacks with at-most-once Telegram delivery boundaries.
- v35 completes automatic soft-to-digest continuation with under-lock activity invalidation, digest-window-only retries, and durable idempotent retirement of the previous standalone reminder.
- Combined release completed: product v38 passed ordinary, rendered Chrome, staging-phone, and production-phone checks; stable advanced directly from v29 to v32; temporary bridges and staging deployment were removed.
- Product v39 now implements the trustworthy summary evidence slice locally: explicit method/AI labelling, structured conservative confidence, bounded server-selected source quotes, claim tags, automatic risk labelling, and one-tap navigation to the exact message or original Gmail thread.
- Product v40 now implements bounded backlog rescue locally: explicit 1/3/10-thread sessions, read-only 60-thread scan, content-free exact-account persistence, compassionate progress, reload recovery, and progress only after a confirmed user decision.
- Product v41 now implements opt-in privacy-preserving functional-relief metrics locally: exact user/account isolation, content-free 30-calendar-day aggregates, start-day rescue cohorts, coarse first-decision buckets, and explicit disable/clear controls without streaks or productivity scoring.
- Product v41 post-fix desktop/mobile rendered interaction proof now passes 28/28 at 1440×900 and 390×844. Next product slices remain task/calendar confirmation, adaptive information density, optional co-processing, and independent multi-provider attachment UX; a guarded v41 release still requires fresh Telegram WebView acceptance and a separately pinned immutable release gate.
- Production Apps Script v34/product v38.2 now automatically compacts only the launching Telegram user's abandoned session families while preserving up to six parallel sessions and never evicting another user.
- Product v42 now implements evidence-grounded local-task and Calendar handoff locally. Suggestions require exact action-to-quote or deadline-to-quote support, show the exact Gmail account and quote, keep titles editable, never infer Calendar time, and mutate only after explicit confirmation. Targeted contracts pass 219/219, the ordinary matrix passes 367/367, and desktop/mobile rendered QA passes 44/44. It remains undeployed pending a separately pinned immutable release gate and fresh Telegram WebView acceptance.
- Product v43 now implements adaptive information density locally. Every Gmail account can use `auto`, `minimal`, `standard`, or `analytical`; auto follows the current energy preset, minimal exposes exactly three primary actions, and the complete original remains one interaction away. The selector is available in every open reader, not only Focus. Targeted contracts pass 220/220, the ordinary matrix passes 368/368, and desktop/mobile rendered preview QA confirms no horizontal overflow. It remains undeployed pending a separately pinned immutable release gate and fresh Telegram WebView acceptance.
- Product v44 now implements explicit private co-processing presence locally: 10/25-minute timers, gentle phases, account-scoped content-free restoration, idempotent finish/stop, and no Gmail mutation, shared room, streak, or unsolicited push.
- Product v45 now adds ephemeral gentle in-session milestones for the first decision, third decision, and ten completed co-processing minutes. The acknowledgement is dismissible and account-resetting, uses no durable/browser storage or mail identifiers, and explicitly rejects points, streaks, comparisons, confetti, and pressure to continue.

## v45 priority slice from deep-research-report3

Current highest-value backlog (non-oAuth, non-migration, non-invasive):

1. Read-only noise classification in Focus (newsletters/system mail/social updates) with explicit user-visible rationale.
2. One-click rule suggestion UX (no automatic Gmail mutation until user confirmation).
3. End-to-end replay-safe callback contract for all webhook-like actions (`doPost`, Telegram callbacks, external relays).
4. Lock discipline audit for any token/state refresh path and installable trigger overlap.
5. Optional calendar-aware `до наступної зустрічі` only after explicit Calendar availability contract is added.
