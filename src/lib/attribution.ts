"use client";

import type { Attribution } from "./leads/schema";

const KEY = "lp_attr";
const PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"] as const;

/**
 * Records where this visit came from (campaign parameters, referrer, landing
 * page) for the current browser session only, so an enquiry can be attributed
 * to the channel that produced it. Nothing is sent anywhere unless the visitor
 * submits a form.
 */
export function captureAttribution() {
  try {
    const url = new URL(location.href);
    const existing = sessionStorage.getItem(KEY);
    const hasCampaign = PARAMS.some((p) => url.searchParams.has(p));
    if (existing && !hasCampaign) return;
    const a: Attribution = { landing_page: url.pathname, first_seen: new Date().toISOString() };
    for (const p of PARAMS) {
      const v = url.searchParams.get(p);
      if (v) a[p] = v.slice(0, 200);
    }
    if (document.referrer && new URL(document.referrer).host !== location.host) a.referrer = document.referrer.slice(0, 300);
    sessionStorage.setItem(KEY, JSON.stringify(a));
  } catch {
    /* storage unavailable — attribution is best-effort */
  }
}

export function getAttribution(): Attribution | undefined {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Attribution) : undefined;
  } catch {
    return undefined;
  }
}
