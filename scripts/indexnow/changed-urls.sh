#!/usr/bin/env bash
#
# changed-urls.sh
#
# Print the public URLs of the pages whose source Markdown changed between two
# git revisions -- i.e. exactly the pages this push touched, so IndexNow gets a
# precise list instead of a "everything modified in the last N days" guess.
#
# Mapping is positional and matches stamp-page-mtimes.sh:
#   src/foo.md       ->  <base>/foo.html
#   src/ospf/x.md    ->  <base>/ospf/x.html
# A source file is only emitted if its built HTML exists, so non-page sources
# (SUMMARY.md, robots.txt, drafts, deletions) are naturally skipped.
#
# Run in the build job, after `mdbook build`, with full git history
# (fetch-depth: 0).
#
# Usage:
#   scripts/indexnow/changed-urls.sh <before-sha> [after-sha]
#
# Environment:
#   BASE_URL  optional  site base (default: https://pushpopswap.com)
#   BOOK_DIR  optional  built site dir (default: book)
#   SRC_DIR   optional  markdown source dir (default: src)

set -euo pipefail

base_url="${BASE_URL:-https://pushpopswap.com}"
book_dir="${BOOK_DIR:-book}"
src_dir="${SRC_DIR:-src}"

before="${1:-}"
after="${2:-HEAD}"

# Resolve the diff base. On manual runs / new branches `before` may be empty or
# the all-zero SHA; fall back to the commit before `after`, and to the empty
# tree if even that does not exist (very first commit).
empty_tree="$(git hash-object -t tree /dev/null)"
if [[ -n "$before" && ! "$before" =~ ^0+$ ]] && git cat-file -e "${before}^{commit}" 2>/dev/null; then
  : # usable before sha
elif git cat-file -e "${after}~1^{commit}" 2>/dev/null; then
  before="${after}~1"
else
  before="$empty_tree"
fi

urls="$(
  git diff --name-only --diff-filter=d "$before" "$after" -- "$src_dir" \
    | { grep -E '\.md$' || true; } \
    | while IFS= read -r src; do
        rel="${src#"$src_dir"/}"
        html="$book_dir/${rel%.md}.html"
        [[ -f "$html" ]] || continue
        printf '%s/%s\n' "${base_url%/}" "${rel%.md}.html"
      done \
    | sort -u
)"

# Always print to stdout (local use, CI logs).
printf '%s\n' "$urls"

# In GitHub Actions, also expose the list as the `urls` step output so the
# next job can consume it without re-deriving anything.
if [[ -n "${GITHUB_OUTPUT:-}" ]]; then
  if [[ -z "$urls" ]]; then
    echo "urls=" >> "$GITHUB_OUTPUT"
  else
    {
      echo "urls<<__INDEXNOW_EOF__"
      printf '%s\n' "$urls"
      echo "__INDEXNOW_EOF__"
    } >> "$GITHUB_OUTPUT"
  fi
fi
