/**
 * =============================================================================
 * SERVICIO DE TRATAMIENTOS — Age Recovery
 * =============================================================================
 *
 * Este archivo centraliza el acceso a los datos de los tratamientos faciales.
 * Aunque por ahora los datos viven en un arreglo local (TREATMENTS_DB), todas
 * las funciones están escritas como si consultaran un backend real: reciben
 * datos, simulan latencia de red con un retardo aleatorio, y devuelven
 * Promesas. Esto permite que, el día que exista una API real, solo haya que
 * reemplazar el contenido de cada función — los componentes que las consumen
 * no necesitan cambiar nada porque ya están preparados para trabajar con
 * datos asíncronos (loading / error / success).
 *
 * -----------------------------------------------------------------------------
 * ÍNDICE DE FUNCIONES ASÍNCRONAS Y PROMESAS (tarea: mínimo 5)
 * -----------------------------------------------------------------------------
 *
 * 1. simulateNetworkDelay(ms)
 *    - Tipo: función que retorna una Promesa "pura" (new Promise + setTimeout).
 *    - Qué hace: pausa la ejecución un tiempo aleatorio (300–900ms) para
 *      imitar la latencia de una llamada HTTP real. La usan internamente
 *      las demás funciones de este archivo.
 *
 * 2. fetchAllTreatments()
 *    - Tipo: async function.
 *    - Qué hace: devuelve la lista completa de tratamientos. Se usa en la
 *      página /tratamientos para pintar el catálogo completo.
 *
 * 3. fetchTreatmentBySlug(slug)
 *    - Tipo: async function con manejo de error (throw).
 *    - Qué hace: busca un tratamiento específico por su slug (identificador
 *      en la URL). Si no existe, lanza un error controlado. Se usa en la
 *      página de detalle /tratamientos/:slug.
 *
 * 4. fetchRelatedTreatments(currentSlug, count)
 *    - Tipo: async function que usa Promise.all().
 *    - Qué hace: dispara varias llamadas a fetchTreatmentBySlug() EN PARALELO
 *      (no una por una) y espera a que todas terminen con Promise.all. Se usa
 *      para mostrar "tratamientos relacionados" al fondo de cada detalle.
 *
 * 5. loadTreatmentWithRetry(slug, maxRetries)
 *    - Tipo: async function con try/catch y recursividad controlada.
 *    - Qué hace: intenta cargar un tratamiento y, si falla (la simulación de
 *      red falla ~10% de las veces a propósito), reintenta automáticamente
 *      hasta maxRetries veces antes de rendirse. Demuestra manejo de errores
 *      asíncronos en un escenario realista (red inestable).
 *
 * 6. submitContactForm(formData)
 *    - Tipo: async function.
 *    - Qué hace: valida los datos del formulario de contacto y simula el
 *      envío a un backend. Se usa en ContactSection.tsx al enviar el form.
 *
 * (Se documentan 6 funciones en total — una más del mínimo de 5 solicitado.)
 * =============================================================================
 */

export interface Treatment {
  slug: string;
  num: string;
  title: string;
  tags: string[];
  shortDesc: string;
  fullDesc: string;
  duration: string;
  sessions: string;
  results: string;
  /** Beneficios clave del tratamiento, en formato de lista. */
  benefits: string[];
  /** Cómo se lleva a cabo el procedimiento, paso a paso en prosa. */
  procedure: string;
  /** Qué esperar durante la recuperación inmediata (horas/días posteriores). */
  recovery: string;
  /** Recomendaciones de cuidado posterior. */
  aftercare: string[];
  /** Perfil de paciente ideal para este tratamiento. */
  idealFor: string[];
  /** Contraindicaciones y casos en los que no se recomienda el tratamiento. */
  contraindications: string[];
}

import type { Lang } from "../i18n/LanguageContext";

