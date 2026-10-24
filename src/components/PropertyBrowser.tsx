"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Development, UnitKey } from "@/data/types";
import { track } from "@/lib/analytics";
import { PropertyCard } from "./PropertyCard";
import { ConsultationCTAInline } from "./ConsultationCTAInline";

const units: { value: "" | UnitKey; label: string }[] = [
  { value: "", label: "Any" },
  { value: "studio", label: "Studio" },
  { value: "1br", label: "1 bedroom" },
  { value: "2br", label: "2 bedrooms" },
  { value: "3br", label: "3 bedrooms" },
  { value: "4br", label: "4 bedrooms" },
  { value: "office", label: "Office" },
];
const budgetsAed = [
  { value: "", label: "Any budget" },
  { value: "1000000", label: "Up to AED 1M" },
  { value: "2000000", label: "Up to AED 2M" },
  { value: "5000000", label: "Up to AED 5M" },
  { value: "10000000", label: "Up to AED 10M" },
];

export function PropertyBrowser({ items, images }: { items: Development[]; images: Record<string, string | null> }) {
  const [segment, setSegment] = useState("");
  const [developer, setDeveloper] = useState("");
  const [unit, setUnit] = useState<"" | UnitKey>("");
  const [budget, setBudget] = useState("");
  const first = useRef(true);

  const developers = useMemo(() => [...new Set(items.map((d) => d.developer.name))].sort(), [items]);

  const results = useMemo(
    () =>
      items.filter(
        (d) =>
          (!segment || d.segment === segment) &&
          (!developer || d.developer.name === developer) &&
          (!unit || d.unitKeys.includes(unit)) &&
          (!budget || d.publishedFromAed <= Number(budget)),
      ),
    [items, segment, developer, unit, budget],
  );

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    track("property_filter", { segment, developer, unit, budget, results: results.length });
  }, [segment, developer, unit, budget, results.length]);

  const reset = () => {
    setSegment("");
    setDeveloper("");
    setUnit("");
    setBudget("");
  };

  return (
    <>
      <form className="filters" role="search" aria-label="Filter properties" onSubmit={(e) => e.preventDefault()}>
        <div className="field">
          <label htmlFor="f-seg">Use</label>
          <select id="f-seg" className="input" value={segment} onChange={(e) => setSegment(e.target.value)}>
            <option value="">Residential & commercial</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="f-dev">Developer</label>
          <select id="f-dev" className="input" value={developer} onChange={(e) => setDeveloper(e.target.value)}>
            <option value="">All developers</option>
            {developers.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="f-unit">Configuration</label>
          <select id="f-unit" className="input" value={unit} onChange={(e) => setUnit(e.target.value as UnitKey | "")}>
            {units.map((u) => (
              <option key={u.value} value={u.value}>
                {u.label}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="f-budget">Starting price</label>
          <select id="f-budget" className="input" value={budget} onChange={(e) => setBudget(e.target.value)}>
            {budgetsAed.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
        </div>
        <p className="filters__count" aria-live="polite">
          {results.length} of {items.length} developments
        </p>
      </form>

      {results.length ? (
        <div className="props props--uniform">
          {results.map((d) => (
            <PropertyCard key={d.slug} dev={d} image={images[d.slug]} sizes="(min-width: 1100px) 33vw, (min-width: 700px) 50vw, 100vw" />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2 className="h3">Nothing matches those filters yet.</h2>
          <p className="muted" style={{ maxWidth: "48ch" }}>
            We only list developments we can stand behind, so this page isn&rsquo;t exhaustive. Tell us what you&rsquo;re looking for and we&rsquo;ll share
            suitable current opportunities.
          </p>
          <div className="row">
            <button type="button" className="btn btn--ghost btn--sm" onClick={reset}>
              Clear filters
            </button>
            <ConsultationCTAInline />
          </div>
        </div>
      )}
    </>
  );
}
