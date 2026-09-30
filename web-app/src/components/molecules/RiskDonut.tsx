"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface Segment {
  key: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  label: string;
  count: number;
  percent: string;
}

const FILLS: Record<Segment["key"], string> = {
  CRITICAL: "var(--color-risk-critical)",
  HIGH: "var(--color-risk-high)",
  MEDIUM: "var(--color-risk-medium)",
  LOW: "var(--color-risk-low)",
};

interface RiskDonutProps {
  segments: Segment[];
  center: string;
  caption: string;
}

export function RiskDonut({ segments, center, caption }: RiskDonutProps) {
  return (
    <div>
      <div className="relative h-52">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={segments}
              dataKey="count"
              nameKey="label"
              innerRadius={68}
              outerRadius={88}
              stroke="none"
            >
              {segments.map((segment) => (
                <Cell key={segment.key} fill={FILLS[segment.key]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-heading text-3xl font-bold text-text-primary">{center}</span>
          <span className="text-xs text-text-muted">{caption}</span>
        </div>
      </div>
      <ul className="mt-2 space-y-2">
        {segments.map((segment) => (
          <li key={segment.key} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-text-secondary">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: FILLS[segment.key] }} />
              {segment.label}
            </span>
            <span className="font-medium text-text-primary">
              {segment.count} · {segment.percent}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
