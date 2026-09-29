import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Niramay — Traditional Kitchen Remedies",
    short_name: "Niramay",
    description: "Traditional Assamese & Desi kitchen-remedy assistant with age dosage and safety warnings.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#FFF8F0",
    theme_color: "#D97706",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
