# SAHAYAK AI — Prototype Architecture

> **Hackathon:** Smart India Hackathon 2026
> **Scope:** Web portal only. Mobile (`moible/`) excluded from prototype build.
> **Last updated:** 30 Sep 2026 — aligned with Figma web frames.

---

## 1. Purpose

SAHAYAK AI is a **mock prototype** for a Smart India Hackathon demonstration of an AI-powered dynamic mental-health/distress and vulnerability monitoring system for victims of atrocities.

The prototype demonstrates the **product experience, system flow, risk lifecycle, alerts, human review, interventions, and follow-up loop**.

**Important:** This prototype does not connect to real NHAA/14566 systems, police systems, ICJS, real victim records, real notifications, or real clinical services. All data, AI outputs, alerts, and case events are simulated.

---

## 2. Core Product Flow

```
Victim / Case Registration
        ↓
Consent & Safe-to-Communicate
        ↓
Personal Baseline
        ↓
Multi-Channel Check-ins
(App / Chatbot / SMS / IVRS / Web / NHAA Agent)
        ↓
Case Events + Text + Voice + Behaviour
        ↓
AI Signal Processing
        ↓
Personal Baseline Comparison
        ↓
Dynamic Distress / Vulnerability Risk
        ↓
Explainable Risk Factors
        ↓
Alert & SLA Routing
        ↓
Human Review
        ↓
Support / Intervention
        ↓
Follow-up Assessment
        ↓
Outcome Measurement
        ↓
Continuous Monitoring
```

---

## 3. System Layers

### Layer 1 — User & Case Interaction

Mock interfaces representing:
- Victim / Witness
- Counsellor
- District Officer
- Protection / Legal / Welfare Officer
- System Administrator

Simulated channels (inside the web app, no real integrations):
- Web Portal (primary demo channel)
- Mobile App (simulated tab)
- Chatbot (simulated tab)
- SMS (simulated tab)
- IVRS (simulated tab)
- NHAA Agent (simulated tab)

### Layer 2 — Case & Consent

The system creates a mock case and configures:
- Case ID · Victim profile · Case category · Case stage
- Preferred language · Safe communication channel
- Consent status · Check-in frequency · Personal baseline

Example:
```
Case ID: NHAA-DEMO-1042
Stage:   Court Hearing
Consent: Granted
Channel: SMS
Baseline: 28 / 100
```

### Layer 3 — Event Ingestion

Simulated event types:
```
Check-in Response
Case Event (hearing, delay, threat)
Text Response
Voice Response
Behaviour Signal (missed check-in, reduced engagement)
Officer Update
```

Event bus is visual-only — no real Kafka cluster required:
```
Frontend
   ↓
Mock Event Queue (Zustand store)
   ↓
Risk Processing (deterministic rules)
```

### Layer 4 — AI & Risk Intelligence

All AI outputs are deterministic mock results — no real ML model required for demo.

**Text Analysis** — predefined victim responses trigger keywords:
- fear · hopelessness · stress · isolation · safety concern

**Voice Analysis** — simulated state (Normal → Elevated Stress):
```
Voice signal → elevated stress indicator
```

**Behaviour Analysis** — simulated events:
- missed check-ins · reduced engagement · repeated help requests · sudden communication change

**Case Context** — simulated events:
- court hearing · investigation delay · threat report · compensation delay · rehabilitation event

---

## 4. Two-Portal Web Architecture (Confirmed from Figma)

### Portal A — Victim / Complainant Portal

**Brand:** SAHAYAK · "Your safe space"
**Demo User:** Asha (AS) · Preferred: SMS · English

**Left Sidebar Nav:** Home · Check-in · My case · Support · Privacy & channels

**Footer:** "Need a person? Call 14566, free, any time." + Quick exit (black, always visible) + user chip

| Screen | Route | Figma Frame |
|---|---|---|
| Victim Home | /victim/home | Frame 1 |
| Check-in Flow (8 questions) | /victim/checkin | Frame 2 |
| Check-in Complete | /victim/checkin/complete | — |
| My Case | /victim/mycase | — |
| Support | /victim/support | — |
| Privacy & Channels | /victim/privacy | Frame 3 |

