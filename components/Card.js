"use client";
import Reveal from "./Reveal";

export default function Card({ children, delay = 0, className = "" }) {
  function spotlight(e) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <Reveal delay={delay} className="flex w-full">
      <div
        onMouseMove={spotlight}
        className={`group/card relative w-full overflow-hidden rounded-2xl border border-line bg-tint/30 dark:border-highlight/40 dark:bg-highlight/20 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg ${className}`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(240px_circle_at_var(--mx,50%)_var(--my,50%),rgb(var(--accent)/0.14),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
        />
        <div className="relative">{children}</div>
      </div>
    </Reveal>
  );
}