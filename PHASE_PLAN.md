# SAHAYAK AI — Web Prototype Development Phases

> **Scope:** Web portal only. Mobile (`moible/`) is explicitly excluded from all phases.
> **Goal:** A convincing, video-recordable end-to-end mock demonstration.
> **Stack:** Next.js 14 (App Router) · Tailwind CSS · Recharts · Framer Motion · JSON mock data
> **Demo Case:** NHAA-DEMO-1042 / #USR-7844 (Threatened Witness, Asha, 28)

---

## Phase 0 — Project Scaffold & Design System
**Duration estimate:** 0.5 day
**Depends on:** Nothing

### Deliverables
- [ ] Next.js 14 project initialized (`./web-app/`)
- [ ] Tailwind config with full SAHAYAK design token set
- [ ] Global CSS vars: color primitives, semantic roles, typography scale
- [ ] Font setup: **Space Grotesk** (headings/numerics) + **Inter** (body/labels) via next/font
- [ ] Reusable atom components:
  - `RiskBadge` — Critical / High / Medium / Low with correct colors
  - `StatusToggle` — on/off toggle (blue active state)
  - `MetricCard` — stat + mini sparkline + trend chip
  - `SectionHeader` — page title + subtitle
  - `QuickExit` — black "X Quick exit" button (always visible for victim portal)
  - `SideNav` — left sidebar (victim variant + officer variant)
  - `TopBar` — search + notification bell + user avatar
- [ ] Color token map (from Figma design system frame):

| Token | Hex | Use |
|---|---|---|
| `brand-primary` | #16A34A (emerald-600) | Primary CTAs, nav active |
| `brand-secondary` | #059669 | Hover states |
| `accent-lavender` | #8B5CF6 (lavender-600) | AI risk panels, highlights |
| `risk-critical` | #EF4444 | Critical risk label |
| `risk-high` | #F97316 | High risk label |
| `risk-medium` | #EAB308 | Medium risk label |
| `risk-low` | #22C55E | Low risk label |
| `bg-primary` | #FFFFFF | Page background |
| `bg-surface` | #F8FAFC | Card background |
| `bg-accent-subtle` | #EDE9FE | Lavender panel bg |
| `text-primary` | #0F172A | Headings |
| `text-secondary` | #475569 | Sub-labels |

- [ ] Mock data layer (`/src/data/`):
  - `cases.json` — 4 demo cases
  - `alerts.json` — 7 active alerts
  - `interventions.json` — intervention records
  - `checkins.json` — Asha's 7-day check-in history
  - `riskTimeline.json` — week-by-week risk scores (W1–W8)

### Definition of Done
All atom components render correctly with design token colors on a test page.

---

## Phase 1 — Login & Role Selection
**Duration estimate:** 0.5 day
**Depends on:** Phase 0

### Screens
#### 1A. Login Page
- SAHAYAK AI logo + "Your safe space" tagline
- Role selector cards (4 roles):
  - `District Officer`
  - `Counsellor / Mental Health Professional`
  - `Responder / Protection Officer`
  - `Administrator`
- Name/credential input (mock — no real auth)
- "Enter portal" CTA routes to correct portal
- Language selector (English / Hindi / Regional — mock)

### Routes
| Role | Route |
|---|---|
| Victim (Asha) | `/victim/home` |
| Counsellor | `/officer/dashboard` |
| District Officer | `/officer/dashboard?role=district` |
| Administrator | `/admin/settings` |

### Mock Behaviour
- Any credentials accepted
- Role selection sets `sessionStorage.role`
- Demo shortcut: clicking any role card immediately enters with demo user

### Definition of Done
All 4 role cards clickable and route to correct portal entry point.

---

## Phase 2 — Victim Portal (Asha's View)
**Duration estimate:** 1.5 days
**Depends on:** Phase 0, Phase 1

### Screens
#### 2A. Victim Home (`/victim/home`)
Matches Figma Frame 1 exactly.

