"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getSiteSettings } from "@/lib/supabase";
import { DEFAULT_RESUME, type ResumeSettings } from "@/lib/resume";

const ResumeContext = createContext<ResumeSettings>(DEFAULT_RESUME);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [resume, setResume] = useState<ResumeSettings>(DEFAULT_RESUME);

  useEffect(() => {
    async function loadResume() {
      const settings = await getSiteSettings();
      if (settings?.resume_url) {
        setResume({
          resume_url: settings.resume_url,
          resume_filename: settings.resume_filename || DEFAULT_RESUME.resume_filename,
        });
      }
    }
    loadResume();
  }, []);

  return (
    <ResumeContext.Provider value={resume}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  return useContext(ResumeContext);
}
