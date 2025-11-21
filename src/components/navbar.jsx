import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home-section");

  const location = useLocation();
  const navigate = useNavigate();

  // ============================
  //  SHRINK NAVBAR ON SCROLL
  // ============================
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ============================
  //  NAVIGATION ITEMS
  // ============================
  const navItems = [
    { label: "Home", id: "home-section" },
    { label: "About", id: "about-section" },
    { label: "Programs", id: "programs-section" },
    { label: "Gallery", id: "gallery-section" },
    { label: "Contact", id: "contact-section" },
  ];

  // =====================================
  //   INTERSECTION OBSERVER for ACTIVE TAB
  // =====================================
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 } // 👈 smooth flow — doesn’t jump to Home
    );

    navItems.forEach((item) => {
      const sec = document.getElementById(item.id);
      if (sec) observer.observe(sec);
    });

    return () => {
      navItems.forEach((item) => {
        const sec = document.getElementById(item.id);
        if (sec) observer.unobserve(sec);
      });
    };
  }, []);

  // ============================
  //  SCROLL TO SECTION
  // ============================
  const scrollToSection = (id) => {
    setOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 350);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // ============================================================
  //  NAVBAR RENDER
  // ============================================================
  return (
    <nav className="fixed inset-x-0 top-4 z-50 pointer-events-none">
      <div className="flex justify-center px-4">
        <motion.div
          initial={{ y: -14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35 }}
          className={`pointer-events-auto w-full max-w-4xl rounded-full px-4 py-3 flex items-center justify-between gap-6 backdrop-blur-xl border border-white/20 shadow-[0_8px_25px_rgba(0,0,0,0.35)] transition-all duration-300 ${
            scrolled ? "bg-white/10" : "bg-white/5"
          }`}
        >
          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center gap-3 select-none"
            onClick={() => scrollToSection("home-section")}
          >
            <img
              src="/images/logo4.png"
              alt="logo"
              className="h-12 w-12 rounded-full shadow-lg object-cover"
            />
            <span className="text-2xl font-extrabold bg-gradient-to-r from-sky-500 to-pink-500 bg-clip-text text-transparent tracking-wide">
              SUMEET SPORTS
            </span>
          </Link>

          {/* ================= DESKTOP NAVBAR ================= */}
          <div className="hidden md:flex flex-1 justify-center gap-4 text-white font-semibold text-lg">
            {navItems.map((item, i) => (
              <button
                key={i}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-1 rounded-full transition-all duration-300
                  hover:text-red-500 hover:shadow-md
                  ${
                    activeSection === item.id
                      ? "bg-white/20 shadow-lg backdrop-blur-xl text-black"
                      : ""
                  }
                `}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* MOBILE MENU ICON */}
          <button
            className="md:hidden text-black text-2xl pointer-events-auto"
            onClick={() => setOpen(!open)}
            aria-label="menu"
          >
            {open ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </motion.div>
      </div>

      {/* ================= MOBILE DROPDOWN ================= */}
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
                className={`block w-full py-3 text-lg font-semibold rounded-full transition mb-2
                  ${
                    activeSection === item.id
                      ? "bg-sky-300 shadow-md text-black"
                      : "hover:text-pink-500 hover:bg-gray-50"
                  }
                `}
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