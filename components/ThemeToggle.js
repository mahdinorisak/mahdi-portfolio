"use client";
import { useEffect, useState } from "react";

const options = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

const icons = {
  light: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  dark: <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />,
  system: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </>
  ),
};

function apply(theme) {
  const dark =
    theme === "dark" ||
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", dark);
}

export default function ThemeToggle({ compact = false }) {
  const [theme, setTheme] = useState("system");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let saved = "system";
    try { saved = localStorage.getItem("theme") || "system"; } catch (e) {}
    setTheme(saved);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    apply(theme);
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => apply("system");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [theme, ready]);

  function choose(value) {
    setTheme(value);
    try { localStorage.setItem("theme", value); } catch (e) {}
  }

  return (
    <div
      role="group"
      aria-label="Theme"
      className={`inline-flex border border-line p-0.5 text-sm ${compact ? "rounded-full" : "rounded-md"}`}
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={theme === o.value}
          aria-label={compact ? `${o.label} theme` : undefined}
          title={`${o.label} theme`}
          onClick={() => choose(o.value)}
          className={`font-medium transition-colors ${
            compact ? "flex h-8 w-8 items-center justify-center rounded-full" : "rounded px-3 py-1"
          } ${theme === o.value ? "bg-ink text-paper" : "text-muted hover:text-ink"}`}
        >
          {compact ? (
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {icons[o.value]}
            </svg>
          ) : (
            o.label
          )}
        </button>
      ))}
    </div>
  );
}