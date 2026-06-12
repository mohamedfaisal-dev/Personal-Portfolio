-- ================================================================
-- PORTFOLIO CMS — Migration 004: Seed Initial Data
-- Run this AFTER migrations 001, 002, 003
-- ================================================================

-- ─── PROJECTS ─────────────────────────────────────────────────
INSERT INTO projects (sort_order, title, category, image, tech, overview, demo_url, app_store_url, play_store_url, problem, solution, features, is_featured) VALUES
(1,
 'Xenbite — Food & In-App Wallet SaaS',
 'Web Application',
 '/images/xenbite.png',
 ARRAY['React Native','AWS Lambda','DynamoDB','Cognito','Stripe','FCM','Resend'],
 'Live on the App Store & Google Play. Xenbite is a food-tech SaaS app where users buy Fresh Food and discounted Surplus Meals from nearby restaurants, bakeries & stores — powered by a fully serverless AWS backend, in-app Stripe wallet, and real-time FCM push notifications.',
 'https://xenbite.com',
 'https://apps.apple.com/gb/app/xenbite/id6762509915',
 'https://play.google.com/store/apps/details?id=com.akhlaqventures.xenbite.app',
 'Restaurants and stores waste tonnes of fresh and near-expiry food daily. Consumers lack an easy, trust-worthy marketplace to buy Fresh Food and discounted Surplus Meals from local vendors — while vendors need a frictionless way to list, sell, and get paid.',
 'Built Xenbite — a full-stack React Native SaaS on a serverless AWS backbone (Lambda, API Gateway, DynamoDB, Cognito). Implemented a Fresh Food marketplace, a Surplus Food discount module, an in-app Stripe wallet, and real-time FCM push notifications. Live on both App Store (iOS) and Google Play (Android).',
 ARRAY['Fresh Food marketplace — users discover & purchase fresh meals and groceries from nearby vendors at retail price','Surplus Food module — discounted near-expiry meals and groceries, helping reduce food waste','In-app Stripe wallet — secure top-ups, balance tracking, and one-tap checkout across both food categories','Real-time FCM push notifications for order updates, new listings, and promotional offers','Referral & Rewards system — gamified user growth engine driving organic downloads','Fully serverless AWS architecture: Lambda + DynamoDB + API Gateway + Cognito with fine-grained IAM','End-to-end mobile release pipelines — App Store (iOS) & Google Play (Android) build signing and submissions'],
 true),

(2,
 'RentalHub — Property Rental SaaS',
 'Web Application',
 '/images/rentalhub.png',
 ARRAY['Next.js','SQL','SaaS Architecture','Tailwind CSS','JWT Auth','REST API'],
 'A multi-tenant property management SaaS platform providing vendor and tenant dashboards for property listing, maintenance tracking, and lease agreements.',
 '#',
 NULL,
 NULL,
 'Property managers and tenants face administrative overhead when managing leases, maintenance requests, and rent billing across disjointed tools.',
 'Built a centralized multi-tenant platform with dedicated vendor and tenant portals, complete with a structured SQL database schema for leases, properties, and billing histories.',
 ARRAY['Multi-tenant vendor dashboard and tenant request portal','Structured SQL database for property listings and lease tracking','Responsive, mobile-first interface built with clean component architecture','Secure user authentication and role-based route guard shields'],
 false),

(3,
 'Jesko Jets — Luxury Aviation Interface',
 'Creative Web',
 '/images/jeskojets_new.png',
 ARRAY['Next.js','Tailwind CSS','Framer Motion','Responsive Design','AI-Assisted'],
 'A luxury aviation web interface built from the ground up, capturing sophisticated brand aesthetics and smooth interactive animations with pixel-perfect responsive layouts.',
 'https://clone-jesko-jets.vercel.app/',
 NULL,
 NULL,
 'Standard aviation templates fail to communicate the premium status and high-end aesthetics required by luxury private charter clients.',
 'Developed an immersive web interface with Next.js, implementing custom parallax animations and fluid layouts to deliver an authentic high-end experience.',
 ARRAY['Pixel-perfect responsive layout across mobile, tablet, and desktop viewports','Advanced CSS techniques for cinematic animations and parallax scrolling effects','AI-native workflow (Cursor, Claude) to accelerate delivery of clean, modular code','SEO-optimized layout structure yielding rapid page load metrics'],
 false),

(4,
 'Aqsa Technical Services — Home Maintenance & Blog Platform',
 'Web Application',
 '/images/aqsatech.png',
 ARRAY['Next.js','Sanity CMS','Tailwind CSS','Framer Motion','Nodemailer','SEO Optimization'],
 'A professional freelance project built for a Dubai-based technical services company. Powered by Next.js and integrated with Sanity CMS for headless content editing, enabling the client to publish blogs, manage maintenance service categories, and handle customer booking requests.',
 'https://aqsatech.ae',
 NULL,
 NULL,
 'The client needed a modern, highly performant web presence in Dubai to attract home maintenance leads (AC repair, plumbing, painting, electrical) and a robust blogging system to capture organic search traffic through content marketing.',
 'Engineered a fast, SEO-optimized Next.js web application. Integrated Sanity CMS as a headless backend, letting the client write, edit, and publish blogs dynamically. Developed responsive booking workflows with Nodemailer integration for real-time lead alerts.',
 ARRAY['High-performance Next.js frontend with App Router architecture for sub-second page loads','Headless Sanity CMS configuration for seamless blog editing and service description management','Dynamic content publishing pipelines with rich-text blogging components','Interactive customer lead booking form triggering automated email routing via Nodemailer','Rigorous SEO schema markup and semantic HTML structure targeting regional Google search rankings','Fully responsive layouts and fluid UI interactions built with Tailwind CSS and Framer Motion'],
 false),

