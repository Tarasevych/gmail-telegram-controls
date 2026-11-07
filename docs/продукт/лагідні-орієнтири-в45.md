# Product v45: gentle in-session milestones

Product v45 closes the research requirement for small rewards without turning mail into a game.

## User contract

- The Focus surface acknowledges the first confirmed decision, the third confirmed decision, and at least ten completed minutes of private co-processing.
- Copy always gives permission to stop. It never asks the user to preserve a streak or continue for a reward.
- The acknowledgement is dismissible, uses a polite live region, and does not block mail actions.
- There are no points, badges, confetti, ranks, comparisons, debts, red counters, or streak penalties.

## Privacy and isolation

- Milestone state exists only in the current Mini App JavaScript memory.
- It contains the active Gmail connection ID, a decision count capped at three, the current neutral copy, and a dismissed flag.
- It is not written to Apps Script Properties, browser storage, Gmail, Telegram, analytics, or another provider.
- It contains no Gmail thread/message ID or mail content.
- Switching Gmail accounts discards the previous account's transient milestone state immediately.
- A decision counts only after the exact open thread changes from `none` to a confirmed triage state.
- The ten-minute acknowledgement appears only after at least ten real elapsed minutes in an explicitly started co-processing session.

## Release boundary

This is an isolated client slice. It introduces no RPC, OAuth scope, Gmail mutation, background process, migration, or deployment. Production and active v43 staging remain unchanged until a separate immutable release and Telegram WebView acceptance decision.
