import Section from "./Section";

export default function About({ site }) {
  if (!site.about || site.about.length === 0) return null;

  return (
    <Section id="about" title="About me">
      <div className="max-w-xl space-y-5 text-lg leading-relaxed">
        {site.about.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        {site.location && <p className="text-base text-muted">Based in {site.location}</p>}
      </div>
    </Section>
  );
}