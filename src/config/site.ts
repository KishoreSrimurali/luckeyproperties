/**
 * Company facts supplied by LUCKEY Properties (source of truth: website brief).
 * Values here are rendered across the site, in structured data and in emails.
 */
const env = (key: string) => {
  const v = process.env[key];
  return v && v.trim() ? v.trim() : null;
};

export const site = {
  name: "LUCKEY Properties",
  url: (env("NEXT_PUBLIC_SITE_URL") ?? "https://www.luckeyproperties.com").replace(/\/$/, ""),
  tagline: "Unlock Prosperity. Build Legacy.",
  description:
    "LUCKEY Properties is a Dubai real estate company in Business Bay helping buyers and investors — including clients in India — buy, sell and manage property in Dubai.",
  locale: "en_AE",

  contact: {
    phoneDisplay: "+971 55 825 6697",
    phoneE164: "+971558256697",
    /** Digits only, for wa.me / api.whatsapp.com deep links. */
    whatsapp: "971558256697",
    email: "info@luckeyproperties.com",
    address: {
      line1: "Ontario Tower, Ground Floor, Office No. 18",
      line2: "Business Bay, Dubai",
      country: "United Arab Emirates",
      locality: "Dubai",
      region: "Dubai",
      countryCode: "AE",
    },
    /**
     * Map pin for Ontario Tower, Business Bay. The original site embeds a Google
     * Map referencing Ontario Tower — confirm this pin against it before launch.
     */
    mapQuery: "Ontario Tower, Business Bay, Dubai",
  },

  social: {
    instagram: "https://www.instagram.com/luckey.properties/",
  },

  /**
   * Regulatory credentials were not supplied. Add the RERA ORN / trade licence
   * only once verified on the Dubai Land Department broker registry; the footer
   * and structured data pick them up automatically.
   */
  credentials: {
    reraOrn: env("NEXT_PUBLIC_RERA_ORN"),
    tradeLicence: env("NEXT_PUBLIC_TRADE_LICENCE"),
  },

  /** Calendly / Cal.com / HubSpot meetings link. Without it, consultations are requested through the form. */
  bookingUrl: env("NEXT_PUBLIC_BOOKING_URL"),

  /**
   * Staging switch. When true, content awaiting sign-off (testimonials pending
   * permission) is shown with an "awaiting approval" label. Never enable in production.
   */
  contentPreview: process.env.NEXT_PUBLIC_CONTENT_PREVIEW === "true",
  /** Set to "true" once each client has confirmed their testimonial may be published. */
  testimonialsApproved: process.env.NEXT_PUBLIC_TESTIMONIALS_APPROVED === "true",
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Properties", href: "/properties" },
  { label: "Locations", href: "/locations" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
