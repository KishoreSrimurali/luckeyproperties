"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { site } from "@/config/site";
import { getAttribution } from "@/lib/attribution";
import { track } from "@/lib/analytics";
import { whatsappHref } from "@/lib/contact";
import { budgets, contactMethods, interests, parseLead, timelines, type FieldErrors, type LeadType } from "@/lib/leads/schema";
import { Arrow } from "./Icons";

const TURNSTILE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const intents: { value: LeadType; label: string }[] = [
  { value: "enquiry", label: "General enquiry" },
  { value: "consultation", label: "Consultation" },
  { value: "buy-sell", label: "Buying or selling" },
  { value: "investment", label: "Investment guidance" },
  { value: "management", label: "Property management" },
];

type Status = { state: "idle" } | { state: "sending" } | { state: "error"; message: string } | { state: "success"; name: string };

export interface LeadFormProps {
  type?: LeadType;
  /** Development slug when the enquiry is about a specific property. */
  property?: string;
  propertyName?: string;
  tone?: "light" | "dark";
  submitLabel?: string;
  /** Show the enquiry-type chooser (contact page). */
  chooseIntent?: boolean;
  /** Open the optional preference fields by default. */
  expanded?: boolean;
  messagePlaceholder?: string;
}

export function LeadForm({
  type = "enquiry",
  property,
  propertyName,
  tone = "light",
  submitLabel = "Send enquiry",
  chooseIntent = false,
  expanded = false,
  messagePlaceholder = "Anything you'd like us to know",
}: LeadFormProps) {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const startedAt = useRef(Date.now());
  const [intent, setIntent] = useState<LeadType>(type);
  const [more, setMore] = useState(expanded);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });

  // Deep links such as /contact?intent=consultation preselect the enquiry type.
  useEffect(() => {
    if (!chooseIntent) return;
    const q = new URLSearchParams(location.search).get("intent") as LeadType | null;
    if (q && intents.some((i) => i.value === q)) {
      setIntent(q);
      if (q === "consultation") setMore(true);
    }
  }, [chooseIntent]);

  const f = (name: string) => `${id}-${name}`;
  const err = (name: keyof FieldErrors) =>
    errors[name] ? (
      <span className="field__error" id={f(`${name}-err`)}>
        {errors[name]}
      </span>
    ) : null;
  const aria = (name: keyof FieldErrors) => ({
    "aria-invalid": errors[name] ? (true as const) : undefined,
    "aria-describedby": errors[name] ? f(`${name}-err`) : undefined,
  });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.state === "sending") return;
    const fd = new FormData(e.currentTarget);
    const raw: Record<string, unknown> = Object.fromEntries(fd.entries());
    raw.type = intent;
    raw.property = property;
    raw.page = location.pathname;
    raw.attribution = getAttribution();
    raw.startedAt = startedAt.current;
    raw.privacyAccepted = fd.get("privacyAccepted") === "on";
    raw.marketingConsent = fd.get("marketingConsent") === "on";
    raw.turnstileToken = fd.get("cf-turnstile-response") ?? undefined;

    const local = parseLead(raw);
    if (!local.ok) {
      setErrors(local.errors);
      if (local.errors.budget || local.errors.timeline || local.errors.interest) setMore(true);
      const first = Object.keys(local.errors)[0];
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus());
      track("form_error", { reason: "validation", lead_type: intent });
      return;
    }

    setErrors({});
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/lead", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(raw) });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: FieldErrors; tier?: string };
      if (!res.ok || !data.ok) {
        if (data.fields) setErrors(data.fields);
        setStatus({ state: "error", message: data.error ?? "Something went wrong. Please try again." });
        track("form_error", { reason: String(res.status), lead_type: intent });
        requestAnimationFrame(() => statusRef.current?.focus());
        return;
      }
      track("generate_lead", { lead_type: intent, property, tier: data.tier, budget: local.lead.budget, timeline: local.lead.timeline });
      if (property) track("property_enquiry", { property });
      if (intent === "consultation") track("consultation_request", { property });
      setStatus({ state: "success", name: local.lead.name.split(/\s+/)[0] });
      requestAnimationFrame(() => statusRef.current?.focus());
    } catch {
      setStatus({ state: "error", message: "We couldn't connect. Please check your connection and try again, or message us on WhatsApp." });
      track("form_error", { reason: "network", lead_type: intent });
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  }

  const waText = propertyName
    ? `Hello LUCKEY Properties, I've just sent an enquiry about ${propertyName}.`
    : "Hello LUCKEY Properties, I've just sent an enquiry through your website.";

  if (status.state === "success") {
    return (
      <div className={`form-success ${tone === "dark" ? "dark" : ""}`} ref={statusRef} tabIndex={-1} role="status" style={{ background: "transparent" }}>
        <p className="eyebrow">Enquiry received</p>
        <h3 className="h3">Thank you, {status.name}.</h3>
        <p className="muted" style={{ maxWidth: "44ch" }}>
          Your enquiry{propertyName ? ` about ${propertyName}` : ""} has reached our team in Dubai. We&rsquo;ll be in touch, usually within one working day
          {intent === "consultation" ? " to agree a time for your consultation" : ""}.
        </p>
        <div className="row">
          <a className="btn btn--ghost btn--sm" href={whatsappHref(waText)} target="_blank" rel="noopener">
            Continue on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  const sending = status.state === "sending";

  return (
    <form ref={formRef} className="form" onSubmit={onSubmit} noValidate aria-describedby={status.state === "error" ? f("status") : undefined}>
      {chooseIntent && (
        <fieldset className="chips">
          <legend className="field">
            <span style={{ fontSize: "0.75rem", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 500 }}>How can we help?</span>
          </legend>
          {intents.map((i) => (
            <label className="chip" key={i.value}>
              <input type="radio" name="intent" value={i.value} checked={intent === i.value} onChange={() => setIntent(i.value)} />
              <span>{i.label}</span>
            </label>
          ))}
        </fieldset>
      )}

      <div className="field">
        <label htmlFor={f("name")}>Full name</label>
        <input className="input" id={f("name")} name="name" autoComplete="name" required {...aria("name")} />
        {err("name")}
      </div>
      <div className="form__row form__row--2">
        <div className="field">
          <label htmlFor={f("email")}>Email</label>
          <input className="input" id={f("email")} name="email" type="email" autoComplete="email" inputMode="email" required {...aria("email")} />
          {err("email")}
        </div>
        <div className="field">
          <label htmlFor={f("phone")}>
            Phone / WhatsApp <span className="opt">with country code</span>
          </label>
          <input className="input" id={f("phone")} name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+91 or +971" required {...aria("phone")} />
          {err("phone")}
        </div>
      </div>

      <fieldset className="chips">
        <legend className="field">
          <span style={{ fontSize: "0.75rem", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 500 }}>Preferred contact</span>
        </legend>
        {contactMethods.map((m, i) => (
          <label className="chip" key={m.value}>
            <input type="radio" name="contactMethod" value={m.value} defaultChecked={i === 0} />
            <span>{m.label}</span>
          </label>
        ))}
      </fieldset>

      {!more && (
        <button type="button" className="toggle-more" onClick={() => setMore(true)} aria-expanded={false} aria-controls={f("more")}>
          + Add budget, timeline and preferences (optional)
        </button>
      )}
      <div id={f("more")} hidden={!more} className="form">
        <div className="form__row form__row--2">
          <div className="field">
            <label htmlFor={f("budget")}>
              Budget <span className="opt">optional</span>
            </label>
            <select className="input" id={f("budget")} name="budget" defaultValue="" {...aria("budget")}>
              <option value="">Select a range</option>
              {budgets.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>
            {err("budget")}
          </div>
          <div className="field">
            <label htmlFor={f("timeline")}>
              Purchase timeline <span className="opt">optional</span>
            </label>
            <select className="input" id={f("timeline")} name="timeline" defaultValue="" {...aria("timeline")}>
              <option value="">Select a timeline</option>
              {timelines.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
            {err("timeline")}
          </div>
        </div>
        <div className="form__row form__row--2">
          {!property && (
            <div className="field">
              <label htmlFor={f("interest")}>
                Looking for <span className="opt">optional</span>
              </label>
              <select className="input" id={f("interest")} name="interest" defaultValue="" {...aria("interest")}>
                <option value="">Select</option>
                {interests.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
              {err("interest")}
            </div>
          )}
          <div className="field">
            <label htmlFor={f("country")}>
              Country of residence <span className="opt">optional</span>
            </label>
            <input className="input" id={f("country")} name="country" autoComplete="country-name" />
          </div>
        </div>
        {intent === "consultation" && (
          <div className="field">
            <label htmlFor={f("preferredTime")}>
              Preferred day and time <span className="opt">we&rsquo;ll confirm by reply</span>
            </label>
            <input className="input" id={f("preferredTime")} name="preferredTime" placeholder="e.g. Weekday evenings, India time" />
          </div>
        )}
        <div className="field">
          <label htmlFor={f("message")}>
            Message <span className="opt">optional</span>
          </label>
          <textarea className="input" id={f("message")} name="message" rows={3} placeholder={messagePlaceholder} />
        </div>
      </div>

      {/* Spam trap: hidden from people and assistive tech. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor={f("website")}>Website</label>
        <input id={f("website")} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="field">
        <label className="check">
          <input type="checkbox" name="privacyAccepted" {...aria("privacyAccepted")} />
          <span>
            I agree that LUCKEY Properties may use these details to respond to my enquiry, as described in the{" "}
            <Link className="link" href="/privacy-policy" target="_blank">
              privacy policy
            </Link>
            .
          </span>
        </label>
        {err("privacyAccepted")}
        <label className="check">
          <input type="checkbox" name="marketingConsent" />
          <span>Send me occasional property updates. You can unsubscribe at any time. (Optional)</span>
        </label>
      </div>

      {TURNSTILE_KEY && (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
          <div className="cf-turnstile" data-sitekey={TURNSTILE_KEY} data-theme={tone === "dark" ? "dark" : "light"} />
        </>
      )}

      {status.state === "error" && (
        <div className="form-status form-status--error" role="alert" id={f("status")} ref={statusRef} tabIndex={-1}>
          <p style={{ margin: 0 }}>{status.message}</p>
          <p className="small" style={{ margin: "8px 0 0" }}>
            You can also reach us on{" "}
            <a className="link" href={whatsappHref(propertyName ? `Hello LUCKEY Properties, I'm interested in ${propertyName}.` : undefined)} target="_blank" rel="noopener">
              WhatsApp
            </a>{" "}
            or at{" "}
            <a className="link" href={`mailto:${site.contact.email}`}>
              {site.contact.email}
            </a>
            .
          </p>
        </div>
      )}

      <div>
        <button className={`btn ${tone === "dark" ? "btn--light" : ""}`} type="submit" disabled={sending} aria-busy={sending}>
          {sending ? (
            <>
              <span className="spinner" aria-hidden="true" /> Sending…
            </>
          ) : (
            <>
              {submitLabel} <Arrow />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
