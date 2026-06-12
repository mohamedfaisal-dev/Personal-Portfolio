"use client";

import { motion } from "framer-motion";
import { Trophy, CheckCircle2, Smartphone, Globe, Cloud, Sparkles } from "lucide-react";

const keyAchievements = [
  {
    id: 1,
    icon: Smartphone,
    accent: "text-purple-400",
    glow: "from-purple-500/10 to-transparent border-purple-500/20",
    text: "Shipped Xenbite, a live SaaS mobile app with 500+ active users on App Store & Google Play as a solo developer.",
  },
  {
    id: 2,
    icon: Globe,
    accent: "text-cyan-400",
    glow: "from-cyan-500/10 to-transparent border-cyan-500/20",
    text: "Delivered aqsatech.ae for an international UAE client in 6 weeks, actively generating inbound business leads.",
  },
  {
    id: 3,
    icon: Cloud,
    accent: "text-teal-400",
    glow: "from-teal-500/10 to-transparent border-teal-500/20",
    text: "Architected scalable AWS serverless infrastructure (Lambda, DynamoDB, Cognito) with integrated Stripe payment processing.",
  },
  {
    id: 4,
    icon: Sparkles,
    accent: "text-pink-400",
    glow: "from-pink-500/10 to-transparent border-pink-500/20",
    text: "Accelerated development cycles by 3x using AI-native tools (Cursor, Claude).",
  },
];

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="relative py-28 bg-bg-dark overflow-hidden border-t border-border-glass px-6 scroll-mt-28"
    >
      <div className="absolute bottom-1/3 left-1/4 glow-blur-primary opacity-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 text-purple-400 text-sm font-mono tracking-wider uppercase mb-3"
          >
            <Trophy size={16} />
            <span>Highlights</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold font-space text-primary-text"
          >
            Key Achievements
          </motion.h2>
        </div>

        <ul className="flex flex-col gap-5">
          {keyAchievements.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: idx * 0.1 }}
                className={`glassmorphism rounded-2xl border bg-gradient-to-r ${item.glow} p-6 flex gap-4 items-start hover:border-white/10 transition-all duration-300 group`}
              >
                <div className={`p-3 rounded-xl bg-white/5 border border-border-glass shrink-0 group-hover:bg-white/10 transition-colors ${item.accent}`}>
                  <Icon size={22} />
                </div>
                <div className="flex gap-3 pt-0.5">
                  <CheckCircle2 size={18} className={`${item.accent} shrink-0 mt-1 opacity-80`} />
                  <p className="text-primary-text leading-relaxed text-sm md:text-base">
                    {item.text}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
