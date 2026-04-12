import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight, Cpu, Wind, HeartPulse,
  ChevronDown, Sparkles, Zap, Shield, Radio,
} from "lucide-react";

const ACCENT = "#22d3ee";
const WHITE = "#f1f5f9";
const SILVER = "#64748b";
const MUTED = "#94a3b8";
const BORDER = "rgba(255,255,255,0.08)";
const BASE = import.meta.env.BASE_URL;

const carouselImages = [
  `${BASE}imgs/C1.png`,
  `${BASE}imgs/C2.png`,
  `${BASE}imgs/C3.jpeg`,
  `${BASE}imgs/C4.png`,
];

const products = [
  {
    id: 1,
    name: "Environment-Adaptive Jacket",
    tagline: "Smart fabric that reads the room",
    tech: "Climate AI · NanoFiber · Thermal Mesh",
    link: "/jacket",
    badge: "Bestseller",
    img: `${BASE}imgs/P2.jpeg`,
    imgHover: `${BASE}imgs/P3.jpeg`,
    accent: [ACCENT, WHITE],
  },
  {
    id: 2,
    name: "Pulse Bracelet",
    tagline: "Health intelligence on your wrist",
    tech: "BPM · SpO2 · Neural Sync",
    link: "/bracelet",
    badge: "Limited",
    img: `${BASE}imgs/p1.jpeg`,
    accent: [SILVER, ACCENT],
  },
];

const stats = [
  { value: "12", unit: "ms", label: "Sensor Response Time" },
  { value: "98.7", unit: "%", label: "Health Data Accuracy" },
  { value: "72", unit: "hr", label: "Battery Life" },
  { value: "IP68", unit: "", label: "Water Resistance" },
];

const techKeywords = [
  "Neural Fabric", "BioSensors", "ClimateAI", "NanoWeave", "Smart Lock",
  "GPS Tracking", "5G Mesh", "Biometric Auth", "Health Analytics", "AR Integration",
  "Thermal Regulation", "Carbon Neutral", "Neural Fabric", "BioSensors", "ClimateAI",
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};
const slideLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};
const scalePop = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "backOut" } },
};
const pageTransition = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.3, ease: "easeIn" } },
};

