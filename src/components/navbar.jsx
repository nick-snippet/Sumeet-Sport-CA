// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home-section");

  // nav items (order matters)
  const navItems = [
    { label: "Home", id: "home-section" },
    { label: "About", id: "about-section" },
    { label: "Programs", id: "programs-section" },
    { label: "Gallery", id: "gallery-section" },
    { label: "Contact", id: "contact-section" },
  ];

  // scroll-to-section helper (works across routes)
  const scrollToSection = (id) => {
    setOpen(false);
    // small delay if we're navigating from other route
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 350);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // small capsule shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver to set active section reliably.
  // Keeps the current section active until the next section crosses the threshold.
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px", // center of viewport — adjust if needed
      threshold: 0,
    };

    const sections = navItems.map((n) => document.getElementById(n.id)).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
      // entries includes whichever sections intersect the center area; pick the one closest to center
      const visible = entries.filter((e) => e.isIntersecting);
      if (visible.length) {
        // choose the entry whose bounding rect top is closest to 0
        visible.sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));
        setActiveSection(visible[0].target.id);
      } else {
        // fallback: if none intersect, pick the section whose top is above center (last visited)
        const fromTop = sections.map((el) => ({ id: el.id, top: el.getBoundingClientRect().top }));
        fromTop.sort((a, b) => a.top - b.top);
        const candidate = fromTop.reverse().find((c) => c.top <= 150);
        if (candidate) setActiveSection(candidate.id);
      }
    }, observerOptions);

    sections.forEach((sec) => observer.observe(sec));
    return () => sections.forEach((sec) => observer.unobserve(sec));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]); // re-run when route changes so elements exist

  return (
    <nav className="fixed inset-x-0 top-4 z-50 pointer-events-none">
      <div className="flex justify-center px-4">
        <motion.div
          initial={{ y: -14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35 }}
          className={`pointer-events-auto w-full max-w-4xl rounded-full px-4 py-3 flex items-center justify-between gap-6 backdrop-blur-xl border border-white/20 shadow-[0_8px_25px_rgba(0,0,0,0.35)] transition-all duration-300 ${scrolled ? "bg-white/10" : "bg-white/5"}`}
        >
          {/* Logo (left) */}
          <Link to="/" className="flex items-center gap-3 select-none" onClick={() => scrollToSection("home-section")}>
            <img src="/images/logo4.png" alt="logo" className="h-12 w-12 rounded-full shadow-lg object-cover" />
            <span className="text-2xl font-extrabold bg-gradient-to-r from-sky-500 to-pink-500 bg-clip-text text-transparent tracking-wide">SUMEET SPORTS</span>
          </Link>

          {/* Desktop nav buttons */}
          <div className="hidden md:flex flex-1 justify-center gap-4 text-white font-semibold text-lg">
            {navItems.map((item, i) => (
              <button
                key={i}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-1 rounded-full transition flex items-center justify-center
                  ${activeSection === item.id ? "bg-white/20 text-sky-600 shadow-lg ring-1 ring-white/20" : "text-black/90 hover:text-sky-500"}
                `}
                aria-current={activeSection === item.id ? "true" : "false"}
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
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden mt-4 mx-auto w-[92%] rounded-3xl bg-white/90 backdrop-blur-xl border border-gray-200 p-4 text-center shadow-2xl pointer-events-auto"
          >
            {navItems.map((item, i) => (
              <button
                key={i}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full py-3 text-lg font-semibold hover:text-pink-500 hover:bg-gray-50 rounded-full transition mb-2 ${
                  activeSection === item.id ? "bg-white/20" : ""
                }`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}