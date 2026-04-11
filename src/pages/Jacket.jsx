import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── Config ──────────────────────────────────────────────────────
const TOTAL_FRAMES = 156;

// Update this path to wherever you place the frames in your project.
// e.g. if frames live in /public/jacket_frames/ use: '/jacket_frames/frame_XXXX.jpg'
const getFramePath = (index) => {
  const padded = String(index).padStart(4, '0');
  return `/jacket_frames/frame_${padded}.jpg`;
};

// ── Theme Definitions ───────────────────────────────────────────
const THEMES = {
  light: {
    pageBg: '#f0f2f5',
    cardBg: 'bg-white/60',
    cardBorder: 'border-white/80',
    cardShadow: 'shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]',
    titleColor: 'text-slate-900',
    textColor: 'text-slate-600',
    toggleBg: 'bg-white/70',
    toggleBorder: 'border-slate-200',
    toggleIcon: Sun,
    toggleLabel: 'Day',
    canvasFilter: 'none',
  },
  dark: {
    pageBg: '#000000',
    cardBg: 'bg-white/[0.06]',
    cardBorder: 'border-white/[0.12]',
    cardShadow: 'shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]',
    titleColor: 'text-white',
    textColor: 'text-slate-400',
    toggleBg: 'bg-white/10',
    toggleBorder: 'border-white/20',
    toggleIcon: Moon,
    toggleLabel: 'Night',
    canvasFilter: 'brightness(0.85) contrast(1.1)',
  },
};

// ── Feature data ────────────────────────────────────────────────
const FEATURES = [
  {
    title: 'ΔH Thermal Shift',
    description:
      'Active thermodynamic regulation. The fabric micro-structure adapts to your body heat and external temperatures instantly.',
    align: 'left',
  },
  {
    title: 'Optic-White Stealth',
    description:
      'Engineered with a pearlescent nano-coating that repels water, stains, and thermal detection while maintaining a pristine luxury aesthetic.',
    align: 'right',
  },
  {
    title: 'Kinetic Seams',
    description:
      'Built for movement. The architectural folds expand and contract with your biomechanics, providing zero-resistance mobility.',
    align: 'left',
  },
  {
    title: 'Smart Node Integration',
    description:
      'Hidden magnetic charging ports and environmental sensors woven directly into the hem of the jacket.',
    align: 'right',
  },
];

// ── Feature Card ────────────────────────────────────────────────
const FeatureCard = ({ title, description, align, theme, isActive }) => {
  const t = THEMES[theme];
  return (
    <motion.div
      initial={false}
      animate={
        isActive
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, x: align === 'left' ? -60 : 60, y: 20 }
      }
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`max-w-md p-8 rounded-3xl backdrop-blur-xl border transition-colors duration-700 ${t.cardBg} ${t.cardBorder} ${t.cardShadow} ${
        align === 'left' ? 'mr-auto md:ml-20' : 'ml-auto md:mr-20'
      }`}
    >
      <h3
        className={`text-2xl font-bold mb-3 tracking-tight transition-colors duration-700 ${t.titleColor}`}
      >
        {title}
      </h3>
      <p
        className={`leading-relaxed font-medium transition-colors duration-700 ${t.textColor}`}
      >
        {description}
      </p>
    </motion.div>
  );
};