function ScrollReveal({ children, variants = fadeUp, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.div ref={ref} variants={variants}
      initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

function HeroCarousel() {
  const [active, setActive] = useState(0);
  const len = carouselImages.length;

  useEffect(() => {
    const id = setInterval(() => setActive(i => (i + 1) % len), 3500);
    return () => clearInterval(id);
  }, [len]);

  const getPosition = (i) => {
    const diff = (i - active + len) % len;
    if (diff === 0) return "center";
    if (diff === 1) return "right";
    if (diff === len - 1) return "left";
    return "hidden";
  };

  const transforms = {
    center: { x: "0%", scale: 1, zIndex: 30, opacity: 1, rotateY: 0 },
    left: { x: "-65%", scale: 0.72, zIndex: 20, opacity: 0.5, rotateY: 12 },
    right: { x: "65%", scale: 0.72, zIndex: 20, opacity: 0.5, rotateY: -12 },
    hidden: { x: "0%", scale: 0.5, zIndex: 10, opacity: 0, rotateY: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="relative flex items-center justify-center w-full"
      style={{ perspective: "1200px", minHeight: "420px" }}
    >
      {carouselImages.map((src, i) => {
        const pos = getPosition(i);
        const t = transforms[pos];
        return (
          <motion.div
            key={i}
            animate={{ x: t.x, scale: t.scale, opacity: t.opacity, rotateY: t.rotateY, zIndex: t.zIndex }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute cursor-pointer"
            style={{ width: "75%", maxWidth: "360px", transformStyle: "preserve-3d" }}
            onClick={() => setActive(i)}
          >
            <div className="rounded-2xl overflow-hidden"
              style={{
                boxShadow: pos === "center"
                  ? `0 25px 60px rgba(0,0,0,0.6), 0 0 40px ${ACCENT}15`
                  : "0 10px 30px rgba(0,0,0,0.4)",
                border: pos === "center" ? `1px solid ${ACCENT}30` : `1px solid ${BORDER}`,
              }}>
              <img src={src} alt={`Collection ${i + 1}`}
                className="w-full aspect-[3/4] object-cover" draggable={false} />
            </div>
          </motion.div>
        );
      })}

      <button onClick={() => setActive((active - 1 + len) % len)}
        className="absolute left-0 z-40 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
        style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${BORDER}`, color: WHITE }}>
        ‹
      </button>
      <button onClick={() => setActive((active + 1) % len)}
        className="absolute right-0 z-40 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
        style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${BORDER}`, color: WHITE }}>
        ›
      </button>

      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-40">
        {carouselImages.map((_, i) => (
          <button key={i} onClick={() => setActive(i)}
            className="w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer"
            style={{
              backgroundColor: active === i ? ACCENT : "rgba(255,255,255,0.25)",
              transform: active === i ? "scale(1.5)" : "scale(1)",
            }} />
        ))}
      </div>
    </motion.div>
  );
}

function HeroSection() {
  const words = ["Wear", "The", "Future."];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
      style={{ background: "linear-gradient(145deg, #0a0a0f 0%, #000 40%, #080812 100%)" }}>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[140px]"
          style={{ backgroundColor: "rgba(34,211,238,0.06)" }} />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full blur-[140px]"
          style={{ backgroundColor: "rgba(34,211,238,0.04)" }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
      </div>

      <div className="relative z-10 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col gap-6">

          <motion.div variants={fadeUp} className="w-fit">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border"
              style={{ borderColor: `${ACCENT}30`, backgroundColor: `${ACCENT}10` }}>
              <Sparkles size={12} style={{ color: ACCENT }} />
              <span className="text-xs tracking-widest uppercase" style={{ color: ACCENT }}>
                SS 2025 Collection
              </span>
            </div>
          </motion.div>

          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {words.map((word, i) => (
              <motion.span
                key={i}
                data-heading
                variants={fadeUp}
                transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="text-6xl lg:text-8xl font-black tracking-tight leading-none"
                style={i === 2 ? {
                  backgroundImage: `linear-gradient(135deg, ${ACCENT}, ${WHITE})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                } : { color: WHITE }}
              >
                {word}
              </motion.span>
            ))}
          </div>

          <motion.p variants={fadeUp} className="text-lg font-light leading-relaxed max-w-md" style={{ color: MUTED }}>
            Pulse Weave engineers smart garments that sense, adapt, and respond
            to your world — blurring the line between fashion and technology.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: `0 8px 30px ${ACCENT}40` }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-7 py-3.5 text-sm font-bold tracking-widest uppercase rounded-sm text-black"
                style={{ backgroundColor: ACCENT }}
              >
                Explore Collection <ArrowRight size={15} />
              </motion.button>
            </Link>
            <Link to="/about">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-7 py-3.5 text-sm font-light tracking-widest uppercase rounded-sm transition-colors duration-300"
                style={{ border: `1px solid ${BORDER}`, color: MUTED }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)"}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
              >
                Our Story
              </motion.button>
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-4" style={{ borderTop: `1px solid ${BORDER}` }}>
            {[
              { icon: Cpu, label: "Neural Fabric AI" },
              { icon: Wind, label: "Climate Adaptive" },
              { icon: Shield, label: "Biometric Security" },
              { icon: Radio, label: "5G Integrated" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                style={{ backgroundColor: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}` }}>
                <Icon size={11} style={{ color: ACCENT }} />
                <span className="text-xs" style={{ color: MUTED }}>{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <HeroCarousel />
      </div>

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

function ManifestoSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="relative py-32 px-6 overflow-hidden" style={{ backgroundColor: "#050508" }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${BORDER}, transparent)` }} />
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${BORDER}, transparent)` }} />

      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}
          className="flex flex-col gap-6">

          <motion.p variants={slideLeft} className="text-xs tracking-[0.4em] uppercase" style={{ color: ACCENT }}>
            Our Manifesto
          </motion.p>

          <motion.h2 variants={slideLeft} className="text-4xl lg:text-6xl font-black leading-tight" style={{ color: WHITE }}>
            Fashion that <span className="italic" style={{ color: SILVER }}>thinks.</span>
            <br />
            Technology that{" "}
            <span style={{
              backgroundImage: `linear-gradient(to right, ${ACCENT}, ${WHITE})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>breathes.</span>
          </motion.h2>

          <motion.p variants={slideLeft} className="text-lg font-light leading-relaxed max-w-2xl" style={{ color: MUTED }}>
            Every thread in a Pulse Weave garment carries a circuit. Every stitch is a
            sensor. We believe clothing should be alive — monitoring your health,
            reading your environment, and adapting in real-time.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

function ProductShowcase() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section className="py-24 px-6 relative" style={{ backgroundColor: "#000" }}>
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="mb-14 flex flex-col gap-3">
          <p className="text-xs tracking-[0.4em] uppercase" style={{ color: ACCENT }}>Flagship Products</p>
          <h2 className="text-4xl lg:text-5xl font-black" style={{ color: WHITE }}>The SS25 Line</h2>
        </ScrollReveal>

        <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((p) => (
            <motion.div key={p.id} variants={fadeUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group">
              <Link to={p.link} className="block h-full">
                <div className="h-full rounded-xl overflow-hidden flex flex-col"
                  style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${BORDER}` }}>

                  <div className="relative aspect-[9/16] max-h-[400px] overflow-hidden" style={{ background: "#0a0a10" }}>
                    <img src={p.img} alt={p.name}
                      className="absolute inset-0 w-full h-full object-contain transition-opacity duration-500" />
                    {p.imgHover && (
                      <img src={p.imgHover} alt={`${p.name} hover`}
                        className="absolute inset-0 w-full h-full object-contain transition-opacity duration-500 opacity-0 group-hover:opacity-100" />
                    )}
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(0,0,0,0.5)", border: `1px solid ${BORDER}` }}>
                      <span className="text-[10px] tracking-widest uppercase" style={{ color: MUTED }}>{p.badge}</span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col gap-3 flex-1">
                    <div className="h-px w-10 group-hover:w-full transition-all duration-500"
                      style={{ background: `linear-gradient(to right, ${p.accent[0]}, ${p.accent[1]})` }} />
                    <h3 className="font-bold text-lg leading-snug" style={{ color: WHITE }}>{p.name}</h3>
                    <p className="text-sm font-light" style={{ color: MUTED }}>{p.tagline}</p>
                    <p className="text-xs tracking-wider uppercase mt-auto" style={{ color: SILVER }}>{p.tech}</p>
                    <div className="flex items-center gap-1 text-xs tracking-widest uppercase mt-2" style={{ color: ACCENT }}>
                      View Product
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <ScrollReveal className="mt-10 flex justify-center">
          <Link to="/products">
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-8 py-3 text-xs tracking-widest uppercase rounded-sm"
              style={{ border: `1px solid ${BORDER}`, color: MUTED }}>
              View Full Collection <ArrowRight size={12} />
            </motion.button>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}

function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="py-24 px-6 relative"
      style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, backgroundColor: "#050508" }}>
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div key={i} variants={scalePop}
              className="flex flex-col items-center text-center gap-2 p-6 rounded-xl"
              style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${BORDER}` }}>
              <div className="flex items-end gap-1">
                <span className="text-5xl font-black" style={{ color: WHITE }}>{s.value}</span>
                <span className="text-2xl font-black mb-1" style={{ color: ACCENT }}>{s.unit}</span>
              </div>
              <p className="text-xs tracking-wider uppercase" style={{ color: MUTED }}>{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TechBanner() {
  return (
    <section className="py-12 overflow-hidden relative" style={{ backgroundColor: "#000" }}>
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10"
        style={{ background: "linear-gradient(to right, #000, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10"
        style={{ background: "linear-gradient(to left, #000, transparent)" }} />

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}
        className="flex gap-8 whitespace-nowrap"
        style={{ animation: "marquee 28s linear infinite" }}>
        {techKeywords.map((kw, i) => (
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