// "Base de datos" local — el día de mañana esto se reemplaza por una
// llamada real a fetch('/api/treatments') sin tocar el resto del código.
const TREATMENTS_DB_ES: Treatment[] = [
  {
    slug: "bioestimulacion-facial",
    num: "01",
    title: "Bioestimulación facial",
    tags: ["Colágeno", "Firmeza"],
    shortDesc:
      "Activa la producción natural de colágeno y elastina mediante bioestimuladores de última generación, devolviendo densidad y firmeza a la piel desde la dermis profunda.",
    fullDesc:
      "La bioestimulación facial utiliza sustancias bioactivas que estimulan a los fibroblastos de la piel para que produzcan más colágeno y elastina de forma natural. A diferencia de los rellenos, no añade volumen: mejora la calidad estructural de la piel desde dentro, logrando un efecto de firmeza progresivo y duradero a lo largo de varias semanas.",
    duration: "45 minutos por sesión",
    sessions: "3 a 4 sesiones, separadas por 3-4 semanas",
    results: "Visibles a partir de la 2da sesión, óptimos a los 3 meses",
    benefits: [
      "Estimula la producción natural de colágeno y elastina",
      "Mejora la firmeza y densidad de la piel desde la dermis profunda",
      "Textura más uniforme y luminosa",
      "Efecto progresivo y de aspecto natural, sin volumen añadido",
    ],
    procedure:
      "Tras limpiar la piel y aplicar anestesia tópica, se administra el bioestimulador mediante microinyecciones distribuidas estratégicamente en las zonas a tratar. El procedimiento es ambulatorio y no requiere incisiones ni sedación.",
    recovery:
      "Puede haber enrojecimiento leve, pequeñas pápulas o sensibilidad en los puntos de inyección durante 24-48 horas. La mayoría de los pacientes retoma su rutina el mismo día.",
    aftercare: [
      "Evitar exposición solar directa y usar protector solar SPF 50+",
      "No aplicar maquillaje en las primeras 12 horas",
      "Evitar sauna, ejercicio intenso y alcohol durante 48 horas",
      "Mantener buena hidratación de la piel",
    ],
    idealFor: [
      "Pacientes con signos iniciales de flacidez o pérdida de firmeza",
      "Quienes buscan prevenir el envejecimiento sin cambiar volúmenes faciales",
      "Piel con textura opaca o irregular",
    ],
    contraindications: [
      "Embarazo o lactancia",
      "Infecciones activas en la zona a tratar",
      "Enfermedades autoinmunes no controladas",
      "Alergia conocida a los componentes del producto",
    ],
  },
  {
    slug: "acido-hialuronico",
    num: "02",
    title: "Ácido hialurónico de alta densidad",
    tags: ["Volumen", "Contorno"],
    shortDesc:
      "Restauración de volumen en pómulos, óvalo facial y surcos nasogenianos con técnica de microcánula, priorizando resultados naturales y proporcionados.",
    fullDesc:
      "Usamos ácido hialurónico reticulado de alta densidad, aplicado con técnica de microcánula para minimizar hematomas y maximizar precisión. El objetivo es restaurar volúmenes perdidos por el envejecimiento natural —pómulos, óvalo facial, surcos— sin alterar la expresividad ni la identidad del rostro.",
    duration: "30-50 minutos según zona",
    sessions: "1 sesión, con posible retoque a las 4 semanas",
    results: "Inmediatos, con asentamiento final a las 2 semanas",
    benefits: [
      "Restaura volumen perdido en pómulos, óvalo facial y surcos",
      "Técnica de microcánula: menos hematomas, mayor precisión",
      "Resultado inmediato y completamente reversible",
      "Respeta la expresividad y proporciones naturales del rostro",
    ],
    procedure:
      "Se aplica anestesia tópica y, mediante microcánula o aguja fina según la zona, se inyecta ácido hialurónico reticulado de alta densidad en los puntos de volumen previamente marcados en la valoración. El especialista trabaja por capas para lograr un resultado armónico.",
    recovery:
      "Es normal presentar hinchazón leve y algún hematoma puntual durante 3-5 días. El volumen definitivo se aprecia una vez que baja la inflamación, alrededor de la segunda semana.",
    aftercare: [
      "Aplicar frío local las primeras horas si hay inflamación",
      "Evitar masajear la zona tratada durante 48 horas",
      "No exponerse a calor extremo (sauna, sol directo) por una semana",
      "Evitar antiinflamatorios no indicados por el médico los primeros días",
    ],
    idealFor: [
      "Pacientes con pérdida de volumen en pómulos, mentón o surcos nasogenianos",
      "Quienes buscan definir el contorno facial de forma sutil",
      "Resultados naturales sin cirugía",
    ],
    contraindications: [
      "Embarazo o lactancia",
      "Infecciones activas o inflamación en la zona a tratar",
      "Trastornos de coagulación",
      "Alergia conocida al ácido hialurónico",
    ],
  },
  {
    slug: "toxina-botulinica",
    num: "03",
    title: "Toxina botulínica terapéutica",
    tags: ["Líneas de expresión", "Prevención"],
    shortDesc:
      "Suaviza líneas dinámicas en frente, entrecejo y patas de gallo, con dosificación milimétrica que respeta la expresividad natural del rostro.",
    fullDesc:
      "Aplicamos toxina botulínica con dosificación milimétrica y personalizada según la musculatura facial de cada paciente. El objetivo nunca es la inmovilidad, sino suavizar las líneas de expresión dinámicas manteniendo la capacidad de expresar emociones de forma natural.",
    duration: "20 minutos",
    sessions: "1 sesión cada 4-6 meses",
    results: "Visibles a partir del día 3, completos a los 14 días",
    benefits: [
      "Suaviza líneas de expresión dinámicas (frente, entrecejo, patas de gallo)",
      "Dosificación milimétrica y personalizada, sin perder expresividad",
      "Procedimiento rápido, sin tiempo de recuperación",
      "También previene la formación de nuevas líneas de expresión",
    ],
    procedure:
      "Con el rostro en reposo y en gesto, se marcan los puntos de aplicación según la musculatura de cada paciente. La toxina se administra con aguja ultrafina en microdosis; el procedimiento no requiere anestesia.",
    recovery:
      "Sin tiempo de inactividad: la mayoría de los pacientes regresa a sus actividades de inmediato. Puede haber enrojecimiento puntual leve que desaparece en minutos u horas.",
    aftercare: [
      "Permanecer en posición vertical durante 4 horas tras la aplicación",
      "Evitar tocar o masajear la zona tratada el mismo día",
      "No hacer ejercicio intenso ni exponerse a calor extremo por 24 horas",
      "Evitar acostarse boca abajo el día del procedimiento",
    ],
    idealFor: [
      "Líneas de expresión dinámicas visibles al gesticular",
      "Pacientes que buscan prevención desde etapas tempranas",
      "Quienes desean un resultado natural, sin perder movilidad facial",
    ],
    contraindications: [
      "Embarazo o lactancia",
      "Enfermedades neuromusculares (ej. miastenia gravis)",
      "Infección activa en la zona a tratar",
      "Alergia conocida a la toxina botulínica",
    ],
  },
  {
    slug: "hilos-tensores",
    num: "04",
    title: "Hilos tensores PDO",
    tags: ["Lifting", "Sin cirugía"],
    shortDesc:
      "Efecto lifting inmediato y progresivo mediante hilos reabsorbibles que estimulan colágeno nuevo mientras reposicionan tejidos descendidos.",
    fullDesc:
      "Los hilos de PDO (polidioxanona) son completamente reabsorbibles y se insertan mediante cánulas finas para reposicionar tejidos descendidos, generando además un estímulo mecánico que activa la producción de colágeno nuevo en la zona tratada durante los meses siguientes.",
    duration: "40-60 minutos",
    sessions: "1 sesión, efecto sostenido 12-18 meses",
    results: "Lifting inmediato visible, mejora progresiva en 8 semanas",
    benefits: [
      "Efecto lifting inmediato sin cirugía ni incisiones",
      "Reposiciona tejidos descendidos del óvalo facial",
      "Estimula colágeno nuevo de forma continua tras la aplicación",
      "Hilos 100% reabsorbibles, sin dejar material permanente",
    ],
    procedure:
      "Con anestesia local, se insertan cánulas finas siguiendo vectores de tensión previamente diseñados para cada rostro. Los hilos de PDO quedan anclados bajo la piel, elevando y reafirmando el tejido tratado.",
    recovery:
      "Puede haber inflamación, sensibilidad o pequeños hematomas durante 3-7 días, además de una leve sensación de tirantez que es normal y esperada mientras el tejido se adapta.",
    aftercare: [
      "Evitar movimientos amplios de masticación y gestos exagerados por 1 semana",
      "Dormir boca arriba durante los primeros días",
      "No aplicar masajes faciales ni tratamientos estéticos en la zona por 3-4 semanas",
      "Evitar procedimientos dentales no urgentes durante 2 semanas",
    ],
    idealFor: [
      "Flacidez moderada del óvalo facial, mejillas o cejas",
      "Pacientes que buscan efecto lifting sin cirugía",
      "Piel con buena calidad pero descenso de tejidos",
    ],
    contraindications: [
      "Embarazo o lactancia",
      "Trastornos de coagulación",
      "Infecciones activas en la zona a tratar",
      "Piel muy fina o con exceso de flacidez severa (candidato a cirugía)",
    ],
  },
  {
    slug: "skinbooster",
    num: "05",
    title: "Skinbooster y mesoterapia",
    tags: ["Hidratación profunda", "Luminosidad"],
    shortDesc:
      "Hidratación intradérmica de larga duración que mejora textura, elasticidad y luminosidad sin alterar volúmenes faciales.",
    fullDesc:
      "Los skinboosters son microinyecciones de ácido hialurónico no reticulado distribuidas uniformemente en la dermis, mejorando la hidratación profunda, la textura y la luminosidad de la piel sin generar volumen. Ideal como tratamiento de mantenimiento entre protocolos mayores.",
    duration: "30 minutos",
    sessions: "3 sesiones mensuales, mantenimiento cada 6 meses",
    results: "Luminosidad visible desde la 1ra sesión",
    benefits: [
      "Hidratación intradérmica profunda y de larga duración",
      "Mejora textura, elasticidad y luminosidad de la piel",
      "No añade volumen: ideal como mantenimiento entre protocolos mayores",
      "Aplicable en rostro, cuello y escote",
    ],
    procedure:
      "Se aplican microinyecciones de ácido hialurónico no reticulado, distribuidas uniformemente en la dermis mediante técnica de puntos o microcánula, según la zona y sensibilidad del paciente.",
    recovery:
      "Puede haber pequeñas pápulas o enrojecimiento que desaparecen en 24-48 horas. No hay tiempo de inactividad y la mayoría retoma su rutina de inmediato.",
    aftercare: [
      "Evitar maquillaje durante las primeras 12 horas",
      "Usar protector solar SPF 50+ a diario",
      "Mantener la piel bien hidratada con productos suaves",
      "Evitar exfoliantes o ácidos fuertes por 48 horas",
    ],
    idealFor: [
      "Piel deshidratada, opaca o con textura irregular",
      "Pacientes que buscan luminosidad sin cambiar volúmenes",
      "Como complemento de mantenimiento entre otros tratamientos",
    ],
    contraindications: [
      "Embarazo o lactancia",
      "Infecciones activas en la zona a tratar",
      "Alergia conocida al ácido hialurónico",
      "Trastornos de coagulación no controlados",
    ],
  },
  {
    slug: "plasma-rico-plaquetas",
    num: "06",
    title: "Rejuvenecimiento con plasma rico en plaquetas",
    tags: ["Regeneración celular", "100% autólogo"],
    shortDesc:
      "Tu propio plasma concentrado, reinyectado para acelerar la regeneración celular y mejorar la calidad general de la piel de forma biocompatible.",
    fullDesc:
      "Extraemos una muestra de tu propia sangre y la procesamos para concentrar las plaquetas, ricas en factores de crecimiento. Al reinyectar este plasma autólogo en el rostro, se acelera la regeneración celular natural, mejorando textura, luminosidad y firmeza sin ningún material ajeno al cuerpo.",
    duration: "50 minutos (incluye extracción y procesamiento)",
    sessions: "3 sesiones, separadas por 4 semanas",
    results: "Progresivos, óptimos a los 2-3 meses",
    benefits: [
      "100% autólogo: tu propio plasma, sin materiales ajenos al cuerpo",
      "Acelera la regeneración celular natural de la piel",
      "Mejora textura, luminosidad y firmeza de forma progresiva",
      "Muy baja probabilidad de reacciones alérgicas por ser material propio",
    ],
    procedure:
      "Se extrae una muestra de sangre del paciente y se centrifuga para concentrar las plaquetas ricas en factores de crecimiento. Ese plasma se reinyecta en el rostro mediante microinyecciones o microneedling, según el protocolo indicado.",
    recovery:
      "Es común presentar enrojecimiento tipo 'efecto vampiro' e hinchazón leve durante 24-48 horas. La piel puede sentirse tirante los primeros días mientras se regenera.",
    aftercare: [
      "Evitar maquillaje durante las primeras 24 horas",
      "Usar protector solar SPF 50+ estrictamente",
      "No aplicar productos con ácidos o retinoides por 3-4 días",
      "Mantener buena hidratación oral y tópica",
    ],
    idealFor: [
      "Pacientes que buscan regeneración y mejora general de la piel",
      "Piel con signos de fatiga, deshidratación o pérdida de luminosidad",
      "Quienes prefieren tratamientos 100% biocompatibles",
    ],
    contraindications: [
      "Trastornos de coagulación o enfermedades hematológicas",
      "Infecciones activas o enfermedades de la piel en la zona a tratar",
      "Embarazo o lactancia",
      "Tratamiento con anticoagulantes no controlado",
    ],
  },
];

