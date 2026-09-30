import { SectionHeader } from "@/components/atoms";
import interventions from "@/data/interventions.json";

const CATEGORIES = [
  { type: "COUNSELLING", title: "Counselling" },
  { type: "PROTECTION", title: "Protection" },
  { type: "LEGAL_AID", title: "Legal" },
  { type: "FINANCIAL", title: "Financial" },
  { type: "REHABILITATION", title: "Rehabilitation" },
] as const;

export default function InterventionsPage() {
  return (
    <main className="px-8 py-8">
      <SectionHeader title="Interventions" subtitle="Support linked to demo cases. A person tracks the outcome." />
      <div className="grid gap-4 md:grid-cols-2">
        {CATEGORIES.map((category) => {
          const record =
            interventions.find((item) => item.type === category.type && item.status !== "COMPLETED") ??
            interventions.find((item) => item.type === category.type);
          return (
            <article key={category.type} className="rounded-2xl border border-border-default bg-bg-surface p-5 shadow-sm">
              <h2 className="font-heading text-lg font-bold text-text-primary">{category.title}</h2>
              {record ? (
                <>
                  <p className="mt-2 text-sm text-text-secondary">{record.userId}</p>
                  <span className="mt-3 inline-flex rounded-full bg-brand-subtle px-2.5 py-1 text-xs font-semibold text-brand-primary">
                    {record.status.replaceAll("_", " ")}
                  </span>
                  <p className="mt-3 text-sm text-text-secondary">{record.assignedOfficer ?? "Unassigned"}</p>
                  <p className="mt-1 text-sm text-text-muted">
                    Follow-up {record.scheduledDate ?? "not set"}
                    {record.scheduledTime ? ` · ${record.scheduledTime}` : ""}
                  </p>
                </>
              ) : (
                <p className="mt-2 text-sm text-text-muted">No record in the demo set.</p>
              )}
            </article>
          );
        })}
      </div>
    </main>
  );
}
