# VR-022 — Fail-closed attachment preview matrix

[Українською](../../../../uk/verification-reports/reports/VR-022/README.md)

- **Date:** 2026-07-23
- **Overall status:** PARTIAL
- **Source request:** `REQ-0035`
- **Verification framework:** `REQ-0004`
- **Product task:** `B1-32` / V3 `B-02`
- **Issue:** `GT-052`
- **Source commit:** `d4beb1e`
- **Release boundary:** source only; no immutable, staging, production, OAuth, Gmail, Telegram, Drive, or Box mutation

## Confirmed root cause

The existing preview route allowed SVG to use an image surface, created the PDF iframe without an explicit sandbox, and trusted insufficiently validated ZIP central-directory metadata. The ZIP parser only limited the displayed entry count and had no fail-closed guards for dangerous paths, encryption, symlinks, multi-disk, ZIP64, expansion limits, or inconsistent directory boundaries.

## Implemented protection

1. SVG opens as escaped text and is never executed as an image document.
2. The PDF iframe has an empty `sandbox`, applying the maximum restriction set; its Blob URL is still revoked during cleanup.
3. ZIP preview has an `8 MiB` archive cap, at most `200` entries, `50 MiB` per entry, `100 MiB` aggregate, and a ratio cap of `100`.
4. Traversal, absolute and drive paths, encryption flags, Unix symlinks, multi-disk, ZIP64 sentinels, and malformed or inconsistent central directories are blocked.
5. ZIP content is never extracted: only validated metadata is shown, while explicit download remains a separate action.
6. `Blob.arrayBuffer()` is used with a bounded `FileReader` fallback.

## Atomic claims

| ID | Claim | Status | Evidence |
|---|---|---|---|
| VR-022-01 | SVG no longer opens through an active image preview surface. | VERIFIED | behavioral/source contract |
| VR-022-02 | The PDF iframe has an explicit maximum-restriction sandbox. | VERIFIED | source contract |
| VR-022-03 | ZIP preview never extracts content and blocks traversal, absolute or drive paths, encryption, and Unix symlinks. | VERIFIED | generated binary behavioral fixtures |
| VR-022-04 | ZIP64, multi-disk, excessive entries, per-entry or aggregate expansion, dangerous ratios, and inconsistent central directories fail closed. | VERIFIED | generated binary behavioral fixtures |
| VR-022-05 | Focused preview/MailApp contracts pass `97/97`; the complete Apps Script suite passes `560/560`. | VERIFIED | local Node test traces |
| VR-022-06 | Every supported preview and fallback flow works in Telegram Desktop, mobile, and the Apps Script WebView with real-world files. | UNVERIFIED | native acceptance has not run |

## Platform and release boundary

The source implements safe metadata-only ZIP preview, not an archive extractor or universal viewer. An unsupported, oversized, or dangerous preview leaves an explicit download fallback, but native acceptance of that fallback is still required. No new immutable candidate, staging deployment, or production promotion was created in this contour.
