#!/usr/bin/env bash
#
# stamp-page-mtimes.sh
#
# Set the mtime of each built HTML page to the date of the last git commit
# that touched its source Markdown. `static-sitemap-cli` derives <lastmod>
# from file mtime, but `mdbook build` stamps every page with the build time --
# so without this, every page's lastmod is "now" on every deploy, which is
# useless for SEO. Run this after `mdbook build` and before generating the
# sitemap.
#
# Mapping is positional: book/foo.html  <-  src/foo.md
#                        book/ospf/x.html <- src/ospf/x.md
#
# Usage:
#   scripts/sitemap/stamp-page-mtimes.sh [--dry-run] [book_dir] [src_dir]
#
# Requires full git history (clone with fetch-depth: 0 in CI).

set -euo pipefail

dry_run=false
if [[ "${1:-}" == "--dry-run" ]]; then
  dry_run=true
  shift
fi

book_dir="${1:-book}"
src_dir="${2:-src}"

if [[ ! -d "$book_dir" ]]; then
  echo "error: book directory not found: $book_dir (run 'mdbook build' first)" >&2
  exit 1
fi

stamped=0
skipped=0

while IFS= read -r html; do
  # book/ospf/x.html -> src/ospf/x.md
  rel="${html#"$book_dir"/}"
  src="$src_dir/${rel%.html}.md"

  if [[ ! -f "$src" ]]; then
    # Generated pages (index.html, print.html, ...) have no 1:1 source;
    # leave their build-time mtime as a harmless fallback.
    skipped=$((skipped + 1))
    continue
  fi

  ts="$(git log -1 --format=%cI -- "$src")"
  if [[ -z "$ts" ]]; then
    skipped=$((skipped + 1))
    continue
  fi

  if $dry_run; then
    printf '%s  <-  %s  (%s)\n' "$html" "$src" "$ts"
  else
    touch -d "$ts" "$html"
  fi
  stamped=$((stamped + 1))
done < <(find "$book_dir" -name '*.html')

if $dry_run; then
  echo "dry-run: would stamp $stamped page(s), skip $skipped"
else
  echo "stamped $stamped page(s) from git, skipped $skipped"
fi
