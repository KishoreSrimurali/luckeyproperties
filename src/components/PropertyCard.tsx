import Image from "next/image";
import Link from "next/link";
import { developments } from "@/data/developments";
import type { Development } from "@/data/types";
import { formatAed } from "@/lib/format";
import { Arrow } from "./Icons";
import { Plate } from "./Plate";

export function PriceLine({ dev }: { dev: Development }) {
  return (
    <span className="card__price">
      <strong>From {formatAed(dev.publishedFromAed)}</strong>
      <span>{dev.priceVerifiedAt ? `Verified ${new Date(dev.priceVerifiedAt).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}` : "Last published · subject to verification"}</span>
    </span>
  );
}

export function PropertyCard({ dev, image, sizes = "(min-width: 1100px) 50vw, (min-width: 700px) 50vw, 100vw", priority = false }: { dev: Development; image: string | null; sizes?: string; priority?: boolean }) {
  const n = developments.findIndex((d) => d.slug === dev.slug) + 1;
  return (
    <article className="card" data-reveal>
      <div className="card__media" data-reveal-img>
        <span className="card__tag">{dev.segment === "commercial" ? "Commercial" : dev.propertyType}</span>
        {image ? <Image src={image} alt={dev.imageAlt} fill sizes={sizes} priority={priority} /> : <Plate name={dev.name} developer={dev.developer.name} location={dev.location} index={n} tone={n % 2 ? "dark" : "light"} />}
      </div>
      <div className="card__body">
        <div className="card__meta">
          <span>{dev.developer.name}</span>
          <span>{dev.location.replace(/, Dubai$/, "")}</span>
        </div>
        <h3 className="card__title">
          <Link href={`/properties/${dev.slug}`}>{dev.name}</Link>
        </h3>
        <div className="card__facts">
          <span>{dev.configuration}</span>
          <PriceLine dev={dev} />
        </div>
        <span className="textlink card__cta" aria-hidden="true">
          View property <Arrow />
        </span>
      </div>
    </article>
  );
}
