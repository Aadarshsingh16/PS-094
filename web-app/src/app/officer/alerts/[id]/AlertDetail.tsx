"use client";

import { useEffect, useState } from "react";
import { RiskBadge } from "@/components/atoms";
import alerts from "@/data/alerts.json";
import cases from "@/data/cases.json";
import { asRisk } from "@/lib/officer";

function parseClock(value: string) {
  const match = /^(\d{2}):(\d{2})$/.exec(value);
  if (!match) return null;
  return Number(match[1]) * 60 + Number(match[2]);
}

function formatClock(total: number) {
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function AlertDetail({ alertId }: { alertId: string }) {
  const alert = alerts.find((item) => item.id === alertId);
  const record = cases.find((item) => item.caseId === alert?.caseId);
  const [seconds, setSeconds] = useState(() => parseClock(alert?.slaRemaining ?? ""));
  const [notes, setNotes] = useState("");
  const [decision, setDecision] = useState("");

  useEffect(() => {
    if (seconds === null) return;
    const timer = setInterval(() => {
      setSeconds((current) => (current === null || current <= 0 ? 0 : current - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  if (!alert) {
    return <main className="px-8 py-10 text-text-secondary">This alert record is not available.</main>;
  }

  const factors = record?.riskFactors ?? alert.reasons.map((label) => ({ label, score: 1 }));
  const maxScore = Math.max(...factors.map((factor) => factor.score), 1);

  return (
    <main className="mx-auto max-w-3xl px-8 py-8">
      <div className="flex flex-wrap items-center gap-3">
        <RiskBadge level={asRisk(alert.severity)} size="lg" />
        <h1 className="font-heading text-heading-xl font-bold text-text-primary">{alert.userId}</h1>
      </div>
      <p className="mt-2 text-sm text-text-secondary">
        {alert.caseId} · {alert.status.replaceAll("_", " ")}
      </p>
      <p className="mt-4 font-heading text-3xl font-bold text-risk-critical">
        {seconds === null ? alert.slaRemaining : formatClock(seconds)}
      </p>

      <section className="mt-8 rounded-2xl bg-bg-accent-subtle p-5">
        <h2 className="font-heading text-lg font-bold text-text-primary">Why risk increased</h2>
        <ul className="mt-4 space-y-3">
          {factors.map((factor) => (
            <li key={factor.label}>
              <div className="flex justify-between text-sm text-text-secondary">
                <span>{factor.label}</span>
                <span className="font-semibold text-text-primary">+{factor.score}</span>
              </div>
              <svg viewBox="0 0 100 6" className="mt-1 h-1.5 w-full" aria-hidden="true">
                <rect width="100" height="6" rx="3" className="fill-bg-primary" />
                <rect width={(factor.score / maxScore) * 100} height="6" rx="3" className="fill-accent-lavender" />
              </svg>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6 rounded-2xl border border-border-default bg-bg-surface p-5">
        <h2 className="font-heading text-lg font-bold text-text-primary">Human review</h2>
        <label className="mt-4 block text-sm text-text-secondary">
          Notes
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            rows={4}
            className="mt-2 w-full rounded-xl border border-border-default bg-bg-primary px-3 py-2 text-sm text-text-primary"
          />
        </label>
        <button
          type="button"
          onClick={() => setDecision("Approved. A person confirmed the recommended support.")}
          className="mt-4 w-full rounded-xl bg-brand-primary py-4 text-sm font-semibold text-text-inverse"
        >
          APPROVE
        </button>
        <div className="phone-pair mt-3 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setDecision("Modify requested. A person will adjust the support.")}
            className="rounded-xl border border-border-default py-3 text-sm font-medium text-text-primary"
          >
            MODIFY
          </button>
          <button
            type="button"
            onClick={() => setDecision("Rejected. No support change will be made from this alert.")}
            className="rounded-xl border border-risk-critical py-3 text-sm font-medium text-risk-critical"
          >
            REJECT
          </button>
        </div>
        {decision ? <p className="mt-4 text-sm text-text-secondary">{decision}</p> : null}
      </section>
    </main>
  );
}
