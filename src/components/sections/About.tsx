"use client";

import { motion } from "framer-motion";
import { User, Code, GraduationCap, Cpu, Sparkles } from "lucide-react";

const cards = [
  {
    icon: <Code className="text-purple-400" size={24} />,
    title: "Full Stack Developer",
    description: "Specialized in React, React Native, Next.js, Node.js, and AWS serverless. Shipped Xenbite (Fresh Food & Surplus Meals SaaS) to App Store & Google Play — live at xenbite.com.",
  },
  {
    icon: <GraduationCap className="text-cyan-400" size={24} />,
    title: "CS Graduate",
    description: "Holds a Bachelor of Computer Science from Pondicherry University (Graduated June 2026), grounded in algorithms and systems.",
  },
  {
    icon: <Cpu className="text-teal-400" size={24} />,
    title: "AI-Native Workflow",
    description: "Leveraging tools like Cursor, Windsurf, Trae, and Claude to build and ship secure, production-quality code 2-3x faster.",
  },
  {
    icon: <Sparkles className="text-pink-400" size={24} />,
    title: "Security & OWASP",
    description: "Expertise in secure coding, API security, JWT authentication, secure input validation, and mitigating OWASP vulnerabilities.",
  },
];

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <section
      id="about"
      className="relative py-28 bg-bg-dark overflow-hidden border-t border-border-glass px-6 scroll-mt-28"
    >
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 left-0 glow-blur-primary opacity-20 -translate-y-1/2" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center md:text-left mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center md:justify-start gap-2 text-purple-400 text-sm font-mono tracking-wider uppercase mb-3"
          >
            <User size={16} />
            <span>Professional Summary</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold font-space text-primary-text"
          >
            Bridging Design & Engineering
          </motion.h2>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Side: Text Story */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-secondary-text text-base md:text-lg leading-relaxed">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Hi, I'm <strong className="text-primary-text">Mohamed Faisal</strong>, a Full Stack Developer with 1+ year of production experience building and shipping serverless SaaS mobile applications and client-facing web apps.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              My coding journey focuses on building high-performance, premium products. I believe that speed, secure database schema design, and clean API endpoints are essential to creating sustainable platforms.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              I leverage an AI-native development workflow (Cursor, Claude, Windsurf, Trae) to dramatically accelerate feature delivery while ensuring robust secure coding practices and OWASP alignment.
            </motion.p>
          </div>

          {/* Right Side: Animated Feature Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {cards.map((card, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                className="glassmorphism p-6 rounded-2xl flex flex-col gap-4 hover:border-purple-500/20 transition-all duration-300 relative group overflow-hidden"
              >
                {/* Shiny Card Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-cyan-500/0 to-cyan-500/0 group-hover:from-purple-500/5 group-hover:to-cyan-500/5 transition-all duration-500" />
                
                <div className="p-3 w-fit rounded-xl bg-white/5 border border-border-glass group-hover:bg-purple-500/10 group-hover:border-purple-500/20 transition-all duration-300">
                  {card.icon}
                </div>
                <h3 className="text-lg font-bold font-space text-primary-text">
                  {card.title}
                </h3>
                <p className="text-sm text-secondary-text leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
