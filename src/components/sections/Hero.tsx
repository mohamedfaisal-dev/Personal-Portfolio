"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowRight, Download } from "lucide-react";
import Magnetic from "../ui/Magnetic";
import ResumeLink from "@/components/shared/ResumeLink";

// Load 3D Canvas dynamically on the client-side only to ensure high performance and zero SSR hydration mismatch.
const Hero3D = dynamic(() => import("../canvas/Hero3D"), { ssr: false });

const words = ["Full Stack Developer", "Software Engineer", "Problem Solver"];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollTo = (id: string) => {
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-dark px-6 pt-24 scroll-mt-28"
    >
      {/* 3D Interactive Background */}
      <Hero3D />

      {/* Decorative Radial Shadows & Glows */}
      <div className="absolute top-1/4 left-1/4 glow-blur-primary opacity-30" />
      <div className="absolute bottom-1/4 right-1/4 glow-blur-secondary opacity-35" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center select-none">
        {/* Intro Tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-4 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-mono tracking-widest uppercase"
        >
          Welcome to my digital space
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 font-space text-primary-text leading-none"
        >
          Hello, I&apos;m{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-500 to-cyan-400">
            Mohamed Faisal
          </span>
        </motion.h1>

        {/* Rotating Subtitle */}
        <div className="h-12 md:h-16 flex items-center justify-center overflow-hidden mb-10">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="text-2xl md:text-4xl font-semibold font-space text-secondary-text tracking-wide"
            >
              {words[index]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="max-w-2xl text-secondary-text text-base md:text-lg mb-12 leading-relaxed"
        >
          Full Stack Developer with 1+ year of production experience shipping Xenbite - a live food-tech SaaS (Fresh Food & Surplus Meals marketplace) on the App Store & Google Play - using React Native, serverless AWS, and Stripe.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Magnetic>
            <button
              onClick={() => handleScrollTo("#projects")}
              className="flex items-center space-x-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-sm font-semibold hover:brightness-110 shadow-lg shadow-purple-500/20 transition-all duration-300"
            >
              <span>View Projects</span>
              <ArrowRight size={16} />
            </button>
          </Magnetic>

          <Magnetic>
            <ResumeLink
              className="flex items-center space-x-2 px-7 py-3.5 rounded-full bg-white/5 border border-border-glass hover:bg-white/10 text-primary-text text-sm font-semibold transition-all duration-300"
            >
              <Download size={16} />
              <span>Download CV</span>
            </ResumeLink>
          </Magnetic>

          <Magnetic>
            <button
              onClick={() => handleScrollTo("#contact")}
              className="px-7 py-3.5 rounded-full border border-border-glass bg-white/3 hover:bg-white/7 text-secondary-text hover:text-primary-text text-sm font-semibold transition-all duration-300"
            >
              Contact Me
            </button>
          </Magnetic>
        </motion.div>
      </div>

      {/* Floating Mouse Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0], y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        onClick={() => handleScrollTo("#about")}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 cursor-pointer z-10"
      >
        <span className="text-[10px] font-mono tracking-widest text-secondary-text uppercase">
          Scroll Down
        </span>
        <div className="w-[22px] h-[36px] rounded-full border-2 border-border-glass flex justify-center p-1.5">
          <div className="w-[3px] h-[6px] rounded-full bg-purple-400 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}
