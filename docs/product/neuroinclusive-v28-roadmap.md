# Neuroinclusive mail service v28

The product is designed for people with ADHD, depression, low energy, and executive dysfunction. It reduces decisions and restart cost without hiding the original email or pretending AI output is authoritative.

## Existing foundations

- Per-user, per-Gmail-account isolation and account switching.
- Manual and automatic importance priorities with colors.
- Quiet hours, snooze, drafts/autosave, Telegram-native actions.
- Gmail labels/settings metadata, Drive and Box connection foundations.
- Whole-thread Ukrainian summaries, original HTML/text, attachments, and bidirectional Gmail history.

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
