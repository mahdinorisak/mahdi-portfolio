"use client";
import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabaseBrowser";
import { Btn } from "./ui";

export default function Inbox() {
  const [rows, setRows] = useState(null);
  const [err, setErr] = useState("");

  async function load() {
    setErr("");
    const { data, error } = await supabaseBrowser()
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      setErr("Could not load messages.");
      setRows([]);
      return;
    }
    setRows(data);
  }

  useEffect(() => {
    load();
  }, []);

  async function toggle(m) {
    const { error } = await supabaseBrowser().from("messages").update({ is_read: !m.is_read }).eq("id", m.id);
    if (!error) setRows((r) => r.map((x) => (x.id === m.id ? { ...x, is_read: !x.is_read } : x)));
  }

  async function remove(m) {
    if (!window.confirm("Delete this message for good?")) return;
    const { error } = await supabaseBrowser().from("messages").delete().eq("id", m.id);
    if (!error) setRows((r) => r.filter((x) => x.id !== m.id));
  }

  if (rows === null) return <p className="text-muted">Loading messages...</p>;

  const unread = rows.filter((m) => !m.is_read).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-muted">
          {rows.length} {rows.length === 1 ? "message" : "messages"}, {unread} unread
        </p>
        <Btn onClick={load}>Refresh</Btn>
      </div>

      {err && <p role="alert" className="font-medium">{err}</p>}
      {rows.length === 0 && !err && <p className="rounded-lg border border-line p-5 text-muted">No messages yet.</p>}

      {rows.map((m) => (
        <article key={m.id} className={`rounded-lg border p-4 ${m.is_read ? "border-line" : "border-accent border-l-4"}`}>
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="font-semibold">
                {m.name} {!m.is_read && <span className="ml-2 rounded bg-tint px-2 py-0.5 text-xs font-medium">New</span>}
              </p>
              <p className="text-sm text-muted">
                <a href={`mailto:${m.email}`} className="underline underline-offset-4">{m.email}</a>
                {m.phone ? ` | ${m.phone}` : ""}
                {m.topic ? ` | ${m.topic}` : ""}
              </p>
            </div>
            <p className="text-sm text-muted">{new Date(m.created_at).toLocaleString()}</p>
          </div>
          <p className="mt-3 whitespace-pre-wrap leading-relaxed">{m.message}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={`mailto:${m.email}?subject=${encodeURIComponent("Re: " + (m.topic || "your message"))}`}
              className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-paper hover:bg-accent"
            >
              Reply
            </a>
            <Btn onClick={() => toggle(m)}>{m.is_read ? "Mark as unread" : "Mark as read"}</Btn>
            <Btn onClick={() => remove(m)}>Delete</Btn>
          </div>
        </article>
      ))}
    </div>
  );
}