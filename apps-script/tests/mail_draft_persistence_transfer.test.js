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

test("restart recovery queries only the scoped operation status and never resends draft bytes", async () => {
  const phases = [];
  const requests = [];
  const compose = {
    connectionId: "gmail-unit-personal",
    draftOperationId: "draft_restart_operation_0001"
  };
  const snapshot = {
    operationId: compose.draftOperationId,
    restartCheckOnly: true,
    restartAttempts: 0,
    transientAttachmentCount: 2
  };
  compose.pendingSaveSnapshot = snapshot;
  const context = vm.createContext({
    state: { compose },
    safeClientOperationId: value => String(value || ""),
    safeId: value => String(value || ""),
    safeText: value => String(value || ""),
    createManagedTransfer: options => Object.assign({ transferState: "queued" }, options),
    enqueueManagedTransfer: (task, runner) => Promise.resolve().then(() => runner(task, {
      setPhase: phase => phases.push(phase)
    })),
    rpc: async request => {
      requests.push(JSON.parse(JSON.stringify(request)));
      return { status: "committed", draft: { id: "draft-1" } };
    },
    saveDraft: async () => true,
    renderTransferManager() {},
    scheduleTransferPrune() {},
    Date,
    Promise,
    Error
  });
  vm.runInContext(helperSource(), context);

  const transfer = context.runManagedDraftPersistence(compose, snapshot, {});
  const result = await transfer.promise;
  assert.equal(transfer.task.label, "Відновлюю стан чернетки");
  assert.deepEqual(phases, ["transferring", "processing"]);
  assert.deepEqual(requests, [{
    op: "draftOperationStatus",
    connectionId: compose.connectionId,
    clientOperationId: compose.draftOperationId
  }]);
  assert.equal(Object.prototype.hasOwnProperty.call(requests[0], "draft"), false);
  assert.equal(result.draft.id, "draft-1");
});

test("restart reconciliation becomes manually retryable after three bounded pending checks", async () => {
  const compose = {
    connectionId: "gmail-unit-personal",
    draftOperationId: "draft_restart_operation_0002"
  };
  const snapshot = {
    operationId: compose.draftOperationId,
    restartCheckOnly: true,
    restartAttempts: 0,
    transientAttachmentCount: 0
  };
  compose.pendingSaveSnapshot = snapshot;
  const context = vm.createContext({
    state: { compose },
    safeClientOperationId: value => String(value || ""),
    safeId: value => String(value || ""),
    safeText: value => String(value || ""),
    createManagedTransfer: options => Object.assign({ transferState: "queued" }, options),
    enqueueManagedTransfer: (task, runner) => Promise.resolve().then(() => runner(task, {
      setPhase() {}
    })),
    rpc: async () => ({ status: "pending" }),
    saveDraft: async () => true,
    renderTransferManager() {},
    scheduleTransferPrune() {},
    Date,
    Promise,
    Error
  });
  vm.runInContext(helperSource(), context);

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const transfer = context.runManagedDraftPersistence(compose, snapshot, {});
    await assert.rejects(
      transfer.promise,
      error => error && error.code === (attempt === 3 ? "DRAFT_RESTART_DEFERRED" : "DRAFT_PENDING")
    );
  }
  assert.equal(snapshot.restartAttempts, 3);
});

test("persistent restart descriptor is content-free and save snapshots are persisted before dispatch", () => {
  const descriptorSource = sourceBetween(
    "      function p0DraftRestartDescriptor(compose) {",
    "      function p0ComposeRecoveryValue(compose) {"
  );
  const saveSource = sourceBetween(
    "      async function saveDraft(options) {",
    "      function normalizeScheduledSend(value) {"
  );
  assert.match(descriptorSource, /operationId:[\s\S]*fingerprint:[\s\S]*transientAttachmentCount:/);
  assert.doesNotMatch(descriptorSource, /dataBase64|source:\s|url:\s|payload:\s/);
  assert.ok(
    saveSource.indexOf("await p0PersistComposeRecovery()") <
      saveSource.indexOf("runManagedDraftPersistence(composeAtStart, snapshot, opts)")
  );
  assert.match(saveSource, /composeRestartRecoveryIsRequired[\s\S]*restartRecoveryBlockedCount/);
  assert.match(saveSource, /composeRestartRecoveryIsDeferred[\s\S]*restartRecoveryDeferred/);
});
