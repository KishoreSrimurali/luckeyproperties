/* Texturr decor catalogue for the mockups, taken from the In-Stock Material Catalogue.
   Codes and series are Texturr's own; the "look" line is a short visual description.
   B2B: no prices are shown anywhere; pricing is project-based and quoted on request.
   Cards render into <div data-cards="key,key">. Sample-request state comes from <body data-inbox="key,key">. */
(function () {
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
  D.forEach(([key, series, look]) => {
    P[key] = {
      code: key.toUpperCase().replace(/^(T-[A-Z]+)-/, "$1 "), // t-stn-8027 -> T-STN 8027
      series, look, stock: "In stock",
      href: key === "t-stn-8027" ? "product.html" : "#",
    };
  });

  const srcset = (key) => `assets/img/sw-${key}-360.webp 360w, assets/img/sw-${key}-500.webp 500w`;
  const inbox = (document.body.dataset.inbox || "").split(",").filter(Boolean);
  const icon = (n) => (window.TexturrIcon ? window.TexturrIcon(n) : "");

  function card(key) {
    const p = P[key];
    const on = inbox.includes(key);
    return `<article class="card card--decor">
      <div class="card-media"><img src="assets/img/sw-${key}-360.webp" srcset="${srcset(key)}" sizes="(max-width: 900px) 50vw, 20vw"
        width="500" height="700" alt="${p.code}, ${p.series} Series: ${p.look.toLowerCase()}" loading="lazy" decoding="async"></div>
      <button class="card-add" type="button" aria-pressed="${on}" aria-label="${on ? `${p.code} is in your sample request` : `Add ${p.code} to sample request`}">${icon(on ? "check" : "plus")}<span>${on ? "Sample requested" : "Sample"}</span></button>
      <div class="card-body">
        <p class="eyebrow">${p.series} Series</p>
        <h3><a href="${p.href}">${p.code}</a></h3>
        <p class="meta">${p.look} · ${p.stock}</p>
      </div>
    </article>`;
  }

  document.querySelectorAll("[data-cards]").forEach((el) => {
    el.innerHTML = el.dataset.cards.split(",").map(card).join("");
  });
  // Swatch thumbnails: <span data-swatch="t-stn-8027"></span>
  document.querySelectorAll("[data-swatch]").forEach((el) => {
    el.style.backgroundImage = `url("assets/img/sw-${el.dataset.swatch}-360.webp")`;
    el.classList.add("swatch-img");
  });

  window.Texturr = { decors: P, inbox };
})();
