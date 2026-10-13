"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabaseBrowser } from "@/lib/supabaseBrowser";
import ThemeToggle from "@/components/ThemeToggle";

const input =
  "mt-1.5 w-full rounded-xl border border-line bg-paper/70 px-4 py-3 text-base text-ink transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";
const button =
  "w-full rounded-xl bg-highlight px-6 py-3 font-semibold text-[#0B132B] shadow-[0_10px_30px_-8px_rgb(var(--highlight)/0.7)] transition duration-200 hover:-translate-y-0.5 hover:brightness-105 disabled:opacity-60";

const titles = { login: "Admin Studio", signup: "Create an account", forgot: "Reset password" };
const subs = {
  login: "Sign in to edit your website.",
  signup: "Create an account with your email and a password.",
  forgot: "Enter your email and I will send you a reset link.",
};

export default function Login() {
  const router = useRouter();
  const [mode, setMode] = useState("login");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  function go(next) {
    setMode(next);
    setError("");
    setNotice("");
  }

  async function onLogin(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const f = new FormData(e.currentTarget);
    const { error } = await supabaseBrowser().auth.signInWithPassword({
      email: String(f.get("email")),
      password: String(f.get("password")),
    });
    if (error) {
      setError("Wrong email or password.");
      setBusy(false);
    } else {
      router.push("/admin");
    }
  }

  async function onSignup(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const p1 = String(f.get("password"));
    const p2 = String(f.get("confirm"));
    if (p1.length < 8) {
      setError("Use at least 8 characters for the password.");
      return;
    }
    if (p1 !== p2) {
      setError("The two passwords do not match.");
      return;
    }
    setBusy(true);
    setError("");
    setNotice("");
    const { data, error } = await supabaseBrowser().auth.signUp({
      email: String(f.get("email")),
      password: p1,
      options: { emailRedirectTo: window.location.origin + "/admin" },
    });
    setBusy(false);
    if (error) {
      const m = (error.message || "").toLowerCase();
      setError(
        m.includes("not allowed") || m.includes("disabled")
          ? "Sign up is turned off right now."
          : "Could not create the account: " + error.message
      );
      return;
    }
    if (data && data.session) {
      router.push("/admin");
      return;
    }
    setNotice("Almost done. Check your email and click the confirmation link, then sign in.");
  }

  async function onForgot(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setNotice("");
    const f = new FormData(e.currentTarget);
    await supabaseBrowser().auth.resetPasswordForEmail(String(f.get("email")), {
      redirectTo: window.location.origin + "/admin/reset",
    });
    setBusy(false);
    setNotice("If that email has an account, a reset link is on its way. Check your inbox and spam folder.");
  }

  const submit = mode === "signup" ? onSignup : mode === "forgot" ? onForgot : onLogin;
  const label = busy
    ? "Please wait..."
    : mode === "signup"
    ? "Create account"
    : mode === "forgot"
    ? "Send reset link"
    : "Sign in";

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
        <h1 className="mt-6 font-display text-3xl font-bold tracking-tight">{titles[mode]}</h1>
        <p className="mt-2 text-muted">{subs[mode]}</p>

        {mode !== "forgot" && (
          <div role="group" aria-label="Sign in or sign up" className="mt-6 grid grid-cols-2 gap-1 rounded-full border border-line p-1 text-sm font-semibold">
            {[["login", "Sign in"], ["signup", "Sign up"]].map(([id, text]) => (
              <button
                key={id}
                type="button"
                aria-pressed={mode === id}
                onClick={() => go(id)}
                className={`rounded-full py-2 transition-colors ${
                  mode === id ? "bg-highlight text-[#0B132B]" : "text-muted hover:text-ink"
                }`}
              >
                {text}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={submit} className="mt-6 space-y-5">
          <div>
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <input id="email" name="email" type="email" required autoComplete="email" className={input} />
          </div>

          {mode !== "forgot" && (
            <div>
              <label htmlFor="password" className="text-sm font-medium">
                Password{mode === "signup" ? " (8 or more characters)" : ""}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={mode === "signup" ? 8 : undefined}
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                className={input}
              />
            </div>
          )}

          {mode === "signup" && (
            <div>
              <label htmlFor="confirm" className="text-sm font-medium">Repeat the password</label>
              <input id="confirm" name="confirm" type="password" required minLength={8} autoComplete="new-password" className={input} />
            </div>
          )}

          {mode === "signup" && (
            <p className="text-sm text-muted">
              New accounts can sign in, but only emails on the admin list can edit the website.
            </p>
          )}

          {error && <p role="alert" className="font-medium">{error}</p>}
          {notice && <p role="status" className="font-medium">{notice}</p>}

          <button type="submit" disabled={busy} className={button}>{label}</button>
        </form>

        <div className="mt-6 flex flex-col items-start gap-2 text-sm text-muted">
          {mode === "login" && (
            <button type="button" onClick={() => go("forgot")} className="underline underline-offset-4 hover:text-accent">
              Forgot password?
            </button>
          )}
          {mode === "forgot" && (
            <button type="button" onClick={() => go("login")} className="underline underline-offset-4 hover:text-accent">
              Back to sign in
            </button>
          )}
          <Link href="/" className="underline underline-offset-4 hover:text-accent">
            Back to the website
          </Link>
        </div>
      </div>
    </main>
  );
}