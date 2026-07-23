# VR-041 — C-02 Безпечне закриття та мінімізація composer

Verification framework: REQ-0004

- **Статус:** `PARTIAL`
- **Дата:** 2026-07-23
- **Запит:** `REQ-0035`
- **Пов’язані записи:** `GT-051`, `GT-066`, `B1-46`, `RCA-022`
- **English mirror:** [VR-041](../../../../en/verification-reports/reports/VR-041/README.md)

## Межа

Цей source-only контур продовжує Versie 1 V3 `C-02`. Він не змінює Gmail/OAuth scope, server draft RPC, Telegram identity, листи, мітки, deployment, staging candidate, production state або immutable release history.

## Підтверджена першопричина

Header `X` використовував загальний close guard: pending save/send лишав blocking editor, а final close безумовно скасовував усі local attachment jobs. Minimize зберігав compose object, але стирав saved Range. Окремий compose chip не мав drag contract і на desktop займав ту саму нижню праву зону, що й global transfer manager.

## Source-корекція

- Header `X` формує один `composeCloseRequested` intent, одразу ховає editor і повертає mail view.
- Кожен local job зберігає stable transfer operation ID та association з exact compose session, Gmail connection і canonical draft ID, коли він відомий.
- Close settlement чекає завершення jobs і canonical Gmail draft readback; лише після цього dispose очищує editor state.
- Explicit discard є єдиним path, що скасовує local jobs.
- Restore використовує той самий compose object/job promise, не запускає upload повторно та відновлює останній edit focus/selection.
- Compose chip і global transfer chip рухомі, мають bounds, доступні назви й окремі позиції; transfer row може відкрити exact associated draft.
- Persistent recovery рахує незавершені local jobs як missing attachments. Після повного закриття WebView local bytes не називаються resumable.

## Атомарні твердження

| Твердження | Категорія | Статус | Доказ |
|---|---|---|---|
| Header `X` не скасовує active local attachment job | Data integrity | `VERIFIED` | executable source contract |
| Final dispose не виконується до transfer settlement і canonical Gmail save | Lifecycle | `VERIFIED` | ordered close-state contract |
| Restore повторно використовує той самий job promise/ID без duplicate attachment start | Idempotency | `VERIFIED` | transfer/restore source contract |
| Minimize/restore зберігає edit focus і Range | Accessibility | `VERIFIED` | synthetic focus/selection contract |
| Compose і transfer chips рухомі та не стартують в одній позиції | UX | `VERIFIED` | CSS, pointer і synthetic browser evidence |
| App restart чесно вимагає повторного вибору незавершеного device file | Recovery truth | `VERIFIED` | persistent missing-job contract |
| Transfer продовжується після повного закриття Telegram/WebView | Platform runtime | `UNVERIFIED` | така можливість не заявляється |
| Current production містить C-02 correction | Production | `UNVERIFIED` | release state не змінювався |

## Validation

Focused C-02 contracts проходять `5/5`, повний Apps Script suite — `656/656`. Synthetic browser acceptance перевіряє header close, manual minimize/restore, focus/selection і одночасний layout chips без реальної Gmail mutation; drag bounds окремо перевіряє executable pointer-contract. Native slow-network, WebView restart та production acceptance лишаються окремими gates.

## Висновок

C-02 source тепер розділяє safe close intent, reversible minimize, explicit discard і final dispose. Stable same-session transfer не дублюється й не скасовується через `X`; closed-WebView continuation не імітується. Статус лишається `PARTIAL` до native acceptance та дозволеного release contour.
