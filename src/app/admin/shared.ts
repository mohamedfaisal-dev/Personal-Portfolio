import { supabase } from "@/lib/supabase";

export const sb = supabase;
export const isSupabaseConfigured = () => supabase !== null;
export interface Msg  { id:number; name:string; email:string; subject:string; message:string; is_read:boolean; created_at:string; }
export interface Proj { id:number; sort_order:number; title:string; category:string; image:string; tech:string[]; overview:string; demo_url:string; github_url?:string; app_store_url?:string; play_store_url?:string; problem:string; solution:string; features:string[]; is_featured:boolean; is_visible:boolean; }
export interface Skill{ id:number; name:string; category:string; icon_key:string; proficiency:number; years:number; sort_order:number; is_visible:boolean; }
export interface Ach  { id:number; label:string; value:number; suffix:string; icon:string; sort_order:number; }
export interface Exp  { id:number; company:string; role:string; start_date:string; end_date?:string; location?:string; description:string; tech:string[]; sort_order:number; }
export interface SiteSettings { id:number; resume_url:string; resume_filename:string; updated_at:string; }

export type Tab = "messages"|"projects"|"skills"|"achievements"|"experiences"|"settings";

/* ── Shared fetch helpers (used by sub-components) ───────────── */
export async function fetchAll() {
  if (!sb) {
    return {
      messages: [] as Msg[],
      projects: [] as Proj[],
      skills: [] as Skill[],
      achievements: [] as Ach[],
      experiences: [] as Exp[],
      siteSettings: null as SiteSettings | null,
      error: "Supabase is not configured. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local.",
    };
  }

  const [m, p, s, a, e, ss] = await Promise.all([
    sb.from("contact_messages").select("*").order("created_at",{ascending:false}),
    sb.from("projects").select("*").order("sort_order"),
    sb.from("skills").select("*").order("sort_order"),
    sb.from("achievements").select("*").order("sort_order"),
    sb.from("experiences").select("*").order("sort_order"),
    sb.from("site_settings").select("*").eq("id", 1).maybeSingle(),
  ]);

  const error =
    m.error?.message ||
    p.error?.message ||
    s.error?.message ||
    a.error?.message ||
    e.error?.message ||
    ss.error?.message ||
    null;

  return {
    messages:     (m.data ?? []) as Msg[],
    projects:     (p.data ?? []) as Proj[],
    skills:       (s.data ?? []) as Skill[],
    achievements: (a.data ?? []) as Ach[],
    experiences:  (e.data ?? []) as Exp[],
    siteSettings: (ss.data ?? null) as SiteSettings | null,
    error,
  };
}