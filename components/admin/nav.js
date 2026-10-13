"use client";

export const tabs = [
  { id: "general", label: "General", desc: "Your name, role, intro, photo and bio." },
  { id: "skills", label: "Skills", desc: "Groups of skills, shown with their logos." },
  { id: "projects", label: "Projects", desc: "Add, order and feature your work." },
  { id: "experience", label: "Experience", desc: "Jobs and education, in the order you choose." },
  { id: "contact", label: "Contact", desc: "Email, phone, links and form topics." },
  { id: "inbox", label: "Inbox", desc: "Messages from your contact form." },
  { id: "colours", label: "Colours", desc: "Light and Dark palettes with a live preview." },
];

const iconPaths = {
  general: <path d="M3 11l9-8 9 8M5 10v10h14V10" />,
  skills: <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />,
  projects: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </>
  ),
  experience: (
    <>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </>
  ),
  contact: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  inbox: (
    <>
      <path d="M22 12h-6l-2 3h-4l-2-3H2" />
      <path d="M5.5 5h13l3.5 7v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z" />
    </>
  ),
  colours: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="8" cy="10" r="1" />
      <circle cx="12" cy="7.5" r="1" />
      <circle cx="16" cy="10" r="1" />
    </>
  ),
};

export function Icon({ id }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {iconPaths[id]}
    </svg>
  );
}