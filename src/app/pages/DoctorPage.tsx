import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Layout from "../components/Layout";
import { useSEO } from "../hooks/useSEO";
import doctorPortrait from "../assets/imports/doctor-portrait.jpeg";
import { useLanguage } from "../i18n/LanguageContext";
import { specialties } from "../i18n/content";

const WA = "https://wa.me/6538492893?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20cita";

export default function DoctorPage() {
  const { t, lang } = useLanguage();

  useSEO({
    title: "Dr. Gregorio García",
    description: t("doctorPage.seoDescription"),
    path: "/medico",
  });

  return (
    <Layout breadcrumbs={[{ label: t("nav.home"), to: "/" }, { label: "Dr. Gregorio García" }]}>
      <section className="relative pt-28 md:pt-36 pb-28 px-6 md:px-8 overflow-hidden">
        {/* split horizontal: mitad clara (foto) / mitad navy (texto), como el "expediente" del especialista */}
        <div className="absolute inset-0 hidden md:block">
          <div className="absolute inset-y-0 left-0 w-1/2" style={{ background: "#EAE6DC" }}>
            <div
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(0,61,110,0.14) 1.5px, transparent 1.5px)",
                backgroundSize: "22px 22px",
              }}
            />
          </div>
          <div className="absolute inset-y-0 right-0 w-1/2 bg-navy" />
        </div>
        <div className="absolute inset-0 md:hidden bg-navy" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-16 items-center">
          {/* Foto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div
              className="relative overflow-hidden"
              style={{ borderRadius: "18px", boxShadow: "0 30px 60px -20px rgba(0,27,51,0.35)" }}
            >
              <img
                src={doctorPortrait}
                alt={t("doctorPage.photoAlt")}
                className="w-full max-w-lg mx-auto object-cover"
                style={{ aspectRatio: "3/4", objectFit: "cover", borderRadius: "18px" }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: "linear-gradient(90deg,transparent,rgba(0,138,196,0.7),transparent)",
                  animation: "scanline 4s linear infinite",
                }}
              />
            </div>
            <div
              className="absolute -bottom-6 -right-6 w-48 h-48 border hidden md:block"
              style={{ borderColor: "rgba(0,61,110,0.2)", borderRadius: "18px" }}
            />
            <div
              className="absolute -top-4 -left-4 w-24 h-24 border"
              style={{ borderColor: "rgba(0,138,196,0.3)", borderRadius: "18px" }}
            />
            <div
              className="absolute -bottom-5 left-4 md:left-8 bg-white px-5 py-3 hidden sm:flex items-center gap-3"
              style={{ borderRadius: "10px", boxShadow: "0 14px 30px -10px rgba(0,27,51,0.28)" }}
            >
              <span className="text-2xl font-display text-navy" style={{ fontWeight: 600 }}>
                {t("doctorPage.experienceYears")}
              </span>
              <span className="text-[11px] leading-tight text-ink-soft uppercase tracking-wide">
                {t("doctorPage.experienceLabel1")}
                <br />
                {t("doctorPage.experienceLabel2")}
              </span>
            </div>
          </motion.div>

          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-col gap-8"
          >
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-cyan-light" />
              <span className="text-xs tracking-[0.25em] uppercase text-cyan-light">{t("doctorPage.eyebrow")}</span>
            </div>
            <h1 className="text-4xl md:text-5xl leading-tight text-white font-display" style={{ fontWeight: 500 }}>
              {t("doctorPage.firstName")}
              <br />
              <span className="text-cyan-light">{t("doctorPage.lastName")}</span>
            </h1>
            <p className="text-sm tracking-wider uppercase text-white/70">{t("doctorPage.role")}</p>
            <div className="flex flex-col gap-5 text-sm leading-relaxed text-white/80">
              <p>{t("doctorPage.bio1")}</p>
              <p>{t("doctorPage.bio2")}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              {specialties[lang].map((s) => (
                <div key={s} className="flex items-center gap-2 text-xs text-white/80">
                  <span className="text-cyan-light">◆</span>
                  {s}
                </div>
              ))}
            </div>

            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-7 py-4 text-sm tracking-wider uppercase font-medium w-fit transition-all hover:-translate-y-0.5 mt-2"
              style={{ background: "#ffffff", color: "#003D6E", borderRadius: "2px" }}
            >
              {t("doctorPage.cta")} <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
