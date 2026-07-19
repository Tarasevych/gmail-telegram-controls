#!/usr/bin/env python3
"""Fail when GitHub documentation is missing or changes only one language."""

from __future__ import annotations

import argparse
import subprocess
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
LANG_ROOTS = {
    "uk": REPO_ROOT / "docs" / "uk",
    "en": REPO_ROOT / "docs" / "en",
}
SHARED_BILINGUAL = (REPO_ROOT / "README.md", REPO_ROOT / "AGENTS.md")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--base", default="")
    parser.add_argument("--head", default="HEAD")
    return parser.parse_args()


def pages(root: Path) -> set[str]:
    return {
        path.relative_to(root).as_posix()
        for path in root.rglob("*.md")
        if path.is_file()
    }


def commit_exists(revision: str) -> bool:
    if not revision or set(revision) == {"0"}:
        return False
    result = subprocess.run(
        ["git", "cat-file", "-e", f"{revision}^{{commit}}"],
        cwd=REPO_ROOT,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        check=False,
    )
    return result.returncode == 0


def changed_language_pages(base: str, head: str) -> dict[str, set[str]]:
    if not commit_exists(base):
        return {}
    result = subprocess.run(
        [
            "git",
            "diff",
            "--name-only",
            "--no-renames",
            "-z",
            f"{base}...{head}",
            "--",
            "docs/uk",
            "docs/en",
        ],
        cwd=REPO_ROOT,
        stdout=subprocess.PIPE,
        check=True,
    )
    grouped: dict[str, set[str]] = {}
    for raw_path in result.stdout.decode("utf-8").split("\0"):
        if not raw_path:
            continue
        parts = Path(raw_path).parts
        if len(parts) < 3 or parts[0] != "docs" or parts[1] not in LANG_ROOTS:
            continue
        relative = Path(*parts[2:]).as_posix()
        grouped.setdefault(relative, set()).add(parts[1])
    return grouped


def main() -> int:
    args = parse_args()
    errors: list[str] = []
    page_sets = {language: pages(root) for language, root in LANG_ROOTS.items()}
    all_pages = page_sets["uk"] | page_sets["en"]

    for relative in sorted(all_pages):
        missing = [language for language in LANG_ROOTS if relative not in page_sets[language]]
        if missing:
            errors.append(f"Missing language counterpart for {relative}: {', '.join(missing)}")
            continue
        for language, root in LANG_ROOTS.items():
            if not (root / relative).read_text(encoding="utf-8").strip():
                errors.append(f"Empty documentation page: docs/{language}/{relative}")

    for path in SHARED_BILINGUAL:
        content = path.read_text(encoding="utf-8") if path.exists() else ""
        if "<!-- lang:uk -->" not in content or "<!-- lang:en -->" not in content:
            errors.append(f"Shared page must contain Ukrainian and English markers: {path.name}")

    for relative, languages in sorted(changed_language_pages(args.base, args.head).items()):
        if languages != {"uk", "en"}:
            errors.append(
                f"One-sided documentation change for {relative}: changed {', '.join(sorted(languages))}"
            )

    if errors:
        print("Bilingual documentation check failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print(f"Bilingual documentation check passed: {len(all_pages)} Ukrainian/English page pairs")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
