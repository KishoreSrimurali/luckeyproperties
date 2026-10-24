import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { developments } from "@/data/developments";
import { reviewedOn, sources, whyDubai } from "@/data/dubai";
import { locations } from "@/data/locations";
import { services } from "@/data/services";
import { team } from "@/data/team";
import { testimonials } from "@/data/testimonials";
import { mailHref, mapsHref, telHref, whatsappHref } from "@/lib/contact";
import { media } from "@/lib/media";
import { Arrow, WhatsAppGlyph } from "./Icons";
import { LeadForm } from "./LeadForm";
import { PropertyCard } from "./PropertyCard";

export function SectionHead({ eyebrow, title, children, id }: { eyebrow: string; title: React.ReactNode; children?: React.ReactNode; id?: string }) {
  return (
    <div className="head head--split">
      <div data-reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="h2" id={id}>
          {title}
        </h2>
      </div>
      {children && (
        <div data-reveal style={{ ["--delay" as string]: "0.1s" }}>
          {children}
        </div>
      )}
    </div>
  );
}

export function PriceNotice() {
  return (
    <p className="notice">
      Starting prices are those last published on our website and are shown for reference. Prices, availability and payment terms are set by each
      developer and change frequently; we&rsquo;ll confirm current figures from the developer before you make any decision. Developer names are shown to
      identify each project and do not imply an exclusive relationship.
    </p>
  );
}

/* C. Featured properties */
export function FeaturedProperties() {
  return (
    <section className="section" aria-labelledby="featured-title">
      <div className="wrap">
        <SectionHead eyebrow="Featured developments" title={<>Six developments worth a <em>closer look</em></>} id="featured-title">
          <p className="lede">
            From a studio at Al Jaddaf Waterfront to family townhouses in The Valley. Ask us for the latest availability, floor plans and payment terms on
            any of them.
          </p>
          <Link className="textlink mt-s" href="/properties">
            All properties <Arrow />
          </Link>
        </SectionHead>
        <div className="props">
          {developments.map((d, i) => (
            <PropertyCard key={d.slug} dev={d} image={media(`properties/${d.slug}/01`)} priority={i === 0} />
          ))}
        </div>
        <PriceNotice />
      </div>
    </section>
  );
}

