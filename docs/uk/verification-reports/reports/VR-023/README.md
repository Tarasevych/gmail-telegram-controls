# VR-023 — Persistent app session після reload

[English](../../../../en/verification-reports/reports/VR-023/README.md)

- **Дата:** 2026-07-23
- **Загальний статус:** PARTIAL
- **Source request:** `REQ-0036`
- **Verification framework:** `REQ-0004`
- **Product task:** `B1-33` / P0 session continuity
- **Issue:** `GT-053`
- **Source commit:** `975785a`
- **Immutable candidate:** Apps Script v69
- **Release boundary:** v69 staged, перевірено й fail-closed abandoned; exact staging deployment видалено, journal terminal `abandoned`, owner menu production, active staging `0`, verified production v65 не змінено; OAuth і Gmail state не змінювалися

## Підтверджена першопричина

Сервер уже видавав шестигодинний bearer session і 24-годинний rotating app refresh family, але `MailApp.html` зберігав їх лише в JavaScript RAM. F5, hard reload або створення нового WebView знищували цей стан. Після цього клієнт повторно подавав одноразовий Telegram `initData` claim або launch nonce, який сервер уже спожив і видалив. Fail-closed replay protection працював правильно, але клієнт не мав окремого безпечного recovery route.

Gmail OAuth refresh зберігається й обробляється окремою multi-account моделлю та не є першопричиною цього дефекту.

## Старий і новий launch pipeline

**До виправлення:** reload → порожні `state.session` і `state.refreshToken` → повторний launch proof → replay/expired error → повторний connection screen.

**Source candidate:** reload → bounded Telegram `SecureStorage.getItem` → `mailboxRenewSession` → atomic refresh-family rotation → запис нового app refresh credential → звичайний mailbox bootstrap. Якщо secure credential відсутній або terminal-invalid, клієнт переходить до чинного fail-closed launch flow. Transient network failure не видаляє credential і не оголошується потребою OAuth.

**Фактичний native Desktop pipeline:** hard reload v69 → native prompt повторного надсилання форми → повторний POST Apps Script document → повторне використання вже спожитого Telegram launch proof → `UNTRUSTED_NONCE_REPLAY`. На перевіреному Windows Telegram Desktop `SecureStorage` не повернув usable recovery credential до обробки embedded launch error. Wrapper не зберіг platform error code, тому точна причина storage rejection не доведена.

## Native A/B та release disposition

1. Owner menu спочатку повернуто на production.
2. Два свіжі production v65 launches завантажили profile, avatar і mailbox.
3. Після одноразового переходу на staging перший v69 launch показав generic mail-operation error; bounded repeat завантажив mailbox приблизно за `20 s`. Це ручне спостереження, достатнє для спростування one-second SLO, але не формальний p95 benchmark.
4. Hard reload v69 відтворив POST-resubmission і `UNTRUSTED_NONCE_REPLAY`; новий OAuth consent не запускався.
5. Production promotion не виконано. Owner menu повернуто на production, v69 abandoned через exact journal-bound helper, staging видалено, active staging `0`.
6. Точний stage першої generic server error лишається `UNVERIFIED`: чинний protected CLI token не мав read scope Apps Script Processes, а нову authorization scope не запитували.

## Межі безпеки

1. У Telegram `SecureStorage` записується лише opaque app refresh credential; Gmail access/refresh tokens, Telegram `initData`, mail content і session bearer туди не потрапляють.
2. Bearer session лишається memory-only.
3. `getItem`, `setItem` і `removeItem` мають bounded `750 ms` wrapper; `restoreItem` автоматично не викликається, бо він може вимагати user confirmation.
4. Серверний `60 s` replay cache діє лише для exact old claims і лише доки чинні family/session відповідають результату rotation.
5. Explicit revoke або зміна family робить cached replay непридатним.
6. Діагностика містить лише reason code і counter без identifiers або credentials.

## Атомарні твердження

| ID | Твердження | Статус | Доказ |
|---|---|---|---|
| VR-023-01 | Hard reload втрачав RAM-only app refresh credential і змушував клієнт повторно використовувати one-time launch proof. | VERIFIED | source trace та RCA |
| VR-023-02 | Boot тепер виконує single-flight secure recovery перед обробкою embedded launch error або launch nonce. | VERIFIED | source/contract tests |
| VR-023-03 | Десять конкурентних renewal requests із тим самим refresh token отримують один exact rotation result у bounded replay window. | VERIFIED | behavioral test |
| VR-023-04 | Після завершення replay window старий refresh token відхиляється; explicit revoke також блокує replay. | VERIFIED | behavioral/source contract |
| VR-023-05 | Focused auth/session suites і повний Apps Script suite `561/561` проходять; diff clean; credential signatures `0`. | VERIFIED | local test/static traces |
| VR-023-06 | Telegram Desktop переживає hard reload без повторного connection screen або OAuth. | CONFLICTING | native v69 reload завершився form resubmission і `UNTRUSTED_NONCE_REPLAY`; OAuth не запускався |
| VR-023-07 | Два реальні паралельні native launches безпечно отримують одну rotation family без user-visible race. | UNVERIFIED | native concurrency acceptance ще не виконано |
| VR-023-08 | Production v65 лишилася робочим baseline, а v69 не була promoted після failed acceptance. | VERIFIED | два production launches, menu readback і release journal |
| VR-023-09 | Immutable v69 збережено історично, exact staging видалено, active staging `0`, journal terminal `abandoned`. | VERIFIED | release helper і повторний preflight |
| VR-023-10 | Перевірений Windows Desktop надав usable `SecureStorage` recovery credential. | CONFLICTING | native reload не відновив session; exact platform error code не збережено |
| VR-023-11 | Staging v69 відповідає warm-launch SLO `≤1000 ms`. | CONFLICTING | приблизно `20 s` у ручному native спостереженні; formal p95 ще не виміряно |

