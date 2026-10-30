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
    # Full scenes
    "lobby-statuario":   (9,  (0.06, 0.0, 0.94, 1.0), None, (800, 1400, 2000)),
    "reception-calacatta": (11, (0.0, 0.0, 1.0, 1.0), 4 / 3, (800, 1400, 2000)),
    "living-nero":       (10, (0.0, 0.0, 1.0, 1.0), None, (800, 1400, 2000)),
    "corridor-champagne": (2, (0.0, 0.0, 1.0, 1.0), None, (800, 1400, 2400)),
    "office-oak":        (3,  (0.0, 0.0, 1.0, 1.0), None, (800, 1400, 2000)),
    "residence-living":  (5,  (0.0, 0.0, 1.0, 1.0), None, (800, 1400)),
    "residence-bedroom": (14, (0.08, 0.05, 0.92, 1.0), None, (800, 1400)),
    "retail-steel":      (4,  (0.60, 0.22, 1.0, 1.0), None, (600, 1000)),
    # Product cards, 4:5
    "card-calacatta":    (11, (0.16, 0.0, 0.66, 1.0), 4 / 5, (480, 960)),
    "card-statuario":    (9,  (0.0, 0.20, 0.30, 1.0), 4 / 5, (480, 800)),
    "card-breccia":      (7,  (0.04, 0.04, 0.39, 1.0), 4 / 5, (480, 960)),
    "card-nero":         (10, (0.27, 0.07, 0.50, 1.0), 4 / 5, (480, 800)),
    "card-onyx":         (13, (0.27, 0.43, 0.47, 1.0), 4 / 5, (384,)),
    "card-oak-fluted":   (3,  (0.0, 0.0, 0.35, 1.0), 4 / 5, (480, 960)),
    "card-oak-panel":    (8,  (0.0, 0.10, 0.30, 1.0), 4 / 5, (384,)),
    "card-champagne":    (2,  (0.30, 0.05, 0.70, 1.0), 4 / 5, (480, 960)),
    "card-mirror-black": (6,  (0.20, 0.10, 0.55, 1.0), 4 / 5, (480, 960)),
    # Macro and swatches, 1:1
    "macro-calacatta":   (11, (0.24, 0.04, 0.44, 1.0), 1, (640,)),
    "macro-calacatta-wide": (11, (0.0, 0.0, 0.62, 1.0), 5 / 3, (800, 1400)),
    "sw-calacatta":      (11, (0.26, 0.10, 0.36, 1.0), 1, (160,)),
    "sw-statuario":      (9,  (0.02, 0.27, 0.12, 1.0), 1, (160,)),
    "sw-breccia":        (7,  (0.08, 0.18, 0.16, 1.0), 1, (160,)),
    "sw-nero":           (10, (0.33, 0.20, 0.43, 1.0), 1, (160,)),
    "sw-onyx":           (13, (0.41, 0.46, 0.51, 1.0), 1, (160,)),
    "sw-oak-fluted":     (3,  (0.02, 0.30, 0.14, 1.0), 1, (160,)),
    "sw-champagne":      (2,  (0.42, 0.30, 0.52, 1.0), 1, (160,)),
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
