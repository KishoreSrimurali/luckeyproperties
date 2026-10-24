"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { developments } from "@/data/developments";
import { propertyWhatsappMessage, telHref, whatsappHref } from "@/lib/contact";
import { WhatsAppGlyph } from "./Icons";

/** Mobile-only persistent contact bar. On a property page the WhatsApp message names that property. */
export function ActionBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const slug = pathname.startsWith("/properties/") ? pathname.split("/")[2] : null;
  const dev = slug ? developments.find((d) => d.slug === slug) : undefined;
  const wa = whatsappHref(dev ? propertyWhatsappMessage(dev.name) : "Hello LUCKEY Properties, I'd like to speak with your team about Dubai property.");

  return (
    <div className="action-bar" data-visible={visible} aria-label="Quick contact">
      <a href={wa} target="_blank" rel="noopener" data-track="whatsapp_click" data-track-label={dev?.slug ?? "action-bar"}>
        <WhatsAppGlyph /> WhatsApp
      </a>
      <a href={telHref} data-track="phone_click" data-track-label="action-bar">
        Call
      </a>
      <Link href={dev ? `/properties/${dev.slug}#enquire` : "/contact#enquire"} data-track="cta_click" data-track-label="action-bar-enquire">
        {dev ? "Enquire" : "Enquire now"}
      </Link>
    </div>
  );
}
