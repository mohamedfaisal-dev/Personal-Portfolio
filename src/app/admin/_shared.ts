"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

/* ── Supabase client ──────────────────────────────────────────── */
const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/* ── Types ────────────────────────────────────────────────────── */
export interface Msg  { id:number; name:string; email:string; subject:string; message:string; is_read:boolean; created_at:string; }
export interface Proj { id:number; sort_order:number; title:string; category:string; image:string; tech:string[]; overview:string; demo_url:string; github_url?:string; app_store_url?:string; play_store_url?:string; problem:string; solution:string; features:string[]; is_featured:boolean; is_visible:boolean; }
export interface Skill{ id:number; name:string; category:string; icon_key:string; proficiency:number; sort_order:number; is_visible:boolean; }
export interface Ach  { id:number; label:string; value:number; suffix:string; icon:string; sort_order:number; }

export type Tab = "messages"|"projects"|"skills"|"achievements";

/* ── Shared fetch helpers (used by sub-components) ───────────── */
export async function fetchAll() {
  const [m, p, s, a] = await Promise.all([
    sb.from("contact_messages").select("*").order("created_at",{ascending:false}),
    sb.from("projects").select("*").order("sort_order"),
    sb.from("skills").select("*").order("sort_order"),
    sb.from("achievements").select("*").order("sort_order"),
  ]);
  return {
    messages:     (m.data ?? []) as Msg[],
    projects:     (p.data ?? []) as Proj[],
    skills:       (s.data ?? []) as Skill[],
    achievements: (a.data ?? []) as Ach[],
  };
}

export { sb };