## Офіційні platform boundaries

- [Telegram Mini Apps](https://core.telegram.org/bots/webapps) описує `SecureStorage` як per-user/per-bot device storage для tokens та authentication state, із `getItem`, `setItem`, `removeItem` і максимум десятьма items. Це опис capability, а не гарантія підтримки кожним клієнтом.
- [Telegram low-level Mini App storage API](https://core.telegram.org/api/bots/webapps#secure-storage) окремо передбачає unsupported-platform result. Поточний wrapper має зберігати content-free error code, перш ніж можна буде точно класифікувати Windows Desktop result.
- [Apps Script HTML Service restrictions](https://developers.google.com/apps-script/guides/html/restrictions) підтверджують IFRAME sandbox deployment model.
- [Apps Script Content Service](https://developers.google.com/apps-script/guides/content) використовує redirect до одноразового `googleusercontent.com` URL; у підтвердженій чинній архітектурі немає документованого custom HttpOnly response-cookie contract, тому source fix не заявляє такий механізм.

Source correction локально VERIFIED, але v69 native acceptance не пройдено. Наступний contour має спочатку додати content-free storage telemetry і сформувати безпечний Desktop recovery architecture decision; незахищене зберігання credential у JavaScript storage не є допустимим виправленням.

## Follow-up source decision v70

- **Дата:** 2026-07-23
- **Статус:** PARTIAL
- v69 залишається незмінним історичним immutable evidence і не переписується.
- Локальний cumulative source v70 зберігає replay protection, додає content-free SecureStorage status, cross-document launch timing та fail-closed locked state без restart-loop.
- Локальні gates: P0 `113/113`, повний suite `567/567`, privacy scan `0`, чистий `git diff --check`.
- v70 ще не merged, не має immutable version або staging deployment; production v65 і active staging `0` незмінні.
- Native hard reload, exact SecureStorage result і one-second p95 залишаються `UNVERIFIED`; browser-level POST resubmission не оголошено виправленим.

## v70 staging boundary

- **Дата:** 2026-07-23
- **Статус:** PARTIAL
- Source v70 merged на `0666165`; guarded preflight пройшов, immutable v70 та один staging створено без зміни stable v65.
- Exact staging reference не публікується; він збережений у protected journal. Menu залишається production до опублікованого bridge і native acceptance.
- Локальні release gates: `572/572`, bridge `4/4`, syntax/whitespace pass.
- v69 evidence не переписано. v70 не promoted; native hard reload і SecureStorage behavior залишаються `UNVERIFIED`.

## Native A/B v70 і terminal disposition

- **Дата:** 2026-07-23
- **Статус:** PARTIAL / BLOCKED
- Опублікований owner-only bridge відкрив mailbox v70 без нового OAuth cycle або повторної повноекранної connection sequence. Були видимі avatar, три isolated Gmail roots і вже кешований thread.
- Контрольований switch до secondary Gmail root повернув generic mail-operation error. Retry-loop або consent flow не запускався.
- Menu повернуто на production, після чого fresh v65 launch повернув той самий generic error до завантаження mailbox. Apps Script зафіксував завершені `doPost`, `mailboxRedeemLaunch` і `mailboxRpc`.
- Сусідній execution `checkNewMail_` дав причинний shared-runtime evidence: content-free telemetry дійшла до `legacy_recovery`, потім впала з `errorCode=urlfetch_quota`; Apps Script повідомив про перевищення добової квоти сервісу `urlfetch`.
- Доказ не встановлює v70-specific regression. Він також не верифікує one-second SLO, hard-reload recovery, exact SecureStorage behavior або bidirectional account switching.
- Production promotion не виконано. Exact staging deployment v70 видалено journal-bound fail-closed helper, active staging `0`, owner menu production, immutable v70 збережено історично, journal v70 terminal `abandoned`.

| ID | Твердження | Статус | Доказ |
|---|---|---|---|
| VR-023-12 | v70 може відкрити native mailbox без нового OAuth cycle або дубльованого connection screen. | PARTIAL | один clean native staging launch; ten-launch p95 не виконано |
| VR-023-13 | Generic native mailbox failure є унікальним для v70. | CONFLICTING | той самий error виник у fresh production v65 launch |
| VR-023-14 | Під час A/B була активна shared Apps Script daily `urlfetch` quota block. | VERIFIED | execution trace з `legacy_recovery` і `errorCode=urlfetch_quota` |
| VR-023-15 | v70 залишено у safe terminal release state без зміни production. | VERIFIED | production menu readback, exact staging removal, journal `abandoned`, production v65 |
| VR-023-16 | v70 відповідає one-second warm-launch SLO і persistent offline Inbox requirement. | UNVERIFIED | formal p95/offline acceptance не виконано |
