"use client";
import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabaseBrowser";
import { compressImage } from "@/lib/compressImage";
import { Btn } from "./ui";

export default function ImageUpload({ label, value, onChange, prefix = "image", maxSide = 1400, round = false, help }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [info, setInfo] = useState("");

  async function onFile(e) {
    const file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file) return;
    setErr("");
    setInfo("");
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setErr("Use a JPG, PNG or WebP image.");
      return;
    }
    if (file.size > 25 * 1024 * 1024) {
      setErr("That image is over 25 MB. Choose a smaller one.");
      return;
    }
    setBusy(true);
    try {
      const out = await compressImage(file, { maxSide });
      const path = `${prefix}-${Date.now()}.${out.ext}`;
      const sb = supabaseBrowser();
      const { error } = await sb.storage
        .from("portfolio")
        .upload(path, out.blob, { contentType: out.type, cacheControl: "31536000" });
      if (error) throw error;
      const { data } = sb.storage.from("portfolio").getPublicUrl(path);
      onChange(data.publicUrl, path);
      setInfo("Uploaded and shrunk from " + Math.round(file.size / 1024) + " KB to " + Math.round(out.blob.size / 1024) + " KB. Click Save to publish.");
    } catch (e2) {
      setErr("Upload failed: " + ((e2 && e2.message) || "unknown error"));
    }
    setBusy(false);
  }

  const box = round ? "h-24 w-24 rounded-full" : "h-24 w-40 rounded-xl";

  return (
    <div className="rounded-2xl border border-line bg-paper/50 p-4">
      <p className="text-sm font-medium">{label}</p>
      <div className="mt-3 flex flex-wrap items-center gap-4">
        {value ? (
          <img src={value} alt="" className={`${box} object-cover`} />
        ) : (
          <div className={`flex items-center justify-center border border-line text-sm text-muted ${box}`}>No image</div>
        )}
        <div className="space-y-2">
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={onFile}
            disabled={busy}
            aria-label={"Choose " + label}
            className="block text-sm"
          />
          <p className="text-sm text-muted">{help || "JPG, PNG or WebP. It is shrunk automatically before uploading."}</p>
          {busy && <p className="text-sm">Shrinking and uploading...</p>}
          {info && <p role="status" className="text-sm font-medium">{info}</p>}
          {err && <p role="alert" className="text-sm font-medium">{err}</p>}
          {value && <Btn onClick={() => onChange("", "")}>Remove image</Btn>}
        </div>
      </div>
    </div>
  );
}