import "server-only";

/** Fixed-window, per-IP rate limit. Per instance; use a shared store (e.g. Upstash) if you scale out. */
const hits = new Map<string, { count: number; reset: number }>();
export function rateLimited(key: string, limit = 6, windowMs = 10 * 60_000): boolean {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || entry.reset < now) {
    hits.set(key, { count: 1, reset: now + windowMs });
    if (hits.size > 5000) for (const [k, v] of hits) if (v.reset < now) hits.delete(k);
    return false;
  }
  entry.count++;
  return entry.count > limit;
}

/** Cloudflare Turnstile verification, active when TURNSTILE_SECRET_KEY is set. */
export async function verifyTurnstile(token: string | undefined, ip: string | undefined): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body, signal: AbortSignal.timeout(6000) });
    const data = (await res.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch {
    return false;
  }
}

/** Heuristics for obvious automated submissions. */
export function looksLikeSpam(input: { honeypot?: unknown; startedAt?: unknown; message?: string }): boolean {
  if (typeof input.honeypot === "string" && input.honeypot.trim() !== "") return true;
  const started = Number(input.startedAt);
  if (!Number.isFinite(started) || Date.now() - started < 2500) return true;
  const links = (input.message?.match(/https?:\/\//g) ?? []).length;
  return links > 2;
}
