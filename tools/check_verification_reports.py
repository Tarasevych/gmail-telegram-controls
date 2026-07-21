#!/usr/bin/env python3
"""Validate bilingual, atomic, evidence-scoped factual verification reports."""

from __future__ import annotations

import json
import hashlib
import re
import subprocess
from collections import Counter, defaultdict
from pathlib import Path


def canonical_lf_sha256(text: str) -> str:
    """Hash text after normalizing platform line endings to canonical LF."""
    canonical = text.replace("\r\n", "\n").replace("\r", "\n").encode("utf-8")
    return hashlib.sha256(canonical).hexdigest()


ROOT = Path(__file__).resolve().parents[1]
META = ROOT / "docs" / "verification-reports"
UK = ROOT / "docs" / "uk" / "verification-reports"
EN = ROOT / "docs" / "en" / "verification-reports"
REPORT_ID = "VR-001"
LATEST_REPORT_ID = "VR-003"
EXPECTED_CATEGORIES = {
    "KH-INS": 22,
    "KH-PERM": 3,
    "KH-PLAN": 48,
    "KH-ISS": 23,
    "KH-PROD": 52,
    "KH-DEC": 25,
    "KH-LES": 11,
    "KH-EVD": 30,
    "KH-HIS": 6,
    "KH-DEP": 20,
    "KH-PRV": 5,
}
STATUSES = {"verified", "contradicted", "partial", "unverified", "blocked", "recommendation"}
SCOPES = {"repository", "test", "runtime", "governance", "external", "mixed"}
GRADES = {"E0": 0, "E1": 1, "E2": 2, "E3": 3, "E4": 4, "E5": 5}
SENSITIVITY = {"public", "internal", "restricted", "secret-redacted"}
REQUIRED_PAGES = {
    "README.md", "INDEX.md", "REPORT_SCHEMA.md", "EVIDENCE_POLICY.md",
    "reports/VR-001/README.md", "reports/VR-001/CLAIMS.md",
    "reports/VR-001/GOVERNANCE.md", "reports/VR-001/IMPLEMENTATION.md",
    "reports/VR-001/RELEASES.md", "reports/VR-001/CONFLICTS.md",
    "reports/VR-001/RECOMMENDATIONS.md",
    "reports/VR-003/README.md", "reports/VR-003/ARCHITECTURE.md",
    "reports/VR-003/ROOT_CAUSES.md", "reports/VR-003/LESSONS.md",
    "reports/VR-003/RELEASES.md", "reports/VR-003/OPEN_GATES.md",
}
FULL_COMMIT = re.compile(r"^[0-9a-f]{40}$")
LINK = re.compile(r"\[[^\]]*\]\(([^)]+)\)")
SECRET_PATTERNS = {
    "private Windows path": re.compile(r"[A-Za-z]:\\Users\\", re.IGNORECASE),
    "email address": re.compile(r"\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b", re.IGNORECASE),
    "Google API key": re.compile(r"\bAIza[0-9A-Za-z_-]{20,}\b"),
    "Telegram bot token": re.compile(r"\b\d{8,}:[0-9A-Za-z_-]{20,}\b"),
    "private key": re.compile(r"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----"),
}


def load_json(path: Path, errors: list[str]) -> dict:
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except Exception as exc:
        errors.append(f"Invalid JSON {path.relative_to(ROOT)}: {exc}")
        return {}
    if not isinstance(data, dict):
        errors.append(f"JSON root is not an object: {path.relative_to(ROOT)}")
        return {}
    return data


def git_object_exists(commit: str, path: str) -> bool:
    spec = f"{commit}:{path}" if path else f"{commit}^{{commit}}"
    result = subprocess.run(
        ["git", "cat-file", "-e", spec],
        cwd=ROOT,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        check=False,
    )
    return result.returncode == 0


def category_for(claim_id: str) -> str:
    return claim_id.rsplit("-", 1)[0]


