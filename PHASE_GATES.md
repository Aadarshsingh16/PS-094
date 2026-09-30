# SAHAYAK AI — Phase Gate Checklist

> ⛔ **HARD RULE: Do NOT start the next phase until every item in the current phase is checked ✅ and the Phase Gate is signed off.**
> This applies to both the agent and the human reviewer.

---

## How This Works

1. Complete every `[ ]` item in the current phase
2. Mark each as `[x]` when done
3. Human reviewer does a visual check against Figma frames (where applicable)
4. Sign off the Phase Gate at the bottom of each phase section
5. Only then move to the next phase

---

## PHASE 0 — Scaffold & Design System

**Goal:** Project runs locally. All design tokens and atom components are correct before any page is built.

### Setup
- [ ] Next.js 14 project initialized in `web-app/` and runs with `npm run dev`
- [ ] No TypeScript errors on first run
- [ ] Tailwind CSS installed and configured
- [ ] `tailwind.config.ts` has all design tokens defined (no raw hex in components)
- [ ] Google Fonts loaded: Space Grotesk + Inter via `next/font`

### Color Tokens (verify in browser)
- [ ] `brand-primary` renders as emerald green (#16A34A)
- [ ] `risk-critical` renders as red (#EF4444)
- [ ] `risk-high` renders as orange (#F97316)
- [ ] `risk-medium` renders as amber (#EAB308)
- [ ] `risk-low` renders as green (#22C55E)
- [ ] `bg-accent-subtle` renders as lavender (#EDE9FE)
- [ ] `bg-surface` visually distinct from `bg-primary`

### Atom Components (render all on `/dev/tokens` test page)
- [ ] `RiskBadge` — all 4 variants (Critical / High / Medium / Low) render correctly
- [ ] `StatusToggle` — blue when ON, grey when OFF
- [ ] `MetricCard` — number + sparkline + trend chip layout correct
- [ ] `QuickExit` — black button, correct label
- [ ] `SideNav` victim variant — 5 nav items + footer section
- [ ] `SideNav` officer variant — 6 nav items + user chip footer
- [ ] `TopBar` — search bar + bell icon + avatar

### Mock Data Files
- [ ] `/src/data/cases.json` — 4 cases, all required fields present
- [ ] `/src/data/alerts.json` — 7 alerts with severity + SLA fields
- [ ] `/src/data/interventions.json` — at least 3 records
- [ ] `/src/data/checkins.json` — 7-day history for Asha
- [ ] `/src/data/riskTimeline.json` — W1–W8 distress scores

### Code Quality
- [ ] No `any` TypeScript types in atom components
- [ ] No inline hex values or inline styles in any component
- [ ] Folder structure matches PHASE_PLAN.md spec

---

### ✅ PHASE 0 GATE

```
Reviewer sign-off: ______________________
Date: ______________________
Status: [ ] PASS — proceed to Phase 1
        [ ] FAIL — list issues below

Issues:


```

---

## PHASE 1 — Login & Role Selection

**Goal:** All 4 role cards are clickable and route to the correct portal. No real auth.

### Visual
- [ ] SAHAYAK AI logo / icon visible
- [ ] "Your safe space" tagline present
- [ ] 4 role cards displayed with icon + title + description
- [ ] Cards have hover state
- [ ] Language selector visible

### Behaviour
- [ ] Clicking District Officer → `/officer/dashboard`
- [ ] Clicking Counsellor → `/officer/dashboard`
- [ ] Clicking Responder → `/officer/dashboard`
- [ ] Clicking Administrator → `/admin/settings`
- [ ] Role stored in `sessionStorage.role`
- [ ] No authentication required (any click works)

### Design
- [ ] Only design system tokens used (no raw hex)
- [ ] Space Grotesk on heading, Inter on labels
- [ ] Cards: `bg-surface` + `border` + `rounded-2xl` + `shadow-sm`

---

### ✅ PHASE 1 GATE

```
Reviewer sign-off: ______________________
Date: ______________________
Status: [ ] PASS — proceed to Phase 2
        [ ] FAIL — list issues below

Issues:


```

---

## PHASE 2 — Victim Portal

**Goal:** Asha can complete a full check-in (Home → Q1 → Q8 → Complete) and navigate all 6 victim screens.

### 2A — Victim Home (match Figma Frame 1)
- [ ] Left sidebar: logo + 5 nav items + helpline card + Quick exit + user chip (AS · Asha · SMS · English)
- [ ] Quick exit button always visible
- [ ] Greeting: "Good evening, Asha" (or time-appropriate)
- [ ] Hero card: dark gradient background (NOT white)
- [ ] "TODAY'S CHECK-IN" label in orange
- [ ] "How are you feeling today?" as H1
- [ ] Orange "Start check-in →" button
- [ ] Tap · Voice · Chat mode pills below button
- [ ] "Your week" card: 7 bars (Mon–Sun) + "5 of 7 days" label + insight text
- [ ] "Right now I feel..." card: 5 emoji mood options (Calm/Okay/Tense/Afraid/Low)
- [ ] Case journey timeline: 4 steps with dates and icons
- [ ] Right sidebar: 3 "Talk to someone" cards + "What happens next" list + lavender check-in time panel

### 2B — Check-in Flow (match Figma Frame 2)
- [ ] "Daily check-in" title + "Question X of 8 · about Y min left"
- [ ] "Private · only your counsellor sees this" top-right
- [ ] Blue progress bar proportional to current question
- [ ] Category chip (SLEEP / SAFETY / etc.) in lavender
- [ ] Question text in large bold font
- [ ] "No right or wrong answers. You can skip." in muted text
- [ ] 5 radio options, selected = blue fill + checkmark
- [ ] Back · "I would rather not answer" · Continue bar at bottom
- [ ] Right panel: Tap · Voice · Chat tabs
- [ ] Voice tab: dark bg + "Listening" pill + timer + waveform + orange mic button
- [ ] "WHAT WE HEARD" transcript section
- [ ] Lavender "Prefer to type?" card
- [ ] All 8 questions navigable (Back/Continue)

### 2C — Check-in Complete
- [ ] "Thank you, Asha" heading
- [ ] Distress signal shown (no diagnosis language)
- [ ] "Your counsellor will review this" note
- [ ] "Return to home" button works

### 2D — Privacy & Channels (match Figma Frame 3)
- [ ] Page title + subtitle
- [ ] 6 channel cards in 2×3 grid, each with toggle + icon + title + description
- [ ] SMS = ON + "Preferred" badge · Web portal = OFF (matches Figma)
- [ ] "Safe times" panel: day pills + time display
- [ ] "Who can see my answers" 4 toggle rows
- [ ] "Discreet mode" lavender panel with 3 toggles
- [ ] All toggles are interactive

### 2E & 2F — Support + My Case
- [ ] Support page: active support list + emergency card
- [ ] My Case: case ID + stage + timeline

---

### ✅ PHASE 2 GATE

```
Reviewer sign-off: ______________________
Date: ______________________
Figma Frame 1 side-by-side checked: [ ] YES
Figma Frame 2 side-by-side checked: [ ] YES
Figma Frame 3 side-by-side checked: [ ] YES
Status: [ ] PASS — proceed to Phase 3
        [ ] FAIL — list issues below

Issues:


```

---

## PHASE 3 — Officer / Counsellor Dashboard

**Goal:** Priya can navigate dashboard → case → alert → approve intervention with correct mock data.

### 3A — Counsellor Dashboard (match Figma Frame 5)
- [ ] Sidebar: SAHAYAK AI + "Well-being monitoring" + 6 nav items + PS user chip
- [ ] "Good morning, Priya" H1
- [ ] Subtitle with case count + date
- [ ] Search bar + notification bell (with badge) + avatar "PS"

**Metric cards (all 4):**
- [ ] Assigned cases: 48 · "+4 this week" · green sparkline
- [ ] Active alerts: 7 · "2 critical" · red sparkline
- [ ] SLA compliance: 94% · "Target 90%" · green bar
- [ ] Avg distress score: 61 · "+9 vs 14d" · purple sparkline

**Distress trend chart:**
- [ ] Dark background (slate-900)
- [ ] Lime-green line, W1–W8 x-axis
- [ ] "68" numeral + "9.6%" trend chip
- [ ] W8 data point = 72 with tooltip

**Risk distribution donut:**
- [ ] 4 segments with correct colors
- [ ] Center shows "48 active cases"
- [ ] Legend: Critical 6 · High 14 · Medium 18 · Low 10

**Priority cases table:**
- [ ] 4 rows with correct data (matching Figma Frame 5)
- [ ] #USR-7844 shows Critical + 72 ▲ + 00:42 in red
- [ ] Trend arrows on score column

**"Why risk changed" panel:**
- [ ] Lavender background
- [ ] "#USR-7844 · 54→72 in 14 days"
- [ ] 6 factor bars with correct labels and scores
- [ ] "RECOMMENDED · HUMAN REVIEW" checklist
- [ ] Green "Review & assign" button

### 3B — Cases List
- [ ] Table with search + filter
- [ ] 4 demo cases visible
- [ ] Row click → Case Detail

### 3C — Case Detail
- [ ] Case header: masked name + case ID + stage + consent + risk badges
- [ ] 4 tabs: Overview · Risk Analysis · Interventions · History
- [ ] Overview tab: timeline + risk factors + recent events
- [ ] Well-being chart renders with W1–W8 data
- [ ] Action bar: 3 buttons

### 3D — Alerts List
- [ ] Alert cards with severity badges
- [ ] Filter tabs: All · Critical · High · Pending review
- [ ] Each card: case ID + risk level + SLA countdown + Review button

### 3E — Alert Detail
- [ ] Risk badge prominent at top
- [ ] "Why risk increased" factor bars
- [ ] SLA timer animated (not static)
- [ ] APPROVE button — large, green, prominent
- [ ] MODIFY + REJECT as secondary buttons
- [ ] Notes textarea

### 3F — Interventions
- [ ] 5 category cards (Counselling / Protection / Legal / Financial / Rehabilitation)
- [ ] Each: status badge + officer + follow-up date

### 3G — Reports
- [ ] Trend chart + donut + SLA summary visible

---

### ✅ PHASE 3 GATE

```
Reviewer sign-off: ______________________
Date: ______________________
Figma Frame 5 side-by-side checked: [ ] YES
Status: [ ] PASS — proceed to Phase 4
        [ ] FAIL — list issues below

Issues:


```

---

## PHASE 4 — AI Risk Analysis & Demo Engine

**Goal:** Clicking `Analyse Incoming Signals →` auto-plays the full sequence and looks like a real system.

### 4A — Incoming Signals Banner
- [ ] Banner appears at top of Risk Analysis tab in `stable` state
- [ ] Style: amber-50 bg + amber border — looks like a real system notification
- [ ] "🔔 New signals received for Case #USR-7844" heading
- [ ] "Text · Voice · Behaviour · Case Event · 3 min ago" subtext
- [ ] "Analyse Incoming Signals →" button: emerald filled, white text
- [ ] Banner does NOT look like a "demo mode" control

### 4A — Signal Panels
- [ ] Text Analysis panel: fear keyword highlights
- [ ] Voice Analysis panel: waveform icon + "Elevated stress indicator"
- [ ] Behaviour Analysis panel: missed check-ins + engagement metrics
- [ ] Case Context panel: court hearing date + delay + threat report
- [ ] Visual flow arrow: 4 signals → Baseline → Risk

### 4A — Baseline & Risk Panels
- [ ] Personal Baseline panel: 28 (baseline) vs 72 (current) vs +44 (change)
- [ ] Dynamic Risk panel: HIGH badge + 72/100 animated arc + "Elevated" label
- [ ] Explainability panel: 4 factors with bars (+18 / +14 / +11 / +09)
- [ ] Processing path badge: "Fast Crisis Path" or "Deep AI Path"

### 4B — Auto-Play Sequence
- [ ] Click `Analyse Incoming Signals →` → banner disappears, sequence starts
- [ ] "Processing signals..." skeleton appears (not instant data)
- [ ] Signal panels fill in sequentially (~1.5s each)
- [ ] Fusion arrow pulses + "Analysing..." loader
- [ ] Distress count-up: 28 → 72 (animated, not instant)
- [ ] Risk badge animates LOW → HIGH (pulse effect)
- [ ] Explainability factors slide in one by one
- [ ] Toast notification: "⚠ HIGH RISK alert created for #USR-7844"
- [ ] Human Review panel slides in
- [ ] APPROVE click → intervention cards animate in
- [ ] Distress counts down: 72 → 49
- [ ] Risk badge flips HIGH → MEDIUM
- [ ] "Outcome improved · Continue monitoring" green banner

### 4B — Reset
- [ ] `↺ Reset to initial state` link present at page bottom
- [ ] Style: `text-xs text-slate-400` — barely visible
- [ ] Click resets all state, banner reappears
- [ ] NO visible demo controller / step buttons / state labels anywhere

### Demo Realism Check
- [ ] Watch the full sequence — does it look like a real AI system? YES / NO
- [ ] Any element reveals it's a mock? YES (fix) / NO (pass)
- [ ] All transitions smooth (no instant data swaps)? YES / NO

---

### ✅ PHASE 4 GATE

```
Reviewer sign-off: ______________________
Date: ______________________
Full auto-play watched end-to-end: [ ] YES
Looks like a real system (not a demo): [ ] YES
Status: [ ] PASS — proceed to Phase 5
        [ ] FAIL — list issues below

Issues:


```

---

## PHASE 5 — Outcome, Monitoring & Final Polish

**Goal:** Full video recording path works. Product looks premium and demo-ready.

### 5A — Outcome Screen
- [ ] Before/After: 72 → 49 clearly shown
- [ ] Risk HIGH → MEDIUM badge transition
- [ ] Animated chart showing distress drop
- [ ] "Outcome improved · Continue monitoring" green banner
- [ ] Follow-up date card visible

### 5B — Monitoring State
- [ ] Dashboard returns to monitoring state after demo
- [ ] "Monitoring active" chip visible
- [ ] Risk trend chart shows downward slope

### Polish & Animations
- [ ] Page transitions: subtle fade + slide (Framer Motion)
- [ ] Critical badge: animated pulse
- [ ] SLA timer: live countdown (not static number)
- [ ] Distress score: count-up on page load
- [ ] All charts: animated entry on mount
- [ ] Demo step transitions: smooth morphing (not instant swap)
- [ ] "Processing..." skeleton between analysis steps
- [ ] Sidebar collapses to icon-only at 1024px

### Ethical / Safety Audit
- [ ] Zero instances of "diagnoses" (AI context)
- [ ] Zero instances of "guarantees"
- [ ] Zero instances of "AI decides"
- [ ] Footer shows "PROTOTYPE · SYNTHETIC DATA"
- [ ] No real personal data anywhere
- [ ] Quick exit always visible on victim portal

### Code Audit
- [ ] No `any` TypeScript types in component props
- [ ] No inline styles or raw hex values
- [ ] No unused imports
- [ ] All data from `/src/data/*.json` only
- [ ] Demo state machine in `/src/lib/demoState.ts` only

---

### 🎬 Final Video Path Test (run end-to-end)

| Step | Route | Result |
|---|---|---|
| 1. Login → Counsellor | `/login` → `/officer/dashboard` | [ ] ✅ |
| 2. View Dashboard (Priya) | `/officer/dashboard` | [ ] ✅ |
| 3. Click #USR-7844 | → `/officer/cases/nhaa-demo-1042` | [ ] ✅ |
| 4. Open Risk Analysis tab | → tab switch | [ ] ✅ |
| 5. Click "Analyse Incoming Signals →" | auto-play starts | [ ] ✅ |
| 6. Signals fill in sequentially | panels animate | [ ] ✅ |
| 7. Risk changes LOW → HIGH | badge animates | [ ] ✅ |
| 8. Alert toast appears | "HIGH RISK" toast | [ ] ✅ |
| 9. Human Review panel appears | Approve/Modify/Reject | [ ] ✅ |
| 10. Click Approve | intervention confirmed | [ ] ✅ |
| 11. Distress 72 → 49 | count-down animates | [ ] ✅ |
| 12. Risk HIGH → MEDIUM | badge transitions | [ ] ✅ |
| 13. "Outcome improved" banner | green banner | [ ] ✅ |
| 14. Login → Victim (Asha) | `/login` → `/victim/home` | [ ] ✅ |
| 15. Start check-in | → `/victim/checkin` | [ ] ✅ |
| 16. Complete Q1–Q8 | Back/Continue works | [ ] ✅ |
| 17. Check-in complete screen | thank you screen | [ ] ✅ |
| 18. Privacy & channels | `/victim/privacy` | [ ] ✅ |

**All 18 steps checked = READY FOR VIDEO RECORDING** 🎬

---

### ✅ PHASE 5 GATE — FINAL SIGN-OFF

```
Reviewer sign-off: ______________________
Date: ______________________
Video path test completed: [ ] YES — all 18 steps pass
Ethical audit passed: [ ] YES
Code audit passed: [ ] YES
Status: [ ] PROTOTYPE READY FOR VIDEO RECORDING
        [ ] NOT READY — list issues below

Issues:


```

---

## Phase Summary Table

| Phase | Description | Gate Status |
|---|---|---|
| 0 | Scaffold & Design System | ⬜ NOT STARTED |
| 1 | Login & Role Selection | ⬜ NOT STARTED |
| 2 | Victim Portal | ⬜ NOT STARTED |
| 3 | Officer Dashboard | ⬜ NOT STARTED |
| 4 | AI Risk Analysis & Demo Engine | ⬜ NOT STARTED |
| 5 | Outcome, Monitoring & Polish | ⬜ NOT STARTED |

> Update this table as phases are completed. Change ⬜ to ✅ PASS or ❌ FAIL.
