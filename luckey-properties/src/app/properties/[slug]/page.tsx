import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { developments, getDevelopment } from "@/data/developments";
import { formatAed, formatAedFull } from "@/lib/format";
import { propertyWhatsappMessage, telHref, whatsappHref } from "@/lib/contact";
import { media, mediaSet } from "@/lib/media";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Gallery } from "@/components/Gallery";
import { Arrow, WhatsAppGlyph } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { LeadForm } from "@/components/LeadForm";
import { MapEmbed } from "@/components/MapEmbed";
import { PropertyCard } from "@/components/PropertyCard";
import { TrackView } from "@/components/TrackView";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return developments.map((d) => ({ slug: d.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dev = getDevelopment((await params).slug);
  if (!dev) return {};
  const title = `${dev.name} by ${dev.developer.name} — ${dev.location}`;
  const description = `${dev.configuration} at ${dev.name}, ${dev.location}. ${dev.summary} Request current prices, floor plans and payment plan from LUCKEY Properties.`;
  const og = media(`properties/${dev.slug}/01`);
  return {
    title,
    description,
    alternates: { canonical: `/properties/${dev.slug}` },
    openGraph: { title, description, url: `/properties/${dev.slug}`, ...(og ? { images: [{ url: og, alt: dev.imageAlt }] } : {}) },
  };
}

function Pending({ what, dev }: { what: string; dev: string }) {
  return (
    <div className="pending">
      <p>
        We share the latest {what} once we&rsquo;ve confirmed the details with the developer, as they change between releases.
      </p>
      <div className="row">
        <a className="textlink" href="#enquire">
          Request current {what} <Arrow />
        </a>
        <a className="textlink" href={whatsappHref(`Hello LUCKEY Properties, please send me the current ${what} for ${dev}.`)} target="_blank" rel="noopener">
          Ask on WhatsApp <Arrow />
        </a>
      </div>
    </div>
  );
}

export default async function PropertyPage({ params }: Props) {
  const dev = getDevelopment((await params).slug);
  if (!dev) notFound();
  const images = mediaSet(`properties/${dev.slug}`, dev.imageCount);
  const url = `${site.url}/properties/${dev.slug}`;
  const wa = whatsappHref(propertyWhatsappMessage(dev.name, url));
  const v = dev.verified;
  const related = developments.filter((d) => d.slug !== dev.slug && (d.developer.name === dev.developer.name || d.segment === dev.segment)).slice(0, 3);
  const verifiedPrice = Boolean(dev.priceVerifiedAt);

  return (
    <>
      <TrackView event="view_item" params={{ property: dev.slug, developer: dev.developer.name }} />
      <header className="pd-hero dark">
        <div className="wrap">
          <Breadcrumbs items={[{ label: "Properties", href: "/properties" }, { label: dev.name, href: `/properties/${dev.slug}` }]} />
          <div className="pd-hero__top">
            <div>
              <p className="eyebrow">{dev.developer.name}</p>
              <h1 className="h1 mt-s">{dev.name}</h1>
              <div className="pd-hero__facts">
                <span>{dev.location}</span>
                <span>{dev.configuration}</span>
                <span>From {formatAed(dev.publishedFromAed)}{verifiedPrice ? "" : "*"}</span>
              </div>
            </div>
            <div className="row">
              <a className="btn btn--light" href="#enquire">
                Request current availability
              </a>
              <a className="btn btn--ghost" href={wa} target="_blank" rel="noopener" data-track="whatsapp_click" data-track-label={dev.slug}>
                <WhatsAppGlyph /> WhatsApp
              </a>
            </div>
          </div>
        </div>
        <div className="wrap" style={{ paddingBottom: 8 }}>
          <Gallery images={images} alt={dev.imageAlt} name={dev.name} developer={dev.developer.name} location={dev.location} index={developments.indexOf(dev) + 1} />
        </div>
      </header>

      <div className="wrap pd-layout">
        <div>
          <section className="pd-section" aria-labelledby="ov">
            <p className="eyebrow">Overview</p>
            <h2 className="h3" id="ov">
              {dev.configuration} in {dev.location.replace(/, Dubai$/, "")}
            </h2>
            <div className="prose">
              <p style={{ color: "var(--ink)", fontSize: "1.2rem" }}>{dev.summary}</p>
            </div>
            <dl className="spec mt-m">
              <div>
                <dt>Developer</dt>
                <dd>
                  <a className="link" href={dev.developer.url} target="_blank" rel="noopener">
                    {dev.developer.name}
                  </a>
                </dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>{dev.location}</dd>
              </div>
              <div>
                <dt>Property type</dt>
                <dd>{dev.propertyType}</dd>
              </div>
              <div>
                <dt>Configuration</dt>
                <dd>{dev.configuration}</dd>
              </div>
              <div>
                <dt>Starting price</dt>
                <dd>
                  {formatAedFull(dev.publishedFromAed)}
                  {!verifiedPrice && <span className="tiny muted" style={{ display: "block" }}>Last published — subject to verification</span>}
                </dd>
              </div>
              <div>
                <dt>Handover</dt>
                <dd>{v.handover ?? <span className="muted">On request</span>}</dd>
              </div>
            </dl>
          </section>

          <section className="pd-section" aria-labelledby="units">
            <p className="eyebrow">Unit types</p>
            <h2 className="h3" id="units">Available unit types</h2>
            {v.units.length ? (
              <dl className="spec">
                {v.units.map((u) => (
                  <div key={u.label}>
                    <dt>{u.label}</dt>
                    <dd>
                      {u.fromAed ? `From ${formatAed(u.fromAed)}` : "Price on request"}
                      {u.sizeSqft && <span className="tiny muted" style={{ display: "block" }}>{u.sizeSqft} sq ft</span>}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : (
              <Pending what="unit availability and floor plans" dev={dev.name} />
            )}
          </section>

          <section className="pd-section" aria-labelledby="pp">
            <p className="eyebrow">Payment</p>
            <h2 className="h3" id="pp">Payment plan</h2>
            {v.paymentPlan.length ? (
              <dl className="spec">
                {v.paymentPlan.map((m) => (
                  <div key={m.label}>
                    <dt>{m.label}</dt>
                    <dd>{m.percent}%</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <Pending what="payment plan" dev={dev.name} />
            )}
            <p className="tiny muted mt-s">Payment terms are set by {dev.developer.name} and must be confirmed in writing before you commit.</p>
          </section>

          {v.amenities.length > 0 && (
            <section className="pd-section" aria-labelledby="am">
              <p className="eyebrow">Amenities</p>
              <h2 className="h3" id="am">Amenities</h2>
              <ul className="checklist">{v.amenities.map((a) => <li key={a}>{a}</li>)}</ul>
            </section>
          )}

          <section className="pd-section" aria-labelledby="loc">
            <p className="eyebrow">Location</p>
            <h2 className="h3" id="loc">{dev.location}</h2>
            <MapEmbed query={dev.geoQuery} title={`Map of ${dev.location}`} />
          </section>

          <section className="pd-section" aria-labelledby="docs">
            <p className="eyebrow">Documents</p>
            <h2 className="h3" id="docs">Brochure &amp; media</h2>
            {v.brochureUrl ? (
              <a className="btn" href={v.brochureUrl} target="_blank" rel="noopener" data-track="brochure_download" data-track-label={dev.slug}>
                Download official brochure
              </a>
            ) : (
              <Pending what="official brochure" dev={dev.name} />
            )}
          </section>
        </div>

        <aside className="pd-aside" id="enquire" aria-label={`Enquire about ${dev.name}`}>
          <div className="pd-aside__inner panel">
            <div className="price-block">
              <span className="label">{verifiedPrice ? "Starting from" : "Last published from"}</span>
              <p className="value">{formatAedFull(dev.publishedFromAed)}</p>
              <span className="tiny muted">
                {verifiedPrice
                  ? `Confirmed with ${dev.developer.name}, ${new Date(dev.priceVerifiedAt!).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}.`
                  : "*Subject to verification. Prices and availability change — we'll confirm the current position."}
              </span>
            </div>
            <h2 className="h3" style={{ fontSize: "1.6rem", marginBottom: 20 }}>Enquire about {dev.name}</h2>
            <LeadForm type="property" property={dev.slug} propertyName={dev.name} submitLabel="Request details" messagePlaceholder={`What would you like to know about ${dev.name}?`} />
            <div className="quick-actions">
              <a className="btn btn--ghost btn--sm" href={wa} target="_blank" rel="noopener" data-track="whatsapp_click" data-track-label={dev.slug}>
                WhatsApp
              </a>
              <a className="btn btn--ghost btn--sm" href={telHref} data-track="phone_click" data-track-label={dev.slug}>
                Call
              </a>
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="section--tight ivory" aria-labelledby="related">
          <div className="wrap">
            <div className="row" style={{ justifyContent: "space-between", marginBottom: 48 }}>
              <h2 className="h2" id="related">You may also consider</h2>
              <Link className="textlink" href="/properties">All properties <Arrow /></Link>
            </div>
            <div className="props props--uniform">
              {related.map((d) => (
                <PropertyCard key={d.slug} dev={d} image={media(`properties/${d.slug}/01`)} sizes="(min-width: 1100px) 33vw, 100vw" />
              ))}
            </div>
          </div>
        </section>
      )}

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": dev.segment === "commercial" ? "Place" : "Residence",
          name: dev.name,
          description: dev.summary,
          url,
          address: { "@type": "PostalAddress", addressLocality: dev.location, addressCountry: "AE" },
          ...(images.length ? { image: images.map((i) => `${site.url}${i}`) } : {}),
        }}
      />
    </>
  );
}
