"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";
import { getExperiences, type Experience as DBExperience } from "@/lib/supabase";

interface TimelineItem {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  points: string[];
}

function mapDBExperience(e: DBExperience): TimelineItem {
  return {
    id:          e.id,
    role:        e.role,
    company:     e.company + (e.location ? ` | ${e.location}` : ""),
    period:      `${e.start_date} - ${e.end_date || "Present"}`,
    description: e.description,
    points:      e.tech || [],
  };
}

const experienceData: TimelineItem[] = [
  {
    id: 1,
    role: "Full Stack Developer",
    company: "Akhlaq Ventures Ltd | London, UK (Remote)",
    period: "Nov 2025 - Present",
    description: "Core developer on Xenbite (xenbite.com) — a live food-tech SaaS mobile app published on the Apple App Store and Google Play. Xenbite enables users to buy Fresh Food and discounted Surplus Meals from nearby restaurants, bakeries, and stores, with an in-app Stripe wallet and real-time notifications.",
    points: [
      "Shipped 5 core product modules — Fresh Food marketplace (users purchase fresh meals & groceries), Surplus Food (discounted near-expiry food), Referral System, Rewards Program, and In-App Stripe Wallet — across iOS and Android, handling frontend, backend integration, and state management end-to-end.",
      "Designed and maintained a fully serverless AWS backend using Lambda, API Gateway, DynamoDB, and Cognito, including IAM permissions, authentication flows, database schema design, and cloud infrastructure management.",
      "Integrated Stripe for secure payment processing and in-app wallet top-ups, Firebase Cloud Messaging (FCM) for real-time push notifications, and Resend for transactional email delivery.",
      "Managed end-to-end mobile release pipelines for Apple App Store (apps.apple.com/gb/app/xenbite/id6762509915) and Google Play (play.google.com/store/apps/details?id=com.akhlaqventures.xenbite.app) — build signing, version management, and store submissions.",
      "Collaborated with cross-functional teams via Jira, Confluence, Git, GitHub, and Bitbucket, participating in sprint planning, standups, and code reviews.",
      "Delivered production features 2–3× faster by leveraging AI-native development tools (Cursor, Kiro IDE, Claude AI) while maintaining clean, scalable, production-ready code.",
    ],
  },
  {
    id: 2,
    role: "Full Stack Developer (Freelance)",
    company: "Self-Employed | Remote",
    period: "Feb 2024 - Aug 2024",
    description: "Delivered a production website for an international client (Dubai-based technical services company), handling the full project lifecycle from requirements to deployment.",
    points: [
      "Designed, developed, and launched aqsatech.ae using Next.js — delivering a fast, SEO-optimized, fully responsive site now live and serving real business traffic.",
      "Integrated Sanity CMS as a headless content management solution, enabling the client to independently manage services, pages, and content without developer involvement.",
      "Built a mobile-first interface aligned with client brand, showcasing services including AC maintenance, plumbing, renovations, and office fit-out solutions.",
      "Managed full version control using Git and GitHub — structured branching, feature isolation, and clean deployment workflows.",
    ],
  },
];

export default function Experience() {
  const [experiences, setExperiences] = useState<TimelineItem[]>(experienceData);

  useEffect(() => {
    async function loadExperiences() {
      const data = await getExperiences();
      if (data && data.length > 0) {
        setExperiences(data.map(mapDBExperience));
      }
    }
    loadExperiences();
  }, []);

  return (
    <section
      id="experience"
      className="relative py-28 bg-bg-dark overflow-hidden border-t border-border-glass px-6 scroll-mt-28"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 right-1/4 glow-blur-secondary opacity-15 -translate-y-1/2" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 text-purple-400 text-sm font-mono tracking-wider uppercase mb-3"
          >
            <Briefcase size={16} />
            <span>Timeline</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold font-space text-primary-text"
          >
            Journey & Experience
          </motion.h2>
        </div>

        {/* Timeline Path */}
        <div className="relative border-l border-border-glass pl-6 md:pl-10 ml-2 md:ml-6 flex flex-col gap-12">
          {experiences.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative group"
            >
              {/* Timeline Indicator Orb */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full border border-purple-500 bg-bg-dark group-hover:bg-purple-500 transition-all duration-300 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Glass Card */}
              <div className="glassmorphism p-6 md:p-8 rounded-3xl hover:border-purple-500/20 transition-all duration-300 relative">
                {/* Neon card glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-cyan-500/0 group-hover:from-purple-500/3 group-hover:to-cyan-500/3 transition-all duration-500 pointer-events-none rounded-3xl" />

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold font-space text-primary-text group-hover:text-purple-400 transition-colors duration-300">
                      {item.role}
                    </h3>
                    <p className="text-sm text-cyan-400 font-medium mt-1">
                      {item.company}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-secondary-text font-mono">
                    <Calendar size={13} />
                    <span>{item.period}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-secondary-text leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Points */}
                <ul className="flex flex-col gap-2">
                  {item.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-secondary-text">
                      <CheckCircle2 size={14} className="text-purple-500/80 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
