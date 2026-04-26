#!/usr/bin/env python3
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / 'docs'
REQUIRED_FIELDS = ['id', 'name', 'project', 'owner', 'status', 'artifact_type', 'modules', 'tags', 'related', 'last_reviewed']
VALID_STATUS = {'draft', 'active', 'review', 'approved', 'superseded', 'archived', 'proposed', 'rejected'}
VALID_TYPES = {'feature-spec', 'adr', 'runbook', 'debt-item', 'governance', 'quality', 'ops', 'product', 'delivery'}
CRITICAL = [
    ROOT / 'README.md',
    DOCS / '01-product' / 'vision.md',
    DOCS / '01-product' / 'backlog.md',
    DOCS / '02-delivery' / 'sprint-log.md',
    DOCS / '02-delivery' / 'change-log.md',
    DOCS / '03-architecture' / 'system-overview.md',
    DOCS / '03-architecture' / 'adrs' / 'ADR-001-stack-base.md',
    DOCS / '04-quality' / 'technical-debt-register.md',
    DOCS / '04-quality' / 'known-issues.md',
    DOCS / '05-ops' / 'runbook.md',
    DOCS / '06-governance' / 'working-agreement.md',
    DOCS / '06-governance' / 'agent-roster.md',
]


def parse_scalar(value: str):
    value = value.strip()
    if value.startswith('[') and value.endswith(']'):
        inner = value[1:-1].strip()
        if not inner:
            return []
        return [item.strip().strip('"\'') for item in inner.split(',')]
    return value.strip('"\'')


def parse_frontmatter(text: str):
    if not text.startswith('---\n'):
        return None
    parts = text.split('\n---\n', 1)
    if len(parts) != 2:
        return None
    block = parts[0].splitlines()[1:]
    data = {}
    current_key = None
    for line in block:
        if not line.strip():
            continue
        if line.startswith('  - ') and current_key:
            data.setdefault(current_key, []).append(line[4:].strip())
            continue
        if ':' not in line:
            continue
        key, value = line.split(':', 1)
        key = key.strip()
        value = value.strip()
        current_key = key
        if value == '':
            data[key] = []
        else:
            data[key] = parse_scalar(value)
    return data


def validate_file(path: Path, errors):
    text = path.read_text(encoding='utf-8')
    fm = parse_frontmatter(text)
    rel = path.relative_to(ROOT).as_posix()
    if not fm:
        errors.append(f'{rel}: missing valid frontmatter')
        return
    for field in REQUIRED_FIELDS:
        if field not in fm:
            errors.append(f'{rel}: missing field {field}')
    if 'status' in fm and fm['status'] not in VALID_STATUS:
        errors.append(f"{rel}: invalid status {fm['status']}")
    if 'artifact_type' in fm and fm['artifact_type'] not in VALID_TYPES:
        errors.append(f"{rel}: invalid artifact_type {fm['artifact_type']}")
    if not fm.get('owner'):
        errors.append(f'{rel}: owner is empty')


def main():
    errors = []
    warnings = []
    for path in CRITICAL:
        if not path.exists():
            errors.append(f'missing critical file: {path.relative_to(ROOT).as_posix()}')
        else:
            validate_file(path, errors)
    validate_file(ROOT / 'README.md', errors)
    critical_set = {p.resolve() for p in CRITICAL}
    for path in DOCS.rglob('*.md'):
        if path.resolve() in critical_set:
            continue
        text = path.read_text(encoding='utf-8')
        fm = parse_frontmatter(text)
        rel = path.relative_to(ROOT).as_posix()
        if not fm:
            warnings.append(f'{rel}: legacy doc without frontmatter')
    if errors:
        print('Documentation validation failed:')
        for error in errors:
            print(f'- {error}')
        sys.exit(1)
    print('Documentation validation passed for critical artifacts.')
    if warnings:
        print('Warnings:')
        for warning in warnings:
            print(f'- {warning}')


if __name__ == '__main__':
    main()
