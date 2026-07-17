/**
 * Contenido largo (párrafos, catálogos, testimonios) en ambos idiomas.
 * Se mantiene separado de translations.ts porque son bloques de texto
 * más extensos, no simples labels de interfaz.
 */
import type { Lang } from "./LanguageContext";

export const specialties: Record<Lang, string[]> = {
  es: [
    "Rellenos Faciales",
    "Hilos Tensores",
    "Toxina Botulínica",
    "Láser Rejuvenecedor",
    "Medicina Regenerativa",
    "Bioestimuladores",
  ],
  en: [
    "Facial Fillers",
    "Thread Lifts",
    "Botulinum Toxin",
    "Rejuvenating Laser",
    "Regenerative Medicine",
    "Biostimulators",
  ],
};

interface ProductGridService {
  num: string;
  slug: string;
  title: string;
  sub: string;
  desc: string;
}

export const productGridServices: Record<Lang, ProductGridService[]> = {
  es: [
    {
      num: "01",
      slug: "bioestimulacion-facial",
      title: "Bioestimulación facial",
      sub: "Colágeno & Firmeza",
      desc: "Activa la producción natural de colágeno y elastina mediante bioestimuladores de última generación, devolviendo densidad y firmeza a la piel desde la dermis profunda.",
    },
    {
      num: "02",
      slug: "acido-hialuronico",
      title: "Ácido hialurónico de alta densidad",
      sub: "Volumen & Contorno",
      desc: "Restauración de volumen en pómulos, óvalo facial y surcos nasogenianos con técnica de microcánula, priorizando resultados naturales y proporcionados.",
    },
    {
      num: "03",
      slug: "toxina-botulinica",
      title: "Toxina botulínica terapéutica",
      sub: "Líneas de expresión",
      desc: "Suaviza líneas dinámicas en frente, entrecejo y patas de gallo, con dosificación milimétrica que respeta la expresividad natural del rostro.",
    },
    {
      num: "04",
      slug: "hilos-tensores",
      title: "Hilos tensores PDO",
      sub: "Lifting sin cirugía",
      desc: "Efecto lifting inmediato y progresivo mediante hilos reabsorbibles que estimulan colágeno nuevo mientras reposicionan tejidos descendidos.",
    },
    {
      num: "05",
      slug: "skinbooster",
      title: "Skinbooster y mesoterapia",
      sub: "Hidratación profunda",
      desc: "Hidratación intradérmica de larga duración que mejora textura, elasticidad y luminosidad sin alterar volúmenes faciales.",
    },
    {
      num: "06",
      slug: "plasma-rico-plaquetas",
      title: "Plasma rico en plaquetas",
      sub: "Regeneración celular",
      desc: "Tu propio plasma concentrado, reinyectado para acelerar la regeneración celular y mejorar la calidad general de la piel de forma biocompatible.",
    },
  ],
  en: [
    {
      num: "01",
      slug: "bioestimulacion-facial",
      title: "Facial Biostimulation",
      sub: "Collagen & Firmness",
      desc: "Activates the natural production of collagen and elastin with next-generation biostimulators, restoring density and firmness to the skin from deep within the dermis.",
    },
    {
      num: "02",
      slug: "acido-hialuronico",
      title: "High-Density Hyaluronic Acid",
      sub: "Volume & Contour",
      desc: "Volume restoration in cheekbones, facial oval, and nasolabial folds using microcannula technique, prioritizing natural, proportionate results.",
    },
    {
      num: "03",
      slug: "toxina-botulinica",
      title: "Therapeutic Botulinum Toxin",
      sub: "Expression lines",
      desc: "Softens dynamic lines on the forehead, glabella, and crow's feet, with millimetric dosing that respects the face's natural expressiveness.",
    },
    {
      num: "04",
      slug: "hilos-tensores",
      title: "PDO Thread Lift",
      sub: "Lifting without surgery",
      desc: "Immediate and progressive lifting effect through absorbable threads that stimulate new collagen while repositioning sagging tissue.",
    },
    {
      num: "05",
      slug: "skinbooster",
      title: "Skinbooster & Mesotherapy",
      sub: "Deep hydration",
      desc: "Long-lasting intradermal hydration that improves texture, elasticity, and radiance without altering facial volumes.",
    },
    {
      num: "06",
      slug: "plasma-rico-plaquetas",
      title: "Platelet-Rich Plasma",
      sub: "Cellular regeneration",
      desc: "Your own concentrated plasma, reinjected to accelerate cellular regeneration and improve overall skin quality in a biocompatible way.",
    },
  ],
};

