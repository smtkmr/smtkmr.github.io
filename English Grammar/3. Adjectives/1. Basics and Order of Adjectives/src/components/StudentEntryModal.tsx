import React, { useState, useEffect } from 'react';
import { formatTimeWithSeconds, formatPrepareIndexTime, getStandardDayName } from '../utils/storage';
import { Clock, ShieldAlert, Sparkles, UserCheck, Calendar, Database } from 'lucide-react';

interface StudentEntryModalProps {
  isOpen: boolean;
  onStartSession: (data: {
    name: string;
    day: string;
    entryTime: string;
    prepareIndexTime: string;
    prepareIndexTimestamp: number;
  }) => void;
  onOpenRecords: () => void;
  totalSavedRecords: number;
}

export const StudentEntryModal: React.FC<StudentEntryModalProps> = ({
  isOpen,
  onStartSession,
  onOpenRecords,
  totalSavedRecords,
}) => {
  const [name, setName] = useState('');
  const [day, setDay] = useState('');
  const [entryTime, setEntryTime] = useState('');
  const [prepareIndexTime, setPrepareIndexTime] = useState('');
  const [prepareIndexTimestamp, setPrepareIndexTimestamp] = useState<number>(Date.now());
  const [errorMsg, setErrorMsg] = useState('');

  // Auto-fill day and live clocks on mount
  useEffect(() => {
    if (isOpen) {
      const now = new Date();
      setDay(getStandardDayName(now));
      setEntryTime(formatTimeWithSeconds(now));
      setPrepareIndexTime(formatPrepareIndexTime(now));
      setPrepareIndexTimestamp(now.getTime());

      // Live ticking entry clock until user starts
      const timer = setInterval(() => {
        const liveNow = new Date();
        setEntryTime(formatTimeWithSeconds(liveNow));
        setPrepareIndexTime(formatPrepareIndexTime(liveNow));
        setPrepareIndexTimestamp(liveNow.getTime());
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!day.trim()) {
      setErrorMsg('Please enter the day.');
      return;
    }

    onStartSession({
      name: name.trim(),
      day: day.trim(),
      entryTime: entryTime || formatTimeWithSeconds(),
      prepareIndexTime: prepareIndexTime || formatPrepareIndexTime(),
      prepareIndexTimestamp: prepareIndexTimestamp || Date.now(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white border-3 border-emerald-500 rounded-2xl max-w-md w-full max-h-[90vh] flex flex-col shadow-2xl relative my-auto overflow-hidden animate-fadeIn">
        {/* Top ribbon banner */}
        <div className="h-2 bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-300"></div>

        {/* Scrollable body */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-3.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-lg font-black">
                ✦
              </span>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Student Entry &amp; Login
                </span>
                <h2 className="text-base sm:text-lg font-black text-slate-800 leading-tight">
                  Session Registration
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenRecords}
              className="flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg border border-teal-300 bg-teal-50 text-teal-800 hover:bg-teal-100 transition"
              title="View saved 50 records"
            >
              <Database className="w-3 h-3 text-teal-600" />
              <span>Records ({totalSavedRecords})</span>
            </button>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Enter your <strong>Name</strong>, <strong>Day</strong>, and <strong>Time</strong> to begin. Screen duration and first-attempt scores will be permanently logged.
          </p>

          {errorMsg && (
            <div className="p-2.5 bg-rose-50 border border-rose-300 rounded-lg text-rose-700 text-xs font-bold flex items-center gap-1.5 animate-shake">
              <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form id="entry-form" onSubmit={handleSubmit} className="space-y-3">
            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Student Full Name <span className="text-rose-500">*</span></span>
              </label>
              <input
                type="text"
                required
                autoFocus
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="e.g. Sumit Kumar / Amit Sharma"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 outline-none text-xs sm:text-sm font-semibold transition"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Day */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Day <span className="text-rose-500">*</span></span>
                </label>
                <input
                  type="text"
                  required
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  placeholder="e.g. Saturday (17/10/2026)"
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 focus:border-emerald-500 outline-none text-xs font-semibold bg-slate-50"
                />
              </div>

              {/* Entry Time */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Entry Time</span>
                </label>
                <input
                  type="text"
                  value={entryTime}
                  onChange={(e) => setEntryTime(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 focus:border-emerald-500 outline-none text-xs font-mono font-bold text-emerald-800 bg-emerald-50/60"
                />
              </div>
            </div>

            {/* Prepare Index Time */}
            <div className="p-2.5 bg-amber-50/90 border border-amber-300 rounded-xl flex items-start gap-2">
              <span className="p-1.5 rounded-lg bg-amber-200 text-amber-800 flex-shrink-0 mt-0.5">
                <Sparkles className="w-3.5 h-3.5" />
              </span>
              <div className="text-xs">
                <span className="font-bold text-amber-900 block text-[11px]">
                  Prepare Index Time (Recorded):
                </span>
                <span className="font-mono font-bold text-amber-950 text-xs block">
                  {prepareIndexTime}
                </span>
              </div>
            </div>

            {/* Proctoring notice */}
            <div className="p-2.5 bg-rose-50 border border-rose-300 rounded-xl flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <div className="text-[11px] text-rose-800 leading-snug">
                <strong>Screen Switch Restriction:</strong> Switching tabs or windows will <strong>immediately close and lock</strong> the session.
              </div>
            </div>
          </form>
        </div>

        {/* Small Compact Action Buttons */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex gap-2 justify-end">
          <button
            type="button"
            onClick={onOpenRecords}
            className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
          >
            Records
          </button>
          <button
            type="submit"
            form="entry-form"
            className="bg-emerald-600 hover:bg-emerald-700 active:translate-y-0.5 text-white font-bold py-1.5 px-4 rounded-lg shadow-xs transition text-xs cursor-pointer flex items-center gap-1.5"
          >
            <span>Start Session →</span>
          </button>
        </div>
      </div>
    </div>
  );
};
