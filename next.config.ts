import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
];

const nextConfig: NextConfig = {
  experimental: {
    agentUpgrade: "security",
  },
  async redirects() {
    return [
      { source: "/projects", destination: "https://ifitstrue.dev", permanent: true },
      {
        source: "/candles",
        destination: "https://www.sleepingstonecandles.com/",
        permanent: true,
      },
      { source: "/recipes", destination: "https://edgecase.recipes", permanent: true },
      { source: "/recipes/:path*", destination: "https://edgecase.recipes", permanent: true },
      { source: "/tools", destination: "https://ifitstrue.dev", permanent: true },
      { source: "/tools/:path*", destination: "https://ifitstrue.dev", permanent: true },
    ];
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
