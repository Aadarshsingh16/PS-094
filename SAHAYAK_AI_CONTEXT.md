# SAHAYAK AI --- Antigravity Project Context

## Project Identity

**Project:** SAHAYAK AI\
**Problem Statement:** AI-Powered Dynamic Mental Health Monitoring and
Distress Prediction System for Victims of Atrocities\
**Hackathon:** Smart India Hackathon 2026\
**Organization:** Ministry of Social Justice and Empowerment ---
Department of Social Justice and Empowerment\
**Category:** Software\
**Theme:** MedTech / BioTech / HealthTech

------------------------------------------------------------------------

## Problem Context

Victims of atrocities can experience prolonged psychological distress
during the investigation, trial, compensation, rehabilitation, and
recovery journey.

The existing ecosystem provides important legal, relief, rehabilitation,
grievance and administrative mechanisms. The proposed system adds a
continuous **well-being and distress-monitoring intelligence layer**.

The central idea is:

> The existing ecosystem follows the case. SAHAYAK AI adds the ability
> to continuously follow the well-being of the person living through
> that case.

The system should therefore understand both:

``` text
CASE JOURNEY
Complaint → Investigation → Court Hearing → Compensation & Relief → Rehabilitation

WELL-BEING JOURNEY
Baseline → Change → Risk → Intervention → Outcome → Continuous Monitoring
```

------------------------------------------------------------------------

## What SAHAYAK AI Does

SAHAYAK AI continuously monitors simulated signals from:

-   Text
-   Voice
-   Behaviour / engagement
-   Case events
-   Safety indicators
-   Social and economic context

It compares current signals with a **personal baseline**, detects
meaningful changes, estimates dynamic distress/vulnerability risk,
explains the important factors, routes alerts to human responders, and
tracks the result of interventions.

It is a **decision-support and monitoring system**, not a replacement
for mental-health professionals, legal officers, protection officers, or
government authorities.

------------------------------------------------------------------------

## Core Design Philosophy

### 1. Consent First

Before monitoring begins:

``` text
Case Registration
      ↓
Classify & Configure
      ↓
Consent & Safe-to-Communicate?
      ↓
Personal Baseline
```

The demo must show consent and safe communication as a visible step.

### 2. Personal Baseline

Do not treat every victim as having the same normal state.

The system establishes a simple individual baseline and detects
deviations over time.

### 3. Multimodal Monitoring

Use three primary signal types:

``` text
TEXT + VOICE + BEHAVIOUR
```

Combine these with:

``` text
CASE EVENTS + SAFETY + SOCIAL/ECONOMIC CONTEXT
```

### 4. Dual-Path Risk Detection

The system contains:

``` text
FAST CRISIS PATH
Immediate danger / safety indicators
        ↓
Immediate alert

DEEP AI PATH
Longitudinal multimodal analysis
        ↓
Dynamic risk assessment
```

### 5. Explainability

Every significant risk result should have understandable reasons.

Do not display an unexplained AI score.

### 6. Human-in-the-Loop

Sensitive actions require human review.

``` text
AI Recommendation
       ↓
Human Review
       ↓
Approve / Modify / Reject
       ↓
Intervention
```

### 7. Closed Loop

The system does not stop after generating an alert.

``` text
Detect → Explain → Support → Follow-up → Measure → Adapt → Monitor
```

------------------------------------------------------------------------

## Main User Roles

### Victim / Complainant / Witness

Can:

-   Complete check-ins
-   Provide text/voice responses
-   View support status
-   Receive safe follow-up
-   Indicate safety concerns

### Counsellor / Mental Health Professional

Can:

-   View assigned cases
-   Review risk factors
-   Review trends
-   Accept or modify recommended support
-   Record intervention
-   Schedule follow-up

### District Officer

Can:

-   View district-level risk overview
-   See critical/high-priority cases
-   Monitor SLA status
-   Track interventions
-   View aggregate trends

### Protection / Legal / Welfare Officer

Can:

-   Review relevant alerts
-   Coordinate protection/legal/welfare support
-   Update intervention status

### System Administrator / Data Governance Officer

Can:

-   Manage users
-   Configure system settings
-   Manage roles/access
-   Review audit activity
-   Manage model/configuration controls

------------------------------------------------------------------------

## Main Case Lifecycle

``` text
1. Case Registration
2. Consent & Safety Configuration
3. Personal Baseline
4. Multi-Channel Check-ins
5. Case Event Ingestion
6. Multimodal Analysis
7. Baseline Comparison
8. Dynamic Risk Assessment
9. Explainable Risk Output
10. Alert & SLA Routing
11. Human Review
12. Intervention
13. Follow-up
14. Outcome Assessment
15. Continuous Monitoring
```

------------------------------------------------------------------------

## Key Demo Scenario

Use one fictional case throughout the video.

### Initial State

``` text
Case: NHAA-DEMO-1042
Stage: Investigation / Court Hearing
Consent: Granted
Baseline Distress: 28
Risk: LOW
```

The victim completes normal check-ins.

The dashboard shows stable monitoring.

### Trigger Event

Introduce a simulated event:

``` text
Upcoming court hearing
+
New safety concern
+
Missed check-ins
+
Negative text response
```

The system receives these events.

### AI Response

Show:

``` text
Baseline: 28
Current Distress: 72

Risk: HIGH
Escalation: Elevated
```

Then show the explanation:

``` text
• Increased fear indicators
• Missed check-ins
• New safety concern
• Upcoming court event
```

### Alert

Create a high-priority alert:

``` text
HIGH-RISK CASE

Priority follow-up required.

Suggested support:
Counselling + Protection review
```

### Human Review

The responder opens the case.

They review:

