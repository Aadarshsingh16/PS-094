import React, { useState } from 'react';
import { 
  Home, 
  CheckSquare, 
  Heart, 
  User, 
  Users, 
  ArrowLeftRight, 
  Smartphone, 
  Maximize2,
  Minimize2,
  PhoneCall
} from 'lucide-react';
import { WelcomeSafeScreen } from './components/WelcomeSafeScreen';
import { UserHomeScreen } from './components/UserHomeScreen';
import { CheckinFlowScreen } from './components/CheckinFlowScreen';
import { CheckinSummaryScreen } from './components/CheckinSummaryScreen';
import { SupportScreen } from './components/SupportScreen';
import { MePrivacyScreen } from './components/MePrivacyScreen';
import { CounsellorDashboard } from './components/CounsellorDashboard';
import { QuickExitModal } from './components/QuickExitModal';

type ActiveRole = 'victim' | 'counsellor';
type VictimScreen = 'welcome' | 'home' | 'checkin' | 'summary' | 'support' | 'me';

export function App() {
  const [role, setRole] = useState<ActiveRole>('victim');
  const [screen, setScreen] = useState<VictimScreen>('home');
  const [checkinMode, setCheckinMode] = useState<'tap' | 'voice' | 'chat'>('tap');
  const [quickExitOpen, setQuickExitOpen] = useState(false);
  const [isPhoneFrame, setIsPhoneFrame] = useState(true);

  // Call simulation toast
  const [callToast, setCallToast] = useState<string | null>(null);

  const triggerCallSimulation = (title: string) => {
    setCallToast(`Connecting to ${title}...`);
    setTimeout(() => {
      setCallToast(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-800 flex flex-col items-center justify-center p-0 sm:p-4 select-none">
      {/* Floating Demo Control Header (Desktop/Testing) */}
      <aside aria-label="Demo controls" className="w-full max-w-md hidden sm:flex items-center justify-between mb-3 px-3 py-2 bg-slate-800/90 backdrop-blur-md rounded-2xl border border-slate-700/80 shadow-md text-white text-xs">
        <div className="flex items-center gap-2">
          <span className="font-heading font-bold tracking-tight text-blue-400">SAHAYAK</span>
          <span className="text-slate-400">· Mobile App</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Role Switcher Pill */}
          <div className="flex items-center p-0.5 rounded-xl bg-slate-900/80 border border-slate-700">
            <button
              onClick={() => {
                setRole('victim');
                setScreen('home');
              }}
              className={`px-3 py-1 rounded-lg font-semibold text-[11px] transition-all ${
                role === 'victim'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Asha (User App)
            </button>
            <button
              onClick={() => setRole('counsellor')}
              className={`px-3 py-1 rounded-lg font-semibold text-[11px] transition-all ${
                role === 'counsellor'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Counsellor App
            </button>
          </div>

          <button
            onClick={() => setIsPhoneFrame(!isPhoneFrame)}
            title={isPhoneFrame ? "Fullscreen view" : "Phone frame view"}
            className="p-1.5 rounded-lg bg-slate-700/70 hover:bg-slate-700 text-slate-300"
          >
            {isPhoneFrame ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </aside>

      {/* Mobile Device Frame Container */}
      <div 
        className={`w-full overflow-hidden transition-all duration-300 bg-white relative shadow-2xl flex flex-col ${
          isPhoneFrame 
            ? 'max-w-[420px] h-[92vh] max-h-[890px] sm:rounded-[44px] sm:border-[8px] sm:border-slate-800' 
            : 'max-w-md h-screen rounded-none'
        }`}
      >
        {/* Dynamic Island / Notch Simulation on mobile frame */}
        <div className="hidden sm:flex justify-center pt-2 pb-1 bg-inherit z-40">
          <div className="w-24 h-4 rounded-full bg-slate-800"></div>
        </div>

        {/* Call Toast Notification */}
        {callToast && (
          <div className="absolute top-12 left-4 right-4 z-50 p-3.5 rounded-2xl bg-slate-900/95 text-white flex items-center justify-between text-xs font-semibold shadow-2xl border border-slate-700 animate-slideDown">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center animate-pulse">
                <PhoneCall className="w-3.5 h-3.5 text-white" />
              </div>
              <span>{callToast}</span>
            </div>
            <button onClick={() => setCallToast(null)} className="text-slate-400 hover:text-white">✕</button>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto no-scrollbar relative">
          {/* ================= USER / VICTIM ROLE SCREENS ================= */}
          {role === 'victim' && (
            <>
              {screen === 'welcome' && (
                <WelcomeSafeScreen
                  onProceed={() => setScreen('home')}
                  onRemindLater={() => setQuickExitOpen(true)}
                  onCallHelpline={() => triggerCallSimulation('National Helpline 14566')}
                />
              )}

              {screen === 'home' && (
                <UserHomeScreen
                  onStartCheckin={(mode) => {
                    setCheckinMode(mode);
                    setScreen('checkin');
                  }}
                  onQuickExit={() => setQuickExitOpen(true)}
                  onCallCounsellor={() => triggerCallSimulation('Priya Sharma (Counsellor)')}
                  onChatWithUs={() => {
                    setCheckinMode('chat');
                    setScreen('checkin');
                  }}
                  onCallHelpline={() => triggerCallSimulation('National Helpline 14566')}
                />
              )}

              {screen === 'checkin' && (
                <CheckinFlowScreen
                  initialMode={checkinMode}
                  onBack={() => setScreen('home')}
                  onQuickExit={() => setQuickExitOpen(true)}
                  onComplete={() => setScreen('summary')}
                />
              )}

              {screen === 'summary' && (
                <CheckinSummaryScreen
                  onBackToHome={() => setScreen('home')}
                  onTalkToPerson={() => triggerCallSimulation('Assigned Counsellor Priya')}
                  onQuickExit={() => setQuickExitOpen(true)}
                  onChangePreferences={() => setScreen('me')}
                />
              )}

              {screen === 'support' && (
                <SupportScreen
                  onQuickExit={() => setQuickExitOpen(true)}
                  onCallHelpline={() => triggerCallSimulation('National Helpline 14566')}
                  onCallCounsellor={() => triggerCallSimulation('Priya Sharma (Counsellor)')}
                />
              )}

              {screen === 'me' && (
                <MePrivacyScreen
                  onQuickExit={() => setQuickExitOpen(true)}
                />
              )}
            </>
          )}

          {/* ================= COUNSELLOR ROLE SCREEN ================= */}
          {role === 'counsellor' && (
            <CounsellorDashboard 
              onQuickExit={() => setQuickExitOpen(true)} 
            />
          )}
        </main>

        {/* Bottom Navigation Bar for User Role (Visible on main tabs) */}
        {role === 'victim' && !['welcome', 'checkin', 'summary'].includes(screen) && (
          <nav aria-label="Victim Navigation" className="border-t border-slate-200/80 bg-white/95 backdrop-blur-md px-6 py-2.5 flex items-center justify-between z-30">
            <button
              onClick={() => setScreen('home')}
              className={`flex flex-col items-center gap-1 transition-all ${
                screen === 'home' ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Home className="w-5 h-5 stroke-[2.2]" />
              <span className="text-[11px]">Home</span>
            </button>

            <button
              onClick={() => {
                setCheckinMode('tap');
                setScreen('checkin');
              }}
              className={`flex flex-col items-center gap-1 transition-all ${
                screen === 'checkin' ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <CheckSquare className="w-5 h-5 stroke-[2.2]" />
              <span className="text-[11px]">Check-in</span>
            </button>

            <button
              onClick={() => setScreen('support')}
              className={`flex flex-col items-center gap-1 transition-all ${
                screen === 'support' ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Heart className="w-5 h-5 stroke-[2.2]" />
              <span className="text-[11px]">Support</span>
            </button>

            <button
              onClick={() => setScreen('me')}
              className={`flex flex-col items-center gap-1 transition-all ${
                screen === 'me' ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <User className="w-5 h-5 stroke-[2.2]" />
              <span className="text-[11px]">Me</span>
            </button>
          </nav>
        )}

        {/* Bottom Navigation Bar for Counsellor Role */}
        {role === 'counsellor' && (
          <nav aria-label="Counsellor Navigation" className="border-t border-slate-200/80 bg-white/95 backdrop-blur-md px-6 py-2.5 flex items-center justify-between z-30">
            <button
              className="flex flex-col items-center gap-1 text-emerald-700 font-bold"
            >
              <Home className="w-5 h-5 stroke-[2.2]" />
              <span className="text-[11px]">Home</span>
            </button>

            <button
              onClick={() => triggerCallSimulation('Assigned Cases List')}
              className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600"
            >
              <Users className="w-5 h-5 stroke-[2.2]" />
              <span className="text-[11px]">Cases</span>
            </button>

            <button
              onClick={() => triggerCallSimulation('Critical Alerts List')}
              className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600"
            >
              <Heart className="w-5 h-5 stroke-[2.2]" />
              <span className="text-[11px]">Alerts</span>
            </button>

            <button
              onClick={() => {
                setRole('victim');
                setScreen('welcome');
              }}
              className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600"
            >
              <ArrowLeftRight className="w-5 h-5 stroke-[2.2]" />
              <span className="text-[11px]">Switch App</span>
            </button>
          </nav>
        )}

        {/* Discreet Quick Exit Decoy Screen */}
        <QuickExitModal
          isOpen={quickExitOpen}
          onClose={() => setQuickExitOpen(false)}
        />
      </div>
    </div>
  );
}

export default App;
