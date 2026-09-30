"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import privacy from "@/data/privacy.json";
import { readCheckinAnswers } from "@/lib/checkin";

export default function CheckinCompletePage() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(readCheckinAnswers().length);
  }, []);

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-8 py-12">
      <p className="text-sm font-medium text-brand-primary">Check-in received</p>
      <h1 className="mt-2 font-heading text-display-2xl font-bold text-text-primary">Thank you, Asha</h1>
      <p className="mt-3 text-sm text-text-secondary">
        {count > 0 ? `${count} answers saved for this session.` : "Your answers are saved for this session."}
      </p>

      <section className="mt-8 rounded-2xl border border-border-default bg-bg-surface p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold tracking-wide text-text-muted">DISTRESS SIGNAL</p>
          <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-semibold text-orange-700">
            Elevated
          </span>
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-border-subtle">
          <div className="h-full w-3/4 rounded-full bg-risk-high transition-all duration-500" />
        </div>
        <p className="mt-3 text-sm text-text-secondary">
          Voice stress & fear indicators routed to your assigned counsellor <strong>Priya Sharma</strong>.
        </p>
      </section>

      <section className="mt-4 rounded-2xl bg-bg-accent-subtle p-5">
        <p className="font-heading text-sm font-bold text-text-primary">Next check-in</p>
        <p className="mt-1 text-sm text-text-secondary">{privacy.nextCheckin}</p>
      </section>

      <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
        <Link
          href="/officer/dashboard"
          className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-slate-800"
        >
          <span>Proceed to Counsellor Dashboard →</span>
        </Link>
        <Link
          href="/victim/home"
          className="flex w-full sm:w-auto items-center justify-center rounded-xl border border-border-default bg-bg-surface px-6 py-3.5 text-sm font-medium text-text-primary hover:bg-slate-100"
        >
          Return to home
        </Link>
      </div>
    </main>
  );
}
