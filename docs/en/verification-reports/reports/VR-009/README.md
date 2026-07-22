# VR-009 — Factual verification of the P0 instant mail client

[Українське дзеркало](../../../../uk/verification-reports/reports/VR-009/README.md)

- **Date:** 2026-07-22
- **Verification framework:** REQ-0004
- **Product:** Versie 1
- **Request:** `REQ-0033`
- **Issues:** GT-032, GT-033, GT-034, GT-035, GT-036
- **Roadmap:** B1-25
- **Overall status:** PARTIAL

## Boundary and method

This report uses sanitized source inspection, a synthetic local preview, official platform documentation, and read-only typography inspection. It contains no real address, mail content, token, session, deployment identifier, cached entity, or staging credential. No Gmail message or label was changed for the baseline.

## Atomic claims

| ID | Category | Currency | Status | Dependencies | Conflicts | Sensitivity | Exact provenance |
|---|---|---|---|---|---|---|---|
| P0-A01 | Baseline | pre-change | VERIFIED | local preview | not production latency | public | Cold usable list `898 ms`; B open `431 ms`; cached-by-user A reopen still `409 ms` |
| P0-A02 | Root cause | pre-change | VERIFIED | MailApp source | none | public | List reset cleared state and rendered a global skeleton; thread open cleared detail; accepted lists rebuilt all rows; global `threadLoading` discarded a second selection |
| P0-A03 | Request volume | pre-change | VERIFIED | source trace | preview transport is synthetic | public | `A -> B -> A` necessarily invoked three `getThread` and three `attentionState` reads because no thread cache existed |
| P0-A04 | Cache design | candidate | UNVERIFIED | IndexedDB and browser quota | Apps Script live origin pending | private-local mail data | Versioned account namespaces, bounded LRU/TTL, stale-while-revalidate and stale-response guards are implemented in source |
| P0-A05 | Draft design | candidate | PARTIAL | existing Gmail Draft API flow | Gmail has no client revision token | private-local draft data | Existing stable operation IDs remain; immediate text-only recovery, acknowledgement cleanup and explicit conflict choice are added |
| P0-A06 | Typography | current/candidate | VERIFIED | authenticated read-only CSS inspection | exact proprietary font availability | public | Current Gmail list cells measured 14 px/20 px with the Google Sans/Roboto family; candidate uses the same legal local-first stack without a font download |
| P0-A07 | Browser platform boundary | current | VERIFIED | official specifications | live staging capability pending | public | Apps Script HTML runs in an iframe sandbox; `google.script.run` is asynchronous and may complete out of order; Background Sync depends on a Service Worker and is not guaranteed |
| P0-A08 | Release activation | candidate | UNVERIFIED | public production manifest and Apps Script reload | first adoption by pre-P0 clients | public | Source has an exact release ID, cache schema and one-attempt reload guard; live staging/production evidence is pending |

## Confirmed primary sources

- [Apps Script HTML restrictions](https://developers.google.com/apps-script/guides/html/restrictions)
- [Apps Script client-to-server communication](https://developers.google.com/apps-script/guides/html/communication)
- [Gmail draft lifecycle](https://developers.google.com/workspace/gmail/api/guides/drafts)
- [Gmail History API](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.history/list)
- [Service Worker specification](https://w3c.github.io/ServiceWorker/v1/)
- [IndexedDB specification](https://w3c.github.io/IndexedDB/)
- [Background Sync specification](https://wicg.github.io/background-sync/spec/)

## Acceptance still required

Automated contracts, full non-release tests, desktop/mobile visual checks, slow/offline behavior, eviction/quota, `A -> B -> A` post-change metrics, Apps Script staging capability, one-reload activation and production verification remain separate gates. No immutable or production claim is made here.

## Sources

- [Issues](../../../ISSUES.md)
- [Roadmap](../../../ROADMAP.md)
- [Українське дзеркало](../../../../uk/verification-reports/reports/VR-009/README.md)

## Local acceptance evidence (2026-07-22)

Status: PARTIAL. These results verify the local synthetic preview and automated contracts only; staging and production remain open gates.

| Claim | Before | After | Evidence status |
|---|---:|---:|---|
| Cold usable list | 898 ms | 899 ms | VERIFIED; no material cold-start regression |
| Warm A -> B -> A revisit | 409 ms | 29 ms, then 13 ms with restored scroll | VERIFIED |
| Detail reads for A -> B -> A | 3 thread + 3 attention reads | 2 thread + 2 attention reads | VERIFIED |
| Document navigations during internal routing | 1 | 1 | VERIFIED; no document reload |
| Reader scroll after A -> B -> A | not retained by the baseline trace | 730 px -> 730 px | VERIFIED |
| Failed-server-save draft recovery | unverified | exact synthetic text restored after reload | VERIFIED in draft-save=fail local preview |
| Desktop overflow at 1280x720 | unverified | 0 px | VERIFIED |
| Mobile overflow at 390x844 | unverified | 0 px; compose remained inside the viewport | VERIFIED |
| Mail-row typography | mixed legacy values | Gmail-compatible local stack, 14 px / 20 px | VERIFIED |
| Compose typography | mixed legacy values | local Roboto-compatible stack, 14 px / 21 px | VERIFIED |
| Non-release automated suite | 426 tests before the final recovery fixes | 427/427 | VERIFIED |
| Documentation gates | pending | bilingual, knowledge-hub, verification-report, and release-state gates passed | VERIFIED |

The browser telemetry is preview-only and content-free. It exposes counters, cache size, release ID, and usability timing; it does not expose account identifiers, message IDs, addresses, subjects, bodies, tokens, or attachment content.

Remaining gates: complete release-test suite, hash-pinned PreflightOnly, one immutable v60 staging candidate, authenticated owner-only staging acceptance, production promotion and two fresh production launches, cache-version activation, trigger observation, and final cleanup/readback.
