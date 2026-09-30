"use client";

import {
  Line,
  LineChart,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Point {
  week: string;
  score: number;
}

interface DistressTrendProps {
  data: Point[];
  highlightWeek: string;
  highlightScore: number;
}

export function DistressTrend({ data, highlightWeek, highlightScore }: DistressTrendProps) {
  return (
    <ResponsiveContainer width="100%" height={220} initialDimension={{ width: 640, height: 220 }}>
      <LineChart data={data} margin={{ top: 24, right: 12, left: 0, bottom: 0 }}>
        <XAxis
          dataKey="week"
          stroke="var(--color-text-muted)"
          tick={{ fill: "var(--color-text-muted)", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis hide domain={[0, 100]} />
        <Tooltip
          content={({ active, payload, label }) => {
            if (!active || !payload?.length) return null;
            const point = payload[0];
            return (
              <div className="rounded-xl border border-border-default bg-bg-primary px-3 py-2 text-sm text-text-primary">
                <p>{label}</p>
                <p className="font-heading font-bold">{point && "value" in point ? String(point.value) : ""}</p>
              </div>
            );
          }}
        />
        <Line
          type="monotone"
          dataKey="score"
          stroke="var(--color-chart-lime)"
          strokeWidth={3}
          dot={false}
          isAnimationActive
          animationDuration={800}
          animationEasing="ease-in-out"
        />
        <ReferenceDot
          x={highlightWeek}
          y={highlightScore}
          r={5}
          fill="var(--color-chart-lime)"
          stroke="var(--color-text-inverse)"
          label={{
            value: String(highlightScore),
            position: "top",
            fill: "var(--color-text-inverse)",
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
