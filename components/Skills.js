import Section from "./Section";

export default function Skills({ skills }) {
  if (!skills || skills.length === 0) return null;

  return (
    <Section id="skills" title="Skills">
      <dl className="grid gap-8 sm:grid-cols-2">
        {skills.map((s) => (
          <div key={s.group} className="border-l-2 border-accent pl-5">
            <dt className="font-display text-lg font-semibold">{s.group}</dt>
            <dd className="mt-2 leading-relaxed text-muted">{s.items.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}