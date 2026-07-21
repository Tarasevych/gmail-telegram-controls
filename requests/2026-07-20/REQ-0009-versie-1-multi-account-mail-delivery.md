# REQ-0009: Multi-account Gmail delivery / Доставка Gmail з кількох акаунтів

- ID: REQ-0009
- Received: 2026-07-20
- Status: recorded
- Active Versie: Versie 1
- Next Versie authorization: no
- Depends on: REQ-0008 multi-account account registry and OAuth return
- Sensitive data persisted: no plaintext OAuth tokens, client secrets, Telegram tokens, cookies, private account addresses, message content, or session credentials in Git
- Routes: requests=record; instructions=no-change; permissions=reference; plan=update; product=update; release=no-change
- Permission basis: explicit
- Detailed scope: permissions reference P-001/P-002/P-004/P-005; issues, documentation, verification, and product update; runtime only after tests; main only after acceptance

<!-- lang:uk -->
## Українською

Власник наказав у межах активної Versie 1 відновити непрацюючу доставку Gmail-повідомлень у Telegram і пристосувати весь delivery pipeline до кількох Gmail-акаунтів одного Telegram-користувача. Поточний акаунт веб-інтерфейсу має визначати лише UI-контекст і не може обмежувати фонове отримання листів.

## Архітектурний напрямок

- Один Telegram user має список ізольованих Gmail connection records; кожен запис має власний захищений token record, cursor, lease і retry state.
- Фоновий worker обходить усі активні `notificationConnectionIds`, а не лише `activeConnectionId`.
- Ідемпотентність визначається ключем `Telegram user + Gmail connection + Gmail message`, щоб однакові Gmail ID з різних акаунтів не змішувалися.
- Кожна Telegram-картка явно показує адресу/мітку Gmail-акаунта й усі callback-дії зберігають точний `connectionId`.
- Канонічна фізична доставка відбувається один раз до загальної стрічки «Усі повідомлення»; окремі корені акаунтів є відфільтрованими представленнями, а не дубльованими картками.
- Секрети залишаються лише у protected runtime storage; Git зберігає код, схеми, санітизовані журнали й докази.

## Критерії завершення

- Фактична причина зупинки production delivery визначена доказами trigger/execution/runtime і виправлена.
- Листи обробляються з усіх явно підключених та notification-enabled Gmail connections незалежно від активного UI-акаунта.
- Кожне повідомлення має точну account identity; немає cross-account змішування або подвійної фізичної доставки.
- «Усі повідомлення» та account-scoped views працюють у Telegram.
- Локальні тести, preflight, staging і контрольований real-time acceptance пройдено без випадкових Gmail mutations.
- Зміни, двомовна документація й factual verification evidence закомічені та опубліковані; runtime просувається лише після тестів.

<!-- lang:en -->
## English

The owner ordered restoration of the broken Gmail-to-Telegram delivery within active Versie 1 and adaptation of the full delivery pipeline to multiple Gmail accounts linked to one Telegram user. The currently selected Web App account is UI context only and must not restrict background mail delivery.

## Architecture direction

- One Telegram user owns isolated Gmail connection records; each record has its own protected token record, cursor, lease, and retry state.
- The background worker iterates every active `notificationConnectionId`, not only `activeConnectionId`.
- Idempotency uses `Telegram user + Gmail connection + Gmail message`, preventing identical Gmail IDs from different accounts from being mixed.
- Every Telegram card displays the exact Gmail account address/label, and every callback preserves the exact `connectionId`.
- One canonical physical delivery goes to the “All messages” feed; per-account roots are filtered views rather than duplicate cards.
- Secrets remain only in protected runtime storage; Git stores code, schemas, sanitized logs, and evidence.

## Completion criteria

- The actual production delivery outage is identified from trigger, execution, and runtime evidence and repaired.
- Mail is processed from every explicitly connected, notification-enabled Gmail connection regardless of active UI account.
- Every notification carries exact account identity, with no cross-account mixing or duplicate physical delivery.
- “All messages” and account-scoped views work in Telegram.
- Local tests, preflight, staging, and a controlled real-time acceptance pass without arbitrary Gmail mutations.
- Code, bilingual documentation, and factual verification evidence are committed and published; runtime advances only after tests.

## v55 local verification evidence: b5a5452 / 4ff66ca

Status: `partial`
Updated: `2026-07-21`

- Product code commit `b5a5452646d26479b4a74fc00e31df0d56e23898` excludes a Sent copy from realtime, quarantine, and frozen notification paths even when Gmail also labels it Inbox.
- The obsolete v54 staging mailbox-mutation test was replaced with a v55 assertion that the mutation surface is absent.
- The exact v55 Code.gs SHA-256 was pinned in the release contract and helper.
- Targeted tests passed: `153/153` mail actions and `3/3` release contracts.
- Full local suite passed: `19` files, `432/432` tests.
- `PreflightOnly` passed: stable v50, HEAD `stable_v50`, current staging `0`, one legacy staging deployment, `readyToStage=true`, and candidate hashes matched.
- Cumulative bilingual evidence was published in `4ff66ca94312a2959798af3773e70cd0ac7c0879`.
- GitHub Actions passed: knowledge hub `29811294529`, bilingual docs `29811294530`, verification reports `29811294569`.
- No Gmail message was selected or mutated, no OAuth flow was repeated, and no staging/immutable/production deployment occurred.
- Remaining evidence: explicit release authorization, staging/immutable readback, and one controlled live message proving exactly one Telegram card with correct account identity.
