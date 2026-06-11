"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy, Code2, GitFork, Award, Sparkles } from "lucide-react";

interface StatItem {
  id: number;
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
  color: string;
}

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (inView) {
      let startTime: number | null = null;
      const duration = 1800; // 1.8 seconds transition

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function: easeOutExpo for premium feel
        const easeOutExpo = 1 - Math.pow(2, -10 * progress);
        
        setCount(Math.floor(easeOutExpo * value));

        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    }
  }, [inView, value]);

  return (
    <span ref={ref} className="font-space font-extrabold text-4xl md:text-5xl text-primary-text">
      {count}
      {suffix}
    </span>
  );
}

export default function Achievements() {
  const stats: StatItem[] = [
    {
      id: 1,
      icon: <Code2 className="text-purple-400" size={24} />,
      value: 15,
      suffix: "+",
      label: "Projects Built",
      color: "from-purple-500/10 to-transparent border-purple-500/20",
    },
    {
      id: 2,
      icon: <Sparkles className="text-cyan-400" size={24} />,
      value: 12,
      suffix: "+",
      label: "Technologies Mastered",
      color: "from-cyan-500/10 to-transparent border-cyan-500/20",
    },
    {
      id: 3,
      icon: <GitFork className="text-teal-400" size={24} />,
      value: 1000,
      suffix: "+",
      label: "GitHub Contributions",
      color: "from-teal-500/10 to-transparent border-teal-500/20",
    },
    {
      id: 4,
      icon: <Award className="text-pink-400" size={24} />,
      value: 8,
      suffix: "",
      label: "Professional Certifications",
      color: "from-pink-500/10 to-transparent border-pink-500/20",
    },
  ];

  return (
    <section
      id="achievements"
      className="relative py-28 bg-bg-dark overflow-hidden border-t border-border-glass px-6 scroll-mt-28"
    >
      {/* Glow Blur Effect */}
      <div className="absolute bottom-1/3 left-1/4 glow-blur-primary opacity-10" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 text-purple-400 text-sm font-mono tracking-wider uppercase mb-3"
          >
            <Trophy size={16} />
            <span>Milestones</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold font-space text-primary-text"
          >
            Track Record & Metrics
          </motion.h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: idx * 0.12 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`glassmorphism p-8 rounded-3xl flex flex-col items-center text-center gap-4 border bg-gradient-to-b ${stat.color} hover:border-white/10 transition-all duration-300 relative group`}
            >
              {/* Orb Glow Behind Icon */}
              <div className="absolute top-8 w-12 h-12 rounded-full bg-white/5 blur-[8px] group-hover:scale-125 transition-transform duration-300 pointer-events-none" />

              <div className="p-3.5 rounded-2xl bg-white/5 border border-border-glass group-hover:bg-white/10 transition-colors duration-300 relative z-10">
                {stat.icon}
              </div>

              <div className="flex flex-col gap-1 relative z-10">
                <Counter value={stat.value} suffix={stat.suffix} />
                <span className="text-sm text-secondary-text font-medium tracking-wide">
                  {stat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
