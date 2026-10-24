export type Segment = "residential" | "commercial";

export interface Development {
  slug: string;
  name: string;
  developer: { name: string; url: string };
  location: string;
  /** Matching featured-location slug, if the project sits within one. */
  locationSlug: string | null;
  segment: Segment;
  /** Human configuration, e.g. "Studio to 3-bedroom apartments". */
  configuration: string;
  /** Filter keys for unit types, e.g. ["studio","1br"]. */
  unitKeys: UnitKey[];
  propertyType: "Apartments" | "Townhouses" | "Offices";
  /** Starting price published on the previous website (AED). */
  publishedFromAed: number;
  /**
   * ISO date the starting price was last confirmed with the developer. While
   * null the price is shown as "previously published — subject to verification"
   * and is excluded from structured-data offers.
   */
  priceVerifiedAt: string | null;
  /** Description from the existing website. */
  summary: string;
  /**
   * Verified detail blocks. Each stays empty until confirmed with the developer
   * — the page then shows a "request current details" prompt rather than guessing.
   */
  verified: {
    units: { label: string; sizeSqft?: string; fromAed?: number }[];
    paymentPlan: { label: string; percent: number }[];
    handover: string | null;
    amenities: string[];
    brochureUrl: string | null;
    videoUrl: string | null;
  };
  /** Expected media files under /public/media/properties/<slug>/ (01.jpg, 02.jpg …). */
  imageCount: number;
  imageAlt: string;
  geoQuery: string;
}

export type UnitKey = "studio" | "1br" | "2br" | "3br" | "4br" | "office";

export interface Location {
  slug: string;
  name: string;
  line: string;
  summary: string;
  body: string[];
  facts: string[];
  imageAlt: string;
  geoQuery: string;
}

export interface TeamMember {
  slug: string;
  name: string;
  title: string;
  bio: string[];
  quote: string;
  /** Portrait at /public/media/team/<slug>.jpg once visually verified. */
  portraitAlt: string;
}

export interface Testimonial {
  name: string;
  profession: string;
  quote: string;
}