-   Risk trend
-   Key factors
-   Case timeline
-   Recent interaction
-   Suggested intervention

Then click:

``` text
APPROVE
```

### Intervention

Show:

``` text
Counselling Support
Protection Support
Follow-up Scheduled
```

### Outcome

After the simulated follow-up:

``` text
Current Distress: 72 → 49
Risk: HIGH → MEDIUM
```

Show:

``` text
Outcome improved
Continue monitoring
```

The monitoring loop continues.

------------------------------------------------------------------------

## Figma / UI Direction

The provided visual direction uses:

-   White background
-   Light lavender / purple panels
-   Purple primary UI
-   Green positive/continue state
-   Red critical state
-   Orange high-risk state
-   Yellow medium-risk state
-   Rounded cards
-   Clear flow arrows
-   Dashboard-style information density

Preserve the Figma visual language when implementing screens.

Do not redesign the product into a generic healthcare dashboard.

------------------------------------------------------------------------

## Important UI Screens for the Mock Demo

Build only the screens needed for the video:

### Screen 1 --- Login / Role Selection

Roles:

``` text
District Officer
Counsellor
Responder
Administrator
```

### Screen 2 --- District Dashboard

Show:

-   Total active cases
-   Low / Medium / High / Critical
-   Critical alerts
-   Pending reviews
-   Intervention status
-   Trend chart

### Screen 3 --- Case Detail

Show:

-   Case journey
-   Victim/case identifier
-   Current stage
-   Consent status
-   Distress trend
-   Risk level
-   Key factors
-   Recent events

### Screen 4 --- AI Risk Analysis

Show:

``` text
Text
Voice
Behaviour
Case Context
       ↓
Personal Baseline
       ↓
Dynamic Risk
       ↓
Explainable Factors
```

### Screen 5 --- Alert Detail

Show:

-   Severity
-   Case
-   Why risk increased
-   SLA countdown/status
-   Recommended support
-   Assign responder

### Screen 6 --- Human Review

Buttons:

``` text
Approve
Modify
Reject
```

### Screen 7 --- Intervention Tracking

Show:

-   Counselling
-   Protection
-   Legal aid
-   Financial assistance
-   Rehabilitation
-   Follow-up date
-   Status

### Screen 8 --- Outcome / Continuous Monitoring

Show:

``` text
Before intervention
        ↓
Intervention
        ↓
After intervention
        ↓
Risk trend
        ↓
Continue monitoring
```

------------------------------------------------------------------------

## Mock AI Behaviour

For the first prototype, AI does not need to be real.

Create a deterministic mock AI service.

Example:

``` text
POST /api/demo/check-in
POST /api/demo/analyze-risk
POST /api/demo/trigger-alert
POST /api/demo/review
POST /api/demo/intervention
POST /api/demo/follow-up
```

The frontend should behave as if these are real AI/backend services.

The demo should have a **Demo Mode / Simulation Mode** so the entire
scenario can be reset and replayed.

------------------------------------------------------------------------

## Mock Event Sequence

Implement a single-click or guided demo:

``` text
[1] Stable Case
        ↓
[2] New Court Event
        ↓
[3] Safety Concern
        ↓
[4] Missed Check-in
        ↓
[5] AI Detects Change
        ↓
[6] Risk Changes LOW → HIGH
        ↓
[7] Explainability Appears
        ↓
[8] Alert Created
        ↓
[9] Human Review
        ↓
[10] Intervention Approved
        ↓
[11] Follow-up
        ↓
[12] Risk Improves
        ↓
[13] Continue Monitoring
```

------------------------------------------------------------------------

## Safety / Ethics Constraints

The prototype must use careful terminology.

Use:

-   Distress indicator
-   Well-being signal
-   Vulnerability
-   Risk level
-   Escalation risk
-   Decision support
-   Human review

Avoid claiming:

-   AI diagnoses depression
-   AI diagnoses PTSD
-   AI clinically determines mental illness
-   AI independently decides protection/medical/legal action
-   AI replaces counsellors
-   AI guarantees crisis prediction

All sensitive interventions require human review.

Use fictional/demo data only.

------------------------------------------------------------------------

## What NOT to Build Yet

Do not spend prototype time on:

-   Real NHAA authentication
-   Real 14566 call integration
-   Real government APIs
-   Real ICJS integration
-   Production Kafka infrastructure
-   Production Redis cluster
-   Real SMS/IVRS integration
-   Real patient/victim records
-   Production-grade clinical validation
-   Complex ML training pipelines

These can be represented as architecture placeholders.

------------------------------------------------------------------------

## Antigravity Implementation Priority

Build in this order:

``` text
1. Match Figma UI
2. Create navigation and role flows
3. Add mock case data
4. Build district dashboard
5. Build case detail
6. Build risk analysis screen
7. Build alert + human review
8. Build intervention tracking
9. Build follow-up/outcome screen
10. Add one-click demo simulation
11. Add smooth transitions for video recording
12. Polish responsive layout
```

The priority is **a believable end-to-end demo**, not production
infrastructure.

------------------------------------------------------------------------

## Definition of Done

The prototype is ready for the video when a reviewer can watch one case
move through:

``` text
CASE
 ↓
BASELINE
 ↓
MONITORING
 ↓
DISTRESS CHANGE
 ↓
RISK DETECTION
 ↓
EXPLANATION
 ↓
ALERT
 ↓
HUMAN REVIEW
 ↓
INTERVENTION
 ↓
FOLLOW-UP
 ↓
IMPROVEMENT
 ↓
CONTINUOUS MONITORING
```

without needing any external explanation.

The application should feel like a functioning government-grade
monitoring platform while clearly remaining a **mock demonstration using
synthetic data**.
