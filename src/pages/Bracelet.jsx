import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


const BASE_URL = import.meta.env.BASE_URL;
const FRAME_COUNT = 120;

const frameUrls = Array.from({ length: FRAME_COUNT }, (_, i) =>
  `${BASE_URL}vid/bracelet_frames/frame_${String(FRAME_COUNT - i).padStart(3, '0')}.jpg`
);


const T = {
  pageBg: '#000000',
  cardBg: 'rgba(255,255,255,0.04)',
  cardBorder: 'rgba(255,255,255,0.07)',
  cardShadow: '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03)',
  titleColor: '#f1f5f9',
  textColor: '#94a3b8',
  subtitleColor: '#475569',
  accentColor: '#22d3ee',
  accentGlow: 'rgba(34,211,238,0.1)',
  specBg: 'rgba(34,211,238,0.06)',
  specBorder: 'rgba(34,211,238,0.12)',
  specValue: '#22d3ee',
  specLabel: '#475569',
  labelColor: 'rgba(34,211,238,0.35)',
  lineColor: 'linear-gradient(to right, rgba(34,211,238,0.35), rgba(34,211,238,0.06))',
  lineColorReverse: 'linear-gradient(to left, rgba(34,211,238,0.35), rgba(34,211,238,0.06))',
  dotActive: '#22d3ee',
  dotInactive: 'rgba(255,255,255,0.12)',
  hudDot: 'rgba(34,211,238,0.5)',
  hudLine: 'rgba(34,211,238,0.12)',
  bracketColor: 'rgba(34,211,238,0.2)',
  scanRing: 'rgba(34,211,238,0.06)',
  heroGradient: 'linear-gradient(to top, rgba(0,0,0,0.97) 0%, transparent 70%)',
  vignette: 'radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.75) 100%)',
};


const HUD_READOUTS = [
  { pos: 'top-24 left-6 md:left-14', label: 'HEART RATE', value: '72 BPM', sub: 'RESTING', delay: 0.3 },
  { pos: 'top-24 right-6 md:right-14 items-end text-right', label: 'NFC RADIO', value: 'READY', sub: 'v3.1', delay: 0.5 },
  { pos: 'bottom-36 left-6 md:left-14', label: 'SKIN TEMP', value: '36.5°C', sub: 'NOMINAL', delay: 0.7 },
  { pos: 'bottom-36 right-6 md:right-14 items-end text-right', label: 'BATTERY', value: '94%', sub: '14 DAYS', delay: 0.9 },
];


const FEATURES = [
  {
    title: 'Live BPM Heart Rate',
    subtitle: 'Medical-Grade Optics',
    description: 'Medical-grade optical sensors track your heart rate in real-time with 99.2% clinical accuracy. Adaptive algorithms detect irregular rhythms — A-fib, tachycardia, bradycardia — and alert you instantly.',
    align: 'left',
    specs: [{ label: 'Accuracy', value: '99.2%' }, { label: 'Sensors', value: '3' }, { label: 'Latency', value: '<0.5s' }],
    nodeLabel: 'BPM — α',
  },
  {
    title: 'NFC Contact Sharing',
    subtitle: 'Tap-To-Connect Protocol',
    description: 'Tap your bracelet against any NFC-enabled device to instantly share your digital business card, social profiles, or emergency contact information — no app required, works offline.',
    align: 'right',
    specs: [{ label: 'Range', value: '4cm' }, { label: 'Speed', value: '424 kb/s' }, { label: 'Protocol', value: 'ISO 14443' }],
    nodeLabel: 'NFC — β',
  },
  {
    title: 'Circuit-Engraved Obsidian',
    subtitle: 'Volcanic Glass Microetch',
    description: 'Each bead is precision-carved from volcanic obsidian and micro-engraved with functional circuit traces. Equal parts jewellery and technology — the traces illuminate only under direct light.',
    align: 'left',
    specs: [{ label: 'Material', value: 'Obsidian' }, { label: 'Etch Depth', value: '50μm' }, { label: 'Beads', value: '18' }],
    nodeLabel: 'GEM — γ',
  },
  {
    title: 'Thermal Body Tracking',
    subtitle: 'Skin-Contact Thermography',
    description: 'Embedded skin-temperature sensors monitor your core thermal profile throughout the day, detecting fever onset, stress spikes, and recovery patterns in real-time via continuous sampling.',
    align: 'right',
    specs: [{ label: 'Precision', value: '±0.1°C' }, { label: 'Samples', value: '120/min' }, { label: 'Zones', value: '2' }],
    nodeLabel: 'THRM — δ',
  },
];


