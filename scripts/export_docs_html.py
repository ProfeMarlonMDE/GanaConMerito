#!/usr/bin/env python3
from datetime import datetime
from pathlib import Path
import html

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / 'docs'
OUT = ROOT / 'site-docs'


def render_markdown(text: str) -> str:
    lines = text.splitlines()
    parts = []
    in_code = False
    for line in lines:
        if line.startswith('```'):
            if not in_code:
                parts.append('<pre><code>')
                in_code = True
            else:
                parts.append('</code></pre>')
                in_code = False
            continue
        if in_code:
            parts.append(html.escape(line))
            continue
        esc = html.escape(line)
        if line.startswith('# '):
            parts.append(f'<h1>{esc[2:]}</h1>')
        elif line.startswith('## '):
            parts.append(f'<h2>{esc[3:]}</h2>')
        elif line.startswith('### '):
            parts.append(f'<h3>{esc[4:]}</h3>')
        elif line.startswith('- '):
            parts.append(f'<li>{esc[2:]}</li>')
        elif line.strip() == '':
            parts.append('')
        else:
            parts.append(f'<p>{esc}</p>')
    return '\n'.join(parts)


def wrap(title: str, nav: str, body: str) -> str:
    return f'''<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>{html.escape(title)}</title>
<style>
body {{ font-family: Arial, sans-serif; display: flex; margin: 0; }}
nav {{ width: 280px; background: #f4f4f4; padding: 16px; height: 100vh; overflow: auto; }}
main {{ flex: 1; padding: 24px; }}
li {{ margin-bottom: 6px; }}
pre {{ background: #111; color: #eee; padding: 12px; overflow: auto; }}
</style>
</head>
<body>
<nav>
<h2>Docs</h2>
<p>Exportado: {datetime.utcnow().isoformat()}Z</p>
{nav}
</nav>
<main>
{body}
</main>
</body>
</html>'''


def build_nav(files):
    items = ['<ul>']
    for md, html_path in files:
        label = md.relative_to(DOCS).as_posix()
        href = html_path.relative_to(OUT).as_posix()
        items.append(f'<li><a href="{href}">{html.escape(label)}</a></li>')
    items.append('</ul>')
    return ''.join(items)


def main():
    files = []
    for md in sorted(DOCS.rglob('*.md')):
        out_file = OUT / md.relative_to(DOCS)
        out_file = out_file.with_suffix('.html')
        files.append((md, out_file))
    nav = build_nav(files)
    for md, out_file in files:
        out_file.parent.mkdir(parents=True, exist_ok=True)
        body = render_markdown(md.read_text(encoding='utf-8'))
        out_file.write_text(wrap(md.stem, nav, body), encoding='utf-8')
    print(f'Exported {len(files)} documents to {OUT}')


if __name__ == '__main__':
    main()
