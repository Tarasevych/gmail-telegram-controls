# Product v40 — bounded backlog rescue

Product v40 turns the existing Focus view into an explicit, energy-sized Inbox rescue session. It is a local candidate built from preserved product v39; production remains immutable Apps Script v32/product v38.

## User contract

- The user explicitly selects `Підібрати короткий блок`; opening Focus alone changes nothing.
- The current energy preset selects 1, 3, or at most 10 threads from a read-only scan of at most 60 Inbox threads.
- Ranking prefers an explicit `Дія`/`Чекаю` state, user focus priority, Gmail `IMPORTANT`, then unread and older mail. Email text is never interpreted as an instruction.
- Focus renders only the exact bounded selection, shows `N із M рішень`, and allows the user to stop at any time.
- Progress advances only after an explicit triage choice or a confirmed Gmail action. Merely opening a thread or the automatic read-state refresh does not count.
- Starting, loading, and finishing a session never mutate Gmail. Finishing clears only the rescue session.

## Isolation and persistence

- Every session is scoped to the exact Telegram user ID and Gmail connection ID.
- A unified/mixed-account feed cannot start a rescue session; the user must select one Gmail account.
- Durable state contains only up to 10 Gmail thread IDs, completed IDs, preset, bounded scan count, revisions, and timestamps.
- Sender, recipient, subject, snippet, summary, message body, attachment metadata, and OAuth material are never written to rescue state or browser storage.
- Reload and account switching restore only the session belonging to the selected Gmail connection. Threads no longer in Inbox are omitted without changing Gmail.

## Performance boundary

- Gmail metadata is fetched in at most two parallel batches of 30.
- Ranking runs on metadata DTOs. Only the 1–10 selected previews are translated; unselected scanned mail does not consume translation work.
- ScriptLock protects only the content-free compare-and-swap write. Gmail and translation network work never runs while the lock is held.

## Verification

- Targeted MailClient/MailApp contracts: 214/214 PASS.
- Ordinary mutable-product matrix: 362/362 PASS.
- Standalone system-Chrome rendered QA: 22/22 PASS at 1440×900 and 390×844.
- Rendered checks cover explicit start, read-only copy, exactly three rows for the five-minute preset, compassionate progress, explicit-action completion, row removal, viewport bounds, mobile control reachability, and console health.
- No live Gmail, Telegram, OAuth, Apps Script deployment, provider, browser-account, or phone mutation was used for this local phase.
