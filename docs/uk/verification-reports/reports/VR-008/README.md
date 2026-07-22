# VR-008 — Factual verification динамічного активного поштового контексту

[English mirror](../../../../en/verification-reports/reports/VR-008/README.md)

- **Дата:** 2026-07-22
- **Verification framework:** REQ-0004
- **Продукт:** Versie 1
- **Запит:** `REQ-0032`
- **Проблема:** [GT-031](../../../ISSUES.md)
- **Roadmap:** B1-24
- **Загальний статус:** PARTIAL

## Межа й метод

Звіт містить sanitized source evidence без реальних Gmail-адрес, листів, OAuth/session data, deployment identifiers або secret properties. Перевірено чинний bootstrap, client state, account switch і shared-preference paths. OAuth, Gmail permissions, склад shared view та production runtime не змінювалися.

## Атомарні твердження

| ID | Категорія | Актуальність | Статус | Залежності | Конфлікти | Чутливість | Точне походження |
|---|---|---|---|---|---|---|---|
| DMC-A01 | Architecture | current | VERIFIED | multi-account bootstrap | none | public | Сервер уже повертає opaque connection ID, name, email, avatar URL і current marker; клієнт уже зберігає accounts, active account, unified IDs та unified mode |
| DMC-A02 | Root cause | current | VERIFIED | MailApp source | none | public | Document title, visible heading, initial account і normalization fallbacks містили статичну owner identity |
| DMC-A03 | State isolation | candidate | VERIFIED | DMC-A01 | none | public | Новий view-model вибирає active identity за connection ID і фільтрує shared participants за наявними IDs; ім’я й avatar не є ключами |
| DMC-A04 | Localization | candidate | PARTIAL | Ukrainian profile name | arbitrary non-name display labels | public | Павло -> Павла та Ольга -> Ольги підтримані; невпевнені або нелатинізовані labels використовують безпечне `Пошта · <ім’я>` замість вигаданого відмінка |
| DMC-A05 | Accessibility | candidate | VERIFIED | browser rendering | none | public | Desktop і mobile `390x760` підтвердили single/shared headers, повні адреси, keyboard-open mapping і відсутність horizontal overflow; mapping лишається в межах viewport |
| DMC-A06 | Synchronization | candidate | VERIFIED | existing render paths | none | public | Bootstrap, switch і shared-preference updates проходять через existing `renderAccountPanel()`/`initializeFromBootstrap()` без reload |
| DMC-A07 | Local tests | candidate | VERIFIED | local execution | PR CI pending | public | Цільовий contract пройшов `88/88`, повний non-release suite — `443/443`; checks відповідного PR лишаються окремим publication gate |
| DMC-A08 | Release | current | BLOCKED | GT-030 | source differs from immutable v57/v59 | public | Production лишається v57; immutable v60, staging і promotion не виконувалися |

## Висновок

Source candidate виправляє статичну ідентифікацію як presentation defect, використовуючи чинне account state source. Він не створює паралельного стану та не змінює доступ до Gmail. Local automation і responsive visual evidence VERIFIED; загальний статус лишається PARTIAL через невиконаний live bounded staging/production acceptance та відкритий GT-030.

## Джерела

- [Issues](../../../ISSUES.md)
- [Roadmap](../../../ROADMAP.md)
- [Current state](../../../CURRENT_STATE.md)
- [English mirror](../../../../en/verification-reports/reports/VR-008/README.md)
