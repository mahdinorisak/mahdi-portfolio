import { createClient } from "@supabase/supabase-js";

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

export async function getSettings() {
  const { data, error } = await supabaseServer()
    .from("site_settings")
    .select("content, theme")
    .eq("id", 1)
    .single();
  if (error) throw new Error("Could not load settings: " + error.message);
  return data;
}