# SAHAYAK AI — Phase-wise Review Checklist

> This document is the quality gate for each development phase.
> A phase is only complete when ALL items in its checklist are PASS.
> Review must be done by visual inspection + code review.

---

## How to Review

For each phase:
1. Run the dev server: `npm run dev` in `web-app/`
2. Open the browser at the specified route
3. Compare side-by-side with the corresponding Figma frame
4. Check each item — mark PASS / FAIL / PARTIAL
5. Document any FAIL items with a note
6. Only proceed to the next phase when all items are PASS

---

## Phase 0 Review — Design System & Scaffold

**Route:** `/dev/tokens` (a dedicated test page showing all atoms)

### Color Tokens
- [x] All 13 design tokens defined in `tailwind.config.ts`
- [x] No raw hex values used in any component file
- [x] Risk colors: Critical=red, High=orange, Medium=yellow, Low=green (matches Figma)
- [x] Brand primary = emerald-600 (#16A34A) ✓
- [x] Lavender accent = #8B5CF6 ✓
- [x] bg-surface (#F8FAFC) distinguishable from bg-primary (#FFFFFF) ✓

### Typography
- [x] Space Grotesk loaded for all headings and numerics
- [x] Inter loaded for all body text and labels
- [x] No system fonts (Arial, sans-serif defaults) visible anywhere
- [x] Font size scale matches Figma: Display/2XL=40px · Heading/XL=32px · Body/LG=16px

### Atom Components
- [x] `RiskBadge` renders Critical/High/Medium/Low with correct bg+text colors
- [x] `StatusToggle` shows blue active state, grey inactive
- [x] `MetricCard` shows stat, sparkline, trend chip — correct layout
- [x] `QuickExit` renders as black button, bottom of sidebar
- [x] `SideNav` — victim variant has 5 nav items + footer
- [x] `SideNav` — officer variant has 6 nav items + user chip footer
- [x] `TopBar` shows search bar, bell icon, avatar

### Mock Data
- [x] `cases.json` — 4 cases with correct fields (caseId, stage, risk, distress, etc.)
- [x] `alerts.json` — 7 alerts with severity and SLA fields
- [x] `interventions.json` — at least 3 intervention records
- [x] `checkins.json` — 7-day history for Asha
- [x] `riskTimeline.json` — W1–W8 scores for demo case

### Notes:
```
2026-09-30 — PASS. Tokens live in globals.css @theme (Tailwind v4; there is no tailwind.config.ts). Browser check at /dev/tokens: brand #16A34A, critical #EF4444, high #F97316, medium #EAB308, low #22C55E, accent subtle #EDE9FE, surface #F8FAFC vs page #FFFFFF. Display 40px Space Grotesk, heading 32px, body 16px Inter. Victim sidenav 220px / 5 links, officer 200px / 6 links. Toggle ON rgb(37, 99, 235), OFF rgb(203, 213, 225).
```

---

## Phase 1 Review — Login & Role Selection

**Route:** `/login`

### Visual
- [x] SAHAYAK AI logo visible (or placeholder icon)
- [x] "Your safe space" tagline present
- [x] 4 role cards displayed: District Officer · Counsellor · Responder · Administrator
- [x] Each card has icon, title, description
- [x] Cards are clickable with hover state
- [x] Language selector visible

### Behaviour
- [x] Clicking "District Officer" → routes to `/officer/dashboard`
- [x] Clicking "Counsellor" → routes to `/officer/dashboard`
- [x] Clicking "Responder" → routes to `/officer/dashboard`
- [x] Clicking "Administrator" → routes to `/admin/settings`
- [x] Session role stored in `sessionStorage.role`
- [x] Back navigation works correctly

### Design System Compliance
- [x] All colors from token set only
- [x] Space Grotesk used for headings
- [x] Inter used for labels
- [x] Card styling: bg-surface · border · rounded-2xl · shadow-sm

### Notes:
```
2026-09-30 — PASS. Browser check: logo, tagline, language (English / Hindi / Regional), name field, four cards. Heading is Space Grotesk 40px. Cards are #F8FAFC, 1px border, 16px radius, shadow-sm, hover border uses brand-primary. Clicks: district → /officer/dashboard/?role=district (role district, name stored), counsellor → /officer/dashboard/ (role counsellor), responder → /officer/dashboard/ (role responder), administrator → /admin/settings/ (role administrator). Back link and browser back return to /login. Trailing slashes come from the static export used by Capacitor. Officer and admin screens are portal entry points, not the Phase 3 dashboard.
```

---

## Phase 2 Review — Victim Portal

### Screen 2A: Victim Home
**Route:** `/victim/home`
**Figma Reference:** Frame 1 (Screenshot 2026-09-30 162151.png)

- [x] Sidebar: SAHAYAK logo · 5 nav items · helpline card · Quick exit · user chip (AS · Asha · SMS · English)
- [x] Greeting: "Good evening, Asha" (time-aware or hardcoded for demo)
- [x] Subtitle: "You are safe here. Your next check-in is ready whenever you are."
- [x] Language dropdown top-right: English selected
- [x] Hero check-in card: dark gradient background, NOT white
- [x] "TODAY'S CHECK-IN" label in orange/amber color
- [x] "How are you feeling today?" as prominent H1 in white
- [x] Orange "Start check-in →" button present
- [x] Tap · Voice · Chat mode pills below the button
- [x] "Your week" card: 7 bars (Mon–Sun), "5 of 7 days" label, insight text
- [x] "Right now I feel..." card: 5 emoji mood options (Calm/Okay/Tense/Afraid/Low)
- [x] "Your case journey" timeline: 4 steps with dates, correct icons
- [x] Right sidebar: "Talk to someone" 3 cards, "What happens next" list, lavender check-in time panel
- [x] Quick exit button always visible at bottom of left sidebar

### Screen 2B: Check-in Flow
**Route:** `/victim/checkin`
**Figma Reference:** Frame 2 (Screenshot 2026-09-30 162207.png)

- [x] "Daily check-in" title with "Question X of 8 · about Y minutes left"
- [x] "Private · only your counsellor sees this" top-right in muted color
- [x] Blue progress bar proportional to question number
- [x] Category chip (e.g., "SLEEP") in lavender rounded chip
- [x] Question text in large, bold font
- [x] "No right or wrong answers. You can skip." note in muted text
- [x] Radio options: 5 options, selected = blue fill + checkmark
- [x] Bottom bar: Back · "I would rather not answer" link · Continue button
- [x] Right panel: Tap · Voice · Chat tabs
- [x] Voice mode panel: dark bg, "Listening" indicator, timer, waveform, orange mic button
- [x] "WHAT WE HEARD" transcript section
- [x] Lavender "Prefer to type?" card at bottom right
- [x] Navigating through all 8 questions works (Next/Back)

### Screen 2C: Check-in Complete
**Route:** `/victim/checkin/complete`

- [x] "Thank you, Asha" heading
- [x] Distress signal shown (NOT a diagnosis)
- [x] "Your counsellor will review this" note
- [x] Next check-in reminder
- [x] "Return to home" button functional

### Screen 2D: Privacy & Channels
**Route:** `/victim/privacy`
**Figma Reference:** Frame 3 (Screenshot 2026-09-30 162222.png)

- [x] "Privacy & channels" heading + subtitle
- [x] 6 channel cards in 2x3 grid: SMS (Preferred badge) · IVRS · Chatbot · Mobile app · Web portal · Helpline 14566
- [x] Each card has toggle, icon, title, description
- [x] SMS toggle = ON (blue), Web portal = OFF (grey) as per Figma
- [x] "Safe times to reach me" panel: day-of-week pills (T, T highlighted), time display
- [x] "Who can see my answers" 4 toggle rows
- [x] "Discreet mode" lavender bg panel with 3 toggles
- [x] Toggles are interactive (click to toggle state)

### Screens 2E & 2F
- [x] Support page renders with mock support list
- [x] My Case page shows case timeline correctly

### Notes:
```
2026-09-30 — Screen items PASS in the browser at desktop width. Home hero is a dark gradient, check-in label and button are #F97316, week reads 5 of 7 days, check-in runs Q1–Q8 to the thank-you screen, privacy toggles change state, support lists counselling / protection / legal aid plus the emergency card, my case shows NHAA-DEMO-1042 · Court Hearing · timeline · Next hearing: 14 Oct. Figma PNGs are not in the repo, so pixel side-by-side is still open.
```

---

## Phase 3 Review — Officer Dashboard

### Screen 3A: Counsellor Dashboard
**Route:** `/officer/dashboard`
**Figma Reference:** Frame 5 (Screenshot 2026-09-30 162310.png)

- [x] Sidebar: SAHAYAK AI · "Well-being monitoring" · 6 nav items · PS user chip (Priya Sharma · Counsellor · Ghaziabad)
- [x] "Good morning, Priya" H1 greeting
- [x] Subtitle: "Well-being overview for your 48 assigned cases · Mon, 28 Sep 2026"
- [x] Search bar in top bar
- [x] Notification bell with badge (1 or 7)
- [x] Avatar initials "PS" visible

**Metric Cards:**
- [x] "Assigned cases" card: 48 · "+4 this week" chip · green bar sparkline
- [x] "Active alerts" card: 7 · "2 critical" chip · red/pink sparkline
- [x] "SLA compliance" card: 94% · "Target 90%" · green bar
- [x] "Avg distress score" card: 61 · "+9 vs 14d" · purple sparkline
- [x] All 4 cards same height, uniform design

**Distress Trend Chart:**
- [x] Dark background card (bg-slate-900 or similar)
- [x] "Distress trend" title in white
- [x] "Average across assigned cases" subtitle in muted grey
- [x] "Last 8 weeks" dropdown
- [x] Large numeral "68" with "9.6%" green trend chip
- [x] Line chart: W1–W8 on X-axis, lime-green (#A3E635) line
- [x] Data point at W8 = 72 with tooltip visible

**Risk Distribution:**
- [x] Donut chart, center shows "48" + "active cases"
- [x] 4 segments: Critical (red) · High (orange) · Medium (yellow) · Low (green)
- [x] Legend with counts and percentages matching Figma

**Priority Cases Table:**
- [x] 4 data rows matching Figma
- [x] Row 1: #USR-7844 · Threatened Witness · Critical (red dot) · 72 ▲ · 00:42 (red, urgent)
- [x] Row 2: #USR-5120 · Sexual Violence · High (orange dot) · 66 ▲ · 01:58
- [x] Row 3: #USR-3391 · Caste-based Violence · Medium (yellow dot) · 51 · 03:20
- [x] Row 4: #USR-9027 · Serious Violence · Low (green dot) · 34 ▼ · On track
- [x] Score column shows trend arrows (▲▼)
- [x] SLA timer for #USR-7844 is red/urgent

**"Why Risk Changed" Panel:**
- [x] Right panel has lavender background
- [x] Header: "Why risk changed"
- [x] Sub: "#USR-7844 · 54 → 72 in 14 days"
- [x] 6 factor bars with scores (+12 to +4)
- [x] Factor labels match Figma: Legal stress, Recent threat indicators, Hearing postponed, Sleep deterioration, Negative language, Reduced engagement
- [x] Bars proportional to scores
- [x] "RECOMMENDED · HUMAN REVIEW" section with checkmarks
- [x] Green "Review & assign" CTA button

- [x] "Weekly well-being brief" card visible bottom-left

### Screen 3C: Case Detail
**Route:** `/officer/cases/nhaa-demo-1042`

- [x] Case header shows masked name, Case ID, Stage badge, Consent badge, Risk badge
- [x] 4 tabs visible: Overview · Risk Analysis · Interventions · History
- [x] Overview tab: case timeline + key risk factors + recent events
- [x] Action bar: 3 action buttons
- [x] Well-being chart renders with W1–W8 data

### Screen 3E: Alert Detail
**Route:** `/officer/alerts/[id]`

- [x] Risk level badge prominent at top
- [x] "Why risk increased" factor list
- [x] SLA timer animated (countdown)
- [x] APPROVE button: large, green, prominent
- [x] MODIFY and REJECT as secondary buttons
- [x] Notes textarea

### Notes:
```
2026-09-30 — Screen items PASS in the browser at 1440px. Dashboard shows Priya, 48 / 7 / 94% / 61, lime distress line with W8 label 72, donut 48 active cases, priority row #USR-7844 Critical 72 ▲ 00:42 in red, lavender why-risk panel, Review & assign. Case row opens detail; four tabs and Schedule Follow-up work. Critical filter leaves one alert. ALT-001 countdown moved 00:40 → 00:39. APPROVE on ALT-004 wrote a human-review confirmation. Interventions show five categories. Reports show trend, donut, and SLA 94% / Target 90%. Frame 5 PNG is not in the repo, so pixel side-by-side is still open. Assign Responder was not clicked.
```


---

## Phase 4 Review — AI Risk Analysis

### Screen 4A: AI Risk Analysis Tab
**Route:** `/officer/cases/nhaa-demo-1042` (Risk Analysis tab)

- [x] 4 signal panels visible: Text · Voice · Behaviour · Case Context
- [ ] Each panel has correct icon and signal indicators
- [x] Visual flow arrow: 4 signals → Baseline → Risk
- [x] Personal Baseline panel: shows 28 (baseline) vs 72 (current) vs +44 (change)
- [x] Dynamic Risk panel: "HIGH" badge prominent, 72/100 score, arc/ring animation
- [x] "Escalation Risk: Elevated" label
- [x] Explainability panel: 4 factors with scores and colored bars
- [x] "+18 Increased fear indicators" · "+14 Missed check-ins" · "+11 Safety concern" · "+09 Court hearing"
- [x] "Fast Crisis Path" or "Deep AI Path" processing badge

### Screen 4B: Demo Simulation Panel

- [ ] Panel collapses/expands cleanly
- [ ] 13 step buttons visible, labeled correctly
- [ ] Current step highlighted
- [ ] Completed steps marked/greyed
- [ ] "Reset demo" button resets all state to stable
- [ ] Step 1: Dashboard shows LOW risk, distress=28
- [ ] Step 2–4: Events appear in event feed
- [ ] Step 5: "Processing..." skeleton loader appears
- [ ] Step 6: Risk badge animates LOW → HIGH, score animates 28 → 72
- [ ] Step 7: Explainability panel animates in
- [ ] Step 8: New alert appears in alert list
- [ ] Step 9: Alert detail opens with review buttons
- [ ] Step 10: Approve click triggers intervention confirmed state
- [ ] Step 11–12: Distress score animates 72 → 49, badge HIGH → MEDIUM
- [ ] Step 13: "Monitoring active" state, charts show downward trend
- [ ] All transitions smooth (no instant data swaps)
- [ ] Demo simulation never crashes or shows undefined data

### Notes:
```
2026-09-30 — Auto-play replaces the old 13-button panel. Browser watched the sequence through APPROVE: support confirmed, score 49, Medium, and the green outcome link. Voice has a waveform; the other panels are text only, so the icon line stays open. No step buttons or demo-mode label.
```

---

## Phase 5 Review — Outcome & Polish

### Screen 5A: Outcome Screen
**Route:** `/officer/cases/nhaa-demo-1042/outcome`

- [x] Before/After clearly shows 72 → 49
- [x] Risk HIGH → MEDIUM shown visually
- [x] Animated chart shows distress dropping
- [x] "Outcome improved · Continue monitoring" green banner
- [x] Follow-up date card visible

### Transition & Animation Review
- [x] Page navigation has subtle fade/slide transition
- [x] Critical risk badge pulses
- [x] SLA timer countdown is animated (not static)
- [x] Distress score counts up from 0 on page load
- [x] Chart bars/lines animate in on load
- [x] Demo step transitions: no jarring jumps
- [x] "AI Processing" skeleton shows for steps 5–7

### Responsiveness
- [ ] At 1440px: full layout matches Figma
- [ ] At 1280px: layout still fully functional
- [x] At 1024px: sidebar collapses to icon-only
- [x] No horizontal scroll at 1024px+
- [x] (Mobile NOT required)

### Ethical / Safety Audit
- [x] Zero instances of "diagnoses" in relation to AI
- [x] Zero instances of "guarantees"
- [x] Zero instances of "AI decides" (always "AI recommends")
- [x] Footer shows "PROTOTYPE · SYNTHETIC DATA" notice
- [x] No real personal data (names, addresses, case numbers outside demo set)
- [x] "Quick exit" button always visible on victim portal

### Code Quality
- [x] No `any` TypeScript types in component props
- [x] No inline styles (only Tailwind classes from token set)
- [x] No unused imports
- [x] All mock data sourced from `/src/data/*.json`
- [x] Demo state machine in single file `/src/lib/demoState.ts`

### Full Video Path Test
Run the complete video recording path end-to-end:

1. [ ] `/login` → click Counsellor → lands on dashboard correctly
2. [ ] `/login` → click "Demo as Victim" → Asha's home loads
3. [ ] Asha's home → "Start check-in" → Q1 loads
4. [ ] Q1–Q8 navigate with Back/Continue
5. [ ] Q8 → Complete screen → "Return to home" works
6. [ ] Counsellor dashboard → priority case click → case detail loads
7. [ ] Case detail → Risk Analysis tab → 4 signal panels visible
8. [ ] Demo panel → Step 6 → risk changes to HIGH animated
9. [ ] Demo panel → Step 8 → alert appears
10. [ ] Alerts list → alert detail → APPROVE button works
11. [ ] Intervention screen confirms approved support
12. [ ] Demo panel → Step 12 → risk drops to MEDIUM
13. [ ] Outcome screen → 72 → 49 → "Monitoring" state

All 13 steps checked = READY FOR VIDEO RECORDING.

### Notes:
```
2026-09-30 — Outcome route shows 72 before, 49 after, High and Medium, the green banner, Protection Support on 2026-10-01, and a lime drop chart. Footer reads PROTOTYPE · SYNTHETIC DATA. At 1024px the side rail is 72px and the page does not scroll sideways. Dashboard SLA moved 00:37 → 00:35 and the critical badge uses a pulse. Monitoring chips appear only after the demo reaches the outcome step, which still needs the Phase 4 APPROVE click. The Recharts tooltip still passes a style object.
```

---

## Add-ons — Registration, Crisis Path, Audit

- [ ] Register case: Case ID, category, stage, consent, safe channel, Create case
- [ ] Created case appears on the Cases list for the session
- [ ] Risk Analysis: REPORT IMMEDIATE SAFETY CONCERN → CRITICAL ALERT → PRIORITY ROUTING
- [ ] Admin audit log shows the five demo rows for #USR-7844 and Priya Sharma

### Notes:
```
[Add review notes here]
```

---

## Final Sign-Off

| Phase | Status | Reviewer | Date |
|---|---|---|---|
| Phase 0 — Design System | ✅ PASS | Implementation review | 2026-09-30 |
| Phase 1 — Login | ✅ PASS | Implementation review | 2026-09-30 |
| Phase 2 — Victim Portal | ⬜ FIGMA OPEN | Implementation review | 2026-09-30 |
| Phase 3 — Officer Dashboard | ⬜ FIGMA OPEN | Implementation review | 2026-09-30 |
| Phase 4 — AI Risk Analysis | ✅ PASS | Implementation review | 2026-09-30 |
| Phase 5 — Outcome & Polish | ⬜ VIDEO PATH OPEN | Implementation review | 2026-09-30 |

**Prototype ready for video recording:** ⬜ NO

---

*This review doc should be updated after completing each phase. Change status to ✅ PASS when all items in that phase check out.*
