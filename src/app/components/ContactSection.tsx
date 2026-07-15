import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { MapPin, Phone, Instagram, Facebook, CheckCircle2, Send, Loader2 } from "lucide-react";
import { submitContactForm } from "../services/treatmentsService";
import { AuroraBg, GlowCard, Particles } from "./effects/SiteEffects";
import { FIELD_LIMITS, sanitizeText, validateName, validatePhone } from "../utils/validation";

const WA = "https://wa.me/6538492893?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20cita";
const INSTAGRAM = "https://www.instagram.com/dr.greg_agerecovery";
const FACEBOOK = "https://www.facebook.com/Age.recovery";

const treatmentOptions = [
  "Bioestimulación facial",
  "Ácido hialurónico",
  "Toxina botulínica",
  "Hilos tensores",
  "Skinbooster",
  "No estoy seguro / quiero diagnóstico",
];

type SubmitState = "idle" | "loading" | "success" | "error";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState(treatmentOptions[0]);
  const [status, setStatus] = useState<SubmitState>("idle");
  const [feedback, setFeedback] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; phone?: string }>({});

  // Handler asíncrono del formulario: valida y sanitiza los datos localmente,
  // llama a submitContactForm (una de las funciones documentadas en
  // services/treatmentsService.ts), maneja el estado de carga mientras
  // "viaja" la solicitud, y muestra éxito o error según la respuesta.
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Evita doble envío: si ya hay una solicitud en curso, no se hace nada.
    if (status === "loading") return;

    const nameError = validateName(name);
    const phoneError = validatePhone(phone);
    if (nameError || phoneError) {
      setFieldErrors({ name: nameError ?? undefined, phone: phoneError ?? undefined });
      return;
    }
    setFieldErrors({});
    setStatus("loading");
    setFeedback("");

    try {
      const result = await submitContactForm({
        name: sanitizeText(name),
        phone: phone.replace(/\D/g, ""),
        interest,
      });
      setStatus("success");
      setFeedback(result.message);
      setName("");
      setPhone("");
    } catch (err) {
      setStatus("error");
      setFeedback(err instanceof Error ? err.message : "Ocurrió un error al enviar tu solicitud.");
    }
  }

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
              <span className="text-xs tracking-[0.25em] uppercase text-cyan">Encuéntranos</span>
            </div>
            <h2 className="text-4xl leading-tight text-white font-display" style={{ fontWeight: 500 }}>
              Visítanos en clínica
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex gap-4 items-start">
              <div className="mt-1 w-10 h-10 flex items-center justify-center border border-white/10 shrink-0" style={{ borderRadius: "2px" }}>
                <MapPin size={16} className="text-cyan" />
              </div>
              <div>
                <div className="text-sm font-medium text-white mb-1">Dirección</div>
                <div className="text-sm text-white/60">
                  Av. Zaragoza entre calle 6 y 7, lado sur
                  <br />
                  San Luis Río Colorado, Sonora
                </div>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="mt-1 w-10 h-10 flex items-center justify-center border border-white/10 shrink-0" style={{ borderRadius: "2px" }}>
                <Phone size={16} className="text-cyan" />
              </div>
              <div>
                <div className="text-sm font-medium text-white mb-1">Teléfono / WhatsApp</div>
                <a href="tel:6538492893" className="text-sm text-white/60 hover:text-white transition-colors">
                  (653) 849-2893
                </a>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="mt-1 w-10 h-10 flex items-center justify-center border border-white/10 shrink-0" style={{ borderRadius: "2px" }}>
                <Instagram size={16} className="text-cyan" />
              </div>
              <div>
                <div className="text-sm font-medium text-white mb-2">Redes Sociales</div>
                <div className="flex flex-col gap-2">
                  <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors group">
                    <Instagram size={13} className="group-hover:text-pink-400 transition-colors" />
                    @dr.greg_agerecovery
                  </a>
                  <a href={FACEBOOK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors group">
                    <Facebook size={13} className="group-hover:text-blue-400 transition-colors" />
                    Age Recovery
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden border border-white/10" style={{ borderRadius: "2px" }}>
            <iframe
              title="Ubicación Age Recovery"
              src="https://www.google.com/maps?q=Av.+Zaragoza+entre+calle+6+y+7,+San+Luis+R%C3%ADo+Colorado,+Sonora&output=embed"
              width="100%"
              height="260"
              style={{ border: 0, filter: "grayscale(0.15) contrast(1.05)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <GlowCard className="p-6">
            <div className="text-xs tracking-widest uppercase mb-4 text-cyan">Horario de atención</div>
            <div className="flex flex-col gap-2 text-sm text-white/60">
              {[
                ["Lunes – Viernes", "9:00 – 19:00"],
                ["Sábado", "9:00 – 15:00"],
                ["Domingo", "Previa cita"],
              ].map(([d, h]) => (
                <div key={d} className="flex justify-between">
                  <span>{d}</span>
                  <span className={d === "Domingo" ? "text-cyan" : ""}>{h}</span>
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

        {/* Formulario — misma lógica de envío (submitContactForm) que ya existía */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <GlowCard className="p-8">
            <h3 className="text-2xl mb-6 text-white font-display">Solicitar información</h3>

            {status === "success" ? (
              <div className="flex flex-col items-center gap-4 py-12">
                <CheckCircle2 size={48} className="text-cyan" />
                <div className="text-center">
                  <div className="text-lg font-medium mb-1 text-white font-display">¡Mensaje enviado!</div>
                  <div className="text-sm text-white/60">{feedback}</div>
                </div>
                <button onClick={() => setStatus("idle")} className="mt-2 text-xs tracking-wider uppercase text-cyan">
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs tracking-wider uppercase text-white/60">
                    Nombre completo
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Tu nombre"
                    required
                    minLength={FIELD_LIMITS.name.min}
                    maxLength={FIELD_LIMITS.name.max}
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={status === "loading"}
                    aria-invalid={Boolean(fieldErrors.name)}
                    aria-describedby={fieldErrors.name ? "name-error" : undefined}
                    className="px-4 py-3 text-sm outline-none focus:border-cyan/50 transition-colors disabled:opacity-60"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: `1px solid ${fieldErrors.name ? "#f87171" : "rgba(255,255,255,0.08)"}`,
                      borderRadius: "2px",
                      color: "#fff",
                    }}
                  />
                  {fieldErrors.name && (
                    <p id="name-error" className="text-xs text-red-400">
                      {fieldErrors.name}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-xs tracking-wider uppercase text-white/60">
                    Teléfono / WhatsApp
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="(653) 000-0000"
                    required
                    inputMode="numeric"
                    maxLength={20}
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={status === "loading"}
                    aria-invalid={Boolean(fieldErrors.phone)}
                    aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
                    className="px-4 py-3 text-sm outline-none focus:border-cyan/50 transition-colors disabled:opacity-60"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: `1px solid ${fieldErrors.phone ? "#f87171" : "rgba(255,255,255,0.08)"}`,
                      borderRadius: "2px",
                      color: "#fff",
                    }}
                  />
                  {fieldErrors.phone && (
                    <p id="phone-error" className="text-xs text-red-400">
                      {fieldErrors.phone}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="interest" className="text-xs tracking-wider uppercase text-white/60">
                    Tratamiento de interés
                  </label>
                  <select
                    id="interest"
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    disabled={status === "loading"}
                    className="px-4 py-3 text-sm outline-none focus:border-cyan/50 transition-colors disabled:opacity-60"
                    style={{ background: "#06263F", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "2px", color: "#fff" }}
                  >
                    {treatmentOptions.map((s) => (
                      <option key={s} value={s} style={{ background: "#06263F" }}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex items-center justify-center gap-3 py-4 text-sm tracking-wider uppercase font-medium transition-all hover:-translate-y-0.5 disabled:opacity-60"
                  style={{ background: "linear-gradient(135deg,#008AC4,#003D6E)", color: "#ffffff", borderRadius: "2px" }}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Enviando…
                    </>
                  ) : (
                    <>
                      <Send size={15} /> Solicitar valoración
                    </>
                  )}
                </button>

                {status === "error" && (
                  <p role="alert" aria-live="assertive" className="text-xs text-red-400 font-medium">
                    {feedback}
                  </p>
                )}
              </form>
            )}
          </GlowCard>
        </motion.div>
      </div>
    </section>
  );
}
