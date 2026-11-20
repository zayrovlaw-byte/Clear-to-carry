export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/admin"] }],
    sitemap: "https://cleartocarrynyc.com/sitemap.xml",
  };
}
