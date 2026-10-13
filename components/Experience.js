import Reveal from "./Reveal";
import Card from "./Card";

export default function Experience({ experience, title }) {
  if (!experience || experience.length === 0) return null;

  return (
    <section id="experience" aria-labelledby="experience-title" className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <Reveal>
        <p className="font-mono text-sm text-accent">04 / Experience</p>
        <h2 id="experience-title" className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
          {title || "My journey."}
        </h2>
      </Reveal>

      <ol className="relative mt-10 space-y-5 border-l border-line pl-6 md:pl-8">
        {experience.map((e, i) => (
          <li key={e.role + e.period} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[30px] top-8 h-3 w-3 rounded-full bg-accent ring-4 ring-paper md:-left-[38px]"
            />
            <Card delay={i * 80} className="sm:p-6">
              {e.period && (
                <p className="inline-block rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
                  {e.period}
                </p>
              )}
              <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">{e.role}</h3>
              {e.company && <p className="font-medium text-muted">{e.company}</p>}

              {e.points && e.points.length > 0 && (
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
                  {e.points.map((pt) => (
                    <li key={pt} className="flex gap-3">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </li>
        ))}
      </ol>
    </section>
  );
}