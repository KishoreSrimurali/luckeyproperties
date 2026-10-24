import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Instrument_Serif } from "next/font/google";
import { site } from "@/config/site";
import { team } from "@/data/team";
import { ActionBar } from "@/components/ActionBar";
import { ConsentManager } from "@/components/Consent";
import { ConsultationLink } from "@/components/ConsultationLink";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { Logo } from "@/components/Logo";
import { SiteEffects } from "@/components/SiteEffects";
import { telHref, whatsappHref } from "@/lib/contact";
import "./globals.css";

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif", display: "swap" });
const sans = Hanken_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "LUCKEY Properties | Dubai Real Estate & Property Investment", template: "%s | LUCKEY Properties" },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: site.name, locale: site.locale, url: "/" },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#141311",
  width: "device-width",
  initialScale: 1,
};

const orgLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": `${site.url}/#organization`,
  name: site.name,
  slogan: site.tagline,
  url: site.url,
  email: site.contact.email,
  telephone: site.contact.phoneE164,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.contact.address.line1,
    addressLocality: "Business Bay, Dubai",
    addressRegion: site.contact.address.region,
    addressCountry: site.contact.address.countryCode,
  },
  areaServed: { "@type": "City", name: "Dubai" },
  sameAs: [site.social.instagram],
  founder: team.filter((m) => /founder/i.test(m.title)).map((m) => ({ "@type": "Person", name: m.name, jobTitle: m.title })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`} data-scroll-behavior="smooth">
      <body>
        <noscript>
          <style>{`[data-reveal],[data-reveal-img]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header
          logo={<Logo />}
          cta={<ConsultationLink className="btn btn--sm btn--ghost" />}
          mobileFoot={
            <>
              <ConsultationLink className="btn btn--light btn--block" />
              <a className="btn btn--ghost btn--block" href={whatsappHref()} target="_blank" rel="noopener">
                WhatsApp {site.contact.phoneDisplay}
              </a>
              <a className="btn btn--ghost btn--block" href={telHref}>
                Call us
              </a>
            </>
          }
        />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <ActionBar />
        <ConsentManager />
        <SiteEffects />
        <JsonLd data={orgLd} />
      </body>
    </html>
  );
}
