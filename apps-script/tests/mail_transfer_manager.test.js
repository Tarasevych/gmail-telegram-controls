const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const uiPath = path.join(__dirname, '..', 'MailApp.html');
const uiSource = fs.readFileSync(uiPath, 'utf8');

function sourceBetween(start, end) {
  const startIndex = uiSource.indexOf(start);
  const endIndex = uiSource.indexOf(end, startIndex + start.length);
  assert.notEqual(startIndex, -1, `missing start marker: ${start}`);
  assert.notEqual(endIndex, -1, `missing end marker: ${end}`);
  return uiSource.slice(startIndex, endIndex);
}

function managerContext(maxParallel = 3) {
  let sequence = 0;
  const state = {
    composeAttachmentJobs: new Map(),
    transferSequence: 0,
    transferQueue: [],
    transferActiveCount: 0,
    transferMaxParallel: maxParallel,
    transferUi: null,
    transferUiExpanded: false,
    transferPruneTimer: 0,
  };
  const context = vm.createContext({
    state,
    Map,
    Array,
    Boolean,
    Date,
    Math,
    Number,
    Object,
    Promise,
    Set,
    String,
    document: { body: null },
    window: {
      setTimeout,
      clearTimeout,
      setInterval,
      clearInterval,
      innerWidth: 1280,
      innerHeight: 720,
    },
    safeText(value, fallback = '') {
      const text = value == null ? '' : String(value).trim();
      return text || fallback;
    },
    safeClientOperationId(value) {
      const text = value == null ? '' : String(value);
      return /^[A-Za-z0-9_-]{1,120}$/.test(text) ? text : '';
    },
    newClientOperationId() {
      sequence += 1;
      return `transfer-${sequence}`;
    },
    formatSize(value) {
      return `${Math.max(0, Math.round(Number(value || 0)))} B`;
    },
    formatAttachmentJobDuration(value) {
      return `${Math.max(1, Math.ceil(Number(value || 0) / 1000))} s`;
    },
    make() {
      throw new Error('DOM creation is not expected when document.body is absent');
    },
    clear() {},
    showSnackbar() {},
  });
  const managerSource = sourceBetween(
    '      var TRANSFER_STATES = {',
    '      function attachmentJobElapsed(job) {'
  );
  vm.runInContext(managerSource, context);
  return context;
}

test('transfer manager defines the canonical lifecycle and honest capability states', () => {
  const context = managerContext();
  for (const stateName of [
    'queued', 'preparing', 'transferring', 'processing', 'attaching', 'completed',
    'cancelled', 'failed', 'blocked', 'retryable', 'paused',
  ]) {
    assert.equal(context.TRANSFER_STATES[stateName], true);
  }
});

test('one underlying map holds compose and global transfers without leaking global tasks into compose', () => {
  const composeSource = sourceBetween(
    '      function composeAttachmentJobs() {',
    '      function updateComposeSaveStatus() {'
  );
  assert.match(composeSource, /state\.composeAttachmentJobs\.values\(\)/);
  assert.match(composeSource, /job\.transferDomain !== "global"/);
  const context = managerContext();
  const task = context.createManagedTransfer({ label: 'preview' });
  assert.equal(context.state.composeAttachmentJobs.get(task.id), task);
  assert.equal(task.transferDomain, 'global');
});

test('bounded scheduler never exceeds three simultaneous runners', async () => {
  const context = managerContext(3);
  let active = 0;
  let maximum = 0;
  const releases = [];
  const runs = Array.from({ length: 7 }, (_, index) => {
    const task = context.createManagedTransfer({ label: `task-${index}` });
    return context.enqueueManagedTransfer(task, () => new Promise((resolve) => {
      active += 1;
      maximum = Math.max(maximum, active);
      releases.push(() => {
        active -= 1;
        resolve(index);
      });
    }));
  });
  while (releases.length < 3) await new Promise((resolve) => setImmediate(resolve));
  assert.equal(maximum, 3);
  while (releases.length) {
    const release = releases.shift();
    release();
    await new Promise((resolve) => setImmediate(resolve));
  }
  while (context.state.transferActiveCount || context.state.transferQueue.length) {
    while (releases.length) releases.shift()();
    await new Promise((resolve) => setImmediate(resolve));
  }
  assert.deepEqual(await Promise.all(runs), [0, 1, 2, 3, 4, 5, 6]);
  assert.equal(maximum, 3);
});

test('unknown transport totals never produce a fabricated percentage', () => {
  const context = managerContext();
  const task = context.createManagedTransfer({ label: 'RPC preview', total: 5000, byteProgress: false });
  task.transferState = 'transferring';
  const label = context.transferTaskProgressText(task);
  assert.match(label, /обсяг недоступний/);
  assert.doesNotMatch(label, /%/);
  const aggregate = context.transferAggregate([task]);
  assert.equal(aggregate.determinate, false);
  assert.equal(aggregate.percent, null);
});

test('actual byte callbacks drive bytes percent speed and ETA', async () => {
  const context = managerContext();
  const task = context.createManagedTransfer({ label: 'local file', total: 1000, byteProgress: true });
  task.transferState = 'transferring';
  context.recordManagedTransferProgress(task, 100, 1000);
  await new Promise((resolve) => setTimeout(resolve, 5));
  context.recordManagedTransferProgress(task, 600, 1000);
  const label = context.transferTaskProgressText(task);
  assert.match(label, /600 B \/ 1000 B/);
  assert.match(label, /60%/);
  assert.match(label, /\/с/);
  assert.ok(context.transferTaskEta(task) > 0);
});

