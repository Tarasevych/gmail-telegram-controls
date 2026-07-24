# VR-049 - V3 C-03 bounded scalable folder upload

Verification framework: REQ-0004

- **Статус:** `PARTIAL`
- **Дата:** 2026-07-24
- **Запит:** `REQ-0035`
- **Implementation baseline:** `a33242df9689f6d483825940632df3030663d1a6`
- **Пов’язані записи:** `GT-074`, `B1-54`, `RCA-030`
- **English mirror:** [VR-049](../../../../en/verification-reports/reports/VR-049/README.md)

## Межа

Звіт перевіряє лише V3 C-03 source contour у synthetic browser/Node harness. Реальні Gmail-листи, OAuth, Telegram runtime, Apps Script deployment, staging і production не змінювалися. Source tests доводять bounded planning та UI contracts, але не native picker/WebView acceptance.

## Підтверджена першопричина

Попередній native directory scan зупиняв рекурсію після current attachment-count limit, тоді як fallback `webkitdirectory` передавав повний selection до поелементного `addOutgoingFiles`. Admission перевіряв кожен файл окремо, тому не існувало одного snapshot із recursive paths, aggregate bytes, exact duplicates, rejected entries і whole-batch gate. Великий selection міг виглядати обрізаним або частково прийнятим без повного пояснення.

## Реалізований source contour

- Обидва picker paths передають selection до одного `planComposeUploadSelection`.
- Scan bounded до `1000` entries; overflow/truncation показується явно.
- Relative paths нормалізуються; traversal, absolute/service, hidden, empty та exact-duplicate entries fail closed.
- Однакові basenames у різних папках зберігаються як окремі path-aware entries і позначаються для користувача.
- Count та aggregate-byte gates перевіряються до створення attachment jobs і FileReader work.
- Після aggregate failure не стартує частковий upload; UI пропонує чинний Drive path.
- Progressive batch card початково розкриває невеликі selection, показує до `40` додаткових rows за крок і має total/status, per-file retry/cancel та cancel-all.
- Accepted entries використовують existing bounded transfer manager; окремий паралельний scheduler не створювався.

## Source evidence

| Claim | Результат | Статус |
|---|---:|---|
| Focused folder-upload contracts | `9/9` | `VERIFIED` у source scope |
| Mail App contract | `93/93` | `VERIFIED` у source scope |
| Повний Apps Script suite | `716/716` за `25.980s` | `VERIFIED` у source scope |
| `1/10/100/1000`, overflow, empty, nested Unicode, duplicate та unsafe-path fixtures | пройдено | `VERIFIED` у synthetic scope |
| Progressive/a11y controls і bounded visible rows | присутні | `VERIFIED` у source scope |
| Exact implementation baseline | `a33242df9689f6d483825940632df3030663d1a6` | зафіксовано |
| Реальна Gmail/OAuth/Telegram/runtime mutation | немає | не виконувалася |

## Чесні обмеження

- Current application attachment policy не приймає `100/1000` файлів як звичайні Gmail attachments; контур чесно блокує selection до читання й пропонує Drive.
- `showDirectoryPicker()` і `webkitdirectory` мають різну platform support; native Telegram WebView/mobile/desktop acceptance не виконувалася.
- Folder selection не гарантує доступ до прихованих або platform-service entries; такі entries fail closed, якщо їх повертає browser.
- Візуальна перевірка scrolling, focus та touch targets на target devices ще потрібна.
- Shared Apps Script URL Fetch quota та `T-03` лишають release gate `BLOCKED`.
- Staging або production acceptance не заявляється.

## Первинні джерела

- [File System Access: `showDirectoryPicker`](https://wicg.github.io/file-system-access/#api-showdirectorypicker)
- [File and Directory Entries API: `webkitdirectory`](https://wicg.github.io/entries-api/#dom-htmlinputelement-webkitdirectory)
- [File and Directory Entries API: relative paths](https://wicg.github.io/entries-api/#dom-file-webkitrelativepath)
