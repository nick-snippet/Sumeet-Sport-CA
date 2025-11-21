import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // scroll-to-section helper: if not on home path navigate to "/" then scroll
  const scrollToSection = (id) => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 350);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navItems = [
    { label: "Home", id: "home-section" },
    { label: "About", id: "about-section" },
    { label: "Programs", id: "programs-section" },
    { label: "Gallery", id: "gallery-section" },
    { label: "Contact", id: "contact-section" },
  ];

  return (
    <nav className="fixed inset-x-0 top-4 z-50 pointer-events-none">
      <div className="flex justify-center px-4">
        <motion.div
          initial={{ y: -14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35 }}
          className={`pointer-events-auto w-full max-w-6xl rounded-full px-6 py-3 flex items-center justify-between gap-6 backdrop-blur-xl border border-white/20 shadow-[0_8px_25px_rgba(0,0,0,0.35)] transition-all duration-300 ${scrolled ? "bg-white/10" : "bg-white/5"}`}
        >
          {/* Logo (floating to left of capsule) */}
          <Link to="/" className="flex items-center gap-3 select-none" onClick={() => scrollToSection("home-section")}>
            <img src="/images/logo4.png" alt="logo" className="h-12 w-12 rounded-full shadow-lg object-cover" />
            <span className="text-2xl font-extrabold bg-sky-200 bg-gradient-to-r from-sky-500 to-pink-500 bg-clip-text text-transparent tracking-wide">SUMEET SPORTS</span>
          </Link>

          {/* Desktop nav buttons (capsule center) */}
          <div className="hidden md:flex flex-1 justify-center gap-4 text-black font-semibold text-lg">
            {navItems.map((item, i) => (
              <button
                key={i}
                onClick={() => scrollToSection(item.id)}
                className="relative px-4 py-1 rounded-full transition hover:text-red-500 hover:shadow-md"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-black text-2xl pointer-events-auto" onClick={() => setOpen(!open)} aria-label="menu">
            {open ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </motion.div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="md:hidden mt-4 mx-auto w-[92%] rounded-3xl bg-white/90 backdrop-blur-xl border border-gray-200 p-4 text-center shadow-2xl pointer-events-auto">
            {navItems.map((item, i) => (
              <button key={i} onClick={() => scrollToSection(item.id)} className="block w-full py-3 text-lg font-semibold hover:text-pink-500 hover:bg-gray-50 rounded-full transition mb-2">
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}