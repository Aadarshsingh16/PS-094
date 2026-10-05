import { SectionHeader } from "@/components/atoms";
import interventions from "@/data/interventions.json";

const CASE_ID = "NHAA-DEMO-1042";

export default function SupportPage() {
  const active = interventions.filter((item) => item.caseId === CASE_ID);
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = active
    .filter((item) => item.scheduledDate && item.status !== "COMPLETED" && item.scheduledDate >= today)
    .sort((a, b) => String(a.scheduledDate).localeCompare(String(b.scheduledDate)));
  const next = upcoming[0];

  return (
    <main className="mx-auto max-w-3xl px-8 py-8">
      <SectionHeader
        title="Support"
        subtitle="People and services already linked to your case."
      />
      <div className="space-y-4">
        {active.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl border border-border-default bg-bg-surface p-5 shadow-sm"
          >
            <div className="app-row flex items-start justify-between gap-3">
              <h2 className="font-heading text-lg font-bold text-text-primary">{item.label}</h2>
              <span className="rounded-full bg-brand-subtle px-2.5 py-1 text-xs font-semibold text-brand-primary">
                {item.status.replaceAll("_", " ")}
              </span>
            </div>
            <p className="mt-2 text-sm text-text-secondary">
              {item.assignedOfficer ?? "Waiting to be assigned"}
            </p>
            {item.scheduledDate ? (
              <p className="mt-1 text-sm text-text-muted">
                {item.scheduledDate}
                {item.scheduledTime ? ` · ${item.scheduledTime}` : ""}
              </p>
            ) : null}
          </article>
        ))}
      </div>

      {next ? (
        <section className="mt-6 rounded-2xl bg-bg-accent-subtle p-5">
          <p className="text-xs font-semibold tracking-wide text-text-muted">NEXT SCHEDULED CONTACT</p>
          <p className="mt-2 font-heading text-lg font-bold text-text-primary">{next.label}</p>
          <p className="mt-1 text-sm text-text-secondary">
            {next.scheduledDate} · {next.scheduledTime}
          </p>
        </section>
      ) : null}

      <section className="mt-6 rounded-2xl border border-risk-critical bg-risk-critical-bg p-5">
        <h2 className="font-heading text-lg font-bold text-risk-critical-text">Not feeling safe?</h2>
        <p className="mt-2 text-sm text-risk-critical-text">Call 14566, free, any time.</p>
      </section>
    </main>
  );
}
