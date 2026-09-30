---
name: sahayak-web-agent
description: >
  Strict development guardrails for the SAHAYAK AI web prototype.
  Use this skill for EVERY code generation task in this project.
  Prevents unnecessary code, enforces Figma fidelity, and keeps
  the build strictly within the phased plan (PHASE_PLAN.md).
  Read this BEFORE writing any code for SAHAYAK AI.
---

# SAHAYAK AI — Web Development Agent Skill

## Purpose
This skill ensures the development agent generates **only the code that is required** for the current phase and screen, matching the Figma frames and mock data exactly. It prevents scope creep, over-engineering, and design inconsistency.

---

## MANDATORY Pre-Generation Checklist

Before writing ANY code, answer all 5 questions:

1. **Which phase is this task part of?** (Phase 0–5 from PHASE_PLAN.md)
2. **Which exact screen/component is being built?** (Name it exactly as in PHASE_PLAN.md)
3. **Does a Figma frame exist for this screen?** (If yes, match it pixel-perfectly)
4. **What mock data does this component consume?** (Use only data defined in mock data layer)
5. **Is this component already covered by an existing atom?** (Reuse before creating new)

If any question cannot be answered, STOP and ask the user to clarify before proceeding.

---

## Hard Rules — NEVER Violate

### 0. Phase Gate Enforcement (HIGHEST PRIORITY)
Before writing ANY code for a new phase:
- Open `PHASE_GATES.md`
- Confirm the previous phase gate is signed off (`[ ] PASS`)
- If NOT signed off → STOP. Do not write code. Tell the user to complete the gate review first.
- The agent must never skip or auto-pass a gate.

### 1. Build Only What's In The Phase
- Do NOT implement features from future phases
- Do NOT add "nice to have" features not listed in the current phase deliverables
- Do NOT build mobile layouts (the `moible/` directory is out of scope)
- Do NOT connect to any real API — all data is JSON mock only

### 2. Match Figma Frames Exactly
- Every pixel of a Figma-matched screen must replicate the frame faithfully
- Use ONLY the color tokens defined in Phase 0 design system (no ad-hoc hex values)
- Use ONLY Space Grotesk (headings/numerics) and Inter (body/labels) fonts
- Card border-radius: `rounded-2xl` (16px) for cards, `rounded-xl` (12px) for inner elements
- Do NOT redesign any screen — if in doubt, match the Figma frame

### 3. Token Discipline
Always use the design system tokens. Never use raw color values in components.

```
Correct:   className="bg-risk-critical text-white"
Incorrect: className="bg-red-500 text-white"

Correct:   className="text-text-primary"
Incorrect: className="text-slate-900"
```

### 4. Mock Data Discipline
- All data comes from `/src/data/*.json` files
- Never hardcode data inline in components (exception: static UI copy/labels)
- Demo case data: NHAA-DEMO-1042 / #USR-7844 / Asha / Priya Sharma
- Never use real names, real places, or real case details

### 5. Component Reuse
Before creating any new component, check:
- Does `RiskBadge` cover this? → use it
- Does `MetricCard` cover this? → use it
- Does `SideNav` cover this? → use it
Only create a new component if none of the atoms/molecules cover the need.

### 6. Ethical Terminology
The codebase must NEVER contain these strings:
- "diagnoses" (in relation to AI)
- "guarantees"
- "predicts with certainty"
- "AI decides" (AI recommends only)
- "replaces counsellor"

Always use: distress indicator · well-being signal · risk level · decision support · human review

### 7. Animation Discipline
- Use Framer Motion for page transitions and data state changes
- Do NOT add animations not listed in Phase 5 polish checklist
- Keep animations subtle: max 300ms duration, ease-in-out
- Demo simulation transitions: 500ms with data morphing (not instant swap)

---

## Screen Implementation Protocol

When implementing any screen:

