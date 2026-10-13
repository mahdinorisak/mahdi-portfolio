"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseBrowser";
import { General, SkillsEditor, ExperienceEditor } from "@/components/admin/SectionsA";
import { ProjectsEditor, ContactEditor } from "@/components/admin/SectionsB";
import ThemeEditor from "@/components/admin/ThemeEditor";
import Inbox from "@/components/admin/Inbox";
import { Btn } from "@/components/admin/ui";

const tabs = [
  ["general", "General"],
  ["skills", "Skills"],
  ["projects", "Projects"],
  ["experience", "Experience"],
  ["contact", "Contact"],
  ["inbox", "Inbox"],
  ["colours", "Colours"],
];

export default function AdminHome() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState("");
  const [admin, setAdmin] = useState(false);
  const [content, setContent] = useState(null);
  const [theme, setTheme] = useState(null);
  const [saved, setSaved] = useState("");
  const [tab, setTab] = useState("general");
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    (async () => {
      const sb = supabaseBrowser();
      const { data } = await sb.auth.getSession();
      if (!data.session) {
        router.replace("/admin/login");
        return;
      }
      const { data: ok } = await sb.rpc("is_admin");
      const { data: row } = await sb.from("site_settings").select("content, theme").eq("id", 1).single();
      setEmail(data.session.user.email);
      setAdmin(ok === true);
      if (row) {
        setContent(row.content);
        setTheme(row.theme);
        setSaved(JSON.stringify([row.content, row.theme]));
      }
      setReady(true);
    })();
  }, [router]);

  const dirty = content && theme && JSON.stringify([content, theme]) !== saved;

  useEffect(() => {
    if (!dirty) return;
    const warn = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const set = (patch) => setContent((c) => ({ ...c, ...patch }));

  async function save() {
    setBusy(true);
    setMsg({ type: "", text: "" });
    const { data, error } = await supabaseBrowser()
      .from("site_settings")
      .update({ content, theme, updated_at: new Date().toISOString() })
      .eq("id", 1)
      .select("content, theme");
    setBusy(false);
    if (error || !data || data.length === 0) {
      setMsg({ type: "error", text: "Could not save. Check that you are signed in as an admin." });
      return;
    }
    setSaved(JSON.stringify([data[0].content, data[0].theme]));
    setMsg({ type: "ok", text: "Saved. Your website is updated. Refresh this page to see new colours here too." });
  }

  async function signOut() {
    await supabaseBrowser().auth.signOut();
    router.replace("/admin/login");
  }

  if (!ready) return <main className="mx-auto max-w-3xl px-6 py-24 text-muted">Loading...</main>;

  if (!admin || !content || !theme) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-24">
        <p role="alert" className="rounded-lg border border-line p-5 text-lg">
          This account ({email}) is not on the admin list, so it cannot edit the website.
        </p>
        <div className="mt-6"><Btn onClick={signOut}>Sign out</Btn></div>
      </main>
    );
  }

  const wide = tab === "colours";

  return (
    <>
      <header className="sticky top-0 z-10 border-b border-line bg-paper/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-3">
          <h1 className="font-display text-xl font-bold tracking-tight">Admin Studio</h1>
          <div className="flex flex-wrap items-center gap-2">
            {dirty && <span className="text-sm text-muted">Unsaved changes</span>}
            <a href="/" target="_blank" rel="noopener noreferrer" className="rounded-md border border-line px-4 py-2 text-sm font-medium hover:bg-ink hover:text-paper">
              View website<span className="sr-only"> (opens in new tab)</span>
            </a>
            <Btn primary onClick={save} disabled={busy || !dirty}>{busy ? "Saving..." : "Save"}</Btn>
            <Btn onClick={signOut}>Sign out</Btn>
          </div>
        </div>
      </header>

      <main className={`mx-auto px-6 py-8 ${wide ? "max-w-5xl" : "max-w-3xl"}`}>
        <p className="text-sm text-muted">Signed in as {email}</p>

        <nav aria-label="Sections" className="mt-4 flex flex-wrap gap-2">
          {tabs.map(([id, label]) => (
            <button
              key={id}
              type="button"
              aria-current={tab === id ? "page" : undefined}
              onClick={() => setTab(id)}
              className={`rounded-md px-4 py-2 text-sm font-medium ${
                tab === id ? "bg-ink text-paper" : "border border-line hover:bg-tint"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        {msg.text && (
          <p role="status" className={`mt-4 rounded-md p-3 font-medium ${msg.type === "ok" ? "bg-tint" : "border border-line"}`}>
            {msg.text}
          </p>
        )}

        <div className="mt-6">
          {tab === "general" && <General c={content} set={set} />}
          {tab === "skills" && <SkillsEditor c={content} set={set} />}
          {tab === "projects" && <ProjectsEditor c={content} set={set} />}
          {tab === "experience" && <ExperienceEditor c={content} set={set} />}
          {tab === "contact" && <ContactEditor c={content} set={set} />}
          {tab === "inbox" && <Inbox />}
          {tab === "colours" && <ThemeEditor theme={theme} setTheme={setTheme} />}
        </div>
      </main>
    </>
  );
}