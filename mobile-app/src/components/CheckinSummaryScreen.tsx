import React from 'react';
import { X, Sprout, Phone, Shield, Clock } from 'lucide-react';

interface CheckinSummaryScreenProps {
  onBackToHome: () => void;
  onTalkToPerson: () => void;
  onQuickExit: () => void;
  onChangePreferences: () => void;
}

export const CheckinSummaryScreen: React.FC<CheckinSummaryScreenProps> = ({
  onBackToHome,
  onTalkToPerson,
  onQuickExit,
  onChangePreferences,
}) => {
  return (
    <div className="min-h-full flex flex-col justify-between p-4 pb-8 bg-[#F8FAFC]">
      <div>
        {/* Top Quick Exit */}
        <div className="flex justify-end mb-4">
          <button
            onClick={onQuickExit}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 text-xs font-semibold transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            <span>Quick exit</span>
          </button>
        </div>

        {/* Dark Hero Card */}
        <div className="rounded-3xl bg-gradient-to-br from-[#0B1528] via-[#0F1E3D] to-[#152342] p-7 text-white text-center shadow-lg mb-4">
          <div className="flex justify-center mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Sprout className="w-6 h-6 stroke-[2.2]" />
            </div>
          </div>

          <h2 className="text-2xl font-bold tracking-tight leading-snug mb-2">
            Thank you, Asha. You did well today.
          </h2>

          <p className="text-xs text-slate-300 leading-relaxed font-normal max-w-[280px] mx-auto">
            Your check-in is complete. Here is what we heard and what happens next.
          </p>
        </div>

        {/* What we heard Card */}
        <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-100 mb-4">
          <h3 className="text-sm font-bold text-slate-900 mb-3">
            What we heard
          </h3>

          <div className="flex flex-wrap gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-[#FEF3C7] text-[#92400E] text-xs font-semibold">
              Sleep is harder
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-[#EDE9FE] text-[#5B21B6] text-xs font-semibold">
              Worried about hearing
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-[#DCFCE7] text-[#166534] text-xs font-semibold">
              Feeling safe at home
            </span>
          </div>
        </div>

        {/* What happens next Card */}
        <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-100 mb-6">
          <h3 className="text-sm font-bold text-slate-900 mb-3.5">
            What happens next
          </h3>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Phone className="w-4 h-4" />
              </div>
              <p className="text-xs text-slate-800 leading-relaxed font-medium">
                Your counsellor Priya will call you today, 4–6 pm
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Shield className="w-4 h-4" />
              </div>
              <p className="text-xs text-slate-800 leading-relaxed font-medium">
                Your legal-aid team has been told about your hearing
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Clock className="w-4 h-4" />
              </div>
              <p className="text-xs text-slate-800 leading-relaxed font-medium">
                Next check-in: Thursday, 6 pm, by SMS
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={onTalkToPerson}
          className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-semibold text-sm transition-all shadow-sm flex items-center justify-center"
        >
          Talk to a person now
        </button>

        <button
          onClick={onBackToHome}
          className="w-full py-3.5 rounded-xl bg-white border border-slate-200 text-slate-800 font-semibold text-sm hover:bg-slate-50 transition-colors shadow-sm flex items-center justify-center"
        >
          Back to home
        </button>

        <div className="text-center pt-1">
          <button
            onClick={onChangePreferences}
            className="text-xs font-semibold text-blue-600 hover:underline"
          >
            Change how I check in
          </button>
        </div>
      </div>
    </div>
  );
};
