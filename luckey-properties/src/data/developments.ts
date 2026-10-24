import type { Development } from "./types";

const pending = {
  units: [],
  paymentPlan: [],
  handover: null,
  amenities: [],
  brochureUrl: null,
  videoUrl: null,
};

/**
 * The six developments featured on the existing LUCKEY Properties website.
 * Names, locations, configurations, starting prices and descriptions are taken
 * from that site. Prices are NOT treated as current until `priceVerifiedAt` is set.
 * Detailed fields (`verified`) are intentionally empty: fill them only from the
 * developer's current, authorised sales material.
 */
export const developments: Development[] = [
  {
    slug: "sobha-central",
    name: "Sobha Central",
    developer: { name: "Sobha Realty", url: "https://www.sobharealty.com/" },
    location: "Sheikh Zayed Road, Dubai",
    locationSlug: null,
    segment: "residential",
    configuration: "1- and 2-bedroom apartments",
    unitKeys: ["1br", "2br"],
    propertyType: "Apartments",
    publishedFromAed: 1_910_000,
    priceVerifiedAt: null,
    summary:
      "Elevated one- and two-bedroom residences offering refined urban living, panoramic Dubai skyline views and connectivity.",
    verified: pending,
    imageCount: 4,
    imageAlt: "Sobha Central on Sheikh Zayed Road, Dubai",
    geoQuery: "Sobha Central, Sheikh Zayed Road, Dubai",
  },
  {
    slug: "binghatti-spectre",
    name: "Binghatti Spectre",
    developer: { name: "Binghatti", url: "https://www.binghatti.com/" },
    location: "Al Jaddaf Waterfront, Dubai",
    locationSlug: null,
    segment: "residential",
    configuration: "Studio to 3-bedroom apartments",
    unitKeys: ["studio", "1br", "2br", "3br"],
    propertyType: "Apartments",
    publishedFromAed: 774_999,
    priceVerifiedAt: null,
    summary:
      "A mixed-use development combining contemporary residences, premium offices and retail spaces with distinctive architecture.",
    verified: pending,
    imageCount: 4,
    imageAlt: "Binghatti Spectre at Al Jaddaf Waterfront, Dubai",
    geoQuery: "Binghatti Spectre, Al Jaddaf, Dubai",
  },
  {
    slug: "damac-lagoon-views-13b",
    name: "DAMAC Lagoon Views 13B",
    developer: { name: "DAMAC Properties", url: "https://www.damacproperties.com/" },
    location: "DAMAC Lagoons, Dubai",
    locationSlug: null,
    segment: "residential",
    configuration: "1- and 2-bedroom apartments",
    unitKeys: ["1br", "2br"],
    propertyType: "Apartments",
    publishedFromAed: 1_400_000,
    priceVerifiedAt: null,
    summary:
      "Mediterranean-inspired waterfront apartments with lagoon views, elegant architecture and resort-style living.",
    verified: pending,
    imageCount: 4,
    imageAlt: "DAMAC Lagoon Views apartments overlooking the lagoon, DAMAC Lagoons, Dubai",
    geoQuery: "DAMAC Lagoons, Dubai",
  },
  {
    slug: "valencia-damac-lagoons",
    name: "Valencia",
    developer: { name: "DAMAC Properties", url: "https://www.damacproperties.com/" },
    location: "DAMAC Lagoons District, Dubailand",
    locationSlug: null,
    segment: "residential",
    configuration: "Studio to 2-bedroom apartments",
    unitKeys: ["studio", "1br", "2br"],
    propertyType: "Apartments",
    publishedFromAed: 725_000,
    priceVerifiedAt: null,
    summary:
      "Contemporary residences combining Mediterranean-inspired living with community amenities, leisure and retail experiences.",
    verified: pending,
    imageCount: 4,
    imageAlt: "Valencia residences in the DAMAC Lagoons district, Dubailand",
    geoQuery: "DAMAC Lagoons, Dubailand, Dubai",
  },
  {
    slug: "piazza-roma-damac-lagoons",
    name: "Piazza Roma",
    developer: { name: "DAMAC Properties", url: "https://www.damacproperties.com/" },
    location: "DAMAC Lagoons District, Dubailand",
    locationSlug: null,
    segment: "commercial",
    configuration: "Premium office spaces",
    unitKeys: ["office"],
    propertyType: "Offices",
    publishedFromAed: 7_400_000,
    priceVerifiedAt: null,
    summary:
      "A commercial destination offering office spaces alongside retail, dining and lifestyle amenities.",
    verified: pending,
    imageCount: 4,
    imageAlt: "Piazza Roma commercial district in DAMAC Lagoons, Dubailand",
    geoQuery: "DAMAC Lagoons, Dubailand, Dubai",
  },
  {
    slug: "alva-the-valley",
    name: "ALVA — The Valley",
    developer: { name: "Emaar Properties", url: "https://www.emaar.com/" },
    location: "The Valley, Dubai",
    locationSlug: null,
    segment: "residential",
    configuration: "3- and 4-bedroom townhouses",
    unitKeys: ["3br", "4br"],
    propertyType: "Townhouses",
    publishedFromAed: 4_380_000,
    priceVerifiedAt: null,
    summary:
      "Spacious townhouses designed for contemporary family living within Emaar's The Valley community.",
    verified: pending,
    imageCount: 4,
    imageAlt: "ALVA townhouses in Emaar's The Valley community, Dubai",
    geoQuery: "The Valley by Emaar, Dubai",
  },
];

export const getDevelopment = (slug: string) => developments.find((d) => d.slug === slug);
