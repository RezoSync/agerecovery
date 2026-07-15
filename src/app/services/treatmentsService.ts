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
}

// "Base de datos" local — el día de mañana esto se reemplaza por una
// llamada real a fetch('/api/treatments') sin tocar el resto del código.
const TREATMENTS_DB: Treatment[] = [
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
  },
];

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
export async function fetchAllTreatments(): Promise<Treatment[]> {
  await simulateNetworkDelay();
  return TREATMENTS_DB;
}

/**
 * 3. fetchTreatmentBySlug
 * Función asíncrona que busca un tratamiento por su slug (el identificador
 * usado en la URL, ej. "bioestimulacion-facial"). Lanza un error si no
 * existe, para que el componente que la llama pueda mostrar un estado
 * de "no encontrado".
 */
export async function fetchTreatmentBySlug(slug: string): Promise<Treatment> {
  await simulateNetworkDelay();
  const treatment = TREATMENTS_DB.find((t) => t.slug === slug);
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
  count = 3
): Promise<Treatment[]> {
  const candidateSlugs = TREATMENTS_DB.filter((t) => t.slug !== currentSlug)
    .slice(0, count)
    .map((t) => t.slug);

  // Promise.all: lanza todas las peticiones en paralelo y espera a que
  // todas resuelvan, en vez de esperar una por una con await secuencial.
  const relatedTreatments = await Promise.all(
    candidateSlugs.map((slug) => fetchTreatmentBySlug(slug))
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
  maxRetries = 2
): Promise<Treatment> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
    try {
      await simulateNetworkDelay();

      // Fallo simulado ~10% de las veces, para ejercitar el camino de error.
      if (Math.random() < 0.1) {
        throw new Error("Fallo de red simulado");
      }

      const treatment = TREATMENTS_DB.find((t) => t.slug === slug);
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