interface ResultsTab {
  label: string;
  title: string;
  sub: string;
  points: string[];
}

export const resultsTabs: Record<Lang, ResultsTab[]> = {
  es: [
    {
      label: "Relleno de Labios",
      title: "Relleno de Labios",
      sub: "Antes & Después con Ácido Hialurónico",
      points: ["Resultados inmediatos", "Duración hasta 12 meses", "Técnica indolora", "Sin tiempo de recuperación"],
    },
    {
      label: "Toxina Botulínica",
      title: "Toxina Botulínica",
      sub: "Tratamiento de frente y contorno",
      points: ["Efecto en 72 horas", "Duración 4–6 meses", "Técnica ultra-precisa", "Movimiento facial preservado"],
    },
    {
      label: "En Procedimiento",
      title: "Precisión Clínica",
      sub: "Procedimiento en clínica",
      points: ["Protocolos certificados", "Materiales premium", "Ambiente esterilizado", "Seguimiento post-procedimiento"],
    },
  ],
  en: [
    {
      label: "Lip Filler",
      title: "Lip Filler",
      sub: "Before & After with Hyaluronic Acid",
      points: ["Immediate results", "Lasts up to 12 months", "Painless technique", "No recovery time"],
    },
    {
      label: "Botulinum Toxin",
      title: "Botulinum Toxin",
      sub: "Forehead and contour treatment",
      points: ["Effect within 72 hours", "Lasts 4–6 months", "Ultra-precise technique", "Facial movement preserved"],
    },
    {
      label: "In Procedure",
      title: "Clinical Precision",
      sub: "In-clinic procedure",
      points: ["Certified protocols", "Premium materials", "Sterilized environment", "Post-procedure follow-up"],
    },
  ],
};

interface Testimonial {
  name: string;
  age: string;
  svc: string;
  text: string;
  stars: number;
}

export const testimonials: Record<Lang, Testimonial[]> = {
  es: [
    {
      name: "María R.",
      age: "48 años",
      svc: "Rellenos Faciales",
      text: "El especialista transformó mi rostro de manera increíble. Sus manos son expertas y los resultados son totalmente naturales. Me siento 10 años más joven.",
      stars: 5,
    },
    {
      name: "Claudia M.",
      age: "52 años",
      svc: "Hilos Tensores",
      text: "Venía con muchas dudas sobre los hilos tensores y el doctor me explicó todo con mucha paciencia. El resultado superó todas mis expectativas.",
      stars: 5,
    },
    {
      name: "Patricia L.",
      age: "44 años",
      svc: "Botox",
      text: "Llevo 3 años siendo paciente de Age Recovery y no cambiaría a nadie. Su técnica es impecable y siempre mantiene los gestos naturales.",
      stars: 5,
    },
  ],
  en: [
    {
      name: "María R.",
      age: "48 years old",
      svc: "Facial Fillers",
      text: "The specialist transformed my face in an incredible way. His hands are expert and the results are completely natural. I feel 10 years younger.",
      stars: 5,
    },
    {
      name: "Claudia M.",
      age: "52 years old",
      svc: "Thread Lifts",
      text: "I came in with a lot of doubts about thread lifts and the doctor explained everything to me very patiently. The result exceeded all my expectations.",
      stars: 5,
    },
    {
      name: "Patricia L.",
      age: "44 years old",
      svc: "Botox",
      text: "I've been a patient at Age Recovery for 3 years and I wouldn't trust anyone else. His technique is impeccable and always keeps expressions natural.",
      stars: 5,
    },
  ],
};

