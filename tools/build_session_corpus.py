#!/usr/bin/env python3
"""Build a private, deterministic chunk corpus from normalized session sources."""

from __future__ import annotations

import argparse
import hashlib
import json
import re
from collections import defaultdict
from pathlib import Path


VERSION_RE = re.compile(r'(?<![A-Za-z0-9])v(\d{1,3})(?![A-Za-z0-9])', re.IGNORECASE)
ID_PATTERNS = {
    'REQ': re.compile(r'\bREQ-\d{4}\b'),
    'VR': re.compile(r'\bVR-\d{3}\b'),
    'GT': re.compile(r'\bGT-\d{3}\b'),
}
THEMES = {
    'realtime_delivery': re.compile(r'realtime|real-time|реальн.{0,8}час', re.IGNORECASE),
    'frozen_backlog': re.compile(r'frozen|backlog|черг|відстав', re.IGNORECASE),
    'card_capacity': re.compile(r'card.{0,20}capacit|capacity.{0,20}card|картк.{0,20}ліміт', re.IGNORECASE),
    'retention_purge': re.compile(r'retention|purge|compaction|delete_too_old', re.IGNORECASE),
    'multi_account': re.compile(r'multi.?account|кільк.{0,15}акаунт|notificationConnectionIds', re.IGNORECASE),
    'release_rollback': re.compile(r'immutable|release|rollback|preflight|deployment', re.IGNORECASE),
    'oauth_auth': re.compile(r'oauth|consent|captcha|passkey|2fa|otp|авторизац', re.IGNORECASE),
    'locks': re.compile(r'UserLock|ScriptLock|lock\b|mutex|lease', re.IGNORECASE),
    'dedupe': re.compile(r'dedup|duplicate|дубл|at-most-once|seen ledger', re.IGNORECASE),
    'tests': re.compile(r'\btest|passed|failed|assert|перевір', re.IGNORECASE),
    'errors': re.compile(r'\berror|exception|fail|помил|збій', re.IGNORECASE),
    'telegram': re.compile(r'telegram|бот|картк', re.IGNORECASE),
    'gmail': re.compile(r'gmail|mailbox|пошт', re.IGNORECASE),
    'privacy_security': re.compile(r'secret|token|privacy|credential|безпек|конфіден', re.IGNORECASE),
    'recovery': re.compile(r'recovery|checkpoint|heartbeat|віднов', re.IGNORECASE),
}
BOUNDARY_RE = re.compile(
    r'^(?:#{1,4}\s+)?(?:user|assistant|developer|system|tool|користувач|асистент|codex)\s*[:>|-]',
    re.IGNORECASE,
)


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def atomic_json(path: Path, value: object) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temp = path.with_suffix(path.suffix + '.tmp')
    temp.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    temp.replace(path)


def write_chunk(
    chunks_root: Path,
    source_id: str,
    sequence: int,
    overlap: list[tuple[int, str, bool]],
    primary: list[tuple[int, str, bool]],
    *,
    char_start: int | None = None,
    char_end: int | None = None,
) -> dict:
    chunk_id = f'{source_id}-{sequence:04d}'
    relative = Path('chunks') / source_id / f'{chunk_id}.txt'
    target = chunks_root.parent / relative
    target.parent.mkdir(parents=True, exist_ok=True)
    rows = overlap + primary
    content = ''.join(text + ('\n' if terminated else '') for _, text, terminated in rows)
    target.write_text(content, encoding='utf-8', newline='')
    return {
        'chunk_id': chunk_id,
        'path': relative.as_posix(),
        'sha256': sha256_bytes(content.encode('utf-8')),
        'bytes': len(content.encode('utf-8')),
        'chars': len(content),
        'overlap_start_line': overlap[0][0] if overlap else None,
        'overlap_end_line': overlap[-1][0] if overlap else None,
        'primary_start_line': primary[0][0],
        'primary_end_line': primary[-1][0],
        'primary_char_start': char_start,
        'primary_char_end': char_end,
    }


