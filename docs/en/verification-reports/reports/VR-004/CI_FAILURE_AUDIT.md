# CI failure audit for July 20-21, 2026

[Українська](../../../../uk/verification-reports/reports/VR-004/CI_FAILURE_AUDIT.md) | [VR-004](README.md)

- **Request:** REQ-0021
- **Framework:** REQ-0004
- **Scope:** GitHub Actions `Request ledger` and `Verification reports`
- **Result:** 26 historical failure runs verified through the GitHub Actions API: 12 `Request ledger`, 14 `Verification reports`
- **Release/runtime change:** no

## Conclusion

These are not 26 independent product failures and not a GitHub runner outage. They are two deterministic series of failures in repository-owned Python validators caused by drift between documents and their machine contract. Checkout, `GITHUB_TOKEN`, the Ubuntu runner, and preceding workflow steps succeeded; failure occurred in validation.

An old failed run remains failed after a follow-up fix by GitHub design. A historical email notification therefore does not prove that the defect is active on the current commit. Apps Script `URLFetch` quota is a separate product runtime issue and did not cause these GitHub Actions failures.

## Complete registry of 26 runs

### Request ledger: 12

| Commit | Run | Record |
|---|---|---|
| `c321fb6` | [29776921161](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29776921161) | Versie 1 multi-account delivery |
| `d9f73c9` | [29808855654](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29808855654) | Versie 1 postmortem work |
| `bcd2509` | [29810331526](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29810331526) | autonomous continuation authority |
| `1c3415f` | [29810851695](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29810851695) | complete postmortem evidence |
| `3cac9ca` | [29810854523](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29810854523) | close autonomous recovery record |
| `b70313b` | [29811347360](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29811347360) | v55 local verification |
| `4dd669d` | [29811406123](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29811406123) | full corpus reconstruction |
| `ee41aa0` | [29815209525](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29815209525) | complete REQ-0012 evidence workflow |
| `e22fdbe` | [29815591929](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29815591929) | clean REQ-0012 pull request |
| `ccab14a` | [29831261905](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29831261905) | verified PR merge continuation |
| `2cbe470` | [29831410031](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29831410031) | block main merge pending acceptance |
| `f4fc31f` | [29845937072](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29845937072) | shared bootstrap A/B recovery |

### Verification reports: 14

| Commit | Run | Record |
|---|---|---|
| `873b26e` | [29780967546](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29780967546) | restore realtime multi-account delivery |
| `e7a8175` | [29781772299](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29781772299) | preserve legacy realtime context |
| `b86f8e0` | [29783271304](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29783271304) | isolate Gmail runtime failures |
| `0266332` | [29783815410](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29783815410) | preserve realtime diagnostics |
| `fcb9012` | [29784272297](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29784272297) | compact stale card indexes |
| `1da4715` | [29785077028](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29785077028) | isolate realtime lane locking |
| `41b8a09` | [29785459013](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29785459013) | expose card retention failures |
| `11995fe` | [29785747404](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29785747404) | detach expired card records |
| `2db3f9a` | [29787916706](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29787916706) | expose isolated lane failures |
| `4c5ecec` | [29788199329](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29788199329) | trace per-account scan filters |
| `e5bd6fb` | [29788592606](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29788592606) | add protected trace evidence |
| `184184c` | [29788979153](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29788979153) | recover exact spam acceptance |
| `d5d34f2` | [29814943117](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29814943117) | publish VR-003 session report |
| `347e6d3` | [29814994252](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29814994252) | normalize VR-003 whitespace |

## Root-cause matrix

The counts below do not add up to 26: one workflow run validated all existing records, so the same REQ defect could recur in several later runs.

| Object | Appearances in failed runs | Root cause |
|---|---:|---|
| REQ-0009 | 11 | Extended `Routes` failed the monolithic regex; `Permission basis` was not `explicit`/`none` |
| REQ-0010 | 10 | The same schema-contract mismatch |
| REQ-0011 | 9 | Human headings instead of exact machine fields and language markers |
| REQ-0012 | 5 | The same cause |
| REQ-0013 | 2 | The same cause |
| REQ-0019 | 1 | Unknown route key `problems` and unsupported value `conditional` |
| VR-002 | 12 | Both README pages lacked the required `REQ-0004` verification-framework marker |
| VR-003 | 2 | SHA-256 depended on physical CRLF/LF bytes |

Representative logs corroborate the classification: [f4fc31f](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29845937072) ended with `Missing or invalid routes`; [347e6d3](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29814994252) ended with `VR-003 manifest totals or no-release boundary are invalid`.

## Verified fixes

- REQ-0019 received canonical routes in commit [`fc1d0a6`](https://github.com/Tarasevych/gmail-telegram-controls/commit/fc1d0a6a7600f78e72d04b10eeb9f0bbc7c9b3ef); follow-up [Request ledger run 29846015250](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29846015250) passed.
- VR-003 hashing was canonicalized to LF in commit [`b9cc4d2`](https://github.com/Tarasevych/gmail-telegram-controls/commit/b9cc4d2a5df9d9990106e821e521f2c9249e6225); [Verification reports run 29815102339](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29815102339) passed together with bilingual and knowledge checks.
- Branch `Запити` received a canonical template, order-independent set parser, exact unknown/missing/value diagnostics, and 10 regression tests in commit [`ac7785d`](https://github.com/Tarasevych/gmail-telegram-controls/commit/ac7785d92877c16125c8340aee173ba2c94627d5); [run 29857732665](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29857732665) passed.
- The verification validator has canonical-LF hash tests and field-specific diagnostics; PR #7/#8 and their merge runs passed.

## Recurrence prevention

1. Create every new REQ only from `requests/TEMPLATE.md` with six canonical route keys.
2. Parse Routes as an unordered `key=value` set; report unknown, missing, duplicate key, and invalid value separately.
3. Unknown values remain fail-closed.
4. `Permission basis` accepts only canonical values.
5. UK/EN language markers are mandatory.
6. Calculate verification source hashes after canonical LF normalization.
7. LF and CRLF fixtures must produce the same canonical hash.
8. Run request, bilingual, knowledge-hub, and verification validators before push.
9. After push, inspect only new runs; do not rewrite or mass-rerun historical failures.

## Limitations

- The exact 26 runs and their workflow/status/commit/URL were live-verified through GitHub CLI.
- The detailed REQ/VR recurrence matrix comes from the owner audit of all jobs, steps, and logs; this stream additionally spot-checked two representative logs.
- This report does not mutate historical commits and does not claim that a failed run became successful retroactively.
