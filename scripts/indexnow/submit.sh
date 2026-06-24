#!/usr/bin/env bash
#
# submit.sh
#
# Submit a list of URLs (one per line on stdin) to IndexNow in a single bulk
# request. api.indexnow.org fans the submission out to all participating
# engines (Bing, Yandex, Seznam, Naver, ...). Google does NOT use IndexNow.
#
# Ownership is proven by the key file served at https://<host>/<key>.txt, which
# the build job writes from the INDEXNOW_KEY secret. Run this after deploy so
# the submitted URLs and the key file are live.
#
# Usage:
#   scripts/indexnow/changed-urls.sh <before> <after> | scripts/indexnow/submit.sh
#
# Environment:
#   INDEXNOW_KEY  required  the IndexNow key (matches the served <key>.txt)
#   HOST          optional  site host (default: pushpopswap.com)

set -euo pipefail

: "${INDEXNOW_KEY:?INDEXNOW_KEY is required}"
host="${HOST:-pushpopswap.com}"

urls="$(sed '/^[[:space:]]*$/d' | sort -u)"
count="$(printf '%s' "$urls" | grep -c . || true)"

if [[ "$count" -eq 0 ]]; then
  echo "IndexNow: no changed pages to submit; nothing to do."
  exit 0
fi

echo "IndexNow: submitting ${count} URL(s):"
printf '  %s\n' $urls

# urlList JSON array: "url","url",...
url_json="$(printf '%s\n' "$urls" | sed 's/.*/"&"/' | paste -sd ',' -)"

payload="$(cat <<EOF
{"host":"${host}","key":"${INDEXNOW_KEY}","keyLocation":"https://${host}/${INDEXNOW_KEY}.txt","urlList":[${url_json}]}
EOF
)"

http_code="$(curl -sS -o /tmp/indexnow_resp -w '%{http_code}' \
  -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  --data "$payload")"

echo "IndexNow responded ${http_code}:"
cat /tmp/indexnow_resp 2>/dev/null || true
echo

# 200 = OK, 202 = accepted/validation pending.
case "$http_code" in
  200|202) echo "Submitted ${count} URL(s)." ;;
  *) echo "IndexNow submission failed (${http_code})." >&2; exit 1 ;;
esac
