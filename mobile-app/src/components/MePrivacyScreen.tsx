import React, { useState } from 'react';
import { Shield, EyeOff, Bell, Lock, CheckCircle2, ChevronRight, X, Clock, Smartphone, MessageSquare, Phone } from 'lucide-react';

interface MePrivacyScreenProps {
  onQuickExit: () => void;
}

export const MePrivacyScreen: React.FC<MePrivacyScreenProps> = ({ onQuickExit }) => {
  const [preferredChannel, setPreferredChannel] = useState<'SMS' | 'IVRS' | 'App'>('SMS');
  const [discreetMode, setDiscreetMode] = useState(true);
  const [hidePreviews, setHidePreviews] = useState(true);
  const [autoSignOut, setAutoSignOut] = useState(true);

  return (
    <div className="min-h-full flex flex-col p-4 pb-24 bg-[#F8FAFC]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Privacy & Settings</h1>
          <p className="text-xs text-slate-500 font-normal">Controlled access & discreet channels</p>
        </div>

        <button
          onClick={onQuickExit}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 text-xs font-semibold transition-colors"
        >
          <X className="w-3.5 h-3.5" />
          <span>Quick exit</span>
        </button>
      </div>

      {/* Profile ID Card */}
      <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-100 mb-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-sm">
            AS
          </div>
          <div>
            <div className="text-base font-bold text-slate-900">Asha</div>
            <div className="text-xs text-slate-500 font-medium">Case: NHAA-DEMO-1042 · Witness</div>
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold mt-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>Consent Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Preferred Safe Channels */}
      <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-100 mb-4">
        <h3 className="text-sm font-bold text-slate-900 mb-1">Safe Check-in Channel</h3>
        <p className="text-xs text-slate-500 mb-3">Choose how you wish to receive regular follow-up prompts</p>

        <div className="space-y-2.5">
          {[
            { id: 'SMS', label: 'SMS Messages', sub: 'Short, discreet text prompts. No case details mentioned.', icon: MessageSquare },
            { id: 'IVRS', label: 'Automated Phone Call', sub: 'Keypad or voice answers at your safe time.', icon: Phone },
            { id: 'App', label: 'Mobile App Notifications', sub: 'Direct in-app private notifications.', icon: Smartphone },
          ].map((ch) => {
            const isSelected = preferredChannel === ch.id;
            const Icon = ch.icon;
            return (
              <div
                key={ch.id}
                onClick={() => setPreferredChannel(ch.id as any)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/40 ring-1 ring-blue-600'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{ch.label}</div>
                    <div className="text-[11px] text-slate-500 font-normal">{ch.sub}</div>
                  </div>
                </div>
                {isSelected && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white">
                    Active
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Discreet Mode Settings */}
      <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-100 mb-4">
        <div className="flex items-center gap-2 mb-1">
          <EyeOff className="w-4 h-4 text-purple-600" />
          <h3 className="text-sm font-bold text-slate-900">Discreet Mode & Safety</h3>
        </div>
        <p className="text-xs text-slate-500 mb-3.5">Protect your screen if someone looks over your shoulder</p>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-900">Hide message previews</div>
              <div className="text-[11px] text-slate-500">Prevent text from appearing on lock screen</div>
            </div>
            <button
              onClick={() => setHidePreviews(!hidePreviews)}
              className={`w-11 h-6 rounded-full transition-colors relative ${hidePreviews ? 'bg-blue-600' : 'bg-slate-200'}`}
            >
              <span className={`block w-5 h-5 rounded-full bg-white transition-transform ${hidePreviews ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-900">Auto sign-out after 2 min</div>
              <div className="text-[11px] text-slate-500">Locks session automatically when idle</div>
            </div>
            <button
              onClick={() => setAutoSignOut(!autoSignOut)}
              className={`w-11 h-6 rounded-full transition-colors relative ${autoSignOut ? 'bg-blue-600' : 'bg-slate-200'}`}
            >
              <span className={`block w-5 h-5 rounded-full bg-white transition-transform ${autoSignOut ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Safe Contact Hours */}
      <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-100">
        <div className="flex items-center gap-2 mb-1">
          <Clock className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-bold text-slate-900">Safe Contact Hours</h3>
        </div>
        <p className="text-xs text-slate-500 mb-2">We will only contact you during these windows:</p>

        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-800">Monday — Saturday</span>
          <span className="text-xs font-bold text-blue-700 bg-blue-100/70 px-2.5 py-0.5 rounded-full">
            6:00 PM — 7:00 PM
          </span>
        </div>
      </div>
    </div>
  );
};
