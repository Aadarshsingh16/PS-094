"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, Lock, MessageSquare, Mic, Send, Volume2 } from "lucide-react";
import questions from "@/data/checkinQuestions.json";
import { saveCheckinAnswers } from "@/lib/checkin";

type Mode = "tap" | "voice" | "chat";

function minutesLeft(index: number, total: number) {
  return Math.max(1, Math.ceil((total - index) / 3));
}

export default function CheckinPage() {
  const router = useRouter();
  const [index, setIndex] = useState(1); // Default to Question 2 ("How well did you sleep last night?") matching Frame 2
  const [answers, setAnswers] = useState<(string | null)[]>(() => questions.map(() => null));
  const [mode, setMode] = useState<Mode>("voice");
  const [seconds, setSeconds] = useState(0); // Starts at 00:00 - timer only ticks when clicked
  const [isListening, setIsListening] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [typedHeard, setTypedHeard] = useState("");
  const [detectedVoice, setDetectedVoice] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatSubmitted, setChatSubmitted] = useState<string | null>(null);

  const question = questions[index] ?? questions[0];
  const selected = answers[index];
  const progress = ((index + 1) / questions.length) * 100;

  useEffect(() => {
    // Check url search params for mode
    const searchParams = new URLSearchParams(window.location.search);
    const m = searchParams.get("mode") as Mode;
    if (m === "tap" || m === "voice" || m === "chat") {
      setMode(m);
    }
  }, []);

  // Timer only runs when voice mode is active AND listening is explicitly turned on by user click
  useEffect(() => {
    if (mode !== "voice" || !isListening) return;
    const timer = setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => clearInterval(timer);
  }, [mode, isListening]);

  function choose(option: string) {
    setAnswers((current) => current.map((value, itemIndex) => (itemIndex === index ? option : value)));
  }

  function handleSendChat(customText?: string) {
    const text = (customText ?? chatInput).trim();
    if (!text) return;
    setChatSubmitted(text);
    setTypedHeard(text);
    setChatInput("");
    setDetectedVoice(true);

    const lower = text.toLowerCase();
    let matched = question.options[2] ?? question.options[1];
    if (
      lower.includes("not") ||
      lower.includes("poor") ||
      lower.includes("bad") ||
      lower.includes("threat") ||
      lower.includes("afraid") ||
      lower.includes("alone") ||
      lower.includes("could not") ||
      lower.includes("two") ||
      lower.includes("2")
    ) {
      matched = question.options[question.options.length - 1] ?? question.options[2];
    } else if (
      lower.includes("yes") ||
      lower.includes("good") ||
      lower.includes("well") ||
      lower.includes("safe") ||
      lower.includes("steady")
    ) {
      matched = question.options[0];
    }
    choose(matched);
  }

  function toggleListening() {
    if (isSimulating) return;
    setIsListening((prev) => !prev);
  }

  function simulateVoiceAnswer() {
    setIsListening(true);
    setIsSimulating(true);
    setDetectedVoice(false);
    setTypedHeard("");
    const targetText = question.heard;
    let charIndex = 0;

    const interval = setInterval(() => {
      charIndex++;
      setTypedHeard(targetText.slice(0, charIndex));
      if (charIndex >= targetText.length) {
        clearInterval(interval);
        setIsSimulating(false);
        setIsListening(false);
        setDetectedVoice(true);
        // Automatically select the stressed/relevant option for this question
        const defaultChoice = question.options[2] ?? question.options[1];
        choose(defaultChoice);
      }
    }, 35);
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
    setSeconds(0);
    setIsListening(false);
    setIsSimulating(false);
    setTypedHeard("");
    setDetectedVoice(false);
    setChatInput("");
    setChatSubmitted(null);
  }

  function goBack() {
    if (index === 0) {
      router.push("/victim/home");
      return;
    }
    setIndex(index - 1);
    setSeconds(0);
    setIsListening(false);
    setIsSimulating(false);
    setTypedHeard("");
    setDetectedVoice(false);
    setChatInput("");
    setChatSubmitted(null);
  }

  const clock = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  return (
    <div className="checkin-layout flex min-h-screen bg-bg-primary text-text-primary">
      <div className="checkin-main flex min-w-0 flex-1 flex-col">
        {/* Header matching Frame 2 */}
        <header className="checkin-head app-row flex items-center justify-between gap-4 px-8 py-5">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={goBack}
              aria-label="Back"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border-default bg-bg-surface text-text-secondary hover:text-text-primary"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 className="font-heading text-xl font-bold text-text-primary">Daily check-in</h1>
              <p className="text-xs text-text-secondary">
                Question {index + 1} of {questions.length} · about {minutesLeft(index, questions.length)} minutes left
              </p>
            </div>
          </div>
          <p className="flex items-center gap-1.5 text-xs text-text-muted">
            <Lock size={13} className="text-brand-primary" />
            Private · only your counsellor sees this
          </p>
        </header>

        {/* Linear progress bar spanning full width */}
        <div className="checkin-head w-full bg-border-subtle h-1">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question Area */}
        <div className="checkin-body mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-8 py-8">
          <span className="w-fit rounded-full bg-bg-accent-subtle px-3 py-1 font-heading text-xs font-bold uppercase tracking-wider text-accent-lavender">
            {question.category}
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold text-text-primary leading-tight">
            {question.prompt}
          </h2>
          <p className="mt-2 text-sm text-text-muted">
            {mode === "chat"
              ? "Type your response below freely in your own words, or tap an option to select."
              : "There are no right or wrong answers. You can skip any question."}
          </p>

          {/* Interactive Chat & Typing Input Card when mode === 'chat' */}
          {mode === "chat" && (
            <div className="mt-5 rounded-2xl border-2 border-brand-primary/40 bg-emerald-50/20 p-5 shadow-xs">
              <div className="app-row flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 font-heading text-xs font-bold text-brand-primary uppercase tracking-wider">
                  <MessageSquare size={15} /> Type your answer
                </span>
                <span className="text-xs text-text-muted">Press Enter ↵ to send</span>
              </div>

              <div className="app-row mt-3 flex gap-2">
                <textarea
                  rows={2}
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendChat();
                    }
                  }}
                  placeholder="Type how you are feeling in your own words (English, Hindi, regional)..."
                  className="w-full resize-none rounded-xl border border-border-default bg-bg-surface px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
                />
                <button
                  type="button"
                  onClick={() => handleSendChat()}
                  disabled={!chatInput.trim()}
                  className="self-end inline-flex items-center gap-1.5 rounded-xl bg-brand-primary px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-brand-secondary disabled:opacity-40 disabled:hover:bg-brand-primary"
                >
                  <Send size={13} />
                  <span>Send</span>
                </button>
              </div>

              {/* Quick suggestion chips */}
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-medium text-text-muted">Quick suggestions:</span>
                {question.options.slice(0, 3).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleSendChat(opt)}
                    className="rounded-full border border-border-default bg-bg-surface px-2.5 py-1 text-xs text-text-secondary hover:border-brand-primary hover:text-brand-primary transition"
                  >
                    + {opt}
                  </button>
                ))}
              </div>

              {chatSubmitted && (
                <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-900">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-700">
                    <Check size={14} /> Message recorded
                  </div>
                  <p className="mt-1 italic">&ldquo;{chatSubmitted}&rdquo;</p>
                  <p className="mt-2 text-emerald-700">
                    Categorized as <strong>{selected}</strong>. Click <strong>Continue</strong> below to proceed.
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="mt-6 space-y-3">
            {question.options.map((option) => {
              const active = selected === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => choose(option)}
                  className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition-all ${
                    active
                      ? "border-2 border-blue-600 bg-blue-50/20 shadow-sm"
                      : "border-border-default bg-bg-surface hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                        active ? "border-blue-600 bg-blue-600" : "border-slate-300"
                      }`}
                    >
                      {active ? <span className="h-2 w-2 rounded-full bg-white" /> : null}
                    </span>
                    <span className="text-sm font-medium text-text-primary">{option}</span>
                  </div>
                  {active ? (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full text-blue-600">
                      <Check size={18} strokeWidth={2.5} />
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>

          {detectedVoice && (
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5 text-xs font-medium text-emerald-800 border border-emerald-200">
              <Check size={15} className="text-emerald-600" />
              <span>Speech input recognized and matched: <strong>{selected}</strong></span>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <footer className="checkin-actions flex items-center justify-between gap-4 border-t border-border-subtle px-8 py-4 bg-bg-surface/50">
          <button
            type="button"
            onClick={goBack}
            className="rounded-xl border border-border-default bg-bg-surface px-5 py-2.5 text-sm font-medium text-text-primary hover:bg-slate-100"
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => goNext("skipped")}
            className="text-sm text-text-muted hover:text-text-secondary underline"
          >
            I would rather not answer
          </button>
          <button
            type="button"
            disabled={!selected}
            onClick={() => selected && goNext(selected)}
            className="rounded-xl bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-blue-600"
          >
            Continue
          </button>
        </footer>
      </div>

      {/* Right Aside Panel matching Frame 2 */}
      <aside className="checkin-aside flex w-84 shrink-0 flex-col gap-5 border-l border-border-default bg-bg-primary p-6">
        {/* Mode Tabs: Tap, Voice, and Chat */}
        <div className="grid grid-cols-3 rounded-full bg-slate-100 p-1">
          {(["tap", "voice", "chat"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setMode(item)}
              className={`flex items-center justify-center gap-1.5 rounded-full py-1.5 text-xs font-semibold capitalize transition-all ${
                mode === item
                  ? "bg-bg-primary text-text-primary shadow-sm"
                  : "text-text-muted hover:text-text-secondary"
              }`}
            >
              {item === "tap" ? <span>⌨</span> : item === "voice" ? <span>🎙</span> : <span>💬</span>}
              <span>{item}</span>
            </button>
          ))}
        </div>

        {/* Voice Card matching Frame 2 */}
        {mode === "voice" ? (
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#110e24] via-[#1c143a] to-[#120f26] p-6 text-center text-text-inverse shadow-md">
            <div className="flex items-center justify-center">
              {isListening ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-black/40 px-3 py-1 text-xs font-medium text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Listening...
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-medium text-slate-300">
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  Tap mic to speak
                </span>
              )}
            </div>

            <p className="mt-4 font-heading text-4xl font-bold tracking-tight text-white">{clock}</p>

            {/* Dynamic Sound Waveform */}
            <div className="my-5 flex h-14 items-center justify-center gap-1 px-4" aria-hidden="true">
              {[12, 24, 38, 20, 48, 32, 44, 22, 36, 16, 28, 42, 18, 30].map((h, i) => {
                const colors = [
                  "bg-orange-500",
                  "bg-amber-400",
                  "bg-yellow-400",
                  "bg-lime-400",
                  "bg-emerald-400",
                  "bg-cyan-400",
                ];
                const color = colors[i % colors.length];
                const heightClass = isListening
                  ? `${Math.min(52, h + ((seconds + i) % 4) * 8)}px`
                  : isSimulating
                  ? `${Math.min(52, h + (i % 3) * 6)}px`
                  : `${Math.max(6, Math.round(h * 0.35))}px`;
                return (
                  <span
                    key={i}
                    style={{ height: heightClass }}
                    className={`w-1.5 rounded-full transition-all duration-150 ${color} ${
                      isListening || isSimulating ? "opacity-100" : "opacity-40"
                    }`}
                  />
                );
              })}
            </div>

            {/* Microphone Button with Pulse */}
            <button
              type="button"
              onClick={toggleListening}
              className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lg transition active:scale-95 ${
                isListening
                  ? "bg-orange-600 ring-4 ring-orange-500/40 shadow-orange-600/60 animate-pulse"
                  : "bg-orange-600 hover:bg-orange-500 shadow-orange-600/40"
              }`}
              aria-label={isListening ? "Pause microphone" : "Start microphone"}
              title={isListening ? "Click to pause" : "Click to speak"}
            >
              <Mic size={26} />
            </button>
            <p className="mt-3 text-xs text-slate-300">
              {isListening ? "Listening to your voice... (tap mic to stop)" : "Click mic to speak in your own language"}
            </p>

            {/* Quick Simulation Trigger for Demo */}
            <button
              type="button"
              onClick={simulateVoiceAnswer}
              disabled={isSimulating}
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/20 active:scale-95 disabled:opacity-50"
            >
              <Volume2 size={13} />
              <span>{isSimulating ? "Speaking..." : "Simulate Voice Answer"}</span>
            </button>
          </div>
        ) : null}

        {/* Chat Mode Card in Aside */}
        {mode === "chat" ? (
          <div className="flex flex-col gap-3 rounded-2xl border border-border-default bg-bg-surface p-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-border-subtle pb-2.5">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-subtle text-brand-primary">
                  <MessageSquare size={14} />
                </span>
                <span className="font-heading text-xs font-bold text-text-primary">Chat with Sahayak</span>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Online
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="rounded-xl rounded-tl-sm bg-slate-100 p-2.5 text-text-secondary leading-relaxed">
                <p className="font-bold text-text-primary mb-0.5">Sahayak</p>
                Asha, you can type your answer freely in the box on the left. Everything is transcribed securely for your counsellor.
              </div>

              {chatSubmitted ? (
                <div className="rounded-xl rounded-tr-sm bg-brand-primary p-2.5 text-white leading-relaxed text-right">
                  <p className="font-bold mb-0.5 text-emerald-100">You</p>
                  {chatSubmitted}
                </div>
              ) : null}
            </div>

            <button
              type="button"
              onClick={() => setMode("voice")}
              className="mt-1 text-xs font-medium text-brand-primary hover:underline text-left"
            >
              Prefer to speak? Switch to Voice mode →
            </button>
          </div>
        ) : null}

        {mode === "tap" ? (
          <div className="rounded-2xl border border-border-default bg-bg-surface p-4 text-xs text-text-secondary leading-relaxed">
            Tap any response card on the left. Zero typing required. You can switch to Voice or Chat at any time.
          </div>
        ) : null}

        {/* WHAT WE HEARD Section matching Frame 2 */}
        <section className="rounded-2xl border border-border-default bg-bg-surface p-4">
          <p className="text-xs font-bold tracking-wider text-text-muted uppercase">WHAT WE HEARD</p>
          <p className="mt-2 text-sm italic text-text-secondary leading-relaxed">
            {typedHeard || question.heard}
          </p>
        </section>

        {/* Human Support Notice */}
        <div className="rounded-2xl bg-bg-accent-subtle p-4 text-left">
          <p className="font-heading text-sm font-bold text-text-primary">Need a person?</p>
          <p className="mt-1 text-xs text-text-secondary leading-relaxed">
            Call free 14566 or request a counsellor callback at any time.
          </p>
        </div>
      </aside>
    </div>
  );
}
