import { useState, type ReactNode } from "react";

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface TreatmentTabsProps {
  tabs: Tab[];
}

/**
 * Pestañas para la página de detalle de tratamiento. No se quita ninguna
 * información: solo se agrupa por bloques (Beneficios / Procedimiento /
 * Recuperación / Para quién es) para que no se sienta como un muro de texto.
 *
 * En mobile los tabs se pueden desplazar horizontalmente (overflow-x-auto)
 * en vez de apretarse o partirse en dos líneas.
 */
export default function TreatmentTabs({ tabs }: TreatmentTabsProps) {
  const [activeId, setActiveId] = useState(tabs[0]?.id);
  const active = tabs.find((t) => t.id === activeId) ?? tabs[0];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Secciones del tratamiento"
        className="flex gap-1 overflow-x-auto pb-px mb-8 border-b border-white/10 no-scrollbar"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === active?.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => setActiveId(tab.id)}
              className="relative shrink-0 px-4 sm:px-5 py-3 text-[13px] sm:text-[13.5px] tracking-wide uppercase font-medium whitespace-nowrap transition-colors"
              style={{ color: isActive ? "#ffffff" : "rgba(255,255,255,0.5)" }}
            >
              {tab.label}
              {isActive && (
                <span
                  className="absolute left-0 right-0 -bottom-px h-0.5"
                  style={{ background: "var(--cyan, #00B8D9)" }}
                />
              )}
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={tab.id !== active?.id}
        >
          {tab.id === active?.id && tab.content}
        </div>
      ))}
    </div>
  );
}
