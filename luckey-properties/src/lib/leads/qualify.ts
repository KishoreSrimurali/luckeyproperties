import type { LeadInput } from "./schema.ts";

export type Tier = "priority" | "active" | "nurture";

/**
 * Simple, transparent qualification so the team can see which enquiries to
 * call first. Weights are deliberately easy to adjust.
 */
export function qualify(lead: LeadInput): { score: number; tier: Tier; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  const budgetPts: Record<string, number> = { "under-1m": 10, "1m-2m": 20, "2m-5m": 30, "5m-10m": 35, "10m-plus": 40, unsure: 5 };
  if (lead.budget) {
    score += budgetPts[lead.budget] ?? 0;
    reasons.push(`budget:${lead.budget}`);
  }
  const timelinePts: Record<string, number> = { "0-3": 35, "3-6": 25, "6-12": 12, researching: 3 };
  if (lead.timeline) {
    score += timelinePts[lead.timeline] ?? 0;
    reasons.push(`timeline:${lead.timeline}`);
  }
  if (lead.property) {
    score += 30;
    reasons.push("specific-property");
  }
  if (lead.type === "consultation") {
    score += 10;
    reasons.push("consultation");
  }
  if (lead.message && lead.message.length > 40) score += 5;

  const tier: Tier = score >= 60 ? "priority" : score >= 30 ? "active" : "nurture";
  return { score, tier, reasons };
}
