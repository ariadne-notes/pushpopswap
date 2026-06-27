#!/usr/bin/env bash
# Run the lychee link checker over the book's markdown sources.
# Runs from its own directory so the config and .lycheecache stay out of the
# repo root, and locates src/ via the git root so it survives being moved.
# Extra args are passed through to lychee. Use --batch N/M to check one of M
# stable slices of the source files.
#
#   ./scripts/lychee-link-check/check-links-with-lychee.sh
#   ./scripts/lychee-link-check/check-links-with-lychee.sh --batch 1/10
set -euo pipefail

cd "$(dirname "$0")"
root="$(git rev-parse --show-toplevel)"

batch=
lychee_args=()
while (($#)); do
    case "$1" in
        --batch)
            if (($# < 2)); then
                printf 'error: --batch requires N/M (for example, 1/10)\n' >&2
                exit 2
            fi
            batch=$2
            shift 2
            ;;
        --batch=*)
            batch=${1#--batch=}
            shift
            ;;
        *)
            lychee_args+=("$1")
            shift
            ;;
    esac
done

mapfile -d '' files < <(
    find "$root/src" -type f -name '*.md' -print0 | sort -z
)

if [[ -n $batch ]]; then
    if [[ ! $batch =~ ^([1-9][0-9]*)/([1-9][0-9]*)$ ]]; then
        printf 'error: invalid batch %q; expected N/M (for example, 1/10)\n' "$batch" >&2
        exit 2
    fi

    batch_number=$((10#${BASH_REMATCH[1]}))
    batch_count=$((10#${BASH_REMATCH[2]}))
    if ((batch_number > batch_count)); then
        printf 'error: batch number must not exceed batch count\n' >&2
        exit 2
    fi

    start=$(((batch_number - 1) * ${#files[@]} / batch_count))
    end=$((batch_number * ${#files[@]} / batch_count))
    files=("${files[@]:start:end-start}")
    printf 'Checking batch %s: %d Markdown files\n' "$batch" "${#files[@]}" >&2
fi

# Body links are root-absolute (/foo.md, /pdfs/...) per the book convention.
# Point lychee's root dir at src/ so those resolve like they do in the built site.
exec lychee --config lychee.toml --root-dir "$root/src" \
    "${lychee_args[@]}" "${files[@]}"
