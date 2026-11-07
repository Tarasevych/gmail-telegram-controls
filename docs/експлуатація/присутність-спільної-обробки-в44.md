# Product v44 private co-processing presence

Product v44 adds an optional in-app presence block for people who find it easier to begin routine mail work when someone or something quietly remains alongside them.

## User contract

- The user explicitly starts either a 10-minute or 25-minute session from Focus.
- The open Mini App shows a countdown, progress bar, and three gentle phases: beginning, midpoint, and soft close.
- The user can finish positively or stop without evaluation at any time.
- There are no streaks, penalties, background pushes, shared rooms, or unsolicited reminders.
- The feature does not read or copy message content and does not call a Gmail mutation.

## Isolation and persistence

- State uses the existing exact `Telegram user × Gmail connection` attention scope.
- Durable state contains only duration, start/end/update timestamps, the active flag, and a bounded idempotency operation ID.
- Writes use the shared optimistic attention revision and a ScriptLock.
- A repeated start/finish/stop after a lost response is idempotent. Another active timer cannot be silently replaced.
- Switching Gmail accounts clears the old client state and restores only the selected account's presence state.
- Existing v1 attention records remain valid because a missing presence field normalizes to an inactive default.

## Verification

- Targeted MailApp/MailClient contracts: 222/222 passed.
- Ordinary mutable-product matrix: 370/370 passed.
- Browser path: Codex in-app Browser; no fallback required.
- Desktop and 390×844 rendered preview both passed page identity, non-blank UI, no framework overlay, interaction, vertical scrolling, and zero horizontal overflow checks.
- The 10-minute timer decreased from `10:00`, progress attributes advanced against `max=600`, and `Зупинити без оцінки` restored both start buttons.
- Console contained no application error. The two warnings were expected Telegram WebApp 6.0 capability notices for BackButton and swipe control in local preview.
- Screenshots are preserved outside Git as `v44-co-processing-desktop.png` and `v44-co-processing-mobile.png` in the thread visualization directory.
- QA port 8775 was closed after validation.

Production and the active product-v43 staging deployment were not changed. Product v44 requires its own future immutable release gate and fresh Telegram WebView acceptance before any deployment decision.