Components:
- Left sidebar: SAHAYAK logo · Home · Check-in · My case · Support · Privacy & channels
- Sidebar footer: "Need a person?" helpline card + Quick exit button + user chip (AS · Asha · SMS · English)
- Top bar: greeting ("Good evening, Asha") + subtitle + Language dropdown
- Hero check-in card (dark gradient bg):
  - "TODAY'S CHECK-IN" label (orange/amber)
  - "How are you feeling today?" H1
  - "6 short questions · about 3 minutes" subtitle
  - Orange "Start check-in" CTA button
  - Mode pills: Tap · Voice · Chat
- "Your week" card: 7-bar chart (Mon–Sun), progress label "5 of 7 days", insight text
- "Right now I feel..." card: 5 emoji mood buttons (Calm/Okay/Tense/Afraid/Low)
- "Your case journey" card: horizontal step tracker
- Right sidebar:
  - "Talk to someone" section: 3 cards (Call counsellor · Chat with Sahayak · Helpline 14566)
  - "What happens next" list (3 items)
  - "Your safe check-in time" lavender panel + Change link

#### 2B. Check-in Flow (`/victim/checkin`)
Matches Figma Frame 2.

Components:
- Back arrow + "Daily check-in" title + "Question 3 of 8 · about 2 minutes left"
- Top right: "Private · only your counsellor sees this"
- Blue progress bar (proportional to question number)
- Category chip (e.g., "SLEEP" in lavender)
- Question text + "no right or wrong answers" note
- Radio option cards (5 options, selected = blue fill + checkmark)
- Bottom bar: Back · "I would rather not answer" · Continue
- Right panel — Mode tabs: Tap · Voice (active) · Chat
  - Voice mode: dark gradient bg, "Listening" pill, timer, waveform bars, orange mic button
  - "WHAT WE HEARD" transcript
  - Lavender info card: "Prefer to type? Switch to Chat"

Question set (8 questions):
1. Safety — "Do you feel safe right now?"
2. Sleep — "How well did you sleep last night?" (shown in Figma)
3. Mood — "How has your mood been today?"
4. Fear — "Have you felt afraid or threatened?"
5. Support — "Do you feel supported by people around you?"
6. Engagement — "Have you been able to do your daily activities?"
7. Physical — "How is your physical health?"
8. Thoughts — "Any thoughts you'd like to share?"

#### 2C. Check-in Complete (`/victim/checkin/complete`)
- Summary card: "Thank you, Asha"
- Distress signal bar (animated)
- "Your counsellor will review this" note
- Next check-in reminder
- "Return to home" button

#### 2D. Privacy & Channels (`/victim/privacy`)
Matches Figma Frame 3.

Components:
- Page title + subtitle
- Channel grid (2x3): SMS (Preferred) · Phone call (IVRS) · Chatbot · Mobile app · Web portal · Helpline 14566 — each with toggle
- Right panel:
  - "Safe times to reach me" — day-of-week pills + time display
  - "Who can see my answers" — 4 toggles with role labels
  - "Discreet mode" lavender panel — 3 toggles

#### 2E. Support (`/victim/support`)
- List of active support: Counselling · Legal Aid · Protection
- Next scheduled contact card
- "Not feeling safe?" emergency card

#### 2F. My Case (`/victim/mycase`)
- Case ID: NHAA-DEMO-1042
- Case stage: Court Hearing
- Timeline stepper (expanded)
- "Next hearing: 14 Oct" callout

### Mock Behaviour
- Check-in answers saved to sessionStorage
- After Q8 → complete screen → in demo mode triggers risk score increase

### Definition of Done
Asha can complete a full check-in flow (Home → Start → Q1–Q8 → Complete) with all 3 input mode tabs visible.

---

## Phase 3 — Officer / Counsellor Dashboard
**Duration estimate:** 2 days
**Depends on:** Phase 0, Phase 1

### Screens
#### 3A. Counsellor Dashboard (`/officer/dashboard`)
Matches Figma Frame 5 exactly.

