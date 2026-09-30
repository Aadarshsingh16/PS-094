# SAHAYAK AI --- Prototype Architecture

## 1. Purpose

SAHAYAK AI is a **mock prototype** for a Smart India Hackathon
demonstration of an AI-powered dynamic mental-health/distress and
vulnerability monitoring system for victims of atrocities.

The prototype is designed to demonstrate the **product experience,
system flow, risk lifecycle, alerts, human review, interventions, and
follow-up loop**.

**Important:** This prototype does not connect to real NHAA/14566
systems, police systems, ICJS, real victim records, real notifications,
or real clinical services. All data, AI outputs, alerts, and case events
are simulated.

------------------------------------------------------------------------

## 2. Core Product Flow

``` text
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

------------------------------------------------------------------------

## 3. Prototype Architecture

### Layer 1 --- User & Case Interaction

Mock interfaces representing:

-   Victim / Witness
-   Counsellor
-   District Officer
-   Protection / Legal / Welfare Officer
-   System Administrator

Prototype channels:

-   Mobile App
-   Web Portal
-   Chatbot
-   SMS
-   IVRS
-   NHAA Agent

For the demo, these channels are simulated inside the application.

------------------------------------------------------------------------

### Layer 2 --- Case & Consent

The system creates a mock case and configures:

-   Case ID
-   Victim profile
-   Case category
-   Case stage
-   Preferred language
-   Safe communication channel
-   Consent status
-   Check-in frequency
-   Personal baseline

Example:

``` text
Case ID: NHAA-DEMO-1042
Stage: Court Hearing
Consent: Granted
Safe Channel: Mobile App
Baseline: Stable
```

------------------------------------------------------------------------

### Layer 3 --- Event Ingestion

The mock system receives simulated events from:

``` text
Check-in
Case Event
Text Response
Voice Response
Behaviour / Engagement
Officer Update
```

A mock event bus represents asynchronous event processing.

Suggested implementation:

``` text
Frontend
   ↓
API / Service Layer
   ↓
Mock Event Queue
   ↓
Risk Processing
```

Kafka can be represented visually in the architecture, but **the demo
does not require a real Kafka cluster**.

------------------------------------------------------------------------

### Layer 4 --- AI & Risk Intelligence

The prototype simulates:

#### Text Analysis

Extracts example indicators such as:

-   fear
-   hopelessness
-   stress
-   isolation
-   safety concern

#### Voice Analysis

For the demo, use simulated voice/emotion indicators rather than
claiming clinical diagnosis.

Example:

``` text
Voice signal → elevated stress indicator
```

#### Behaviour Analysis

Example signals:

-   missed check-ins
-   reduced engagement
-   repeated help requests
-   sudden communication changes

#### Case Context

Example contextual factors:

-   court hearing
-   investigation delay
-   threat report
-   compensation delay
-   rehabilitation event

------------------------------------------------------------------------

## 4. Personal Baseline

Risk is compared against the individual's own baseline rather than only
using a generic population threshold.

Example:

``` text
Baseline distress: 28
Current distress: 61
Change: +33
```

The prototype should visualize this as a trend.

------------------------------------------------------------------------

## 5. Dynamic Risk Engine

The prototype combines:

``` text
Psychological indicators
        +
Behavioural change
        +
Safety indicators
        +
Case context
        +
Personal baseline
        ↓
Dynamic Risk Assessment
```

Example output:

``` text
Risk Level: HIGH
Distress Score: 72/100
Escalation Risk: Elevated
```

Risk levels:

-   LOW
-   MEDIUM
-   HIGH
-   CRITICAL

These are **prototype decision-support labels**, not medical diagnoses.

------------------------------------------------------------------------

## 6. Explainable AI

Every high-risk result should show simple reasons.

Example:

``` text
Why did risk increase?