// ── Main Jacket Page ────────────────────────────────────────────
const Jacket = () => {
  const [theme, setTheme] = useState('dark');
  const [activeSection, setActiveSection] = useState(-1);
  const [loadProgress, setLoadProgress] = useState(0); // 0–100
  const t = THEMES[theme];
  const ToggleIcon = t.toggleIcon;

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);       // pre-decoded Image objects
  const currentFrameRef = useRef(0);  // track rendered frame to avoid redundant draws
  const sectionRefs = useRef([]);

  const totalSections = FEATURES.length + 1;

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  // ── Preload all frames ────────────────────────────────────────
  useEffect(() => {
    let loaded = 0;
    const images = [];

    // Build array of Image objects
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loaded++;
        setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
        // Draw frame 0 as soon as it lands
        if (i === 0) drawFrame(0, images);
      };
      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      // Let GC clean up
      imagesRef.current = [];
    };
  }, []);

  // ── Draw a specific frame to canvas ──────────────────────────
  const drawFrame = (index, images) => {
    const imgs = images || imagesRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const clampedIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(index)));
    if (clampedIndex === currentFrameRef.current && index !== 0) return; // skip redundant draws
    currentFrameRef.current = clampedIndex;

    const img = imgs[clampedIndex];
    if (!img || !img.complete) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

  // ── GSAP ScrollTrigger: frame scrub + section snapping ───────
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Proxy object GSAP can tween
    const scrubProxy = { frame: 0 };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        snap: {
          snapTo: 1 / (totalSections - 1),
          duration: { min: 0.3, max: 0.6 },
          ease: 'power2.inOut',
        },
        onUpdate: (self) => {
          const section = Math.round(self.progress * (totalSections - 1));
          setActiveSection(section);
        },
      },
    });

    tl.to(scrubProxy, {
      frame: TOTAL_FRAMES - 1,
      ease: 'none',
      onUpdate: () => drawFrame(scrubProxy.frame),
    });

    // Section-specific triggers for feature cards
    sectionRefs.current.forEach((sec, i) => {
      if (!sec) return;
      ScrollTrigger.create({
        trigger: sec,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveSection(i + 1),
        onEnterBack: () => setActiveSection(i + 1),
        onLeaveBack: () => {
          if (i === 0) setActiveSection(0);
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [totalSections]);

  // ── Re-draw when theme filter changes (canvas content stays) ─
  useEffect(() => {
    drawFrame(currentFrameRef.current);
  }, [theme]);

  return (
    <>
      {/* ── LOADING OVERLAY ──────────────────────────────────── */}
      <AnimatePresence>
        {loadProgress < 100 && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
          >
            <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-6">
              Loading
            </p>
            <div className="w-48 h-px bg-white/10 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-cyan-400"
                style={{ width: `${loadProgress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
            <p className="text-white/20 text-xs mt-4 tabular-nums">
              {loadProgress}%
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <main
        ref={containerRef}
        className="relative transition-all duration-700"
        style={{
          backgroundColor: t.pageBg,
          height: `${totalSections * 100}vh`,
        }}
      >
        {/* ── THEME TOGGLE ───────────────────────────────────── */}
        <div className="fixed top-20 right-6 z-50">
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full backdrop-blur-xl border transition-all duration-500 cursor-pointer ${t.toggleBg} ${t.toggleBorder}`}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.25 }}
              >
                <ToggleIcon
                  size={16}
                  className={
                    theme === 'dark' ? 'text-cyan-400' : 'text-slate-700'
                  }
                />
              </motion.span>
            </AnimatePresence>
            <span
              className={`text-xs font-bold tracking-widest uppercase transition-colors duration-500 ${
                theme === 'dark' ? 'text-cyan-400' : 'text-slate-700'
              }`}
            >
              {t.toggleLabel}
            </span>
          </motion.button>
        </div>

        {/* ── STICKY CANVAS ──────────────────────────────────── */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none z-10">
          <div className="w-[450px] h-[540px] rounded-2xl overflow-hidden">
            <canvas
              ref={canvasRef}
              width={720}
              height={540}
              className="w-full h-full"
              style={{
                filter: t.canvasFilter,
                transition: 'filter 0.7s ease',
              }}
            />
          </div>
        </div>

        {/* ── SCROLL SECTIONS ────────────────────────────────── */}

        {/* Section 0: Intro */}
        <div className="h-screen" />

        {/* Sections 1–4: Features */}
        {FEATURES.map((feature, i) => (
          <div
            key={i}
            ref={(el) => (sectionRefs.current[i] = el)}
            className="h-screen w-full relative flex items-center z-20 px-6 md:px-20"
          >
            <FeatureCard
              title={feature.title}
              description={feature.description}
              align={feature.align}
              theme={theme}
              isActive={activeSection === i + 1}
            />
          </div>
        ))}

        {/* ── SECTION DOTS ───────────────────────────────────── */}
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
          {Array.from({ length: totalSections }).map((_, i) => (
            <motion.button
              key={i}
              onClick={() => {
                const container = containerRef.current;
                if (container) {
                  const scrollHeight =
                    container.scrollHeight - window.innerHeight;
                  window.scrollTo({
                    top:
                      container.offsetTop +
                      (i / (totalSections - 1)) * scrollHeight,
                    behavior: 'smooth',
                  });
                }
              }}
              className="w-2 h-2 rounded-full transition-all duration-300 cursor-pointer"
              animate={{
                scale: activeSection === i ? 1.5 : 1,
                backgroundColor:
                  activeSection === i
                    ? theme === 'dark'
                      ? '#22d3ee'
                      : '#1e293b'
                    : theme === 'dark'
                    ? 'rgba(255,255,255,0.2)'
                    : 'rgba(0,0,0,0.15)',
              }}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default Jacket;
