# VR-029 — Розділення read-only Spam list і proactive notification policy

- **ID:** VR-029
- **Дата:** 2026-07-23
- **Статус:** PARTIAL
- **Source request:** `REQ-0035`
- **Verification framework:** `REQ-0004`
- **Product task:** `B1-38`
- **Issue:** `GT-058`
- **Контур V3:** `G-01`

## Перевірене твердження

Explicit owner command `/mail folder:spam` є read-only list operation, окремою від policy створення proactive Telegram cards. Product source вже компілює folder у exact Gmail system label `SPAM`, додає `includeSpamTrash=true` і використовує bounded page token. Proactive worker окремо читає frozen time slice та застосовує current-`INBOX` gate після metadata read.

## Першопричина прогалини

Source defect не підтверджено. Прогалиною була відсутність прямого regression contract, який одночасно фіксує обидві дозволені межі: Spam можна читати за явним owner request, але Spam-only повідомлення не стає proactive notification card.

## Доказ

- Synthetic parser приймає тільки allowlisted `folder:spam`.
- Перший і наступний list requests використовують exact `labelIds=SPAM`, `includeSpamTrash=true` та bounded Gmail page token.
- Contract відхиляє появу mutation endpoints у Spam browse path.
- Notification scan лишається окремим time-slice request без `SPAM` folder filter.
- Source contract підтверджує current-`INBOX` gate після metadata read.
- Focused contract: `2/2`.
- Повний Apps Script suite: `612/612`.
- `Code.gs` не змінено.

## Межі

- Живі Gmail-листи не читалися й не змінювалися.
- Telegram command не виконувався у production.
- OAuth, staging, production, menu та release journal не змінювалися.
- Native owner acceptance для першої/наступної сторінки, empty state і runtime error лишається `UNVERIFIED`.
- Спільний URL Fetch quota blocker не використовується як доказ успіху або regression.

## Висновок

Source policy separation має статус `VERIFIED`; весь контур лишається `PARTIAL` до native owner acceptance. Цей evidence не змінює proactive Spam policy та не створює release candidate.

[English mirror](../../../../en/verification-reports/reports/VR-029/README.md)
