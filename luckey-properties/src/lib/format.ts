export function formatAed(value: number): string {
  if (value >= 1_000_000) {
    const m = value / 1_000_000;
    return `AED ${m.toFixed(m >= 10 ? 1 : 2).replace(/\.?0+$/, "")}M`;
  }
  return `AED ${value.toLocaleString("en-US")}`;
}

export function formatAedFull(value: number): string {
  return `AED ${value.toLocaleString("en-US")}`;
}
