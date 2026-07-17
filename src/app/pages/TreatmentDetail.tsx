import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { motion } from "motion/react";
import { Check, AlertTriangle } from "lucide-react";
import Layout from "../components/Layout";
import ValoracionForm from "../components/ValoracionForm";
import {
  loadTreatmentWithRetry,
  fetchRelatedTreatments,
  type Treatment,
} from "../services/treatmentsService";

export default function TreatmentDetail() {
  const { slug } = useParams<{ slug: string }>();

  const [treatment, setTreatment] = useState<Treatment | null>(null);
  const [related, setRelated] = useState<Treatment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    const currentSlug = slug;
    let isMounted = true;

    // Función asíncrona local que orquesta dos llamadas del servicio:
    // 1. loadTreatmentWithRetry: carga el tratamiento principal, con
    //    reintentos automáticos si la "red" falla.
    // 2. fetchRelatedTreatments: una vez que sabemos cuál tratamiento es,
    //    carga los relacionados EN PARALELO (Promise.all internamente).
    async function loadPageData() {
      setIsLoading(true);
      setError(null);
      setTreatment(null);

      try {
        const data = await loadTreatmentWithRetry(currentSlug, 2);
        if (!isMounted) return;
        setTreatment(data);

        const relatedData = await fetchRelatedTreatments(currentSlug, 3);
        if (!isMounted) return;
        setRelated(relatedData);
      } catch {
        if (isMounted) {
          setError(
            "No pudimos cargar este tratamiento. Por favor intenta de nuevo o regresa al catálogo."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadPageData();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  return (
    <Layout
      breadcrumbs={[
        { label: "Inicio", to: "/" },
        { label: "Tratamientos", to: "/tratamientos" },
        { label: treatment ? treatment.title : "Cargando…" },
      ]}
    >
      <section className="pt-28 md:pt-36 pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          {isLoading && (
            <div className="py-24 text-center text-white/60 text-[14px]">
              Cargando información del tratamiento…
            </div>
          )}

          {error && (
            <div className="py-24 text-center">
              <p className="text-red-600 text-[14px] mb-5">{error}</p>
              <Link
                to="/tratamientos"
                className="inline-block bg-gradient-to-br from-cyan to-navy text-white px-7 py-3 text-[13px] font-medium hover:shadow-lg hover:shadow-cyan/20 transition-all"
              >
                Volver al catálogo
              </Link>
            </div>
          )}

          {!isLoading && !error && treatment && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mb-14"
              >
                <div className="font-display text-[15px] text-cyan-light font-medium mb-4">
                  {treatment.num}
                </div>
                <h1 className="font-display font-normal text-[32px] md:text-[42px] leading-[1.16] text-white tracking-tight mb-5">
                  {treatment.title}
                </h1>
                <div className="flex gap-2 flex-wrap mb-7">
                  {treatment.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] text-cyan border border-cyan/30 bg-cyan-pale px-3 py-1.5 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-[15.5px] leading-relaxed text-white/60 font-light">
                  {treatment.fullDesc}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10 mb-16">
                <div className="bg-navy-card p-7">
                  <div className="text-[11px] tracking-wide uppercase text-cyan font-semibold mb-2">
                    Duración
                  </div>
                  <div className="font-display text-[16px] text-white">
                    {treatment.duration}
                  </div>
                </div>
                <div className="bg-navy-card p-7">
                  <div className="text-[11px] tracking-wide uppercase text-cyan font-semibold mb-2">
                    Sesiones
                  </div>
                  <div className="font-display text-[16px] text-white">
                    {treatment.sessions}
                  </div>
                </div>
                <div className="bg-navy-card p-7">
                  <div className="text-[11px] tracking-wide uppercase text-cyan font-semibold mb-2">
                    Resultados
                  </div>
                  <div className="font-display text-[16px] text-white">
                    {treatment.results}
                  </div>
                </div>
              </div>

              {/* Contenido detallado + formulario de valoración (sticky en desktop) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 mb-20 items-start">
                <div className="lg:col-span-2 flex flex-col gap-14">
                  <section>
                    <h2 className="font-display text-[20px] font-medium text-white mb-5">
                      Beneficios
                    </h2>
                    <ul className="grid sm:grid-cols-2 gap-4">
                      {treatment.benefits.map((b) => (
                        <li key={b} className="flex items-start gap-3 text-[14px] text-white/70 font-light">
                          <Check size={16} className="text-cyan shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h2 className="font-display text-[20px] font-medium text-white mb-5">
                      Procedimiento
                    </h2>
                    <p className="text-[14.5px] leading-relaxed text-white/60 font-light">
                      {treatment.procedure}
                    </p>
                  </section>

                  <section>
                    <h2 className="font-display text-[20px] font-medium text-white mb-5">
                      Recuperación
                    </h2>
                    <p className="text-[14.5px] leading-relaxed text-white/60 font-light mb-6">
                      {treatment.recovery}
                    </p>
                    <div className="text-[11px] tracking-wide uppercase text-cyan font-semibold mb-3">
                      Cuidados posteriores
                    </div>
                    <ul className="flex flex-col gap-3">
                      {treatment.aftercare.map((a) => (
                        <li key={a} className="flex items-start gap-3 text-[14px] text-white/70 font-light">
                          <Check size={16} className="text-cyan shrink-0 mt-0.5" />
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h2 className="font-display text-[20px] font-medium text-white mb-5">
                      ¿Para quién es este tratamiento?
                    </h2>
                    <ul className="flex flex-col gap-3 mb-8">
                      {treatment.idealFor.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-[14px] text-white/70 font-light">
                          <Check size={16} className="text-cyan shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="border border-white/10 bg-navy-card p-6">
                      <div className="flex items-center gap-2 text-[11px] tracking-wide uppercase text-amber-400 font-semibold mb-4">
                        <AlertTriangle size={14} />
                        Contraindicaciones
                      </div>
                      <ul className="flex flex-col gap-2.5">
                        {treatment.contraindications.map((c) => (
                          <li key={c} className="text-[13.5px] text-white/55 font-light">
                            — {c}
                          </li>
                        ))}
                      </ul>
                      <p className="text-[12px] text-white/40 font-light mt-4">
                        La valoración médica previa determina si eres candidato ideal para este
                        tratamiento.
                      </p>
                    </div>
                  </section>
                </div>

                {/* Formulario de valoración: preseleccionado con este tratamiento */}
                <div className="lg:sticky lg:top-28">
                  <ValoracionForm
                    title="Solicitar valoración"
                    presetInterest={treatment.title}
                    lockInterest
                  />
                </div>
              </div>

              {related.length > 0 && (
                <div>
                  <h2 className="font-display text-[22px] font-medium text-white mb-6">
                    Tratamientos relacionados
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {related.map((r) => (
                      <Link
                        key={r.slug}
                        to={`/tratamientos/${r.slug}`}
                        className="block border border-white/10 p-5 hover:border-cyan transition-colors group"
                      >
                        <h4 className="font-display text-[16px] font-medium text-white group-hover:text-cyan transition-colors mb-2">
                          {r.title}
                        </h4>
                        <p className="text-[12.5px] text-white/60 font-light line-clamp-2">
                          {r.shortDesc}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
