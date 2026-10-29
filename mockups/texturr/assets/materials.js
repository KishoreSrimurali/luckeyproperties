/* Procedural material textures for the Texturr mockups.
   Each texture composites only locked-palette colours (with alpha) over a palette base,
   so no off-brand colour can enter the imagery. Apply with data-mat="<key>". */
(function () {
  const P = {
    bone: "#F5F2EC", ink: "#191917", white: "#FFFFFF", carbon: "#171715", stone: "#77736C",
    mist: "#D0CBC2", linen: "#DED9D0", graphite: "#393834", sand: "#B4A99A", bronze: "#8A735B",
  };
  const rgb = (h) => [1, 3, 5].map((i) => (parseInt(h.slice(i, i + 2), 16) / 255).toFixed(3));

  // layer: colour painted where noise passes. alpha = k * R + c (R = turbulence red channel)
  const layer = (id, col, o) => {
    const [r, g, b] = rgb(P[col]);
    return `<filter id='${id}' x='0' y='0' width='100%' height='100%' color-interpolation-filters='sRGB'>` +
      `<feTurbulence type='${o.type || "fractalNoise"}' baseFrequency='${o.f}' numOctaves='${o.oct || 4}' seed='${o.seed || 1}' stitchTiles='stitch'/>` +
      `<feColorMatrix type='matrix' values='0 0 0 0 ${r} 0 0 0 0 ${g} 0 0 0 0 ${b} ${o.k} 0 0 0 ${o.c}'/>` +
      // table: remap alpha so only a narrow noise level shows, giving contour-line veins
      (o.table ? `<feComponentTransfer><feFuncA type='table' tableValues='${o.table}'/></feComponentTransfer><feGaussianBlur stdDeviation='1.6'/>` : "") +
      `</filter>` +
      `<rect width='100%' height='100%' filter='url(#${id})'/>`;
  };

  const M = {
    // Lime plaster: soft trowel clouds
    chalk: { base: "bone", layers: [
      { col: "stone", f: "0.0045 0.006", k: 0.55, c: -0.24, seed: 3 },
      { col: "white", f: "0.008", k: -1.1, c: 0.62, seed: 9 },
      { col: "mist", f: "0.6", oct: 2, k: 0.5, c: -0.22, seed: 2 } ] },
    // Microcement: cloudy with fine aggregate
    ash: { base: "mist", layers: [
      { col: "stone", f: "0.006 0.009", k: 0.9, c: -0.38, seed: 5 },
      { col: "bone", f: "0.012", k: -1.3, c: 0.68, seed: 11 },
      { col: "graphite", f: "0.9", oct: 1, k: 4, c: -2.75, seed: 4 } ] },
    // Travertine: horizontal bedding + pits
    sand: { base: "linen", layers: [
      { col: "sand", f: "0.0012 0.016", k: 1.7, c: -0.66, seed: 7 },
      { col: "bone", f: "0.0016 0.03", k: -1.5, c: 0.74, seed: 12 },
      { col: "bronze", f: "0.035 0.12", oct: 2, k: 9, c: -6.6, seed: 21 } ] },
    // Tadelakt: polished, deep clouds
    umber: { base: "bronze", layers: [
      { col: "graphite", f: "0.004 0.005", k: 1.1, c: -0.48, seed: 8 },
      { col: "sand", f: "0.007", k: -1.4, c: 0.62, seed: 14 },
      { col: "carbon", f: "0.7", oct: 1, k: 0.35, c: -0.15, seed: 6 } ] },
    // Basalt: honed speckle
    graphite: { base: "graphite", layers: [
      { col: "carbon", f: "0.01", k: 1.2, c: -0.5, seed: 4 },
      { col: "stone", f: "0.75", oct: 1, k: 3.4, c: -2.1, seed: 17 },
      { col: "sand", f: "1.1", oct: 1, k: 6, c: -4.3, seed: 23 } ] },
    // Oxide plaster: smoky near-black
    carbon: { base: "ink", layers: [
      { col: "graphite", f: "0.0035 0.005", k: 1.3, c: -0.5, seed: 19 },
      { col: "carbon", f: "0.01", k: -1.2, c: 0.6, seed: 2 },
      { col: "stone", f: "0.8", oct: 1, k: 0.4, c: -0.2, seed: 8 } ] },
    // Clay plaster: earthy, more open grain
    taupe: { base: "sand", layers: [
      { col: "bronze", f: "0.006 0.008", k: 1.1, c: -0.45, seed: 13 },
      { col: "linen", f: "0.01", k: -1.2, c: 0.55, seed: 3 },
      { col: "graphite", f: "0.85", oct: 1, k: 3.2, c: -2.2, seed: 29 } ] },
    // Veined limestone: turbulence ridges as veins
    vein: { base: "bone", layers: [
      { col: "linen", f: "0.004", k: 0.9, c: -0.3, seed: 31 },
      { col: "sand", f: "0.0022 0.0034", oct: 2, k: 1, c: 0, seed: 6, table: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.7 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0" },
      { col: "stone", f: "0.0016 0.0026", oct: 2, k: 1, c: 0, seed: 41, table: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0" } ] },
    // Linen wallcovering: crossed warp/weft threads
    linen: { base: "linen", layers: [
      { col: "sand", f: "0.004 0.03", k: 0.9, c: -0.36, seed: 2 },
      { col: "bone", f: "0.9 0.012", oct: 2, k: 1.6, c: -0.62, seed: 5 },
      { col: "sand", f: "0.012 0.9", oct: 2, k: 1.5, c: -0.6, seed: 8 } ] },
  };

  const cache = {};
  function uri(key) {
    if (cache[key]) return cache[key];
    const m = M[key];
    const body = m.layers.map((l, i) => layer(`${key}${i}`, l.col, l)).join("");
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='900' height='900'><rect width='100%' height='100%' fill='${P[m.base]}'/>${body}</svg>`;
    const bg = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
    return (cache[key] = { bg, base: P[m.base] });
  }

  function paint(root) {
    (root || document).querySelectorAll("[data-mat]").forEach((el) => {
      const t = uri(el.dataset.mat);
      if (!t) return;
      el.style.backgroundColor = t.base;
      el.style.backgroundImage = t.bg;
    });
  }
  window.TexturrMaterials = { paint, keys: Object.keys(M), palette: P };
  document.addEventListener("DOMContentLoaded", () => paint());
})();
