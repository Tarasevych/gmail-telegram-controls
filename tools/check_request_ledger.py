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
    REPO_ROOT / "requests" / "TEMPLATE.md",
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
ROUTES_LINE_PATTERN = re.compile(r"^- Routes:\s*(.+)$", re.MULTILINE)
ROUTE_VALUES = {
    "requests": {"record"},
    "instructions": {"update", "reference", "no-change"},
    "permissions": {"update", "reference", "no-change"},
    "plan": {"update", "reference", "no-change"},
    "product": {"update", "reference", "no-change"},
    "release": {"update", "reference", "no-change"},
}
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


def parse_routes(content: str) -> tuple[dict[str, str], list[str]]:
    """Parse the Routes field as an order-independent, fail-closed key/value set."""
    matches = ROUTES_LINE_PATTERN.findall(content)
    if not matches:
        return {}, ["missing Routes field"]
    if len(matches) != 1:
        return {}, [f"duplicate Routes field ({len(matches)} lines)"]

    routes: dict[str, str] = {}
    errors: list[str] = []
    for raw_segment in matches[0].split(";"):
        segment = raw_segment.strip()
        if not segment or "=" not in segment:
            errors.append(f"malformed route segment: {segment or '<empty>'}")
            continue
        key, value = (part.strip() for part in segment.split("=", 1))
        if key not in ROUTE_VALUES:
            errors.append(f"unknown route key: {key or '<empty>'}")
            continue
        if key in routes:
            errors.append(f"duplicate route key: {key}")
            continue
        routes[key] = value
        if value not in ROUTE_VALUES[key]:
            allowed = ", ".join(sorted(ROUTE_VALUES[key]))
            errors.append(f"invalid route value: {key}={value or '<empty>'}; allowed: {allowed}")

    for key in ROUTE_VALUES:
        if key not in routes:
            errors.append(f"missing route key: {key}")
    return routes, errors


def record_contract_errors(content: str) -> list[str]:
    """Return stable, field-specific errors for one request record."""
    errors: list[str] = []
    if "<!-- lang:uk -->" not in content or "<!-- lang:en -->" not in content:
        errors.append("missing bilingual markers")
    if not STATUS_PATTERN.search(content):
        errors.append("missing or invalid status")
    if not NEXT_VERSIE_PATTERN.search(content):
        errors.append("missing or invalid next-Versie authorization")

    routes, route_errors = parse_routes(content)
    errors.extend(route_errors)

    permission_match = PERMISSION_BASIS_PATTERN.search(content)
    if not permission_match:
        errors.append("missing or invalid permission basis")
    elif routes.get("permissions") == "update" and permission_match.group(1) != "explicit":
        errors.append("permission update lacks explicit owner basis")
    return errors


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
        relative_path = path.relative_to(REPO_ROOT)
        for contract_error in record_contract_errors(content):
            errors.append(f"{contract_error}: {relative_path}")

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
