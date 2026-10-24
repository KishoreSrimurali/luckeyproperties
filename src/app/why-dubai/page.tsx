import type { Metadata } from "next";
import Link from "next/link";
import { reviewedOn, sources, whyDubai } from "@/data/dubai";
import { Arrow } from "@/components/Icons";
import { PageHero } from "@/components/PageHero";
import { ContactSection } from "@/components/Sections";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Why Buy Property in Dubai? Costs, Rental Potential, Golden Visa & Payment Plans",
  description:
    "A plain-English guide to Dubai property for international and Indian buyers: ownership costs and the absence of annual property tax, rental considerations, Golden Visa eligibility and off-plan payment plans.",
  alternates: { canonical: "/why-dubai" },
};

const india = [
  {
    t: "Sending money from India",
    p: "Resident Indians usually fund overseas property through the Reserve Bank of India's Liberalised Remittance Scheme (LRS), which has an annual limit per person and its own documentation. Tax collected at source (TCS) may apply to remittances above a threshold. Your bank will tell you what it needs; your chartered accountant can advise on timing.",
  },
  {
    t: "Tax and reporting in India",
    p: "If you are tax-resident in India, rental income and capital gains from Dubai property are generally taxable in India, and foreign assets must be disclosed in your income-tax return. The India–UAE tax treaty may affect how income is treated. Take advice from a qualified Indian tax professional.",
  },
  {
    t: "Buying remotely",
    p: "Much of the process can be handled from India: video walkthroughs of show apartments or completed units, digital copies of the developer's documents, and electronic signatures where the developer allows. We can talk you through what needs to happen in person and what doesn't.",
  },
  {
    t: "Currency",
    p: "Prices in Dubai are quoted in UAE dirhams (AED). The dirham is pegged to the US dollar, so the rupee cost of a purchase moves with the INR–USD exchange rate. Payment plans spread over several years carry currency exposure on each instalment.",
  },
];

export default function WhyDubaiPage() {
  return (
    <>
      <PageHero
        eyebrow="Why Dubai"
        title={<>What Dubai offers buyers — <em>and what it doesn&rsquo;t</em></>}
        lede="The four topics our clients ask about most, explained plainly, with links to the official sources."
        crumbs={[{ label: "Why Dubai", href: "/why-dubai" }]}
        aside={<p className="small muted mt-s">Reviewed {reviewedOn}. General information only — not legal, tax, immigration or financial advice.</p>}
      />
      <div className="section">
        <div className="wrap legal-layout">
          <nav className="toc" aria-label="On this page">
            <ol>
              {whyDubai.map((w, i) => (
                <li key={w.slug}>
                  <a href={`#${w.slug}`}>0{i + 1} — {w.title}</a>
                </li>
              ))}
              <li>
                <a href="#india">05 — Buying from India</a>
              </li>
            </ol>
          </nav>
          <div>
            {whyDubai.map((w, i) => (
              <section key={w.slug} id={w.slug} className="pd-section" aria-labelledby={`${w.slug}-h`}>
                <p className="eyebrow">0{i + 1}</p>
                <h2 className="h2 mt-s" id={`${w.slug}-h`}>{w.title}</h2>
                <div className="prose mt-s">
                  <p style={{ color: "var(--ink)", fontSize: "1.2rem" }}>{w.lead}</p>
                  {w.body.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </div>
                <p className="caveat" style={{ maxWidth: "64ch" }}>{w.caveat}</p>
                <ul className="sources">
                  {w.sourceKeys.map((k) => (
                    <li key={k}>
                      <a className="link" href={sources[k].url} target="_blank" rel="noopener">
                        {sources[k].label} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
            <section id="india" className="pd-section" aria-labelledby="india-h">
              <p className="eyebrow">05</p>
              <h2 className="h2 mt-s" id="india-h">Buying from India</h2>
              <div className="prose mt-s">
                <p style={{ color: "var(--ink)", fontSize: "1.2rem" }}>
                  Many of our clients live in India. Buying in Dubai from there is common, but it involves rules on both sides that you should check
                  with qualified professionals before you commit.
                </p>
                {india.map((x) => (
                  <div key={x.t}>
                    <h3>{x.t}</h3>
                    <p>{x.p}</p>
                  </div>
                ))}
              </div>
              <p className="caveat" style={{ maxWidth: "64ch" }}>
                Indian foreign-exchange, tax and reporting rules change. Confirm the current position with your bank and a chartered accountant. We
                don&rsquo;t provide tax or legal advice.
              </p>
              <ul className="sources">
                <li><a className="link" href={sources.rbi.url} target="_blank" rel="noopener">{sources.rbi.label} ↗</a></li>
                <li><a className="link" href={sources.itd.url} target="_blank" rel="noopener">{sources.itd.label} ↗</a></li>
              </ul>
              <div className="row mt-m">
                <Link className="btn" href="/contact?intent=investment#enquire">Talk to us about buying from India <Arrow /></Link>
              </div>
            </section>
          </div>
        </div>
      </div>
      <ContactSection />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Why buy property in Dubai? Costs, rental potential, Golden Visa and payment plans",
          author: { "@id": `${site.url}/#organization` },
          publisher: { "@id": `${site.url}/#organization` },
          mainEntityOfPage: `${site.url}/why-dubai`,
          dateModified: "2026-10-24",
        }}
      />
    </>
  );
}
