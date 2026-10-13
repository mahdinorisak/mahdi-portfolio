import GlassOrbs, { glass } from "./GlassOrbs";
import CountUp from "./CountUp";

export default function Hero({ site }) {
  const stats = (site.stats || []).filter((s) => s.value || s.label);
  const letter = (site.logo || site.name || "M").trim().slice(0, 1).toUpperCase();

  return (
    <section id="top" className="relative isolate overflow-x-clip px-3 pt-3 sm:px-4">
      <GlassOrbs />

      <div className={`relative isolate mx-auto max-w-6xl overflow-hidden rounded-[2rem] text-ink dark:text-white ${glass}`}>
        {site.photo ? (
          <>
            <img
              src={site.photo}
              alt={`Portrait of ${site.name}`}
              width="900"
              height="1100"
              className="absolute inset-y-0 right-0 -z-10 hidden h-full w-[58%] object-cover object-top md:block"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-white/85 via-white/25 to-transparent dark:from-surface dark:via-surface/25 md:block"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 hidden bg-gradient-to-t from-white/60 via-transparent to-transparent dark:from-surface/70 md:block"
            />
          </>
        ) : (
          <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -right-24 top-0 h-[32rem] w-[32rem] rounded-full bg-highlight/20 blur-3xl" />
            <span className="absolute -bottom-24 right-6 font-display text-[22rem] font-bold leading-none text-ink/5 dark:text-white/5 md:right-24">
              {letter}
            </span>
          </div>
        )}

        <div className="relative flex min-h-[32rem] flex-col justify-between gap-12 p-6 sm:p-8 md:min-h-[42rem] md:p-12">
          <div>
            {site.photo && (
              <div className="relative -mx-6 -mt-6 mb-8 h-72 overflow-hidden sm:-mx-8 sm:-mt-8 md:hidden">
                <img
                  src={site.photo}
                  alt={`Portrait of ${site.name}`}
                  width="900"
                  height="1100"
                  className="h-full w-full object-cover object-top"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/10 to-transparent dark:from-surface dark:via-surface/10"
                />
              </div>
            )}

            {site.available && (
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/60 px-3 py-1 text-xs font-medium backdrop-blur dark:border-white/15 dark:bg-white/5">
                <span className="h-2 w-2 animate-pulse rounded-full bg-accent" aria-hidden="true" />
                {site.available}
              </p>
            )}

            <h1>
              <span className="block text-lg font-medium text-accent md:text-xl">
                Hey <span aria-hidden="true">👋</span> I&apos;m {site.name}
              </span>
              <span className="mt-4 block max-w-xl font-display text-[clamp(2.75rem,8vw,5.5rem)] font-bold leading-[1.02] tracking-tight [overflow-wrap:anywhere]">
                {site.role}
              </span>
            </h1>

            <a
              href="#contact"
              className="mt-8 inline-block rounded-full bg-highlight px-7 py-3 font-semibold text-[#0B132B] shadow-[0_10px_30px_-8px_rgb(var(--highlight)/0.7)] transition hover:-translate-y-0.5 hover:opacity-95"
            >
              Hire me
            </a>
          </div>

          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            {site.intro && (
              <p className="max-w-xs text-sm leading-relaxed text-ink/70 dark:text-white/75">{site.intro}</p>
            )}
            {stats.length > 0 && (
              <ul className="flex flex-wrap gap-x-8 gap-y-5">
                {stats.map((s) => (
                  <li key={s.value + s.label} className="min-w-[6rem] border-b border-ink/20 pb-2 dark:border-white/25">
                    <p className="font-display text-3xl font-medium md:text-5xl"><CountUp value={s.value} /></p>
                    <p className="mt-1 text-xs text-ink/60 dark:text-white/70 md:text-sm">{s.label}</p>
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