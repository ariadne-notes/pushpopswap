#!/usr/bin/env bash
# Run the lychee link checker over the book's markdown sources.
# Runs from its own directory so the config and .lycheecache stay out of the
# repo root, and locates src/ via the git root so it survives being moved.
# Extra args are passed through to lychee.
#
#   ./scripts/lychee-link-check/check-links-with-lychee.sh
#   ./scripts/lychee-link-check/check-links-with-lychee.sh --ping
set -euo pipefail

cd "$(dirname "$0")"
root="$(git rev-parse --show-toplevel)"

ping=false
lychee_args=()
for arg in "$@"; do
    if [[ $arg == --ping ]]; then
        ping=true
    else
        lychee_args+=("$arg")
    fi
done

# Body links are root-absolute (/foo.md, /pdfs/...) per the book convention.
# Point lychee's root dir at src/ so those resolve like they do in the built site.
if [[ $ping == false ]]; then
    exec lychee --config lychee.toml --root-dir "$root/src" \
        "${lychee_args[@]}" "$root/src/**/*.md"
fi

set +e
lychee --config lychee.toml --root-dir "$root/src" \
    "${lychee_args[@]}" --no-progress --verbose --verbose --format json \
    "$root/src/**/*.md" 2>&1 |
    awk '
        function mark(symbol) {
            printf "%s", symbol
            fflush()
            column++
            if (column == 80) {
                print ""
                column = 0
            }
        }

        /^\[[0-9][0-9][0-9]\]/ {
            url = $2
            if (seen[url]++) next
            code = substr($0, 2, 3) + 0
            if (code < 400) {
                mark("!")
                successes++
            } else if (code < 500) {
                mark(".")
                client_errors++
                failures[++failure_count] = $0
            } else {
                mark("X")
                other_errors++
                failures[++failure_count] = $0
            }
            next
        }
        /^\[TIMEOUT\]/ {
            url = $2
            if (seen[url]++) next
            mark("?")
            timeouts++
            failures[++failure_count] = $0
            next
        }
        /^\[(ERROR|UNKNOWN|UNSUPPORTED)\]/ {
            url = $2
            if (seen[url]++) next
            mark("X")
            other_errors++
            failures[++failure_count] = $0
            next
        }
        /^\[EXCLUDED\]/ {
            url = $2
            if (!seen[url]++) skipped++
            next
        }
        /^\[INFO\]/ { next }

        END {
            if (column != 0) print ""
            print ""
            print "! OK   . HTTP 4xx   X other error   ? timeout"
            printf "Results: %d OK, %d HTTP 4xx, %d other errors, %d timeouts, %d skipped\n",
                successes, client_errors, other_errors, timeouts, skipped
            if (failure_count > 0) {
                print "\nFailures:"
                for (i = 1; i <= failure_count; i++) print "  " failures[i]
            }
        }
    '
status=${PIPESTATUS[0]}
set -e
exit "$status"
