import React from "react";

interface TrendChipProps {
  value: string;
  direction: "up" | "down" | "neutral";
}

interface MetricCardProps {
  id: string;
  title: string;
  value: string | number;
  chip?: TrendChipProps;
  subLabel?: string;
  sparklineData?: number[];
  sparklineColor?: string;
  progressBar?: { value: number; max: number; color?: string };
  icon?: React.ReactNode;
}

function MiniSparkline({ data, color = "var(--color-risk-low)" }: { data: number[]; color?: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const barWidth = 6;
  const gap = 3;
  const height = 28;

  return (
    <svg
      width={data.length * (barWidth + gap) - gap}
      height={height}
      aria-hidden="true"
    >
      {data.map((v, i) => {
        const barH = Math.max(4, ((v - min) / range) * height);
        return (
          <rect
            key={i}
            x={i * (barWidth + gap)}
            y={height - barH}
            width={barWidth}
            height={barH}
            rx={2}
            fill={color}
            opacity={0.7 + (i / data.length) * 0.3}
          />
        );
      })}
    </svg>
  );
}

function TrendChip({ value, direction }: TrendChipProps) {
  const colors = {
    up: "text-risk-critical-text bg-risk-critical-bg",
    down: "text-risk-low-text bg-risk-low-bg",
    neutral: "text-text-secondary bg-nav-hover",
  };
  const arrows = { up: "▲", down: "▼", neutral: "▶" };
  return (
    <span className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-medium ${colors[direction]}`}>
      {arrows[direction]} {value}
    </span>
  );
}

export function MetricCard({
  id,
  title,
  value,
  chip,
  subLabel,
  sparklineData,
  sparklineColor,
  progressBar,
  icon,
}: MetricCardProps) {
  return (
    <div
      id={id}
      className="bg-bg-surface border border-border-default rounded-2xl p-5 flex flex-col gap-3 shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2 text-text-secondary text-sm font-medium">
          {icon && <span className="text-text-muted">{icon}</span>}
          {title}
        </div>
        <button className="text-text-muted hover:text-text-secondary" aria-label="More options">
          <span className="text-lg leading-none">···</span>
        </button>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <div className="font-heading text-3xl font-bold text-text-primary">{value}</div>
          {chip && <div className="mt-1"><TrendChip {...chip} /></div>}
          {subLabel && !progressBar && <div className="text-xs text-text-muted mt-1">{subLabel}</div>}
        </div>
        {sparklineData && (
          <MiniSparkline data={sparklineData} color={sparklineColor} />
        )}
      </div>

      {progressBar && (
        <div>
          <svg
            viewBox="0 0 100 8"
            className="w-full h-2"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <rect width="100" height="8" rx="4" className="fill-border-default" />
            <rect
              width={(progressBar.value / progressBar.max) * 100}
              height="8"
              rx="4"
              fill={progressBar.color ?? "var(--color-brand-primary)"}
            />
          </svg>
          {subLabel && (
            <div className="text-xs text-text-muted mt-1">{subLabel}</div>
          )}
        </div>
      )}
    </div>
  );
}
