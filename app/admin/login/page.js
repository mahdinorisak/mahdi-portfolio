"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

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

  const field = "mt-1 w-full rounded-md border border-line bg-paper px-4 py-3 text-base text-ink";

  return (
    <main className="mx-auto max-w-md px-6 py-24">
      <h1 className="font-display text-4xl font-bold tracking-tight">Admin Studio</h1>
      <p className="mt-2 text-muted">Sign in to edit your website.</p>

      <form onSubmit={onSubmit} className="mt-8 space-y-5">
        <div>
          <label htmlFor="email" className="font-medium">Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" className={field} />
        </div>
        <div>
          <label htmlFor="password" className="font-medium">Password</label>
          <input id="password" name="password" type="password" required autoComplete="current-password" className={field} />
        </div>
        {error && <p role="alert" className="font-medium text-accent">{error}</p>}
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-md bg-ink px-6 py-3 font-medium text-paper transition-colors hover:bg-accent disabled:opacity-60"
        >
          {busy ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <Link href="/" className="mt-8 inline-block text-muted underline underline-offset-4">
        Back to the website
      </Link>
    </main>
  );
}