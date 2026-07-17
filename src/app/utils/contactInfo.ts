/**
 * Información de contacto centralizada. Hay DOS números distintos y no deben
 * confundirse entre sí:
 *
 * 1. CLINIC_CALL_*      → Solo para llamadas telefónicas, para agendar cita.
 * 2. CLINIC_WHATSAPP_*  → Solo para WhatsApp del consultorio (mensajes).
 */

// Llamadas (agendar cita por teléfono)
export const CLINIC_CALL_NUMBER = "6535158028";
export const CLINIC_CALL_DISPLAY = "(653) 515-8028";
export const CLINIC_CALL_HREF = `tel:${CLINIC_CALL_NUMBER}`;

// WhatsApp del consultorio (mensajes)
export const CLINIC_WHATSAPP_NUMBER = "6538492893";
export const CLINIC_WHATSAPP_DISPLAY = "(653) 849-2893";
export const CLINIC_WHATSAPP_URL =
  "https://wa.me/6538492893?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20cita";
