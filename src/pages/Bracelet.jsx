import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// ── Reusable Feature Card Component ─────────────────────────────
const FeatureCard = ({ title, description, align }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: align === 'left' ? -100 : 100, y: 50 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: false, margin: "-20%" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`max-w-md p-8 rounded-3xl bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] ${
        align === 'left' ? 'mr-auto md:ml-20' : 'ml-auto md:mr-20'
      }`}
    >
      <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">
        {title}
      </h3>
      <p className="text-slate-600 leading-relaxed font-medium">
        {description}
      </p>
    </motion.div>
  );
};

// ── Main Bracelet Page Component ────────────────────────────────
const Bracelet = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // ── Scroll Transformations ──────────────────────────────────────
  const braceletScale = useTransform(scrollYProgress, [0, 1], [0.8, 1.15]);
  const braceletRotate = useTransform(scrollYProgress, [0, 1], [-5, 15]);

  return (
    <main 
      ref={containerRef} 
      className="relative h-[400vh] bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]"
    >
      
      {/* ── STICKY BACKGROUND (The Product) ────────────────────── */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none">
        
        {/* Decorative Background Glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] bg-rose-400/10 rounded-full blur-[100px]"></div>
        </div>

        {/* The Animated Product Image */}
        <motion.div 
          style={{ 
            scale: braceletScale, 
            rotate: braceletRotate 
          }}
          className="relative z-10 w-[400px] h-[500px] flex items-center justify-center"
        >
          {/* PLACEHOLDER: Replace the src with your AI-generated bracelet image */}
          <img 
            src="https://via.placeholder.com/400x600/ffffff/000000?text=DeltaH+Bracelet+Image" 
            alt="DeltaH Pulse Heart-Rate Bracelet"
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </motion.div>
      </div>

      {/* ── SCROLLING CONTENT (The Features) ───────────────────── */}
      <div className="absolute top-0 w-full h-full flex flex-col justify-between py-[50vh] px-6 md:px-20 pointer-events-none">
        
        <div className="pointer-events-auto w-full">
          <FeatureCard 
            align="left" 
            title="Live BPM Heart Rate Monitor" 
            description="Medical-grade optical sensors track your heart rate in real-time with 99.2% clinical accuracy. Adaptive algorithms detect irregular rhythms and alert you instantly."
          />
        </div>

        <div className="pointer-events-auto w-full mt-[50vh]">
          <FeatureCard 
            align="right" 
            title="Digital Contact Sharing (NFC)" 
            description="Tap your bracelet against any NFC-enabled device to instantly share your digital business card, social profiles, or emergency contact information — no app required."
          />
        </div>

        <div className="pointer-events-auto w-full mt-[50vh]">
          <FeatureCard 
            align="left" 
            title="Circuit-Engraved Obsidian Beads" 
            description="Each bead is precision-carved from volcanic obsidian and micro-engraved with functional circuit traces. Equal parts jewellery and technology — visible only under light."
          />
        </div>

        <div className="pointer-events-auto w-full mt-[50vh]">
          <FeatureCard 
            align="right" 
            title="Thermal Body Tracking" 
            description="Embedded skin-temperature sensors monitor your core thermal profile throughout the day, detecting fever onset, stress spikes, and recovery patterns in real-time."
          />
        </div>

      </div>
    </main>
  );
};

export default Bracelet;
