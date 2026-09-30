"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, Check, ClipboardList, Scale } from "lucide-react";
import cases from "@/data/cases.json";
import checkins from "@/data/checkins.json";
import home from "@/data/victimHome.json";

const LANGUAGES = ["English", "Hindi", "Regional"] as const;
const JOURNEY_ICONS = [ClipboardList, ClipboardList, Scale, Calendar];

function timeGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function VictimHomePage() {
  const asha = cases.find((item) => item.caseId === "NHAA-DEMO-1042");
  const completed = checkins.filter((day) => day.completed).length;
  const maxScore = Math.max(...checkins.map((day) => day.score ?? 0), 1);
  const [greeting, setGreeting] = useState("Good evening");
  const [language, setLanguage] = useState<(typeof LANGUAGES)[number]>("English");
  const [mood, setMood] = useState<string | null>(null);

  useEffect(() => {
    setGreeting(timeGreeting());
    const stored = sessionStorage.getItem("language");
    if (stored === "English" || stored === "Hindi" || stored === "Regional") {
      setLanguage(stored);
    }
  }, []);

  return (
    <div className="px-8 py-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="font-heading text-heading-xl font-bold text-text-primary">
            {greeting}, Asha
          </p>
          <p className="mt-1 text-sm text-text-secondary">{home.subtitle}</p>
        </div>
        <label className="flex items-center gap-2 text-sm text-text-secondary">
          Language
          <select
            aria-label="Language"
            value={language}
            onChange={(event) => {
              const next = event.target.value as (typeof LANGUAGES)[number];
              setLanguage(next);
              sessionStorage.setItem("language", next);
            }}
            className="rounded-xl border border-border-default bg-bg-surface px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary"
          >
            {LANGUAGES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </header>

      <div className="mt-6 grid grid-cols-[minmax(0,1fr)_300px] items-start gap-6">
        <div className="space-y-6">
          <section className="hero-panel rounded-2xl p-8 text-text-inverse">
            <p className="text-xs font-semibold tracking-wide text-risk-high">{home.heroEyebrow}</p>
            <h1 className="mt-3 font-heading text-display-2xl font-bold">{home.heroTitle}</h1>
            <p className="mt-2 text-sm text-text-muted">{home.heroMeta}</p>
            <Link
              href="/victim/checkin"
              className="mt-6 inline-flex rounded-xl bg-risk-high px-6 py-3 text-sm font-medium text-text-inverse"
            >
              Start check-in →
            </Link>
            <div className="mt-4 flex flex-wrap gap-2">
              {home.modes.map((mode) => (
                <span
                  key={mode}
                  className="rounded-full border border-text-inverse/30 px-3 py-1 text-sm"
                >
                  {mode}
                </span>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-2 gap-6">
            <section className="rounded-2xl border border-border-default bg-bg-surface p-5">
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="font-heading text-lg font-bold text-text-primary">Your week</h2>
                <p className="text-sm font-medium text-text-secondary">
                  {completed} of {checkins.length} days
                </p>
              </div>
              <svg viewBox="0 0 84 100" className="mt-5 h-28 w-full" aria-hidden="true">
                {checkins.map((day, index) => {
                  const barHeight = day.score ? Math.max(12, (day.score / maxScore) * 100) : 8;
                  return (
                    <rect
                      key={day.date}
                      x={index * 12 + 2}
                      y={100 - barHeight}
                      width="8"
                      height={barHeight}
                      rx="2"
                      className={day.completed ? "fill-brand-primary" : "fill-border-default"}
                    />
                  );
                })}
              </svg>
              <div className="mt-2 flex">
                {checkins.map((day) => (
                  <span key={day.date} className="flex-1 text-center text-xs text-text-muted">
                    {day.day}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm text-text-secondary">{home.weekInsight}</p>
            </section>

            <section className="rounded-2xl border border-border-default bg-bg-surface p-5">
              <h2 className="font-heading text-lg font-bold text-text-primary">Right now I feel...</h2>
              <div className="mt-4 grid grid-cols-5 gap-2">
                {home.moods.map((item) => {
                  const selected = mood === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setMood(item.id)}
                      className={`flex flex-col items-center gap-1 rounded-xl border px-1 py-3 text-xs ${
                        selected
                          ? "border-brand-primary bg-nav-active text-brand-primary"
                          : "border-border-default bg-bg-primary text-text-secondary"
                      }`}
                    >
                      <span className="text-xl" aria-hidden="true">
                        {item.emoji}
                      </span>
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </section>
          </div>

          <section className="rounded-2xl border border-border-default bg-bg-surface p-5">
            <h2 className="font-heading text-lg font-bold text-text-primary">Your case journey</h2>
            <ol className="mt-5 grid grid-cols-4 gap-3">
              {(asha?.journey ?? []).map((step, index) => {
                const Icon = JOURNEY_ICONS[index] ?? Check;
                const done = step.status === "done";
                return (
                  <li key={step.step} className="flex flex-col gap-2">
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full ${
                        done ? "bg-brand-subtle text-brand-primary" : "bg-bg-accent-subtle text-accent-lavender"
                      }`}
                    >
                      {done ? <Check size={16} /> : <Icon size={16} />}
                    </span>
                    <span className="text-sm font-medium text-text-primary">{step.step}</span>
                    <span className="text-xs text-text-muted">{step.date}</span>
                  </li>
                );
              })}
            </ol>
          </section>
        </div>

        <aside className="space-y-4">
          <h2 className="font-heading text-lg font-bold text-text-primary">Talk to someone</h2>
          {home.talk.map((card) => (
            <article
              key={card.id}
              className="rounded-2xl border border-border-default bg-bg-surface p-4 shadow-sm"
            >
              <h3 className="font-heading text-sm font-bold text-text-primary">{card.title}</h3>
              <p className="mt-1 text-sm text-text-secondary">{card.detail}</p>
            </article>
          ))}

          <section className="rounded-2xl border border-border-default bg-bg-surface p-4">
            <h2 className="font-heading text-sm font-bold text-text-primary">What happens next</h2>
            <ul className="mt-3 space-y-2">
              {home.nextSteps.map((item) => (
                <li key={item} className="text-sm text-text-secondary">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl bg-bg-accent-subtle p-4">
            <h2 className="font-heading text-sm font-bold text-text-primary">{home.safeTimeTitle}</h2>
            <p className="mt-2 text-sm text-text-secondary">{home.safeTimeWindow}</p>
            <Link href="/victim/privacy" className="mt-3 inline-block text-sm font-medium text-brand-primary">
              Change
            </Link>
          </section>
        </aside>
      </div>
    </div>
  );
}
