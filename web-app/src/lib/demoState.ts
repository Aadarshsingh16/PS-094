"use client";

import { create } from "zustand";

const TO_REVIEW = [1500, 1500, 1500, 1500, 1500, 2000, 2000, 1000, 2000, 1000];
const AFTER_APPROVE = [1500, 2000, 1000];

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
    queue(TO_REVIEW, 2, (step) => set({ step }));
  },
  approve: () => {
    if (get().step < 11) return;
    clearPending();
    set({ step: 12 });
    queue(AFTER_APPROVE, 13, (step) => set({ step }));
  },
  reset: () => {
    clearPending();
    set({ step: 0 });
  },
}));
