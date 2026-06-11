import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export interface ProjectData {
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

export async function getProjects(): Promise<ProjectData[] | null> {
  if (!supabase) {
    console.warn("Supabase is not configured. Falling back to static data.");
    return null;
  }

  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Error fetching projects from Supabase:", error);
      return null;
    }

    return data as ProjectData[];
  } catch (err) {
    console.error("Unexpected error fetching projects:", err);
    return null;
  }
}
