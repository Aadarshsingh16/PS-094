import { SectionHeader } from "@/components/atoms";
import cases from "@/data/cases.json";

export default function MyCasePage() {
  const asha = cases.find((item) => item.caseId === "NHAA-DEMO-1042");
  const hearing = asha?.nextHearing
    ? new Date(`${asha.nextHearing}T00:00:00`).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      })
    : null;

  return (
    <main className="mx-auto max-w-3xl px-8 py-8">
      <SectionHeader title="My case" subtitle="Where your case stands, in plain language." />
      <section className="rounded-2xl border border-border-default bg-bg-surface p-6 shadow-sm">
        <p className="text-xs font-semibold tracking-wide text-text-muted">CASE ID</p>
        <p className="mt-1 font-heading text-2xl font-bold text-text-primary">{asha?.caseId}</p>
        <p className="mt-4 text-xs font-semibold tracking-wide text-text-muted">STAGE</p>
        <p className="mt-2 inline-flex rounded-full bg-bg-accent-subtle px-3 py-1 text-sm font-medium text-accent-lavender">
          {asha?.stage}
        </p>
      </section>

      <ol className="mt-6 space-y-4">
        {(asha?.journey ?? []).map((step) => (
          <li
            key={step.step}
            className="rounded-2xl border border-border-default bg-bg-surface px-5 py-4"
          >
            <p className="text-xs text-text-muted">{step.date}</p>
            <p className="mt-1 font-medium text-text-primary">{step.step}</p>
            <p className="mt-1 text-xs capitalize text-text-secondary">{step.status}</p>
          </li>
        ))}
      </ol>

      {hearing ? (
        <section className="mt-6 rounded-2xl bg-bg-accent-subtle p-5">
          <p className="font-heading text-lg font-bold text-text-primary">Next hearing: {hearing}</p>
        </section>
      ) : null}
    </main>
  );
}
