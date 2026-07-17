import { useState, type FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { GlowCard } from "./effects/SiteEffects";
import {
  FIELD_LIMITS,
  sanitizeText,
  validateName,
  validatePhone,
  validateInterest,
  digitsOnly,
} from "../utils/validation";
import { buildValoracionWhatsAppUrl } from "../utils/whatsapp";
import ValoracionConfirmModal from "./ValoracionConfirmModal";

const DEFAULT_TREATMENT_OPTIONS = [
  "Bioestimulación facial",
  "Ácido hialurónico",
  "Toxina botulínica",
  "Hilos tensores PDO",
  "Skinbooster y mesoterapia",
  "Plasma rico en plaquetas",
  "No estoy seguro / quiero diagnóstico",
];

interface ValoracionFormProps {
  /** Título mostrado sobre el formulario. */
  title?: string;
  /** Tratamiento preseleccionado (ej. al venir desde una página de detalle). */
  presetInterest?: string;
  /** Si true, el campo "tratamiento" se muestra fijo (solo lectura) en vez de un select. */
  lockInterest?: boolean;
  /** Lista de opciones para el select cuando lockInterest es false. */
  treatmentOptions?: string[];
  className?: string;
}

/**
 * Formulario de solicitud de valoración. Al enviarse, valida los datos
 * localmente y abre WhatsApp (wa.me) con el mensaje ya redactado y el
 * número oficial de la clínica — sin pasar por ningún backend ni API externa.
 */
export default function ValoracionForm({
  title = "Solicitar información",
  presetInterest,
  lockInterest = false,
  treatmentOptions = DEFAULT_TREATMENT_OPTIONS,
  className = "",
}: ValoracionFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState(presetInterest ?? treatmentOptions[0]);
  const [sent, setSent] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; phone?: string; interest?: string }>({});
  const [showConfirm, setShowConfirm] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const finalInterest = presetInterest ?? interest;
    const nameError = validateName(name);
    const phoneError = validatePhone(phone);
    const interestError = validateInterest(finalInterest);
    if (nameError || phoneError || interestError) {
      setFieldErrors({
        name: nameError ?? undefined,
        phone: phoneError ?? undefined,
        interest: interestError ?? undefined,
      });
      return;
    }
    setFieldErrors({});
    setShowConfirm(true);
  }

  function handleConfirmContinue() {
    const url = buildValoracionWhatsAppUrl({
      name: sanitizeText(name),
      phone: digitsOnly(phone),
      treatment: presetInterest ?? interest,
    });

    // Abre WhatsApp (app o web) con el mensaje ya redactado en una pestaña nueva.
    window.open(url, "_blank", "noopener,noreferrer");
    setShowConfirm(false);
    setSent(true);
  }

  return (
    <GlowCard className={`p-8 ${className}`}>
      <h3 className="text-2xl mb-6 text-white font-display">{title}</h3>

      {sent ? (
        <div className="flex flex-col items-center gap-4 py-12 text-center">
          <CheckCircle2 size={48} className="text-cyan" />
          <div>
            <div className="text-lg font-medium mb-1 text-white font-display">¡Casi listo!</div>
            <div className="text-sm text-white/60">
              Abrimos WhatsApp con tu mensaje. Solo confirma el envío desde ahí para que
              podamos contactarte.
            </div>
          </div>
          <button
            onClick={() => {
              setSent(false);
              setName("");
              setPhone("");
            }}
            className="mt-2 text-xs tracking-wider uppercase text-cyan"
          >
            Enviar otra solicitud
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
              aria-invalid={Boolean(fieldErrors.name)}
              aria-describedby={fieldErrors.name ? "name-error" : undefined}
              className="px-4 py-3 text-sm outline-none focus:border-cyan/50 focus-visible:ring-2 focus-visible:ring-cyan/40 transition-colors"
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
              aria-invalid={Boolean(fieldErrors.phone)}
              aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
              className="px-4 py-3 text-sm outline-none focus:border-cyan/50 focus-visible:ring-2 focus-visible:ring-cyan/40 transition-colors"
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
            {lockInterest && presetInterest ? (
              <div
                id="interest"
                className="px-4 py-3 text-sm"
                style={{
                  background: "#06263F",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "2px",
                  color: "#fff",
                }}
              >
                {presetInterest}
              </div>
            ) : (
              <select
                id="interest"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="px-4 py-3 text-sm outline-none focus:border-cyan/50 focus-visible:ring-2 focus-visible:ring-cyan/40 transition-colors"
                style={{ background: "#06263F", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "2px", color: "#fff" }}
              >
                {treatmentOptions.map((s) => (
                  <option key={s} value={s} style={{ background: "#06263F" }}>
                    {s}
                  </option>
                ))}
              </select>
            )}
            {fieldErrors.interest && (
              <p className="text-xs text-red-400">{fieldErrors.interest}</p>
            )}
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-3 py-4 text-sm tracking-wider uppercase font-medium transition-all hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg,#008AC4,#003D6E)", color: "#ffffff", borderRadius: "2px" }}
          >
            <Send size={15} /> Solicitar valoración
          </button>

          <p className="text-xs text-white/40 leading-relaxed">
            Al enviar, se abrirá WhatsApp con tu mensaje listo para confirmar.
          </p>
        </form>
      )}

      <ValoracionConfirmModal
        open={showConfirm}
        name={sanitizeText(name)}
        phone={phone}
        treatment={presetInterest ?? interest}
        onCancel={() => setShowConfirm(false)}
        onContinue={handleConfirmContinue}
      />
    </GlowCard>
  );
}
