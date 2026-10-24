"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import { CONSENT_EVENT, readConsent, writeConsent, type Consent } from "@/lib/consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

/**
 * Cookie banner + consent-gated analytics. No analytics or marketing script is
 * loaded until the visitor opts in; Google Consent Mode is updated to match.
 */
export function ConsentManager() {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const c = readConsent();
    setConsent(c);
    setAnalytics(c?.analytics ?? false);
    setMarketing(c?.marketing ?? false);
    setOpen(!c);
    setReady(true);
    const reopen = () => {
      setCustom(true);
      setOpen(true);
    };
    const onChange = (e: Event) => setConsent((e as CustomEvent<Consent>).detail);
    window.addEventListener("lp:open-consent", reopen);
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => {
      window.removeEventListener("lp:open-consent", reopen);
      window.removeEventListener(CONSENT_EVENT, onChange);
    };
  }, []);

  useEffect(() => {
    if (!consent || !window.gtag) return;
    window.gtag("consent", "update", {
      analytics_storage: consent.analytics ? "granted" : "denied",
      ad_storage: consent.marketing ? "granted" : "denied",
      ad_user_data: consent.marketing ? "granted" : "denied",
      ad_personalization: consent.marketing ? "granted" : "denied",
    });
  }, [consent]);

  const save = (choice: { analytics: boolean; marketing: boolean }) => {
    setConsent(writeConsent(choice));
    setAnalytics(choice.analytics);
    setMarketing(choice.marketing);
    setOpen(false);
    setCustom(false);
  };

  const load = consent?.analytics && (GA_ID || GTM_ID);

  return (
    <>
      {load && (
        <>
          <Script id="consent-defaults" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('consent', 'default', {
              analytics_storage: 'granted',
              ad_storage: '${consent?.marketing ? "granted" : "denied"}',
              ad_user_data: '${consent?.marketing ? "granted" : "denied"}',
              ad_personalization: '${consent?.marketing ? "granted" : "denied"}'
            });
            gtag('js', new Date());
            ${GA_ID ? `gtag('config', '${GA_ID}', { anonymize_ip: true });` : ""}
          `}</Script>
          {GA_ID && <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />}
          {GTM_ID && (
            <Script id="gtm" strategy="afterInteractive">{`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');
            `}</Script>
          )}
        </>
      )}

      {ready && open && (
        <section className="consent" role="dialog" aria-modal="false" aria-labelledby="consent-title">
          <h2 id="consent-title">Cookies on this site</h2>
          <p>
            We use essential cookies to make the site work. With your permission we&rsquo;d also like to use analytics cookies to understand which pages
            are useful, and marketing cookies to measure our advertising. See our <Link className="link" href="/cookie-preferences">cookie policy</Link>.
          </p>
          {custom && (
            <div className="consent__opts">
              <label className="check">
                <input type="checkbox" checked disabled /> <span><strong>Essential</strong> — always on. Remembers your cookie choice and keeps forms secure.</span>
              </label>
              <label className="check">
                <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} />
                <span><strong>Analytics</strong> — anonymous usage statistics (Google Analytics).</span>
              </label>
              <label className="check">
                <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} />
                <span><strong>Marketing</strong> — measures the performance of our advertising campaigns.</span>
              </label>
            </div>
          )}
          <div className="consent__actions">
            {custom ? (
              <button className="btn btn--sm" onClick={() => save({ analytics, marketing })}>Save choices</button>
            ) : (
              <>
                <button className="btn btn--sm" onClick={() => save({ analytics: true, marketing: true })}>Accept all</button>
                <button className="btn btn--sm btn--ghost" onClick={() => save({ analytics: false, marketing: false })}>Reject non-essential</button>
                <button className="btn btn--sm btn--ghost" onClick={() => setCustom(true)}>Customise</button>
              </>
            )}
          </div>
        </section>
      )}
    </>
  );
}

export function ConsentButton({ children = "Cookie settings", className }: { children?: string; className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new CustomEvent("lp:open-consent"))}>
      {children}
    </button>
  );
}
