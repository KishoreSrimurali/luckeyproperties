import Link from "next/link";
import { site } from "@/config/site";
import { JsonLd } from "./JsonLd";

export function Breadcrumbs({ items }: { items: { label: string; href: string }[] }) {
  const all = [{ label: "Home", href: "/" }, ...items];
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {all.map((c, i) => (
          <li key={c.href}>{i === all.length - 1 ? <span aria-current="page">{c.label}</span> : <Link href={c.href}>{c.label}</Link>}</li>
        ))}
      </ol>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: `${site.url}${c.href === "/" ? "" : c.href}` })),
        }}
      />
    </nav>
  );
}
