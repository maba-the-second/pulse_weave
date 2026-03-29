import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import jacketVideo from '../assets/Jacket_assets/Technical_Jacket_Reveal_Video.webm';

gsap.registerPlugin(ScrollTrigger);

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
    description: 'Active thermodynamic regulation. The fabric micro-structure adapts to your body heat and external temperatures instantly.',
    align: 'left',
  },
  {
    title: 'Optic-White Stealth',
    description: 'Engineered with a pearlescent nano-coating that repels water, stains, and thermal detection while maintaining a pristine luxury aesthetic.',
    align: 'right',
  },
  {
    title: 'Kinetic Seams',
    description: 'Built for movement. The architectural folds expand and contract with your biomechanics, providing zero-resistance mobility.',
    align: 'left',
  },
  {
    title: 'Smart Node Integration',
    description: 'Hidden magnetic charging ports and environmental sensors woven directly into the hem of the jacket.',
    align: 'right',
  },
];

// ── Feature Card ────────────────────────────────────────────────
const FeatureCard = ({ title, description, align, theme, isActive }) => {
  const t = THEMES[theme];
  return (
    <motion.div
      initial={false}
      animate={isActive
        ? { opacity: 1, x: 0, y: 0 }
        : { opacity: 0, x: align === 'left' ? -60 : 60, y: 20 }
      }
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`max-w-md p-8 rounded-3xl backdrop-blur-xl border transition-colors duration-700 ${t.cardBg} ${t.cardBorder} ${t.cardShadow} ${
        align === 'left' ? 'mr-auto md:ml-20' : 'ml-auto md:mr-20'
      }`}
    >
      <h3 className={`text-2xl font-bold mb-3 tracking-tight transition-colors duration-700 ${t.titleColor}`}>
        {title}
      </h3>
      <p className={`leading-relaxed font-medium transition-colors duration-700 ${t.textColor}`}>
        {description}
      </p>
    </motion.div>
  );
};

// ── Main Jacket Page ────────────────────────────────────────────
const Jacket = () => {
  const [theme, setTheme] = useState('dark');
  const [activeSection, setActiveSection] = useState(-1);
  const [introDone, setIntroDone] = useState(false);
  const t = THEMES[theme];
  const ToggleIcon = t.toggleIcon;

  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const triggerRef = useRef(null);
  const sectionRefs = useRef([]);

  const totalSections = FEATURES.length + 1; // intro + features

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  // ── 3.5s intro: autoplay video, lock scroll ───────────────────
  useEffect(() => {
    // Lock body scroll during intro
    document.body.style.overflow = 'hidden';

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }

    const timer = setTimeout(() => {
      document.body.style.overflow = '';
      if (videoRef.current) {
        videoRef.current.pause();
      }
      setIntroDone(true);
    }, 3500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  // ── GSAP ScrollTrigger: video scrub + section snapping ────────
  useLayoutEffect(() => {
    if (!introDone) return;

    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Wait for video metadata
    const setup = () => {
      const duration = video.duration || 1;

      // Main video scrub timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,           // 0.5s smooth catch-up
          snap: {
            snapTo: 1 / (totalSections - 1),  // snap to each section
            duration: { min: 0.3, max: 0.6 },
            ease: 'power2.inOut',
          },
          onUpdate: (self) => {
            // Track active section
            const section = Math.round(self.progress * (totalSections - 1));
            setActiveSection(section);
          },
        },
      });

      // Scrub video from current time to end
      tl.to(video, {
        currentTime: duration,
        ease: 'none',
      });

      // Section-specific ScrollTriggers for feature cards
      sectionRefs.current.forEach((sec, i) => {
        if (!sec) return;
        ScrollTrigger.create({
          trigger: sec,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveSection(i + 1),
          onEnterBack: () => setActiveSection(i + 1),
          onLeave: () => {},
          onLeaveBack: () => { if (i === 0) setActiveSection(0); },
        });
      });
    };

    if (video.readyState >= 1) {
      setup();
    } else {
      video.addEventListener('loadedmetadata', setup, { once: true });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [introDone, totalSections]);

  return (
    <>
      <main
        ref={containerRef}
        className="relative transition-all duration-700"
        style={{
          backgroundColor: t.pageBg,
          // 1 intro screen + 1 screen per feature
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
                <ToggleIcon size={16} className={theme === 'dark' ? 'text-cyan-400' : 'text-slate-700'} />
              </motion.span>
            </AnimatePresence>
            <span className={`text-xs font-bold tracking-widest uppercase transition-colors duration-500 ${theme === 'dark' ? 'text-cyan-400' : 'text-slate-700'}`}>
              {t.toggleLabel}
            </span>
          </motion.button>
        </div>

        {/* ── STICKY VIDEO ───────────────────────────────────── */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none z-10">
          <div className="w-[450px] h-[550px] rounded-2xl overflow-hidden">
            <video
              ref={videoRef}
              src={jacketVideo}
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
              style={{
                filter: t.canvasFilter,
                transition: 'filter 0.7s ease',
              }}
            />
          </div>
        </div>

        {/* ── SCROLL SECTIONS ────────────────────────────────── */}

        {/* Section 0: Intro (empty — just the product) */}
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
                  const scrollHeight = container.scrollHeight - window.innerHeight;
                  window.scrollTo({
                    top: container.offsetTop + (i / (totalSections - 1)) * scrollHeight,
                    behavior: 'smooth',
                  });
                }
              }}
              className="w-2 h-2 rounded-full transition-all duration-300 cursor-pointer"
              animate={{
                scale: activeSection === i ? 1.5 : 1,
                backgroundColor: activeSection === i
                  ? (theme === 'dark' ? '#22d3ee' : '#1e293b')
                  : (theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'),
              }}
            />
          ))}
        </div>

      </main>
    </>
  );
};

export default Jacket;
