import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ContactSection, Story, Team, Testimonials } from "@/components/Sections";

export const metadata: Metadata = {
  title: "About LUCKEY Properties — Our Story and Team",
  description: "Unlock Prosperity. Build Legacy. Meet Pavan Tata, Sravya Duvvuri, Rohit Gonde and Shiridish Raj Gollapally, the team behind LUCKEY Properties in Business Bay, Dubai.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={<>Luck, and <em>the key</em></>}
        lede="LUCKEY Properties is a Dubai real estate company based in Business Bay, working with buyers, investors and owners in the UAE and abroad."
        crumbs={[{ label: "About", href: "/about" }]}
      />
      <Story link={false} />
      <div id="team">
        <Team full />
      </div>
      <Testimonials />
      <ContactSection />
    </>
  );
}
