#!/usr/bin/env python3
"""qualify-title: an mdbook preprocessor that rewrites each page's H1 to its
qualified name, built from the SUMMARY hierarchy.

A page whose SUMMARY label is "Multihop", nested under "BGP", renders its H1 as
"BGP Multihop". The hierarchy comes from mdbook's `parent_names` (the SUMMARY
indentation), *not* the folder layout, so files can live wherever you like.

Source .md files are never modified: mdbook pipes chapter content through this
script at build time and renders whatever we hand back.

Protocol (mdbook 0.5):
  * `qualify_title.py supports <renderer>`  -> exit 0 to opt in.
  * otherwise: read `[context, book]` JSON from stdin, write the mutated `book`
    JSON to stdout. Anything we print to stdout other than that book breaks the
    build, so all diagnostics go to stderr.

Configuration (book.toml, all optional):

  [preprocessor.qualify-title]
  command   = "python3 scripts/qualify-title/qualify_title.py"
  separator = " "        # string joining hierarchy parts: " ", " > ", " / " ...
  leaf-separator = " "   # separator just before the page's own title; defaults
                         # to `separator`. e.g. "OSPFv2 > LSA Types: Type 1"
  levels    = 1          # ancestors to include: 1 = immediate parent (default),
                         # 0 = full chain, N = the last N ancestors
  inject-if-missing = true   # if a page has no H1, inject one from the hierarchy
"""
import json
import os
import re
import sys

# Silent by default so it doesn't clutter `mdbook serve`. Set QUALIFY_TITLE_DEBUG=1
# (or any non-empty value) to see per-build diagnostics on stderr.
DEBUG = bool(os.environ.get("QUALIFY_TITLE_DEBUG"))

# --- defaults; every key is overridable from [preprocessor.qualify-title] ----
DEFAULTS = {
    "separator": " ",
    "leaf-separator": None,      # falls back to `separator` when unset
    "levels": 0,                 # 0 = all ancestors (full chain), 1 = immediate parent, N = last N
    "inject-if-missing": True,
}

ATX_H1 = re.compile(r"^(#)[ \t]+(\S.*?)[ \t]*#*[ \t]*$")
FENCE = re.compile(r"^[ \t]*(```|~~~)")


def log(*args):
    if DEBUG:
        print("[qualify-title]", *args, file=sys.stderr)


def load_config(context):
    cfg = dict(DEFAULTS)
    section = (
        context.get("config", {})
        .get("preprocessor", {})
        .get("qualify-title", {})
    )
    for key in DEFAULTS:
        if key in section:
            cfg[key] = section[key]
    if cfg["leaf-separator"] is None:
        cfg["leaf-separator"] = cfg["separator"]
    try:
        cfg["levels"] = int(cfg["levels"])
    except (TypeError, ValueError):
        cfg["levels"] = DEFAULTS["levels"]
    return cfg


def select_ancestors(parent_names, levels):
    """Pick which ancestor labels to use, top-most first.

    levels <= 0 -> all of them; otherwise the last `levels` (those nearest the
    page, which read most naturally as a prefix).
    """
    if not parent_names:
        return []
    if levels <= 0:
        return list(parent_names)
    return list(parent_names[-levels:])


def build_h1_text(ancestors, leaf_title, cfg):
    """Join ancestors + the page's own title into the final H1 text."""
    sep, leaf_sep = cfg["separator"], cfg["leaf-separator"]
    if not ancestors:
        return leaf_title
    prefix = sep.join(ancestors)
    return f"{prefix}{leaf_sep}{leaf_title}"


def already_qualified(current, ancestors, cfg):
    """Idempotency / hand-authored guard: skip if the H1 already starts with the
    ancestor prefix (so we never double-prepend)."""
    if not ancestors:
        return True
    return current.startswith(cfg["separator"].join(ancestors))


def transform_content(content, ancestors, cfg):
    """Rewrite the first ATX H1 in `content`, or inject one. Returns new content
    (or the original, unchanged, if there's nothing to do)."""
    lines = content.split("\n")
    in_fence = False
    for i, line in enumerate(lines):
        if FENCE.match(line):
            in_fence = not in_fence
            continue
        if in_fence:
            continue
        m = ATX_H1.match(line)
        if not m:
            continue
        current = m.group(2)
        if already_qualified(current, ancestors, cfg):
            return content
        lines[i] = "# " + build_h1_text(ancestors, current, cfg)
        return "\n".join(lines)

    # No H1 found.
    if cfg["inject-if-missing"] and ancestors:
        # We have no leaf title from the page; use the deepest ancestor's child
        # context is unknown here, so inject just the ancestor chain. Callers
        # that want the page name injected should ensure pages carry an H1.
        injected = "# " + cfg["separator"].join(ancestors)
        return injected + "\n\n" + content
    return content


def walk(items, cfg, stats):
    for item in items:
        # BookItem is a tagged enum: Chapter -> {"Chapter": {...}},
        # PartTitle -> {"PartTitle": "..."}, Separator -> the bare string
        # "Separator". Skip anything that isn't a Chapter dict.
        if not isinstance(item, dict):
            continue
        chapter = item.get("Chapter")
        if not chapter:
            continue  # PartTitle
        ancestors = select_ancestors(chapter.get("parent_names") or [], cfg["levels"])
        if chapter.get("path") and ancestors:
            new = transform_content(chapter.get("content", ""), ancestors, cfg)
            if new != chapter.get("content"):
                chapter["content"] = new
                stats["changed"] += 1
        walk(chapter.get("sub_items", []), cfg, stats)


def main():
    if len(sys.argv) > 1 and sys.argv[1] == "supports":
        # We touch only markdown content, so we support every renderer.
        sys.exit(0)

    raw = sys.stdin.read()
    dump = os.environ.get("QUALIFY_TITLE_DUMP")
    if dump:
        with open(dump, "w") as fh:
            fh.write(raw)
    context, book = json.loads(raw)
    cfg = load_config(context)
    stats = {"changed": 0}
    # mdbook serializes the book's top level as "items" (older docs say
    # "sections"); accept either.
    walk(book.get("items", book.get("sections", [])), cfg, stats)
    log(f"qualified {stats['changed']} chapter title(s)"
        f" (separator={cfg['separator']!r}, levels={cfg['levels']})")
    json.dump(book, sys.stdout)


if __name__ == "__main__":
    main()
