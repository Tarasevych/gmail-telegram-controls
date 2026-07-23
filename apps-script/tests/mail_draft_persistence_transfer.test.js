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

function helperSource() {
  return sourceBetween(
    "      function runManagedDraftPersistence(composeAtStart, snapshot, options) {",
    "      async function saveDraft(options) {"
  );
}

test("draft persistence uses honest account-bound shared transfer state", async () => {
  const phases = [];
  const requests = [];
  const compose = {
    connectionId: "gmail-unit-personal",
    draftOperationId: "draft_operation_1234567890"
  };
  const snapshot = {
    operationId: compose.draftOperationId,
    payload: { clientOperationId: compose.draftOperationId, subject: "Unit" }
  };
  compose.pendingSaveSnapshot = snapshot;
  const context = vm.createContext({
    state: { compose },
    safeClientOperationId: value => String(value || ""),
    safeId: value => String(value || ""),
    createManagedTransfer: options => Object.assign({
      transferState: "queued",
      canRetry: false,
      canCancel: false
    }, options),
    enqueueManagedTransfer: (task, runner) => Promise.resolve().then(() => runner(task, {
      setPhase: phase => phases.push(phase)
    })),
    rpc: async request => {
      requests.push(JSON.parse(JSON.stringify(request)));
      return { draft: { id: "draft-1" } };
    },
    saveDraft: async () => true,
    renderTransferManager() {},
    scheduleTransferPrune() {},
    Date,
    Promise
  });
  vm.runInContext(helperSource(), context);

  const transfer = context.runManagedDraftPersistence(compose, snapshot, {});
  const result = await transfer.promise;

  assert.equal(transfer.task.id, snapshot.operationId);
  assert.equal(transfer.task.kind, "draft-persistence");
  assert.equal(transfer.task.byteProgress, false);
  assert.equal(transfer.task.canCancel, false);
  assert.equal(transfer.task.canRetry, true);
  assert.deepEqual(phases, ["transferring", "processing"]);
  assert.deepEqual(requests, [{
    op: "saveDraft",
    connectionId: compose.connectionId,
    draft: snapshot.payload
  }]);
  assert.equal(result.draft.id, "draft-1");
});

test("draft retry reuses the exact task and fails closed after context change", async () => {
  const retries = [];
  const compose = {
    connectionId: "gmail-unit-personal",
    draftOperationId: "draft_operation_1234567890"
  };
  const snapshot = {
    operationId: compose.draftOperationId,
    payload: { clientOperationId: compose.draftOperationId }
  };
  compose.pendingSaveSnapshot = snapshot;
  const state = { compose };
  const context = vm.createContext({
    state,
    safeClientOperationId: value => String(value || ""),
    safeId: value => String(value || ""),
    createManagedTransfer: options => Object.assign({ transferState: "queued" }, options),
    enqueueManagedTransfer: (task, runner) => Promise.resolve({ task, runner }),
    rpc: async () => ({ draft: { id: "draft-1" } }),
    saveDraft: async options => {
      retries.push(options);
      return true;
    },
    renderTransferManager() {},
    scheduleTransferPrune() {},
    Date,
    Promise
  });
  vm.runInContext(helperSource(), context);

  const transfer = context.runManagedDraftPersistence(compose, snapshot, {});
  assert.equal(await transfer.task.retry(), true);
  assert.equal(retries.length, 1);
  assert.equal(retries[0].transferTask, transfer.task);

  state.compose = { connectionId: "gmail-unit-other" };
  assert.equal(await transfer.task.retry(), false);
  assert.equal(transfer.task.transferState, "cancelled");
  assert.equal(transfer.task.canRetry, false);
});

test("saveDraft delegates only its existing snapshot RPC to the manager", () => {
  const saveSource = sourceBetween(
    "      async function saveDraft(options) {",
    "      function normalizeScheduledSend(value) {"
  );
  assert.match(saveSource, /runManagedDraftPersistence\(composeAtStart, snapshot, opts\)/);
  assert.match(saveSource, /var data = await transfer\.promise/);
  assert.doesNotMatch(saveSource, /setInterval|percent|canCancel:\s*true/);
});
