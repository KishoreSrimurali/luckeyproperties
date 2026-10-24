import type { Metadata } from "next";
import { site } from "@/config/site";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: "LUCKEY Properties aims for this website to be usable by everyone and to follow WCAG 2.1 Level AA where reasonably applicable.",
  alternates: { canonical: "/accessibility-statement" },
};

export default function Accessibility() {
  return (
    <LegalPage
      title="Accessibility Statement"
      slug="accessibility-statement"
      updated="October 2026"
      intro="We want everyone to be able to use this website, whatever device, browser or assistive technology they use."
      sections={[
        {
          id: "aim",
          h: "Our aim",
          body: <p>We aim to follow the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA where reasonably applicable. This is a goal we work towards, not a formal certification.</p>,
        },
        {
          id: "measures",
          h: "What we have done",
          body: (
            <ul>
              <li>Semantic page structure with landmarks, headings and a &ldquo;skip to content&rdquo; link.</li>
              <li>Full keyboard navigation, including the mobile menu, galleries and forms, with visible focus indicators.</li>
              <li>Text and interface colours chosen for readable contrast.</li>
              <li>Descriptive alternative text for meaningful images.</li>
              <li>Forms with visible labels, clear error messages linked to each field, and announced success and error states.</li>
              <li>Animation that respects your device&rsquo;s &ldquo;reduce motion&rdquo; setting.</li>
              <li>Layouts that adapt to small screens and to browser zoom.</li>
            </ul>
          ),
        },
        {
          id: "limits",
          h: "Known limitations",
          body: (
            <ul>
              <li>Some third-party content, such as embedded Google Maps or developer brochures in PDF format, may not be fully accessible. We offer the same information by phone, WhatsApp or email on request.</li>
              <li>Video content supplied by developers may not always include captions.</li>
            </ul>
          ),
        },
        {
          id: "feedback",
          h: "Feedback and help",
          body: (
            <p>
              If you have difficulty using any part of this website, or need information in a different format, please contact us at{" "}
              <a href={`mailto:${site.contact.email}?subject=Accessibility`}>{site.contact.email}</a> or on {site.contact.phoneDisplay}. We&rsquo;ll do our best to help and to fix the problem.
            </p>
          ),
        },
      ]}
    />
  );
}
