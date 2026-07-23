const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const appRoot = path.join(__dirname, "..");
const codeSource = fs.readFileSync(path.join(appRoot, "Code.gs"), "utf8");
const mailClientSource = fs.readFileSync(path.join(appRoot, "MailClient.gs"), "utf8");
const mailAppSource = fs.readFileSync(path.join(appRoot, "MailApp.html"), "utf8");
const serverSource = codeSource + "\n" + mailClientSource;

function extractTopLevelFunction(source, name) {
  const marker = "function " + name + "(";
  const start = source.indexOf(marker);
  assert.notEqual(start, -1, "missing function " + name);
  const next = source.indexOf("\nfunction ", start + marker.length);
  return source.slice(start, next === -1 ? source.length : next);
}

function loadServerSanitizer() {
  const pending = ["mailboxSanitizeHtml_"];
  const discovered = new Set();
  const snippets = [];
  while (pending.length) {
    const name = pending.shift();
    if (discovered.has(name)) continue;
    discovered.add(name);
    const snippet = extractTopLevelFunction(serverSource, name);
    snippets.push(snippet);
    for (const match of snippet.matchAll(/\b((?:mailbox|decode)[A-Za-z0-9]+_)\s*\(/g)) {
      const dependency = match[1];
      if (!discovered.has(dependency) &&
          serverSource.indexOf("function " + dependency + "(") !== -1) {
        pending.push(dependency);
      }
    }
  }
  const context = vm.createContext({
    MAILBOX_CLIENT_CONFIG_: { MAX_HTML_CHARS: 500000 },
  });
  vm.runInContext(snippets.join("\n") + "\nthis.sanitize = mailboxSanitizeHtml_;", context);
  return context.sanitize;
}

test("reader fixture corpus preserves safe RTL, Unicode, tables, quotes, and signatures", () => {
  const sanitize = loadServerSanitizer();
  const fixtures = [
    '<div lang="uk"><table style="border-collapse:collapse"><tr><td style="text-align:right">Рахунок № 42</td></tr></table></div>',
    '<blockquote dir="rtl" lang="ar"><p>مرحبا بالعالم</p><div>— التوقيع</div></blockquote>',
    '<div><h1>Newsletter</h1><p style="font-weight:700">Résumé — こんにちは</p></div>',
  ];
  const sanitized = fixtures.map((fixture) => sanitize(fixture)).join("\n");
  assert.match(sanitized, /dir="rtl"/);
  assert.match(sanitized, /lang="ar"/);
  assert.match(sanitized, /lang="uk"/);
  assert.match(sanitized, /<table/);
  assert.match(sanitized, /Рахунок № 42/);
  assert.match(sanitized, /مرحبا بالعالم/);
  assert.match(sanitized, /Résumé — こんにちは/);
});

test("server sanitizer drops malformed direction, active content, events, and remote images", () => {
  const sanitize = loadServerSanitizer();
  const sanitized = sanitize(
    '<div dir="sideways" lang="../../x" onclick="steal()">' +
    '<script>steal()</script><img src="https://tracker.invalid/pixel">' +
    '<p>Readable fallback'
  );
  assert.doesNotMatch(sanitized, /sideways|\.\.\/|onclick|script|tracker\.invalid|<img/i);
  assert.match(sanitized, /Readable fallback/);
});

test("reader iframe accepts only authenticated attachment images and blob CSP", () => {
  const sandboxSource = extractTopLevelFunction(mailAppSource, "buildSandboxedMailDocument");
  assert.match(sandboxSource, /attachmentImageToken/);
  assert.match(sandboxSource, /image\.remove\(\)/);
  assert.doesNotMatch(sandboxSource, /safeUrl\(image\.getAttribute\("src"\)/);
  assert.match(sandboxSource, /img-src blob:/);
  assert.match(sandboxSource, /media-src 'none'/);
  assert.doesNotMatch(sandboxSource, /img-src https:|img-src[^;]*data:/);
});

test("reader direction fallback is content-derived and uses logical quote styling", () => {
  const sandboxSource = extractTopLevelFunction(mailAppSource, "buildSandboxedMailDocument");
  const bodySource = extractTopLevelFunction(mailAppSource, "setSanitizedMessageBody");
  assert.match(sandboxSource, /<body dir=\\"auto\\">/);
  assert.match(sandboxSource, /unicode-bidi:plaintext/);
  assert.match(sandboxSource, /padding-inline-start/);
  assert.match(sandboxSource, /border-inline-start/);
  assert.match(bodySource, /setAttribute\("dir", "auto"\)/);
});

test("MIME and DTO source keep alternative, plain fallback, and CID token boundaries", () => {
  assert.match(mailClientSource, /multipart\/alternative/);
  assert.match(mailClientSource, /bodyText:\s*plain/);
  assert.match(mailClientSource, /bodyHtml:\s*mailboxSanitizeHtml_/);
  assert.match(mailClientSource, /cidToAttachmentToken/);
  assert.match(mailClientSource, /allowedAttachmentTokens/);
  assert.doesNotMatch(mailClientSource, /bodyHtml:\s*mime\.html\s*[,}]/);
});

test("thread rendering retains explicit boundaries and reader scroll/focus anchors", () => {
  assert.match(mailAppSource, /details", \{ className: "quoted-history"/);
  assert.match(mailAppSource, /messages\.slice\(0, -1\)/);
  assert.match(mailAppSource, /p0MarkReaderMessageAnchors\(renderMessage/);
  assert.match(mailAppSource, /p0TrackReaderLayout\(scroll\)/);
  assert.match(mailAppSource, /focus\(\{ preventScroll: true \}\)/);
  assert.match(mailAppSource, /Показати оригінал листа й переписку/);
});
