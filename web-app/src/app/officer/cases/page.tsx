"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiskBadge, SectionHeader } from "@/components/atoms";
import cases from "@/data/cases.json";
import { asRisk, casePath } from "@/lib/officer";
import { readRegisteredCases, type RegisteredCase } from "@/lib/registeredCases";

const FILTERS = ["ALL", "CRITICAL", "HIGH", "MEDIUM", "LOW"] as const;

export default function CasesPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [risk, setRisk] = useState<(typeof FILTERS)[number]>("ALL");
  const [registered, setRegistered] = useState<RegisteredCase[]>([]);

  useEffect(() => {
    setRegistered(readRegisteredCases());
  }, []);

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return cases.filter((item) => {
      const matchesRisk = risk === "ALL" || item.riskLevel === risk;
      const haystack = `${item.userId} ${item.caseId} ${item.category} ${item.displayName}`.toLowerCase();
      return matchesRisk && (!needle || haystack.includes(needle));
    });
  }, [query, risk]);

  return (
    <main className="px-8 py-8">
      <SectionHeader
        title="Cases"
        subtitle="Active cases assigned to Priya Sharma."
        action={
          <Link href="/officer/cases/new" className="rounded-xl bg-brand-primary px-4 py-2 text-sm font-medium text-text-inverse">
            Register case
          </Link>
        }
      />
      {registered.length > 0 ? (
        <ul className="mb-4 space-y-2">
          {registered.map((item) => (
            <li key={item.caseId} className="rounded-2xl border border-border-default bg-bg-surface px-4 py-3 text-sm">
              <p className="font-medium text-text-primary">{item.caseId}</p>
              <p className="mt-1 text-text-secondary">
                {item.category} · {item.stage} · {item.consent ? "Consent on" : "Consent pending"} · {item.safeChannel}
              </p>
            </li>
          ))}
        </ul>
      ) : null}
      <div className="mb-4 flex flex-wrap gap-3">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search cases"
          aria-label="Search cases"
          className="w-64 rounded-xl border border-border-default bg-bg-surface px-4 py-2 text-sm text-text-primary"
        />
        <select
          aria-label="Filter by risk"
          value={risk}
          onChange={(event) => setRisk(event.target.value as (typeof FILTERS)[number])}
          className="rounded-xl border border-border-default bg-bg-surface px-3 py-2 text-sm text-text-primary"
        >
          {FILTERS.map((item) => (
            <option key={item} value={item}>
              {item === "ALL" ? "All risk levels" : item}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-hidden rounded-2xl border border-border-default bg-bg-surface">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-text-muted">
              <th className="px-4 py-3 font-medium">Case</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Stage</th>
              <th className="px-4 py-3 font-medium">Risk</th>
              <th className="px-4 py-3 font-medium">Score</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item) => (
              <tr
                key={item.caseId}
                className="cursor-pointer border-t border-border-subtle hover:bg-nav-hover"
                onClick={() => router.push(casePath(item.caseId))}
              >
                <td className="px-4 py-3">
                  <div className="font-medium text-text-primary">{item.userId}</div>
                  <div className="text-xs text-text-muted">{item.caseId}</div>
                </td>
                <td className="px-4 py-3 text-text-secondary">{item.category}</td>
                <td className="px-4 py-3 text-text-secondary">{item.stage}</td>
                <td className="px-4 py-3">
                  <RiskBadge level={asRisk(item.riskLevel)} />
                </td>
                <td className="px-4 py-3 font-heading font-bold text-text-primary">{item.currentDistress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
