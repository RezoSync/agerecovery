/**
 * Utilidades de validación y sanitización para formularios.
 *
 * Reglas aplicadas (ver ContactSection.tsx):
 * - trim() en todos los campos antes de validar/enviar.
 * - Límites de longitud razonables por tipo de campo.
 * - Rechazo de etiquetas HTML / caracteres de script como medida básica
 *   contra inyección (además de la protección nativa de React, que ya
 *   escapa el contenido renderizado — esto es una capa adicional en el
 *   dato que se envía "al backend").
 * - Mensajes de error en español, pensados para mostrarse directamente
 *   al usuario.
 */

export const FIELD_LIMITS = {
  name: { min: 2, max: 60 },
  phone: { digits: 10 },
  email: { max: 254 },
  message: { max: 500 },
} as const;

// Detecta cualquier etiqueta HTML/XML, ej. <script>, <img onerror=...>, etc.
const HTML_TAG_RE = /<[^>]*>/;
// Detecta patrones típicos de intento de SQL injection básico (defensa en
// profundidad; la validación real de datos siempre debe hacerse también en
// el backend, esto solo evita que el usuario envíe basura obvia).
const SQL_PATTERN_RE = /(--|;|\/\*|\*\/|\bunion\b|\bselect\b|\bdrop\b|\binsert\b)/i;

/** Quita espacios redundantes y caracteres de control invisibles. */
export function sanitizeText(value: string): string {
  // eslint-disable-next-line no-control-regex -- intentional: strips invisible control chars from user input
  return value.trim().replace(/\s+/g, " ").replace(/[\u0000-\u001F\u007F]/g, "");
}

export function isSuspiciousInput(value: string): boolean {
  return HTML_TAG_RE.test(value) || SQL_PATTERN_RE.test(value);
}

export function validateName(raw: string): string | null {
  const value = sanitizeText(raw);
  if (!value) return "Ingresa tu nombre completo.";
  if (isSuspiciousInput(value)) return "El nombre contiene caracteres no permitidos.";
  if (value.length < FIELD_LIMITS.name.min) {
    return `El nombre debe tener al menos ${FIELD_LIMITS.name.min} caracteres.`;
  }
  if (value.length > FIELD_LIMITS.name.max) {
    return `El nombre no puede superar ${FIELD_LIMITS.name.max} caracteres.`;
  }
  if (!/^[\p{L}\s'.-]+$/u.test(value)) {
    return "El nombre solo puede contener letras, espacios y guiones.";
  }
  return null;
}

/** Acepta 10 dígitos, con o sin separadores comunes (espacios, guiones, paréntesis). */
export function validatePhone(raw: string): string | null {
  const digitsOnly = raw.replace(/\D/g, "");
  if (!digitsOnly) return "Ingresa tu número de teléfono.";
  if (digitsOnly.length !== FIELD_LIMITS.phone.digits) {
    return `El teléfono debe tener ${FIELD_LIMITS.phone.digits} dígitos.`;
  }
  return null;
}

/** Validación de email con el patrón estándar recomendado por el WHATWG/HTML spec. */
const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function validateEmail(raw: string): string | null {
  const value = sanitizeText(raw);
  if (!value) return "Ingresa tu correo electrónico.";
  if (value.length > FIELD_LIMITS.email.max) return "El correo es demasiado largo.";
  if (!EMAIL_RE.test(value)) return "Ingresa un correo electrónico válido.";
  return null;
}

export function validateMessage(raw: string, required = false): string | null {
  const value = sanitizeText(raw);
  if (!value) return required ? "Escribe tu mensaje." : null;
  if (isSuspiciousInput(value)) return "El mensaje contiene contenido no permitido.";
  if (value.length > FIELD_LIMITS.message.max) {
    return `El mensaje no puede superar ${FIELD_LIMITS.message.max} caracteres.`;
  }
  return null;
}

export function validateInterest(raw: string): string | null {
  const value = sanitizeText(raw);
  if (!value) return "Selecciona un tratamiento de interés.";
  return null;
}

/** Normaliza el teléfono a solo dígitos, listo para enviar. */
export function digitsOnly(raw: string): string {
  return raw.replace(/\D/g, "");
}
