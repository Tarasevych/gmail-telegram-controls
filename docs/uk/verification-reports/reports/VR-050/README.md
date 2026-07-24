# VR-050 - V3 C-04 rich compose editing і recipient layout

Verification framework: REQ-0004

- **Статус:** `PARTIAL`
- **Дата:** 2026-07-24
- **Запит:** `REQ-0035`
- **Implementation baseline:** `f790897e8dec4a83e8ab8c7114618109b99b436a`
- **Пов’язані записи:** `GT-075`, `B1-55`, `RCA-031`
- **English mirror:** [VR-050](../../../../en/verification-reports/reports/VR-050/README.md)

## Межа

Звіт перевіряє лише V3 C-04 source contour у synthetic Node/browser-contract harness. Реальні Gmail-чернетки, OAuth, Telegram runtime, Apps Script deployment, staging і production не змінювалися. Source tests доводять state/DOM contracts, але не native Telegram WebView rendering.

## Підтверджена першопричина

Compose уже мав canonical rich HTML/plain fallback, selection bookmarks, undo/redo, formatting commands, table row/column mutations, internal editor scroll, autosave та minimize/recovery. Проте recipients лишалися raw text inputs без token identity; clipboard HTML завжди відкидався на користь plain text; advanced formatting завжди займало ту саму toolbar strip. Table accessibility coordinates не відновлювалися після sanitize/rerender, keyboard cell traversal і whole-table delete були відсутні.

## Реалізований source contour

- `To/CC/BCC` використовують один UI adapter поверх чинних string draft fields; backend/RPC contract не змінено.
- Tokenizer підтримує quoted display names, comma/semicolon/newline boundaries, Unicode labels, dedupe за email та максимум `200` entries.
- Invalid pending address лишається видимою з `aria-invalid`; chip removal має explicit accessible name.
- Input і chip controls підтримують Enter/Tab/separators, Backspace/Delete, ArrowLeft/ArrowRight та Escape.
- Recipient area і compose fields мають bounded internal scroll, тому довгі lists не виштовхують editor/footer.
- Rich clipboard HTML проходить `sanitizeComposeHtml`; raw HTML ніколи не присвоюється DOM, remote/unsafe images лишаються заблокованими.
- Primary toolbar містить часті actions; secondary controls відкриваються explicit `Ще` і закриваються Escape.
- Existing selection bookmark/range, autosave history та minimize/recovery model збережено.
- Table semantics регенерують role, row/column counts і coordinate labels після insertion, mutation та sanitized rerender.
- Tab/Shift+Tab переходить між наявними cells; whole-table delete повертає caret у безпечний paragraph.

## Source evidence

| Claim | Результат | Статус |
|---|---:|---|
| Focused C-04 contracts | `5/5` | `VERIFIED` у source scope |
| Affected compose/autosave/transfer matrix | `116/116` | `VERIFIED` у source scope |
| MailClient suite | `153/153` | `VERIFIED` у source scope |
| Повний Apps Script suite | `721/721` за `25.457s` | `VERIFIED` у source scope |
| Quoted/Unicode/invalid і `100`-recipient fixtures | пройдено | `VERIFIED` у synthetic scope |
| Unsafe paste, progressive toolbar і table keyboard/delete contracts | пройдено | `VERIFIED` у source scope |
| Exact implementation baseline | `f790897e8dec4a83e8ab8c7114618109b99b436a` | зафіксовано |
| Реальна Gmail/OAuth/Telegram/runtime mutation | немає | не виконувалася |

## Чесні обмеження

- Browser inventory був доступний, але automation bindings не повернули command contract; visual screenshots або interaction claims не вигадувалися.
- Native Telegram Desktop/mobile, keyboard-open layout, real screen reader і touch interaction не перевірялися.
- `200` entries є client safety bound, а не обіцянка, що Gmail прийме будь-яку кількість адрес.
- Email validator навмисно fail closed для нестандартних RFC forms, які не можна безпечно представити як простий chip; server validation залишається authoritative.
- Real controlled Gmail draft roundtrip, staging і production acceptance ще потрібні.
- Shared Apps Script URL Fetch quota та `T-03` лишають release gate `BLOCKED`.

## Первинні джерела

- [HTML Standard: contenteditable](https://html.spec.whatwg.org/multipage/interaction.html#contenteditable)
- [Clipboard API and events](https://www.w3.org/TR/clipboard-apis/)
- [WAI-ARIA Authoring Practices: toolbar](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/)
- [WAI-ARIA Authoring Practices: grid](https://www.w3.org/WAI/ARIA/apg/patterns/grid/)
