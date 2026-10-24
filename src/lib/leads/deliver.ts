import "server-only";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { site } from "@/config/site";
import { getDevelopment } from "@/data/developments";
import { budgets, contactMethods, interests, labelFor, timelines, type LeadInput } from "./schema";
import type { Tier } from "./qualify";

export interface LeadRecord extends LeadInput {
  id: string;
  receivedAt: string;
  qualification: { score: number; tier: Tier; reasons: string[] };
  ipCountry?: string;
  userAgent?: string;
}

export interface DeliveryResult {
  delivered: boolean;
  channels: { channel: string; ok: boolean; error?: string }[];
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function configuredChannels() {
  return {
    webhook: Boolean(process.env.LEAD_WEBHOOK_URL),
    email: Boolean(process.env.RESEND_API_KEY && process.env.LEAD_FROM_EMAIL),
    file: process.env.LEAD_FILE_SINK === "true" || process.env.NODE_ENV !== "production",
  };
}

/** CRM / automation webhook (HubSpot workflow, Zoho, Salesforce, Make, Zapier…), HMAC-signed. */
async function sendWebhook(record: LeadRecord) {
  const body = JSON.stringify(record);
  const headers: Record<string, string> = { "content-type": "application/json" };
  if (process.env.LEAD_WEBHOOK_SECRET) {
    headers["x-luckey-signature"] = crypto.createHmac("sha256", process.env.LEAD_WEBHOOK_SECRET).update(body).digest("hex");
  }
  const res = await fetch(process.env.LEAD_WEBHOOK_URL!, { method: "POST", headers, body, signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`webhook ${res.status}`);
}

async function sendEmail(payload: { to: string[]; subject: string; html: string; text: string; replyTo?: string }) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${process.env.RESEND_API_KEY}`, "content-type": "application/json" },
    body: JSON.stringify({
      from: process.env.LEAD_FROM_EMAIL,
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
      reply_to: payload.replyTo,
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`email ${res.status}`);
}

function rows(r: LeadRecord): [string, string][] {
  const dev = r.property ? getDevelopment(r.property) : undefined;
  return [
    ["Enquiry type", r.type],
    ["Qualification", `${r.qualification.tier} (${r.qualification.score})`],
    ["Name", r.name],
    ["Email", r.email],
    ["Phone", r.phone],
    ["Preferred contact", labelFor(contactMethods, r.contactMethod)],
    ["Country of residence", r.country ?? "—"],
    ["Property", dev ? `${dev.name} — ${dev.location}` : r.property ?? "—"],
    ["Interested in", labelFor(interests, r.interest)],
    ["Budget", labelFor(budgets, r.budget)],
    ["Timeline", labelFor(timelines, r.timeline)],
    ["Preferred time", r.preferredTime ?? "—"],
    ["Message", r.message ?? "—"],
    ["Marketing consent", r.marketingConsent ? "Yes" : "No"],
    ["Page", r.page ?? "—"],
    ["Source", [r.attribution?.utm_source, r.attribution?.utm_medium, r.attribution?.utm_campaign].filter(Boolean).join(" / ") || r.attribution?.referrer || "direct"],
    ["Landing page", r.attribution?.landing_page ?? "—"],
    ["Lead ID", r.id],
  ];
}

function notificationEmail(r: LeadRecord) {
  const data = rows(r);
  const html = `<div style="font-family:Arial,sans-serif;font-size:14px;color:#1b1a17"><h2 style="font-weight:normal">New ${esc(r.type)} enquiry — ${esc(r.name)}</h2><table cellpadding="6" style="border-collapse:collapse">${data
    .map(([k, v]) => `<tr><td style="color:#6f6a60;vertical-align:top">${esc(k)}</td><td style="white-space:pre-wrap">${esc(v)}</td></tr>`)
    .join("")}</table></div>`;
  const text = data.map(([k, v]) => `${k}: ${v}`).join("\n");
  return { subject: `[${r.qualification.tier.toUpperCase()}] ${r.type} enquiry — ${r.name}`, html, text };
}

function acknowledgementEmail(r: LeadRecord) {
  const dev = r.property ? getDevelopment(r.property) : undefined;
  const about = dev ? ` about ${dev.name}` : "";
  const first = r.name.split(/\s+/)[0];
  const text = `Dear ${first},

Thank you for contacting LUCKEY Properties${about}. We have received your enquiry and a member of our team will be in touch${
    r.contactMethod === "whatsapp" ? " on WhatsApp" : r.contactMethod === "phone" ? " by phone" : " by email"
  }, usually within one working day.

If your question is urgent, you can reach us on WhatsApp or by phone at ${site.contact.phoneDisplay}.

LUCKEY Properties
${site.contact.address.line1}, ${site.contact.address.line2}, ${site.contact.address.country}
${site.contact.email} · ${site.url}

You are receiving this email because you submitted an enquiry on our website. Our privacy policy: ${site.url}/privacy-policy`;
  const html = `<div style="font-family:Georgia,serif;font-size:15px;line-height:1.6;color:#1b1a17;max-width:560px">${text
    .split("\n\n")
    .map((p) => `<p>${esc(p).replace(/\n/g, "<br>")}</p>`)
    .join("")}</div>`;
  return { subject: `We've received your enquiry${about}`, html, text };
}

/**
 * Delivers a lead to every configured channel. A lead is only reported as
 * delivered when at least one channel the team actually reads (CRM webhook,
 * notification email, or the local file log in development) succeeded.
 */
export async function deliverLead(record: LeadRecord): Promise<DeliveryResult> {
  const ch = configuredChannels();
  const channels: DeliveryResult["channels"] = [];
  const attempt = async (channel: string, fn: () => Promise<void>) => {
    try {
      await fn();
      channels.push({ channel, ok: true });
    } catch (e) {
      channels.push({ channel, ok: false, error: e instanceof Error ? e.message : String(e) });
    }
  };

  if (ch.webhook) await attempt("crm-webhook", () => sendWebhook(record));
  if (ch.email) {
    const n = notificationEmail(record);
    const to = (process.env.LEAD_NOTIFY_TO ?? site.contact.email).split(",").map((s) => s.trim());
    await attempt("notification-email", () => sendEmail({ to, ...n, replyTo: record.email }));
  }
  if (ch.file) {
    await attempt("file-log", async () => {
      const dir = path.join(process.cwd(), ".data");
      await fs.mkdir(dir, { recursive: true });
      await fs.appendFile(path.join(dir, "leads.ndjson"), JSON.stringify(record) + "\n", { mode: 0o600 });
    });
  }

  const delivered = channels.some((c) => c.ok);
  // Acknowledge the visitor only once the team has the lead.
  if (delivered && ch.email) {
    const a = acknowledgementEmail(record);
    await attempt("acknowledgement-email", () => sendEmail({ to: [record.email], ...a, replyTo: site.contact.email }));
  }
  return { delivered, channels };
}
