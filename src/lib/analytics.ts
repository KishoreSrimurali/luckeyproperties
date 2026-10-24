"use client";

import { readConsent } from "./consent";

/**
 * Conversion events (GA4 naming where one exists):
 *   generate_lead            — any successful enquiry (lead_type, property, tier)
 *   consultation_request     — consultation form submitted
 *   booking_click            — opened the external booking calendar
 *   property_enquiry         — enquiry about a specific development
 *   whatsapp_click / phone_click / email_click
 *   view_item                — property detail viewed
 *   property_filter          — filters applied on /properties
 *   form_error               — a submission failed (reason)
 * Events are only sent after the visitor has accepted analytics cookies.
 */
type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  if (!readConsent()?.analytics) return;
  const clean = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined));
  if (window.gtag) window.gtag("event", event, clean);
  else (window.dataLayer ??= []).push({ event, ...clean });
}
