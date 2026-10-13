"use client";
import { Field, ListText, ArrayEditor } from "./ui";
import PhotoUpload from "./PhotoUpload";

export function General({ c, set }) {
  return (
    <div className="space-y-4">
      <PhotoUpload c={c} set={set} />
      <Field label="Your name" value={c.name} onChange={(v) => set({ name: v })} />
      <Field label="Your role" value={c.role} onChange={(v) => set({ role: v })} />
      <Field label="Logo letter (shown in the navbar)" value={c.logo} onChange={(v) => set({ logo: v.slice(0, 2) })} />
      <Field label="One-line intro" textarea rows={2} value={c.intro} onChange={(v) => set({ intro: v })} />
      <Field label="About section heading (the big title above your bio)" textarea rows={2} value={c.aboutTitle} onChange={(v) => set({ aboutTitle: v })} />
      <Field label="Projects section heading (default: Selected work.)" value={c.projectsTitle} onChange={(v) => set({ projectsTitle: v })} />
      <Field label="Skills section heading (default: What I work with.)" value={c.skillsTitle} onChange={(v) => set({ skillsTitle: v })} />
      <Field label="Experience section heading (default: My journey.)" value={c.experienceTitle} onChange={(v) => set({ experienceTitle: v })} />
      <Field label="Availability pill (leave empty to hide it)" value={c.available} onChange={(v) => set({ available: v })} />
      <Field label="Location (leave empty to hide it)" value={c.location} onChange={(v) => set({ location: v })} />
      <ListText label="About you" mode="paragraphs" rows={8} value={c.about || []} onChange={(v) => set({ about: v })} />
      <div>
        <p className="mb-3 text-sm font-medium">Numbers on the top section (example: 3+ and Years of experience)</p>
        <ArrayEditor
          items={c.stats || []}
          onChange={(v) => set({ stats: v })}
          blank={() => ({ value: "", label: "" })}
          addLabel="Add number"
          titleOf={(s, i) => s.value || `Number ${i + 1}`}
        >
          {(s, u) => (
            <div className="grid gap-3 sm:grid-cols-[120px_1fr]">
              <Field label="Number" value={s.value} onChange={(v) => u({ value: v })} />
              <Field label="Label" value={s.label} onChange={(v) => u({ label: v })} />
            </div>
          )}
        </ArrayEditor>
      </div>
    </div>
  );
}

export function SkillsEditor({ c, set }) {
  return (
    <ArrayEditor
      items={c.skills || []}
      onChange={(v) => set({ skills: v })}
      blank={() => ({ group: "", items: [] })}
      addLabel="Add skill group"
      titleOf={(s, i) => s.group || `Group ${i + 1}`}
    >
      {(s, u) => (
        <div className="space-y-3">
          <Field label="Group name" value={s.group} onChange={(v) => u({ group: v })} />
          <ListText label="Skills" mode="comma" value={s.items || []} onChange={(v) => u({ items: v })} />
        </div>
      )}
    </ArrayEditor>
  );
}

export function ExperienceEditor({ c, set }) {
  return (
    <ArrayEditor
      items={c.experience || []}
      onChange={(v) => set({ experience: v })}
      blank={() => ({ period: "", role: "", company: "", points: [] })}
      addLabel="Add experience"
      titleOf={(e, i) => e.role || `Entry ${i + 1}`}
    >
      {(e, u) => (
        <div className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Role or degree" value={e.role} onChange={(v) => u({ role: v })} />
            <Field label="Company or school" value={e.company} onChange={(v) => u({ company: v })} />
          </div>
          <Field label="Period (example: 2024 to 2025)" value={e.period} onChange={(v) => u({ period: v })} />
          <ListText label="What you did" mode="lines" value={e.points || []} onChange={(v) => u({ points: v })} />
        </div>
      )}
    </ArrayEditor>
  );
}