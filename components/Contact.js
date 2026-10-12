"use client";
import Section from "./Section";

export default function Contact({ contact }) {
  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Portfolio message from ${data.get("name")}`);
    const body = encodeURIComponent(`${data.get("message")}\n\n${data.get("name")}`);
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  }

  const field = "mt-1 w-full rounded-md border border-line bg-paper px-4 py-3 text-base text-ink";

  return (
    <Section id="contact" title="Contact">
      <p className="max-w-xl text-lg leading-relaxed">
        Have a project or a job in mind? Write to me at{" "}
        <a href={`mailto:${contact.email}`} className="font-medium text-accent underline underline-offset-4">
          {contact.email}
        </a>
        , or use the form. It opens your email app with the message ready to send.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 max-w-xl space-y-5">
        <div>
          <label htmlFor="name" className="font-medium">Your name</label>
          <input id="name" name="name" type="text" required autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor="message" className="font-medium">Message</label>
          <textarea id="message" name="message" rows={5} required className={field} />
        </div>
        <button
          type="submit"
          className="rounded-md bg-ink px-6 py-3 font-medium text-paper transition-colors hover:bg-accent"
        >
          Send message
        </button>
      </form>

      {contact.socials && contact.socials.length > 0 && (
        <ul className="mt-10 flex flex-wrap gap-6 font-medium">
          {contact.socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
              >
                {s.label}
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}