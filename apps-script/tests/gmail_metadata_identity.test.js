const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');


const SOURCE = fs.readFileSync(
  path.join(__dirname, '..', 'MailClient.gs'),
  'utf8'
);


test('metadata batch selects the active Gmail connection token', () => {
  const match = SOURCE.match(
    /function mailboxFetchThreadMetadataBatch_\([\s\S]*?const requests = items\.map/
  );
  assert.ok(match, 'mailboxFetchThreadMetadataBatch_ must remain inspectable');
  assert.match(match[0], /mailboxCurrentSessionContext_/);
  assert.match(match[0], /mailboxMultiGmailAccessToken_\(mailboxCurrentSessionContext_\)/);
  assert.doesNotMatch(match[0], /const token = ScriptApp\.getOAuthToken\(\);/);
});
