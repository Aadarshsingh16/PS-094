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
        <p className="text-xs font-semibold tracking-wide text-text-muted">DISTRESS SIGNAL</p>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-border-subtle">
          <div className="signal-fill h-full w-3/5 rounded-full bg-risk-high" />
        </div>
        <p className="mt-3 text-sm text-text-secondary">Your counsellor will review this.</p>
      </section>

      <section className="mt-4 rounded-2xl bg-bg-accent-subtle p-5">
        <p className="font-heading text-sm font-bold text-text-primary">Next check-in</p>
        <p className="mt-1 text-sm text-text-secondary">{privacy.nextCheckin}</p>
      </section>

      <Link
        href="/victim/home"
        className="mt-8 inline-flex w-fit rounded-xl bg-brand-primary px-6 py-3 text-sm font-medium text-text-inverse"
      >
        Return to home
      </Link>
    </main>
  );
}
