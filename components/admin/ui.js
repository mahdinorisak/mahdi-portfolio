"use client";
import { useId, useState } from "react";

const inputClass = "mt-1 w-full rounded-md border border-line bg-paper px-3 py-2 text-base text-ink";

export function Btn({ children, onClick, disabled, primary, ...rest }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      {...rest}
      className={`rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 ${
        primary ? "bg-ink text-paper hover:bg-accent" : "border border-line hover:bg-ink hover:text-paper"
      }`}
    >
      {children}
    </button>
  );
}

export function Field({ label, value, onChange, textarea = false, rows = 3, type = "text" }) {
  const id = useId();
  const Tag = textarea ? "textarea" : "input";
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">{label}</label>
      <Tag
        id={id}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        rows={textarea ? rows : undefined}
        type={textarea ? undefined : type}
        className={inputClass}
      />
    </div>
  );
}

const modes = {
  comma: {
    join: (a) => a.join(", "),
    split: (s) => s.split(",").map((x) => x.trim()).filter(Boolean),
    hint: "Separate with commas",
    textarea: false,
  },
  lines: {
    join: (a) => a.join("\n"),
    split: (s) => s.split("\n").map((x) => x.trim()).filter(Boolean),
    hint: "One per line",
    textarea: true,
  },
  paragraphs: {
    join: (a) => a.join("\n\n"),
    split: (s) => s.split(/\n\s*\n/).map((x) => x.trim()).filter(Boolean),
    hint: "Leave a blank line between paragraphs",
    textarea: true,
  },
};

export function ListText({ label, value, onChange, mode = "comma", rows = 4 }) {
  const m = modes[mode];
  const id = useId();
  const [text, setText] = useState(m.join(value || []));

  function change(v) {
    setText(v);
    onChange(m.split(v));
  }

  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label} <span className="font-normal text-muted">({m.hint})</span>
      </label>
      {m.textarea ? (
        <textarea id={id} value={text} rows={rows} onChange={(e) => change(e.target.value)} className={inputClass} />
      ) : (
        <input id={id} type="text" value={text} onChange={(e) => change(e.target.value)} className={inputClass} />
      )}
    </div>
  );
}

export function ArrayEditor({ items = [], onChange, blank, addLabel, titleOf, children }) {
  const [version, setVersion] = useState(0);

  const replace = (next) => {
    setVersion((v) => v + 1);
    onChange(next);
  };
  const update = (i, patch) => onChange(items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));
  const remove = (i) => replace(items.filter((_, idx) => idx !== i));
  const move = (i, d) => {
    const j = i + d;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    replace(next);
  };

  return (
    <div className="space-y-4">
      {items.map((it, i) => (
        <div key={`${version}-${i}`} className="rounded-lg border border-line p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <p className="font-semibold">{titleOf(it, i)}</p>
            <div className="flex gap-2">
              <Btn onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up">Up</Btn>
              <Btn onClick={() => move(i, 1)} disabled={i === items.length - 1} aria-label="Move down">Down</Btn>
              <Btn onClick={() => remove(i)}>Remove</Btn>
            </div>
          </div>
          {children(it, (patch) => update(i, patch), i)}
        </div>
      ))}
      <Btn onClick={() => replace([...items, blank()])}>{addLabel}</Btn>
    </div>
  );
}