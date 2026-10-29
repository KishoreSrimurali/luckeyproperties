# Texturr UI mockups

Four core screens plus a UI-system sheet, built responsively in HTML/CSS and rendered to PNG at
**1440 px (desktop)** and **390 px (mobile)**.

**Assumed brief:** Texturr is a premium studio for mineral surface finishes (lime and clay plaster, microcement,
tadelakt, natural stone, linen). The site's primary conversion is **five free hand-finished samples**, and its
secondary conversion is **a consultation or quote**. Product names, prices and specifications are placeholders.

## Screens (`png/`)

| Screen | Desktop | Mobile |
| --- | --- | --- |
| UI system: palette roles, type, components, materials, rules | `desktop-00-design-system.png` | — |
| Home: interactive still-life hero, collection, sampling, material study | `desktop-01-home.png`, `desktop-01-home-fold.png` | `mobile-01-home.png`, `mobile-01-home-fold.png` |
| Collection: filters, sample toggles, sticky sample bar | `desktop-02-collection.png` | `mobile-02-collection.png`, `mobile-02-collection-fold.png` |
| Product (Clay Plaster, Taupe): gallery, tone/finish, cost estimate | `desktop-03-product.png` | `mobile-03-product.png`, `mobile-03-product-fold.png` |
| Sample box checkout: focused header, error state, summary | `desktop-04-sample-box.png` | `mobile-04-sample-box.png` |
| Mobile menu | — | `mobile-05-menu.png` |

"Fold" shots show the first screen exactly as a visitor sees it, including sticky bars.
The full-length shots place each sticky bar at the end of the page, where it comes to rest when you scroll to the bottom.

## Locked palette

`#F5F2EC` Bone · `#191917` Ink · `#FFFFFF` White · `#171715` Carbon · `#77736C` Stone ·
`#D0CBC2` Mist · `#DED9D0` Linen · `#393834` Graphite · `#B4A99A` Sand · `#8A735B` Bronze

No other colour appears in any file. Material imagery is generated from these colours (`assets/materials.js`),
so imagery can't introduce an off-brand hue either. Contrast rules:

- Body text is Ink. Secondary text is Graphite (10.5:1 on Bone). On dark backgrounds, use Sand (7.6:1 on Ink).
- Bronze (4.0:1) and Stone (4.2:1) never set small text on Bone. Use them only for display type, icons,
  the focus ring and placeholders on White (4.7:1).

## Run / re-render

```
python3 -m http.server 8000      # then open http://localhost:8000
node render.js                   # regenerates png/ (needs Playwright + Chromium)
```

Fonts: Instrument Serif (display) and Inter (text) are bundled in `fonts/` under the SIL Open Font License.

## Checked

- axe-core 4.10 (WCAG 2.1 A/AA and best-practice): 0 violations on all 5 pages at 1440 and 390.
- No horizontal overflow at 390 px. No console errors.
- Mobile menu: focus moves to Close on open, Escape closes it and returns focus, and `aria-expanded` stays in sync.
- Skip link is the first tab stop.
- Animations are disabled under `prefers-reduced-motion`.
- Tap targets are at least 44 px. Card titles stretch to cover the whole card.
