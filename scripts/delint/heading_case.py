#!/usr/bin/env python3
"""Normalize heading case:
   - H1 (#)      -> Title Case
   - H2+ (##...) -> sentence case
Acronyms / mixed-case / digit tokens and a proper-noun allowlist are preserved.
Headings inside fenced code blocks (``` or ~~~) are left untouched.

Usage:
  heading_case.py --dry-run [files...]   # show before/after, change nothing
  heading_case.py --apply   [files...]   # rewrite files in place
"""
import re
import sys
import pathlib

# Proper nouns / brand words that must keep their capitalization even in
# sentence case. Match is case-insensitive on the bare word; value is the
# canonical form to emit.
PROPER = {
    "cisco": "Cisco", "nexus": "Nexus", "wireshark": "Wireshark",
    "ethernet": "Ethernet", "internet": "Internet", "linux": "Linux",
    "windows": "Windows", "intel": "Intel", "juniper": "Juniper",
    "openconfig": "OpenConfig", "github": "GitHub",
    "python": "Python", "sonet": "Sonet", "pagent": "Pagent",
    "cisco's": "Cisco's",
}

# Minor words that stay lowercase in Title Case (unless first/last word).
TITLE_MINOR = {
    "a", "an", "and", "as", "at", "but", "by", "for", "if", "in", "into",
    "nor", "of", "off", "on", "or", "the", "to", "up", "via", "with", "vs",
}

# Multi-word brand phrases fixed up after per-word recasing (case-insensitive).
PHRASES = {
    "cisco live": "Cisco Live",
}

WORD_RE = re.compile(r"[^\s]+")


def is_acronymish(word):
    """True if the word should be left exactly as-is (acronym, mixed-case,
    contains a digit/underscore, or has an uppercase letter past position 0)."""
    core = word.strip("().,:;*`\"'")
    if not core:
        return False
    if any(ch.isdigit() or ch == "_" for ch in core):
        return True
    letters = [c for c in core if c.isalpha()]
    if letters and all(c.isupper() for c in letters):
        return True  # all caps -> acronym (NAT, BGP, STP)
    # uppercase letter anywhere after the first char -> mixed case (IPv6, LLMs)
    if any(c.isupper() for c in core[1:]):
        return True
    return False


def recase_word(word, mode, first, last):
    # Preserve leading/trailing markdown punctuation around the core token.
    m = re.match(r"^(\W*)(.*?)(\W*)$", word, re.DOTALL)
    lead, core, trail = m.group(1), m.group(2), m.group(3)
    if not core:
        return word
    if is_acronymish(core):
        return word
    low = core.lower()
    if low in PROPER:
        return lead + PROPER[low] + trail
    if mode == "title":
        if low in TITLE_MINOR and not first and not last:
            return lead + low + trail
        return lead + low[:1].upper() + low[1:] + trail
    else:  # sentence
        if first:
            return lead + low[:1].upper() + low[1:] + trail
        return lead + low + trail


def recase(text, mode):
    words = text.split()
    out = []
    for i, w in enumerate(words):
        out.append(recase_word(w, mode, first=(i == 0), last=(i == len(words) - 1)))
    result = " ".join(out)
    for low, canon in PHRASES.items():
        result = re.sub(re.escape(low), canon, result, flags=re.IGNORECASE)
    return result


def process(path, apply):
    lines = path.read_text().splitlines(keepends=True)
    in_fence = False
    changes = []
    for idx, line in enumerate(lines):
        stripped = line.lstrip()
        if stripped.startswith("```") or stripped.startswith("~~~"):
            in_fence = not in_fence
            continue
        if in_fence:
            continue
        m = re.match(r"^(#{1,6})\s+(.*?)\s*$", line)
        if not m:
            continue
        hashes, content = m.group(1), m.group(2)
        mode = "title" if len(hashes) == 1 else "sentence"
        new_content = recase(content, mode)
        if new_content != content:
            changes.append((idx + 1, hashes, content, new_content))
            lines[idx] = f"{hashes} {new_content}\n"
    if apply and changes:
        path.write_text("".join(lines))
    return changes


def main():
    args = sys.argv[1:]
    apply = "--apply" in args
    files = [a for a in args if not a.startswith("--")]
    if not files:
        files = [str(p) for p in pathlib.Path("src").glob("*.md")]
    total = 0
    for f in sorted(files):
        p = pathlib.Path(f)
        if p.name == "SUMMARY.md":
            continue
        ch = process(p, apply)
        if ch:
            print(f"\n### {f}")
            for ln, h, old, new in ch:
                print(f"  L{ln} [{h}]  {old!r}")
                print(f"        -> {new!r}")
            total += len(ch)
    print(f"\n{'APPLIED' if apply else 'DRY-RUN'}: {total} heading(s) across {len(files)} files")


if __name__ == "__main__":
    main()
