import { motion } from "motion/react";

const steps = [
  {
    num: "01",
    title: "Diagnóstico",
    desc: "Análisis de biotipo cutáneo, estructura ósea y patrón de envejecimiento facial individual.",
  },
  {
    num: "02",
    title: "Diseño facial",
    desc: "Plan de tratamiento trazado sobre proporciones propias del rostro, no sobre estándares externos.",
  },
  {
    num: "03",
    title: "Aplicación",
    desc: "Ejecución con técnica de microcánula y dosificación progresiva, priorizando seguridad clínica.",
  },
  {
    num: "04",
    title: "Seguimiento",
    desc: "Control de evolución a los 15 y 30 días para ajustar el protocolo de mantenimiento.",
  },
];

export default function VideoSection() {
  return (
    <section id="metodo" className="bg-navy-deep text-white py-28 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="w-7 h-px bg-cyan-light" />
            <span className="text-[12px] tracking-[0.18em] uppercase text-cyan font-semibold">
              Nuestro método
            </span>
          </div>
          <h2 className="font-display font-normal text-[30px] md:text-[40px] leading-[1.16] tracking-tight">
            Cuatro fases, un solo objetivo: resultados predecibles.
          </h2>
          <p className="text-[15.5px] text-white/60 leading-relaxed font-light mt-5">
            Ningún protocolo se aplica sin pasar por este proceso. Es lo que
            separa un resultado natural de uno evidente.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-white/10 divide-y divide-white/10 lg:divide-y-0 lg:divide-x">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="p-10"
            >
              <div className="font-display text-[42px] text-white/15 font-medium leading-none mb-6">
                {step.num}
              </div>
              <h4 className="font-display text-[19px] font-medium mb-3">
                {step.title}
              </h4>
              <p className="text-[13.5px] leading-relaxed text-white/60 font-light">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
