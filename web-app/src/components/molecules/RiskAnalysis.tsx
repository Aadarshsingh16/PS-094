"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CrisisPath } from "@/components/molecules/CrisisPath";
import { DistressTrend } from "@/components/molecules/DistressTrend";
import signals from "@/data/signals.json";
import { useDemoState } from "@/lib/demoState";
import { asRisk } from "@/lib/officer";
import { RiskBadge } from "@/components/atoms";

interface Point {
  week: string;
  score: number;
}

interface Factor {
  label: string;
  score: number;
}

interface RiskAnalysisProps {
  userId: string;
  baseline: number;
  current: number;
  factors: Factor[];
  series: Point[];
}

function CountTo({ value }: { value: number }) {
  const [shown, setShown] = useState(value);
  const fromRef = useRef(value);

  useEffect(() => {
    const from = fromRef.current;
    if (from === value) return;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1600);
      setShown(Math.round(from + (value - from) * t));
      if (t < 1) frame = requestAnimationFrame(tick);
      else fromRef.current = value;
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return <>{shown}</>;
}

function Waveform() {
  const heights = [8, 16, 22, 12, 18, 10, 20];
  return (
    <svg width={heights.length * 8} height={24} aria-hidden="true">
      {heights.map((height, index) => (
        <rect
          key={index}
          x={index * 8}
          y={24 - height}
          width={4}
          height={height}
          rx={2}
          className="fill-risk-high"
        />
      ))}
    </svg>
  );
}

function highlight(text: string) {
  const parts = text.split(/(Fear|Isolation|Stress|Elevated stress)/g);
  return parts.map((part, index) =>
    /Fear|Isolation|Stress|Elevated stress/.test(part) ? (
      <mark key={index} className="rounded bg-risk-high-bg px-1 text-risk-high-text">
        {part}
      </mark>
    ) : (
      <span key={index}>{part}</span>
    ),
  );
}

export function RiskAnalysis({ userId, baseline, current, factors, series }: RiskAnalysisProps) {
  const step = useDemoState((state) => state.step);
  const autoPlay = useDemoState((state) => state.autoPlay);
  const approve = useDemoState((state) => state.approve);
  const reset = useDemoState((state) => state.reset);
  const [decision, setDecision] = useState("");

  const revealed = signals.panels.filter((_, index) => step >= index + 2);
  const score = step >= 13 ? 49 : step >= 7 ? current : baseline;
  const level = step >= 14 ? "MEDIUM" : step >= 8 ? "HIGH" : "LOW";
  const change = score - baseline;
  const arc = Math.round((score / 100) * 100);

  return (
    <div className="mt-6 space-y-6">
      <CrisisPath />
      {step === 0 ? (
        <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-risk-medium bg-bg-amber-banner p-5">
          <div>
            <h2 className="font-heading text-lg font-bold text-text-primary">🔔 {signals.bannerTitle}</h2>
            <p className="mt-1 text-sm text-text-secondary">{signals.bannerDetail}</p>
          </div>
          <button
            type="button"
            onClick={autoPlay}
            className="flex items-center gap-2.5 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold tracking-wide text-white shadow-md transition-all hover:bg-slate-800 active:scale-95"
          >
            <span className="text-xs">▶</span>
            <span>RUN SIGNAL ANALYSIS</span>
          </button>
        </section>
      ) : null}

      {step === 0 ? (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <section className="rounded-2xl bg-bg-dark-chart p-5 text-text-inverse">
            <h2 className="font-heading text-lg font-bold">Well-being</h2>
            <p className="mt-1 text-sm text-text-muted">W1–W8 distress signal</p>
            <DistressTrend data={series} highlightWeek="W8" highlightScore={series[series.length - 1]?.score ?? 0} />
          </section>
          <section className="rounded-2xl border border-border-default bg-bg-surface p-5">
            <h2 className="font-heading text-lg font-bold text-text-primary">Why risk increased</h2>
            <ul className="mt-4 space-y-3">
              {factors.map((factor) => (
                <li key={factor.label} className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">{factor.label}</span>
                  <span className="font-heading font-bold text-text-primary">+{factor.score}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      ) : null}

      {step === 1 ? (
        <section className="rounded-2xl border border-border-default bg-bg-surface p-5">
          <p className="text-sm font-medium text-text-secondary">Processing signals...</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {signals.panels.map((panel) => (
              <div key={panel.id} className="h-24 animate-pulse rounded-xl bg-nav-hover" />
            ))}
          </div>
        </section>
      ) : null}

      {step >= 2 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {revealed.map((panel) => (
            <section key={panel.id} className="factor-in rounded-2xl border border-border-default bg-bg-surface p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-heading text-base font-bold text-text-primary">{panel.title}</h2>
                {panel.id === "voice" ? <Waveform /> : null}
              </div>
              <ul className="mt-3 space-y-2">
                {panel.points.map((point) => (
                  <li key={point} className="text-sm text-text-secondary">
                    {highlight(point)}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : null}

      {step >= 6 ? (
        <p className={`text-center text-sm font-medium text-text-secondary ${step === 6 ? "fusion-pulse" : ""}`}>
          Text · Voice · Behaviour · Case context → Baseline → Risk
          {step === 6 ? " · Analysing..." : ""}
        </p>
      ) : null}

      {step >= 6 ? (
        <div className="grid gap-4 lg:grid-cols-3">
          <section className="rounded-2xl border border-border-default bg-bg-surface p-5">
            <h2 className="font-heading text-base font-bold text-text-primary">Personal baseline</h2>
            <p className="mt-3 text-sm text-text-secondary">Baseline {baseline}</p>
            <p className="mt-1 font-heading text-3xl font-bold text-text-primary">
              <CountTo value={score} />
            </p>
            <p className="mt-1 text-sm text-text-secondary">Change {change >= 0 ? "+" : ""}{change}</p>
            <svg viewBox="0 0 100 8" className="mt-4 h-2 w-full" aria-hidden="true">
              <rect width="100" height="8" rx="4" className="fill-nav-hover" />
              <rect width={baseline} height="8" rx="4" className="fill-brand-primary" />
              <rect x={baseline} width={Math.max(score - baseline, 0)} height="8" className="fill-risk-high" />
            </svg>
          </section>

          <section className="rounded-2xl bg-bg-accent-subtle p-5">
            <h2 className="font-heading text-base font-bold text-text-primary">Dynamic risk</h2>
            <div className={`mt-3 ${step === 8 || step === 14 ? "animate-pulse" : ""}`}>
              <RiskBadge level={asRisk(level)} size="lg" />
            </div>
            <p className="mt-3 font-heading text-3xl font-bold text-text-primary">
              <CountTo value={score} />
              <span className="text-lg text-text-secondary">/100</span>
            </p>
            <svg viewBox="0 0 100 12" className="mt-3 h-3 w-full" aria-hidden="true">
              <rect width="100" height="12" rx="6" className="fill-bg-primary" />
              <rect width={arc} height="12" rx="6" className={level === "MEDIUM" ? "fill-risk-medium" : "fill-risk-high"} />
            </svg>
            <p className="mt-2 text-sm text-text-secondary">Escalation risk: Elevated</p>
            <p className="mt-3 inline-flex rounded-full bg-bg-surface px-3 py-1 text-xs font-medium text-accent-lavender">
              {signals.path}
            </p>
          </section>

          {step >= 9 ? (
            <section className="rounded-2xl border border-border-default bg-bg-surface p-5">
              <h2 className="font-heading text-base font-bold text-text-primary">Why risk increased</h2>
              <ul className="mt-4 space-y-3">
                {factors.map((factor, index) => (
                  <li key={factor.label} className={`factor-in factor-delay-${index}`}>
                    <div className="flex items-center justify-between text-xs text-text-secondary">
                      <span>{factor.label}</span>
                      <span className="font-semibold text-text-primary">+{factor.score}</span>
                    </div>
                    <svg viewBox="0 0 100 6" className="mt-1 h-1.5 w-full" aria-hidden="true">
                      <rect width="100" height="6" rx="3" className="fill-nav-hover" />
                      <rect width={(factor.score / 18) * 100} height="6" rx="3" className="fill-risk-high" />
                    </svg>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      ) : null}

      {step >= 10 && step < 12 ? (
        <p className="factor-in rounded-2xl border border-risk-high bg-risk-high-bg px-4 py-3 text-sm font-medium text-risk-high-text" role="status">
          ⚠ {signals.toast}
        </p>
      ) : null}

      {step === 11 ? (
        <section className="factor-in rounded-2xl border border-border-default bg-bg-surface p-5">
          <h2 className="font-heading text-lg font-bold text-text-primary">Human review</h2>
          <p className="mt-1 text-sm text-text-secondary">A person confirms support for {userId}. The signal does not decide.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={approve}
              className="rounded-xl bg-brand-primary px-8 py-4 text-base font-semibold text-text-inverse"
            >
              APPROVE
            </button>
            <button
              type="button"
              onClick={() => setDecision("Modify requested. A person will adjust the support.")}
              className="rounded-xl border border-border-default px-5 py-4 text-sm font-medium text-text-primary"
            >
              MODIFY
            </button>
            <button
              type="button"
              onClick={() => setDecision("Rejected. No support change will be made from this signal.")}
              className="rounded-xl border border-risk-critical px-5 py-4 text-sm font-medium text-risk-critical"
            >
              REJECT
            </button>
          </div>
          {decision ? <p className="mt-3 text-sm text-text-secondary">{decision}</p> : null}
        </section>
      ) : null}

      {step >= 12 ? (
        <section className="factor-in rounded-2xl border border-border-default bg-bg-surface p-5">
          <h2 className="font-heading text-lg font-bold text-text-primary">Support confirmed</h2>
          <ul className="mt-3 space-y-2">
            {signals.confirmed.map((item) => (
              <li key={item} className="text-sm text-text-secondary">
                {item}
              </li>
            ))}
          </ul>
          {step >= 13 ? <p className="mt-3 text-sm text-text-secondary">{signals.followUp}</p> : null}
        </section>
      ) : null}

      {step >= 15 ? (
        <Link
          href="/officer/cases/nhaa-demo-1042/outcome"
          className="block rounded-2xl bg-brand-subtle px-4 py-3 text-sm font-medium text-brand-primary"
        >
          {signals.outcome}
        </Link>
      ) : null}

      <button type="button" onClick={reset} className="text-xs text-text-muted underline">
        ↺ Reset to initial state
      </button>
    </div>
  );
}
