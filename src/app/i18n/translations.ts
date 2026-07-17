/**
 * Diccionario de strings de interfaz (labels cortos, botones, breadcrumbs,
 * mensajes de estado). El contenido largo (párrafos, bios, catálogos) vive
 * en content.ts para mantener este archivo legible.
 */

export const translations = {
  es: {
    nav: {
      home: "Inicio",
      treatments: "Tratamientos",
      method: "Método",
      philosophy: "Filosofía",
      doctor: "Especialista",
      contact: "Contacto",
      about: "Sobre el especialista",
    },
    header: {
      callTitle: "Llamar para agendar cita",
      bookAppointment: "Agendar cita",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
      translateButton: "Translate to English",
    },
    footer: {
      description:
        "Medicina estética y antienvejecimiento en San Luis Río Colorado, Sonora. Diagnóstico clínico, biotecnología y criterio conservador en cada protocolo.",
      quickLinks: "Enlaces rápidos",
      specialties: "Especialidades",
      contact: "Contacto",
      address: "Av. Zaragoza entre calle 6 y 7, lado sur",
      city: "San Luis Río Colorado, Sonora",
      callLabel: "Llamadas · agendar cita",
      whatsappLabel: "WhatsApp del consultorio",
      hoursLabel: "Horario de atención",
      hours: {
        weekdays: "Lunes – Viernes",
        saturday: "Sábado",
        sunday: "Domingo",
        sundayNote: "Previa cita",
      },
      bookAppointment: "Agendar cita",
      copyright: "© 2026 Age Recovery · Medicina Estética y Antienvejecimiento",
      license: "Cédula profesional bajo valoración médica previa",
    },
    hero: {
      eyebrow: "Medicina Estética & Antienvejecimiento",
      titleLine1: "Tu mejor versión,",
      titleLine2: "Revelada.",
      description:
        "Nuestro especialista combina precisión clínica con visión estética para resultados completamente naturales. Cada tratamiento, diseñado exclusivamente para ti.",
      bookConsult: "Agenda tu consulta",
      viewTreatments: "Ver tratamientos",
      stats: {
        years: "Años de experiencia",
        patients: "Pacientes satisfechos",
        assessment: "Valoración previa",
      },
      specialistLabel: "Especialista",
      doctorName: "Dr. Gregorio García",
      photoAlt: "Especialista de Age Recovery en consulta",
    },
    contactSection: {
      eyebrow: "Encuéntranos",
      title: "Visítanos en clínica",
      addressLabel: "Dirección",
      address: "Av. Zaragoza entre calle 6 y 7, lado sur",
      city: "San Luis Río Colorado, Sonora",
      callLabel: "Llamadas · agendar cita",
      whatsappLabel: "WhatsApp del consultorio",
      socialLabel: "Redes Sociales",
      facebookName: "Age Recovery",
      mapTitle: "Ubicación Age Recovery",
      hoursTitle: "Horario de atención",
      hours: {
        weekdays: "Lunes – Viernes",
        saturday: "Sábado",
        sunday: "Domingo",
        sundayNote: "Previa cita",
      },
    },
    form: {
      defaultTitle: "Solicitar información",
      treatmentTitle: "Solicitar valoración",
      nameLabel: "Nombre completo",
      namePlaceholder: "Tu nombre",
      phoneLabel: "Teléfono / WhatsApp",
      phonePlaceholder: "(653) 000-0000",
      interestLabel: "Tratamiento de interés",
      submit: "Solicitar valoración",
      disclaimer: "Al enviar, se abrirá WhatsApp con tu mensaje listo para confirmar.",
      sentTitle: "¡Casi listo!",
      sentDescription:
        "Abrimos WhatsApp con tu mensaje. Solo confirma el envío desde ahí para que podamos contactarte.",
      sendAnother: "Enviar otra solicitud",
      defaultOptions: [
        "Bioestimulación facial",
        "Ácido hialurónico",
        "Toxina botulínica",
        "Hilos tensores PDO",
        "Skinbooster y mesoterapia",
        "Plasma rico en plaquetas",
        "No estoy seguro / quiero diagnóstico",
      ],
    },
    modal: {
      close: "Cerrar",
      title: "Solicitud preparada",
      description:
        "Gracias por solicitar una valoración. En el siguiente paso se abrirá WhatsApp para que uno de nuestros especialistas continúe tu atención.",
      nameLabel: "Nombre",
      phoneLabel: "Teléfono",
      treatmentLabel: "Tratamiento",
      cancel: "Cancelar",
      continue: "Continuar en WhatsApp",
    },
    notFound: {
      title: "Página no encontrada",
      description: "La página que buscas no existe o fue movida.",
      heading: "404",
      message: "Esta página no existe o fue movida.",
      backHome: "Volver al inicio",
    },
    productGrid: {
      viewCatalog: "Ver catálogo completo",
    },
    treatment: {
      duration: "Duración",
      sessions: "Sesiones",
      results: "Resultados",
      benefits: "Beneficios",
      procedure: "Procedimiento",
      recovery: "Recuperación",
      aftercare: "Cuidados posteriores",
      idealFor: "¿Para quién es?",
      contraindications: "Contraindicaciones",
      contraindicationsNote:
        "La valoración médica previa determina si eres candidato ideal para este tratamiento.",
      viewDetail: "Ver detalle",
      related: "Tratamientos relacionados",
    },
    treatmentsList: {
      eyebrow: "Tratamientos",
      titleLine1: "Ciencia al servicio",
      titleLine2: "de tu belleza",
      description:
        "Explora cada protocolo en detalle: duración, número de sesiones y tiempos de resultado esperados. Cada tratamiento incluye valoración médica previa.",
      loading: "Cargando tratamientos…",
      loadError: "No se pudieron cargar los tratamientos. Intenta de nuevo.",
      bookFree: "Agenda tu valoración gratuita",
      seoTitle: "Tratamientos",
      seoDescription:
        "Explora nuestro catálogo de tratamientos de medicina estética: bioestimulación facial, ácido hialurónico, toxina botulínica, hilos tensores, skinbooster y plasma rico en plaquetas.",
    },
    treatmentDetail: {
      loading: "Cargando información del tratamiento…",
      loadingShort: "Cargando…",
      loadError: "No pudimos cargar este tratamiento. Por favor intenta de nuevo o regresa al catálogo.",
      backToCatalog: "Volver al catálogo",
      tabBenefits: "Beneficios",
      tabProcedure: "Procedimiento",
      tabRecovery: "Recuperación",
      tabIdealFor: "¿Para quién es?",
      seoFallbackDescription: "Conoce el detalle de nuestros tratamientos de medicina estética y antienvejecimiento.",
    },
    doctorPage: {
      eyebrow: "El especialista",
      firstName: "Dr. Gregorio",
      lastName: "García",
      role: "Especialista en Medicina Estética y Antienvejecimiento",
      bio1:
        "El Dr. Gregorio García es especialista en medicina estética, antienvejecimiento y medicina regenerativa con más de 8 años de experiencia transformando vidas a través de tratamientos precisos y personalizados.",
      bio2:
        "Su filosofía es clara: cada rostro es único. Por eso, cada tratamiento comienza con una valoración médica completa que garantiza el procedimiento más adecuado, asegurando resultados naturales que realzan —sin borrar— la esencia de quien eres.",
      experienceYears: "+8",
      experienceLabel1: "Años de",
      experienceLabel2: "experiencia",
      cta: "Agenda tu valoración",
      photoAlt: "Dr. Gregorio García",
      seoDescription:
        "Conoce a nuestro especialista en medicina estética y antienvejecimiento: formación, enfoque clínico y áreas de especialidad.",
    },
    home: {
      seoDescription:
        "Clínica de medicina estética y antienvejecimiento en San Luis Río Colorado, Sonora. Bioestimulación facial, ácido hialurónico, toxina botulínica, hilos tensores y más.",
    },
    methodPage: {
      seoDescription:
        "Conoce nuestro método de trabajo: valoración médica, diagnóstico personalizado y protocolos de medicina estética diseñados para resultados naturales.",
    },
    philosophyPage: {
      seoDescription:
        "Nuestra filosofía: precisión clínica y visión estética al servicio de resultados naturales, sin perder la esencia de cada paciente.",
    },
    contactPage: {
      seoDescription:
        "Agenda tu valoración médica en Age Recovery. Contáctanos por WhatsApp o el formulario y resolvemos tus dudas sobre nuestros tratamientos.",
    },
  },
  en: {
    nav: {
      home: "Home",
      treatments: "Treatments",
      method: "Method",
      philosophy: "Philosophy",
      doctor: "Specialist",
      contact: "Contact",
      about: "About the specialist",
    },
    header: {
      callTitle: "Call to book an appointment",
      bookAppointment: "Book appointment",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      translateButton: "Traducir al Español",
    },
    footer: {
      description:
        "Aesthetic and anti-aging medicine in San Luis Río Colorado, Sonora. Clinical diagnosis, biotechnology, and a conservative approach in every protocol.",
      quickLinks: "Quick links",
      specialties: "Specialties",
      contact: "Contact",
      address: "Av. Zaragoza between calle 6 and 7, south side",
      city: "San Luis Río Colorado, Sonora",
      callLabel: "Calls · book appointment",
      whatsappLabel: "Clinic WhatsApp",
      hoursLabel: "Business hours",
      hours: {
        weekdays: "Monday – Friday",
        saturday: "Saturday",
        sunday: "Sunday",
        sundayNote: "By appointment",
      },
      bookAppointment: "Book appointment",
      copyright: "© 2026 Age Recovery · Aesthetic & Anti-Aging Medicine",
      license: "Professional license, subject to prior medical assessment",
    },
    hero: {
      eyebrow: "Aesthetic & Anti-Aging Medicine",
      titleLine1: "Your best self,",
      titleLine2: "Revealed.",
      description:
        "Our specialist combines clinical precision with an aesthetic eye for completely natural results. Every treatment, designed exclusively for you.",
      bookConsult: "Book your consultation",
      viewTreatments: "View treatments",
      stats: {
        years: "Years of experience",
        patients: "Satisfied patients",
        assessment: "Prior assessment",
      },
      specialistLabel: "Specialist",
      doctorName: "Dr. Gregorio García",
      photoAlt: "Age Recovery specialist during a consultation",
    },
    contactSection: {
      eyebrow: "Find us",
      title: "Visit us at the clinic",
      addressLabel: "Address",
      address: "Av. Zaragoza between calle 6 and 7, south side",
      city: "San Luis Río Colorado, Sonora",
      callLabel: "Calls · book appointment",
      whatsappLabel: "Clinic WhatsApp",
      socialLabel: "Social Media",
      facebookName: "Age Recovery",
      mapTitle: "Age Recovery location",
      hoursTitle: "Business hours",
      hours: {
        weekdays: "Monday – Friday",
        saturday: "Saturday",
        sunday: "Sunday",
        sundayNote: "By appointment",
      },
    },
    form: {
      defaultTitle: "Request information",
      treatmentTitle: "Request an assessment",
      nameLabel: "Full name",
      namePlaceholder: "Your name",
      phoneLabel: "Phone / WhatsApp",
      phonePlaceholder: "(653) 000-0000",
      interestLabel: "Treatment of interest",
      submit: "Request assessment",
      disclaimer: "When you submit, WhatsApp will open with your message ready to confirm.",
      sentTitle: "Almost done!",
      sentDescription:
        "We opened WhatsApp with your message. Just confirm sending it from there so we can contact you.",
      sendAnother: "Send another request",
      defaultOptions: [
        "Facial biostimulation",
        "Hyaluronic acid",
        "Botulinum toxin",
        "PDO thread lift",
        "Skinbooster and mesotherapy",
        "Platelet-rich plasma",
        "Not sure / I want a diagnosis",
      ],
    },
    modal: {
      close: "Close",
      title: "Request ready",
      description:
        "Thank you for requesting an assessment. In the next step, WhatsApp will open so one of our specialists can continue assisting you.",
      nameLabel: "Name",
      phoneLabel: "Phone",
      treatmentLabel: "Treatment",
      cancel: "Cancel",
      continue: "Continue on WhatsApp",
    },
    notFound: {
      title: "Page not found",
      description: "The page you're looking for doesn't exist or was moved.",
      heading: "404",
      message: "This page doesn't exist or was moved.",
      backHome: "Back to home",
    },
    productGrid: {
      viewCatalog: "View full catalog",
    },
    treatment: {
      duration: "Duration",
      sessions: "Sessions",
      results: "Results",
      benefits: "Benefits",
      procedure: "Procedure",
      recovery: "Recovery",
      aftercare: "Aftercare",
      idealFor: "Who is it for?",
      contraindications: "Contraindications",
      contraindicationsNote:
        "The prior medical assessment determines whether you're an ideal candidate for this treatment.",
      viewDetail: "View detail",
      related: "Related treatments",
    },
    treatmentsList: {
      eyebrow: "Treatments",
      titleLine1: "Science serving",
      titleLine2: "your beauty",
      description:
        "Explore each protocol in detail: duration, number of sessions, and expected result timelines. Every treatment includes a prior medical assessment.",
      loading: "Loading treatments…",
      loadError: "We couldn't load the treatments. Please try again.",
      bookFree: "Book your free assessment",
      seoTitle: "Treatments",
      seoDescription:
        "Explore our catalog of aesthetic medicine treatments: facial biostimulation, hyaluronic acid, botulinum toxin, thread lifts, skinbooster, and platelet-rich plasma.",
    },
    treatmentDetail: {
      loading: "Loading treatment information…",
      loadingShort: "Loading…",
      loadError: "We couldn't load this treatment. Please try again or go back to the catalog.",
      backToCatalog: "Back to catalog",
      tabBenefits: "Benefits",
      tabProcedure: "Procedure",
      tabRecovery: "Recovery",
      tabIdealFor: "Who is it for?",
      seoFallbackDescription: "Learn about our aesthetic and anti-aging medicine treatments in detail.",
    },
    doctorPage: {
      eyebrow: "The specialist",
      firstName: "Dr. Gregorio",
      lastName: "García",
      role: "Specialist in Aesthetic & Anti-Aging Medicine",
      bio1:
        "Dr. Gregorio García is a specialist in aesthetic medicine, anti-aging, and regenerative medicine with over 8 years of experience transforming lives through precise, personalized treatments.",
      bio2:
        "His philosophy is clear: every face is unique. That's why every treatment begins with a complete medical assessment that ensures the most suitable procedure, delivering natural results that enhance — without erasing — who you are.",
      experienceYears: "+8",
      experienceLabel1: "Years of",
      experienceLabel2: "experience",
      cta: "Book your assessment",
      photoAlt: "Dr. Gregorio García",
      seoDescription:
        "Meet our aesthetic and anti-aging medicine specialist: training, clinical approach, and areas of expertise.",
    },
    home: {
      seoDescription:
        "Aesthetic and anti-aging medicine clinic in San Luis Río Colorado, Sonora. Facial biostimulation, hyaluronic acid, botulinum toxin, thread lifts, and more.",
    },
    methodPage: {
      seoDescription:
        "Discover our way of working: medical assessment, personalized diagnosis, and aesthetic medicine protocols designed for natural results.",
    },
    philosophyPage: {
      seoDescription:
        "Our philosophy: clinical precision and an aesthetic eye in service of natural results, without losing each patient's essence.",
    },
    contactPage: {
      seoDescription:
        "Book your medical assessment at Age Recovery. Reach us via WhatsApp or the form and we'll answer your questions about our treatments.",
    },
  },
};

export type TranslationDict = (typeof translations)["es"];
