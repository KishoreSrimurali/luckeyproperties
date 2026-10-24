import Link from "next/link";
import { media } from "@/lib/media";

/**
 * Uses the official logo from /public/media/brand/logo-light.(svg|png) once it
 * has been supplied; until then renders a typographic wordmark.
 */
export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  const file = media(tone === "light" ? "brand/logo-light" : "brand/logo-dark");
  return (
    <Link href="/" className="logo" aria-label="LUCKEY Properties — home">
      {file ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={file} alt="LUCKEY Properties" width={160} height={42} />
      ) : (
        <>
          <span className="logo__word">LUCKEY</span>
          <span className="logo__sub">Properties</span>
        </>
      )}
    </Link>
  );
}
