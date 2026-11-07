# VR-031 — Smart, safe URL resolver

Verification framework: REQ-0004

- **Status:** `PARTIAL`
- **Date:** 2026-07-23
- **Request:** `REQ-0035`
- **Related records:** `GT-060`, `B1-40`, `RCA-013`
- **Українське дзеркало:** [VR-031](../../../../uk/verification-reports/reports/VR-031/README.md)

## Atomic claims

| Claim | Category | Status | Origin |
|---|---|---|---|
| A direct public HTTPS file and signed query URL survive normalization without query loss and receive bounded metadata/content checks | Implementation | `VERIFIED` | `apps-script/MailClient.gs`; synthetic behavioral tests |
| Google `/imgres?imgurl=` and `/url?url=` are handled only as explicit single-target wrappers; wrapper HTML is not downloaded as an attachment | Implementation | `VERIFIED` | `apps-script/MailClient.gs`; synthetic wrapper tests |
| A Google Search/Images result page is classified as ambiguous and routed to link mode or direct-address guidance without fetching its HTML | UX/security | `VERIFIED` | `apps-script/MailClient.gs`, `apps-script/MailApp.html`; synthetic tests |
| Redirects 301/302/303/307/308 are followed manually with repeated URL/DNS validation, a bounded count, and an identity loop guard | Security | `VERIFIED` | `apps-script/MailClient.gs`; [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html) |
| Metadata preserves origin URL, resolved URL/classification, filename, MIME, size, and a licensing warning | Data/UX | `VERIFIED` | source contract and client normalization |
| Apps Script can disable automatic redirects and accepts URLs up to 2,082 characters; URL Fetch quotas remain an external boundary | Platform | `VERIFIED` | [UrlFetchApp](https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app), [Apps Script quotas](https://developers.google.com/apps-script/guides/services/quotas) |
| A DNS precheck fully eliminates DNS rebinding between validation and the actual UrlFetch resolution | Security | `UNVERIFIED` | This is not proven; [OWASP SSRF guidance](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html) describes this TOCTOU boundary |
| Native transfer progress and live deployment network behavior have owner acceptance | Runtime | `UNVERIFIED` | No live URL fetch, staging, or production action was performed |

## Checks

- Focused resolver/transfer contracts: `8/8`.
- Full Apps Script suite: `616/616`.
- Bilingual docs, knowledge hub, verification reports, release state, and `git diff --check` must pass before publication.
- Tests use synthetic HTTPS responses only; real URLs, Gmail, Telegram, and OAuth are unchanged.

## Boundaries

- Status is `PARTIAL`: the source contract is verified, but DNS-to-fetch pinning is unavailable in the current `UrlFetchApp` contract and native acceptance is absent.
- An ordinary webpage returns precise `SOURCE_NOT_DOWNLOADABLE`; 401/403 returns `SOURCE_FORBIDDEN`; private/local/unsafe URLs are blocked before content use.
- A user URL is never included in a transfer label/ID or public documentation.