function preloadImageSet(urls, onLoad) {
  return new Promise((resolve) => {
    const imgs = new Array(urls.length);
    let n = 0;
    urls.forEach((u, i) => {
      const img = new Image();
      img.src = u;
      const done = () => { n++; onLoad?.(); if (n === urls.length) resolve(imgs); };
      img.onload = done;
      img.onerror = done;
      imgs[i] = img;
    });
  });
}

function drawFrame(canvas, frames, idx) {
  if (!canvas || !frames?.length) return;
  const ctx = canvas.getContext('2d');
  const img = frames[Math.min(idx, frames.length - 1)];
  if (!img?.naturalWidth) return;
  if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);
}


const HudPanel = ({ pos, label, value, sub, delay, visible }) => (
  <motion.div
    className={`absolute flex flex-col gap-1 ${pos}`}
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 12 }}
    transition={{ duration: 0.55, delay: visible ? delay : 0, ease: [0.16, 1, 0.3, 1] }}
  >
    <div className="flex items-center gap-1.5">
      <div className="w-1 h-1 rounded-full" style={{ backgroundColor: T.hudDot }} />
      <span className="text-[7px] md:text-[8px] tracking-[0.3em] uppercase font-mono" style={{ color: T.labelColor }}>{label}</span>
    </div>
    <span className="text-base md:text-lg font-mono font-light tracking-wide leading-none" style={{ color: T.titleColor, opacity: 0.7 }}>{value}</span>
    <div className="w-8 h-px" style={{ background: T.hudLine }} />
    <span className="text-[6px] md:text-[7px] tracking-[0.25em] uppercase font-mono" style={{ color: T.subtitleColor }}>{sub}</span>
  </motion.div>
);


const ConnectorLine = ({ align, nodeLabel }) => {
  const isLeft = align === 'left';
  return (
    <motion.div
      className={`absolute top-1/2 flex items-center ${isLeft ? 'left-full ml-2 flex-row' : 'right-full mr-2 flex-row-reverse'}`}
      style={{ transform: 'translateY(-50%)' }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 0.4, delay: 0.5 }}
    >
      <div className="flex-shrink-0 w-px h-4" style={{ background: T.accentColor, opacity: 0.25 }} />
      <motion.div
        className="h-px w-14 md:w-24 lg:w-36 flex-shrink-0"
        style={{ background: isLeft ? T.lineColor : T.lineColorReverse, transformOrigin: isLeft ? 'left center' : 'right center' }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="relative flex-shrink-0"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.4, delay: 1.2, type: 'spring', stiffness: 300, damping: 15 }}
      >
        <div className="w-[6px] h-[6px] rounded-full" style={{ backgroundColor: T.accentColor }} />
        <div className="absolute -inset-[5px] rounded-full" style={{ border: `1px solid ${T.accentColor}`, opacity: 0.2, animation: 'ping-slow 2.5s cubic-bezier(0,0,0.2,1) infinite' }} />
        <div className="absolute -inset-1 rounded-full blur-[3px]" style={{ backgroundColor: T.accentColor, opacity: 0.25 }} />
      </motion.div>
      <motion.span
        className={`flex-shrink-0 text-[7px] md:text-[8px] tracking-[0.25em] uppercase whitespace-nowrap font-mono ${isLeft ? 'ml-2.5' : 'mr-2.5'}`}
        style={{ color: T.labelColor }}
        initial={{ opacity: 0, x: isLeft ? -8 : 8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 1.4 }}
      >
        {nodeLabel}
      </motion.span>
    </motion.div>
  );
};


