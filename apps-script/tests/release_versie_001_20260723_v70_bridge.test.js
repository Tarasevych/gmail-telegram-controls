const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const repo = path.resolve(__dirname, '..', '..');
const bridge = fs.readFileSync(
  path.join(repo, 'versie-001-staging-acceptance-20260723-v70.html'),
  'utf8',
);
const menu = fs.readFileSync(path.join(repo, 'tools', 'update_bot_menu_versie_001.py'), 'utf8');
const stagingBackend = 'https://script.google.com/macros/s/AKfycbxpm1GtaRY9gu7wvp-lu8-1uX0z8_nYljgeaW6EN5vcL6Bm-0AzQmEnkLoB9UYmDksT/exec';
const stagingLauncher = 'https://tarasevych.github.io/gmail-telegram-controls/versie-001-staging-acceptance-20260723-v70.html';
const productionLauncher = 'https://tarasevych.github.io/gmail-telegram-controls/?v=20260715-5&action=mailbox';

test('v70 staging bridge targets only the exact immutable staging deployment', () => {
  assert.ok(bridge.includes(stagingBackend));
  assert.match(bridge, /Gmail Versie 1 staging v70/);
  assert.match(bridge, /mailbox_bootstrap/);
  assert.match(bridge, /init_data/);
  assert.match(bridge, /launch_started_ms/);
  assert.match(bridge, /startedAtEpochMs: Date\.now\(\)/);
  assert.match(bridge, /form.method = 'post'/);
  assert.match(bridge, /data-mailbox-handoff/);
  assert.match(bridge, /__gtMailboxHandoff\.submitted/);
  assert.match(bridge, /if \(window\.__gtMailboxHandoff\.submitted\) return/);
  assert.match(bridge, /noindex,nofollow,noarchive/);
  assert.doesNotMatch(bridge, /v65|v69/);
});

test('owner menu updater separates exact v70 staging from unchanged production', () => {
  assert.ok(menu.includes('STAGING_URL = "' + stagingLauncher + '"'));
  assert.ok(menu.includes('PRODUCTION_URL = "' + productionLauncher + '"'));
  assert.ok(menu.includes('"🧪 Пошта · Versie 1 v70"'));
  assert.ok(menu.includes('"📬 Пошта · Versie 1"'));
  assert.doesNotMatch(menu, /versie-001-staging-acceptance-20260723-v69\.html/);
});
