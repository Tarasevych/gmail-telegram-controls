const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const repo = path.resolve(__dirname, '..', '..');
const bridge = fs.readFileSync(path.join(repo, 'versie-001-staging-acceptance-20260722-v61.html'), 'utf8');
const stagingBackend = 'https://script.google.com/macros/s/AKfycbyAYlzZ_g2iuN7OwJdxudPPEg32kW63oK2eMgzw6XczeAzvqfME-N5jbTOkicqE_Ks8/exec';

test('v61 staging bridge targets only the exact immutable staging deployment', () => {
  assert.ok(bridge.includes(stagingBackend));
  assert.match(bridge, /Gmail Versie 1 staging v61/);
  assert.match(bridge, /mailbox_bootstrap/);
  assert.match(bridge, /init_data/);
  assert.match(bridge, /form.method = 'post'/);
  assert.match(bridge, /noindex,nofollow,noarchive/);
  assert.doesNotMatch(bridge, /v59/);
  assert.doesNotMatch(bridge, /v62/);
});
