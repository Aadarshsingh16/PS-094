import { SectionHeader } from "@/components/atoms";
import { DistressTrend } from "@/components/molecules/DistressTrend";
import { RiskDonut } from "@/components/molecules/RiskDonut";
import dashboard from "@/data/dashboard.json";
import timeline from "@/data/riskTimeline.json";

export default function ReportsPage() {
  return (
    <main className="px-8 py-8">
      <div className="flex items-start justify-between gap-4">
        <SectionHeader title="Reports" subtitle="District view of distress trend, risk mix, and SLA." />
        <button
          type="button"
          className="rounded-xl border border-border-default px-4 py-2 text-sm font-medium text-text-secondary"
        >
          Export
        </button>
      </div>
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section className="rounded-2xl bg-bg-dark-chart p-6 text-text-inverse">
          <h2 className="font-heading text-lg font-bold">{dashboard.trend.title}</h2>
          <p className="mt-1 text-sm text-text-muted">{dashboard.trend.subtitle}</p>
          <DistressTrend
            data={timeline.counsellorDashboard}
            highlightWeek={dashboard.trend.highlightWeek}
            highlightScore={dashboard.trend.highlightScore}
          />
        </section>
        <section className="rounded-2xl border border-border-default bg-bg-surface p-5">
          <h2 className="font-heading text-lg font-bold text-text-primary">Risk distribution</h2>
          <RiskDonut
            segments={dashboard.distribution}
            center={dashboard.distributionCenter}
            caption={dashboard.distributionCaption}
          />
        </section>
      </div>
      <section className="mt-6 max-w-md rounded-2xl border border-border-default bg-bg-surface p-5">
        <h2 className="font-heading text-lg font-bold text-text-primary">SLA summary</h2>
        <p className="mt-2 font-heading text-display-2xl font-bold text-text-primary">{dashboard.metrics.sla.value}</p>
        <p className="mt-1 text-sm text-text-secondary">{dashboard.metrics.sla.target}</p>
      </section>
    </main>
  );
}
