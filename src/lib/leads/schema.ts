/**
 * Lead schema shared by the browser (instant validation) and the API route
 * (authoritative validation). No dependencies, so it runs in both.
 */
export const leadTypes = ["enquiry", "property", "consultation", "buy-sell", "investment", "management"] as const;
export type LeadType = (typeof leadTypes)[number];

export const budgets = [
  { value: "under-1m", label: "Under AED 1M" },
  { value: "1m-2m", label: "AED 1M – 2M" },
  { value: "2m-5m", label: "AED 2M – 5M" },
  { value: "5m-10m", label: "AED 5M – 10M" },
  { value: "10m-plus", label: "AED 10M+" },
  { value: "unsure", label: "Not sure yet" },
] as const;

export const timelines = [
  { value: "0-3", label: "Within 3 months" },
  { value: "3-6", label: "3–6 months" },
  { value: "6-12", label: "6–12 months" },
  { value: "researching", label: "Just researching" },
] as const;

export const interests = [
  { value: "apartment", label: "Apartment" },
  { value: "townhouse-villa", label: "Townhouse or villa" },
  { value: "office", label: "Commercial / office" },
  { value: "off-plan", label: "Off-plan opportunities" },
  { value: "open", label: "Open to suggestions" },
] as const;

export const contactMethods = [
  { value: "whatsapp", label: "WhatsApp" },
  { value: "phone", label: "Phone call" },
  { value: "email", label: "Email" },
] as const;

export interface Attribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
  referrer?: string;
  landing_page?: string;
  first_seen?: string;
}

export interface LeadInput {
  type: LeadType;
  name: string;
  email: string;
  phone: string;
  country?: string;
  budget?: string;
  interest?: string;
  timeline?: string;
  contactMethod?: string;
  preferredTime?: string;
  message?: string;
  property?: string;
  privacyAccepted: boolean;
  marketingConsent: boolean;
  page?: string;
  attribution?: Attribution;
}

export type FieldErrors = Partial<Record<keyof LeadInput, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const inList = (list: readonly { value: string }[], v?: string) => !v || list.some((o) => o.value === v);
const clean = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max) : "");
const cleanMultiline = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, " ").trim().slice(0, max) : "";

/** Normalises untrusted input and returns either a clean lead or field errors. */
export function parseLead(raw: Record<string, unknown>): { ok: true; lead: LeadInput } | { ok: false; errors: FieldErrors } {
  const errors: FieldErrors = {};
  const type = clean(raw.type, 20) as LeadType;
  const lead: LeadInput = {
    type: leadTypes.includes(type) ? type : "enquiry",
    name: clean(raw.name, 100),
    email: clean(raw.email, 160).toLowerCase(),
    phone: clean(raw.phone, 32),
    country: clean(raw.country, 60) || undefined,
    budget: clean(raw.budget, 20) || undefined,
    interest: clean(raw.interest, 20) || undefined,
    timeline: clean(raw.timeline, 20) || undefined,
    contactMethod: clean(raw.contactMethod, 20) || undefined,
    preferredTime: clean(raw.preferredTime, 120) || undefined,
    message: cleanMultiline(raw.message, 2000) || undefined,
    property: clean(raw.property, 80) || undefined,
    privacyAccepted: raw.privacyAccepted === true || raw.privacyAccepted === "on" || raw.privacyAccepted === "true",
    marketingConsent: raw.marketingConsent === true || raw.marketingConsent === "on" || raw.marketingConsent === "true",
    page: clean(raw.page, 300) || undefined,
  };

  if (raw.attribution && typeof raw.attribution === "object") {
    const a = raw.attribution as Record<string, unknown>;
    const keys: (keyof Attribution)[] = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid", "referrer", "landing_page", "first_seen"];
    lead.attribution = {};
    for (const k of keys) {
      const v = clean(a[k], 300);
      if (v) lead.attribution[k] = v;
    }
  }

  if (lead.name.length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL.test(lead.email)) errors.email = "Please enter a valid email address.";
  const digits = lead.phone.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15 || /[^\d\s+()\-.]/.test(lead.phone)) {
    errors.phone = "Please enter a phone number, including the country code.";
  }
  if (!inList(budgets, lead.budget)) errors.budget = "Please choose a budget from the list.";
  if (!inList(timelines, lead.timeline)) errors.timeline = "Please choose a timeline from the list.";
  if (!inList(interests, lead.interest)) errors.interest = "Please choose an option from the list.";
  if (!inList(contactMethods, lead.contactMethod)) errors.contactMethod = "Please choose how we should contact you.";
  if (!lead.privacyAccepted) errors.privacyAccepted = "Please confirm you have read the privacy policy.";

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, lead };
}

export const labelFor = (list: readonly { value: string; label: string }[], v?: string) =>
  list.find((o) => o.value === v)?.label ?? v ?? "—";
