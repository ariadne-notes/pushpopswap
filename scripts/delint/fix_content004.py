#!/usr/bin/env python3
"""Fix CONTENT004: heading capitalization (Title Case or sentence case per file style)."""
import re
import subprocess
from pathlib import Path

BACKTICK_RE = re.compile(r'`[^`]+`')
VIOLATION_RE = re.compile(
    r"warning\[CONTENT004\]: Heading '(.+?)' uses inconsistent capitalization \(expected (Title Case|sentence case)\)\s+"
    r"--> (.+?):(\d+):\d+"
)


def is_acronym(word):
    clean = re.sub(r'[^A-Za-z]', '', word)
    return len(clean) >= 2 and clean.isupper()


def title_case(text):
    saved, counter = {}, [0]
    def save(m):
        k = f'\x00{counter[0]}\x00'; saved[k] = m.group(0); counter[0] += 1; return k
    text = BACKTICK_RE.sub(save, text)

    words = text.split(' ')
    out = []
    for word in words:
        if not word:
            out.append(word); continue
        parts = word.split('-')
        out.append('-'.join(
            p if is_acronym(p) else (p[0].upper() + p[1:] if p and p[0].isalpha() else p)
            for p in parts
        ))
    text = ' '.join(out)
    for k, v in saved.items():
        text = text.replace(k, v)
    return text


def sentence_case(text):
    saved, counter = {}, [0]
    def save(m):
        k = f'\x00{counter[0]}\x00'; saved[k] = m.group(0); counter[0] += 1; return k
    text = BACKTICK_RE.sub(save, text)

    words = text.split(' ')
    out = []
    for i, word in enumerate(words):
        if not word:
            out.append(word); continue
        if i == 0:
            out.append(word[0].upper() + word[1:] if word[0].isalpha() else word)
        elif is_acronym(word):
            out.append(word)
        else:
            out.append(word[0].lower() + word[1:] if word[0].isalpha() else word)
    text = ' '.join(out)
    for k, v in saved.items():
        text = text.replace(k, v)
    return text


def get_violations():
    result = subprocess.run(
        ['mdbook-lint', 'lint', 'src/', '--enable', 'CONTENT004'],
        capture_output=True, text=True
    )
    output = result.stdout + result.stderr
    violations = []
    i = 0
    lines = output.splitlines()
    while i < len(lines):
        block = '\n'.join(lines[i:i+3])
        m = VIOLATION_RE.search(block)
        if m:
            violations.append({
                'text': m.group(1),
                'style': m.group(2),
                'file': m.group(3),
                'line': int(m.group(4)),
            })
            i += 3
        else:
            i += 1
    return violations


def apply_fixes(violations):
    # Group by file
    by_file = {}
    for v in violations:
        by_file.setdefault(v['file'], []).append(v)

    for filepath, file_violations in by_file.items():
        p = Path(filepath)
        if not p.exists():
            continue
        lines = p.read_text().splitlines(keepends=True)
        changed = False

        for v in file_violations:
            lineno = v['line'] - 1  # 0-indexed
            if lineno >= len(lines):
                continue
            line = lines[lineno]
            m = re.match(r'^(#{1,6}\s+)(.*?)(\s*)$', line.rstrip('\n'))
            if not m:
                continue
            hashes, current_text, trailing = m.group(1), m.group(2), m.group(3)

            if v['style'] == 'Title Case':
                fixed = title_case(current_text)
            else:
                fixed = sentence_case(current_text)

            if fixed != current_text:
                lines[lineno] = hashes + fixed + trailing + '\n'
                changed = True
                print(f'  {filepath}:{v["line"]}: "{current_text}" → "{fixed}"')

        if changed:
            p.write_text(''.join(lines))


if __name__ == '__main__':
    print('Collecting violations...')
    violations = get_violations()
    print(f'Found {len(violations)} violations. Fixing...')
    apply_fixes(violations)
    print('Done.')
