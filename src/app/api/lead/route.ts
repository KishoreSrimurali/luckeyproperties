import crypto from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { parseLead } from "@/lib/leads/schema";
import { qualify } from "@/lib/leads/qualify";
import { configuredChannels, deliverLead, type LeadRecord } from "@/lib/leads/deliver";
import { looksLikeSpam, rateLimited, verifyTurnstile } from "@/lib/leads/guard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const json = (status: number, body: Record<string, unknown>) =>
  NextResponse.json(body, { status, headers: { "cache-control": "no-store" } });

export async function POST(req: NextRequest) {
  // Same-origin only.
  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return json(403, { ok: false, error: "This form can only be submitted from the LUCKEY Properties website." });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? req.headers.get("x-real-ip") ?? "unknown";
  if (rateLimited(ip)) {
    return json(429, { ok: false, error: "You've sent several enquiries in a short time. Please wait a few minutes, or message us on WhatsApp." });
  }

  let raw: Record<string, unknown>;
  try {
    raw = await req.json();
    if (!raw || typeof raw !== "object") throw new Error();
  } catch {
    return json(400, { ok: false, error: "We couldn't read that submission. Please try again." });
  }

  // Bots get a normal-looking response so they don't adapt; nothing is delivered.
  if (looksLikeSpam({ honeypot: raw.website, startedAt: raw.startedAt, message: typeof raw.message === "string" ? raw.message : undefined })) {
    return json(200, { ok: true, id: "received" });
  }
  if (!(await verifyTurnstile(typeof raw.turnstileToken === "string" ? raw.turnstileToken : undefined, ip))) {
    return json(400, { ok: false, error: "Please complete the security check and try again." });
  }

  const parsed = parseLead(raw);
  if (!parsed.ok) return json(422, { ok: false, error: "Please check the highlighted fields.", fields: parsed.errors });

  const ch = configuredChannels();
  if (!ch.webhook && !ch.email && !ch.file) {
    console.error("[lead] no delivery channel configured — set LEAD_WEBHOOK_URL and/or RESEND_API_KEY + LEAD_FROM_EMAIL");
    return json(503, { ok: false, error: "Our enquiry form is temporarily unavailable. Please contact us on WhatsApp or by email." });
  }

  const record: LeadRecord = {
    ...parsed.lead,
    id: crypto.randomUUID(),
    receivedAt: new Date().toISOString(),
    qualification: qualify(parsed.lead),
    ipCountry: req.headers.get("x-vercel-ip-country") ?? req.headers.get("cf-ipcountry") ?? undefined,
    userAgent: req.headers.get("user-agent")?.slice(0, 200) ?? undefined,
  };

  const result = await deliverLead(record);
  for (const c of result.channels) if (!c.ok) console.error(`[lead ${record.id}] ${c.channel} failed: ${c.error}`);

  if (!result.delivered) {
    return json(502, { ok: false, error: "Your enquiry didn't reach us because of a technical problem. Please try again, or contact us on WhatsApp or by email." });
  }
  return json(200, { ok: true, id: record.id, tier: record.qualification.tier });
}
