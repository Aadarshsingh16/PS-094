import cases from "@/data/cases.json";
import type { RiskLevel } from "@/components/atoms";

export function asRisk(value: string): RiskLevel {
  if (value === "CRITICAL" || value === "HIGH" || value === "MEDIUM" || value === "LOW") {
    return value;
  }
  return "MEDIUM";
}

export function findCaseByRoute(id: string) {
  return cases.find((item) => item.caseId.toLowerCase() === id.toLowerCase());
}

export function casePath(caseId: string) {
  return `/officer/cases/${caseId.toLowerCase()}`;
}

export function scoreTrend(current: number, baseline: number): "up" | "down" | "flat" {
  if (current > baseline) return "up";
  if (current < baseline) return "down";
  return "flat";
}
