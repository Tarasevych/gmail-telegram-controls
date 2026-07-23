# VR-026 — Події viewport Telegram Mini App

- **Статус:** PARTIAL
- **Дата:** 2026-07-23
- **Source request:** `REQ-0035`
- **Verification framework:** `REQ-0004`
- **Product task:** `B1-35`
- **Problem:** `GT-055`
- **English mirror:** [English report](../../../../en/verification-reports/reports/VR-026/README.md)

## Атомарне твердження

Чинний клієнт викликав `Telegram.WebApp.expand()`, але не підписувався на `viewportChanged`, `safeAreaChanged` або `contentSafeAreaChanged` і визначав висоту app shell лише через CSS viewport units. Це залишало layout без явної реакції на зміну висоти Telegram WebView, клавіатуру та safe-area.

## Реалізація

Додано один ідемпотентний viewport bridge. Він:

- підписується на Telegram viewport і safe-area events лише один раз;
- об’єднує повторні події в один animation frame;
- оновлює live viewport height під час руху;
- змінює stable layout height лише після стабільної події;
- використовує офіційні Telegram CSS variables як початковий fallback;
- не запускає `boot`, render, RPC, reload, OAuth або Gmail mutation.

## Доказ

Контрактний тест виконує bridge у VM, перевіряє unstable/stable transitions, один набір event subscriptions і відсутність relaunch/RPC/reload у цьому контурі. Повний Apps Script suite та документаційні gates є обов’язковими перед публікацією коміту.

## Межа перевірки

Source implementation і автоматизований контракт можуть бути перевірені локально. Native Telegram Desktop/mobile acceptance для клавіатури, resize, safe-area і різних viewport heights лишається `UNVERIFIED`; тому загальний статус `PARTIAL`. Production v65, staging, меню, OAuth і Gmail не змінюються цим інкрементом.

## Первинне джерело

[Telegram Mini Apps documentation](https://core.telegram.org/bots/webapps) визначає `viewportHeight`, `viewportStableHeight`, відповідні CSS variables та `viewportChanged`.
