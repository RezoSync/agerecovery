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
 * - Mensajes de error localizados en español o inglés según el idioma
 *   activo del sitio (parámetro `lang`, por defecto "es").
 */

export type ValidationLang = "es" | "en";

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

const MESSAGES = {
  es: {
    nameRequired: "Ingresa tu nombre completo.",
    nameInvalidChars: "El nombre contiene caracteres no permitidos.",
    nameTooShort: (min: number) => `El nombre debe tener al menos ${min} caracteres.`,
    nameTooLong: (max: number) => `El nombre no puede superar ${max} caracteres.`,
    nameLettersOnly: "El nombre solo puede contener letras, espacios y guiones.",
    phoneRequired: "Ingresa tu número de teléfono.",
    phoneDigits: (digits: number) => `El teléfono debe tener ${digits} dígitos.`,
    emailRequired: "Ingresa tu correo electrónico.",
    emailTooLong: "El correo es demasiado largo.",
    emailInvalid: "Ingresa un correo electrónico válido.",
    messageRequired: "Escribe tu mensaje.",
    messageInvalidChars: "El mensaje contiene contenido no permitido.",
    messageTooLong: (max: number) => `El mensaje no puede superar ${max} caracteres.`,
    interestRequired: "Selecciona un tratamiento de interés.",
  },
  en: {
    nameRequired: "Enter your full name.",
    nameInvalidChars: "The name contains characters that aren't allowed.",
    nameTooShort: (min: number) => `The name must be at least ${min} characters.`,
    nameTooLong: (max: number) => `The name can't exceed ${max} characters.`,
    nameLettersOnly: "The name can only contain letters, spaces, and hyphens.",
    phoneRequired: "Enter your phone number.",
    phoneDigits: (digits: number) => `The phone number must have ${digits} digits.`,
    emailRequired: "Enter your email address.",
    emailTooLong: "The email is too long.",
    emailInvalid: "Enter a valid email address.",
    messageRequired: "Write your message.",
    messageInvalidChars: "The message contains content that isn't allowed.",
    messageTooLong: (max: number) => `The message can't exceed ${max} characters.`,
    interestRequired: "Select a treatment of interest.",
  },
} as const;

/** Quita espacios redundantes y caracteres de control invisibles. */
export function sanitizeText(value: string): string {
  // eslint-disable-next-line no-control-regex -- intentional: strips invisible control chars from user input
  return value.trim().replace(/\s+/g, " ").replace(/[\u0000-\u001F\u007F]/g, "");
}

export function isSuspiciousInput(value: string): boolean {
  return HTML_TAG_RE.test(value) || SQL_PATTERN_RE.test(value);
}

export function validateName(raw: string, lang: ValidationLang = "es"): string | null {
  const m = MESSAGES[lang];
  const value = sanitizeText(raw);
  if (!value) return m.nameRequired;
  if (isSuspiciousInput(value)) return m.nameInvalidChars;
  if (value.length < FIELD_LIMITS.name.min) return m.nameTooShort(FIELD_LIMITS.name.min);
  if (value.length > FIELD_LIMITS.name.max) return m.nameTooLong(FIELD_LIMITS.name.max);
  if (!/^[\p{L}\s'.-]+$/u.test(value)) return m.nameLettersOnly;
  return null;
}

/** Acepta 10 dígitos, con o sin separadores comunes (espacios, guiones, paréntesis). */
export function validatePhone(raw: string, lang: ValidationLang = "es"): string | null {
  const m = MESSAGES[lang];
  const digitsOnlyValue = raw.replace(/\D/g, "");
  if (!digitsOnlyValue) return m.phoneRequired;
  if (digitsOnlyValue.length !== FIELD_LIMITS.phone.digits) return m.phoneDigits(FIELD_LIMITS.phone.digits);
  return null;
}

/** Validación de email con el patrón estándar recomendado por el WHATWG/HTML spec. */
const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function validateEmail(raw: string, lang: ValidationLang = "es"): string | null {
  const m = MESSAGES[lang];
  const value = sanitizeText(raw);
  if (!value) return m.emailRequired;
  if (value.length > FIELD_LIMITS.email.max) return m.emailTooLong;
  if (!EMAIL_RE.test(value)) return m.emailInvalid;
  return null;
}

export function validateMessage(raw: string, required = false, lang: ValidationLang = "es"): string | null {
  const m = MESSAGES[lang];
  const value = sanitizeText(raw);
  if (!value) return required ? m.messageRequired : null;
  if (isSuspiciousInput(value)) return m.messageInvalidChars;
  if (value.length > FIELD_LIMITS.message.max) return m.messageTooLong(FIELD_LIMITS.message.max);
  return null;
}

export function validateInterest(raw: string, lang: ValidationLang = "es"): string | null {
  const value = sanitizeText(raw);
  if (!value) return MESSAGES[lang].interestRequired;
  return null;
}

/** Normaliza el teléfono a solo dígitos, listo para enviar. */
export function digitsOnly(raw: string): string {
  return raw.replace(/\D/g, "");
}
