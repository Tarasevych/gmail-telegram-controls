# VR-001: тести, історія і релізний стан

[Звіт](README.md) | [Усі claims](CLAIMS.md) | [English](../../../../en/verification-reports/reports/VR-001/RELEASES.md)

Source request: `REQ-0004`. Claims: 36. `verified` 0, `contradicted` 2, `partial` 20, `unverified` 13, `blocked` 1, `recommendation` 0.

- Локальні тести: `399/399`, E3, без network/OAuth/runtime.
- Versie 1 target: [`2b3b9e2f678f`](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a).
- Release status: не promoted, tag/release branch відсутні, E4/E5 відсутні.
- Зміни runtime: не виконувалися.

| Claim | Статус | Рівень | Твердження |
|---|---|---|---|
| [KH-EVD-001](CLAIMS.md#kh-evd-001) | `unverified` | `E0` | [verified-in-report only] Gmail і Outlook мають окремі AI-функції, але не дають описаної цілісної нейроінклюзивної моделі. |
| [KH-EVD-002](CLAIMS.md#kh-evd-002) | `partial` | `E3` | Звіти пов'язують ADHD із труднощами виконавчих функцій і використовують це як підставу для декомпозиції та обмеження вибору. |
| [KH-EVD-003](CLAIMS.md#kh-evd-003) | `partial` | `E3` | Звіти описують неоднорідні труднощі сприйняття часу як підставу для часово-орієнтованого UI. |
| [KH-EVD-004](CLAIMS.md#kh-evd-004) | `partial` | `E3` | [verified-in-report only] Мотиваційно-винагородні моделі пояснюють перевагу близької негайної винагороди над відкладеною рутинною користю. |
| [KH-EVD-005](CLAIMS.md#kh-evd-005) | `unverified` | `E0` | [verified-in-report only] Депресивні симптоми можуть перетворювати інбокс на нагадування про невиконані зобов'язання. |
| [KH-EVD-006](CLAIMS.md#kh-evd-006) | `unverified` | `E0` | Звіти пов'язують коморбідність ADHD і депресії з посиленим виконавчим, мотиваційним та емоційним навантаженням. |
| [KH-EVD-007](CLAIMS.md#kh-evd-007) | `partial` | `E3` | [verified-in-report only] Нейровідмінні автори й користувачі описують `Inbox Functional` як практичнішу модель, ніж порожній інбокс. |
| [KH-EVD-008](CLAIMS.md#kh-evd-008) | `partial` | `E3` | Звіти описують batching і обмежені вікна перевірки як спосіб зменшити постійне реагування та стрес. |
| [KH-EVD-009](CLAIMS.md#kh-evd-009) | `partial` | `E3` | [verified-in-report only] `Send later` та редагований проміжок перед надсиланням описані як засоби зниження тривоги й perfectionism-driven avoidance. |
| [KH-EVD-010](CLAIMS.md#kh-evd-010) | `partial` | `E3` | [verified-in-report only] Body doubling, virtual co-working і легка присутність описані як практичний спосіб подолання бар'єра старту; email-specific evidence у звіті названо слабшим. |
| [KH-EVD-011](CLAIMS.md#kh-evd-011) | `unverified` | `E0` | [verified-in-report only] Gmail має `AI Overview` і нагадування про дедлайни. |
| [KH-EVD-012](CLAIMS.md#kh-evd-012) | `unverified` | `E0` | [verified-in-report only] Outlook/Copilot має summary з цитатами, аналіз вкладень, пріоритизацію, створення правил та automatic replies. |
| [KH-EVD-013](CLAIMS.md#kh-evd-013) | `unverified` | `E0` | Звіт пов’язує SMTP, IMAP, POP3, JMAP і JMAP over WebSocket з RFC 5321, 3501, 1939, 8620, 8621 і 8887. |
| [KH-EVD-014](CLAIMS.md#kh-evd-014) | `unverified` | `E0` | Звіт стверджує, що матеріали CNIL/Garante 2026 року встановлюють consent concerns для email tracking pixels. |
| [KH-EVD-015](CLAIMS.md#kh-evd-015) | `partial` | `E3` | Existing project core and v45 are the current working base. |
| [KH-EVD-016](CLAIMS.md#kh-evd-016) | `contradicted` | `E2` | Gmail add-ons use card UI; contextual triggers run for opened messages and are unconditional in the manifest. |
| [KH-EVD-017](CLAIMS.md#kh-evd-017) | `unverified` | `E0` | Dopaminergic systems are relevant, but a simple dopamine-deficit model is described as reductive. |
| [KH-EVD-018](CLAIMS.md#kh-evd-018) | `partial` | `E3` | Звіт посилається на W3C та дослідження як підставу для меншої кількості переривань, фокусу й скороченого контенту. |
| [KH-EVD-019](CLAIMS.md#kh-evd-019) | `partial` | `E3` | Звіт стверджує, що Gmail API підтримує drafts, send, attachment retrieval і raw message operations. |
| [KH-EVD-020](CLAIMS.md#kh-evd-020) | `partial` | `E3` | Telegram Bot API is HTTP-based and suitable for short-command control. |
| [KH-EVD-021](CLAIMS.md#kh-evd-021) | `partial` | `E3` | Звіт стверджує, що Gmail add-ons і restricted scopes мають мінімізаційні та verification requirements. |
| [KH-EVD-022](CLAIMS.md#kh-evd-022) | `unverified` | `E0` | `apps-script-oauth2` recommends Properties/Cache/Lock and warns about refresh races. |
| [KH-EVD-023](CLAIMS.md#kh-evd-023) | `partial` | `E2` | `clasp`, CodeQL, secret scanning and Dependabot are described as release/security controls. |
| [KH-EVD-024](CLAIMS.md#kh-evd-024) | `partial` | `E3` | Звіт описує Apps Script execution limits і потребу в continuation state або зовнішньому worker для довгих операцій. |
| [KH-EVD-025](CLAIMS.md#kh-evd-025) | `unverified` | `E0` | Codex documentation is cited in support of context/tool/environment-aware workflows. |
| [KH-EVD-026](CLAIMS.md#kh-evd-026) | `blocked` | `E0` | Public indexing of `github.com/[PRIVATE]/gmail-telegram-controls` could not be confirmed. |
| [KH-EVD-027](CLAIMS.md#kh-evd-027) | `partial` | `E3` | Gmail cards, `doGet`/`doPost`, Gmail API resources, `watch`, OAuth storage/locks and scope verification are cited as platform constraints. |
| [KH-EVD-028](CLAIMS.md#kh-evd-028) | `partial` | `E3` | The report attributes contextual UI to add-ons, richer UX to web apps, automation to Gmail API, event reliability to Pub/Sub/Cloud Run and state control to Properties/Cache/Lock. |
| [KH-EVD-029](CLAIMS.md#kh-evd-029) | `partial` | `E2` | Звіт описує clasp як open-source route для локальної directory-based розробки, versioning і deployment. |
| [KH-EVD-030](CLAIMS.md#kh-evd-030) | `partial` | `E3` | Gmail `watch()` uses Pub/Sub and `history.list`/`startHistoryId` for change synchronization. |
| [KH-HIS-001](CLAIMS.md#kh-his-001) | `unverified` | `E1` | Вбудовані маркери виду `turn...view/search` є технічними provenance-посиланнями, які потрібно окремо розв'язати під час міграції. |
| [KH-HIS-002](CLAIMS.md#kh-his-002) | `unverified` | `E0` | Не класифікувати EmailEngine як FOSS: звіт описує його як колишній open-source, нині source-available/commercial unified email layer. |
| [KH-HIS-003](CLAIMS.md#kh-his-003) | `unverified` | `E0` | Mailparser позначено maintenance mode/legacy choice; для нових проєктів рекомендовано PostalMime. |
| [KH-HIS-004](CLAIMS.md#kh-his-004) | `partial` | `E1` | Робота продовжується з наявного ядра в `[PRIVATE]`, а не з порожнього стану. |
| [KH-HIS-005](CLAIMS.md#kh-his-005) | `contradicted` | `E2` | `gmail-telegram-v45-gentle-milestones` визначено поточним базовим артефактом. |
| [KH-HIS-006](CLAIMS.md#kh-his-006) | `partial` | `E1` | `gmail-telegram-v44-co-processing`, `gmail-telegram-notifier` та інші release lines збережено як попередній досвід. |
