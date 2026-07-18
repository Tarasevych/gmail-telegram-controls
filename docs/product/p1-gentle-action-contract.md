# P1 gentle-action contract

This contract turns the research recommendations into a bounded follow-up to the verified production-v28 Focus View. The first v29 slice implements the account-isolated session and reminder preferences; later sections remain release-ordered acceptance contracts.

## Product rules

- Never use streaks, punishment, shame, red failure counters, or copy such as “you missed this again”.
- The lower the selected energy, the fewer choices and less text the interface returns.
- Gmail remains authoritative for message, draft, sent, label, and thread state.
- User assistance state is isolated by Telegram user and Gmail connection. It never moves with a UI-only account switch.
- AI output is editable, labelled as AI, and accompanied by confidence and original-message evidence.
- Sending, scheduling, cancelling, and editing must be idempotent and recoverable after a lost response.

## Session presets

The user chooses one quick preset; no multi-field settings form is required.

| Preset | Queue budget | Visible choices | Default wording |
| --- | ---: | --- | --- |
| `Мало сил` | 1 thread | next action, short reply, snooze | `Почнемо з одного листа. Цього достатньо.` |
| `5 хвилин` | up to 3 threads | triage plus three primary actions | `Можна зупинитися після цього короткого блоку.` |
| `3 листи` | exactly 3 or fewer available | triage plus three primary actions | `Залишилося не більше трьох рішень.` |
| `Без таймера` | bounded maximum 10 | normal Focus View | `Працюйте у своєму темпі.` |

The queue count is a hard UI bound, not a claim that the remaining inbox is unimportant. Closing the session preserves Resume Rail and does not mark unseen mail read.

## Low-pressure reply

The reply entry point offers no more than three editable starting styles:

1. `Коротко` — one or two direct sentences.
2. `Професійно` — concise greeting, decision/request, closing.
3. `Тепло` — human acknowledgement without inventing facts or commitments.

Every suggestion shows `AI-чернетка`, confidence, and which original messages informed it. The user edits a Gmail draft before sending. No AI draft is sent automatically.

## Send later

- Evening replies may offer `Надіслати вранці`, but never select it silently.
- A scheduled item has one durable operation ID, exact Gmail connection, draft ID, due epoch, timezone, state, and revision.
- Supported states: `scheduled`, `sending`, `sent`, `cancelled`, `needs_review`, `failed_terminal`.
- Cancellation is available until the send operation is claimed.
- A worker performs Gmail readback before retrying an uncertain send and never issues a second send POST after confirmation.
- Telegram and Mini App display the same authoritative schedule state.

## Reminder modes

| Mode | Behaviour |
| --- | --- |
| `М’яко` | one neutral reminder, then return to digest unless the user acts |
| `Дайджест` | group reminders into the user’s selected windows |
| `Лише термінове` | notify only critical user rules or an explicit near deadline |

Quiet hours remain authoritative. Urgency never bypasses quiet hours without a separate explicit user option. Reminder copy says what can be done next and always offers `Пізніше` or `Не нагадувати про цей лист`.

## Three-screen onboarding

1. `Що допоможе сьогодні?` — choose `Мало сил`, `5 хвилин`, `3 листи`, or `Без таймера`.
2. `Коли нагадувати?` — choose `М’яко`, `Дайджест`, or `Лише термінове`; show current quiet hours.
3. `Готово` — show the chosen Gmail account, presets, privacy summary, and `Відкрити Фокус`.

Each screen displays `Крок N із 3`, preserves earlier selections, has a stable Help action, and permits skipping. No Google password is requested or handled by the app.

## Storage contract

Preferences are a bounded per-user/per-Gmail-connection record:

```text
version, revision, telegramUserId, gmailConnectionId,
sessionPreset, reminderMode, digestWindows, quietHoursReference,
onboardingCompletedAt, updatedAt
```

No subject, sender, body, attachment name, AI summary, or reply text is stored in preference metrics. Behaviour metrics use only bounded event names, timestamps, durations, and counts.

## Acceptance matrix

- Switching Gmail accounts shows that account’s exact independent preferences.
- Another Telegram user receives only an expected denial and cannot observe the record.
- `Мало сил` never displays more than one working thread or more than three primary actions.
- Reload resumes the exact safe session without repeating Gmail mutations.
- Scheduled send survives a lost response without a duplicate message.
- Cancelling before claim prevents send; cancelling after confirmation reports `sent` honestly.
- Quiet hours and reminder mode produce the same decision in Telegram and Mini App.
- Onboarding is keyboard/touch accessible and has exactly three screens.
- Compassionate-copy snapshot tests reject the prohibited shame phrases.
- All provider/OAuth consent remains on the provider’s official HTTPS page.

## Release order

1. Deploy and verify frozen v28 P0.
2. Add isolated preference storage and interactive session presets. **Implemented and locally verified in v29.**
3. Add gentle reply styles as editable Gmail drafts.
4. Add durable scheduled-send journal and worker with readback.
5. Add reminder modes and three-screen onboarding.
6. Run ordinary regression, desktop/mobile/phone QA, guarded release, and post-deploy synchronization checks.
