"use client";

import { useEffect, useState } from "react";
import { RiskBadge } from "@/components/atoms";
import crisis from "@/data/crisis.json";

export function CrisisPath() {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (shown === 0 || shown >= crisis.steps.length) return;
    const timer = setTimeout(() => setShown((current) => current + 1), 700);
    return () => clearTimeout(timer);
  }, [shown]);

  return (
    <section className="rounded-2xl border border-risk-critical bg-risk-critical-bg p-5">
      <h2 className="font-heading text-lg font-bold text-text-primary">Fast crisis path</h2>
      <p className="mt-1 text-sm text-text-secondary">
        Immediate safety concern. A person still confirms what happens next.
      </p>
      {shown === 0 ? (
        <button
          type="button"
          onClick={() => setShown(1)}
          className="mt-4 rounded-xl bg-risk-critical px-5 py-3 text-sm font-semibold text-text-inverse"
        >
          {crisis.action}
        </button>
      ) : (
        <ol className="mt-4 space-y-2">
          {crisis.steps.slice(0, shown).map((step, index) => (
            <li key={step.title}>
              {index > 0 ? <p className="py-1 text-center text-text-secondary">↓</p> : null}
              <div className="rounded-xl bg-bg-primary px-4 py-3">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-heading text-sm font-bold text-text-primary">{step.title}</p>
                  {index === 1 ? <RiskBadge level="CRITICAL" /> : null}
                </div>
                <p className="mt-1 text-sm text-text-secondary">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
