import React, { useState, useEffect, useRef } from 'react';
import { SessionRecord } from './types';
import { 
  fetchAllRecords, persistSessionRecord, formatTimeWithSeconds, 
  formatDuration, formatPrepareIndexTime 
} from './utils/storage';
import { StudentEntryModal } from './components/StudentEntryModal';
import { ScreenSwitchTerminatedModal } from './components/ScreenSwitchTerminatedModal';
import { SavedRecordsDrawer } from './components/SavedRecordsDrawer';
import { ProctoringStatusBar } from './components/ProctoringStatusBar';
import { AdjectivesLesson } from './components/AdjectivesLesson';
import { Database, ShieldAlert, Award } from 'lucide-react';

export default function App() {
  const [activeSession, setActiveSession] = useState<SessionRecord | null>(null);
  const [showEntryModal, setShowEntryModal] = useState(true);
  const [isTerminated, setIsTerminated] = useState(false);
  const [terminatedRecord, setTerminatedRecord] = useState<SessionRecord | null>(null);

  // Proctoring metrics
  const [screenTimeSeconds, setScreenTimeSeconds] = useState(0);
  const [firstAttemptCorrect, setFirstAttemptCorrect] = useState(0);
  const [firstAttemptWrong, setFirstAttemptWrong] = useState(0);

  // Persistent 50 records
  const [records, setRecords] = useState<SessionRecord[]>([]);
  const [showRecordsDrawer, setShowRecordsDrawer] = useState(false);
  const [isLoadingRecords, setIsLoadingRecords] = useState(false);

  // References for live closures inside event listeners
  const activeSessionRef = useRef<SessionRecord | null>(null);
  activeSessionRef.current = activeSession;

  const screenTimeRef = useRef(0);
  screenTimeRef.current = screenTimeSeconds;

  const correctRef = useRef(0);
  correctRef.current = firstAttemptCorrect;

  const wrongRef = useRef(0);
  wrongRef.current = firstAttemptWrong;

  const isTerminatedRef = useRef(false);
  isTerminatedRef.current = isTerminated;

  // Load records initially
  const loadRecords = async () => {
    setIsLoadingRecords(true);
    try {
      const data = await fetchAllRecords();
      setRecords(data);
    } catch (err) {
      console.error('Error loading records:', err);
    } finally {
      setIsLoadingRecords(false);
    }
  };

  useEffect(() => {
    loadRecords();
  }, []);

  // Screen time interval tracker
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (activeSession && !isTerminated) {
      interval = setInterval(() => {
        setScreenTimeSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeSession, isTerminated]);

  // Window / Screen Switch Termination Listener
  useEffect(() => {
    const handleScreenSwitch = async (eventReason: string) => {
      // Only terminate if there is an active session and not already terminated
      if (!activeSessionRef.current || isTerminatedRef.current) return;

      console.warn(`[Proctoring Alert] Screen/Window switched: ${eventReason}. Closing session.`);

      const elapsed = screenTimeRef.current;
      const correct = correctRef.current;
      const wrong = wrongRef.current;
      const total = correct + wrong;
      const acc = total > 0 ? Math.round((correct / total) * 100) : 0;
      const exitTime = formatTimeWithSeconds();

      const finalRecord: SessionRecord = {
        ...activeSessionRef.current,
        exitTime: exitTime,
        exitTrigger: 'screen_switch',
        exitTriggerReason: `Screen or window switched (${eventReason})`,
        screenTimeSeconds: elapsed,
        screenTimeFormatted: formatDuration(elapsed),
        firstAttemptTotal: total,
        firstAttemptCorrect: correct,
        firstAttemptWrong: wrong,
        accuracy: acc,
        sessionStatus: 'screen_switched_closed',
        updatedAt: new Date().toISOString(),
      };

      // Set terminated state immediately
      setIsTerminated(true);
      setTerminatedRecord(finalRecord);
      setActiveSession(null);

      // Attempt window.close()
      try {
        window.close();
      } catch (e) {
        console.log('window.close() restricted by browser policy');
      }

      // Persist permanently to Server & LocalStorage
      try {
        const updated = await persistSessionRecord(finalRecord);
        setRecords(updated);
      } catch (err) {
        console.error('Failed to persist switched record:', err);
      }
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        handleScreenSwitch('Tab / Window hidden');
      }
    };

    const onWindowBlur = () => {
      handleScreenSwitch('Window blur / switched out');
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('blur', onWindowBlur);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('blur', onWindowBlur);
    };
  }, []);

  // Handle student entry submit
  const handleStartSession = async (entry: {
    name: string;
    day: string;
    entryTime: string;
    prepareIndexTime: string;
    prepareIndexTimestamp: number;
  }) => {
    const newSession: SessionRecord = {
      id: `session_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      name: entry.name,
      day: entry.day,
      entryTime: entry.entryTime,
      prepareIndexTime: entry.prepareIndexTime,
      prepareIndexTimestamp: entry.prepareIndexTimestamp,
      screenTimeSeconds: 0,
      screenTimeFormatted: '0s',
      firstAttemptTotal: 0,
      firstAttemptCorrect: 0,
      firstAttemptWrong: 0,
      accuracy: 0,
      sessionStatus: 'active',
      createdAt: new Date().toISOString(),
    };

    setActiveSession(newSession);
    setShowEntryModal(false);
    setIsTerminated(false);
    setTerminatedRecord(null);
    setScreenTimeSeconds(0);
    setFirstAttemptCorrect(0);
    setFirstAttemptWrong(0);

    // Persist the new session start immediately
    const updated = await persistSessionRecord(newSession);
    setRecords(updated);
  };

  // Handle first attempt on any question
  const handleFirstAttempt = async ({ isCorrect }: { questionId: string; isCorrect: boolean }) => {
    let nextCorrect = firstAttemptCorrect;
    let nextWrong = firstAttemptWrong;

    if (isCorrect) {
      nextCorrect += 1;
      setFirstAttemptCorrect(nextCorrect);
    } else {
      nextWrong += 1;
      setFirstAttemptWrong(nextWrong);
    }

    const total = nextCorrect + nextWrong;
    const acc = total > 0 ? Math.round((nextCorrect / total) * 100) : 0;

    if (activeSession) {
      const updatedSession: SessionRecord = {
        ...activeSession,
        firstAttemptTotal: total,
        firstAttemptCorrect: nextCorrect,
        firstAttemptWrong: nextWrong,
        accuracy: acc,
        screenTimeSeconds: screenTimeSeconds,
        screenTimeFormatted: formatDuration(screenTimeSeconds),
        updatedAt: new Date().toISOString(),
      };
      setActiveSession(updatedSession);
      const updated = await persistSessionRecord(updatedSession);
      setRecords(updated);
    }
  };

  // Handle final exam submission
  const handleExamCompleted = async () => {
    if (activeSession) {
      const elapsed = screenTimeSeconds;
      const total = firstAttemptCorrect + firstAttemptWrong;
      const acc = total > 0 ? Math.round((firstAttemptCorrect / total) * 100) : 0;

      const completedSession: SessionRecord = {
        ...activeSession,
        exitTime: formatTimeWithSeconds(),
        exitTrigger: 'completed',
        exitTriggerReason: '30-Question Exam Completed',
        screenTimeSeconds: elapsed,
        screenTimeFormatted: formatDuration(elapsed),
        firstAttemptTotal: total,
        firstAttemptCorrect: firstAttemptCorrect,
        firstAttemptWrong: firstAttemptWrong,
        accuracy: acc,
        sessionStatus: 'completed',
        updatedAt: new Date().toISOString(),
      };

      setActiveSession(completedSession);
      const updated = await persistSessionRecord(completedSession);
      setRecords(updated);
    }
  };

  // Handle restart
  const handleRestartNewSession = () => {
    setIsTerminated(false);
    setTerminatedRecord(null);
    setShowEntryModal(true);
    setActiveSession(null);
    setScreenTimeSeconds(0);
    setFirstAttemptCorrect(0);
    setFirstAttemptWrong(0);
  };

  // Manual end session
  const handleManualEndSession = async () => {
    if (!activeSession) return;
    const confirmEnd = window.confirm('Are you sure you want to end this study session?');
    if (!confirmEnd) return;

    const elapsed = screenTimeSeconds;
    const total = firstAttemptCorrect + firstAttemptWrong;
    const acc = total > 0 ? Math.round((firstAttemptCorrect / total) * 100) : 0;

    const finalRecord: SessionRecord = {
      ...activeSession,
      exitTime: formatTimeWithSeconds(),
      exitTrigger: 'manual_exit',
      exitTriggerReason: 'Ended by student',
      screenTimeSeconds: elapsed,
      screenTimeFormatted: formatDuration(elapsed),
      firstAttemptTotal: total,
      firstAttemptCorrect: firstAttemptCorrect,
      firstAttemptWrong: firstAttemptWrong,
      accuracy: acc,
      sessionStatus: 'completed',
      updatedAt: new Date().toISOString(),
    };

    setActiveSession(null);
    setShowEntryModal(true);
    const updated = await persistSessionRecord(finalRecord);
    setRecords(updated);
  };

  const scrollToTest = () => {
    const el = document.getElementById('test-arena');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f0fdf4] text-slate-800">
      {/* Mobile Floating Quick Test Jump */}
      <button
        type="button"
        onClick={scrollToTest}
        className="fixed bottom-4 right-4 z-40 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-4 py-2.5 font-black text-xs shadow-lg border-2 border-white flex items-center gap-1.5 transition md:hidden cursor-pointer"
      >
        <span>⏱ 30-Q Test (15m)</span>
      </button>

      {/* Main App Header */}
      <header className="bg-teal-400 border-b-4 border-emerald-500 sticky top-0 z-40 shadow-xs">
        <div className="max-w-[1180px] mx-auto px-4 min-h-[66px] flex items-center justify-between gap-2">
          {/* Logo */}
          <a href="#main" className="text-xl sm:text-2xl font-black text-white flex items-center gap-2 flex-shrink-0">
            <span className="w-8 h-8 rounded-xl bg-amber-300 text-emerald-800 flex items-center justify-center text-lg -rotate-6 shadow-xs">
              ✦
            </span>
            <span>
              Econova<span className="text-amber-300">.vip</span>
            </span>
          </a>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-bold text-white">
            <a href="#topic-1" className="px-2.5 py-1.5 rounded-lg hover:bg-white/20 transition">1. Kinds &amp; Participles</a>
            <a href="#topic-2" className="px-2.5 py-1.5 rounded-lg hover:bg-white/20 transition">2. Agreement &amp; Preps</a>
            <a href="#topic-3" className="px-2.5 py-1.5 rounded-lg hover:bg-white/20 transition">3. Position &amp; Link Verbs</a>
            <a href="#topic-4" className="px-2.5 py-1.5 rounded-lg hover:bg-white/20 transition">4. Meaning Shifts &amp; Traps</a>
            <a href="#topic-5" className="px-2.5 py-1.5 rounded-lg hover:bg-white/20 transition">5. Order of Adjectives</a>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={() => setShowRecordsDrawer(true)}
              className="bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg px-2 sm:px-2.5 py-1 text-xs font-bold flex items-center gap-1 shadow-xs transition cursor-pointer"
              title="Open 50 Saved Records Log"
            >
              <Database className="w-3.5 h-3.5 text-amber-300" />
              <span>50 Records ({records.length})</span>
            </button>

            <a
              href="https://youtu.be/A4ht2cEjwIY"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-2 sm:px-2.5 py-1 text-xs font-bold flex items-center gap-1 shadow-xs transition"
              title="YouTube Video Lesson"
            >
              <svg className="w-3.5 h-3 fill-current" viewBox="0 0 20 14">
                <path d="M19.56 2.18a2.5 2.5 0 0 0-1.76-1.77C16.24 0 10 0 10 0S3.76 0 2.2.41A2.5 2.5 0 0 0 .44 2.18C0 3.74 0 7 0 7s0 3.26.44 4.82a2.5 2.5 0 0 0 1.76 1.77C3.76 14 10 14 10 14s6.24 0 7.8-.41a2.5 2.5 0 0 0 1.76-1.77C20 10.26 20 7 20 7s0-3.26-.44-4.82zM8 10V4l5.2 3L8 10z"/>
              </svg>
              <span className="hidden sm:inline">YouTube</span>
            </a>

            <button
              type="button"
              onClick={scrollToTest}
              className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg px-2 sm:px-2.5 py-1 text-xs font-bold flex items-center gap-1 shadow-xs transition cursor-pointer"
            >
              <span>⏱ 30-Q Test</span>
            </button>
          </div>
        </div>
      </header>

      {/* Live Proctoring Status Bar (When session active) */}
      {activeSession && (
        <ProctoringStatusBar
          studentName={activeSession.name}
          day={activeSession.day}
          screenTimeSeconds={screenTimeSeconds}
          firstAttemptCorrect={firstAttemptCorrect}
          firstAttemptWrong={firstAttemptWrong}
          onOpenRecords={() => setShowRecordsDrawer(true)}
          onManualEndSession={handleManualEndSession}
          recordsCount={records.length}
        />
      )}

      {/* Main Body */}
      <main id="main" className="flex-1">
        <AdjectivesLesson
          onFirstAttempt={handleFirstAttempt}
          onExamCompleted={handleExamCompleted}
        />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t-2 border-emerald-200 py-6 mt-12">
        <div className="max-w-[1180px] mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            <strong className="text-emerald-700 font-black text-sm block">
              Econova.vip ✦ English Grammar Series
            </strong>
            <span>Chapter 3: Kinds, Position &amp; Order of Adjectives · Live Proctoring &amp; Real-Time Records</span>
          </div>

          <div className="flex flex-wrap gap-3 font-bold text-emerald-700">
            <a href="#topic-1" className="hover:underline">1. Kinds</a>
            <a href="#topic-2" className="hover:underline">2. Agreement</a>
            <a href="#topic-3" className="hover:underline">3. Position</a>
            <a href="#topic-4" className="hover:underline">4. Traps</a>
            <a href="#topic-5" className="hover:underline">5. Order</a>
            <button
              type="button"
              onClick={() => setShowRecordsDrawer(true)}
              className="hover:underline text-teal-800 cursor-pointer"
            >
              50 Saved Records
            </button>
          </div>
        </div>
      </footer>

      {/* Mandatory Student Entry Modal on Load */}
      <StudentEntryModal
        isOpen={showEntryModal && !activeSession && !isTerminated}
        onStartSession={handleStartSession}
        onOpenRecords={() => setShowRecordsDrawer(true)}
        totalSavedRecords={records.length}
      />

      {/* Screen Switch Terminated Lockout Modal */}
      <ScreenSwitchTerminatedModal
        isOpen={isTerminated}
        record={terminatedRecord}
        onOpenRecords={() => setShowRecordsDrawer(true)}
        onRestartNewSession={handleRestartNewSession}
      />

      {/* Persistent Saved Records 50 Entries Drawer */}
      <SavedRecordsDrawer
        isOpen={showRecordsDrawer}
        onClose={() => setShowRecordsDrawer(false)}
        records={records}
        onRefresh={loadRecords}
        isLoading={isLoadingRecords}
      />
    </div>
  );
}
