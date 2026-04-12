import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


const BASE_URL = import.meta.env.BASE_URL;
const BOMBER_FRAME_COUNT = 98;
const WHITE_FRAME_COUNT = 93;

const bomberFrameUrls = Array.from({ length: BOMBER_FRAME_COUNT }, (_, i) =>
  `${BASE_URL}vid/bomber_frames/frame_${String(i + 1).padStart(3, '0')}.jpg`
);
const whiteFrameUrls = Array.from({ length: WHITE_FRAME_COUNT }, (_, i) =>
  `${BASE_URL}vid/white_frames/frame_${String(i + 1).padStart(3, '0')}.jpg`
);


const THEMES = {
  light: {
    pageBg: '#edf0f4',
    cardBg: 'rgba(255,255,255,0.45)',
    cardBorder: 'rgba(255,255,255,0.6)',
    cardShadow: '0 8px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)',
    titleColor: '#1a202c',
    textColor: '#4a5568',
    subtitleColor: '#8A9BB0',
    specBg: 'rgba(138,155,176,0.08)',
    specBorder: 'rgba(138,155,176,0.15)',
    specValue: '#1a202c',
    specLabel: '#8A9BB0',
    toggleBg: 'rgba(255,255,255,0.75)',
    toggleBorder: 'rgba(209,217,224,0.8)',
    toggleText: '#1a202c',
    dotActive: '#1a202c',
    dotInactive: 'rgba(0,0,0,0.1)',
    lineColor: 'linear-gradient(to right, rgba(138,155,176,0.35), rgba(138,155,176,0.08))',
    lineColorReverse: 'linear-gradient(to left, rgba(138,155,176,0.35), rgba(138,155,176,0.08))',
    dotColor: '#8A9BB0',
    labelColor: 'rgba(138,155,176,0.45)',
    heroGradient: 'linear-gradient(to top, rgba(237,240,244,0.95) 0%, transparent 70%)',
    vignette: 'radial-gradient(ellipse at center, transparent 45%, rgba(237,240,244,0.7) 100%)',
    hudDot: 'rgba(138,155,176,0.4)',
    hudLine: 'rgba(138,155,176,0.15)',
    bracketColor: 'rgba(138,155,176,0.2)',
    scanRing: 'rgba(138,155,176,0.06)',
  },
  dark: {
    pageBg: '#111a28',
    cardBg: 'rgba(255,255,255,0.05)',
    cardBorder: 'rgba(255,255,255,0.08)',
    cardShadow: '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
    titleColor: '#f1f5f9',
    textColor: '#94a3b8',
    subtitleColor: '#475569',
    specBg: 'rgba(34,211,238,0.06)',
    specBorder: 'rgba(34,211,238,0.12)',
    specValue: '#22d3ee',
    specLabel: '#475569',
    toggleBg: 'rgba(255,255,255,0.06)',
    toggleBorder: 'rgba(255,255,255,0.12)',
    toggleText: '#22d3ee',
    dotActive: '#22d3ee',
    dotInactive: 'rgba(255,255,255,0.12)',
    lineColor: 'linear-gradient(to right, rgba(34,211,238,0.35), rgba(34,211,238,0.06))',
    lineColorReverse: 'linear-gradient(to left, rgba(34,211,238,0.35), rgba(34,211,238,0.06))',
    dotColor: '#22d3ee',
    labelColor: 'rgba(34,211,238,0.35)',
    heroGradient: 'linear-gradient(to top, rgba(17,26,40,0.97) 0%, transparent 70%)',
    vignette: 'radial-gradient(ellipse at center, transparent 45%, rgba(17,26,40,0.75) 100%)',
    hudDot: 'rgba(34,211,238,0.5)',
    hudLine: 'rgba(34,211,238,0.12)',
    bracketColor: 'rgba(34,211,238,0.2)',
    scanRing: 'rgba(34,211,238,0.06)',
  },
};


