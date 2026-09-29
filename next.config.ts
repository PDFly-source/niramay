import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

// Base path is empty for local development and "/niramay" when the site is
// deployed to GitHub Pages (project site). The CI workflow injects the env var.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function nextConfig(phase: string): NextConfig {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  return {
    // Static export: the site is served from GitHub Pages (no Node.js server).
    output: "export",
    basePath,
    // GitHub Pages serves static files; trailing slashes keep directory-style
    // routing consistent and avoid 404s on direct navigation.
    trailingSlash: true,
    distDir: isDev ? ".next_dev" : ".next",
    reactStrictMode: true,
    devIndicators: false,
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: false,
    },
    // GitHub Pages cannot run the Next.js image optimization server.
    images: {
      unoptimized: true,
    },
    transpilePackages: ["motion"],
    webpack: (config, { dev }) => {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      if (dev && process.env.DISABLE_HMR === "true") {
        config.watchOptions = {
          ignored: /.*/,
        };
      }
      return config;
    },
  };
}
