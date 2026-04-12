import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Terminal, Zap, Users, Globe, Award, ChevronRight, Send, CheckCircle } from "lucide-react";

const ACCENT = "#22d3ee";
const WHITE = "#f1f5f9";
const MUTED = "#94a3b8";
const SILVER = "#64748b";
const BORDER = "rgba(255,255,255,0.08)";

const pageTransition = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.3 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const timeline = [
  { year: "2020", title: "The Idea", desc: "Two MIT engineers and a fashion designer ask: why can't clothing be intelligent?" },
  { year: "2021", title: "First Prototype", desc: "NanoWeave v0.1 — a jacket that changes colour based on temperature. Clunky, but it worked." },
  { year: "2022", title: "Seed Funding", desc: "$4.2M raised. Moved into our Colombo R&D lab. Hired 12 engineers and 3 textile scientists." },
  { year: "2023", title: "Patent Granted", desc: "US Patent #11,482,391 — Neural Fabric Interface System. The core IP behind every PulseWeave product." },
  { year: "2024", title: "First Collection", desc: "Jacket, Bag, and Bracelet launched at CES. 2,400 pre-orders in 48 hours." },
  { year: "2025", title: "SS25 Drop", desc: "Refined, enhanced, and globally available. This is just the beginning." },
];

const companyStats = [
  { icon: Users, value: "42", label: "Team Members" },
  { icon: Globe, value: "38", label: "Countries Sold" },
  { icon: Award, value: "9", label: "Patents Filed" },
  { icon: Zap, value: "12K+", label: "Units Shipped" },
];

