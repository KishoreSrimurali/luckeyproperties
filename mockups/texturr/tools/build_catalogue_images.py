"""Build website images from the Texturr PDF catalogues.

1. Extract the embedded images (keeps original quality):
     pdfimages -j -p Instock_Material_catalogue.pdf  X/stock/s
     pdfimages -j -p Product_Catalogue.pdf           X/prod/p
     pdfimages -j -p Flute_Catalogue.pdf             X/flute/f
     pdfimages -j -p Aluminum_profile_board.pdf      X/alu/a
2. python3 tools/build_catalogue_images.py X

Swatch codes were matched by eye against each catalogue page, because the PDF's
image order does not always follow the printed grid (e.g. in-stock page 3).
"""
import os
import sys
from PIL import Image

X = sys.argv[1]
OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "img")

# In-stock swatches: code -> extracted file. Output is cropped to 5:7 portrait.
SWATCHES = {
    # Metal (in-stock pages 2-3)
    "t-mat-1701": "stock/s-002-010.jpg", "t-mat-1703": "stock/s-002-011.jpg", "t-mat-1705": "stock/s-002-012.jpg",
    "t-mat-1734": "stock/s-002-013.jpg", "t-mat-1903": "stock/s-003-026.jpg", "t-mat-26701": "stock/s-003-023.jpg",
    # Wood (pages 4-5)
    "t-nat-7004": "stock/s-004-034.jpg", "t-nat-7032": "stock/s-004-031.jpg", "t-nat-7041": "stock/s-004-032.jpg",
    "t-nat-80045": "stock/s-005-042.jpg",
    # Solid (pages 6-7)
    "t-sol-2016": "stock/s-006-052.jpg", "t-sol-2063": "stock/s-006-055.jpg", "t-sol-30031": "stock/s-007-064.jpg",
    # Stone (pages 8-9)
    "t-stn-8027": "stock/s-009-081.jpg", "t-stn-8070": "stock/s-009-080.jpg", "t-stn-8001": "stock/s-008-070.jpg",
    "t-stn-4018": "stock/s-008-073.jpg", "t-stn-4039": "stock/s-008-075.jpg",
    # Cloth (page 10)
    "t-pat-5003": "stock/s-010-086.jpg", "t-pat-5078": "stock/s-010-089.jpg",
}

# Room and product photography: name -> (file, output widths)
PHOTOS = {
    "cat-lobby-fluted": ("stock/s-001-000.jpg", (800, 1400)),
    "cat-experience-center": ("stock/s-013-113.jpg", (800, 1150)),
    "cat-impactshield-layers": ("prod/p-004-022.jpg", (600, 900)),
    "cat-metal-panels": ("prod/p-006-038.jpg", (700,)),
    "cat-metal-corridor": ("prod/p-012-104.jpg", (800, 1400)),
    "cat-wood-dining": ("prod/p-013-107.jpg", (700,)),
    "cat-solid-living": ("prod/p-021-197.jpg", (700,)),
    "cat-stone-reception": ("prod/p-025-235.jpg", (700, 1050)),
    "cat-fluted-collage": ("prod/p-034-342.jpg", (700, 1110)),
    "cat-fluted-living": ("flute/f-018-207.jpg", (800, 1200)),
    "cat-fluted-bedroom": ("flute/f-020-219.jpg", (800, 1200)),
    "cat-alu-profiles": ("alu/a-003-003.jpg", (800, 1600)),
}

os.makedirs(OUT, exist_ok=True)


def save(im, name, widths):
    for w in widths:
        w2 = min(w, im.width)  # never upscale
        im.resize((w2, round(im.height * w2 / im.width)), Image.LANCZOS).save(
            os.path.join(OUT, f"{name}-{w}.webp"), "WEBP", quality=80, method=6)


for code, src in SWATCHES.items():
    im = Image.open(os.path.join(X, src)).convert("RGB")
    w, h = im.size
    target = 5 / 7
    if w / h > target:  # too wide: trim the sides
        nw = round(h * target); im = im.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
    else:  # too tall: trim top and bottom
        nh = round(w / target); im = im.crop((0, (h - nh) // 2, w, (h - nh) // 2 + nh))
    save(im, f"sw-{code}", (360, 500))
    print(f"sw-{code:14s} {im.size}")

for name, (src, widths) in PHOTOS.items():
    im = Image.open(os.path.join(X, src)).convert("RGB")
    save(im, name, widths)
    print(f"{name:26s} {im.size}")
