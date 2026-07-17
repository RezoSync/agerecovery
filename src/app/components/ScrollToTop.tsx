import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * Sube la página al inicio (0,0) cada vez que cambia la ruta.
 *
 * Bug que arregla: React Router, a diferencia de un sitio tradicional con
 * recargas de página completas, NO resetea el scroll al navegar entre
 * páginas — mantiene la posición de scroll de la página anterior. Por eso
 * al entrar a "Ver procedimiento" desde media página, la nueva página
 * cargaba con esa misma posición de scroll en vez de empezar arriba.
 * Se ve mucho más en mobile porque ahí es más común llegar a media página
 * al momento de hacer click en un enlace.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
