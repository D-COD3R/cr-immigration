import type { Metadata } from "next";
import { getLang } from "@/lib/lang";
import { Header, MobileCtaBar } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { PathSelector } from "@/components/landing/PathSelector";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Services } from "@/components/landing/Services";
import { JourneyPreview } from "@/components/landing/JourneyPreview";
import { FaqSection } from "@/components/landing/FaqSection";
import { FinalCta } from "@/components/landing/FinalCta";
import { t } from "@/content/translations";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const lang = await getLang();

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-forest focus:px-4 focus:py-2 focus:text-sm focus:text-ivory"
      >
        {lang === "en" ? "Skip to content" : "Saltar al contenido"}
      </a>

      <Header lang={lang} />

      <main id="main" className="flex-1 pb-20 md:pb-0">
        <Hero lang={lang} />
        <PathSelector lang={lang} />
        <HowItWorks lang={lang} />
        <JourneyPreview lang={lang} />
        <Services lang={lang} />
        <FaqSection lang={lang} />
        <FinalCta lang={lang} />
      </main>

      <Footer lang={lang} />
      <MobileCtaBar label={t.nav.cta[lang]} />
    </div>
  );
}
