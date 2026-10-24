import Link from "next/link";

export function ConsultationCTAInline() {
  return (
    <Link className="btn btn--sm" href="/contact?intent=buy-sell#enquire">
      Tell us your brief
    </Link>
  );
}
