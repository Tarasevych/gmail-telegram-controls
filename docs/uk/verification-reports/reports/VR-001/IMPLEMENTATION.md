# VR-001: реалізація і залежності

[Звіт](README.md) | [Усі claims](CLAIMS.md) | [English](../../../../en/verification-reports/reports/VR-001/IMPLEMENTATION.md)

Source request: `REQ-0004`. Claims: 95. `verified` 13, `contradicted` 7, `partial` 35, `unverified` 19, `blocked` 4, `recommendation` 17.

Сторінка показує claims з найсильнішим позитивним доказом, прямим спростуванням або блокером. Повний набір partial/unverified записів збережено в CLAIMS.

| Claim | Статус | Рівень | Твердження |
|---|---|---|---|
| [KH-DEP-001](CLAIMS.md#kh-dep-001) | `blocked` | `E2` | WCAG 2.2 є базовим рівнем; для когнітивної доступності потрібні також W3C COGA-настанови. |
| [KH-DEP-013](CLAIMS.md#kh-dep-013) | `verified` | `E2` | Gmail API потрібен для history, drafts/delayed send і attachments. |
| [KH-DEP-015](CLAIMS.md#kh-dep-015) | `verified` | `E2` | `PropertiesService`, `CacheService`, `LockService` потрібні для state, cache, refresh locking і continuation. |
| [KH-DEP-017](CLAIMS.md#kh-dep-017) | `contradicted` | `E2` | Для зовнішніх OAuth providers використовувати apps-script-oauth2 з Properties, Cache і Lock practices. |
| [KH-DEP-019](CLAIMS.md#kh-dep-019) | `verified` | `E2` | Для Google-to-Google flow передбачено manifest scopes і `ScriptApp.getOAuthToken()`. |
| [KH-ISS-016](CLAIMS.md#kh-iss-016) | `contradicted` | `E2` | Очікуваний risk: external URL без whitelist/validation. |
| [KH-ISS-017](CLAIMS.md#kh-iss-017) | `contradicted` | `E2` | Очікуваний risk: unescaped HTML або user-generated strings. |
| [KH-ISS-018](CLAIMS.md#kh-iss-018) | `contradicted` | `E2` | Очікуваний risk: весь task state в одному large JSON blob у `PropertiesService`. |
| [KH-ISS-019](CLAIMS.md#kh-iss-019) | `contradicted` | `E2` | Очікуваний risk: inbox labels як єдине source of truth. |
| [KH-ISS-021](CLAIMS.md#kh-iss-021) | `contradicted` | `E2` | Очікуваний risk: one-shot polling loop, який мовчки завершується через execution limit. |
| [KH-ISS-023](CLAIMS.md#kh-iss-023) | `contradicted` | `E2` | Очікуваний risk: webhook без replay protection. |
| [KH-PROD-008](CLAIMS.md#kh-prod-008) | `verified` | `E2` | `Resume Rail`: остання розмова, точка зупинки та автозбереження position/state/partial triage. |
| [KH-PROD-010](CLAIMS.md#kh-prod-010) | `verified` | `E2` | Використовувати тихі, безосудні нагадування та digest із невеликою кількістю найважливіших листів. |
| [KH-PROD-014](CLAIMS.md#kh-prod-014) | `verified` | `E2` | Надавати короткі, енерго-залежні шаблони відповіді та кероване відкладене надсилання без копіювання приватного вмісту. |
| [KH-PROD-015](CLAIMS.md#kh-prod-015) | `verified` | `E2` | Надати короткий co-processing/body-doubling режим, орієнтований на одну дію без дублювання приватного вмісту. |
| [KH-PROD-021](CLAIMS.md#kh-prod-021) | `blocked` | `E2` | Цільова концепція: пошта бере на себе частину виконавчої функції, зменшує шум, пояснює пріоритет, зберігає контекст і декомпонує роботу. |
| [KH-PROD-033](CLAIMS.md#kh-prod-033) | `verified` | `E2` | Apps Script/GmailApp/Gmail API дають low-code шлях для Google Workspace automation і прототипування. |
| [KH-PROD-038](CLAIMS.md#kh-prod-038) | `verified` | `E2` | Web app є Flow Layer для dashboard, backlog, rules, focus та energy modes. |
| [KH-PROD-041](CLAIMS.md#kh-prod-041) | `blocked` | `E2` | Мінімізувати cognitive load, decision fatigue, notification overwhelm і task paralysis. |
| [KH-PROD-043](CLAIMS.md#kh-prod-043) | `verified` | `E2` | Telegram Bot API є зовнішнім short-command і digest control surface. |
| [KH-PROD-045](CLAIMS.md#kh-prod-045) | `verified` | `E2` | Другий card level: три actions - quick reply, defer, convert to task. |
| [KH-PROD-046](CLAIMS.md#kh-prod-046) | `verified` | `E2` | Третій card level: collapsed metadata, thread details, attachments і labels. |
| [KH-PROD-048](CLAIMS.md#kh-prod-048) | `verified` | `E2` | MVP delayed send: створити draft, зберегти `draftId`, `sendAt`, `messageIntent`, а trigger або worker викликає send. |
| [KH-PROD-049](CLAIMS.md#kh-prod-049) | `blocked` | `E2` | Telegram має бути low-friction control plane, а не копією Gmail. |
