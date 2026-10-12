"use client";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar({ name }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3">
        <a href="#top" className="font-display text-lg font-semibold tracking-tight">
          {name}
        </a>

        <ul className="hidden gap-6 text-sm font-medium lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-muted transition-colors hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <ThemeToggle />
        </div>

        <button
          type="button"
          className="rounded-md border border-line px-3 py-1.5 text-sm font-medium lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line px-6 pb-5 lg:hidden">
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block py-3 text-base font-medium">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="pt-2">
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}