import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

import botox from "../assets/imports/gallery-botox.jpg";
import labios from "../assets/imports/gallery-labios.jpg";
import rino from "../assets/imports/gallery-rino.jpg";
import ojera from "../assets/imports/gallery-ojera.jpg";
import pomulos from "../assets/imports/gallery-pomulos.jpg";
import mandibular from "../assets/imports/gallery-mandibular.jpg";
import capilar from "../assets/imports/gallery-capilar.jpg";
import manos from "../assets/imports/gallery-manos.jpg";
import surcos from "../assets/imports/gallery-surcos.jpg";
import microderm from "../assets/imports/gallery-microderm.jpg";
import esclero from "../assets/imports/gallery-esclero.jpg";

interface GalleryItem {
  img: string;
  title: string;
  tag: string;
  beforeAfter?: boolean;
  span?: string;
}

const items: GalleryItem[] = [
  { img: botox, title: "Toxina Botulínica", tag: "Frente y contorno", beforeAfter: true, span: "lg:row-span-2" },
  { img: labios, title: "Relleno de Labios", tag: "Ácido hialurónico", beforeAfter: true },
  { img: rino, title: "Rinomodelación", tag: "Perfilado no quirúrgico", beforeAfter: true },
  { img: ojera, title: "Relleno de Ojera", tag: "Corrección de volumen", beforeAfter: true, span: "lg:row-span-2" },
  { img: mandibular, title: "Perfilado Mandibular", tag: "Definición y marcaje", beforeAfter: true },
  { img: surcos, title: "Relleno de Surcos", tag: "Líneas de expresión", beforeAfter: true },
  { img: pomulos, title: "Relleno de Pómulos", tag: "Volumen y definición" },
  { img: capilar, title: "Tratamientos Capilares", tag: "Factores de crecimiento", beforeAfter: true },
  { img: manos, title: "Rejuvenecimiento de Manos", tag: "Radiesse" },
  { img: microderm, title: "Microdermabrasión", tag: "Renovación de piel" },
  { img: esclero, title: "Escleroterapia", tag: "Venas varicosas y de araña" },
];

export default function MethodGallery() {
  return (
    <section className="py-28 md:py-32" style={{ background: "#E7F3F8" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="w-7 h-px bg-cyan" />
            <span className="text-[12px] tracking-[0.18em] uppercase text-cyan font-semibold">
              Resultados reales
            </span>
          </div>
          <h2 className="font-display font-normal text-[30px] md:text-[40px] leading-[1.16] tracking-tight text-ink">
            Cada protocolo, documentado paso a paso.
          </h2>
          <p className="text-[15.5px] text-ink-soft leading-relaxed font-light mt-5">
            Una muestra de procedimientos realizados en clínica por el Dr. Gregorio García,
            con seguimiento fotográfico real de nuestros pacientes.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-[220px]">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.07 }}
              className={`group relative overflow-hidden ${item.span ?? ""}`}
              style={{ borderRadius: "14px", boxShadow: "0 18px 40px -20px rgba(14,34,53,0.25)" }}
            >
              <img
                src={item.img}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,27,51,0) 40%, rgba(0,20,38,0.82) 100%)",
                }}
              />
              {item.beforeAfter && (
                <span
                  className="absolute top-3 right-3 text-[10px] tracking-wider uppercase font-semibold px-2.5 py-1 text-white"
                  style={{ background: "rgba(0,138,196,0.85)", borderRadius: "999px", backdropFilter: "blur(4px)" }}
                >
                  Antes / Después
                </span>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-display text-[16px] leading-tight mb-0.5">
                  {item.title}
                </h3>
                <p className="text-[11.5px] text-white/70">{item.tag}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Link
            to="/tratamientos"
            className="inline-flex items-center gap-3 px-8 py-4 text-sm tracking-wider uppercase font-medium transition-all hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg,#008AC4,#003D6E)", color: "#ffffff", borderRadius: "4px" }}
          >
            Ver todos los tratamientos <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
