# Product v42 — evidence-grounded task and Calendar handoff

This slice turns a supported action or deadline in an email into one explicit next step without making the AI authoritative. It follows the research requirement to reduce working-memory load, externalize a task, and avoid inventing dates for users who may already struggle with time estimation and executive initiation.

## User contract

- The reader shows `Перетворити на задачу` only when the automatic analysis has a non-empty action backed by an exact message-bound source fragment.
- It shows `Додати до календаря` only when an extracted deadline appears verbatim in a source fragment that supports the deadline claim.
- Both flows display the exact Gmail account and source quote before anything happens.
- The proposed title is editable.
- Cancel, close, and Escape cause zero mutation.
- A local task is created only after confirmation by setting the exact account/thread to `Дія` and saving the edited next action.
- Calendar date and time fields always start blank. The service never interprets `завтра`, guesses a duration, or writes directly to Calendar.
- After confirmation, the Mini App opens Google's official Calendar event template with the exact Gmail `authuser`, user-entered local times, account timezone, source quote, and original Gmail link. Google still requires the user to save the event.

## Isolation and trust boundaries

- The server DTO is content-only and bound to the exact Gmail connection ID, normalized account email, Gmail thread URL, source message ID, timestamp, and bounded quote.
- The client rejects the whole handoff when the connection ID, account email, Gmail URL, version, or evidence is missing or mismatched.
- Confirmation rechecks the frozen thread ID, connection ID, account email, and Gmail URL against the currently open reader.
- Email HTML cannot choose an RPC operation or Calendar destination. Only the allowlisted server DTO can expose a suggestion.
- No Calendar OAuth scope, token, Calendar API write, background creation, or durable Calendar payload was added.
- The manifest remains limited to the existing Gmail, Drive-readonly, external-request, and Apps Script scopes.

## Accessibility and low-pressure behavior

- The confirmation surface is a labelled modal with focus isolation, Tab trapping, Escape cancellation, focus restoration, bounded mobile layout, and explicit copy explaining what will happen.
- The source quote and account stay visible while editing.
- The Calendar flow says plainly that the date/time are not guessed and that the event is not yet saved.
- The task flow reuses the existing reversible Focus model instead of creating another hidden task store.

## Verification

- Targeted MailApp/MailClient contracts: 219/219 PASS.
- Ordinary mutable-product matrix: 367/367 PASS.
- Standalone system-Chrome rendered QA: 44/44 PASS at 1440×900 and 390×844.
- Rendered checks cover visible suggestions, exact account/evidence, editable title, cancel/Escape zero mutation, explicit task confirmation, blank Calendar times, exact official Calendar URL parameters, viewport bounds, mobile reader scrolling, and zero application console errors.
- Rendered QA found and fixed a real defect where suggestion buttons stayed disabled after creating a task. Independent review also tightened exact action-to-quote binding, made Cancel/Escape inert during an in-flight mutation, and restored focus after both successful flows. Final source and browser contracts prevent regression.

Private screenshots, the exact Calendar URL, and the QA report remain outside Git under the thread visualization directory. No live Gmail message, label, draft, Telegram zone, OAuth grant, Calendar object, provider account, browser account, or phone state was changed.

## Release state

Product v42 is a verified local candidate only. Production remains Apps Script v34/product v38.2 with automatic same-user session compaction. A future v42 deployment requires a separately pinned immutable release helper, fresh Telegram WebView acceptance, guarded promotion, and post-deploy read-only synchronization checks.
