"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Mail, LogOut, FolderGit2, Star, Zap, RefreshCw,
  ExternalLink, Shield, Eye, EyeOff, Trash2, Pencil,
  Plus, CheckCircle, BarChart2, Briefcase
} from "lucide-react";
import { sb, fetchAll, isSupabaseConfigured, type Msg, type Proj, type Skill, type Ach, type Exp, type Tab } from "./shared";
import type { SupabaseClient } from "@supabase/supabase-js";
import ProjectForm from "./components/ProjectForm";
import SkillForm, { SKILL_CATEGORIES } from "./components/SkillForm";
import ExperienceForm from "./components/ExperienceForm";

/* ── Login Screen ──────────────────────────────────────────────── */
function LoginScreen() {
  const [email, setEmail]     = useState("");
  const [pass,  setPass]      = useState("");
  const [err,   setErr]       = useState("");
  const [busy,  setBusy]      = useState(false);

  const login = async () => {
    if (!sb) return;
    setBusy(true); setErr("");
    try {
      const { error } = await sb.auth.signInWithPassword({ email, password: pass });
      if (error) setErr(error.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-gray-900 border border-gray-800 rounded-3xl p-8 flex flex-col gap-5">
        {/* Brand */}
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-600/20 to-cyan-600/20 border border-purple-500/20">
            <Shield size={22} className="text-purple-400" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Portfolio CMS</h1>
            <p className="text-xs text-gray-500">Admin Access Only</p>
          </div>
        </div>

        <input type="email" placeholder="Email" value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key==="Enter" && login()}
          className="px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm outline-none focus:border-purple-500/60 transition-colors" />
        <input type="password" placeholder="Password" value={pass}
          onChange={e => setPass(e.target.value)}
          onKeyDown={e => e.key==="Enter" && login()}
          className="px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm outline-none focus:border-purple-500/60 transition-colors" />

        {err && <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2">{err}</p>}

        <button onClick={login} disabled={busy || !email || !pass}
          className="py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:brightness-110 text-white text-sm font-semibold disabled:opacity-50 transition-all">
          {busy ? "Signing in…" : "Sign In"}
        </button>

        <div className="text-center">
          <p className="text-xs text-gray-600">📧 mohamedfaisal.dev@gmail.com</p>
        </div>
      </div>
    </div>
  );
}

/* ── Main Dashboard ────────────────────────────────────────────── */
export default function AdminPage() {
  const [session,  setSession]  = useState<unknown>(null);
  const [loading,  setLoading]  = useState(() => isSupabaseConfigured());
  const [tab,      setTab]      = useState<Tab>("messages");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [projects, setProjects] = useState<Proj[]>([]);
  const [skills,   setSkills]   = useState<Skill[]>([]);
  const [ach,      setAch]      = useState<Ach[]>([]);
  const [experiences, setExperiences] = useState<Exp[]>([]);
  const [spinning, setSpinning] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const applyDashboardData = useCallback((d: Awaited<ReturnType<typeof fetchAll>>) => {
    setMessages(d.messages);
    setProjects(d.projects);
    setSkills(d.skills);
    setAch(d.achievements);
    setExperiences(d.experiences);
    setFetchError(d.error);
  }, []);

  const reload = useCallback(async () => {
    setSpinning(true);
    const d = await fetchAll();
    applyDashboardData(d);
    setSpinning(false);
  }, [applyDashboardData]);
  const [showProjForm,  setShowProjForm]  = useState(false);
  const [editProj,      setEditProj]      = useState<Proj|undefined>();
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [editSkill,     setEditSkill]     = useState<Skill|undefined>();
  const [showExpForm,   setShowExpForm]   = useState(false);
  const [editExp,       setEditExp]       = useState<Exp|undefined>();

  /* ── auth + initial data load ── */
  useEffect(() => {
    if (!sb) return;

    let cancelled = false;

    const loadDashboard = async (activeSession: unknown) => {
      if (!activeSession) return;
      setSpinning(true);
      const d = await fetchAll();
      if (cancelled) return;
      applyDashboardData(d);
      setSpinning(false);
    };

    sb.auth.getSession().then(({ data }) => {
      if (cancelled) return;
      setSession(data.session);
      setLoading(false);
      void loadDashboard(data.session);
    });

    const { data: { subscription } } = sb.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      void loadDashboard(s);
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [applyDashboardData]);

  if (!isSupabaseConfigured()) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-900 border border-gray-800 rounded-3xl p-8 text-center">
          <Shield size={28} className="text-purple-400 mx-auto mb-4" />
          <h1 className="text-lg font-bold text-white mb-2">Supabase Not Configured</h1>
          <p className="text-sm text-gray-400">
            Add <code className="text-cyan-400">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
            <code className="text-cyan-400">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to your{" "}
            <code className="text-cyan-400">.env.local</code> file, then restart the dev server.
          </p>
        </div>
      </div>
    );
  }

  const adminSb = sb as SupabaseClient;

  if (loading) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!session) return <LoginScreen />;

  /* ── derived ── */
  const unread  = messages.filter(m => !m.is_read).length;
  const visible = projects.filter(p => p.is_visible).length;

  /* ── message actions ── */
  const markRead  = async (id:number) => { await adminSb.from("contact_messages").update({is_read:true}).eq("id",id); setMessages(ms=>ms.map(m=>m.id===id?{...m,is_read:true}:m)); };
  const deleteMsg = async (id:number) => { if(!confirm("Delete?"))return; await adminSb.from("contact_messages").delete().eq("id",id); setMessages(ms=>ms.filter(m=>m.id!==id)); };

  /* ── project actions ── */
  const toggleVis   = async (id:number, cur:boolean) => { await adminSb.from("projects").update({is_visible:!cur}).eq("id",id); setProjects(ps=>ps.map(p=>p.id===id?{...p,is_visible:!cur}:p)); };
  const deleteProj  = async (id:number, t:string)    => { if(!confirm(`Delete "${t}"?`))return; await adminSb.from("projects").delete().eq("id",id); setProjects(ps=>ps.filter(p=>p.id!==id)); };

  /* ── skill actions ── */
  const deleteSkill = async (id:number, n:string) => { if(!confirm(`Delete "${n}"?`))return; await adminSb.from("skills").delete().eq("id",id); setSkills(ss=>ss.filter(s=>s.id!==id)); };

  /* ── experience actions ── */
  const deleteExp = async (id:number, c:string) => { if(!confirm(`Delete experience at "${c}"?`))return; await adminSb.from("experiences").delete().eq("id",id); setExperiences(es=>es.filter(e=>e.id!==id)); };

  /* ── achievement inline edit ── */
  const updateAch = async (id:number, field:"value"|"label"|"suffix", val:string|number) => {
    await adminSb.from("achievements").update({[field]:val}).eq("id",id);
    setAch(as=>as.map(a=>a.id===id?{...a,[field]:val}:a));
  };

  /* ── styles ── */
  const card = "p-5 rounded-2xl border border-gray-800 bg-gray-900";
  const statColors: Record<string, { bg: string; border: string; text: string }> = {
    purple: { bg: "bg-purple-500/10", border: "border-purple-500/20", text: "text-purple-400" },
    cyan:   { bg: "bg-cyan-500/10",   border: "border-cyan-500/20",   text: "text-cyan-400"   },
    green:  { bg: "bg-green-500/10",  border: "border-green-500/20",  text: "text-green-400"  },
    orange: { bg: "bg-orange-500/10", border: "border-orange-500/20", text: "text-orange-400" },
    pink:   { bg: "bg-pink-500/10",   border: "border-pink-500/20",   text: "text-pink-400"   },
  };

  /* ── render ── */
  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* modals */}
      {showProjForm && (
        <ProjectForm
          initial={editProj}
          onSave={() => { setShowProjForm(false); setEditProj(undefined); reload(); }}
          onCancel={() => { setShowProjForm(false); setEditProj(undefined); }}
        />
      )}
      {showSkillForm && (
        <SkillForm
          initial={editSkill}
          onSave={() => { setShowSkillForm(false); setEditSkill(undefined); reload(); }}
          onCancel={() => { setShowSkillForm(false); setEditSkill(undefined); }}
        />
      )}
      {showExpForm && (
        <ExperienceForm
          initial={editExp}
          onSave={() => { setShowExpForm(false); setEditExp(undefined); reload(); }}
          onCancel={() => { setShowExpForm(false); setEditExp(undefined); }}
        />
      )}

      {/* ── Header ── */}
      <header className="sticky top-0 z-40 bg-gray-950/90 backdrop-blur border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
            <Shield size={18} className="text-purple-400" />
          </div>
          <span className="font-bold text-white text-sm">Portfolio CMS</span>
        </div>
        <div className="flex gap-2">
          <button onClick={reload} title="Refresh"
            className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-all">
            <RefreshCw size={15} className={spinning?"animate-spin":""} />
          </button>
          <a href="/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white text-xs transition-all">
            <ExternalLink size={13}/> Site
          </a>
          <button onClick={() => adminSb.auth.signOut()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs border border-red-500/20 transition-all">
            <LogOut size={13}/> Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">

        {fetchError && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {fetchError}
          </div>
        )}

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { label:"Unread Msgs",  value:unread,             icon:Mail,       color:"purple" },
            { label:"Total Msgs",   value:messages.length,    icon:BarChart2,  color:"cyan"   },
            { label:"Live Projects",value:visible,             icon:FolderGit2, color:"green"  },
            { label:"Skills",       value:skills.length,      icon:Zap,        color:"orange" },
            { label:"Experiences",  value:experiences.length, icon:Briefcase,  color:"pink"   },
          ].map(({ label,value,icon:Icon,color }) => {
            const styles = statColors[color];
            return (
            <div key={label} className={`${card} flex items-center gap-4`}>
              <div className={`p-2.5 rounded-xl ${styles.bg} border ${styles.border} shrink-0`}>
                <Icon size={18} className={styles.text} />
              </div>
              <div>
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-xs text-gray-500">{label}</p>
              </div>
            </div>
            );
          })}
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-1 mb-6 border-b border-gray-800">
          {([
            { id:"messages",     label:"Messages",     icon:Mail,       badge:unread },
            { id:"projects",     label:"Projects",     icon:FolderGit2, badge:0      },
            { id:"experiences",  label:"Experiences",  icon:Briefcase,  badge:0      },
            { id:"skills",       label:"Skills",       icon:Zap,        badge:0      },
            { id:"achievements", label:"Achievements", icon:Star,       badge:0      },
          ] as const).map(({ id,label,icon:Icon,badge }) => (
            <button key={id} onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-all ${
                tab===id ? "border-purple-500 text-white" : "border-transparent text-gray-500 hover:text-gray-300"
              }`}>
              <Icon size={14}/>{label}
              {badge>0 && <span className="px-1.5 py-0.5 rounded-full bg-purple-500 text-[10px] font-bold text-white">{badge}</span>}
            </button>
          ))}
        </div>

        {/* ── MESSAGES ── */}
        {tab==="messages" && (
          <div className="flex flex-col gap-3">
            {messages.length===0 && <p className="text-center text-gray-600 py-16">No messages yet.</p>}
            {messages.map(m => (
              <div key={m.id} className={`${card} ${!m.is_read?"border-purple-500/30 bg-purple-500/5":""}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      {!m.is_read && <span className="w-2 h-2 rounded-full bg-purple-400 shrink-0"/>}
                      <span className="font-semibold text-white">{m.name}</span>
                      <a href={`mailto:${m.email}`} className="text-xs text-purple-400 hover:underline">{m.email}</a>
                    </div>
                    <p className="text-sm font-medium text-gray-300 mb-1">{m.subject}</p>
                    <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-wrap">{m.message}</p>
                    <p className="text-xs text-gray-600 mt-2">{new Date(m.created_at).toLocaleString()}</p>
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    {!m.is_read && (
                      <button onClick={() => markRead(m.id)}
                        className="p-2 rounded-xl bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20">
                        <CheckCircle size={14}/>
                      </button>
                    )}
                    <button onClick={() => deleteMsg(m.id)}
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20">
                      <Trash2 size={14}/>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── PROJECTS ── */}
        {tab==="projects" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-400">{projects.length} total · {visible} visible</p>
              <button onClick={() => { setEditProj(undefined); setShowProjForm(true); }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-sm font-semibold hover:brightness-110 transition-all">
                <Plus size={15}/> Add Project
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {projects.map(p => (
                <div key={p.id} className={`${card} flex items-center gap-4 hover:border-gray-700 transition-all`}>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white truncate">{p.title}</p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">{p.category}</span>
                      {p.tech?.slice(0,3).map(t=><span key={t} className="text-[10px] text-gray-600 font-mono">{t}</span>)}
                      {(p.tech?.length??0)>3 && <span className="text-[10px] text-purple-400">+{p.tech.length-3}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${p.is_visible?"bg-green-500/10 text-green-400 border-green-500/20":"bg-red-500/10 text-red-400 border-red-500/20"}`}>
                      {p.is_visible?"Live":"Hidden"}
                    </span>
                    <button onClick={() => { setEditProj(p); setShowProjForm(true); }}
                      className="p-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20">
                      <Pencil size={14}/>
                    </button>
                    <button onClick={() => toggleVis(p.id, p.is_visible)}
                      className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-400 border border-gray-700">
                      {p.is_visible?<EyeOff size={14}/>:<Eye size={14}/>}
                    </button>
                    {p.demo_url&&p.demo_url!=="#"&&(
                      <a href={p.demo_url} target="_blank" rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-gray-800 hover:bg-purple-600 text-gray-400 hover:text-white border border-gray-700">
                        <ExternalLink size={14}/>
                      </a>
                    )}
                    <button onClick={() => deleteProj(p.id, p.title)}
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20">
                      <Trash2 size={14}/>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── EXPERIENCES ── */}
        {tab==="experiences" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-400">{experiences.length} experience records</p>
              <button onClick={() => { setEditExp(undefined); setShowExpForm(true); }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-sm font-semibold hover:brightness-110 transition-all">
                <Plus size={15}/> Add Experience
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {experiences.length===0 && <p className="text-center text-gray-600 py-16">No experiences yet.</p>}
              {experiences.map(e => (
                <div key={e.id} className={`${card} flex items-center justify-between gap-4 hover:border-gray-700 transition-all`}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-white">{e.role}</span>
                      <span className="text-xs text-purple-400">@ {e.company}</span>
                      {e.location && <span className="text-xs text-gray-500">({e.location})</span>}
                    </div>
                    <p className="text-xs text-gray-400 font-mono mt-1">{e.start_date} - {e.end_date || "Present"}</p>
                    <p className="text-xs text-gray-500 line-clamp-1 mt-1">{e.description}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => { setEditExp(e); setShowExpForm(true); }}
                      className="p-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20">
                      <Pencil size={14}/>
                    </button>
                    <button onClick={() => deleteExp(e.id, e.company)}
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20">
                      <Trash2 size={14}/>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── SKILLS ── */}
        {tab==="skills" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-400">{skills.length} skills</p>
              <button onClick={() => { setEditSkill(undefined); setShowSkillForm(true); }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-sm font-semibold hover:brightness-110 transition-all">
                <Plus size={15}/> Add Skill
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {SKILL_CATEGORIES.map(cat => {
                const catSkills = skills.filter(s => s.category===cat);
                if (!catSkills.length) return null;
                return (
                  <div key={cat} className="mb-4">
                    <p className="text-xs font-mono uppercase tracking-widest text-purple-400 mb-2">{cat}</p>
                    <div className="flex flex-col gap-2">
                      {catSkills.map(s => (
                        <div key={s.id} className={`${card} flex items-center gap-4`}>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-1">
                              <span className="font-medium text-white text-sm">{s.name}</span>
                              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${s.is_visible?"bg-green-500/10 text-green-400":"bg-gray-700 text-gray-500"}`}>
                                {s.is_visible?"visible":"hidden"}
                              </span>
                            </div>
                            <span className="text-xs text-cyan-400 font-mono shrink-0">
                              {(s.years ?? 1)}+ Year
                            </span>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <button onClick={() => { setEditSkill(s); setShowSkillForm(true); }}
                              className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                              <Pencil size={13}/>
                            </button>
                            <button onClick={() => deleteSkill(s.id, s.name)}
                              className="p-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
                              <Trash2 size={13}/>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── ACHIEVEMENTS ── */}
        {tab==="achievements" && (
          <div>
            <p className="text-sm text-gray-400 mb-4">Click any value or label to edit inline</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ach.map(a => (
                <div key={a.id} className={`${card} flex items-center gap-4`}>
                  <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 shrink-0">
                    <Star size={20} className="text-purple-400"/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-1 mb-1">
                      <input
                        type="number"
                        value={a.value}
                        onChange={e => setAch(as=>as.map(x=>x.id===a.id?{...x,value:+e.target.value}:x))}
                        onBlur={e => updateAch(a.id,"value",+e.target.value)}
                        className="w-20 text-2xl font-bold bg-transparent text-white outline-none border-b border-transparent focus:border-purple-500 transition-colors"
                      />
                      <input
                        value={a.suffix}
                        onChange={e => setAch(as=>as.map(x=>x.id===a.id?{...x,suffix:e.target.value}:x))}
                        onBlur={e => updateAch(a.id,"suffix",e.target.value)}
                        className="w-8 text-lg font-bold text-purple-400 bg-transparent outline-none border-b border-transparent focus:border-purple-500 transition-colors"
                      />
                    </div>
                    <input
                      value={a.label}
                      onChange={e => setAch(as=>as.map(x=>x.id===a.id?{...x,label:e.target.value}:x))}
                      onBlur={e => updateAch(a.id,"label",e.target.value)}
                      className="text-sm text-gray-400 bg-transparent outline-none w-full border-b border-transparent focus:border-purple-500 transition-colors"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
