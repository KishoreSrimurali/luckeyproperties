# Texturr UI mockups

Four core screens plus a UI-system sheet, built responsively in HTML/CSS and rendered to PNG at
**1440 px (desktop)** and **390 px (mobile)**.

**Brief:** Texturr is a **B2B** supplier of architectural surfaces (large-format stone-look slabs, wood and
fluted panels, metal profiles and lacquer) to architects, interior designers, contractors and developers working on
hospitality, workplace, retail and residential projects. **No prices are shown anywhere:** pricing is
project-based and quoted on request. The conversions are **Request a quote**, **Request samples** (a trade
sample request with company, role, project, sector and stage) and **Become a partner**.
Product names, formats, specifications and project captions are placeholders for you to confirm.

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
| Collection: sector filters, sample toggles, sticky sample-request bar | `desktop-02-collection.png` | `mobile-02-collection.png`, `mobile-02-collection-fold.png` |
| Product (Calacatta Oro): gallery, key facts, technical downloads, quote and sample request | `desktop-03-product.png` | `mobile-03-product.png`, `mobile-03-product-fold.png` |
| Sample request: details, project, sector, stage, delivery | `desktop-04-sample-box.png` | `mobile-04-sample-box.png` |
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

## Deploy on Vercel

This folder is a self-contained static site. The repository root is a different app (the LUCKEY Properties
Next.js site), so deploying from the root will never serve Texturr. In the Vercel project:

1. **Settings → Build & Deployment → Root Directory:** `mockups/texturr`
2. **Framework Preset:** Other. `vercel.json` already sets `"framework": null`, which overrides the preset.
   Leave the Build Command and Output Directory empty.
3. **Branch:** this site exists only on `claude/texturr-design-review-lj8thi`. Either set
   **Settings → Git → Production Branch** to that branch, or merge it into your default branch.
4. Redeploy.

`vercel.json` turns on clean URLs (`/collection` instead of `/collection.html`) and caches assets.
`.vercelignore` keeps the mockup PNGs and tooling out of the deployment, and `404.html` is the branded
not-found page.

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
