/* Texturr catalogue for the mockups: one source for product names, prices, photography and alt text.
   Cards render into <div data-cards="key,key" data-feature="key">. Sample-box state comes from
   <body data-inbox="key,key">. Names, prices and specs are placeholders until confirmed. */
(function () {
  const P = {
    calacatta: { family: "Stone-look slab", use: "Walls & counters", name: "Calacatta Oro", price: 148, img: "card-calacatta", w: [480, 960], sw: "sw-calacatta", href: "product.html",
      alt: "Calacatta Oro slabs, white with gold and grey veining, on a reception wall" },
    statuario: { family: "Stone-look slab", use: "Walls", name: "Statuario Bianco", price: 132, img: "card-statuario", w: [480, 800], sw: "sw-statuario",
      alt: "Statuario Bianco slabs lining a lobby wall beside a bronze sculpture" },
    breccia: { family: "Stone-look slab", use: "Feature walls", name: "Breccia Grigio", price: 156, img: "card-breccia", w: [480, 960], sw: "sw-breccia",
      alt: "Breccia Grigio slabs, white with grey and brown fragments, behind a reception desk" },
    nero: { family: "Stone-look slab", use: "Feature walls", name: "Nero Fiume", price: 164, img: "card-nero", w: [480, 800], sw: "sw-nero",
      alt: "Nero Fiume slabs, dark brown-grey stone with flowing veins" },
    onyx: { family: "Feature slab", use: "Backlit walls", name: "Onyx Aurora", price: 210, img: "card-onyx", w: [384], sw: "sw-onyx", tag: "New",
      alt: "Onyx Aurora feature slab with blue and coral veining above a reception desk" },
    "oak-fluted": { family: "Wood panel", use: "Walls & arches", name: "Fluted Smoked Oak", price: 96, img: "card-oak-fluted", w: [480, 960], sw: "sw-oak-fluted", tag: "Bestseller",
      alt: "Fluted smoked oak panels forming layered arches" },
    "oak-panel": { family: "Wood panel", use: "Walls", name: "Natural Oak", price: 78, img: "card-oak-panel", w: [384],
      alt: "Natural oak wall panels lining a meeting room" },
    champagne: { family: "Metal profile", use: "Ceilings & walls", name: "Champagne Profile", price: 120, img: "card-champagne", w: [480, 960], sw: "sw-champagne",
      alt: "Champagne metal profiles framing a lit, arched corridor ceiling" },
    "mirror-black": { family: "Lacquer", use: "Columns & ceilings", name: "Mirror Black", price: 138, img: "card-mirror-black", w: [480, 960],
      alt: "Mirror Black high-gloss lacquer wrapping a curved column" },
  };

  const esc = (s) => s.replace(/&/g, "&amp;");
  const srcset = (base, widths) => widths.map((w) => `assets/img/${base}-${w}.webp ${w}w`).join(", ");
  const img = (base, widths, alt, sizes, { w = 4, h = 5, eager = false } = {}) =>
    `<img src="assets/img/${base}-${widths[0]}.webp" srcset="${srcset(base, widths)}" sizes="${sizes}" ` +
    `width="${w * 100}" height="${h * 100}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;

  const inbox = (document.body.dataset.inbox || "").split(",").filter(Boolean);
  const icon = (n) => (window.TexturrIcon ? window.TexturrIcon(n) : "");

  function card(key, feature) {
    const p = P[key];
    const href = p.href || "#";
    const on = inbox.includes(key);
    const sizes = feature ? "(max-width: 900px) 100vw, 50vw" : "(max-width: 900px) 50vw, 25vw";
    return `<article class="card${feature ? " card--feature" : ""}">
      <div class="card-media">${img(p.img, p.w, p.alt, sizes)}</div>
      ${p.tag ? `<span class="tag">${p.tag}</span>` : ""}
      <button class="card-add" type="button" aria-pressed="${on}" aria-label="${on ? `${p.name} is in your sample box` : `Add ${p.name} to sample box`}">${icon(on ? "check" : "plus")}<span>${on ? "In sample box" : "Sample"}</span></button>
      <div class="card-body">
        <p class="eyebrow">${p.family}<span class="eb-use"> · ${esc(p.use)}</span></p>
        <h3><a href="${href}">${p.name}</a></h3>
        <p class="meta num">From £${p.price} / m²</p>
      </div>
    </article>`;
  }

  document.querySelectorAll("[data-cards]").forEach((el) => {
    const feature = el.dataset.feature;
    el.innerHTML = el.dataset.cards.split(",").map((k) => card(k, k === feature)).join("");
  });
  // Swatch thumbnails: <span data-swatch="key"></span>
  document.querySelectorAll("[data-swatch]").forEach((el) => {
    const p = P[el.dataset.swatch];
    el.style.backgroundImage = `url("assets/img/${p.sw}-160.webp")`;
    el.classList.add("swatch-img");
  });

  window.Texturr = { products: P, img, inbox };
})();
