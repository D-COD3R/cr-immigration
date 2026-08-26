import type { Metadata } from "next";
import { getLang } from "@/lib/lang";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms & Disclosures",
  description:
    "Terms of use, service disclaimers and legal disclosures for this independent Costa Rica immigration service.",
  alternates: { canonical: "/terms" },
};

function L(lang: string, en: string, es: string) {
  return lang === "es" ? es : en;
}

export default async function TermsPage() {
  const lang = await getLang();
  const t = (en: string, es: string) => L(lang, en, es);

  const sections = [
    {
      title: t("Informational nature of this website", "Naturaleza informativa de este sitio"),
      body: [
        t(
          "Content on this website is general information about Costa Rica immigration processes. It is not legal advice for your specific situation, and requirements, fees and processing times change. Always confirm current requirements with a qualified professional or official sources.",
          "El contenido de este sitio es información general sobre procesos migratorios de Costa Rica. No es asesoría legal para su situación específica, y los requisitos, tasas y tiempos cambian. Confirme siempre los requisitos vigentes con un profesional calificado o fuentes oficiales."
        ),
      ],
    },
    {
      title: t("No government affiliation", "Sin afiliación gubernamental"),
      body: [
        t(site.affiliationDisclosure.en, site.affiliationDisclosure.es),
        t(
          "This is an independent private service. Final decisions on immigration matters belong exclusively to the Dirección General de Migración y Extranjería and other competent Costa Rican authorities.",
          "Este es un servicio privado independiente. Las decisiones finales en asuntos migratorios corresponden exclusivamente a la Dirección General de Migración y Extranjería y demás autoridades costarricenses competentes."
        ),
      ],
    },
    {
      title: t("No guaranteed outcome", "Sin resultados garantizados"),
      body: [
        t(
          "We do not guarantee approval of any application, timeline, or outcome. Anyone promising guaranteed residency approvals should be treated with caution.",
          "No garantizamos la aprobación de ninguna solicitud, plazo ni resultado. Desconfíe de quien prometa aprobaciones de residencia garantizadas."
        ),
      ],
    },
    {
      title: t("Preliminary assessment limitations", "Limitaciones de la evaluación preliminar"),
      body: [
        t(
          "The online assessment is preliminary and based only on the answers you provide. It does not constitute legal advice, does not evaluate your complete circumstances, and does not create an attorney-client relationship.",
          "La evaluación en línea es preliminar y se basa únicamente en las respuestas que usted proporciona. No constituye asesoría legal, no evalúa sus circunstancias completas ni crea una relación abogado-cliente."
        ),
        t(
          "A professional relationship begins only through the applicable formal engagement process, including its corresponding agreement.",
          "La relación profesional comienza únicamente mediante el proceso formal de contratación aplicable, con su acuerdo correspondiente."
        ),
      ],
    },
    {
      title: t("Acceptable use", "Uso aceptable"),
      body: [
        t(
          "You agree to use this site lawfully and to provide accurate information. Submitting false information, attempting to disrupt the service, or using it to send unlawful content is prohibited.",
          "Usted acepta usar este sitio de forma lícita y proporcionar información veraz. Está prohibido enviar información falsa, intentar interrumpir el servicio o usarlo para enviar contenido ilícito."
        ),
      ],
    },
    {
      title: t("Intellectual property", "Propiedad intelectual"),
      body: [
        t(
          "The design, text and materials of this website are the property of their owner and may not be reproduced without permission.",
          "El diseño, texto y materiales de este sitio son propiedad de su titular y no pueden reproducirse sin autorización."
        ),
      ],
    },
    {
      title: t("Limitation of liability", "Limitación de responsabilidad"),
      body: [
        t(
          "To the maximum extent permitted by law, use of this website and reliance on its general information is at your own risk; the service is not liable for decisions taken based on general website content before a formal engagement.",
          "En la máxima medida permitida por la ley, el uso de este sitio y la confianza en su información general corren por su cuenta; el servicio no responde por decisiones tomadas basándose en el contenido general del sitio antes de una contratación formal."
        ),
      ],
    },
    {
      title: t("Governing law", "Ley aplicable"),
      body: [
        `[${t(
          "Governing law and jurisdiction pending — will reflect the final legal entity's jurisdiction.",
          "Ley y jurisdicción aplicables pendientes: reflejarán la jurisdicción de la entidad legal final."
        )}]`,
      ],
    },
    {
      title: t("Contact", "Contacto"),
      body: [
        site.contact.email
          ? t(`Questions about these terms: ${site.contact.email}`, `Consultas sobre estos términos: ${site.contact.email}`)
          : t("[Contact method pending.]", "[Método de contacto pendiente.]"),
      ],
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header lang={lang} />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-5 pb-24 pt-14 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-forest">Legal</p>
          <h1 className="mt-2 font-serif text-4xl font-medium tracking-heading text-ink">
            {t("Terms & Disclosures", "Términos y Avisos")}
          </h1>
          <p className="mt-3 text-sm text-ink-faint">
            {t("Last updated: August 2026", "Última actualización: agosto de 2026")} ·{" "}
            {t(
              "These terms require formal legal review before production use.",
              "Estos términos requieren revisión legal formal antes de su uso en producción."
            )}
          </p>

          <div className="mt-10 space-y-9">
            {sections.map((s) => (
              <section key={s.title}>
                <h2 className="text-lg font-semibold tracking-tight text-ink">{s.title}</h2>
                {s.body.map((p, i) => (
                  <p key={i} className="mt-2.5 leading-relaxed text-ink-soft">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <p className="mt-12 border-t border-line-soft pt-6 text-sm leading-relaxed text-ink-faint">
            {t(
              "Entity details pending:",
              "Detalles de entidad pendientes:"
            )}{" "}
            {site.legalEntity.name} · {site.legalEntity.registration} · {site.legalEntity.address}
          </p>
        </div>
      </main>
      <Footer lang={lang} />
    </div>
  );
}
