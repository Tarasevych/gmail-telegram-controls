# Runtime quota evidence: production v55 і staging v57

[English](../../../../en/verification-reports/reports/VR-004/RUNTIME_QUOTA_EVIDENCE.md) | [VR-004](README.md)

- **Дата перевірки:** 2026-07-21
- **Методика:** REQ-0004
- **Scope:** signed Telegram Desktop Mini App та Apps Script Executions
- **Gmail/OAuth mutation:** ні
- **Release promotion:** ні

## Перевірений факт

Owner-only staging v57 і два свіжі production v55 launches показали однаковий generic mailbox error. Тому candidate-specific regression v57 не доведено.

Для staging v57 Apps Script Executions показав завершені:

- `doPost`: 3.02 s;
- `mailboxRedeemLaunch`: 3.4 s;
- `mailboxRpc`: 23.218 s.

Це відділяє HTTP callback, signed-launch redemption і RPC transport від application-level Gmail API failure. У worker lane журнал далі містив:

1. `Google OAuth token refresh request failed`;
2. `Service invoked too many times for one day: urlfetch`;
3. stack boundary `gmailApiRequest_` -> `gmailApi_` -> `listGmailNotificationPage_` -> `runMailCheck_` -> `checkNewMail_`.

## Release decision

- Production і HEAD лишаються exact v55.
- Immutable v56 лишається історичним.
- Один owner-only staging v57 збережено для майбутнього A/B.
- Telegram menu повернуто на production.
- v57 не просувається під вичерпаною shared quota.
- Код не змінюється через зовнішню quota; наступний candidate буде v58 лише за доказу candidate-only defect.

## Наступний доказовий gate

Після відновлення daily quota:

1. два fresh production v55 launches без network error;
2. signed staging v57 bootstrap;
3. avatar і три account roots;
4. switch на контрольований другий Gmail account і назад без OAuth;
5. лише після A/B pass стандартні Promote, два production launches і CleanupStaging;
6. чотири trigger opportunities без overlap, 150-second worker slot і 15-minute History slot;
7. один owner self-message з унікальним marker, рівно одна Telegram card і відсутність дубля після двох `/check`.

## Обмеження

- Виконання UI завершилося application-level error, тому successful Apps Script row не означає успішний mailbox result.
- Точний час відновлення shared quota не підтверджено.
- Mail content, tokens, `initData`, account identifiers, execution IDs і secret properties не публікуються.
