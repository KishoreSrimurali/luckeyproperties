"use client";

import Image from "next/image";
import { useState } from "react";
import { Plate } from "./Plate";

export function Gallery({ images, alt, name, developer, location, index }: { images: string[]; alt: string; name: string; developer: string; location?: string; index?: number }) {
  const [i, setI] = useState(0);
  if (!images.length) {
    return (
      <div className="gallery">
        <div className="gallery__main gallery__main--empty">
          <Plate name={name} developer={developer} location={location} index={index} />
        </div>
      </div>
    );
  }
  const go = (d: number) => setI((c) => (c + d + images.length) % images.length);
  return (
    <div className="gallery" role="region" aria-roledescription="carousel" aria-label={`${name} gallery`}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      <div className="gallery__main">
        <Image key={images[i]} src={images[i]} alt={`${alt} — image ${i + 1} of ${images.length}`} fill priority={i === 0} sizes="100vw" />
        {images.length > 1 && (
          <>
            <span className="gallery__count" aria-live="polite">
              {String(i + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </span>
            <div className="gallery__nav">
              <button type="button" onClick={() => go(-1)} aria-label="Previous image">←</button>
              <button type="button" onClick={() => go(1)} aria-label="Next image">→</button>
            </div>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="gallery__thumbs">
          {images.map((src, n) => (
            <button key={src} type="button" className="gallery__thumb" aria-current={n === i} aria-label={`Show image ${n + 1}`} onClick={() => setI(n)}>
              <Image src={src} alt="" width={120} height={90} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