def build_source(
    source: dict,
    output: Path,
    max_lines: int,
    max_chars: int,
    overlap_lines: int,
    sample_lines: int,
) -> tuple[dict, dict, dict, list[str]]:
    normalized = Path(source['normalized_path'])
    source_id = source['source_id']
    chunks_root = output / 'chunks'
    chunks: list[dict] = []
    version_hits: dict[str, dict] = {}
    id_hits: dict[str, dict[str, dict]] = {kind: {} for kind in ID_PATTERNS}
    theme_hits: dict[str, dict] = {name: {'line_hits': 0, 'first_line': None, 'last_line': None} for name in THEMES}
    boundaries: list[int] = []
    samples: list[str] = []
    buffer: list[tuple[int, str, bool]] = []
    buffer_chars = 0
    tail: list[tuple[int, str, bool]] = []
    sequence = 0
    covered_lines = 0
    overlong_segments = 0

    def flush() -> None:
        nonlocal buffer, buffer_chars, tail, sequence
        if not buffer:
            return
        sequence += 1
        chunks.append(write_chunk(chunks_root, source_id, sequence, tail, buffer))
        tail = buffer[-overlap_lines:] if overlap_lines else []
        buffer = []
        buffer_chars = 0

    with normalized.open('r', encoding='utf-8', newline='') as handle:
        for line_no, raw in enumerate(handle, start=1):
            terminated = raw.endswith('\n')
            text = raw[:-1] if terminated else raw
            covered_lines += 1
            if len(samples) < sample_lines:
                samples.append(f'{line_no:06d}: {text}')
            for match in VERSION_RE.finditer(text):
                key = f'v{int(match.group(1))}'
                item = version_hits.setdefault(key, {'mentions': 0, 'first_line': line_no, 'last_line': line_no})
                item['mentions'] += 1
                item['last_line'] = line_no
            for kind, pattern in ID_PATTERNS.items():
                for value in pattern.findall(text):
                    item = id_hits[kind].setdefault(value, {'mentions': 0, 'first_line': line_no, 'last_line': line_no})
                    item['mentions'] += 1
                    item['last_line'] = line_no
            for name, pattern in THEMES.items():
                if pattern.search(text):
                    item = theme_hits[name]
                    item['line_hits'] += 1
                    item['first_line'] = line_no if item['first_line'] is None else item['first_line']
                    item['last_line'] = line_no
            if BOUNDARY_RE.search(text):
                boundaries.append(line_no)

            row_chars = len(text) + (1 if terminated else 0)
            if row_chars > max_chars:
                flush()
                tail = []
                for start in range(0, len(text), max_chars):
                    segment = text[start:start + max_chars]
                    sequence += 1
                    is_last = start + max_chars >= len(text)
                    primary = [(line_no, segment, terminated and is_last)]
                    chunks.append(write_chunk(
                        chunks_root, source_id, sequence, [], primary,
                        char_start=start, char_end=start + len(segment),
                    ))
                    overlong_segments += 1
                continue
            if buffer and (len(buffer) >= max_lines or buffer_chars + row_chars > max_chars):
                flush()
            buffer.append((line_no, text, terminated))
            buffer_chars += row_chars
    flush()

    expected_lines = int(source['logical_lines'])
    if covered_lines != expected_lines:
        raise RuntimeError(f'{source_id}: coverage mismatch {covered_lines} != {expected_lines}')
    if not chunks and expected_lines:
        raise RuntimeError(f'{source_id}: no chunks created')

    source_manifest = {
        'source_id': source_id,
        'source_name': source['source_name'],
        'original_bytes': source['original_bytes'],
        'original_sha256': source['original_sha256'],
        'encoding': source['encoding'],
        'bom': source['bom'],
        'newline_style': source['newline_style'],
        'logical_lines': expected_lines,
        'normalized_bytes': source['normalized_bytes'],
        'normalized_sha256': source['normalized_sha256'],
        'chunk_count': len(chunks),
        'overlong_segments': overlong_segments,
        'covered_lines': covered_lines,
        'coverage_complete': True,
        'boundary_candidate_count': len(boundaries),
        'boundary_candidate_lines': boundaries,
        'chunks': chunks,
    }
    return source_manifest, version_hits, {'ids': id_hits, 'themes': theme_hits}, samples


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument('--metadata', required=True, type=Path)
    parser.add_argument('--output', required=True, type=Path)
    parser.add_argument('--max-lines', type=int, default=750)
    parser.add_argument('--max-chars', type=int, default=90000)
    parser.add_argument('--overlap-lines', type=int, default=5)
    parser.add_argument('--sample-lines', type=int, default=80)
    args = parser.parse_args()
    if args.output.exists():
        raise SystemExit(f'Output already exists: {args.output}')
    metadata = json.loads(args.metadata.read_text(encoding='utf-8'))
    args.output.mkdir(parents=True)
    sources = []
    versions = {}
    thematic = {}
    sample_blocks = []
    for source in metadata['sources']:
        manifest, version_hits, indexes, samples = build_source(
            source, args.output, args.max_lines, args.max_chars, args.overlap_lines, args.sample_lines
        )
        sources.append(manifest)
        versions[source['source_id']] = version_hits
        thematic[source['source_id']] = indexes
        sample_blocks.extend([f'===== {source["source_id"]} =====', *samples, ''])
    manifest = {
        'schema_version': 1,
        'request': 'REQ-0012',
        'parameters': {
            'max_lines': args.max_lines,
            'max_chars': args.max_chars,
            'overlap_lines': args.overlap_lines,
        },
        'source_count': len(sources),
        'total_lines': sum(item['logical_lines'] for item in sources),
        'total_chunks': sum(item['chunk_count'] for item in sources),
        'coverage_complete': all(item['coverage_complete'] for item in sources),
        'sources': sources,
    }
    atomic_json(args.output / 'corpus-manifest.json', manifest)
    atomic_json(args.output / 'version-index.json', versions)
    atomic_json(args.output / 'thematic-index.json', thematic)
    (args.output / 'format-sample.txt').write_text('\n'.join(sample_blocks), encoding='utf-8', newline='')
    print(json.dumps({
        'ok': manifest['coverage_complete'],
        'sources': manifest['source_count'],
        'lines': manifest['total_lines'],
        'chunks': manifest['total_chunks'],
        'output': str(args.output),
    }, ensure_ascii=False))
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
