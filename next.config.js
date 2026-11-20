/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/bruen", destination: "/your-rights", permanent: true },
      { source: "/reviews", destination: "/", permanent: false },
      { source: "/:lang(es|ru)/reviews", destination: "/:lang", permanent: false },
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
      // Client portal links carry the client's key in the URL; never leak it via Referer.
      { source: "/apply", headers: [{ key: "Referrer-Policy", value: "no-referrer" }] },
      { source: "/:lang(es|ru)/apply", headers: [{ key: "Referrer-Policy", value: "no-referrer" }] },
    ];
  },
};
module.exports = nextConfig;
