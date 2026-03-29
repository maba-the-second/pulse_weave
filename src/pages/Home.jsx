// ============================================================
// Home.jsx — Light / Metallic Theme
//
// PALETTE used throughout:
//   #F0F2F5  bg-[#F0F2F5]  page background (metallic silver-white)
//   #FFFFFF  bg-white       card surfaces
//   #1A202C  text-ink       headings, primary text
//   #4A5568  text-graphite  body copy, secondary text
//   #8A9BB0  text-steel     accents, icons, underlines
//   #C0C0C0  silver         shimmer lines, decorative
//   #D1D9E0                 borders, dividers
// ============================================================

import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight, Cpu, Wind, HeartPulse, Fingerprint,
  ChevronDown, Sparkles, Zap, Shield, Radio,
} from "lucide-react";

// Shared colour constants
const STEEL   = "#8A9BB0";
const INK     = "#1A202C";
const SILVER  = "#C0C0C0";
const GRAPH   = "#4A5568";
const BORDER  = "#D1D9E0";
const BG      = "#F0F2F5";

// ── Animation variants ──────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};
const slideLeft = {
  hidden:  { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};
const scalePop = {
  hidden:  { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "backOut" } },
};

function ScrollReveal({ children, variants = fadeUp, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.div ref={ref} variants={variants}
      initial="hidden" animate={isInView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

// ── HERO ────────────────────────────────────────────────────
function HeroSection() {
  const words = ["Wear", "The", "Future."];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
      style={{ background: `linear-gradient(145deg, #E8ECF0 0%, #F0F2F5 40%, #E2E8ED 100%)` }}>

      {/* Metallic background texture */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Silver glow top-left */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[140px]"
          style={{ backgroundColor: "rgba(192,192,192,0.25)" }} />
        {/* Steel glow bottom-right */}
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full blur-[140px]"
          style={{ backgroundColor: "rgba(138,155,176,0.20)" }} />
        {/* Fine grid */}
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: `linear-gradient(${BORDER} 1px, transparent 1px), linear-gradient(90deg, ${BORDER} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />
      </div>

      <div className="relative z-10 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left: text */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible"
          className="flex flex-col gap-6">

          {/* Badge */}
          <motion.div variants={fadeUp} className="w-fit">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border"
              style={{ borderColor: `${STEEL}40`, backgroundColor: `${STEEL}10` }}>
              <Sparkles size={12} style={{ color: STEEL }} />
              <span className="text-xs tracking-widest uppercase" style={{ color: STEEL }}>
                SS 2025 Collection
              </span>
            </div>
          </motion.div>

          {/* Headline — motion.span with data-heading gets Ndot 57 Aligned from CSS */}
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {words.map((word, i) => (
              <motion.span
                key={i}
                data-heading
                variants={fadeUp}
                transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="text-6xl lg:text-8xl font-black tracking-tight leading-none"
                style={i === 2 ? {
                  backgroundImage: `linear-gradient(135deg, ${STEEL}, ${INK})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                } : { color: INK }}
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* Subhead */}
          <motion.p variants={fadeUp} className="text-lg font-light leading-relaxed max-w-md"
            style={{ color: GRAPH }}>
            Pulse Weave engineers smart garments that sense, adapt, and respond
            to your world — blurring the line between fashion and technology.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: `0 8px 30px ${STEEL}40` }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-7 py-3.5 text-sm font-bold tracking-widest uppercase rounded-sm transition-all duration-300"
                style={{ backgroundColor: INK }}
              >
                Explore Collection <ArrowRight size={15} />
              </motion.button>
            </Link>
            <Link to="/about">
              <motion.button
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-7 py-3.5 text-sm font-light tracking-widest uppercase rounded-sm transition-all duration-300"
                style={{ border: `1px solid ${BORDER}`, color: GRAPH, backgroundColor: "transparent" }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = `${STEEL}10`}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
              >
                Our Story
              </motion.button>
            </Link>
          </motion.div>

          {/* Tech pills */}
          <motion.div variants={fadeUp}
            className="flex flex-wrap gap-3 pt-4"
            style={{ borderTop: `1px solid ${BORDER}` }}>
            {[
              { icon: Cpu,    label: "Neural Fabric AI"   },
              { icon: Wind,   label: "Climate Adaptive"   },
              { icon: Shield, label: "Biometric Security" },
              { icon: Radio,  label: "5G Integrated"      },
            ].map(({ icon: Icon, label }) => (
              <div key={label}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                style={{ backgroundColor: "white", border: `1px solid ${BORDER}` }}>
                <Icon size={11} style={{ color: STEEL }} />
                <span className="text-xs" style={{ color: GRAPH }}>{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: 3D model placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="relative flex items-center justify-center"
        >
          {/* Metallic glow halo */}
          <div className="absolute inset-0 rounded-2xl blur-xl"
            style={{ background: `linear-gradient(135deg, ${SILVER}30, transparent, ${STEEL}20)` }} />

          <div className="relative w-full aspect-square max-w-md rounded-2xl overflow-hidden flex flex-col items-center justify-center gap-4"
            style={{
              background: "linear-gradient(145deg, #FFFFFF, #E8ECF0)",
              border: `1px solid ${BORDER}`,
              boxShadow: "0 20px 60px rgba(138,155,176,0.2), inset 0 1px 0 rgba(255,255,255,0.8)"
            }}>
            {/* Corner marks */}
            {[
              { top:"12px",left:"12px",   borderTop:1,borderLeft:1   },
              { top:"12px",right:"12px",  borderTop:1,borderRight:1  },
              { bottom:"12px",left:"12px",borderBottom:1,borderLeft:1},
              { bottom:"12px",right:"12px",borderBottom:1,borderRight:1},
            ].map((s, i) => (
              <div key={i} className="absolute w-5 h-5"
                style={{ ...s, borderColor: SILVER, borderStyle: "solid" }} />
            ))}

            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <Zap size={56} style={{ color: `${STEEL}80` }} />
            </motion.div>

            <div className="text-center px-8">
              <p className="text-xs tracking-widest uppercase" style={{ color: GRAPH }}>3D Model Viewport</p>
              <p className="text-[10px] tracking-wider mt-1" style={{ color: SILVER }}>React Three Fiber / Spline</p>
            </div>

            {/* Metallic scan line */}
            <motion.div className="absolute left-0 right-0 h-px"
              style={{ background: `linear-gradient(to right, transparent, ${SILVER}, transparent)` }}
              animate={{ y: [-200, 200] }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear", repeatDelay: 1 }}
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: SILVER }}>Scroll</span>
        <ChevronDown size={16} style={{ color: SILVER }} />
      </motion.div>
    </section>
  );
}

// ── MANIFESTO ───────────────────────────────────────────────
function ManifestoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="relative py-32 px-6 overflow-hidden bg-white">
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${BORDER}, transparent)` }} />
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${BORDER}, transparent)` }} />

      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div variants={staggerContainer} initial="hidden"
          animate={isInView ? "visible" : "hidden"} className="flex flex-col gap-6">

          <motion.p variants={slideLeft}
            className="text-xs tracking-[0.4em] uppercase" style={{ color: STEEL }}>
            Our Manifesto
          </motion.p>

          <motion.h2 variants={slideLeft}
            className="text-4xl lg:text-6xl font-black leading-tight" style={{ color: INK }}>
            Fashion that{" "}
            <span className="italic" style={{ color: SILVER }}>thinks.</span>
            <br />
            Technology that{" "}
            <span style={{
              backgroundImage: `linear-gradient(to right, ${STEEL}, ${INK})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>breathes.</span>
          </motion.h2>

          <motion.p variants={slideLeft}
            className="text-lg font-light leading-relaxed max-w-2xl" style={{ color: GRAPH }}>
            Every thread in a Pulse Weave garment carries a circuit. Every stitch is a
            sensor. We believe clothing should be alive — monitoring your health,
            reading your environment, and adapting in real-time.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

// ── PRODUCT SHOWCASE ────────────────────────────────────────
const PRODUCTS = [
  {
    id:1, name:"Environment-Adaptive Jacket", tagline:"Smart fabric that reads the room",
    tech:"Climate AI · NanoFiber · Thermal Mesh", icon: Wind,
    accentFrom: STEEL, accentTo: INK, glowColor:"rgba(138,155,176,0.20)",
    link:"/jacket", badge:"Bestseller",
  },
  {
    id:2, name:"Smart Biometric Bag", tagline:"Your identity is the key",
    tech:"Touch ID · GPS · Blockchain Lock", icon: Fingerprint,
    accentFrom: INK, accentTo: STEEL, glowColor:"rgba(26,32,44,0.15)",
    link:"/bag", badge:"New Drop",
  },
  {
    id:3, name:"Pulse Bracelet", tagline:"Health intelligence on your wrist",
    tech:"BPM · SpO2 · Neural Sync", icon: HeartPulse,
    accentFrom: SILVER, accentTo: STEEL, glowColor:"rgba(192,192,192,0.30)",
    link:"/bracelet", badge:"Limited",
  },
];

function ProductShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section className="py-24 px-6 relative" style={{ backgroundColor: BG }}>
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="mb-14 flex flex-col gap-3">
          <p className="text-xs tracking-[0.4em] uppercase" style={{ color: STEEL }}>Flagship Products</p>
          <h2 className="text-4xl lg:text-5xl font-black" style={{ color: INK }}>The SS25 Line</h2>
        </ScrollReveal>

        <motion.div ref={ref} variants={staggerContainer} initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRODUCTS.map((p) => {
            const Icon = p.icon;
            return (
              <motion.div key={p.id} variants={fadeUp}
                whileHover={{ y: -8, boxShadow: `0 20px 60px ${p.glowColor}`, transition: { duration: 0.3 } }}
                className="group">
                <Link to={p.link} className="block h-full">
                  <div className="h-full rounded-xl overflow-hidden flex flex-col"
                    style={{ background:"white", border:`1px solid ${BORDER}` }}>

                    {/* 3D placeholder */}
                    <div className="relative aspect-[4/3] flex items-center justify-center overflow-hidden"
                      style={{ background: `linear-gradient(145deg, ${BG}, #E2E8ED)` }}>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background:`linear-gradient(135deg, ${p.accentFrom}15, ${p.accentTo}08)` }} />
                      <motion.div animate={{ scale:[1,1.06,1] }}
                        transition={{ repeat:Infinity, duration:3.5, ease:"easeInOut", delay:p.id*0.3 }}>
                        <Icon size={48} style={{ color: SILVER }} />
                      </motion.div>
                      <motion.div className="absolute left-0 right-0 h-px"
                        style={{ background:`linear-gradient(to right, transparent, ${SILVER}, transparent)` }}
                        animate={{ y:[-100,100] }}
                        transition={{ repeat:Infinity, duration:2.5, ease:"linear", delay:p.id*0.5, repeatDelay:0.5 }} />
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full"
                        style={{ background:"white", border:`1px solid ${BORDER}` }}>
                        <span className="text-[10px] tracking-widest uppercase" style={{ color: GRAPH }}>{p.badge}</span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col gap-3 flex-1">
                      <div className="h-px w-10 group-hover:w-full transition-all duration-500"
                        style={{ background:`linear-gradient(to right, ${p.accentFrom}, ${p.accentTo})` }} />
                      <h3 className="font-bold text-lg leading-snug" style={{ color: INK }}>{p.name}</h3>
                      <p className="text-sm font-light" style={{ color: GRAPH }}>{p.tagline}</p>
                      <p className="text-xs tracking-wider uppercase mt-auto" style={{ color: SILVER }}>{p.tech}</p>
                      <div className="flex items-center gap-1 text-xs tracking-widest uppercase mt-2"
                        style={{ color: STEEL }}>
                        View Product
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <ScrollReveal className="mt-10 flex justify-center">
          <Link to="/products">
            <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
              className="flex items-center gap-2 px-8 py-3 text-xs tracking-widest uppercase rounded-sm transition-all duration-300"
              style={{ border:`1px solid ${BORDER}`, color:GRAPH, backgroundColor:"transparent" }}>
              View Full Collection <ArrowRight size={12} />
            </motion.button>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ── STATS ───────────────────────────────────────────────────
const STATS = [
  { value:"12",   unit:"ms", label:"Sensor Response Time" },
  { value:"98.7", unit:"%",  label:"Health Data Accuracy" },
  { value:"72",   unit:"hr", label:"Battery Life"         },
  { value:"IP68", unit:"",   label:"Water Resistance"     },
];

function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="py-24 px-6 relative bg-white"
      style={{ borderTop:`1px solid ${BORDER}`, borderBottom:`1px solid ${BORDER}` }}>
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div variants={staggerContainer} initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <motion.div key={i} variants={scalePop}
              className="flex flex-col items-center text-center gap-2 p-6 rounded-xl"
              style={{ background:BG, border:`1px solid ${BORDER}` }}>
              <div className="flex items-end gap-1">
                <span className="text-5xl font-black" style={{ color: INK }}>{s.value}</span>
                <span className="text-2xl font-black mb-1" style={{ color: STEEL }}>{s.unit}</span>
              </div>
              <p className="text-xs tracking-wider uppercase" style={{ color: GRAPH }}>{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── TECH MARQUEE ────────────────────────────────────────────
const TECH_KEYWORDS = [
  "Neural Fabric","BioSensors","ClimateAI","NanoWeave","Smart Lock",
  "GPS Tracking","5G Mesh","Biometric Auth","Health Analytics","AR Integration",
  "Thermal Regulation","Carbon Neutral","Neural Fabric","BioSensors","ClimateAI",
];

function TechBanner() {
  return (
    <section className="py-12 overflow-hidden relative" style={{ backgroundColor: BG }}>
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10"
        style={{ background:`linear-gradient(to right, ${BG}, transparent)` }} />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10"
        style={{ background:`linear-gradient(to left, ${BG}, transparent)` }} />

      <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} transition={{ duration:1 }}
        className="flex gap-8 whitespace-nowrap"
        style={{ animation:"marquee 28s linear infinite" }}>
        {TECH_KEYWORDS.map((kw, i) => (
          <div key={i} className="flex items-center gap-8 flex-shrink-0">
            <span className="text-sm tracking-widest uppercase font-light" style={{ color: SILVER }}>{kw}</span>
            <span className="text-xl font-thin" style={{ color: BORDER }}>·</span>
          </div>
        ))}
      </motion.div>

      <style>{`@keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }`}</style>
    </section>
  );
}

const pageTransition = {
  initial: { opacity:0, y:24 },
  animate: { opacity:1, y:0, transition:{ duration:0.5, ease:"easeOut" } },
  exit:    { opacity:0, y:-16, transition:{ duration:0.3, ease:"easeIn" } },
};

export default function Home() {
  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
      <HeroSection />
      <TechBanner />
      <ManifestoSection />
      <ProductShowcase />
      <StatsSection />
    </motion.div>
  );
}