const HUD_READOUTS = [
  { pos: 'top-24 left-6 md:left-14', label: 'CLIMATE CTRL', value: '23.4°C', sub: 'OPTIMAL', delay: 0.3 },
  { pos: 'top-24 right-6 md:right-14 items-end text-right', label: 'SYS STATUS', value: 'ONLINE', sub: 'v2.5.1', delay: 0.5 },
  { pos: 'bottom-36 left-6 md:left-14', label: 'FABRIC WEAVE', value: 'NW-7', sub: 'ACTIVE', delay: 0.7 },
  { pos: 'bottom-36 right-6 md:right-14 items-end text-right', label: '5G MESH', value: 'LINKED', sub: '48 ms', delay: 0.9 },
];



const FEATURES = [
  {
    title: 'ΔH Thermal Shift',
    subtitle: 'Adaptive Climate Control',
    description: 'Active thermodynamic regulation. The fabric micro-structure reads your body heat signature and external temperature, adapting insulation density in real-time across 12 independent thermal zones.',
    align: 'left',
    specs: [{ label: 'Response', value: '0.3ms' }, { label: 'Range', value: '-20° – 45°C' }, { label: 'Zones', value: '12' }],
    nodeLabel: 'THERM — α',
  },
  {
    title: 'Optic-White Stealth',
    subtitle: 'Nano-Coating Technology',
    description: 'Engineered with a 50nm pearlescent nano-coating. Repels water at a 170° contact angle, resists stains at the molecular level, and defeats passive thermal detection — all while maintaining a pristine luxury aesthetic.',
    align: 'right',
    specs: [{ label: 'Coating', value: '50nm' }, { label: 'Water Angle', value: '170°' }, { label: 'Stain Resist', value: '99.8%' }],
    nodeLabel: 'COAT — β',
  },
  {
    title: 'Kinetic Seams',
    subtitle: 'Biomechanical Engineering',
    description: 'Architectural folds engineered for movement. Each seam expands and contracts with your biomechanics, providing zero-resistance mobility. Rated for over 500K flex cycles with no material fatigue.',
    align: 'left',
    specs: [{ label: 'Flex Cycles', value: '500K+' }, { label: 'Stretch', value: '400%' }, { label: 'Fatigue', value: '0%' }],
    nodeLabel: 'FLEX — γ',
  },
  {
    title: 'Smart Node Integration',
    subtitle: 'Embedded Intelligence',
    description: 'Hidden Qi-2.0 magnetic charging ports and an array of 12 environmental sensors woven directly into the hem. Barometric pressure, UV index, air quality, and ambient noise — all fed to the PulseWeave companion AI.',
    align: 'right',
    specs: [{ label: 'Sensors', value: '12' }, { label: 'Charge', value: 'Qi 2.0' }, { label: 'Data Points', value: '48/sec' }],
    nodeLabel: 'NODE — δ',
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


const HudPanel = ({ pos, label, value, sub, delay, theme, visible }) => {
  const t = THEMES[theme];
  return (
    <motion.div
      className={`absolute flex flex-col gap-1 ${pos}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 12 }}
      transition={{ duration: 0.55, delay: visible ? delay : 0, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center gap-1.5">
        <div
          className="w-1 h-1 rounded-full"
          style={{ backgroundColor: t.hudDot, transition: 'background-color 0.7s' }}
        />
        <span
          className="text-[7px] md:text-[8px] tracking-[0.3em] uppercase font-mono"
          style={{ color: t.labelColor, transition: 'color 0.7s' }}
        >
          {label}
        </span>
      </div>
      <span
        className="text-base md:text-lg font-mono font-light tracking-wide leading-none"
        style={{ color: t.titleColor, opacity: 0.7, transition: 'color 0.7s' }}
      >
        {value}
      </span>
      <div className="w-8 h-px" style={{ background: t.hudLine, transition: 'background 0.7s' }} />
      <span
        className="text-[6px] md:text-[7px] tracking-[0.25em] uppercase font-mono"
        style={{ color: t.subtitleColor, transition: 'color 0.7s' }}
      >
        {sub}
      </span>
    </motion.div>
  );
};



const ConnectorLine = ({ align, theme, nodeLabel }) => {
  const t = THEMES[theme];
  const isLeft = align === 'left';
  return (
    <motion.div
      className={`absolute top-1/2 flex items-center ${isLeft ? 'left-full ml-2 flex-row' : 'right-full mr-2 flex-row-reverse'
        }`}
      style={{ transform: 'translateY(-50%)' }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 0.4, delay: 0.5 }}
    >
      <div className="flex-shrink-0 w-px h-4" style={{ background: t.dotColor, opacity: 0.25, transition: 'background 0.7s' }} />
      <motion.div
        className="h-px w-14 md:w-24 lg:w-36 flex-shrink-0"
        style={{ background: isLeft ? t.lineColor : t.lineColorReverse, transformOrigin: isLeft ? 'left center' : 'right center', transition: 'background 0.7s' }}
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
        <div className="w-[6px] h-[6px] rounded-full" style={{ backgroundColor: t.dotColor, transition: 'background-color 0.7s' }} />
        <div className="absolute -inset-[5px] rounded-full" style={{ border: `1px solid ${t.dotColor}`, opacity: 0.2, animation: 'ping-slow 2.5s cubic-bezier(0,0,0.2,1) infinite', transition: 'border-color 0.7s' }} />
        <div className="absolute -inset-1 rounded-full blur-[3px]" style={{ backgroundColor: t.dotColor, opacity: 0.25, transition: 'background-color 0.7s' }} />
      </motion.div>
      <motion.span
        className={`flex-shrink-0 text-[7px] md:text-[8px] tracking-[0.25em] uppercase whitespace-nowrap font-mono ${isLeft ? 'ml-2.5' : 'mr-2.5'}`}
        style={{ color: t.labelColor, transition: 'color 0.7s' }}
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


const FeatureCard = ({ title, subtitle, description, specs, align, theme, index, nodeLabel }) => {
  const t = THEMES[theme];
  const isLeft = align === 'left';
  return (
    <div className={`relative ${isLeft ? 'mr-auto md:ml-10 lg:ml-16' : 'ml-auto md:mr-10 lg:mr-16'}`}>
      <ConnectorLine align={align} theme={theme} nodeLabel={nodeLabel} />
      <motion.div
        className="relative max-w-[360px] md:max-w-[420px] p-7 md:p-9 rounded-[26px] backdrop-blur-2xl overflow-hidden"
        style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, boxShadow: t.cardShadow, transition: 'background 0.7s, border-color 0.7s, box-shadow 0.7s' }}
        initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 16, scale: 0.97 }}
        whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] pointer-events-none"
          style={{ background: theme === 'dark' ? 'rgba(34,211,238,0.05)' : 'rgba(138,155,176,0.08)', transition: 'background 0.7s' }} />

        <span className="text-[10px] font-mono tracking-[0.3em] mb-4 block" style={{ color: t.labelColor, transition: 'color 0.7s' }}>
          0{index + 1}
        </span>
        <div className="w-8 h-[2px] mb-5 rounded-full"
          style={{ background: theme === 'dark' ? 'linear-gradient(to right, #22d3ee, #0ea5e9)' : 'linear-gradient(to right, #8A9BB0, #1a202c)', transition: 'background 0.7s' }} />
        <p className="text-[9px] tracking-[0.35em] uppercase mb-2 font-semibold" style={{ color: t.subtitleColor, transition: 'color 0.7s' }}>{subtitle}</p>
        <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight leading-snug" style={{ color: t.titleColor, transition: 'color 0.7s' }}>{title}</h3>
        <p className="text-[13px] md:text-sm leading-[1.75] font-normal mb-5" style={{ color: t.textColor, transition: 'color 0.7s' }}>{description}</p>

        <div className="flex flex-wrap gap-2">
          {specs.map((s) => (
            <div key={s.label} className="px-2.5 py-1.5 rounded-lg" style={{ background: t.specBg, border: `1px solid ${t.specBorder}`, transition: 'background 0.7s, border-color 0.7s' }}>
              <span className="text-[10px] font-bold tracking-wider block leading-none" style={{ color: t.specValue, transition: 'color 0.7s' }}>{s.value}</span>
              <span className="text-[8px] tracking-[0.2em] uppercase block mt-0.5 leading-none" style={{ color: t.specLabel, transition: 'color 0.7s' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
//  JACKET PAGE
// ═══════════════════════════════════════════════════════════════
const Jacket = () => {
  const [theme, setTheme] = useState('dark');
  const [activeSection, setActiveSection] = useState(0);
  const [showToggle, setShowToggle] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const t = THEMES[theme];
  const containerRef = useRef(null);
  const bomberCanvasRef = useRef(null);
  const whiteCanvasRef = useRef(null);
  const bomberFrames = useRef([]);
  const whiteFrames = useRef([]);
  const activeSectionRef = useRef(0);
  const sectionRefs = useRef([]);

  // totalSections = 1 intro (from sticky flow) + 4 features = 5
  const totalSections = FEATURES.length + 1;
  const toggleTheme = () => setTheme((p) => (p === 'light' ? 'dark' : 'light'));

  // ── Preload ───────────────────────────────────────────────────
  useEffect(() => {
    let bL = 0, wL = 0;
    const tot = BOMBER_FRAME_COUNT + WHITE_FRAME_COUNT;
    const tick = () => setLoadProgress((bL + wL) / tot);
    Promise.all([
      preloadImageSet(bomberFrameUrls, () => { bL++; tick(); }).then((i) => { bomberFrames.current = i; }),
      preloadImageSet(whiteFrameUrls, () => { wL++; tick(); }).then((i) => { whiteFrames.current = i; }),
    ]).then(() => {
      drawFrame(bomberCanvasRef.current, bomberFrames.current, 0);
      drawFrame(whiteCanvasRef.current, whiteFrames.current, 0);
      setLoaded(true);
    });
  }, []);

  // ── Scroll direction ─────────────────────────────────────────
  useEffect(() => {
    let lastY = window.scrollY, ticking = false;
    const fn = () => { if (ticking) return; ticking = true; requestAnimationFrame(() => { const y = window.scrollY; setShowToggle(y <= lastY || y < 80); lastY = y; ticking = false; }); };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
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
        drawFrame(bomberCanvasRef.current, bomberFrames.current, Math.floor(p * (BOMBER_FRAME_COUNT - 1)));
        drawFrame(whiteCanvasRef.current, whiteFrames.current, Math.floor(p * (WHITE_FRAME_COUNT - 1)));
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
            style={{ backgroundColor: '#070d17' }}>
            <div className="absolute w-72 h-72 rounded-full blur-[120px] opacity-20"
              style={{ background: 'radial-gradient(circle,#22d3ee,transparent)' }} />
            <p className="text-white/30 text-[10px] tracking-[0.5em] uppercase z-10 font-mono">Initialising Sequence</p>
            <div className="relative w-56 h-px rounded-full overflow-hidden bg-white/[0.06] z-10">
              <motion.div className="h-full rounded-full" style={{ background: 'linear-gradient(to right,#22d3ee,#0ea5e9)' }}
                initial={{ width: 0 }} animate={{ width: `${loadProgress * 100}%` }} transition={{ duration: 0.15 }} />
            </div>
            <p className="text-white/15 text-[11px] font-mono z-10">{Math.round(loadProgress * 100)}%</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MAIN CONTAINER ───────────────────────────────────── */}
      <main
        ref={containerRef}
        className="relative"
        style={{ backgroundColor: t.pageBg, transition: 'background-color 0.9s ease', height: `${totalSections * 100}vh` }}
      >
        {/* ── THEME TOGGLE ───────────────────────────────────── */}
        <motion.div className="fixed top-20 left-1/2 z-50" style={{ x: '-50%' }}
          animate={{ opacity: showToggle ? 1 : 0, y: showToggle ? 0 : -28 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
          <motion.button onClick={toggleTheme} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
            className="flex items-center gap-3 px-6 py-2.5 rounded-full backdrop-blur-2xl cursor-pointer select-none"
            style={{
              background: t.toggleBg, border: `1px solid ${t.toggleBorder}`,
              boxShadow: theme === 'dark' ? '0 4px 24px rgba(0,0,0,0.5)' : '0 4px 20px rgba(0,0,0,0.06)',
              transition: 'background 0.7s, border-color 0.7s, box-shadow 0.7s', pointerEvents: showToggle ? 'auto' : 'none'
            }}>
            <AnimatePresence mode="wait">
              <motion.span key={theme} initial={{ rotate: -90, opacity: 0, scale: 0.4 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: 90, opacity: 0, scale: 0.4 }}
                transition={{ duration: 0.25 }} className="flex">
                {theme === 'dark' ? <Moon size={14} style={{ color: t.toggleText }} /> : <Sun size={14} style={{ color: t.toggleText }} />}
              </motion.span>
            </AnimatePresence>
            <span className="text-[10px] font-bold tracking-[0.22em] uppercase" style={{ color: t.toggleText, transition: 'color 0.7s' }}>
              {theme === 'dark' ? 'Night' : 'Day'}
            </span>
          </motion.button>
        </motion.div>

        {/* ══════════════════════════════════════════════════════
            STICKY CANVAS LAYER
            ─ The sticky div takes 100vh of document flow,
              serving as the intro section. No separate
              intro div needed, so no overflow into footer.
           ══════════════════════════════════════════════════════ */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none z-10">

          {/* Vignette */}
          <div className="absolute inset-0 z-20 pointer-events-none"
            style={{ background: t.vignette, transition: 'background 0.9s' }} />

          {/* ── Canvas container + corner brackets ─────────── */}
          <div className="relative w-[82vw] max-w-[420px] md:max-w-[460px] aspect-[3/4]">
            <canvas ref={bomberCanvasRef} className="absolute inset-0 w-full h-full rounded-2xl"
              style={{ opacity: theme === 'dark' ? 1 : 0, transition: 'opacity 0.9s ease', objectFit: 'contain' }} />
            <canvas ref={whiteCanvasRef} className="absolute inset-0 w-full h-full rounded-2xl"
              style={{ opacity: theme === 'light' ? 1 : 0, transition: 'opacity 0.9s ease', objectFit: 'contain' }} />

            {/* Corner brackets (scan frame) */}
            <motion.div className="absolute inset-0 z-30"
              animate={{ opacity: introVisible ? 1 : 0 }}
              transition={{ duration: 0.5 }}>
              {[
                { t: '-3px', l: '-3px', bt: '1px solid', bl: '1px solid', br: 'none', bb: 'none' },
                { t: '-3px', r: '-3px', bt: '1px solid', br: '1px solid', bl: 'none', bb: 'none' },
                { b: '-3px', l: '-3px', bb: '1px solid', bl: '1px solid', br: 'none', bt: 'none' },
                { b: '-3px', r: '-3px', bb: '1px solid', br: '1px solid', bl: 'none', bt: 'none' },
              ].map((s, i) => (
                <div key={i} className="absolute w-5 h-5"
                  style={{
                    top: s.t, left: s.l, right: s.r, bottom: s.b,
                    borderTop: s.bt, borderLeft: s.bl, borderRight: s.br, borderBottom: s.bb,
                    borderColor: t.bracketColor, transition: 'border-color 0.7s',
                  }} />
              ))}
            </motion.div>
          </div>

          {/* ── Scan ring (rotating dashed circle) ─────────── */}
          <motion.div
            className="absolute z-10"
            animate={{ opacity: introVisible ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-[75vw] max-w-[540px] aspect-square rounded-full"
              style={{ border: `1px dashed ${t.scanRing}`, transition: 'border-color 0.7s' }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
            />
          </motion.div>

          {/* ── HUD data readouts (visible during intro) ────── */}
          {HUD_READOUTS.map((hud) => (
            <HudPanel key={hud.label} {...hud} theme={theme} visible={introVisible} />
          ))}

          {/* ── Center crosshair lines (horizontal) ─────────── */}
          <motion.div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-[8%] md:px-[15%] z-20 pointer-events-none"
            animate={{ opacity: introVisible ? 1 : 0 }}
            transition={{ duration: 0.5, delay: introVisible ? 0.4 : 0 }}>
            <div className="w-12 md:w-20 h-px" style={{ background: t.hudLine, transition: 'background 0.7s' }} />
            <div className="w-12 md:w-20 h-px" style={{ background: t.hudLine, transition: 'background 0.7s' }} />
          </motion.div>


          {/* ── HERO INFO (bottom of sticky area) ────────────── */}
          <motion.div
            className="absolute bottom-0 inset-x-0 z-30 pointer-events-none"
            animate={{ opacity: introVisible ? 1 : 0, y: introVisible ? 0 : 30 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Gradient backdrop */}
            <div className="absolute inset-x-0 bottom-0 h-52"
              style={{ background: t.heroGradient, transition: 'background 0.9s' }} />

            <div className="relative z-10 pb-16 md:pb-20 flex flex-col items-center gap-3 px-6 text-center">

              <p className="text-[8px] md:text-[9px] tracking-[0.5em] uppercase font-mono"
                style={{ color: t.subtitleColor, transition: 'color 0.7s' }}>
                SS 2025 · Neural Fabric AI
              </p>

              <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight"
                style={{ color: t.titleColor, transition: 'color 0.7s' }}>
                Environment-Adaptive<br />
                <span style={{
                  backgroundImage: theme === 'dark'
                    ? 'linear-gradient(to right,#22d3ee,#0ea5e9)'
                    : 'linear-gradient(to right,#8A9BB0,#1a202c)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>Jacket</span>
              </h1>

              {/* Quick specs row */}
              <div className="flex items-center gap-4 md:gap-6 mt-1 flex-wrap justify-center"
                style={{ color: t.subtitleColor, transition: 'color 0.7s' }}>
                {['$1,299', 'IP68 Rated', '72hr Battery', '12 Sensors'].map((s, i) => (
                  <span key={s} className="flex items-center gap-3 md:gap-4">
                    <span className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase font-mono">{s}</span>
                    {i < 3 && <span className="w-px h-3 bg-current opacity-20" />}
                  </span>
                ))}
              </div>

              {/* Scroll indicator */}
              <motion.div className="flex flex-col items-center gap-1 mt-4"
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}>
                <span className="text-[7px] md:text-[8px] tracking-[0.4em] uppercase"
                  style={{ color: t.subtitleColor, opacity: 0.4, transition: 'color 0.7s' }}>
                  Scroll to explore
                </span>
                <ChevronDown size={13} style={{ color: t.subtitleColor, opacity: 0.35, transition: 'color 0.7s' }} />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ── FEATURE SECTIONS (4 × h-screen) ────────────────── */}
        {FEATURES.map((f, i) => (
          <div key={i} ref={(el) => (sectionRefs.current[i] = el)}
            className="h-screen w-full relative flex items-center z-20 px-4 md:px-12 lg:px-20">
            <FeatureCard title={f.title} subtitle={f.subtitle} description={f.description}
              specs={f.specs} align={f.align} theme={theme} index={i} nodeLabel={f.nodeLabel} />
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
              animate={{ scale: activeSection === i ? 1.8 : 1, backgroundColor: activeSection === i ? t.dotActive : t.dotInactive }}
              transition={{ duration: 0.35 }}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default Jacket;
