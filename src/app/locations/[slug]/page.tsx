import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { developments } from "@/data/developments";
import { getLocation, locations } from "@/data/locations";
import { whatsappHref } from "@/lib/contact";
import { media } from "@/lib/media";
import { Arrow } from "@/components/Icons";
import { LeadForm } from "@/components/LeadForm";
import { MapEmbed } from "@/components/MapEmbed";
import { PageHero } from "@/components/PageHero";
import { PropertyCard } from "@/components/PropertyCard";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const l = getLocation((await params).slug);
  if (!l) return {};
  return {
    title: `${l.name}, Dubai — Area Guide for Property Buyers`,
    description: l.summary,
    alternates: { canonical: `/locations/${l.slug}` },
    openGraph: { title: `${l.name} — area guide`, description: l.summary, url: `/locations/${l.slug}` },
  };
}

export default async function LocationPage({ params }: Props) {
  const l = getLocation((await params).slug);
  if (!l) notFound();
  const img = media(`locations/${l.slug}`);
  const listings = developments.filter((d) => d.locationSlug === l.slug);
  const others = locations.filter((o) => o.slug !== l.slug);

  return (
    <>
      <PageHero
        eyebrow={l.line}
        title={l.name}
        lede={l.summary}
        crumbs={[
          { label: "Locations", href: "/locations" },
          { label: l.name, href: `/locations/${l.slug}` },
        ]}
      />
      {img && (
        <div className="dark">
          <div className="wrap">
            <div style={{ position: "relative", aspectRatio: "21/9" }}>
              <Image src={img} alt={l.imageAlt} fill priority sizes="100vw" style={{ objectFit: "cover" }} />
            </div>
          </div>
        </div>
      )}
      <section className="section">
        <div className="wrap split">
          <div>
            <p className="eyebrow">At a glance</p>
            <ul className="checklist mt-m" style={{ fontSize: "1.05rem" }}>
              {l.facts.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
          <div className="prose">
            {l.body.map((p) => (
              <p key={p.slice(0, 20)} style={{ fontSize: "1.15rem" }}>
                {p}
              </p>
            ))}
          </div>
        </div>
        <div className="wrap mt-l">
          <MapEmbed query={l.geoQuery} title={`Map of ${l.name}`} />
        </div>
      </section>

      <section className="section ivory" id="enquire" aria-labelledby="opps">
        <div className="wrap">
          {listings.length ? (
            <>
              <h2 className="h2" id="opps">Properties in {l.name}</h2>
              <div className="props props--uniform mt-l">
                {listings.map((d) => (
                  <PropertyCard key={d.slug} dev={d} image={media(`properties/${d.slug}/01`)} />
                ))}
              </div>
            </>
          ) : (
            <div className="split">
              <div>
                <p className="eyebrow">Opportunities</p>
                <h2 className="h2 mt-s" id="opps">
                  Ask us about <em>{l.name}</em>
                </h2>
                <p className="lede mt-s">
                  We don&rsquo;t have a featured listing in {l.name} on the website right now. Tell us your budget and plans and we&rsquo;ll share current
                  opportunities that we&rsquo;ve checked.
                </p>
                <a className="textlink mt-s" href={whatsappHref(`Hello LUCKEY Properties, I'm interested in property in ${l.name}.`)} target="_blank" rel="noopener">
                  Ask on WhatsApp <Arrow />
                </a>
              </div>
              <div className="panel">
                <LeadForm type="investment" submitLabel={`Ask about ${l.name}`} messagePlaceholder={`What are you looking for in ${l.name}?`} />
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="section--tight">
        <div className="wrap">
          <p className="eyebrow">Other locations</p>
          <ul className="contact__list" style={{ borderColor: "var(--line-light)" }}>
            {others.map((o) => (
              <li key={o.slug} style={{ borderColor: "var(--line-light)", gridTemplateColumns: "1fr auto" }}>
                <Link href={`/locations/${o.slug}`} className="h3">
                  {o.name}
                </Link>
                <Arrow />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
