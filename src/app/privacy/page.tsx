import type { Metadata } from "next";
import { getLang } from "@/lib/lang";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How this Costa Rica immigration service collects, uses and protects the information you provide through the assessment.",
  alternates: { canonical: "/privacy" },
};

function L(lang: string, en: string, es: string) {
  return lang === "es" ? es : en;
}

export default async function PrivacyPage() {
  const lang = await getLang();
  const t = (en: string, es: string) => L(lang, en, es);

  const sections = [
    {
      title: t("Information we collect", "Información que recopilamos"),
      body: [
        t(
          "When you complete the assessment, we collect what you choose to tell us: your immigration goal, general situation (such as country of residence and nationality), household composition, timing, contact details (name, email, optionally phone), your preferred contact method and language, and any additional context you provide.",
          "Al completar la evaluación, recopilamos lo que usted elige contarnos: su objetivo migratorio, situación general (como país de residencia y nacionalidad), composición del grupo familiar, plazos, datos de contacto (nombre, correo y opcionalmente teléfono), su método e idioma de contacto preferidos, y cualquier contexto adicional que proporcione."
        ),
        t(
          "We do not ask for and do not want sensitive documents or numbers through the public assessment: no passport numbers, no bank details, no scans of civil documents. Those are only ever requested later, through a secure authenticated channel.",
          "No solicitamos ni queremos documentos o números sensibles a través de la evaluación pública: sin números de pasaporte, sin datos bancarios, sin copias de documentos civiles. Estos solo se solicitan posteriormente, por un canal seguro autenticado."
        ),
      ],
    },
    {
      title: t("Why we collect it", "Por qué la recopilamos"),
      body: [
        t(
          "Solely to understand your likely residency path so a qualified professional can review your situation and follow up with you. We do not sell your information.",
          "Exclusivamente para entender su vía de residencia probable, de modo que un profesional calificado revise su situación y le dé seguimiento. No vendemos su información."
        ),
      ],
    },
    {
      title: t("Communications", "Comunicaciones"),
      body: [
        t(
          "We use the contact details you provide only to respond about your assessment and potential services. You can ask us to stop contacting you at any time.",
          "Usamos sus datos de contacto únicamente para responderle sobre su evaluación y los posibles servicios. Puede pedirnos dejar de contactarle en cualquier momento."
        ),
      ],
    },
    {
      title: t("Service providers", "Proveedores de servicios"),
      body: [
        t(
          "The site is hosted and operated with standard infrastructure providers (hosting, email, analytics). Any provider that processes your information does so on our instructions and under appropriate data protection commitments.",
          "El sitio opera con proveedores de infraestructura estándar (alojamiento, correo, analítica). Cualquier proveedor que procese su información lo hace bajo nuestras instrucciones y compromisos adecuados de protección de datos."
        ),
      ],
    },
    {
      title: t("Security", "Seguridad"),
      body: [
        t(
          "Submissions are transmitted over encrypted connections and validated server-side. Access to submitted assessments is restricted to the professionals who review cases. No system is perfectly secure, and we design accordingly — which is why we deliberately minimize what we collect.",
          "Las evaluaciones se transmiten por conexiones cifradas y se validan en el servidor. El acceso a las evaluaciones enviadas está restringido a los profesionales que revisan los casos. Ningún sistema es perfectamente seguro, y así lo diseñamos — por eso minimizamos deliberadamente lo que recopilamos."
        ),
      ],
    },
    {
      title: t("Retention", "Conservación"),
      body: [
        t(
          "We keep assessment submissions only as long as useful to respond to you and maintain records of the service relationship, after which they are deleted.",
          "Conservamos las evaluaciones solo durante el tiempo necesario para responderle y mantener registros de la relación de servicio; después se eliminan."
        ),
      ],
    },
    {
      title: t("Your requests", "Sus solicitudes"),
      body: [
        t(
          "You may request a copy of the information associated with your submission, its correction, or its deletion.",
          "Puede solicitar una copia de la información asociada a su evaluación, su corrección o su eliminación."
        ),
      ],
    },
    {
      title: t("Cookies & analytics", "Cookies y analítica"),
      body: [
        t(
          "We use a small number of cookies strictly necessary for the site to function, including remembering your language preference. Analytics are aggregate and event-based (for example “assessment started”) and never include your answers or identity.",
          "Usamos un número reducido de cookies estrictamente necesarias para el funcionamiento del sitio, incluido recordar su preferencia de idioma. La analítica es agregada y basada en eventos (por ejemplo, “evaluación iniciada”) y nunca incluye sus respuestas ni su identidad."
        ),
      ],
    },
    {
      title: t("International users", "Usuarios internacionales"),
      body: [
        t(
          "Most visitors use this site from outside Costa Rica. Your information may be processed in countries other than your own; where required, appropriate transfer safeguards apply.",
          "La mayoría de los visitantes usan este sitio desde fuera de Costa Rica. Su información puede procesarse en países distintos al suyo; donde corresponda, se aplican salvaguardas adecuadas de transferencia."
        ),
      ],
    },
    {
      title: t("Contact & updates", "Contacto y actualizaciones"),
      body: [
        site.contact.email
          ? t(`For privacy questions, contact ${site.contact.email}.`, `Para consultas de privacidad, escriba a ${site.contact.email}.`)
          : t(
              "[Contact method pending — final company contact details will be listed here.]",
              "[Método de contacto pendiente: los datos finales de la empresa se publicarán aquí.]"
            ),
        t(
          "This policy will be updated as the service evolves. Material changes will be highlighted on this page.",
          "Esta política se actualizará a medida que evolucione el servicio. Los cambios importantes se destacarán en esta página."
        ),
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
            {t("Privacy Policy", "Política de Privacidad")}
          </h1>
          <p className="mt-3 text-sm text-ink-faint">
            {t("Last updated: August 2026", "Última actualización: agosto de 2026")} ·{" "}
            {t(
              "This policy requires formal legal review before production use.",
              "Esta política requiere revisión legal formal antes de su uso en producción."
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
        </div>
      </main>
      <Footer lang={lang} />
    </div>
  );
}
