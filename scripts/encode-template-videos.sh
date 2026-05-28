#!/usr/bin/env bash
# Re-encode template preview videos for sharper playback (screen recordings).
# Usage: ./scripts/encode-template-videos.sh [input.mp4 ...]
# With no args, processes public/videos/*.optimized.mp4 in place (backs up first).

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT_DIR="${ROOT}/public/videos"
BACKUP_DIR="${OUT_DIR}/.source-backup"
CRF="${VIDEO_CRF:-19}"
PRESET="${VIDEO_PRESET:-slow}"
MAX_WIDTH="${VIDEO_MAX_WIDTH:-1280}"

mkdir -p "$BACKUP_DIR"

encode_one() {
  local input="$1"
  local base
  base="$(basename "$input")"
  local output="${OUT_DIR}/${base}"
  local tmp="${OUT_DIR}/.encoding-${base}"

  if [[ ! -f "$input" ]]; then
    echo "skip (missing): $input" >&2
    return 0
  fi

  if [[ "$input" != "$output" ]]; then
    cp -f "$input" "$output"
  fi

  if [[ ! -f "${BACKUP_DIR}/${base}" ]]; then
    cp -f "$output" "${BACKUP_DIR}/${base}"
    echo "backup → ${BACKUP_DIR}/${base}"
  fi

  echo "encoding ${base} (crf=${CRF}, preset=${PRESET}, max width=${MAX_WIDTH})…"
  ffmpeg -y -hide_banner -loglevel warning -i "$output" \
    -an \
    -vf "scale='min(${MAX_WIDTH},iw)':-2:flags=lanczos" \
    -c:v libx264 \
    -preset "$PRESET" \
    -crf "$CRF" \
    -profile:v high \
    -level 4.1 \
    -pix_fmt yuv420p \
    -movflags +faststart \
    -tune animation \
    "$tmp"

  mv -f "$tmp" "$output"
  ffprobe -v error -show_entries format=size,bit_rate,duration -of default=noprint_wrappers=1 "$output"
  echo ""
}

if [[ "$#" -gt 0 ]]; then
  for f in "$@"; do
    encode_one "$f"
  done
else
  shopt -s nullglob
  for f in "${OUT_DIR}"/*.optimized.mp4; do
    encode_one "$f"
  done
fi

echo "Done."
