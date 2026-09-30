"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check } from "lucide-react";
import { MetricCard, RiskBadge, TopBar } from "@/components/atoms";
import { DistressTrend } from "@/components/molecules/DistressTrend";
import { RiskDonut } from "@/components/molecules/RiskDonut";
import alerts from "@/data/alerts.json";
import cases from "@/data/cases.json";
import dashboard from "@/data/dashboard.json";
import timeline from "@/data/riskTimeline.json";
import { asRisk, casePath, scoreTrend } from "@/lib/officer";

const ARROWS = { up: "▲", down: "▼", flat: "" };

export default function OfficerDashboardPage() {
  const router = useRouter();
  const metrics = dashboard.metrics;
  const maxFactor = Math.max(...dashboard.whyRisk.factors.map((factor) => factor.score));

  return (
    <div>
      <TopBar
        greeting={dashboard.greeting}
        subtitle={dashboard.subtitle}
        notificationCount={alerts.length}
        userInitials="PS"
        showSearch
      />
      <div className="space-y-6 px-8 py-6">
        <div className="grid grid-cols-4 gap-4">
          <MetricCard
            id="metric-cases"
            title={metrics.assignedCases.title}
            value={metrics.assignedCases.value}
            chip={{ value: metrics.assignedCases.chip, direction: "neutral" }}
            sparklineData={metrics.assignedCases.sparkline}
            sparklineColor="var(--color-risk-low)"
          />
          <MetricCard
            id="metric-alerts"
            title={metrics.activeAlerts.title}
            value={metrics.activeAlerts.value}
            chip={{ value: metrics.activeAlerts.chip, direction: "up" }}
            sparklineData={metrics.activeAlerts.sparkline}
            sparklineColor="var(--color-risk-critical)"
          />
          <MetricCard
            id="metric-sla"
            title={metrics.sla.title}
            value={metrics.sla.value}
            subLabel={metrics.sla.target}
            progressBar={{ value: metrics.sla.percent, max: 100, color: "var(--color-brand-primary)" }}
          />
          <MetricCard
            id="metric-distress"
            title={metrics.distress.title}
            value={metrics.distress.value}
            chip={{ value: metrics.distress.chip, direction: "up" }}
            sparklineData={metrics.distress.sparkline}
            sparklineColor="var(--color-accent-lavender)"
          />
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)_320px] items-start gap-6">
          <div className="space-y-6">
            <section className="rounded-2xl bg-bg-dark-chart p-6 text-text-inverse">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-heading text-lg font-bold">{dashboard.trend.title}</h2>
                  <p className="mt-1 text-sm text-text-muted">{dashboard.trend.subtitle}</p>
                </div>
                <span className="rounded-xl border border-text-inverse/20 px-3 py-1 text-xs text-text-muted">
                  {dashboard.trend.rangeLabel}
                </span>
              </div>
              <div className="mt-4 flex items-end gap-3">
                <span className="font-heading text-display-2xl font-bold">{dashboard.trend.value}</span>
                <span className="mb-2 rounded-full bg-brand-primary px-2 py-0.5 text-xs font-semibold">
                  {dashboard.trend.delta}
                </span>
              </div>
              <DistressTrend
                data={timeline.counsellorDashboard}
                highlightWeek={dashboard.trend.highlightWeek}
                highlightScore={dashboard.trend.highlightScore}
              />
            </section>

            <section className="rounded-2xl border border-border-default bg-bg-surface p-5">
              <h2 className="font-heading text-lg font-bold text-text-primary">Priority cases</h2>
              <table className="mt-4 w-full text-left text-sm">
                <thead>
                  <tr className="text-text-muted">
                    <th className="pb-3 font-medium">Case</th>
                    <th className="pb-3 font-medium">Category</th>
                    <th className="pb-3 font-medium">Risk</th>
                    <th className="pb-3 font-medium">Score</th>
                    <th className="pb-3 font-medium">SLA</th>
                  </tr>
                </thead>
                <tbody>
                  {cases.map((item) => {
                    const trend = scoreTrend(item.currentDistress, item.baselineDistress);
                    const urgent = item.userId === "#USR-7844";
                    return (
                      <tr
                        key={item.caseId}
                        className="cursor-pointer border-t border-border-subtle hover:bg-nav-hover"
                        onClick={() => router.push(casePath(item.caseId))}
                      >
                        <td className="py-3 font-medium text-text-primary">{item.userId}</td>
                        <td className="py-3 text-text-secondary">{item.category}</td>
                        <td className="py-3">
                          <RiskBadge level={asRisk(item.riskLevel)} />
                        </td>
                        <td className="py-3 font-heading font-bold text-text-primary">
                          {item.currentDistress} {ARROWS[trend]}
                        </td>
                        <td className={`py-3 font-medium ${urgent ? "text-risk-critical" : "text-text-secondary"}`}>
                          {item.slaRemaining}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>

            <section className="max-w-sm rounded-2xl border border-border-default bg-bg-surface p-4 shadow-sm">
              <h2 className="font-heading text-sm font-bold text-text-primary">{dashboard.weeklyBrief.title}</h2>
              <p className="mt-2 text-sm text-text-secondary">{dashboard.weeklyBrief.body}</p>
            </section>
          </div>

          <div className="space-y-4">
            <section className="rounded-2xl border border-border-default bg-bg-surface p-5">
              <h2 className="font-heading text-lg font-bold text-text-primary">Risk distribution</h2>
              <div className="mt-2">
                <RiskDonut
                  segments={dashboard.distribution}
                  center={dashboard.distributionCenter}
                  caption={dashboard.distributionCaption}
                />
              </div>
            </section>

            <section className="rounded-2xl bg-bg-accent-subtle p-5">
              <h2 className="font-heading text-lg font-bold text-text-primary">{dashboard.whyRisk.title}</h2>
              <p className="mt-1 text-sm text-text-secondary">
                {dashboard.whyRisk.caseRef} · {dashboard.whyRisk.change}
              </p>
              <ul className="mt-4 space-y-3">
                {dashboard.whyRisk.factors.map((factor) => (
                  <li key={factor.label}>
                    <div className="flex items-center justify-between text-xs text-text-secondary">
                      <span>{factor.label}</span>
                      <span className="font-semibold text-text-primary">+{factor.score}</span>
                    </div>
                    <svg viewBox="0 0 100 6" className="mt-1 h-1.5 w-full" aria-hidden="true">
                      <rect width="100" height="6" rx="3" className="fill-bg-primary" />
                      <rect
                        width={(factor.score / maxFactor) * 100}
                        height="6"
                        rx="3"
                        className="fill-accent-lavender"
                      />
                    </svg>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs font-semibold tracking-wide text-accent-lavender">
                RECOMMENDED · HUMAN REVIEW
              </p>
              <ul className="mt-2 space-y-2">
                {dashboard.whyRisk.recommendations.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-text-primary">
                    <Check size={16} className="mt-0.5 shrink-0 text-brand-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={casePath("NHAA-DEMO-1042")}
                className="mt-5 inline-flex rounded-xl bg-brand-primary px-5 py-3 text-sm font-medium text-text-inverse"
              >
                Review & assign
              </Link>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
