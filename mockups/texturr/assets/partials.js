/* Shared chrome for the Texturr mockups: icons, header, mobile menu, footer.
   <body data-page="materials" data-samples="2"> sets the current nav item and sample count.
   ?menu=open opens the mobile menu (used for the menu screenshot). */
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
  const count = +(body.dataset.samples || 0);
  const minimal = "minimal" in body.dataset; // checkout: no nav, one way out
  const nav = [
    ["materials", "Materials", "collection.html"],
    ["projects", "Projects", "#"],
    ["studio", "Studio", "#"],
    ["journal", "Journal", "#"],
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
          <button class="icon-btn search-btn" type="button" aria-label="Search materials">${icon("search")}</button>
          <a class="icon-btn" href="samples.html" aria-label="Sample box, ${count} of 5 chosen">${icon("box")}${count ? `<span class="badge num" aria-hidden="true">${count}</span>` : ""}</a>
          <a class="btn btn--sm" href="#">Book a consultation</a>
          <button class="icon-btn menu-btn" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mnav">${icon("menu")}</button>
        </div>`}
      </div>
    </header>
    <div class="mnav dark" id="mnav" role="dialog" aria-modal="true" aria-label="Menu">
      <div class="mnav-top">${wordmarkRev}<button class="icon-btn" type="button" aria-label="Close menu">${icon("close")}</button></div>
      <ul>
        <li><a href="collection.html">Materials <small>9 surfaces</small></a></li>
        <li><a href="#">Projects ${icon("arrow")}</a></li>
        <li><a href="#">Studio ${icon("arrow")}</a></li>
        <li><a href="#">Journal ${icon("arrow")}</a></li>
        <li><a href="samples.html">Sample box <small class="num">${count} / 5</small></a></li>
      </ul>
      <div class="mnav-foot">
        <a class="btn btn--light btn--block" href="collection.html">Order free samples</a>
        <a class="btn btn--ghost btn--block" style="--fg:var(--white);--bd:var(--on-dark-2)" href="#">Book a consultation</a>
        <p class="meta">Studio open Mon–Fri, 9–6 · hello@texturr.studio</p>
      </div>
    </div>`;

  const footer = `
    <footer class="footer dark">
      <div class="wrap">
        <div class="footer-grid">
          <div>
            <a class="footer-logo" href="index.html" aria-label="Texturr, Surface Evolution — home">${logo(true, true)}</a>
            <p class="lede" style="margin-top:20px;max-width:24em">Stone, wood and metal surfaces for considered interiors, specified with you.</p>
            <form class="news" onsubmit="return false">
              <label class="sr-only" for="nl">Email address</label>
              <input id="nl" type="email" placeholder="Material notes, monthly — your email" autocomplete="email">
              <button type="submit" aria-label="Subscribe">${icon("arrow")}</button>
            </form>
          </div>
          <div><h2 class="foot-h">Materials</h2><ul><li><a href="#">Stone-look slabs</a></li><li><a href="#">Feature slabs</a></li><li><a href="#">Wood panels</a></li><li><a href="#">Metal profiles</a></li><li><a href="#">Lacquer</a></li></ul></div>
          <div><h2 class="foot-h">Trade</h2><ul><li><a href="#">Architects &amp; designers</a></li><li><a href="#">Specification sheets</a></li><li><a href="#">Approved fitters</a></li><li><a href="#">Project pricing</a></li></ul></div>
          <div><h2 class="foot-h">Studio</h2><ul><li><a href="#">Visit the studio</a></li><li><a href="#">Delivery &amp; returns</a></li><li><a href="#">Care and fitting</a></li><li><a href="#">Contact</a></li></ul></div>
        </div>
        <div class="footer-base">
          <span>© 2026 Texturr</span>
          <nav aria-label="Legal"><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Accessibility</a></nav>
        </div>
      </div>
    </footer>`;

  document.querySelectorAll("[data-include=header]").forEach((el) => (el.outerHTML = header));
  const slimFooter = `
    <footer class="footer footer--slim dark">
      <div class="wrap footer-base">
        <span>© 2026 Texturr · Questions? 020 7946 0000</span>
        <nav aria-label="Legal"><a href="#">Delivery</a><a href="#">Privacy</a><a href="#">Accessibility</a></nav>
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
  if (new URLSearchParams(location.search).get("menu") === "open") html.classList.add("menu-open");

  // Toggle buttons (sample selection, segmented controls) stay operable in the mockups
  document.addEventListener("click", (e) => {
    const seg = e.target.closest(".seg button");
    if (seg) seg.parentElement.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b === seg)));
  });
})();
