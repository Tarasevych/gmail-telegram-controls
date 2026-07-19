#!/usr/bin/env python3
"""Create a Ukrainian and English documentation page as one atomic pair."""

from __future__ import annotations

import argparse
from pathlib import Path, PurePosixPath


REPO_ROOT = Path(__file__).resolve().parents[1]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("relative_path", help="Path below docs/uk and docs/en, ending in .md")
    parser.add_argument("--uk-title", required=True)
    parser.add_argument("--en-title", required=True)
    return parser.parse_args()


def safe_relative_path(value: str) -> PurePosixPath:
    path = PurePosixPath(value.replace("\\", "/"))
    if path.is_absolute() or ".." in path.parts or path.suffix.lower() != ".md":
        raise SystemExit("relative_path must be a safe relative Markdown path")
    return path


def main() -> int:
    args = parse_args()
    relative = safe_relative_path(args.relative_path)
    uk_path = REPO_ROOT / "docs" / "uk" / Path(*relative.parts)
    en_path = REPO_ROOT / "docs" / "en" / Path(*relative.parts)

    existing = [str(path.relative_to(REPO_ROOT)) for path in (uk_path, en_path) if path.exists()]
    if existing:
        raise SystemExit("Refusing to overwrite existing page(s): " + ", ".join(existing))

    uk_path.parent.mkdir(parents=True, exist_ok=True)
    en_path.parent.mkdir(parents=True, exist_ok=True)
    parent_hops = [".."] * (len(relative.parent.parts) + 1)
    en_link = PurePosixPath(*parent_hops, "en", *relative.parts).as_posix()
    uk_link = PurePosixPath(*parent_hops, "uk", *relative.parts).as_posix()

    uk_path.write_text(
        f"# {args.uk_title}\n\nEnglish mirror: [{en_link}]({en_link}).\n\n"
        "<!-- Replace this line with complete Ukrainian content. -->\n",
        encoding="utf-8",
    )
    en_path.write_text(
        f"# {args.en_title}\n\nУкраїнське дзеркало: [{uk_link}]({uk_link}).\n\n"
        "<!-- Replace this line with complete English content. -->\n",
        encoding="utf-8",
    )
    print(f"Created {uk_path.relative_to(REPO_ROOT)}")
    print(f"Created {en_path.relative_to(REPO_ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