const TREATMENTS_DB_EN: Treatment[] = [
  {
    slug: "bioestimulacion-facial",
    num: "01",
    title: "Facial Biostimulation",
    tags: ["Collagen", "Firmness"],
    shortDesc:
      "Activates the natural production of collagen and elastin with next-generation biostimulators, restoring density and firmness to the skin from deep within the dermis.",
    fullDesc:
      "Facial biostimulation uses bioactive substances that stimulate skin fibroblasts to naturally produce more collagen and elastin. Unlike fillers, it doesn't add volume: it improves the skin's structural quality from within, achieving a progressive, long-lasting firming effect over several weeks.",
    duration: "45 minutes per session",
    sessions: "3 to 4 sessions, spaced 3-4 weeks apart",
    results: "Visible from the 2nd session, optimal at 3 months",
    benefits: [
      "Stimulates natural collagen and elastin production",
      "Improves skin firmness and density from deep within the dermis",
      "More even, luminous texture",
      "Progressive, natural-looking effect, with no added volume",
    ],
    procedure:
      "After cleansing the skin and applying topical anesthesia, the biostimulator is administered via microinjections strategically distributed across the treatment areas. The procedure is outpatient and requires no incisions or sedation.",
    recovery:
      "Mild redness, small papules, or tenderness at the injection points may occur for 24-48 hours. Most patients resume their routine the same day.",
    aftercare: [
      "Avoid direct sun exposure and use SPF 50+ sunscreen",
      "Do not apply makeup for the first 12 hours",
      "Avoid sauna, intense exercise, and alcohol for 48 hours",
      "Keep skin well hydrated",
    ],
    idealFor: [
      "Patients with early signs of sagging or loss of firmness",
      "Those looking to prevent aging without changing facial volumes",
      "Skin with a dull or uneven texture",
    ],
    contraindications: [
      "Pregnancy or breastfeeding",
      "Active infections in the treatment area",
      "Uncontrolled autoimmune diseases",
      "Known allergy to the product's components",
    ],
  },
  {
    slug: "acido-hialuronico",
    num: "02",
    title: "High-Density Hyaluronic Acid",
    tags: ["Volume", "Contour"],
    shortDesc:
      "Volume restoration in cheekbones, facial oval, and nasolabial folds using microcannula technique, prioritizing natural, proportionate results.",
    fullDesc:
      "We use high-density cross-linked hyaluronic acid, applied with microcannula technique to minimize bruising and maximize precision. The goal is to restore volume lost to natural aging — cheekbones, facial oval, folds — without altering the face's expressiveness or identity.",
    duration: "30-50 minutes depending on the area",
    sessions: "1 session, with a possible touch-up at 4 weeks",
    results: "Immediate, with final settling at 2 weeks",
    benefits: [
      "Restores lost volume in cheekbones, facial oval, and folds",
      "Microcannula technique: less bruising, greater precision",
      "Immediate, fully reversible result",
      "Respects the face's natural expressiveness and proportions",
    ],
    procedure:
      "Topical anesthesia is applied and, using a microcannula or fine needle depending on the area, high-density cross-linked hyaluronic acid is injected at the volume points previously marked during the assessment. The specialist works in layers to achieve a harmonious result.",
    recovery:
      "Mild swelling and occasional bruising for 3-5 days is normal. The final volume is visible once the swelling subsides, around the second week.",
    aftercare: [
      "Apply local cold in the first few hours if there's swelling",
      "Avoid massaging the treated area for 48 hours",
      "Avoid extreme heat (sauna, direct sun) for a week",
      "Avoid anti-inflammatories not prescribed by the doctor for the first few days",
    ],
    idealFor: [
      "Patients with volume loss in cheekbones, chin, or nasolabial folds",
      "Those looking to subtly define facial contour",
      "Natural results without surgery",
    ],
    contraindications: [
      "Pregnancy or breastfeeding",
      "Active infections or inflammation in the treatment area",
      "Coagulation disorders",
      "Known allergy to hyaluronic acid",
    ],
  },
  {
    slug: "toxina-botulinica",
    num: "03",
    title: "Therapeutic Botulinum Toxin",
    tags: ["Expression lines", "Prevention"],
    shortDesc:
      "Softens dynamic lines on the forehead, glabella, and crow's feet, with millimetric dosing that respects the face's natural expressiveness.",
    fullDesc:
      "We apply botulinum toxin with millimetric, personalized dosing based on each patient's facial musculature. The goal is never immobility, but rather softening dynamic expression lines while preserving the ability to express emotions naturally.",
    duration: "20 minutes",
    sessions: "1 session every 4-6 months",
    results: "Visible from day 3, complete at 14 days",
    benefits: [
      "Softens dynamic expression lines (forehead, glabella, crow's feet)",
      "Millimetric, personalized dosing, without losing expressiveness",
      "Quick procedure, no recovery time",
      "Also prevents new expression lines from forming",
    ],
    procedure:
      "With the face at rest and in motion, application points are marked according to each patient's musculature. The toxin is administered with an ultra-fine needle in microdoses; the procedure requires no anesthesia.",
    recovery:
      "No downtime: most patients return to their activities immediately. There may be mild, localized redness that disappears within minutes or hours.",
    aftercare: [
      "Stay upright for 4 hours after application",
      "Avoid touching or massaging the treated area the same day",
      "No intense exercise or extreme heat exposure for 24 hours",
      "Avoid lying face down on the day of the procedure",
    ],
    idealFor: [
      "Visible dynamic expression lines when gesturing",
      "Patients seeking prevention from early stages",
      "Those wanting a natural result without losing facial mobility",
    ],
    contraindications: [
      "Pregnancy or breastfeeding",
      "Neuromuscular diseases (e.g. myasthenia gravis)",
      "Active infection in the treatment area",
      "Known allergy to botulinum toxin",
    ],
  },
  {
    slug: "hilos-tensores",
    num: "04",
    title: "PDO Thread Lift",
    tags: ["Lifting", "No surgery"],
    shortDesc:
      "Immediate and progressive lifting effect through absorbable threads that stimulate new collagen while repositioning sagging tissue.",
    fullDesc:
      "PDO (polydioxanone) threads are completely absorbable and are inserted using fine cannulas to reposition sagging tissue, while also generating a mechanical stimulus that activates new collagen production in the treated area over the following months.",
    duration: "40-60 minutes",
    sessions: "1 session, effect lasting 12-18 months",
    results: "Immediate visible lift, progressive improvement over 8 weeks",
    benefits: [
      "Immediate lifting effect with no surgery or incisions",
      "Repositions sagging tissue in the facial oval",
      "Continuously stimulates new collagen after application",
      "100% absorbable threads, no permanent material left behind",
    ],
    procedure:
      "With local anesthesia, fine cannulas are inserted along tension vectors designed for each face. The PDO threads anchor beneath the skin, lifting and firming the treated tissue.",
    recovery:
      "There may be swelling, tenderness, or small bruises for 3-7 days, along with a mild feeling of tightness that is normal and expected as the tissue adapts.",
    aftercare: [
      "Avoid wide chewing movements and exaggerated gestures for 1 week",
      "Sleep face-up for the first few days",
      "No facial massages or aesthetic treatments in the area for 3-4 weeks",
      "Avoid non-urgent dental procedures for 2 weeks",
    ],
    idealFor: [
      "Moderate sagging of the facial oval, cheeks, or brows",
      "Patients seeking a lifting effect without surgery",
      "Good-quality skin with tissue descent",
    ],
    contraindications: [
      "Pregnancy or breastfeeding",
      "Coagulation disorders",
      "Active infections in the treatment area",
      "Very thin skin or severe sagging (candidate for surgery)",
    ],
  },
  {
    slug: "skinbooster",
    num: "05",
    title: "Skinbooster & Mesotherapy",
    tags: ["Deep hydration", "Radiance"],
    shortDesc:
      "Long-lasting intradermal hydration that improves texture, elasticity, and radiance without altering facial volumes.",
    fullDesc:
      "Skinboosters are microinjections of non-cross-linked hyaluronic acid distributed evenly in the dermis, improving deep hydration, texture, and skin radiance without adding volume. Ideal as a maintenance treatment between major protocols.",
    duration: "30 minutes",
    sessions: "3 monthly sessions, maintenance every 6 months",
    results: "Visible radiance from the 1st session",
    benefits: [
      "Deep, long-lasting intradermal hydration",
      "Improves skin texture, elasticity, and radiance",
      "Adds no volume: ideal as maintenance between major protocols",
      "Can be applied to face, neck, and décolleté",
    ],
    procedure:
      "Microinjections of non-cross-linked hyaluronic acid are applied, distributed evenly in the dermis using a point or microcannula technique, depending on the area and the patient's sensitivity.",
    recovery:
      "There may be small papules or redness that disappear within 24-48 hours. There's no downtime and most patients resume their routine immediately.",
    aftercare: [
      "Avoid makeup for the first 12 hours",
      "Use SPF 50+ sunscreen daily",
      "Keep skin well hydrated with gentle products",
      "Avoid exfoliants or strong acids for 48 hours",
    ],
    idealFor: [
      "Dehydrated, dull, or unevenly textured skin",
      "Patients seeking radiance without changing volumes",
      "As a maintenance complement between other treatments",
    ],
    contraindications: [
      "Pregnancy or breastfeeding",
      "Active infections in the treatment area",
      "Known allergy to hyaluronic acid",
      "Uncontrolled coagulation disorders",
    ],
  },
  {
    slug: "plasma-rico-plaquetas",
    num: "06",
    title: "Platelet-Rich Plasma Rejuvenation",
    tags: ["Cellular regeneration", "100% autologous"],
    shortDesc:
      "Your own concentrated plasma, reinjected to accelerate cellular regeneration and improve overall skin quality in a biocompatible way.",
    fullDesc:
      "We draw a sample of your own blood and process it to concentrate the platelets, rich in growth factors. Reinjecting this autologous plasma into the face accelerates natural cellular regeneration, improving texture, radiance, and firmness with no material foreign to the body.",
    duration: "50 minutes (includes draw and processing)",
    sessions: "3 sessions, spaced 4 weeks apart",
    results: "Progressive, optimal at 2-3 months",
    benefits: [
      "100% autologous: your own plasma, no foreign materials",
      "Accelerates the skin's natural cellular regeneration",
      "Progressively improves texture, radiance, and firmness",
      "Very low likelihood of allergic reactions, as it's your own material",
    ],
    procedure:
      "A blood sample is drawn from the patient and centrifuged to concentrate the platelets rich in growth factors. That plasma is reinjected into the face via microinjections or microneedling, depending on the indicated protocol.",
    recovery:
      "It's common to have redness (the \"vampire facial\" effect) and mild swelling for 24-48 hours. Skin may feel tight for the first few days while it regenerates.",
    aftercare: [
      "Avoid makeup for the first 24 hours",
      "Strictly use SPF 50+ sunscreen",
      "Do not apply products with acids or retinoids for 3-4 days",
      "Maintain good oral and topical hydration",
    ],
    idealFor: [
      "Patients seeking regeneration and overall skin improvement",
      "Skin showing signs of fatigue, dehydration, or dullness",
      "Those who prefer 100% biocompatible treatments",
    ],
    contraindications: [
      "Coagulation disorders or hematologic diseases",
      "Active infections or skin conditions in the treatment area",
      "Pregnancy or breastfeeding",
      "Uncontrolled anticoagulant treatment",
    ],
  },
];

