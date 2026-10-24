/** Typographic stand-in shown until verified project photography is supplied. */
export function Plate({ name, developer, location, index, tone = "dark" }: { name: string; developer?: string; location?: string; index?: number; tone?: "dark" | "light" }) {
  return (
    <div className={`plate ${tone === "light" ? "plate--light" : ""}`} aria-hidden="true">
      <div className="plate__dev">{developer}</div>
      <div>
        {index ? (
          <div className="plate__num">
            <small>N°</small>
            {String(index).padStart(2, "0")}
          </div>
        ) : (
          <div className="plate__name">{name}</div>
        )}
        {location && <div className="plate__loc">{location}</div>}
        <div className="plate__note">Official project imagery available on request</div>
      </div>
    </div>
  );
}
