"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, Mic } from "lucide-react";
import questions from "@/data/checkinQuestions.json";
import { saveCheckinAnswers } from "@/lib/checkin";

type Mode = "tap" | "voice" | "chat";

function minutesLeft(index: number) {
  return Math.max(1, 3 - Math.floor(index / 2));
}

export default function CheckinPage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(() => questions.map(() => null));
  const [mode, setMode] = useState<Mode>("voice");
  const [seconds, setSeconds] = useState(0);

  const question = questions[index];
  const selected = answers[index];
  const progress = ((index + 1) / questions.length) * 100;

  useEffect(() => {
    if (mode !== "voice") return;
    const timer = setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => clearInterval(timer);
  }, [mode]);

  function choose(option: string) {
    setAnswers((current) => current.map((value, itemIndex) => (itemIndex === index ? option : value)));
  }

  function finish(nextAnswers: (string | null)[]) {
    saveCheckinAnswers(
      questions.map((item, itemIndex) => ({
        questionId: item.id,
        value: nextAnswers[itemIndex] ?? "skipped",
      })),
    );
    router.push("/victim/checkin/complete");
  }

  function goNext(value: string | null) {
    const nextAnswers = answers.map((item, itemIndex) => (itemIndex === index ? value : item));
    setAnswers(nextAnswers);
    if (index === questions.length - 1) {
      finish(nextAnswers);
      return;
    }
    setIndex(index + 1);
  }

  function goBack() {
    if (index === 0) {
      router.push("/victim/home");
      return;
    }
    setIndex(index - 1);
  }

  const clock = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

  return (
    <div className="flex min-h-screen">
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-start justify-between gap-4 px-8 py-6">
          <div className="flex items-start gap-3">
            <Link href="/victim/home" aria-label="Back to home" className="mt-1 text-text-secondary">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="font-heading text-heading-xl font-bold text-text-primary">Daily check-in</h1>
              <p className="mt-1 text-sm text-text-secondary">
                Question {index + 1} of {questions.length} · about {minutesLeft(index)} minutes left
              </p>
            </div>
          </div>
          <p className="text-sm text-text-muted">Private · only your counsellor sees this</p>
        </header>

        <div className="px-8">
          <svg viewBox="0 0 100 4" className="h-1.5 w-full" preserveAspectRatio="none" aria-hidden="true">
            <rect width="100" height="4" rx="2" className="fill-border-subtle" />
            <rect width={progress} height="4" rx="2" className="fill-status-on" />
          </svg>
        </div>

        <div className="flex-1 px-8 py-8">
          <span className="inline-flex rounded-full bg-bg-accent-subtle px-3 py-1 text-xs font-semibold tracking-wide text-accent-lavender">
            {question.category}
          </span>
          <h2 className="mt-4 font-heading text-display-2xl font-bold text-text-primary">{question.prompt}</h2>
          <p className="mt-2 text-sm text-text-muted">No right or wrong answers. You can skip.</p>

          <div className="mt-6 max-w-xl space-y-3">
            {question.options.map((option) => {
              const active = selected === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => choose(option)}
                  className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm ${
                    active
                      ? "border-status-on bg-status-on text-text-inverse"
                      : "border-border-default bg-bg-surface text-text-primary"
                  }`}
                >
                  {option}
                  {active ? <Check size={16} /> : null}
                </button>
              );
            })}
          </div>
        </div>

        <footer className="flex items-center justify-between gap-4 border-t border-border-subtle px-8 py-4">
          <button type="button" onClick={goBack} className="text-sm font-medium text-text-secondary">
            Back
          </button>
          <button
            type="button"
            onClick={() => goNext("skipped")}
            className="text-sm text-text-secondary underline"
          >
            I would rather not answer
          </button>
          <button
            type="button"
            disabled={!selected}
            onClick={() => selected && goNext(selected)}
            className="rounded-xl bg-brand-primary px-6 py-3 text-sm font-medium text-text-inverse disabled:opacity-40"
          >
            Continue
          </button>
        </footer>
      </div>

      <aside className="flex w-80 shrink-0 flex-col gap-4 border-l border-border-default bg-bg-primary p-5">
        <div className="grid grid-cols-3 rounded-xl bg-bg-surface p-1">
          {(["tap", "voice", "chat"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setMode(item)}
              className={`rounded-lg px-2 py-2 text-sm capitalize ${
                mode === item ? "bg-bg-primary font-medium text-brand-primary shadow-sm" : "text-text-secondary"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {mode === "voice" ? (
          <div className="rounded-2xl bg-quick-exit p-5 text-text-inverse">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-3 py-1 text-xs font-medium">
              Listening
            </span>
            <p className="mt-4 font-heading text-3xl font-bold">{clock}</p>
            <div className="mt-4 flex h-12 items-end gap-1" aria-hidden="true">
              {["h-2", "h-4", "h-7", "h-5", "h-8", "h-3", "h-6", "h-2", "h-5"].map((height, bar) => (
                <span key={bar} className={`w-1.5 rounded-full bg-risk-low ${height}`} />
              ))}
            </div>
            <button
              type="button"
              className="mx-auto mt-5 flex h-14 w-14 items-center justify-center rounded-full bg-risk-high"
              aria-label="Microphone"
            >
              <Mic size={22} />
            </button>
          </div>
        ) : null}

        {mode === "tap" ? (
          <div className="rounded-2xl border border-border-default bg-bg-surface p-4 text-sm text-text-secondary">
            Tap one answer on the left. There is no right or wrong answer.
          </div>
        ) : null}

        {mode === "chat" ? (
          <div className="rounded-2xl border border-border-default bg-bg-surface p-4 text-sm text-text-secondary">
            Type is available on the question. Your counsellor still reviews what you send.
          </div>
        ) : null}

        <section>
          <p className="text-xs font-semibold tracking-wide text-text-muted">WHAT WE HEARD</p>
          <p className="mt-2 text-sm text-text-secondary">{question.heard}</p>
        </section>

        <button
          type="button"
          onClick={() => setMode("chat")}
          className="rounded-2xl bg-bg-accent-subtle p-4 text-left"
        >
          <p className="font-heading text-sm font-bold text-text-primary">Prefer to type?</p>
          <p className="mt-1 text-sm text-text-secondary">Switch to Chat</p>
        </button>
      </aside>
    </div>
  );
}
