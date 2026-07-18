# Trustworthy summary contract — product v39

Product v39 makes the reader's automatic summary inspectable without treating email content as instructions or presenting the output as authoritative.

## Reader contract

- The card is explicitly labelled `Автоматичний AI-аналіз` and discloses the actual method: local heuristic analysis plus machine translation.
- Confidence is a structured server value. It is `medium` only when a generated summary and at least one bounded source fragment are available; otherwise it is `limited`. The current implementation deliberately never claims `high` confidence.
- The summary includes importance, extracted deadlines and amounts, a clearly labelled automatic risk estimate, and an editable next action.
- Up to three source fragments are selected server-side from unique cleaned message bodies. Each quote is at most 240 characters and carries the exact Gmail message ID, timestamp, and supported claim types.
- A source link opens the exact rendered message, expanding quoted history when needed. If that message is outside the bounded reader window, the link falls back to the original Gmail thread.
- The client renders only `analysis.sourceFragments`; it never manufactures citations from the full `bodyText`.

## Trust boundaries

- Message HTML, text, links, and quoted fragments remain untrusted display data. They cannot select an RPC operation, invoke a tool, change an account, or authorize a Gmail mutation.
- Raw HTML is never returned as evidence. MIME content is converted to cleaned text before evidence selection.
- Evidence is bounded to three unique messages and 240 characters per quote. Duplicate bodies do not inflate confidence.
- Decimal amounts are matched only against extracted amount values and are not reinterpreted as dotted dates.
- No email body, subject, sender, quote, attachment name, summary, or risk text is added to metrics or durable preference ledgers by this slice.

## Verification

- Targeted MailApp and MailClient contracts: 212/212 PASS.
- Ordinary mutable-product matrix: 360/360 PASS.
- Standalone system-Chrome rendered QA: 22/22 PASS at 1440×900 and 390×844, including disclosed method, exact source navigation, and zero application console errors.
- Private rendered artifacts remain outside Git in the current task's visualization directory.
- Production remains immutable Apps Script v32/product v38. Product v39 has no deployment or provider mutation in this phase.
