# VR-035 — F-01 Fidelity reader, RTL і remote-image privacy

Verification framework: REQ-0004

- **Статус:** `PARTIAL`
- **Дата:** 2026-07-23
- **Запит:** `REQ-0035`
- **Пов’язані записи:** `GT-063`, `B1-43`, `RCA-016`
- **English mirror:** [VR-035](../../../../en/verification-reports/reports/VR-035/README.md)

## Першопричина

Server sanitizer зберігав текст, bounded inline styles, tables і attachment-token images, але відкидав валідні `dir/lang`. Secondary client sanitizer видаляв active content, однак мав ширший резервний шлях для `https:` image і CSP `img-src https: data: blob:`. У штатному DTO remote image вже видалявся server-side, але незалежна defense-in-depth межа була неповною.

## Атомарні твердження

| Твердження | Категорія | Статус | Походження |
|---|---|---|---|
| Sanitizer зберігає лише `dir=ltr|rtl|auto` і bounded BCP47-подібний `lang` | Fidelity/security | `VERIFIED` | synthetic sanitizer corpus |
| Newsletter, invoice/table, RTL/Unicode, quote/signature і malformed HTML зберігають читабельний дозволений content без scripts/events | Fidelity | `VERIFIED` | focused F-01 corpus |
| Reader iframe видаляє кожне зображення без authenticated attachment token | Privacy | `VERIFIED` | executable source contract |
| CSP дозволяє mail images лише як short-lived `blob:` після exact-token і MIME validation | Security | `VERIFIED` | source contract та чинний CID hydration path |
| Plain fallback і sandboxed HTML використовують content-derived direction та logical quote styling | Accessibility | `VERIFIED` | focused source contract |
| MIME alternative/plain fallback, CID boundary, quoted-thread boundary та scroll/focus anchors лишаються закріпленими | Regression | `VERIFIED` | focused F-01 source contracts |
| Representative real mail fixtures пройшли Telegram Desktop/mobile visual acceptance | Runtime | `UNVERIFIED` | shared Apps Script URL Fetch quota; staging `0` |

## Перевірки

- Focused F-01 contracts: `6/6`.
- Повний Apps Script suite: `629/629`.
- Synthetic fixtures не містять реальних адрес, листів, токенів або identifiers.
- Production v65, staging `0`, immutable v70, Gmail, OAuth і Telegram runtime state не змінювалися.

## Висновок і межі

Source-level reader fidelity та independent remote-image boundary доказові. Загальний статус `PARTIAL`, бо native WebView rendering, dark/light visual comparison і owner-approved real fixture acceptance ще не виконано. Новий immutable candidate цим source-контуром не створювався.
