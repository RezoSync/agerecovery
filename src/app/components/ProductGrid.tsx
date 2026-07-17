import { motion } from "motion/react";
import { Link } from "react-router";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { productGridServices } from "../i18n/content";

export default function ProductGrid() {
  const { t, lang } = useLanguage();
  const services = productGridServices[lang];

  return (
    <section id="servicios" className="py-28 md:py-32 bg-navy-deep">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-cyan" />
            <span className="text-xs tracking-[0.25em] uppercase text-cyan">{t("nav.treatments")}</span>
          </div>
          <h2 className="text-4xl md:text-5xl leading-tight text-white font-display" style={{ fontWeight: 500 }}>
            {t("treatmentsList.titleLine1")}
            <br />
            {t("treatmentsList.titleLine2")}
          </h2>
          <p className="text-base text-white/60 leading-relaxed mt-5 max-w-lg">
            {t("treatmentsList.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => {
            const dark = i % 2 === 0; // alterna navy / cyan sólidos, como las dos siluetas del logo
            return (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="p-8 flex flex-col gap-5 transition-transform duration-300 hover:-translate-y-1"
                style={{ background: dark ? "#003D6E" : "#008AC4", borderRadius: "4px" }}
              >
                <div
                  className="font-display text-sm font-medium w-10 h-10 flex items-center justify-center rounded-full text-white"
                  style={{ background: dark ? "rgba(0,138,196,0.35)" : "rgba(0,61,110,0.35)" }}
                >
                  {s.num}
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg text-white font-display" style={{ fontWeight: 500 }}>
                    {s.title}
                  </h3>
                  <span className="text-xs tracking-wider uppercase" style={{ color: dark ? "#4FB8E8" : "#00243E" }}>
                    {s.sub}
                  </span>
                </div>
                <p className="text-sm leading-relaxed flex-1 text-white/80">{s.desc}</p>
                <Link
                  to={`/tratamientos/${s.slug}`}
                  className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-white transition-all duration-300"
                >
                  {t("treatment.viewDetail")} <ChevronRight size={12} />
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            to="/tratamientos"
            className="inline-flex items-center gap-3 px-8 py-4 text-sm tracking-wider uppercase font-medium transition-all hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg,#008AC4,#003D6E)", color: "#ffffff", borderRadius: "2px" }}
          >
            {t("productGrid.viewCatalog")} <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
