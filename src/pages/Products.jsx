import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Wind, HeartPulse, ArrowRight, Zap } from "lucide-react";

const ACCENT = "#22d3ee";
const WHITE = "#f1f5f9";
const MUTED = "#94a3b8";
const SILVER = "#64748b";
const BORDER = "rgba(255,255,255,0.08)";
const BASE = import.meta.env.BASE_URL;

const pageTransition = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.3 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const products = [
  {
    name: "Environment-Adaptive Jacket",
    tagline: "Smart fabric that reads the room",
    description: "Embedded thermal sensors and NanoWeave technology adapt the jacket's insulation in real-time, responding to temperature, humidity, and UV exposure.",
    tech: ["Climate AI", "NanoFiber", "Thermal Mesh", "UV Sensor"],
    accent: [ACCENT, WHITE],
    glow: "rgba(34,211,238,0.10)",
    link: "/jacket",
    badge: "Bestseller",
    price: "$1,299",
    img: `${BASE}imgs/P2.jpeg`,
    imgHover: `${BASE}imgs/P3.jpeg`,
  },
  {
    name: "Pulse Bracelet",
    tagline: "Health intelligence on your wrist",
    description: "Continuous BPM, SpO2, and stress monitoring with Neural Sync — a proprietary AI that learns your body's baselines over time.",
    tech: ["BPM Monitor", "SpO2", "Neural Sync", "Sleep Tracking"],
    accent: [SILVER, ACCENT],
    glow: "rgba(34,211,238,0.10)",
    link: "/bracelet",
    badge: "Limited",
    price: "$549",
    img: `${BASE}imgs/p1.jpeg`,
  },
];

export default function Products() {
  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit"
      style={{ backgroundColor: "#000", minHeight: "100vh" }}>

      <section className="pt-20 pb-12 px-6 relative overflow-hidden"
        style={{ backgroundColor: "#050508", borderBottom: `1px solid ${BORDER}` }}>
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[100px] pointer-events-none"
          style={{ backgroundColor: "rgba(34,211,238,0.06)" }} />
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Zap size={14} style={{ color: ACCENT }} />
              <span className="text-xs tracking-[0.4em] uppercase" style={{ color: ACCENT }}>SS 2025</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black" style={{ color: WHITE }}>The Collection</h1>
            <p className="text-lg font-light max-w-xl" style={{ color: MUTED }}>
              Two products. One vision. A complete ecosystem of intelligent fashion
              engineered for the human of tomorrow.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={stagger} initial="hidden" animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {products.map((p) => (
              <motion.div key={p.name} variants={cardVariant}
                whileHover={{ y: -10, boxShadow: `0 24px 70px ${p.glow}` }}
                transition={{ duration: 0.3 }} className="group">
                <Link to={p.link} className="block h-full">
                  <div className="h-full rounded-2xl overflow-hidden flex flex-col"
                    style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${BORDER}`, boxShadow: "0 2px 12px rgba(0,0,0,0.3)" }}>

                    <div className="relative aspect-[9/16] max-h-[400px] overflow-hidden" style={{ background: "#0a0a10" }}>
                      <img src={p.img} alt={p.name}
                        className="absolute inset-0 w-full h-full object-contain transition-opacity duration-500" />
                      {p.imgHover && (
                        <img src={p.imgHover} alt={`${p.name} hover`}
                          className="absolute inset-0 w-full h-full object-contain transition-opacity duration-500 opacity-0 group-hover:opacity-100" />
                      )}
                      <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full"
                        style={{ background: "rgba(0,0,0,0.5)", border: `1px solid ${BORDER}` }}>
                        <span className="text-[10px] tracking-widest uppercase" style={{ color: MUTED }}>{p.badge}</span>
                      </div>
                      <div className="absolute bottom-3 right-3 text-xs font-bold" style={{ color: ACCENT }}>{p.price}</div>
                    </div>

                    <div className="p-7 flex flex-col gap-4 flex-1">
                      <div className="h-px w-10 group-hover:w-full transition-all duration-700"
                        style={{ background: `linear-gradient(to right, ${p.accent[0]}, ${p.accent[1]})` }} />
                      <div>
                        <h2 className="text-xl font-bold" style={{ color: WHITE }}>{p.name}</h2>
                        <p className="text-sm mt-1" style={{ color: MUTED }}>{p.tagline}</p>
                      </div>
                      <p className="text-sm font-light leading-relaxed flex-1" style={{ color: MUTED }}>{p.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {p.tech.map(t => (
                          <span key={t} className="px-2 py-1 rounded-full text-[10px] tracking-wider uppercase"
                            style={{ background: "rgba(34,211,238,0.06)", border: "1px solid rgba(34,211,238,0.12)", color: ACCENT }}>{t}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 text-xs tracking-widest uppercase mt-1" style={{ color: ACCENT }}>
                        Explore Product <ArrowRight size={12} className="ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
