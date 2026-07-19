const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const helper = fs.readFileSync(path.join(root, 'tools', 'release_apps_script_v38_product_v46.ps1'), 'utf8');
const expected = {
  Code: 'a026265c4972578c626f0bc1e565708ce5d049daf282d87d76556f1a49d3ac2d',
  MultiAccount: '9f97b7ac0c72f38878c3c28a42f5a811c1875b91a5451d1a8fc34879b7b7ebd0',
  MailClient: 'f3ddbe75dfdae6a4f36a07f1c9eddd9ac556c21069efcffebb89a339680988c7',
  MailApp: '54d39b680e1770d64cf28e6cbe78df7f04d73033f3c436ac8d7496e2838e27a0',
  appsscript: '354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9',
};
test('product v46 helper pins stable v37 rollback and immutable v38 candidate', () => {
  assert.match(helper, /\$RollbackVersion = 37/);
  assert.match(helper, /\$CandidateVersion = 38/);
  assert.match(helper, /product v46: single delivery and direct OAuth return/);
  assert.match(helper, /v38-product-v46-release\.json/);
  assert.match(helper, /TarasevychGmailNotifierAppsScriptV38ProductV46Release/);
});

test('product v46 immutable history remains pinned after later source changes', () => {
  for (const value of Object.values(expected)) assert.match(helper, new RegExp(value));
});

