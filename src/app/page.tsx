"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { ThemeProvider } from "@/components/shared/ThemeContext";
import { ResumeProvider } from "@/components/shared/ResumeProvider";
import CustomCursor from "@/components/shared/CustomCursor";
import LoadingScreen from "@/components/shared/LoadingScreen";
import ScrollProgressBar from "@/components/shared/ScrollProgressBar";
import FloatingActionButton from "@/components/shared/FloatingActionButton";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import Hero from "@/components/sections/Hero";

// Lazy-load below-the-fold sections to improve initial LCP
const About = dynamic(() => import("@/components/sections/About"), {
  ssr: false,
});
const Skills = dynamic(() => import("@/components/sections/Skills"), {
  ssr: false,
});
const Projects = dynamic(() => import("@/components/sections/Projects"), {
  ssr: false,
});
const Experience = dynamic(() => import("@/components/sections/Experience"), {
  ssr: false,
});
const Achievements = dynamic(
  () => import("@/components/sections/Achievements"),
  { ssr: false }
);
const Contact = dynamic(() => import("@/components/sections/Contact"), {
  ssr: false,
});

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider>
      <ResumeProvider>
      {/* Visual Enhancers */}
      <CustomCursor />
      <ScrollProgressBar />
      <FloatingActionButton />

      {/* Loading Sequence */}
      <LoadingScreen onComplete={() => setLoading(false)} />

      {/* Main Portfolio Content */}
      <div
        className={`flex flex-col min-h-screen selection:bg-purple-500/30 transition-opacity duration-700 ${
          loading ? "opacity-0 h-screen overflow-hidden pointer-events-none" : "opacity-100"
        }`}
      >
        <Header />
        <main className="flex-grow">
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Achievements />
          <Contact />
        </main>
        <Footer />
      </div>
      </ResumeProvider>
    </ThemeProvider>
  );
}
