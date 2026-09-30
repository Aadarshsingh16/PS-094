import React, { useState } from 'react';
import { 
  X, 
  ArrowRight, 
  Phone, 
  MessageSquare, 
  Heart, 
  Check, 
  Calendar, 
  Mic, 
  LayoutGrid, 
  Smile, 
  Meh, 
  Frown, 
  AlertCircle 
} from 'lucide-react';

interface UserHomeScreenProps {
  onStartCheckin: (mode: 'tap' | 'voice' | 'chat') => void;
  onQuickExit: () => void;
  onCallCounsellor: () => void;
  onChatWithUs: () => void;
  onCallHelpline: () => void;
}

export const UserHomeScreen: React.FC<UserHomeScreenProps> = ({
  onStartCheckin,
  onQuickExit,
  onCallCounsellor,
  onChatWithUs,
  onCallHelpline,
}) => {
  const [selectedMode, setSelectedMode] = useState<'tap' | 'voice' | 'chat'>('tap');
  const [currentMood, setCurrentMood] = useState<string | null>('Okay');

  const moods = [
    { label: 'Calm', bg: 'bg-sky-100 text-sky-700', icon: '😌' },
    { label: 'Okay', bg: 'bg-emerald-100 text-emerald-700', icon: '🙂' },
    { label: 'Tense', bg: 'bg-amber-100 text-amber-700', icon: '😐' },
    { label: 'Afraid', bg: 'bg-orange-100 text-orange-700', icon: '😟' },
    { label: 'Low', bg: 'bg-purple-100 text-purple-700', icon: '😞' },
  ];

  return (
    <div className="min-h-full flex flex-col p-4 pb-24 bg-[#F8FAFC]">
      {/* Top Profile & Quick Exit Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-sm bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-base">
              <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80" 
                alt="Asha" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span>AS</span>
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white"></span>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Good evening</div>
            <div className="text-base font-bold text-slate-900 leading-tight">Asha</div>
          </div>
        </div>

        <button
          onClick={onQuickExit}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 text-xs font-semibold transition-colors"
        >
          <X className="w-3.5 h-3.5" />
          <span>Quick exit</span>
        </button>
      </div>

      {/* Hero Today's Check-in Card */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0B1528] via-[#0F1E3D] to-[#182C58] p-6 text-white shadow-lg mb-4">
        <div className="inline-block px-2.5 py-0.5 rounded-full bg-blue-500/20 text-[10px] font-bold tracking-wider uppercase text-blue-300 mb-2.5">
          TODAY'S CHECK-IN
        </div>

        <h2 className="text-2xl font-bold leading-tight tracking-tight mb-1">
          How are you feeling today?
        </h2>

        <p className="text-slate-300 text-xs mb-4">
          6 short questions · about 3 minutes
        </p>

        {/* Input Mode Selector */}
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setSelectedMode('tap')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
              selectedMode === 'tap'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white/10 text-slate-300 hover:bg-white/15'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Tap</span>
          </button>

          <button
            onClick={() => setSelectedMode('voice')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
              selectedMode === 'voice'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white/10 text-slate-300 hover:bg-white/15'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Voice</span>
          </button>

          <button
            onClick={() => setSelectedMode('chat')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
              selectedMode === 'chat'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white/10 text-slate-300 hover:bg-white/15'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat</span>
          </button>
        </div>

        {/* Big Orange Action CTA */}
        <button
          onClick={() => onStartCheckin(selectedMode)}
          className="w-full py-3.5 px-5 rounded-2xl bg-[#FB713B] hover:bg-[#F95F24] active:scale-[0.99] text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2"
        >
          <span>Start check-in</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Right now I feel... */}
      <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-100 mb-4">
        <h3 className="text-sm font-bold text-slate-900 mb-3.5">
          Right now I feel...
        </h3>

        <div className="grid grid-cols-5 gap-2 text-center">
          {moods.map((m) => {
            const isSelected = currentMood === m.label;
            return (
              <button
                key={m.label}
                onClick={() => setCurrentMood(m.label)}
                className="flex flex-col items-center group transition-transform active:scale-95"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xl mb-1.5 transition-all ${
                    m.bg
                  } ${
                    isSelected
                      ? 'ring-2 ring-blue-600 scale-105 shadow-sm'
                      : 'opacity-85 hover:opacity-100'
                  }`}
                >
                  {m.icon}
                </div>
                <span
                  className={`text-[11px] font-medium ${
                    isSelected ? 'text-blue-600 font-bold' : 'text-slate-600'
                  }`}
                >
                  {m.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Your Week Chart Card */}
      <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-100 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-900">Your week</h3>
          <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 font-semibold text-[11px]">
            5 of 7 days
          </span>
        </div>

        {/* 7 Day Bars */}
        <div className="flex items-end justify-between gap-2 h-24 mb-3 px-2">
          {[
            { day: 'M', height: '60%', active: true },
            { day: 'T', height: '85%', active: true },
            { day: 'W', height: '45%', active: true },
            { day: 'T', height: '95%', active: true },
            { day: 'F', height: '6%', active: false, missed: true },
            { day: 'S', height: '75%', active: true },
            { day: 'S', height: '35%', active: true, today: true },
          ].map((bar, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5 flex-1 h-full justify-end">
              {bar.missed ? (
                <div className="w-full max-w-[28px] h-1.5 rounded-full bg-slate-200"></div>
              ) : (
                <div
                  style={{ height: bar.height }}
                  className={`w-full max-w-[28px] rounded-xl transition-all ${
                    bar.today
                      ? 'bg-blue-300'
                      : 'bg-blue-600'
                  }`}
                ></div>
              )}
              <span className="text-[11px] font-semibold text-slate-400">{bar.day}</span>
            </div>
          ))}
        </div>

        <p className="text-xs text-slate-600 leading-relaxed font-normal">
          Calmer sleep this week than last. Keep going — you are doing well.
        </p>
      </div>

      {/* Your Case Timeline */}
      <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-100 mb-4">
        <h3 className="text-sm font-bold text-slate-900 mb-3.5">Your case</h3>

        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white">
                <Check className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-xs font-semibold text-slate-900">
                Complaint registered
              </span>
            </div>
            <span className="text-xs text-slate-400 font-medium">12 Aug</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white">
                <Check className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-xs font-semibold text-slate-900">
                Counsellor assigned
              </span>
            </div>
            <span className="text-xs text-slate-400 font-medium">14 Aug</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#FFF1EB] flex items-center justify-center text-orange-600 border border-orange-200">
                <Calendar className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-semibold text-slate-900">
                Next hearing · legal aid ready
              </span>
            </div>
            <span className="text-xs text-slate-400 font-medium">14 Oct</span>
          </div>
        </div>
      </div>

      {/* Quick Action 3-card Row */}
      <div className="grid grid-cols-3 gap-2.5">
        <button
          onClick={onCallCounsellor}
          className="rounded-2xl bg-white p-3.5 text-left border border-slate-100 shadow-sm hover:border-blue-200 hover:shadow-md transition-all flex flex-col justify-between min-h-[96px]"
        >
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
            <Phone className="w-4 h-4" />
          </div>
          <span className="text-[12px] font-semibold text-slate-900 leading-tight">
            Call my counsellor
          </span>
        </button>

        <button
          onClick={onChatWithUs}
          className="rounded-2xl bg-white p-3.5 text-left border border-slate-100 shadow-sm hover:border-blue-200 hover:shadow-md transition-all flex flex-col justify-between min-h-[96px]"
        >
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
            <MessageSquare className="w-4 h-4" />
          </div>
          <span className="text-[12px] font-semibold text-slate-900 leading-tight">
            Chat with us
          </span>
        </button>

        <button
          onClick={onCallHelpline}
          className="rounded-2xl bg-white p-3.5 text-left border border-slate-100 shadow-sm hover:border-blue-200 hover:shadow-md transition-all flex flex-col justify-between min-h-[96px]"
        >
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
            <Heart className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-[12px] font-semibold text-slate-900 leading-tight">
            Helpline 14566
          </span>
        </button>
      </div>
    </div>
  );
};