```
Step 1: Read the corresponding PHASE_PLAN.md section
Step 2: View the Figma frame (if one exists in web/ folder)
Step 3: List all components needed
Step 4: Check which atoms already exist
Step 5: Write atoms first, then compose the page
Step 6: Wire to mock data JSON
Step 7: Verify against Figma frame visually
Step 8: Add to routes in app router
```

---

## File Structure (Enforced)

```
web-app/
├── src/
│   ├── app/
│   │   ├── (victim)/victim/
│   │   │   ├── home/page.tsx
│   │   │   ├── checkin/page.tsx
│   │   │   ├── checkin/complete/page.tsx
│   │   │   ├── mycase/page.tsx
│   │   │   ├── support/page.tsx
│   │   │   └── privacy/page.tsx
│   │   ├── (officer)/officer/
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── cases/page.tsx
│   │   │   ├── cases/[id]/page.tsx
│   │   │   ├── cases/[id]/outcome/page.tsx
│   │   │   ├── alerts/page.tsx
│   │   │   ├── alerts/[id]/page.tsx
│   │   │   ├── interventions/page.tsx
│   │   │   └── reports/page.tsx
│   │   ├── login/page.tsx
│   │   └── layout.tsx
│   ├── components/
│   │   ├── atoms/         ← Phase 0 atoms only
│   │   ├── molecules/     ← Composed from atoms
│   │   └── layouts/       ← SideNav, TopBar, Shell
│   ├── data/              ← JSON mock data files only
│   ├── hooks/             ← useDemo, useRole, useCase
│   └── lib/               ← mock API functions, demo state machine
├── tailwind.config.ts     ← All design tokens defined here
└── ...
```

---

## What NOT to Generate

| Temptation | Correct Action |
|---|---|
| "I'll add a real API call" | Use JSON mock data from /src/data/ |
| "I'll add a dark mode toggle" | Not in scope — skip |
| "I'll add mobile breakpoints" | Web-only — skip |
| "I'll add animations to every element" | Only Phase 5 polish list items |
| "I'll create a new color that matches better" | Use only defined tokens |
| "I'll add real-time updates with WebSockets" | Use demo simulation state machine |

---

## Demo Simulation State Machine

Lives in `/src/lib/demoState.ts`. Zustand store with `autoPlay()` action.

**LOCKED TRIGGER:** The only entry point is the `Analyse Incoming Signals →` button
(emerald filled, in the incoming signals banner at top of Risk Analysis tab).

**NEVER build:** a visible demo controller, step buttons, state labels, or any UI that
reveals this is a mock. The system must look real to a video viewer.

States:
```
stable → processing → signals_filled → analysing
→ baseline_updated → risk_high → explainability
→ alert_created → human_review → intervention_approved
→ followup → risk_improving → monitoring
```

Each transition updates: risk score · risk level badge · signal panels · factor bars · alert list · distress chart

Auto-play timing: ~1.5–2s per step via `setTimeout` chain in `autoPlay()` action.

Reset: `↺ Reset to initial state` — tiny `text-xs text-slate-400` link at page bottom only.

---

## Visual Consistency Rules

| Element | Specification |
|---|---|
| Page background | #FFFFFF |
| Card background | #F8FAFC |
| Card border | border border-slate-200 |
| Card radius | rounded-2xl |
| Primary button | bg-brand-primary text-white rounded-xl px-6 py-3 |
| AI/Risk panel bg | bg-accent-subtle (#EDE9FE) lavender |
| Dark chart panel | bg-slate-900 rounded-2xl |
| Sidebar width | 220px (victim) / 200px (officer) |
| Active nav item | bg-emerald-50 text-brand-primary font-medium |

---

## Review Before Committing Any Code

1. Does it match the Figma frame? (if applicable)
2. Does it use only design tokens?
3. Does it consume mock JSON data?
4. Does it stay within the current phase scope?
5. Does it contain any prohibited strings?
6. Does it avoid mobile-specific code?
7. Does it reuse existing atoms where possible?

**All 7 = YES → proceed. Any NO → fix first.**