test('queued cancellation prevents the runner from starting and resolves false', async () => {
  const context = managerContext(1);
  let releaseFirst;
  const first = context.createManagedTransfer({ label: 'first' });
  const firstPromise = context.enqueueManagedTransfer(first, () => new Promise((resolve) => {
    releaseFirst = resolve;
  }));
  const second = context.createManagedTransfer({ label: 'second', canCancel: true });
  let secondStarted = false;
  const secondPromise = context.enqueueManagedTransfer(second, () => {
    secondStarted = true;
    return true;
  });
  while (!releaseFirst) await new Promise((resolve) => setImmediate(resolve));
  assert.equal(context.cancelManagedTransfer(second.id), true);
  releaseFirst(true);
  assert.equal(await firstPromise, true);
  assert.equal(await secondPromise, false);
  assert.equal(secondStarted, false);
  assert.equal(context.transferCanonicalState(second), 'cancelled');
});

test('running cancellation invokes the registered abort function', async () => {
  const context = managerContext(1);
  let aborted = 0;
  let release;
  const task = context.createManagedTransfer({ label: 'running', canCancel: true });
  const promise = context.enqueueManagedTransfer(task, (_task, controls) => new Promise((resolve) => {
    release = resolve;
    controls.setAbort(() => {
      aborted += 1;
      resolve(false);
    });
  }));
  while (!task.abort) await new Promise((resolve) => setImmediate(resolve));
  assert.equal(context.cancelManagedTransfer(task.id), true);
  assert.equal(await promise, false);
  assert.equal(aborted, 1);
  assert.equal(context.transferCanonicalState(task), 'cancelled');
  if (release) release(false);
});

test('running cancellation is rejected until the transport registers a real abort handle', async () => {
  const context = managerContext(1);
  let started = false;
  let release;
  const task = context.createManagedTransfer({ label: 'RPC lane', canCancel: true });
  const promise = context.enqueueManagedTransfer(task, () => new Promise((resolve) => {
    started = true;
    release = resolve;
  }));
  while (!started) await new Promise((resolve) => setImmediate(resolve));
  assert.equal(context.managedTransferCanCancel(task), false);
  assert.equal(context.cancelManagedTransfer(task.id), false);
  assert.equal(task.cancelled, false);
  release('ok');
  assert.equal(await promise, 'ok');
  assert.equal(context.transferCanonicalState(task), 'completed');
});

test('retry reuses the stable transfer ID', async () => {
  const context = managerContext();
  let attempts = 0;
  const task = context.createManagedTransfer({ label: 'retryable', canRetry: true });
  task.retry = () => context.enqueueManagedTransfer(task, () => {
    attempts += 1;
    return 'ok';
  });
  task.transferState = 'retryable';
  const originalId = task.id;
  assert.equal(await context.retryManagedTransfer(task.id), 'ok');
  assert.equal(task.id, originalId);
  assert.equal(attempts, 1);
  assert.equal(context.transferCanonicalState(task), 'completed');
});

test('compose local reads and incoming/provider previews use the shared manager', () => {
  const startSource = sourceBetween(
    '      function startComposeAttachmentJob(job, retry) {',
    '      function addInlineImageFiles(files) {'
  );
  const incomingSource = sourceBetween(
    '      function fetchIncomingAttachmentData(attachment, message, index) {',
    '      function loadAttachmentThumbnail(host, attachment, message, index) {'
  );
  const providerSource = sourceBetween(
    '      async function openSourcePreview(metadata, trigger) {',
    '      var TRANSFER_STATES = {'
  );
  assert.match(startSource, /enqueueManagedTransfer\(job/);
  assert.match(startSource, /controls\.progress\(loaded, total \|\| job\.size\)/);
  assert.match(incomingSource, /createManagedTransfer\([\s\S]*kind: "attachment-fetch"/);
  assert.match(providerSource, /createManagedTransfer\([\s\S]*kind: "provider-preview"/);
});

test('movable global chip is independent from composer minimize and has accessible controls', () => {
  const managerSource = sourceBetween(
    '      var TRANSFER_STATES = {',
    '      function attachmentJobElapsed(job) {'
  );
  assert.match(managerSource, /document\.body\.append\(host\)/);
  assert.match(managerSource, /pointerdown[\s\S]*pointermove[\s\S]*pointerup/);
  assert.match(managerSource, /aria-label": "Передавання файлів"/);
  assert.match(managerSource, /aria-label": "Скасувати /);
  assert.doesNotMatch(managerSource, /composeMinimized/);
});

test('incoming RPC progress remains indeterminate because google.script.run exposes no byte callbacks', () => {
  const incomingSource = sourceBetween(
    '      function fetchIncomingAttachmentData(attachment, message, index) {',
    '      function loadAttachmentThumbnail(host, attachment, message, index) {'
  );
  assert.match(incomingSource, /byteProgress: false/);
  assert.doesNotMatch(incomingSource, /setInterval[\s\S]*percent/);
});

test('runner can explicitly end in a truthful blocked state', async () => {
  const context = managerContext();
  const task = context.createManagedTransfer({ label: 'restart recovery', canRetry: true });
  await assert.rejects(
    context.enqueueManagedTransfer(task, () => {
      const error = new Error('local bytes are unavailable after restart');
      error.transferOutcome = 'blocked';
      throw error;
    })
  );
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(context.transferCanonicalState(task), 'blocked');
});
