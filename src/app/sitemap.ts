import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { developments } from "@/data/developments";
import { locations } from "@/data/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly") => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });
  return [
    page("", 1, "weekly"),
    page("/properties", 0.9, "weekly"),
    ...developments.map((d) => page(`/properties/${d.slug}`, 0.8, "weekly")),
    page("/services", 0.7),
    page("/locations", 0.7),
    ...locations.map((l) => page(`/locations/${l.slug}`, 0.6)),
    page("/why-dubai", 0.7),
    page("/about", 0.6),
    page("/contact", 0.7),
    page("/privacy-policy", 0.2, "yearly"),
    page("/accessibility-statement", 0.2, "yearly"),
    page("/terms", 0.2, "yearly"),
    page("/cookie-preferences", 0.2, "yearly"),
  ];
}