Components:
- Left sidebar: SAHAYAK AI · Dashboard · Cases · Alerts · Interventions · Reports · Settings
- Sidebar footer: user chip (PS · Priya Sharma · Counsellor · Ghaziabad)
- Top bar: greeting H1 + subtitle + search + notification bell (badge) + avatar
- Metric cards row (4):
  - Assigned cases: 48 · +4 this week · green sparkline
  - Active alerts: 7 · 2 critical · red sparkline
  - SLA compliance: 94% · Target 90% · progress bar
  - Avg distress score: 61 · +9 vs 14d · purple sparkline
- Distress trend card (dark bg, large chart):
  - "Distress trend" + "Average across assigned cases"
  - Week selector "Last 8 weeks"
  - Big numeral: 68 · 9.6% chip
  - Line chart W1–W8, lime-green line, tooltip at W8=72
- Risk distribution donut (right):
  - Center: 48 active cases
  - Critical 6 (13%) · High 14 (29%) · Medium 18 (38%) · Low 10 (21%)
- Priority cases table:
  - Columns: Case · Category · Risk · Score · SLA
  - 4 rows matching Figma data
- "Why risk changed" right panel (lavender bg):
  - Header: "Why risk changed" · #USR-7844 · 54→72 in 14 days
  - Factor bars: Legal stress +12 · Recent threat indicators +10 · Hearing postponed +8 · Sleep deterioration +7 · Negative language +6 · Reduced engagement +4
  - Recommended human review checkmarks
  - Green "Review & assign" CTA button
- Bottom-left: "Weekly well-being brief" floating card

#### 3B. Cases List (`/officer/cases`)
- Filterable table with search + risk filter + category filter
- All 4 demo cases
- Click row → Case Detail

#### 3C. Case Detail (`/officer/cases/[id]`)
- Case header: masked name · Case ID · Stage · Consent badge · Risk badge
- 4-tab layout: Overview · Risk Analysis · Interventions · History
- Well-being timeline chart
- Key risk factors panel
- Recent events list
- Action bar: "Create Alert" · "Schedule Follow-up" · "Assign Responder"

#### 3D. Alerts (`/officer/alerts`)
- Alert list with severity badges
- Filter: All · Critical · High · Pending review
- Each alert card: case ID · risk level · reason chips · SLA countdown · Review button

#### 3E. Alert Detail (`/officer/alerts/[id]`)
- Alert header with risk badge + case ID
- "Why risk increased" factor bars
- SLA countdown timer (animated)
- Recommended support list
- Human review action panel:
  - APPROVE button (green, large)
  - MODIFY button (outline)
  - REJECT button (outline red)
- Notes textarea

#### 3F. Interventions (`/officer/interventions`)
- Cards per intervention type: Counselling · Protection · Legal Aid · Financial · Rehabilitation
- Each card: case ID · status badge · assigned officer · follow-up date
- "Track outcome" button

#### 3G. Reports (`/officer/reports`)
- District trend chart
- Aggregate risk distribution
- SLA compliance summary
- Export placeholder button

### Definition of Done
Priya can: view dashboard → click priority case → view case detail → click alert → approve intervention — all with correct mock data and Figma fidelity.

---

## Phase 4 — AI Risk Analysis Screen
**Duration estimate:** 1 day
**Depends on:** Phase 3

### Screens
#### 4A. AI Risk Analysis Tab (within Case Detail)

Components:
- 4 signal source panels:
  - Text Analysis — fear indicators, isolation markers, stress language
  - Voice Analysis — waveform icon, "Elevated stress indicator", emotion chips
  - Behaviour Analysis — "2 missed check-ins", "Reduced engagement -40%"
  - Case Context — "Court hearing 14 Oct", "Investigation delay", "Threat report filed"
- Visual flow arrow: 4 signals → Personal Baseline → Dynamic Risk
- Personal Baseline panel:
  - Baseline: 28 · Current: 72 · Change: +44
  - Side-by-side bar visual
- Dynamic Risk panel (lavender-to-red gradient):
  - Risk Level: HIGH badge
  - Distress Score: 72/100 animated arc
  - Escalation Risk: Elevated
- Explainable factors panel ("Why did risk increase?"):
  - +18 Increased fear indicators
  - +14 Missed two check-ins
  - +11 New safety concern
  - +09 Upcoming court hearing
  - Each as colored bar with score
