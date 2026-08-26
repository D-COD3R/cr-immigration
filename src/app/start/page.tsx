import type { Metadata } from "next";
import { Suspense } from "react";
import { getLang } from "@/lib/lang";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { IntakeFlow } from "@/components/intake/IntakeFlow";
import { intakeCopy } from "@/content/intake-copy";

export const metadata: Metadata = {
  title: "Start your assessment",
  description:
    "Take the free Costa Rica residency assessment. A few minutes, no documents required — find out which residency path likely fits your situation.",
  alternates: { canonical: "/start" },
};

export default async function StartPage() {
  const lang = await getLang();

  return (
    <div className="flex min-h-screen flex-col">
      <Header lang={lang} />

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-5 pb-24 pt-10 lg:px-8 lg:pt-14">
          <div className="mx-auto mb-10 max-w-xl text-center">
            <h1 className="font-serif text-3xl font-medium tracking-heading text-ink sm:text-4xl">
              {intakeCopy.meta.title[lang]}
            </h1>
            <p className="mt-3 leading-relaxed text-ink-soft">{intakeCopy.meta.intro[lang]}</p>
          </div>

          <Suspense
            fallback={
              <div className="mx-auto h-[300px] max-w-xl animate-pulse rounded-2xl bg-parchment/70" />
            }
          >
            <IntakeFlow lang={lang} />
          </Suspense>
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
