"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const duration = 1600; // Total loading duration
    const intervalTime = 20;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(onComplete, 800); // Allow exit animations to complete
          }, 400);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="fixed inset-0 bg-[#030303] z-[99999] flex flex-col items-center justify-center font-space"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }
          }}
        >
          {/* Animated Background Glare */}
          <div className="absolute inset-0 bg-radial-gradient from-purple-500/10 via-transparent to-transparent opacity-50 blur-[100px]" />
          
          <div className="relative flex flex-col items-center w-full max-w-xs px-6">
            {/* Logo Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-400 mb-8"
            >
              FAISAL.DEV
            </motion.div>

            {/* Progress Bar Container */}
            <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden mb-4 relative">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Status & Percentage */}
            <div className="flex justify-between items-center w-full text-xs font-mono text-gray-500">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {progress < 30 
                  ? "BOOTING SYSTEM..." 
                  : progress < 70 
                    ? "LOADING 3D CANVAS..." 
                    : progress < 100 
                      ? "OPTIMIZING ASSETS..." 
                      : "READY"}
              </motion.span>
              <span className="text-white/80">{Math.round(progress)}%</span>
            </div>
          </div>

          {/* Glowing bottom grid accent */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-purple-500/10 to-transparent pointer-events-none blur-[40px]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
