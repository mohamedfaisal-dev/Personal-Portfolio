"use client";
import { useState } from "react";
import { sb, type Skill } from "../shared";

const CATS = ["Frontend","Backend","Mobile","Database","DevOps"];

interface Props { initial?: Skill; onSave:()=>void; onCancel:()=>void; }

export default function SkillForm({ initial, onSave, onCancel }: Props) {
  const [form, setForm] = useState({
    name:        initial?.name        ?? "",
    category:    initial?.category    ?? "Frontend",
    icon_key:    initial?.icon_key    ?? "",
    proficiency: initial?.proficiency ?? 80,
    sort_order:  initial?.sort_order  ?? 0,
    is_visible:  initial?.is_visible  ?? true,
  });
  const [saving, setSaving] = useState(false);
  const [err, setErr]       = useState("");

  const inp = "w-full px-3 py-2 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm outline-none focus:border-purple-500 transition-colors";
  const lbl = "text-xs text-gray-400 font-medium mb-1 block";

  const save = async () => {
    if (!form.name) { setErr("Name required"); return; }
    setSaving(true); setErr("");
    const { error } = initial
      ? await sb.from("skills").update(form).eq("id", initial.id)
      : await sb.from("skills").insert(form);
    if (error) { setErr(error.message); setSaving(false); return; }
    onSave();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-3xl w-full max-w-md">
        <div className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
          <h2 className="font-bold text-white">{initial ? "Edit Skill" : "Add Skill"}</h2>
          <button onClick={onCancel} className="text-gray-500 hover:text-white text-xl">×</button>
        </div>
        <div className="p-6 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={lbl}>Name *</label>
              <input className={inp} value={form.name} onChange={e => setForm(f=>({...f,name:e.target.value}))} placeholder="React" />
            </div>
            <div>
              <label className={lbl}>Category</label>
              <select className={inp} value={form.category} onChange={e => setForm(f=>({...f,category:e.target.value}))}>
                {CATS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className={lbl}>Icon Key (matches BrandIcons)</label>
            <input className={inp} value={form.icon_key} onChange={e => setForm(f=>({...f,icon_key:e.target.value}))} placeholder="React" />
          </div>
          <div>
            <label className={lbl}>Proficiency: {form.proficiency}%</label>
            <input type="range" min={0} max={100} value={form.proficiency}
              onChange={e => setForm(f=>({...f,proficiency:+e.target.value}))}
              className="w-full accent-purple-500" />
          </div>
          <div>
            <label className={lbl}>Sort Order</label>
            <input type="number" className={inp} value={form.sort_order}
              onChange={e => setForm(f=>({...f,sort_order:+e.target.value}))} />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.is_visible}
              onChange={e => setForm(f=>({...f,is_visible:e.target.checked}))}
              className="w-4 h-4 accent-purple-500" />
            <span className="text-sm text-gray-300">Visible on site</span>
          </label>
          {err && <p className="text-xs text-red-400">{err}</p>}
        </div>
        <div className="border-t border-gray-800 px-6 py-4 flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl bg-gray-800 text-gray-300 text-sm">Cancel</button>
          <button onClick={save} disabled={saving}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-sm font-semibold disabled:opacity-50">
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
