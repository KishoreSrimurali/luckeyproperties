import Link from "next/link";
import { nav, site } from "@/config/site";
import { mailHref, mapsHref, telHref, whatsappHref } from "@/lib/contact";
import { ConsentButton } from "./Consent";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <div>
            <Logo />
            <p className="footer__tag">{site.tagline}</p>
            <p className="muted small" style={{ maxWidth: "40ch" }}>
              A Dubai real estate company in Business Bay. We help clients buy, sell and manage property in Dubai, and guide investors — including those
              buying from India — through each step.
            </p>
          </div>
          <nav aria-label="Footer">
            <h2>Explore</h2>
            <ul>
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href}>{n.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/why-dubai">Why Dubai</Link>
              </li>
            </ul>
          </nav>
          <div>
            <h2>Contact</h2>
            <ul>
              <li>
                <a href={whatsappHref()} target="_blank" rel="noopener">WhatsApp</a>
              </li>
              <li>
                <a href={telHref}>{site.contact.phoneDisplay}</a>
              </li>
              <li>
                <a href={mailHref()}>{site.contact.email}</a>
              </li>
              <li>
                <a href={site.social.instagram} target="_blank" rel="noopener">Instagram</a>
              </li>
            </ul>
          </div>
          <div>
            <h2>Office</h2>
            <address>
              <a href={mapsHref} target="_blank" rel="noopener">
                {site.contact.address.line1}
                <br />
                {site.contact.address.line2}
                <br />
                {site.contact.address.country}
              </a>
            </address>
            {(site.credentials.reraOrn || site.credentials.tradeLicence) && (
              <p className="small muted mt-s">
                {site.credentials.reraOrn && <>RERA ORN {site.credentials.reraOrn}<br /></>}
                {site.credentials.tradeLicence && <>Trade licence {site.credentials.tradeLicence}</>}
              </p>
            )}
          </div>
        </div>
        <div className="footer__bottom">
          <p style={{ margin: 0 }}>© {year} {site.name}. All rights reserved.</p>
          <div className="footer__legal">
            <Link href="/privacy-policy">Privacy policy</Link>
            <Link href="/accessibility-statement">Accessibility statement</Link>
            <Link href="/terms">Terms of use</Link>
            <Link href="/cookie-preferences">Cookie policy</Link>
            <ConsentButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