/* D. Our expertise */
export function Expertise({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h3" : "h4";
  return (
    <section className="section dark" aria-labelledby="expertise-title">
      <div className="wrap">
        <SectionHead eyebrow="Our expertise" title={<>Three services, <em>one point of contact</em></>} id="expertise-title">
          <p className="lede">Buying, investing or owning from abroad — tell us where you are and we&rsquo;ll explain how we can help.</p>
        </SectionHead>
        <div className="services">
          {services.map((s) => (
            <article className="service" key={s.slug} id={s.slug} data-reveal>
              <span className="service__num">{s.number}</span>
              <H className="service__title">{s.name}</H>
              <div className="service__body">
                <p>{s.short}</p>
                <Link className="textlink" href={`/contact?intent=${s.enquiry}#enquire`}>
                  Enquire about {s.name.toLowerCase()} <Arrow />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* E. Why Dubai */
export function WhyDubai({ compact = true }: { compact?: boolean }) {
  return (
    <section className="section ivory" aria-labelledby="why-title">
      <div className="wrap">
        <SectionHead eyebrow="Why Dubai" title={<>Four things buyers ask us about <em>first</em></>} id="why-title">
          <p className="lede">What Dubai doesn&rsquo;t charge, what it does, and what nobody can promise you.</p>
        </SectionHead>
        <div className="considerations">
          {whyDubai.map((w, i) => (
            <article className="consideration" key={w.slug} data-reveal>
              <span className="eyebrow eyebrow--plain">0{i + 1}</span>
              <h3 className="h3">{w.title}</h3>
              <p style={{ color: "var(--ink)" }}>{w.lead}</p>
              {(compact ? w.body.slice(0, 1) : w.body).map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
              <p className="caveat">{w.caveat}</p>
            </article>
          ))}
        </div>
        <div className="row mt-m" style={{ justifyContent: "space-between" }}>
          <p className="small muted" style={{ margin: 0 }}>
            Reviewed {reviewedOn}. Sources: <a className="link" href={sources.dld.url} target="_blank" rel="noopener">{sources.dld.label}</a>,{" "}
            <a className="link" href={sources.goldenVisa.url} target="_blank" rel="noopener">UAE Government portal</a>. This is general information, not legal, tax or financial advice.
          </p>
          {compact && (
            <Link className="textlink" href="/why-dubai">
              Read the full guide <Arrow />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

/* F. About — brand story */
export function Story({ tone = "light", link = true }: { tone?: "light" | "dark"; link?: boolean }) {
  return (
    <section className={`section ${tone === "dark" ? "dark" : ""}`} aria-labelledby="story-title">
      <div className="wrap">
        <p className="eyebrow" data-reveal>About LUCKEY</p>
        <div className="story mt-m">
          <h2 className="story__mark" id="story-title" data-reveal>
            <span>Unlock</span>
            <span className="indent">Prosperity.</span>
            <span>Build</span>
            <span className="indent">Legacy.</span>
          </h2>
          <div data-reveal style={{ ["--delay" as string]: "0.15s" }}>
            <p className="word">
            Our name puts two ideas together: <b>luck</b> and the <b>key</b>. The right opportunity, at the right time, can open the door to a more
            prosperous future.
            </p>
            <dl className="story__defs">
              <div>
                <dt>Unlock Prosperity</dt>
                <dd>Opening the door to opportunities that can create wealth, success and financial well-being.</dd>
              </div>
              <div>
                <dt>Build Legacy</dt>
                <dd>Turning those opportunities into lasting value — assets that can benefit future generations.</dd>
              </div>
            </dl>
            <p className="mt-m muted">
              Property is more than bricks, walls and an address. We don&rsquo;t simply help you find a property; we help you understand what it can
              become.
            </p>
            {link && (
              <Link className="textlink mt-s" href="/about">
                Our story and team <Arrow />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* G. Featured locations */
export function Locations({ headingLevel = 2 }: { headingLevel?: 2 | 1 }) {
  return (
    <section className="section dark" aria-labelledby={headingLevel === 2 ? "loc-title" : undefined} aria-label={headingLevel === 2 ? undefined : "Locations"}>
      <div className="wrap">
        {headingLevel === 2 && (
          <SectionHead eyebrow="Featured locations" title={<>Four locations we&rsquo;re <em>watching closely</em></>} id="loc-title">
            <p className="lede">Four parts of the city we&rsquo;re following closely, each at a different stage of development.</p>
          </SectionHead>
        )}
        <div className="locs">
          {locations.map((l, i) => {
            const img = media(`locations/${l.slug}`);
            return (
              <article className={`loc ${img ? "" : "loc--plain"}`} key={l.slug} data-reveal style={{ ["--delay" as string]: `${i * 0.08}s` }}>
                {img && <Image src={img} alt={l.imageAlt} fill sizes="(min-width: 1100px) 25vw, (min-width: 700px) 50vw, 100vw" />}
                <span className="loc__num">0{i + 1}</span>
                <div>
                  <h3 className="loc__name">
                    <Link href={`/locations/${l.slug}`}>{l.name}</Link>
                  </h3>
                  <p>{l.summary}</p>
                  <span className="loc__line">{l.line} →</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* H. Team */
export function Team({ full = false }: { full?: boolean }) {
  return (
    <section className="section" aria-labelledby="team-title">
      <div className="wrap">
        <SectionHead eyebrow="Meet the team" title={<>The people behind <em>LUCKEY</em></>} id="team-title">
          <p className="lede">Founders and partners with experience across real estate, technology and business in India, the United States and Dubai.</p>
        </SectionHead>
        <div className="team">
          {team.map((m) => {
            const portrait = media(`team/${m.slug}`);
            const initials = m.name
              .split(" ")
              .filter((_, i, a) => i === 0 || i === a.length - 1)
              .map((w) => w[0])
              .join("");
            return (
              <article className="member" key={m.slug} data-reveal>
                <div className="member__portrait" data-reveal-img>
                  {portrait ? (
                    <Image src={portrait} alt={m.portraitAlt} fill sizes="(min-width: 760px) 40vw, 100vw" />
                  ) : (
                    <div className="monogram" role="img" aria-label={`${m.name} — portrait to follow`}>
                      {initials}
                    </div>
                  )}
                </div>
                <div>
                  <p className="member__title">{m.title}</p>
                  <h3 className="member__name">{m.name}</h3>
                  <div className="member__bio">{(full ? m.bio : m.bio.slice(0, 1)).map((p) => <p key={p.slice(0, 20)}>{p}</p>)}</div>
                  {m.quote && <blockquote>&ldquo;{m.quote}&rdquo;</blockquote>}
                </div>
              </article>
            );
          })}
        </div>
        {!full && (
          <div className="mt-l">
            <Link className="textlink" href="/about#team">
              Full biographies <Arrow />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

/* I. Testimonials — published only once each client's permission is confirmed. */
export function Testimonials() {
  const publish = site.testimonialsApproved;
  if (!publish && !site.contentPreview) return null;
  return (
    <section className="section ivory" aria-labelledby="quotes-title">
      <div className="wrap">
        <SectionHead eyebrow="Client words" title={<>In our clients&rsquo; <em>own words</em></>} id="quotes-title">
          {!publish && <p className="pending-note">Preview only — awaiting client permission to publish</p>}
        </SectionHead>
        <div className="quotes">
          {testimonials.map((t) => (
            <figure className="quote" key={t.name} data-reveal>
              <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption>
                <strong>{t.name}</strong>
                {t.profession}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactDetails({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <ul className="contact__list" style={tone === "light" ? { borderColor: "var(--line-light)" } : undefined}>
      <li>
        <span className="k">WhatsApp</span>
        <a href={whatsappHref("Hello LUCKEY Properties, I'd like to speak with your team about Dubai property.")} target="_blank" rel="noopener">
          {site.contact.phoneDisplay}
        </a>
      </li>
      <li>
        <span className="k">Phone</span>
        <a href={telHref}>{site.contact.phoneDisplay}</a>
      </li>
      <li>
        <span className="k">Email</span>
        <a href={mailHref("Property enquiry")}>{site.contact.email}</a>
      </li>
      <li>
        <span className="k">Office</span>
        <a href={mapsHref} target="_blank" rel="noopener">
          {site.contact.address.line1}
          <br />
          {site.contact.address.line2}, {site.contact.address.country}
        </a>
      </li>
      <li>
        <span className="k">Instagram</span>
        <a href={site.social.instagram} target="_blank" rel="noopener">
          @luckey.properties
        </a>
      </li>
    </ul>
  );
}

/* J. Contact and conversion */
export function ContactSection() {
  return (
    <section className="section dark" id="enquire" aria-labelledby="contact-title">
      <div className="wrap contact">
        <div data-reveal>
          <p className="eyebrow">Contact</p>
          <h2 className="h2 mt-s" id="contact-title">
            Let&rsquo;s find the right Dubai property <em>for you.</em>
          </h2>
          <p className="lede mt-s">Tell us what you&rsquo;re looking for. We&rsquo;ll help you explore suitable opportunities and understand the next steps.</p>
          <div className="row mt-m">
            <a className="btn btn--light" href={whatsappHref("Hello LUCKEY Properties, I'd like to speak with your team about Dubai property.")} target="_blank" rel="noopener">
              <WhatsAppGlyph /> WhatsApp us
            </a>
            <a className="btn btn--ghost" href={telHref}>
              Call {site.contact.phoneDisplay}
            </a>
          </div>
          <ContactDetails />
        </div>
        <div data-reveal style={{ ["--delay" as string]: "0.12s" }}>
          <LeadForm tone="dark" submitLabel="Send my enquiry" messagePlaceholder="e.g. A 2-bedroom for rental income, handover within two years" />
        </div>
      </div>
    </section>
  );
}