function getDb(lang: Lang): Treatment[] {
  return lang === "en" ? TREATMENTS_DB_EN : TREATMENTS_DB_ES;
}

/**
 * 1. simulateNetworkDelay
 * Retorna una Promesa que se resuelve después de un retardo aleatorio,
 * simulando la latencia de una petición de red real.
 */
function simulateNetworkDelay(minMs = 300, maxMs = 900): Promise<void> {
  const delay = Math.floor(Math.random() * (maxMs - minMs)) + minMs;
  return new Promise((resolve) => setTimeout(resolve, delay));
}

/**
 * 2. fetchAllTreatments
 * Función asíncrona que devuelve el catálogo completo de tratamientos.
 * Usada por la página /tratamientos para listar todas las opciones.
 */
export async function fetchAllTreatments(lang: Lang = "es"): Promise<Treatment[]> {
  await simulateNetworkDelay();
  return getDb(lang);
}

/**
 * 3. fetchTreatmentBySlug
 * Función asíncrona que busca un tratamiento por su slug (el identificador
 * usado en la URL, ej. "bioestimulacion-facial"). Lanza un error si no
 * existe, para que el componente que la llama pueda mostrar un estado
 * de "no encontrado".
 */
export async function fetchTreatmentBySlug(slug: string, lang: Lang = "es"): Promise<Treatment> {
  await simulateNetworkDelay();
  const treatment = getDb(lang).find((t) => t.slug === slug);
  if (!treatment) {
    throw new Error(`No se encontró el tratamiento con slug "${slug}"`);
  }
  return treatment;
}

