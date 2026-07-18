'use strict';
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const test = require('node:test');
const root = path.resolve(__dirname, '..');
const releasePath = path.join(root, 'tools', 'release_apps_script_v33_product_v38_session_hotfix.ps1');
const release = fs.readFileSync(releasePath, 'utf8').replace(/\r\n?/g, '\n');
const files = {Code:'Code.gs',MultiAccount:'MultiAccount.gs',MailClient:'MailClient.gs',MailApp:'MailApp.html',appsscript:'appsscript.json'};
const expected = {
  Code:'8f0136d0531ce7be3dc789a5c154db3e76da6c38f754708f05dc61ae250365ad',
  MultiAccount:'524cd5f5e7e57ff2313036da77afc3a57bd03d397e56232e32c2cbf34debaf13',
  MailClient:'097c5698886400bfc8b6e59edc9a11d5b011494887243668b07a132b40ad013f',
  MailApp:'d6d64a860392a4932ab7691dad81c0fbd667fd1251de457355b553334f458f67',
  appsscript:'354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9'
};
function hash(file){return crypto.createHash('sha256').update(fs.readFileSync(path.join(root,file),'utf8').replace(/\r\n?/g,'\n')).digest('hex')}
function table(name){const m=release.match(new RegExp(`\\$${name}\\s*=\\s*@\\{([\\s\\S]*?)\\n\\}`));assert.ok(m);return Object.fromEntries([...m[1].matchAll(/^\s*(Code|MultiAccount|MailClient|MailApp|appsscript)\s*=\s*'([a-f0-9]{64})'/gm)].map(x=>[x[1],x[2]]))}
test('v33 release pins the exact session hotfix',()=>{
  assert.match(release,/\$ExpectedOldVersion = 32\b/);assert.match(release,/\$ExpectedNewVersion = 33\b/);
  assert.deepEqual(table('ExpectedCandidateHashes'),expected);
  assert.deepEqual(Object.fromEntries(Object.entries(files).map(([k,v])=>[k,hash(v)])),expected);
  assert.match(release,/owner-only session capacity recovery/);
  assert.match(release,/019f5d65-8209-7a00-b915-4a522dbcb612-v33-product-v38-session-hotfix-release\.json/);
});
test('v33 release is GET-only in preflight and at-most-once guarded',()=>{
  assert.match(release,/if \(\$PreflightOnly -and \$Method -ne 'GET'\)/);
  assert.equal(release.split('POST "$base/versions"').length-1,1);
  assert.equal(release.split('POST "$base/deployments"').length-1,1);
  assert.ok(release.indexOf("Write-Journal 'version_create_reserved'")<release.indexOf('POST "$base/versions"'));
  assert.ok(release.indexOf("Write-Journal 'staging_create_reserved'")<release.indexOf('POST "$base/deployments"'));
  assert.match(release,/Cannot promote without exact immutable v33, one staging deployment, and acceptance journal/);
  const cmd=`$e=$null;$t=$null;[Management.Automation.Language.Parser]::ParseFile('${releasePath.replace(/'/g,"''")}',[ref]$t,[ref]$e)|Out-Null;if($e.Count){$e|% Message;exit 1}`;
  const parsed=spawnSync('pwsh',['-NoProfile','-Command',cmd],{encoding:'utf8'});assert.equal(parsed.status,0,parsed.stdout+parsed.stderr);
  assert.doesNotMatch(release,/(?:ya29\.|1\\\/\\\/)[A-Za-z0-9._-]{20,}|\b\d{8,12}:AA[A-Za-z0-9_-]{30,}\b/);
});
