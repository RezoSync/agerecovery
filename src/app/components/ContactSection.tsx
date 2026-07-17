import { motion } from "motion/react";
import { MapPin, Phone, MessageCircle, Instagram, Facebook } from "lucide-react";
import { AuroraBg, GlowCard, Particles } from "./effects/SiteEffects";
import ValoracionForm from "./ValoracionForm";
import {
  CLINIC_CALL_DISPLAY,
  CLINIC_CALL_HREF,
  CLINIC_WHATSAPP_DISPLAY,
  CLINIC_WHATSAPP_URL,
} from "../utils/contactInfo";
import { useLanguage } from "../i18n/LanguageContext";

const WA = CLINIC_WHATSAPP_URL;
const INSTAGRAM = "https://www.instagram.com/dr.greg_agerecovery";
const FACEBOOK = "https://www.facebook.com/Age.recovery";

export default function ContactSection() {
  const { t } = useLanguage();

  const hours: [string, string][] = [
    [t("contactSection.hours.weekdays"), "9:00 – 19:00"],
    [t("contactSection.hours.saturday"), "9:00 – 15:00"],
    [t("contactSection.hours.sunday"), t("contactSection.hours.sundayNote")],
  ];

  return (
    <section id="contacto" className="relative py-28 md:py-32 overflow-hidden">
      <AuroraBg />
      <Particles count={8} />
      <div className="relative max-w-7xl mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-16 items-start">
        {/* Información */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-8"
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-cyan" />
              <span className="text-xs tracking-[0.25em] uppercase text-cyan">{t("contactSection.eyebrow")}</span>
            </div>
            <h2 className="text-4xl leading-tight text-white font-display" style={{ fontWeight: 500 }}>
              {t("contactSection.title")}
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex gap-4 items-start">
              <div className="mt-1 w-10 h-10 flex items-center justify-center border border-white/10 shrink-0" style={{ borderRadius: "2px" }}>
                <MapPin size={16} className="text-cyan" />
              </div>
              <div>
                <div className="text-sm font-medium text-white mb-1">{t("contactSection.addressLabel")}</div>
                <div className="text-sm text-white/60">
                  {t("contactSection.address")}
                  <br />
                  {t("contactSection.city")}
                </div>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="mt-1 w-10 h-10 flex items-center justify-center border border-white/10 shrink-0" style={{ borderRadius: "2px" }}>
                <Phone size={16} className="text-cyan" />
              </div>
              <div>
                <div className="text-sm font-medium text-white mb-1">{t("contactSection.callLabel")}</div>
                <a href={CLINIC_CALL_HREF} className="text-sm text-white/60 hover:text-white transition-colors">
                  {CLINIC_CALL_DISPLAY}
                </a>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="mt-1 w-10 h-10 flex items-center justify-center border border-white/10 shrink-0" style={{ borderRadius: "2px" }}>
                <MessageCircle size={16} className="text-cyan" />
              </div>
              <div>
                <div className="text-sm font-medium text-white mb-1">{t("contactSection.whatsappLabel")}</div>
                <a
                  href={WA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {CLINIC_WHATSAPP_DISPLAY}
                </a>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="mt-1 w-10 h-10 flex items-center justify-center border border-white/10 shrink-0" style={{ borderRadius: "2px" }}>
                <Instagram size={16} className="text-cyan" />
              </div>
              <div>
                <div className="text-sm font-medium text-white mb-2">{t("contactSection.socialLabel")}</div>
                <div className="flex flex-col gap-2">
                  <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors group">
                    <Instagram size={13} className="group-hover:text-pink-400 transition-colors" />
                    @dr.greg_agerecovery
                  </a>
                  <a href={FACEBOOK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors group">
                    <Facebook size={13} className="group-hover:text-blue-400 transition-colors" />
                    {t("contactSection.facebookName")}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden border border-white/10" style={{ borderRadius: "2px" }}>
            <iframe
              title={t("contactSection.mapTitle")}
              src="https://www.google.com/maps?q=Av.+Zaragoza+entre+calle+6+y+7,+San+Luis+R%C3%ADo+Colorado,+Sonora&output=embed"
              width="100%"
              height="260"
              style={{ border: 0, filter: "grayscale(0.15) contrast(1.05)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <GlowCard className="p-6">
            <div className="text-xs tracking-widest uppercase mb-4 text-cyan">{t("contactSection.hoursTitle")}</div>
            <div className="flex flex-col gap-2 text-sm text-white/60">
              {hours.map(([d, h]) => (
                <div key={d} className="flex justify-between">
                  <span>{d}</span>
                  <span className={d === t("contactSection.hours.sunday") ? "text-cyan" : ""}>{h}</span>
                </div>
              ))}
            </div>
          </GlowCard>

          <div className="flex flex-col gap-3">
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 py-4 text-sm tracking-wider uppercase font-medium transition-all hover:-translate-y-0.5"
              style={{ background: "#25D366", color: "#fff", borderRadius: "2px" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 text-sm tracking-wider uppercase font-medium transition-all hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)", color: "#fff", borderRadius: "2px" }}
              >
                <Instagram size={15} /> Instagram
              </a>
              <a
                href={FACEBOOK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 text-sm tracking-wider uppercase font-medium transition-all hover:-translate-y-0.5"
                style={{ background: "#1877F2", color: "#fff", borderRadius: "2px" }}
              >
                <Facebook size={15} /> Facebook
              </a>
            </div>
          </div>
        </motion.div>

        {/* Formulario — envía la solicitud directamente por WhatsApp (ver ValoracionForm) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <ValoracionForm />
        </motion.div>
      </div>
    </section>
  );
}
