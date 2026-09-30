# SAHAYAK AI — Prototype Architecture (Web — Updated from Figma Frames)

> **Updated:** Aligned with Figma web frames (6 screens) on 30 Sep 2026.
> **Mobile scope:** Excluded from web prototype. Mobile frames are in `moible/` and out of scope.

---

## 1. Purpose

SAHAYAK AI is a **mock prototype** for a Smart India Hackathon
demonstration of an AI-powered dynamic mental-health/distress and
vulnerability monitoring system for victims of atrocities.

The prototype demonstrates the **product experience, system flow, risk
lifecycle, alerts, human review, interventions, and follow-up loop**.

**Important:** This prototype does not connect to real NHAA/14566
systems, police systems, ICJS, real victim records, real notifications,
or real clinical services. All data, AI outputs, alerts, and case events
are simulated.

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

## 3. Two-Portal Architecture (Web)

The web prototype has **two distinct portals** confirmed by Figma frames:

### Portal A — Victim / Complainant Portal

**Brand:** SAHAYAK · "Your safe space"
**Demo User:** Asha (AS) · SMS · English

**Left Sidebar Nav:**
- Home
- Check-in
- My case
- Support
- Privacy & channels

**Footer:**
- "Need a person? Call 14566, free, any time."
- Quick exit (black button — always visible)
- User chip: AS · Asha · Preferred: SMS · English

**Screen Inventory (from Figma Frame 1, 2, 3):**

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

**Left Sidebar Nav:**
- Dashboard
- Cases
- Alerts
- Interventions
- Reports
- Settings

**Footer:**
- User chip: PS · Priya Sharma · Counsellor · Ghaziabad

**Top Bar:**
- Search: "Search cases, alerts..."
- Notification bell with badge
- User avatar (PS)

**Screen Inventory (from Figma Frame 5):**

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

## 4. Design System (from Figma Frame 6)

### Typography (confirmed from Figma foundations frame)
- **Space Grotesk Bold** — Display, Headings, Numerics
- **Inter Regular/Medium** — Body, Labels, Captions

### Color Tokens (confirmed from Figma color primitives)

