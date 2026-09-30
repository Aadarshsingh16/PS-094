import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  X, 
  Moon, 
  Shield, 
  Smile, 
  AlertTriangle, 
  Heart, 
  Activity, 
  Zap, 
  MessageCircle, 
  Check, 
  Mic, 
  LayoutGrid, 
  MessageSquare, 
  Send 
} from 'lucide-react';
import { MOCK_QUESTIONS, CheckinQuestion } from '../data/mockData';

interface CheckinFlowScreenProps {
  initialMode?: 'tap' | 'voice' | 'chat';
  onBack: () => void;
  onQuickExit: () => void;
  onComplete: () => void;
}

export const CheckinFlowScreen: React.FC<CheckinFlowScreenProps> = ({
  initialMode = 'tap',
  onBack,
  onQuickExit,
  onComplete,
}) => {
  const [mode, setMode] = useState<'tap' | 'voice' | 'chat'>(initialMode);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(2); // Start at Q3 (Sleep) to match Figma exactly
  const [selectedOption, setSelectedOption] = useState<string>('Not very well');
  
  // Voice Recording state
  const [isRecording, setIsRecording] = useState(true);
  const [seconds, setSeconds] = useState(12);

  // Chat conversation state
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string; time?: string }>>([
    { sender: 'bot', text: 'Hi Asha. I am here with you. Is it okay if we do a short check-in?' },
    { sender: 'user', text: 'Yes, okay.' },
    { sender: 'bot', text: 'Question 3 of 8 — How well did you sleep last night?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const currentQ: CheckinQuestion = MOCK_QUESTIONS[currentQuestionIndex] || MOCK_QUESTIONS[2];

  useEffect(() => {
    let interval: any;
    if (mode === 'voice' && isRecording) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [mode, isRecording]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < MOCK_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(MOCK_QUESTIONS[currentQuestionIndex + 1].options[1]);
    } else {
      onComplete();
    }
  };

  const handleSendChat = (textToSend?: string) => {
    const text = textToSend || chatInput;
    if (!text.trim()) return;

    const newMsgs = [...chatMessages, { sender: 'user' as const, text }];
    setChatMessages(newMsgs);
    setChatInput('');

    // Simulate smart compassionate bot response
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'Thank you for telling me. That sounds really hard. Would you like to talk to your counsellor about it?'
        }
      ]);
    }, 700);
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-full flex flex-col justify-between p-4 pb-6 bg-[#F8FAFC]">
      {/* Top Header */}
      <div>
        {/* Navigation & Quick Exit Bar */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {mode === 'chat' && (
            <div className="text-center">
              <div className="text-sm font-bold text-slate-900">Sahayak</div>
              <div className="flex items-center justify-center gap-1 text-[11px] text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Private chat · always here</span>
              </div>
            </div>
          )}

          <button
            onClick={onQuickExit}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 text-xs font-semibold transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            <span>Quick exit</span>
          </button>
        </div>

        {/* Progress Tracker (for Tap and Voice modes) */}
        {mode !== 'chat' && (
          <div className="mb-5">
            <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
              <span className="text-blue-600">Question {currentQuestionIndex + 1} of 8</span>
              <span className="text-slate-400 font-normal">
                {mode === 'voice' ? 'Speak in your own language' : currentQ.estimatedTime}
              </span>
            </div>
            <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / 8) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* ===================== MODE 1: TAP ===================== */}
        {mode === 'tap' && (
          <div className="animate-fadeIn">
            {/* Category Icon */}
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Moon className="w-5 h-5" />
            </div>

            <h2 className="text-2xl font-bold text-slate-900 tracking-tight leading-tight mb-2">
              {currentQ.title}
            </h2>

            <p className="text-xs text-slate-500 mb-6 font-normal leading-relaxed">
              {currentQ.subtitle}
            </p>

            {/* Options list */}
            <div className="space-y-2.5 mb-6">
              {currentQ.options.map((opt) => {
                const isSelected = selectedOption === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => setSelectedOption(opt)}
                    className={`w-full p-4 rounded-2xl text-left text-sm font-medium transition-all flex items-center justify-between border ${
                      isSelected
                        ? 'bg-white border-blue-600 shadow-sm text-slate-900 ring-1 ring-blue-600'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                          isSelected
                            ? 'border-blue-600 bg-blue-600'
                            : 'border-slate-300 bg-transparent'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <span>{opt}</span>
                    </div>

                    {isSelected && (
                      <Check className="w-5 h-5 text-blue-600 stroke-[2.5]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ===================== MODE 2: VOICE ===================== */}
        {mode === 'voice' && (
          <div className="animate-fadeIn">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight leading-tight mb-5">
              {currentQ.title}
            </h2>

            {/* Dark Navy Recording Container */}
            <div className="rounded-3xl bg-gradient-to-b from-[#0B1528] via-[#0F1E3D] to-[#152342] p-6 text-white text-center shadow-lg mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-orange-400 text-xs font-semibold mb-4">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping"></span>
                <span>Listening</span>
              </div>

              {/* Live Timer */}
              <div className="text-4xl font-heading font-bold tracking-tight mb-6">
                {formatTimer(seconds)}
              </div>

              {/* Animated Waveform Bars */}
              <div className="flex items-center justify-center gap-1.5 h-14 mb-8">
                {[
                  14, 22, 38, 44, 18, 12, 28, 36, 42, 50, 40, 48, 30, 16, 26, 38, 44, 20, 14, 28,
                  36, 42, 48, 32, 16, 22, 14,
                ].map((val, idx) => (
                  <div
                    key={idx}
                    style={{
                      height: isRecording ? `${val}px` : '8px',
                      animationDelay: `${idx * 40}ms`,
                    }}
                    className={`w-1.5 rounded-full transition-all duration-300 ${
                      isRecording ? 'bg-orange-500 wave-bar' : 'bg-orange-800'
                    }`}
                  />
                ))}
              </div>

              {/* Circular Big Mic Action Button */}
              <div className="relative flex justify-center mb-3">
                <button
                  onClick={() => setIsRecording(!isRecording)}
                  className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl transition-transform active:scale-95 ${
                    isRecording
                      ? 'bg-[#FB713B] shadow-orange-500/30 ring-8 ring-orange-500/20'
                      : 'bg-slate-700'
                  }`}
                >
                  <Mic className="w-8 h-8" />
                </button>
              </div>

              <p className="text-xs text-slate-300 font-medium">
                {isRecording ? 'Tap to stop when you are done' : 'Tap mic to resume'}
              </p>
            </div>

            {/* WHAT WE HEARD Card */}
            <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-100 mb-4">
              <div className="text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-1.5">
                WHAT WE HEARD
              </div>
              <p className="text-sm text-slate-800 font-medium italic leading-relaxed">
                “I slept only two hours. I kept waking up thinking about the hearing.”
              </p>
            </div>
          </div>
        )}

        {/* ===================== MODE 3: CHAT ===================== */}
        {mode === 'chat' && (
          <div className="animate-fadeIn pb-2">
            <div className="text-center text-[11px] text-slate-400 my-2">
              Today · 6:02 pm
            </div>

            <div className="space-y-3 mb-4">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none shadow-sm'
                        : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-none shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Answer Chips */}
            <div className="flex flex-wrap gap-2 mb-4">
              {['Very well', 'Fairly well', 'Not very well', 'Poorly'].map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleSendChat(chip)}
                  className="px-3.5 py-1.5 rounded-full bg-white border border-blue-500 text-blue-600 text-xs font-semibold hover:bg-blue-50 active:scale-95 transition-all shadow-sm"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Follow-up Action Buttons if bot suggested talking */}
            {chatMessages.length >= 4 && (
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => {
                    handleSendChat('Yes, please connect me.');
                    setTimeout(onComplete, 1000);
                  }}
                  className="px-4 py-2 rounded-full border border-blue-600 text-blue-600 text-xs font-bold hover:bg-blue-50"
                >
                  Yes, please
                </button>
                <button
                  onClick={() => handleSendChat('Not now, I will manage.')}
                  className="px-4 py-2 rounded-full border border-slate-300 text-slate-600 text-xs font-medium hover:bg-slate-50"
                >
                  Not now
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Switcher & Action CTA Bar */}
      <div>
        {/* Mode Switcher Pill */}
        <div className="flex items-center justify-between p-1 rounded-full bg-slate-200/70 mb-3 max-w-[340px] mx-auto">
          <button
            onClick={() => setMode('tap')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full text-xs font-medium transition-all ${
              mode === 'tap'
                ? 'bg-white text-slate-900 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Tap</span>
          </button>

          <button
            onClick={() => setMode('voice')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full text-xs font-medium transition-all ${
              mode === 'voice'
                ? 'bg-white text-slate-900 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Mic className="w-3.5 h-3.5 text-blue-600" />
            <span>Voice</span>
          </button>

          <button
            onClick={() => setMode('chat')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full text-xs font-medium transition-all ${
              mode === 'chat'
                ? 'bg-white text-slate-900 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
            <span>Chat</span>
          </button>
        </div>

        {/* Bottom Action Area based on Mode */}
        {mode === 'tap' && (
          <button
            onClick={handleNextQuestion}
            className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-semibold text-sm transition-all shadow-sm"
          >
            Continue
          </button>
        )}

        {mode === 'voice' && (
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                setSeconds(0);
                setIsRecording(true);
              }}
              className="py-3.5 rounded-xl bg-white border border-slate-200 text-slate-800 font-medium text-sm hover:bg-slate-50 transition-colors shadow-sm"
            >
              Re-record
            </button>
            <button
              onClick={handleNextQuestion}
              className="py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-semibold text-sm transition-all shadow-sm"
            >
              Send answer
            </button>
          </div>
        )}

        {mode === 'chat' && (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
              placeholder="Type your message..."
              className="flex-1 py-3 px-4 rounded-full bg-slate-100 border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              onClick={() => setMode('voice')}
              className="w-11 h-11 rounded-full bg-slate-100 border border-slate-200 text-blue-600 flex items-center justify-center hover:bg-slate-200 transition-colors"
            >
              <Mic className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleSendChat()}
              className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Send className="w-5 h-5 ml-0.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
