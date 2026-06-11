"use client";

import { Mail, ArrowUp } from "lucide-react";
import { Github, Linkedin } from "../ui/BrandIcons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-border-glass bg-bg-dark py-12 overflow-hidden">
      {/* Background Accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-gradient-to-t from-purple-500/5 to-transparent blur-[50px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Side: Logo and Copyright */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <a
            href="#home"
            className="text-lg font-bold tracking-wider font-space text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-400"
          >
            FAISAL.DEV
          </a>
          <p className="text-xs text-gray-500 font-mono">
            &copy; {currentYear} Mohamed Faisal. All rights reserved.
          </p>
        </div>

        {/* Middle: Social Links */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/mohamedfaisal-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/5 border border-border-glass hover:border-white/15 text-gray-400 hover:text-white transition-all duration-300 hover:scale-105"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href="https://linkedin.com/in/mohamed-faisal-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/5 border border-border-glass hover:border-white/15 text-gray-400 hover:text-white transition-all duration-300 hover:scale-105"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="mailto:mohamedfaisal.dev@gmail.com"
            className="p-3 rounded-full bg-white/5 border border-border-glass hover:border-white/15 text-gray-400 hover:text-white transition-all duration-300 hover:scale-105"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>

        {/* Right Side: Back to Top Button */}
        <button
          onClick={handleScrollToTop}
          className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-border-glass hover:border-white/15 hover:bg-white/10 text-sm text-gray-400 hover:text-white transition-all duration-300"
          aria-label="Back to top"
        >
          <span>Back to Top</span>
          <ArrowUp size={15} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
        </button>
      </div>
    </footer>
  );
}
