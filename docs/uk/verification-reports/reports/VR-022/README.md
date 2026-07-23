# VR-022 — Fail-closed матриця preview вкладень

[English](../../../../en/verification-reports/reports/VR-022/README.md)

- **Дата:** 2026-07-23
- **Загальний статус:** PARTIAL
- **Source request:** `REQ-0035`
- **Verification framework:** `REQ-0004`
- **Product task:** `B1-32` / V3 `B-02`
- **Issue:** `GT-052`
- **Source commit:** `d4beb1e`
- **Release boundary:** source-only; immutable, staging, production, OAuth, Gmail, Telegram, Drive або Box mutation не виконувалися

## Підтверджена першопричина

Чинний preview route дозволяв SVG використовувати image surface, створював PDF iframe без explicit sandbox і довіряв недостатньо перевіреним ZIP central-directory metadata. ZIP parser обмежував лише показ кількості entries, але не мав fail-closed guards для небезпечних paths, encryption, symlinks, multi-disk, ZIP64, expansion limits та inconsistent directory boundaries.

## Реалізований захист

1. SVG відкривається як escaped text і не запускається як image document.
2. PDF iframe має empty `sandbox`, тобто maximum restriction set; Blob URL як і раніше відкликається під час cleanup.
3. ZIP preview має hard archive cap `8 MiB`, максимум `200` entries, `50 MiB` на entry, `100 MiB` aggregate і ratio cap `100`.
4. Traversal, absolute/drive paths, encryption flags, Unix symlinks, multi-disk, ZIP64 sentinels та malformed/inconsistent central directory блокуються.
5. ZIP вміст не розпаковується: показуються лише перевірені metadata й явний download лишається окремою дією.
6. `Blob.arrayBuffer()` використовується з bounded `FileReader` fallback.

## Атомарні твердження

| ID | Твердження | Статус | Доказ |
|---|---|---|---|
| VR-022-01 | SVG більше не відкривається через active image preview surface. | VERIFIED | behavioral/source contract |
| VR-022-02 | PDF iframe має explicit maximum-restriction sandbox. | VERIFIED | source contract |
| VR-022-03 | ZIP preview не розпаковує content і блокує traversal, absolute/drive paths, encryption та Unix symlinks. | VERIFIED | generated binary behavioral fixtures |
| VR-022-04 | ZIP64, multi-disk, excessive entries, per-entry/aggregate expansion, dangerous ratio та inconsistent central directory fail closed. | VERIFIED | generated binary behavioral fixtures |
| VR-022-05 | Focused preview/MailApp contracts проходять `97/97`; повний Apps Script suite проходить `560/560`. | VERIFIED | local Node test traces |
| VR-022-06 | Усі підтримувані preview/fallback flows працюють у Telegram Desktop, mobile і Apps Script WebView з real-world files. | UNVERIFIED | native acceptance ще не виконано |

## Platform та release boundary

Source реалізує безпечний metadata-only ZIP preview, а не archive extractor або універсальний viewer. Unsupported, oversized чи небезпечний preview лишає користувачу явний download fallback, але native поведінка цього fallback ще потребує acceptance. Новий immutable candidate, staging або production promotion у цьому контурі не створювалися.
