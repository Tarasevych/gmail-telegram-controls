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

test("metadata batch returns exact changed summaries and explicit missing IDs", () => {
  const calls = [];
  const context = {
    mailboxAssertAllowedKeys_(value, allowed) {
      Object.keys(value || {}).forEach(key => assert.ok(allowed.includes(key)));
    },
    mailboxError_(code, message) {
      const error = new Error(message);
      error.code = code;
      return error;
    },
    mailboxMetadataQuery_(headers) {
      calls.push(["query", headers]);
      return "?format=metadata";
    },
    mailboxFetchThreadMetadataBatch_(references, query) {
      calls.push(["batch", references, query]);
      return [
        { id: "thread_1", messages: [{ id: "m1", labelIds: ["INBOX"] }] },
        null
      ];
    },
    mailboxThreadSummaryFromResource_(reference, resource) {
      return {
        dto: { id: reference.id, labelIds: resource.messages[0].labelIds, timestamp: 200 },
        summarySource: "source"
      };
    },
    mailboxTranslateSummariesUk_(values) {
      return values.map(() => "Підсумок");
    },
    mailboxFinalizeThreadSummary_(dto, summary) {
      return Object.assign({}, dto, { summary });
    }
  };
  vm.createContext(context);
  vm.runInContext(extractFunction(serverSource, "mailboxChangedThreadSummaries_"), context);
  const result = context.mailboxChangedThreadSummaries_({
    threadIds: ["thread_1", "thread_2"]
  });
  assert.deepEqual(Array.from(result.threads, item => item.id), ["thread_1"]);
  assert.deepEqual(Array.from(result.missingThreadIds), ["thread_2"]);
  assert.deepEqual(calls[1][1].map(item => item.id), ["thread_1", "thread_2"]);
  assert.equal(calls[1][2], "?format=metadata");
});

test("metadata batch is bounded, unique, viewer-only, and read-only", () => {
  const source = extractFunction(serverSource, "mailboxChangedThreadSummaries_");
  assert.match(source, /payload\.threadIds\.length > 20/);
  assert.match(source, /seen\.has\(id\)/);
  assert.match(source, /mailboxFetchThreadMetadataBatch_/);
  assert.doesNotMatch(source, /gmailApiRequest_|\bpost\b|\bput\b|\bdelete\b/);
  assert.match(serverSource, /'list', 'historyDelta', 'threadSummaries'/);
  assert.match(serverSource, /'list', 'historyDelta', 'threadSummaries', 'thread'/);
});

test("simple Inbox merge preserves cached body and updates only matching account rows", () => {
  const context = {
    safeId(value) {
      const id = String(value || "");
      return /^[A-Za-z0-9_-]{1,128}$/.test(id) ? id : "";
    },
    Set,
    Map,
    Array,
    Number,
    Object
  };
  vm.createContext(context);
  vm.runInContext(extractFunction(clientSource, "p0ThreadTimestampValue"), context);
  vm.runInContext(extractFunction(clientSource, "p0SimpleInboxMerge_"), context);
  const existing = [
    { id: "thread_1", accountId: "a1", timestamp: 100, labelIds: ["INBOX"], cachedBody: "keep" },
    { id: "thread_2", accountId: "a1", timestamp: 90, labelIds: ["INBOX"], cachedBody: "remove" },
    { id: "thread_x", accountId: "a2", timestamp: 80, labelIds: ["INBOX"], cachedBody: "foreign" }
  ];
  const merged = context.p0SimpleInboxMerge_(
    existing,
    [
      { id: "thread_1", timestamp: 110, labelIds: ["INBOX", "STARRED"] },
      { id: "thread_3", timestamp: 120, labelIds: ["INBOX", "UNREAD"] }
    ],
    ["thread_2"],
    "a1",
    { minimumTimestamp: 90, capacity: 3 }
  );
  assert.deepEqual(Array.from(merged, item => item.id), ["thread_3", "thread_1", "thread_x"]);
  assert.equal(merged.find(item => item.id === "thread_1").cachedBody, "keep");
  assert.equal(merged.find(item => item.id === "thread_x").cachedBody, "foreign");
  assert.equal(merged.some(item => item.id === "thread_2"), false);
});

test("simple Inbox gate rejects query, filter, label, shared, full-sync, and oversized deltas", () => {
  const context = {
    state: {
      unifiedMode: false,
      currentFolderId: "INBOX",
      currentLabelId: "",
      query: "",
      filter: "all"
    },
    safeId(value) { return String(value || "").replace(/[^A-Za-z0-9_-]/g, ""); },
    safeText(value) { return String(value || ""); },
    safeMailboxFilter(value) { return value || "all"; },
    Array
  };
  vm.createContext(context);
  vm.runInContext(extractFunction(clientSource, "p0CanApplySimpleInboxDelta"), context);
  const result = {
    changed: true,
    requiresFullSync: false,
    changedThreadIds: ["thread_1"]
  };
  assert.equal(context.p0CanApplySimpleInboxDelta([result]), true);
  context.state.query = "from:test";
  assert.equal(context.p0CanApplySimpleInboxDelta([result]), false);
  context.state.query = "";
  context.state.unifiedMode = true;
  assert.equal(context.p0CanApplySimpleInboxDelta([result]), false);
  context.state.unifiedMode = false;
  assert.equal(context.p0CanApplySimpleInboxDelta([
    Object.assign({}, result, { requiresFullSync: true })
  ]), false);
  assert.equal(context.p0CanApplySimpleInboxDelta([
    Object.assign({}, result, { changedThreadIds: Array.from({ length: 21 }, (_, index) => "t" + index) })
  ]), false);
});

test("history events distinguish body changes from label-only changes", () => {
  const source = extractFunction(serverSource, "mailboxHistoryChangeSet_");
  assert.match(source, /messagesAdded[\s\S]*messageAdded/);
  assert.match(source, /labelsAdded[\s\S]*labelAdded/);
  assert.match(clientSource, /selectedChange\.messageChanged[\s\S]*selectedChange\.messageAdded[\s\S]*selectedChange\.messageDeleted/);
  assert.doesNotMatch(
    clientSource.slice(
      clientSource.indexOf("if (selectedSummary"),
      clientSource.indexOf("window.setTimeout(p0PrefetchVisibleThreads", clientSource.indexOf("if (selectedSummary"))
    ),
    /labelAdded[\s\S]*openThread/
  );
});