### Portal B — Officer / Counsellor Portal

**Brand:** SAHAYAK AI · "Well-being monitoring"
**Demo User:** Priya Sharma (PS) · Counsellor · Ghaziabad

**Left Sidebar Nav:** Dashboard · Cases · Alerts · Interventions · Reports · Settings

**Top Bar:** Search · Notification bell (badge) · Avatar (PS)

| Screen | Route | Figma Frame |
|---|---|---|
| Counsellor Dashboard | /officer/dashboard | Frame 5 |
| Cases List | /officer/cases | — |
| Case Detail (4 tabs) | /officer/cases/[id] | — |
| Alerts List | /officer/alerts | — |
| Alert Detail + Human Review | /officer/alerts/[id] | — |
| Interventions | /officer/interventions | — |
| Reports | /officer/reports | — |
| Outcome & Monitoring | /officer/cases/[id]/outcome | — |

---

## 5. Design System (Confirmed from Figma Frame 6)

### Typography
- **Space Grotesk Bold** — Display, Headings, Numerics
- **Inter Regular / Medium** — Body, Labels, Captions

### Color Tokens

| Token | Hex | Use |
|---|---|---|
| `brand-primary` | #16A34A (emerald-600) | Nav active, primary CTA |
| `brand-secondary` | #059669 (emerald-700) | Hover states |
| `accent-lavender` | #8B5CF6 | AI panels, explainability |
| `risk-critical` | #EF4444 | Critical badge |
| `risk-critical-bg` | #FEE2E2 | Critical bg |
| `risk-high` | #F97316 | High badge |
| `risk-high-bg` | #FFF7ED | High bg |
| `risk-medium` | #EAB308 | Medium badge |
| `risk-medium-bg` | #FEFCE8 | Medium bg |
| `risk-low` | #22C55E | Low badge |
| `risk-low-bg` | #F0FDF4 | Low bg |
| `bg-primary` | #FFFFFF | Page background |
| `bg-surface` | #F8FAFC | Card background |
| `bg-accent-subtle` | #EDE9FE | Lavender panel bg |
| `bg-dark-chart` | #0F172A | Dark chart bg |
| `text-primary` | #0F172A | Headings |
| `text-secondary` | #475569 | Sub-labels |
| `text-muted` | #94A3B8 | Captions, placeholders |

### Spacing & Radius
- Card: `rounded-2xl` (16px)
- Inner elements: `rounded-xl` (12px)
- Buttons: `rounded-xl` (12px)
- Chips / badges: `rounded-full`
- Sidebar width: ~220px (victim) / ~200px (officer)

### Component Atoms
- Primary button: filled emerald, white text
- Secondary button: outlined, transparent bg
- Risk badge: filled bg + matching text color
- Status toggle: blue active, grey inactive
- Nav item: icon + text, active = emerald-50 bg + emerald text

---

## 6. Victim Check-in System (from Figma Frame 2)

### Three Input Modes
1. **Tap** — Radio button option cards
2. **Voice** — Dark panel, waveform, mic button, "Listening" pill, timer
3. **Chat** — Text input (synced answers)

### Voice Mode Detail
- Dark gradient background
- "Listening" green status pill + countdown timer (00:12 format)
- Audio waveform (orange bars) + orange circular mic button
- "Speak in your own language" label
- "WHAT WE HEARD" transcript section below
- Lavender "Prefer to type?" switch card

### Question Structure
- 8 questions per check-in session
- Progress bar: 1/8 → 8/8
- Category chip per question (SLEEP / SAFETY / MOOD / FEAR / SUPPORT / ENGAGEMENT / PHYSICAL / THOUGHTS)
- 4–5 radio options per question
- "I would rather not answer" always available
- "Private · only your counsellor sees this" privacy indicator top-right

---

## 7. Officer Dashboard Components (from Figma Frame 5)

### Metric Cards (row of 4)
1. **Assigned cases** — big numeral + trend chip + mini bar sparkline
2. **Active alerts** — "X critical" sub-label + red sparkline
3. **SLA compliance** — percentage + "Target 90%" + green bar
4. **Avg distress score** — score + "vs 14d" comparison + purple sparkline

