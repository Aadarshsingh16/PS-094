import React from 'react';
import { Phone, Shield, Heart, LifeBuoy, ChevronRight, X, PhoneCall, AlertOctagon } from 'lucide-react';

interface SupportScreenProps {
  onQuickExit: () => void;
  onCallHelpline: () => void;
  onCallCounsellor: () => void;
}

export const SupportScreen: React.FC<SupportScreenProps> = ({
  onQuickExit,
  onCallHelpline,
  onCallCounsellor,
}) => {
  return (
    <div className="min-h-full flex flex-col p-4 pb-24 bg-[#F8FAFC]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Support Directory</h1>
          <p className="text-xs text-slate-500 font-normal">Immediate assistance & trusted contacts</p>
        </div>

        <button
          onClick={onQuickExit}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 text-xs font-semibold transition-colors"
        >
          <X className="w-3.5 h-3.5" />
          <span>Quick exit</span>
        </button>
      </div>

      {/* Emergency Helpline Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-red-600 to-rose-700 p-5 text-white shadow-lg mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider">
            24x7 Toll-Free Helpline
          </span>
          <AlertOctagon className="w-5 h-5 text-red-200" />
        </div>
        <h2 className="text-2xl font-bold font-heading mb-1">National Helpline 14566</h2>
        <p className="text-xs text-red-100 mb-4">
          Ministry of Social Justice & Empowerment · Free, confidential assistance in your language
        </p>
        <button
          onClick={onCallHelpline}
          className="w-full py-3 rounded-xl bg-white text-red-700 font-bold text-xs hover:bg-red-50 transition-colors shadow-sm flex items-center justify-center gap-2"
        >
          <PhoneCall className="w-4 h-4" />
          <span>Call 14566 Now</span>
        </button>
      </div>

      {/* Dedicated Support Contacts */}
      <div className="space-y-3 mb-6">
        {/* Counsellor */}
        <div 
          onClick={onCallCounsellor}
          className="rounded-3xl bg-white p-4 shadow-sm border border-slate-100 flex items-center justify-between cursor-pointer hover:border-blue-200 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Priya Sharma</div>
              <div className="text-xs text-slate-500">Your Assigned Counsellor</div>
              <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                ● Scheduled call today 4:00–6:00 PM
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        {/* Legal Aid DLSA */}
        <div className="rounded-3xl bg-white p-4 shadow-sm border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Legal Aid Counsel (DLSA)</div>
              <div className="text-xs text-slate-500">Advocate S. Verma</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Court Hearing support ready</div>
            </div>
          </div>
          <span className="text-xs text-blue-600 font-semibold">Available</span>
        </div>

        {/* Protection Officer */}
        <div className="rounded-3xl bg-white p-4 shadow-sm border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <LifeBuoy className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">District Protection Unit</div>
              <div className="text-xs text-slate-500">Witness Protection Cell</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Discreet transport assistance</div>
            </div>
          </div>
          <span className="text-xs text-blue-600 font-semibold">Active</span>
        </div>
      </div>

      {/* Immediate Safe Action Steps */}
      <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-100">
        <h3 className="text-sm font-bold text-slate-900 mb-2">Safety guidance</h3>
        <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4">
          <li>If you feel unsafe right now, tap <strong>Quick exit</strong> anytime.</li>
          <li>We never send sensitive case details over unencrypted channels.</li>
          <li>Your check-ins are strictly private between you and your assigned counsellor.</li>
        </ul>
      </div>
    </div>
  );
};
