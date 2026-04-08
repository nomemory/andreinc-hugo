#!/bin/zsh

set -euo pipefail

src_dir="static/images/2026-04-07-the-scroll-machine"
mode="${1:-web}"
max_size="${2:-1200}"
quality="${3:-78}"

if [[ "$mode" == "web" ]]; then
    out_dir="${src_dir}/web"
    mkdir -p "$out_dir"

    find "$src_dir" -maxdepth 1 -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \) | sort | while read -r src; do
        base="${src:t:r}"
        out="${out_dir}/${base}.webp"

        magick "$src" \
            -auto-orient \
            -resize "${max_size}x${max_size}>" \
            -strip \
            -quality "$quality" \
            -define webp:method=6 \
            "$out"

        printf '%s -> %s\n' "$src" "$out"
    done
    exit 0
fi

if [[ "$mode" == "inplace" ]]; then
    find "$src_dir" -maxdepth 1 -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \) | sort | while read -r src; do
        ext="${src:e:l}"
        tmp="${src:r}.tmp.${ext}"

        if [[ "$ext" == "jpg" || "$ext" == "jpeg" ]]; then
            magick "$src" \
                -auto-orient \
                -resize "${max_size}x${max_size}>" \
                -strip \
                -sampling-factor 4:2:0 \
                -interlace Plane \
                -quality "$quality" \
                "$tmp"
        else
            magick "$src" \
                -auto-orient \
                -resize "${max_size}x${max_size}>" \
                -strip \
                -colors 256 \
                -define png:compression-level=9 \
                -define png:compression-filter=5 \
                -define png:compression-strategy=1 \
                "$tmp"
        fi

        mv "$tmp" "$src"
        printf '%s\n' "$src"
    done
    exit 0
fi

echo "Usage: $0 [web|inplace] [max_size] [quality]" >&2
exit 1
