"use client";
import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabaseBrowser";
import { Btn } from "./ui";

export default function PhotoUpload({ c, set }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function onFile(e) {
    const file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file) return;
    setErr("");

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setErr("Use a JPG, PNG or WebP image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErr("The image is bigger than 5 MB. Use a smaller one.");
      return;
    }

    setBusy(true);
    const sb = supabaseBrowser();
    const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
    const path = `profile-${Date.now()}.${ext}`;
    const { error } = await sb.storage
      .from("portfolio")
      .upload(path, file, { contentType: file.type, cacheControl: "31536000" });

    if (error) {
      setErr("Upload failed: " + error.message);
      setBusy(false);
      return;
    }
    const { data } = sb.storage.from("portfolio").getPublicUrl(path);
    set({ photo: data.publicUrl, photoPath: path });
    setBusy(false);
  }

  return (
    <div className="rounded-lg border border-line p-4">
      <p className="text-sm font-medium">Profile photo</p>
      <div className="mt-3 flex flex-wrap items-center gap-4">
        {c.photo ? (
          <img src={c.photo} alt="Current profile photo" className="h-24 w-24 rounded-full object-cover" />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-line text-sm text-muted">
            No photo
          </div>
        )}
        <div className="space-y-2">
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={onFile}
            disabled={busy}
            aria-label="Choose a profile photo"
            className="block text-sm"
          />
          <p className="text-sm text-muted">A square photo, at least 600 pixels wide, under 5 MB. Click Save after uploading.</p>
          {busy && <p className="text-sm">Uploading...</p>}
          {err && <p role="alert" className="text-sm font-medium">{err}</p>}
          {c.photo && <Btn onClick={() => set({ photo: "", photoPath: "" })}>Remove photo</Btn>}
        </div>
      </div>
    </div>
  );
}