# VR-039 — F-05 Чесний і стабільний reading progress

Verification framework: REQ-0004

- **Статус:** `PARTIAL`
- **Дата:** 2026-07-23
- **Запит:** `REQ-0035`
- **Пов’язані записи:** `GT-050`, `B1-30`, `RCA-020`
- **English mirror:** [VR-039](../../../../en/verification-reports/reports/VR-039/README.md)

## Межа

Цей source-only contour розширює cumulative Versie 1 reader state. Він не додає parallel state model, timer-derived progress, external API, OAuth scope, Gmail mutation, Telegram runtime change, staging candidate або production promotion.

## Підтверджена першопричина

Reader уже зберігав stable content anchor під час rerender і delayed layout changes, але edge cases progress лишалися неоднозначними. Non-scrollable short message давав `100%`; text називав content прочитаним, хоча значення означало scroll position; resume control із `0%` міг лишатися видимим; manual resume завжди використовував smooth motion; delayed callback не утримував exact thread або Gmail-connection identity.

## Source correction

- Normalized geometry snapshot оголошує progress measurable лише коли reader має реальний scrollable range.
- Visible та accessible text пояснює, що значення є scroll position у відкритій розмові, а не оцінкою розуміння.
- Compact resume control не показується без saved draft або змістовної позиції.
- Delayed persistence захоплює і повторно перевіряє exact thread та Gmail connection перед записом.
- Exact local anchors лишаються primary same-device restoration path; percentage є bounded fallback.
- Resize та image-load restoration не записують progress і не створюють auto-scroll loop.
- User-initiated resume враховує `prefers-reduced-motion`.

## Атомарні твердження

| Твердження | Категорія | Статус | Доказ |
|---|---|---|---|
| Progress довгого content обчислюється з фактичної scroll geometry | State | `VERIFIED` | executable synthetic geometry test |
| Non-scrollable short content не заявляє `100%` read | Semantics | `VERIFIED` | executable short-content test |
| Delayed save не може перетнути thread або Gmail-connection identity | Isolation | `VERIFIED` | exact source contract |
| Background resize та image-load restoration не записують progress | Stability | `VERIFIED` | reader layout contract |
| Resume control пояснює scroll-position semantics і не показується за порожньої позиції | UX/accessibility | `VERIFIED` | source contract |
| User resume враховує reduced-motion preference | Accessibility | `VERIFIED` | source contract |
| Реальні long/short/quoted/collapsed messages проходять у native Telegram Desktop і mobile | Runtime | `UNVERIFIED` | shared quota blocker не дозволяє safe cumulative staging |
| Current production має corrected behavior | Production | `UNVERIFIED` | release-state у цьому контурі не змінюється |

## Validation

Focused reader contracts проходять `12/12`; повний Apps Script suite проходить `646/646`; diff check і paired documentation validators проходять. Tests використовують synthetic geometry та не читають і не змінюють real mail.

## Висновок

Підтверджені source defects виправлено без заміни чинного reader state або release line. Статус лишається `PARTIAL`, доки native return-position, real delayed-layout, mobile/desktop і production acceptance не зможуть пройти після зняття shared Apps Script blocker.
