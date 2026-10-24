import type { ReactNode } from "react";
import { Breadcrumbs } from "./Breadcrumbs";

export function PageHero({
  eyebrow,
  title,
  lede,
  crumbs,
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  crumbs: { label: string; href: string }[];
  aside?: ReactNode;
}) {
  return (
    <header className="page-hero dark">
      <div className="wrap">
        <Breadcrumbs items={crumbs} />
        <div className="page-hero__grid">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="h1 mt-s">{title}</h1>
          </div>
          <div>
            {lede && <p className="lede">{lede}</p>}
            {aside}
          </div>
        </div>
      </div>
    </header>
  );
}
