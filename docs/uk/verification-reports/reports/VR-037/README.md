# VR-037 — F-03 Computed typography та регресія вузьких account labels

Verification framework: REQ-0004

- **Статус:** `PARTIAL`
- **Дата:** 2026-07-23
- **Запит:** `REQ-0035`
- **Пов’язані записи:** `GT-032`, `B1-25`, `RCA-018`
- **English mirror:** [VR-037](../../../../en/verification-reports/reports/VR-037/README.md)

## Межа та метод

Контур використовував cumulative Versie 1 source на exact accepted F-02 baseline і локальний synthetic preview. Він зчитав rendered DOM geometry та computed CSS на desktop і mobile viewport 390 px, візуально перевірив screenshots і виконав synthetic Ukrainian/English/Arabic compose sample. Жодного Gmail-листа чи мітки не відкрито й не змінено; OAuth не запускався; Telegram runtime state не змінювався; staging не створювався; account identifiers не публікувалися. Screenshots лишаються owner-private, бо preview показує account identifiers; цей публічний звіт містить лише content-free measurements.

## Першопричина

Початкове Gmail-compatible typography-виправлення скорегувало primary list і reader scale, але не охопило late legacy selectors. Computed styles усе ще повертали 10 px для compose account/save status і 11 px для settings metadata, account controls та identity details. Account-card names і addresses зберігали `nowrap` разом із hidden overflow на вузькому viewport. Це selector-coverage regression, а не відсутність root font variable чи blanket-bold rule.

## Computed evidence до виправлення

| Surface | Desktop/mobile readback | Статус |
|---|---|---|
| Body/app shell | 14 px, weight 400, line height близько 20 px | `VERIFIED` |
| Compose editor | 14 px, weight 400, line height 21 px, local reading stack | `VERIFIED` |
| Compose account | 10 px, line height близько 14.3 px | `VERIFIED` defect |
| Compose save status | 10 px, line height 12.5 px | `VERIFIED` defect |
| Settings metadata | 11 px, line height близько 15.4–15.95 px | `VERIFIED` defect |
| Account controls/details | 11 px; narrow identity rows використовували hidden nowrap overflow | `VERIFIED` defect |
| Remote font dependency | відсутня | `VERIFIED` |
| Blanket bold | відсутній; body 400, звичайна navigation 500, headings scoped | `VERIFIED` |

Toolbar навмисно використовує bounded horizontal scrolling для optional formatting controls; цей стан не класифікується як clipped text. Narrow topbar email має чинне explicit full-address disclosure і не є account-card дефектом, виправленим тут.

## Source correction

- Compose account і save status використовують secondary scale 12 px/16 px.
- Settings notes та metadata використовують 12 px/18 px.
- Account details, status і compact controls використовують 12 px/16 px.
- Account names і addresses можуть переноситися через `overflow-wrap:anywhere`; hidden nowrap clipping прибрано.
- Reading і compose rhythm 14 px/1.5 не змінено.
- Local-first UI/text stacks не змінено, external font request не додано.
- Header flex children отримали `min-width:0`, тому більша metadata може стискатися чи переноситися без horizontal page overflow.

## Атомарні твердження

| Твердження | Категорія | Статус | Походження |
|---|---|---|---|
| Late cascade більше не лишає compose metadata на 10 px | Typography | `VERIFIED` | executable source contract і computed-style correction |
| Settings/account secondary text має мінімальну source scale 12 px | Typography | `VERIFIED` | executable source contract |
| Narrow account names і addresses переносяться замість hidden nowrap clipping | Responsive UX | `VERIFIED` | source contract; mobile computed-style recheck |
| Synthetic Ukrainian, English та Arabic text лишається видимим у compose editor | Glyph coverage | `VERIFIED` | local mobile visual inspection |
| Production відтворює corrected cascade в однаковому browser scale з Gmail | Runtime | `UNVERIFIED` | staging/production у цьому контурі не змінювалися |
| Populated real-message list і reader не мають downstream typography regression | Runtime | `UNVERIFIED` | fail-closed synthetic account mismatch не дозволив безпечний populated fixture |
| Native browser zoom behavior прийнято | Accessibility | `UNVERIFIED` | browser-control binding надав viewport override, але не browser-zoom control |

## Перевірки та безпека

- Focused typography contract і повний Apps Script suite мають пройти перед публікацією.
- Desktop, mobile 390 px і effective narrow responsive viewport перевіряються на page overflow та clipped visible text.
- Synthetic screenshots візуально перевірено, але не закомічено через account identifiers.
- Production v65, staging `0`, immutable history, Gmail, OAuth і Telegram runtime state не змінюються.

## Висновок

Source-level F-03 regression виправлено й локально підтверджено. Загальний статус лишається `PARTIAL` до current-production same-scale comparison, populated real-thread/list acceptance та native zoom evidence після зняття shared release blocker. Цей контур не створює immutable candidate.
