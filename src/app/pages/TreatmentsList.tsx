import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Loader2, ChevronRight } from "lucide-react";
import Layout from "../components/Layout";
import { useSEO } from "../hooks/useSEO";
import {
  fetchAllTreatments,
  type Treatment,
} from "../services/treatmentsService";
import { useLanguage } from "../i18n/LanguageContext";

export default function TreatmentsList() {
  const { t, lang } = useLanguage();

  useSEO({
    title: t("treatmentsList.seoTitle"),
    description: t("treatmentsList.seoDescription"),
    path: "/tratamientos",
  });

  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    // Función asíncrona local: carga el catálogo completo al montar la página
    // (o al cambiar de idioma). Se declara dentro del efecto (patrón estándar
    // de React) y llama a fetchAllTreatments(), una de las funciones
    // documentadas del servicio.
    async function loadTreatments() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchAllTreatments(lang);
        if (isMounted) {
          setTreatments(data);
        }
      } catch {
        if (isMounted) {
          setError(t("treatmentsList.loadError"));
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
  }, [lang, t]);

  return (
    <Layout breadcrumbs={[{ label: t("nav.home"), to: "/" }, { label: t("nav.treatments") }]}>
      <section className="pt-28 md:pt-36 pb-28 px-6 md:px-8 bg-navy-deep">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-3 mb-16 max-w-2xl">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-cyan" />
              <span className="text-xs tracking-[0.25em] uppercase text-cyan">{t("treatmentsList.eyebrow")}</span>
            </div>
            <h1 className="text-4xl md:text-5xl leading-tight text-white font-display" style={{ fontWeight: 500 }}>
              {t("treatmentsList.titleLine1")}
              <br />
              {t("treatmentsList.titleLine2")}
            </h1>
            <p className="text-base max-w-lg mt-2 text-white/60">{t("treatmentsList.description")}</p>
          </div>

          {isLoading && (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Loader2 size={32} className="animate-spin text-cyan" />
              <span className="text-sm tracking-wider uppercase text-white/60">{t("treatmentsList.loading")}</span>
            </div>
          )}

          {error && (
            <div className="py-20 text-center text-red-400 text-sm">{error}</div>
          )}

          {!isLoading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {treatments.map((tr, i) => {
                const dark = i % 2 === 0; // alterna navy / cyan sólidos, como las dos siluetas del logo
                return (
                  <motion.div
                    key={tr.slug}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                  >
                    <Link
                      to={`/tratamientos/${tr.slug}`}
                      className="p-8 flex flex-col gap-5 h-full transition-transform duration-300 hover:-translate-y-1"
                      style={{ background: dark ? "#003D6E" : "#008AC4", borderRadius: "4px" }}
                    >
                      <div
                        className="font-display text-sm font-medium w-10 h-10 flex items-center justify-center rounded-full text-white"
                        style={{ background: dark ? "rgba(0,138,196,0.35)" : "rgba(0,61,110,0.35)" }}
                      >
                        {tr.num}
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-lg text-white font-display" style={{ fontWeight: 500 }}>
                          {tr.title}
                        </h3>
                      </div>
                      <p className="text-sm leading-relaxed flex-1 text-white/80">{tr.shortDesc}</p>
                      <div className="flex gap-2 flex-wrap">
                        {tr.tags.map((tag) => (
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
                          <span className="text-sm text-white font-medium">{tr.duration}</span>
                          <span className="text-[10px] tracking-wider uppercase text-white/60">{t("treatment.duration")}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-white font-medium">{tr.sessions}</span>
                          <span className="text-[10px] tracking-wider uppercase text-white/60">{t("treatment.sessions")}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-white font-medium">{tr.results}</span>
                          <span className="text-[10px] tracking-wider uppercase text-white/60">{t("treatment.results")}</span>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-white">
                        {t("treatment.viewDetail")} <ChevronRight size={12} />
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
              {t("treatmentsList.bookFree")}
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
