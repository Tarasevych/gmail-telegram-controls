# VR-020 — Стабільність scroll і focus читача

[English](../../../../en/verification-reports/reports/VR-020/README.md)

- **Дата:** 2026-07-23
- **Загальний статус:** PARTIAL
- **Source request:** `REQ-0035`
- **Verification framework:** `REQ-0004`
- **Product task:** `B1-30` / V3 `A-03`
- **Issue:** `GT-050`
- **Source commit:** `1d7c6c1`
- **Release boundary:** source-only; inherited recorded state лишається Apps Script production/HEAD v65, staging `0`, immutable v68 historical

## Підтверджена першопричина

`renderThread()` очищував і перебудовував root читача для кожного render request. Тому фонові attention, reconciliation, draft, attachment або layout updates могли замінити активний DOM. Попереднє відновлення raw `scrollTop` використовувало конкурентні асинхронні шляхи й не мало stable content anchor, через що layout growth міг зміщувати позицію читання, а заміна могла втрачати keyboard focus.

## Реалізоване source correction

1. Детермінований reader signature не замінює root, коли видимий стан thread не змінився.
2. Перед необхідною заміною клієнт зберігає активний thread/message/body anchor, його viewport offset, bottom-pinned state і memory-only focus identity.
3. Generation-guarded restore застосовує одну актуальну позицію та ігнорує stale restore work.
4. `ResizeObserver` і image-load listeners утримують anchor під час delayed layout growth.
5. Programmatic restoration не планує reading-progress updates, а користувацькі Home, End, Page Up і Page Down лишаються доступними.
6. Persisted view state зберігає scroll anchors за account/thread; focus identity навмисно лишається memory-only.

## Атомарні твердження

| ID | Твердження | Статус | Доказ |
|---|---|---|---|
| VR-020-01 | У source були unconditional reader-root replacement і конкурентне raw-scroll restoration. | VERIFIED | source inspection |
| VR-020-02 | Ідентичний reader state тепер не замінює root. | VERIFIED | focused contract |
| VR-020-03 | Необхідний render зберігає stable content anchors, bottom pinning і focus без forced scroll. | VERIFIED | focused contracts `8/8` |
| VR-020-04 | Layout observation не створює reading-progress render loop, а keyboard navigation лишається доступною. | VERIFIED | focused contracts |
| VR-020-05 | Пов'язані MailApp/launch/reader contracts проходять `101/101`; повний Apps Script suite проходить `540/540`. | VERIFIED | local Node test traces |
| VR-020-06 | Diff formatting чистий, а змінені файли не містять розпізнаних secret signatures. | VERIFIED | `git diff --check`; signature scan `0` |
| VR-020-07 | Desktop/mobile reading, long real HTML, remote-image layout shifts, return navigation і production behavior проходять нативно. | UNVERIFIED | у цьому контурі не було native acceptance або release |

## Межа та наступний доказ

Цей report доводить source behavior і automated contracts, але не native WebView чи production behavior. Окремо авторизований cumulative candidate має зберегти immutable history і пройти desktop/mobile reading із long real HTML, delayed remote-image layout, background updates, keyboard focus та return navigation, перш ніж `GT-050` можна буде перевести у `VERIFIED`.
