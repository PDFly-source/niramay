import type { MetadataRoute } from "next";

export const dynamic = "force-static";

// Base path injected by CI when deploying to GitHub Pages.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: `${BASE_PATH}/`,
    name: "Niramay — Traditional Kitchen Remedies",
    short_name: "Niramay",
    description:
      "Traditional Assamese & Desi kitchen-remedy companion with age-group dosage guidance, ingredient checker, and safety warnings.",
    start_url: `${BASE_PATH}/`,
    scope: `${BASE_PATH}/`,
    display: "standalone",
    background_color: "#F6F1E4",
    theme_color: "#1B4332",
    icons: [
      {
        src: `${BASE_PATH}/icon-192.png`,
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: `${BASE_PATH}/icon-512.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        // Official emblem centered with safe-zone padding — survives Android
        // circle / squircle / rounded-square launcher masks (max painted
        // radius 187.6px < 204.8px safe radius)
        src: `${BASE_PATH}/icon-512-maskable.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
