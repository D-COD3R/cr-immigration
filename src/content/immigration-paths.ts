import type { Lang } from "./site";

export interface ImmigrationPath {
  id: string;
  /** Human goal shown first, e.g. "Retire in Costa Rica" */
  plainLanguageTitle: Record<Lang, string>;
  /** Legal category, secondary label */
  legalCategory: Record<Lang, string>;
  summary: Record<Lang, string>;
  whoItsFor: Record<Lang, string>;
  /**
   * Indicative requirements only — qualitative where possible.
   * Requirements change; never present these as complete or current.
   */
  indicativeRequirements: Record<Lang, string[]>;
  disclaimer: Record<Lang, string>;
  /** ISO date of last internal content review */
  lastReviewed: string;
  enabled: boolean;
}

const REQUIREMENTS_DISCLAIMER = {
  en: "Requirements, thresholds and fees are set by Costa Rican authorities and can change. This is an overview, not legal advice — your specific requirements are confirmed during professional review.",
  es: "Los requisitos, montos y tasas los establecen las autoridades costarricenses y pueden cambiar. Esta es una descripción general, no asesoría legal; sus requisitos específicos se confirman durante la revisión profesional.",
};

/**
 * Source of truth for residency categories surfaced on the landing page
 * and pre-selected in the intake assessment.
 *
 * NOTE ON NUMBERS: Where a figure (e.g. income thresholds) is involved,
 * it must be verified against current DGME regulations before launch.
 * Until verified, qualitative wording is used instead of inventing numbers.
 */
