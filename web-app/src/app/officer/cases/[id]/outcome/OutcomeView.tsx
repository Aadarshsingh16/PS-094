"use client";

import { RiskBadge } from "@/components/atoms";
import { CountUp } from "@/components/molecules/CountUp";
import { DistressTrend } from "@/components/molecules/DistressTrend";
import interventions from "@/data/interventions.json";
import signals from "@/data/signals.json";
import timeline from "@/data/riskTimeline.json";
import { findCaseByRoute } from "@/lib/officer";

export function OutcomeView({ caseKey }: { caseKey: string }) {
  const record = findCaseByRoute(caseKey);
  if (!record || record.caseId !== "NHAA-DEMO-1042") {
    return <main className="px-8 py-10 text-text-secondary">This case has no recorded outcome yet.</main>;
  }

  const after = timeline.improving[timeline.improving.length - 1]?.score ?? record.currentDistress;
  const followUp = interventions
    .filter((item) => item.caseId === record.caseId && item.status !== "COMPLETED" && item.scheduledDate)
    .sort((a, b) => String(a.scheduledDate).localeCompare(String(b.scheduledDate)))[0];

  return (
    <main className="space-y-6 px-8 py-8">
      <header>
        <h1 className="font-heading text-heading-xl font-bold text-text-primary">{record.displayName}</h1>
        <p className="mt-1 text-sm text-text-secondary">
          {record.caseId} · {record.userId}
        </p>
      </header>

      <p className="rounded-2xl bg-brand-subtle px-4 py-3 text-sm font-medium text-brand-primary">{signals.outcome}</p>

      <section className="phone-pair grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border-default bg-bg-surface p-5">
          <p className="text-sm text-text-secondary">Before</p>
          <p className="mt-2 font-heading text-display-2xl font-bold text-text-primary">{record.currentDistress}</p>
          <div className="mt-3">
            <RiskBadge level="HIGH" size="lg" />
          </div>
        </div>
        <div className="rounded-2xl border border-border-default bg-bg-surface p-5">
          <p className="text-sm text-text-secondary">After</p>
          <p className="mt-2 font-heading text-display-2xl font-bold text-text-primary">
            <CountUp from={record.currentDistress} to={after} />
          </p>
          <div className="mt-3">
            <RiskBadge level="MEDIUM" size="lg" />
          </div>
        </div>
      </section>

      <section className="rounded-2xl bg-bg-dark-chart p-6 text-text-inverse">
        <h2 className="font-heading text-lg font-bold">Distress signal</h2>
        <p className="mt-1 text-sm text-text-muted">Drop across the last weeks</p>
        <DistressTrend data={timeline.improving} highlightWeek="W8" highlightScore={after} />
      </section>

      {followUp ? (
        <section className="max-w-md rounded-2xl border border-border-default bg-bg-surface p-5">
          <h2 className="font-heading text-lg font-bold text-text-primary">Follow-up</h2>
          <p className="mt-2 text-sm text-text-secondary">{followUp.label}</p>
          <p className="mt-1 font-medium text-text-primary">
            {followUp.scheduledDate} · {followUp.scheduledTime}
          </p>
          <p className="mt-1 text-sm text-text-secondary">{followUp.assignedOfficer}</p>
        </section>
      ) : null}
    </main>
  );
}
