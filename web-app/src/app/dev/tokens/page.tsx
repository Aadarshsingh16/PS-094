"use client";

import {
  RiskBadge,
  StatusToggle,
  MetricCard,
  SectionHeader,
  QuickExit,
  VictimSideNav,
  OfficerSideNav,
  TopBar,
} from "@/components/atoms";

export default function TokensTestPage() {
  return (
    <div className="min-h-screen bg-bg-primary p-10 font-body">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* Header */}
        <div className="border-b border-border-default pb-6">
          <h1 className="font-heading text-3xl font-bold text-text-primary">
            SAHAYAK AI — Design System
          </h1>
          <p className="text-text-secondary mt-1 text-sm">
            Phase 0 tokens and atom components. All colors via CSS tokens — no raw hex values.
          </p>
        </div>

        {/* ── Color Tokens ── */}
        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-4">Color Tokens</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { token: "brand-primary", cls: "bg-brand-primary", label: "#16A34A — Brand Primary" },
              { token: "accent-lavender", cls: "bg-accent-lavender", label: "#8B5CF6 — Accent Lavender" },
              { token: "risk-critical", cls: "bg-risk-critical", label: "#EF4444 — Risk Critical" },
              { token: "risk-high", cls: "bg-risk-high", label: "#F97316 — Risk High" },
              { token: "risk-medium", cls: "bg-risk-medium", label: "#EAB308 — Risk Medium" },
              { token: "risk-low", cls: "bg-risk-low", label: "#22C55E — Risk Low" },
              { token: "bg-accent-subtle", cls: "bg-bg-accent-subtle border border-accent-lavender/30", label: "#EDE9FE — Accent Subtle" },
              { token: "bg-surface", cls: "bg-bg-surface border border-border-default", label: "#F8FAFC — Surface" },
            ].map(({ cls, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg shrink-0 ${cls}`} />
                <span className="text-sm text-text-secondary font-mono">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Typography ── */}
        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-4">Typography</h2>
          <div className="space-y-2">
            <p className="font-heading text-4xl font-bold text-text-primary">Space Grotesk Bold — Heading 2XL</p>
            <p className="font-heading text-2xl font-bold text-text-primary">Space Grotesk Bold — Heading LG</p>
            <p className="font-heading text-5xl font-bold text-text-primary">128</p>
            <p className="text-base text-text-primary">Inter Regular — Body Large — The quiet signal before the crisis</p>
            <p className="text-sm text-text-secondary">Inter Regular — Body Small — Secondary text</p>
            <p className="text-xs text-text-muted">Inter Regular — Caption — Muted text</p>
          </div>
        </section>

        {/* ── RiskBadge ── */}
        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-4">RiskBadge</h2>
          <div className="flex flex-wrap gap-3">
            {(["CRITICAL", "HIGH", "MEDIUM", "LOW"] as const).map((level) => (
              <div key={level} className="flex flex-col gap-2 items-start">
                <RiskBadge level={level} size="sm" />
                <RiskBadge level={level} size="md" />
                <RiskBadge level={level} size="lg" />
              </div>
            ))}
          </div>
        </section>

        {/* ── StatusToggle ── */}
        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-4">StatusToggle</h2>
          <div className="flex gap-6 items-center">
            <div className="flex items-center gap-3">
              <StatusToggle checked={true} />
              <span className="text-sm text-text-secondary">ON (blue)</span>
            </div>
            <div className="flex items-center gap-3">
              <StatusToggle checked={false} />
              <span className="text-sm text-text-secondary">OFF (grey)</span>
            </div>
            <div className="flex items-center gap-3">
              <StatusToggle checked={true} disabled />
              <span className="text-sm text-text-muted">Disabled</span>
            </div>
          </div>
        </section>

        {/* ── MetricCards ── */}
        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-4">MetricCard</h2>
          <div className="grid grid-cols-2 gap-4">
            <MetricCard
              id="metric-cases"
              title="Assigned cases"
              value="48"
              chip={{ value: "+4 this week", direction: "neutral" }}
              sparklineData={[30, 35, 32, 40, 42, 45, 48]}
              sparklineColor="var(--color-risk-low)"
            />
            <MetricCard
              id="metric-alerts"
              title="Active alerts"
              value="7"
              chip={{ value: "2 critical", direction: "up" }}
              sparklineData={[2, 3, 2, 4, 5, 6, 7]}
              sparklineColor="var(--color-risk-critical)"
            />
            <MetricCard
              id="metric-sla"
              title="SLA compliance"
              value="94%"
              subLabel="Target 90%"
              progressBar={{ value: 94, max: 100, color: "var(--color-brand-primary)" }}
            />
            <MetricCard
              id="metric-distress"
              title="Avg distress score"
              value="61"
              chip={{ value: "▲9 vs 14d", direction: "up" }}
              sparklineData={[50, 52, 55, 57, 58, 60, 61]}
              sparklineColor="var(--color-accent-lavender)"
            />
          </div>
        </section>

        {/* ── SectionHeader ── */}
        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-4">SectionHeader</h2>
          <div className="border border-border-default rounded-2xl p-6">
            <SectionHeader
              title="Privacy & channels"
              subtitle="Choose how, when and where we reach you. Change this any time."
              action={
                <button className="text-sm text-brand-primary font-medium hover:underline">
                  Save changes
                </button>
              }
            />
            <p className="text-text-muted text-sm">Page content goes here...</p>
          </div>
        </section>

        {/* ── QuickExit ── */}
        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-4">QuickExit</h2>
          <div className="w-48">
            <QuickExit redirectUrl="https://www.google.com" />
          </div>
          <p className="text-text-muted text-xs mt-2">
            ⚠ Clicking the button above will redirect to Google immediately.
          </p>
        </section>

        {/* ── TopBar ── */}
        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-4">TopBar</h2>
          <div className="border border-border-default rounded-2xl overflow-hidden">
            <TopBar
              greeting="Good morning, Priya"
              subtitle="Well-being overview for your 48 assigned cases · Mon, 28 Sep 2026"
              notificationCount={7}
              userInitials="PS"
              showSearch
            />
          </div>
        </section>

        {/* ── Cards ── */}
        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-4">Card Styles</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-bg-surface border border-border-default rounded-2xl p-5 shadow-sm">
              <p className="text-sm text-text-secondary">bg-surface · rounded-2xl · shadow-sm</p>
            </div>
            <div className="bg-bg-accent-subtle border border-accent-lavender/20 rounded-2xl p-5">
              <p className="text-sm text-accent-lavender">bg-accent-subtle — AI / Risk panels</p>
            </div>
            <div className="bg-bg-dark-chart rounded-2xl p-5">
              <p className="text-sm text-white">bg-dark-chart — Distress trend chart</p>
            </div>
          </div>
        </section>

        {/* ── Footer prototype notice ── */}
        <footer className="border-t border-border-subtle pt-4 text-center">
          <p className="text-xs text-text-muted">
            PROTOTYPE · SYNTHETIC DATA ONLY · Not connected to real systems
          </p>
        </footer>

      </div>
    </div>
  );
}