- Processing path badge: "Fast Crisis Path" or "Deep AI Path"

#### 4B. Demo Simulation Panel
- Collapsible panel: "Demo Simulation Mode"
- 13 step buttons matching the mock event sequence:
  - [1] Stable Case
  - [2] New Court Event
  - [3] Safety Concern
  - [4] Missed Check-in
  - [5] AI Detects Change
  - [6] Risk LOW → HIGH (animated)
  - [7] Explainability appears
  - [8] Alert Created
  - [9] Human Review
  - [10] Intervention Approved
  - [11] Follow-up
  - [12] Risk Improves (72→49)
  - [13] Continue Monitoring
- Each step triggers smooth UI state change
- "Reset demo" button

### Definition of Done
Demo panel advances all 13 steps with smooth data transitions. AI screen shows all 4 signal types, baseline comparison, risk score, and explainability factors.

---

## Phase 5 — Outcome, Continuous Monitoring & Polish
**Duration estimate:** 1 day
**Depends on:** Phase 4

### Screens
#### 5A. Outcome / Follow-up Screen (`/officer/cases/[id]/outcome`)
- Before/After comparison: Distress 72→49 · Risk HIGH→MEDIUM
- Animated distress drop chart
- "Outcome improved · Continue monitoring" green banner
- Follow-up scheduled reminder card

#### 5B. Continuous Monitoring State
- Dashboard returns to monitoring state
- Next check-in scheduled badge
- Risk trend showing improvement
- "Monitoring active" status chip

### Polish & Transitions
- [ ] Page transitions: subtle fade + slide (Framer Motion)
- [ ] Risk badge: animated pulse on Critical
- [ ] SLA timer: live countdown animation
- [ ] Distress score: count-up animation on page load
- [ ] Demo mode step transitions: smooth data morphing (not instant swap)
- [ ] "Processing..." AI skeleton loader between demo steps 5→6→7
- [ ] All charts: animated entry
- [ ] Responsive: sidebar collapses to icon-only at 1024px width
- [ ] Quick exit button: always rendered, immediate redirect on click

### Final Checklist
- [ ] All 13 demo simulation steps work end-to-end
- [ ] Video recording path verified: Login → Home → Check-in → Dashboard → Case → Alert → Approve → Outcome
- [ ] No real personal data used anywhere
- [ ] "PROTOTYPE · SYNTHETIC DATA" watermark in footer
- [ ] All ethical terminology verified (no "diagnosis", "guarantees")

### Definition of Done
Complete video recording path works smoothly: role selection → victim check-in → counsellor dashboard → AI risk analysis → alert review → approve → outcome improvement → monitoring continues.

---

## Development Order Summary

```
Phase 0  →  Phase 1  →  Phase 2  →  Phase 3  →  Phase 4  →  Phase 5
Scaffold     Login      Victim       Officer      AI Risk     Outcome
& Tokens               Portal       Dashboard    Engine      & Polish
(0.5d)      (0.5d)     (1.5d)       (2d)         (1d)        (1d)
```

**Total estimate: ~6.5 days**

---

## Routes Map

```
/                          → Login / Role Selection
/victim/home               → Victim Home (Asha)
/victim/checkin            → Check-in Flow
/victim/checkin/complete   → Check-in Summary
/victim/mycase             → My Case
/victim/support            → Support
/victim/privacy            → Privacy & Channels

/officer/dashboard         → Counsellor/Officer Dashboard
/officer/cases             → Cases List
/officer/cases/[id]        → Case Detail (4 tabs)
/officer/alerts            → Alerts List
/officer/alerts/[id]       → Alert Detail + Human Review
/officer/interventions     → Intervention Tracking
/officer/reports           → Reports
/officer/cases/[id]/outcome → Outcome & Monitoring

/admin/settings            → Admin (Phase 5 placeholder)
```

---

## What Is NOT Built
Per architecture production boundary — intentionally excluded:
- Real NHAA 14566 call integration
- Real SMS/IVRS
- Real authentication / identity verification
- Real Kafka / Redis
- Real victim records
- Clinical-grade assessment
- Real government API calls
- Mobile portal (moible/ directory)
