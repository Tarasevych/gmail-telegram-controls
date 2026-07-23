const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const source = fs.readFileSync(
  path.join(__dirname, "..", "MailApp.html"),
  "utf8"
);

function sourceBetween(start, end) {
  const from = source.indexOf(start);
  const to = source.indexOf(end, from + start.length);
  assert.notEqual(from, -1, `missing start marker: ${start}`);
  assert.notEqual(to, -1, `missing end marker: ${end}`);
  return source.slice(from, to);
}

function statusContext() {
  const context = vm.createContext({ Date, Intl, Math, Number, String });
  vm.runInContext(sourceBetween(
    "      function formatComposeSavedTime(value) {",
    "      function updateComposeSaveStatus() {"
  ), context);
  return context;
}

function plain(value) {
  return JSON.parse(JSON.stringify(value));
}

test("autosave status model exposes the six honest Ukrainian states", () => {
  const context = statusContext();
  const cases = [
    [{ dirty: true }, { stateName: "changed", label: "Змінено", action: "save-now" }],
    [{ saving: true }, { stateName: "saving", label: "Зберігаю…", action: "" }],
    [{ canonicalSaved: true, savedTime: "09:41" }, { stateName: "saved", label: "Збережено ✓ 09:41", action: "" }],
    [{ dirty: true, offline: true }, { stateName: "offline", label: "Офлайн — у черзі", action: "" }],
    [{ conflict: true }, { stateName: "conflict", label: "Конфлікт", action: "resolve-conflict" }],
    [{ deferred: true }, { stateName: "error", label: "Не збережено — повторити", action: "retry-save" }]
  ];

  for (const [input, expected] of cases) {
    assert.deepEqual(plain(context.composeSaveStatusPresentation(input)), expected);
  }
});

test("offline and conflict states take precedence over automatic pending presentation", () => {
  const context = statusContext();
  assert.equal(
    context.composeSaveStatusPresentation({ dirty: true, pendingDraft: true, offline: true }).stateName,
    "offline"
  );
  assert.equal(
    context.composeSaveStatusPresentation({ dirty: true, pendingDraft: true, conflict: true }).stateName,
    "conflict"
  );
});

test("saved state is assigned only after canonical Gmail draft readback", () => {
  const saveSource = sourceBetween(
    "      async function saveDraft(options) {",
    "      function normalizeScheduledSend(value) {"
  );
  const canonicalReadback = saveSource.indexOf('var canonical = normalizeDraft(data.draft, "draft")');
  const acknowledgedAt = saveSource.indexOf("canonical.lastCanonicalSavedAt = canonicalAcknowledgedAt");
  assert.notEqual(canonicalReadback, -1);
  assert.notEqual(acknowledgedAt, -1);
  assert.ok(canonicalReadback < acknowledgedAt);
  assert.match(saveSource, /composeAtStart\.lastCanonicalSavedAt = canonicalAcknowledgedAt/);
  assert.match(saveSource, /acknowledgeComposeOperation\("draft", completedDraftOperationId/);
});

test("automatic retries are bounded while manual retry preserves the stable operation", () => {
  const saveSource = sourceBetween(
    "      async function saveDraft(options) {",
    "      function normalizeScheduledSend(value) {"
  );
  const statusSource = sourceBetween(
    "      function checkComposeSaveStatus() {",
    "      function clearComposeAutosaveTimer() {"
  );
  assert.match(saveSource, /snapshot\.pendingAttempts = Number\(snapshot\.pendingAttempts \|\| 0\) \+ 1/);
  assert.match(saveSource, /pendingDeferred = snapshot\.pendingAttempts >= 3/);
  assert.match(saveSource, /draftSaveFailureCount >= 3/);
  assert.match(saveSource, /!state\.compose\.draftSaveDeferred/);
  assert.match(statusSource, /pendingSaveSnapshot\.pendingAttempts = 0/);
  assert.match(statusSource, /pendingSaveSnapshot\.restartAttempts = 0/);
  assert.doesNotMatch(statusSource, /newClientOperationId/);
});

test("normal autosave never asks the user to check saving manually", () => {
  assert.doesNotMatch(source, /Перевірити збереження/);
  assert.match(
    source,
    /id="composeSaveStatusText" role="status" aria-live="polite" aria-atomic="true"/
  );
  assert.match(source, /navigator\.onLine === false \|\| state\.compose\.draftSaveDeferred/);
  assert.match(source, /window\.addEventListener\("online"[\s\S]*flushComposeAutosave\("online"\)/);
});
