# Texturr UI mockups

Four core screens plus a UI-system sheet, built responsively in HTML/CSS and rendered to PNG at
**1440 px (desktop)** and **390 px (mobile)**.

**Brief, as inferred from the supplied photography:** Texturr supplies architectural surfaces: large-format
stone-look slabs, wood and fluted panels, metal profiles and lacquer, for commercial and residential interiors.
The site's primary conversion is **five free samples**, and its secondary conversion is **a consultation or quote**.
**Product names, prices, specifications and project captions are placeholders** for you to confirm.

## Photography

`tools/build_images.py` crops and resizes the supplied images into responsive WebP files in `assets/img/`
(2.2 MB in total, down from 7.3 MB of source JPEGs), with `srcset`, `sizes`, explicit dimensions and lazy loading
below the fold. Run it against the folder of supplied `image_N.jpg` files to rebuild.
`assets/catalog.js` holds each product's name, price, crop and alt text in one place.

- Not used: `image_12` (duplicate of `image_9`), `image_15` (near-duplicate of `image_3`), and `image_1`/`image_16`
  (logo files; the site uses the traced vectors instead).
- `image_4` is cropped to remove third-party "WELCOME / CASHIER" signage.
- Only one Calacatta photo was supplied, so its product page uses two crops of `image_11`.
  A dedicated close-up shot would strengthen it.

## Screens (`png/`)

| Screen | Desktop | Mobile |
| --- | --- | --- |
| UI system: palette roles, type, components, materials, rules | `desktop-00-design-system.png` | — |
| Home: photo hero with surface hotspots, collection, sampling, material study, projects | `desktop-01-home.png`, `desktop-01-home-fold.png` | `mobile-01-home.png`, `mobile-01-home-fold.png` |
| Collection: filters, sample toggles, sticky sample bar | `desktop-02-collection.png` | `mobile-02-collection.png`, `mobile-02-collection-fold.png` |
| Product (Calacatta Oro): gallery, colourway/finish, cost estimate | `desktop-03-product.png` | `mobile-03-product.png`, `mobile-03-product-fold.png` |
| Sample box checkout: focused header, error state, summary | `desktop-04-sample-box.png` | `mobile-04-sample-box.png` |
| Mobile menu | — | `mobile-05-menu.png` |

"Fold" shots show the first screen exactly as a visitor sees it, including sticky bars.
The full-length shots place each sticky bar at the end of the page, where it comes to rest when you scroll to the bottom.

## Logo

`assets/brand/` holds vector versions of the supplied logo, traced from `source/texturr-logo-supplied.png`
with `source/trace.py`:

- `texturr-logo.svg` / `texturr-logo-reverse.svg`: the logo with the "Surface Evolution" tagline, used in the footer
- `texturr-wordmark.svg` / `texturr-wordmark-reverse.svg`: the wordmark alone, used in the header and menu

The letterforms and red stripes are unchanged from your artwork (red sampled from `image_16`: `#EC2227`).
Letters are `#111827` on White and White on `#111827`.

## Colour

Two colours: **White `#FFFFFF` (primary)** and **`#111827` (secondary)**. Every grey in the UI is a tint of these,
so no third hue appears:

| Token | Value | Use |
| --- | --- | --- |
| `--white` | `#FFFFFF` | Canvas, header, cards, light buttons |
| `--ink` | `#111827` | Text, buttons, icons, focus ring, dark bands, footer (17.7:1 on White) |
| `--ink-2` | `#111827` at 72% | Secondary text (≈7:1) |
| `--ink-3` | `#111827` at 60% | Heading emphasis, placeholders (≈4.7:1) |
| `--line` / `--line-strong` | `#111827` at 14% / 48% | Dividers, and input borders (≈3:1) |
| `--tint` | `#111827` at 5% | Quiet panels, hover fill |
| `--on-dark-2` | White at 72% | Secondary text on `#111827` (≈9.9:1) |

The logo's red `#EC2227` appears **only in the logo stripes**, never in the UI.

## Run / re-render

```
python3 -m http.server 8000      # then open http://localhost:8000
node render.js                   # regenerates png/ (needs Playwright + Chromium)
```

Typeface: Inter only, bundled in `fonts/` under the SIL Open Font License. Headings use weight 500 with tight tracking. There are no italics and no serif.

## Checked

- axe-core 4.10 (WCAG 2.1 A/AA and best-practice): 0 violations on all 5 pages at 1440 and 390.
- No horizontal overflow at 390 px. No console errors.
- Mobile menu: focus moves to Close on open, Escape closes it and returns focus, and `aria-expanded` stays in sync.
- Skip link is the first tab stop.
- Animations are disabled under `prefers-reduced-motion`.
- Tap targets are at least 44 px. Card titles stretch to cover the whole card.
