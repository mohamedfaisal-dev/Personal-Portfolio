"use client";

import { useEffect, useState } from "react";
import { Download, ExternalLink, Upload } from "lucide-react";
import { sb, type SiteSettings } from "../shared";
import { uploadResume } from "@/lib/supabase";
import { DEFAULT_RESUME_FILENAME, DEFAULT_RESUME_URL } from "@/lib/resume";

interface Props {
  settings: SiteSettings | null;
  onSave: () => void;
}

export default function ResumeSettings({ settings, onSave }: Props) {
  const [resumeUrl, setResumeUrl] = useState(
    settings?.resume_url ?? DEFAULT_RESUME_URL
  );
  const [resumeFilename, setResumeFilename] = useState(
    settings?.resume_filename ?? DEFAULT_RESUME_FILENAME
  );
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setResumeUrl(settings?.resume_url ?? DEFAULT_RESUME_URL);
    setResumeFilename(settings?.resume_filename ?? DEFAULT_RESUME_FILENAME);
  }, [settings]);

  const inp =
    "w-full px-3 py-2 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm outline-none focus:border-purple-500 transition-colors";
  const lbl = "text-xs text-gray-400 font-medium mb-1 block";

  const saveSettings = async () => {
    if (!sb) {
      setErr("Supabase is not configured");
      return;
    }
    if (!resumeUrl.trim() || !resumeFilename.trim()) {
      setErr("Resume URL and filename are required");
      return;
    }

    setSaving(true);
    setErr("");
    setMsg("");

    const payload = {
      resume_url: resumeUrl.trim(),
      resume_filename: resumeFilename.trim(),
      updated_at: new Date().toISOString(),
    };

    const { error } = settings
      ? await sb.from("site_settings").update(payload).eq("id", 1)
      : await sb.from("site_settings").insert({ id: 1, ...payload });

    setSaving(false);
    if (error) {
      setErr(error.message);
      return;
    }

    setMsg("Resume settings saved.");
    onSave();
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setErr("Please upload a PDF file.");
      e.target.value = "";
      return;
    }

    setUploading(true);
    setErr("");
    setMsg("");

    const safeName = resumeFilename.trim() || DEFAULT_RESUME_FILENAME;
    const storageName = safeName.replace(/\s+/g, "_");
    const { url, error } = await uploadResume(file, storageName);

    setUploading(false);
    e.target.value = "";

    if (error || !url) {
      setErr(error ?? "Upload failed");
      return;
    }

    setResumeUrl(url);
    setResumeFilename(safeName);
    setMsg("PDF uploaded. Click Save to apply on the site.");
  };

  return (
    <div className="max-w-2xl">
      <p className="text-sm text-gray-400 mb-6">
        Controls the Resume and Download CV buttons in the header and hero section.
      </p>

      <div className="p-5 rounded-2xl border border-gray-800 bg-gray-900 flex flex-col gap-5">
        <div>
          <label className={lbl}>Resume URL</label>
          <input
            className={inp}
            value={resumeUrl}
            onChange={(e) => setResumeUrl(e.target.value)}
            placeholder="/Mohamed_Faisal_Resume.pdf"
          />
          <p className="text-[11px] text-gray-600 mt-1">
            Use a path like <code className="text-cyan-400">/Mohamed_Faisal_Resume.pdf</code> for files in{" "}
            <code className="text-cyan-400">public/</code>, or a Supabase storage URL after upload.
          </p>
        </div>

        <div>
          <label className={lbl}>Download filename</label>
          <input
            className={inp}
            value={resumeFilename}
            onChange={(e) => setResumeFilename(e.target.value)}
            placeholder="Mohamed_Faisal_Resume.pdf"
          />
        </div>

        <div>
          <label className={lbl}>Upload new PDF</label>
          <label className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-dashed border-gray-700 bg-gray-800/50 hover:bg-gray-800 text-gray-300 text-sm cursor-pointer transition-colors">
            <Upload size={16} />
            {uploading ? "Uploading…" : "Choose PDF file"}
            <input
              type="file"
              accept="application/pdf,.pdf"
              className="hidden"
              disabled={uploading}
              onChange={handleUpload}
            />
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            onClick={saveSettings}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-sm font-semibold hover:brightness-110 disabled:opacity-50 transition-all"
          >
            <Download size={14} />
            {saving ? "Saving…" : "Save Settings"}
          </button>

          <a
            href={resumeUrl || DEFAULT_RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white text-xs transition-all"
          >
            <ExternalLink size={13} />
            Preview resume
          </a>
        </div>

        {err && (
          <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2">
            {err}
          </p>
        )}
        {msg && (
          <p className="text-xs text-green-400 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-2">
            {msg}
          </p>
        )}
      </div>
    </div>
  );
}