export const resultsSectionCopy: Record<
  Lang,
  { eyebrow: string; title: string; sliderHint: string; bookConsult: string; testimonialsEyebrow: string; viewAll: string }
> = {
  es: {
    eyebrow: "Resultados reales",
    title: "Antes & Después",
    sliderHint: "Arrastra el slider para comparar antes y después",
    bookConsult: "Agendar consulta",
    testimonialsEyebrow: "Testimonios",
    viewAll: "Ver todos los tratamientos",
  },
  en: {
    eyebrow: "Real results",
    title: "Before & After",
    sliderHint: "Drag the slider to compare before and after",
    bookConsult: "Book consultation",
    testimonialsEyebrow: "Testimonials",
    viewAll: "View all treatments",
  },
};

export const philosophyCopy: Record<
  Lang,
  {
    imageAlt: string;
    badgeName: string;
    badgeStatus: string;
    eyebrow: string;
    heading: string;
    p1: string;
    p2: string;
    signatureName: string;
    signatureSub: string;
    quote: string;
    quoteCite: string;
  }
> = {
  es: {
    imageAlt: "Nuestro especialista aplicando un tratamiento en Age Recovery",
    badgeName: "Age Recovery",
    badgeStatus: "En consulta",
    eyebrow: "Nuestra filosofía",
    heading: "No tratamos arrugas. Tratamos el proceso completo de envejecimiento.",
    p1: "Creemos que la medicina estética facial bien hecha no se nota como intervención: se nota como descanso, como salud, como una versión de ti con más energía celular.",
    p2: "Por eso cada protocolo en Age Recovery combina diagnóstico clínico, biotecnología y un criterio estético conservador — el mismo que aplicaríamos en nuestra propia piel.",
    signatureName: "Age Recovery",
    signatureSub: "Medicina estética y antienvejecimiento",
    quote:
      "\"Lo que más valoro de Age Recovery es que nunca buscan que te veas distinta — buscan que te veas descansada. Eso es lo que diferencia un buen diagnóstico de uno genérico.\"",
    quoteCite: "Paciente de bioestimulación facial, 3 sesiones",
  },
  en: {
    imageAlt: "Our specialist performing a treatment at Age Recovery",
    badgeName: "Age Recovery",
    badgeStatus: "In consultation",
    eyebrow: "Our philosophy",
    heading: "We don't treat wrinkles. We treat the entire aging process.",
    p1: "We believe that facial aesthetic medicine done right doesn't look like intervention: it looks like rest, like health, like a version of you with more cellular energy.",
    p2: "That's why every protocol at Age Recovery combines clinical diagnosis, biotechnology, and a conservative aesthetic judgment — the same we'd apply to our own skin.",
    signatureName: "Age Recovery",
    signatureSub: "Aesthetic & anti-aging medicine",
    quote:
      "\"What I value most about Age Recovery is that they never try to make you look different — they try to make you look rested. That's what sets a good diagnosis apart from a generic one.\"",
    quoteCite: "Facial biostimulation patient, 3 sessions",
  },
};

interface MethodStep {
  num: string;
  title: string;
  desc: string;
}

