# Поточний стан

[English](../en/CURRENT_STATE.md)

<!-- release-state: production=v65; candidate=v70; staging=1; status=PARTIAL; as-of=2026-07-23 -->

## Канонічний стан випуску

- **Versie:** Versie 1.
- **Production:** Apps Script immutable v65, `VERIFIED`.
- **HEAD:** точний cumulative v65.
- **Активні staging deployments:** `0`.
- **Release journal:** `cleaned`.
- **Release source boundary:** cumulative source `3373ca4aa403a28f3252ad72fbe65310b318c53c`; helper merge `eb19dc0822c97f86ebd458c379bde1db3794f800`; propagation fix `8201bc25bc12c470276bd14a0bfef6cde46fbd60`; bridge merge `759d9b9f5001e62e2c3a5cbcc1169077e641493b`.
- **Rollback:** exact immutable v64 лишається доступним; historical immutable v56, v57, v59 і v62 збережені та не переписані.
- **Telegram menu:** production `📬 Пошта · Versie 1`.

## Перевірений acceptance v65

- Source і release-marker contracts пройшли `14/14`; pre-release cumulative suite пройшов `505/505`.
- Helper contracts v65 пройшли `2/2`, cumulative release suite `507/507`; signed bridge phase пройшла `4/4` і `509/509`.
- Один `StageOnly` створив immutable v65 та один owner-only staging deployment. Bounded read-after-create propagation fix прийняв цей exact deployment без повторного `deployments.create`.
- Native Telegram Desktop staging завантажив mailbox і avatar, показав рівно три isolated Gmail roots та перемкнувся на secondary account і назад без OAuth.
- Один promotion просунув v64 до v65. Два fresh production launches завантажили primary mailbox, cleanup видалив staging, а final preflight підтвердив stable/HEAD v65 і journal `cleaned`.
- Post-cleanup worker telemetry показала повні успішні stage traces з `errorCode=none`. Process shell тривалістю 64.611 секунди наклався на наступний trigger приблизно на п'ять секунд, але наступне виконання записало лише `gmail_timer_worker_skip: lease_active`; simultaneous worker work було відхилено.

## Відкриті межі доказів

- `GT-031` і `GT-037` лишаються `VERIFIED`; production v65 і release cleanup мають статус `VERIFIED`.
- `GT-032`–`GT-036` лишаються `PARTIAL`. Automatic reload transition v64-to-v65 неможливо довести, бо сам parser v64 пропускав canonical manifest field.
- Direct Apps Script Processes API повернув `403 ACCESS_TOKEN_SCOPE_INSUFFICIENT`; scope expansion, OAuth cycle або migration default GCP project не виконувалися.
- `GT-039` має статус `PARTIAL`: один контрольований owner self-message мав `UNREAD+SENT+INBOX`, але automatic processing і два `/check` створили нуль Telegram cards. Source inspection знайшов guard `!labels.SENT`; exactly-once source correction пройшов `161/161` focused tests і merged, але ще не deployed.
- 15-хвилинний History gate verified automated contract; live stage trace не показує due-versus-skip decision, тому dedicated runtime cadence лишається `UNVERIFIED`.
- `GT-038` лишається `PARTIAL` для Telegram Web; той самий signed release пройшов у native Telegram Desktop.

## Докази й навігація

- [Детальний звіт про v65](reports/VERSIE_001_V65_RELEASE_CANDIDATE_2026-07-23.md)
- [Verification production client VR-014](verification-reports/reports/VR-014/README.md)
- [Verification доставки SENT+INBOX VR-015](verification-reports/reports/VR-015/README.md)
- [Історичний звіт про v63 і закриття GT-030](reports/VERSIE_001_V63_RELEASE_AND_GT030_CLOSURE_2026-07-22.md)
- [Cumulative історія випуску Versie 1](releases/VERSIE-001-2026-07-19.md)
- [Machine-readable release state](../release-state.json)

## P0 ONE-SECOND boundary — 2026-07-23

- Production і release-state stable залишаються immutable v65; owner menu залишається на production.
- Immutable v66–v69 збережені історично; v69 завершився fail-closed як `abandoned` після native hard-reload/session conflict і не був promoted.
- Source v70 merged normal PR на SHA `0666165b614f430103530728aa45349083db5e78`; immutable v70 створено рівно один раз, active owner-only staging `1`.
- Локальні gates після release assets: helper `3/3`, bridge contracts `4/4`, cumulative suite `572/572`, Python menu syntax і `git diff --check` pass.
- Source v70 додає content-free SecureStorage classification, fail-closed locked state без restart-loop і перевірюваний bridge-to-usable timing; nonce replay protection не послаблено.
- Native button-to-interactive p95, десять запусків, hard reload, offline private Inbox, Windows Desktop recovery і cached-thread acceptance залишаються `UNVERIFIED`/`BLOCKED`; promotion заборонено до повного staging acceptance.
- Канонічні докази: [VR-016](verification-reports/reports/VR-016/README.md), [VR-023](verification-reports/reports/VR-023/README.md).

## Межа P0 acceptance v67 від 2026-07-23

- Production і HEAD залишаються на immutable v65.
- Immutable v67 збережено як історичний доказ; його точний тимчасовий staging deployment видалено.
- Дубльовану видиму послідовність запуску/підключення виправлено у v67 та якісно підтверджено під час коректних запусків у Telegram Desktop.
- P95 однієї секунди, offline unlock приватної пошти, відновлення чернеток і двостороннє багатоакаунтне перемикання не мають статусу VERIFIED; тому v67 не просувався.
- VR-016 є авторитетним доказовим записом цієї acceptance-межі.
