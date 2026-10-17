import React from 'react';
import { SessionRecord } from '../types';
import { AlertOctagon, CheckCircle2, XCircle, Clock, Calendar, User, Database, RefreshCw, Download } from 'lucide-react';

interface ScreenSwitchTerminatedModalProps {
  isOpen: boolean;
  record: SessionRecord | null;
  onOpenRecords: () => void;
  onRestartNewSession: () => void;
}

export const ScreenSwitchTerminatedModal: React.FC<ScreenSwitchTerminatedModalProps> = ({
  isOpen,
  record,
  onOpenRecords,
  onRestartNewSession,
}) => {
  if (!isOpen || !record) return null;

  const downloadReport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(record, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `session_report_${record.name.replace(/\s+/g, '_')}_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/85 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white border-3 border-rose-500 rounded-2xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl relative my-auto overflow-hidden animate-fadeIn">
        {/* Warning strip */}
        <div className="h-2 bg-gradient-to-r from-rose-600 via-amber-500 to-rose-600"></div>

        {/* Scrollable content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3.5 flex-1">
          {/* Header */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-100 border border-rose-300 flex items-center justify-center text-rose-600 flex-shrink-0">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                Screen Switch Detected
              </span>
              <h2 className="text-base sm:text-lg font-black text-rose-950 leading-tight">
                Session Closed &amp; Terminated
              </h2>
            </div>
          </div>

          <div className="bg-rose-50 border border-rose-200 rounded-xl p-2.5 text-xs text-rose-900 leading-relaxed">
            <strong>Trigger:</strong> You switched windows, tabs, or left the screen. The session has been automatically closed. All your stats have been saved to the permanent 50 records.
          </div>

          {/* Compact Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            {/* Student */}
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="text-slate-500 font-bold flex items-center gap-1 text-[11px] mb-0.5">
                <User className="w-3 h-3 text-slate-400" />
                <span>Student</span>
              </div>
              <div className="font-extrabold text-slate-800 text-xs truncate" title={record.name}>
                {record.name}
              </div>
            </div>

            {/* Day */}
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="text-slate-500 font-bold flex items-center gap-1 text-[11px] mb-0.5">
                <Calendar className="w-3 h-3 text-slate-400" />
                <span>Day</span>
              </div>
              <div className="font-extrabold text-slate-800 text-xs truncate">
                {record.day}
              </div>
            </div>

            {/* Screen Time */}
            <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg col-span-2 sm:col-span-1">
              <div className="text-amber-700 font-bold flex items-center gap-1 text-[11px] mb-0.5">
                <Clock className="w-3 h-3 text-amber-500" />
                <span>Screen Time</span>
              </div>
              <div className="font-black text-amber-900 text-xs sm:text-sm">
                {record.screenTimeFormatted}
              </div>
            </div>

            {/* 1st Attempt Correct */}
            <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg">
              <div className="text-emerald-700 font-bold flex items-center gap-1 text-[11px] mb-0.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                <span>1st Attempt Correct</span>
              </div>
              <div className="font-black text-emerald-700 text-sm sm:text-base">
                {record.firstAttemptCorrect}
              </div>
            </div>

            {/* 1st Attempt Wrong */}
            <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg">
              <div className="text-rose-700 font-bold flex items-center gap-1 text-[11px] mb-0.5">
                <XCircle className="w-3 h-3 text-rose-500" />
                <span>1st Attempt Wrong</span>
              </div>
              <div className="font-black text-rose-700 text-sm sm:text-base">
                {record.firstAttemptWrong}
              </div>
            </div>

            {/* Accuracy */}
            <div className="p-2.5 bg-teal-50 border border-teal-200 rounded-lg">
              <div className="text-teal-700 font-bold text-[11px] mb-0.5">
                <span>🎯 Accuracy</span>
              </div>
              <div className="font-black text-teal-800 text-sm sm:text-base">
                {record.firstAttemptTotal > 0 ? `${record.accuracy}%` : '0%'}
              </div>
            </div>
          </div>

          {/* Timestamps */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 space-y-1 text-[11px] text-slate-600 font-mono">
            <div className="flex justify-between items-center flex-wrap">
              <span className="text-slate-500">Prepare Index Time:</span>
              <span className="font-bold text-slate-800">{record.prepareIndexTime}</span>
            </div>
            <div className="flex justify-between items-center flex-wrap">
              <span className="text-slate-500">Entry Time:</span>
              <span className="font-bold text-slate-800">{record.entryTime}</span>
            </div>
            <div className="flex justify-between items-center flex-wrap">
              <span className="text-slate-500">Exit Time:</span>
              <span className="font-bold text-rose-700">{record.exitTime || 'Switched'}</span>
            </div>
          </div>

          {/* Save Confirmation */}
          <div className="flex items-center gap-1.5 p-2 bg-emerald-50 border border-emerald-300 rounded-lg text-emerald-800 text-[11px] font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span>Saved permanently to the 50 persistent records log.</span>
          </div>
        </div>

        {/* Small Compact Action Buttons */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex flex-wrap gap-2 justify-end">
          <button
            type="button"
            onClick={onOpenRecords}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1 bg-teal-600 hover:bg-teal-700 active:translate-y-0.5 text-white font-bold py-1.5 px-3 rounded-lg text-xs shadow-xs transition cursor-pointer"
          >
            <Database className="w-3.5 h-3.5" />
            <span>View 50 Records</span>
          </button>

          <button
            type="button"
            onClick={onRestartNewSession}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1 bg-emerald-600 hover:bg-emerald-700 active:translate-y-0.5 text-white font-bold py-1.5 px-3 rounded-lg text-xs shadow-xs transition cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>New Session</span>
          </button>

          <button
            type="button"
            onClick={downloadReport}
            className="inline-flex items-center justify-center gap-1 border border-slate-300 hover:bg-slate-200 text-slate-700 font-bold py-1.5 px-2.5 rounded-lg text-xs transition cursor-pointer"
            title="Download JSON report"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>JSON</span>
          </button>
        </div>
      </div>
    </div>
  );
};
