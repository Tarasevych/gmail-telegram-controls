# VR-023 — Persistent app session після reload

[English](../../../../en/verification-reports/reports/VR-023/README.md)

- **Дата:** 2026-07-23
- **Загальний статус:** PARTIAL
- **Source request:** `REQ-0036`
- **Verification framework:** `REQ-0004`
- **Product task:** `B1-33` / P0 session continuity
- **Issue:** `GT-053`
- **Source commit:** `975785a`
- **Release boundary:** source-only; immutable, staging, production, OAuth, Gmail або Telegram mutation не виконувалися

## Підтверджена першопричина

Сервер уже видавав шестигодинний bearer session і 24-годинний rotating app refresh family, але `MailApp.html` зберігав їх лише в JavaScript RAM. F5, hard reload або створення нового WebView знищували цей стан. Після цього клієнт повторно подавав одноразовий Telegram `initData` claim або launch nonce, який сервер уже спожив і видалив. Fail-closed replay protection працював правильно, але клієнт не мав окремого безпечного recovery route.

Gmail OAuth refresh зберігається й обробляється окремою multi-account моделлю та не є першопричиною цього дефекту.

## Старий і новий launch pipeline

**До виправлення:** reload → порожні `state.session` і `state.refreshToken` → повторний launch proof → replay/expired error → повторний connection screen.

**Після виправлення:** reload → bounded Telegram `SecureStorage.getItem` → `mailboxRenewSession` → atomic refresh-family rotation → запис нового app refresh credential → звичайний mailbox bootstrap. Якщо secure credential відсутній або terminal-invalid, клієнт переходить до чинного fail-closed launch flow. Transient network failure не видаляє credential і не оголошується потребою OAuth.

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
| VR-023-06 | Telegram Desktop/mobile переживає F5/WebView reopen без повторного connection screen або OAuth. | UNVERIFIED | native acceptance ще не виконано |
| VR-023-07 | Два реальні паралельні native launches безпечно отримують одну rotation family без user-visible race. | UNVERIFIED | native concurrency acceptance ще не виконано |

## Офіційні platform boundaries

- [Telegram Mini Apps](https://core.telegram.org/bots/webapps) описує `SecureStorage` як per-user/per-bot device storage для tokens та authentication state, із `getItem`, `setItem`, `removeItem` і максимум десятьма items.
- [Apps Script HTML Service restrictions](https://developers.google.com/apps-script/guides/html/restrictions) підтверджують IFRAME sandbox deployment model.
- [Apps Script Content Service](https://developers.google.com/apps-script/guides/content) використовує redirect до одноразового `googleusercontent.com` URL; у підтвердженій чинній архітектурі немає документованого custom HttpOnly response-cookie contract, тому source fix не заявляє такий механізм.

Source correction готовий до контрольованого staging contour, але native behavior і deployment не позначаються VERIFIED без authenticated readback.
