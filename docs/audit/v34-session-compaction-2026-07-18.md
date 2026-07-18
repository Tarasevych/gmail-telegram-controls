# v34 Mini App session compaction

## Incident

The owner opened Gmail from Telegram while other test and abandoned WebViews had
already filled the 24-family Apps Script registry. Production v33 returned the
session-capacity error. An older/fallback client surface showed only
`Перезапустити Mini App`, so the explicit v33 recovery action was not available.

Closing a Telegram WebView cannot be treated as a server-side logout: Telegram
does not reliably run a final network callback and the refresh family remains
valid for its absolute 24-hour lifetime.

## v34 behavior

- A Telegram user can keep six independent Mini App refresh families in
  parallel.
- A seventh fresh launch retires only that same Telegram user's oldest family.
- Under global pressure, an ordinary launch preserves at least the newest
  existing family for that user.
- No automatic path can retire another Telegram user's family.
- The explicit owner-bound, one-use v33 recovery remains as a last resort and
  may replace the caller's final old family only after confirmation.
- The change touches no Gmail message, label, draft, OAuth grant, account
  selection, Telegram card, or provider token.

## Verification

- MailClient: 140/140 passed.
- Ordinary product matrix: 361/361 passed.
- Same-user test: 24 sequential launches converge to the six newest families;
  the retired bearer is rejected and the newest remains valid.
- Cross-user test: a full 24-family foreign registry is unchanged after a new
  user's rejected launch.
- Explicit recovery test: only the caller's family is replaced while 23 foreign
  families remain byte-for-byte represented by the same IDs.

The guarded v34 release helper pins immutable v33, immutable v32, the exact v34
candidate hashes, a single staging deployment, and an acceptance journal bound
to both the MailApp and MailClient hashes.
