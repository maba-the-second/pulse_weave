// Products.jsx — Light / Metallic Theme
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Wind, Fingerprint, HeartPulse, ArrowRight, Zap } from "lucide-react";

const INK=    "#1A202C"; const GRAPH=  "#4A5568";
const STEEL=  "#8A9BB0"; const SILVER= "#C0C0C0";
const BORDER= "#D1D9E0"; const BG=     "#F0F2F5";

const pageTransition = {
  initial:{ opacity:0,y:24 }, animate:{ opacity:1,y:0,transition:{ duration:0.5,ease:"easeOut" } },
  exit:   { opacity:0,y:-16, transition:{ duration:0.3 } },
};
const staggerContainer = { hidden:{}, visible:{ transition:{ staggerChildren:0.18,delayChildren:0.2 } } };
const cardVariant = {
  hidden:{ opacity:0,y:50 }, visible:{ opacity:1,y:0,transition:{ duration:0.7,ease:[0.22,1,0.36,1] } }
};

const PRODUCTS = [
  {
    name:"Environment-Adaptive Jacket", tagline:"Smart fabric that reads the room",
    description:"Embedded thermal sensors and NanoWeave technology adapt the jacket's insulation in real-time, responding to temperature, humidity, and UV exposure.",
    tech:["Climate AI","NanoFiber","Thermal Mesh","UV Sensor"], icon:Wind,
    accentFrom:STEEL, accentTo:INK, glow:"rgba(138,155,176,0.20)", link:"/jacket", badge:"Bestseller", price:"$1,299",
  },
  {
    name:"Smart Biometric Bag", tagline:"Your identity is the key",
    description:"Touch ID fingerprint locking, blockchain-secured compartments, and live GPS tracking make this the most intelligent carry ever engineered.",
    tech:["Touch ID","GPS Live","Blockchain Lock","Anti-theft"], icon:Fingerprint,
    accentFrom:INK, accentTo:STEEL, glow:"rgba(26,32,44,0.15)", link:"/bag", badge:"New Drop", price:"$899",
  },
  {
    name:"Pulse Bracelet", tagline:"Health intelligence on your wrist",
    description:"Continuous BPM, SpO2, and stress monitoring with Neural Sync — a proprietary AI that learns your body's baselines over time.",
    tech:["BPM Monitor","SpO2","Neural Sync","Sleep Tracking"], icon:HeartPulse,
    accentFrom:SILVER, accentTo:STEEL, glow:"rgba(192,192,192,0.30)", link:"/bracelet", badge:"Limited", price:"$549",
  },
];

export default function Products() {
  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit"
      style={{ backgroundColor: BG, minHeight:"100vh" }}>

      {/* Header */}
      <section className="pt-20 pb-12 px-6 relative overflow-hidden bg-white"
        style={{ borderBottom:`1px solid ${BORDER}` }}>
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[100px] pointer-events-none"
          style={{ backgroundColor:"rgba(138,155,176,0.12)" }} />
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity:0,y:30 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.6 }}
            className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Zap size={14} style={{ color:STEEL }} />
              <span className="text-xs tracking-[0.4em] uppercase" style={{ color:STEEL }}>SS 2025</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black" style={{ color:INK }}>The Collection</h1>
            <p className="text-lg font-light max-w-xl" style={{ color:GRAPH }}>
              Three products. One vision. A complete ecosystem of intelligent fashion
              engineered for the human of tomorrow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible"
            className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((p) => {
              const Icon = p.icon;
              return (
                <motion.div key={p.name} variants={cardVariant}
                  whileHover={{ y:-10, boxShadow:`0 24px 70px ${p.glow}` }}
                  transition={{ duration:0.3 }} className="group">
                  <Link to={p.link} className="block h-full">
                    <div className="h-full rounded-2xl overflow-hidden flex flex-col"
                      style={{ background:"white", border:`1px solid ${BORDER}`, boxShadow:"0 2px 12px rgba(138,155,176,0.1)" }}>

                      {/* Placeholder */}
                      <div className="relative aspect-video flex items-center justify-center overflow-hidden"
                        style={{ background:`linear-gradient(145deg, ${BG}, #E2E8ED)` }}>
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{ background:`linear-gradient(135deg, ${p.accentFrom}15, ${p.accentTo}08)` }} />
                        <motion.div animate={{ scale:[1,1.07,1] }}
                          transition={{ repeat:Infinity, duration:4, ease:"easeInOut" }}>
                          <Icon size={52} style={{ color:SILVER }} />
                        </motion.div>
                        <motion.div className="absolute left-0 right-0 h-px"
                          style={{ background:`linear-gradient(to right, transparent, ${SILVER}, transparent)` }}
                          animate={{ y:[-80,80] }}
                          transition={{ repeat:Infinity, duration:2.5, ease:"linear", repeatDelay:1 }} />
                        <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full"
                          style={{ background:"white", border:`1px solid ${BORDER}` }}>
                          <span className="text-[10px] tracking-widest uppercase" style={{ color:GRAPH }}>{p.badge}</span>
                        </div>
                        <div className="absolute bottom-3 right-3 text-xs font-bold" style={{ color:STEEL }}>{p.price}</div>
                      </div>

                      <div className="p-7 flex flex-col gap-4 flex-1">
                        <div className="h-px w-10 group-hover:w-full transition-all duration-700"
                          style={{ background:`linear-gradient(to right, ${p.accentFrom}, ${p.accentTo})` }} />
                        <div>
                          <h2 className="text-xl font-bold" style={{ color:INK }}>{p.name}</h2>
                          <p className="text-sm mt-1" style={{ color:GRAPH }}>{p.tagline}</p>
                        </div>
                        <p className="text-sm font-light leading-relaxed flex-1" style={{ color:GRAPH }}>{p.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {p.tech.map(t => (
                            <span key={t} className="px-2 py-1 rounded-full text-[10px] tracking-wider uppercase"
                              style={{ background:BG, border:`1px solid ${BORDER}`, color:GRAPH }}>{t}</span>
                          ))}
                        </div>
                        <div className="flex items-center gap-1 text-xs tracking-widest uppercase mt-1"
                          style={{ color:STEEL }}>
                          Explore Product <ArrowRight size={12} className="ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
