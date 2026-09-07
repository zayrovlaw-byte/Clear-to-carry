const BASE = "https://cleartocarry.nyc";

export default function sitemap() {
  return ["", "/apply", "/your-rights", "/reviews", "/attorney", "/faq", "/privacy"].map((p) => ({
    url: BASE + p,
    lastModified: new Date(),
    changeFrequency: p === "" ? "weekly" : "monthly",
    priority: p === "" ? 1 : p === "/apply" ? 0.9 : 0.6,
  }));
}
