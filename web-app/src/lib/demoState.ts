"use client";

import { create } from "zustand";

// Delays for automatic progression from step 1 through 15:
// step 2..11: signal reveals, fusion, score climb 28->72, alert toast, human review panel
// step 12..15: auto-approve intervention, score drop 72->49, risk high->medium, monitoring active
const AUTO_DELAYS = [
  1400, // step 2: text signals
  1400, // step 3: voice signals
  1400, // step 4: behaviour signals
  1400, // step 5: case context
  1600, // step 6: multimodal fusion
  1800, // step 7: baseline & score 28 -> 72
  1200, // step 8: risk HIGH badge
  1600, // step 9: explainability factor bars
  1200, // step 10: alert created toast
  2600, // step 11: human review panel displays (gives viewer time to see review options)
  1800, // step 12: intervention approved
  2000, // step 13: follow-up scheduled & score 72 -> 49
  1400, // step 14: risk flips HIGH -> MEDIUM
  1400, // step 15: outcome improved & monitoring banner
];

const pending: ReturnType<typeof setTimeout>[] = [];

function clearPending() {
  pending.forEach((id) => clearTimeout(id));
  pending.length = 0;
}

function queue(delays: number[], firstStep: number, setStep: (step: number) => void) {
  let elapsed = 0;
  delays.forEach((delay, index) => {
    elapsed += delay;
    const step = firstStep + index;
    pending.push(setTimeout(() => setStep(step), elapsed));
  });
}

interface DemoStore {
  step: number;
  autoPlay: () => void;
  approve: () => void;
  reset: () => void;
}

export const useDemoState = create<DemoStore>((set, get) => ({
  step: 0,
  autoPlay: () => {
    if (get().step !== 0) return;
    clearPending();
    set({ step: 1 });
    queue(AUTO_DELAYS, 2, (step) => set({ step }));
  },
  approve: () => {
    if (get().step < 11) return;
    clearPending();
    set({ step: 12 });
    queue([1800, 2000, 1400, 1400], 13, (step) => set({ step }));
  },
  reset: () => {
    clearPending();
    set({ step: 0 });
  },
}));
