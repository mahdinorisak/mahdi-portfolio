"use client";
import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabaseBrowser";
import { Btn } from "./ui";

export default function CvUpload({ c, set }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function onFile(e) {
    const file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file) return;
    setErr("");
    if (file.type !== "application/pdf") {
      setErr("Please choose a PDF file.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErr("The PDF is bigger than 10 MB. Use a smaller one.");
      return;
    }
    setBusy(true);
    const sb = supabaseBrowser();
    const path = `cv-${Date.now()}.pdf`;
    const { error } = await sb.storage
      .from("portfolio")
      .upload(path, file, { contentType: "application/pdf", cacheControl: "3600" });
    if (error) {
      setErr("Upload failed: " + error.message);
      setBusy(false);
      return;
    }
    const { data } = sb.storage.from("portfolio").getPublicUrl(path);
    set({ cv: data.publicUrl, cvPath: path });
    setBusy(false);
  }

  return (
    <div className="rounded-2xl border border-line bg-paper/50 p-4">
      <p className="text-sm font-medium">CV (PDF)</p>
      <div className="mt-3 space-y-2">
        <input type="file" accept="application/pdf" onChange={onFile} disabled={busy} aria-label="Choose a CV PDF" className="block text-sm" />
        <p className="text-sm text-muted">A PDF under 10 MB. A Download CV button then appears on your top section. Click Save after uploading.</p>
        {busy && <p className="text-sm">Uploading...</p>}
        {err && <p role="alert" className="text-sm font-medium">{err}</p>}
        {c.cv && (
          <div className="flex flex-wrap items-center gap-3">
            <a href={c.cv} target="_blank" rel="noopener noreferrer" className="text-sm underline underline-offset-4">
              View current CV<span className="sr-only"> (opens in new tab)</span>
            </a>
            <Btn onClick={() => set({ cv: "", cvPath: "" })}>Remove CV</Btn>
          </div>
        )}
      </div>
    </div>
  );
}