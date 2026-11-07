# VR-050 - V3 C-04 rich compose editing and recipient layout

Verification framework: REQ-0004

- **Status:** `PARTIAL`
- **Date:** 2026-07-24
- **Request:** `REQ-0035`
- **Implementation baseline:** `f790897e8dec4a83e8ab8c7114618109b99b436a`
- **Related records:** `GT-075`, `B1-55`, `RCA-031`
- **Українське дзеркало:** [VR-050](../../../../uk/verification-reports/reports/VR-050/README.md)

## Boundary

This report verifies only the V3 C-04 source contour in a synthetic Node/browser-contract harness. No real Gmail draft, OAuth, Telegram runtime, Apps Script deployment, staging, or production state was changed. Source tests prove state/DOM contracts, not native Telegram WebView rendering.

## Confirmed root cause

Compose already had canonical rich HTML/plain fallback, selection bookmarks, undo/redo, formatting commands, table row/column mutations, internal editor scrolling, autosave, and minimize/recovery. Recipients, however, remained raw text inputs without token identity; clipboard HTML was always discarded in favor of plain text; advanced formatting always occupied the same toolbar strip. Table accessibility coordinates were not restored after sanitize/rerender, while keyboard cell traversal and whole-table deletion were absent.

## Implemented source contour

- `To/CC/BCC` use one UI adapter over the existing string draft fields; the backend/RPC contract is unchanged.
- The tokenizer supports quoted display names, comma/semicolon/newline boundaries, Unicode labels, email deduplication, and at most `200` entries.
- An invalid pending address remains visible with `aria-invalid`; chip removal has an explicit accessible name.
- Input and chip controls support Enter/Tab/separators, Backspace/Delete, ArrowLeft/ArrowRight, and Escape.
- The recipient area and compose fields have bounded internal scrolling, so long lists cannot push out the editor/footer.
- Rich clipboard HTML passes through `sanitizeComposeHtml`; raw HTML is never assigned to the DOM and remote/unsafe images remain blocked.
- The primary toolbar contains frequent actions; secondary controls open through explicit `Ще` and close with Escape.
- The existing selection bookmark/range, autosave history, and minimize/recovery model is preserved.
- Table semantics regenerate role, row/column counts, and coordinate labels after insertion, mutation, and sanitized rerender.
- Tab/Shift+Tab moves through existing cells; whole-table deletion returns the caret to a safe paragraph.

## Source evidence

| Claim | Result | Status |
|---|---:|---|
| Focused C-04 contracts | `5/5` | `VERIFIED` in source scope |
| Affected compose/autosave/transfer matrix | `116/116` | `VERIFIED` in source scope |
| MailClient suite | `153/153` | `VERIFIED` in source scope |
| Complete Apps Script suite | `721/721` in `25.457s` | `VERIFIED` in source scope |
| Quoted/Unicode/invalid and `100`-recipient fixtures | passed | `VERIFIED` in synthetic scope |
| Unsafe paste, progressive-toolbar, and table keyboard/delete contracts | passed | `VERIFIED` in source scope |
| Exact implementation baseline | `f790897e8dec4a83e8ab8c7114618109b99b436a` | recorded |
| Real Gmail/OAuth/Telegram/runtime mutation | none | not performed |

## Honest limitations

- Browser inventory was available, but the automation bindings returned no command contract; no visual screenshot or interaction claim was invented.
- Native Telegram Desktop/mobile, keyboard-open layout, a real screen reader, and touch interaction were not verified.
- `200` entries is a client safety bound, not a promise that Gmail accepts any recipient count.
- The email validator intentionally fails closed for unusual RFC forms that cannot be represented safely as a simple chip; server validation remains authoritative.
- A real controlled Gmail-draft roundtrip, staging, and production acceptance are still required.
- Shared Apps Script URL Fetch quota and `T-03` keep the release gate `BLOCKED`.

## Primary references

- [HTML Standard: contenteditable](https://html.spec.whatwg.org/multipage/interaction.html#contenteditable)
- [Clipboard API and events](https://www.w3.org/TR/clipboard-apis/)
- [WAI-ARIA Authoring Practices: toolbar](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/)
- [WAI-ARIA Authoring Practices: grid](https://www.w3.org/WAI/ARIA/apg/patterns/grid/)
