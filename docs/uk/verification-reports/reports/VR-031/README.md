# VR-031 — Smart, safe URL resolver

Verification framework: REQ-0004

- **Статус:** `PARTIAL`
- **Дата:** 2026-07-23
- **Запит:** `REQ-0035`
- **Пов’язані записи:** `GT-060`, `B1-40`, `RCA-013`
- **English mirror:** [VR-031](../../../../en/verification-reports/reports/VR-031/README.md)

## Атомарні твердження

| Твердження | Категорія | Статус | Походження |
|---|---|---|---|
| Direct public HTTPS file і signed query URL проходять нормалізацію без втрати query та мають bounded metadata/content checks | Реалізація | `VERIFIED` | `apps-script/MailClient.gs`; synthetic behavioral tests |
| Google `/imgres?imgurl=` і `/url?url=` обробляються лише як explicit single-target wrappers; wrapper HTML не завантажується як вкладення | Реалізація | `VERIFIED` | `apps-script/MailClient.gs`; synthetic wrapper tests |
| Google Search/Images result page класифікується як ambiguous і спрямовується до link mode або копіювання прямої адреси без fetch її HTML | UX/безпека | `VERIFIED` | `apps-script/MailClient.gs`, `apps-script/MailApp.html`; synthetic tests |
| Redirects 301/302/303/307/308 виконуються вручну з повторною URL/DNS перевіркою, bounded count та identity loop guard | Безпека | `VERIFIED` | `apps-script/MailClient.gs`; [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html) |
| Metadata зберігає origin URL, resolved URL/classification, filename, MIME, size і licensing warning | Дані/UX | `VERIFIED` | source contract та client normalization |
| Apps Script дозволяє вимкнути automatic redirects і має URL limit до 2,082 символів; квоти URL Fetch залишаються зовнішньою межею | Платформа | `VERIFIED` | [UrlFetchApp](https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app), [Apps Script quotas](https://developers.google.com/apps-script/guides/services/quotas) |
| DNS precheck повністю усуває DNS rebinding між перевіркою і фактичним UrlFetch resolution | Безпека | `UNVERIFIED` | Це не доведено; [OWASP SSRF guidance](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html) описує цю TOCTOU-межу |
| Native transfer progress і реальна мережна поведінка на deployment прийняті власником | Runtime | `UNVERIFIED` | Live URL fetch, staging і production не запускалися |

## Перевірки

- Focused resolver/transfer contracts: `8/8`.
- Повний Apps Script suite: `616/616`.
- Bilingual docs, knowledge hub, verification reports, release-state та `git diff --check`: мають пройти до публікації.
- У тестах використані лише synthetic HTTPS responses; реальні URL, Gmail, Telegram і OAuth не змінювалися.

## Межі

- Статус `PARTIAL`: source contract перевірений, але DNS-to-fetch pinning недоступний у чинному `UrlFetchApp` contract і native acceptance відсутній.
- Ordinary webpage повертає precise `SOURCE_NOT_DOWNLOADABLE`; 401/403 — `SOURCE_FORBIDDEN`; private/local/unsafe URL блокуються до content use.
- Користувацький URL не потрапляє до transfer label/ID або публічної документації.
