#!/usr/bin/env python3
import subprocess
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def changed_files():
    try:
        out = subprocess.check_output(['git', 'diff', '--name-only', 'HEAD~1', 'HEAD'], cwd=ROOT)
        return [line.strip() for line in out.decode().splitlines() if line.strip()]
    except Exception:
        return []


def classify(path: str) -> str:
    if path.startswith('docs/'):
        return 'docs'
    if path.startswith('supabase/'):
        return 'infra'
    if path.startswith('src/'):
        return 'feature'
    if path.startswith('scripts/') or path.startswith('.githooks/'):
        return 'refactor'
    return 'fix'


def main():
    files = changed_files()
    if not files:
        print('No recent changed files found to propose changelog entry.')
        return
    print(f'Proposed changelog entries for {date.today().isoformat()}:')
    for path in files:
        print(f'- tipo: {classify(path)} | modulo: pending | archivo: {path}')


if __name__ == '__main__':
    main()
