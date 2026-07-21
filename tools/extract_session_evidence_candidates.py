#!/usr/bin/env python3
"""Extract a private, sanitized evidence-candidate ledger from a chunk corpus."""

from __future__ import annotations

import argparse
import hashlib
import json
import re
from collections import Counter
from pathlib import Path


PATTERNS = {
    "card_capacity": re.compile(r"card.{0,30}capacit|capacity.{0,30}card|raw.{0,20}index", re.I),
    "locks": re.compile(r"UserLock|ScriptLock|shared.{0,20}lock|lease", re.I),
    "sent_dedupe": re.compile(r"SENT|sent.?copy|dedup|duplicate", re.I),
    "realtime": re.compile(r"realtime|real-time|upperBoundMs|frozen.{0,20}(?:scan|backlog)", re.I),
    "multi_account": re.compile(r"notificationConnectionIds|multi.?account|fan.?out|activeConnectionId", re.I),
    "retention": re.compile(r"retention|purge|compactTelegramMailCardIndex|delete_too_old", re.I),
    "oauth": re.compile(r"oauth|consent|callback|passkey|captcha|\bOTP\b|2FA", re.I),
    "release": re.compile(r"immutable|staging|rollback|preflight|production|deploy", re.I),
    "test_result": re.compile(r"\b\d{1,4}/\d{1,4}\b|tests? (?:passed|failed)|preflight.{0,20}(?:pass|fail)", re.I),
    "root_cause": re.compile(r"root cause|first cause|blocked.{0,20}realtime", re.I),
}
REDACTIONS = (
    (re.compile(r"https?://\S+", re.I), "[URL]"),
    (re.compile(r"\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b", re.I), "[EMAIL]"),
    (re.compile(r"[A-Z]:\\Users\\[^\s\"'<>]+", re.I), "[PATH]"),
    (re.compile(r"\b\d{8,}:[A-Za-z0-9_-]{20,}\b"), "[SECRET]"),
    (re.compile(r"\bAIza[A-Za-z0-9_-]{20,}\b"), "[SECRET]"),
)


def redact(text: str) -> str:
    for pattern, replacement in REDACTIONS:
        text = pattern.sub(replacement, text)
    return text


def digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def primary_rows(corpus: Path, chunk: dict):
    content = (corpus / chunk["path"]).read_text(encoding="utf-8")
    char_start = chunk.get("primary_char_start")
    if char_start is not None:
        yield int(chunk["primary_start_line"]), char_start, chunk.get("primary_char_end"), content
        return
    rows = content.splitlines()
    base = chunk.get("overlap_start_line") or chunk["primary_start_line"]
    for offset, text in enumerate(rows):
        line_no = int(base) + offset
        if int(chunk["primary_start_line"]) <= line_no <= int(chunk["primary_end_line"]):
            yield line_no, None, None, text


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--corpus", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    args = parser.parse_args()
    if args.output.exists():
        raise SystemExit(f"Output already exists: {args.output}")
    manifest = json.loads((args.corpus / "corpus-manifest.json").read_text(encoding="utf-8"))
    args.output.parent.mkdir(parents=True, exist_ok=True)
    counts = Counter()
    sources = Counter()
    hits = 0
    with args.output.open("w", encoding="utf-8", newline="\n") as handle:
        for source in manifest["sources"]:
            source_id = source["source_id"]
            for chunk in source["chunks"]:
                for line_no, char_start, char_end, text in primary_rows(args.corpus, chunk):
                    categories = [name for name, pattern in PATTERNS.items() if pattern.search(text)]
                    if not categories:
                        continue
                    hits += 1
                    sources[source_id] += 1
                    counts.update(categories)
                    handle.write(json.dumps({
                        "source_id": source_id,
                        "line": line_no,
                        "char_start": char_start,
                        "char_end": char_end,
                        "chunk_id": chunk["chunk_id"],
                        "categories": categories,
                        "quoted": text.lstrip().startswith(">"),
                        "text": redact(text),
                    }, ensure_ascii=False, separators=(",", ":")) + "\n")
    summary = {
        "schema_version": 1,
        "request": "REQ-0012",
        "hits": hits,
        "by_source": dict(sorted(sources.items())),
        "by_category": dict(sorted(counts.items())),
        "sha256": digest(args.output),
        "raw_sources_published": False,
    }
    summary_path = args.output.with_suffix(args.output.suffix + ".summary.json")
    summary_path.write_text(json.dumps(summary, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(summary, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
