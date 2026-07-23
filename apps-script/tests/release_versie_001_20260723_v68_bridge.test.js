const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const repo = path.resolve(__dirname, '..', '..');
const bridge = fs.readFileSync(
  path.join(repo, 'versie-001-staging-acceptance-20260723-v68.html'),
  'utf8',
);
const stagingBackend = 'https://script.google.com/macros/s/AKfycbzUJG_vO94llULIoCgu47VNJKSl0cCuymEbr_xpTWTGOXKti7NhPRqzS_mbqziA8cJf/exec';

test('v68 staging bridge targets only the exact immutable staging deployment', () => {
  assert.ok(bridge.includes(stagingBackend));
  assert.match(bridge, /Gmail Versie 1 staging v68/);
  assert.match(bridge, /mailbox_bootstrap/);
  assert.match(bridge, /init_data/);
  assert.match(bridge, /form.method = 'post'/);
  assert.match(bridge, /data-mailbox-handoff/);
  assert.match(bridge, /__gtMailboxHandoff\.submitted/);
  assert.match(bridge, /if \(window\.__gtMailboxHandoff\.submitted\) return/);
  assert.match(bridge, /noindex,nofollow,noarchive/);
  assert.doesNotMatch(bridge, /v65|v67/);
});
