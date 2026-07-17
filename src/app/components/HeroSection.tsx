import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { SplitBg, ShimmerText } from "./effects/SiteEffects";
import doctorHero from "../assets/imports/doctor-hero.jpeg";
import { useLanguage } from "../i18n/LanguageContext";

const WA = "https://wa.me/6538492893?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20cita";

export default function HeroSection() {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/*
        El fondo diagonal (SplitBg) solo se activa a partir de md.
        Motivo del bug original: el clip-path diagonal está calibrado para
        el layout de 2 columnas de escritorio; en una sola columna (mobile)
        la "zona blanca seguraq" se angosta hasta el 38% del ancho y el
        contenido de texto (a ancho completo) termina bajo el panel azul.
        En mobile la sección queda blanca y el color de marca se conserva
        dentro de la propia tarjeta de la fotografía (ver más abajo).
      */}
      <div className="absolute inset-0 hidden md:block">
        <SplitBg direction="diagonal" leftColor="#FFFFFF" rightColor="#003D6E" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-8 py-28 md:py-40 grid md:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
        {/* Contenido izquierdo: subtítulo, título, descripción, botones, stats */}
        <div
          className="flex flex-col gap-8 items-center text-center md:items-start md:text-left"
          style={{ animation: "fadeUp 0.6s 0.1s both", color: "#0D2D4F" }}
        >
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="h-px w-12 bg-cyan" />
            <span className="text-xs tracking-[0.25em] uppercase font-medium text-cyan">
              {t("hero.eyebrow")}
            </span>
          </div>

          <h1
            className="text-5xl md:text-6xl xl:text-7xl leading-[1.05] font-display"
            style={{ fontWeight: 500 }}
          >
            {t("hero.titleLine1")}
            <br />
            <ShimmerText
              className="block text-center md:text-left"
              gradient="linear-gradient(90deg,#2F6FFB,#8FB4FE,#2F6FFB)"
            >
              {t("hero.titleLine2")}
            </ShimmerText>
          </h1>

          <p className="text-base leading-relaxed max-w-md" style={{ color: "#334155" }}>
            {t("hero.description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start w-full sm:w-auto">
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-7 py-4 text-sm tracking-wider uppercase font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan/30"
              style={{ background: "#0D2D4F", color: "#ffffff", borderRadius: "2px" }}
            >
              {t("hero.bookConsult")} <ArrowRight size={16} />
            </a>
            <Link
              to="/tratamientos"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm tracking-wider uppercase font-medium transition-all"
              style={{
                background: "#ffffff",
                color: "#0D2D4F",
                border: "1px solid #B8C6E0",
                borderRadius: "2px",
              }}
            >
              {t("hero.viewTreatments")}
            </Link>
          </div>

          <div
            className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 max-w-md"
            style={{ animation: "fadeUp 0.6s 0.4s both", borderTop: "1px solid rgba(13,45,79,0.15)" }}
          >
            {[
              ["12+", t("hero.stats.years")],
              ["2,000+", t("hero.stats.patients")],
              ["100%", t("hero.stats.assessment")],
            ].map(([n, l]) => (
              <div key={l} className="flex flex-col gap-1 items-center text-center md:items-start md:text-left">
                <span className="text-xl sm:text-2xl font-semibold font-display" style={{ color: "#0D2D4F" }}>
                  {n}
                </span>
                <span className="text-xs leading-snug" style={{ color: "#64748B" }}>
                  {l}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Fotografía del médico — tarjeta premium, punto focal del Hero */}
        <div
          className="relative flex justify-center mt-16 md:mt-0 w-full justify-self-center"
          style={{ animation: "fadeUp 0.6s 0.25s both" }}
        >
          {/*
            Respaldo visual en mobile: como el SplitBg diagonal se desactiva
            antes de md, este panel reproduce el mood de marca (navy + grid +
            círculos) únicamente detrás de la fotografía, sin invadir el texto.
          */}
          <div
            className="absolute inset-0 mx-4 rounded-[28px] overflow-hidden md:hidden"
            aria-hidden="true"
          >
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(160deg,#003D6E 0%,#001B33 100%)" }}
            />
            <div
              className="absolute inset-0 opacity-70"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.06) 1px,transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <div
              className="absolute -top-10 -right-8 w-36 h-36 rounded-full"
              style={{ border: "1px solid rgba(255,255,255,0.18)" }}
            />
            <div
              className="absolute -bottom-8 -left-6 w-28 h-28 rounded-full"
              style={{ border: "1px solid rgba(255,255,255,0.12)" }}
            />
          </div>

          {/* Anillos decorativos (desktop): apoyo visual, no protagonismo */}
          <div className="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none">
            <div
              style={{
                width: "450px",
                height: "450px",
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.22)",
                animation: "pulse-ring 3s ease-out infinite",
              }}
            />
            <div
              style={{
                position: "absolute",
                width: "390px",
                height: "390px",
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.16)",
                animation: "pulse-ring 3s 1s ease-out infinite",
              }}
            />
          </div>

          {/* Contenedor con "aire" alrededor de la tarjeta */}
          <div className="relative py-10 px-6 md:p-0 w-full flex justify-center md:justify-center">
            <div
              className="relative mx-auto overflow-hidden w-full max-w-[400px] md:w-[450px] lg:w-[485px] xl:w-[510px] md:max-w-none aspect-[942/1280]"
              style={{
                borderRadius: "22px",
                border: "1px solid rgba(255,255,255,0.32)",
                boxShadow:
                  "0 45px 90px -30px rgba(0,17,33,0.6), 0 16px 32px -10px rgba(0,61,110,0.4), 0 0 0 1px rgba(255,255,255,0.04)",
                // En viewports muy anchos, el contenedor max-w-7xl queda centrado con
                // márgenes iguales, pero el corte diagonal del fondo (SplitBg) se calcula
                // sobre el 100% del viewport, no sobre el contenedor. Esto hace que el área
                // azul "real" quede desplazada hacia la derecha respecto a la columna de la
                // tarjeta. Este pequeño ajuste compensa esa diferencia para que la foto
                // quede realmente centrada dentro del azul, sin tocar tamaño ni diseño.
                transform: "translateX(max(0px, calc((100vw - 1280px) / 4)))",
              }}
            >
              <img
                src={doctorHero}
                alt={t("hero.photoAlt")}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />

              {/* Sutil sheen de vidrio: brillo diagonal muy tenue, sin "pesar" la tarjeta */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.02) 22%, transparent 45%)",
                }}
              />
              {/* Borde interior fino adicional para reforzar la profundidad/vidrio */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  borderRadius: "22px",
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.10)",
                }}
              />

              {/* Tarjeta del nombre integrada al mismo contenedor de la foto */}
              <div
                className="absolute bottom-0 inset-x-0 px-6 py-5"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(0,27,51,0.92) 0%, rgba(0,27,51,0.65) 55%, rgba(0,27,51,0) 100%)",
                  backdropFilter: "blur(2px)",
                }}
              >
                <div className="text-xs tracking-widest uppercase mb-1 text-cyan-light">
                  {t("hero.specialistLabel")}
                </div>
                <div className="text-sm md:text-base font-medium text-white font-display">
                  {t("hero.doctorName")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
