import Reveal from "./Reveal";
import Card from "./Card";
import { getSkillIcon } from "@/lib/skillIcons";

function brandClass(hex) {
  const n = parseInt(hex, 16);
  const f = (c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  const L = 0.2126 * f((n >> 16) & 255) + 0.7152 * f((n >> 8) & 255) + 0.0722 * f(n & 255);
  if (L < 0.1) return "text-[color:var(--brand)] dark:text-ink";
  if (L > 0.85) return "text-ink dark:text-[color:var(--brand)]";
  return "text-[color:var(--brand)]";
}

export default function Skills({ skills, title }) {
  if (!skills || skills.length === 0) return null;

  return (
    <section id="skills" aria-labelledby="skills-title" className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <Reveal>
        <p className="font-mono text-sm text-accent">02 / Skills</p>
        <h2 id="skills-title" className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
          {title || "What I work with."}
        </h2>
      </Reveal>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((s, i) => (
          <li key={s.group} className="flex">
            <Card delay={i * 80}>
              <h3 className="font-display text-lg font-semibold tracking-tight">{s.group}</h3>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${s.group} skills`}>
                {(s.items || []).map((name) => {
                  const icon = getSkillIcon(name);
                  return (
                    <li key={name} className="flex items-center gap-2 rounded-full bg-tint px-3 py-1.5 dark:bg-highlight/30 text-sm">
                      {icon && (
                        <svg viewBox="0 0 24 24" aria-hidden="true" className={`h-4 w-4 shrink-0 ${brandClass(icon.hex)}`} style={{ "--brand": `#${icon.hex}` }} fill="currentColor">
                          <path d={icon.path} />
                        </svg>
                      )}
                      {name}
                    </li>
                  );
                })}
              </ul>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}