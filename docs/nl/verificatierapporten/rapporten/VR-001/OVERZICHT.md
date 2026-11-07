# VR-001: independent verification of the deep-research baseline

[All claims](CLAIMS.md) | [Governance](GOVERNANCE.md) | [Implementation](IMPLEMENTATION.md) | [Releases](RELEASES.md) | [Conflicts](CONFLICTS.md) | [Recommendations](RECOMMENDATIONS.md) | [Українська](../../../../uk/verification-reports/reports/VR-001/README.md)

Source request: `REQ-0004`. Target: [Versie 1 `2b3b9e2f678f`](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a).

## Result

Five disjoint read-only streams verified exactly 245/245 canonical KH IDs. The result is a claim-level factual classification, not blanket production confirmation.

| Status | Count | Meaning |
|---|---:|---|
| `verified` | 17 | Supported by primary evidence within the declared scope |
| `contradicted` | 13 | Primary evidence directly conflicts with the claim |
| `partial` | 82 | Only part of the claim or a lower scope is supported |
| `unverified` | 35 | No sufficient primary evidence was found |
| `blocked` | 7 | Required evidence is unavailable within the safe scope |
| `recommendation` | 91 | Normative proposal, not an implementation fact |

| Grade | Count | Evidence |
|---|---:|---|
| `E0` | 24 | Prior report or assertion only |
| `E1` | 60 | Git history or file presence |
| `E2` | 145 | Static implementation inspection |
| `E3` | 16 | Local automated test |
| `E4` | 0 | Read-only staging/runtime |
| `E5` | 0 | Production acceptance |

## Key findings

- The safe local suite passed 399/399; it did not include OAuth, network, staging, or production.
- The tracked implementation uses an Apps Script mailbox backend and time-based polling; proposed Gmail add-on, Mailcow/Stalwart, and Pub/Sub/Cloud Run paths are not the current implementation.
- Custom OAuth code contradicts the report-derived apps-script-oauth2 dependency.
- Report-derived permissions were not promoted: P-001 through P-004 lack sufficient traceable REQ-ID provenance.
- Versie 1 remains unpromoted to production, without a tag or release branch; runtime/production acceptance was not performed.
- The current token-refresh path lacks a function-local lock; the risk was routed to GT-010.

## Evidence navigation

- [Atomic claim ledger](CLAIMS.md)
- [Machine claims](../../../../verification-reports/VR-001/claims.json)
- [Machine manifest](../../../../verification-reports/VR-001/manifest.json)
- [Current project](../../../PROJECT.md)
- [Current roadmap](../../../ROADMAP.md)
- [Current issues](../../../ISSUES.md)

## Limitations

- No runtime, Gmail, Telegram, Apps Script, deployment, or secret change.
- No E4/E5 evidence was obtained; blocked runtime claims remain open.
- Absence findings are limited to the tracked tree and named governance commits.
- Versie 2 was neither created nor authorized.
