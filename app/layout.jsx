import "./globals.css";
import Reveal from "./reveal";

export const metadata = {
  title: "Clear to Carry | NYC Pistol Licensing Service | Zayrov Law, P.C.",
  description:
    "New York City pistol licensing, handled entirely by counsel. Carry, premise, business, special carry, long gun, and security guard licenses. Flat fee, attorney-handled, start to license. Free eligibility screening in 60 seconds.",
  keywords:
    "NYC concealed carry lawyer, NYC gun license attorney, NYPD License Division, carry permit attorney New York, non-resident carry NYC, premise license lawyer",
  openGraph: {
    title: "Clear to Carry | Your home. Your business. Lawfully defended.",
    description:
      "NYC firearm license applications, handled entirely by counsel. See if you qualify in 60 seconds.",
    type: "website",
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
      </head>
      <body>
        {children}
        <Reveal />
      </body>
    </html>
  );
}