/**
 * 4. fetchRelatedTreatments
 * Función asíncrona que obtiene varios tratamientos relacionados a uno
 * dado, EXCLUYÉNDOLO de los resultados. Lo interesante: en vez de pedir
 * los tratamientos relacionados uno por uno (secuencial, lento), dispara
 * todas las promesas a la vez y usa Promise.all para esperarlas en
 * paralelo, lo cual es más eficiente cuando las peticiones son independientes.
 */
export async function fetchRelatedTreatments(
  currentSlug: string,
  count = 3,
  lang: Lang = "es"
): Promise<Treatment[]> {
  const candidateSlugs = getDb(lang)
    .filter((t) => t.slug !== currentSlug)
    .slice(0, count)
    .map((t) => t.slug);

  // Promise.all: lanza todas las peticiones en paralelo y espera a que
  // todas resuelvan, en vez de esperar una por una con await secuencial.
  const relatedTreatments = await Promise.all(
    candidateSlugs.map((slug) => fetchTreatmentBySlug(slug, lang))
  );

  return relatedTreatments;
}

/**
 * 5. loadTreatmentWithRetry
 * Función asíncrona con manejo robusto de errores: simula una red poco
 * confiable (falla ~10% de las veces a propósito) y reintenta
 * automáticamente hasta maxRetries veces antes de propagar el error final.
 * Demuestra el patrón try/catch + reintento, común en apps que consumen
 * APIs reales sujetas a fallos intermitentes.
 */
