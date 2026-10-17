import React, { useState } from 'react';
import { SessionRecord } from '../types';
import { 
  Database, X, Search, Download, ShieldCheck, CheckCircle2, 
  XCircle, Clock, AlertTriangle, RefreshCw 
} from 'lucide-react';

interface SavedRecordsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  records: SessionRecord[];
  onRefresh: () => void;
  isLoading?: boolean;
}

export const SavedRecordsDrawer: React.FC<SavedRecordsDrawerProps> = ({
  isOpen,
  onClose,
  records,
  onRefresh,
  isLoading = false,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'screen_switched' | 'completed'>('all');

  if (!isOpen) return null;

  // Filter records
  const filteredRecords = records.filter((rec) => {
    const matchesSearch = 
      rec.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.day.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (rec.prepareIndexTime && rec.prepareIndexTime.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (!matchesSearch) return false;

    if (filterStatus === 'screen_switched') {
      return rec.sessionStatus === 'screen_switched_closed' || rec.exitTrigger === 'screen_switch';
    }
    if (filterStatus === 'completed') {
      return rec.sessionStatus === 'completed';
    }
    return true;
  });

  // Calculate summary stats
  const totalRecords = records.length;
  const totalCorrect = records.reduce((acc, r) => acc + (r.firstAttemptCorrect || 0), 0);
  const totalWrong = records.reduce((acc, r) => acc + (r.firstAttemptWrong || 0), 0);
  const totalScreenSecs = records.reduce((acc, r) => acc + (r.screenTimeSeconds || 0), 0);
  const avgScreenTime = totalRecords > 0 ? Math.round(totalScreenSecs / totalRecords) : 0;
  const switchedCount = records.filter(r => r.sessionStatus === 'screen_switched_closed').length;

  const exportCSV = () => {
    if (records.length === 0) return;
    const headers = [
      "Index No",
      "Student Name",
      "Day",
      "Prepare Index Time",
      "Entry Time",
      "Exit Time",
      "Screen Time Seconds",
      "Screen Time Formatted",
      "First Attempt Correct",
      "First Attempt Wrong",
      "Total Attempted",
      "Accuracy %",
      "Session Status",
      "Saved At"
    ];

    const rows = records.map((r, i) => [
      i + 1,
      `"${r.name.replace(/"/g, '""')}"`,
      `"${r.day.replace(/"/g, '""')}"`,
      `"${(r.prepareIndexTime || '').replace(/"/g, '""')}"`,
      `"${r.entryTime || ''}"`,
      `"${r.exitTime || ''}"`,
      r.screenTimeSeconds || 0,
      `"${r.screenTimeFormatted || ''}"`,
      r.firstAttemptCorrect || 0,
      r.firstAttemptWrong || 0,
      r.firstAttemptTotal || 0,
      `${r.accuracy || 0}%`,
      r.sessionStatus || 'completed',
      `"${r.createdAt || ''}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `econova_adjectives_50_records_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const exportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(records, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `econova_adjectives_50_records_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white border-3 border-teal-500 rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl my-auto overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="p-3 sm:p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between gap-2.5 flex-wrap">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-teal-100 border border-teal-300 text-teal-700 flex items-center justify-center">
              <Database className="w-4 h-4" />
            </span>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-base sm:text-lg font-black text-slate-800">
                  Saved Session Records (50 Real-Time Log)
                </h2>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  Live Sync
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Permanent records (Read-Only &amp; Non-Deletable) · Latest 50 fresh entries available.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onRefresh}
              className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 transition cursor-pointer"
              title="Refresh records"
            >
              <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin text-teal-600' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              type="button"
              onClick={exportCSV}
              disabled={records.length === 0}
              className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition disabled:opacity-50 cursor-pointer"
              title="Download CSV"
            >
              <Download className="w-3 h-3 text-emerald-600" />
              <span>CSV</span>
            </button>

            <button
              type="button"
              onClick={exportJSON}
              disabled={records.length === 0}
              className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 transition disabled:opacity-50 cursor-pointer"
              title="Download JSON"
            >
              <span>JSON</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-7 h-7 rounded-lg bg-slate-200 hover:bg-rose-100 hover:text-rose-600 flex items-center justify-center text-slate-600 transition cursor-pointer"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-2.5 sm:p-3 bg-teal-50/50 border-b border-teal-100 text-xs">
          <div className="p-2 bg-white border border-teal-200 rounded-lg">
            <span className="text-slate-500 font-bold block text-[11px]">Total Saved</span>
            <span className="text-sm sm:text-base font-black text-teal-800">
              {totalRecords} <span className="text-[10px] font-normal text-slate-500">/ 50 Fresh</span>
            </span>
          </div>

          <div className="p-2 bg-white border border-emerald-200 rounded-lg">
            <span className="text-slate-500 font-bold block text-[11px]">1st Correct</span>
            <span className="text-sm sm:text-base font-black text-emerald-700">
              {totalCorrect}
            </span>
          </div>

          <div className="p-2 bg-white border border-rose-200 rounded-lg">
            <span className="text-slate-500 font-bold block text-[11px]">1st Wrong</span>
            <span className="text-sm sm:text-base font-black text-rose-700">
              {totalWrong}
            </span>
          </div>

          <div className="p-2 bg-white border border-amber-200 rounded-lg">
            <span className="text-slate-500 font-bold block text-[11px]">Avg Screen Time</span>
            <span className="text-sm sm:text-base font-black text-amber-800">
              {Math.floor(avgScreenTime / 60)}m {avgScreenTime % 60}s
            </span>
          </div>

          <div className="p-2 bg-white border border-purple-200 rounded-lg col-span-2 sm:col-span-1">
            <span className="text-slate-500 font-bold block text-[11px]">Screen Switches</span>
            <span className="text-sm sm:text-base font-black text-purple-700">
              {switchedCount} <span className="text-[10px] font-normal text-slate-500">sessions</span>
            </span>
          </div>
        </div>

        {/* Filters and search */}
        <div className="p-2.5 sm:p-3 bg-white border-b border-slate-200 flex flex-col sm:flex-row gap-2 justify-between items-center">
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search student or day..."
              className="w-full pl-8 pr-2.5 py-1 text-xs rounded-lg border border-slate-300 focus:border-teal-500 outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setFilterStatus('all')}
              className={`px-2.5 py-1 text-xs rounded-md font-bold transition cursor-pointer ${
                filterStatus === 'all'
                  ? 'bg-teal-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All ({records.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus('screen_switched')}
              className={`px-2.5 py-1 text-xs rounded-md font-bold transition cursor-pointer ${
                filterStatus === 'screen_switched'
                  ? 'bg-rose-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Switched Closed ({switchedCount})
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus('completed')}
              className={`px-2.5 py-1 text-xs rounded-md font-bold transition cursor-pointer ${
                filterStatus === 'completed'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Completed ({records.length - switchedCount})
            </button>
          </div>
        </div>

        {/* Records Table */}
        <div className="flex-1 overflow-auto p-2.5 sm:p-3">
          {filteredRecords.length === 0 ? (
            <div className="text-center py-10 text-slate-400">
              <Database className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="text-xs sm:text-sm font-bold text-slate-600">No records found</p>
              <p className="text-xs text-slate-400">
                As students start sessions and switch screens or complete exams, 50 fresh records will be automatically logged here.
              </p>
            </div>
          ) : (
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100 text-slate-700 font-heading font-bold text-[10.5px] uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="p-2 text-center w-8">#</th>
                    <th className="p-2">Student Name</th>
                    <th className="p-2">Day</th>
                    <th className="p-2">Prepare Index Time</th>
                    <th className="p-2">Entry Time</th>
                    <th className="p-2">Screen Time</th>
                    <th className="p-2 text-center">1st Correct</th>
                    <th className="p-2 text-center">1st Wrong</th>
                    <th className="p-2 text-center">Accuracy</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRecords.map((r, index) => {
                    const isSwitched = r.sessionStatus === 'screen_switched_closed' || r.exitTrigger === 'screen_switch';
                    return (
                      <tr key={r.id || index} className="hover:bg-teal-50/40 transition">
                        <td className="p-2 text-center font-mono font-bold text-slate-400">
                          {index + 1}
                        </td>
                        <td className="p-2">
                          <span className="font-bold text-slate-900 block">{r.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">ID: {r.id.slice(0, 12)}...</span>
                        </td>
                        <td className="p-2 text-slate-700 font-medium">
                          {r.day}
                        </td>
                        <td className="p-2 font-mono text-[10.5px] text-amber-900 font-medium">
                          {r.prepareIndexTime || '-'}
                        </td>
                        <td className="p-2 font-mono text-[10.5px] text-slate-600">
                          {r.entryTime || '-'}
                        </td>
                        <td className="p-2">
                          <span className="inline-flex items-center gap-1 font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 text-[11px]">
                            <Clock className="w-3 h-3 text-amber-600" />
                            {r.screenTimeFormatted || `${r.screenTimeSeconds}s`}
                          </span>
                        </td>
                        <td className="p-2 text-center">
                          <span className="inline-flex items-center gap-0.5 font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 text-[11px]">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            {r.firstAttemptCorrect}
                          </span>
                        </td>
                        <td className="p-2 text-center">
                          <span className="inline-flex items-center gap-0.5 font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200 text-[11px]">
                            <XCircle className="w-3 h-3 text-rose-600" />
                            {r.firstAttemptWrong}
                          </span>
                        </td>
                        <td className="p-2 text-center font-bold">
                          {r.firstAttemptTotal > 0 ? (
                            <span className={r.accuracy >= 70 ? 'text-emerald-700' : 'text-amber-700'}>
                              {r.accuracy}%
                            </span>
                          ) : (
                            <span className="text-slate-400">0%</span>
                          )}
                        </td>
                        <td className="p-2">
                          {isSwitched ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                              <AlertTriangle className="w-3 h-3 text-rose-600 flex-shrink-0" />
                              Switched (Closed)
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                              Completed
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer Guarantee */}
        <div className="p-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 flex-wrap gap-2">
          <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Guaranteed: These 50 records are permanently saved and will never disappear on reload.</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
