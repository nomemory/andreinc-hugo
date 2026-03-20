#!/bin/bash

INPUT_DIR="${1:-.}"
OUTPUT_DIR="${2:-./bw}"
MAX_WIDTH=1400

echo "${INPUT_DIR}"
echo "${OUTPUT_DIR}"

mkdir -p "$OUTPUT_DIR"

find "$INPUT_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read -r img; do
  filename="$(basename "$img")"
  name="${filename%.*}"
  out="$OUTPUT_DIR/${name}.png"

  magick "$img" \
    -resize "${MAX_WIDTH}x>" \
    -colorspace Gray \
    -threshold 55% \
    -strip \
    "$out"
done