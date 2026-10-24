import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ContactSection, Locations } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Dubai Locations — Creek Harbour, Dubai Islands, Expo City, Maritime City",
  description: "An introduction to Dubai Creek Harbour, Dubai Islands, Expo City and Dubai Maritime City: what each area is like, how far along it is, and what buyers should check.",
  alternates: { canonical: "/locations" },
};

export default function LocationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Locations"
        title={<>Four parts of Dubai, <em>at four different stages</em></>}
        lede="Some of these areas are well established; others are still being built. Here's what each one is like today and what to check before you buy."
        crumbs={[{ label: "Locations", href: "/locations" }]}
      />
      <Locations headingLevel={1} />
      <ContactSection />
    </>
  );
}
