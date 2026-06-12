"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Globe, Database, Terminal, Wrench, Shield, Cpu, Activity } from "lucide-react";
import { getSkills, type Skill as DBSkill } from "@/lib/supabase";

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiSupabase,
  SiFirebase,
  SiClaude,
  SiDeepmind,
  SiGit,
  SiGithub,
  SiPostman,
  SiStripe,
  SiSanity,
  SiResend,
  SiPython,
  SiFlask,
  SiMysql,
  SiPostgresql,
  SiDocker,
  SiNginx,
  SiVercel,
  SiNetlify,
  SiBitbucket,
} from "@icons-pack/react-simple-icons";

import {
  TbBrandReactNative,
  TbBrandVscode,
  TbBrandAws,
  TbShieldLock,
  TbApi,
  TbLock,
} from "react-icons/tb";

import { IoLogoAmplify } from "react-icons/io5";

interface Skill {
  name: string;
  category: "frontend" | "backend" | "database" | "tools" | "cloud" | "security";
  years: number; // years of experience
  status: "Core" | "Advanced" | "Learning";
  description: string;
  color: string; // gradient classes
  glowColor: string; // for shadows
}

const skillsData: Skill[] = [
  // Frontend
  {
    name: "React.js",
    category: "frontend",
    years: 2,
    status: "Core",
    description: "Component lifecycle management, state architecture (Redux/Zustand), and high-performance custom hooks.",
    color: "from-purple-500 to-indigo-500",
    glowColor: "rgba(168, 85, 247, 0.4)",
  },
  {
    name: "Next.js",
    category: "frontend",
    years: 2,
    status: "Core",
    description: "Server Actions, App Router routing, Incremental Static Regeneration (ISR), and static site generation.",
    color: "from-zinc-700 to-zinc-900",
    glowColor: "rgba(63, 63, 70, 0.4)",
  },
  {
    name: "React Native",
    category: "frontend",
    years: 1.5,
    status: "Advanced",
    description: "Cross-platform mobile applications, App Store/Play Store build signing and release deployments.",
    color: "from-cyan-500 to-blue-600",
    glowColor: "rgba(6, 182, 212, 0.4)",
  },
  {
    name: "TypeScript",
    category: "frontend",
    years: 2,
    status: "Advanced",
    description: "Generics engineering, mapped types, intersection types, and strict interface patterns.",
    color: "from-blue-600 to-cyan-500",
    glowColor: "rgba(37, 99, 235, 0.4)",
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    years: 2,
    status: "Core",
    description: "Custom design token variables, fluid utilities, CSS grid structures, and responsive breakpoint systems.",
    color: "from-teal-400 to-emerald-400",
    glowColor: "rgba(20, 184, 166, 0.4)",
  },
  {
    name: "JavaScript",
    category: "frontend",
    years: 3,
    status: "Core",
    description: "Asynchronous workflows, lexical scopes, prototypal networks, and event loops.",
    color: "from-yellow-400 to-amber-500",
    glowColor: "rgba(234, 179, 8, 0.4)",
  },
  {
    name: "HTML5 & CSS3",
    category: "frontend",
    years: 3,
    status: "Core",
    description: "Semantic structures, accessible layout schemas, flexbox, custom layouts, and animation keyframes.",
    color: "from-orange-500 to-red-500",
    glowColor: "rgba(249, 115, 22, 0.4)",
  },

  // Backend
  {
    name: "Node.js",
    category: "backend",
    years: 2,
    status: "Advanced",
    description: "Event-driven architecture, file streams, package pipelines, and backend integration modules.",
    color: "from-green-500 to-emerald-400",
    glowColor: "rgba(34, 197, 94, 0.4)",
  },
  {
    name: "Express.js",
    category: "backend",
    years: 2,
    status: "Advanced",
    description: "Modular route definitions, query parsers, verification middlewares, and REST API deployment.",
    color: "from-neutral-400 to-neutral-600",
    glowColor: "rgba(115, 115, 115, 0.4)",
  },

  {
    name: "Python",
    category: "backend",
    years: 1,
    status: "Advanced",
    description: "Scripting, automation, data processing, and backend service development with Flask.",
    color: "from-blue-500 to-yellow-400",
    glowColor: "rgba(59, 130, 246, 0.4)",
  },
  {
    name: "Flask",
    category: "backend",
    years: 1,
    status: "Advanced",
    description: "Lightweight Python micro-framework for building RESTful APIs and web services.",
    color: "from-neutral-500 to-neutral-700",
    glowColor: "rgba(115, 115, 115, 0.4)",
  },
  {
    name: "REST API Design",
    category: "backend",
    years: 2,
    status: "Core",
    description: "RESTful endpoint architecture, versioning strategies, status codes, and standardized request/response schemas.",
    color: "from-green-500 to-teal-500",
    glowColor: "rgba(20, 184, 166, 0.4)",
  },

  // Database
  {
    name: "DynamoDB",
    category: "database",
    years: 1.5,
    status: "Advanced",
    description: "NoSQL schema scaling, partition keys, global secondary indexes, and cloud storage triggers.",
    color: "from-blue-500 to-indigo-500",
    glowColor: "rgba(59, 130, 246, 0.4)",
  },
  {
    name: "MongoDB",
    category: "database",
    years: 2,
    status: "Advanced",
    description: "Document structure indexes, query aggregation pipes, and high-performance collection lookups.",
    color: "from-emerald-600 to-green-500",
    glowColor: "rgba(5, 150, 105, 0.4)",
  },
  {
    name: "MySQL",
    category: "database",
    years: 1.5,
    status: "Advanced",
    description: "Relational table schemas, complex joins, stored procedures, and query optimization with indexes.",
    color: "from-blue-600 to-orange-500",
    glowColor: "rgba(37, 99, 235, 0.4)",
  },
  {
    name: "PostgreSQL",
    category: "database",
    years: 1.5,
    status: "Advanced",
    description: "Advanced SQL queries, JSONB columns, full-text search, and Row Level Security (RLS) policies.",
    color: "from-sky-600 to-blue-700",
    glowColor: "rgba(2, 132, 199, 0.4)",
  },
  {
    name: "Supabase",
    category: "database",
    years: 1,
    status: "Advanced",
    description: "Postgres schema creation, Row Level Security (RLS) policies, and real-time channel listeners.",
    color: "from-emerald-400 to-teal-500",
    glowColor: "rgba(52, 211, 153, 0.4)",
  },
  {
    name: "Firebase",
    category: "database",
    years: 2,
    status: "Advanced",
    description: "Firestore document real-time sync, cloud authentication providers, and serverless background tasks.",
    color: "from-amber-500 to-orange-500",
    glowColor: "rgba(245, 158, 11, 0.4)",
  },

  // Tools
  {
    name: "Cursor",
    category: "tools",
    years: 2,
    status: "Core",
    description: "AI-native editing environment, agent orchestration, and inline codebase index mapping.",
    color: "from-cyan-400 to-blue-500",
    glowColor: "rgba(34, 211, 238, 0.4)",
  },
  {
    name: "Kiro IDE",
    category: "tools",
    years: 1,
    status: "Core",
    description: "AI-first developer environments for high-productivity prototyping and software construction.",
    color: "from-purple-500 to-indigo-500",
    glowColor: "rgba(168, 85, 247, 0.4)",
  },
  {
    name: "Claude AI",
    category: "tools",
    years: 2,
    status: "Core",
    description: "Autonomous agent execution context, system prompts, and multi-file code editing integrations.",
    color: "from-orange-400 to-amber-500",
    glowColor: "rgba(251, 146, 60, 0.4)",
  },
  {
    name: "Antigravity",
    category: "tools",
    years: 1,
    status: "Core",
    description: "DeepMind's agentic coding workspace tool designed for advanced repository-wide workflows.",
    color: "from-fuchsia-500 to-purple-600",
    glowColor: "rgba(217, 70, 239, 0.4)",
  },
  {
    name: "Trae",
    category: "tools",
    years: 1,
    status: "Advanced",
    description: "Adaptive AI-integrated code editor optimized for multi-file context tracking.",
    color: "from-teal-400 to-emerald-500",
    glowColor: "rgba(45, 212, 191, 0.4)",
  },
  {
    name: "Windsurf",
    category: "tools",
    years: 1,
    status: "Advanced",
    description: "AI-first agentic IDE specializing in flow-state development and autonomous tasks.",
    color: "from-blue-400 to-cyan-500",
    glowColor: "rgba(96, 165, 250, 0.4)",
  },
  {
    name: "Git & GitHub",
    category: "tools",
    years: 3,
    status: "Core",
    description: "Branch merging models, commit logging, pull request audits, and GitHub actions integrations.",
    color: "from-purple-500 to-pink-500",
    glowColor: "rgba(168, 85, 247, 0.4)",
  },
  {
    name: "Bitbucket",
    category: "tools",
    years: 1.5,
    status: "Advanced",
    description: "Git-based code collaboration, pull request workflows, branch permissions, and Jira integrations.",
    color: "from-blue-500 to-indigo-600",
    glowColor: "rgba(59, 130, 246, 0.4)",
  },
  {
    name: "Postman",
    category: "tools",
    years: 2,
    status: "Core",
    description: "API payload schema checks, endpoint regression testing, variables, and request environments.",
    color: "from-orange-500 to-amber-500",
    glowColor: "rgba(249, 115, 22, 0.4)",
  },
  {
    name: "VS Code",
    category: "tools",
    years: 3,
    status: "Core",
    description: "Tailored debug configurations, terminal automation settings, and workspace environment extensions.",
    color: "from-blue-500 to-sky-500",
    glowColor: "rgba(59, 130, 246, 0.4)",
  },

  // Cloud & DevOps (AWS Services)
  {
    name: "AWS",
    category: "cloud",
    years: 1.5,
    status: "Advanced",
    description: "Cloud architecture deployment, VPC networks, secure permission schemas, and service automation.",
    color: "from-orange-400 to-amber-600",
    glowColor: "rgba(249, 115, 22, 0.4)",
  },
  {
    name: "AWS Lambda",
    category: "cloud",
    years: 1.5,
    status: "Advanced",
    description: "Event-driven serverless functions, resource scaling rules, Cold Start mitigations, and cross-service integrations.",
    color: "from-amber-600 to-orange-500",
    glowColor: "rgba(217, 119, 6, 0.4)",
  },
  {
    name: "Amazon S3",
    category: "cloud",
    years: 1.5,
    status: "Core",
    description: "Scalable object storage buckets, access control policy structures, bucket lifecycles, and CloudFront CDN routing.",
    color: "from-green-600 to-emerald-500",
    glowColor: "rgba(22, 163, 74, 0.4)",
  },
  {
    name: "Amazon EC2",
    category: "cloud",
    years: 1.5,
    status: "Advanced",
    description: "Virtual instance scaling groups, security group firewalls, EBS volumes, and target routing schemes.",
    color: "from-orange-500 to-amber-500",
    glowColor: "rgba(249, 115, 22, 0.4)",
  },
  {
    name: "AWS API Gateway",
    category: "cloud",
    years: 1.5,
    status: "Advanced",
    description: "RESTful and WebSocket routing endpoints, custom authorizers, usage plan throttling, and VPC links.",
    color: "from-pink-600 to-rose-500",
    glowColor: "rgba(219, 39, 119, 0.4)",
  },
  {
    name: "AWS IAM",
    category: "cloud",
    years: 1.5,
    status: "Core",
    description: "Policy rules configuration, role assumptions, cross-account capabilities, and identity authentication controls.",
    color: "from-red-600 to-rose-600",
    glowColor: "rgba(220, 38, 38, 0.4)",
  },
  {
    name: "AWS Cognito",
    category: "cloud",
    years: 1.5,
    status: "Advanced",
    description: "User pool management, identity federation, JWT token authentication, and MFA configuration.",
    color: "from-red-600 to-rose-500",
    glowColor: "rgba(220, 38, 38, 0.4)",
  },
  {
    name: "AWS Amplify",
    category: "cloud",
    years: 1,
    status: "Advanced",
    description: "Full-stack continuous hosting, serverless resource integrations, authentication configurations, and CLI deployments.",
    color: "from-yellow-500 to-amber-500",
    glowColor: "rgba(234, 179, 8, 0.4)",
  },
  {
    name: "Amazon RDS",
    category: "cloud",
    years: 1.5,
    status: "Advanced",
    description: "Relational database provisioning, Multi-AZ backups, auto-scaling storage engines, and performance read-replicas.",
    color: "from-blue-600 to-indigo-600",
    glowColor: "rgba(37, 99, 235, 0.4)",
  },

  {
    name: "Docker",
    category: "cloud",
    years: 1,
    status: "Learning",
    description: "Containerized application environments, Dockerfile definitions, and docker-compose service orchestration.",
    color: "from-blue-500 to-cyan-500",
    glowColor: "rgba(59, 130, 246, 0.4)",
  },
  {
    name: "Nginx",
    category: "cloud",
    years: 1,
    status: "Learning",
    description: "Reverse proxy configuration, SSL termination, load balancing, and static file serving.",
    color: "from-green-600 to-emerald-500",
    glowColor: "rgba(22, 163, 74, 0.4)",
  },
  {
    name: "Vercel",
    category: "cloud",
    years: 2,
    status: "Core",
    description: "Serverless Next.js deployments, edge functions, preview environments, and CI/CD pipeline integrations.",
    color: "from-zinc-600 to-zinc-800",
    glowColor: "rgba(82, 82, 91, 0.4)",
  },
  {
    name: "Netlify",
    category: "cloud",
    years: 1.5,
    status: "Advanced",
    description: "JAMstack site hosting, continuous deployment from Git, serverless functions, and form handling.",
    color: "from-teal-500 to-cyan-500",
    glowColor: "rgba(20, 184, 166, 0.4)",
  },

  // Integrations
  {
    name: "Stripe",
    category: "tools",
    years: 1.5,
    status: "Advanced",
    description: "Secure payment gateway flows, webhook handlers, customer billing portals, and mobile SDK topups.",
    color: "from-purple-500 to-indigo-600",
    glowColor: "rgba(99, 102, 241, 0.4)",
  },
  {
    name: "Sanity CMS",
    category: "tools",
    years: 1,
    status: "Advanced",
    description: "Headless CMS schema validation, real-time structured content query schemas (GROQ), and dynamic pages.",
    color: "from-red-500 to-rose-500",
    glowColor: "rgba(239, 68, 68, 0.4)",
  },
  {
    name: "Firebase Cloud Messaging (FCM)",
    category: "tools",
    years: 1.5,
    status: "Advanced",
    description: "Real-time mobile push notifications, channel registration tokens, and background payload messaging.",
    color: "from-amber-500 to-amber-600",
    glowColor: "rgba(245, 158, 11, 0.4)",
  },
  {
    name: "Resend",
    category: "tools",
    years: 1.5,
    status: "Advanced",
    description: "Transactional email service setup, DKIM verification, and template design setups.",
    color: "from-zinc-500 to-zinc-700",
    glowColor: "rgba(115, 115, 115, 0.4)",
  },

  // Security
  {
    name: "OWASP Top 10",
    category: "security",
    years: 2,
    status: "Advanced",
    description: "Application security threat modeling, vulnerability mitigation, and secure SDLC practices.",
    color: "from-red-500 to-rose-600",
    glowColor: "rgba(239, 68, 68, 0.4)",
  },
  {
    name: "JWT Auth",
    category: "security",
    years: 2,
    status: "Core",
    description: "Stateless token authentication flows, RS256/HS256 signing, refresh token rotation, and token invalidation.",
    color: "from-violet-500 to-purple-600",
    glowColor: "rgba(139, 92, 246, 0.4)",
  },
  {
    name: "API Security",
    category: "security",
    years: 2,
    status: "Advanced",
    description: "Rate limiting, CORS policy enforcement, header hardening, API key management, and injection prevention.",
    color: "from-orange-500 to-red-500",
    glowColor: "rgba(249, 115, 22, 0.4)",
  },
  {
    name: "Secure Coding",
    category: "security",
    years: 2,
    status: "Advanced",
    description: "Input validation, parameterized queries, least-privilege access, secrets management, and dependency auditing.",
    color: "from-emerald-500 to-green-600",
    glowColor: "rgba(16, 185, 129, 0.4)",
  },
  {
    name: "Input Validation",
    category: "security",
    years: 2,
    status: "Core",
    description: "Schema validation with Zod/Joi, sanitization pipelines, XSS/SQLi prevention, and type-safe form guards.",
    color: "from-teal-500 to-cyan-600",
    glowColor: "rgba(20, 184, 166, 0.4)",
  },
];

