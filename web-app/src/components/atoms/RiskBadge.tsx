import React from "react";

export type RiskLevel = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";

interface RiskBadgeProps {
  level: RiskLevel;
  size?: "sm" | "md" | "lg";
  showDot?: boolean;
}

const config: Record<RiskLevel, { bg: string; text: string; dot: string; label: string }> = {
  CRITICAL: {
    bg: "bg-risk-critical-bg",
    text: "text-risk-critical-text",
    dot: "bg-risk-critical",
    label: "Critical",
  },
  HIGH: {
    bg: "bg-risk-high-bg",
    text: "text-risk-high-text",
    dot: "bg-risk-high",
    label: "High",
  },
  MEDIUM: {
    bg: "bg-risk-medium-bg",
    text: "text-risk-medium-text",
    dot: "bg-risk-medium",
    label: "Medium",
  },
  LOW: {
    bg: "bg-risk-low-bg",
    text: "text-risk-low-text",
    dot: "bg-risk-low",
    label: "Low",
  },
};

const sizeClasses = {
  sm: "px-2 py-0.5 text-xs gap-1",
  md: "px-2.5 py-1 text-xs gap-1.5",
  lg: "px-3 py-1.5 text-sm gap-2",
};

export function RiskBadge({ level, size = "md", showDot = true }: RiskBadgeProps) {
  const c = config[level];
  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold ${c.bg} ${c.text} ${sizeClasses[size]} ${level === "CRITICAL" ? "animate-pulse" : ""}`}
    >
      {showDot && (
        <span className={`inline-block rounded-full ${c.dot} ${size === "lg" ? "w-2 h-2" : "w-1.5 h-1.5"}`} />
      )}
      {c.label}
    </span>
  );
}
