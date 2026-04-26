#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / 'docs'
OUTPUT = DOCS / '08-context' / 'context-index.json'
REQUIRED = ['id', 'name', 'project', 'owner', 'status', 'artifact_type', 'modules', 'tags', 'related', 'last_reviewed']


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


def main():
    records = []
    missing = []
    for path in sorted(DOCS.rglob('*.md')):
        text = path.read_text(encoding='utf-8')
        fm = parse_frontmatter(text)
        rel = path.relative_to(ROOT).as_posix()
        if not fm:
            missing.append(rel)
            continue
        if not fm.get('id'):
            missing.append(f'{rel} :: missing field id')
            continue
        record = {
            'id': fm.get('id', ''),
            'path': rel,
            'type': fm.get('artifact_type', ''),
            'status': fm.get('status', ''),
            'project': fm.get('project', ''),
            'modules': fm.get('modules', []),
            'tags': fm.get('tags', []),
            'owner': fm.get('owner', ''),
            'related': fm.get('related', []),
            'last_reviewed': fm.get('last_reviewed', ''),
        }
        records.append(record)
        for field in REQUIRED:
            if field not in fm:
                missing.append(f'{rel} :: missing field {field}')
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps({'documents': records, 'missing': missing}, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
    print(f'Indexed {len(records)} documents')
    if missing:
        print('Warnings:')
        for item in missing:
            print(f'- {item}')


if __name__ == '__main__':
    main()
