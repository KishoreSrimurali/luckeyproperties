"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";
import { track } from "@/lib/analytics";

/**
 * Site-wide behaviour that needs the browser:
 *  - scroll reveals for [data-reveal] / [data-reveal-img]
 *  - click tracking for [data-track] and tel:/mailto:/WhatsApp links
 *  - session attribution capture
 */
export function SiteEffects() {
  const pathname = usePathname();

  useEffect(() => {
    captureAttribution();
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-reveal='in']), [data-reveal-img]:not([data-reveal-img='in'])");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.setAttribute(el.hasAttribute("data-reveal") ? "data-reveal" : "data-reveal-img", "in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          el.setAttribute(el.hasAttribute("data-reveal") ? "data-reveal" : "data-reveal-img", "in");
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLElement>("a, button");
      if (!a) return;
      const explicit = a.dataset.track;
      const href = a.getAttribute("href") ?? "";
      const event =
        explicit ??
        (href.startsWith("tel:") ? "phone_click" : href.startsWith("mailto:") ? "email_click" : /whatsapp\.com|wa\.me/.test(href) ? "whatsapp_click" : null);
      if (event) track(event, { label: a.dataset.trackLabel, page: location.pathname });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
