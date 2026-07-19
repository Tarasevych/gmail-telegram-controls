# Evidence policy

[Home](README.md) | [Schema](REPORT_SCHEMA.md) | [Українська](../../uk/verification-reports/EVIDENCE_POLICY.md)

Source request: `REQ-0004`.

| Grade | Count | Evidence |
|---|---:|---|
| `E0` | 24 | Prior report or assertion only |
| `E1` | 60 | Git history or file presence |
| `E2` | 145 | Static implementation inspection |
| `E3` | 16 | Local automated test |
| `E4` | 0 | Read-only staging/runtime |
| `E5` | 0 | Production acceptance |

## Status-promotion rules

- Repetition in a report or summary remains E0.
- E1 file presence and E2 static code do not prove behavior.
- A test claim requires E3, a runtime claim E4, and production acceptance E5.
- An evidence link contains a full immutable commit and verified Git path; absence evidence links to the audited commit tree.
- A permission becomes verified only through canonical Permissions and a traceable owner request.
- OTP, CAPTCHA, new user consent, and unsafe mutations are never bypassed to obtain a higher evidence grade.
- Sensitive values are not published; the report retains only a redacted reference.
