import React from 'react';
import { Clock, CheckCircle2, XCircle, Database, User, LogOut } from 'lucide-react';

interface ProctoringStatusBarProps {
  studentName: string;
  day: string;
  screenTimeSeconds: number;
  firstAttemptCorrect: number;
  firstAttemptWrong: number;
  onOpenRecords: () => void;
  onManualEndSession: () => void;
  recordsCount: number;
}

export const ProctoringStatusBar: React.FC<ProctoringStatusBarProps> = ({
  studentName,
  day,
  screenTimeSeconds,
  firstAttemptCorrect,
  firstAttemptWrong,
  onOpenRecords,
  onManualEndSession,
  recordsCount,
}) => {
  const m = Math.floor(screenTimeSeconds / 60);
  const s = screenTimeSeconds % 60;
  const timeFormatted = `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;

  const totalAttempted = firstAttemptCorrect + firstAttemptWrong;
  const accuracy = totalAttempted > 0 ? Math.round((firstAttemptCorrect / totalAttempted) * 100) : 0;

  return (
    <div className="sticky top-[66px] z-30 bg-white/95 backdrop-blur-md border-b-2 border-emerald-300 shadow-xs transition">
      <div className="max-w-[1180px] mx-auto px-4 py-2 flex items-center justify-between gap-2.5 flex-wrap">
        {/* Left: Active student & day */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
            <User className="w-4 h-4" />
          </div>
          <div className="text-xs leading-tight">
            <div className="font-extrabold text-slate-800 flex items-center gap-1.5">
              <span>{studentName}</span>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                {day}
              </span>
            </div>
            <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Proctoring Active · Screen Switch Monitored
            </div>
          </div>
        </div>

        {/* Center: Live Screen Time ticker & First-Attempt Score */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
          {/* Live screen timer */}
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-50 border border-amber-300 text-amber-900 text-xs font-mono font-bold" title="Total active time on this screen">
            <Clock className="w-3 h-3 text-amber-600 animate-spin" style={{ animationDuration: '4s' }} />
            <span>Screen: {timeFormatted}</span>
          </div>

          {/* First attempt counters */}
          <div className="flex items-center gap-1.5 text-xs font-bold">
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-300 text-emerald-800" title="First-attempt correct answers">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>1st Correct: {firstAttemptCorrect}</span>
            </span>

            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-rose-50 border border-rose-300 text-rose-800" title="First-attempt wrong answers">
              <XCircle className="w-3 h-3 text-rose-600" />
              <span>1st Wrong: {firstAttemptWrong}</span>
            </span>

            {totalAttempted > 0 && (
              <span className="hidden sm:inline-flex text-[11px] font-bold text-teal-800 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
                Acc: {accuracy}%
              </span>
            )}
          </div>
        </div>

        {/* Right: Small compact Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onOpenRecords}
            className="flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg border border-teal-400 bg-teal-50 hover:bg-teal-100 text-teal-900 transition shadow-2xs cursor-pointer"
            title="View 50 saved records"
          >
            <Database className="w-3 h-3 text-teal-600" />
            <span>50 Records ({recordsCount})</span>
          </button>

          <button
            type="button"
            onClick={onManualEndSession}
            className="flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg border border-slate-300 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300 text-slate-600 transition cursor-pointer"
            title="End session safely"
          >
            <LogOut className="w-3 h-3" />
            <span className="hidden sm:inline">End Session</span>
          </button>
        </div>
      </div>
    </div>
  );
};
