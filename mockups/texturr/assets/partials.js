/* Shared chrome for the Texturr site: icons, sample-request store, header, mobile menu, footer.
   <body data-page="materials"> sets the current nav item.
   ?menu=open opens the mobile menu, and ?demo=1 seeds the sample request from <body data-inbox> (both for screenshots). */
(function () {
  const ICONS = {
    search: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>',
    box: '<path d="M4 8.5 12 4l8 4.5v7L12 20l-8-4.5z"/><path d="m4 8.5 8 4.5 8-4.5M12 13v7"/>',
    menu: '<path d="M4 8h16M4 16h16"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    alert: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5.5M12 16.2v.3"/>',
    truck: '<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17.5" cy="17.5" r="1.8"/>',
    leaf: '<path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14z"/><path d="M5 19 13 11"/>',
    drop: '<path d="M12 3.5c3.5 4.5 6 7.6 6 10.5a6 6 0 0 1-12 0c0-2.9 2.5-6 6-10.5z"/>',
    ruler: '<path d="m3 16 13-13 5 5L8 21z"/><path d="m7 12 2 2M10 9l2 2M13 6l2 2"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/>',
    heart: '<path d="M12 19s-7-4.4-7-9.5A3.9 3.9 0 0 1 12 7a3.9 3.9 0 0 1 7 2.5C19 14.6 12 19 12 19z"/>',
    ig: '<rect x="4" y="4" width="16" height="16" rx="4.5"/><circle cx="12" cy="12" r="3.6"/><path d="M16.8 7.2v.1"/>',
  };
  const icon = (n, cls = "ic") => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n] || ""}</svg>`;
  window.TexturrIcon = icon;

  const body = document.body;
  const page = body.dataset.page || "";
  const params = new URLSearchParams(location.search);

  // Sample request store: decor keys saved in localStorage so the selection follows the visitor between pages.
  // Storage can be unavailable (private mode, blocked cookies); the selection then lasts for the page view only.
  const KEY = "texturr-samples";
  const demo = params.get("demo") === "1";
  let memory = demo ? (body.dataset.inbox || "").split(",").filter(Boolean) : [];
  const read = () => {
    if (demo) return memory.slice();
    try { return JSON.parse(localStorage.getItem(KEY) || "[]").filter((k) => typeof k === "string"); } catch { return memory.slice(); }
  };
  const write = (list) => {
    memory = list.slice();
    if (!demo) { try { localStorage.setItem(KEY, JSON.stringify(list)); } catch { /* keep in memory */ } }
    document.dispatchEvent(new CustomEvent("samples:change", { detail: list.slice() }));
  };
  window.TexturrSamples = {
    list: read,
    has: (k) => read().includes(k),
    toggle(k) { const l = read(); const i = l.indexOf(k); i < 0 ? l.push(k) : l.splice(i, 1); write(l); return i < 0; },
    remove(k) { write(read().filter((x) => x !== k)); },
    clear() { write([]); },
  };
  const count = read().length;
  const minimal = "minimal" in body.dataset; // sample request form: no nav, one way out
  const nav = [
    ["panels", "Panels", "index.html#panels"],
    ["materials", "Finishes", "collection.html"],
    ["projects", "Projects", "index.html#projects"],
    ["visit", "Experience Center", "index.html#visit"],
  ];
  const cur = (k) => (k === page ? ' aria-current="page"' : "");
  // Logo artwork: traced from the supplied logo, recoloured to the locked palette.
  // Standard = #111827 letters (light grounds); reverse = white letters (dark grounds). Stripes keep the logo red.
  const logo = (reverse, full) =>
    `<img src="assets/brand/texturr-${full ? "logo" : "wordmark"}${reverse ? "-reverse" : ""}.svg" alt="" ` +
    (full ? `width="624" height="144"` : `width="624" height="98"`) + `>`;
  window.TexturrLogo = logo;
  const wordmark = `<a class="wordmark" href="index.html" aria-label="Texturr home">${logo(false)}</a>`;
  const wordmarkRev = `<a class="wordmark" href="index.html" aria-label="Texturr home">${logo(true)}</a>`;

  const header = `
    <a class="skip" href="#main">Skip to content</a>
    <header class="header">
      <div class="wrap">
        ${wordmark}
        ${minimal ? `<div class="header-actions"><a class="link" href="collection.html">Keep browsing</a></div>` : `
        <nav class="nav" aria-label="Primary">${nav.map(([k, l, h]) => `<a href="${h}"${cur(k)}>${l}</a>`).join("")}</nav>
        <div class="header-actions">
          <a class="icon-btn search-btn" href="collection.html#search" aria-label="Search finishes">${icon("search")}</a>
          <a class="icon-btn sample-link" href="samples.html" aria-label="Sample request, ${count} finishes">${icon("box")}<span class="badge num" aria-hidden="true"${count ? "" : " hidden"}>${count}</span></a>
          <a class="btn btn--sm" href="quote.html">Request a quote</a>
          <button class="icon-btn menu-btn" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mnav">${icon("menu")}</button>
        </div>`}
      </div>
    </header>
    <div class="mnav dark" id="mnav" role="dialog" aria-modal="true" aria-label="Menu">
      <div class="mnav-top">${wordmarkRev}<button class="icon-btn" type="button" aria-label="Close menu">${icon("close")}</button></div>
      <ul>
        <li><a href="index.html#panels">Panels <small>ImpactShield · Fluted</small></a></li>
        <li><a href="collection.html">Finishes <small>In stock</small></a></li>
        <li><a href="index.html#projects">Projects ${icon("arrow")}</a></li>
        <li><a href="index.html#visit">Experience Center ${icon("arrow")}</a></li>
        <li><a href="samples.html">Sample request <small class="num sample-count">${count}</small></a></li>
      </ul>
      <div class="mnav-foot">
        <a class="btn btn--light btn--block" href="quote.html">Request a quote</a>
        <a class="btn btn--ghost btn--block" style="--fg:var(--white);--bd:var(--on-dark-2)" href="collection.html">Request samples</a>
        <p class="meta">+91 99160 89900 · info@texturr.com</p>
      </div>
    </div>`;

  const footer = `
    <footer class="footer dark">
      <div class="wrap">
        <div class="footer-grid">
          <div>
            <a class="footer-logo" href="index.html" aria-label="Texturr, Surface Evolution — home">${logo(true, true)}</a>
            <p class="lede" style="margin-top:20px;max-width:24em">ImpactShield and Fluted wall panels for residential, commercial and hospitality projects.</p>
            <a class="btn btn--light" href="quote.html" style="margin-top:28px">Request a quote ${icon("arrow")}</a>
          </div>
          <div><h2 class="foot-h">Products</h2><ul><li><a href="index.html#panels">ImpactShield Panel</a></li><li><a href="index.html#panels">Fluted Panel</a></li><li><a href="collection.html">In-stock finishes</a></li><li><a href="assets/downloads/texturr-aluminium-profiles.pdf">Aluminium profiles (PDF)</a></li><li><a href="assets/downloads/texturr-product-catalogue.pdf">Product catalogue (PDF)</a></li></ul></div>
          <div><h2 class="foot-h">Series</h2><ul><li><a href="collection.html?series=metal">Metal</a></li><li><a href="collection.html?series=wood">Wood</a></li><li><a href="collection.html?series=solid">Solid</a></li><li><a href="collection.html?series=stone">Stone</a></li><li><a href="collection.html?series=cloth">Cloth</a></li></ul></div>
          <div><h2 class="foot-h">Experience Center</h2><address class="foot-addr">Galaxy Surfaces<br># 168, 3rd Floor, Arasoji Rao Building<br>R V Road, Near Minerva Circle<br>Bengaluru 560004</address><ul><li><a href="tel:+919916089900">+91 99160 89900</a></li><li><a href="mailto:info@texturr.com">info@texturr.com</a></li></ul></div>
        </div>
        <div class="footer-base">
          <span>© 2026 Texturr India · Galaxy Surfaces</span>
          <nav aria-label="Footer"><a href="quote.html?topic=visit">Book a visit</a><a href="mailto:info@texturr.com">info@texturr.com</a></nav>
        </div>
      </div>
    </footer>`;

  document.querySelectorAll("[data-include=header]").forEach((el) => (el.outerHTML = header));
  const slimFooter = `
    <footer class="footer footer--slim dark">
      <div class="wrap footer-base">
        <span>© 2026 Texturr India · +91 99160 89900</span>
        <nav aria-label="Footer"><a href="mailto:info@texturr.com">info@texturr.com</a></nav>
      </div>
    </footer>`;
  document.querySelectorAll("[data-include=footer]").forEach((el) => (el.outerHTML = minimal ? slimFooter : footer));
  document.querySelectorAll("i[data-icon]").forEach((el) => (el.outerHTML = icon(el.dataset.icon)));

  // Menu open/close with focus handoff
  const html = document.documentElement;
  const openBtn = document.querySelector(".menu-btn");
  const closeBtn = document.querySelector(".mnav-top .icon-btn");
  const setMenu = (open) => {
    html.classList.toggle("menu-open", open);
    openBtn && openBtn.setAttribute("aria-expanded", String(open));
    (open ? closeBtn : openBtn) && (open ? closeBtn : openBtn).focus({ preventScroll: true });
  };
  openBtn && openBtn.addEventListener("click", () => setMenu(true));
  closeBtn && closeBtn.addEventListener("click", () => setMenu(false));
  document.addEventListener("keydown", (e) => e.key === "Escape" && html.classList.contains("menu-open") && setMenu(false));
  if (params.get("menu") === "open") html.classList.add("menu-open");
  // Close the menu when one of its in-page links is followed
  document.querySelectorAll(".mnav a").forEach((a) => a.addEventListener("click", () => html.classList.remove("menu-open")));

  // Segmented controls
  document.addEventListener("click", (e) => {
    const seg = e.target.closest(".seg button");
    if (seg) seg.parentElement.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b === seg)));
  });
})();
