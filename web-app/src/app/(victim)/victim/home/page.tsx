"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Check,
  ChevronRight,
  Clock,
  Heart,
  MessageSquare,
  Phone,
  Scale,
  ShieldCheck,
  FileCheck,
} from "lucide-react";
import cases from "@/data/cases.json";
import checkins from "@/data/checkins.json";
import home from "@/data/victimHome.json";

const LANGUAGES = ["English", "Hindi", "Regional"] as const;

function timeGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

const MOODS = [
  { id: "calm", label: "Calm", emoji: "😌", bg: "bg-blue-100 text-blue-800" },
  { id: "okay", label: "Okay", emoji: "🙂", bg: "bg-emerald-100 text-emerald-800" },
  { id: "tense", label: "Tense", emoji: "😐", bg: "bg-amber-100 text-amber-800" },
  { id: "afraid", label: "Afraid", emoji: "😟", bg: "bg-orange-100 text-orange-800" },
  { id: "low", label: "Low", emoji: "😞", bg: "bg-purple-100 text-purple-800" },
];

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
      <header className="app-row flex items-start justify-between gap-4">
        <div>
          <h1 className="phone-title font-heading text-3xl font-bold text-text-primary">
            {greeting}, Asha
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            You are safe here. Your next check-in is ready whenever you are.
          </p>
        </div>
        <label className="flex items-center gap-2 text-sm text-text-secondary">
          <select
            aria-label="Language"
            value={language}
            onChange={(event) => {
              const next = event.target.value as (typeof LANGUAGES)[number];
              setLanguage(next);
              sessionStorage.setItem("language", next);
            }}
            className="rounded-xl border border-border-default bg-bg-surface px-3 py-1.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary"
          >
            {LANGUAGES.map((option) => (
              <option key={option} value={option}>
                🌐 {option}
              </option>
            ))}
          </select>
        </label>
      </header>

      <div className="phone-stack mt-6 grid grid-cols-[minmax(0,1fr)_320px] items-start gap-6">
        <div className="space-y-6">
          {/* Hero Check-in Card matching Frame 1 */}
          <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#17132a] via-[#10192e] to-[#26143d] p-8 text-text-inverse shadow-md">
            <span className="text-xs font-bold tracking-wider uppercase text-orange-400">
              TODAY&apos;S CHECK-IN
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-white">
              How are you feeling today?
            </h2>
            <p className="mt-2 text-sm text-slate-300 max-w-xl">
              Daily check-in · about 3 minutes. Answer by tapping, speaking or chatting.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/victim/checkin"
                className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-orange-500 active:scale-95 transition-all"
              >
                Start check-in →
              </Link>
              <Link
                href="/victim/checkin?mode=tap"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur hover:bg-white/20"
              >
                <span>⌨</span> Tap
              </Link>
              <Link
                href="/victim/checkin?mode=voice"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur hover:bg-white/20"
              >
                <span>🎙</span> Voice
              </Link>
              <Link
                href="/victim/checkin?mode=chat"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur hover:bg-white/20"
              >
                <span>💬</span> Chat &amp; Type
              </Link>
            </div>
          </section>

          {/* Middle Row: Your Week & Right now I feel... */}
          <div className="phone-stack grid grid-cols-2 gap-6">
            {/* Your Week */}
            <section className="rounded-2xl border border-border-default bg-bg-surface p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-base font-bold text-text-primary">Your week</h3>
                <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                  {completed} of {checkins.length} days
                </span>
              </div>

              {/* 7 Bars */}
              <div className="mt-5 flex items-end justify-between gap-2 h-28 px-1">
                {checkins.map((day) => {
                  const barH = day.score ? Math.max(16, (day.score / maxScore) * 96) : 6;
                  return (
                    <div key={day.date} className="flex flex-1 flex-col items-center gap-2">
                      <div className="flex h-24 w-full items-end justify-center">
                        <div
                          style={{ height: `${barH}px` }}
                          className={`w-full max-w-[28px] rounded-lg transition-all ${
                            day.completed ? "bg-blue-600" : "bg-slate-200"
                          }`}
                        />
                      </div>
                      <span className="text-xs text-text-muted">{day.day}</span>
                    </div>
                  );
                })}
              </div>
              <p className="mt-4 text-xs text-text-secondary">
                Sleep has been a little calmer than last week.
              </p>
            </section>

            {/* Right now I feel... */}
            <section className="rounded-2xl border border-border-default bg-bg-surface p-5 flex flex-col justify-between">
              <div>
                <h3 className="font-heading text-base font-bold text-text-primary">Right now I feel...</h3>
                <div className="phone-mood mt-5 grid grid-cols-5 gap-2">
                  {MOODS.map((item) => {
                    const isSelected = mood === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setMood(item.id)}
                        className={`flex flex-col items-center gap-1.5 rounded-xl p-2 transition-all ${
                          isSelected
                            ? "bg-slate-200 ring-2 ring-blue-600"
                            : "hover:bg-slate-100"
                        }`}
                      >
                        <span
                          className={`flex h-11 w-11 items-center justify-center rounded-full text-xl shadow-xs ${item.bg}`}
                        >
                          {item.emoji}
                        </span>
                        <span className="text-xs font-medium text-text-secondary">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <p className="mt-4 text-xs text-text-muted leading-relaxed">
                {mood
                  ? `Noted: feeling ${mood}. Shared with Priya.`
                  : "Tap one — it takes a second and helps your counsellor understand your day."}
              </p>
            </section>
          </div>

          {/* Your Case Journey Timeline matching Frame 1 */}
          <section className="rounded-2xl border border-border-default bg-bg-surface p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-base font-bold text-text-primary">Your case journey</h3>
              <span className="text-xs font-medium text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full">
                Next hearing 14 Oct
              </span>
            </div>

            <ol className="phone-journey mt-5 grid grid-cols-4 gap-4 relative">
              {(asha?.journey ?? []).map((step, index) => {
                const done = step.status === "done";
                return (
                  <li key={step.step} className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                          done
                            ? "bg-blue-600 text-white"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {done ? <Check size={16} strokeWidth={2.5} /> : <Calendar size={15} />}
                      </span>
                      {index < (asha?.journey?.length ?? 0) - 1 && (
                        <div
                          className={`h-0.5 flex-1 ${done ? "bg-blue-600" : "bg-slate-200"}`}
                        />
                      )}
                    </div>
                    <span className="text-xs font-semibold text-text-primary mt-1">{step.step}</span>
                    <span className="text-xs text-text-muted">{step.date}</span>
                  </li>
                );
              })}
            </ol>
          </section>
        </div>

        {/* Right Sidebar matching Frame 1 */}
        <aside className="space-y-5">
          {/* Talk to someone */}
          <section>
            <h3 className="font-heading text-sm font-bold text-text-primary mb-3">Talk to someone</h3>
            <div className="space-y-2.5">
              <Link
                href="/victim/support"
                className="flex items-center justify-between rounded-2xl border border-border-default bg-bg-surface p-3.5 transition hover:border-slate-300 shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                    <Phone size={17} />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-text-primary">Call my counsellor</p>
                    <p className="text-xs text-text-muted">Priya · 4–6 pm today</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-text-muted" />
              </Link>

              <Link
                href="/victim/checkin?mode=chat"
                className="flex items-center justify-between rounded-2xl border border-border-default bg-bg-surface p-3.5 transition hover:border-slate-300 shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                    <MessageSquare size={17} />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-text-primary">Chat with Sahayak</p>
                    <p className="text-xs text-text-muted">Type answers privately</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-text-muted" />
              </Link>

              <Link
                href="/victim/support"
                className="flex items-center justify-between rounded-2xl border border-border-default bg-bg-surface p-3.5 transition hover:border-slate-300 shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                    <Heart size={17} />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-text-primary">Helpline 14566</p>
                    <p className="text-xs text-text-muted">Free · your language</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-text-muted" />
              </Link>
            </div>
          </section>

          {/* What happens next */}
          <section className="rounded-2xl border border-border-default bg-bg-surface p-4">
            <h3 className="font-heading text-xs font-bold tracking-wider uppercase text-text-primary mb-3">
              What happens next
            </h3>
            <ul className="space-y-2.5 text-xs text-text-secondary">
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-emerald-600 shrink-0" />
                <span>Counsellor call today, 4–6 pm</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                <span>Legal-aid team told about hearing</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock size={14} className="text-emerald-600 shrink-0" />
                <span>Next check-in Thu 6 pm by SMS</span>
              </li>
            </ul>
          </section>

          {/* Safe Check-in Time Panel matching Frame 1 */}
          <section className="rounded-2xl bg-bg-accent-subtle p-4 border border-purple-200/50">
            <span className="text-[10px] font-bold tracking-wider uppercase text-purple-700">
              YOUR SAFE CHECK-IN TIME
            </span>
            <p className="mt-1 font-heading text-sm font-bold text-text-primary">
              Thursdays, 6 pm · by SMS
            </p>
            <p className="mt-1 text-xs text-text-secondary">
              Change how and when we reach you any time.
            </p>
            <Link
              href="/victim/privacy"
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-purple-700 hover:underline"
            >
              <span>Change →</span>
            </Link>
          </section>
        </aside>
      </div>
    </div>
  );
}
