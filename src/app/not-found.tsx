import Link from "next/link";
import { Arrow } from "@/components/Icons";

export default function NotFound() {
  return (
    <section className="page-hero dark" style={{ minHeight: "80svh", display: "flex", alignItems: "center" }}>
      <div className="wrap">
        <p className="eyebrow">404</p>
        <h1 className="h1 mt-s">This page has moved, or never existed.</h1>
        <p className="lede mt-s">Our website has been rebuilt, so some older links no longer work. These should help:</p>
        <div className="row mt-m">
          <Link className="btn btn--light" href="/properties">Properties <Arrow /></Link>
          <Link className="btn btn--ghost" href="/contact">Contact us</Link>
          <Link className="btn btn--ghost" href="/">Home</Link>
        </div>
      </div>
    </section>
  );
}
