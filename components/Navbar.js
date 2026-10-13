"use client";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

function Chat() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
    </svg>
  );
}

export default function Navbar({ name, logo }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("top");
  const letter = (logo || name || "M").trim().slice(0, 2).toUpperCase();

  useEffect(() => {
    const els = links.map((l) => document.getElementById(l.href.slice(1))).filter(Boolean);
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => obs.observe(el));
    const top = () => { if (window.scrollY < 200) setActive("top"); };
    window.addEventListener("scroll", top, { passive: true });
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", top);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-4">
      <div className="mx-auto max-w-6xl rounded-3xl border border-line bg-paper/90 shadow-sm backdrop-blur">
        <nav aria-label="Main" className="flex items-center justify-between gap-3 px-4 py-3">
          <a
            href="#top"
            aria-label={`${name} - back to top`}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-surface font-display text-lg font-bold text-highlight dark:bg-highlight dark:text-surface"
          >
            {letter}
          </a>

          <ul className="hidden items-center gap-1.5 text-sm font-medium lg:flex">
            {links.map((l) => {
              const on = active === l.href.slice(1);
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    aria-current={on ? "location" : undefined}
                    className={`block rounded-full px-4 py-2 transition-colors ${
                      on ? "bg-highlight text-[#0B132B]" : "bg-ink/5 text-ink hover:bg-ink/10"
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle compact />
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium transition-colors hover:bg-ink hover:text-paper"
            >
              <Chat /> Let&apos;s talk
            </a>
          </div>

          <button
            type="button"
            className="rounded-full border border-line px-4 py-2 text-sm font-medium lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </nav>

        {open && (
          <div id="mobile-menu" className="border-t border-line px-4 pb-4 lg:hidden">
            <ul>
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={() => setOpen(false)} className="block py-3 text-base font-medium">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <ThemeToggle />
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium"
              >
                <Chat /> Let&apos;s talk
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}