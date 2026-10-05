"use client";

import { useState } from "react";
import Link from "next/link";
import { RiskBadge } from "@/components/atoms";
import { DistressTrend } from "@/components/molecules/DistressTrend";
import { RiskAnalysis } from "@/components/molecules/RiskAnalysis";
import alerts from "@/data/alerts.json";
import interventions from "@/data/interventions.json";
import timeline from "@/data/riskTimeline.json";
import { useDemoState } from "@/lib/demoState";
import { asRisk, findCaseByRoute } from "@/lib/officer";

const TABS = ["Overview", "Risk Analysis", "Interventions", "History"] as const;

export function CaseDetail({ caseKey }: { caseKey: string }) {
  const record = findCaseByRoute(caseKey);
  const [tab, setTab] = useState<(typeof TABS)[number]>("Overview");
  const [note, setNote] = useState("");
  const caseAlerts = alerts.filter((item) => item.caseId === record?.caseId);
  const caseInterventions = interventions.filter((item) => item.caseId === record?.caseId);
  const series =
    record?.caseId === "NHAA-DEMO-1042" ? timeline.escalating : timeline.stable;

  if (!record) {
    return <main className="px-8 py-10 text-text-secondary">This case record is not available.</main>;
  }

  return (
    <main className="px-8 py-8">
      <header className="rounded-2xl border border-border-default bg-bg-surface p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-heading text-heading-xl font-bold text-text-primary">{record.displayName}</h1>
            <p className="mt-1 text-sm text-text-secondary">
              {record.caseId} · {record.userId}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {record.caseId === "NHAA-DEMO-1042" && (
              <button
                type="button"
                onClick={() => {
                  setTab("Risk Analysis");
                  useDemoState.getState().autoPlay();
                }}
                className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition hover:bg-slate-800 active:scale-95"
              >
                <span>▶</span>
                <span>RUN SIGNAL ANALYSIS</span>
              </button>
            )}
            <span className="rounded-full bg-bg-accent-subtle px-3 py-1 text-xs font-medium text-accent-lavender">
              {record.stage}
            </span>
            <span className="rounded-full bg-brand-subtle px-3 py-1 text-xs font-medium text-brand-primary">
              {record.consent ? "Consent on" : "Consent pending"}
            </span>
            <RiskBadge level={asRisk(record.riskLevel)} size="lg" />
          </div>
        </div>
      </header>

      <div className="tab-scroller mt-6 flex gap-2 border-b border-border-subtle">
        {TABS.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={`px-4 py-3 text-sm font-medium ${
              tab === item ? "border-b-2 border-brand-primary text-brand-primary" : "text-text-secondary"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {tab === "Risk Analysis" && record.caseId === "NHAA-DEMO-1042" ? (
        <RiskAnalysis
          userId={record.userId}
          baseline={record.baselineDistress}
          current={record.currentDistress}
          factors={record.riskFactors}
          series={series}
        />
      ) : null}

      {tab === "Overview" || (tab === "Risk Analysis" && record.caseId !== "NHAA-DEMO-1042") ? (
        <div className="phone-stack mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <section className="rounded-2xl bg-bg-dark-chart p-5 text-text-inverse">
            <h2 className="font-heading text-lg font-bold">Well-being</h2>
            <p className="mt-1 text-sm text-text-muted">W1–W8 distress signal</p>
            <DistressTrend data={series} highlightWeek="W8" highlightScore={series[series.length - 1]?.score ?? 0} />
          </section>
          <section className="rounded-2xl border border-border-default bg-bg-surface p-5">
            <h2 className="font-heading text-lg font-bold text-text-primary">
              {tab === "Risk Analysis" ? "Why risk increased" : "Key risk factors"}
            </h2>
            <ul className="mt-4 space-y-3">
              {record.riskFactors.map((factor) => (
                <li key={factor.label} className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">{factor.label}</span>
                  <span className="font-heading font-bold text-text-primary">+{factor.score}</span>
                </li>
              ))}
            </ul>
          </section>
          {tab === "Overview" ? (
            <section className="rounded-2xl border border-border-default bg-bg-surface p-5 lg:col-span-2">
              <h2 className="font-heading text-lg font-bold text-text-primary">Recent events</h2>
              <ul className="mt-4 space-y-3">
                {(record.journey ?? []).map((step) => (
                  <li key={step.step} className="text-sm text-text-secondary">
                    <span className="font-medium text-text-primary">{step.date}</span> · {step.step}
                  </li>
                ))}
                {caseAlerts.map((item) => (
                  <li key={item.id} className="text-sm text-text-secondary">
                    <span className="font-medium text-text-primary">{item.id}</span> · {item.reasons[0]}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      ) : null}

      {tab === "Interventions" ? (
        <ul className="mt-6 space-y-3">
          {caseInterventions.map((item) => (
            <li key={item.id} className="rounded-2xl border border-border-default bg-bg-surface p-4">
              <p className="font-heading font-bold text-text-primary">{item.label}</p>
              <p className="mt-1 text-sm text-text-secondary">
                {item.status.replaceAll("_", " ")} · {item.assignedOfficer ?? "Unassigned"}
              </p>
            </li>
          ))}
        </ul>
      ) : null}

      {tab === "History" ? (
        <ul className="mt-6 space-y-3">
          {caseAlerts.map((item) => (
            <li key={item.id} className="rounded-2xl border border-border-default bg-bg-surface p-4 text-sm">
              <p className="font-medium text-text-primary">{item.id}</p>
              <p className="mt-1 text-text-secondary">{item.reasons.join(" · ")}</p>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="phone-actions mt-8 flex flex-wrap gap-3">
        <Link href="/officer/alerts" className="rounded-xl bg-brand-primary px-5 py-3 text-sm font-medium text-text-inverse">
          Create Alert
        </Link>
        <button
          type="button"
          onClick={() => setNote("Follow-up queued for human review.")}
          className="rounded-xl border border-border-default px-5 py-3 text-sm font-medium text-text-primary"
        >
          Schedule Follow-up
        </button>
        <button
          type="button"
          onClick={() => setNote("Responder assignment queued for human review.")}
          className="rounded-xl border border-border-default px-5 py-3 text-sm font-medium text-text-primary"
        >
          Assign Responder
        </button>
      </div>
      {note ? <p className="mt-3 text-sm text-text-secondary">{note}</p> : null}
    </main>
  );
}
