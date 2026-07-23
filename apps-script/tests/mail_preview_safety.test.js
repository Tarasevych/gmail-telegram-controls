const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const uiSource = fs.readFileSync(path.join(__dirname, '..', 'MailApp.html'), 'utf8');

function sourceBetween(start, end) {
  const startIndex = uiSource.indexOf(start);
  const endIndex = uiSource.indexOf(end, startIndex + start.length);
  assert.notEqual(startIndex, -1, `missing start marker: ${start}`);
  assert.notEqual(endIndex, -1, `missing end marker: ${end}`);
  return uiSource.slice(startIndex, endIndex);
}

function parserContext() {
  const context = vm.createContext({
    Uint8Array,
    DataView,
    ArrayBuffer,
    TextDecoder,
    Math,
    Boolean,
    Number,
    String,
    Promise,
    FileReader: undefined,
    safeText(value, fallback = '') {
      return value == null || value === '' ? String(fallback || '') : String(value);
    },
  });
  vm.runInContext(sourceBetween(
    '      var ZIP_PREVIEW_LIMITS = {',
    '      function renderTextAttachmentPreview(data) {'
  ), context);
  return context;
}

function zipFixture(entries, options = {}) {
  const encoder = new TextEncoder();
  const records = entries.map((entry) => {
    const name = encoder.encode(entry.name);
    const bytes = new Uint8Array(46 + name.length);
    const view = new DataView(bytes.buffer);
    view.setUint32(0, 0x02014b50, true);
    view.setUint16(4, entry.madeBy || 0, true);
    view.setUint16(8, entry.flags || 0, true);
    view.setUint16(10, entry.method || 8, true);
    view.setUint32(20, entry.compressedSize == null ? 10 : entry.compressedSize, true);
    view.setUint32(24, entry.size == null ? 10 : entry.size, true);
    view.setUint16(28, name.length, true);
    view.setUint32(38, entry.externalAttributes || 0, true);
    bytes.set(name, 46);
    return bytes;
  });
  const centralSize = records.reduce((sum, record) => sum + record.length, 0);
  const output = new Uint8Array(centralSize + 22);
  let cursor = 0;
  for (const record of records) {
    output.set(record, cursor);
    cursor += record.length;
  }
  const view = new DataView(output.buffer);
  view.setUint32(centralSize, 0x06054b50, true);
  view.setUint16(centralSize + 4, options.diskNumber || 0, true);
  view.setUint16(centralSize + 6, options.centralDisk || 0, true);
  view.setUint16(centralSize + 8, options.diskEntries == null ? entries.length : options.diskEntries, true);
  view.setUint16(centralSize + 10, options.total == null ? entries.length : options.total, true);
  view.setUint32(centralSize + 12, options.centralSize == null ? centralSize : options.centralSize, true);
  view.setUint32(centralSize + 16, options.centralOffset || 0, true);
  return output.buffer;
}

test('safe ZIP metadata preview accepts nested Unicode names without extracting content', () => {
  const context = parserContext();
  const listing = context.zipArchiveEntries(zipFixture([
    { name: 'docs/' , size: 0, compressedSize: 0, method: 0 },
    { name: 'docs/звіт.pdf', size: 2400, compressedSize: 1200 },
  ]));
  assert.equal(listing.total, 2);
  assert.equal(listing.totalSize, 2400);
  assert.equal(listing.entries[0].directory, true);
  assert.equal(listing.entries[1].name, 'docs/звіт.pdf');
});

test('ZIP preview rejects traversal absolute and Windows-drive paths', () => {
  const context = parserContext();
  for (const name of ['../secret.txt', '/etc/passwd', 'C:/secret.txt', 'safe/../../secret.txt']) {
    assert.throws(
      () => context.zipArchiveEntries(zipFixture([{ name }])),
      /небезпечний шлях/
    );
  }
});

