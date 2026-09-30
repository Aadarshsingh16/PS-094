import React, { useState } from 'react';
import { 
  Bell, 
  Clock, 
  Users, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  ChevronRight, 
  TrendingUp, 
  Info,
  X,
  PhoneCall,
  CalendarCheck,
  Check
} from 'lucide-react';
import { MOCK_PRIORITY_CASES } from '../data/mockData';

interface CounsellorDashboardProps {
  onQuickExit: () => void;
}

export const CounsellorDashboard: React.FC<CounsellorDashboardProps> = ({ onQuickExit }) => {
  const [trendRange, setTrendRange] = useState<'8w' | '30d'>('8w');
  const [showWhyModal, setShowWhyModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedCase, setSelectedCase] = useState<any>(MOCK_PRIORITY_CASES[0]);
  const [interventionApproved, setInterventionApproved] = useState(false);

  const handleApproveSupport = () => {
    setInterventionApproved(true);
    setTimeout(() => {
      setShowReviewModal(false);
      setInterventionApproved(false);
    }, 1500);
  };

  return (
    <div className="min-h-full flex flex-col p-4 pb-24 bg-[#F8FAFC]">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
            PS
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Good morning</div>
            <div className="text-base font-bold text-slate-900 leading-tight">Priya Sharma</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowWhyModal(true)}
            className="relative w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Bell className="w-5 h-5 text-slate-700" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500"></span>
          </button>
        </div>
      </div>

      {/* Hero Urgent Case Card */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0B1528] via-[#161B3D] to-[#251F4F] p-6 text-white shadow-lg mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 text-[11px] font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
            Critical
          </span>

          <span className="flex items-center gap-1 text-[11px] text-slate-300 font-medium bg-white/10 px-2 py-0.5 rounded-full">
            <Clock className="w-3 h-3 text-slate-300" />
            <span>00:42 left</span>
          </span>
        </div>

        <h2 className="text-2xl font-bold tracking-tight mb-0.5">#USR-7844</h2>
        <p className="text-slate-300 text-xs mb-3 font-normal">
          Threatened witness · Hearing postponed
        </p>

        <div className="flex items-baseline gap-2.5 mb-5">
          <span className="text-4xl font-heading font-bold text-white">72</span>
          <span className="px-2 py-0.5 rounded-full bg-[#FEF08A] text-[#854D0E] text-[11px] font-bold">
            ▲ +18 in 14d
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setShowReviewModal(true)}
            className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-all shadow-sm flex items-center justify-center"
          >
            Review case
          </button>
          <button
            onClick={() => setShowWhyModal(true)}
            className="py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-xs transition-all shadow-sm flex items-center justify-center"
          >
            Why?
          </button>
        </div>
      </div>

      {/* 4 Metrics (2x2 Grid) */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Card 1: Cases */}
        <div className="rounded-3xl bg-white p-4 shadow-sm border border-slate-100">
          <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium mb-1">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>Cases</span>
          </div>
          <div className="text-3xl font-heading font-bold text-slate-900 mb-2">48</div>
          <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
            +4 this week
          </span>
        </div>

        {/* Card 2: Alerts */}
        <div className="rounded-3xl bg-white p-4 shadow-sm border border-slate-100">
          <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium mb-1">
            <Bell className="w-3.5 h-3.5 text-slate-400" />
            <span>Alerts</span>
          </div>
          <div className="text-3xl font-heading font-bold text-slate-900 mb-2">7</div>
          <span className="inline-block px-2 py-0.5 rounded-full bg-red-50 text-red-600 text-[10px] font-bold">
            2 critical
          </span>
        </div>

        {/* Card 3: SLA */}
        <div className="rounded-3xl bg-white p-4 shadow-sm border border-slate-100">
          <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium mb-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>SLA</span>
          </div>
          <div className="text-3xl font-heading font-bold text-slate-900 mb-2">94%</div>
          <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
            Target 90%
          </span>
        </div>

        {/* Card 4: Avg Distress */}
        <div className="rounded-3xl bg-white p-4 shadow-sm border border-slate-100">
          <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium mb-1">
            <Activity className="w-3.5 h-3.5 text-slate-400" />
            <span>Avg distress</span>
          </div>
          <div className="text-3xl font-heading font-bold text-slate-900 mb-2">61</div>
          <span className="inline-block px-2 py-0.5 rounded-full bg-red-50 text-red-600 text-[10px] font-bold">
            ▲ 9 vs 14d
          </span>
        </div>
      </div>

      {/* Distress Trend Card */}
      <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-100 mb-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Distress trend</h3>
            <p className="text-[11px] text-slate-400">Average · last 8 weeks</p>
          </div>

          <div className="flex items-center p-0.5 rounded-full bg-slate-100 border border-slate-200">
            <button
              onClick={() => setTrendRange('8w')}
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold transition-all ${
                trendRange === '8w'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              8w
            </button>
            <button
              onClick={() => setTrendRange('30d')}
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold transition-all ${
                trendRange === '30d'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              30d
            </button>
          </div>
        </div>

        {/* Custom SVG Trend Curve with Gradient Fill */}
        <div className="relative h-28 w-full mt-3">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 320 80" preserveAspectRatio="none">
            <defs>
              <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22C55E" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#22C55E" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Gradient Area below curve */}
            <path
              d="M 10 55 Q 80 48, 150 35 T 310 10 L 310 75 L 10 75 Z"
              fill="url(#trendGradient)"
            />

            {/* Green Trend Line */}
            <path
              d="M 10 55 Q 80 48, 150 35 T 310 10"
              fill="none"
              stroke="#22C55E"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* End Point Indicator */}
            <circle cx="310" cy="10" r="4.5" fill="#22C55E" className="animate-ping" opacity="0.75" />
            <circle cx="310" cy="10" r="4" fill="#15803D" stroke="#FFFFFF" strokeWidth="2" />
          </svg>
        </div>

        {/* Weeks Label */}
        <div className="flex justify-between text-[10px] font-medium text-slate-400 mt-2 px-1">
          <span>W1</span>
          <span>W2</span>
          <span>W3</span>
          <span>W4</span>
          <span>W5</span>
          <span>W6</span>
          <span>W7</span>
          <span className="font-bold text-emerald-700">W8</span>
        </div>
      </div>

      {/* Risk Distribution Card */}
      <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-100 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-900">Risk distribution</h3>
          <span className="text-[11px] font-semibold text-slate-500">48 cases</span>
        </div>

        {/* 4 Segment Horizontal Bar */}
        <div className="flex items-center gap-1.5 h-3.5 mb-3">
          <div className="h-full rounded-full bg-red-500" style={{ width: '12.5%' }} title="Critical: 6" />
          <div className="h-full rounded-full bg-orange-500" style={{ width: '29.1%' }} title="High: 14" />
          <div className="h-full rounded-full bg-amber-400" style={{ width: '37.5%' }} title="Medium: 18" />
          <div className="h-full rounded-full bg-emerald-500" style={{ width: '20.8%' }} title="Low: 10" />
        </div>

        {/* Dot Legend */}
        <div className="flex items-center justify-between text-[11px] text-slate-600 font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            <span>Critical 6</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            <span>High 14</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>Medium 18</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Low 10</span>
          </div>
        </div>
      </div>

      {/* Priority Cases List */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-sm font-bold text-slate-900">Priority cases</h3>
          <button className="text-xs font-semibold text-emerald-700 hover:underline">
            See all
          </button>
        </div>

        <div className="space-y-2.5">
          {MOCK_PRIORITY_CASES.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setSelectedCase(item);
                setShowReviewModal(true);
              }}
              className="rounded-3xl bg-white p-4 shadow-sm border border-slate-100 flex items-center justify-between hover:border-emerald-200 transition-all cursor-pointer active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 font-bold text-xs flex items-center justify-center border border-emerald-100">
                  {item.id.replace('#USR-', '')}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 leading-tight">
                    {item.id}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Last check-in {item.lastCheckin}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                      {item.category}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                        item.risk === 'Critical'
                          ? 'bg-red-50 text-red-600'
                          : item.risk === 'High'
                          ? 'bg-orange-50 text-orange-600'
                          : 'bg-amber-50 text-amber-600'
                      }`}
                    >
                      <span className="w-1 h-1 rounded-full bg-current"></span>
                      {item.risk}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center justify-end gap-1 text-sm font-heading font-bold text-slate-900">
                  <span>{item.score}</span>
                  <span className={item.risk === 'Critical' ? 'text-red-500' : 'text-slate-700'}>
                    ▲
                  </span>
                </div>
                <div className="flex items-center justify-end gap-1 text-[11px] text-red-500 font-medium mt-1">
                  <Clock className="w-3 h-3" />
                  <span>{item.sla}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===================== WHY? EXPLAINABILITY MODAL ===================== */}
      {showWhyModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl animate-slideUp">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <Info className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Why did risk increase?</h3>
                  <p className="text-[11px] text-slate-500">Case #USR-7844 · Asha</p>
                </div>
              </div>
              <button
                onClick={() => setShowWhyModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 mb-6">
              {[
                { factor: 'Increased fear indicators in voice check-in', delta: '+18', color: 'bg-red-500' },
                { factor: 'Missed two consecutive check-in slots', delta: '+14', color: 'bg-orange-500' },
                { factor: 'New safety concern reported near residence', delta: '+11', color: 'bg-amber-500' },
                { factor: 'Upcoming court trial hearing scheduled', delta: '+09', color: 'bg-blue-500' },
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2 h-2 rounded-full ${item.color}`}></span>
                    <span className="text-xs font-medium text-slate-800">{item.factor}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-900 font-heading bg-white px-2 py-0.5 rounded-lg border border-slate-200">
                    {item.delta}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setShowWhyModal(false);
                setShowReviewModal(true);
              }}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm transition-all flex items-center justify-center"
            >
              Proceed to review & assign support
            </button>
          </div>
        </div>
      )}

      {/* ===================== HUMAN REVIEW MODAL ===================== */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl animate-slideUp">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                  Human Review Required
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">Review Case #{selectedCase.id}</h3>
              </div>
              <button
                onClick={() => setShowReviewModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Recommended action: <strong className="text-slate-900">Same-day Priority Counselling Call (4–6 pm)</strong> + Legal-aid team protection update.
            </p>

            <div className="space-y-2 mb-6">
              <label className="flex items-center gap-2.5 p-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs font-semibold text-emerald-900">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                <span>Call victim Asha between 4–6 pm</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-2xl bg-blue-50/60 border border-blue-200 text-xs font-semibold text-blue-900">
                <Check className="w-4 h-4 text-blue-600 stroke-[3]" />
                <span>Notify District Legal Services Authority (DLSA)</span>
              </label>
            </div>

            {interventionApproved ? (
              <div className="py-3 px-4 rounded-xl bg-emerald-600 text-white font-semibold text-xs flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Intervention Approved & Scheduled</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50"
                >
                  Modify / Postpone
                </button>
                <button
                  onClick={handleApproveSupport}
                  className="py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm flex items-center justify-center"
                >
                  Approve Support
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
