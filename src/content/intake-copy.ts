/** Bilingual copy for the /start guided assessment. */
export const intakeCopy = {
  meta: {
    title: { en: "Start your assessment", es: "Comience su evaluación" },
    intro: {
      en: "A few minutes, no documents required. Your answers help us understand your situation before a professional reviews it.",
      es: "Toma pocos minutos y no requiere documentos. Sus respuestas nos ayudan a entender su situación antes de la revisión profesional.",
    },
    questionOf: { en: "Question", es: "Pregunta" },
    of: { en: "of", es: "de" },
    back: { en: "Back", es: "Atrás" },
    continue: { en: "Continue", es: "Continuar" },
    submit: { en: "Submit assessment", es: "Enviar evaluación" },
    submitting: { en: "Submitting…", es: "Enviando…" },
    optional: { en: "Optional", es: "Opcional" },
    yes: { en: "Yes", es: "Sí" },
    no: { en: "No", es: "No" },
    edit: { en: "Edit", es: "Editar" },
    reviewTitle: { en: "Review your information", es: "Revise su información" },
    reviewNote: {
      en: "You can go back and change anything before submitting.",
      es: "Puede volver atrás y cambiar cualquier cosa antes de enviar.",
    },
  },

  error: {
    generic: {
      en: "Something went wrong submitting your assessment. Your answers are still here — please try again.",
      es: "Algo falló al enviar su evaluación. Sus respuestas siguen aquí; por favor intente de nuevo.",
    },
    network: {
      en: "We couldn’t reach the server. Check your connection and try again — your answers are preserved.",
      es: "No pudimos conectar con el servidor. Verifique su conexión e intente de nuevo; sus respuestas están guardadas.",
    },
    nameRequired: { en: "Please enter your full name.", es: "Ingrese su nombre completo." },
    emailRequired: { en: "Please enter a valid email address.", es: "Ingrese un correo electrónico válido." },
    consentRequired: { en: "We need your permission to contact you.", es: "Necesitamos su autorización para contactarle." },
  },

  success: {
    heading: { en: "Thanks — we have your information.", es: "Gracias — recibimos su información." },
    body: {
      en: "Your assessment is ready for professional review. We’ll use the contact details you provided to follow up about your likely path and next steps.",
      es: "Su evaluación está lista para revisión profesional. Usaremos los datos de contacto proporcionados para darle seguimiento sobre su vía probable y los siguientes pasos.",
    },
    note: {
      en: "This assessment is preliminary and does not constitute legal advice or create an attorney-client relationship.",
      es: "Esta evaluación es preliminar y no constituye asesoría legal ni crea una relación abogado-cliente.",
    },
    reference: { en: "Reference", es: "Referencia" },
    home: { en: "Back to home", es: "Volver al inicio" },
  },

  questions: {
    goal: {
      label: { en: "What would you like help with?", es: "¿Con qué le gustaría recibir ayuda?" },
      options: {
        pensionado: { en: "Retiring in Costa Rica", es: "Jubilarme en Costa Rica" },
        rentista: { en: "Living in Costa Rica from independent income", es: "Vivir en Costa Rica con ingresos independientes" },
        inversionista: { en: "Investing or buying property in Costa Rica", es: "Invertir o comprar propiedad en Costa Rica" },
        vinculo: { en: "Joining Costa Rican family", es: "Reunirme con familia costarricense" },
        "nomada-digital": { en: "Working remotely from Costa Rica", es: "Trabajar remotamente desde Costa Rica" },
        renewal: { en: "Existing residency / renewal", es: "Residencia existente / renovación" },
        other: { en: "Something else", es: "Otra cosa" },
        unsure: { en: "I’m not sure yet", es: "Aún no lo sé" },
      },
    },

    inCR: {
      label: { en: "Are you currently in Costa Rica?", es: "¿Está actualmente en Costa Rica?" },
      hint: {
        en: "This affects sequencing, not eligibility. Many people start everything from abroad.",
        es: "Esto afecta el orden de los pasos, no la elegibilidad. Muchos comienzan todo desde el extranjero.",
      },
    },

    location: {
      label: { en: "Where do you live now?", es: "¿Dónde vive actualmente?" },
      countryOfResidence: { en: "Country of residence", es: "País de residencia" },
      nationality: { en: "Nationality / citizenship", es: "Nacionalidad / ciudadanía" },
      placeholder: { en: "e.g. United States", es: "p. ej. Estados Unidos" },
    },

    currentStatus: {
      label: {
        en: "What is your current Costa Rican immigration status?",
        es: "¿Cuál es su estatus migratorio actual en Costa Rica?",
      },
      hint: {
        en: "For example: tourist entry, temporary residency, permanent residency, pending application.",
        es: "Por ejemplo: entrada como turista, residencia temporal, residencia permanente, solicitud en trámite.",
      },
      options: {
        tourist: { en: "Tourist / visitor", es: "Turista / visitante" },
        "temporary-resident": { en: "Temporary resident", es: "Residente temporal" },
        "permanent-resident": { en: "Permanent resident", es: "Residente permanente" },
        pending: { en: "Application in process", es: "Solicitud en proceso" },
        other: { en: "Other / not sure", es: "Otro / no estoy seguro" },
      },
    },

    qualification: {
      pensionado: {
        label: {
          en: "Do you receive a lifetime pension from outside Costa Rica?",
          es: "¿Recibe una pensión vitalicia desde fuera de Costa Rica?",
        },
        hint: {
          en: "For example a state, private or annuity pension paid for life. One-time savings don’t qualify for this category.",
          es: "Por ejemplo, una pensión estatal, privada o vitalicia pagada de por vida. Los ahorros puntuales no califican para esta categoría.",
        },
      },
      rentista: {
        label: {
          en: "Do you have stable recurring income or financial resources from abroad?",
          es: "¿Tiene ingresos recurrentes estables o recursos financieros desde el extranjero?",
        },
        hint: {
          en: "For example investment income, rental income or trust distributions received regularly.",
          es: "Por ejemplo, ingresos de inversiones, rentas o distribuciones de fideicomiso recibidos regularmente.",
        },
      },
      inversionista: {
        label: { en: "What is your investment situation?", es: "¿Cuál es su situación de inversión?" },
        options: {
          done: { en: "I have already invested in Costa Rica", es: "Ya invertí en Costa Rica" },
          planning: { en: "I’m actively planning or negotiating an investment", es: "Estoy planificando o negociando activamente una inversión" },
          exploring: { en: "I’m exploring the idea", es: "Estoy explorando la idea" },
        },
      },
      vinculo: {
        label: {
          en: "What is your relationship to the Costa Rican citizen or resident?",
          es: "¿Cuál es su relación con el ciudadano o residente costarricense?",
        },
        options: {
          spouse: { en: "Spouse or partner of a Costa Rican citizen", es: "Cónyuge o pareja de un ciudadano costarricense" },
          parent: { en: "Parent of a Costa Rican citizen (child born in Costa Rica)", es: "Padre/madre de un ciudadano costarricense (hijo nacido en Costa Rica)" },
          relative: { en: "Other close family relationship", es: "Otra relación familiar cercana" },
        },
      },
      "nomada-digital": {
        label: {
          en: "Do you work remotely for clients or employers outside Costa Rica?",
          es: "¿Trabaja remotamente para clientes o empleadores fuera de Costa Rica?",
        },
        hint: {
          en: "The digital nomad category requires income sourced from outside Costa Rica.",
          es: "La categoría de nómada digital requiere ingresos provenientes de fuera de Costa Rica.",
        },
      },
    },

    household: {
      label: { en: "Who would be applying with you?", es: "¿Quién solicitaría con usted?" },
      alone: { en: "Just me", es: "Solo yo" },
      spouse: { en: "With my spouse or partner", es: "Con mi cónyuge o pareja" },
      dependentsLabel: { en: "Dependent children or family members", es: "Hijos o familiares dependientes" },
    },

    timing: {
      label: { en: "When are you thinking of making this move?", es: "¿Cuándo piensa dar este paso?" },
      options: {
        immediately: { en: "Immediately", es: "Inmediatamente" },
        "1-3-months": { en: "Next 1–3 months", es: "Próximos 1–3 meses" },
        "3-6-months": { en: "In 3–6 months", es: "En 3–6 meses" },
        "6-plus-months": { en: "In 6+ months", es: "En más de 6 meses" },
        researching: { en: "Still researching", es: "Aún investigando" },
      },
    },

    contact: {
      label: { en: "How should we reach you?", es: "¿Cómo debemos contactarle?" },
      name: { en: "Full name", es: "Nombre completo" },
      email: { en: "Email", es: "Correo electrónico" },
      phone: { en: "Phone (optional)", es: "Teléfono (opcional)" },
      preference: { en: "Preferred contact method", es: "Método de contacto preferido" },
      language: { en: "Preferred language", es: "Idioma preferido" },
      consent: {
        en: "I agree to be contacted about my assessment and understand this doesn’t create an attorney-client relationship.",
        es: "Acepto ser contactado sobre mi evaluación y entiendo que esto no crea una relación abogado-cliente.",
      },
      preferences: {
        email: { en: "Email", es: "Correo" },
        phone: { en: "Phone call", es: "Llamada" },
        whatsapp: { en: "WhatsApp", es: "WhatsApp" },
      },
      languages: {
        english: { en: "English", es: "Inglés" },
        spanish: { en: "Spanish", es: "Español" },
        either: { en: "Either", es: "Indistinto" },
      },
      honeypot: { en: "Company website", es: "Sitio web de empresa" },
    },

    additional: {
      label: { en: "Anything else we should know?", es: "¿Algo más que debamos saber?" },
      hint: {
        en: "Optional. Please don’t include passport numbers or sensitive documents here.",
        es: "Opcional. No incluya números de pasaporte ni documentos sensibles aquí.",
      },
    },
  },

  review: {
    labels: {
      goal: { en: "Goal", es: "Objetivo" },
      inCostaRica: { en: "Currently in Costa Rica", es: "Actualmente en Costa Rica" },
      countryOfResidence: { en: "Country of residence", es: "País de residencia" },
      nationality: { en: "Nationality", es: "Nacionalidad" },
      currentStatus: { en: "Current immigration status", es: "Estatus migratorio actual" },
      qualification: { en: "Qualification details", es: "Detalles de calificación" },
      household: { en: "Household", es: "Grupo familiar" },
      timeline: { en: "Timeline", es: "Plazo" },
      contact: { en: "Contact", es: "Contacto" },
      additional: { en: "Additional notes", es: "Notas adicionales" },
      notProvided: { en: "Not provided", es: "No proporcionado" },
    },
  },
} as const;