function BrandStory() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section className="pt-20 pb-16 px-6 relative overflow-hidden" style={{ backgroundColor: "#000" }}>
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
        style={{ backgroundColor: "rgba(34,211,238,0.05)" }} />

      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} className="flex flex-col gap-3 mb-16">
          <p className="text-xs tracking-[0.4em] uppercase" style={{ color: ACCENT }}>Our Story</p>
          <h1 className="text-5xl lg:text-7xl font-black leading-tight" style={{ color: WHITE }}>
            Built for <br />
            <span style={{
              backgroundImage: `linear-gradient(to right, ${ACCENT}, ${WHITE})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>Tomorrow.</span>
          </h1>
          <p className="text-lg font-light max-w-2xl leading-relaxed" style={{ color: MUTED }}>
            Pulse Weave is a FashionTech company born at the intersection of materials science,
            artificial intelligence, and human-centred design. We build garments that don't just
            cover you — they know you.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {companyStats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="rounded-xl p-5 flex flex-col gap-2"
              style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${BORDER}` }}>
              <Icon size={16} style={{ color: ACCENT }} />
              <span className="text-3xl font-black" style={{ color: WHITE }}>{value}</span>
              <span className="text-xs tracking-widest uppercase" style={{ color: MUTED }}>{label}</span>
            </div>
          ))}
        </motion.div>

        <div className="h-px mb-12"
          style={{ background: `linear-gradient(to right, transparent, ${BORDER}, transparent)` }} />
        <h2 className="text-2xl font-bold mb-8" style={{ color: WHITE }}>How We Got Here</h2>

        <motion.div ref={ref} variants={stagger} initial="hidden"
          animate={inView ? "visible" : "hidden"} className="flex flex-col">
          {timeline.map((item, i) => (
            <motion.div key={item.year} variants={fadeUp} className="flex gap-6">
              <div className="flex flex-col items-center flex-shrink-0 w-16">
                <div className="w-3 h-3 rounded-full border-2 mt-1"
                  style={{ borderColor: ACCENT, backgroundColor: `${ACCENT}20` }} />
                {i < timeline.length - 1 && (
                  <div className="w-px flex-1 min-h-[48px]" style={{ backgroundColor: BORDER }} />
                )}
              </div>
              <div className="pb-8">
                <span className="text-xs tracking-widest uppercase mb-1 block" style={{ color: ACCENT }}>{item.year}</span>
                <h3 className="font-bold text-lg mb-1" style={{ color: WHITE }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => { e.preventDefault(); setTimeout(() => setSubmitted(true), 400); };

  const inputStyle = (field) => ({
    width: "100%",
    backgroundColor: focused === field ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
    border: `1px solid ${focused === field ? ACCENT : BORDER}`,
    borderRadius: "4px",
    padding: "12px 16px",
    color: WHITE,
    fontSize: "14px",
    fontFamily: "Newsreader, serif",
    outline: "none",
    transition: "all 0.3s",
    boxShadow: focused === field ? `0 0 0 3px ${ACCENT}15` : "none",
  });

  return (
    <section className="py-16 px-6" style={{ backgroundColor: "#050508", borderTop: `1px solid ${BORDER}` }}>
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="flex flex-col gap-3 mb-10">
          <div className="flex items-center gap-2">
            <Terminal size={16} style={{ color: ACCENT }} />
            <p className="text-xs tracking-[0.4em] uppercase" style={{ color: ACCENT }}>Contact Interface</p>
          </div>
          <h2 className="text-4xl font-black" style={{ color: WHITE }}>Open a Channel</h2>
          <p className="text-base font-light leading-relaxed" style={{ color: MUTED }}>
            Press, wholesale, collaborations, or just want to talk tech — our team responds within 24 hours.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="rounded-xl overflow-hidden"
          style={{ border: `1px solid ${BORDER}`, boxShadow: "0 8px 40px rgba(0,0,0,0.4)" }}>

          <div className="flex items-center gap-2 px-5 py-3"
            style={{ backgroundColor: "rgba(255,255,255,0.03)", borderBottom: `1px solid ${BORDER}` }}>
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#FC8181" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#F6AD55" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#68D391" }} />
            <span className="text-xs ml-2 tracking-wider" style={{ color: SILVER, fontFamily: "'Ndot 57 Aligned', sans-serif" }}>
              pulseweave://contact
            </span>
          </div>

          <div className="p-8" style={{ backgroundColor: "rgba(255,255,255,0.02)" }}>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="font-mono text-xs leading-relaxed mb-2" style={{ color: MUTED }}>
                  <span style={{ color: ACCENT }}>$</span> init_contact_session --auth=verified<br />
                  <span style={{ color: "#68D391" }}>✓</span> Secure connection established. Fill fields below.
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[["name", "$ name", "Your full name", "text"], ["email", "$ email", "you@example.com", "email"]].map(([n, lbl, ph, t]) => (
                    <div key={n} className="flex flex-col gap-1.5">
                      <label className="text-xs tracking-widest uppercase font-mono" style={{ color: MUTED }}>
                        <span style={{ color: ACCENT }}>{lbl.split(" ")[0]}</span> {lbl.split(" ")[1]}
                      </label>
                      <input type={t} name={n} value={formData[n]} onChange={handleChange}
                        onFocus={() => setFocused(n)} onBlur={() => setFocused(null)}
                        placeholder={ph} required style={inputStyle(n)} />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs tracking-widest uppercase font-mono" style={{ color: MUTED }}>
                    <span style={{ color: ACCENT }}>$</span> subject
                  </label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange}
                    onFocus={() => setFocused("subject")} onBlur={() => setFocused(null)}
                    placeholder="What's this about?" required style={inputStyle("subject")} />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs tracking-widest uppercase font-mono" style={{ color: MUTED }}>
                    <span style={{ color: ACCENT }}>$</span> message
                  </label>
                  <textarea name="message" value={formData.message} onChange={handleChange}
                    onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                    placeholder="Type your message here..." rows={5} required
                    style={{ ...inputStyle("message"), resize: "none" }} />
                </div>

                <motion.button type="submit"
                  whileHover={{ scale: 1.02, boxShadow: `0 8px 25px rgba(34,211,238,0.15)` }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 py-4 text-sm font-bold tracking-widest uppercase rounded-sm mt-2 text-black"
                  style={{ backgroundColor: ACCENT }}>
                  <Send size={15} />
                  Transmit Message
                  <ChevronRight size={15} />
                </motion.button>
              </form>
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-5 py-10 text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}>
                  <CheckCircle size={52} style={{ color: "#68D391" }} />
                </motion.div>
                <div className="text-sm leading-loose font-mono" style={{ color: MUTED }}>
                  <span style={{ color: "#68D391" }}>✓</span> Message transmitted successfully<br />
                  <span style={{ color: "#68D391" }}>✓</span> Encrypted via TLS 1.3<br />
                  <span style={{ color: ACCENT }}>→</span> Response ETA: &lt; 24 hours<br /><br />
                  <span style={{ color: SILVER }}>Session ID: PW-{Date.now().toString(36).toUpperCase()}</span>
                </div>
                <button onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", subject: "", message: "" }); }}
                  className="text-xs tracking-widest uppercase px-4 py-2 rounded-sm transition-colors"
                  style={{ border: `1px solid ${BORDER}`, color: ACCENT }}>
                  Send Another
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
      <BrandStory />
      <ContactForm />
    </motion.div>
  );
}
