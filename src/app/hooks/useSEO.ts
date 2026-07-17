import { useEffect } from "react";

const SITE_NAME = "Age Recovery";
const SITE_URL = "https://www.agerecovery.mx";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

interface SEOOptions {
  /** Título de la página, SIN el sufijo del sitio (se agrega automáticamente). */
  title: string;
  /** Meta description única para esta página (150-160 caracteres recomendado). */
  description: string;
  /** Ruta relativa (ej. "/tratamientos") usada para construir canonical y og:url. */
  path?: string;
  /** Imagen para Open Graph / Twitter Card. Usa la imagen por defecto si se omite. */
  image?: string;
  /** Evita que la página sea indexada (ej. 404). */
  noindex?: boolean;
}

function setMetaByName(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setMetaByProperty(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Actualiza title/meta description/Open Graph/Twitter Card/canonical al
 * montar cada página. Es una alternativa liviana a react-helmet (sin
 * dependencias nuevas) pensada para una SPA con rutas de cliente.
 *
 * Nota: para que los motores de búsqueda vean el HTML ya resuelto por ruta
 * (SSR/prerender) haría falta una solución de build adicional; esto cubre
 * correctamente el <title> visible al navegar y los metadatos leídos por
 * crawlers que ejecutan JS (Googlebot) y por los previews de redes sociales
 * cuando comparten la URL directa.
 */
export function useSEO({ title, description, path = "/", image, noindex = false }: SEOOptions) {
  useEffect(() => {
    const fullTitle = path === "/" ? `${title}` : `${title} — ${SITE_NAME}`;
    document.title = fullTitle;

    setMetaByName("description", description);
    setMetaByName("robots", noindex ? "noindex, nofollow" : "index, follow");

    const url = `${SITE_URL}${path}`;
    setCanonical(url);

    setMetaByProperty("og:title", fullTitle);
    setMetaByProperty("og:description", description);
    setMetaByProperty("og:url", url);
    setMetaByProperty("og:image", image ?? DEFAULT_OG_IMAGE);

    setMetaByName("twitter:title", fullTitle);
    setMetaByName("twitter:description", description);
    setMetaByName("twitter:image", image ?? DEFAULT_OG_IMAGE);

    // Al desmontar, no se restaura nada: la siguiente página que monte
    // llamará a este mismo hook y sobreescribirá los valores.
  }, [title, description, path, image, noindex]);
}
