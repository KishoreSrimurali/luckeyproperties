import { test } from "node:test";
import assert from "node:assert/strict";
import { parseLead } from "../src/lib/leads/schema.ts";
import { qualify } from "../src/lib/leads/qualify.ts";

const valid = { name: "Asha Rao", email: "Asha@Example.com", phone: "+91 98765 43210", privacyAccepted: true };

test("accepts a minimal valid lead and normalises email", () => {
  const r = parseLead(valid);
  assert.equal(r.ok, true);
  if (r.ok) {
    assert.equal(r.lead.email, "asha@example.com");
    assert.equal(r.lead.type, "enquiry");
    assert.equal(r.lead.marketingConsent, false);
  }
});

test("rejects missing consent, bad email and bad phone", () => {
  const r = parseLead({ name: "A", email: "nope", phone: "12", privacyAccepted: false });
  assert.equal(r.ok, false);
  if (!r.ok) assert.deepEqual(Object.keys(r.errors).sort(), ["email", "name", "phone", "privacyAccepted"]);
});

test("rejects values outside the allowed lists", () => {
  const r = parseLead({ ...valid, budget: "a-billion", timeline: "yesterday" });
  assert.equal(r.ok, false);
  if (!r.ok) assert.ok(r.errors.budget && r.errors.timeline);
});

test("strips control characters and truncates long input", () => {
  const r = parseLead({ ...valid, name: "Asha\u0000 Rao", message: "x".repeat(5000) });
  assert.equal(r.ok, true);
  if (r.ok) {
    assert.equal(r.lead.name, "Asha  Rao");
    assert.equal(r.lead.message!.length, 2000);
  }
});

test("unknown lead type falls back to enquiry", () => {
  const r = parseLead({ ...valid, type: "<script>" });
  assert.equal(r.ok && r.lead.type, "enquiry");
});

test("qualification tiers", () => {
  const hot = parseLead({ ...valid, budget: "2m-5m", timeline: "0-3", property: "sobha-central" });
  const cold = parseLead({ ...valid, timeline: "researching" });
  assert.ok(hot.ok && cold.ok);
  if (hot.ok && cold.ok) {
    assert.equal(qualify(hot.lead).tier, "priority");
    assert.equal(qualify(cold.lead).tier, "nurture");
  }
});
