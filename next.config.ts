import type { NextConfig } from "next";

/**
 * Security headers applied to every response. The CSP allows Google Tag Manager /
 * GA4 (loaded only after analytics consent), Cloudflare Turnstile (spam protection)
 * and an optional booking provider embed (Calendly / Cal.com).
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
  "frame-src https://challenges.cloudflare.com https://calendly.com https://cal.com https://www.google.com https://maps.google.com",
  "media-src 'self' https:",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75, 85],
    // Add the CDN / CMS host that serves official listing photography here.
    remotePatterns: [],
  },
  /** Legacy WordPress URLs → new routes (permanent). Extend with any other indexed URLs from Search Console. */
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/privacy-policy-2", destination: "/privacy-policy", permanent: true },
      { source: "/privacy-policy-2/index.html", destination: "/privacy-policy", permanent: true },
      { source: "/accessibility-statement/index.html", destination: "/accessibility-statement", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/our-services", destination: "/services", permanent: true },
      { source: "/property", destination: "/properties", permanent: true },
      { source: "/property/:slug", destination: "/properties/:slug", permanent: true },
      { source: "/feed", destination: "/", permanent: true },
      { source: "/wp-admin/:path*", destination: "/", permanent: false },
      { source: "/:path*/index.html", destination: "/:path*", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ];
  },
};

export default nextConfig;
