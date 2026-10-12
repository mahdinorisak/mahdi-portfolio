
export default function Footer({ name }) {
  return (
    <footer className="border-t border-line py-8">
      <p className="mx-auto max-w-5xl px-6 text-sm text-muted">
        &copy; {new Date().getFullYear()} {name}. Built with Next.js and Tailwind CSS.
      </p>
    </footer>
  );
}