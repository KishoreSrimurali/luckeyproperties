import { ImageResponse } from "next/og";

export const alt = "LUCKEY Properties — Unlock Prosperity. Build Legacy.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#141311", color: "#f2ede4", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80, fontFamily: "serif" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 56, letterSpacing: 12 }}>LUCKEY</div>
          <div style={{ fontSize: 16, letterSpacing: 10, color: "#a8a194" }}>PROPERTIES</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, lineHeight: 1.02 }}>A better way to navigate</div>
          <div style={{ fontSize: 76, lineHeight: 1.02, color: "#c2a678", fontStyle: "italic" }}>Dubai real estate.</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, letterSpacing: 4, color: "#a8a194", borderTop: "1px solid #3a3631", paddingTop: 24 }}>
          <span>UNLOCK PROSPERITY. BUILD LEGACY.</span>
          <span>BUSINESS BAY · DUBAI</span>
        </div>
      </div>
    ),
    size,
  );
}
