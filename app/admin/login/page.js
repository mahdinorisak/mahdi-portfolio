"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabaseBrowser } from "@/lib/supabaseBrowser";
import ThemeToggle from "@/components/ThemeToggle";

const input =
  "mt-1.5 w-full rounded-xl border border-line bg-paper/70 px-4 py-3 text-base text-ink transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const f = new FormData(e.currentTarget);
    const { error } = await supabaseBrowser().auth.signInWithPassword({
      email: f.get("email"),
      password: f.get("password"),
    });
    if (error) {
      setError("Wrong email or password.");
      setBusy(false);
    } else {
      router.push("/admin");
    }
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
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface font-display text-xl font-bold text-highlight dark:bg-highlight dark:text-surface">
          M
        </span>
        <h1 className="mt-6 font-display text-3xl font-bold tracking-tight">Admin Studio</h1>
        <p className="mt-2 text-muted">Sign in to edit your website.</p>

        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <input id="email" name="email" type="email" required autoComplete="email" className={input} />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <input id="password" name="password" type="password" required autoComplete="current-password" className={input} />
          </div>
          {error && <p role="alert" className="font-medium">{error}</p>}
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-xl bg-highlight px-6 py-3 font-semibold text-[#0B132B] shadow-[0_10px_30px_-8px_rgb(var(--highlight)/0.7)] transition duration-200 hover:-translate-y-0.5 hover:brightness-105 disabled:opacity-60"
          >
            {busy ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <Link href="/" className="mt-8 inline-block text-sm text-muted underline underline-offset-4 hover:text-accent">
          Back to the website
        </Link>
      </div>
    </main>
  );
}