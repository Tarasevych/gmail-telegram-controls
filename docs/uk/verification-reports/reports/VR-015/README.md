# VR-015 — exactly-once correction доставки SENT+INBOX

[English](../../../../en/verification-reports/reports/VR-015/README.md)

- **Дата:** 2026-07-23
- **Загальний статус:** PARTIAL
- **Source request:** `REQ-0033`
- **Verification framework:** `REQ-0004`

## Атомарні висновки

| ID | Твердження | Статус | Доказ |
|---|---|---|---|
| VR-015-01 | Один контрольований owner self-message існував у Gmail із `UNREAD`, `SENT` та `INBOX`; message content або identifier тут не публікуються. | VERIFIED | authenticated Gmail readback |
| VR-015-02 | Automatic processing і два `/check` створили zero Telegram cards для unique marker. | VERIFIED | native Telegram readback і exact-marker search |
| VR-015-03 | Відповідний production worker завершив усі content-free stages із `errorCode=none`. | VERIFIED | Apps Script Executions telemetry |
| VR-015-04 | `gmailNotificationLabelsEligible_` відхиляє кожний `SENT` label навіть за наявності `INBOX`, після чого realtime lane durable позначає ID seen. | VERIFIED | source inspection production v65 |
| VR-015-05 | Correction приймає `SENT+INBOX`, далі відхиляє sent-only, spam і trash, зберігає important-only mode та покладається на stable message-ID/card reservation dedupe. | VERIFIED | source diff і regression contract |
| VR-015-06 | Перший scan доставляє один раз, а другий не refetch-ить і не resend-ить той самий message. | VERIFIED | focused suite `161/161` |
| VR-015-07 | Immutable v65 production містить defect; live acceptance cumulative v66 ще не виконано. | PARTIAL | authenticated release readback і release boundary |

## Висновок

GT-039 є deterministic eligibility defect, а не Gmail transport, Telegram webhook, OAuth або worker-stage failure. Source correction merged як `a6ba4d07feaeb7e9369b5e64860e1c3acd57048b`; production лишається exact v65 до staging і production acceptance окремо pinned candidate v66.
