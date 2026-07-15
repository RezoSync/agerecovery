import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";

/**
 * Efectos visuales de marca, migrados 1:1 desde el diseño de referencia (P2):
 * fondos animados, texto con shimmer, tarjetas con glow y el slider antes/después.
 * Se centralizan aquí para reutilizarse en cualquier página sin duplicar código.
 */

/** Fondo "aurora": tres manchas de gradiente animadas + grid sutil. Usado en páginas internas. */
export function AuroraBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div style={{ position: "absolute", inset: 0, background: "#001B33" }} />
      <div
        style={{
          position: "absolute",
          top: "-20%",
          left: "30%",
          width: "60vw",
          height: "60vw",
          background: "radial-gradient(ellipse, rgba(0,138,196,0.20) 0%, transparent 70%)",
          animation: "aurora 18s ease-in-out infinite",
          filter: "blur(40px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          right: "-10%",
          width: "55vw",
          height: "55vw",
          background: "radial-gradient(ellipse, rgba(0,61,110,0.35) 0%, transparent 70%)",
          animation: "aurora2 22s ease-in-out infinite",
          filter: "blur(50px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "-15%",
          width: "45vw",
          height: "45vw",
          background: "radial-gradient(ellipse, rgba(79,184,232,0.12) 0%, transparent 70%)",
          animation: "aurora 28s ease-in-out infinite reverse",
          filter: "blur(60px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
    </div>
  );
}

/**
 * Fondo dividido en diagonal con dos zonas de color independientes. Usado en Hero.
 *
 * Nota de geometría: el polígono `clip` define la forma de la zona visualmente
 * IZQUIERDA (ancha arriba ~62%, angosta abajo ~38%, pegada al borde x=0).
 * `leftColor` pinta esa zona (el polígono, recortado por encima) y `rightColor`
 * pinta el fondo base, que queda visible en el resto (la zona derecha, mayor).
 */
export function SplitBg({
  direction = "diagonal",
  leftColor = "#008AC4",
  rightColor = "#003D6E",
}: {
  direction?: "diagonal" | "vertical";
  leftColor?: string;
  rightColor?: string;
}) {
  const clip =
    direction === "diagonal"
      ? "polygon(0 0, 62% 0, 38% 100%, 0 100%)"
      : "polygon(0 0, 50% 0, 50% 100%, 0 100%)";
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div style={{ position: "absolute", inset: 0, background: rightColor }} />
      <div style={{ position: "absolute", inset: 0, background: leftColor, clipPath: clip }} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.05) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
    </div>
  );
}

/** Slider interactivo antes/después, sin dependencias externas. */
export function BeforeAfterSlider({
  before,
  after,
  labelBefore = "Antes",
  labelAfter = "Después",
}: {
  before: string;
  after: string;
  labelBefore?: string;
  labelAfter?: string;
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      const x = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      updateFromClientX(x);
    };
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [updateFromClientX]);

  return (
    <div
      ref={ref}
      className="ba-slider aspect-[4/3] w-full"
      onMouseDown={(e) => {
        dragging.current = true;
        updateFromClientX(e.clientX);
      }}
      onTouchStart={(e) => {
        dragging.current = true;
        updateFromClientX(e.touches[0].clientX);
      }}
    >
      <img src={before} alt={labelBefore} />
      <div className="ba-after-wrap" style={{ width: `${pos}%` }}>
        <img
          src={after}
          alt={labelAfter}
          style={{ width: `${(100 / Math.max(pos, 1)) * 100}%`, maxWidth: "none" }}
        />
      </div>
      <div className="ba-handle" style={{ left: `${pos}%` }}>
        <div className="ba-handle-btn">
          <ChevronRight size={14} style={{ color: "#003D6E", transform: "rotate(180deg)", marginRight: -4 }} />
          <ChevronRight size={14} style={{ color: "#003D6E" }} />
        </div>
      </div>
      <span
        className="absolute top-3 left-3 text-xs uppercase tracking-wider px-2 py-1 rounded"
        style={{ background: "rgba(0,27,51,0.65)", color: "#fff" }}
      >
        {labelBefore}
      </span>
      <span
        className="absolute top-3 right-3 text-xs uppercase tracking-wider px-2 py-1 rounded"
        style={{ background: "rgba(0,138,196,0.75)", color: "#fff" }}
      >
        {labelAfter}
      </span>
    </div>
  );
}

/** Partículas flotantes decorativas. */
export function Particles({ count = 20 }: { count?: number }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 8,
    duration: Math.random() * 10 + 10,
    color: i % 3 === 0 ? "#008AC4" : i % 3 === 1 ? "#4FB8E8" : "#003D6E",
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50%",
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            animation: `float ${p.duration}s ${p.delay}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}

/** Texto con animación shimmer (usado en titulares clave). */
export function ShimmerText({
  children,
  className = "",
  gradient = "linear-gradient(90deg,#008AC4,#4FB8E8,#008AC4,#003D6E,#008AC4)",
}: {
  children: ReactNode;
  className?: string;
  gradient?: string;
}) {
  return (
    <span
      className={className}
      style={{
        background: gradient,
        backgroundSize: "200% auto",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        animation: "shimmer 4s linear infinite",
      }}
    >
      {children}
    </span>
  );
}

/** Tarjeta con "spotlight" que sigue al cursor al hacer hover. */
export function GlowCard({
  children,
  className = "",
  style = {},
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ref.current.style.setProperty("--gx", `${x}px`);
    ref.current.style.setProperty("--gy", `${y}px`);
  }, []);
  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden group ${className}`}
      style={{
        background: "#06263F",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "2px",
        transition: "border-color 0.3s",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(200px circle at var(--gx,50%) var(--gy,50%), rgba(0,138,196,0.09), transparent 70%)",
          opacity: 0,
          transition: "opacity 0.3s",
        }}
        className="group-hover:!opacity-100"
      />
      {children}
    </div>
  );
}