export const immigrationPaths: ImmigrationPath[] = [
  {
    id: "pensionado",
    plainLanguageTitle: {
      en: "Retire in Costa Rica",
      es: "Jubilarse en Costa Rica",
    },
    legalCategory: { en: "Pensionado", es: "Pensionado" },
    summary: {
      en: "For people receiving a lifetime pension from abroad who want to make Costa Rica their retirement home.",
      es: "Para personas que reciben una pensión vitalicia del extranjero y quieren hacer de Costa Rica su hogar de jubilación.",
    },
    whoItsFor: {
      en: "Retirees with a documented lifetime pension (state, private or annuity) received from outside Costa Rica.",
      es: "Jubilados con una pensión vitalicia documentada (estatal, privada o renta vitalicia) recibida desde fuera de Costa Rica.",
    },
    indicativeRequirements: {
      en: [
        "Proof of a qualifying lifetime pension, documented and certified",
        "Background check from your country of origin, apostilled or legalized",
        "Birth certificate and other civil documents, apostilled or legalized",
        "Proof of residence address and registration with Costa Rican authorities after approval",
      ],
      es: [
        "Comprobante de una pensión vitalicia calificada, documentada y certificada",
        "Antecedentes penales de su país de origen, apostillados o legalizados",
        "Partida de nacimiento y otros documentos civiles, apostillados o legalizados",
        "Comprobante de domicilio e inscripción ante las autoridades costarricenses después de la aprobación",
      ],
    },
    disclaimer: REQUIREMENTS_DISCLAIMER,
    lastReviewed: "2026-08-25",
    enabled: true,
  },
  {
    id: "rentista",
    plainLanguageTitle: {
      en: "Live from stable income",
      es: "Vivir de ingresos estables",
    },
    legalCategory: { en: "Rentista", es: "Rentista" },
    summary: {
      en: "For people with stable ongoing income or financial resources from abroad who want to live in Costa Rica without working locally.",
      es: "Para personas con ingresos estables o recursos financieros desde el extranjero que quieren vivir en Costa Rica sin trabajar localmente.",
    },
    whoItsFor: {
      en: "People living off investments, rental income, trusts or other recurring resources rather than employment.",
      es: "Personas que viven de inversiones, rentas, fideicomisos u otros recursos recurrentes, no de un empleo.",
    },
    indicativeRequirements: {
      en: [
        "Proof of stable, qualifying recurring income or a deposited financial guarantee, per current regulations",
        "Background check from your country of origin, apostilled or legalized",
        "Civil documents such as birth certificate, apostilled or legalized",
        "Ongoing proof of income renewal at renewal periods",
      ],
      es: [
        "Comprobante de ingresos recurrentes estables calificados o un depósito garantizado, según la normativa vigente",
        "Antecedentes penales de su país de origen, apostillados o legalizados",
        "Documentos civiles como partida de nacimiento, apostillados o legalizados",
        "Renovación periódica del comprobante de ingresos",
      ],
    },
    disclaimer: REQUIREMENTS_DISCLAIMER,
    lastReviewed: "2026-08-25",
    enabled: true,
  },
  {
    id: "inversionista",
    plainLanguageTitle: {
      en: "Invest in Costa Rica",
      es: "Invertir en Costa Rica",
    },
    legalCategory: { en: "Inversionista", es: "Inversionista" },
    summary: {
      en: "For people investing in Costa Rica — property, a business or qualifying assets — who want residency tied to that investment.",
      es: "Para personas que invierten en Costa Rica —propiedades, un negocio o activos calificados— y quieren residencia vinculada a esa inversión.",
    },
    whoItsFor: {
      en: "Investors who have made, or are preparing, a qualifying investment in Costa Rica.",
      es: "Inversionistas que ya realizaron, o están preparando, una inversión calificada en Costa Rica.",
    },
    indicativeRequirements: {
      en: [
        "A qualifying investment meeting the minimum threshold set by current regulations",
        "Documentary proof of the investment and its legal standing",
        "Background check and civil documents, apostilled or legalized",
        "Ongoing evidence that the investment remains active at renewals",
      ],
      es: [
        "Una inversión calificada que cumpla el monto mínimo según la normativa vigente",
        "Prueba documental de la inversión y su situación legal",
        "Antecedentes penales y documentos civiles, apostillados o legalizados",
        "Evidencia continua de que la inversión sigue activa en las renovaciones",
      ],
    },
    disclaimer: REQUIREMENTS_DISCLAIMER,
    lastReviewed: "2026-08-25",
    enabled: true,
  },
  {
    id: "vinculo",
    plainLanguageTitle: {
      en: "Join family in Costa Rica",
      es: "Reunirse con familia en Costa Rica",
    },
    legalCategory: { en: "Family ties (vínculo)", es: "Vínculo familiar" },
    summary: {
      en: "For people with close family ties to Costa Rican citizens or residents — spouses, parents of Costa Rican children, and similar relationships.",
      es: "Para personas con vínculos familiares cercanos con ciudadanos o residentes costarricenses: cónyuges, padres de niños costarricenses y relaciones similares.",
    },
    whoItsFor: {
      en: "Spouses and partners of Costa Ricans or residents, parents of Costa Rican citizens, and other close family relationships recognized by law.",
      es: "Cónyuges y parejas de costarricenses o residentes, padres de ciudadanos costarricenses y otros vínculos familiares reconocidos por ley.",
    },
    indicativeRequirements: {
      en: [
        "Civil documents proving the family relationship (marriage or birth certificates)",
        "Documents of the Costa Rican relative establishing their status",
        "Background check from your country of origin where applicable, apostilled or legalized",
        "Additional civil records depending on your situation",
      ],
      es: [
        "Documentos civiles que prueben el vínculo familiar (partidas de matrimonio o nacimiento)",
        "Documentos del familiar costarricense que acrediten su condición",
        "Antecedentes penales de su país de origen cuando corresponda, apostillados o legalizados",
        "Registros civiles adicionales según su situación",
      ],
    },
    disclaimer: REQUIREMENTS_DISCLAIMER,
    lastReviewed: "2026-08-25",
    enabled: true,
  },
  {
    id: "nomada-digital",
    plainLanguageTitle: {
      en: "Work remotely from Costa Rica",
      es: "Trabajar remotamente desde Costa Rica",
    },
    legalCategory: { en: "Digital Nomad", es: "Nómada Digital" },
    summary: {
      en: "For remote workers and freelancers earning income from companies or clients outside Costa Rica.",
      es: "Para trabajadores remotos y freelancers con ingresos de empresas o clientes fuera de Costa Rica.",
    },
    whoItsFor: {
      en: "Employees and self-employed professionals whose work and income come from outside Costa Rica.",
      es: "Empleados y profesionales independientes cuyo trabajo e ingresos provienen de fuera de Costa Rica.",
    },
    indicativeRequirements: {
      en: [
        "Proof of remote work or freelance activity for entities outside Costa Rica",
        "Evidence of stable income meeting the program's criteria",
        "Health insurance coverage valid in Costa Rica for the stay",
        "Additional supporting documents per current program rules",
      ],
      es: [
        "Comprobante de trabajo remoto o actividad freelance para entidades fuera de Costa Rica",
        "Evidencia de ingresos estables que cumplan los criterios del programa",
        "Seguro médico válido en Costa Rica durante la estadía",
        "Documentos de apoyo adicionales según las reglas actuales del programa",
      ],
    },
    disclaimer: REQUIREMENTS_DISCLAIMER,
    lastReviewed: "2026-08-25",
    enabled: true,
  },
  {
    id: "unsure",
    plainLanguageTitle: {
      en: "I’m not sure yet",
      es: "Aún no lo sé",
    },
    legalCategory: { en: "Help me find my path", es: "Ayúdenme a encontrar mi vía" },
    summary: {
      en: "Not sure which option fits? The assessment asks about your situation and helps identify the likely route.",
      es: "¿No sabe cuál opción le conviene? La evaluación pregunta sobre su situación y ayuda a identificar la vía probable.",
    },
    whoItsFor: {
      en: "Anyone who knows they want to be in Costa Rica but not through which category.",
      es: "Cualquier persona que sabe que quiere estar en Costa Rica pero no sabe por qué categoría.",
    },
    indicativeRequirements: {
      en: ["Start the assessment — we'll map your situation to the likely path."],
      es: ["Comience la evaluación: mapearemos su situación a la vía probable."],
    },
    disclaimer: REQUIREMENTS_DISCLAIMER,
    lastReviewed: "2026-08-25",
    enabled: true,
  },
];

export function getPath(id: string | null | undefined): ImmigrationPath | undefined {
  return immigrationPaths.find((p) => p.id === id && p.enabled);
}
