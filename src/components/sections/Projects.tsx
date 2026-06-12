"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion as motion2, AnimatePresence as AnimatePresence2 } from "framer-motion";
import { FolderGit2, ExternalLink, X, CheckCircle2 } from "lucide-react";
import { Github } from "../ui/BrandIcons";
import { SiApple, SiGoogleplay } from "react-icons/si";
import Image from "next/image";
import { getProjects, type Project as DBProject } from "@/lib/supabase";

interface Project {
  id: number;
  title: string;
  category: "Web Application" | "Creative Web";
  image: string;
  tech: string[];
  overview: string;
  demoUrl: string;
  githubUrl?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  caseStudy: {
    problem: string;
    solution: string;
    features: string[];
  };
}

/** Map a Supabase DB row (snake_case) → component shape (camelCase) */
function mapDBProject(p: DBProject): Project {
  return {
    id:            p.id,
    title:         p.title,
    category:      p.category as Project["category"],
    image:         p.image,
    tech:          p.tech,
    overview:      p.overview,
    demoUrl:       p.demo_url,
    githubUrl:     p.github_url,
    appStoreUrl:   p.app_store_url,
    playStoreUrl:  p.play_store_url,
    caseStudy: {
      problem:  p.problem,
      solution: p.solution,
      features: p.features,
    },
  };
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "Xenbite — Food & In-App Wallet SaaS",
    category: "Web Application",
    image: "/images/xenbite.png",
    tech: ["React Native", "AWS Lambda", "DynamoDB", "Cognito", "Stripe", "FCM", "Resend"],
    overview: "Live on the App Store & Google Play. Xenbite is a food-tech SaaS app where users buy Fresh Food and discounted Surplus Meals from nearby restaurants, bakeries & stores — powered by a fully serverless AWS backend, in-app Stripe wallet, and real-time FCM push notifications.",
    demoUrl: "https://xenbite.com",
    appStoreUrl: "https://apps.apple.com/gb/app/xenbite/id6762509915",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.akhlaqventures.xenbite.app",
    caseStudy: {
      problem: "Restaurants and stores waste tonnes of fresh and near-expiry food daily. Consumers lack an easy, trust-worthy marketplace to buy Fresh Food and discounted Surplus Meals from local vendors — while vendors need a frictionless way to list, sell, and get paid.",
      solution: "Built Xenbite — a full-stack React Native SaaS on a serverless AWS backbone (Lambda, API Gateway, DynamoDB, Cognito). Implemented a Fresh Food marketplace, a Surplus Food discount module, an in-app Stripe wallet, and real-time FCM push notifications. Live on both App Store (iOS) and Google Play (Android).",
      features: [
        "Fresh Food marketplace — users discover & purchase fresh meals and groceries from nearby vendors at retail price",
        "Surplus Food module — discounted near-expiry meals and groceries, helping reduce food waste",
        "In-app Stripe wallet — secure top-ups, balance tracking, and one-tap checkout across both food categories",
        "Real-time FCM push notifications for order updates, new listings, and promotional offers",
        "Referral & Rewards system — gamified user growth engine driving organic downloads",
        "Fully serverless AWS architecture: Lambda + DynamoDB + API Gateway + Cognito with fine-grained IAM",
        "End-to-end mobile release pipelines — App Store (iOS) & Google Play (Android) build signing and submissions",
      ],
    },
  },
  {
    id: 2,
    title: "RentalHub — Property Rental SaaS",
    category: "Web Application",
    image: "/images/rentalhub.png",
    tech: ["Next.js", "SQL", "SaaS Architecture", "Tailwind CSS", "JWT Auth", "REST API"],
    overview: "A multi-tenant property management SaaS platform providing vendor and tenant dashboards for property listing, maintenance tracking, and lease agreements.",
    demoUrl: "#",
    githubUrl: "https://github.com/mohamedfaisal-dev/Property-Management",
    caseStudy: {
      problem: "Property managers and tenants face administrative overhead when managing leases, maintenance requests, and rent billing across disjointed tools.",
      solution: "Built a centralized multi-tenant platform with dedicated vendor and tenant portals, complete with a structured SQL database schema for leases, properties, and billing histories.",
      features: [
        "Multi-tenant vendor dashboard and tenant request portal",
        "Structured SQL database for property listings and lease tracking",
        "Responsive, mobile-first interface built with clean component architecture",
        "Secure user authentication and role-based route guard shields",
      ],
    },
  },
  {
    id: 3,
    title: "Jesko Jets — Luxury Aviation Interface",
    category: "Creative Web",
    image: "/images/jeskojets_new.png",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "Responsive Design", "AI-Assisted"],
    overview: "A luxury aviation web interface built from the ground up, capturing sophisticated brand aesthetics and smooth interactive animations with pixel-perfect responsive layouts.",
    demoUrl: "https://clone-jesko-jets.vercel.app/",
    githubUrl: "https://github.com/mohamedfaisal-dev/Clone-Jesko-jets",
    caseStudy: {
      problem: "Standard aviation templates fail to communicate the premium status and high-end aesthetics required by luxury private charter clients.",
      solution: "Developed an immersive web interface with Next.js, implementing custom parallax animations and fluid layouts to deliver an authentic high-end experience.",
      features: [
        "Pixel-perfect responsive layout across mobile, tablet, and desktop viewports",
        "Advanced CSS techniques for cinematic animations and parallax scrolling effects",
        "AI-native workflow (Cursor, Claude) to accelerate delivery of clean, modular code",
        "SEO-optimized layout structure yielding rapid page load metrics",
      ],
    },
  },
  {
    id: 4,
    title: "Aqsa Technical Services — Home Maintenance & Blog Platform",
    category: "Web Application",
    image: "/images/aqsatech.png",
    tech: ["Next.js", "Sanity CMS", "Tailwind CSS", "Framer Motion", "Nodemailer", "SEO Optimization"],
    overview: "A professional freelance project built for a Dubai-based technical services company. Powered by Next.js and integrated with Sanity CMS for headless content editing, enabling the client to publish blogs, manage maintenance service categories, and handle customer booking requests.",
    demoUrl: "https://aqsatech.ae",
    caseStudy: {
      problem: "The client needed a modern, highly performant web presence in Dubai to attract home maintenance leads (AC repair, plumbing, painting, electrical) and a robust blogging system to capture organic search traffic through content marketing.",
      solution: "Engineered a fast, SEO-optimized Next.js web application. Integrated Sanity CMS as a headless backend, letting the client write, edit, and publish blogs dynamically. Developed responsive booking workflows with Nodemailer integration for real-time lead alerts.",
      features: [
        "High-performance Next.js frontend with App Router architecture for sub-second page loads",
        "Headless Sanity CMS configuration for seamless blog editing and service description management",
        "Dynamic content publishing pipelines with rich-text blogging components",
        "Interactive customer lead booking form triggering automated email routing via Nodemailer",
        "Rigorous SEO schema markup and semantic HTML structure targeting regional Google search rankings",
        "Fully responsive layouts and fluid UI interactions built with Tailwind CSS and Framer Motion",
      ],
    },
  },
  {
    id: 5,
    title: "Legacy Aviation — Pilot Ground School & Training Platform",
    category: "Web Application",
    image: "/images/legacyaviation.png",
    tech: ["Next.js", "AWS SES", "AWS Lambda", "Tailwind CSS", "Framer Motion", "Responsive Design"],
    overview: "A professional educational portal and ground school management platform for a premier aviation training institute. Facilitates online and offline pilot training pathways with a dynamic course system, student verification workflows, and secure AWS-backed email communication pipelines.",
    demoUrl: "https://www.legacyaviation.in",
    caseStudy: {
      problem: "Aspiring pilots require structured access to DGCA ground subjects (Air Navigation, Meteorology, Air Regulations) with seamless switching between online and offline classes, alongside a secure, automated way to verify student accounts upon registration.",
      solution: "Collaborated on the Next.js frontend to build a highly responsive ground school interface. Developed a secure, serverless AWS verification backend that automates registration confirmation emails and secures student profiles prior to course enrollment.",
      features: [
        "Interactive curriculum index for DGCA, Commercial Pilot License (CPL), and cabin crew courses",
        "Automated student email verification and verification checkouts powered by AWS SES and Lambda",
        "Flexible program structures supporting hybrid (online/offline) training scheduling",
        "Sleek and professional aviation-themed user experience designed with Tailwind CSS and Framer Motion",
        "Modern responsive layouts ensuring flawless navigation on mobile devices for students on the go",
      ],
    },
  },
  {
    id: 6,
    title: "FZ Elec — Electrical Engineering & Design Portfolio",
    category: "Web Application",
    image: "/images/fzelec.png",
    tech: ["Next.js", "Supabase", "Tailwind CSS", "Framer Motion", "Inbuilt CMS", "Responsive Design"],
    overview: "A premium portfolio and service showcase platform engineered for a French electrical design and project engineering professional (Faizoudine Zalal). Powered by Next.js for rapid static site rendering and Supabase for a real-time database-driven custom CMS to manage completed projects.",
    demoUrl: "https://fzelec.fr",
    caseStudy: {
      problem: "An electrical draftsperson and project designer needs a high-end showcase website to present complex technical schematics, telecom wiring plans, and project management portfolios to prospective French construction and infrastructure clients.",
      solution: "Designed and built an interactive Next.js application integrated with Supabase. Established a flexible database schema serving as a custom built-in CMS, allowing the engineer to instantly update completed projects, details, and attachments via a secure Supabase instance.",
      features: [
        "Sleek professional portfolio layout highlighting electrical and telecommunication project portfolios",
        "Dynamic client-side hydration from Supabase hosting project assets and structural schemas",
        "Custom animations and smooth hover transitions matching modern French design aesthetics",
        "Optimized SEO performance achieving sub-second LCP scores for competitive local search queries",
        "Fully responsive UI design ensuring detailed technical charts render cleanly on mobile and tablets",
      ],
    },
  },
];

