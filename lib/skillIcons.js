import * as all from "simple-icons";

const list = Object.values(all).filter((i) => i && i.slug && i.path);

const norm = (s) =>
  String(s)
    .toLowerCase()
    .replace(/\+/g, "plus")
    .replace(/#/g, "sharp")
    .replace(/\./g, "dot")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]/g, "");

const bySlug = new Map();
for (const i of list) {
  bySlug.set(i.slug, i);
  bySlug.set(norm(i.title), i);
}

// Friendly names that do not match the logo name exactly.
const alias = {
  html: ["html5"],
  css: ["css", "css3"],
  js: ["javascript"],
  ts: ["typescript"],
  nextjs: ["nextdotjs"],
  reactjs: ["react"],
  nodejs: ["nodedotjs"],
  vscode: ["visualstudiocode"],
  tailwind: ["tailwindcss"],
  postgres: ["postgresql"],
  mongo: ["mongodb"],
  vue: ["vuedotjs"],
  vuejs: ["vuedotjs"],
  expressjs: ["express"],
};

export function getSkillIcon(name) {
  const key = norm(name);
  const tries = [...(alias[key] || []), key];
  for (const t of tries) {
    const hit = bySlug.get(t);
    if (hit) return { title: hit.title, path: hit.path };
  }
  return null;
}