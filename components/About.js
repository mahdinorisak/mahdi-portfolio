import GlassOrbs, { glass } from "./GlassOrbs";

const bars = [
  "left-0 w-[20%] h-[52%]",
  "left-[16%] w-[22%] h-[78%]",
  "left-[34%] w-[26%] h-[100%]",
  "left-[58%] w-[22%] h-[78%]",
  "left-[78%] w-[22%] h-[52%]",
];

export default function About({ site }) {
  const paragraphs = site.about || [];
  const title = site.aboutTitle || "";
  if (paragraphs.length === 0 && !title) return null;

  const letter = (site.logo || site.name || "M").trim().slice(0, 1).toUpperCase();
  const base = `${site.role || "Developer"} \u2022 `;
  const ring = base.repeat(Math.max(1, Math.round(28 / base.length)));

  return (
    <section id="about" aria-labelledby="about-title" className="relative isolate overflow-x-clip px-3 pt-3 sm:px-4">
      <GlassOrbs flip />

      <div
        className={`relative mx-auto grid max-w-6xl items-center gap-8 rounded-md rounded-tr-[5rem] p-5 text-ink sm:p-8 md:grid-cols-[0.8fr_1.2fr] md:gap-10 md:rounded-tr-[8rem] md:p-10 dark:text-white ${glass}`}
      >
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[16rem] md:max-w-xs">
          <div aria-hidden="true" className="absolute inset-0">
            {bars.map((b) => (
              <span key={b} className={`absolute bottom-0 border border-ink/10 dark:border-white/15 ${b}`} />
            ))}
          </div>

          {site.photo ? (
            <>
              <img
                src={site.photo}
                alt={`Portrait of ${site.name}`}
                width="700"
                height="800"
                loading="lazy"
                className="absolute bottom-0 left-1/2 h-[92%] w-[78%] -translate-x-1/2 rounded-2xl object-cover object-top grayscale"
              />
              <div
                aria-hidden="true"
                className="absolute bottom-0 left-1/2 h-1/4 w-[78%] -translate-x-1/2 rounded-b-2xl bg-gradient-to-t from-white/60 to-transparent dark:from-surface"
              />
            </>
          ) : (
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-1/2 flex h-[92%] w-[78%] -translate-x-1/2 items-center justify-center rounded-2xl bg-ink/5 font-display text-9xl font-bold text-ink/10 dark:bg-white/5 dark:text-white/10"
            >
              {letter}
            </div>
          )}
        </div>

        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-accent">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 3 3 8l9 5 9-5-9-5zM3 13l9 5 9-5" />
            </svg>
            About me
          </p>

          <h2 id="about-title" className="mt-4 font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:max-w-md md:text-4xl">
            {title || `Hi, I am ${site.name}`}
          </h2>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-ink/75 dark:text-white/75">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            {site.location && <p className="text-sm text-ink/55 dark:text-white/55">Based in {site.location}</p>}
          </div>

          <a
            href="#projects"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-highlight px-8 py-4 font-semibold text-[#0B132B] shadow-[0_10px_30px_-8px_rgb(var(--highlight)/0.7)] transition hover:-translate-y-0.5 hover:opacity-95"
          >
            See my projects
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>

        <div
          aria-hidden="true"
          className="absolute right-3 top-3 h-20 w-20 rounded-full border border-white/70 bg-white/60 backdrop-blur-md sm:h-24 sm:w-24 md:right-4 md:top-4 dark:border-transparent dark:bg-[#0E3B22]"
        >
          <svg viewBox="0 0 120 120" className="h-full w-full animate-[spin_20s_linear_infinite] text-accent">
            <defs>
              <path id="badge-ring" d="M 60,60 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0" />
            </defs>
            <text fill="currentColor" fontSize="10" fontWeight="600" letterSpacing="1">
              <textPath href="#badge-ring" textLength="258" lengthAdjust="spacing">{ring}</textPath>
            </text>
          </svg>
          <span className="absolute inset-0 flex items-center justify-center font-display text-xl font-bold text-accent">
            {letter}
          </span>
        </div>
      </div>
    </section>
  );
}