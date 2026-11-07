# VR-008 — Factual verification of the dynamic active-mail context

[Українське дзеркало](../../../../uk/verification-reports/reports/VR-008/README.md)

- **Date:** 2026-07-22
- **Verification framework:** REQ-0004
- **Product:** Versie 1
- **Request:** `REQ-0032`
- **Issue:** [GT-031](../../../ISSUES.md)
- **Roadmap:** B1-24
- **Overall status:** PARTIAL

## Boundary and method

This report contains sanitized source evidence without real Gmail addresses, mail, OAuth/session data, deployment identifiers, or secret properties. The current bootstrap, client state, account switch, and shared-preference paths were inspected. OAuth, Gmail permissions, shared-view membership, and production runtime were not changed.

## Atomic claims

| ID | Category | Currency | Status | Dependencies | Conflicts | Sensitivity | Exact provenance |
|---|---|---|---|---|---|---|---|
| DMC-A01 | Architecture | current | VERIFIED | multi-account bootstrap | none | public | The server already returns an opaque connection ID, name, email, avatar URL, and current marker; the client already stores accounts, active account, unified IDs, and unified mode |
| DMC-A02 | Root cause | current | VERIFIED | MailApp source | none | public | The document title, visible heading, initial account, and normalization fallbacks contained a static owner identity |
| DMC-A03 | State isolation | candidate | VERIFIED | DMC-A01 | none | public | The new view model selects active identity by connection ID and filters shared participants by existing IDs; name and avatar are not keys |
| DMC-A04 | Localization | candidate | PARTIAL | Ukrainian profile name | arbitrary non-name display labels | public | Павло -> Павла and Ольга -> Ольги are supported; uncertain or non-Ukrainian labels use safe `Пошта · <name>` wording instead of an invented case |
| DMC-A05 | Accessibility | candidate | VERIFIED | browser rendering | none | public | Desktop and mobile `390x760` confirmed single/shared headers, full addresses, keyboard-open mapping, and no horizontal overflow; the mapping remains within the viewport |
| DMC-A06 | Synchronization | candidate | VERIFIED | existing render paths | none | public | Bootstrap, switch, and shared-preference updates use existing `renderAccountPanel()`/`initializeFromBootstrap()` paths without reload |
| DMC-A07 | Local tests | candidate | VERIFIED | local execution | PR CI pending | public | The targeted contract passed `88/88` and the full non-release suite passed `443/443`; the corresponding PR checks remain a separate publication gate |
| DMC-A08 | Release | current | BLOCKED | GT-030 | source differs from immutable v57/v59 | public | Production remains v57; immutable v60, staging, and promotion were not performed |

## Conclusion

The source candidate fixes static identification as a presentation defect by using the current account state source. It creates no parallel state and changes no Gmail access. Local automation and responsive visual evidence are VERIFIED; overall status remains PARTIAL because live bounded staging/production acceptance is not performed and GT-030 remains open.

## Sources

- [Issues](../../../ISSUES.md)
- [Roadmap](../../../ROADMAP.md)
- [Current state](../../../CURRENT_STATE.md)
- [Українське дзеркало](../../../../uk/verification-reports/reports/VR-008/README.md)
