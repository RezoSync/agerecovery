import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { Star, ArrowRight } from "lucide-react";
import { BeforeAfterSlider, GlowCard } from "./effects/SiteEffects";
import beforeAfterLips from "../assets/imports/before-after-lips.jpeg";
import beforeAfterBotox from "../assets/imports/before-after-botox.jpeg";
import procedureImg from "../assets/imports/procedure.jpeg";
import { useLanguage } from "../i18n/LanguageContext";
import { resultsTabs, testimonials, resultsSectionCopy } from "../i18n/content";

const images = [beforeAfterLips, beforeAfterBotox, procedureImg];

export default function ResultsSection() {
  const [tab, setTab] = useState(0);
  const { lang } = useLanguage();
  const copy = resultsSectionCopy[lang];
  const tabs = resultsTabs[lang].map((t, i) => ({ ...t, img: images[i] }));
  const active = tabs[tab];
  const items = testimonials[lang];

  return (
    <section
      id="resultados"
      className="relative py-28 md:py-32 overflow-hidden"
      style={{ background: "linear-gradient(180deg,#003D6E 0%, #001B33 45%)" }}
    >
      <div className="relative max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-3 mb-12"
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-cyan" />
            <span className="text-xs tracking-[0.25em] uppercase text-cyan">{copy.eyebrow}</span>
          </div>
          <h2 className="text-4xl md:text-5xl leading-tight text-white font-display" style={{ fontWeight: 500 }}>
            {copy.title}
          </h2>
        </motion.div>

        {/* Tabs */}
        <div role="tablist" aria-label="Casos de resultados" className="flex gap-1 mb-10 border-b border-white/10 overflow-x-auto">
          {tabs.map((t, i) => (
            <button
              key={t.label}
              role="tab"
              aria-selected={tab === i}
              onClick={() => setTab(i)}
              className="px-5 py-3 text-xs tracking-wider uppercase transition-all whitespace-nowrap"
              style={{
                color: tab === i ? "#008AC4" : "#8DA4C2",
                borderBottom: tab === i ? "2px solid #008AC4" : "2px solid transparent",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div key={tab} className="grid md:grid-cols-2 gap-8" style={{ animation: "fadeIn 0.35s both" }}>
          <div className="flex flex-col gap-3">
            {tab < 2 ? (
              <BeforeAfterSlider before={active.img} after={active.img} />
            ) : (
              <div
                className="relative overflow-hidden"
                style={{ borderRadius: "2px", aspectRatio: "1/1", background: "#06263F" }}
              >
                <img src={active.img} alt={active.title} loading="lazy" className="w-full h-full object-cover" />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top,rgba(0,27,51,0.5),transparent 60%)",
                  }}
                />
              </div>
            )}
            <p className="text-xs tracking-wider uppercase text-white/55">{active.sub}</p>
            {tab < 2 && (
              <p className="text-xs italic text-cyan-light">{copy.sliderHint}</p>
            )}
          </div>

          <GlowCard className="flex flex-col justify-center gap-6 p-8">
            <h3 className="text-3xl font-display">{active.title}</h3>
            <div className="flex flex-col gap-3">
              {active.points.map((pt) => (
                <div key={pt} className="flex items-center gap-3 text-sm text-white/70">
                  <span className="text-cyan">◆</span>
                  {pt}
                </div>
              ))}
            </div>
            <a
              href="https://wa.me/6538492893?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20cita"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm tracking-wider uppercase font-medium mt-2 text-cyan"
            >
              {copy.bookConsult} <ArrowRight size={14} />
            </a>
          </GlowCard>
        </div>

        {/* Testimonios */}
        <div className="mt-20">
          <div className="flex items-center gap-3 mb-10">
            <span className="h-px w-8 bg-cyan" />
            <span className="text-xs tracking-[0.25em] uppercase text-cyan">{copy.testimonialsEyebrow}</span>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {items.map((t, i) => (
              <GlowCard key={t.name} className="p-8 flex flex-col gap-5" style={{ animation: `fadeUp 0.5s ${i * 0.1}s both` }}>
                <div className="flex gap-1">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} size={13} fill="#008AC4" className="text-cyan" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed italic text-white/70">&ldquo;{t.text}&rdquo;</p>
                <div className="pt-4 border-t border-white/10 flex flex-col gap-1">
                  <span className="text-sm font-medium text-white">{t.name}</span>
                  <span className="text-xs text-cyan">
                    {t.age} · {t.svc}
                  </span>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            to="/tratamientos"
            className="inline-flex items-center gap-3 px-8 py-4 text-sm tracking-wider uppercase font-medium transition-all hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg,#008AC4,#003D6E)", color: "#ffffff", borderRadius: "2px" }}
          >
            {copy.viewAll}
          </Link>
        </div>
      </div>
    </section>
  );
}
