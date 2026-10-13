"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseBrowser";
import { General, SkillsEditor, ExperienceEditor } from "@/components/admin/SectionsA";
import { ProjectsEditor, ContactEditor } from "@/components/admin/SectionsB";
import ThemeEditor from "@/components/admin/ThemeEditor";
import Inbox from "@/components/admin/Inbox";
import ThemeToggle from "@/components/ThemeToggle";
import { Btn } from "@/components/admin/ui";
import { tabs, Icon } from "@/components/admin/nav";

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
  const [unread, setUnread] = useState(0);

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
      const { count } = await sb.from("messages").select("id", { count: "exact", head: true }).eq("is_read", false);
      setEmail(data.session.user.email);
      setAdmin(ok === true);
      setUnread(count || 0);
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
    setMsg({ type: "ok", text: "Saved. Your website is updated." });
  }

  async function signOut() {
    await supabaseBrowser().auth.signOut();
    router.replace("/admin/login");
  }

  if (!ready) return <main className="mx-auto max-w-3xl px-6 py-24 text-muted">Loading...</main>;

  if (!admin || !content || !theme) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-24">
        <p role="alert" className="rounded-2xl border border-line bg-paper/60 p-6 text-lg">
          This account ({email}) is not on the admin list, so it cannot edit the website.
        </p>
        <div className="mt-6"><Btn onClick={signOut}>Sign out</Btn></div>
      </main>
    );
  }

  const current = tabs.find((t) => t.id === tab);
  const wide = tab === "colours";
  const letter = (content.logo || content.name || "M").trim().slice(0, 2).toUpperCase();

  const badge = (active) =>
    unread > 0 ? (
      <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${active ? "bg-[#0B132B] text-highlight" : "bg-highlight text-[#0B132B]"}`}>
        {unread}
      </span>
    ) : null;

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[17rem_1fr]">
      <aside className="sticky top-0 hidden h-screen flex-col bg-surface p-5 text-white lg:flex">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-highlight font-display text-lg font-bold text-surface">
            {letter}
          </span>
          <div className="min-w-0">
            <p className="font-display text-lg font-bold leading-tight">Admin Studio</p>
            <p className="truncate text-xs text-white/60">{content.name}</p>
          </div>
        </div>

        <nav aria-label="Sections" className="mt-8 flex-1 space-y-1">
          {tabs.map((t) => {
            const on = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                aria-current={on ? "page" : undefined}
                onClick={() => setTab(t.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                  on ? "bg-highlight text-[#0B132B]" : "text-white/75 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon id={t.id} />
                <span className="flex-1">{t.label}</span>
                {t.id === "inbox" && badge(on)}
              </button>
            );
          })}
        </nav>

        <div className="space-y-1 border-t border-white/10 pt-4 text-sm">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl px-3 py-2 text-white/75 transition-colors hover:bg-white/10 hover:text-white"
          >
            View website &#8599;<span className="sr-only"> (opens in new tab)</span>
          </a>
          <button
            type="button"
            onClick={signOut}
            className="block w-full rounded-xl px-3 py-2 text-left text-white/75 transition-colors hover:bg-white/10 hover:text-white"
          >
            Sign out
          </button>
          <p className="truncate px-3 pt-2 text-xs text-white/50">{email}</p>
        </div>
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-20 border-b border-line bg-paper/85 backdrop-blur">
          <div className="flex items-center justify-between gap-3 px-5 py-3 md:px-8">
            <div className="min-w-0">
              <h1 className="truncate font-display text-xl font-bold tracking-tight md:text-2xl">{current.label}</h1>
              <p className="hidden truncate text-sm text-muted sm:block">{current.desc}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {dirty && (
                <span className="hidden items-center gap-1.5 text-sm text-muted sm:flex">
                  <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                  Unsaved
                </span>
              )}
              <ThemeToggle compact />
              <Btn primary onClick={save} disabled={busy || !dirty}>{busy ? "Saving..." : "Save"}</Btn>
            </div>
          </div>

          <nav aria-label="Sections" className="flex gap-2 overflow-x-auto px-5 pb-3 lg:hidden">
            {tabs.map((t) => {
              const on = tab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  aria-current={on ? "page" : undefined}
                  onClick={() => setTab(t.id)}
                  className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
                    on ? "bg-highlight text-[#0B132B]" : "border border-line bg-paper/60"
                  }`}
                >
                  <Icon id={t.id} />
                  {t.label}
                  {t.id === "inbox" && badge(on)}
                </button>
              );
            })}
            <a href="/" target="_blank" rel="noopener noreferrer" className="flex shrink-0 items-center rounded-full border border-line bg-paper/60 px-4 py-2 text-sm font-medium">
              View site
            </a>
            <button type="button" onClick={signOut} className="flex shrink-0 items-center rounded-full border border-line bg-paper/60 px-4 py-2 text-sm font-medium">
              Sign out
            </button>
          </nav>
        </header>

        <main className={`mx-auto w-full px-5 py-8 md:px-8 ${wide ? "max-w-5xl" : "max-w-3xl"}`}>
          {msg.text && (
            <p
              role="status"
              className={`mb-5 rounded-2xl p-4 font-medium ${msg.type === "ok" ? "bg-highlight/25" : "border border-line bg-paper/60"}`}
            >
              {msg.text}
            </p>
          )}

          <div className="rounded-3xl border border-white/70 bg-white/60 p-5 shadow-[0_20px_60px_-24px_rgba(11,19,43,0.25)] backdrop-blur-xl dark:border-white/10 dark:bg-surface/70 dark:shadow-none sm:p-8">
            {tab === "general" && <General c={content} set={set} />}
            {tab === "skills" && <SkillsEditor c={content} set={set} />}
            {tab === "projects" && <ProjectsEditor c={content} set={set} />}
            {tab === "experience" && <ExperienceEditor c={content} set={set} />}
            {tab === "contact" && <ContactEditor c={content} set={set} />}
            {tab === "inbox" && <Inbox onCount={setUnread} />}
            {tab === "colours" && <ThemeEditor theme={theme} setTheme={setTheme} />}
          </div>
        </main>
      </div>
    </div>
  );
}