#!/usr/bin/env bash
# Rebuilds src/assets/fonts/bricolage.woff2 from the fontsource package.
# Run it after updating @fontsource-variable/bricolage-grotesque or when the site needs new characters.
#
# The homepage budget is 50 KB with the font included, so the font keeps only:
# - Basic Latin and the typographic punctuation the site uses
# - weights 400 to 700, the range the pages use; the full optical-size axis, which gives the name its display cut
# - no kerning: it varies across both axes and was 23 KB of the 41 KB, with almost no visible difference in this face
set -euo pipefail
cd "$(dirname "$0")/.."
src=node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-opsz-normal.woff2
out=src/assets/fonts/bricolage.woff2
tmp=$(mktemp -d)
trap 'rm -r "$tmp"' EXIT
fonttools() { uvx -q --from 'fonttools[woff]' "$@"; }
fonttools fonttools varLib.instancer "$src" wght=400:700 -o "$tmp/range.ttf"
fonttools pyftsubset "$tmp/range.ttf" \
  --unicodes='U+0020-007E,U+00A0,U+00B7,U+00E9,U+2013,U+2014,U+2018,U+2019,U+201C,U+201D,U+2026' \
  --layout-features='liga,calt' --no-hinting --name-IDs='1,2' --drop-tables+=STAT,MVAR \
  --flavor=woff2 --output-file="$out"
echo "$out: $(stat -c %s "$out") bytes"
