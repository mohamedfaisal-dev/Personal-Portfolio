"use client";
import { useState } from "react";
import { sb, type Exp } from "../shared";

interface Props { initial?: Exp; onSave:()=>void; onCancel:()=>void; }

export default function ExperienceForm({ initial, onSave, onCancel }: Props) {
  const [form, setForm] = useState({
    company:     initial?.company     ?? "",
    role:        initial?.role        ?? "",
    start_date:  initial?.start_date  ?? "",
    end_date:    initial?.end_date    ?? "",
    location:    initial?.location    ?? "",
    description: initial?.description ?? "",
    pointsText:  initial?.tech?.join("\n") ?? "",
    sort_order:  initial?.sort_order  ?? 0,
  });
  const [saving, setSaving] = useState(false);
  const [err, setErr]       = useState("");

  const inp = "w-full px-3 py-2 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm outline-none focus:border-purple-500 transition-colors";
  const lbl = "text-xs text-gray-400 font-medium mb-1 block";

  const save = async () => {
    if (!form.company) { setErr("Company required"); return; }
    if (!form.role) { setErr("Role required"); return; }
    if (!form.start_date) { setErr("Start date required"); return; }
    if (!form.description) { setErr("Description required"); return; }

    setSaving(true); setErr("");

    const pointsArray = form.pointsText
      .split("\n")
      .map(p => p.trim())
      .filter(p => p.length > 0);

    const payload = {
      company:     form.company,
      role:        form.role,
      start_date:  form.start_date,
      end_date:    form.end_date || null,
      location:    form.location || null,
      description: form.description,
      tech:        pointsArray,
      sort_order:  form.sort_order,
    };

    const { error } = initial
      ? await sb.from("experiences").update(payload).eq("id", initial.id)
      : await sb.from("experiences").insert(payload);

    if (error) { setErr(error.message); setSaving(false); return; }
    onSave();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-gray-900 border border-gray-700 rounded-3xl w-full max-w-lg my-8">
        <div className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
          <h2 className="font-bold text-white">{initial ? "Edit Experience" : "Add Experience"}</h2>
          <button onClick={onCancel} className="text-gray-500 hover:text-white text-xl">×</button>
        </div>
        <div className="p-6 flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={lbl}>Company *</label>
              <input className={inp} value={form.company} onChange={e => setForm(f=>({...f,company:e.target.value}))} placeholder="Akhlaq Ventures Ltd" />
            </div>
            <div>
              <label className={lbl}>Role *</label>
              <input className={inp} value={form.role} onChange={e => setForm(f=>({...f,role:e.target.value}))} placeholder="Full Stack Developer" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={lbl}>Start Date *</label>
              <input className={inp} value={form.start_date} onChange={e => setForm(f=>({...f,start_date:e.target.value}))} placeholder="Nov 2025" />
            </div>
            <div>
              <label className={lbl}>End Date (or 'Present')</label>
              <input className={inp} value={form.end_date} onChange={e => setForm(f=>({...f,end_date:e.target.value}))} placeholder="Present" />
            </div>
            <div>
              <label className={lbl}>Location</label>
              <input className={inp} value={form.location} onChange={e => setForm(f=>({...f,location:e.target.value}))} placeholder="London, UK (Remote)" />
            </div>
          </div>

          <div>
            <label className={lbl}>Sort Order</label>
            <input type="number" className={inp} value={form.sort_order} onChange={e => setForm(f=>({...f,sort_order:+e.target.value}))} />
          </div>

          <div>
            <label className={lbl}>Summary Description *</label>
            <textarea rows={3} className={`${inp} resize-y`} value={form.description} onChange={e => setForm(f=>({...f,description:e.target.value}))} placeholder="Core developer on Xenbite..." />
          </div>

          <div>
            <label className={lbl}>Responsibilities / Bullet Points (One per line)</label>
            <textarea rows={6} className={`${inp} resize-y font-mono text-xs`} value={form.pointsText} onChange={e => setForm(f=>({...f,pointsText:e.target.value}))} placeholder="Shipped 5 core product modules...&#10;Designed and maintained a fully serverless AWS backend..." />
          </div>

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
