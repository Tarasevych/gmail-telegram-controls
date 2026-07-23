# VR-025 — Конфлікт політики `INBOX+SENT`

[English](../../../../en/verification-reports/reports/VR-025/README.md)

- **Дата:** 2026-07-23
- **Загальний статус:** CONFLICTING
- **Source request:** `REQ-0035`
- **Verification framework:** `REQ-0004`
- **Workstream:** V3 `T-03`
- **Issue:** `GT-039`
- **Release boundary:** `BLOCKED`; production v65, staging `0`, immutable v70 незмінний; Gmail, Telegram, OAuth, menu, deployment і release journal не мутувалися

## Перевірені стани

1. `REQ-0009` визначає одну фізичну доставку на Gmail message та забороняє дублікати.
2. `REQ-0019` прямо фіксує, що external `INBOX` створює одну card, а self/alias `INBOX+SENT` пропускається.
3. Production v65 реалізує пропуск `INBOX+SENT`; попередній live probe створив нуль cards.
4. Current `main` дозволяє `INBOX+SENT` у `gmailNotificationLabelsEligible_`; focused suite `161/161` доводить одну доставку та відсутність повторної доставки.
5. `REQ-0033`, до якого прив’язано `GT-039`, не містить окремого прямого owner policy-рішення для self/alias mail.

## Три рівні RCA

| Рівень | Висновок | Статус |
|---|---|---|
| Gmail labels | Один Gmail message може одночасно мати `INBOX` і `SENT`; це не дві окремі message identities. | VERIFIED |
| Delivery/dedupe | Обидві реалізації deterministic: production пропускає, current source доставляє один раз через stable message-ID dedupe. | VERIFIED |
| Product policy | Канонічні owner records задають несумісні self/alias outcomes. Технічний тест не може вибрати продуктову політику. | CONFLICTING |

## Атомарні твердження

| ID | Твердження | Статус | Доказ |
|---|---|---|---|
| VR-025-01 | Production v65 пропускає `INBOX+SENT`. | VERIFIED | VR-015 production observation |
| VR-025-02 | Current source доставляє `INBOX+SENT` один раз і не повторює delivery. | VERIFIED | `gmailNotificationLabelsEligible_`; focused `161/161` |
| VR-025-03 | `REQ-0019` явно приймає skip self/alias probe. | VERIFIED | sanitized canonical request record |
| VR-025-04 | `REQ-0033` не надає прямої нової policy-вказівки для self/alias mail. | VERIFIED | canonical request record |
| VR-025-05 | Exactly-once source delta дозволено просувати в production. | BLOCKED | потрібне пряме owner decision |

## Єдина потрібна дія власника

Вибрати один інваріант:

- `(A)` self/alias `INBOX+SENT` пропускається; external `INBOX` доставляється рівно один раз.
- `(B)` кожен `INBOX`, включно з self/alias `INBOX+SENT`, доставляється рівно один раз.

До цього рішення не створювати release candidate, який містить спірний notification-policy delta. Незалежні UI, attachment, cache, draft і provider workstreams можуть продовжуватися.