+18  Increased fear indicators
+14  Missed two check-ins
+11  New safety concern
+09  Upcoming court hearing
```

The demo should avoid showing a mysterious AI score with no explanation.

------------------------------------------------------------------------

## 7. Crisis Fast Path

The prototype has two conceptual processing paths.

### Fast Crisis Path

Used for immediate safety indicators.

``` text
New Event
   ↓
Crisis Rules
   ↓
Immediate Danger?
   ↓
Critical Alert
```

This path should visually appear faster than normal AI processing.

### Deep AI Path

Used for longitudinal risk assessment.

``` text
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

------------------------------------------------------------------------

## 8. Alert & Human Review

AI should **not autonomously decide or execute sensitive
interventions**.

Flow:

``` text
Risk Detected
     ↓
Alert Engine
     ↓
SLA Routing
     ↓
Human Review
     ↓
Approve / Modify / Reject
     ↓
Intervention
```

Example alert:

``` text
HIGH RISK
Case: NHAA-DEMO-1042

Reasons:
• Increased distress
• Safety concern
• Missed check-ins

Recommended action:
Priority counsellor follow-up
```

------------------------------------------------------------------------

## 9. Intervention Layer

Mock intervention categories:

-   Counselling Support
-   Legal Aid
-   Protection Support
-   Financial Assistance
-   Rehabilitation Support

The prototype should demonstrate recommendation + human approval +
execution tracking.

------------------------------------------------------------------------

## 10. Closed-Loop Monitoring

After intervention:

``` text
Intervention
     ↓
Follow-up
     ↓
Outcome Assessment
     ↓
Improved?
   ↙       ↘
 YES       NO
 ↓          ↓
Continue   Escalate /
Support    Modify
     ↓
Continuous Monitoring
```

This closed loop is a key differentiator of the concept.

------------------------------------------------------------------------

## 11. Dashboard Views

### District Dashboard

Show:

-   Active cases
-   Risk distribution
-   Critical alerts
-   Pending human reviews
-   Intervention status
-   Follow-up due
-   District trend

### Case Detail

Show:

-   Case journey
-   Well-being timeline
-   Risk score trend
-   Key risk factors
-   Recent interactions
-   Alerts
-   Interventions
-   Follow-up outcome

### Counsellor / Responder View

Show:

-   Assigned cases
-   Priority
-   Reason for alert
-   Recommended support
-   Review controls
-   Follow-up status

------------------------------------------------------------------------

## 12. Mock Data Architecture

Use deterministic demo data.

Example:

``` json
{
  "caseId": "NHAA-DEMO-1042",
  "stage": "Court Hearing",
  "consent": true,
  "baselineDistress": 28,
  "currentDistress": 72,
  "riskLevel": "HIGH",
  "riskFactors": [
    "Safety concern",
    "Missed check-ins",
    "Upcoming hearing"
  ],
  "recommendedAction": "Priority counselling follow-up"
}
```

Do not use real personal information.

------------------------------------------------------------------------

## 13. Suggested Prototype Stack

Frontend:

-   React / Next.js
-   Tailwind CSS
-   Recharts or equivalent chart library

Prototype backend:

-   FastAPI or Node.js
-   Mock REST APIs
-   JSON / local database

Optional simulated infrastructure:

-   Redis-style fast crisis state
-   Kafka-style event stream
-   PostgreSQL-style case store

AI:

-   Mock AI service for the video demo
-   Deterministic rule/model outputs
-   Optional real NLP/audio models later

------------------------------------------------------------------------

## 14. Prototype Principle

Build the prototype as a **convincing simulation of the complete
system**, not as a partially implemented production platform.

The video demo should make the audience understand:

``` text
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

------------------------------------------------------------------------

## 15. Production Boundary

The following are future production integrations and should remain
mocked:

-   NHAA 14566 integration
-   ICJS / police case integration
-   Real SMS/IVRS providers
-   Real authentication and identity verification
-   Production Kafka
-   Production Redis
-   Clinical-grade assessment
-   Real counsellor workflow
-   Government notification systems
-   Production model governance
-   Real victim data

Never imply that the prototype is already connected to these systems.
