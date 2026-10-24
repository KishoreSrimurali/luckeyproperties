import type { Metadata } from "next";
import { site } from "@/config/site";
import { mapsHref, telHref, whatsappHref } from "@/lib/contact";
import { ConsultationLink } from "@/components/ConsultationLink";
import { WhatsAppGlyph } from "@/components/Icons";
import { LeadForm } from "@/components/LeadForm";
import { MapEmbed } from "@/components/MapEmbed";
import { PageHero } from "@/components/PageHero";
import { ContactDetails } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Contact LUCKEY Properties — Business Bay, Dubai",
  description: `Speak with LUCKEY Properties on WhatsApp or by phone on ${site.contact.phoneDisplay}, email ${site.contact.email}, or visit us at Ontario Tower, Business Bay, Dubai.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Let&rsquo;s find the right Dubai property <em>for you.</em></>}
        lede="Tell us what you're looking for. We'll help you explore suitable opportunities and understand the next steps."
        crumbs={[{ label: "Contact", href: "/contact" }]}
        aside={
          <div className="row mt-m">
            <a className="btn btn--light" href={whatsappHref("Hello LUCKEY Properties, I'd like to speak with your team about Dubai property.")} target="_blank" rel="noopener">
              <WhatsAppGlyph /> WhatsApp
            </a>
            <a className="btn btn--ghost" href={telHref}>Call</a>
          </div>
        }
      />
      <section className="section light" id="enquire" aria-labelledby="form-h">
        <div className="wrap contact">
          <div>
            <p className="eyebrow">Our office</p>
            <h2 className="h2 mt-s" id="form-h">Ontario Tower, Business Bay</h2>
            <ContactDetails tone="light" />
            {site.bookingUrl && (
              <div className="mt-m">
                <p className="muted">Prefer to pick a time yourself?</p>
                <ConsultationLink label="Book a consultation online" arrow />
              </div>
            )}
          </div>
          <div className="panel">
            <LeadForm chooseIntent submitLabel="Send enquiry" />
          </div>
        </div>
        <div className="wrap mt-l">
          <MapEmbed query={site.contact.mapQuery} title="Map showing the LUCKEY Properties office at Ontario Tower, Business Bay" directionsHref={mapsHref} />
        </div>
      </section>
    </>
  );
}
