const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const uiSource = fs.readFileSync(path.join(__dirname, '..', 'MailApp.html'), 'utf8');

function sourceBetween(start, end) {
  const from = uiSource.indexOf(start);
  const to = uiSource.indexOf(end, from + start.length);
  assert.notEqual(from, -1, `missing source start: ${start}`);
  assert.notEqual(to, -1, `missing source end: ${end}`);
  return uiSource.slice(from, to);
}

function file(name, size = 1024, relativePath = name, type = 'application/octet-stream') {
  return { name, size, type, webkitRelativePath: relativePath };
}

function plannerContext(overrides = {}) {
  const jobs = overrides.jobs || [];
  const state = {
    compose: {
      attachments: overrides.attachments || [],
      inlineAttachments: overrides.inlineAttachments || [],
    },
    limits: {
      maxOutgoingAttachments: overrides.maxCount || 20,
      maxOutgoingAttachmentBytes: overrides.maxFileBytes || 8 * 1024 * 1024,
      maxOutgoingAttachmentsTotalBytes: overrides.maxTotalBytes || 15 * 1024 * 1024,
    },
  };
  const context = vm.createContext({
    state,
    MAX_FOLDER_SELECTION_FILES: 1000,
    COMPOSE_UPLOAD_BATCH_PAGE_SIZE: 40,
    Array,
    Boolean,
    Math,
    Number,
    Object,
    String,
    TextEncoder,
    composeAttachmentJobs: () => jobs,
    formatSize: (value) => `${Number(value)} B`,
    safeText(value, fallback = '') {
      const text = value == null ? '' : String(value).trim();
      return text || fallback;
    },
  });
  vm.runInContext(
    sourceBetween(
      '      function validateOutgoingFile(file, index) {',
      '      function fileToBase64(file, options) {'
    ),
    context,
  );
  return context;
}

test('one and ten valid files fit the configured compose capacity', () => {
  const context = plannerContext();
  const one = context.planComposeUploadSelection([file('one.txt')], { selectionKind: 'files' });
  const ten = context.planComposeUploadSelection(
    Array.from({ length: 10 }, (_, index) => file(`f-${index}.txt`)),
    { selectionKind: 'folder' },
  );
  assert.equal(one.accepted.length, 1);
  assert.equal(one.gateReason, '');
  assert.equal(ten.accepted.length, 10);
  assert.equal(ten.gateReason, '');
});

test('100 and 1000 files are summarized but do not begin a pointless upload beyond capacity', () => {
  const context = plannerContext();
  for (const count of [100, 1000]) {
    const plan = context.planComposeUploadSelection(
      Array.from({ length: count }, (_, index) => file(`f-${index}.txt`, 1, `folder/f-${index}.txt`)),
      { selectionKind: 'folder' },
    );
    assert.equal(plan.entries.length, count);
    assert.equal(plan.accepted.length, 0);
    assert.match(plan.gateReason, /доступно місць/);
    assert.ok(plan.entries.every((entry) => entry.status === 'blocked'));
  }
});

test('selection over 1000 files is bounded and marked incomplete', () => {
  const context = plannerContext({ maxCount: 2000 });
  const plan = context.planComposeUploadSelection(
    Array.from({ length: 1001 }, (_, index) => file(`f-${index}.txt`, 1)),
    { selectionKind: 'folder' },
  );
  assert.equal(plan.entries.length, 1000);
  assert.equal(plan.overflowCount, 1);
  assert.equal(plan.truncated, true);
  assert.equal(plan.accepted.length, 0);
  assert.match(plan.gateReason, /понад 1000/);
});

test('empty folder returns an explicit empty plan without jobs', () => {
  const context = plannerContext();
  const plan = context.planComposeUploadSelection([], { selectionKind: 'folder' });
  assert.equal(plan.entries.length, 0);
  assert.equal(plan.accepted.length, 0);
  assert.equal(plan.totalBytes, 0);
  assert.equal(plan.gateReason, '');
});

test('nested Unicode paths remain distinguishable', () => {
  const context = plannerContext();
  const plan = context.planComposeUploadSelection([
    { file: file('звіт.pdf', 2048), relativePath: 'Проєкт/2026/звіт.pdf' },
  ], { selectionKind: 'folder' });
  assert.equal(plan.accepted.length, 1);
  assert.equal(plan.entries[0].relativePath, 'Проєкт/2026/звіт.pdf');
});

test('exact duplicate is rejected while same basename in different folders remains explicit', () => {
  const context = plannerContext();
  const exact = context.planComposeUploadSelection([
    { file: file('report.pdf', 100), relativePath: 'a/report.pdf' },
    { file: file('report.pdf', 100), relativePath: 'a/report.pdf' },
  ], {});
  assert.equal(exact.accepted.length, 1);
  assert.equal(exact.entries[1].status, 'rejected');
  assert.match(exact.entries[1].reason, /у виборі/);

  const distinct = context.planComposeUploadSelection([
    { file: file('report.pdf', 100), relativePath: 'a/report.pdf' },
    { file: file('report.pdf', 100), relativePath: 'b/report.pdf' },
  ], {});
  assert.equal(distinct.accepted.length, 2);
  assert.ok(distinct.entries.every((entry) => entry.duplicateName));
});

test('hidden, service, traversal and empty files fail closed', () => {
  const context = plannerContext();
  const plan = context.planComposeUploadSelection([
    { file: file('.secret', 10), relativePath: 'folder/.secret' },
    { file: file('desktop.ini', 10), relativePath: 'folder/desktop.ini' },
    { file: file('bad.txt', 10), relativePath: '../bad.txt' },
    { file: file('empty.txt', 0), relativePath: 'empty.txt' },
  ], {});
  assert.equal(plan.accepted.length, 0);
  assert.ok(plan.entries.every((entry) => entry.status === 'rejected'));
});

test('aggregate byte overflow blocks the whole valid batch', () => {
  const context = plannerContext({ maxTotalBytes: 1000 });
  const plan = context.planComposeUploadSelection([
    file('a.bin', 600),
    file('b.bin', 600),
  ], {});
  assert.equal(plan.accepted.length, 0);
  assert.match(plan.gateReason, /перевищує доступний ліміт/);
  assert.ok(plan.entries.every((entry) => entry.status === 'blocked'));
});

test('folder UI is progressive, responsive and exposes per-file controls', () => {
  assert.match(uiSource, /id="attachmentFolderInput"[^>]*webkitdirectory directory/);
  assert.match(uiSource, /MAX_FOLDER_SELECTION_FILES = 1000/);
  assert.match(uiSource, /COMPOSE_UPLOAD_BATCH_PAGE_SIZE = 40/);
  assert.match(uiSource, /className: "compose-upload-batch"/);
  assert.match(uiSource, /Показати деталі/);
  assert.match(uiSource, /Показати ще /);
  assert.match(uiSource, /Скасувати всі активні локальні файли/);
  assert.match(uiSource, /Повторити читання " \+ entry\.relativePath/);
  assert.match(uiSource, /Скасувати локальний файл " \+ entry\.relativePath/);
  assert.match(uiSource, /Відкрити Google Drive для великого набору файлів/);
  assert.match(uiSource, /\.compose-upload-list[\s\S]*max-height: 188px[\s\S]*overflow-y: auto/);
  assert.match(uiSource, /\.compose-upload-entry-path[\s\S]*overflow-wrap: anywhere/);
});