def main() -> int:
    errors: list[str] = []
    uk_pages = {p.relative_to(UK).as_posix() for p in UK.rglob("*.md")}
    en_pages = {p.relative_to(EN).as_posix() for p in EN.rglob("*.md")}
    if uk_pages != en_pages:
        errors.append(f"Verification language mismatch: uk_only={sorted(uk_pages-en_pages)} en_only={sorted(en_pages-uk_pages)}")
    missing = REQUIRED_PAGES - uk_pages
    if missing:
        errors.append(f"Missing verification pages: {sorted(missing)}")

    markdown_paths = sorted([*UK.rglob("*.md"), *EN.rglob("*.md")])
    for path in markdown_paths:
        text = path.read_text(encoding="utf-8")
        if "REQ-0004" not in text:
            errors.append(f"Missing REQ-0004 marker: {path.relative_to(ROOT)}")
        for label, pattern in SECRET_PATTERNS.items():
            if pattern.search(text):
                errors.append(f"Potential {label}: {path.relative_to(ROOT)}")
        for target in LINK.findall(text):
            clean = target.split("#", 1)[0]
            if not clean or re.match(r"^[a-z]+://", clean, re.IGNORECASE) or clean.startswith("mailto:"):
                continue
            if not (path.parent / clean).resolve().exists():
                errors.append(f"Broken verification link: {path.relative_to(ROOT)} -> {target}")

    claims_doc = load_json(META / REPORT_ID / "claims.json", errors)
    manifest = load_json(META / REPORT_ID / "manifest.json", errors)
    index = load_json(META / "index.json", errors)
    schema = load_json(META / "schema.json", errors)
    claims = claims_doc.get("claims", [])
    if not isinstance(claims, list):
        errors.append("claims.json claims is not a list")
        claims = []

    catalog = load_json(ROOT / "docs" / "knowledge-hub" / "catalog.json", errors)
    expected_source_ids: dict[str, set[str]] = defaultdict(set)
    for item in catalog.get("items", []):
        if isinstance(item, dict):
            expected_source_ids[str(item.get("canonical_id", ""))].add(str(item.get("source_id", "")))
    expected_ids = set(expected_source_ids)
    ids = [str(claim.get("claim_id", "")) for claim in claims if isinstance(claim, dict)]
    if len(claims) != 245 or len(set(ids)) != 245:
        errors.append(f"Claim coverage is not exact 245: rows={len(claims)} unique={len(set(ids))}")
    if set(ids) != expected_ids:
        errors.append(f"Claim IDs differ from catalog: missing={sorted(expected_ids-set(ids))[:10]} extra={sorted(set(ids)-expected_ids)[:10]}")
    category_counts = Counter(category_for(claim_id) for claim_id in ids)
    if dict(category_counts) != EXPECTED_CATEGORIES:
        errors.append(f"Wrong category counts: {dict(category_counts)}")

    required = {
        "claim_id", "source_ids", "category", "statement_uk", "statement_en",
        "claim_type", "relevance", "verification_status", "implementation_status",
        "verification_scope", "evidence_grade", "dependencies", "conflicts",
        "sensitivity", "provenance", "evidence", "verified_at", "limitations",
        "report_id", "analysis_stream",
    }
    for claim in claims:
        if not isinstance(claim, dict):
            errors.append("Non-object claim row")
            continue
        claim_id = str(claim.get("claim_id", "<missing>"))
        missing_fields = sorted(required - set(claim))
        if missing_fields:
            errors.append(f"{claim_id}: missing fields {missing_fields}")
        category = category_for(claim_id)
        if claim.get("category") != category:
            errors.append(f"{claim_id}: category mismatch {claim.get('category')} != {category}")
        if set(claim.get("source_ids", [])) != expected_source_ids.get(claim_id, set()):
            errors.append(f"{claim_id}: source IDs do not match canonical catalog")
        status = claim.get("verification_status")
        scope = claim.get("verification_scope")
        grade = claim.get("evidence_grade")
        if status not in STATUSES:
            errors.append(f"{claim_id}: invalid status {status}")
        if scope not in SCOPES:
            errors.append(f"{claim_id}: invalid scope {scope}")
        if grade not in GRADES:
            errors.append(f"{claim_id}: invalid grade {grade}")
            grade = "E0"
        if claim.get("sensitivity") not in SENSITIVITY:
            errors.append(f"{claim_id}: invalid sensitivity {claim.get('sensitivity')}")
        if not isinstance(claim.get("dependencies"), list) or not isinstance(claim.get("conflicts"), list):
            errors.append(f"{claim_id}: dependencies/conflicts must be lists")
        if not isinstance(claim.get("limitations"), list):
            errors.append(f"{claim_id}: limitations must be a list")
        evidence = claim.get("evidence", [])
        if not isinstance(evidence, list):
            errors.append(f"{claim_id}: evidence must be a list")
            evidence = []
        if status in {"verified", "contradicted", "partial"} and not evidence:
            errors.append(f"{claim_id}: {status} requires primary evidence")
        if status == "verified" and GRADES.get(grade, 0) < 1:
            errors.append(f"{claim_id}: verified cannot use E0")
        if status == "verified" and scope == "test" and GRADES.get(grade, 0) < 3:
            errors.append(f"{claim_id}: test verification requires E3+")
        if status == "verified" and scope == "runtime" and GRADES.get(grade, 0) < 4:
            errors.append(f"{claim_id}: runtime verification requires E4+")
        if status == "blocked" and not claim.get("limitations"):
            errors.append(f"{claim_id}: blocked requires an explicit limitation")
        for item in evidence:
            if not isinstance(item, dict):
                errors.append(f"{claim_id}: non-object evidence")
                continue
            for field in ("kind", "commit", "path", "github_url", "method", "result"):
                if field not in item:
                    errors.append(f"{claim_id}: evidence missing {field}")
            commit = str(item.get("commit", ""))
            path = str(item.get("path", ""))
            url = str(item.get("github_url", ""))
            if commit:
                if not FULL_COMMIT.fullmatch(commit):
                    errors.append(f"{claim_id}: evidence commit is not immutable: {commit}")
                elif not git_object_exists(commit, path):
                    errors.append(f"{claim_id}: missing Git object {commit}:{path}")
                if commit not in url or not url.startswith("https://github.com/Tarasevych/gmail-telegram-controls/"):
                    errors.append(f"{claim_id}: evidence URL does not bind full commit")
            elif not url.startswith("https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/"):
                errors.append(f"{claim_id}: non-Git evidence must be a repository Actions run")
        if category == "KH-PERM" and status == "verified":
            permission_paths = [str(item.get("path", "")).lower() for item in evidence if isinstance(item, dict)]
            if not any("permission" in path or "повноваж" in path for path in permission_paths):
                errors.append(f"{claim_id}: verified permission lacks canonical permission evidence")

    status_counts = Counter(str(claim.get("verification_status")) for claim in claims if isinstance(claim, dict))
    grade_counts = Counter(str(claim.get("evidence_grade")) for claim in claims if isinstance(claim, dict))
    complete_grade_counts = {grade: grade_counts.get(grade, 0) for grade in GRADES}
    if manifest.get("claim_count") != 245 or manifest.get("status_counts") != dict(status_counts):
        errors.append("VR-001 manifest claim/status totals do not match claims.json")
    if manifest.get("evidence_grade_counts") != complete_grade_counts:
        errors.append("VR-001 manifest evidence-grade totals do not match claims.json")
    if manifest.get("source_request") != "REQ-0004" or manifest.get("release_change") is not False:
        errors.append("VR-001 manifest lacks REQ-0004 no-release boundary")
    if index.get("latest_report") != LATEST_REPORT_ID or schema.get("schema_version") != 1:
        errors.append("Verification index/schema metadata is invalid")

    vr3_claims_doc = load_json(META / LATEST_REPORT_ID / "claims.json", errors)
    vr3_manifest = load_json(META / LATEST_REPORT_ID / "manifest.json", errors)
    vr3_sources = load_json(META / LATEST_REPORT_ID / "source-manifest.json", errors)
    vr3_claims = vr3_claims_doc.get("claims", [])
    if not isinstance(vr3_claims, list):
        errors.append("VR-003 claims.json claims is not a list")
        vr3_claims = []
    vr3_ids = [str(claim.get("claim_id", "")) for claim in vr3_claims if isinstance(claim, dict)]
    if len(vr3_claims) != len(set(vr3_ids)) or not vr3_claims:
        errors.append(
            f"VR-003 claim IDs are not non-empty and unique: rows={len(vr3_claims)} "
            f"unique={len(set(vr3_ids))}"
        )
    if any(not re.fullmatch(r"VR3-\d{3}", claim_id) for claim_id in vr3_ids):
        errors.append("VR-003 contains an invalid claim ID")

    source_limits: dict[str, int] = {}
    for source in vr3_sources.get("sources", []):
        if isinstance(source, dict):
            source_limits[str(source.get("source_id", ""))] = int(source.get("logical_lines", 0))
    if (
        vr3_sources.get("report_id") != LATEST_REPORT_ID
        or vr3_sources.get("source_request") != "REQ-0012"
        or vr3_sources.get("source_count") != 2
        or vr3_sources.get("total_lines") != 167176
        or vr3_sources.get("total_chunks") != 231
        or vr3_sources.get("coverage_complete") is not True
        or vr3_sources.get("raw_sources_published") is not False
        or vr3_sources.get("private_normalized_corpus_published") is not False
        or source_limits != {"SESSION-CURRENT": 32569, "SESSION-PREVIOUS": 134607}
    ):
        errors.append("VR-003 source manifest coverage/privacy metadata is invalid")

    for claim in vr3_claims:
        if not isinstance(claim, dict):
            errors.append("VR-003 contains a non-object claim row")
            continue
        claim_id = str(claim.get("claim_id", "<missing>"))
        missing_fields = sorted(required - set(claim))
        if missing_fields:
            errors.append(f"{claim_id}: missing fields {missing_fields}")
        status = claim.get("verification_status")
        scope = claim.get("verification_scope")
        grade = claim.get("evidence_grade")
        if status not in STATUSES:
            errors.append(f"{claim_id}: invalid status {status}")
        if scope not in SCOPES:
            errors.append(f"{claim_id}: invalid scope {scope}")
        if grade not in GRADES:
            errors.append(f"{claim_id}: invalid grade {grade}")
            grade = "E0"
        if claim.get("sensitivity") not in SENSITIVITY:
            errors.append(f"{claim_id}: invalid sensitivity {claim.get('sensitivity')}")
        if not isinstance(claim.get("dependencies"), list) or not isinstance(claim.get("conflicts"), list):
            errors.append(f"{claim_id}: dependencies/conflicts must be lists")
        if not isinstance(claim.get("limitations"), list):
            errors.append(f"{claim_id}: limitations must be a list")
        evidence = claim.get("evidence", [])
        if not isinstance(evidence, list):
            errors.append(f"{claim_id}: evidence must be a list")
            evidence = []
        if status in {"verified", "contradicted", "partial"} and not evidence:
            errors.append(f"{claim_id}: {status} requires primary evidence")
        if status == "verified" and GRADES.get(grade, 0) < 1:
            errors.append(f"{claim_id}: verified cannot use E0")
        if status == "verified" and scope == "test" and GRADES.get(grade, 0) < 3:
            errors.append(f"{claim_id}: test verification requires E3+")
        if status == "verified" and scope == "runtime" and GRADES.get(grade, 0) < 4:
            errors.append(f"{claim_id}: runtime verification requires E4+")
        if status == "blocked" and not claim.get("limitations"):
            errors.append(f"{claim_id}: blocked requires an explicit limitation")

        provenance = claim.get("provenance", {})
        spans = provenance.get("source_spans", []) if isinstance(provenance, dict) else []
        if not isinstance(spans, list) or not spans:
            errors.append(f"{claim_id}: missing source spans")
            spans = []
        span_sources: set[str] = set()
        for span in spans:
            if not isinstance(span, dict):
                errors.append(f"{claim_id}: non-object source span")
                continue
            source_id = str(span.get("source_id", ""))
            span_sources.add(source_id)
            if source_id in source_limits:
                start = int(span.get("line_start", 0))
                end = int(span.get("line_end", 0))
                if not (1 <= start <= end <= source_limits[source_id]):
                    errors.append(f"{claim_id}: invalid source span {source_id}:{start}-{end}")
        if set(claim.get("source_ids", [])) != span_sources:
            errors.append(f"{claim_id}: source IDs differ from provenance spans")

        for item in evidence:
            if not isinstance(item, dict):
                errors.append(f"{claim_id}: non-object evidence")
                continue
            for field in ("kind", "commit", "path", "github_url", "method", "result"):
                if field not in item:
                    errors.append(f"{claim_id}: evidence missing {field}")
            commit = str(item.get("commit", ""))
            path = str(item.get("path", ""))
            url = str(item.get("github_url", ""))
            if not FULL_COMMIT.fullmatch(commit):
                errors.append(f"{claim_id}: evidence commit is not immutable: {commit}")
            elif not git_object_exists(commit, path):
                errors.append(f"{claim_id}: missing Git object {commit}:{path}")
            if commit not in url or not url.startswith("https://github.com/Tarasevych/gmail-telegram-controls/"):
                errors.append(f"{claim_id}: evidence URL does not bind full commit")
        if claim.get("category") == "permissions" and status == "verified":
            permission_paths = [str(item.get("path", "")).lower() for item in evidence if isinstance(item, dict)]
            if not any("permission" in path or "повноваж" in path for path in permission_paths):
                errors.append(f"{claim_id}: verified permission lacks canonical permission evidence")

    vr3_status_counts = Counter(
        str(claim.get("verification_status")) for claim in vr3_claims if isinstance(claim, dict)
    )
    vr3_grade_counts = Counter(
        str(claim.get("evidence_grade")) for claim in vr3_claims if isinstance(claim, dict)
    )
    vr3_category_counts = Counter(
        str(claim.get("category")) for claim in vr3_claims if isinstance(claim, dict)
    )
    complete_vr3_grade_counts = {grade: vr3_grade_counts.get(grade, 0) for grade in GRADES}
    source_manifest_path = META / LATEST_REPORT_ID / "source-manifest.json"
    source_manifest_sha = canonical_lf_sha256(
        source_manifest_path.read_text(encoding="utf-8")
    )
    if (
        vr3_manifest.get("report_id") != LATEST_REPORT_ID
        or vr3_manifest.get("source_request") != "REQ-0012"
        or vr3_manifest.get("verification_framework") != "REQ-0004"
        or vr3_manifest.get("claim_count") != len(vr3_claims)
        or vr3_manifest.get("status_counts") != dict(vr3_status_counts)
        or vr3_manifest.get("evidence_grade_counts") != complete_vr3_grade_counts
        or vr3_manifest.get("category_counts") != dict(vr3_category_counts)
        or vr3_manifest.get("source_manifest_sha256") != source_manifest_sha
        or vr3_manifest.get("coverage_complete") is not True
        or vr3_manifest.get("runtime_or_production_tested") is not False
        or vr3_manifest.get("release_change") is not False
        or vr3_manifest.get("next_versie_authorized") is not False
    ):
        errors.append(
            "VR-003 manifest mismatch: inspect report_id, source_request, "
            "verification_framework, claim_count, status_counts, "
            "evidence_grade_counts, category_counts, source_manifest_sha256, "
            "coverage_complete, runtime_or_production_tested, release_change, "
            "and next_versie_authorized"
        )

    report_entries = {
        str(item.get("report_id")): item
        for item in index.get("reports", [])
        if isinstance(item, dict)
    }
    vr3_index = report_entries.get(LATEST_REPORT_ID, {})
    if (
        set(report_entries) != {"VR-001", "VR-002", "VR-003"}
        or vr3_index.get("claim_count") != len(vr3_claims)
        or vr3_index.get("status_counts") != dict(vr3_status_counts)
        or vr3_index.get("machine_readable") is not True
        or vr3_index.get("release_change") is not False
    ):
        errors.append("Verification index does not correctly register VR-001 through VR-003")

    serialized = json.dumps(
        {
            "claims": claims,
            "manifest": manifest,
            "index": index,
            "schema": schema,
            "vr3_claims": vr3_claims_doc,
            "vr3_manifest": vr3_manifest,
            "vr3_sources": vr3_sources,
        },
        ensure_ascii=False,
    )
    for label, pattern in SECRET_PATTERNS.items():
        if pattern.search(serialized):
            errors.append(f"Potential {label} in verification JSON")

    if errors:
        print("Verification report check failed:")
        for error in errors:
            print(f"- {error}")
        return 1
    print(
        "Verification report check passed: "
        f"VR-001=245 claims, VR-003={len(vr3_claims)} claims, "
        f"VR-003 statuses={dict(vr3_status_counts)}, grades={complete_vr3_grade_counts}"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