const FeatureCard = ({ title, subtitle, description, specs, align, index, nodeLabel }) => {
  const isLeft = align === 'left';
  return (
    <div className={`relative ${isLeft ? 'mr-auto md:ml-10 lg:ml-16' : 'ml-auto md:mr-10 lg:mr-16'}`}>
      <ConnectorLine align={align} nodeLabel={nodeLabel} />
      <motion.div
        className="relative max-w-[360px] md:max-w-[420px] p-7 md:p-9 rounded-[26px] backdrop-blur-2xl overflow-hidden"
        style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}`, boxShadow: T.cardShadow }}
        initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 16, scale: 0.97 }}
        whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] pointer-events-none"
          style={{ background: T.accentGlow }} />

        <span className="text-[10px] font-mono tracking-[0.3em] mb-4 block" style={{ color: T.labelColor }}>0{index + 1}</span>
        <div className="w-8 h-[2px] mb-5 rounded-full" style={{ background: `linear-gradient(to right, ${T.accentColor}, ${T.specValue})` }} />
        <p className="text-[9px] tracking-[0.35em] uppercase mb-2 font-semibold" style={{ color: T.subtitleColor }}>{subtitle}</p>
        <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight leading-snug" style={{ color: T.titleColor }}>{title}</h3>
        <p className="text-[13px] md:text-sm leading-[1.75] font-normal mb-5" style={{ color: T.textColor }}>{description}</p>

        <div className="flex flex-wrap gap-2">
          {specs.map((s) => (
            <div key={s.label} className="px-2.5 py-1.5 rounded-lg" style={{ background: T.specBg, border: `1px solid ${T.specBorder}` }}>
              <span className="text-[10px] font-bold tracking-wider block leading-none" style={{ color: T.specValue }}>{s.value}</span>
              <span className="text-[8px] tracking-[0.2em] uppercase block mt-0.5 leading-none" style={{ color: T.specLabel }}>{s.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};


const Bracelet = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const frames = useRef([]);
  const activeSectionRef = useRef(0);
  const sectionRefs = useRef([]);

  const totalSections = FEATURES.length + 1;

  // ── Preload ───────────────────────────────────────────────────
  useEffect(() => {
    let n = 0;
    preloadImageSet(frameUrls, () => { n++; setLoadProgress(n / FRAME_COUNT); })
      .then((imgs) => {
        frames.current = imgs;
        drawFrame(canvasRef.current, imgs, 0);
        setLoaded(true);
      });
  }, []);

  // ── GSAP ScrollTrigger ────────────────────────────────────────
  useLayoutEffect(() => {
    if (!loaded) return;
    const container = containerRef.current;
    if (!container) return;

    ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        const p = self.progress;
        drawFrame(canvasRef.current, frames.current, Math.floor(p * (FRAME_COUNT - 1)));
        const sec = Math.round(p * (totalSections - 1));
        if (sec !== activeSectionRef.current) { activeSectionRef.current = sec; setActiveSection(sec); }
      },
    });

    sectionRefs.current.forEach((sec, i) => {
      if (!sec) return;
      ScrollTrigger.create({
        trigger: sec,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveSection(i + 1),
        onEnterBack: () => setActiveSection(i + 1),
        onLeaveBack: () => { if (i === 0) setActiveSection(0); },
      });
    });

    return () => ScrollTrigger.getAll().forEach((s) => s.kill());
  }, [loaded, totalSections]);

  const introVisible = activeSection === 0;

  return (
    <>
      <style>{`@keyframes ping-slow{0%{transform:scale(1);opacity:.25}75%,100%{transform:scale(2.2);opacity:0}}`}</style>

      {/* ── LOADER ───────────────────────────────────────────── */}
      <AnimatePresence>
        {!loaded && (
          <motion.div key="loader" exit={{ opacity: 0 }} transition={{ duration: 0.9 }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-6"
            style={{ backgroundColor: '#08080c' }}>
            <div className="absolute w-72 h-72 rounded-full blur-[120px] opacity-20"
              style={{ background: 'radial-gradient(circle,#e2e8f0,transparent)' }} />
            <p className="text-white/30 text-[10px] tracking-[0.5em] uppercase z-10 font-mono">Initialising Sequence</p>
            <div className="relative w-56 h-px rounded-full overflow-hidden bg-white/[0.06] z-10">
              <motion.div className="h-full rounded-full" style={{ background: 'linear-gradient(to right,#e2e8f0,#ffffff)' }}
                initial={{ width: 0 }} animate={{ width: `${loadProgress * 100}%` }} transition={{ duration: 0.15 }} />
            </div>
            <p className="text-white/15 text-[11px] font-mono z-10">{Math.round(loadProgress * 100)}%</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MAIN ─────────────────────────────────────────────── */}
      <main
        ref={containerRef}
        className="relative"
        style={{ backgroundColor: T.pageBg, height: `${totalSections * 100}vh` }}
      >
        {/* ── STICKY CANVAS LAYER ────────────────────────────── */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none z-10">

          {/* Vignette */}
          <div className="absolute inset-0 z-20 pointer-events-none" style={{ background: T.vignette }} />

          {/* Canvas container */}
          <div className="relative w-[88vw] max-w-[560px] md:max-w-[640px] aspect-[900/506]">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full rounded-2xl"
              style={{ objectFit: 'contain' }} />
          </div>

          {/* Scan ring */}
          <motion.div className="absolute z-10" animate={{ opacity: introVisible ? 1 : 0 }} transition={{ duration: 0.5 }}>
            <motion.div className="w-[80vw] max-w-[700px] aspect-square rounded-full"
              style={{ border: `1px dashed ${T.scanRing}` }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 30, ease: 'linear' }} />
          </motion.div>

          {/* HUD readouts */}
          {HUD_READOUTS.map((hud) => (
            <HudPanel key={hud.label} {...hud} visible={introVisible} />
          ))}

          {/* Crosshair lines */}
          <motion.div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-[8%] md:px-[15%] z-20 pointer-events-none"
            animate={{ opacity: introVisible ? 1 : 0 }} transition={{ duration: 0.5, delay: introVisible ? 0.4 : 0 }}>
            <div className="w-12 md:w-20 h-px" style={{ background: T.hudLine }} />
            <div className="w-12 md:w-20 h-px" style={{ background: T.hudLine }} />
          </motion.div>

          {/* ── HERO INFO ─────────────────────────────────────── */}
          <motion.div
            className="absolute bottom-0 inset-x-0 z-30 pointer-events-none"
            animate={{ opacity: introVisible ? 1 : 0, y: introVisible ? 0 : 30 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute inset-x-0 bottom-0 h-52" style={{ background: T.heroGradient }} />
            <div className="relative z-10 pb-16 md:pb-20 flex flex-col items-center gap-3 px-6 text-center">
              <p className="text-[8px] md:text-[9px] tracking-[0.5em] uppercase font-mono" style={{ color: T.subtitleColor }}>
                SS 2025 · Volcanic Obsidian
              </p>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight" style={{ color: T.titleColor }}>
                ΔH Pulse<br />
                <span style={{
                  backgroundImage: 'linear-gradient(to right,#e2e8f0,#94a3b8)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>Bracelet</span>
              </h1>
              <div className="flex items-center gap-4 md:gap-6 mt-1 flex-wrap justify-center" style={{ color: T.subtitleColor }}>
                {['$499', 'IP68 Rated', '14-Day Battery', 'NFC Ready'].map((s, i) => (
                  <span key={s} className="flex items-center gap-3 md:gap-4">
                    <span className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase font-mono">{s}</span>
                    {i < 3 && <span className="w-px h-3 bg-current opacity-20" />}
                  </span>
                ))}
              </div>
              <motion.div className="flex flex-col items-center gap-1 mt-4"
                animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}>
                <span className="text-[7px] md:text-[8px] tracking-[0.4em] uppercase" style={{ color: T.subtitleColor, opacity: 0.4 }}>Scroll to explore</span>
                <ChevronDown size={13} style={{ color: T.subtitleColor, opacity: 0.35 }} />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ── FEATURE SECTIONS ───────────────────────────────── */}
        {FEATURES.map((f, i) => (
          <div key={i} ref={(el) => (sectionRefs.current[i] = el)}
            className="h-screen w-full relative flex items-center z-20 px-4 md:px-12 lg:px-20">
            <FeatureCard title={f.title} subtitle={f.subtitle} description={f.description}
              specs={f.specs} align={f.align} index={i} nodeLabel={f.nodeLabel} />
          </div>
        ))}

        {/* ── SECTION DOTS ───────────────────────────────────── */}
        <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2.5">
          {Array.from({ length: totalSections }).map((_, i) => (
            <motion.button key={i}
              onClick={() => {
                const c = containerRef.current;
                if (!c) return;
                const h = c.scrollHeight - window.innerHeight;
                window.scrollTo({ top: c.offsetTop + (i / (totalSections - 1)) * h, behavior: 'smooth' });
              }}
              className="w-[6px] h-[6px] rounded-full cursor-pointer"
              animate={{ scale: activeSection === i ? 1.8 : 1, backgroundColor: activeSection === i ? T.dotActive : T.dotInactive }}
              transition={{ duration: 0.35 }}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default Bracelet;
