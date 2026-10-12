import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getSettings } from "@/lib/settings";
import { siteUrl } from "@/data/seo";

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
    sameAs: (contact.socials || []).map((s) => s.href),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar name={c.name} />
      <main id="main">
        <Hero site={c} />
        <About site={c} />
        <Skills skills={c.skills} />
        <Projects projects={c.projects} />
        <Experience experience={c.experience} />
        <Contact contact={contact} />
      </main>
      <Footer name={c.name} />
    </>
  );
}