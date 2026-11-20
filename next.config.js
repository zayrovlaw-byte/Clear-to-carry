/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/bruen", destination: "/your-rights", permanent: true },
      { source: "/reviews", destination: "/", permanent: false },
      { source: "/:lang(es|ru)/reviews", destination: "/:lang", permanent: false },
      // Spanish and Russian are switched off for now (see ACTIVE_LOCALES in lib/i18n.js).
      { source: "/:lang(es|ru)", destination: "/", permanent: false },
      { source: "/:lang(es|ru)/:path*", destination: "/:path*", permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      // The attorney dashboard is never indexed or framed.
      { source: "/admin", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }, { key: "Cache-Control", value: "no-store" }] },
      { source: "/api/admin/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }, { key: "Cache-Control", value: "no-store" }] },
      // Client portal links carry the client's key in the URL; never leak it via Referer.
      { source: "/apply", headers: [{ key: "Referrer-Policy", value: "no-referrer" }] },
      { source: "/:lang(es|ru)/apply", headers: [{ key: "Referrer-Policy", value: "no-referrer" }] },
    ];
  },
};
module.exports = nextConfig;
