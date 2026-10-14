import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import { getSettings } from "@/lib/settings";
import { siteUrl } from "@/data/seo";
import { fixUrl } from "@/lib/url";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { content: c } = await getSettings();
  const contact = c.contact || { email: "", socials: [] };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: c.name,
    jobTitle: c.role,
    url: siteUrl,
    email: contact.email,
    sameAs: (contact.socials || []).map((s) => fixUrl(s.href)),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar name={c.name} logo={c.logo} />
      <main id="main">
        <Hero site={c} />
        <About site={c} />
        <Skills skills={c.skills} title={c.skillsTitle} />
        <Projects projects={c.projects} title={c.projectsTitle} />
        <Experience experience={c.experience} title={c.experienceTitle} />
        <Contact contact={contact} name={c.name} logo={c.logo} />
      </main>
    </>
  );
}