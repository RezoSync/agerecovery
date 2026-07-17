import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { Menu, X, Phone, Languages } from "lucide-react";
import logoWhite from "../assets/logo-white.png";
import type { BreadcrumbItem } from "./Breadcrumbs";
import Breadcrumbs from "./Breadcrumbs";
import { CLINIC_CALL_DISPLAY, CLINIC_CALL_HREF } from "../utils/contactInfo";
import { useLanguage } from "../i18n/LanguageContext";

// El teléfono del header es SOLO para llamadas (agendar cita por teléfono).
// El WhatsApp del consultorio vive aparte, en el botón flotante y en Contacto.
const PHONE_DISPLAY = CLINIC_CALL_DISPLAY;
const PHONE_HREF = CLINIC_CALL_HREF;

interface HeaderProps {
  /** Migas de pan a mostrar debajo del nav. Se omiten en Inicio. */
  breadcrumbs?: BreadcrumbItem[];
}

export default function Header({ breadcrumbs }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, toggleLanguage } = useLanguage();

  const navItems = [
    { to: "/tratamientos", label: t("nav.treatments") },
    { to: "/metodo", label: t("nav.method") },
    { to: "/filosofia", label: t("nav.philosophy") },
    { to: "/medico", label: t("nav.doctor") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b"
      style={{
        background: scrolled
          ? "rgba(0,27,51,0.94)"
          : "linear-gradient(180deg, rgba(0,20,38,0.62) 0%, rgba(0,20,38,0.38) 70%, rgba(0,20,38,0) 100%)",
        backdropFilter: scrolled ? "blur(18px)" : "blur(9px)",
        WebkitBackdropFilter: scrolled ? "blur(18px)" : "blur(9px)",
        borderBottomColor: scrolled ? "rgba(255,255,255,0.10)" : "transparent",
        boxShadow: scrolled ? "0 8px 30px rgba(0,10,22,0.25)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
        <Link to="/" className="transition-opacity hover:opacity-80">
          <img src={logoWhite} alt="Age Recovery" className="h-10 md:h-11 w-auto" />
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="text-[13px] tracking-widest uppercase transition-colors relative text-white/60 hover:text-white [&.active]:text-white"
            >
              {({ isActive }: { isActive: boolean }) => (
                <>
                  <span className={isActive ? "text-white" : "text-white/60"}>{item.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-px bg-cyan" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button
            type="button"
            onClick={toggleLanguage}
            title={t("header.translateButton")}
            className="flex items-center gap-1.5 px-3.5 py-2 text-[12px] tracking-wider uppercase font-medium border border-white/20 text-white/80 hover:text-white hover:border-white/40 transition-colors"
            style={{ borderRadius: "2px" }}
          >
            <Languages size={13} />
            {t("header.translateButton")}
          </button>
          <a
            href={PHONE_HREF}
            title={t("header.callTitle")}
            className="flex items-center gap-2 text-[13px] text-white/60 hover:text-white transition-colors"
          >
            <Phone size={14} />
            {PHONE_DISPLAY}
          </a>
          <Link
            to="/contacto"
            className="px-5 py-2.5 text-[13px] tracking-wider uppercase font-medium transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan/20"
            style={{ background: "linear-gradient(135deg,#008AC4,#003D6E)", color: "#fff", borderRadius: "2px" }}
          >
            {t("header.bookAppointment")}
          </Link>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? t("header.closeMenu") : t("header.openMenu")}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 md:px-8 pb-2 hidden md:block">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      )}

      {menuOpen && (
        <div
          id="mobile-nav-menu"
          className="md:hidden border-t border-white/10 px-6 py-5 flex flex-col gap-4"
          style={{ background: "rgba(0,27,51,0.97)" }}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className="text-left text-[13px] tracking-widest uppercase transition-colors"
            >
              {({ isActive }: { isActive: boolean }) => (
                <span className={isActive ? "text-white" : "text-white/60"}>{item.label}</span>
              )}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={() => {
              toggleLanguage();
              setMenuOpen(false);
            }}
            className="flex items-center gap-2 text-[13px] text-white/60 w-fit"
          >
            <Languages size={14} />
            {t("header.translateButton")}
          </button>
          <a
            href={PHONE_HREF}
            title={t("header.callTitle")}
            className="flex items-center gap-2 text-[13px] text-white/60"
          >
            <Phone size={14} />
            {PHONE_DISPLAY}
          </a>
          <Link
            to="/contacto"
            onClick={() => setMenuOpen(false)}
            className="mt-2 px-5 py-3 text-[13px] tracking-wider uppercase font-medium text-center"
            style={{ background: "linear-gradient(135deg,#008AC4,#003D6E)", color: "#fff", borderRadius: "2px" }}
          >
            {t("header.bookAppointment")}
          </Link>
        </div>
      )}
    </header>
  );
}
