import { motion } from "motion/react";
import doctorCandid from "../assets/imports/doctor-clinical-candid.jpeg";
import { useLanguage } from "../i18n/LanguageContext";
import { philosophyCopy } from "../i18n/content";

export default function PhilosophySection() {
  const { lang } = useLanguage();
  const c = philosophyCopy[lang];

  return (
    <>
      <section id="filosofia" className="py-28 md:py-32" style={{ background: "#E7F3F8" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[4/5] overflow-hidden"
              style={{
                borderRadius: "18px",
                boxShadow: "0 30px 60px -22px rgba(14,34,53,0.28)",
              }}
            >
              <img
                src={doctorCandid}
                alt={c.imageAlt}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(155deg, rgba(255,255,255,0.06) 0%, rgba(14,34,53,0.05) 55%, rgba(14,34,53,0.35) 100%)",
                }}
              />
              <div className="absolute top-7 left-7 font-display text-[64px] text-white/80 opacity-70 leading-none">
                "
              </div>
              <div className="absolute inset-4 border border-white/25" style={{ borderRadius: "12px" }} />
              <div
                className="absolute bottom-5 left-5 right-5 flex items-center justify-between px-5 py-3"
                style={{
                  background: "rgba(255,255,255,0.14)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.25)",
                }}
              >
                <span className="text-[12px] tracking-wide uppercase text-white font-medium">{c.badgeName}</span>
                <span className="text-[11px] text-white/75">{c.badgeStatus}</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="w-7 h-px bg-cyan-light" />
                <span className="text-[12px] tracking-[0.18em] uppercase text-cyan font-semibold">
                  {c.eyebrow}
                </span>
              </div>
              <h2 className="font-display font-normal text-[28px] md:text-[36px] leading-[1.22] text-ink tracking-tight mb-6">
                {c.heading}
              </h2>
              <p className="text-[15.5px] leading-relaxed text-ink-soft font-light mb-4">{c.p1}</p>
              <p className="text-[15.5px] leading-relaxed text-ink-soft font-light mb-8">{c.p2}</p>
              <div className="pt-7 border-t border-ink/10">
                <div className="font-display italic text-[19px] text-ink">{c.signatureName}</div>
                <div className="text-[12px] text-ink-soft mt-0.5">{c.signatureSub}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-navy-deep py-24 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <motion.blockquote
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="font-display italic font-normal text-[22px] md:text-[28px] text-white leading-snug mb-6"
          >
            {c.quote}
          </motion.blockquote>
          <cite className="text-[12.5px] tracking-wide uppercase text-cyan font-semibold not-italic">
            {c.quoteCite}
          </cite>
        </div>
      </section>
    </>
  );
}
