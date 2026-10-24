import Link from "next/link";
import { site } from "@/config/site";
import { Arrow } from "./Icons";

/** "Book a Consultation": opens the live booking calendar when configured, otherwise the consultation request form. */
export function ConsultationLink({ className = "btn", label = "Book a Consultation", arrow = false }: { className?: string; label?: string; arrow?: boolean }) {
  if (site.bookingUrl) {
    return (
      <a className={className} href={site.bookingUrl} target="_blank" rel="noopener" data-track="booking_click">
        {label}
        {arrow && <Arrow />}
        <span className="sr-only"> (opens booking calendar in a new tab)</span>
      </a>
    );
  }
  return (
    <Link className={className} href="/contact?intent=consultation#enquire" data-track="cta_click" data-track-label="consultation">
      {label}
      {arrow && <Arrow />}
    </Link>
  );
}
