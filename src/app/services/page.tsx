import type { Metadata } from "next";
import { services } from "@/data/services";
import { Arrow } from "@/components/Icons";
import { LeadForm } from "@/components/LeadForm";
import { PageHero } from "@/components/PageHero";
import { WhyDubai } from "@/components/Sections";
import { whatsappHref } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Our Services — Buy & Sell, Investment Guidance, Property Management",
  description: "LUCKEY Properties helps clients buy, sell and upgrade Dubai property, evaluate investment opportunities, and manage property from outside the UAE.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={<>Buy, sell, invest — <em>and look after</em> what you own</>}
        lede="Three services. Choose the one that fits, or tell us what you need and we'll point you in the right direction."
        crumbs={[{ label: "Services", href: "/services" }]}
      />
      {services.map((s, i) => (
        <section key={s.slug} id={s.slug} className={`section ${i % 2 ? "ivory" : ""}`} aria-labelledby={`${s.slug}-t`}>
          <div className="wrap split">
            <div>
              <p className="eyebrow">{s.number}</p>
              <h2 className="h2 mt-s" id={`${s.slug}-t`}>{s.name}</h2>
              <p className="lede mt-s">{s.short}</p>
              <ul className="checklist mt-m">
                {s.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <div className="prose">
                {s.detail.map((p) => (
                  <p key={p.slice(0, 20)}>{p}</p>
                ))}
              </div>
              <a className="textlink" href={whatsappHref(`Hello LUCKEY Properties, I'd like to discuss ${s.name.toLowerCase()}.`)} target="_blank" rel="noopener">
                Discuss on WhatsApp <Arrow />
              </a>
            </div>
            <div className="panel" data-reveal>
              <h3 className="h3" style={{ marginBottom: 24 }}>Enquire about {s.name.toLowerCase()}</h3>
              <LeadForm type={s.enquiry} submitLabel="Send enquiry" />
            </div>
          </div>
        </section>
      ))}
      <WhyDubai />
    </>
  );
}
