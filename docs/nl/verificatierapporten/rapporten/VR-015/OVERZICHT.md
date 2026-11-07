# VR-015 — SENT+INBOX exactly-once delivery correction

[Українською](../../../../uk/verification-reports/reports/VR-015/README.md)

- **Date:** 2026-07-23
- **Overall status:** PARTIAL
- **Source request:** `REQ-0033`
- **Verification framework:** `REQ-0004`

## Atomic findings

| ID | Claim | Status | Evidence |
|---|---|---|---|
| VR-015-01 | One controlled owner self-message existed in Gmail with `UNREAD`, `SENT` and `INBOX`; no message content or identifier is published here. | VERIFIED | authenticated Gmail readback |
| VR-015-02 | Automatic processing plus two `/check` operations produced zero Telegram cards for the unique marker. | VERIFIED | native Telegram readback and exact-marker search |
| VR-015-03 | The corresponding production worker completed every content-free stage with `errorCode=none`. | VERIFIED | Apps Script Executions telemetry |
| VR-015-04 | `gmailNotificationLabelsEligible_` rejects every `SENT` label even when `INBOX` is present, then the realtime lane persists that ID as seen. | VERIFIED | production-v65 source inspection |
| VR-015-05 | The correction accepts `SENT+INBOX`, still rejects sent-only, spam and trash, preserves important-only mode, and relies on stable message-ID/card reservation dedupe. | VERIFIED | source diff and regression contract |
| VR-015-06 | First scan delivers once and the second scan neither refetches nor resends the same message. | VERIFIED | focused suite `161/161` |
| VR-015-07 | Immutable v65 production contains the defect; cumulative v66 live acceptance has not run. | PARTIAL | authenticated release readback and release boundary |

## Conclusion

GT-039 is a deterministic eligibility defect, not a Gmail transport, Telegram webhook, OAuth, or worker-stage failure. The source correction is merged as `a6ba4d07feaeb7e9369b5e64860e1c3acd57048b`; production stays on exact v65 until a separately pinned v66 candidate passes staging and production acceptance.
