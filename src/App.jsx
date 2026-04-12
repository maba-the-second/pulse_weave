import { BrowserRouter, Routes, Route, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Zap, Menu, X, Instagram, Twitter, Github, ArrowUpRight } from "lucide-react";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Jacket from "./pages/Jacket";
import Bag from "./pages/Bag";
import Bracelet from "./pages/Bracelet";
import About from "./pages/About";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/jacket" element={<Jacket />} />
        <Route path="/bag" element={<Bag />} />
        <Route path="/bracelet" element={<Bracelet />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </AnimatePresence>
  );
}

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/about", label: "About" },
  ];

  const linkBase = "relative text-sm tracking-widest uppercase font-light transition-colors duration-300";
  const linkActive = "text-white font-semibold";
  const linkInactive = "text-white/50 hover:text-white";

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          >
            <Zap size={22} className="text-cyan-400 fill-cyan-400/20" />
          </motion.div>
          <span className="font-major font-bold tracking-[0.25em] uppercase text-white text-sm">
            Pulse<span className="text-cyan-400">Weave</span>
          </span>
        </NavLink>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink to={to} className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkInactive}`
              }>
                {({ isActive }) => (
                  <>
                    {label}
                    <motion.span
                      className="absolute -bottom-1 left-0 h-px bg-cyan-400"
                      initial={{ width: 0 }}
                      animate={{ width: isActive ? "100%" : 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.25 }}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <motion.a
          href="/products"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="hidden md:flex items-center gap-1 px-4 py-2 border border-white/20 text-white/70 text-xs tracking-widest uppercase rounded-sm hover:bg-white/10 transition-colors duration-300"
        >
          Shop Now <ArrowUpRight size={12} />
        </motion.a>

        <button
          className="md:hidden text-white/60 hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <ul className="flex flex-col px-6 py-6 gap-5">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `${linkBase} text-base ${isActive ? linkActive : linkInactive}`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/10 bg-black mt-auto">
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, #22d3ee40, transparent)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Zap size={18} className="text-cyan-400 fill-cyan-400/20" />
            <span className="font-major font-bold tracking-[0.25em] uppercase text-white text-sm">
              Pulse<span className="text-cyan-400">Weave</span>
            </span>
          </div>
          <p className="text-white/40 text-xs leading-relaxed max-w-xs">
            Where intelligent fabric meets the future of human expression.
            Engineered for those who wear tomorrow.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-white/30 text-xs tracking-widest uppercase mb-1">Navigation</h4>
          {[["/", "Home"], ["/products", "Products"], ["/about", "About"]].map(([href, label]) => (
            <a key={href} href={href}
              className="text-white/50 text-xs tracking-wider uppercase hover:text-cyan-400 transition-colors duration-200 w-fit">
              {label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-white/30 text-xs tracking-widest uppercase mb-1">Connect</h4>
          <div className="flex gap-4">
            {[Instagram, Twitter, Github].map((Icon, i) => (
              <motion.a key={i} href="#" whileHover={{ y: -2 }}
                className="text-white/50 hover:text-cyan-400 transition-colors duration-200">
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
          <p className="text-white/20 text-xs mt-auto">
            © {year} PulseWeave Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/pulse_weave/">
      {/* Root wrapper: light metallic background */}
      <div className="min-h-screen bg-[#F0F2F5] text-ink flex flex-col font-news">
        <Navbar />
        <main className="flex-1 pt-16">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
