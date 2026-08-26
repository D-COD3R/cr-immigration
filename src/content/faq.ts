import type { Lang } from "./site";

export interface FaqItem {
  question: Record<Lang, string>;
  answer: Record<Lang, string>;
}

export const faq: FaqItem[] = [
  {
    question: {
      en: "How do I know which Costa Rica residency option applies to me?",
      es: "¿Cómo sé cuál opción de residencia en Costa Rica me corresponde?",
    },
    answer: {
      en: "That’s exactly what the assessment is for. It asks about your goal, income situation and family ties, then maps your answers to the residency category that likely fits. A professional confirms the final recommendation — categories can look similar, and details matter.",
      es: "Para eso existe la evaluación. Pregunta sobre su objetivo, situación de ingresos y vínculos familiares, y mapea sus respuestas a la categoría de residencia que probablemente le corresponda. Un profesional confirma la recomendación final; las categorías pueden parecerse y los detalles importan.",
    },
  },
  {
    question: {
      en: "Do I need to be in Costa Rica to start?",
      es: "¿Necesito estar en Costa Rica para empezar?",
    },
    answer: {
      en: "No. Most people start the assessment and document preparation from their home country. Some steps — like fingerprints or in-person appointments — do require being in or traveling to Costa Rica at the right moment. We help you sequence everything.",
      es: "No. La mayoría comienza la evaluación y la preparación de documentos desde su país. Algunos pasos —como tomarse las huellas o citas presenciales— sí requieren estar o viajar a Costa Rica en el momento correcto. Le ayudamos a ordenar todo.",
    },
  },
  {
    question: {
      en: "What documents will I need?",
      es: "¿Qué documentos necesitaré?",
    },
    answer: {
      en: "It depends on your category, but commonly includes civil documents (birth certificate, marriage certificate), a background check from your country of origin, and proof of income or investment — usually needing apostilles or legalization and certified translation. After the assessment you receive a checklist specific to your case.",
      es: "Depende de su categoría, pero generalmente incluye documentos civiles (partida de nacimiento, acta de matrimonio), antecedentes penales de su país y comprobante de ingresos o inversión —normalmente con apostilla o legalización y traducción certificado—. Tras la evaluación recibe una lista específica para su caso.",
    },
  },
  {
    question: {
      en: "Can my spouse or children be included?",
      es: "¿Puedo incluir a mi cónyuge o hijos?",
    },
    answer: {
      en: "In most residency categories, yes — spouses and dependent children can typically be included as dependents on your application. The assessment asks about your household so the professional review accounts for everyone involved.",
      es: "En la mayoría de las categorías, sí: cónyuge e hijos dependientes normalmente pueden incluirse como dependientes en su solicitud. La evaluación pregunta por su grupo familiar para que la revisión profesional considere a todos.",
    },
  },
  {
    question: {
      en: "How long does the process take?",
      es: "¿Cuánto tarda el proceso?",
    },
    answer: {
      en: "Honestly: it varies. Government processing times change and differ by category, and document preparation (apostilles, translations) adds time before filing. We set expectations based on current conditions during your case review rather than promising timelines we don’t control.",
      es: "Con sinceridad: varía. Los tiempos del gobierno cambian y difieren según la categoría, y la preparación de documentos (apostillas, traducciones) suma tiempo antes de presentar. Definimos expectativas según las condiciones actuales durante la revisión de su caso, sin prometer plazos que no controlamos.",
    },
  },
  {
    question: {
      en: "Do I need a lawyer?",
      es: "¿Necesito un abogado?",
    },
    answer: {
      en: "Costa Rican immigration filings can be done personally, but requirements are technical, mistakes cause delays, and all communication happens in Spanish. Professional guidance exists to prevent avoidable errors. The service connects your case with qualified legal professionals.",
      es: "Las solicitudes migratorias en Costa Rica pueden hacerse personalmente, pero los requisitos son técnicos, los errores causan retrasos y toda comunicación es en español. La asesoría profesional existe para evitar errores evitables. El servicio conecta su caso con profesionales legales calificados.",
    },
  },
  {
    question: {
      en: "Can you guarantee approval?",
      es: "¿Pueden garantizar la aprobación?",
    },
    answer: {
      en: "No, and be cautious of anyone who says they can. Final decisions belong exclusively to Costa Rica’s immigration authority. What we guarantee is preparation: a correctly organized case, accurate documents, and honest guidance about your realistic options.",
      es: "No, y desconfíe de quien diga lo contrario. Las decisiones finales corresponden exclusivamente a la autoridad migratoria de Costa Rica. Lo que garantizamos es preparación: un caso bien organizado, documentos correctos y orientación honesta sobre sus opciones reales.",
    },
  },
  {
    question: {
      en: "What happens after I submit the assessment?",
      es: "¿Qué pasa después de enviar la evaluación?",
    },
    answer: {
      en: "Your answers become an organized case overview. A professional reviews it and contacts you through your preferred channel to discuss the likely path, answer questions, and explain how formal engagement works if you want to proceed. There’s no obligation.",
      es: "Sus respuestas se convierten en un resumen de caso organizado. Un profesional lo revisa y le contacta por su canal preferido para hablar de la vía probable, responder preguntas y explicarle cómo funciona la contratación formal si desea continuar. No hay compromiso.",
    },
  },
];
