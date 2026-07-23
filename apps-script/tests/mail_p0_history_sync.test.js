const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const serverSource = fs.readFileSync(path.join(__dirname, "..", "MailClient.gs"), "utf8");
const clientSource = fs.readFileSync(path.join(__dirname, "..", "MailApp.html"), "utf8");

function extractFunction(source, name) {
  const start = source.indexOf("function " + name + "(");
  assert.notEqual(start, -1, "missing function " + name);
  const tail = source.slice(start + 10);
  const nextMatch = /\r?\n(?: {6})?function [A-Za-z0-9_]+\(/.exec(tail);
  const next = nextMatch ? start + 10 + nextMatch.index : source.length;
  return source.slice(start, next);
}

function serverRuntime(apiRequest) {
  const context = {
    gmailApiRequest_: apiRequest,
    mailboxAssertAllowedKeys_(value, allowed) {
      Object.keys(value || {}).forEach(key => assert.ok(allowed.includes(key), "unexpected key " + key));
    },
    mailboxError_(code, message) {
      const error = new Error(message);
      error.code = code;
      return error;
    },
    mailboxSafePageToken_(value) {
      const token = String(value || "");
      if (!/^[A-Za-z0-9_-]{1,512}$/.test(token)) throw new Error("invalid page token");
      return token;
    }
  };
  vm.createContext(context);
  [
    "mailboxHistoryCursor_",
    "mailboxHistoryChangeSet_",
    "mailboxMergeHistoryChangeSet_",
    "mailboxCurrentHistoryBaseline_",
    "mailboxHistoryDelta_"
  ].forEach(name => vm.runInContext(extractFunction(serverSource, name), context));
  return context;
}

test("history delta preserves opaque decimal cursor and deduplicates changed entities", () => {
  const paths = [];
  const runtime = serverRuntime(requestPath => {
    paths.push(requestPath);
    return {
      historyId: "900719925474099312345",
      history: [{
        messagesAdded: [{ message: { id: "m_1", threadId: "t_1" } }],
        labelsAdded: [{ message: { id: "m_1", threadId: "t_1" } }]
      }]
    };
  });
  const result = runtime.mailboxHistoryDelta_({
    startHistoryId: "900719925474099300001",
    maxResults: 200
  });
  assert.equal(result.changed, true);
  assert.equal(result.requiresFullSync, false);
  assert.equal(result.historyId, "900719925474099312345");
  assert.deepEqual(Array.from(result.changedMessageIds), ["m_1"]);
  assert.deepEqual(Array.from(result.changedThreadIds), ["t_1"]);
  assert.match(paths[0], /startHistoryId=900719925474099300001/);
  assert.equal((paths[0].match(/historyTypes=/g) || []).length, 4);
});

test("missing or stale history cursor returns a safe full-sync baseline", () => {
  let profileReads = 0;
  const missing = serverRuntime(requestPath => {
    assert.equal(requestPath, "/profile");
    profileReads += 1;
    return { historyId: "801" };
  }).mailboxHistoryDelta_({ startHistoryId: "" });
  assert.equal(missing.requiresFullSync, true);
  assert.equal(missing.reason, "MISSING_HISTORY_CURSOR");
  assert.equal(missing.historyId, "801");

  const stale = serverRuntime(requestPath => {
    if (requestPath === "/profile") {
      profileReads += 1;
      return { historyId: "802" };
    }
    const error = new Error("expired");
    error.gmailHttpStatus = 404;
    throw error;
  }).mailboxHistoryDelta_({ startHistoryId: "700" });
  assert.equal(stale.requiresFullSync, true);
  assert.equal(stale.reason, "STALE_HISTORY_CURSOR");
  assert.equal(stale.historyId, "802");
  assert.equal(profileReads, 2);
});

test("bounded pagination fails closed to a full list refresh", () => {
  let page = 0;
  const runtime = serverRuntime(() => {
    page += 1;
    return {
      historyId: String(900 + page),
      nextPageToken: "page_" + page,
      history: [{ messagesAdded: [{ message: { id: "m" + page, threadId: "t" + page } }] }]
    };
  });
  const result = runtime.mailboxHistoryDelta_({ startHistoryId: "800", maxResults: 100 });
  assert.equal(page, 3);
  assert.equal(result.requiresFullSync, true);
  assert.equal(result.reason, "HISTORY_PAGE_LIMIT");
  assert.equal(result.historyId, "903");
  assert.equal(result.changedThreadIds.length, 3);
});

test("client routes history reads through account-scoped single-flight state", () => {
  assert.match(clientSource, /op:\s*"historyDelta",\s*connectionId:\s*safeId\(input\.connectionId\)/);
  assert.match(clientSource, /\["bootstrap",\s*"listThreads",\s*"getThread",\s*"historyDelta"/);
  assert.match(clientSource, /p0WriteRecord\("history",\s*key,\s*namespace/);
  assert.match(clientSource, /if\s*\(p0Runtime\.historyPromise\)\s*return p0Runtime\.historyPromise/);
  const revalidate = extractFunction(clientSource, "p0RevalidateVisible");
  assert.match(revalidate, /p0ReconcileHistory\(\)/);
  assert.doesNotMatch(revalidate, /loadThreads\(/);
});

test("history account selection cannot escape the active account set", () => {
  const context = {
    safeId(value) {
      const id = String(value || "");
      return /^[A-Za-z0-9_-]{1,128}$/.test(id) ? id : "";
    },
    state: {
      unifiedMode: true,
      accounts: [{ id: "a1" }, { id: "a2" }],
      account: { id: "a1" },
      accountSettings: { unifiedConnectionIds: ["a2", "foreign", "a1", "a2"] }
    }
  };
  vm.createContext(context);
  vm.runInContext(extractFunction(clientSource, "p0HistoryConnectionIds"), context);
  assert.deepEqual(Array.from(context.p0HistoryConnectionIds()), ["a2", "a1"]);
  context.state.unifiedMode = false;
  context.state.account = { id: "foreign" };
  assert.deepEqual(Array.from(context.p0HistoryConnectionIds()), []);
});