**Brand & Accent:**
- `brand-primary`: emerald-600 (#16A34A) — nav active, primary CTA
- `brand-secondary`: emerald-700 (#059669) — hover
- `accent-lavender`: lavender-600 (#8B5CF6) — AI panels, risk explainability

**Risk / Status:**
- `risk-critical`: red (#EF4444) — Critical cases, urgent SLA
- `risk-critical-bg`: red-100 (#FEE2E2)
- `risk-high`: orange (#F97316) — High risk
- `risk-high-bg`: orange-50 (#FFF7ED)
- `risk-medium`: amber (#EAB308) — Medium risk
- `risk-medium-bg`: amber-50 (#FEFCE8)
- `risk-low`: green (#22C55E) — Low risk / stable
- `risk-low-bg`: green-50 (#F0FDF4)

**Backgrounds:**
- `bg-primary`: #FFFFFF — page
- `bg-surface`: #F8FAFC — cards
- `bg-accent-subtle`: #EDE9FE — lavender panels (AI, check-in time)
- `bg-dark-chart`: #0F172A — Distress trend chart (slate-900)

**Text:**
- `text-primary`: #0F172A — headings
- `text-secondary`: #475569 — subtitles, labels
- `text-muted`: #94A3B8 — captions, placeholders

### Spacing & Radius (confirmed from Figma)
- Card border radius: 16px (rounded-2xl)
- Inner element radius: 12px (rounded-xl)
- Button radius: 12px (rounded-xl)
- Chip/badge radius: full (rounded-full)
- Sidebar width: ~220px (victim) / ~200px (officer)

### Component Inventory (confirmed from Figma atoms frame)
- Primary button: filled emerald, white text
- Secondary button: outlined, transparent
- Tertiary: text link
- Risk badge: filled bg + matching text
- Status toggle: blue active, grey inactive
- Nav item: text + icon, active = emerald-50 bg + emerald text

---

## 5. Victim Check-in System (from Figma Frame 2)

### Three Input Modes (confirmed from Figma)
1. **Tap** — Radio button option cards
2. **Voice** — Dark panel, waveform, mic button, "Listening" indicator, timer
3. **Chat** — Text input (same answers synced)

### Voice Mode Detail
- Dark gradient background panel
- "Listening" green status pill
- Countdown timer (00:12 format)
- Audio waveform visualization (orange bars)
- Orange circular mic button
- "Speak in your own language" label
- "WHAT WE HEARD" transcript below
- Lavender "Prefer to type?" switch card

### Question Structure
- 8 questions per check-in
- Progress bar: 1/8 to 8/8
- Category chip per question (e.g., SLEEP, SAFETY, MOOD)
- 4–5 radio options per question
- "I would rather not answer" skip option always available
- "Private · only your counsellor sees this" privacy indicator

---

## 6. Officer Dashboard — Key Components (from Figma Frame 5)

### Metric Cards (4 cards in a row)
1. **Assigned cases** — big numeral + trend chip + mini bar sparkline
2. **Active alerts** — with "X critical" sub-label
3. **SLA compliance** — percentage + target label + progress bar
4. **Avg distress score** — score + "vs 14d" comparison

### Distress Trend Chart
- Dark background (bg-slate-900)
- Lime-green (#A3E635) line chart
- X-axis: W1–W8 (8 weeks)
- Current value callout with percentage change chip
- Week range dropdown filter

### Risk Distribution Donut
- 4 segments: Critical · High · Medium · Low
- Center: total case count
- Right-side legend with counts and percentages

### Priority Cases Table
- Columns: Case ID/name · Category · Risk badge · Score + trend arrow · SLA countdown
- SLA shown in red when near breach
- Row click → Case Detail

### "Why Risk Changed" Explainability Panel
- Always shows for the top-priority case
- Case ID + score delta (e.g., 54→72 in 14 days)
- Horizontal factor bars with +score labels
- Recommended human review items
- "Review & assign" CTA (bottom)

---

## 7. Consent & Privacy System (from Figma Frame 3)

### Channel Configuration
6 channels with independent on/off toggles:
1. SMS — "Short, discreet messages. No case details." (Preferred badge)
2. Phone call (IVRS) — "Automated call with keypad or voice answers."
3. Chatbot — "Private chat in web or your messaging app."
4. Mobile app — "Check-ins, safety plan and updates."
5. Web portal — "Full check-in on a computer."
6. Helpline 14566 — "A trained person helps you answer."

### Safe Times
- Day-of-week pill selector (M T W T F S S)
- Time range picker (e.g., 6:00–7:00 pm)

### Access Control
Who can see my answers (4 toggles):
- My counsellor
- Legal-aid team
- Protection officer
- Counsellor supervisor (summary only)

### Discreet Mode
3 sub-toggles:
- Neutral app name and icon
- Hide message previews
- Auto sign-out after 2 minutes

---

## 8. AI & Risk Intelligence (Prototype Simulation)

### Signal Types (4 sources)
1. **Text Analysis** — fear indicators, isolation markers, stress language, negative sentiment
2. **Voice Analysis** — elevated stress indicator, emotion chips (simulated)
3. **Behaviour Analysis** — missed check-ins, reduced engagement, sudden communication change
4. **Case Context** — court hearing dates, investigation delays, threat reports, compensation status

### Personal Baseline Comparison
```
Baseline distress: 28
Current distress:  72
Change:           +44  →  Significant deviation
```

### Dynamic Risk Levels
- LOW (green) — below baseline, stable monitoring
- MEDIUM (amber) — moderate deviation, review recommended
- HIGH (orange) — significant deviation, human review required
- CRITICAL (red) — immediate alert, fast crisis path

### Explainable Output Format
```
Why did risk increase?

+18  Increased fear indicators
+14  Missed two check-ins
+11  New safety concern
+09  Upcoming court hearing
```

### Dual Processing Path (Visual Only)
- **Fast Crisis Path** — immediate safety triggers → Critical alert in < 1s (simulated)
- **Deep AI Path** — multimodal longitudinal analysis → High/Medium risk with explanation

---

## 9. Demo Simulation State Machine

The prototype includes a 13-step demo simulation covering the entire case lifecycle.

States (in order):
```
stable → court_event → safety_concern → missed_checkin
→ ai_detecting → risk_high → explainability → alert_created
→ human_review → intervention_approved → followup
→ risk_improving → monitoring
```

Each state transition updates:
- Risk level badge (LOW / MEDIUM / HIGH)
- Distress score (28 → 72 → 49)
- Distress trend chart data
- Alert list
- Explainability factors
- Intervention status

---

## 10. Alert & Human Review Flow

```
Risk Detected
     ↓
Alert Engine
     ↓
SLA Routing (countdown timer)
     ↓
Human Review Screen
     ↓
APPROVE / MODIFY / REJECT
     ↓
Intervention
```

Alert card shows:
- Severity badge (HIGH / CRITICAL)
- Case ID
- Reason chips (fear indicators, missed check-ins, safety concern)
- SLA countdown timer (animated)
- Recommended support list
- Assign responder dropdown

---

## 11. Intervention Layer

5 intervention categories:
1. Counselling Support
2. Legal Aid
3. Protection Support
4. Financial Assistance
5. Rehabilitation Support

Each intervention card shows: status badge · assigned officer · follow-up date

---

## 12. Mock Data Architecture

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

---

## 13. Prototype Stack (Web)

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS with custom token config
- **Charts:** Recharts
- **Animations:** Framer Motion
- **State:** React Context + Zustand (demo simulation state machine)
- **Data:** JSON files in `/src/data/`
- **Fonts:** next/font (Space Grotesk + Inter)

---

## 14. Production Boundary

The following remain intentionally mocked — do not imply real connection:

- NHAA 14566 integration
- ICJS / police case integration
- Real SMS/IVRS providers
- Real authentication and identity verification
- Production Kafka / Redis
- Clinical-grade assessment
- Real counsellor workflow
- Government notification systems
- Production model governance
- Real victim data
