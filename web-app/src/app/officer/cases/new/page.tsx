"use client";

import { useState } from "react";
import Link from "next/link";
import { SectionHeader } from "@/components/atoms";
import options from "@/data/caseOptions.json";
import { saveRegisteredCase } from "@/lib/registeredCases";

export default function RegisterCasePage() {
  const [caseId, setCaseId] = useState("");
  const [category, setCategory] = useState(options.categories[0] ?? "");
  const [stage, setStage] = useState(options.stages[0] ?? "");
  const [consent, setConsent] = useState(true);
  const [safeChannel, setSafeChannel] = useState(options.channels[0] ?? "");
  const [createdId, setCreatedId] = useState("");

  function createCase() {
    const id = caseId.trim();
    if (!id) return;
    saveRegisteredCase({ caseId: id, category, stage, consent, safeChannel });
    setCreatedId(id);
  }

  return (
    <main className="mx-auto max-w-xl px-8 py-8">
      <SectionHeader title="Register case" subtitle="Register and onboard an active case record." />
      {createdId ? (
        <section className="rounded-2xl border border-border-default bg-bg-surface p-5">
          <h2 className="font-heading text-lg font-bold text-text-primary">Case created</h2>
          <p className="mt-2 text-sm text-text-secondary">{createdId} has been registered and initialized.</p>
          <Link href="/officer/cases" className="mt-4 inline-flex text-sm font-medium text-brand-primary">
            Back to cases
          </Link>
        </section>
      ) : (
        <form
          className="space-y-4 rounded-2xl border border-border-default bg-bg-surface p-5"
          onSubmit={(event) => {
            event.preventDefault();
            createCase();
          }}
        >
          <label className="block text-sm text-text-secondary">
            Case ID
            <input
              value={caseId}
              onChange={(event) => setCaseId(event.target.value)}
              required
              placeholder="NHAA-1042"
              className="mt-1 w-full rounded-xl border border-border-default bg-bg-primary px-4 py-2 text-text-primary"
            />
          </label>
          <label className="block text-sm text-text-secondary">
            Case category
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="mt-1 w-full rounded-xl border border-border-default bg-bg-primary px-3 py-2 text-text-primary"
            >
              {options.categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="block text-sm text-text-secondary">
            Case stage
            <select
              value={stage}
              onChange={(event) => setStage(event.target.value)}
              className="mt-1 w-full rounded-xl border border-border-default bg-bg-primary px-3 py-2 text-text-primary"
            >
              {options.stages.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="flex items-center justify-between text-sm text-text-secondary">
            Consent
            <button
              type="button"
              aria-pressed={consent}
              onClick={() => setConsent((current) => !current)}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${consent ? "bg-brand-subtle text-brand-primary" : "bg-nav-hover text-text-secondary"}`}
            >
              {consent ? "Consent on" : "Consent pending"}
            </button>
          </label>
          <label className="block text-sm text-text-secondary">
            Safe channel
            <select
              value={safeChannel}
              onChange={(event) => setSafeChannel(event.target.value)}
              className="mt-1 w-full rounded-xl border border-border-default bg-bg-primary px-3 py-2 text-text-primary"
            >
              {options.channels.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <button type="submit" className="phone-field rounded-xl bg-brand-primary px-5 py-3 text-sm font-medium text-text-inverse">
            Create case
          </button>
        </form>
      )}
    </main>
  );
}
