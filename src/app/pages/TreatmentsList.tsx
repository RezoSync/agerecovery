import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Loader2, ChevronRight } from "lucide-react";
import Layout from "../components/Layout";
import {
  fetchAllTreatments,
  type Treatment,
} from "../services/treatmentsService";

export default function TreatmentsList() {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    // Función asíncrona local: carga el catálogo completo al montar la página.
    // Se declara dentro del efecto (patrón estándar de React) y llama a
    // fetchAllTreatments(), una de las funciones documentadas del servicio.
    async function loadTreatments() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchAllTreatments();
        if (isMounted) {
          setTreatments(data);
        }
      } catch {
        if (isMounted) {
          setError("No se pudieron cargar los tratamientos. Intenta de nuevo.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadTreatments();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Layout breadcrumbs={[{ label: "Inicio", to: "/" }, { label: "Tratamientos" }]}>
      <section className="pt-28 md:pt-36 pb-28 px-6 md:px-8 bg-navy-deep">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-3 mb-16 max-w-2xl">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-cyan" />
              <span className="text-xs tracking-[0.25em] uppercase text-cyan">Tratamientos</span>
            </div>
            <h1 className="text-4xl md:text-5xl leading-tight text-white font-display" style={{ fontWeight: 500 }}>
              Ciencia al servicio
              <br />
              de tu belleza
            </h1>
            <p className="text-base max-w-lg mt-2 text-white/60">
              Explora cada protocolo en detalle: duración, número de sesiones y tiempos de
              resultado esperados. Cada tratamiento incluye valoración médica previa.
            </p>
          </div>

          {isLoading && (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Loader2 size={32} className="animate-spin text-cyan" />
              <span className="text-sm tracking-wider uppercase text-white/60">
                Cargando tratamientos…
              </span>
            </div>
          )}

          {error && (
            <div className="py-20 text-center text-red-400 text-sm">{error}</div>
          )}

          {!isLoading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {treatments.map((t, i) => {
                const dark = i % 2 === 0; // alterna navy / cyan sólidos, como las dos siluetas del logo
                return (
                  <motion.div
                    key={t.slug}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                  >
                    <Link
                      to={`/tratamientos/${t.slug}`}
                      className="p-8 flex flex-col gap-5 h-full transition-transform duration-300 hover:-translate-y-1"
                      style={{ background: dark ? "#003D6E" : "#008AC4", borderRadius: "4px" }}
                    >
                      <div
                        className="font-display text-sm font-medium w-10 h-10 flex items-center justify-center rounded-full text-white"
                        style={{ background: dark ? "rgba(0,138,196,0.35)" : "rgba(0,61,110,0.35)" }}
                      >
                        {t.num}
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-lg text-white font-display" style={{ fontWeight: 500 }}>
                          {t.title}
                        </h3>
                      </div>
                      <p className="text-sm leading-relaxed flex-1 text-white/80">{t.shortDesc}</p>
                      <div className="flex gap-2 flex-wrap">
                        {t.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10.5px] text-white/90 border border-white/25 px-2.5 py-1 rounded-full font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/15">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-white font-medium">{t.duration}</span>
                          <span className="text-[10px] tracking-wider uppercase text-white/60">Duración</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-white font-medium">{t.sessions}</span>
                          <span className="text-[10px] tracking-wider uppercase text-white/60">Sesiones</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-white font-medium">{t.results}</span>
                          <span className="text-[10px] tracking-wider uppercase text-white/60">Resultados</span>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-white">
                        Ver detalle <ChevronRight size={12} />
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}

          <div className="mt-16 flex justify-center">
            <a
              href="https://wa.me/6538492893?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20cita"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 text-sm tracking-wider uppercase font-medium transition-all hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg,#008AC4,#003D6E)", color: "#ffffff", borderRadius: "2px" }}
            >
              Agenda tu valoración gratuita
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
