"use client";

export interface Consent {
  analytics: boolean;
  marketing: boolean;
  /** ISO timestamp of the choice. */
  at: string;
  v: 1;
}

const COOKIE = "lp_consent";
export const CONSENT_EVENT = "lp:consent";

export function readConsent(): Consent | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(new RegExp(`(?:^|; )${COOKIE}=([^;]*)`));
  if (!m) return null;
  try {
    const c = JSON.parse(decodeURIComponent(m[1])) as Consent;
    return c.v === 1 ? c : null;
  } catch {
    return null;
  }
}

export function writeConsent(choice: { analytics: boolean; marketing: boolean }) {
  const c: Consent = { ...choice, at: new Date().toISOString(), v: 1 };
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE}=${encodeURIComponent(JSON.stringify(c))}; Path=/; Max-Age=${60 * 60 * 24 * 180}; SameSite=Lax${secure}`;
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: c }));
  return c;
}

export function openConsentPreferences() {
  window.dispatchEvent(new CustomEvent("lp:open-consent"));
}
