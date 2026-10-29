// Renders the Texturr mockups to PNG at desktop (1440) and mobile (390) widths.
// Usage: node render.js   (needs Playwright + Chromium)
const http = require("http");
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const ROOT = __dirname;
const OUT = path.join(ROOT, "png");
const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".woff2": "font/woff2" };

const SHOTS = [
  // [file, page, width, full page?, scale]
  ["desktop-00-design-system", "design-system.html", 1440, true, 1],
  ["desktop-01-home", "index.html", 1440, true, 1],
  ["desktop-01-home-fold", "index.html", 1440, false, 2],
  ["desktop-02-collection", "collection.html", 1440, true, 1],
  ["desktop-03-product", "product.html", 1440, true, 1],
  ["desktop-04-sample-box", "samples.html", 1440, true, 1],
  ["mobile-01-home", "index.html", 390, true, 2],
  ["mobile-01-home-fold", "index.html", 390, false, 3],
  ["mobile-02-collection", "collection.html", 390, true, 2],
  ["mobile-02-collection-fold", "collection.html", 390, false, 3],
  ["mobile-03-product", "product.html", 390, true, 2],
  ["mobile-03-product-fold", "product.html", 390, false, 3],
  ["mobile-04-sample-box", "samples.html", 390, true, 2],
  ["mobile-05-menu", "index.html?menu=open", 390, false, 3],
];

const server = http.createServer((req, res) => {
  const file = path.join(ROOT, decodeURIComponent(req.url.split("?")[0]));
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) return res.writeHead(404).end();
  res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});

(async () => {
  await new Promise((r) => server.listen(0, r));
  const base = `http://localhost:${server.address().port}/`;
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  for (const [name, page, width, full, scale] of SHOTS) {
    const height = width < 600 ? 844 : 900;
    const p = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: scale });
    await p.goto(base + page, { waitUntil: "networkidle" });
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(1400); // let the single entrance animation finish
    if (full) {
      // Grow the viewport to the page so sticky bars rest at their natural end position
      await p.evaluate(() => document.documentElement.classList.add("capture-full"));
      const h = await p.evaluate(() => document.documentElement.scrollHeight);
      await p.setViewportSize({ width, height: h });
      await p.waitForTimeout(200);
    }
    await p.screenshot({ path: path.join(OUT, `${name}.png`) });
    console.log("✓", name);
    await p.close();
  }
  await browser.close();
  server.close();
})();
