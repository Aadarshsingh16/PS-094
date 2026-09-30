# SAHAYAK AI — Mobile WebApp & Capacitor Android APK

This is the mobile application for **SAHAYAK AI** (Smart India Hackathon 2026), built to match the mobile designs in `moible/` and packaged with **Capacitor** for Android APK generation.

---

## 📱 Implemented Screens & Features

1. **User / Victim App (Asha - #USR-7844)**
   - **Welcome & Safe-to-talk**: Shield branding, language toggle, discreet confidentiality check, "Yes, I can talk" or "Remind me later", direct helpline 14566 action.
   - **Home**: "Good evening, Asha", instant mood selector (Calm, Okay, Tense, Afraid, Low), "Today's check-in" hero card with mode pills, 7-day consistency bar chart (5 of 7 days), Case journey milestones, and quick action cards.
   - **Check-in Modes**:
     - **Tap Mode**: 8 structured questions, moon icon for sleep, progress indicator, custom selection cards.
     - **Voice Mode**: Real-time timer (`00:12`), animated audio waveform bars, pulsing microphone button, "WHAT WE HEARD" transcript transcription.
     - **Chat Mode**: Conversational interface with empathetic bot prompts, quick choice pills, and typed inputs.
   - **Summary & Support**: Check-in complete acknowledgment, summary chips ("Sleep is harder", "Worried about hearing"), next step timeline (Counsellor call 4–6 pm, Legal-aid DLSA update, next check-in reminder).
   - **Support Directory**: 24x7 National Helpline 14566, direct counsellor Priya Sharma connect, Legal Aid DLSA Advocate, District Protection Cell.
   - **Privacy & Settings**: Safe communication channel (SMS / IVRS / App), Discreet mode toggle, safe contact hours (6:00–7:00 PM).

2. **Counsellor Dashboard (Priya Sharma)**
   - Urgent Case Banner: `#USR-7844` (Critical, SLA `00:42 left`, score 72 `▲ +18 in 14d`), "Review case" and "Why?" buttons.
   - 4 Metric Cards: Cases (48), Alerts (7), SLA (94%), Avg distress (61).
   - Distress Trend Chart: 8-week trend curve with gradient wash and week markers (W1 to W8).
   - Risk Distribution: 4-segment distribution bar (Critical 6, High 14, Medium 18, Low 10).
   - Priority Cases List: `#USR-7844`, `#USR-5120`, `#USR-3391` with tags and SLA count.
   - Interactive Modals: "Why did risk increase?" explainability factors and "Human Review / Approve Support".

3. **Safety First: Quick Exit**
   - Tapping "✕ Quick exit" anywhere immediately opens a realistic decoy weather app to protect victims if someone approaches them. Tapping the weather 3 times resumes the session.

---

## 🚀 Running the Mobile WebApp Locally

```bash
cd mobile-app
npm run dev
```

Visit [http://localhost:5173/](http://localhost:5173/) in your browser.
On desktop, it renders in a smartphone device frame (with toggle for full-screen mode). On mobile browsers, it renders full-screen.

---

## 📦 Building the Android APK with Capacitor

The Capacitor Android project is already configured and synced inside the `android/` directory!

### Option 1: Open in Android Studio (Recommended for generating signed/debug APK)
```bash
npm run cap:open
```
In Android Studio:
1. Wait for Gradle sync to complete.
2. Select **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**.
3. The APK will be generated at:
   `android/app/build/outputs/apk/debug/app-debug.apk`

### Option 2: Build APK via Command Line
Ensure you have the Android SDK and Java JDK (version 17 or 21) installed:
```bash
# Sync latest web build to native Android project
npm run cap:sync

# Build debug APK via Gradle wrapper
cd android
./gradlew assembleDebug      # On Linux/macOS
.\gradlew.bat assembleDebug  # On Windows PowerShell
```
The output APK file will be located at:
`mobile-app/android/app/build/outputs/apk/debug/app-debug.apk`
