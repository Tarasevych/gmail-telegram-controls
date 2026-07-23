# VR-018 — Точна ідентичність Telegram-вкладень

[English](../../../../en/verification-reports/reports/VR-018/README.md)

- **Дата:** 2026-07-23
- **Загальний статус:** PARTIAL
- **Source request:** `REQ-0035`
- **Verification framework:** `REQ-0004`
- **Product task:** `B1-28` / V3 `B-01`
- **Issue:** `GT-048`
- **Release boundary:** Apps Script production/HEAD v65, staging `0`; immutable v68 historical; correction commit `f2c00d3` не deployed

## Першопричина

Telegram callback містив порядковий номер вкладення з одного читання MIME. Під час наступного читання той самий номер не був стабільною ідентичністю: порядок частин міг змінитися, а однакові назви не усували неоднозначність. Отже historical callback міг вибрати інше вкладення.

## Source correction

- Нові картки кодують короткий opaque token, обчислений зі стабільних MIME/Gmail атрибутів: `partId`, attachment/inline-data identity, content metadata, name, type і size.
- Raw Gmail attachment ID не потрапляє в Telegram callback.
- Після натискання сервер повторно читає Gmail message у правильному connection context і вимагає рівно один exact match.
- Нуль збігів або більше одного збігу завершуються fail closed без надсилання випадкового файла.
- Historical `mail.att:` і `a2.` callbacks продовжують використовувати legacy ordinal path, щоб старі картки не зламалися.
- Immutable v68 helper і його hashes не змінено. Його regression test перевіряє історичні pinned hashes, а не вимагає, щоб mutable HEAD назавжди дорівнював v68.

## Атомарні твердження

| ID | Твердження | Статус | Доказ |
|---|---|---|---|
| VR-018-01 | Ordinal callback не є стабільною ідентичністю Gmail-вкладення. | VERIFIED | source inspection та reorder regression |
| VR-018-02 | Нові callbacks містять opaque exact token і не містять raw attachment ID. | VERIFIED | unit contract |
| VR-018-03 | Reorder, duplicate names, Unicode inline data і zero-byte attachments знаходять правильний exact item. | VERIFIED | `mail_actions.test.js` |
| VR-018-04 | Відсутній або неоднозначний exact match не надсилає вкладення. | VERIFIED | fail-closed regression |
| VR-018-05 | Historical ordinal callbacks залишаються parse-compatible. | VERIFIED | legacy `a2.` regression |
| VR-018-06 | Source correction не регресує Apps Script contracts. | VERIFIED | targeted `154/154`; cumulative `532/532` |
| VR-018-07 | Added source не містить credential material. | VERIFIED | added-lines secret-pattern matches `0` |
| VR-018-08 | Native Telegram owner отримує правильний файл після зміни порядку вкладень. | UNVERIFIED | staging/native download не виконувалися |
| VR-018-09 | Correction активна у production. | UNVERIFIED | production/HEAD лишається v65; promotion не виконувався |

## Release decision

Source correction готова для normal PR та required CI. Новий immutable candidate не створювався: чинна owner authorization не дозволяє прихований release contour, а native download acceptance ще відсутній. До такого acceptance `GT-048` і `B1-28` залишаються `PARTIAL`.