(5,
 'Legacy Aviation — Pilot Ground School & Training Platform',
 'Web Application',
 '/images/legacyaviation.png',
 ARRAY['Next.js','AWS SES','AWS Lambda','Tailwind CSS','Framer Motion','Responsive Design'],
 'A professional educational portal and ground school management platform for a premier aviation training institute. Facilitates online and offline pilot training pathways with a dynamic course system, student verification workflows, and secure AWS-backed email communication pipelines.',
 'https://www.legacyaviation.in',
 NULL,
 NULL,
 'Aspiring pilots require structured access to DGCA ground subjects (Air Navigation, Meteorology, Air Regulations) with seamless switching between online and offline classes, alongside a secure, automated way to verify student accounts upon registration.',
 'Collaborated on the Next.js frontend to build a highly responsive ground school interface. Developed a secure, serverless AWS verification backend that automates registration confirmation emails and secures student profiles prior to course enrollment.',
 ARRAY['Interactive curriculum index for DGCA, Commercial Pilot License (CPL), and cabin crew courses','Automated student email verification and verification checkouts powered by AWS SES and Lambda','Flexible program structures supporting hybrid (online/offline) training scheduling','Sleek and professional aviation-themed user experience designed with Tailwind CSS and Framer Motion','Modern responsive layouts ensuring flawless navigation on mobile devices for students on the go'],
 false),

(6,
 'FZ Elec — Electrical Engineering & Design Portfolio',
 'Web Application',
 '/images/fzelec.png',
 ARRAY['Next.js','Supabase','Tailwind CSS','Framer Motion','Inbuilt CMS','Responsive Design'],
 'A premium portfolio and service showcase platform engineered for a French electrical design and project engineering professional. Powered by Next.js for rapid static site rendering and Supabase for a real-time database-driven custom CMS to manage completed projects.',
 'https://fzelec.fr',
 NULL,
 NULL,
 'An electrical draftsperson and project designer needs a high-end showcase website to present complex technical schematics, telecom wiring plans, and project management portfolios to prospective French construction and infrastructure clients.',
 'Designed and built an interactive Next.js application integrated with Supabase. Established a flexible database schema serving as a custom built-in CMS, allowing the engineer to instantly update completed projects, details, and attachments via a secure Supabase instance.',
 ARRAY['Sleek professional portfolio layout highlighting electrical and telecommunication project portfolios','Dynamic client-side hydration from Supabase hosting project assets and structural schemas','Custom animations and smooth hover transitions matching modern French design aesthetics','Optimized SEO performance achieving sub-second LCP scores for competitive local search queries','Fully responsive UI design ensuring detailed technical charts render cleanly on mobile and tablets'],
 false);

-- ─── ACHIEVEMENTS ─────────────────────────────────────────────
INSERT INTO achievements (sort_order, label, value, suffix, icon) VALUES
(1, 'Projects Shipped', 20, '+', 'Rocket'),
(2, 'Years Experience', 3, '+', 'Calendar'),
(3, 'Happy Clients', 15, '+', 'Heart'),
(4, 'App Store Downloads', 1000, '+', 'Download');

-- ─── SKILLS ───────────────────────────────────────────────────
INSERT INTO skills (sort_order, name, category, icon_key, proficiency) VALUES
-- Frontend
(1,  'React',          'Frontend', 'React',         95),
(2,  'Next.js',        'Frontend', 'Next.js',        93),
(3,  'TypeScript',     'Frontend', 'TypeScript',     90),
(4,  'Tailwind CSS',   'Frontend', 'Tailwind CSS',   92),
(5,  'Framer Motion',  'Frontend', 'Framer Motion',  85),
(6,  'Three.js',       'Frontend', 'Three.js',       75),
-- Backend
(7,  'Node.js',        'Backend',  'Node.js',        88),
(8,  'Python',         'Backend',  'Python',         80),
(9,  'REST API',       'Backend',  'REST API',       90),
(10, 'AWS Lambda',     'Backend',  'AWS Lambda',     82),
-- Mobile
(11, 'React Native',   'Mobile',   'React Native',   88),
(12, 'Expo',           'Mobile',   'Expo',           85),
-- Database
(13, 'Supabase',       'Database', 'Supabase',       88),
(14, 'PostgreSQL',     'Database', 'PostgreSQL',     80),
(15, 'DynamoDB',       'Database', 'DynamoDB',       78),
(16, 'MongoDB',        'Database', 'MongoDB',        82),
-- DevOps
(17, 'Docker',         'DevOps',   'Docker',         75),
(18, 'Git',            'DevOps',   'Git',            92),
(19, 'Vercel',         'DevOps',   'Vercel',         90),
(20, 'AWS',            'DevOps',   'AWS',            80),
(21, 'AWS S3 Bucket',  'DevOps',   'AWS S3 Bucket',  88);
