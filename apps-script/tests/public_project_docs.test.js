const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..', '..');
function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

test('Versie 1 public project guide has synchronized Ukrainian and English control files', () => {
  const pairs = ['README.md', 'VERSIONING.md', 'PROJECT.md', 'ROADMAP.md', 'ISSUES.md', 'releases/VERSIE-001-2026-07-19.md'];
  for (const relativePath of pairs) {
    const uk = read(path.join('docs', 'uk', relativePath));
    const en = read(path.join('docs', 'en', relativePath));
    assert.match(uk, /Versie 1/);
    assert.match(en, /Versie 1/);
    assert.match(uk, /2026-07-19/);
    assert.match(en, /2026-07-19/);
  }
});

test('problem registers keep identical IDs and public docs contain no credential material', () => {
  const uk = read(path.join('docs', 'uk', 'ISSUES.md'));
  const en = read(path.join('docs', 'en', 'ISSUES.md'));
  const ids = Array.from(uk.matchAll(/GT-\d{3}/g), (match) => match[0]);
  assert.deepEqual(ids, Array.from(en.matchAll(/GT-\d{3}/g), (match) => match[0]));
  assert.deepEqual(ids, ['GT-001', 'GT-002', 'GT-003', 'GT-004', 'GT-005', 'GT-006', 'GT-007', 'GT-008', 'GT-009']);
  const publicDocs = [uk, en, read('docs/uk/PROJECT.md'), read('docs/en/PROJECT.md')].join('\n');
  assert.doesNotMatch(publicDocs, /refresh_token\s*[:=]|client_secret\s*[:=]|4\/0A[A-Za-z0-9_-]{20,}|\b\d{8,12}:[A-Za-z0-9_-]{30,}\b/i);
});
