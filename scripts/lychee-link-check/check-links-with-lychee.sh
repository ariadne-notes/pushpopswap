#!/usr/bin/env bash
# Run the lychee link checker over the book's markdown sources.
# Runs from its own directory so the config and .lycheecache stay out of the
# repo root, and locates src/ via the git root so it survives being moved.
# Extra args are passed through to lychee.
#
#   ./scripts/lychee-link-check/check-links.sh            # check everything
#   ./scripts/lychee-link-check/check-links.sh --verbose  # ...with extra flags
set -euo pipefail

cd "$(dirname "$0")"
root="$(git rev-parse --show-toplevel)"

# Body links are root-absolute (/foo.md, /pdfs/...) per the book convention.
# Point lychee's root dir at src/ so those resolve like they do in the built site.
exec lychee --config lychee.toml --root-dir "$root/src" "$@" "$root/src/**/*.md"
