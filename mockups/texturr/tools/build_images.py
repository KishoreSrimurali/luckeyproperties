"""Crop and resize the supplied Texturr photography into responsive WebP files.

Usage: python3 tools/build_images.py <folder with image_N.jpg> 
Writes assets/img/<name>-<width>.webp. Crops are fractions of the source (x0, y0, x1, y1);
when an aspect is given, the box height is derived from its width, anchored at y0.
"""
import sys, os
from PIL import Image

SRC = sys.argv[1]
OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "img")

# name: (source number, crop box, aspect w/h or None, output widths)
SPEC = {
    # Supplied project photography still used by the site (everything else now comes from the catalogues)
    "corridor-champagne": (2, (0.0, 0.0, 1.0, 1.0), None, (800, 1400, 2400)),
    "office-oak":         (3, (0.0, 0.0, 1.0, 1.0), None, (800, 1400, 2000)),
}

os.makedirs(OUT, exist_ok=True)
for name, (n, (x0, y0, x1, y1), aspect, widths) in SPEC.items():
    im = Image.open(os.path.join(SRC, f"image_{n}.jpg")).convert("RGB")
    W, H = im.size
    box = [x0 * W, y0 * H, x1 * W, y1 * H]
    if aspect:
        h = (box[2] - box[0]) / aspect
        if box[1] + h > H:  # not enough height: keep height, narrow the width around its centre
            h = H - box[1]
            w = h * aspect
            cx = (box[0] + box[2]) / 2
            box[0], box[2] = cx - w / 2, cx + w / 2
        box[3] = box[1] + h
    crop = im.crop(tuple(round(v) for v in box))
    for w in widths:
        w2 = min(w, crop.width)  # never upscale
        out = crop.resize((w2, round(crop.height * w2 / crop.width)), Image.LANCZOS)
        out.save(os.path.join(OUT, f"{name}-{w}.webp"), "WEBP", quality=78, method=6)
    print(f"{name:22s} from #{n:<2d} crop {crop.width}x{crop.height} -> {widths}")
