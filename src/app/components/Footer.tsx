import { Link } from "react-router";
import { Instagram, Facebook, Phone, MessageCircle, MapPin, Clock, ArrowRight } from "lucide-react";
import logoWhite from "../assets/logo-white.png";
import {
  CLINIC_CALL_DISPLAY,
  CLINIC_CALL_HREF,
  CLINIC_WHATSAPP_DISPLAY,
  CLINIC_WHATSAPP_URL,
} from "../utils/contactInfo";
import { useLanguage } from "../i18n/LanguageContext";
import { specialties } from "../i18n/content";

const INSTAGRAM = "https://www.instagram.com/dr.greg_agerecovery";
const FACEBOOK = "https://www.facebook.com/Age.recovery";
const WA = CLINIC_WHATSAPP_URL;

/**
 * Footer enriquecido: identidad de marca, enlaces rápidos, especialidades,
 * contacto/horario y redes — sin perder la paleta navy original del sitio.
 */
export default function Footer() {
  const { t, lang } = useLanguage();

  const quickLinks = [
    { to: "/tratamientos", label: t("nav.treatments") },
    { to: "/metodo", label: t("nav.method") },
    { to: "/filosofia", label: t("nav.philosophy") },
    { to: "/medico", label: t("nav.about") },
    { to: "/contacto", label: t("nav.contact") },
  ];

  const hours: [string, string][] = [
    [t("footer.hours.weekdays"), "9:00 – 19:00"],
    [t("footer.hours.saturday"), "9:00 – 15:00"],
    [t("footer.hours.sunday"), t("footer.hours.sundayNote")],
  ];

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
              {t("footer.description")}
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
                href={CLINIC_CALL_HREF}
                aria-label={t("header.callTitle")}
                title={t("header.callTitle")}
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
              {t("footer.quickLinks")}
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
              {t("footer.specialties")}
            </span>
            <ul className="flex flex-col gap-2.5">
              {specialties[lang].map((s) => (
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
              {t("footer.contact")}
            </span>
            <div className="flex gap-3 items-start">
              <MapPin size={15} className="text-cyan mt-0.5 shrink-0" />
              <span className="text-[13.5px] text-white/60 leading-relaxed">
                {t("footer.address")}
                <br />
                {t("footer.city")}
              </span>
            </div>
            <div className="flex gap-3 items-start">
              <Phone size={15} className="text-cyan mt-0.5 shrink-0" />
              <div className="flex flex-col">
                <span className="text-[11px] text-white/40">{t("footer.callLabel")}</span>
                <a href={CLINIC_CALL_HREF} className="text-[13.5px] text-white/60 hover:text-white transition-colors">
                  {CLINIC_CALL_DISPLAY}
                </a>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <MessageCircle size={15} className="text-cyan mt-0.5 shrink-0" />
              <div className="flex flex-col">
                <span className="text-[11px] text-white/40">{t("footer.whatsappLabel")}</span>
                <a
                  href={WA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13.5px] text-white/60 hover:text-white transition-colors"
                >
                  {CLINIC_WHATSAPP_DISPLAY}
                </a>
              </div>
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
              {t("footer.bookAppointment")} <ArrowRight size={13} />
            </a>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-center text-white/45">{t("footer.copyright")}</p>
          <p className="text-xs text-white/30">{t("footer.license")}</p>
        </div>
      </div>
    </footer>
  );
}
