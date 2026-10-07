import React, { useState, useEffect } from 'react';
import {
  determinersIntro,
  rulesOfA,
  rulesOfAn,
  rulesOfThe,
  textbookExercise1,
  textbookExercise2
} from './data/determinersData';
import {
  conceptPracticeQuestions,
  toughExamQuestions
} from './data/determinersQuestions';
import {
  StudentRecord,
  getStoredStudents,
  saveStudentRecord
} from './data/studentsLeaderboard';
import {
  BookOpen,
  Award,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Trophy,
  RotateCcw,
  Flag,
  User,
  Users,
  Search,
  Check,
  ChevronRight,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';

export default function App() {
  // Student Name State (Required before test opens)
  const [studentName, setStudentName] = useState<string>(() => {
    return localStorage.getItem('determiners_student_name') || '';
  });
  const [nameError, setNameError] = useState<boolean>(false);
  const [currentStudentId, setCurrentStudentId] = useState<string>('');

  // 50 Students Leaderboard Roster
  const [studentsRoster, setStudentsRoster] = useState<StudentRecord[]>(() => {
    return getStoredStudents();
  });
  const [rosterFilter, setRosterFilter] = useState<string>('');

  // State for Concept Practice Questions (20 questions)
  // CRITICAL: No immediate answer reveals! Student fills first, then submits to view answer key.
  const [conceptAnswers, setConceptAnswers] = useState<Record<number, number>>({});
  const [isConceptSubmitted, setIsConceptSubmitted] = useState<boolean>(false);

  // State for Interactive Textbook Exercise 1 (10 sentences)
  const [ex1UserAnswers, setEx1UserAnswers] = useState<Record<number, string>>({});
  const [ex1Submitted, setEx1Submitted] = useState<boolean>(false);

  // State for Interactive Textbook Exercise 2 (8 sentences)
  const [ex2UserAnswers, setEx2UserAnswers] = useState<Record<number, string>>({});
  const [ex2Submitted, setEx2Submitted] = useState<boolean>(false);

  // State for Final 30-Question Exam
  const [examStatus, setExamStatus] = useState<'idle' | 'running' | 'results'>('idle');
  const [currentExamIndex, setCurrentExamIndex] = useState(0);
  const [examAnswers, setExamAnswers] = useState<Record<number, number>>({});
  const [examReviewFlags, setExamReviewFlags] = useState<Record<number, boolean>>({});
  const [secondsLeft, setSecondsLeft] = useState(15 * 60); // 15 mins
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [autoSubmitted, setAutoSubmitted] = useState(false);

  // Timer countdown
  useEffect(() => {
    let timer: any;
    if (examStatus === 'running' && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            finishExam(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [examStatus, secondsLeft]);

  const scrollToTest = () => {
    const arena = document.getElementById('test-arena');
    if (arena) arena.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Validation: Student MUST enter their name before opening the test
  const handleStartExam = () => {
    if (!studentName.trim() || studentName.trim().length < 2) {
      setNameError(true);
      const inputEl = document.getElementById('student-name-input');
      if (inputEl) {
        inputEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        inputEl.focus();
      }
      return;
    }
    setNameError(false);
    localStorage.setItem('determiners_student_name', studentName.trim());
    setExamAnswers({});
    setExamReviewFlags({});
    setCurrentExamIndex(0);
    setSecondsLeft(15 * 60);
    setAutoSubmitted(false);
    setExamStatus('running');
    scrollToTest();
  };

  const finishExam = (isAuto = false) => {
    setAutoSubmitted(isAuto);
    setShowWarningModal(false);
    setExamStatus('results');

    // Calculate score
    const score = toughExamQuestions.reduce((acc, q) => {
      return examAnswers[q.id] === q.ans ? acc + 1 : acc;
    }, 0);
    const accuracy = Math.round((score / toughExamQuestions.length) * 100);
    const timeTakenSec = 15 * 60 - secondsLeft;
    const timeTakenFormatted = `${Math.floor(timeTakenSec / 60)}m ${timeTakenSec % 60}s`;
    const badge =
      score >= 28
        ? 'Topper 👑'
        : score >= 25
        ? 'Outstanding ★'
        : score >= 20
        ? 'First Class'
        : score >= 15
        ? 'Passed'
        : 'Needs Practice';

    const newRecord = {
      name: studentName.trim() || 'Student',
      score: score,
      total: toughExamQuestions.length,
      accuracy: accuracy,
      timeTaken: timeTakenFormatted,
      date: 'Just now',
      badge: badge
    };

    const updated = saveStudentRecord(newRecord);
    setStudentsRoster(updated);
    setCurrentStudentId(updated[0]?.id || '');
    scrollToTest();
  };

  const handleConfirmSubmit = () => {
    const attempted = Object.keys(examAnswers).length;
    if (attempted < toughExamQuestions.length) {
      setShowWarningModal(true);
    } else {
      finishExam(false);
    }
  };

  // Calculation of Exam Scores & Diagnostics
  const examScore = toughExamQuestions.reduce((acc, q) => {
    return examAnswers[q.id] === q.ans ? acc + 1 : acc;
  }, 0);
  const examMistakesCount = toughExamQuestions.length - examScore;
  const examAccuracy = Math.round((examScore / toughExamQuestions.length) * 100);
  const timeTakenSec = 15 * 60 - secondsLeft;
  const timeTakenFormatted = `${Math.floor(timeTakenSec / 60)}m ${timeTakenSec % 60}s`;

  // Exercise 1 Score Calculations
  const ex1Score = textbookExercise1.reduce((acc, item) => {
    return ex1UserAnswers[item.id]?.toLowerCase() === item.blankAnswer.toLowerCase() ? acc + 1 : acc;
  }, 0);
  const ex1Incorrect = textbookExercise1.length - ex1Score;

  // Exercise 2 Score Calculations
  const ex2Score = textbookExercise2.reduce((acc, item) => {
    return ex2UserAnswers[item.id]?.toLowerCase() === item.blankAnswer.toLowerCase() ? acc + 1 : acc;
  }, 0);
  const ex2Incorrect = textbookExercise2.length - ex2Score;

  // Concept Practice Score Calculations
  const conceptAttemptedCount = Object.keys(conceptAnswers).length;
  const conceptScore = conceptPracticeQuestions.reduce((acc, q) => {
    return conceptAnswers[q.id] === q.ans ? acc + 1 : acc;
  }, 0);
  const conceptMistakesCount = conceptPracticeQuestions.length - conceptScore;
  const conceptAccuracy = Math.round((conceptScore / conceptPracticeQuestions.length) * 100);

  // Diagnostics by Unit for Final Exam
  const unitStats = {
    indefinite: { name: 'Unit 01: Indefinite Articles (A & An)', correct: 0, total: 0, mistakes: [] as number[], anchor: 'topic-indefinite' },
    definite: { name: 'Unit 02: Definite Article (The)', correct: 0, total: 0, mistakes: [] as number[], anchor: 'topic-definite' },
    omission: { name: 'Unit 03: Omission Rules & High-Level Traps', correct: 0, total: 0, mistakes: [] as number[], anchor: 'topic-omission' },
    exercises: { name: 'Unit 04: Textbook Exercises Mastery', correct: 0, total: 0, mistakes: [] as number[], anchor: 'topic-exercises' },
    determiners: { name: 'Unit 05: General Determiners Concepts', correct: 0, total: 0, mistakes: [] as number[], anchor: 'topic-intro' }
  };

  toughExamQuestions.forEach((q) => {
    const u = examAnswers[q.id];
    const unitObj = (unitStats as any)[q.unit] || unitStats.indefinite;
    unitObj.total++;
    if (u === q.ans) {
      unitObj.correct++;
    } else {
      unitObj.mistakes.push(q.id);
    }
  });

  // Filtered leaderboard
  const displayedRoster = studentsRoster.filter((s) =>
    s.name.toLowerCase().includes(rosterFilter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f0fdf4] text-[#1f2937]">
      {/* HEADER - CLEAN & ACCESSIBLE (NO BUTTON EVER CLIPPED OR COVERED) */}
      <header className="bg-[#2dd4bf] border-b-4 border-[#10b981] sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between flex-wrap gap-2">
          {/* Logo */}
          <a href="#main" className="flex items-center gap-2 text-xl sm:text-2xl font-black text-white font-heading shrink-0">
            <span className="w-8 h-8 rounded-lg bg-[#fde047] text-[#059669] grid place-items-center text-lg -rotate-6 shadow-xs font-bold">
              ✦
            </span>
            <span className="tracking-tight">
              Econova<span className="text-[#fde047]">.vip</span>
            </span>
          </a>

          {/* Nav links on desktop */}
          <nav className="hidden lg:flex items-center gap-1 font-bold text-xs text-white">
            <a href="#topic-intro" className="px-2.5 py-1.5 rounded-lg hover:bg-white/20 transition">Intro</a>
            <a href="#topic-indefinite" className="px-2.5 py-1.5 rounded-lg hover:bg-white/20 transition">A &amp; An Rules</a>
            <a href="#topic-definite" className="px-2.5 py-1.5 rounded-lg hover:bg-white/20 transition">The Rules</a>
            <a href="#topic-exercises" className="px-2.5 py-1.5 rounded-lg hover:bg-white/20 transition">Textbook Exercises</a>
            <a href="#topic-concept" className="px-2.5 py-1.5 rounded-lg hover:bg-white/20 transition">20-Q Practice</a>
            <a href="#test-arena" className="px-2.5 py-1.5 rounded-lg hover:bg-white/20 transition">30-Q Test</a>
          </nav>

          {/* Action buttons (YouTube & Test Jump) */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://youtu.be/FkKoei0AjBo"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#ff0000] hover:bg-[#e60000] text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-xs transition inline-flex items-center gap-1.5 shrink-0"
              title="YouTube Channel"
            >
              <svg width="14" height="10" viewBox="0 0 20 14" fill="currentColor">
                <path d="M19.56 2.18a2.5 2.5 0 0 0-1.76-1.77C16.24 0 10 0 10 0S3.76 0 2.2.41A2.5 2.5 0 0 0 .44 2.18C0 3.74 0 7 0 7s0 3.26.44 4.82a2.5 2.5 0 0 0 1.76 1.77C3.76 14 10 14 10 14s6.24 0 7.8-.41a2.5 2.5 0 0 0 1.76-1.77C20 10.26 20 7 20 7s0-3.26-.44-4.82zM8 10V4l5.2 3L8 10z" />
              </svg>
              <span>YouTube</span>
            </a>

            <button
              type="button"
              onClick={scrollToTest}
              className="bg-[#10b981] hover:bg-[#059669] text-white text-xs font-black px-3.5 py-1.5 rounded-xl shadow-xs transition inline-flex items-center gap-1.5 shrink-0"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>30-Q Tough Test →</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main id="main" className="max-w-6xl mx-auto px-3 sm:px-6 pt-6 pb-28">
        
        {/* HERO SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-6">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 bg-white border border-[#34d399] rounded-full px-3.5 py-1 text-xs text-[#059669] font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
              Class 9 General English · Chapter: Determiners (Articles A, An, The)
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111827] mt-3 mb-2 font-heading leading-tight">
              Chapter: <span className="text-[#059669]">Determiners</span>
              <span className="block text-xl sm:text-2xl font-bold text-[#4b5563] font-hi mt-1">
                Articles (A, An, The) एवं कठिन परीक्षा ट्रैप्स (क्लास 9th लेवल)
              </span>
            </h1>

            <p className="text-sm text-[#4b5563] leading-relaxed mb-4 font-hi">
              कक्षा 9 के पाठ्यक्रम और आपकी पाठ्यपुस्तक के दोनों पृष्ठों पर आधारित संपूर्ण अध्याय। 
              यहाँ थ्योरी को <strong>सरल हिंदी व अंग्रेजी में गहराई से समझाया गया है</strong>, जबकि सभी 
              <strong>प्रश्नों व विकल्पों को शुद्ध अंग्रेजी (Pure English)</strong> में रखा गया है। 
              प्रश्नों को पहले पूरा हल करें, फिर सबमिट करने पर ही <strong>सही-गलत की संख्या, स्कोर व उत्तर कुंजी</strong> खुलेगी!
            </p>

            <div className="flex flex-wrap gap-2.5">
              <a
                href="#topic-indefinite"
                className="bg-[#10b981] hover:bg-[#059669] text-white font-extrabold text-sm px-4 py-2.5 rounded-xl shadow-xs transition inline-flex items-center gap-1.5"
              >
                <BookOpen className="w-4 h-4" /> Read Theory &amp; Rules →
              </a>
              <a
                href="#topic-exercises"
                className="border-2 border-[#34d399] bg-white hover:bg-[#d1fae5] text-[#059669] font-bold text-xs sm:text-sm px-3.5 py-2.5 rounded-xl transition inline-flex items-center gap-1.5"
              >
                📝 Textbook Exercises (Page 2)
              </a>
              <button
                type="button"
                onClick={scrollToTest}
                className="border-2 border-[#fcd34d] bg-[#fffbeb] hover:bg-[#fef3c7] text-[#92400e] font-bold text-xs sm:text-sm px-3.5 py-2.5 rounded-xl transition inline-flex items-center gap-1.5"
              >
                <Trophy className="w-4 h-4 text-[#d97706]" /> 30-Question Tough Test
              </button>
            </div>
          </div>

          {/* Golden Rules Spotlight Card */}
          <div className="lg:col-span-5 bg-[#fffbeb] border-3 border-[#fcd34d] rounded-2xl p-5 shadow-xs">
            <span className="text-[11px] font-black uppercase text-[#b45309] bg-[#fef3c7] px-2.5 py-0.5 rounded-md border border-[#fcd34d]">
              Textbook Golden Formulas · स्वर्ण नियम
            </span>
            <div className="text-2xl font-black text-[#92400e] font-heading my-2">
              Sound ≠ Spelling &amp; Purpose Decides!
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-[#fde68a] text-xs leading-relaxed space-y-1.5 text-[#78350f]">
              <p>• <strong>a university:</strong> 'U' स्वर वर्ण है, पर ध्वनि <strong>'य' (/juː/)</strong> व्यंजन है।</p>
              <p>• <strong>an honest man:</strong> 'h' मूक (silent) है, ध्वनि <strong>'ऑनेस्ट'</strong> स्वर है।</p>
              <p>• <strong>an M.L.A.:</strong> 'M' बोलने पर स्वर ध्वनि <strong>'एम' (/em/)</strong> निकलती है।</p>
              <p>• <strong>a U.D.C.:</strong> 'U' बोलने पर व्यंजन ध्वनि <strong>'यू' (/juː/)</strong> निकलती है।</p>
              <p>• <strong>Kalidas is the Shakespeare of India:</strong> तुलनात्मक उपमा में <strong>'the'</strong> अनिवार्य है।</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            UNIT 01: WHAT ARE DETERMINERS (THEORY - BILINGUAL EXPLANATION)
            ========================================================================= */}
        <section id="topic-intro" className="my-8 bg-white border-2 border-[#a7f3d0] rounded-2xl p-5 sm:p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-black uppercase text-[#059669] bg-[#ecfdf5] border border-[#34d399] px-2.5 py-0.5 rounded-md">
              Introduction · पाठ्यपुस्तक पृष्ठ 1
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-[#111827] font-heading mb-2">
            {determinersIntro.title}
          </h2>

          <div className="bg-[#f0fdf4] border border-[#a7f3d0] rounded-xl p-3.5 text-xs sm:text-sm text-[#065f46] leading-relaxed mb-4">
            <p className="font-bold mb-1">📖 Definition (परिभाषा):</p>
            <p className="font-medium text-[#1e293b]">{determinersIntro.definitionEn}</p>
            <p className="font-hi mt-1">👉 {determinersIntro.definitionHi}</p>
          </div>

          <div className="text-xs font-black uppercase text-[#059669] tracking-wider mb-2">
            Textbook Sentences &amp; Determiners Analysis:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 mb-4">
            {determinersIntro.examples.map((item, idx) => (
              <div key={idx} className="bg-[#f8fafc] border border-[#cbd5e1] rounded-xl p-3 text-xs">
                <p className="font-bold text-sm text-[#0f172a] mb-1">“{item.text}”</p>
                <p className="text-[#059669] font-bold">
                  Determiner: <span className="bg-white px-2 py-0.5 rounded border border-[#a7f3d0]">{item.determiner}</span>
                </p>
                <p className="text-[#64748b] text-[11px] mt-0.5">
                  Modifies noun: <strong>{item.noun}</strong> ({item.note})
                </p>
              </div>
            ))}
          </div>

          <div className="bg-[#fffbeb] border border-[#fde68a] rounded-xl p-3.5 text-xs">
            <strong className="text-[#92400e] block mb-1">
              📋 Main Determiners List (पाठ्यपुस्तक में दी गई मुख्य सूची):
            </strong>
            <div className="flex flex-wrap gap-1.5">
              {determinersIntro.mainDeterminersList.map((det, dIdx) => (
                <span
                  key={dIdx}
                  className="bg-white border border-[#fcd34d] text-[#78350f] font-semibold px-2 py-0.5 rounded-md text-[11px]"
                >
                  {det}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            UNIT 02: INDEFINITE ARTICLE 'A' AND 'AN' (THEORY - BILINGUAL EXPLANATION)
            ========================================================================= */}
        <section id="topic-indefinite" className="my-8 space-y-6">
          <div className="border-b-2 border-[#a7f3d0] pb-2">
            <span className="text-xs font-black uppercase text-[#059669] bg-[#ecfdf5] border border-[#34d399] px-2.5 py-0.5 rounded-md">
              Unit 01 · Rules of Indefinite Articles
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#111827] font-heading mt-1">
              1. Use of Indefinite Article 'A' and 'An'
            </h2>
          </div>

          {/* Rules of 'A' */}
          <div className="bg-white border-2 border-[#a7f3d0] rounded-2xl p-5 shadow-xs">
            <h3 className="text-lg font-black text-[#059669] font-heading mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#059669] text-white text-sm grid place-items-center">A</span>
              When is 'A' used? ('A' के सभी 7 नियम - पाठ्यपुस्तक पृष्ठ 1)
            </h3>

            <div className="space-y-3">
              {rulesOfA.map((r) => (
                <div key={r.num} className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-3.5 text-xs sm:text-sm">
                  <div className="flex items-start gap-2 mb-1">
                    <span className="w-5 h-5 rounded-full bg-[#d1fae5] text-[#059669] font-black text-xs grid place-items-center shrink-0 mt-0.5">
                      {r.num}
                    </span>
                    <div>
                      <strong className="text-[#0f172a]">{r.ruleEn}</strong>
                      <p className="font-hi text-[#065f46] text-xs mt-0.5">👉 {r.ruleHi}</p>
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-[#e2e8f0] flex flex-wrap gap-1.5">
                    {r.examples.map((ex, exIdx) => (
                      <span
                        key={exIdx}
                        className="bg-white border border-[#a7f3d0] text-[#059669] font-bold text-xs px-2.5 py-1 rounded-lg"
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rules of 'An' */}
          <div className="bg-white border-2 border-[#a7f3d0] rounded-2xl p-5 shadow-xs">
            <h3 className="text-lg font-black text-[#059669] font-heading mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#059669] text-white text-sm grid place-items-center">An</span>
              When is 'An' used? ('An' के सभी 3 नियम - पाठ्यपुस्तक पृष्ठ 1)
            </h3>

            <div className="space-y-3">
              {rulesOfAn.map((r) => (
                <div key={r.num} className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-3.5 text-xs sm:text-sm">
                  <div className="flex items-start gap-2 mb-1">
                    <span className="w-5 h-5 rounded-full bg-[#d1fae5] text-[#059669] font-black text-xs grid place-items-center shrink-0 mt-0.5">
                      {r.num}
                    </span>
                    <div>
                      <strong className="text-[#0f172a]">{r.ruleEn}</strong>
                      <p className="font-hi text-[#065f46] text-xs mt-0.5">👉 {r.ruleHi}</p>
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-[#e2e8f0] flex flex-wrap gap-1.5">
                    {r.examples.map((ex, exIdx) => (
                      <span
                        key={exIdx}
                        className="bg-white border border-[#a7f3d0] text-[#059669] font-bold text-xs px-2.5 py-1 rounded-lg"
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            UNIT 03: DEFINITE ARTICLE 'THE' (THEORY - BILINGUAL EXPLANATION)
            ========================================================================= */}
        <section id="topic-definite" className="my-8 bg-white border-2 border-[#a7f3d0] rounded-2xl p-5 sm:p-6 shadow-xs">
          <div className="border-b-2 border-[#a7f3d0] pb-2 mb-4">
            <span className="text-xs font-black uppercase text-[#059669] bg-[#ecfdf5] border border-[#34d399] px-2.5 py-0.5 rounded-md">
              Unit 02 · Definite Article 'The'
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#111827] font-heading mt-1">
              2. Use of Definite Article 'The' ('The' के सभी 12 नियम - पृष्ठ 1 व 2)
            </h2>
            <p className="text-xs text-[#64748b] mt-1 font-hi">
              'The' का प्रयोग किसी व्यक्ति या वस्तु को विशेष (particular/definite) बनाने के लिए किया जाता है।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {rulesOfThe.map((r) => (
              <div key={r.code} className="bg-[#f8fafc] border border-[#cbd5e1] rounded-xl p-3.5 text-xs sm:text-sm">
                <div className="flex items-start gap-2 mb-1.5">
                  <span className="w-6 h-6 rounded bg-[#10b981] text-white font-black text-xs grid place-items-center shrink-0 uppercase">
                    {r.code}
                  </span>
                  <div>
                    <strong className="text-[#0f172a]">{r.titleEn}</strong>
                    <p className="font-hi text-[#065f46] text-xs mt-0.5">👉 {r.titleHi}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#e2e8f0] space-y-1">
                  {r.examples.map((ex, exIdx) => (
                    <div key={exIdx} className="bg-white border border-[#a7f3d0] text-[#1e293b] font-medium text-xs px-2.5 py-1 rounded-md">
                      {ex}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            UNIT 04: TEXTBOOK EXERCISES 1 & 2 (SUBMIT FIRST, THEN REVEAL KEY)
            ========================================================================= */}
        <section id="topic-exercises" className="my-8 space-y-6">
          <div className="border-b-2 border-[#a7f3d0] pb-2">
            <span className="text-xs font-black uppercase text-[#059669] bg-[#ecfdf5] border border-[#34d399] px-2.5 py-0.5 rounded-md">
              Textbook Exercises · पृष्ठ 2 कार्य-पुस्तिका
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#111827] font-heading mt-1">
              Textbook Gap-Filling Worksheets (Exercise 1 &amp; Exercise 2)
            </h2>
            <p className="text-xs sm:text-sm text-[#4b5563] mt-1 font-hi">
              पहले सभी रिक्त स्थान भरें। जब आप <strong>'Submit Exercise'</strong> पर क्लिक करेंगे, 
              तभी सही और <strong>कितने गलत हुए (Mistakes)</strong>, स्कोर और पूरी उत्तर कुंजी प्रदर्शित होगी!
            </p>
          </div>

          {/* Exercise 1 Interactive Worksheet */}
          <div className="bg-white border-2 border-[#a7f3d0] rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-3 pb-2 border-b border-[#e2e8f0]">
              <div>
                <h3 className="text-lg font-black text-[#0f172a] font-heading">
                  Exercise-1: Fill in the blanks with 'a' or 'an' (10 Sentences)
                </h3>
                <p className="text-xs text-[#64748b]">Select 'a' or 'an' for each sentence before submitting.</p>
              </div>

              {ex1Submitted && (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black px-3 py-1 bg-[#ecfdf5] text-[#059669] border border-[#10b981] rounded-lg">
                    Score: {ex1Score} / 10 ({Math.round((ex1Score / 10) * 100)}%)
                  </span>
                  <span className="text-xs font-bold text-[#dc2626] bg-[#fef2f2] px-2.5 py-1 rounded-lg border border-[#fca5a5]">
                    {ex1Incorrect} प्रश्न गलत हुए ({ex1Incorrect} Wrong)
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {textbookExercise1.map((item) => {
                const userVal = ex1UserAnswers[item.id];
                const isCorrect = userVal?.toLowerCase() === item.blankAnswer.toLowerCase();
                let borderCls = 'border-[#e2e8f0] bg-[#f8fafc]';
                if (ex1Submitted) {
                  borderCls = isCorrect ? 'border-[#22c55e] bg-[#f0fdf4]' : 'border-[#ef4444] bg-[#fef2f2]';
                }

                return (
                  <div key={item.id} className={`border rounded-xl p-3 text-xs sm:text-sm transition ${borderCls}`}>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="font-bold text-[#0f172a] flex-1">
                        {item.id}. {item.sentence.replace('______', '_____')}
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {['a', 'an'].map((opt) => {
                          const isSelected = userVal?.toLowerCase() === opt;
                          return (
                            <button
                              key={opt}
                              type="button"
                              disabled={ex1Submitted}
                              onClick={() => setEx1UserAnswers({ ...ex1UserAnswers, [item.id]: opt })}
                              className={`px-3 py-1 rounded-lg text-xs font-black border transition ${
                                isSelected
                                  ? 'bg-[#10b981] text-white border-[#059669]'
                                  : 'bg-white text-[#475569] border-[#cbd5e1] hover:bg-[#f1f5f9]'
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {ex1Submitted && (
                      <div className="mt-2.5 pt-2 border-t border-[#cbd5e1] text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className={isCorrect ? 'text-[#15803d] font-bold' : 'text-[#b91c1c] font-bold'}>
                            {isCorrect ? '✓ Correct!' : `✕ Incorrect! Your choice: [ ${userVal || 'None'} ] · Correct: [ ${item.blankAnswer} ]`}
                          </span>
                        </div>
                        <p className="text-[#1e3a8a] bg-[#eff6ff] p-2 rounded-lg font-hi">
                          <strong>💡 व्याख्या:</strong> {item.ruleExplanationHi} ({item.ruleExplanationEn})
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Exercise 1 Action Bar */}
            <div className="mt-4 pt-3 border-t border-[#e2e8f0] flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-semibold text-[#64748b]">
                Attempted: <strong>{Object.keys(ex1UserAnswers).length}</strong> / 10
              </span>

              <div className="flex gap-2">
                {ex1Submitted ? (
                  <button
                    type="button"
                    onClick={() => {
                      setEx1UserAnswers({});
                      setEx1Submitted(false);
                    }}
                    className="bg-white border border-[#cbd5e1] hover:bg-[#f1f5f9] text-[#475569] text-xs font-bold px-3.5 py-1.5 rounded-lg transition"
                  >
                    Reset &amp; Try Again
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (Object.keys(ex1UserAnswers).length === 0) {
                        alert('Please select answers for the sentences first!');
                        return;
                      }
                      setEx1Submitted(true);
                    }}
                    className="bg-[#10b981] hover:bg-[#059669] text-white text-xs font-black px-4 py-2 rounded-xl shadow-xs transition"
                  >
                    Submit Exercise 1 &amp; Reveal Key →
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Exercise 2 Interactive Worksheet */}
          <div className="bg-white border-2 border-[#a7f3d0] rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-3 pb-2 border-b border-[#e2e8f0]">
              <div>
                <h3 className="text-lg font-black text-[#0f172a] font-heading">
                  Exercise-2: Fill in the blanks with 'a' or 'an' (8 Sentences)
                </h3>
                <p className="text-xs text-[#64748b]">Select 'a' or 'an' for each sentence before submitting.</p>
              </div>

              {ex2Submitted && (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black px-3 py-1 bg-[#ecfdf5] text-[#059669] border border-[#10b981] rounded-lg">
                    Score: {ex2Score} / 8 ({Math.round((ex2Score / 8) * 100)}%)
                  </span>
                  <span className="text-xs font-bold text-[#dc2626] bg-[#fef2f2] px-2.5 py-1 rounded-lg border border-[#fca5a5]">
                    {ex2Incorrect} प्रश्न गलत हुए ({ex2Incorrect} Wrong)
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {textbookExercise2.map((item) => {
                const userVal = ex2UserAnswers[item.id];
                const isCorrect = userVal?.toLowerCase() === item.blankAnswer.toLowerCase();
                let borderCls = 'border-[#e2e8f0] bg-[#f8fafc]';
                if (ex2Submitted) {
                  borderCls = isCorrect ? 'border-[#22c55e] bg-[#f0fdf4]' : 'border-[#ef4444] bg-[#fef2f2]';
                }

                return (
                  <div key={item.id} className={`border rounded-xl p-3 text-xs sm:text-sm transition ${borderCls}`}>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="font-bold text-[#0f172a] flex-1">
                        {item.id}. {item.sentence.replace('______', '_____')}
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {['a', 'an'].map((opt) => {
                          const isSelected = userVal?.toLowerCase() === opt;
                          return (
                            <button
                              key={opt}
                              type="button"
                              disabled={ex2Submitted}
                              onClick={() => setEx2UserAnswers({ ...ex2UserAnswers, [item.id]: opt })}
                              className={`px-3 py-1 rounded-lg text-xs font-black border transition ${
                                isSelected
                                  ? 'bg-[#10b981] text-white border-[#059669]'
                                  : 'bg-white text-[#475569] border-[#cbd5e1] hover:bg-[#f1f5f9]'
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {ex2Submitted && (
                      <div className="mt-2.5 pt-2 border-t border-[#cbd5e1] text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className={isCorrect ? 'text-[#15803d] font-bold' : 'text-[#b91c1c] font-bold'}>
                            {isCorrect ? '✓ Correct!' : `✕ Incorrect! Your choice: [ ${userVal || 'None'} ] · Correct: [ ${item.blankAnswer} ]`}
                          </span>
                        </div>
                        <p className="text-[#1e3a8a] bg-[#eff6ff] p-2 rounded-lg font-hi">
                          <strong>💡 व्याख्या:</strong> {item.ruleExplanationHi} ({item.ruleExplanationEn})
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Exercise 2 Action Bar */}
            <div className="mt-4 pt-3 border-t border-[#e2e8f0] flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-semibold text-[#64748b]">
                Attempted: <strong>{Object.keys(ex2UserAnswers).length}</strong> / 8
              </span>

              <div className="flex gap-2">
                {ex2Submitted ? (
                  <button
                    type="button"
                    onClick={() => {
                      setEx2UserAnswers({});
                      setEx2Submitted(false);
                    }}
                    className="bg-white border border-[#cbd5e1] hover:bg-[#f1f5f9] text-[#475569] text-xs font-bold px-3.5 py-1.5 rounded-lg transition"
                  >
                    Reset &amp; Try Again
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (Object.keys(ex2UserAnswers).length === 0) {
                        alert('Please select answers for the sentences first!');
                        return;
                      }
                      setEx2Submitted(true);
                    }}
                    className="bg-[#10b981] hover:bg-[#059669] text-white text-xs font-black px-4 py-2 rounded-xl shadow-xs transition"
                  >
                    Submit Exercise 2 &amp; Reveal Key →
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            UNIT 05: CLASS 9TH TRAPS & OMISSION RULES (THEORY - BILINGUAL)
            ========================================================================= */}
        <section id="topic-omission" className="my-8 bg-[#fffbeb] border-3 border-[#fcd34d] rounded-2xl p-5 sm:p-6 shadow-xs">
          <span className="text-xs font-black uppercase text-[#b45309] bg-[#fef3c7] px-2.5 py-0.5 rounded-md border border-[#fcd34d]">
            Class 9th Tough Traps · जहाँ 90% छात्र गलती करते हैं
          </span>
          <h2 className="text-2xl font-black text-[#78350f] font-heading mt-1 mb-3">
            Omission Rules &amp; Confusing Traps (जहाँ आर्टिकल का प्रयोग वर्जित या विशेष होता है)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs sm:text-sm">
            <div className="bg-white p-3.5 rounded-xl border border-[#fde68a] space-y-1">
              <strong className="text-[#b45309] block">1. Single Mountain Peak vs Range:</strong>
              <p>• <strong>the Himalayas</strong>, <strong>the Aravalli Mountains</strong> (Ranges = 'the' ✓)</p>
              <p>• <strong>Mount Everest</strong>, <strong>Mount Abu</strong> (Single Peak = NO article ✗)</p>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-[#fde68a] space-y-1">
              <strong className="text-[#b45309] block">2. Material &amp; Abstract Nouns:</strong>
              <p>• <em>Gold is a precious metal.</em> (General = NO article)</p>
              <p>• <em><strong>The gold of South Africa</strong> is pure.</em> (Specific = 'the' ✓)</p>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-[#fde68a] space-y-1">
              <strong className="text-[#b45309] block">3. Language vs Nationality:</strong>
              <p>• <em>He speaks <strong>English</strong>.</em> (Language = NO article)</p>
              <p>• <em><strong>The English</strong> ruled India.</em> (People/Nation = 'the' ✓)</p>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-[#fde68a] space-y-1">
              <strong className="text-[#b45309] block">4. Primary Purpose vs Visitor:</strong>
              <p>• <em>He went to <strong>hospital</strong>.</em> (as patient = NO article)</p>
              <p>• <em>He went to <strong>the hospital</strong>.</em> (as visitor = 'the' ✓)</p>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-[#fde68a] space-y-1">
              <strong className="text-[#b45309] block">5. Two Nouns Joined by 'And':</strong>
              <p>• <em><strong>The poet and philosopher</strong> has died.</em> (1 person = Singular verb)</p>
              <p>• <em><strong>The poet and the philosopher</strong> have died.</em> (2 persons = Plural verb)</p>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-[#fde68a] space-y-1">
              <strong className="text-[#b45309] block">6. Double Comparative Structures:</strong>
              <p>• <em><strong>The higher</strong> you climb, <strong>the cooler</strong> you feel.</em></p>
              <p>• <em><strong>The more</strong> you study, <strong>the wiser</strong> you become.</em></p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            UNIT 06: 20 CONCEPT PRACTICE QUESTIONS
            CRITICAL USER DEMAND:
            "aur yaha pe answer turant na dikhe pahle enhe poore bharne do aur submit kare tab answer key kholna aur dikhao kitte galat kiye"
            "aur koi bhi option me hindi nhi do aur na hi question me hindi"
            ========================================================================= */}
        <section id="topic-concept" className="my-10 space-y-5">
          <div className="border-b-2 border-[#a7f3d0] pb-2 flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-black uppercase text-[#059669] bg-[#ecfdf5] border border-[#34d399] px-2.5 py-0.5 rounded-md">
                Interactive Practice · 20 Concept Questions (Pure English)
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#111827] font-heading mt-1">
                Concept Practice Questions (Pure English Questions &amp; Options)
              </h2>
              <p className="text-xs sm:text-sm text-[#4b5563] mt-1 font-hi">
                पहले सभी 20 प्रश्नों को खुद हल करें। <strong>उत्तर तुरंत नहीं दिखेंगे</strong>। 
                जब आप नीचे दिए गए <strong>'Submit Practice'</strong> बटन को दबाएंगे, तब आपका स्कोर, 
                <strong>कितने प्रश्न गलत हुए</strong> और पूरी उत्तर कुंजी व्याख्या सहित खुलेगी!
              </p>
            </div>

            {/* Quick Status Pill */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#059669] bg-white border border-[#34d399] px-3 py-1 rounded-xl shadow-xs">
                Attempted: <strong>{conceptAttemptedCount}</strong> / 20
              </span>
            </div>
          </div>

          {/* Submission Result Banner if submitted */}
          {isConceptSubmitted && (
            <div className="bg-white border-3 border-[#10b981] rounded-2xl p-5 shadow-md">
              <div className="flex items-center justify-between flex-wrap gap-3 pb-3 mb-3 border-b border-[#a7f3d0]">
                <div>
                  <span className="text-xs font-black uppercase text-[#059669] bg-[#ecfdf5] px-2.5 py-0.5 rounded-md border border-[#34d399]">
                    Practice Test Summary
                  </span>
                  <h3 className="text-2xl font-black text-[#059669] font-heading mt-1">
                    Your Practice Score: {conceptScore} / 20 ({conceptAccuracy}%)
                  </h3>
                  <div className="flex items-center gap-3 mt-1 text-xs sm:text-sm">
                    <span className="text-[#15803d] font-black bg-[#dcfce7] px-2.5 py-0.5 rounded-md">
                      ✓ {conceptScore} प्रश्न सही (Correct)
                    </span>
                    <span className="text-[#dc2626] font-black bg-[#fee2e2] px-2.5 py-0.5 rounded-md">
                      ✕ {conceptMistakesCount} प्रश्न गलत हुए (Wrong)
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setConceptAnswers({});
                    setIsConceptSubmitted(false);
                  }}
                  className="bg-[#10b981] hover:bg-[#059669] text-white font-extrabold text-xs px-4 py-2 rounded-xl transition inline-flex items-center gap-1.5 shadow-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Re-attempt Practice
                </button>
              </div>
              <p className="text-xs text-[#065f46] font-hi">
                नीचे सभी 20 प्रश्नों की उत्तर कुंजी व व्याख्या खोल दी गई है। अपनी गलतियों का विश्लेषण करें:
              </p>
            </div>
          )}

          {/* 20 Questions Grid (Pure English Prompt and Options) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {conceptPracticeQuestions.map((q) => {
              const uSel = conceptAnswers[q.id];
              const isRight = uSel === q.ans;
              const isAttempted = uSel !== undefined;

              let cardBorderCls = 'border-[#a7f3d0] bg-white';
              if (isConceptSubmitted) {
                cardBorderCls = isRight
                  ? 'border-[#22c55e] bg-[#f0fdf4]'
                  : 'border-[#ef4444] bg-[#fef2f2]';
              }

              return (
                <div
                  key={q.id}
                  className={`border-2 rounded-xl p-4 flex flex-col justify-between text-xs sm:text-sm shadow-xs transition ${cardBorderCls}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-bold text-[#059669] bg-[#ecfdf5] px-2 py-0.5 rounded border border-[#a7f3d0]">
                        {q.pairTitle}
                      </span>

                      {/* Result only shown AFTER submission */}
                      {isConceptSubmitted && (
                        <span
                          className={`font-black text-xs px-2 py-0.5 rounded ${
                            isRight
                              ? 'text-[#15803d] bg-[#dcfce7]'
                              : 'text-[#b91c1c] bg-[#fee2e2]'
                          }`}
                        >
                          {isRight ? '✓ Correct (+1)' : `✕ Wrong: (${String.fromCharCode(65 + q.ans)})`}
                        </span>
                      )}
                    </div>

                    {/* Pure English Question Prompt */}
                    <p className="font-bold text-[#0f172a] text-sm mb-3 leading-snug">
                      Q{q.id}. {q.q}
                    </p>

                    {/* Pure English Options */}
                    <div className="space-y-1.5 mb-3">
                      {q.opts.map((opt, oIdx) => {
                        const isSelected = uSel === oIdx;
                        let btnCls = 'bg-[#f8fafc] border-[#cbd5e1] text-[#1f2937] hover:bg-[#f1f5f9]';

                        if (isSelected && !isConceptSubmitted) {
                          btnCls = 'bg-[#ecfdf5] border-[#10b981] text-[#065f46] font-bold';
                        }

                        if (isConceptSubmitted) {
                          if (oIdx === q.ans) {
                            btnCls = 'bg-[#dcfce7] border-[#22c55e] text-[#15803d] font-black';
                          } else if (isSelected) {
                            btnCls = 'bg-[#fee2e2] border-[#ef4444] text-[#b91c1c] font-bold';
                          } else {
                            btnCls = 'bg-white/60 border-[#e2e8f0] text-[#64748b]';
                          }
                        }

                        return (
                          <button
                            key={oIdx}
                            type="button"
                            disabled={isConceptSubmitted}
                            onClick={() => {
                              setConceptAnswers({ ...conceptAnswers, [q.id]: oIdx });
                            }}
                            className={`w-full text-left p-2.5 rounded-lg border text-xs flex items-center gap-2.5 transition ${btnCls}`}
                          >
                            <span
                              className={`w-5 h-5 rounded grid place-items-center font-bold text-[10px] shrink-0 border ${
                                isConceptSubmitted && oIdx === q.ans
                                  ? 'bg-[#15803d] text-white border-[#15803d]'
                                  : isSelected
                                  ? 'bg-[#10b981] text-white border-[#059669]'
                                  : 'bg-white border-[#94a3b8] text-[#475569]'
                              }`}
                            >
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Explanation only shown AFTER submission */}
                  {isConceptSubmitted && (
                    <div className="mt-2 pt-2 border-t border-[#cbd5e1] text-xs">
                      <div className="bg-white border border-[#bfdbfe] rounded-lg p-2.5 text-[#1e3a8a]">
                        <strong>📖 Explanation:</strong> {q.expl}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Action Bar for Practice (NO BUTTON COVERED) */}
          <div className="bg-white border-2 border-[#10b981] rounded-2xl p-4 shadow-sm flex items-center justify-between flex-wrap gap-3">
            <div className="text-xs font-bold text-[#475569]">
              Attempted: <strong className="text-[#059669]">{conceptAttemptedCount}</strong> / 20 Questions
              {!isConceptSubmitted && conceptAttemptedCount < 20 && (
                <span className="text-[#92400e] ml-2 font-medium">({20 - conceptAttemptedCount} questions left)</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {isConceptSubmitted ? (
                <button
                  type="button"
                  onClick={() => {
                    setConceptAnswers({});
                    setIsConceptSubmitted(false);
                  }}
                  className="bg-white border border-[#cbd5e1] hover:bg-[#f1f5f9] text-[#475569] text-xs font-bold px-3.5 py-2 rounded-xl transition"
                >
                  Clear &amp; Re-attempt
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    if (conceptAttemptedCount === 0) {
                      alert('Please select answers for questions before submitting!');
                      return;
                    }
                    setIsConceptSubmitted(true);
                  }}
                  className="bg-[#10b981] hover:bg-[#059669] text-white text-xs font-black px-5 py-2.5 rounded-xl shadow-xs transition"
                >
                  Submit Practice (20-Q) &amp; Reveal Key →
                </button>
              )}
            </div>
          </div>
        </section>

        {/* =========================================================================
            FINAL 30-QUESTION TOUGH TEST ARENA
            CRITICAL USER DEMAND:
            1. "test start karne se pahle uska name jaroor dalwayo tabhi test kholo"
            2. "aur yaha pe answer turant na dikhe pahle enhe poore bharne do aur submit kare tab answer key kholna aur dikhao kitte galat kiye"
            3. "test submit karne ke baad 50 students ka data wahi show ho maan lo sumit ne diya to 20 marks aaye aise first 50 students test data save rahe"
            4. "koi bhi option me hindi nhi do aur na hi question me hindi"
            ========================================================================= */}
        <section id="test-arena" className="mt-14 bg-white border-3 border-[#34d399] rounded-2xl p-5 sm:p-8 shadow-md">
          
          {/* IDLE VIEW (NAME ENTRY REQUIRED BEFORE TEST OPENS) */}
          {examStatus === 'idle' && (
            <div className="max-w-2xl mx-auto py-6">
              <div className="text-center mb-6">
                <span className="inline-block text-xs font-black uppercase tracking-wider text-[#059669] bg-[#ecfdf5] border border-[#34d399] px-3.5 py-1 rounded-full mb-3">
                  Class 9th Tough Level · 30 Questions · Strict 15-Minute Exam
                </span>

                <h2 className="text-2xl sm:text-3xl font-black text-[#111827] mb-2 font-heading">
                  Final 30-Question Tough Determiners &amp; Articles Test
                </h2>

                <p className="text-xs sm:text-sm text-[#4b5563] leading-relaxed font-hi">
                  यह परीक्षा कक्षा 9वीं के सबसे कठिन और भ्रमित करने वाले प्रश्नों का मूल्यांकन करेगी: 
                  <strong>A vs An के ध्वन्यात्मक अपवाद (U.D.C., M.L.A., European, heir)</strong>, 
                  <strong>The के तुलनात्मक व ऐतिहासिक नियम</strong>, <strong>पर्वत शिखर बनाम पर्वत श्रृंखला</strong>, 
                  <strong>Omission नियम एवं Double Comparatives</strong>।
                </p>
              </div>

              {/* Student Name Input Box - REQUIRED BEFORE TEST CAN OPEN */}
              <div className="bg-[#f0fdf4] border-2 border-[#10b981] rounded-2xl p-6 shadow-xs mb-6">
                <div className="flex items-center gap-2 mb-2 text-[#059669]">
                  <GraduationCap className="w-5 h-5" />
                  <h3 className="font-black text-base sm:text-lg font-heading">
                    छात्र का नाम (Student Name Entry) - आवश्यक
                  </h3>
                </div>
                <p className="text-xs text-[#4b5563] mb-4 font-hi">
                  टेस्ट शुरू करने से पहले अपना पूरा नाम लिखें। टेस्ट सबमिट करने के बाद आपका नाम व प्राप्तांक 
                  (Score) <strong>50 छात्रों के रिकॉर्ड</strong> में सुरक्षित (Save) हो जाएंगे।
                </p>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1f2937] mb-1">
                      Full Name (e.g. Sumit Kumar / Priya Patel):
                    </label>
                    <input
                      id="student-name-input"
                      type="text"
                      value={studentName}
                      onChange={(e) => {
                        setStudentName(e.target.value);
                        if (nameError) setNameError(false);
                      }}
                      onKeyDown={(e) => e.key === 'Enter' && handleStartExam()}
                      placeholder="अपना नाम लिखें (Enter Your Name)..."
                      className="w-full py-2.5 px-4 bg-white border-2 border-[#cbd5e1] focus:border-[#10b981] rounded-xl text-sm font-bold text-[#0f172a] outline-none shadow-xs"
                    />
                    {nameError && (
                      <p className="text-xs text-[#dc2626] font-bold mt-1.5 flex items-center gap-1 font-hi">
                        <XCircle className="w-3.5 h-3.5" />
                        कृपया टेस्ट शुरू करने से पहले अपना नाम दर्ज करें! (Please enter your name)
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleStartExam}
                    className="w-full bg-[#10b981] hover:bg-[#059669] text-white font-black text-base py-3 rounded-xl shadow-[0_3px_0_#059669] transition active:translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-5 h-5 text-[#fde047]" />
                    Start 30-Question Tough Exam (15:00 Timer) →
                  </button>
                </div>
              </div>

              {/* Preview of Existing 50 Students Records */}
              <div className="bg-[#f8fafc] border border-[#cbd5e1] rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#059669]" />
                    <span className="font-extrabold text-xs text-[#0f172a]">
                      Recent 50 Students Test Records (छात्रों का रिकॉर्ड)
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-[#64748b]">
                    50 Records Live
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {studentsRoster.slice(0, 6).map((s, idx) => (
                    <div key={s.id || idx} className="bg-white p-2 rounded-lg border border-[#e2e8f0] flex items-center justify-between">
                      <span className="font-bold text-[#1e293b] truncate pr-1">{s.name}</span>
                      <span className="font-black text-[#059669] shrink-0">{s.score}/30</span>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-[#64748b] text-center mt-2.5">
                  टेस्ट सबमिट करने के बाद पूरा 50 छात्रों का विस्तृत लीडरबोर्ड व तुलना यहाँ दिखाई देगी!
                </p>
              </div>
            </div>
          )}

          {/* RUNNING VIEW (TEST IN PROGRESS - NO ANSWERS REVEALED UNTIL SUBMISSION) */}
          {examStatus === 'running' && (
            <div>
              {/* Sticky Top Status Bar (Safe clearance so no button is ever hidden or covered) */}
              <div className="bg-white border-2 border-[#10b981] rounded-xl p-3 flex items-center justify-between flex-wrap gap-2 mb-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div
                    className={`text-lg sm:text-xl font-black px-3 py-1 rounded-lg border font-heading ${
                      secondsLeft <= 120
                        ? 'bg-[#fee2e2] text-[#dc2626] border-[#ef4444] animate-pulse'
                        : 'bg-[#ecfdf5] text-[#059669] border-[#34d399]'
                    }`}
                  >
                    ⏱ {Math.floor(secondsLeft / 60)}:{secondsLeft % 60 < 10 ? '0' : ''}{secondsLeft % 60}
                  </div>
                  <div className="hidden sm:block text-xs font-bold text-[#475569]">
                    Student: <span className="text-[#059669]">{studentName}</span>
                  </div>
                </div>

                <div className="text-xs sm:text-sm font-bold text-[#059669]">
                  Attempted: <strong>{Object.keys(examAnswers).length}</strong> / 30 · Left: <strong>{30 - Object.keys(examAnswers).length}</strong>
                </div>

                {/* Explicitly styled Submit Test Button */}
                <button
                  type="button"
                  onClick={handleConfirmSubmit}
                  className="bg-[#10b981] hover:bg-[#059669] text-white font-extrabold text-xs px-4 py-2 rounded-xl shadow-xs transition"
                >
                  Submit Test ✓
                </button>
              </div>

              {/* Question Palette (1 to 30) */}
              <div className="bg-[#f8fafc] border border-[#cbd5e1] rounded-xl p-3 mb-4">
                <div className="flex items-center justify-between text-xs font-bold text-[#475569] mb-2">
                  <span>Question Palette (1-30):</span>
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span> Answered
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]"></span> Review
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-white border border-[#94a3b8]"></span> Left
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-10 sm:grid-cols-15 gap-1.5">
                  {toughExamQuestions.map((q, idx) => {
                    const isAnswered = examAnswers[q.id] !== undefined;
                    const isMarked = examReviewFlags[q.id];
                    const isCurrent = currentExamIndex === idx;

                    let bgCls = 'bg-white border-[#cbd5e1] text-[#475569]';
                    if (isAnswered) bgCls = 'bg-[#10b981] border-[#059669] text-white font-bold';
                    if (isMarked) bgCls = 'bg-[#f59e0b] border-[#d97706] text-white font-bold';
                    if (isCurrent) bgCls += ' ring-2 ring-[#059669] ring-offset-1';

                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => setCurrentExamIndex(idx)}
                        className={`h-7 rounded-md border text-xs font-bold flex items-center justify-center transition cursor-pointer ${bgCls}`}
                      >
                        {q.id}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Question Card (Pure English Question & Options) */}
              {(() => {
                const currentQ = toughExamQuestions[currentExamIndex];
                const userSel = examAnswers[currentQ.id];
                const isMarked = examReviewFlags[currentQ.id];

                return (
                  <div className="bg-white border-2 border-[#10b981] rounded-2xl p-5 sm:p-6 shadow-sm">
                    <div className="flex items-center justify-between flex-wrap gap-2 pb-3 mb-4 border-b border-[#e2e8f0]">
                      <span className="text-xs font-black text-[#059669] bg-[#ecfdf5] border border-[#34d399] px-2.5 py-0.5 rounded-md">
                        {currentQ.label}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setExamReviewFlags({ ...examReviewFlags, [currentQ.id]: !isMarked })}
                          className={`text-xs font-bold px-2.5 py-1 rounded-md border transition flex items-center gap-1 ${
                            isMarked
                              ? 'bg-[#fef3c7] text-[#92400e] border-[#f59e0b]'
                              : 'bg-white text-[#475569] border-[#cbd5e1]'
                          }`}
                        >
                          <Flag className="w-3.5 h-3.5 text-[#d97706]" />
                          {isMarked ? 'Marked for Review' : 'Mark for Review'}
                        </button>
                        <span className="text-xs font-bold text-[#64748b]">
                          Q {currentExamIndex + 1} of 30
                        </span>
                      </div>
                    </div>

                    {/* Pure English Question Prompt without Hindi */}
                    <h3 className="text-base sm:text-lg font-extrabold text-[#111827] mb-4 leading-snug">
                      Q{currentQ.id}. {currentQ.q}
                    </h3>

                    {/* Pure English Options without Hindi */}
                    <div className="space-y-2 mb-6">
                      {currentQ.opts.map((opt, oIdx) => {
                        const isSelected = userSel === oIdx;
                        return (
                          <button
                            key={oIdx}
                            type="button"
                            onClick={() => setExamAnswers({ ...examAnswers, [currentQ.id]: oIdx })}
                            className={`w-full text-left p-3 rounded-xl border-2 text-xs sm:text-sm flex items-center gap-3 transition ${
                              isSelected
                                ? 'bg-[#ecfdf5] border-[#10b981] text-[#065f46] font-bold'
                                : 'bg-white border-[#cbd5e1] hover:bg-[#f8fafc]'
                            }`}
                          >
                            <span
                              className={`w-6 h-6 rounded-md font-extrabold text-xs grid place-items-center border shrink-0 ${
                                isSelected
                                  ? 'bg-[#10b981] text-white border-[#059669]'
                                  : 'bg-[#f8fafc] text-[#475569] border-[#94a3b8]'
                              }`}
                            >
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Navigation and Action Controls (Wide and clearly spaced) */}
                    <div className="flex items-center justify-between flex-wrap gap-2 pt-4 border-t border-[#d1fae5]">
                      <button
                        type="button"
                        disabled={currentExamIndex === 0}
                        onClick={() => setCurrentExamIndex((prev) => prev - 1)}
                        className="border border-[#cbd5e1] disabled:opacity-40 bg-white hover:bg-[#f1f5f9] text-[#475569] text-xs font-bold px-4 py-2 rounded-xl transition"
                      >
                        ← Previous
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const newAns = { ...examAnswers };
                            delete newAns[currentQ.id];
                            setExamAnswers(newAns);
                          }}
                          className="border border-[#fca5a5] hover:bg-[#fee2e2] text-[#dc2626] text-xs font-bold px-3 py-2 rounded-xl transition"
                        >
                          Clear Selection
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (currentExamIndex < toughExamQuestions.length - 1) {
                              setCurrentExamIndex((prev) => prev + 1);
                            } else {
                              handleConfirmSubmit();
                            }
                          }}
                          className="bg-[#10b981] hover:bg-[#059669] text-white font-extrabold text-xs px-5 py-2 rounded-xl shadow-xs transition"
                        >
                          {currentExamIndex === toughExamQuestions.length - 1 ? 'Finish / Submit Test ✓' : 'Next Question →'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* RESULTS VIEW (STUDENT MARKS + 50 STUDENTS RECORDS + DETAILED ANSWER KEY) */}
          {examStatus === 'results' && (
            <div>
              {/* Score Header Card */}
              <div className="bg-white border-3 border-[#10b981] rounded-2xl p-6 shadow-md mb-8">
                <div className="flex items-center justify-between flex-wrap gap-3 pb-4 mb-4 border-b-2 border-[#a7f3d0]">
                  <div>
                    <span className="text-xs font-black uppercase text-[#059669] bg-[#ecfdf5] px-2.5 py-0.5 rounded-md border border-[#34d399]">
                      30-Question Examination Results · परिणाम
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-[#059669] font-heading mt-1">
                      Student: {studentName}
                    </h2>
                    <div className="text-xl sm:text-2xl font-black text-[#111827] mt-0.5">
                      Your Score: <span className="text-[#059669]">{examScore}</span> / 30 ({examAccuracy}%)
                    </div>
                    <div className="flex items-center flex-wrap gap-2 mt-2 text-xs sm:text-sm font-bold">
                      <span className="text-[#15803d] bg-[#dcfce7] px-2.5 py-1 rounded-lg border border-[#86efac]">
                        ✓ {examScore} प्रश्न सही (Correct)
                      </span>
                      <span className="text-[#dc2626] bg-[#fee2e2] px-2.5 py-1 rounded-lg border border-[#fca5a5]">
                        ✕ {examMistakesCount} प्रश्न गलत हुए ({examMistakesCount} Wrong)
                      </span>
                      <span className="text-[#475569] bg-[#f1f5f9] px-2.5 py-1 rounded-lg">
                        ⏱ Time Taken: {timeTakenFormatted}
                      </span>
                      {autoSubmitted && (
                        <span className="text-[#dc2626] bg-[#fee2e2] px-2.5 py-1 rounded-lg font-bold">
                          (Auto-submitted on timeout)
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setExamStatus('idle');
                    }}
                    className="bg-[#10b981] hover:bg-[#059669] text-white font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-[0_3px_0_#059669] transition active:translate-y-0.5 inline-flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-4 h-4" /> Retake Exam
                  </button>
                </div>

                <p className="text-xs text-[#065f46] font-hi">
                  आपका परिणाम सुरक्षित कर लिया गया है। नीचे <strong>50 विद्यार्थियों का लाइव रिकॉर्ड (Leaderboard)</strong> 
                  एवं उसके नीचे <strong>पूरी उत्तर कुंजी (Answer Key)</strong> दी गई है।
                </p>
              </div>

              {/* =========================================================================
                  50 STUDENTS TEST DATA & LEADERBOARD (PERSISTENT IN LOCAL STORAGE)
                  ========================================================================= */}
              <div className="bg-white border-2 border-[#10b981] rounded-2xl p-5 sm:p-6 shadow-sm mb-8">
                <div className="flex items-center justify-between flex-wrap gap-3 pb-3 mb-4 border-b border-[#a7f3d0]">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-[#d97706]" />
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-[#0f172a] font-heading">
                        50 Students Test Records (पिछले 50 विद्यार्थियों का टेस्ट डेटा)
                      </h3>
                      <p className="text-xs text-[#64748b]">
                         यहाँ परीक्षा देने वाले विद्यार्थियों के प्राप्तांक व गलतियों का रिकॉर्ड सुरक्षित है।
                      </p>
                    </div>
                  </div>

                  {/* Search box to find specific student */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                    <input
                      type="text"
                      value={rosterFilter}
                      onChange={(e) => setRosterFilter(e.target.value)}
                      placeholder="Search student name..."
                      className="pl-8 pr-3 py-1.5 text-xs bg-[#f8fafc] border border-[#cbd5e1] rounded-lg outline-none focus:border-[#10b981]"
                    />
                  </div>
                </div>

                {/* Leaderboard Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-[#f0fdf4] text-[#065f46] border-b border-[#a7f3d0]">
                        <th className="py-2.5 px-3 font-black">Rank #</th>
                        <th className="py-2.5 px-3 font-black">Student Name</th>
                        <th className="py-2.5 px-3 font-black">Score (Marks)</th>
                        <th className="py-2.5 px-3 font-black">Wrong Answers</th>
                        <th className="py-2.5 px-3 font-black">Accuracy</th>
                        <th className="py-2.5 px-3 font-black">Time Taken</th>
                        <th className="py-2.5 px-3 font-black">Date</th>
                        <th className="py-2.5 px-3 font-black">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e2e8f0]">
                      {displayedRoster.map((s, idx) => {
                        const isCurrentSubmission = s.id === currentStudentId || s.name === studentName;
                        const wrongCount = s.total - s.score;

                        return (
                          <tr
                            key={s.id || idx}
                            className={`transition ${
                              isCurrentSubmission
                                ? 'bg-[#fef9c3] font-bold border-l-4 border-l-[#eab308]'
                                : 'hover:bg-[#f8fafc]'
                            }`}
                          >
                            <td className="py-2.5 px-3 font-extrabold text-[#475569]">
                              {idx + 1}
                            </td>
                            <td className="py-2.5 px-3 font-bold text-[#0f172a] flex items-center gap-1.5">
                              {s.name}
                              {isCurrentSubmission && (
                                <span className="bg-[#10b981] text-white text-[10px] font-black px-1.5 py-0.2 rounded">
                                  YOU
                                </span>
                              )}
                            </td>
                            <td className="py-2.5 px-3 font-black text-[#059669]">
                              {s.score} / {s.total}
                            </td>
                            <td className="py-2.5 px-3 font-bold text-[#dc2626]">
                              {wrongCount} Wrong
                            </td>
                            <td className="py-2.5 px-3 font-semibold text-[#1e293b]">
                              {s.accuracy}%
                            </td>
                            <td className="py-2.5 px-3 text-[#64748b]">
                              {s.timeTaken}
                            </td>
                            <td className="py-2.5 px-3 text-[#64748b]">
                              {s.date}
                            </td>
                            <td className="py-2.5 px-3">
                              <span
                                className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                                  s.score >= 28
                                    ? 'bg-[#fef3c7] text-[#92400e]'
                                    : s.score >= 24
                                    ? 'bg-[#ecfdf5] text-[#059669]'
                                    : 'bg-[#f1f5f9] text-[#475569]'
                                }`}
                              >
                                {s.badge}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="mt-3 pt-2 border-t border-[#e2e8f0] flex items-center justify-between text-[11px] text-[#64748b]">
                  <span>Showing top {displayedRoster.length} students</span>
                  <span>Data stored in browser local storage</span>
                </div>
              </div>

              {/* Concept Mistake Diagnostics by Unit */}
              <div className="bg-[#fffbeb] border-2 border-[#fcd34d] rounded-2xl p-4 sm:p-5 mb-8">
                <h3 className="text-base sm:text-lg font-black text-[#92400e] font-heading mb-1">
                  🔍 गलतियों का कॉन्सेप्ट आधारित विश्लेषण (Concept Mistake Diagnostics)
                </h3>
                <p className="text-xs text-[#78350f] mb-3">
                  जिस इकाई (Unit) में गलती हुई हो, उस लिंक पर क्लिक करके सीधे उस नियम को दोबारा पढ़ें:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {Object.entries(unitStats).map(([key, u]) => {
                    const hasMistakes = u.mistakes.length > 0;
                    return (
                      <div
                        key={key}
                        className={`p-3 rounded-xl border text-xs ${
                          hasMistakes ? 'bg-[#fff5f5] border-[#fca5a5]' : 'bg-[#f0fdf4] border-[#a7f3d0]'
                        }`}
                      >
                        <strong className={`block mb-1 ${hasMistakes ? 'text-[#b91c1c]' : 'text-[#059669]'}`}>
                          {u.name}
                        </strong>
                        <p className="text-[#475569] mb-1">
                          Score: <strong>{u.correct} / {u.total}</strong> ({Math.round((u.correct / u.total) * 100)}%)
                        </p>
                        {hasMistakes ? (
                          <p className="text-[#dc2626] text-[11px] font-semibold mb-1.5">
                            ⚠️ Mistakes in Q: {u.mistakes.join(', ')}
                          </p>
                        ) : (
                          <p className="text-[#16a34a] text-[11px] font-bold mb-1.5">
                            ✓ All concepts mastered!
                          </p>
                        )}
                        <a
                          href={`#${u.anchor}`}
                          className="text-[#059669] hover:underline font-bold text-[11px] block"
                        >
                          Revise Rule in Theory →
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Comprehensive Answer Key (All 30 Questions) */}
              <h3 className="text-xl font-black text-[#111827] mb-3 font-heading">
                Comprehensive Answer Key &amp; Review (30 Questions):
              </h3>

              <div className="space-y-3.5">
                {toughExamQuestions.map((q) => {
                  const u = examAnswers[q.id];
                  const isRight = u === q.ans;
                  const isSkipped = u === undefined;

                  return (
                    <div
                      key={q.id}
                      className={`border-2 rounded-xl p-4 text-xs sm:text-sm ${
                        isRight
                          ? 'bg-[#f0fdf4] border-[#a7f3d0]'
                          : 'bg-[#fff5f5] border-[#fca5a5]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-bold text-[#475569] bg-white px-2 py-0.5 rounded border border-[#cbd5e1]">
                          {q.label}
                        </span>
                        <span className={`font-black text-xs ${isRight ? 'text-[#15803d]' : 'text-[#b91c1c]'}`}>
                          {isRight ? '✓ Correct (+1)' : isSkipped ? '⚪ Skipped (0)' : '✕ Incorrect (0)'}
                        </span>
                      </div>

                      {/* Pure English Question */}
                      <h4 className="font-extrabold text-[#111827] mb-2">
                        Q{q.id}. {q.q}
                      </h4>

                      {/* Choices with Correct vs Selected */}
                      <div className="space-y-1 mb-2.5 text-xs">
                        <p>
                          <strong>Correct Answer:</strong>{' '}
                          <span className="text-[#15803d] font-bold">
                            ({String.fromCharCode(65 + q.ans)}) {q.opts[q.ans]}
                          </span>
                        </p>
                        {!isRight && !isSkipped && (
                          <p>
                            <strong>Your Choice:</strong>{' '}
                            <span className="text-[#b91c1c] font-bold">
                              ({String.fromCharCode(65 + u)}) {q.opts[u]}
                            </span>
                          </p>
                        )}
                      </div>

                      <div className="bg-white border border-[#cbd5e1] rounded-lg p-2.5 text-xs text-[#065f46]">
                        <strong>📖 Explanation:</strong> {q.expl}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>

      </main>

      {/* Warning Modal when submitting incomplete exam */}
      {showWarningModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white border-3 border-[#f59e0b] rounded-2xl max-w-md w-full p-6 text-center shadow-2xl">
            <div className="text-3xl mb-2">⚠️</div>
            <h3 className="font-black text-lg text-[#111827] mb-1 font-heading">
              Unattempted Questions Warning
            </h3>
            <p className="text-xs sm:text-sm text-[#4b5563] font-hi mb-5">
              आपने 30 में से केवल <strong>{Object.keys(examAnswers).length} प्रश्न हल किए हैं</strong> ({30 - Object.keys(examAnswers).length} प्रश्न अभी शेष हैं)। क्या आप सचमुच सबमिट करना चाहते हैं?
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setShowWarningModal(false)}
                className="bg-[#10b981] hover:bg-[#059669] text-white font-extrabold text-xs px-4 py-2 rounded-xl transition shadow-xs"
              >
                Continue Test (हल करते रहें)
              </button>
              <button
                type="button"
                onClick={() => finishExam(false)}
                className="border border-[#cbd5e1] hover:bg-[#f1f5f9] text-[#64748b] font-bold text-xs px-3.5 py-2 rounded-xl transition"
              >
                Submit Anyway
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-white border-t-2 border-[#a7f3d0] py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between flex-wrap gap-4 text-xs text-[#64748b]">
          <div>
            <strong className="text-[#059669] text-sm font-black font-heading block">
              Econova.vip ✦
            </strong>
            <span>Class 9 General English · Chapter: Determiners (Articles: A, An, The &amp; Beyond)</span>
          </div>
          <div className="flex items-center gap-4 font-bold text-[#059669]">
            <a href="#main" className="hover:underline">Top ↑</a>
            <a href="#topic-intro" className="hover:underline">Intro</a>
            <a href="#topic-indefinite" className="hover:underline">A &amp; An</a>
            <a href="#topic-definite" className="hover:underline">The</a>
            <a href="#topic-exercises" className="hover:underline">Exercises</a>
            <a href="#topic-concept" className="hover:underline">20-Q Practice</a>
            <a href="#test-arena" className="hover:underline">30-Q Test</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
