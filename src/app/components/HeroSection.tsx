import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { SplitBg, ShimmerText } from "./effects/SiteEffects";
import doctorHero from "../assets/imports/doctor-hero.jpeg";

const WA = "https://wa.me/6538492893?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20cita";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <SplitBg direction="diagonal" leftColor="#FFFFFF" rightColor="#003D6E" />
      <div className="relative max-w-7xl mx-auto px-6 md:px-8 py-32 md:py-40 grid md:grid-cols-2 gap-12 items-center w-full">
        {/* Contenido izquierdo */}
        <div
          className="flex flex-col gap-8"
          style={{ animation: "fadeUp 0.6s 0.1s both", color: "#0D2D4F" }}
        >
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-cyan" />
            <span className="text-xs tracking-[0.25em] uppercase font-medium text-cyan">
              Medicina Estética &amp; Antienvejecimiento
            </span>
          </div>

          <h1
            className="text-5xl md:text-6xl xl:text-7xl leading-[1.05] font-display"
            style={{ fontWeight: 500 }}
          >
            Tu mejor
            <br />
            versión,
            <br />
            <ShimmerText gradient="linear-gradient(90deg,#2F6FFB,#8FB4FE,#2F6FFB)">
              revelada.
            </ShimmerText>
          </h1>

          <p className="text-base leading-relaxed max-w-md" style={{ color: "#334155" }}>
            El Dr. Gregorio García combina precisión clínica con visión estética
            para resultados completamente naturales. Cada tratamiento, diseñado
            exclusivamente para ti.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-7 py-4 text-sm tracking-wider uppercase font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan/30"
              style={{ background: "#0D2D4F", color: "#ffffff", borderRadius: "2px" }}
            >
              Agenda tu consulta <ArrowRight size={16} />
            </a>
            <Link
              to="/tratamientos"
              className="inline-flex items-center gap-2 px-7 py-4 text-sm tracking-wider uppercase font-medium transition-all"
              style={{
                background: "#ffffff",
                color: "#0D2D4F",
                border: "1px solid #B8C6E0",
                borderRadius: "2px",
              }}
            >
              Ver tratamientos
            </Link>
          </div>

          <div
            className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 max-w-md"
            style={{ animation: "fadeUp 0.6s 0.4s both", borderTop: "1px solid rgba(13,45,79,0.15)" }}
          >
            {[
              ["12+", "Años de experiencia"],
              ["2,000+", "Pacientes satisfechos"],
              ["100%", "Valoración previa"],
            ].map(([n, l]) => (
              <div key={l} className="flex flex-col gap-1">
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

        {/* Foto del doctor */}
        <div
          className="relative flex justify-center md:justify-end"
          style={{ animation: "fadeUp 0.6s 0.25s both" }}
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              style={{
                width: "320px",
                height: "320px",
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.25)",
                animation: "pulse-ring 3s ease-out infinite",
              }}
            />
            <div
              style={{
                position: "absolute",
                width: "280px",
                height: "280px",
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.18)",
                animation: "pulse-ring 3s 1s ease-out infinite",
              }}
            />
          </div>
          <div className="relative">
            <div
              className="absolute -top-4 -right-4 w-full h-full border"
              style={{ borderColor: "rgba(255,255,255,0.3)", borderRadius: "2px" }}
            />
            <img
              src={doctorHero}
              alt="Dr. Gregorio García"
              className="relative w-72 md:w-80 object-cover object-top"
              style={{ borderRadius: "2px", maxHeight: "520px" }}
            />
            <div
              className="absolute -bottom-5 -left-5 px-5 py-4 border"
              style={{ background: "#003D6E", borderColor: "rgba(255,255,255,0.15)", borderRadius: "2px" }}
            >
              <div className="text-xs tracking-widest uppercase mb-1 text-cyan-light">Especialista</div>
              <div className="text-sm font-medium text-white font-display">Dr. Gregorio García</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
