import { getSkillIcon } from "@/lib/skillIcons";

export default function Hero({ site }) {
  const stats = (site.stats || []).filter((s) => s.value || s.label);
  const icons = [];
  for (const g of site.skills || []) {
    for (const name of g.items || []) {
      const ic = getSkillIcon(name);
      if (ic && !icons.some((i) => i.title === ic.title)) icons.push(ic);
    }
  }
  const shown = icons.slice(0, 6);
  const letter = (site.logo || site.name || "M").trim().slice(0, 1).toUpperCase();

  return (
    <section id="top" className="px-3 pt-3 sm:px-4">
      <div className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[#050A18] text-white">
        {site.photo ? (
          <img
            src={site.photo}
            alt={`Portrait of ${site.name}`}
            width="900"
            height="1100"
            className="absolute inset-y-0 right-0 -z-10 h-full w-full object-cover object-top md:w-[62%]"
          />
        ) : (
          <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -right-24 top-0 h-[32rem] w-[32rem] rounded-full bg-highlight/20 blur-3xl" />
            <span className="absolute -bottom-24 right-6 font-display text-[22rem] font-bold leading-none text-white/5 md:right-24">
              {letter}
            </span>
          </div>
        )}

        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-[#050A18] via-[#050A18]/55 to-[#050A18]/20 md:bg-gradient-to-r md:from-[#050A18] md:via-[#050A18]/25 md:to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 hidden bg-gradient-to-t from-[#050A18]/70 via-transparent to-transparent md:block"
        />

        <div className="relative flex min-h-[36rem] flex-col justify-between gap-16 p-6 sm:p-8 md:min-h-[42rem] md:p-12">
          <div>
            {site.available && (
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium backdrop-blur">
                <span className="h-2 w-2 animate-pulse rounded-full bg-highlight" aria-hidden="true" />
                {site.available}
              </p>
            )}

            <h1>
              <span className="block text-lg font-medium text-highlight md:text-xl">
                Hey <span aria-hidden="true">👋</span> I&apos;m {site.name}
              </span>
              <span className="mt-4 block max-w-xl font-display text-[clamp(2.75rem,8vw,5.5rem)] font-bold leading-[1.02] tracking-tight [overflow-wrap:anywhere]">
                {site.role}
              </span>
            </h1>

            <a
              href="#contact"
              className="mt-8 inline-block rounded-full bg-highlight px-7 py-3 font-semibold text-[#0B132B] transition-opacity hover:opacity-90"
            >
              Hire me
            </a>
          </div>

          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            {site.intro && (
              <p className="max-w-xs text-sm leading-relaxed text-white/75">{site.intro}</p>
            )}
            {stats.length > 0 && (
              <ul className="flex flex-wrap gap-x-8 gap-y-5">
                {stats.map((s) => (
                  <li key={s.value + s.label} className="min-w-[6rem] border-b border-white/25 pb-2">
                    <p className="font-display text-3xl font-medium md:text-5xl">{s.value}</p>
                    <p className="mt-1 text-xs text-white/70 md:text-sm">{s.label}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}