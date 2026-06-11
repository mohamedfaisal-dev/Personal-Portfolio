"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingActionButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let rafId: number | null = null;

    const toggleVisibility = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        setIsVisible(window.scrollY > 400);
      });
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-[99] p-3.5 rounded-full glassmorphism text-purple-400 hover:text-white shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer"
          aria-label="Scroll to top"
        >
          {/* Pulsing Outer Glow */}
          <div className="absolute inset-0 rounded-full bg-purple-500/10 animate-ping group-hover:bg-cyan-500/10" />
          <ArrowUp size={20} className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
