const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const repo = path.resolve(__dirname, '..', '..');
const bridge = fs.readFileSync(path.join(repo, 'versie-001-staging-acceptance-20260722-v62.html'), 'utf8');
const menu = fs.readFileSync(path.join(repo, 'tools', 'update_bot_menu_versie_001.py'), 'utf8');
const stagingBackend = 'https://script.google.com/macros/s/AKfycbzoDKJ4kNLId_RauWykG8jNlWycPho47VIoVI5mOyPhbCiArz2MLS-1Jarp3fgk8olO/exec';
const stagingLauncher = 'https://tarasevych.github.io/gmail-telegram-controls/versie-001-staging-acceptance-20260722-v62.html';
const productionLauncher = 'https://tarasevych.github.io/gmail-telegram-controls/?v=20260715-5&action=mailbox';

test('v62 staging bridge targets only the exact immutable staging deployment', () => {
  assert.ok(bridge.includes(stagingBackend));
  assert.match(bridge, /Gmail Versie 1 staging v62/);
  assert.match(bridge, /mailbox_bootstrap/);
  assert.match(bridge, /init_data/);
  assert.match(bridge, /form.method = 'post'/);
  assert.match(bridge, /noindex,nofollow,noarchive/);
  assert.doesNotMatch(bridge, /v61/);
});

test('owner menu updater no longer selects historical v62 staging', () => {
  assert.ok(!menu.includes('STAGING_URL = "' + stagingLauncher + '"'));
  assert.ok(menu.includes('PRODUCTION_URL = "' + productionLauncher + '"'));
});
