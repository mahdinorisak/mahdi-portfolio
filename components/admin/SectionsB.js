"use client";
import { Field, ListText, ArrayEditor } from "./ui";

export function ProjectsEditor({ c, set }) {
  return (
    <ArrayEditor
      items={c.projects || []}
      onChange={(v) => set({ projects: v })}
      blank={() => ({ title: "", year: "", problem: "", built: "", result: "", tags: [], live: "", repo: "" })}
      addLabel="Add project"
      titleOf={(p, i) => p.title || `Project ${i + 1}`}
    >
      {(p, u) => (
        <div className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-[1fr_120px]">
            <Field label="Title" value={p.title} onChange={(v) => u({ title: v })} />
            <Field label="Year" value={p.year} onChange={(v) => u({ year: v })} />
          </div>
          <Field label="What problem did it solve?" textarea rows={2} value={p.problem} onChange={(v) => u({ problem: v })} />
          <Field label="What did you build?" textarea rows={2} value={p.built} onChange={(v) => u({ built: v })} />
          <Field label="What was the result?" textarea rows={2} value={p.result} onChange={(v) => u({ result: v })} />
          <ListText label="Tools used" mode="comma" value={p.tags || []} onChange={(v) => u({ tags: v })} />
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Live website link" type="url" value={p.live} onChange={(v) => u({ live: v })} />
            <Field label="Code link (GitHub)" type="url" value={p.repo} onChange={(v) => u({ repo: v })} />
          </div>
        </div>
      )}
    </ArrayEditor>
  );
}

export function ContactEditor({ c, set }) {
  const ct = c.contact || { email: "", socials: [] };
  return (
    <div className="space-y-6">
      <Field label="Contact email" type="email" value={ct.email} onChange={(v) => set({ contact: { ...ct, email: v } })} />
      <div>
        <p className="mb-3 text-sm font-medium">Social links</p>
        <ArrayEditor
          items={ct.socials || []}
          onChange={(v) => set({ contact: { ...ct, socials: v } })}
          blank={() => ({ label: "", href: "" })}
          addLabel="Add link"
          titleOf={(s, i) => s.label || `Link ${i + 1}`}
        >
          {(s, u) => (
            <div className="grid gap-3 sm:grid-cols-[160px_1fr]">
              <Field label="Name (example: GitHub)" value={s.label} onChange={(v) => u({ label: v })} />
              <Field label="Link" type="url" value={s.href} onChange={(v) => u({ href: v })} />
            </div>
          )}
        </ArrayEditor>
      </div>
    </div>
  );
}