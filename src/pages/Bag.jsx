import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function FeatureCard({ title, description, align }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: align === "left" ? -100 : 100, y: 50 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: false, margin: "-20%" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`max-w-md p-8 rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.4)] ${
        align === "left" ? "mr-auto md:ml-20" : "ml-auto md:mr-20"
      }`}
    >
      <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{title}</h3>
      <p className="text-slate-400 leading-relaxed font-medium">{description}</p>
    </motion.div>
  );
}

export default function Bag() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const bagScale = useTransform(scrollYProgress, [0, 1], [0.8, 1.15]);
  const bagRotate = useTransform(scrollYProgress, [0, 1], [-5, 15]);

  return (
    <main ref={containerRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] bg-cyan-400/5 rounded-full blur-[100px]" />
        </div>

        <motion.div
          style={{ scale: bagScale, rotate: bagRotate }}
          className="relative z-10 w-[400px] h-[500px] flex items-center justify-center"
        >
          <img
            src="https://via.placeholder.com/400x600/ffffff/000000?text=DeltaH+Bag+Image"
            alt="DeltaH Smart Biometric Bag"
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </motion.div>
      </div>

      <div className="absolute top-0 w-full h-full flex flex-col justify-between py-[50vh] px-6 md:px-20 pointer-events-none">
        <div className="pointer-events-auto w-full">
          <FeatureCard
            align="left"
            title="Biometric Fingerprint Lock"
            description="256-bit AES encrypted biometric authentication. The bag's clasp reads your unique fingerprint and vein pattern — unlocking only for you with 99.97% accuracy."
          />
        </div>

        <div className="pointer-events-auto w-full mt-[50vh]">
          <FeatureCard
            align="right"
            title="Live GPS Tracking"
            description="Real-time location tracking with 3-metre accuracy across 12 satellites. Know exactly where your bag is at all times, with full route history and geofenced alerts."
          />
        </div>

        <div className="pointer-events-auto w-full mt-[50vh]">
          <FeatureCard
            align="left"
            title="Anti-Theft Proximity Alerts"
            description="Intelligent proximity sensors trigger instant vibration and smartphone alerts the moment your bag moves beyond a customisable safety radius."
          />
        </div>

        <div className="pointer-events-auto w-full mt-[50vh]">
          <FeatureCard
            align="right"
            title="Premium Metallic Leather"
            description="Hand-finished full-grain leather with a pearlescent nano-coating. Water-resistant, stain-proof, and engineered to develop a richer patina with age."
          />
        </div>
      </div>
    </main>
  );
}
