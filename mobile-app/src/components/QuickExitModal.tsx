import React, { useState } from 'react';
import { CloudSun, RefreshCw } from 'lucide-react';

interface QuickExitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickExitModal: React.FC<QuickExitModalProps> = ({ isOpen, onClose }) => {
  const [tapCount, setTapCount] = useState(0);

  if (!isOpen) return null;

  const handleDecoyTap = () => {
    const next = tapCount + 1;
    if (next >= 3) {
      setTapCount(0);
      onClose();
    } else {
      setTapCount(next);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 text-white flex flex-col justify-between p-6 select-none animate-fadeIn">
      {/* Decoy Weather Header */}
      <div>
        <div className="flex justify-between items-center text-slate-400 text-xs tracking-wider uppercase mb-8">
          <span>Weather Today</span>
          <span>Updated just now</span>
        </div>

        <div className="text-center py-10" onClick={handleDecoyTap}>
          <div className="flex justify-center mb-4">
            <CloudSun className="w-24 h-24 text-amber-400 animate-pulse" />
          </div>
          <h1 className="text-6xl font-light font-heading tracking-tighter mb-1">28°C</h1>
          <p className="text-lg text-slate-300 font-medium">Partly Cloudy</p>
          <p className="text-xs text-slate-400 mt-2">New Delhi, India</p>
          <p className="text-xs text-slate-500 mt-8 italic">
            (Discreet exit active · Tap weather 3 times to resume)
          </p>
        </div>

        {/* 5 Day Forecast Grid */}
        <div className="grid grid-cols-5 gap-2 mt-8">
          {['Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
            <div key={day} className="bg-slate-800/80 rounded-xl p-3 text-center border border-slate-700/50">
              <span className="text-xs text-slate-400">{day}</span>
              <div className="my-2 flex justify-center">
                <CloudSun className="w-5 h-5 text-amber-300" />
              </div>
              <span className="text-sm font-semibold">{27 + idx}°</span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center pb-4">
        <button
          onClick={onClose}
          className="text-xs text-slate-500 hover:text-slate-300 transition-colors flex items-center justify-center gap-1.5 mx-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Exit discreet mode</span>
        </button>
      </div>
    </div>
  );
};
