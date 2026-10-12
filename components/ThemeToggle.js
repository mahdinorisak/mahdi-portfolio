"use client";
import { useEffect, useState } from "react";

const options = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

function apply(theme) {
  const dark =
    theme === "dark" ||
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", dark);
}

export default function ThemeToggle() {
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
    <div role="group" aria-label="Theme" className="inline-flex rounded-md border border-line p-0.5 text-sm">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={theme === o.value}
          onClick={() => choose(o.value)}
          className={`rounded px-3 py-1 font-medium transition-colors ${
            theme === o.value ? "bg-ink text-paper" : "text-muted hover:text-ink"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}