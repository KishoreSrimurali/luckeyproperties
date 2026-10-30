/* Texturr decor catalogue, taken from the In-Stock Material Catalogue.
   Codes and series are Texturr's own; the "look" line is a short visual description.
   B2B: no prices are shown anywhere; pricing is project-based and quoted on request.
   Cards render into <div data-cards="key,key">; app.js re-renders them for filtering. */
(function () {
  // Series copy is from the product catalogue
  const SERIES = {
    Metal: { prefix: "T-MAT", room: "cat-metal-panels-700", roomW: 890,
      text: "Sleek metallic finishes that replicate aluminium, steel and bronze, for a modern industrial look with durability and low maintenance.",
      roomAlt: "Brushed metal-look Texturr panels leaning against a dark wall" },
    Wood: { prefix: "T-NAT", room: "cat-wood-dining-700", roomW: 890,
      text: "The natural look of real wood with the durability of composite materials, bringing warmth to interiors with minimal maintenance.",
      roomAlt: "A dining room lined in warm wood-grain Texturr panels" },
    Solid: { prefix: "T-SOL", room: "cat-solid-living-700", roomW: 890,
      text: "Smooth, uniform colour finishes for clean, contemporary interiors, bringing simplicity and elegance to any space.",
      roomAlt: "A calm living room with smooth, solid-colour Texturr wall panels" },
    Stone: { prefix: "T-STN", room: "cat-stone-reception-1050", roomW: 889,
      text: "The look of marble, granite and slate with the lightweight, cost-effective benefits of advanced panel technology.",
      roomAlt: "A reception wall clad in white marble-look Stone Series panels behind a grey stone counter" },
    Cloth: { prefix: "T-PAT", room: null,
      text: "Durable panels with elegant cloth-like textures and patterns, a sophisticated alternative to traditional wall finishes.",
      roomAlt: "" },
  };

  const D = [
    // key, series, look (all from the in-stock range)
    ["t-stn-8027", "Stone", "White marble, grey veining"],
    ["t-stn-8070", "Stone", "Black marble, white veining"],
    ["t-stn-8001", "Stone", "White breccia"],
    ["t-stn-4018", "Stone", "Grey-green marble"],
    ["t-stn-4039", "Stone", "Travertine"],
    ["t-nat-7004", "Wood", "Dark walnut grain"],
    ["t-nat-7041", "Wood", "Light oak grain"],
    ["t-nat-7032", "Wood", "Grey-washed oak"],
    ["t-nat-80045", "Wood", "Dark wood grain"],
    ["t-mat-1701", "Metal", "Champagne"],
    ["t-mat-1703", "Metal", "Brushed silver"],
    ["t-mat-1705", "Metal", "Brushed gold"],
    ["t-mat-1734", "Metal", "Rose metallic"],
    ["t-mat-1903", "Metal", "Gold leaf"],
    ["t-mat-26701", "Metal", "Dark woven metal"],
    ["t-sol-2016", "Solid", "Sand beige"],
    ["t-sol-2063", "Solid", "Forest green"],
    ["t-sol-30031", "Solid", "Ribbed grey"],
    ["t-pat-5003", "Cloth", "Grey linen weave"],
    ["t-pat-5078", "Cloth", "Brown linen weave"],
  ];
  const P = {};
  D.forEach(([key, series, look], order) => {
    P[key] = {
      key, series, look, order,
      code: key.toUpperCase().replace(/^(T-[A-Z]+)-/, "$1 "), // t-stn-8027 -> T-STN 8027
      stock: "In stock",
      href: `product.html?d=${key}`,
    };
  });

  const srcset = (key) => `assets/img/sw-${key}-360.webp 360w, assets/img/sw-${key}-500.webp 500w`;
  const has = (k) => (window.TexturrSamples ? window.TexturrSamples.has(k) : false);
  const icon = (n) => (window.TexturrIcon ? window.TexturrIcon(n) : "");

  // Sample toggle button markup, shared by cards and the decor page
  const sampleBtn = (key, cls = "card-add") => {
    const p = P[key]; const on = has(key);
    return `<button class="${cls}" type="button" data-sample="${key}" aria-pressed="${on}">${icon(on ? "check" : "plus")}<span>${on ? "Sample requested" : "Sample"}</span><span class="sr-only"> ${p.code}</span></button>`;
  };

  function card(key) {
    const p = P[key];
    return `<article class="card card--decor" data-key="${key}" data-series="${p.series.toLowerCase()}">
      <div class="card-media"><img src="assets/img/sw-${key}-360.webp" srcset="${srcset(key)}" sizes="(max-width: 900px) 50vw, 20vw"
        width="500" height="700" alt="${p.code}, ${p.series} Series: ${p.look.toLowerCase()}" loading="lazy" decoding="async"></div>
      ${sampleBtn(key)}
      <div class="card-body">
        <p class="eyebrow">${p.series} Series</p>
        <h3><a href="${p.href}">${p.code}</a></h3>
        <p class="meta">${p.look} · ${p.stock}</p>
      </div>
    </article>`;
  }

  const renderCards = (el, keys) => (el.innerHTML = keys.map(card).join(""));
  document.querySelectorAll("[data-cards]").forEach((el) => renderCards(el, el.dataset.cards.split(",")));
  // Swatch thumbnails: <span data-swatch="t-stn-8027"></span>
  const paintSwatches = (root = document) => root.querySelectorAll("[data-swatch]").forEach((el) => {
    el.style.backgroundImage = `url("assets/img/sw-${el.dataset.swatch}-360.webp")`;
    el.classList.add("swatch-img");
  });
  paintSwatches();

  window.Texturr = { decors: P, series: SERIES, card, renderCards, sampleBtn, paintSwatches, srcset };
})();
