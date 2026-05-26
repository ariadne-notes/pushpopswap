#!/usr/bin/env python3
"""Fix MD036: convert **bold** lines used as headings into proper markdown headings."""
import re
import sys
from pathlib import Path

BOLD_LINE = re.compile(r'^\*\*([^*]+)\*\*\s*$')
FENCE = re.compile(r'^\s*```')
HEADING = re.compile(r'^(#{1,6})\s')


def infer_level(lines, idx):
    for i in range(idx - 1, -1, -1):
        m = HEADING.match(lines[i])
        if m:
            return min(len(m.group(1)) + 1, 6)
    return 2


def fix_file(path):
    original = path.read_text()
    lines = original.splitlines(keepends=True)

    in_fence = False
    in_pre = False
    in_script = False
    changed = False
    out = []

    for i, line in enumerate(lines):
        stripped = line.rstrip('\n')

        if FENCE.match(stripped):
            in_fence = not in_fence
            out.append(line)
            continue

        low = stripped.lower()
        if '<pre>' in low:
            in_pre = True
        if '</pre>' in low:
            in_pre = False
            out.append(line)
            continue
        if '<script>' in low:
            in_script = True
        if '</script>' in low:
            in_script = False
            out.append(line)
            continue

        if in_fence or in_pre or in_script:
            out.append(line)
            continue

        m = BOLD_LINE.match(stripped)
        if m:
            level = infer_level(lines, i)
            out.append('#' * level + ' ' + m.group(1) + '\n')
            changed = True
        else:
            out.append(line)

    if changed:
        path.write_text(''.join(out))
    return changed


if __name__ == '__main__':
    targets = [Path(p) for p in sys.argv[1:]] if sys.argv[1:] else Path('src').rglob('*.md')
    for p in sorted(targets):
        if fix_file(p):
            print(f'fixed {p}')
