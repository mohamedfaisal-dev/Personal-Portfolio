"use client";

import { useState, useEffect } from "react";
import { Menu, X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ResumeLink from "@/components/shared/ResumeLink";

const activeNavPillClass =
  "absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/12 via-white/8 to-cyan-500/12 backdrop-blur-xl border border-white/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_18px_rgba(168,85,247,0.12)] -z-10";

const activeMobileNavPillClass =
  "absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/12 via-white/8 to-cyan-500/12 backdrop-blur-xl border border-white/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_18px_rgba(168,85,247,0.12)]";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Summary", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Key Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return; // Already scheduled
      rafId = requestAnimationFrame(() => {
        rafId = null;
        setScrolled(window.scrollY > 20);

        // Highlight active section
        const sections = navLinks.map(link => link.href.substring(1));
        let currentSection = "home";

        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 120 && rect.bottom >= 120) {
              currentSection = section;
              break;
            }
          }
        }
        setActiveSection(currentSection);
      });
    };

    // passive: true tells browser we won't call preventDefault — enables scroll optimizations
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    if (href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
          scrolled ? "py-4" : "py-6"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="glassmorphism rounded-full px-6 py-3 flex items-center justify-between transition-all duration-300">
            {/* Logo */}
            <a href="#home" className="text-xl font-bold tracking-wider font-space text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-400">
              FAISAL
            </a>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-0.5 lg:gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`px-3 lg:px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-colors duration-300 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
                      isActive
                        ? "text-primary-text font-semibold"
                        : "text-secondary-text hover:text-primary-text"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeNavPill"
                        className={activeNavPillClass}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <span
                        className={`rounded-full shrink-0 transition-all duration-300 ${
                          isActive
                            ? "w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.45)] ring-1 ring-white/20"
                            : "w-0 h-1.5"
                        }`}
                      />
                      {link.name}
                    </span>
                  </a>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Resume Button */}
              <ResumeLink
                className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-sm font-semibold hover:brightness-110 transition-all duration-300 shadow-md shadow-purple-500/10"
              >
                <Download size={15} />
                <span>Resume</span>
              </ResumeLink>
            </div>

            {/* Mobile Menu Actions */}
            <div className="flex md:hidden items-center space-x-2">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full bg-white/5 border border-border-glass text-secondary-text hover:text-primary-text hover:bg-white/10 transition-all duration-300"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-24 mx-6 z-[999] md:hidden"
          >
            <div className="glassmorphism mobile-menu-container rounded-3xl p-6 flex flex-col space-y-4 shadow-xl border border-border-glass backdrop-blur-xl">
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`relative px-4 py-2.5 rounded-xl text-base font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 flex items-center gap-3 overflow-hidden ${
                        isActive
                          ? "text-primary-text font-semibold"
                          : "text-secondary-text hover:bg-white/5 hover:text-primary-text"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="activeMobileNavPill"
                          className={activeMobileNavPillClass}
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span
                        className={`relative z-10 w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-300 ${
                          isActive
                            ? "bg-gradient-to-r from-purple-400 to-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.45)] ring-1 ring-white/20"
                            : "bg-white/10"
                        }`}
                      />
                      <span className="relative z-10">{link.name}</span>
                    </a>
                  );
                })}
              </div>

              <div className="border-t border-border-glass pt-4">
                <ResumeLink
                  className="flex items-center justify-center space-x-2 w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold hover:brightness-110 transition-all duration-300"
                >
                  <Download size={18} />
                  <span>Download Resume</span>
                </ResumeLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
