"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabaseBrowser } from "@/lib/supabaseBrowser";
import ThemeToggle from "@/components/ThemeToggle";

const input =
  "mt-1.5 w-full rounded-xl border border-line bg-paper/70 px-4 py-3 text-base text-ink transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";

export default function Reset() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const sb = supabaseBrowser();
    const { data: sub } = sb.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setReady(true);
    });
    sb.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const p1 = String(f.get("password"));
    const p2 = String(f.get("confirm"));
    if (p1.length < 8) {
      setError("Use at least 8 characters.");
      return;
    }
    if (p1 !== p2) {
      setError("The two passwords do not match.");
      return;
    }
    setBusy(true);
    setError("");
    const { error } = await supabaseBrowser().auth.updateUser({ password: p1 });
    if (error) {
      setError("Could not change the password: " + error.message);
      setBusy(false);
      return;
    }
    setDone(true);
    setTimeout(() => router.push("/admin"), 1500);
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-10">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-10 top-10 h-80 w-80 rounded-full bg-highlight/40 blur-3xl dark:bg-highlight/15" />
        <div className="absolute -right-10 bottom-10 h-96 w-96 rounded-full bg-[#7C9CFF]/40 blur-3xl dark:bg-[#2B50FF]/20" />
      </div>
      <div className="absolute right-5 top-5">
        <ThemeToggle compact />
      </div>

      <div className="w-full max-w-md rounded-3xl border border-white/70 bg-white/55 p-8 shadow-[0_20px_60px_-20px_rgba(11,19,43,0.3)] backdrop-blur-2xl dark:border-white/10 dark:bg-surface/80 dark:shadow-none sm:p-10">
        <h1 className="font-display text-3xl font-bold tracking-tight">Choose a new password</h1>

        {done ? (
          <p role="status" className="mt-6 font-medium">Password changed. Taking you to the Admin Studio...</p>
        ) : !ready ? (
          <div className="mt-6 space-y-4">
            <p className="text-muted">Open the reset link from your email to continue. If you already did, wait a moment.</p>
            <Link href="/admin/login" className="inline-block text-sm underline underline-offset-4 hover:text-accent">
              Back to sign in
            </Link>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 space-y-5">
            <div>
              <label htmlFor="password" className="text-sm font-medium">New password (8 or more characters)</label>
              <input id="password" name="password" type="password" required minLength={8} autoComplete="new-password" className={input} />
            </div>
            <div>
              <label htmlFor="confirm" className="text-sm font-medium">Repeat the new password</label>
              <input id="confirm" name="confirm" type="password" required minLength={8} autoComplete="new-password" className={input} />
            </div>
            {error && <p role="alert" className="font-medium">{error}</p>}
            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-xl bg-highlight px-6 py-3 font-semibold text-[#0B132B] shadow-[0_10px_30px_-8px_rgb(var(--highlight)/0.7)] transition duration-200 hover:-translate-y-0.5 hover:brightness-105 disabled:opacity-60"
            >
              {busy ? "Saving..." : "Save new password"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}