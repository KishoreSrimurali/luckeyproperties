import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms governing the use of the LUCKEY Properties website, including how property information and prices should be read.",
  alternates: { canonical: "/terms" },
};

export default function Terms() {
  return (
    <LegalPage
      title="Terms of Use"
      slug="terms"
      updated="October 2026"
      intro="Please read these terms before relying on information on this website."
      sections={[
        { id: "about", h: "About these terms", body: <p>These terms apply to your use of the website operated by {site.name}. By using the website you accept them. If you don&rsquo;t agree, please don&rsquo;t use the website.</p> },
        {
          id: "info",
          h: "Property information and prices",
          body: (
            <>
              <p>Property details, prices, payment plans, handover dates and availability are provided by developers and sellers and change frequently. Prices marked &ldquo;subject to verification&rdquo; are those last published and may no longer be current.</p>
              <p>Nothing on this website is an offer or a contract. All details must be confirmed in writing with the developer or seller before you commit to a purchase. Images and descriptions are for general guidance only.</p>
            </>
          ),
        },
        {
          id: "advice",
          h: "Not financial, legal or tax advice",
          body: <p>Information on investment, rental income, residency (including the UAE Golden Visa), tax and foreign-exchange rules is general in nature. It is not financial, legal, tax or immigration advice. Rental income and capital growth are not guaranteed, and past performance is not a guide to the future. Please take independent professional advice for your circumstances.</p>,
        },
        { id: "links", h: "Third-party websites", body: <p>We link to developer, government and other third-party websites for convenience. We are not responsible for their content or availability.</p> },
        { id: "ip", h: "Intellectual property", body: <p>The content and design of this website belong to {site.name} or are used with permission. Developer names, logos and project imagery belong to their respective owners.</p> },
        { id: "liability", h: "Liability", body: <p>To the extent permitted by law, we are not liable for any loss arising from reliance on information on this website. Nothing in these terms limits liability that cannot be limited by law.</p> },
        { id: "privacy", h: "Privacy", body: <p>Our <Link href="/privacy-policy">privacy policy</Link> explains how we handle personal information.</p> },
        { id: "law", h: "Governing law", body: <p>These terms are governed by the laws of the Emirate of Dubai and the federal laws of the United Arab Emirates. The courts of Dubai have jurisdiction over any dispute.</p> },
      ]}
    />
  );
}
