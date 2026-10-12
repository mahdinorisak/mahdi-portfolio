import Section from "./Section";

export default function Experience({ experience }) {
  if (!experience || experience.length === 0) return null;

  return (
    <Section id="experience" title="Experience">
      <ol className="space-y-10 border-l-2 border-line pl-6">
        {experience.map((e) => (
          <li key={e.role + e.period} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[31px] top-2 h-3 w-3 rounded-full bg-accent"
            />
            <p className="text-sm text-muted">{e.period}</p>
            <h3 className="font-display text-xl font-semibold">{e.role}</h3>
            <p className="font-medium text-muted">{e.company}</p>
            {e.points && e.points.length > 0 && (
              <ul className="mt-3 list-disc space-y-1 pl-5 leading-relaxed">
                {e.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </Section>
  );
}