# v35 current-session logout and stale capacity recovery

## Reproduced production symptom

The owner saw the legacy capacity message with only `Перезапустити Mini App`
while manually opening Gmail from Telegram in parallel. Read-only Apps Script
preflight still proved that the stable deployment is exact immutable v34 and
that its five source hashes match the guarded release pins.

The displayed sentence exists only in the older pre-v34 session path. An
already-rendered Telegram WebView therefore remained stale. Its Restart action
also reused the same one-use Telegram `initData`; the launch claim had already
been consumed before the capacity failure, so replay degraded into a generic
launch error without the owner-bound recovery token.

## v35 behavior

- The account panel exposes `Вийти з цього сеансу` separately from
  `Від’єднати`.
- Sign out revokes the exact current refresh family and cached bearer under
  ScriptLock. Other windows, Telegram users, Gmail connections, OAuth grants,
  labels, drafts, and messages remain untouched.
- A signed-out bearer is rejected immediately and cannot be reused.
- A capacity fallback with no usable recovery action closes the stale WebView
  and tells the user to open `📬 Пошта` from Telegram, which supplies fresh
  signed launch data. It no longer loops the consumed launch command.

## Verification

- Targeted MailClient and MailApp contracts: 216/216 passed.
- New server proof opens two parallel families, signs out one, retains the
  sibling, rejects the revoked bearer, and records zero Gmail calls.
- The ordinary candidate matrix passes 363/364. The single failing reminder
  helper contract is also the only failure on clean immutable v34 (360/361),
  so it is pre-existing branch debt and is not modified by this hotfix.
- Standalone system-Chrome rendered QA passes all 15 desktop/mobile checks at
  1440×900 and 390×844, including account identity, button distinction,
  viewport bounds, confirmed sign-out copy, and zero application errors.
- Private rendered artifacts remain outside Git in the thread visualization
  directory: `v35-session-logout-qa.json` and desktop/mobile screenshots.

No live Gmail message, label, draft, OAuth grant, Telegram zone/card, provider
account, browser account, or phone state was changed while building or testing
this candidate.
