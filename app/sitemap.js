const BASE = "https://cleartocarrynyc.com";

export default function sitemap() {
  return ["", "/apply", "/faq", "/bruen", "/privacy"].map((p) => ({
    url: BASE + p,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.7,
  }));
}
