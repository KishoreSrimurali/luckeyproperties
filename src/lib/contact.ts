import { site } from "@/config/site";

/** WhatsApp deep link with a prefilled, context-specific message. */
export function whatsappHref(message?: string): string {
  const base = `https://api.whatsapp.com/send/?phone=${site.contact.whatsapp}`;
  return message ? `${base}&text=${encodeURIComponent(message)}` : base;
}

export function propertyWhatsappMessage(name: string, url?: string): string {
  return `Hello LUCKEY Properties, I'd like current availability and pricing for ${name}.${url ? ` (${url})` : ""}`;
}

export const telHref = `tel:${site.contact.phoneE164}`;
export const mailHref = (subject?: string) =>
  `mailto:${site.contact.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;

export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.contact.mapQuery)}`;
export const mapsEmbed = (q: string) => `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=14&output=embed`;
