/**
 * Line-drawn Dubai skyline used in the hero until licensed film/photography is
 * supplied. It's an abstract architectural drawing, not a depiction of any
 * specific listing.
 */
const towers: [x: number, w: number, top: number, step?: number][] = [
  [40, 60, 410], [110, 46, 360, 30], [360, 54, 330, 24], [424, 40, 390], [474, 70, 300, 40],
  [800, 58, 270, 30], [866, 44, 350], [918, 56, 230, 26], [1140, 64, 250, 34], [1214, 40, 330],
  [1262, 72, 200, 30], [1344, 50, 300], [1402, 66, 380, 20], [1478, 44, 340], [1530, 60, 420],
];

function tower([x, w, top, step]: (typeof towers)[number]) {
  if (!step) return `M${x} 560V${top}H${x + w}V560`;
  const inset = Math.round(w * 0.18);
  return `M${x} 560V${top + step}H${x + inset}V${top}H${x + w - inset}V${top + step}H${x + w}V560`;
}

function Drawing() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="1">
      {/* Sail-shaped hotel */}
      <path className="draw" pathLength={1} style={{ ["--d" as string]: "0.2s" }} d="M196 560V232M200 246C292 288 334 420 346 560M200 300H262M200 360H300M200 420H322M200 480H334" />
      {/* Frame */}
      <path className="draw" pathLength={1} style={{ ["--d" as string]: "0.5s" }} d="M590 560V292H748V560M620 560V322H718V560M590 306H748" />
      {/* Super-tall spire */}
      <path
        className="draw"
        pathLength={1}
        style={{ ["--d" as string]: "0.1s" }}
        d="M982 560V430H998V316H1012V214H1024V132H1034L1040 24L1046 132H1056V214H1068V316H1082V430H1098V560"
      />
      {towers.map((t, i) => (
        <path key={i} className="draw" pathLength={1} style={{ ["--d" as string]: `${0.3 + (i % 5) * 0.18}s` }} d={tower(t)} />
      ))}
    </g>
  );
}

export function Skyline() {
  return (
    <svg className="skyline" viewBox="0 0 1600 700" preserveAspectRatio="xMidYMax slice" role="img" aria-label="Line drawing of the Dubai skyline at dusk, reflected in the water">
      <defs>
        <radialGradient id="glow" cx="65%" cy="80%" r="60%">
          <stop offset="0" stopColor="#c2a678" stopOpacity="0.22" />
          <stop offset="1" stopColor="#c2a678" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="reflect" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="reflect-mask">
          <rect x="0" y="560" width="1600" height="140" fill="url(#reflect)" />
        </mask>
      </defs>
      <rect width="1600" height="700" fill="url(#glow)" />
      <g color="rgba(194,166,120,0.7)">
        <Drawing />
      </g>
      <g color="rgba(194,166,120,0.5)" mask="url(#reflect-mask)" transform="translate(0 1120) scale(1 -1)">
        <Drawing />
      </g>
      <line className="draw" pathLength={1} x1="0" y1="560" x2="1600" y2="560" stroke="rgba(242,237,228,0.35)" strokeWidth="1" />
      <g className="fade" stroke="rgba(242,237,228,0.18)" strokeWidth="1" style={{ ["--d" as string]: "1.6s" }}>
        {[...Array(18)].map((_, i) => {
          const y = 580 + (i % 6) * 18;
          const x = (i * 337) % 1500;
          return <line key={i} x1={x} y1={y} x2={x + 40 + (i % 4) * 30} y2={y} />;
        })}
      </g>
    </svg>
  );
}
