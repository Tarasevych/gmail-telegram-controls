#!/usr/bin/env python3
"""Fail closed when canonical release-state surfaces contradict each other."""

from __future__ import annotations

import json
import re
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
ALLOWED_STATUSES = {
    "VERIFIED",
    "PARTIAL",
    "UNVERIFIED",
    "CONFLICTING",
    "BLOCKED",
    "RECOMMENDED",
}


def release_state_marker(state: dict) -> str:
    production = state["production"]["appsScriptImmutable"]
    candidate = state["candidate"]["appsScriptImmutable"]
    staging = state["candidate"]["activeStagingDeployments"]
    status = state["candidate"]["status"]
    as_of = state["asOf"]
    return (
        "<!-- release-state: "
        f"production=v{production}; candidate=v{candidate}; staging={staging}; "
        f"status={status}; as-of={as_of} -->"
    )


def check_release_state(root: Path = REPO_ROOT) -> list[str]:
    errors: list[str] = []
    manifest_path = root / "docs" / "release-state.json"
    try:
        state = json.loads(manifest_path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        return [f"release-state manifest is unreadable: {exc}"]

    try:
        schema = state["schemaVersion"]
        as_of = state["asOf"]
        versie = state["versie"]
        production = state["production"]
        candidate = state["candidate"]
        production_version = production["appsScriptImmutable"]
        production_status = production["status"]
        candidate_version = candidate["appsScriptImmutable"]
        candidate_status = candidate["status"]
        staging_count = candidate["activeStagingDeployments"]
        article_paths = state["releaseArticle"]
        evidence_paths = state["productionEvidence"]
    except (KeyError, TypeError) as exc:
        return [f"release-state manifest is missing a required field: {exc}"]

    if schema != 1:
        errors.append(f"unsupported schemaVersion: {schema!r}")
    if not isinstance(as_of, str) or not re.fullmatch(r"\d{4}-\d{2}-\d{2}", as_of):
        errors.append(f"invalid asOf date: {as_of!r}")
    if not isinstance(versie, str) or not re.fullmatch(r"Versie \d+", versie):
        errors.append(f"invalid Versie value: {versie!r}")
    for label, value in (
        ("production.appsScriptImmutable", production_version),
        ("candidate.appsScriptImmutable", candidate_version),
        ("candidate.activeStagingDeployments", staging_count),
    ):
        if not isinstance(value, int) or isinstance(value, bool) or value < 0:
            errors.append(f"{label} must be a non-negative integer")
    for label, value in (
        ("production.status", production_status),
        ("candidate.status", candidate_status),
    ):
        if value not in ALLOWED_STATUSES:
            errors.append(f"{label} has unsupported status: {value!r}")

    if errors:
        return errors

    marker = release_state_marker(state)
    surfaces = {
        "README.md": root / "README.md",
        "docs/uk/CURRENT_STATE.md": root / "docs" / "uk" / "CURRENT_STATE.md",
        "docs/en/CURRENT_STATE.md": root / "docs" / "en" / "CURRENT_STATE.md",
    }
    contents: dict[str, str] = {}
    for label, path in surfaces.items():
        try:
            content = path.read_text(encoding="utf-8")
        except OSError as exc:
            errors.append(f"missing current-state surface {label}: {exc}")
            continue
        contents[label] = content
        if content.count(marker) != 1:
            errors.append(f"{label} must contain the exact canonical release-state marker once")

    root_readme = contents.get("README.md", "")
    for link in ("docs/uk/CURRENT_STATE.md", "docs/en/CURRENT_STATE.md"):
        if link not in root_readme:
            errors.append(f"README.md is missing current-state link: {link}")
    for pattern in (
        r"Поточний (?:public )?production[^\n]*?\bv(\d+)\b",
        r"Current (?:public )?production[^\n]*?\bv(\d+)\b",
    ):
        for match in re.finditer(pattern, root_readme):
            if int(match.group(1)) != production_version:
                errors.append(
                    "README.md current-production claim conflicts with manifest: "
                    f"v{match.group(1)} != v{production_version}"
                )

    for language, current_path in (
        ("uk", "docs/uk/CURRENT_STATE.md"),
        ("en", "docs/en/CURRENT_STATE.md"),
    ):
        content = contents.get(current_path, "")
        article = Path(article_paths[language])
        evidence = Path(evidence_paths[language])
        for label, reference in (("release article", article), ("production evidence", evidence)):
            if not (root / reference).is_file():
                errors.append(f"missing {language} {label}: {reference.as_posix()}")
            relative = reference.relative_to(Path("docs") / language).as_posix()
            if relative not in content:
                errors.append(f"{current_path} is missing {label} link: {relative}")

    if "../en/CURRENT_STATE.md" not in contents.get("docs/uk/CURRENT_STATE.md", ""):
        errors.append("Ukrainian current-state page is missing its English mirror link")
    if "../uk/CURRENT_STATE.md" not in contents.get("docs/en/CURRENT_STATE.md", ""):
        errors.append("English current-state page is missing its Ukrainian mirror link")
    return errors


def main() -> int:
    errors = check_release_state()
    if errors:
        print("Release-state check failed:")
        for error in errors:
            print(f"- {error}")
        return 1
    print("Release-state check passed: manifest and 3 current-state surfaces agree")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
