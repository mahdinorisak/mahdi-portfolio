"use client";
import { useState } from "react";
import Reveal from "./Reveal";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

const defaultTopics = ["Job opportunity", "Freelance project", "Collaboration", "Just saying hello"];

const base =
  "w-full border border-white/15 bg-white/5 px-6 py-3.5 text-base text-white placeholder:text-white/50 focus:border-highlight focus:outline-none focus:ring-2 focus:ring-highlight/40";

function Icon({ children, className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

export default function Contact({ contact, name, logo }) {
  const [status, setStatus] = useState("idle");
  const socials = contact.socials || [];
  const topics = contact.topics && contact.topics.length ? contact.topics : defaultTopics;
  const letter = (logo || name || "M").trim().slice(0, 2).toUpperCase();
  const phoneLink = contact.phone ? contact.phone.replace(/[^+\d]/g, "") : "";

  async function onSubmit(e) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const f = new FormData(form);

    if (f.get("company")) {
      setStatus("sent");
      form.reset();
      return;
    }

    setStatus("sending");
    const { error } = await supabaseBrowser()
      .from("messages")
      .insert({
        name: String(f.get("name")).trim(),
        email: String(f.get("email")).trim(),
        phone: String(f.get("phone") || "").trim() || null,
        topic: String(f.get("topic") || "") || null,
        message: String(f.get("message")).trim(),
      });

    if (error) {
      setStatus("error");
      return;
    }
    form.reset();
    setStatus("sent");
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="px-3 pb-3 pt-20 sm:px-4 md:pt-28">
      <div className="mx-auto max-w-6xl rounded-3xl bg-surface p-6 text-white sm:p-10 md:p-14">
        <div className="grid gap-14 md:grid-cols-2 md:gap-16">
          <div className="order-2 md:order-1">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 font-display text-lg font-bold text-highlight dark:bg-highlight dark:text-surface">
                {letter}
              </span>
              <span className="font-display text-xl font-bold">{name}</span>
            </div>

            <div className="mt-12 grid gap-10 sm:grid-cols-2">
              {socials.length > 0 && (
                <ul className="space-y-3 text-lg font-semibold text-white/85">
                  {socials.map((s) => (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-highlight">
                        {s.label}
                        <span className="sr-only"> (opens in new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              <ul className="space-y-6">
                {contact.email && (
                  <li className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-highlight/60 text-highlight">
                      <Icon>
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <path d="m3 7 9 6 9-6" />
                      </Icon>
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs text-white/60">Email</p>
                      <a href={`mailto:${contact.email}`} className="break-all font-semibold transition-colors hover:text-highlight">
                        {contact.email}
                      </a>
                    </div>
                  </li>
                )}
                {contact.phone && (
                  <li className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-highlight/60 text-highlight">
                      <Icon>
                        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
                      </Icon>
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs text-white/60">Phone number</p>
                      <a href={`tel:${phoneLink}`} className="font-semibold transition-colors hover:text-highlight">
                        {contact.phone}
                      </a>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <p className="flex items-center gap-2 text-sm font-semibold text-highlight">
              <Icon className="h-4 w-4">
                <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
              </Icon>
              Contact me
            </p>
            <Reveal from="left" delay={120} className="mt-3"><h2 id="contact-title" className="font-display text-4xl font-bold tracking-tight md:text-5xl">
              Let&apos;s collaborate
            </h2></Reveal>

            <form onSubmit={onSubmit} className="mt-8 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-name" className="sr-only">Your name</label>
                  <input id="c-name" name="name" type="text" required maxLength={100} autoComplete="name" placeholder="Your name" className={`${base} rounded-full`} />
                </div>
                <div>
                  <label htmlFor="c-email" className="sr-only">Your email</label>
                  <input id="c-email" name="email" type="email" required maxLength={200} autoComplete="email" placeholder="Your email" className={`${base} rounded-full`} />
                </div>
                <div>
                  <label htmlFor="c-phone" className="sr-only">Your number (optional)</label>
                  <input id="c-phone" name="phone" type="tel" maxLength={40} autoComplete="tel" placeholder="Your number (optional)" className={`${base} rounded-full`} />
                </div>
                <div className="relative">
                  <label htmlFor="c-topic" className="sr-only">Topic</label>
                  <select id="c-topic" name="topic" defaultValue="" className={`${base} appearance-none rounded-full pr-12 [color-scheme:dark]`}>
                    <option value="" className="bg-surface text-white">Choose a topic</option>
                    {topics.map((t) => (
                      <option key={t} value={t} className="bg-surface text-white">{t}</option>
                    ))}
                  </select>
                  <Icon className="pointer-events-none absolute right-5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70">
                    <path d="m6 9 6 6 6-6" />
                  </Icon>
                </div>
              </div>

              <div>
                <label htmlFor="c-message" className="sr-only">Your message</label>
                <textarea id="c-message" name="message" rows={5} required maxLength={3000} placeholder="Message here..." className={`${base} rounded-3xl`} />
              </div>

              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="c-company">Company</label>
                <input id="c-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="group inline-flex items-center gap-3 rounded-full bg-highlight px-8 py-4 font-semibold text-[#0B132B] shadow-[0_10px_30px_-8px_rgb(var(--highlight)/0.6)] transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_16px_40px_-8px_rgb(var(--highlight)/0.8)] active:translate-y-0 active:scale-95 disabled:opacity-60 [&>svg]:transition-transform [&>svg]:duration-300 hover:[&>svg]:translate-x-1.5"
              >
                {status === "sending" ? "Sending..." : "Submit now"}
                <Icon>
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </Icon>
              </button>

              <div aria-live="polite">
                {status === "sent" && (
                  <p role="status" className="font-medium text-highlight">
                    Thank you! Your message was sent. I will reply as soon as I can.
                  </p>
                )}
                {status === "error" && (
                  <p role="alert" className="font-medium">
                    Sorry, the message could not be sent.
                    {contact.email && (
                      <>
                        {" "}Please email me at{" "}
                        <a href={`mailto:${contact.email}`} className="text-highlight underline underline-offset-4">
                          {contact.email}
                        </a>
                        .
                      </>
                    )}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="mt-16 grid items-center gap-2 border-t border-white/15 pt-6 text-center text-sm text-white/70 sm:grid-cols-[1fr_auto_1fr]">
          <span aria-hidden="true" className="hidden sm:block" />
          <p>&copy; {new Date().getFullYear()} {name}. All rights reserved.</p>
          <a href="#top" className="transition-colors hover:text-highlight sm:text-right">Back to top</a>
        </div>
      </div>
    </section>
  );
}