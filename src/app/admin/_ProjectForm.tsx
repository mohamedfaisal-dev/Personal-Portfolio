"use client";
import { useState } from "react";
import { sb, type Proj } from "./_shared";

const EMPTY: Omit<Proj,"id"> = {
  sort_order:0, title:"", category:"Web Application", image:"",
  tech:[], overview:"", demo_url:"#", github_url:"", app_store_url:"",
  play_store_url:"", problem:"", solution:"", features:[], is_featured:false, is_visible:true,
};

interface Props { initial?: Proj; onSave:()=>void; onCancel:()=>void; }

export default function ProjectForm({ initial, onSave, onCancel }: Props) {
  const [form, setForm] = useState<Omit<Proj,"id">>(
    initial ? { ...initial } : { ...EMPTY }
  );
  const [saving, setSaving] = useState(false);
  const [err, setErr]       = useState("");

  const set = (k: keyof typeof form, v: unknown) =>
    setForm(f => ({ ...f, [k]: v }));

  const handleTech = (v: string) =>
    set("tech", v.split(",").map(s => s.trim()).filter(Boolean));

  const handleFeatures = (v: string) =>
    set("features", v.split("\n").map(s => s.trim()).filter(Boolean));

  const save = async () => {
    if (!form.title) { setErr("Title is required"); return; }
    setSaving(true); setErr("");
    const payload = initial ? { ...form, id: initial.id } : form;
    const { error } = initial
      ? await sb.from("projects").update(form).eq("id", initial.id)
      : await sb.from("projects").insert(payload);
    if (error) { setErr(error.message); setSaving(false); return; }
    onSave();
  };

  const inp = "w-full px-3 py-2 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm outline-none focus:border-purple-500 transition-colors";
  const lbl = "text-xs text-gray-400 font-medium mb-1 block";

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between rounded-t-3xl">
          <h2 className="font-bold text-white">{initial ? "Edit Project" : "Add Project"}</h2>
          <button onClick={onCancel} className="text-gray-500 hover:text-white text-xl leading-none">×</button>
        </div>

        <div className="p-6 flex flex-col gap-4">
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={lbl}>Sort Order</label>
              <input type="number" className={inp} value={form.sort_order}
                onChange={e => set("sort_order", +e.target.value)} />
            </div>
            <div>
              <label className={lbl}>Category</label>
              <select className={inp} value={form.category}
                onChange={e => set("category", e.target.value)}>
                <option>Web Application</option>
                <option>Creative Web</option>
              </select>
            </div>
          </div>

          <div>
            <label className={lbl}>Title *</label>
            <input className={inp} value={form.title}
              onChange={e => set("title", e.target.value)} placeholder="Project title" />
          </div>

          <div>
            <label className={lbl}>Image URL (e.g. /images/project.png)</label>
            <input className={inp} value={form.image}
              onChange={e => set("image", e.target.value)} placeholder="/images/xenbite.png" />
          </div>

          <div>
            <label className={lbl}>Technologies (comma separated)</label>
            <input className={inp} value={form.tech.join(", ")}
              onChange={e => handleTech(e.target.value)} placeholder="React, Node.js, Supabase" />
          </div>

          <div>
            <label className={lbl}>Overview</label>
            <textarea rows={3} className={inp} value={form.overview}
              onChange={e => set("overview", e.target.value)} />
          </div>

          {/* URLs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={lbl}>Demo URL</label>
              <input className={inp} value={form.demo_url}
                onChange={e => set("demo_url", e.target.value)} placeholder="https://..." />
            </div>
            <div>
              <label className={lbl}>GitHub URL</label>
              <input className={inp} value={form.github_url ?? ""}
                onChange={e => set("github_url", e.target.value)} placeholder="https://github.com/..." />
            </div>
            <div>
              <label className={lbl}>App Store URL</label>
              <input className={inp} value={form.app_store_url ?? ""}
                onChange={e => set("app_store_url", e.target.value)} />
            </div>
            <div>
              <label className={lbl}>Play Store URL</label>
              <input className={inp} value={form.play_store_url ?? ""}
                onChange={e => set("play_store_url", e.target.value)} />
            </div>
          </div>

          <div>
            <label className={lbl}>Problem</label>
            <textarea rows={3} className={inp} value={form.problem}
              onChange={e => set("problem", e.target.value)} />
          </div>

          <div>
            <label className={lbl}>Solution</label>
            <textarea rows={3} className={inp} value={form.solution}
              onChange={e => set("solution", e.target.value)} />
          </div>

          <div>
            <label className={lbl}>Features (one per line)</label>
            <textarea rows={5} className={inp} value={form.features.join("\n")}
              onChange={e => handleFeatures(e.target.value)}
              placeholder={"Feature one\nFeature two\nFeature three"} />
          </div>

          {/* Toggles */}
          <div className="flex gap-6">
            {(["is_visible","is_featured"] as const).map(k => (
              <label key={k} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form[k] as boolean}
                  onChange={e => set(k, e.target.checked)}
                  className="w-4 h-4 accent-purple-500" />
                <span className="text-sm text-gray-300 capitalize">{k.replace("is_","")}</span>
              </label>
            ))}
          </div>

          {err && <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2">{err}</p>}
        </div>

        <div className="sticky bottom-0 bg-gray-900 border-t border-gray-800 px-6 py-4 flex gap-3 rounded-b-3xl">
          <button onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm transition-all">
            Cancel
          </button>
          <button onClick={save} disabled={saving}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:brightness-110 text-white text-sm font-semibold disabled:opacity-50 transition-all">
            {saving ? "Saving..." : "Save Project"}
          </button>
        </div>
      </div>
    </div>
  );
}
