"use client";
import { useEffect, useState } from "react";
import { Btn } from "./ui";

export const defaultTheme = {
  light: { paper: "#F3F6FA", ink: "#0B132B", muted: "#46556F", line: "#D3DBE7", accent: "#3A7500", tint: "#E7FACD", highlight: "#B7FF72" },
  dark: { paper: "#0B132B", ink: "#EEF2F8", muted: "#A3B1C8", line: "#263256", accent: "#B7FF72", tint: "#1C2541", highlight: "#B7FF72" },
};

const names = [
  ["paper", "Background"],
  ["ink", "Main text"],
  ["muted", "Secondary text"],
  ["line", "Borders"],
  ["accent", "Accent (links, highlights)"],
  ["tint", "Tags and status pill"],
  ["highlight", "Highlight (buttons and badges on dark areas)"],
];

const isHex = (v) => /^#[0-9a-fA-F]{6}$/.test(v || "");

function lum(hex) {
  const n = parseInt(hex.slice(1), 16);
  const f = (c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f((n >> 16) & 255) + 0.7152 * f((n >> 8) & 255) + 0.0722 * f(n & 255);
}

function ratio(a, b) {
  if (!isHex(a) || !isHex(b)) return 0;
  const la = lum(a);
  const lb = lum(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

function ColorField({ label, value, onChange }) {
  const [text, setText] = useState(value);
  useEffect(() => setText(value), [value]);

  return (
    <div className="flex items-center gap-3">
      <input
        type="color"
        aria-label={label}
        value={isHex(value) ? value : "#000000"}
        onChange={(e) => onChange(e.target.value.toUpperCase())}
        className="h-10 w-12 cursor-pointer rounded border border-line bg-paper p-0.5"
      />
      <div className="flex-1">
        <p className="text-sm font-medium">{label}</p>
        <input
          type="text"
          aria-label={`${label} hex code`}
          value={text}
          maxLength={7}
          onChange={(e) => {
            setText(e.target.value);
            if (isHex(e.target.value)) onChange(e.target.value.toUpperCase());
          }}
          className="w-28 rounded border border-line bg-paper px-2 py-1 text-sm text-ink"
        />
      </div>
    </div>
  );
}

function Check({ label, a, b }) {
  const r = ratio(a, b);
  const ok = r >= 4.5;
  return (
    <li className={ok ? "text-muted" : "font-medium text-ink"}>
      {label}: {r.toFixed(1)} to 1, {ok ? "readable" : "too low, hard to read"}
    </li>
  );
}

function Preview({ p }) {
  return (
    <div style={{ background: p.paper, color: p.ink, border: `1px solid ${p.line}` }} className="rounded-lg p-5">
      <span style={{ background: p.tint }} className="inline-block rounded-full px-3 py-1 text-sm font-medium">
        Open to work
      </span>
      <p className="mt-3 text-3xl font-bold tracking-tight">Eng Mahdi</p>
      <p style={{ color: p.accent }} className="mt-1 text-lg font-semibold">Fullstack Developer</p>
      <p style={{ color: p.muted }} className="mt-2">A short line of secondary text.</p>
      <div className="mt-4 flex items-center gap-4">
        <span style={{ background: p.ink, color: p.paper }} className="rounded-md px-4 py-2 text-sm font-medium">Button</span>
        <span style={{ color: p.accent }} className="text-sm font-medium underline underline-offset-4">A link</span>
      </div>
    </div>
  );
}

function Palette({ title, p, onChange, version }) {
  return (
    <section aria-label={`${title} palette`} className="space-y-4">
      <h2 className="font-display text-xl font-semibold">{title}</h2>
      <Preview p={p} />
      <div key={version} className="space-y-3">
        {names.map(([k, label]) => (
          <ColorField key={k} label={label} value={p[k]} onChange={(v) => onChange(k, v)} />
        ))}
      </div>
      <ul className="space-y-1 text-sm">
        <Check label="Main text on background" a={p.ink} b={p.paper} />
        <Check label="Secondary text on background" a={p.muted} b={p.paper} />
        <Check label="Accent on background" a={p.accent} b={p.paper} />
        <Check label="Button text on accent (hover)" a={p.paper} b={p.accent} />
      </ul>
    </section>
  );
}

export default function ThemeEditor({ theme, setTheme }) {
  const [version, setVersion] = useState(0);
  const set = (mode, key, val) => setTheme({ ...theme, [mode]: { ...theme[mode], [key]: val } });

  return (
    <div className="space-y-6">
      <p className="text-muted">
        Visitors see the Light or Dark palette depending on the toggle in the navbar. Aim for "readable" on every check.
      </p>
      <div className="grid gap-10 md:grid-cols-2">
        <Palette title="Light" p={theme.light} version={version} onChange={(k, v) => set("light", k, v)} />
        <Palette title="Dark" p={theme.dark} version={version} onChange={(k, v) => set("dark", k, v)} />
      </div>
      <Btn
        onClick={() => {
          setTheme(defaultTheme);
          setVersion((v) => v + 1);
        }}
      >
        Reset to default colours
      </Btn>
    </div>
  );
}