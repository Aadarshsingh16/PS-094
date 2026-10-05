"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { RiskBadge, SectionHeader } from "@/components/atoms";
import alerts from "@/data/alerts.json";
import { asRisk } from "@/lib/officer";

const TABS = ["All", "Critical", "High", "Pending review"] as const;

export default function AlertsPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");

  const rows = useMemo(() => {
    return alerts.filter((item) => {
      if (tab === "Critical") return item.severity === "CRITICAL";
      if (tab === "High") return item.severity === "HIGH";
      if (tab === "Pending review") return item.status === "PENDING_REVIEW";
      return true;
    });
  }, [tab]);

  return (
    <main className="px-8 py-8">
      <SectionHeader title="Alerts" subtitle="Signals waiting for a person to review." />
      <div className="mb-5 flex flex-wrap gap-2">
        {TABS.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              tab === item ? "bg-brand-primary text-text-inverse" : "bg-bg-surface text-text-secondary"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        {rows.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl border border-border-default bg-bg-surface p-5 shadow-sm"
          >
            <div className="app-row flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <RiskBadge level={asRisk(item.severity)} />
                  <span className="text-sm font-medium text-text-primary">{item.userId}</span>
                  <span className="text-xs text-text-muted">{item.caseId}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.reasons.map((reason) => (
                    <span
                      key={reason}
                      className="rounded-full bg-bg-accent-subtle px-2.5 py-1 text-xs text-accent-lavender"
                    >
                      {reason}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <p className="font-heading text-lg font-bold text-risk-critical">{item.slaRemaining}</p>
                <Link
                  href={`/officer/alerts/${item.id}`}
                  className="mt-3 inline-flex rounded-xl bg-brand-primary px-4 py-2 text-sm font-medium text-text-inverse"
                >
                  Review
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