export async function loadTreatmentWithRetry(
  slug: string,
  maxRetries = 2,
  lang: Lang = "es"
): Promise<Treatment> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
    try {
      await simulateNetworkDelay();

      // Fallo simulado ~10% de las veces, para ejercitar el camino de error.
      if (Math.random() < 0.1) {
        throw new Error("Fallo de red simulado");
      }

      const treatment = getDb(lang).find((t) => t.slug === slug);
      if (!treatment) {
        throw new Error(`No se encontró el tratamiento con slug "${slug}"`);
      }

      return treatment;
    } catch (err) {
      lastError = err as Error;
      if (import.meta.env.DEV) {
        console.warn(
          `[loadTreatmentWithRetry] Intento ${attempt} falló para "${slug}": ${lastError.message}`
        );
      }
    }
  }

  throw new Error(
    `No se pudo cargar el tratamiento "${slug}" después de ${maxRetries + 1} intentos: ${lastError?.message}`
  );
}

/**
 * 6. submitContactForm
 * Función asíncrona que valida y "envía" los datos del formulario de
 * valoración inicial. Simula la respuesta de un backend (200ms-1s de
 * latencia) y puede fallar de forma controlada si los datos no son válidos.
 */
export interface ContactFormData {
  name: string;
  phone: string;
  interest: string;
}

export async function submitContactForm(
  formData: ContactFormData
): Promise<{ success: true; message: string }> {
  // Validación síncrona antes de "enviar" (defensa en profundidad: el
  // formulario ya valida en ContactSection.tsx, pero el servicio nunca debe
  // confiar únicamente en la validación de UI).
  const name = formData.name.trim();
  const phoneDigits = formData.phone.replace(/\D/g, "");

  if (!name || !phoneDigits) {
    throw new Error("Nombre y teléfono son obligatorios.");
  }
  if (name.length < 2 || name.length > 60) {
    throw new Error("El nombre debe tener entre 2 y 60 caracteres.");
  }
  if (phoneDigits.length !== 10) {
    throw new Error("El teléfono debe tener 10 dígitos.");
  }

  await simulateNetworkDelay(400, 1000);

  // Aquí, en producción, iría: await fetch('/api/contacto', { method: 'POST', body: ... })
  // Nota: no se registran datos personales (nombre/teléfono) en la consola
  // del navegador para evitar exponer información del usuario.

  return {
    success: true,
    message: `Gracias, ${name}. Te contactaremos pronto para tu valoración de "${formData.interest}".`,
  };
}
