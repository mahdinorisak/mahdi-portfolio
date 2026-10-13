"use client";
import Reveal from "./Reveal";
import { fixUrl } from "@/lib/url";

const link =
  "relative text-sm text-muted transition-colors hover:text-accent after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full";

function spotlight(e) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export default function Projects({ projects, title }) {
  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" aria-labelledby="projects-title" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <Reveal>
        <p className="font-mono text-sm text-accent">03 / Projects</p>
        <h2 id="projects-title" className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
          {title || "Selected work."}
        </h2>
      </Reveal>

      <ul className="mt-10 grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => {
          const description = p.built || p.problem || "";
          const showProblem = p.problem && p.built;
          return (
            <li key={p.title} className="flex">
              <Reveal delay={(i % 2) * 120 + Math.floor(i / 2) * 60} className="flex w-full">
                <article
                  onMouseMove={spotlight}
                  className="group/card relative flex w-full flex-col overflow-hidden rounded-3xl border border-line bg-tint/30 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(360px_circle_at_var(--mx,50%)_var(--my,50%),rgb(var(--accent)/0.14),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
                  />

                  <div className="relative flex flex-1 flex-col">
                    {p.image && (<img src={p.image} alt={"Screenshot of " + p.title} loading="lazy" width="800" height="500" className="mb-5 aspect-[16/10] w-full rounded-2xl border border-line object-cover" />)}
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-xl font-semibold tracking-tight">{p.title}</h3>
                      {p.featured && (
                        <span className="shrink-0 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
                          &#9733; Featured
                        </span>
                      )}
                    </div>

                    {description && <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>}

                    {((p.tags && p.tags.length > 0) || p.category) && (
                      <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tools and category">
                        {(p.tags || []).map((t) => (
                          <li key={t} className="rounded-full bg-tint px-3 py-1 font-mono dark:bg-highlight/30 text-xs">
                            {t}
                          </li>
                        ))}
                        {p.category && (
                          <li className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
                            {p.category}
                          </li>
                        )}
                      </ul>
                    )}

                    {(showProblem || p.result) && (
                      <details className="group/details mt-4 text-sm">
                        <summary className="flex cursor-pointer list-none items-center gap-2 font-medium transition-colors hover:text-accent">
                          Case study
                          <svg
                            viewBox="0 0 24 24"
                            className="h-4 w-4 transition-transform duration-300 group-open/details:rotate-180"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </summary>
                        <dl className="mt-3 animate-[fadeIn_0.3s_ease-out] space-y-2 leading-relaxed text-muted">
                          {showProblem && (
                            <div>
                              <dt className="inline font-semibold text-ink">Problem: </dt>
                              <dd className="inline">{p.problem}</dd>
                            </div>
                          )}
                          {p.result && (
                            <div>
                              <dt className="inline font-semibold text-ink">Result: </dt>
                              <dd className="inline">{p.result}</dd>
                            </div>
                          )}
                        </dl>
                      </details>
                    )}

                    <div className="mt-auto flex items-center gap-5 pt-6">
                      {p.live && (
                        <a href={fixUrl(p.live)} target="_blank" rel="noopener noreferrer" className={link}>
                          Live &#8599;<span className="sr-only"> for {p.title} (opens in new tab)</span>
                        </a>
                      )}
                      {p.repo && (
                        <a href={fixUrl(p.repo)} target="_blank" rel="noopener noreferrer" className={link}>
                          Code &#8599;<span className="sr-only"> for {p.title} (opens in new tab)</span>
                        </a>
                      )}
                      {p.year && <span className="ml-auto font-mono text-xs text-muted">{p.year}</span>}
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}