### Distress Trend Chart
- Dark background (bg-slate-900 / #0F172A)
- Lime-green (#A3E635) line chart, X-axis W1–W8
- Current value callout with % change chip
- Week range dropdown

### Risk Distribution Donut
- 4 segments: Critical (red) · High (orange) · Medium (amber) · Low (green)
- Center: total active case count
- Right legend: count + percentage per level

### Priority Cases Table
- Columns: Case · Category · Risk badge · Score + trend arrow · SLA countdown
- SLA in red when near breach, row click → Case Detail

### "Why Risk Changed" Explainability Panel
- Always shown for top-priority case
- Case ID + score delta (e.g., 54→72 in 14 days)
- Horizontal factor bars with +score labels
- Recommended human review checklist
- "Review & assign" emerald CTA

---

## 8. Consent & Privacy System (from Figma Frame 3)

### Channel Configuration (6 toggles)
1. SMS — "Short, discreet messages. No case details." (Preferred badge)
2. Phone call (IVRS) — "Automated call with keypad or voice answers."
3. Chatbot — "Private chat in web or your messaging app."
4. Mobile app — "Check-ins, safety plan and updates."
5. Web portal — "Full check-in on a computer."
6. Helpline 14566 — "A trained person helps you answer."

### Safe Times
- Day-of-week pill selector (M T W T F S S)
- Time range display (e.g., 6:00–7:00 pm)

### Access Control (4 toggles)
- My counsellor · Legal-aid team · Protection officer · Counsellor supervisor (summary only)

### Discreet Mode (3 toggles)
- Neutral app name and icon · Hide message previews · Auto sign-out after 2 minutes

---

## 9. Personal Baseline

Risk is compared against the individual's own baseline — not a generic population threshold.

```
Baseline distress: 28
Current distress:  72
Change:           +44  →  Significant deviation
```

The prototype visualizes this as a trend chart and side-by-side bar comparison.

---

## 10. Dynamic Risk Engine

Combines all signal types deterministically:

```
Text Analysis
      +
Voice Analysis
      +
Behaviour Analysis
      +
Case Context
      +
Personal Baseline
      ↓
Dynamic Risk Assessment
```

Output:
```
Risk Level:       HIGH
Distress Score:   72 / 100
Escalation Risk:  Elevated
```

Risk levels (prototype decision-support labels, NOT medical diagnoses):
- **LOW** — stable, below baseline
- **MEDIUM** — moderate deviation, review recommended
- **HIGH** — significant deviation, human review required
- **CRITICAL** — immediate alert, fast crisis path

---

## 11. Explainable AI

Every high-risk result shows plain-language reasons:

```
Why did risk increase?

+18  Increased fear indicators
+14  Missed two check-ins
+11  New safety concern
+09  Upcoming court hearing
```

The demo never shows an unexplained AI score.

---

## 12. Crisis Fast Path vs Deep AI Path

### Fast Crisis Path
Used for immediate safety indicators — visually faster:
```
New Event → Crisis Rules → Immediate Danger? → Critical Alert
```

### Deep AI Path
Used for longitudinal risk assessment:
```
Text + Voice + Behaviour + Case Context
             ↓
        Feature Fusion
             ↓
      Baseline Comparison
             ↓
        Risk Assessment
             ↓
       Explainable Output
```

---

## 13. Alert & Human Review Flow

AI does **not** autonomously execute sensitive interventions:

```
Risk Detected
     ↓
Alert Engine
     ↓
SLA Routing (countdown timer)
     ↓
Human Review (Approve / Modify / Reject)
     ↓
Intervention
```

Alert card shows: severity badge · case ID · reason chips · SLA countdown · recommended support · assign responder

---

## 14. Demo Simulation State Machine

**Single entry point:** The `Analyse Incoming Signals →` button (emerald filled) inside
a natural-looking incoming signals banner at the top of the Risk Analysis tab.

Banner appearance:
```
┌─────────────────────────────────────────────────────────────┐
│  🔔  New signals received for Case #USR-7844                 │
│      Text · Voice · Behaviour · Case Event  ·  3 min ago    │
│                              [ Analyse Incoming Signals → ]  │
└─────────────────────────────────────────────────────────────┘
```

Clicking the button auto-plays the full sequence (~1.5–2s per step):

| Step | UI Event |
|---|---|
| 1 | Banner disappears, "Processing signals..." skeleton |
| 2–5 | Signal panels fill in one by one (text → voice → behaviour → case context) |
| 6 | Fusion arrow pulses, "Analysing..." loader |
| 7 | Baseline: 28 → 72 count-up animation |
| 8 | Risk badge flips LOW → HIGH with pulse |
| 9 | Explainability factors slide in |
| 10 | Toast: "⚠ HIGH RISK alert created for #USR-7844" |
| 11 | Human Review panel appears (Approve / Modify / Reject) |
| → APPROVE click | |
| 12 | Intervention cards animate in |
| 13 | Distress 72 → 49 count-down |
| 14 | Risk badge HIGH → MEDIUM |
| 15 | "Outcome improved · Continue monitoring" green banner |

**Reset:** `↺ Reset to initial state` — tiny `text-xs text-slate-400` link at page bottom only.

**Implementation:** Zustand store in `/src/lib/demoState.ts` with `autoPlay()` action.

States:
```
stable → processing → signals_filled → analysing
→ baseline_updated → risk_high → explainability
→ alert_created → human_review → intervention_approved
→ followup → risk_improving → monitoring
```

---

## 15. Intervention Layer

5 categories tracked end-to-end (Pending → Assigned → In Progress → Completed):
1. Counselling Support
2. Legal Aid
3. Protection Support
4. Financial Assistance
5. Rehabilitation Support

---

## 16. Closed-Loop Monitoring

```
Intervention
     ↓
Follow-up
     ↓
Outcome Assessment
     ↓
Improved?
  ↙       ↘
YES        NO
 ↓          ↓
Continue   Escalate / Modify
Support
     ↓
Continuous Monitoring
```

---

## 17. Mock Data Architecture

Full demo case JSON structure:
```json
{
  "caseId": "NHAA-DEMO-1042",
  "userId": "#USR-7844",
  "name": "Asha (demo)",
  "category": "Threatened Witness",
  "stage": "Court Hearing",
  "consent": true,
  "safeChannel": "SMS",
  "baselineDistress": 28,
  "currentDistress": 72,
  "riskLevel": "HIGH",
  "riskFactors": [
    { "label": "Increased fear indicators", "score": 18 },
    { "label": "Missed two check-ins", "score": 14 },
    { "label": "New safety concern", "score": 11 },
    { "label": "Upcoming court hearing", "score": 9 }
  ],
  "recommendedAction": "Priority counselling follow-up",
  "slaRemaining": "00:42",
  "assignedCounsellor": "Priya Sharma"
}
```

Mock data files in `/src/data/`:
- `cases.json` — 4 demo cases
- `alerts.json` — 7 active alerts
- `interventions.json` — intervention records
- `checkins.json` — Asha's 7-day check-in history
- `riskTimeline.json` — W1–W8 distress scores

---

## 18. Prototype Stack (Web)

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + custom token config |
| Charts | Recharts |
| Animations | Framer Motion |
| State / Demo Engine | Zustand |
| Data | JSON files in /src/data/ |
| Fonts | next/font (Space Grotesk + Inter) |

No real backend, no real database, no real AI model — all mocked.

---

## 19. Prototype Principle

Build as a **convincing simulation of the complete system**, not a partially implemented production platform. The video demo should make the audience understand:

```
A case changes
      ↓
The victim's signals change
      ↓
The system detects the change
      ↓
Risk increases
      ↓
The system explains why
      ↓
A human is alerted
      ↓
Support is initiated
      ↓
Outcome is measured
      ↓
Monitoring continues
```

---

## 20. Production Boundary

The following remain intentionally mocked — never imply real connection:

- NHAA 14566 integration
- ICJS / police case integration
- Real SMS / IVRS providers
- Real authentication and identity verification
- Production Kafka / Redis
- Clinical-grade assessment
- Real counsellor workflow
- Government notification systems
- Production model governance
- Real victim data