export const videoSectionCopy: Record<Lang, { eyebrow: string; heading: string; description: string; steps: MethodStep[] }> = {
  es: {
    eyebrow: "Nuestro método",
    heading: "Cuatro fases, un solo objetivo: resultados predecibles.",
    description: "Ningún protocolo se aplica sin pasar por este proceso. Es lo que separa un resultado natural de uno evidente.",
    steps: [
      { num: "01", title: "Diagnóstico", desc: "Análisis de biotipo cutáneo, estructura ósea y patrón de envejecimiento facial individual." },
      { num: "02", title: "Diseño facial", desc: "Plan de tratamiento trazado sobre proporciones propias del rostro, no sobre estándares externos." },
      { num: "03", title: "Aplicación", desc: "Ejecución con técnica de microcánula y dosificación progresiva, priorizando seguridad clínica." },
      { num: "04", title: "Seguimiento", desc: "Control de evolución a los 15 y 30 días para ajustar el protocolo de mantenimiento." },
    ],
  },
  en: {
    eyebrow: "Our method",
    heading: "Four phases, one goal: predictable results.",
    description: "No protocol is applied without going through this process. It's what separates a natural result from an obvious one.",
    steps: [
      { num: "01", title: "Diagnosis", desc: "Analysis of skin biotype, bone structure, and individual facial aging pattern." },
      { num: "02", title: "Facial design", desc: "Treatment plan mapped onto the face's own proportions, not external standards." },
      { num: "03", title: "Application", desc: "Performed with microcannula technique and progressive dosing, prioritizing clinical safety." },
      { num: "04", title: "Follow-up", desc: "Progress checks at 15 and 30 days to adjust the maintenance protocol." },
    ],
  },
};

interface GalleryItemCopy {
  title: string;
  tag: string;
}

// El orden debe coincidir exactamente con el arreglo `items` de MethodGallery.tsx
export const methodGalleryItems: Record<Lang, GalleryItemCopy[]> = {
  es: [
    { title: "Toxina Botulínica", tag: "Frente y contorno" },
    { title: "Relleno de Labios", tag: "Ácido hialurónico" },
    { title: "Rinomodelación", tag: "Perfilado no quirúrgico" },
    { title: "Relleno de Ojera", tag: "Corrección de volumen" },
    { title: "Perfilado Mandibular", tag: "Definición y marcaje" },
    { title: "Relleno de Surcos", tag: "Líneas de expresión" },
    { title: "Relleno de Pómulos", tag: "Volumen y definición" },
    { title: "Tratamientos Capilares", tag: "Factores de crecimiento" },
    { title: "Rejuvenecimiento de Manos", tag: "Radiesse" },
    { title: "Microdermabrasión", tag: "Renovación de piel" },
    { title: "Escleroterapia", tag: "Venas varicosas y de araña" },
  ],
  en: [
    { title: "Botulinum Toxin", tag: "Forehead and contour" },
    { title: "Lip Filler", tag: "Hyaluronic acid" },
    { title: "Non-surgical Rhinoplasty", tag: "Non-surgical contouring" },
    { title: "Under-eye Filler", tag: "Volume correction" },
    { title: "Jawline Contouring", tag: "Definition and marking" },
    { title: "Nasolabial Fold Filler", tag: "Expression lines" },
    { title: "Cheekbone Filler", tag: "Volume and definition" },
    { title: "Hair Treatments", tag: "Growth factors" },
    { title: "Hand Rejuvenation", tag: "Radiesse" },
    { title: "Microdermabrasion", tag: "Skin renewal" },
    { title: "Sclerotherapy", tag: "Varicose and spider veins" },
  ],
};

export const methodGalleryCopy: Record<
  Lang,
  { eyebrow: string; heading: string; description: string; badge: string; viewAll: string }
> = {
  es: {
    eyebrow: "Resultados reales",
    heading: "Cada protocolo, documentado paso a paso.",
    description: "Una muestra de procedimientos realizados en clínica, con seguimiento fotográfico real de nuestros pacientes.",
    badge: "Antes / Después",
    viewAll: "Ver todos los tratamientos",
  },
  en: {
    eyebrow: "Real results",
    heading: "Every protocol, documented step by step.",
    description: "A sample of procedures performed in clinic, with real photographic follow-up of our patients.",
    badge: "Before / After",
    viewAll: "View all treatments",
  },
};
