# VR-042 - P0-A launch single-flight і canonical launch-proof ledger

Verification framework: REQ-0004

- **Статус:** `PARTIAL`
- **Дата:** 2026-07-24
- **Запит:** `REQ-0037`
- **Implementation baseline:** `1d5fb8352ea62f7b25d6980312f277060ce4d0ae`
- **Пов’язані записи:** чинні `GT-040-GT-047`, `GT-051`, `GT-053`, `GT-054`; нові `GT-067`, `B1-47`, `RCA-023`
- **English mirror:** [VR-042](../../../../en/verification-reports/reports/VR-042/README.md)

## Межа

Цей звіт перевіряє лише P0-A source contour і synthetic local MailApp preview. Apps Script deployment, staging або production change, native Telegram target-device acceptance, Gmail action чи mailbox mutation не виконувалися. Source і local E2 evidence не доводять native Telegram SLO або production behavior.

## Підтверджена першопричина

Історичні launch-proof issuance та redemption використовували розділені state paths замість одного canonical locked claim ledger. Cross-document launch ownership також не мав одного deterministic single-flight contract, тому concurrent launch documents могли конкурувати або повторювати bootstrap work.

## Реалізований source contour

- Cross-document launch single-flight спочатку використовує `navigator.locks`, а expiring content-free IndexedDB lease є fallback.
- Звичайний validated launch лишається без overlay.
- Release reload очікує mutation quiescence і використовує точний content-free ключ `sessionStorage` `p0-release-reload`.
- Server launch issuance і redemption використовують один `ScriptLock`-backed ledger з однією canonical claim transaction.
- Ledger claims мають HMAC owner і route scopes, deterministic 60-second nonce lifetime, 11-minute tombstones і обмеження 100 записів.
- Ledger не зберігає secrets або identifiers.

## Source evidence

| Claim | Результат | Статус |
|---|---:|---|
| Focused P0-A contracts | `37/37` | `VERIFIED` у source scope |
| Повний Apps Script suite | `668/668` за `24.229s` | `VERIFIED` у source scope |
| Exact implementation baseline | `1d5fb8352ea62f7b25d6980312f277060ce4d0ae` | зафіксовано |
| Runtime deployment або mailbox mutation | немає | не виконувалося |

## Synthetic local E2 acceptance

Raw MailApp preview перевірено через local HTTP. Це лише synthetic local evidence, а не native Telegram target-device acceptance.

- Cache-busted first `DOMContentLoaded` / app-shell observation: `515 ms`.
- Десять послідовних warm reloads досягли visible shell із прихованим boot overlay за `[133, 108, 107, 128, 125, 136, 133, 142, 153, 143] ms`.
- Observed maximum і p95-by-10: `153 ms`.
- Desktop `1440x900`: `appVisible=true`, `bootHidden=true`, `horizontalOverflow=false`.
- Mobile `390x844`: `appVisible=true`, `bootHidden=true`, `horizontalOverflow=false`.
- Evidence scope: лише DOM, accessibility і layout observations.
- Screenshot capture був недоступний; screenshot evidence не заявляється.

## Synthetic offline document boundary

Після десяти warm loads CDP встановив `offline=true` і перезавантажив поточний direct HTML document. App shell не було подано, а browser досяг `ERR_INTERNET_DISCONNECTED`. Після відновлення мережі local preview знову відкрився нормально.

Це лише synthetic proof того, що поточний direct HTML document не може гарантувати fresh offline launch без підтримуваного app-shell або Service Worker hosting path. Воно не перевіряє і не спростовує IndexedDB data-cache behavior, який лишається окремим contour. Offline-first document launch лишається `BLOCKED` / `UNVERIFIED`.

## Неперевірені та заблоковані gates

Загальний статус лишається `PARTIAL`. Source tests і synthetic local E2 evidence не підвищують такі claims:

- native Telegram target-device warm-launch p95 `<=1000 ms`;
- десять реальних native launch acceptance runs;
- offline private device-bound unlock;
- POST-Redirect-GET behavior;
- MailApp incremental Gmail History;
- Service Worker і Background Sync behavior у межах Apps Script HTML;
- staging і production acceptance.

Ці gates лишаються `UNVERIFIED` або `BLOCKED` через shared Apps Script URL Fetch quota та `T-03`. Production або staging acceptance не заявляється.

## Первинні джерела

- [Telegram Mini Apps](https://core.telegram.org/bots/webapps)
- [Apps Script HTML service restrictions](https://developers.google.com/apps-script/guides/html/restrictions)
- [Gmail History](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.history/list)
- [Gmail Drafts](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.drafts)
- [Gmail Messages](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages)
- [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Storage](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API)
- [Background Sync](https://developer.mozilla.org/en-US/docs/Web/API/Background_Synchronization_API)