const categories = [
  { id: "all", name: "All Skills", icon: <Globe size={14} /> },
  { id: "frontend", name: "Frontend", icon: <Code2 size={14} /> },
  { id: "backend", name: "Backend", icon: <Terminal size={14} /> },
  { id: "database", name: "Database", icon: <Database size={14} /> },
  { id: "cloud", name: "Cloud & DevOps", icon: <Cpu size={14} /> },
  { id: "tools", name: "Tools", icon: <Wrench size={14} /> },
  { id: "security", name: "Security", icon: <Shield size={14} /> },
];

function TechIcon({ name }: { name: string }) {
  const sizeClass = "w-12 h-12";
  switch (name) {
    case "React":
    case "React.js":
      return <SiReact className={sizeClass} color="#61DAFB" />;
    case "Next.js":
      return <SiNextdotjs className={sizeClass} color="#FFFFFF" />;
    case "React Native":
      return <TbBrandReactNative className={sizeClass} color="#61DAFB" />;
    case "TypeScript":
      return <SiTypescript className={sizeClass} color="#3178C6" />;
    case "Tailwind CSS":
      return <SiTailwindcss className={sizeClass} color="#06B6D4" />;
    case "JavaScript":
      return <SiJavascript className={sizeClass} color="#F7DF1E" />;
    case "HTML5 & CSS3":
      return (
        <div className="flex gap-1.5 items-center justify-center">
          <SiHtml5 className="w-7 h-7" color="#E34F26" />
          <SiCss className="w-7 h-7" color="#1572B6" />
        </div>
      );
    case "Node.js":
      return <SiNodedotjs className={sizeClass} color="#339933" />;
    case "Express.js":
      return <SiExpress className={sizeClass} color="#FFFFFF" />;
    case "MongoDB":
      return <SiMongodb className={sizeClass} color="#47A248" />;
    case "Supabase":
      return <SiSupabase className={sizeClass} color="#3ECF8E" />;
    case "Firebase":
      return <SiFirebase className={sizeClass} color="#FFCA28" />;
    case "DynamoDB":
      return (
        <svg viewBox="0 0 256 256" className={sizeClass}>
          <defs>
            <linearGradient id="dynamoGrad" x1="0%" x2="100%" y1="100%" y2="0%">
              <stop offset="0%" stopColor="#2e27ad" />
              <stop offset="100%" stopColor="#527fff" />
            </linearGradient>
          </defs>
          <path fill="url(#dynamoGrad)" d="M0 0h256v256H0z" />
          <path fill="#fff" d="M166.675 175.52c-10.682 8.637-33.091 13.2-54.534 13.2c-21.447 0-43.863-4.566-54.541-13.202v17.392h.003c0 8.675 22.397 18.342 54.538 18.342c32.115 0 54.499-9.655 54.534-18.323zm.003-33.049l6.4-.035v.035c0 3.866-1.936 7.475-5.705 10.779c4.57 4.021 5.705 7.966 5.705 10.775c0 .02-.003.035-.003.054v28.831h.003c0 16.035-31.398 24.69-60.937 24.69c-29.469 0-60.781-8.617-60.931-24.578c0-.016-.01-.032-.01-.048v-28.958c0-.007.006-.016.006-.026c.01-2.809 1.15-6.738 5.712-10.75c-4.534-4.005-5.686-7.912-5.715-10.699h.003c0-.013-.006-.022-.006-.035v-28.958c0-.01.006-.02.006-.029c.01-2.809 1.152-6.738 5.716-10.743c-4.538-4.009-5.69-7.92-5.719-10.703h.003c0-.012-.006-.025-.006-.038V63.08c0-.01.006-.019.006-.029C51.261 47.04 82.624 38.4 112.141 38.4c16.675 0 32.694 2.65 43.948 7.271l-2.448 5.866c-10.505-4.314-25.632-6.79-41.5-6.79c-32.141 0-54.538 9.668-54.538 18.349c0 8.677 22.397 18.345 54.538 18.345c.867.01 1.715 0 2.573-.032l.268 6.342c-.947.038-1.894.038-2.841.038c-21.447 0-43.863-4.568-54.541-13.204V91.97h.003v.073c.032 3.329 3.447 6.236 6.307 8.083c8.608 5.488 24.032 9.236 41.232 10.014l-.29 6.341c-17.425-.79-32.682-4.405-42.503-9.946c-2.42 1.809-4.746 4.256-4.746 7.03c0 8.677 22.397 18.345 54.538 18.345c3.152 0 6.281-.105 9.305-.315l.445 6.332c-3.168.22-6.451.33-9.75.33c-21.447 0-43.863-4.567-54.541-13.203v17.383h.003c.032 3.403 3.447 6.307 6.307 8.157c9.844 6.281 28.327 10.192 48.23 10.192h1.409v6.347h-1.408c-20.221 0-38.599-3.754-49.837-10.099c-2.406 1.806-4.7 4.24-4.7 6.992c0 8.677 22.396 18.348 54.537 18.348c32.115 0 54.499-9.655 54.534-18.326v-.035c-.006-2.758-2.31-5.192-4.723-6.998a45 45 0 0 1-5.14 2.523l-2.45-5.865c2.323-.955 4.339-1.987 5.993-3.072c2.886-1.883 6.323-4.825 6.323-8.129m27.411-46.418h-17.932c-1.06 0-2.055-.52-2.647-1.39a3.14 3.14 0 0 1-.33-2.951l10.91-27.27h-41.31l-19.2 38.086h20.423c1.02 0 1.98.486 2.586 1.301c.598.82.774 1.87.464 2.838l-18.228 56.818zm9.821-.974l-79.996 82.648a3.22 3.22 0 0 1-2.31.974a3.2 3.2 0 0 1-1.636-.444a3.16 3.16 0 0 1-1.414-3.692l21.075-65.69h-21.226a3.21 3.21 0 0 1-2.723-1.504a3.15 3.15 0 0 1-.138-3.088l22.4-44.434a3.2 3.2 0 0 1 2.861-1.755h48a3.21 3.21 0 0 1 2.646 1.39a3.15 3.15 0 0 1 .33 2.955L180.87 89.706h20.73c1.28 0 2.441.761 2.944 1.93a3.16 3.16 0 0 1-.634 3.443M62.256 194.158c4.534 2.555 10.243 4.703 16.966 6.38l1.562-6.158c-6.077-1.514-11.389-3.5-15.366-5.742zm16.966-44.403l1.562-6.154c-6.077-1.517-11.389-3.504-15.366-5.745l-3.162 5.52c4.534 2.555 10.24 4.704 16.966 6.38M62.256 92.594l3.162-5.52c3.97 2.241 9.286 4.225 15.366 5.745l-1.562 6.154c-6.732-1.679-12.438-3.827-16.966-6.38" />
        </svg>
      );
    case "Cursor":
      return (
        <svg fill="none" viewBox="0 0 24 24" className={sizeClass}>
          <path d="M22.106 5.68L12.5.135a.998.998 0 00-.998 0L1.893 5.68a.84.84 0 00-.419.726v11.186c0 .3.16.577.42.727l9.607 5.547a.999.999 0 00.998 0l9.608-5.547a.84.84 0 00.42-.727V6.407a.84.84 0 00-.42-.726zm-.603 1.176L12.228 22.92c-.063.108-.228.064-.228-.061V12.34a.59.59 0 00-.295-.51l-9.11-5.26c-.107-.062-.063-.228.062-.228h18.55c.264 0 .428.286.296.514z" fill="#00E5FF" />
        </svg>
      );
    case "Kiro IDE":
      return (
        <svg viewBox="0 0 24 24" className={sizeClass} fill="none">
          <defs>
            <linearGradient id="kiroGhostGrad" x1="0%" x2="100%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
          </defs>
          <path d="M12 2C7.03 2 3 6.03 3 11v8c0 .55.45 1 1 1h.5c.83 0 1.5-.67 1.5-1.5 0 .83.67 1.5 1.5 1.5h1c.83 0 1.5-.67 1.5-1.5 0 .83.67 1.5 1.5 1.5h1c.83 0 1.5-.67 1.5-1.5 0 .83.67 1.5 1.5 1.5h1c.83 0 1.5-.67 1.5-1.5 0 .83.67 1.5 1.5 1.5h.5c.55 0 1-.45 1-1v-8c0-4.97-4.03-9-9-9zm-3 11c-.83 0-1.5-.67-1.5-1.5S8.17 10 9 10s1.5.67 1.5 1.5S9.83 13 9 13zm6 0c-.83 0-1.5-.67-1.5-1.5S14.17 10 15 10s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" fill="url(#kiroGhostGrad)" />
        </svg>
      );
    case "Claude AI":
      return <SiClaude className={sizeClass} color="#D97752" />;
    case "Antigravity":
      return <SiDeepmind className={sizeClass} color="#4285F4" />;
    case "Trae":
      return (
        <svg fill="none" viewBox="0 0 24 24" className={sizeClass}>
          <path d="M24 20.541H3.428v-3.426H0V3.4h24V20.54zM3.428 17.115h17.144V6.827H3.428v10.288zm8.573-5.196l-2.425 2.424-2.424-2.424 2.424-2.424 2.425 2.424zm6.857-.001l-2.424 2.423-2.425-2.423 2.425-2.425 2.424 2.425z" fill="#3F43F6" />
        </svg>
      );
    case "Windsurf":
      return (
        <svg fill="none" viewBox="0 0 24 24" className={sizeClass}>
          <path clipRule="evenodd" d="M23.78 5.004h-.228a2.187 2.187 0 00-2.18 2.196v4.912c0 .98-.804 1.775-1.76 1.775a1.818 1.818 0 01-1.472-.773L13.168 5.95a2.197 2.197 0 00-1.81-.95c-1.134 0-2.154.972-2.154 2.173v4.94c0 .98-.797 1.775-1.76 1.775-.57 0-1.136-.289-1.472-.773L.408 5.098C.282 4.918 0 5.007 0 5.228v4.284c0 .216.066.426.188.604l5.475 7.889c.324.466.8.812 1.351.938 1.377.316 2.645-.754 2.645-2.117V11.89c0-.98.787-1.775 1.76-1.775h.002c.586 0 1.135.288 1.472.773l4.972 7.163a2.15 2.15 0 001.81.95c1.158 0 2.151-.973 2.151-2.173v-4.939c0-.98.787-1.775 1.76-1.775h.194c.122 0 .22-.1.22-.222V5.225a.221.221 0 00-.22-.222z" fill="#00E5FF" />
        </svg>
      );
    case "Git & GitHub":
      return (
        <div className="flex gap-1.5 items-center justify-center">
          <SiGit className="w-7 h-7" color="#F05032" />
          <SiGithub className="w-7 h-7" color="#FFFFFF" />
        </div>
      );
    case "Postman":
      return <SiPostman className={sizeClass} color="#FF6C37" />;
    case "VS Code":
      return <TbBrandVscode className={sizeClass} color="#007ACC" />;
    case "AWS":
      return <TbBrandAws className={sizeClass} color="#FF9900" />;
    case "AWS Lambda":
      return (
        <svg viewBox="0 0 256 256" className={sizeClass}>
          <defs>
            <linearGradient id="lambdaGrad" x1="0%" x2="100%" y1="100%" y2="0%">
              <stop offset="0%" stopColor="#c8511b" />
              <stop offset="100%" stopColor="#f90" />
            </linearGradient>
          </defs>
          <path fill="url(#lambdaGrad)" d="M0 0h256v256H0z" />
          <path fill="#fff" d="M89.624 211.2H49.89l43.945-91.853l19.912 40.992zm7.079-100.63a3.22 3.22 0 0 0-2.887-1.805h-.01a3.2 3.2 0 0 0-2.886 1.82L41.913 213.022a3.203 3.203 0 0 0 2.893 4.58l46.848-.001a3.21 3.21 0 0 0 2.9-1.83l25.65-54.08a3.18 3.18 0 0 0-.016-2.762zM207.985 211.2h-39.477L105.174 78.624a3.21 3.21 0 0 0-2.897-1.824h-25.83l.03-32h50.626l63.042 132.573a3.21 3.21 0 0 0 2.897 1.827h14.943zm3.208-38.4h-16.121L132.03 40.227a3.21 3.21 0 0 0-2.9-1.827H73.273a3.206 3.206 0 0 0-3.208 3.197l-.035 38.4c0 .851.333 1.664.94 2.265c.6.602 1.414.938 2.267.938h27.017l63.337 132.576a3.2 3.2 0 0 0 2.893 1.824h44.709a3.203 3.203 0 0 0 3.207-3.2V176c0-1.766-1.434-3.2-3.207-3.2" />
        </svg>
      );
    case "Amazon S3":
      return (
        <svg viewBox="0 0 256 256" className={sizeClass}>
          <defs>
            <linearGradient id="s3Grad" x1="0%" x2="100%" y1="100%" y2="0%">
              <stop offset="0%" stopColor="#1b660f" />
              <stop offset="100%" stopColor="#6cae3e" />
            </linearGradient>
          </defs>
          <path fill="url(#s3Grad)" d="M0 0h256v256H0z" />
          <path fill="#fff" d="m194.675 137.256l1.229-8.652c11.33 6.787 11.478 9.59 11.475 9.667c-.02.016-1.952 1.629-12.704-1.015m-6.218-1.728c-19.584-5.926-46.857-18.438-57.894-23.654c0-.045.013-.086.013-.131c0-4.24-3.45-7.69-7.693-7.69c-4.237 0-7.687 3.45-7.687 7.69s3.45 7.69 7.687 7.69c1.862 0 3.552-.695 4.886-1.8c12.986 6.148 40.048 18.478 59.776 24.302l-7.801 55.059q-.033.225-.032.451c0 4.848-21.463 13.754-56.532 13.754c-35.44 0-57.13-8.906-57.13-13.754q0-.22-.028-.435l-16.3-119.062c14.108 9.712 44.454 14.85 73.478 14.85c28.979 0 59.273-5.12 73.41-14.802zM48 65.528c.23-4.21 24.428-20.73 75.2-20.73c50.764 0 74.966 16.516 75.2 20.73v1.437c-2.784 9.443-34.144 19.434-75.2 19.434c-41.127 0-72.503-10.023-75.2-19.479zm156.8.07c0-11.087-31.79-27.2-81.6-27.2c-49.812 0-81.6 16.113-81.6 27.2l.3 2.414l17.754 129.676c.426 14.503 39.1 19.91 63.526 19.91c30.31 0 62.512-6.969 62.928-19.9l7.668-54.07c4.265 1.02 7.776 1.542 10.595 1.542c3.785 0 6.345-.925 7.897-2.774c1.274-1.517 1.76-3.354 1.396-5.31c-.83-4.428-6.087-9.202-16.794-15.311l7.603-53.639z" />
        </svg>
      );
    case "Amazon EC2":
      return (
        <svg viewBox="0 0 256 256" className={sizeClass}>
          <defs>
            <linearGradient id="ec2Grad" x1="0%" x2="100%" y1="100%" y2="0%">
              <stop offset="0%" stopColor="#c8511b" />
              <stop offset="100%" stopColor="#f90" />
            </linearGradient>
          </defs>
          <path fill="url(#ec2Grad)" d="M0 0h256v256H0z" />
          <path fill="#fff" d="M86.4 169.6h80v-80h-80zm86.4-80h12.8V96h-12.8v12.8h12.8v6.4h-12.8v9.6h12.8v6.4h-12.8V144h12.8v6.4h-12.8v12.8h12.8v6.4h-12.8v.435a5.97 5.97 0 0 1-5.965 5.965h-.435v12.8H160V176h-12.8v12.8h-6.4V176h-9.6v12.8h-6.4V176H112v12.8h-6.4V176H92.8v12.8h-6.4V176h-.435A5.97 5.97 0 0 1 80 170.035v-.435h-9.6v-6.4H80v-12.8h-9.6V144H80v-12.8h-9.6v-6.4H80v-9.6h-9.6v-6.4H80V96h-9.6v-6.4H80v-.435a5.97 5.97 0 0 1 5.965-5.965h.435V70.4h6.4v12.8h12.8V70.4h6.4v12.8h12.8V70.4h6.4v12.8h9.6V70.4h6.4v12.8H160V70.4h6.4v12.8h.435a5.97 5.97 0 0 1 5.965 5.965zm-41.6 121.203a.4.4 0 0 1-.397.397H45.197a.4.4 0 0 1-.397-.397v-85.606a.4.4 0 0 1 .397-.397H64v-6.4H45.197a6.805 6.805 0 0 0-6.797 6.797v85.606a6.805 6.805 0 0 0 6.797 6.797h85.606a6.805 6.805 0 0 0 6.797-6.797V195.2h-6.4zm86.4-165.606v85.606a6.805 6.805 0 0 1-6.797 6.797H192v-6.4h18.803a.4.4 0 0 0 .397-.397V45.197a.4.4 0 0 0-.397-.397h-85.606a.4.4 0 0 0-.397.397V64h-6.4V45.197a6.805 6.805 0 0 1 6.797-6.797h85.606a6.805 6.805 0 0 1 6.797 6.797" />
        </svg>
      );
    case "AWS API Gateway":
      return (
        <svg viewBox="0 0 80 80" className={sizeClass}>
          <defs>
            <linearGradient x1="0%" y1="100%" x2="100%" y2="0%" id="apiGatewayGrad">
              <stop stopColor="#B0084D" offset="0%" />
              <stop stopColor="#FF4F8B" offset="100%" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="80" height="80" fill="url(#apiGatewayGrad)" />
          <g transform="translate(8.000000, 8.000000)" fill="#FFFFFF">
            <path d="M26.065,47.6323642 L29,47.6323642 L29,45.6152989 L26.065,45.6152989 L26.065,47.6323642 Z M31,47.6323642 L34,47.6323642 L34,45.6152989 L31,45.6152989 L31,47.6323642 Z M19,6.62946112 L6,13.082053 L6,53.1934132 L19,57.589607 L19,6.62946112 Z M21,19.3934502 L21,45.6152989 L24,45.6152989 L24,47.6323642 L21,47.6323642 L21,58.9914674 C21,59.3162149 20.845,59.6207917 20.584,59.8103959 C20.412,59.9354539 20.207,60 20,60 C19.894,60 19.786,59.9828549 19.682,59.9475563 L4.682,54.8756456 C4.274,54.7374767 4,54.3522172 4,53.9195567 L4,12.4537371 C4,12.0704947 4.217,11.7185168 4.559,11.5490833 L19.559,4.10409539 C19.868,3.94978989 20.235,3.96794348 20.528,4.15250495 C20.821,4.33605789 21,4.65979687 21,5.00874917 L21,17.376385 L24,17.376385 L24,19.3934502 L21,19.3934502 Z M36,47.6323642 L39,47.6323642 L39,45.6152989 L36,45.6152989 L36,47.6323642 Z M36.065,19.3934502 L39,19.3934502 L39,17.376385 L36.065,17.376385 L36.065,19.3934502 Z M31.065,19.3934502 L34,19.3934502 L34,17.376385 L31.065,17.376385 L31.065,19.3934502 Z M26.065,19.3934502 L29,19.3934502 L29,17.376385 L26.065,17.376385 L26.065,19.3934502 Z M58,13.082053 L45,6.62946112 L45,57.589607 L58,53.1934132 L58,13.082053 Z M60,53.9195567 C60,54.3522172 59.726,54.7374767 59.318,54.8756456 L44.318,59.9475563 C44.214,59.9828549 44.106,60 44,60 C43.793,60 43.588,59.9354539 43.416,59.8103959 C43.155,59.6207917 43,59.3162149 43,58.9914674 L43,47.6323642 L41.065,47.6323642 L41.065,45.6152989 L43,45.6152989 L43,19.3934502 L41.065,19.3934502 L41.065,17.376385 L43,17.376385 L43,5.00874917 C43,4.65979687 43.179,4.33605789 43.472,4.15250495 C43.765,3.96794348 44.131,3.94978989 44.441,4.10409539 L59.441,11.5490833 C59.783,11.7185168 60,12.0704947 60,12.4537371 L60,53.9195567 Z M34.934,25.8067093 L33.066,25.0825829 L28.066,38.1935072 L29.934,38.9176337 L34.934,25.8067093 Z M41.707,32.2088745 C42.098,31.8145383 42.098,31.1761371 41.707,30.7828094 L37.707,26.7486788 L36.293,28.174744 L39.586,31.4958419 L36.293,34.8169399 L37.707,36.2430051 L41.707,32.2088745 Z M26.293,36.2430051 L22.293,32.2088745 C21.902,31.8145383 21.902,31.1761371 22.293,30.7828094 L26.293,26.7486788 L27.707,28.174744 L24.414,31.4958419 L27.707,34.8169399 L26.293,36.2430051 Z" />
          </g>
        </svg>
      );
    case "AWS IAM":
      return (
        <svg viewBox="0 0 80 80" className={sizeClass}>
          <defs>
            <linearGradient x1="0%" y1="100%" x2="100%" y2="0%" id="iamGrad">
              <stop stopColor="#BD0816" offset="0%" />
              <stop stopColor="#FF5252" offset="100%" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="80" height="80" fill="url(#iamGrad)" />
          <path d="M14,59 L66,59 L66,21 L14,21 L14,59 Z M68,20 L68,60 C68,60.552 67.553,61 67,61 L13,61 C12.447,61 12,60.552 12,60 L12,20 C12,19.448 12.447,19 13,19 L67,19 C67.553,19 68,19.448 68,20 L68,20 Z M44,48 L59,48 L59,46 L44,46 L44,48 Z M57,42 L62,42 L62,40 L57,40 L57,42 Z M44,42 L52,42 L52,40 L44,40 L44,42 Z M29,46 C29,45.449 28.552,45 28,45 C27.448,45 27,45.449 27,46 C27,46.551 27.448,47 28,47 C28.552,47 29,46.551 29,46 L29,46 Z M31,46 C31,47.302 30.161,48.401 29,48.816 L29,51 L27,51 L27,48.815 C25.839,48.401 25,47.302 25,46 C25,44.346 26.346,43 28,43 C29.654,43 31,44.346 31,46 L31,46 Z M19,53.993 L36.994,54 L36.996,50 L33,50 L33,48 L36.996,48 L36.998,45 L33,45 L33,43 L36.999,43 L37,40.007 L19.006,40 L19,53.993 Z M22,38.001 L34,38.006 L34,31 C34.001,28.697 31.197,26.677 28,26.675 L27.996,26.675 C24.804,26.675 22.004,28.696 22.002,31 L22,38.001 Z M17,54.992 L17.006,39 C17.006,38.734 17.111,38.48 17.299,38.292 C17.486,38.105 17.741,38 18.006,38 L20,38.001 L20.002,31 C20.004,27.512 23.59,24.675 27.996,24.675 L28,24.675 C32.412,24.677 36.001,27.515 36,31 L36,38.007 L38,38.008 C38.553,38.008 39,38.456 39,39.008 L38.994,55 C38.994,55.266 38.889,55.52 38.701,55.708 C38.514,55.895 38.259,56 37.994,56 L18,55.992 C17.447,55.992 17,55.544 17,54.992 L17,54.992 Z M60,36 L62,36 L62,34 L60,34 L60,36 Z M44,36 L55,36 L55,34 L44,34 L44,36 Z" fill="#FFFFFF" />
        </svg>
      );
    case "AWS Amplify":
      return <IoLogoAmplify className={sizeClass} color="#FF9900" />;
    case "Amazon RDS":
      return (
        <svg viewBox="0 0 256 256" className={sizeClass}>
          <defs>
            <linearGradient id="rdsGrad" x1="0%" x2="100%" y1="100%" y2="0%">
              <stop offset="0%" stopColor="#2e27ad" />
              <stop offset="100%" stopColor="#527fff" />
            </linearGradient>
          </defs>
          <path fill="url(#rdsGrad)" d="M0 0h256v256H0z" />
          <path fill="#fff" d="m49.325 44.8l29.737 29.738l-4.524 4.524L44.8 49.325V73.6h-6.4v-32a3.2 3.2 0 0 1 3.2-3.2h32v6.4zM217.6 41.6v32h-6.4V49.325l-29.738 29.737l-4.524-4.524L206.675 44.8H182.4v-6.4h32a3.2 3.2 0 0 1 3.2 3.2m-6.4 140.8h6.4v32a3.2 3.2 0 0 1-3.2 3.2h-32v-6.4h24.275l-29.737-29.738l4.524-4.524l29.738 29.737zm-1.6-56.918c0-10.621-12.262-21.114-32.8-28.068l2.051-6.06C202.458 99.344 216 111.782 216 125.482c0 13.702-13.542 26.144-37.152 34.13l-2.051-6.063c20.54-6.95 32.803-17.44 32.803-28.067m-163.02 0c0 10.176 11.478 20.39 30.706 27.328l-2.172 6.019c-22.202-8.01-34.935-20.163-34.935-33.347c0-13.181 12.733-25.335 34.935-33.348l2.172 6.02c-19.228 6.94-30.707 17.155-30.707 27.328m32.482 55.98L49.325 211.2H73.6v6.4h-32a3.2 3.2 0 0 1-3.2-3.2v-32h6.4v24.275l29.738-29.737zM128 100.115c-22.867 0-35.2-5.907-35.2-8.32c0-2.416 12.333-8.32 35.2-8.32c22.864 0 35.2 5.904 35.2 8.32c0 2.413-12.336 8.32-35.2 8.32m.093 24.784c-21.895 0-35.293-5.98-35.293-9.235v-15.555c7.882 4.349 21.862 6.406 35.2 6.406s27.318-2.057 35.2-6.406v15.555c0 3.258-13.328 9.235-35.107 9.235m0 24.435c-21.895 0-35.293-5.98-35.293-9.235v-15.74c7.78 4.572 21.574 6.94 35.293 6.94c13.641 0 27.357-2.365 35.107-6.925V140.1c0 3.258-13.328 9.235-35.107 9.235M128 171.258c-22.774 0-35.2-6.122-35.2-9.268v-13.196c7.78 4.572 21.574 6.94 35.293 6.94c13.641 0 27.357-2.361 35.107-6.924v13.18c0 3.146-12.426 9.268-35.2 9.268m0-94.183c-20.035 0-41.6 4.605-41.6 14.72v70.195c0 10.285 20.928 15.668 41.6 15.668s41.6-5.383 41.6-15.668V91.795c0-10.115-21.565-14.72-41.6-14.72" />
        </svg>
      );
    case "Stripe":
      return <SiStripe className={sizeClass} color="#635BFF" />;
    case "Sanity CMS":
      return <SiSanity className={sizeClass} color="#F03E2F" />;
    case "Firebase Cloud Messaging (FCM)":
    case "FCM":
      return (
        <div className="relative">
          <SiFirebase className={sizeClass} color="#FFCA28" />
          <div className="absolute -bottom-1 -right-1 bg-red-500 rounded-full p-0.5 border border-zinc-950">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
            </svg>
          </div>
        </div>
      );
    case "Resend":
      return <SiResend className={sizeClass} color="#FFFFFF" />;
    // Backend additions
    case "Python":
      return <SiPython className={sizeClass} color="#3776AB" />;
    case "Flask":
      return <SiFlask className={sizeClass} color="#FFFFFF" />;
    case "REST API Design":
      return <TbApi className={sizeClass} color="#22c55e" />;
    // Database additions
    case "MySQL":
      return <SiMysql className={sizeClass} color="#4479A1" />;
    case "PostgreSQL":
      return <SiPostgresql className={sizeClass} color="#4169E1" />;
    // Cloud/DevOps additions
    case "AWS Cognito":
      return (
        <svg viewBox="0 0 80 80" className={sizeClass}>
          <defs>
            <linearGradient x1="0%" y1="100%" x2="100%" y2="0%" id="cognitoGrad">
              <stop stopColor="#BD0816" offset="0%" />
              <stop stopColor="#FF5252" offset="100%" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="80" height="80" fill="url(#cognitoGrad)" />
          <path d="M16.9635609,35.8079225 L29.8688192,35.8079225 L29.8688192,33.8253841 L16.9635609,33.8253841 L16.9635609,35.8079225 Z M61.3755183,50.2308895 L62.7792133,51.6325441 L55.4073327,58.9937093 C55.2127611,59.1870067 54.9586268,59.2841511 54.7054852,59.2841511 C54.4513509,59.2841511 54.1972166,59.1870067 54.0036377,58.9937093 L50.294865,55.2913188 L51.69856,53.8896641 L54.7054852,56.8912273 L61.3755183,50.2308895 Z M65.9439798,55.6937741 C65.7176414,57.5573602 64.9592093,59.29109 63.7471077,60.708605 C62.8864262,61.7157345 61.7994064,62.5484006 60.604181,63.1154066 C59.0009508,63.8757101 57.2200251,64.1641694 55.4460485,63.9480727 C53.7207147,63.7379237 52.0946522,63.057913 50.7396,61.9823859 C48.1367087,59.9155896 46.8223578,56.7108163 47.2224208,53.4088985 C47.6006441,50.2883831 49.4917608,47.5663578 52.2802893,46.127035 C53.6164799,45.4381029 55.0797377,45.0842198 56.5697987,45.0842198 C56.9519928,45.0842198 57.3371652,45.1080102 57.7213448,45.1545999 C60.8344902,45.534256 63.549558,47.4365016 64.9810489,50.2427847 C65.839745,51.9259598 66.1723036,53.8113538 65.9439798,55.6937741 Z M66.750062,49.3437035 C65.0177793,45.9476152 61.731902,43.6458881 57.9615811,43.1869305 C55.6813213,42.9083838 53.4030468,43.3167868 51.3689796,44.3655496 C47.9957436,46.1062183 45.7085347,49.3982233 45.2508944,53.1709939 C44.7684363,57.1608525 46.3577685,61.0357238 49.5046661,63.5347135 C51.1456193,64.8372412 53.1171457,65.6609859 55.2048194,65.9157421 C55.6674233,65.9722445 56.1300272,66 56.5916383,66 C58.2713073,66 59.9301294,65.6292653 61.455928,64.9056388 C62.9023096,64.2196805 64.2176533,63.212551 65.2570229,61.9952724 C66.7232588,60.2803767 67.6425103,58.1838423 67.9155061,55.9316787 C68.1914801,53.6567158 67.788439,51.3787792 66.750062,49.3437035 Z M26.8906827,41.7555378 L30.8615314,41.7555378 L30.8615314,39.7729994 L26.8906827,39.7729994 L26.8906827,41.7555378 Z M16.9635609,41.7555378 L24.9052583,41.7555378 L24.9052583,39.7729994 L16.9635609,39.7729994 L16.9635609,41.7555378 Z M16.1058576,15.9825384 L60.5078879,15.9825384 C61.6773028,15.9825384 62.6283211,17.1393496 62.6283211,18.5608296 L62.6283211,25.8952305 L59.6501845,25.8952305 L59.6501845,20.9388844 C59.6501845,20.3917038 59.2064422,19.9476152 58.6574724,19.9476152 L35.8250923,19.9476152 C35.2761224,19.9476152 34.8323801,20.3917038 34.8323801,20.9388844 L34.8323801,25.8952305 L13.9854244,25.8952305 L13.9854244,18.5608296 C13.9854244,17.16314 14.9572896,15.9825384 16.1058576,15.9825384 Z M47.256173,25.6077624 C49.5612507,25.6077624 51.436484,27.4614358 51.436484,29.7393725 C51.436484,31.2411453 50.6075693,32.6229746 49.2733642,33.3466011 C48.0066634,34.0335507 46.4798721,34.0246292 45.2300474,33.3475924 C43.9008058,32.6219833 43.075862,31.240154 43.075862,29.7393725 C43.075862,27.4614358 44.9501026,25.6077624 47.256173,25.6077624 Z M13.9854244,47.1083915 L13.9854244,27.8777689 L34.8323801,27.8777689 L34.8323801,44.7293454 C34.8323801,45.2775173 35.2761224,45.7206146 35.8250923,45.7206146 L46.2029054,45.7206146 L46.2029054,43.7380762 L37.9117733,43.7380762 C37.9981392,39.7710168 40.6357755,36.3441992 44.4338923,35.249838 C46.1890074,36.0696176 48.2846228,36.0775478 50.0665412,35.2488467 C52.2286683,35.8733463 54.1207777,37.3176255 55.2931708,39.2535743 L56.9917013,38.2266194 C55.7885342,36.2430897 53.9629365,34.6947272 51.8454814,33.7946548 C52.8381936,32.694346 53.4219083,31.2629532 53.4219083,29.7393725 C53.4219083,26.3680659 50.6552195,23.625224 47.256173,23.625224 C43.8561338,23.625224 41.0904377,26.3680659 41.0904377,29.7393725 C41.0904377,31.2570056 41.6681962,32.683442 42.6539593,33.7837508 C40.0004397,34.8999199 37.9276567,36.9924892 36.8178045,39.572763 L36.8178045,21.9301536 L57.6647602,21.9301536 L57.6647602,37.7904609 L59.6501845,37.7904609 L59.6501845,27.8777689 L62.6283211,27.8777689 L62.6293138,42.746807 L64.6147382,42.746807 L64.6137454,18.5608296 C64.6137454,16.0459796 62.7722643,14 60.5078879,14 L16.1058576,14 C13.8414811,14 12,16.0459796 12,18.5608296 L12,47.1083915 C12,49.6232415 13.8414811,51.6682298 16.1058576,51.6682298 L42.7740775,51.6682298 L42.7740775,49.6856914 L16.1058576,49.6856914 C14.9572896,49.6856914 13.9854244,48.5060811 13.9854244,47.1083915 Z" fill="#FFFFFF" />
        </svg>
      );
    case "Docker":
      return <SiDocker className={sizeClass} color="#2496ED" />;
    case "Nginx":
      return <SiNginx className={sizeClass} color="#009639" />;
    case "Vercel":
      return <SiVercel className={sizeClass} color="#FFFFFF" />;
    case "Netlify":
      return <SiNetlify className={sizeClass} color="#00C7B7" />;
    case "Bitbucket":
      return <SiBitbucket className={sizeClass} color="#0052CC" />;
    // Security
    case "OWASP Top 10":
      return (
        <div className="flex flex-col items-center justify-center gap-0.5">
          <TbShieldLock className="w-9 h-9" color="#EF4444" />
          <span className="text-[8px] font-black text-red-400 leading-none tracking-tighter">OWASP</span>
        </div>
      );
    case "JWT Auth":
      return (
        <div className="flex flex-col items-center justify-center gap-0.5">
          <TbLock className="w-9 h-9" color="#8B5CF6" />
          <span className="text-[9px] font-black text-violet-400 leading-none">JWT</span>
        </div>
      );
    case "API Security":
      return (
        <div className="flex flex-col items-center justify-center gap-0.5">
          <TbApi className="w-9 h-9" color="#F97316" />
          <span className="text-[7px] font-black text-orange-400 leading-none">SECURE</span>
        </div>
      );
    case "Secure Coding":
      return (
        <div className="flex flex-col items-center justify-center gap-0.5">
          <Shield className="w-9 h-9" color="#10B981" />
          <span className="text-[7px] font-black text-emerald-400 leading-none">SECURE</span>
        </div>
      );
    case "Input Validation":
      return (
        <div className="flex flex-col items-center justify-center gap-0.5">
          <Activity className="w-9 h-9" color="#06B6D4" />
          <span className="text-[7px] font-black text-cyan-400 leading-none">VALIDATE</span>
        </div>
      );
    default:
      return null;
  }
}

