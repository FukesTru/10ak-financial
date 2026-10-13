import type { NextConfig } from "next";

/**
 * Default build: every page is statically prerendered; /api/lead runs as a serverless function.
 * STATIC_EXPORT=true (npm run build:static): pure static files in /out for any static host.
 * In that mode the lead form posts to NEXT_PUBLIC_LEAD_ENDPOINT instead of /api/lead.
 */
const isStaticExport = process.env.STATIC_EXPORT === "true";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  images: { unoptimized: true },
  ...(isStaticExport
    ? { output: "export" as const }
    : {
        async redirects() {
          return [
            {
              // Canonical host is www. (Also configure this at the DNS/host level.)
              source: "/:path*",
              has: [{ type: "host" as const, value: "1oak-financial.com" }],
              destination: "https://www.1oak-financial.com/:path*",
              permanent: true,
            },
          ];
        },
        async headers() {
          return [
            { source: "/:path*", headers: securityHeaders },
            {
              source: "/images/:path*",
              headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
            },
          ];
        },
      }),
};

export default nextConfig;
