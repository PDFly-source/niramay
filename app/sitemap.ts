import type { MetadataRoute } from "next";
import { REMEDIES } from "@/lib/data/remedies";
import { SYMPTOM_CATEGORIES } from "@/lib/data/symptoms";

export const dynamic = "force-static";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pdfly-source.github.io";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/symptoms",
    "/categories",
    "/explore",
    "/library",
    "/menu",
    "/knowledge-bank",
    "/kitchen-garden",
    "/daily-habits",
    "/ritucharya",
    "/dosha-assessment",
    "/spice-scanner",
    "/plant-scanner",
    "/saved",
    "/aitas-diha",
    "/fridge-card",
  ];

  const urls: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${BASE_PATH}${route}/`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));

  for (const symptom of SYMPTOM_CATEGORIES) {
    urls.push({
      url: `${SITE_URL}${BASE_PATH}/symptoms/${symptom.slug}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  for (const remedy of REMEDIES) {
    urls.push({
      url: `${SITE_URL}${BASE_PATH}/remedy/${remedy.id}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  return urls;
}
