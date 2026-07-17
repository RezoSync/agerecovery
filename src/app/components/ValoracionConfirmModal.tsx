import { MessageCircle, X } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

interface ValoracionConfirmModalProps {
  open: boolean;
  name: string;
  phone: string;
  treatment: string;
  onCancel: () => void;
  onContinue: () => void;
}

/**
 * Modal de confirmación mostrado antes de abrir WhatsApp. No envía nada
 * por sí mismo: solo resume los datos capturados y, si el usuario confirma,
 * dispara la apertura de wa.me (ver ValoracionForm.tsx).
 */
export default function ValoracionConfirmModal({
  open,
  name,
  phone,
  treatment,
  onCancel,
  onContinue,
}: ValoracionConfirmModalProps) {
  const { t } = useLanguage();
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="valoracion-confirm-title"
    >
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,10,20,0.72)", backdropFilter: "blur(3px)" }}
        onClick={onCancel}
      />

      <div
        className="relative w-full max-w-md p-8"
        style={{
          background: "#06263F",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "4px",
          boxShadow: "0 40px 80px -20px rgba(0,10,20,0.6)",
        }}
      >
        <button
          onClick={onCancel}
          aria-label={t("modal.close")}
          className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>

        <div
          className="w-12 h-12 flex items-center justify-center mb-5"
          style={{ background: "rgba(0,138,196,0.18)", borderRadius: "2px" }}
        >
          <MessageCircle size={22} className="text-cyan" />
        </div>

        <h3 id="valoracion-confirm-title" className="text-2xl mb-3 text-white font-display">
          {t("modal.title")}
        </h3>
        <p className="text-sm leading-relaxed text-white/70 mb-6">{t("modal.description")}</p>

        <div
          className="flex flex-col gap-3 p-5 mb-7"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "2px" }}
        >
          <div className="flex justify-between gap-4">
            <span className="text-xs tracking-wider uppercase text-white/50">{t("modal.nameLabel")}</span>
            <span className="text-sm text-white text-right">{name}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-xs tracking-wider uppercase text-white/50">{t("modal.phoneLabel")}</span>
            <span className="text-sm text-white text-right">{phone}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-xs tracking-wider uppercase text-white/50">{t("modal.treatmentLabel")}</span>
            <span className="text-sm text-white text-right">{treatment}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3.5 text-sm tracking-wider uppercase font-medium transition-all"
            style={{
              background: "transparent",
              color: "#ffffff",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "2px",
            }}
          >
            {t("modal.cancel")}
          </button>
          <button
            onClick={onContinue}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 text-sm tracking-wider uppercase font-medium transition-all hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg,#008AC4,#003D6E)", color: "#ffffff", borderRadius: "2px" }}
          >
            <MessageCircle size={15} /> {t("modal.continue")}
          </button>
        </div>
      </div>
    </div>
  );
}
