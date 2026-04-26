#!/usr/bin/env python3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TARGETS = ['src', 'scripts', 'docs', 'supabase']
PATTERNS = ['TODO', 'FIXME', 'HACK', 'TEMP', 'bypass', 'test omitted', 'despues refactorizamos', 'después refactorizamos']


def main():
    findings = []
    for target in TARGETS:
        base = ROOT / target
        if not base.exists():
            continue
        for path in base.rglob('*'):
            if not path.is_file():
                continue
            try:
                text = path.read_text(encoding='utf-8', errors='ignore')
            except Exception:
                continue
            for lineno, line in enumerate(text.splitlines(), start=1):
                lower = line.lower()
                for pattern in PATTERNS:
                    if pattern.lower() in lower:
                        findings.append((path.relative_to(ROOT).as_posix(), lineno, line.strip()))
                        break
    if not findings:
        print('No technical debt markers found.')
        return
    print('Technical debt markers found:')
    for path, lineno, line in findings:
        print(f'- {path}:{lineno} -> {line}')


if __name__ == '__main__':
    main()
