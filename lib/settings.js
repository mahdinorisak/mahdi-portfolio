import { cache } from "react";
import { createClient } from "@supabase/supabase-js";

// Only used while the site is being built, never for real visitors.
const fallbackTheme = {
  light: { paper: "#F3F6FA", ink: "#0B132B", muted: "#46556F", line: "#D3DBE7", accent: "#0B7A3E", tint: "#D9FBE8", highlight: "#39FF88", surface: "#111C3D" },
  dark: { paper: "#0B132B", ink: "#EEF2F8", muted: "#A3B1C8", line: "#263256", accent: "#39FF88", tint: "#1C2541", highlight: "#39FF88", surface: "#111C3D" },
};
const fallbackContent = {
  name: "Portfolio", role: "", intro: "", about: [], skills: [], projects: [],
  experience: [], stats: [], contact: { email: "", socials: [] },
};

export function supabaseServer() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      auth: { persistSession: false },
      global: { fetch: (url, options = {}) => fetch(url, { ...options, cache: "no-store" }) },
    }
  );
}

// cache() makes the layout, metadata and page share one database request.
export const getSettings = cache(async () => {
  if (process.env.NEXT_PHASE === "phase-production-build") {
    return { content: fallbackContent, theme: fallbackTheme };
  }
  const { data, error } = await supabaseServer()
    .from("site_settings")
    .select("content, theme")
    .eq("id", 1)
    .single();
  if (error) throw new Error("Could not load settings: " + error.message);
  return data;
});