/* ─────────────────────────────────────────────────────────────
   Industrial-level scroll lock helpers
   Targets <html> (the true scroll root), measures the scrollbar
   width BEFORE hiding it, and stores it as a CSS custom property
   so padding-right can compensate — zero layout shift.
───────────────────────────────────────────────────────────── */
function lockScroll() {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);
  document.documentElement.classList.add("modal-open");
}

function unlockScroll() {
  document.documentElement.classList.remove("modal-open");
  document.documentElement.style.removeProperty("--scrollbar-width");
}

/* ─────────────────────────────────────────────────────────────
   Case Study Modal — rendered into document.body via a Portal
   so CSS `contain: layout style` on <section> cannot trap the
   fixed overlay inside the section's paint boundary.
───────────────────────────────────────────────────────────── */
interface CaseStudyModalProps {
  project: Project;
  onClose: () => void;
}

function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Prevent touch scroll from leaking to the page on mobile
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onTouchMove = (e: TouchEvent) => e.stopPropagation();
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => el.removeEventListener("touchmove", onTouchMove);
  }, []);

  const modal = (
    <AnimatePresence2>
      <motion2.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        /* Portal target is document.body — no section containment */
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md"
        style={{ touchAction: "none" }}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} case study`}
      >
        {/* Modal shell — stops click propagation to backdrop */}
        <motion2.div
          key="modal"
          initial={{ scale: 0.96, y: 24, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.96, y: 24, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
          /* Fixed height so the inner scroll area can flex-grow */
          className="glassmorphism w-full max-w-3xl rounded-3xl overflow-hidden flex flex-col relative"
          style={{ maxHeight: "min(85vh, 760px)", touchAction: "pan-y" }}
        >
          {/* ── Close button ── */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
            aria-label="Close Modal"
          >
            <X size={18} />
          </button>

          {/* ── Hero banner (fixed height, never scrolls) ── */}
          <div className="relative w-full shrink-0 bg-neutral-900 overflow-hidden" style={{ height: "200px" }}>
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-black/40 to-transparent" />
            <div className="absolute bottom-5 left-6 right-12">
              <span className="text-xs font-mono text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full uppercase tracking-wider">
                {project.category}
              </span>
              <h3 className="text-xl md:text-2xl font-bold font-space text-white mt-2 leading-tight">
                {project.title}
              </h3>
            </div>
          </div>

          {/* ── Scrollable body — ONLY this div scrolls ── */}
          <div
            ref={scrollRef}
            className="modal-scroll flex-1 overflow-y-auto overscroll-contain p-6 md:p-8 flex flex-col gap-6"
          >
            {/* Tech Stack */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-secondary-text mb-3">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono text-primary-text bg-white/5 border border-border-glass px-2.5 py-1 rounded-lg"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Problem */}
            <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/10">
              <h4 className="text-xs font-mono uppercase tracking-widest text-red-400/80 mb-2">
                The Problem
              </h4>
              <p className="text-sm text-secondary-text leading-relaxed">
                {project.caseStudy.problem}
              </p>
            </div>

            {/* Solution */}
            <div className="p-4 rounded-2xl bg-green-500/5 border border-green-500/10">
              <h4 className="text-xs font-mono uppercase tracking-widest text-green-400/80 mb-2">
                The Solution
              </h4>
              <p className="text-sm text-secondary-text leading-relaxed">
                {project.caseStudy.solution}
              </p>
            </div>

            {/* Key Implementations */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-purple-400 mb-3">
                Key Implementations
              </h4>
              <ul className="flex flex-col gap-2.5">
                {project.caseStudy.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-secondary-text">
                    <CheckCircle2 size={15} className="text-cyan-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Footer links (fixed, never scrolls) ── */}
          <div className="shrink-0 p-5 border-t border-border-glass flex flex-wrap gap-2.5 bg-black/20">
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-grow flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:brightness-110 text-white text-sm font-semibold transition-all"
            >
              <ExternalLink size={15} />
              <span>Visit Website</span>
            </a>
            {project.appStoreUrl && (
              <a
                href={project.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-primary-text text-xs font-semibold border border-border-glass transition-all"
                aria-label="Download on App Store"
              >
                <SiApple size={15} />
                <span>App Store</span>
              </a>
            )}
            {project.playStoreUrl && (
              <a
                href={project.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-primary-text text-xs font-semibold border border-border-glass transition-all"
                aria-label="Get it on Google Play"
              >
                <SiGoogleplay size={15} />
                <span>Google Play</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-3 rounded-xl bg-white/5 hover:bg-white/10 text-primary-text border border-border-glass transition-all"
                aria-label="GitHub Repository"
              >
                <Github size={18} />
              </a>
            )}
          </div>
        </motion2.div>
      </motion2.div>
    </AnimatePresence2>
  );

  // Portal: mount into document.body, completely outside <section>
  return typeof document !== "undefined" ? createPortal(modal, document.body) : null;
}

/* ─────────────────────────────────────────────────────────────
   Main Projects section
───────────────────────────────────────────────────────────── */
export default function Projects() {
  const [filter, setFilter] = useState<"All" | "Web Application" | "Creative Web">("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>(projectsData);

  useEffect(() => {
    async function loadProjects() {
      const data = await getProjects();
      if (data && data.length > 0) {
        setProjects(data.map(mapDBProject));
      }
    }
    loadProjects();
  }, []);

  const filteredProjects = useMemo(
    () => projects.filter((proj) => filter === "All" || proj.category === filter),
    [filter, projects]
  );

  const handleOpenModal = useCallback((project: Project) => {
    lockScroll();
    setSelectedProject(project);
  }, []);

  const handleCloseModal = useCallback(() => {
    unlockScroll();
    setSelectedProject(null);
  }, []);

  // Safety net: always unlock on unmount
  useEffect(() => () => unlockScroll(), []);

  return (
    <section
      id="projects"
      className="relative py-28 bg-bg-dark overflow-hidden border-t border-border-glass px-6 scroll-mt-28"
    >
      {/* Background Glow */}
      <div className="absolute top-1/3 left-0 glow-blur-primary opacity-25" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion2.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 text-purple-400 text-sm font-mono tracking-wider uppercase mb-3"
          >
            <FolderGit2 size={16} />
            <span>My Works</span>
          </motion2.div>
          <motion2.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold font-space text-primary-text"
          >
            Featured Projects
          </motion2.h2>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center justify-center gap-3 mb-12">
          {(["All", "Web Application", "Creative Web"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
                filter === cat
                  ? "bg-text-primary text-bg-dark border-text-primary"
                  : "text-secondary-text border-border-glass bg-white/3 hover:border-white/10 hover:text-primary-text"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <motion2.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence2 mode="popLayout">
            {filteredProjects.map((project) => (
              <motion2.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="glassmorphism rounded-3xl overflow-hidden group flex flex-col h-full hover:border-white/15 transition-all duration-300 relative"
              >
                {/* Image */}
                <div className="relative aspect-video w-full overflow-hidden border-b border-border-glass bg-neutral-900">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority={project.id === 1}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                    <span className="text-xs font-mono bg-purple-600/90 text-white px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                    {(project.appStoreUrl || project.playStoreUrl) && (
                      <div className="flex gap-1.5">
                        {project.appStoreUrl && (
                          <a
                            href={project.appStoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/70 border border-white/20 text-white text-[10px] font-semibold backdrop-blur-sm hover:bg-white/20 transition-all"
                            aria-label="App Store"
                          >
                            <SiApple className="w-3 h-3" />
                            iOS
                          </a>
                        )}
                        {project.playStoreUrl && (
                          <a
                            href={project.playStoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/70 border border-white/20 text-white text-[10px] font-semibold backdrop-blur-sm hover:bg-white/20 transition-all"
                            aria-label="Google Play"
                          >
                            <SiGoogleplay className="w-3 h-3" />
                            Android
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow gap-4">
                  <h3 className="text-xl font-bold font-space text-primary-text group-hover:text-purple-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-sm text-secondary-text leading-relaxed line-clamp-3">
                    {project.overview}
                  </p>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono text-secondary-text bg-white/5 px-2 py-0.5 rounded border border-border-glass"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/10">
                        +{project.tech.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-4 border-t border-border-glass">
                    <button
                      onClick={() => handleOpenModal(project)}
                      className="flex-grow text-center text-xs font-semibold py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-primary-text transition-all border border-border-glass hover:border-white/10 cursor-pointer"
                    >
                      Case Study
                    </button>
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-purple-600 text-secondary-text hover:text-primary-text transition-all border border-border-glass"
                      aria-label="Live Website"
                    >
                      <ExternalLink size={16} />
                    </a>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-cyan-600 text-secondary-text hover:text-primary-text transition-all border border-border-glass"
                        aria-label="GitHub Source"
                      >
                        <Github size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </motion2.div>
            ))}
          </AnimatePresence2>
        </motion2.div>
      </div>

      {/* Portal modal — rendered outside this section into document.body */}
      {selectedProject && (
        <CaseStudyModal project={selectedProject} onClose={handleCloseModal} />
      )}
    </section>
  );
}
