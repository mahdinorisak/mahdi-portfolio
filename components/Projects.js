import Section from "./Section";

const tones = ["--accent", "--ink", "--muted"];

export default function Projects({ projects }) {
  if (!projects || projects.length === 0) return null;

  return (
    <Section id="projects" title="Projects">
      <ul className="space-y-16">
        {projects.map((p, i) => {
          const rows = [
            ["Problem", p.problem],
            ["What I built", p.built],
            ["Result", p.result],
          ].filter((r) => r[1]);

          return (
            <li key={p.title}>
              <article className="grid gap-6 lg:grid-cols-[220px_1fr]">
                <div
                  aria-hidden="true"
                  className="flex aspect-[4/3] items-end rounded-lg p-4 font-display text-6xl font-bold"
                  style={{ backgroundColor: `rgb(var(${tones[i % tones.length]}))`, color: "rgb(var(--paper))" }}
                >
                  {p.title.charAt(0).toUpperCase()}
                </div>

                <div>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-2xl font-semibold tracking-tight">{p.title}</h3>
                    {p.year && <span className="text-sm text-muted">{p.year}</span>}
                  </div>

                  {rows.length > 0 && (
                    <dl className="mt-4 space-y-2 leading-relaxed">
                      {rows.map(([label, text]) => (
                        <div key={label}>
                          <dt className="inline font-semibold">{label}: </dt>
                          <dd className="inline text-muted">{text}</dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  {p.tags && p.tags.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tools used">
                      {p.tags.map((t) => (
                        <li key={t} className="rounded bg-tint px-2.5 py-1 text-sm font-medium">
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}

                  {(p.live || p.repo) && (
                    <div className="mt-5 flex gap-6 font-medium">
                      {p.live && (
                        <a
                          href={p.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent underline underline-offset-4"
                        >
                          Live site<span className="sr-only"> for {p.title} (opens in new tab)</span>
                        </a>
                      )}
                      {p.repo && (
                        <a
                          href={p.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline underline-offset-4"
                        >
                          Source code<span className="sr-only"> for {p.title} (opens in new tab)</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}