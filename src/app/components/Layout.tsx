import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import type { BreadcrumbItem } from "./Breadcrumbs";

interface LayoutProps {
  children: ReactNode;
  /** Migas de pan de la página. Omitir en Inicio. */
  breadcrumbs?: BreadcrumbItem[];
}

/**
 * Cascarón compartido por todas las páginas del sitio: header fijo (con
 * migas de pan), contenido, footer y botón flotante de WhatsApp.
 * Centraliza el layout para no repetirlo página por página.
 */
export default function Layout({ children, breadcrumbs }: LayoutProps) {
  return (
    <div className="min-h-screen bg-navy-deep text-white overflow-x-hidden">
      <Header breadcrumbs={breadcrumbs} />
      <main className="page-enter">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
