import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Fraunces } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import CustomCursor from "./components/CustomCursor";
import ScrollAnimations from "./components/ScrollAnimations";
import { PERSON, SEO_KEYWORDS, SITE_URL } from "./lib/profile-data";
import { buildSiteGraphJsonLd } from "./lib/structured-data";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${PERSON.name} - AI Engineer | Public Transport & Smart Mobility AI`,
    template: `%s | ${PERSON.name}`,
  },
  description: PERSON.headline,
  keywords: [...SEO_KEYWORDS],
  authors: [{ name: PERSON.name, url: SITE_URL }],
  creator: PERSON.name,
  publisher: PERSON.name,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
    types: {
      "text/plain": `${SITE_URL}/llms.txt`,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: `${PERSON.name} - AI Engineer | AI in Public Transport`,
    description: PERSON.headline,
    siteName: PERSON.name,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${PERSON.name} - AI Engineer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PERSON.name} - AI Engineer | AI in Public Transport`,
    description: PERSON.headline,
    creator: "@arsyadam",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "0Dg8XiyKMMn98jhOkpscE-uaxM8M4bxaa86uy4k-1dA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = buildSiteGraphJsonLd();

  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${fraunces.variable}`}>
      <head>
        <link rel="author" type="text/plain" href={`${SITE_URL}/llms.txt`} title="LLM-readable site summary" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${GeistSans.className} ${GeistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <CustomCursor />
        <ScrollAnimations />
        <Navbar />
        <div className="page-transition">{children}</div>
        <Analytics />
        <SpeedInsights />
        <Footer />
      </body>
    </html>
  );
}
