#!/usr/bin/env python3
"""Validate the separate, bilingual, secret-free owner request ledger."""

from __future__ import annotations

import re
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
INDEX = REPO_ROOT / "REQUESTS.md"
STATIC_PAGES = (
    INDEX,
    REPO_ROOT / "REQUEST_ROUTING.md",
    REPO_ROOT / "requests" / "REQUEST_POLICY.md",
)
REQUEST_ROOT = REPO_ROOT / "requests"
ID_PATTERN = re.compile(r"^- ID: (REQ-\d{4})$", re.MULTILINE)
STATUS_PATTERN = re.compile(
    r"^- Status: (recorded|in_progress|completed|blocked|superseded)$",
    re.MULTILINE,
)
NEXT_VERSIE_PATTERN = re.compile(
    r"^- Next Versie authorization: (no|yes, Versie \d+)$",
    re.MULTILINE,
)
ROUTES_PATTERN = re.compile(
    r"^- Routes: requests=(record); "
    r"instructions=(update|reference|no-change); "
    r"permissions=(update|reference|no-change); "
    r"plan=(update|reference|no-change); "
    r"product=(update|reference|no-change); "
    r"release=(update|reference|no-change)$",
    re.MULTILINE,
)
PERMISSION_BASIS_PATTERN = re.compile(
    r"^- Permission basis: (explicit|none)$",
    re.MULTILINE,
)
EMAIL_PATTERN = re.compile(
    r"\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b",
    re.IGNORECASE,
)
SECRET_PATTERNS = (
    re.compile(r"\bAIza[0-9A-Za-z_-]{20,}\b"),
    re.compile(r"\b\d{8,}:[0-9A-Za-z_-]{20,}\b"),
    re.compile(r"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----"),
)


def bilingual(path: Path, content: str, errors: list[str]) -> None:
    if "<!-- lang:uk -->" not in content or "<!-- lang:en -->" not in content:
        errors.append(f"Missing bilingual markers: {path.relative_to(REPO_ROOT)}")


def main() -> int:
    errors: list[str] = []
    index_content = INDEX.read_text(encoding="utf-8") if INDEX.exists() else ""

    for path in STATIC_PAGES:
        if not path.exists():
            errors.append(f"Missing required request page: {path.relative_to(REPO_ROOT)}")
            continue
        bilingual(path, path.read_text(encoding="utf-8"), errors)

    seen_ids: set[str] = set()
    request_paths = sorted(REQUEST_ROOT.rglob("REQ-*.md")) if REQUEST_ROOT.exists() else []
    if not request_paths:
        errors.append("No request records found")

    for path in request_paths:
        content = path.read_text(encoding="utf-8")
        bilingual(path, content, errors)

        id_match = ID_PATTERN.search(content)
        request_id = id_match.group(1) if id_match else ""
        if not request_id:
            errors.append(f"Missing request ID: {path.relative_to(REPO_ROOT)}")
        elif request_id in seen_ids:
            errors.append(f"Duplicate request ID: {request_id}")
        else:
            seen_ids.add(request_id)
            if request_id not in path.name:
                errors.append(f"Request ID does not match filename: {path.relative_to(REPO_ROOT)}")
            relative = path.relative_to(REPO_ROOT).as_posix()
            if relative not in index_content:
                errors.append(f"Request missing from REQUESTS.md: {relative}")

        if not STATUS_PATTERN.search(content):
            errors.append(f"Missing or invalid status: {path.relative_to(REPO_ROOT)}")
        if not NEXT_VERSIE_PATTERN.search(content):
            errors.append(f"Missing or invalid next-Versie authorization: {path.relative_to(REPO_ROOT)}")

        routes_match = ROUTES_PATTERN.search(content)
        if not routes_match:
            errors.append(f"Missing or invalid routes: {path.relative_to(REPO_ROOT)}")

        permission_match = PERMISSION_BASIS_PATTERN.search(content)
        if not permission_match:
            errors.append(f"Missing permission basis: {path.relative_to(REPO_ROOT)}")
        elif routes_match and routes_match.group(3) == "update" and permission_match.group(1) != "explicit":
            errors.append(f"Permission update lacks explicit owner basis: {path.relative_to(REPO_ROOT)}")

        if EMAIL_PATTERN.search(content):
            errors.append(f"Email address must be replaced by a private reference: {path.relative_to(REPO_ROOT)}")
        for pattern in SECRET_PATTERNS:
            if pattern.search(content):
                errors.append(f"Potential secret detected: {path.relative_to(REPO_ROOT)}")

    if errors:
        print("Request ledger check failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print(f"Request ledger check passed: {len(request_paths)} indexed request record(s)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())