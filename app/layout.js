import { Bricolage_Grotesque, Figtree, Fira_Code } from "next/font/google";
import "./globals.css";
import { getSettings } from "@/lib/settings";
import { siteUrl } from "@/data/seo";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Figtree({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = Fira_Code({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export async function generateMetadata() {
  const { content: site } = await getSettings();
  const title = `${site.name} | ${site.role}`;
  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: `%s | ${site.name}` },
    description: site.intro,
    openGraph: { title, description: site.intro, url: siteUrl, siteName: site.name, type: "website" },
    twitter: { card: "summary_large_image", title, description: site.intro },
  };
}

const KEYS = ["paper", "ink", "muted", "line", "accent", "tint", "highlight", "surface"];

function rgb(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex || "");
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
}

function vars(palette) {
  return KEYS.map((k) => {
    const c = rgb(palette && palette[k]);
    return c ? `--${k}:${c};` : "";
  }).join("");
}

// Applies the saved theme before the page paints, so there is no flash.
const themeScript = `(function(){try{var t=localStorage.getItem("theme")||"system";var d=t==="dark"||(t==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;

export default async function RootLayout({ children }) {
  const { theme } = await getSettings();
  const css = `html:root{${vars(theme.light)}}html.dark{${vars(theme.dark)}}`;

  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: css }} />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}