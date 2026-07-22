# VR-005 — Factual verification керування Gmail-мітками

[English mirror](../../../../en/verification-reports/reports/VR-005/README.md)

- **Дата:** 2026-07-22
- **Методика verification:** REQ-0004
- **Продукт:** Versie 1
- **Запит:** [REQ-0026](https://github.com/Tarasevych/gmail-telegram-controls/blob/%D0%97%D0%B0%D0%BF%D0%B8%D1%82%D0%B8/requests/2026-07-22/REQ-0026-unified-gmail-label-management.md)
- **Проблема:** [GT-026](../../../ISSUES.md)
- **Roadmap:** B1-20
- **Кодовий доказ:** [4ac0b90fbdbe7c9032789da1734bb986795fab91](https://github.com/Tarasevych/gmail-telegram-controls/commit/4ac0b90fbdbe7c9032789da1734bb986795fab91)
- **Загальний статус:** PARTIAL

## Атомарні твердження

| Твердження | Категорія | Статус | Походження / доказ | Залежності або конфлікти | Чутливість |
|---|---|---|---|---|---|
| Gmail label має тип `SYSTEM` або `USER`; SYSTEM labels не можна створювати, змінювати чи видаляти через довільне label management. | API | VERIFIED | [Gmail API label guide](https://developers.google.com/workspace/gmail/api/guides/labels), [`users.labels` resource](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.labels) | Немає | Public |
| Gmail API label resource не має поля `parent`; вкладеність у цьому проєкті подається нормалізованою повною назвою `Батьківська/Дочірня`. | API | VERIFIED | [`users.labels` resource](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.labels), [Gmail Help](https://support.google.com/mail/answer/118708) | UI Gmail підтримує nested labels; окремий parent API відсутній | Public |
| REST resource документує максимум 10 000 labels, тоді як Gmail Help для UI вказує максимум 5 000; продукт не hard-code жодну з цих меж. | Capacity | CONFLICTING | [`users.labels` resource](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.labels), [Gmail Help](https://support.google.com/mail/answer/118708) | Потрібно покладатися на відповідь Gmail API, а не локальну константу | Public |
| Production baseline мав кілька постійних дій у вузькому profile grid і не мав create/manage controls у sidebar. | UI baseline | VERIFIED | Mutation-free visual inspection перед змінами | Живі labels або листи не змінювалися | Owner-only runtime |
| Обидві label surfaces тепер використовують `renderGmailLabelSurfaces()` і відкидають late response іншого Gmail connection. | State / isolation | VERIFIED | [MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/4ac0b90fbdbe7c9032789da1734bb986795fab91/apps-script/MailApp.html), automated contracts | Потребує production deployment для live proof | Public source |
| Create/rename нормалізують full-path; delete зберігає owner/admin, expected-version і exact-confirmation guards; provider 403 стає content-free permission error. | Backend | VERIFIED | [MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/4ac0b90fbdbe7c9032789da1734bb986795fab91/apps-script/MailClient.gs), [tests](https://github.com/Tarasevych/gmail-telegram-controls/blob/4ac0b90fbdbe7c9032789da1734bb986795fab91/apps-script/tests/mail_client.test.js) | Gmail API permissions мають залишатися чинними | Public source |
| 48 synthetic labels на 390×760 і 1280×820 мають bounded scroll, окремі 38 px actions та не перекривають кнопки або сусідні рядки. | Visual acceptance | VERIFIED | Playwright + system Chrome, content-free stress fixture | Знімки з runtime identifiers не публікувалися | Local evidence |
| Кандидат готовий до нового immutable release. | Release | BLOCKED | Full suite `447/448`; exact v57 source-hash gate коректно відхиляє змінений bundle | Потрібна окрема owner authorization | Public summary |
| Поведінка працює у production. | Production | UNVERIFIED | Deployment не виконувався | Потрібні staging і production acceptance | Owner-only runtime |

## Першопричина

1. Profile manager використовував action-heavy grid, який залишав надто мало ширини довгим назвам.
2. Sidebar рендерив лише навігацію і не мав create/manage affordances.
3. Sidebar та profile manager використовували різні state slices, тому atomic refresh не був гарантований.
4. Під час acceptance знайдено два додаткові дефекти: click кнопки `+` спливав до глобального close-handler, а constrained CSS Grid стискав implicit rows до 44 px, дозволяючи багаторядковому тексту виходити в сусідні рядки.

## Реалізована поведінка

- Один shared renderer синхронно оновлює sidebar і profile manager.
- `+` відкриває create form; кожна USER label має одну доступну pencil-action з `aria-label` і `aria-controls`.
- Другорядні rename/delete actions розкриваються поступово; delete пояснює, що листи не видаляються.
- SYSTEM labels візуально відокремлені та не отримують заборонених controls.
- Full-path names переносяться, мають title, bounded vertical scroll і не використовують marquee/мерехтіння.
- Loading, empty, success, permission error та retry states є inline; account switch скидає transient label UI state.

## Перевірки

- `node --test apps-script/tests/mail_app_contract.test.js`: VERIFIED, `84/84` після остаточного UI-fix.
- `node --test apps-script/tests/*.test.js`: PARTIAL, `447/448`; єдина помилка — очікуваний immutable v57 hash mismatch.
- `git diff --check`: VERIFIED; лише інформаційні Windows CRLF warnings.
- Responsive visual acceptance: VERIFIED на 390×760 і 1280×820, 48 labels, horizontal overlap `false`, vertical overlap `false`, bounded scroll `true`, focus на create input `true`.
- Build/lint: UNVERIFIED як окремі команди, бо repository не має root або `apps-script/package.json`; синтаксис inline scripts перевірений у Node suite.

## Межа релізу й залишкові ризики

- Immutable v57 не переписувався.
- Новий immutable candidate, staging deployment, production promotion та live label mutations не виконувалися: REQ-0026 має `Next Versie authorization: no`.
- Залишковий блокер один: окремий явний owner authorization на наступний cumulative immutable candidate і контрольований staging/rollback gate.
- Документовані межі кількості labels CONFLICTING (10 000 у REST resource проти 5 000 у Gmail Help), тому локальний capacity limit не запроваджено.
- До production proof статус GT-026 залишається PARTIAL, а production claim — UNVERIFIED.
