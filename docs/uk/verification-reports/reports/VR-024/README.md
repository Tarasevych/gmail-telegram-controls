# VR-024 — Fail-fast circuit URL Fetch quota

[English](../../../../en/verification-reports/reports/VR-024/README.md)

- **Дата:** 2026-07-23
- **Загальний статус:** PARTIAL
- **Source request:** `REQ-0034`
- **Verification framework:** `REQ-0004`
- **Product task:** `B1-34`
- **Issue:** `GT-054`
- **Release boundary:** лише source; production v65, staging `0`, immutable v70 незмінний; OAuth, Gmail, Telegram, menu, deployment або release journal не мутувалися

## Підтверджена першопричина

Authenticated Apps Script execution evidence показав, що timer worker не зупинився на першому signal добової URL Fetch quota. Він продовжив quota-dependent retention, reminder, OAuth refresh і legacy recovery paths до завершення з помилкою. Source підтвердив, що best-effort catch у stages логували failures і продовжували роботу. Попередній висновок `GT-024`, що сама quota є shared та external, лишається чинним; `GT-054` є окремим fail-fast defect, який посилював retries і runtime pressure після вичерпання.

## Source correction

1. Circuit у Script Properties зберігає лише `{v, u}`: schema version та expiry.
2. Перший класифікований exception добової URL Fetch quota відкриває 15-хвилинне probe window.
3. Catch у Gmail, Telegram і Google token-refresh transports передають quota signal до wrapping або swallowing domain error.
4. Timer припиняє поточний pipeline, звільняє tokenized lease і записує content-free telemetry `quota_blocked` / `quota_circuit`.
5. Minute invocations у відкритому window не виконують mail або transport work.
6. Після expiry одне execution перевіряє recovery; наступний quota exception знову відкриває window.
7. Circuit не заявляє exact reset time Google і не змінює OAuth або mailbox state.

## Атомарні твердження

| ID | Твердження | Статус | Доказ |
|---|---|---|---|
| VR-024-01 | Worker продовжував quota-dependent stages після першого signal добової URL Fetch quota. | VERIFIED | authenticated execution stages і content-free error sequence |
| VR-024-02 | Apps Script daily quotas є per-user і reset через 24 години після першого request; перевищення кидає exception. | VERIFIED | офіційна документація Apps Script quotas |
| VR-024-03 | Circuit record не містить user, account, message, token, URL або mail identifier. | VERIFIED | deterministic content-free record contract і added-line scan |
| VR-024-04 | Відкритий circuit пропускає повний timer pipeline і звільняє lease з quota telemetry. | VERIFIED | runtime-budget VM contract |
| VR-024-05 | Gmail, Telegram і Google refresh transport exceptions можуть відкрити той самий circuit до domain wrapping. | VERIFIED | source contracts |
| VR-024-06 | Focused runtime-budget contracts проходять `9/9`; повний Apps Script suite проходить `593/593`. | VERIFIED | local Node test traces |
| VR-024-07 | Circuit відновлює live delivery після quota reset і проходить native acceptance. | UNVERIFIED | staging або production runtime mutation не виконувалася |

## Platform та recovery boundary

[Офіційна документація Apps Script quotas](https://developers.google.com/apps-script/guides/services/quotas) визначає per-user daily limits, reset через 24 години після першого request і exceptions після вичерпання. Вона не надає цьому проєкту exact reset timestamp. Тому 15-хвилинна probe є bounded backoff, а не заявою про час reset. Gmail History і durable notification state лишаються відповідальними за catch-up після recovery.

Ця correction не може поповнити вичерпану quota. Вона запобігає повторному minute-scale pressure і зберігає причинно чисте acceptance window. Цей source contour не створює нового immutable candidate. Staging і production лишаються gated clean quota readback та normal owner-authorized release process.