test('ZIP preview rejects encrypted and strong-encryption flags', () => {
  const context = parserContext();
  for (const flags of [1, 64]) {
    assert.throws(
      () => context.zipArchiveEntries(zipFixture([{ name: 'secret.txt', flags }])),
      /Зашифрований ZIP/
    );
  }
});

test('ZIP preview rejects Unix symbolic links', () => {
  const context = parserContext();
  const madeByUnix = 3 << 8;
  const symlinkMode = (0o120777 << 16) >>> 0;
  assert.throws(
    () => context.zipArchiveEntries(zipFixture([
      { name: 'link', madeBy: madeByUnix, externalAttributes: symlinkMode },
    ])),
    /symbolic link/
  );
});

test('ZIP preview rejects excessive entries and ZIP64 sentinels', () => {
  const context = parserContext();
  const many = Array.from({ length: 201 }, (_, index) => ({ name: `file-${index}.txt` }));
  assert.throws(() => context.zipArchiveEntries(zipFixture(many)), /забагато записів/);
  assert.throws(
    () => context.zipArchiveEntries(zipFixture([
      { name: 'large.bin', size: 0xffffffff, compressedSize: 0xffffffff },
    ])),
    /ZIP64/
  );
});

test('ZIP preview rejects per-entry aggregate and compression-ratio bombs', () => {
  const context = parserContext();
  assert.throws(
    () => context.zipArchiveEntries(zipFixture([
      { name: 'large.bin', size: 51 * 1024 * 1024, compressedSize: 20 * 1024 * 1024 },
    ])),
    /Окремий ZIP-запис завеликий/
  );
  assert.throws(
    () => context.zipArchiveEntries(zipFixture([
      { name: 'a.bin', size: 50 * 1024 * 1024, compressedSize: 25 * 1024 * 1024 },
      { name: 'b.bin', size: 50 * 1024 * 1024, compressedSize: 25 * 1024 * 1024 },
      { name: 'c.bin', size: 1, compressedSize: 1 },
    ])),
    /Сумарний розмір ZIP завеликий/
  );
  assert.throws(
    () => context.zipArchiveEntries(zipFixture([
      { name: 'ratio.bin', size: 2 * 1024 * 1024, compressedSize: 1 },
    ])),
    /співвідношення стиснення/
  );
});

test('ZIP preview rejects multi-disk and inconsistent central directories', () => {
  const context = parserContext();
  assert.throws(
    () => context.zipArchiveEntries(zipFixture([{ name: 'a.txt' }], { diskNumber: 1 })),
    /Багатотомний ZIP/
  );
  assert.throws(
    () => context.zipArchiveEntries(zipFixture([{ name: 'a.txt' }], { centralSize: 1 })),
    /пошкоджений запис|неузгоджений розмір/
  );
});

test('preview source caps archive reads, never extracts, and sandboxes PDF', () => {
  const previewSource = sourceBetween(
    '      function attachmentPreviewFallback(message) {',
    '      async function openAttachmentPreview(attachment, message, index, trigger) {'
  );
  assert.match(previewSource, /archiveBytes:\s*8 \* 1024 \* 1024/);
  assert.match(previewSource, /лише metadata, без розпакування/);
  assert.match(previewSource, /sandbox:\s*""/);
  assert.doesNotMatch(previewSource, /decompress|extract|eval\(|new Function/);
});

test('SVG uses escaped text preview rather than an active image surface', () => {
  const typeSource = sourceBetween(
    '      function attachmentTypeInfo(attachment) {',
    '      function incomingAttachmentRequest(attachment, message) {'
  );
  const context = vm.createContext({
    safeText(value) { return value == null ? '' : String(value); },
  });
  vm.runInContext(typeSource, context);
  assert.equal(context.attachmentTypeInfo({ name: 'diagram.svg', mimeType: 'image/svg+xml' }).preview, 'text');
  assert.equal(context.attachmentTypeInfo({ name: 'photo.png', mimeType: 'image/png' }).preview, 'image');
});
