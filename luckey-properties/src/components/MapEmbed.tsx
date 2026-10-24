"use client";

import { useState } from "react";
import { mapsEmbed } from "@/lib/contact";

/** Click-to-load map: no Google request (or cookies) until the visitor asks for it. */
export function MapEmbed({ query, title, directionsHref }: { query: string; title: string; directionsHref?: string }) {
  const [on, setOn] = useState(false);
  const href = directionsHref ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  return (
    <div className="map">
      {on ? (
        <iframe src={mapsEmbed(query)} title={title} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      ) : (
        <div className="map__facade">
          <p className="eyebrow eyebrow--plain">{query}</p>
          <p>The map is provided by Google, which may set cookies when it loads.</p>
          <div className="row" style={{ justifyContent: "center" }}>
            <button type="button" className="btn btn--sm" onClick={() => setOn(true)}>Load map</button>
            <a className="btn btn--sm btn--ghost" href={href} target="_blank" rel="noopener">Open in Google Maps</a>
          </div>
        </div>
      )}
    </div>
  );
}
