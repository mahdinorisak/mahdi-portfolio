
export default function Hero({ site }) {
  return (
    <section id="top" className="mx-auto max-w-5xl px-6 pb-20 pt-16 md:pb-28 md:pt-28">
      {site.available && (
        <p className="mb-8 inline-flex items-center gap-2 rounded-full bg-tint px-4 py-1.5 text-sm font-medium">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-accent" aria-hidden="true" />
          {site.available}
        </p>
      )}

      <h1 className="font-display text-[clamp(3.25rem,13vw,9.5rem)] font-bold leading-[0.9] tracking-tighter [overflow-wrap:anywhere]">
        {site.name}
      </h1>

      {site.role && (
        <p className="mt-6 font-display text-2xl font-medium text-accent md:text-3xl">{site.role}</p>
      )}

      {site.intro && (
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{site.intro}</p>
      )}

      <div className="mt-10 flex flex-wrap gap-4">
        <a
          href="#projects"
          className="rounded-md bg-ink px-6 py-3 font-medium text-paper transition-colors hover:bg-accent"
        >
          See my projects
        </a>
        <a
          href="#contact"
          className="rounded-md border border-ink px-6 py-3 font-medium transition-colors hover:bg-ink hover:text-paper"
        >
          Contact me
        </a>
      </div>
    </section>
  );
}