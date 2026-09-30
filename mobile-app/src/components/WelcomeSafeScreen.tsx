import React, { useState } from 'react';
import { Shield, Globe, Lock, Phone, ChevronRight } from 'lucide-react';

interface WelcomeSafeScreenProps {
  onProceed: () => void;
  onRemindLater: () => void;
  onCallHelpline: () => void;
}

export const WelcomeSafeScreen: React.FC<WelcomeSafeScreenProps> = ({
  onProceed,
  onRemindLater,
  onCallHelpline,
}) => {
  const [language, setLanguage] = useState<'English' | 'हिन्दी'>('English');

  return (
    <div className="min-h-full flex flex-col justify-between p-5 pb-8 bg-[#F8FAFC]">
      {/* Top Header */}
      <div>
        {/* Brand Bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <Shield className="w-5 h-5 fill-current" />
            </div>
            <span className="font-heading font-bold text-lg tracking-tight text-slate-900">
              SAHAYAK
            </span>
          </div>

          <button
            onClick={() => setLanguage(l => (l === 'English' ? 'हिन्दी' : 'English'))}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-200/70 text-slate-700 text-xs font-medium hover:bg-slate-200 transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{language}</span>
          </button>
        </div>

        {/* Headline */}
        <h1 className="text-[32px] leading-[1.15] font-bold text-slate-900 tracking-tight mb-3">
          Hello. You are in a safe space.
        </h1>

        <p className="text-slate-600 text-[15px] leading-relaxed mb-6 font-normal">
          This is a private place to tell us how you are doing. You choose how to answer — by tapping, speaking or chatting.
        </p>

        {/* Dark Navy Hero Card */}
        <div className="rounded-3xl bg-gradient-to-br from-[#0B1528] via-[#101D38] to-[#1E2E4F] p-6 text-white shadow-lg mb-5">
          <div className="inline-block px-2.5 py-1 rounded-full bg-white/10 text-[11px] font-semibold tracking-wider uppercase text-blue-200 mb-3">
            GOOD EVENING
          </div>
          <h2 className="text-xl font-bold leading-snug tracking-tight mb-2">
            Whatever brought you here, you don't have to face it alone.
          </h2>
          <p className="text-slate-300 text-xs leading-relaxed">
            SAHAYAK stays with you between hearings, calls and check-ins.
          </p>
        </div>

        {/* Safe-to-talk Question Card */}
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100 mb-4">
          <h3 className="text-xl font-bold text-slate-900 mb-1.5">
            Is it safe to talk right now?
          </h3>
          <p className="text-slate-500 text-xs mb-5">
            Please check that no one can see or hear your screen.
          </p>

          <div className="space-y-3">
            <button
              onClick={onProceed}
              className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white text-[15px] font-semibold transition-all shadow-sm flex items-center justify-center"
            >
              Yes, I can talk
            </button>

            <button
              onClick={onRemindLater}
              className="w-full py-3.5 px-4 rounded-xl bg-transparent border border-slate-200 hover:bg-slate-50 text-slate-700 text-[14px] font-medium transition-colors flex items-center justify-center"
            >
              Not right now — remind me later
            </button>
          </div>

          <div className="flex items-center justify-center gap-1.5 mt-4 text-[11px] text-slate-400">
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            <span>Only your assigned counsellor can see your answers.</span>
          </div>
        </div>
      </div>

      {/* Helpline Card */}
      <button
        onClick={onCallHelpline}
        className="w-full rounded-2xl bg-[#FFF1EB] border border-[#FED7AA]/50 p-4 flex items-center justify-between text-left hover:bg-[#FFE8DC] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#FDBA74]/30 flex items-center justify-center text-orange-600">
            <Phone className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">
              Prefer to talk to a person?
            </div>
            <div className="text-xs text-orange-600 font-medium">
              Call 14566 — free, in your language
            </div>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-orange-400" />
      </button>
    </div>
  );
};
