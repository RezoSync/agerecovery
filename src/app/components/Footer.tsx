import { Link } from "react-router";
import { Instagram, Facebook, Phone, MapPin, Clock, ArrowRight } from "lucide-react";
import logoWhite from "../assets/logo-white.png";

const INSTAGRAM = "https://www.instagram.com/dr.greg_agerecovery";
const FACEBOOK = "https://www.facebook.com/Age.recovery";
const WA = "https://wa.me/6538492893?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20cita";

const quickLinks = [
  { to: "/tratamientos", label: "Tratamientos" },
  { to: "/metodo", label: "Método" },
  { to: "/filosofia", label: "Filosofía" },
  { to: "/medico", label: "Dr. Gregorio García" },
  { to: "/contacto", label: "Contacto" },
];

const specialties = [
  "Rellenos Faciales",
  "Hilos Tensores",
  "Toxina Botulínica",
  "Láser Rejuvenecedor",
  "Medicina Regenerativa",
  "Bioestimuladores",
];

const hours: [string, string][] = [
  ["Lunes – Viernes", "9:00 – 19:00"],
  ["Sábado", "9:00 – 15:00"],
  ["Domingo", "Previa cita"],
];

/**
 * Footer enriquecido: identidad de marca, enlaces rápidos, especialidades,
 * contacto/horario y redes — sin perder la paleta navy original del sitio.
 */
export default function Footer() {
  return (
    <footer style={{ background: "#001B33" }} className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-16 pb-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-[1.3fr_0.9fr_1fr_1.1fr] gap-12 lg:gap-8">
          {/* Marca */}
          <div className="flex flex-col gap-5">
            <Link to="/" className="opacity-90 hover:opacity-100 transition-opacity w-fit">
              <img src={logoWhite} alt="Age Recovery" className="h-11 w-auto" />
            </Link>
            <p className="text-[13px] leading-relaxed text-white/55 max-w-xs">
              Medicina estética y antienvejecimiento en San Luis Río Colorado, Sonora. Diagnóstico
              clínico, biotecnología y criterio conservador en cada protocolo.
            </p>
            <div className="flex gap-3 pt-1">
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 flex items-center justify-center border border-white/15 text-white/70 hover:text-white hover:border-white/40 transition-colors"
                style={{ borderRadius: "8px" }}
              >
                <Instagram size={16} />
              </a>
              <a
                href={FACEBOOK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 flex items-center justify-center border border-white/15 text-white/70 hover:text-white hover:border-white/40 transition-colors"
                style={{ borderRadius: "8px" }}
              >
                <Facebook size={16} />
              </a>
              <a
                href="tel:6538492893"
                aria-label="Llamar"
                className="w-9 h-9 flex items-center justify-center border border-white/15 text-white/70 hover:text-white hover:border-white/40 transition-colors"
                style={{ borderRadius: "8px" }}
              >
                <Phone size={16} />
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div className="flex flex-col gap-4">
            <span className="text-[11px] tracking-[0.18em] uppercase text-cyan font-semibold">
              Enlaces rápidos
            </span>
            <nav className="flex flex-col gap-2.5">
              {quickLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="text-[13.5px] text-white/60 hover:text-white transition-colors w-fit"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Especialidades */}
          <div className="flex flex-col gap-4">
            <span className="text-[11px] tracking-[0.18em] uppercase text-cyan font-semibold">
              Especialidades
            </span>
            <ul className="flex flex-col gap-2.5">
              {specialties.map((s) => (
                <li key={s} className="text-[13.5px] text-white/60 flex items-center gap-2">
                  <span className="text-cyan text-[10px]">◆</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto y horario */}
          <div className="flex flex-col gap-5">
            <span className="text-[11px] tracking-[0.18em] uppercase text-cyan font-semibold">
              Contacto
            </span>
            <div className="flex gap-3 items-start">
              <MapPin size={15} className="text-cyan mt-0.5 shrink-0" />
              <span className="text-[13.5px] text-white/60 leading-relaxed">
                Av. Zaragoza entre calle 6 y 7, lado sur
                <br />
                San Luis Río Colorado, Sonora
              </span>
            </div>
            <div className="flex gap-3 items-start">
              <Phone size={15} className="text-cyan mt-0.5 shrink-0" />
              <a href="tel:6538492893" className="text-[13.5px] text-white/60 hover:text-white transition-colors">
                (653) 849-2893
              </a>
            </div>
            <div className="flex gap-3 items-start">
              <Clock size={15} className="text-cyan mt-0.5 shrink-0" />
              <div className="flex flex-col gap-1 text-[13px] text-white/60">
                {hours.map(([d, h]) => (
                  <div key={d} className="flex gap-2">
                    <span className="text-white/45">{d}:</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 mt-1 px-5 py-3 text-[12.5px] tracking-wider uppercase font-medium transition-all hover:-translate-y-0.5 w-fit"
              style={{ background: "linear-gradient(135deg,#008AC4,#003D6E)", color: "#fff", borderRadius: "6px" }}
            >
              Agendar cita <ArrowRight size={13} />
            </a>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-center text-white/45">
            © 2026 Age Recovery · Dr. Gregorio García · Medicina Estética y Antienvejecimiento
          </p>
          <p className="text-xs text-white/30">Cédula profesional bajo valoración médica previa</p>
        </div>
      </div>
    </footer>
  );
}
