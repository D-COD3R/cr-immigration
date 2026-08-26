import type { Lang } from "./site";

/**
 * Central UI copy dictionary. Every user-facing string lives here so the
 * site can operate bilingually without duplicating components.
 */
export const t = {
  nav: {
    services: { en: "What we handle", es: "Qué gestionamos" },
    howItWorks: { en: "How it works", es: "Cómo funciona" },
    faq: { en: "FAQ", es: "Preguntas" },
    cta: { en: "Check my options", es: "Ver mis opciones" },
    languageLabel: { en: "Language", es: "Idioma" },
  },

  hero: {
    headline: {
      en: "Your path to Costa Rica residency, made clear.",
      es: "Su camino a la residencia en Costa Rica, con claridad.",
    },
    subcopy: {
      en: "Tell us about your situation. We’ll help identify the likely residency path, organize what you need, and connect your case with professional legal guidance.",
      es: "Cuéntenos sobre su situación. Le ayudamos a identificar la vía de residencia probable, organizar lo que necesita y conectar su caso con asesoría legal profesional.",
    },
    primaryCta: { en: "Check my options", es: "Ver mis opciones" },
    secondaryCta: { en: "See how it works", es: "Ver cómo funciona" },
    trust: [
      {
        title: { en: "Clear process", es: "Proceso claro" },
        detail: { en: "Know each step before you take it", es: "Conozca cada paso antes de darlo" },
      },
      {
        title: { en: "Bilingual support", es: "Atención bilingüe" },
        detail: { en: "Guidance in English and Spanish", es: "Orientación en inglés y español" },
      },
      {
        title: { en: "Professional case review", es: "Revisión profesional" },
        detail: { en: "Your case prepared for legal review", es: "Su caso preparado para revisión legal" },
      },
    ] as { title: Record<Lang, string>; detail: Record<Lang, string> }[],
  },

  routing: {
    heading: { en: "What brings you to Costa Rica?", es: "¿Qué le trae a Costa Rica?" },
    subheading: {
      en: "Choose the goal that sounds most like you. We’ll explain what it means and what it takes.",
      es: "Elija el objetivo que más se parezca a usted. Le explicamos qué significa y qué se necesita.",
    },
    select: { en: "Explore this path", es: "Explorar esta vía" },
  },

  how: {
    heading: { en: "How it works", es: "Cómo funciona" },
    subheading: {
      en: "From “I have no idea where to start” to a professionally reviewed case.",
      es: "Desde “no sé por dónde empezar” hasta un caso revisado profesionalmente.",
    },
    steps: [
      {
        title: { en: "Tell us about your situation", es: "Cuéntenos su situación" },
        body: {
          en: "Complete a short guided assessment — no documents needed at this stage.",
          es: "Complete una evaluación guiada breve; en esta etapa no necesita documentos.",
        },
      },
      {
        title: { en: "We identify the likely path", es: "Identificamos la vía probable" },
        body: {
          en: "Your answers are organized into a case overview so nothing important gets lost.",
          es: "Sus respuestas se organizan en un resumen de caso para que nada importante se pierda.",
        },
      },
      {
        title: { en: "Your case gets professional review", es: "Su caso recibe revisión profesional" },
        body: {
          en: "A qualified immigration professional reviews your circumstances and outlines realistic next steps.",
          es: "Un profesional migratorio calificado revisa sus circunstancias y define los siguientes pasos realistas.",
        },
      },
      {
        title: { en: "We guide the process", es: "Le guiamos en el proceso" },
        body: {
          en: "Once engaged, we help coordinate requirements, preparation, filing and follow-up with the authorities.",
          es: "Una vez formalizados los servicios, coordinamos requisitos, preparación, presentación y seguimiento ante las autoridades.",
        },
      },
    ] as { title: Record<Lang, string>; body: Record<Lang, string> }[],
  },

  services: {
    heading: { en: "What we handle", es: "Qué gestionamos" },
    subheading: {
      en: "The practical work of an immigration case — organized, translated into plain language, and shepherded by professionals.",
      es: "El trabajo práctico de un caso migratorio: organizado, explicado en lenguaje sencillo y acompañado por profesionales.",
    },
    groups: [
      {
        title: { en: "Before filing", es: "Antes de presentar" },
        items: [
          { en: "Residency-path assessment", es: "Evaluación de la vía de residencia" },
          { en: "Personalized document checklist", es: "Lista personalizada de documentos" },
          { en: "Apostille and legalization guidance", es: "Orientación sobre apostillas y legalizaciones" },
          { en: "Translation guidance for foreign documents", es: "Orientación sobre traducción de documentos extranjeros" },
        ],
      },
      {
        title: { en: "Filing & follow-up", es: "Presentación y seguimiento" },
        items: [
          { en: "Application preparation and review", es: "Preparación y revisión de la solicitud" },
          { en: "Filing coordination with migration authorities", es: "Coordinación de la presentación ante migración" },
          { en: "Case follow-up during government processing", es: "Seguimiento del caso durante el proceso gubernamental" },
          { en: "Appointment guidance", es: "Orientación sobre citas" },
        ],
      },
      {
        title: { en: "After approval", es: "Después de la aprobación" },
        items: [
          { en: "DIMEX ID card process guidance", es: "Orientación sobre el carné DIMEX" },
          { en: "Residency documentation support", es: "Apoyo con documentos de residencia" },
          { en: "Renewals and change-of-category advice", es: "Renovaciones y cambio de categoría" },
          { en: "Status maintenance reminders", es: "Recordatorios para mantener su estatus" },
        ],
      },
    ] as { title: Record<Lang, string>; items: Record<Lang, string>[] }[],
  },

  journey: {
    heading: { en: "Your immigration journey", es: "Su viaje migratorio" },
    subheading: {
      en: "Every case moves through the same stages. You always know where you stand.",
      es: "Todo caso avanza por las mismas etapas. Siempre sabrá dónde está.",
    },
    stages: [
      { name: { en: "Eligibility", es: "Elegibilidad" }, status: "done" },
      { name: { en: "Documents", es: "Documentos" }, status: "current" },
      { name: { en: "Professional review", es: "Revisión profesional" }, status: "upcoming" },
      { name: { en: "Application preparation", es: "Preparación de solicitud" }, status: "upcoming" },
      { name: { en: "Submission", es: "Presentación" }, status: "upcoming" },
      { name: { en: "Government processing", es: "Proceso gubernamental" }, status: "waiting" },
      { name: { en: "Post-approval / DIMEX", es: "Post-aprobación / DIMEX" }, status: "upcoming" },
    ] as { name: Record<Lang, string>; status: "done" | "current" | "waiting" | "upcoming" }[],
    statusLabels: {
      done: { en: "Completed", es: "Completado" },
      current: { en: "In progress", es: "En progreso" },
      waiting: { en: "Waiting on government", es: "En espera del gobierno" },
      upcoming: { en: "Upcoming", es: "Pendiente" },
    } as Record<string, Record<Lang, string>>,
  },

  faq: {
    heading: { en: "Common questions", es: "Preguntas frecuentes" },
  },

  finalCta: {
    heading: {
      en: "You don’t need to figure out Costa Rica immigration alone.",
      es: "No tiene que resolver la inmigración a Costa Rica solo.",
    },
    body: {
      en: "The assessment takes a few minutes, asks for no documents, and gives a professional everything needed to point you in the right direction.",
      es: "La evaluación toma pocos minutos, no pide documentos y le da al profesional todo lo necesario para orientarle bien.",
    },
    cta: { en: "Check my options", es: "Ver mis opciones" },
  },

  footer: {
    services: { en: "Immigration services", es: "Servicios migratorios" },
    how: { en: "How it works", es: "Cómo funciona" },
    faq: { en: "FAQ", es: "Preguntas frecuentes" },
    privacy: { en: "Privacy", es: "Privacidad" },
    terms: { en: "Terms & disclosures", es: "Términos y avisos" },
    contact: { en: "Contact", es: "Contacto" },
    rights: { en: "All rights reserved.", es: "Todos los derechos reservados." },
  },
} as const;
