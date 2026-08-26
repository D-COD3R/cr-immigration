import type { Metadata } from "next";
import { Instrument_Sans, Newsreader } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Costa Rica Residency & Immigration Services | Costa Rica Immigration",
    template: "%s | Costa Rica Immigration",
  },
  description:
    "Clear guidance for Costa Rica residency — pensionado, rentista, investor, family and digital nomad paths. Take the free assessment and get your case reviewed by immigration professionals.",
  keywords: [
    "Costa Rica immigration",
    "Costa Rica residency",
    "residency lawyer Costa Rica",
    "move to Costa Rica",
    "Costa Rica pensionado",
    "Costa Rica rentista",
    "Costa Rica investor residency",
    "digital nomad Costa Rica",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Your path to Costa Rica residency, made clear.",
    description:
      "Tell us about your situation. We identify the likely residency path, organize what you need, and connect your case with professional legal guidance.",
    url: site.url,
    locale: "en_US",
    alternateLocale: "es_CR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your path to Costa Rica residency, made clear.",
    description:
      "Take the free assessment to find the likely Costa Rica residency path for your situation.",
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#faf8f2",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${instrumentSans.variable} ${newsreader.variable}`}>
      <body>{children}</body>
    </html>
  );
}