function TerminalText({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 10);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span>
      {displayedText}
      <span className="inline-block w-1.5 h-3 bg-cyan-400 animate-pulse ml-0.5" />
    </span>
  );
}

function mapDBSkill(db: DBSkill): Skill {
  // Find static metadata in the existing skillsData array
  const staticSkill = skillsData.find(s => s.name.toLowerCase() === db.name.toLowerCase() || 
                                          (db.name === "React" && s.name === "React.js") ||
                                          (db.name === "React.js" && s.name === "React"));

  const meta = staticSkill || {
    years: 1,
    status: "Learning" as const,
    description: "Dynamic skill managed via Supabase CMS.",
    color: "from-zinc-500 to-zinc-700",
    glowColor: "rgba(115, 115, 115, 0.4)",
  };

  let category: Skill["category"] = "frontend";
  const dbCat = db.category.toLowerCase();
  if (dbCat === "frontend") category = "frontend";
  else if (dbCat === "backend") category = "backend";
  else if (dbCat === "database") category = "database";
  else if (dbCat === "devops" || dbCat === "cloud" || dbCat === "mobile") category = "cloud";
  else if (dbCat === "tools") category = "tools";
  else if (dbCat === "security") category = "security";

  return {
    name: db.name,
    category,
    years: meta.years,
    status: meta.status,
    description: meta.description,
    color: meta.color,
    glowColor: meta.glowColor,
  };
}

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>(skillsData);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedSkill, setSelectedSkill] = useState<Skill>(skillsData[0]);

  useEffect(() => {
    async function loadSkills() {
      const dbSkills = await getSkills();
      if (dbSkills && dbSkills.length > 0) {
        const mapped = dbSkills.map(mapDBSkill);
        setSkills(mapped);
        // If the selected skill is not in the new list, reset it
        setSelectedSkill(prev => {
          const found = mapped.find(s => s.name === prev.name);
          return found || mapped[0];
        });
      }
    }
    loadSkills();
  }, []);

  // Memoize the filtered list — avoids re-filtering 40+ skills on selectedSkill state changes
  const filteredSkills = useMemo(
    () => skills.filter(
      (skill) => activeCategory === "all" || skill.category === activeCategory
    ),
    [activeCategory, skills]
  );

  const handleCategoryChange = useCallback((catId: string) => {
    setActiveCategory(catId);
    setSkills(currentSkills => {
      const firstOfCat = currentSkills.find(
        (skill) => catId === "all" || skill.category === catId
      );
      if (firstOfCat) {
        setSelectedSkill(firstOfCat);
      }
      return currentSkills;
    });
  }, []);

  return (
    <section
      id="skills"
      className="relative py-28 bg-bg-dark overflow-hidden border-t border-border-glass px-6 scroll-mt-28"
    >
      {/* Glow Blur Accent */}
      <div className="absolute top-1/4 right-1/4 glow-blur-primary opacity-10 pointer-events-none" />

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
            <Cpu size={16} className="animate-spin-slow" />
            <span>Tech Stack</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold font-space text-primary-text"
          >
            Capabilities & Toolkit
          </motion.h2>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-300 relative border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 cursor-pointer ${activeCategory === cat.id
                  ? "text-primary-text border-transparent"
                  : "text-secondary-text border-border-glass bg-white/3 hover:border-white/10 hover:text-primary-text"
                }`}
            >
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="activeCategoryBg"
                  className="absolute inset-0 bg-gradient-to-r from-purple-600/90 to-cyan-600/90 rounded-full z-[-1]"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
              {cat.icon}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Area: HUD Skills Grid */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-4"
              >
                {filteredSkills.map((skill) => {
                  const isActive = selectedSkill.name === skill.name;
                  return (
                    <motion.div
                      key={skill.name}
                      whileHover={{ y: -4, scale: 1.02 }}
                      onClick={() => setSelectedSkill(skill)}
                      className={`glassmorphism p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-4 border transition-all duration-300 cursor-pointer relative group ${isActive
                          ? "border-purple-500/40 bg-purple-500/5 shadow-lg shadow-purple-500/5"
                          : "hover:border-purple-500/20"
                        }`}
                    >
                      {/* Brand Logo Container */}
                      <div className="w-16 h-16 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-300">
                        <TechIcon name={skill.name} />
                      </div>

                      {/* Skill Info */}
                      <div className="flex flex-col items-center gap-1.5 relative z-10">
                        <span className="font-bold text-sm text-primary-text tracking-wide group-hover:text-purple-400 transition-colors duration-300">
                          {skill.name}
                        </span>
                      </div>

                      {/* Category pill badge */}
                      <span className="absolute top-3 right-3 text-[8px] font-mono uppercase px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/5 text-secondary-text border border-border-glass">
                        {skill.category}
                      </span>

                      {/* Active Selection Pointer indicator */}
                      {isActive && (
                        <div className="absolute left-3 top-3 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                      )}

                      {/* Background glow hover */}
                      <div
                        className={`absolute -inset-px rounded-2xl bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-10 blur-[6px] transition-opacity duration-300 pointer-events-none`}
                      />
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Area: System Inspector Terminal */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="glassmorphism rounded-3xl border border-border-glass bg-neutral-950/95 dark:bg-neutral-950/95 light-theme:bg-white/95 p-6 shadow-xl relative overflow-hidden font-mono text-xs select-none">
              {/* Scanline Overlay */}
              <div className="absolute inset-0 bg-scanline pointer-events-none opacity-5" />

              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between border-b border-border-glass pb-4 mb-4">
                <div className="flex items-center gap-1.5">
                  <Terminal size={14} className="text-cyan-400" />
                  <span className="font-mono text-[10px] tracking-wide text-secondary-text uppercase">
                    SYS_INSPECTOR v1.0.5
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500/50" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                  <div className="w-2 h-2 rounded-full bg-green-500/80 animate-pulse" />
                </div>
              </div>

              {/* Terminal Logs */}
              <div className="space-y-4 min-h-[260px] flex flex-col justify-between">
                <div className="space-y-3">
                  {/* Inspection Header */}
                  <div className="flex items-center gap-2 text-cyan-400">
                    <Activity size={12} className="animate-pulse" />
                    <span>INSPECTING: {selectedSkill.name.toUpperCase()}</span>
                  </div>

                  {/* Details Data */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-secondary-text">STATUS:</span>
                      <span className="text-purple-400 font-bold tracking-widest uppercase">
                        {selectedSkill.status}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-secondary-text">EXPERIENCE:</span>
                      <span className="text-primary-text font-semibold">
                        {selectedSkill.years} Years Active
                      </span>
                    </div>
                  </div>

                  {/* Capabilities Decoded */}
                  <div className="pt-2 border-t border-border-glass/40 space-y-1">
                    <span className="text-secondary-text block text-[10px] uppercase">
                      Decoded_Capabilities:
                    </span>
                    <p className="text-primary-text leading-relaxed min-h-[80px] text-xs">
                      <TerminalText text={selectedSkill.description} />
                    </p>
                  </div>
                </div>

                {/* Footer status ticks */}
                <div className="pt-4 border-t border-border-glass/40 text-[9px] text-secondary-text flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Shield size={10} className="text-green-500" />
                    <span>SECURE_SHELL</span>
                  </div>
                  <span>PORT_3000: OK</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
