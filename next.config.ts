import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

export default function nextConfig(phase: string): NextConfig {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  return {
    output: "standalone",
    distDir: isDev ? ".next_dev" : ".next",
    reactStrictMode: true,
    devIndicators: false,
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: false,
    },
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "picsum.photos",
          port: "",
          pathname: "/**",
        },
      ],
    },
    transpilePackages: ["motion"],
    webpack: (config, { dev }) => {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      if (dev && process.env.DISABLE_HMR === "true") {
        config.watchOptions = {
          ignored: /.*/,
        };
      }
      return config;
    },
  };
}

