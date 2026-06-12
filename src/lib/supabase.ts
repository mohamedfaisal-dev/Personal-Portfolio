import { createClient } from "@supabase/supabase-js";

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL  || "";
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase =
  supabaseUrl && supabaseAnon
    ? createClient(supabaseUrl, supabaseAnon)
    : null;

// ─── TYPES ────────────────────────────────────────────────────

export interface Project {
  id: number;
  sort_order: number;
  title: string;
  category: "Web Application" | "Creative Web";
  image: string;
  tech: string[];
  overview: string;
  demo_url: string;
  github_url?: string;
  app_store_url?: string;
  play_store_url?: string;
  problem: string;
  solution: string;
  features: string[];
  is_featured: boolean;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  icon_key: string | null;
  proficiency: number;
  years: number;
  sort_order: number;
  is_visible: boolean;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  start_date: string;
  end_date: string | null;
  location: string | null;
  description: string;
  tech: string[];
  sort_order: number;
}

export interface Achievement {
  id: number;
  label: string;
  value: number;
  suffix: string;
  icon: string;
  sort_order: number;
}

export interface SiteSettings {
  id: number;
  resume_url: string;
  resume_filename: string;
  updated_at: string;
}

// ─── PROJECTS ─────────────────────────────────────────────────

export async function getProjects(): Promise<Project[] | null> {
  if (!supabase) {
    console.warn("Supabase not configured — using static data fallback.");
    return null;
  }
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("is_visible", true)
    .order("sort_order", { ascending: true });
  if (error) { console.error("getProjects:", error.message); return null; }
  return data as Project[];
}

export async function getAllProjects(): Promise<Project[] | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) { console.error("getAllProjects:", error.message); return null; }
  return data as Project[];
}

export async function upsertProject(
  project: Partial<Project> & { title: string }
): Promise<{ error: string | null }> {
  if (!supabase) return { error: "Supabase not configured" };
  const { error } = await supabase.from("projects").upsert(project);
  return { error: error?.message || null };
}

export async function deleteProject(id: number): Promise<{ error: string | null }> {
  if (!supabase) return { error: "Supabase not configured" };
  const { error } = await supabase.from("projects").delete().eq("id", id);
  return { error: error?.message || null };
}

export async function toggleProjectVisibility(
  id: number,
  is_visible: boolean
): Promise<{ error: string | null }> {
  if (!supabase) return { error: "Supabase not configured" };
  const { error } = await supabase
    .from("projects")
    .update({ is_visible })
    .eq("id", id);
  return { error: error?.message || null };
}

// ─── CONTACT MESSAGES ─────────────────────────────────────────

export async function submitContactMessage(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<{ error: string | null }> {
  if (!supabase) return { error: "Supabase not configured" };
  const { error } = await supabase.from("contact_messages").insert(data);
  return { error: error?.message || null };
}

export async function getContactMessages(): Promise<ContactMessage[] | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) { console.error("getContactMessages:", error.message); return null; }
  return data as ContactMessage[];
}

export async function markMessageRead(id: number): Promise<{ error: string | null }> {
  if (!supabase) return { error: "Supabase not configured" };
  const { error } = await supabase
    .from("contact_messages")
    .update({ is_read: true })
    .eq("id", id);
  return { error: error?.message || null };
}

export async function deleteMessage(id: number): Promise<{ error: string | null }> {
  if (!supabase) return { error: "Supabase not configured" };
  const { error } = await supabase
    .from("contact_messages")
    .delete()
    .eq("id", id);
  return { error: error?.message || null };
}

// ─── SKILLS ───────────────────────────────────────────────────

export async function getSkills(): Promise<Skill[] | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .eq("is_visible", true)
    .order("sort_order", { ascending: true });
  if (error) { console.error("getSkills:", error.message); return null; }
  return data as Skill[];
}

// ─── EXPERIENCES ──────────────────────────────────────────────

export async function getExperiences(): Promise<Experience[] | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("experiences")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) { console.error("getExperiences:", error.message); return null; }
  return data as Experience[];
}

// ─── ACHIEVEMENTS ─────────────────────────────────────────────

export async function getAchievements(): Promise<Achievement[] | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("achievements")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) { console.error("getAchievements:", error.message); return null; }
  return data as Achievement[];
}

// ─── SITE SETTINGS ────────────────────────────────────────────

export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();
  if (error) { console.error("getSiteSettings:", error.message); return null; }
  return data as SiteSettings | null;
}

// ─── STORAGE ──────────────────────────────────────────────────

export async function uploadProjectImage(
  file: File,
  fileName: string
): Promise<{ url: string | null; error: string | null }> {
  if (!supabase) return { url: null, error: "Supabase not configured" };

  const { error } = await supabase.storage
    .from("project-images")
    .upload(fileName, file, { upsert: true });

  if (error) return { url: null, error: error.message };

  const { data } = supabase.storage
    .from("project-images")
    .getPublicUrl(fileName);

  return { url: data.publicUrl, error: null };
}

export async function uploadResume(
  file: File,
  fileName: string
): Promise<{ url: string | null; error: string | null }> {
  if (!supabase) return { url: null, error: "Supabase not configured" };

  const { error } = await supabase.storage
    .from("resumes")
    .upload(fileName, file, { upsert: true, contentType: "application/pdf" });

  if (error) return { url: null, error: error.message };

  const { data } = supabase.storage.from("resumes").getPublicUrl(fileName);
  return { url: data.publicUrl, error: null };
}
