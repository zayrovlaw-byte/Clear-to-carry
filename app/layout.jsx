import "./globals.css";
import Reveal from "./reveal";

/* metadataBase presumes the production domain. If launch lands on a different
   domain, change it here and in app/sitemap.js + app/robots.js. */
export const metadata = {
  metadataBase: new URL("https://cleartocarry.nyc"),
  title: "Clear to Carry | NYC Pistol Licensing Service | Zayrov Law, P.C.",
  description:
    "New York City pistol licensing, handled entirely by counsel. Carry, premise, business, special carry, long gun, and security guard licenses. Flat fee, attorney-handled, start to license. Free eligibility screening in 60 seconds.",
  keywords:
    "NYC concealed carry lawyer, NYC gun license attorney, NYPD License Division, carry permit attorney New York, non-resident carry NYC, premise license lawyer",
  openGraph: {
    title: "Clear to Carry | Protect your home. Protect your business.",
    description:
      "NYC pistol licensing, handled entirely by counsel. Filed complete the first time, 180-day clock enforced. See if you qualify in 60 seconds.",
    type: "website",
    siteName: "Clear to Carry",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Clear to Carry · Pistol Licensing Service" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clear to Carry | NYC Pistol Licensing Service",
    description: "Handled entirely by counsel. Filed complete the first time. See if you qualify in 60 seconds.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,500&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        {/* Local-business structured data: how Google connects this site to
            "pistol license attorney NYC" queries and shows address and phone. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LegalService",
              name: "Clear to Carry",
              alternateName: "Zayrov Law, P.C.",
              description:
                "New York City pistol licensing service. Carry, premise, business, special carry, long gun, and security guard licences, handled entirely by an attorney.",
              url: "https://cleartocarry.nyc",
              telephone: "+1-347-335-5723",
              priceRange: "$$$",
              address: {
                "@type": "PostalAddress",
                streetAddress: "3400 Lawson Blvd.",
                addressLocality: "Oceanside",
                addressRegion: "NY",
                postalCode: "11572",
                addressCountry: "US",
              },
              areaServed: { "@type": "City", name: "New York" },
              knowsLanguage: ["en", "ru", "he"],
            }),
          }}
        />
        <link rel="preload" as="image" href="/hero-nyc.webp" type="image/webp" />
      </head>
      <body>
        {children}
        <Reveal />
      </body>
    </html>
  );
}
