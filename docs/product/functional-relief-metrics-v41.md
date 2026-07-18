# Product v41: private functional-relief metrics

## Product intent

This slice measures whether the service reduces restart cost and helps a user make a manageable decision. It deliberately does not score productivity, promote Inbox Zero, count reading volume, or create streaks.

The account panel shows only four seven-day aggregates:

- bounded rescue sessions started;
- explicit decisions completed;
- the start-day cohort recovery percentage;
- a coarse median time-to-first-decision bucket.

The language is non-judgmental and the feature is disabled until the Telegram user explicitly enables it for one exact Gmail connection.

## Privacy and isolation contract

- Scope is exact `Telegram user ID + Gmail connection ID`.
- Durable rows contain only a civil day, counters, and five coarse time buckets.
- No Gmail message/thread IDs, sender, address, subject, snippet, body, summary, attachment metadata, OAuth material, or browser identifier is stored.
- No browser storage or third-party analytics service is used.
- Retention is 30 real calendar days in the account timezone. Expired rows are excluded on every read/write, and the existing minute worker performs a bounded physical purge at most once per UTC day even if the user does not reopen the Mini App. Corrupt registries are deleted fail-closed; a transient compaction failure leaves the daily marker unset so the next worker pass retries.
- The user can disable future collection without deleting history, or explicitly clear history without silently changing the opt-in setting.
- Every preference mutation uses optimistic revision checking. A sibling Gmail account starts with an independent disabled registry.

## Correctness boundaries

- Metrics are recorded under the same ScriptLock as the exact rescue-state transition. Enabling, disabling, or clearing cannot race a delayed event.
- A rescue persists its civil start day, and all later decisions use that fixed cohort even if the user crosses midnight or changes the account timezone. A reporting-window boundary therefore cannot split numerator and denominator.
- Civil-day windows are computed from calendar labels rather than fixed elapsed 24-hour steps, so daylight-saving changes do not skip or duplicate a day.
- Storage pressure may omit a best-effort aggregate, but it cannot fail or roll back a confirmed user mail decision. No Gmail mutation is performed by the metrics endpoint.

## User controls

Path: account avatar → `ADHD-фокус і пріоритети` → `Правила` → `Мій ритм · приватно`.

- `Увімкнути приватну статистику` / `Вимкнути збір` changes only the selected Gmail connection.
- `Очистити історію` requires an inline second click and has a cancel action.
- A synchronous card redraw preserves the open account panel by evaluating the click's original composed path.

## Verification

- Targeted MailApp/MailClient matrix: 217/217 PASS.
- Ordinary mutable-product matrix: 365/365 PASS.
- Final independent read-only review: no findings; its four focused checks pass.
- Tests prove default-off behavior, stale revision denial, account isolation, no mail content in storage, read and background physical expiry compaction, exact one-minute bucket handling, and a rescue cohort crossing midnight plus a timezone change.
- In-app Browser rendered the populated desktop card within panel bounds with no application console errors and reproduced a false outside-click defect during clear confirmation. The defect is fixed and has a static regression contract.
- The Browser plugin then blocked localhost reload under its URL policy. Per its explicit restriction, no alternate browser workaround was used in this run. Post-fix desktop/mobile interaction proof remains a release gate.

Production remains Apps Script v33/product v38. This v41 slice is local and must not be deployed without a separately pinned immutable release gate and fresh rendered/Telegram WebView acceptance.
