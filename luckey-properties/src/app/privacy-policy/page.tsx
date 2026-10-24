import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How LUCKEY Properties collects, uses and protects personal information shared through our website, WhatsApp and enquiry forms.",
  alternates: { canonical: "/privacy-policy" },
};

const email = <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>;

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      slug="privacy-policy"
      updated="October 2026"
      intro="How we collect, use and look after the information you share with us."
      sections={[
        {
          id: "who",
          h: "Who we are",
          body: (
            <p>
              This website is operated by {site.name}, {site.contact.address.line1}, {site.contact.address.line2}, {site.contact.address.country} (&ldquo;we&rdquo;, &ldquo;us&rdquo;). For any question about this policy or your personal information, contact us at {email} or {site.contact.phoneDisplay}.
            </p>
          ),
        },
        {
          id: "collect",
          h: "Information we collect",
          body: (
            <>
              <p>We collect information you choose to give us, and limited technical information about how the website is used:</p>
              <ul>
                <li><strong>Contact information</strong> — your name, email address, phone or WhatsApp number and, if you tell us, your country of residence.</li>
                <li><strong>Property preferences</strong> — the properties, locations, property types and timeline you&rsquo;re interested in, and anything you write in your message.</li>
                <li><strong>Budget information</strong> — only if you choose to provide it.</li>
                <li><strong>Enquiry context</strong> — the page you enquired from and, where available, how you arrived at our website (for example a search engine, social media post or advertising campaign).</li>
                <li><strong>Technical and analytics data</strong> — such as browser type, device, approximate location derived from your IP address and the pages you visit. Analytics cookies are only used if you accept them; see our <Link href="/cookie-preferences">cookie policy</Link>.</li>
              </ul>
              <p>If you contact us on WhatsApp, by phone or by email, we receive the information you share through that channel.</p>
            </>
          ),
        },
        {
          id: "use",
          h: "How we use your information",
          body: (
            <ul>
              <li>To respond to your enquiry and provide the services you ask for, including arranging viewings and consultations.</li>
              <li>To recommend properties and opportunities that match your stated requirements.</li>
              <li>To understand which pages and campaigns are useful, and to improve our website and services.</li>
              <li>To send you property updates and marketing — only where you have opted in. You can unsubscribe at any time.</li>
              <li>To meet our legal and regulatory obligations, and to protect our website against fraud and abuse.</li>
            </ul>
          ),
        },
        {
          id: "share",
          h: "Sharing your information",
          body: (
            <>
              <p><strong>We do not sell, rent or trade your personal information.</strong></p>
              <p>We share it only where needed to deliver the services you&rsquo;ve requested or to run our business, for example with:</p>
              <ul>
                <li>property developers, sellers and other relevant partners, when you ask us to pursue a property or arrange a viewing;</li>
                <li>service providers that work on our behalf, such as website hosting, email delivery, customer-relationship management (CRM), analytics and messaging providers;</li>
                <li>authorities or professional advisers, where required by law or to establish or defend legal claims.</li>
              </ul>
              <p>We expect these parties to protect your information and use it only for the purpose it was shared.</p>
            </>
          ),
        },
        {
          id: "transfers",
          h: "International transfers",
          body: (
            <p>
              Some of our service providers store or process data outside the UAE. Where that happens we take reasonable steps to ensure your information is protected consistently with applicable data-protection law, including the UAE Personal Data Protection Law and, where relevant to you, laws such as India&rsquo;s Digital Personal Data Protection Act or the EU/UK GDPR.
            </p>
          ),
        },
        {
          id: "retention",
          h: "How long we keep it",
          body: <p>We keep enquiry information for as long as needed to deal with your enquiry and any resulting relationship, and to meet legal and record-keeping requirements. When it is no longer needed we delete or anonymise it.</p>,
        },
        {
          id: "rights",
          h: "Your choices and rights",
          body: (
            <>
              <p>Depending on where you live, you may have the right to ask us to access, correct or delete your personal information, to object to or restrict certain uses, to withdraw consent, and to complain to a data-protection authority.</p>
              <p>To make a request, email {email}. You can change your cookie choices at any time from the <Link href="/cookie-preferences">cookie policy</Link> page or the link in the footer.</p>
            </>
          ),
        },
        {
          id: "security",
          h: "Security",
          body: <p>Our website uses encrypted connections (HTTPS), and enquiry forms are protected against automated abuse. We restrict access to personal information to people who need it. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.</p>,
        },
        {
          id: "changes",
          h: "Changes to this policy",
          body: <p>We may update this policy from time to time. The date at the top shows when it last changed.</p>,
        },
      ]}
    />
  );
}
