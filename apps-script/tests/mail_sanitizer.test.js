const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const source = [
  fs.readFileSync(path.join(root, 'Code.gs'), 'utf8'),
  fs.readFileSync(path.join(root, 'MailClient.gs'), 'utf8'),
].join('\n');
const context = vm.createContext({ console, URL, Set, Map });
vm.runInContext(source, context, { filename: 'Code.gs+MailClient.gs' });

test('mail HTML sanitizer rejects active and obfuscated content while preserving safe links', () => {
  const hostile = [
    '<script>alert(1)</script>',
    '<style>body{display:none}</style>',
    '<svg onload=alert(1)><a xlink:href="javascript:alert(1)">svg</a></svg>',
    '<math href="javascript:alert(1)"><mi>x</mi></math>',
    '<img src=x onerror=alert(1)>',
    '<iframe srcdoc="<script>alert(1)</script>"></iframe>',
    '<object data="data:text/html,boom"></object>',
    '<form action="https://attacker.example"><input name=x></form>',
    '<base href="https://attacker.example/">',
    '<meta http-equiv="refresh" content="0;url=https://attacker.example">',
    '<a href="jav&#x61;script:alert(1)" onclick="alert(1)">bad-js</a>',
    '<a href="data:text/html;base64,PHNjcmlwdD4=" style="color:red">bad-data</a>',
    '<div onmouseover="alert(1)" style="background:url(javascript:alert(1))">text</div>',
    '<a href="https://safe.example/path?a=1&amp;b=2" onclick="steal()" style="display:none">safe web</a>',
    '<a href="mailto:person@example.com?subject=Hello" onfocus="steal()">safe mail</a>',
  ].join('');

  const cleaned = context.mailboxSanitizeHtml_(hostile);
  assert.doesNotMatch(cleaned, /<(?:script|style|svg|math|img|iframe|object|embed|form|input|base|meta|link)\b/i);
  assert.doesNotMatch(cleaned, /\b(?:onerror|onload|onclick|onfocus|onmouseover|srcdoc|style|src|data|action)\s*=/i);
  assert.doesNotMatch(cleaned, /(?:javascript|vbscript|data\s*:)\s*/i);
  assert.match(
    cleaned,
    /<a href="https:\/\/safe\.example\/path\?a=1&amp;b=2" target="_blank" rel="noopener noreferrer">safe web<\/a>/
  );
  assert.match(
    cleaned,
    /<a href="mailto:person@example\.com\?subject=Hello" target="_blank" rel="noopener noreferrer">safe mail<\/a>/
  );
  assert.match(cleaned, /<div>text<\/div>/);
});

test('mail HTML sanitizer preserves bounded email layout styles and legacy table attributes', () => {
  const original = [
    '<table width="100%" bgcolor="#fff" align="center" ',
    'style="max-width:640px;border-collapse:collapse;position:fixed">',
    '<tr><td style="padding:16px;line-height:1.5;vertical-align:top">',
    '<div style="background-color:#f5f5f5;border:1px solid #ddd;',
    'border-radius:8px;margin:0 auto;max-width:600px;',
    'background-image:url(https://tracker.example/pixel)">Original layout</div>',
    '</td></tr></table>',
  ].join('');
  const cleaned = context.mailboxSanitizeHtml_(original);
  assert.match(cleaned, /<table style="background-color:#fff;border-collapse:collapse;max-width:640px;text-align:center;width:100%">/);
  assert.match(cleaned, /<td style="line-height:1.5;padding:16px;vertical-align:top">/);
  assert.match(cleaned, /<div style="background-color:#f5f5f5;border:1px solid #ddd;border-radius:8px;margin:0px auto;max-width:600px">Original layout<\/div>/);
  assert.doesNotMatch(cleaned, /position:fixed|background-image|tracker\.example/i);
});
