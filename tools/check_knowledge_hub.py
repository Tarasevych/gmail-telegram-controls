#!/usr/bin/env python3
"""Validate the bilingual deep-research knowledge hub."""

from __future__ import annotations

import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
UK = ROOT / "docs" / "uk" / "knowledge-hub"
EN = ROOT / "docs" / "en" / "knowledge-hub"
META = ROOT / "docs" / "knowledge-hub"
EXPECTED = {"R1-": 74, "R2-": 79, "R3-": 142}
REQUIRED = {
    "README.md", "SOURCE_MANIFEST.md", "TRACEABILITY.md", "MASTER_ROADMAP.md",
    "INSTRUCTIONS.md", "PERMISSIONS.md", "PRODUCT.md", "PROBLEMS.md",
    "DECISIONS.md", "LESSONS.md", "EVIDENCE.md", "HISTORY.md",
    "DEPENDENCIES.md", "SESSION_EVIDENCE.md", "sources/REPORT-1.md", "sources/REPORT-2.md",
    "sources/REPORT-3.md",
}
SOURCE_ID = re.compile(r"\bR[123]-[A-Z0-9-]*\d+\b")
LINK = re.compile(r"\[[^\]]*\]\(([^)]+)\)")
SECRET_PATTERNS = {
    "private Windows path": re.compile(r"[A-Za-z]:\\Users\\", re.IGNORECASE),
    "email address": re.compile(r"\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b", re.IGNORECASE),
    "Google API key": re.compile(r"\bAIza[0-9A-Za-z_-]{20,}\b"),
    "Telegram bot token": re.compile(r"\b\d{8,}:[0-9A-Za-z_-]{20,}\b"),
    "private key": re.compile(r"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----"),
}


def main() -> int:
    errors: list[str] = []
    uk_pages = {p.relative_to(UK) for p in UK.rglob("*.md")}
    en_pages = {p.relative_to(EN) for p in EN.rglob("*.md")}
    if uk_pages != en_pages:
        errors.append(f"Language pair mismatch: uk_only={sorted(uk_pages-en_pages)} en_only={sorted(en_pages-uk_pages)}")
    missing = REQUIRED - {p.as_posix() for p in uk_pages}
    if missing:
        errors.append(f"Missing required pages: {sorted(missing)}")

    all_paths = sorted([*UK.rglob("*.md"), *EN.rglob("*.md")])
    content = {p: p.read_text(encoding="utf-8") for p in all_paths}
    for path, text in content.items():
        if "REQ-0003" not in text:
            errors.append(f"Missing source request marker: {path.relative_to(ROOT)}")
        for label, pattern in SECRET_PATTERNS.items():
            if pattern.search(text):
                errors.append(f"Potential {label}: {path.relative_to(ROOT)}")
        for target in LINK.findall(text):
            clean = target.split("#", 1)[0]
            if not clean or re.match(r"^[a-z]+://", clean, re.IGNORECASE) or clean.startswith("mailto:"):
                continue
            if not (path.parent / clean).resolve().exists():
                errors.append(f"Broken link: {path.relative_to(ROOT)} -> {target}")

    source_ids: set[str] = set()
    for lang_root in (UK, EN):
        ids: set[str] = set()
        for path in (lang_root / "sources").glob("REPORT-*.md"):
            ids.update(SOURCE_ID.findall(content[path]))
        counts = {prefix: sum(item.startswith(prefix) for item in ids) for prefix in EXPECTED}
        if counts != EXPECTED:
            errors.append(f"Wrong source dossier counts in {lang_root.name}: {counts}")
        if not source_ids:
            source_ids = ids
        elif source_ids != ids:
            errors.append("UK and EN source dossier IDs differ")

        trace_ids = SOURCE_ID.findall(content[lang_root / "TRACEABILITY.md"])
        trace_set = set(trace_ids)
        if trace_set != ids:
            errors.append(f"Traceability coverage mismatch in {lang_root.name}")
        duplicates = [item for item in trace_set if trace_ids.count(item) != 1]
        if duplicates:
            errors.append(f"Traceability IDs are not exact-once in {lang_root.name}: {duplicates[:10]}")

    for name in ("catalog.json", "manifest.json"):
        path = META / name
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
        except Exception as exc:
            errors.append(f"Invalid {name}: {exc}")
            continue
        if data.get("unique_source_id_count") != 295:
            errors.append(f"{name} unique_source_id_count is not 295")

    manifest = json.loads((META / "manifest.json").read_text(encoding="utf-8"))
    category_counts = manifest.get("canonical_counts_by_category", [])
    if isinstance(category_counts, dict):
        canonical_total = sum(category_counts.values())
    else:
        canonical_total = sum(item.get("count", 0) for item in category_counts)
    if canonical_total != 245:
        errors.append("Canonical category count does not total 245")
    if manifest.get("unresolved_conflict_count") != 8:
        errors.append("Unresolved conflict count does not equal 8")
    integration = manifest.get("integration", {})
    if integration.get("request_id") != "REQ-0003" or integration.get("release_authorized") is not False:
        errors.append("Integration metadata is missing the REQ-0003 no-release gate")

    if errors:
        print("Knowledge hub check failed:")
        for error in errors:
            print(f"- {error}")
        return 1
    print(
        f"Knowledge hub check passed: {len(uk_pages)} language pairs, "
        "295 source IDs, 245 canonical items, 8 explicit conflicts"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
