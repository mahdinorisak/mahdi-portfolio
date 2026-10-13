export const glass =
  "border border-white/70 bg-white/45 shadow-[0_20px_60px_-20px_rgba(11,19,43,0.25)] backdrop-blur-2xl dark:border-transparent dark:bg-surface dark:shadow-none dark:backdrop-blur-none";

export default function GlassOrbs({ flip = false }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
      <div
        className={`absolute h-80 w-80 rounded-full bg-highlight/50 blur-3xl ${
          flip ? "-top-6 right-[8%]" : "-top-4 left-[6%]"
        }`}
      />
      <div
        className={`absolute h-96 w-96 rounded-full bg-[#7C9CFF]/40 blur-3xl ${
          flip ? "bottom-0 left-[2%]" : "right-[2%] top-1/3"
        }`}
      />
      <div className="absolute -bottom-10 left-1/3 h-72 w-72 rounded-full bg-[#C9A7FF]/35 blur-3xl" />
    </div>
  );
}