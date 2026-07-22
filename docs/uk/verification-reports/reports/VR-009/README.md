# VR-009 — Factual verification P0 миттєвого поштового клієнта

[English mirror](../../../../en/verification-reports/reports/VR-009/README.md)

- **Дата:** 2026-07-22
- **Verification framework:** REQ-0004
- **Продукт:** Versie 1
- **Запит:** `REQ-0033`
- **Проблеми:** GT-032, GT-033, GT-034, GT-035, GT-036
- **Roadmap:** B1-25
- **Загальний статус:** PARTIAL

## Межа й метод

Звіт використовує sanitized source inspection, synthetic local preview, офіційну platform documentation і read-only typography inspection. Він не містить реальної адреси, mail content, token, session, deployment identifier, cached entity або staging credential. Для baseline не змінено жодного Gmail-листа чи мітки.

## Атомарні твердження

| ID | Категорія | Актуальність | Статус | Залежності | Конфлікти | Чутливість | Точне походження |
|---|---|---|---|---|---|---|---|
| P0-A01 | Baseline | pre-change | VERIFIED | local preview | не production latency | public | Cold usable list `898 ms`; B open `431 ms`; cached-by-user A reopen усе ще `409 ms` |
| P0-A02 | Root cause | pre-change | VERIFIED | MailApp source | none | public | List reset очищував state і показував global skeleton; thread open очищував detail; прийняті lists перебудовували всі rows; global `threadLoading` відкидав другий selection |
| P0-A03 | Request volume | pre-change | VERIFIED | source trace | preview transport synthetic | public | `A -> B -> A` обов’язково викликав три `getThread` і три `attentionState` reads, бо thread cache був відсутній |
| P0-A04 | Cache design | candidate | UNVERIFIED | IndexedDB і browser quota | Apps Script live origin очікується | private-local mail data | Versioned account namespaces, bounded LRU/TTL, stale-while-revalidate і stale-response guards реалізовано в source |
| P0-A05 | Draft design | candidate | PARTIAL | чинний Gmail Draft API flow | Gmail не має client revision token | private-local draft data | Чинні stable operation IDs збережено; додано immediate text-only recovery, acknowledgement cleanup і explicit conflict choice |
| P0-A06 | Typography | current/candidate | VERIFIED | authenticated read-only CSS inspection | exact proprietary font availability | public | Current Gmail list cells виміряно як 14 px/20 px із Google Sans/Roboto family; candidate використовує той самий legal local-first stack без font download |
| P0-A07 | Browser platform boundary | current | VERIFIED | official specifications | live staging capability очікується | public | Apps Script HTML працює в iframe sandbox; `google.script.run` асинхронний і може завершуватися не за порядком; Background Sync залежить від Service Worker і не гарантується |
| P0-A08 | Release activation | candidate | UNVERIFIED | public production manifest і Apps Script reload | перше прийняття pre-P0 clients | public | Source має exact release ID, cache schema та one-attempt reload guard; live staging/production evidence очікується |

## Підтверджені primary sources

- [Apps Script HTML restrictions](https://developers.google.com/apps-script/guides/html/restrictions)
- [Apps Script client-to-server communication](https://developers.google.com/apps-script/guides/html/communication)
- [Gmail draft lifecycle](https://developers.google.com/workspace/gmail/api/guides/drafts)
- [Gmail History API](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.history/list)
- [Service Worker specification](https://w3c.github.io/ServiceWorker/v1/)
- [IndexedDB specification](https://w3c.github.io/IndexedDB/)
- [Background Sync specification](https://wicg.github.io/background-sync/spec/)

## Приймання, яке ще потрібне

Automated contracts, full non-release tests, desktop/mobile visual checks, slow/offline behavior, eviction/quota, post-change metrics `A -> B -> A`, Apps Script staging capability, one-reload activation і production verification лишаються окремими gates. Тут не заявлено immutable або production claim.

## Джерела

- [Проблеми](../../../ISSUES.md)
- [Дорожня карта](../../../ROADMAP.md)
- [English mirror](../../../../en/verification-reports/reports/VR-009/README.md)

## Локальні докази приймання (2026-07-22)

Статус: PARTIAL. Ці результати підтверджують лише локальний synthetic preview та автоматизовані контракти; staging і production залишаються відкритими gates.

| Твердження | До | Після | Статус доказу |
|---|---:|---:|---|
| Холодна поява придатного списку | 898 мс | 899 мс | VERIFIED; суттєвої регресії cold start немає |
| Тепле повторне A -> B -> A | 409 мс | 29 мс, потім 13 мс із відновленим scroll | VERIFIED |
| Detail reads для A -> B -> A | 3 thread + 3 attention reads | 2 thread + 2 attention reads | VERIFIED |
| Document navigations під час внутрішніх переходів | 1 | 1 | VERIFIED; document reload відсутній |
| Scroll reader після A -> B -> A | baseline trace не зберігав | 730 px -> 730 px | VERIFIED |
| Відновлення чернетки після failed server save | unverified | точний synthetic текст відновлено після reload | VERIFIED у локальному preview draft-save=fail |
| Desktop overflow при 1280x720 | unverified | 0 px | VERIFIED |
| Mobile overflow при 390x844 | unverified | 0 px; compose залишився всередині viewport | VERIFIED |
| Типографіка рядка пошти | змішані legacy-значення | локальний Gmail-compatible stack, 14 px / 20 px | VERIFIED |
| Типографіка compose | змішані legacy-значення | локальний Roboto-compatible stack, 14 px / 21 px | VERIFIED |
| Автоматизований non-release suite | 426 tests до фінальних recovery fixes | 427/427 | VERIFIED |
| Документаційні gates | pending | bilingual, knowledge-hub, verification-report і release-state gates пройшли | VERIFIED |

Browser telemetry існує лише у preview і є content-free. Вона показує counters, розмір cache, release ID і usability timing; не показує account identifiers, message IDs, адреси, теми, тексти, токени або вміст вкладень.

Залишкові gates: повний suite із release tests, hash-pinned PreflightOnly, один immutable v60 staging candidate, authenticated owner-only staging acceptance, production promotion і два свіжі production launches, активація cache-version, trigger observation та фінальний cleanup/readback.
