import { Link } from "react-router";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  to?: string; // si no tiene 'to', se renderiza como texto plano (paso actual)
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

/**
 * Migas de pan estilo P2: ícono de inicio + separadores chevron + paso
 * actual resaltado en cyan. Se monta dentro del Header, debajo del nav.
 */
export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-white/50 flex-wrap">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        const isFirst = i === 0;
        return (
          <span key={i} className="flex items-center gap-1.5">
            {item.to && !isLast ? (
              <Link to={item.to} className="flex items-center gap-1 hover:text-white transition-colors">
                {isFirst && <Home size={11} />}
                {item.label}
              </Link>
            ) : (
              <span className="flex items-center gap-1 text-cyan" aria-current={isLast ? "page" : undefined}>
                {isFirst && <Home size={11} />}
                {item.label}
              </span>
            )}
            {!isLast && <ChevronRight size={11} className="opacity-40" />}
          </span>
        );
      })}
    </nav>
  );
}
