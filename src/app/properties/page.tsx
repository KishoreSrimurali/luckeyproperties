import type { Metadata } from "next";
import { developments } from "@/data/developments";
import { media } from "@/lib/media";
import { PageHero } from "@/components/PageHero";
import { PropertyBrowser } from "@/components/PropertyBrowser";
import { ContactSection, PriceNotice } from "@/components/Sections";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Dubai Properties for Sale — Featured Developments",
  description:
    "Featured Dubai developments including Sobha Central, Binghatti Spectre, DAMAC Lagoon Views, Valencia, Piazza Roma and ALVA at The Valley. Request current prices and availability.",
  alternates: { canonical: "/properties" },
};

export default function PropertiesPage() {
  const images = Object.fromEntries(developments.map((d) => [d.slug, media(`properties/${d.slug}/01`)]));
  return (
    <>
      <PageHero
        eyebrow="Properties"
        title={<>Featured <em>developments</em></>}
        lede="Apartments, townhouses and offices across Dubai, from established developers. Every listing links to the current details we can confirm — and to a direct line to our team for everything else."
        crumbs={[{ label: "Properties", href: "/properties" }]}
      />
      <section className="section--tight">
        <div className="wrap">
          <PropertyBrowser items={developments} images={images} />
          <PriceNotice />
        </div>
      </section>
      <ContactSection />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Featured Dubai developments",
          itemListElement: developments.map((d, i) => ({ "@type": "ListItem", position: i + 1, url: `${site.url}/properties/${d.slug}`, name: d.name })),
        }}
      />
    </>
  );
}
