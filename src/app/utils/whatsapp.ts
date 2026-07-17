/**
 * Utilidades para generar enlaces de WhatsApp (wa.me) con mensaje
 * pre-formateado. No usa ninguna API externa: wa.me es un simple enlace
 * que abre WhatsApp (web o app) con el texto ya cargado en el chat.
 */

/** Número oficial de la clínica, mismo que se usa en el header, el botón
 * flotante y el pie de página. Solo dígitos, formato E.164 sin el "+". */
export const CLINIC_WHATSAPP_NUMBER = "6538492893";

interface ValoracionMessageParams {
  name: string;
  phone: string;
  treatment: string;
}

/** Arma el mensaje exacto solicitado para las solicitudes de valoración. */
export function buildValoracionMessage({ name, phone, treatment }: ValoracionMessageParams): string {
  return [
    "Hola.",
    `Mi nombre es: ${name}`,
    `Mi teléfono es: ${phone}`,
    "Estoy interesado en:",
    treatment,
    "Me gustaría agendar una valoración.",
    "Muchas gracias.",
  ].join("\n");
}

/** Construye la URL wa.me con el mensaje correctamente codificado. */
export function buildWhatsAppUrl(message: string, phoneNumber = CLINIC_WHATSAPP_NUMBER): string {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

/** Atajo: arma el mensaje de valoración y devuelve la URL de wa.me lista para abrir. */
export function buildValoracionWhatsAppUrl(params: ValoracionMessageParams): string {
  return buildWhatsAppUrl(buildValoracionMessage(params));
}
