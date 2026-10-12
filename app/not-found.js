import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-32">
      <p className="font-display text-7xl font-bold tracking-tighter text-accent">404</p>
      <h1 className="mt-4 font-display text-3xl font-semibold">This page does not exist</h1>
      <Link
        href="/"
        className="mt-8 inline-block rounded-md bg-ink px-6 py-3 font-medium text-paper transition-colors hover:bg-accent"
      >
        Back to the home page
      </Link>
    </main>
  );
}