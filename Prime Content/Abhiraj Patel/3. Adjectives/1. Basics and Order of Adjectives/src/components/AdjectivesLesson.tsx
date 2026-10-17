import React, { useState, useEffect } from 'react';
import { CONCEPT_QUESTIONS, TEST_QUESTIONS, SUB_PAIRS } from '../data/grammarData';
import { ConceptQuestion, TestQuestion } from '../types';
import { 
  CheckCircle2, XCircle, RotateCcw, AlertCircle, Clock, 
  HelpCircle, ChevronRight, ChevronLeft, Flag, Check, BookOpen 
} from 'lucide-react';

interface AdjectivesLessonProps {
  onFirstAttempt: (data: { questionId: string; isCorrect: boolean }) => void;
  onExamCompleted: (stats: { correctCount: number; totalCount: number; percentage: number }) => void;
}

export const AdjectivesLesson: React.FC<AdjectivesLessonProps> = ({
  onFirstAttempt,
  onExamCompleted,
}) => {
  // Concept practice state
  const [conceptUserAnswers, setConceptUserAnswers] = useState<Record<number, number>>({});
  const [conceptChecked, setConceptChecked] = useState<Record<number, boolean>>({});
  const [conceptAttemptedFirst, setConceptAttemptedFirst] = useState<Set<number>>(new Set());

  // Test state
  const [testState, setTestState] = useState<'idle' | 'running' | 'results'>('idle');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [testAnswers, setTestAnswers] = useState<Record<number, number>>({});
  const [testReview, setTestReview] = useState<Record<number, boolean>>({});
  const [testAttemptedFirst, setTestAttemptedFirst] = useState<Set<number>>(new Set());
  const [secondsLeft, setSecondsLeft] = useState(15 * 60);
  const [isTimeOut, setIsTimeOut] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Timer effect for test
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (testState === 'running') {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval!);
            handleFinishExam(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [testState]);

  // Handle concept option selection
  const handleSelectConcept = (q: ConceptQuestion, optIdx: number) => {
    if (conceptChecked[q.id]) return;

    // First attempt check
    if (!conceptAttemptedFirst.has(q.id)) {
      setConceptAttemptedFirst((prev) => new Set(prev).add(q.id));
      const isCorrect = optIdx === q.ans;
      onFirstAttempt({
        questionId: `concept_${q.id}`,
        isCorrect: isCorrect,
      });
    }

    setConceptUserAnswers((prev) => ({ ...prev, [q.id]: optIdx }));
  };

  const handleCheckConcept = (qId: number) => {
    if (conceptUserAnswers[qId] === undefined) {
      alert('कृपया पहले कोई एक विकल्प चुनें! (Please select an option first)');
      return;
    }
    setConceptChecked((prev) => ({ ...prev, [qId]: true }));
  };

  const handleResetConcept = (qId: number) => {
    setConceptUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });
    setConceptChecked((prev) => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });
  };

  // Test controls
  const handleStartExam = () => {
    setCurrentIdx(0);
    setSecondsLeft(15 * 60);
    setTestAnswers({});
    setTestReview({});
    setTestAttemptedFirst(new Set());
    setIsTimeOut(false);
    setTestState('running');

    // Scroll to test arena
    const el = document.getElementById('test-arena');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectTestOpt = (q: TestQuestion, optIdx: number) => {
    // First attempt tracking
    if (!testAttemptedFirst.has(q.id)) {
      setTestAttemptedFirst((prev) => new Set(prev).add(q.id));
      const isCorrect = optIdx === q.ans;
      onFirstAttempt({
        questionId: `test_${q.id}`,
        isCorrect: isCorrect,
      });
    }

    setTestAnswers((prev) => ({ ...prev, [q.id]: optIdx }));
  };

  const handleClearTestAnswer = () => {
    const q = TEST_QUESTIONS[currentIdx];
    setTestAnswers((prev) => {
      const copy = { ...prev };
      delete copy[q.id];
      return copy;
    });
  };

  const handleToggleReview = () => {
    const q = TEST_QUESTIONS[currentIdx];
    setTestReview((prev) => ({ ...prev, [q.id]: !prev[q.id] }));
  };

  const handleFinishExam = (timeout = false) => {
    setIsTimeOut(timeout);
    setShowSubmitModal(false);
    setTestState('results');

    let correct = 0;
    TEST_QUESTIONS.forEach((q) => {
      if (testAnswers[q.id] === q.ans) {
        correct++;
      }
    });

    onExamCompleted({
      correctCount: correct,
      totalCount: TEST_QUESTIONS.length,
      percentage: Math.round((correct / TEST_QUESTIONS.length) * 100),
    });

    const el = document.getElementById('test-arena');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
  };

  // Calculate results diagnostics
  const getExamResults = () => {
    let correct = 0;
    const unitStats: Record<string, { title: string; mistakes: number[]; total: number; anchor: string }> = {
      kinds: { title: 'Unit 01: Kinds & Participles', mistakes: [], total: 6, anchor: '#topic-1' },
      agreement: { title: 'Unit 02: Agreement & Prepositions', mistakes: [], total: 6, anchor: '#topic-2' },
      position: { title: 'Unit 03: Position & Link Verbs', mistakes: [], total: 6, anchor: '#topic-3' },
      traps: { title: 'Unit 04: Meaning Shifts & Traps', mistakes: [], total: 6, anchor: '#topic-4' },
      order: { title: 'Unit 05: Order of Adjectives', mistakes: [], total: 6, anchor: '#topic-5' },
    };

    TEST_QUESTIONS.forEach((q, idx) => {
      const uChoice = testAnswers[q.id];
      if (uChoice === q.ans) {
        correct++;
      } else {
        unitStats[q.unit]?.mistakes.push(idx + 1);
      }
    });

    const percentage = Math.round((correct / TEST_QUESTIONS.length) * 100);
    return { correct, percentage, unitStats };
  };

  return (
    <div className="max-w-[1180px] mx-auto px-4 py-6">
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-8 border-b-2 border-emerald-200">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 bg-white border border-emerald-400 rounded-full px-3.5 py-1 text-xs text-emerald-800 font-bold shadow-xs mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            Class 4–10 English Grammar · Chapter 3: Adjectives
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight mb-3">
            Master <span className="text-emerald-700">Adjectives &amp; Rules</span>
            <br />
            <span className="text-2xl sm:text-3xl font-bold text-slate-700 font-hi">
              विशेषण के प्रकार, स्थिति और क्रम.
            </span>
          </h1>

          <p className="text-slate-600 text-sm leading-relaxed mb-5">
            English Grammar में <strong>Adjective (विशेषण)</strong> संज्ञा या सर्वनाम की विशेषता बताता है। इसके <strong>6 Kinds</strong>, <strong>Active vs Passive Participles (-ing vs -ed)</strong>, <strong>Agreement &amp; Fixed Prepositions</strong>, <strong>Attributive vs Predicative Position</strong>, <strong>Link Verbs vs Action Verbs (Adjective vs Adverb का जाल)</strong>, <strong>Meaning Shifts (small farmer, early/late)</strong>, तथा <strong>विशेषणों का क्रम (OSASCOMP + little/old/young)</strong> को यहाँ 20 उदाहरणों व 15 मिनट के 30-प्रश्नों के टाइमर टेस्ट के साथ सीखें।
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#topic-1"
              className="bg-emerald-600 hover:bg-emerald-700 active:translate-y-0.5 text-white font-black py-2.5 px-5 rounded-2xl shadow-[0_3px_0_#047857] transition text-sm inline-flex items-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>नियम एवं 20 अभ्यास प्रश्न पढ़ें →</span>
            </a>
            <button
              type="button"
              onClick={handleStartExam}
              className="bg-teal-700 hover:bg-teal-800 active:translate-y-0.5 text-white font-black py-2.5 px-5 rounded-2xl shadow-[0_3px_0_#0f766e] transition text-sm inline-flex items-center gap-2 cursor-pointer"
            >
              <Clock className="w-4 h-4" />
              <span>⏱ 30-Question Test (15m)</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 bg-amber-50 border-3 border-amber-300 rounded-3xl p-5 shadow-sm">
          <p className="text-[11px] font-black uppercase tracking-wider text-emerald-800 font-heading">
            The Golden Rules · मुख्य सिद्धांत
          </p>
          <div className="text-2xl font-black text-emerald-900 my-1">
            Form, Position &amp; Order!
          </div>
          <div className="text-xs text-slate-700 leading-relaxed bg-white p-3.5 rounded-2xl border border-amber-200 space-y-1.5 font-hi">
            <p>• <strong>Participles:</strong> <em>-ing</em> प्रभावक/कारण है (<em>boring, tiring</em>); <em>-ed</em> असर महसूस करने वाला (<em>bored, tired</em>)।</p>
            <p>• <strong>Agreement:</strong> केवल <em>this/that</em> बहुवचन में <em>these/those</em> बनते हैं; अन्य विशेषण कभी नहीं बदलते!</p>
            <p>• <strong>Link Verbs:</strong> Adverbs नहीं, बल्कि Adjectives लेते हैं (<em>He looked calm</em> ✓, NOT <em>calmly</em>)।</p>
            <p>• <strong>Predicative Only:</strong> <em>afraid, asleep, alone, alive</em> कभी संज्ञा से पहले नहीं आते।</p>
            <p>• <strong>Order:</strong> Size → Quality → Age/Little → Shape → Colour → Material → Origin → Purpose!</p>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* UNIT 01: KINDS OF ADJECTIVES & PARTICIPLES */}
      {/* ==================================================== */}
      <section id="topic-1" className="py-8 border-b-2 border-emerald-100">
        <div className="mb-4">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
            Unit 01 · Fundamentals
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            1. Kinds of Adjectives &amp; Participles (विशेषण के प्रकार और कृदंत)
          </h2>
        </div>

        {/* 1A: 6 Kinds */}
        <article className="bg-white border-2 border-emerald-200 rounded-3xl p-5 sm:p-6 mb-6 shadow-xs">
          <div className="flex justify-between items-center flex-wrap gap-2 mb-3">
            <h3 className="text-lg font-black text-slate-900">
              A. Six Main Kinds of Adjectives (विशेषण के छह भेद)
            </h3>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Core Concept
            </span>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-xs sm:text-sm text-blue-950 font-hi leading-relaxed mb-4">
            👉 <strong>विस्तृत अवधारणा (Detailed Breakdown):</strong><br />
            1. <strong>Demonstrative (संकेतवाचक):</strong> किसी निश्चित वस्तु या व्यक्ति की ओर इशारा करने वाले — <em>this, that, these, those</em>.<br />
            2. <strong>Distributive (विभागसूचक):</strong> समूह के प्रत्येक व्यक्ति या वस्तु का अलग-अलग बोध कराने वाले — <em>each, every, either, neither</em>.<br />
            3. <strong>Quantitative (परिमाण व संख्यावाचक):</strong> मात्रा या संख्या बताने वाले — <em>some, any, no; little, few; many, much; one, twenty</em>.<br />
            4. <strong>Interrogative (प्रश्नवाचक):</strong> संज्ञा के साथ प्रश्न पूछने वाले — <em>which, what, whose</em>.<br />
            5. <strong>Possessive (संबंधसूचक):</strong> स्वामित्व या अपनापन दर्शाने वाले — <em>my, your, his, her, its, our, their</em>.<br />
            6. <strong>Of Quality (गुणवाचक):</strong> रंग, रूप, आकार, स्वभाव या गुण-दोष बताने वाले — <em>clever, dry, fat, golden, good, heavy, square</em>.
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl mb-4 bg-white">
            <table className="w-full text-left text-xs border-collapse min-w-[500px]">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-2.5">Kind of Adjective</th>
                  <th className="p-2.5">परिभाषा (Meaning)</th>
                  <th className="p-2.5">Textbook Examples</th>
                  <th className="p-2.5">पहचान नियम</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-2.5 font-bold text-emerald-800">Demonstrative</td>
                  <td className="p-2.5">निश्चित व्यक्ति/वस्तु की ओर इशारा</td>
                  <td className="p-2.5 italic">this book, that man, these cats</td>
                  <td className="p-2.5">This/that का बहुवचन these/those</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-emerald-800">Distributive</td>
                  <td className="p-2.5">समूह के प्रत्येक का अलग बोध</td>
                  <td className="p-2.5 italic">each boy, every day, either side</td>
                  <td className="p-2.5">हमेशा एकवचन संज्ञा के साथ</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-emerald-800">Quantitative</td>
                  <td className="p-2.5">मात्रा या संख्या का बोध</td>
                  <td className="p-2.5 italic">some water, much sugar, few friends</td>
                  <td className="p-2.5">Countable (few, many) vs Uncountable (little, much)</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-emerald-800">Interrogative</td>
                  <td className="p-2.5">संज्ञा के साथ प्रश्न पूछना</td>
                  <td className="p-2.5 italic">which boy, what question, whose dog</td>
                  <td className="p-2.5">संज्ञा के ठीक पहले प्रयुक्त</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-emerald-800">Possessive</td>
                  <td className="p-2.5">अधिकार व संबंध दर्शाना</td>
                  <td className="p-2.5 italic">my brother, your car, their house</td>
                  <td className="p-2.5">संज्ञा से पहले (Pronouns से अलग)</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-emerald-800">Of Quality</td>
                  <td className="p-2.5">रंग, आकार, गुण व स्थिति</td>
                  <td className="p-2.5 italic">clever girl, heavy box, golden ring</td>
                  <td className="p-2.5">Attributive व Predicative दोनों संभव</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 2 Concept Practice Questions for 1A */}
          {renderConceptPairBox(0, '1A. Six Kinds of Adjectives')}
        </article>

        {/* 1B: Participles -ing vs -ed */}
        <article className="bg-white border-2 border-emerald-200 rounded-3xl p-5 sm:p-6 mb-6 shadow-xs">
          <div className="flex justify-between items-center flex-wrap gap-2 mb-3">
            <h3 className="text-lg font-black text-slate-900">
              B. Participles as Adjectives: Present (-ing) vs Past (-ed)
            </h3>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Active vs Passive
            </span>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-xs sm:text-sm text-blue-950 font-hi leading-relaxed mb-4">
            👉 <strong>सक्रिय बनाम निष्क्रिय का नियम (Active vs Passive):</strong><br />
            • <strong>Present Participle (-ing):</strong> यह <strong>Active (सक्रिय)</strong> होता है। इसका अर्थ होता है <em>'having this effect'</em> (प्रभाव या अनुभूति पैदा करने वाला/कारण)।<br />
            • <strong>Past Participle (-ed):</strong> यह <strong>Passive (निष्क्रिय)</strong> होता है। इसका अर्थ होता है <em>'affected in this way'</em> (उस प्रभाव या असर को महसूस करने वाला)।
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl mb-4 bg-white">
            <table className="w-full text-left text-xs border-collapse min-w-[500px]">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-2.5">Present Participle (-ing) [Active: प्रभावक]</th>
                  <th className="p-2.5">Past Participle (-ed) [Passive: प्रभावित]</th>
                  <th className="p-2.5">हिंदी व्याख्या व संदर्भ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-2.5 font-bold">The play was boring. (नाटक उबाऊ था)</td>
                  <td className="p-2.5 font-bold text-emerald-800">The audience was bored. (दर्शक ऊब गए)</td>
                  <td className="p-2.5 text-slate-600">-ing कारक है, -ed वह अवस्था है जो दर्शक ने महसूस की।</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">The work was tiring. (काम थका देने वाला था)</td>
                  <td className="p-2.5 font-bold text-emerald-800">The workers were soon tired. (मज़दूर थक गए)</td>
                  <td className="p-2.5 text-slate-600">काम में थका देने का गुण था (-ing); मज़दूर थके हुए थे (-ed)।</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">The scene was horrifying. (दृश्य डरावना था)</td>
                  <td className="p-2.5 font-bold text-emerald-800">The spectators were horrified. (दर्शक भयभीत हुए)</td>
                  <td className="p-2.5 text-slate-600">दृश्य ने डर पैदा किया (-ing); दर्शकों पर डर का असर हुआ (-ed)।</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">An infuriating woman (गुस्सा दिलाने वाली)</td>
                  <td className="p-2.5 font-bold text-emerald-800">An infuriated woman (क्रोधित महिला)</td>
                  <td className="p-2.5 text-slate-600">Infuriating: उसने हमें गुस्सा दिलाया; Infuriated: वह स्वयं गुस्से में है।</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 2 Concept Practice Questions for 1B */}
          {renderConceptPairBox(2, '1B. Participles (-ing vs -ed)')}
        </article>
      </section>

      {/* ==================================================== */}
      {/* UNIT 02: AGREEMENT & FIXED PREPOSITIONS */}
      {/* ==================================================== */}
      <section id="topic-2" className="py-8 border-b-2 border-emerald-100">
        <div className="mb-4">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
            Unit 02 · Agreement &amp; Prepositions
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            2. Agreement &amp; Fixed Prepositions (लिंग-वचन और Prepositions)
          </h2>
        </div>

        {/* 2A: Agreement */}
        <article className="bg-white border-2 border-emerald-200 rounded-3xl p-5 sm:p-6 mb-6 shadow-xs">
          <div className="flex justify-between items-center flex-wrap gap-2 mb-3">
            <h3 className="text-lg font-black text-slate-900">
              A. Agreement of Adjectives: Rule of Invariance &amp; Demonstratives
            </h3>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Core Rule
            </span>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-xs sm:text-sm text-blue-950 font-hi leading-relaxed mb-4">
            👉 <strong>अपरिवर्तनशीलता का नियम (No Plural for Adjectives):</strong><br />
            अंग्रेज़ी में विशेषण एकवचन/बहुवचन या पुल्लिंग/स्त्रीलिंग के अनुसार अपना रूप <strong>कभी नहीं बदलते</strong>:<br />
            • <em>a <strong>good</strong> boy</em> → <em><strong>good</strong> boys</em> (अच्छे लड़के) [कभी 'goods boys' न लिखें ✗]<br />
            • <em>a <strong>clever</strong> girl</em> → <em><strong>clever</strong> girls</em> [कभी 'clevers girls' न लिखें ✗]<br /><br />
            ⚠️ <strong>एकमात्र अपवाद (The Only Exception):</strong><br />
            संकेतवाचक विशेषण <strong>this</strong> और <strong>that</strong> बहुवचन संज्ञाओं के पहले बदलकर क्रमशः <strong>these</strong> और <strong>those</strong> हो जाते हैं:<br />
            • <em><strong>this</strong> cat</em> → <em><strong>these</strong> cats</em><br />
            • <em><strong>that</strong> man</em> → <em><strong>those</strong> men</em>
          </div>

          {renderConceptPairBox(4, '2A. Agreement & Demonstratives')}
        </article>

        {/* 2B: Fixed Prepositions */}
        <article className="bg-white border-2 border-emerald-200 rounded-3xl p-5 sm:p-6 mb-6 shadow-xs">
          <div className="flex justify-between items-center flex-wrap gap-2 mb-3">
            <h3 className="text-lg font-black text-slate-900">
              B. Adjectives and Participles Followed by Fixed Prepositions
            </h3>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Fixed Prepositions
            </span>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl mb-4 bg-white">
            <table className="w-full text-left text-xs border-collapse min-w-[500px]">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-2.5">Adjective + Preposition</th>
                  <th className="p-2.5">Hindi Meaning (सरल अर्थ)</th>
                  <th className="p-2.5">Example Sentence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-2.5 font-bold text-emerald-800">good at</td>
                  <td className="p-2.5">किसी काम या विषय में निपुण होना</td>
                  <td className="p-2.5 italic">She is <strong>good at</strong> mathematics and chess.</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-emerald-800">tired of</td>
                  <td className="p-2.5">किसी बात से ऊब या तंग आ जाना</td>
                  <td className="p-2.5 italic">I am <strong>tired of</strong> your endless excuses.</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-emerald-800">afraid of</td>
                  <td className="p-2.5">किसी चीज़ से डरना / भयभीत होना</td>
                  <td className="p-2.5 italic">The little boy is <strong>afraid of</strong> the dark.</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-emerald-800">fond of</td>
                  <td className="p-2.5">किसी चीज़ का शौकीन होना / पसंद करना</td>
                  <td className="p-2.5 italic">She is very <strong>fond of</strong> classical music.</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-emerald-800">interested in</td>
                  <td className="p-2.5">किसी विषय में रुचि रखना</td>
                  <td className="p-2.5 italic">Are you <strong>interested in</strong> modern art?</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-emerald-800">proud of</td>
                  <td className="p-2.5">गर्व महसूस करना</td>
                  <td className="p-2.5 italic">They are extremely <strong>proud of</strong> their daughter.</td>
                </tr>
              </tbody>
            </table>
          </div>

          {renderConceptPairBox(6, '2B. Fixed Prepositions')}
        </article>
      </section>

      {/* ==================================================== */}
      {/* UNIT 03: POSITION & LINK VERBS */}
      {/* ==================================================== */}
      <section id="topic-3" className="py-8 border-b-2 border-emerald-100">
        <div className="mb-4">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
            Unit 03 · Position &amp; Copulas
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            3. Attributive vs Predicative &amp; Link Verbs (स्थिति व कॉपुला)
          </h2>
        </div>

        {/* 3A: Position */}
        <article className="bg-white border-2 border-emerald-200 rounded-3xl p-5 sm:p-6 mb-6 shadow-xs">
          <div className="flex justify-between items-center flex-wrap gap-2 mb-3">
            <h3 className="text-lg font-black text-slate-900">
              A. Attributive Position vs Predicative Position (Copulas)
            </h3>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Position 1 &amp; 2
            </span>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-xs sm:text-sm text-blue-950 font-hi leading-relaxed mb-4">
            👉 <strong>1. Attributive Position (संज्ञा से ठीक पहले):</strong><br />
            Demonstrative, Distributive, Quantitative, Interrogative, और Possessive हमेशा अपनी <strong>संज्ञा से पहले</strong> आते हैं:<br />
            • <em><strong>this</strong> book</em> • <em><strong>which</strong> boy</em> • <em><strong>my</strong> dog</em> • <em><strong>every</strong> child</em>.<br />
            जब कोई गुणवाचक विशेषण संज्ञा के ठीक पहले बैठे, तो उसे <strong>Attributive</strong> कहते हैं (<em>a rich man, a happy girl</em>)।<br /><br />
            👉 <strong>2. Predicative Position (लिंकिंग क्रिया के बाद):</strong><br />
            जब विशेषण क्रिया के बाद आकर कर्ता की स्थिति या रूप बताता है, तो उसे <strong>Predicative Adjective</strong> कहते हैं:<br />
            • <strong>Copulas:</strong> <em>be, become, seem</em>: <em>Tom became <strong>rich</strong>.</em> / <em>Ann seems <strong>happy</strong>.</em><br />
            • <strong>Sensory Verbs:</strong> <em>appear, feel, look, smell, sound, taste</em>: <em>The soup smells <strong>delicious</strong>.</em>
          </div>

          {renderConceptPairBox(8, '3A. Attributive vs Predicative')}
        </article>

        {/* 3B: Link Verb vs Action Verb */}
        <article className="bg-white border-2 border-emerald-200 rounded-3xl p-5 sm:p-6 mb-6 shadow-xs">
          <div className="flex justify-between items-center flex-wrap gap-2 mb-3">
            <h3 className="text-lg font-black text-slate-900">
              B. Critical Trap: Link Verb + Adjective vs Action Verb + Adverb
            </h3>
            <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
              High-Yield Exam Trap
            </span>
          </div>

          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-xs sm:text-sm text-rose-950 font-hi leading-relaxed mb-4">
            ⚠️ <strong>परीक्षा का सबसे बड़ा जाल (Adjective vs Adverb Trap):</strong><br />
            जब ये संवेदी क्रियाएँ लिंकिंग क्रिया न होकर <strong>सक्रिय शारीरिक क्रिया (deliberate physical action)</strong> दर्शाती हैं, तो ये <strong>Adverb (क्रियाविशेषण)</strong> लेती हैं!
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl mb-4 bg-white">
            <table className="w-full text-left text-xs border-collapse min-w-[500px]">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-2.5">Verb</th>
                  <th className="p-2.5">Link Verb + Adjective (अवस्था / रूप)</th>
                  <th className="p-2.5">Action Verb + Adverb (सक्रिय क्रिया / ढंग)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-2.5 font-bold">look</td>
                  <td className="p-2.5"><em>He looked <strong>calm</strong>.</em> (वह शांत दिख रहा था)</td>
                  <td className="p-2.5"><em>He looked <strong>calmly</strong> at the crowd.</em> (उसने शांतिपूर्वक देखा)</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">turn</td>
                  <td className="p-2.5"><em>She turned <strong>pale</strong>.</em> (उसका रंग पीला पड़ गया)</td>
                  <td className="p-2.5"><em>He turned <strong>angrily</strong> to the man.</em> (वह गुस्से से मुड़ा)</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">taste</td>
                  <td className="p-2.5"><em>The soup tasted <strong>horrible</strong>.</em> (सूप का स्वाद घटिया था)</td>
                  <td className="p-2.5"><em>He tasted the soup <strong>suspiciously</strong>.</em> (उसने शक से चखा)</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">feel</td>
                  <td className="p-2.5"><em>Tom felt <strong>cold</strong>.</em> (टॉम को ठंड लगी)</td>
                  <td className="p-2.5"><em>The doctor felt the pulse <strong>carefully</strong>.</em> (सावधानी से नब्ज़ जाँची)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {renderConceptPairBox(10, '3B. Link Verbs vs Action Verbs')}
        </article>
      </section>

      {/* ==================================================== */}
      {/* UNIT 04: MEANING SHIFTS & TRAPS */}
      {/* ==================================================== */}
      <section id="topic-4" className="py-8 border-b-2 border-emerald-100">
        <div className="mb-4">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
            Unit 04 · Position Traps
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            4. Meaning Shifts, Position Traps &amp; 'And'
          </h2>
        </div>

        {/* 4A: Meaning shifts */}
        <article className="bg-white border-2 border-emerald-200 rounded-3xl p-5 sm:p-6 mb-6 shadow-xs">
          <div className="flex justify-between items-center flex-wrap gap-2 mb-3">
            <h3 className="text-lg font-black text-slate-900">
              A. Meaning Shifts (Small Farmer vs Farmer is Small) &amp; Early/Late/Poor
            </h3>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Context Shifts
            </span>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-xs sm:text-sm text-blue-950 font-hi leading-relaxed mb-4">
            👉 <strong>स्थान बदलने पर अर्थ बदलना:</strong><br />
            • <strong>a small farmer:</strong> छोटे खेत का मालिक (a man who has a small farm)।<br />
            • <strong>The farmer is small:</strong> शारीरिक कद में नाटा/छोटा व्यक्ति (he is small in stature)!<br /><br />
            • <strong>an old friend:</strong> पुराना मित्र जिसे बहुत वर्षों से जानते हैं (a friend of long standing)।<br />
            • <strong>The friend is old:</strong> मित्र उम्र में बूढ़ा/वृद्ध है (aged in biological years)!<br /><br />
            • <strong>early/late train:</strong> समय सारिणी के अनुसार सुबह या देर रात चलने वाली ट्रेन (scheduled early/late)।
          </div>

          {renderConceptPairBox(12, '4A. Meaning Shifts & Early/Late/Poor')}
        </article>

        {/* 4B: Attributive only vs predicative only */}
        <article className="bg-white border-2 border-emerald-200 rounded-3xl p-5 sm:p-6 mb-6 shadow-xs">
          <div className="flex justify-between items-center flex-wrap gap-2 mb-3">
            <h3 className="text-lg font-black text-slate-900">
              B. Attributive-Only vs Predicative-Only &amp; The Use of 'And'
            </h3>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Position Traps
            </span>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl mb-4 bg-white">
            <table className="w-full text-left text-xs border-collapse min-w-[500px]">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-2.5">वर्ग (Category)</th>
                  <th className="p-2.5">शब्द सूची (List)</th>
                  <th className="p-2.5">नियम व उदाहरण (Grammar Rule)</th>
                  <th className="p-2.5">अशुद्ध प्रयोग ✗</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-2.5 font-bold text-emerald-800">Attributive ONLY</td>
                  <td className="p-2.5 font-bold">chief, main, principal, sheer, utter</td>
                  <td className="p-2.5">केवल संज्ञा से पहले: <em>the main reason, sheer luck</em></td>
                  <td className="p-2.5 text-rose-600 font-bold">The reason is main ✗</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-rose-800">Predicative ONLY</td>
                  <td className="p-2.5 font-bold">afraid, asleep, alike, alive, alone, ashamed</td>
                  <td className="p-2.5">केवल क्रिया के बाद: <em>The baby is asleep. He was alone.</em></td>
                  <td className="p-2.5 text-rose-600 font-bold">an asleep baby ✗ (use a sleeping baby)</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-teal-800">Both Allowed</td>
                  <td className="p-2.5 font-bold">frightened</td>
                  <td className="p-2.5"><em>a frightened child ✓ / The child was frightened ✓</em></td>
                  <td className="p-2.5 text-slate-500">afraid केवल क्रिया के बाद, frightened दोनों जगह</td>
                </tr>
              </tbody>
            </table>
          </div>

          {renderConceptPairBox(14, '4B. Attributive-Only & Predicative-Only')}
        </article>
      </section>

      {/* ==================================================== */}
      {/* UNIT 05: ORDER OF ADJECTIVES OF QUALITY */}
      {/* ==================================================== */}
      <section id="topic-5" className="py-8 border-b-2 border-emerald-100">
        <div className="mb-4">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
            Unit 05 · Word Order
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            5. Order of Adjectives of Quality (विशेषणों का सही क्रम)
          </h2>
        </div>

        {/* 5A: OSASCOMP */}
        <article className="bg-white border-2 border-emerald-200 rounded-3xl p-5 sm:p-6 mb-6 shadow-xs">
          <div className="flex justify-between items-center flex-wrap gap-2 mb-3">
            <h3 className="text-lg font-black text-slate-900">
              A. The Standard Order of Adjectives (OSASCOMP) &amp; Personality
            </h3>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Word Sequence
            </span>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-xs sm:text-sm text-blue-950 font-hi leading-relaxed mb-4">
            जब एक ही संज्ञा के आगे एक से अधिक विशेषण आते हैं, तो उनका सामान्य और स्वाभाविक क्रम यह होता है:<br />
            <strong>(a) Size (आकार):</strong> <em>long, short, big, small, tall</em><br />
            <strong>(b) General Description / Quality (सामान्य गुण/राय):</strong> <em>sharp, elegant, beautiful</em><br />
            <strong>(c) Age (आयु/नया-पुराना):</strong> <em>old, new, antique</em>, और विशेषण <em>little</em><br />
            <strong>(d) Shape (बनावट/आकृति):</strong> <em>round, square, hexagonal, oval</em><br />
            <strong>(e) Colour (रंग):</strong> <em>blue, red, green, black</em><br />
            <strong>(f) Material (पदार्थ/सामग्री):</strong> <em>plastic, velvet, wooden, leather</em><br />
            <strong>(g) Origin (उत्पत्ति/देश):</strong> <em>French, Welsh, Indian, Italian</em><br />
            <strong>(h) Purpose (उद्देश्य/प्रयोजन):</strong> <em>walking stick, riding boots</em><br /><br />
            👉 <strong>व्यक्तित्व/स्वभाव के विशेषण:</strong> (<em>suspicious, patient, anxious, inquisitive</em>) शारीरिक रूप-रंग के <strong>बाद</strong> लेकिन रंगों के <strong>पहले</strong> आते हैं: <em>a small <strong>suspicious</strong> official</em>, <em>an <strong>inquisitive</strong> brown dog</em>.
          </div>

          {renderConceptPairBox(16, '5A. OSASCOMP Standard Order')}
        </article>

        {/* 5B: Little / Old / Young */}
        <article className="bg-white border-2 border-emerald-200 rounded-3xl p-5 sm:p-6 mb-6 shadow-xs">
          <div className="flex justify-between items-center flex-wrap gap-2 mb-3">
            <h3 className="text-lg font-black text-slate-900">
              B. Rules for Little/Old/Young, Approval Words &amp; 'Pretty' as Adverb
            </h3>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Special Traps
            </span>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-xs sm:text-sm text-blue-950 font-hi leading-relaxed mb-4">
            👉 <strong>1. Little, Old, और Young का संयोजन:</strong><br />
            • <strong>little + old + noun संभव है:</strong> <em>a little old lady</em> (एक नन्हीं वृद्ध महिला) ✓<br />
            • <strong>little + young कभी संभव नहीं होता:</strong> (<em>a little young man</em> ✗)!<br /><br />
            👉 <strong>2. स्वीकृति व पसंद (Approval):</strong><br />
            <em>fine, lovely, nice, beautiful</em> जब आकार या तापमान के विशेषणों के साथ आते हैं, तो वे उस आकार या तापमान के प्रति <strong>पसंद और स्वीकृति</strong> दर्शाते हैं: <em>a beautiful big room</em>, <em>a lovely warm house</em>.<br /><br />
            👉 <strong>3. 'Pretty' Adverb vs Adjective:</strong><br />
            • बिना कॉमा के: <em>“She's a <strong>pretty tall</strong> girl.”</em> = यहाँ pretty एक <strong>adverb of degree</strong> है जिसका अर्थ <strong>very / quite (काफी/बहुत)</strong> होता है!<br />
            • कॉमा के साथ: <em>“a <strong>pretty, tall</strong> girl”</em> = लड़की जो सुंदर भी है और लंबी भी!
          </div>

          {renderConceptPairBox(18, '5B. Little/Old/Young & Pretty Adverb')}
        </article>
      </section>

      {/* ==================================================== */}
      {/* FINAL 30-QUESTION 15-MINUTE TEST ARENA */}
      {/* ==================================================== */}
      <section id="test-arena" className="py-8">
        <div className="bg-white border-4 border-emerald-400 rounded-3xl p-5 sm:p-8 shadow-xl">
          {testState === 'idle' && (
            <div className="text-center max-w-xl mx-auto py-6">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                30 Questions · Strict 15-Minute Exam
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 my-3">
                Final 30-Question Adjectives Test
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-hi">
                यह टेस्ट विशेषण के सभी 5 अध्यायों (Kinds, Participles, Agreement, Position, Meaning Shifts, और Adjective Order) की परीक्षा-स्तरीय समझ का मूल्यांकन करता है। जैसे ही आप टेस्ट शुरू करेंगे, <strong>15 मिनट का उल्टी गिनती टाइमर (15:00)</strong> चालू हो जाएगा। समय समाप्त होते ही <strong>टेस्ट स्वतः सबमिट (Auto Submit)</strong> हो जाएगा।
              </p>

              <button
                type="button"
                onClick={handleStartExam}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 active:translate-y-0.5 text-white font-black py-3.5 px-8 rounded-2xl shadow-[0_4px_0_#047857] transition text-base inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <Clock className="w-5 h-5" />
                <span>🚀 Start 30-Question Exam Now (15:00 Timer)</span>
              </button>
            </div>
          )}

          {testState === 'running' && (
            <div>
              {/* Sticky Timer Bar */}
              <div className="sticky top-[125px] z-20 bg-white/95 backdrop-blur-md border-2 border-emerald-300 rounded-2xl p-3 mb-4 shadow-sm flex items-center justify-between gap-3 flex-wrap">
                <div
                  className={`font-mono font-black text-lg sm:text-xl px-3 py-1 rounded-xl border ${
                    secondsLeft <= 120
                      ? 'bg-rose-100 border-rose-400 text-rose-700 animate-pulse'
                      : 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  }`}
                >
                  ⏱ {formatTimer(secondsLeft)}
                </div>

                <div className="text-xs font-bold text-slate-600">
                  Attempted: <span className="text-emerald-700 font-extrabold">{Object.keys(testAnswers).length}</span> / 30 · Left: <span className="text-slate-700 font-extrabold">{30 - Object.keys(testAnswers).length}</span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const attempted = Object.keys(testAnswers).length;
                    if (attempted < 30) {
                      setShowSubmitModal(true);
                    } else {
                      handleFinishExam(false);
                    }
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 active:translate-y-0.5 text-white font-black text-xs px-4 py-2 rounded-xl shadow-[0_2.5px_0_#047857] transition cursor-pointer"
                >
                  Submit Test ✓
                </button>
              </div>

              {/* Palette */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 mb-4">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 mb-2 flex-wrap gap-2">
                  <span>Question Palette (1 to 30):</span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Attempted
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Review
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span> Left
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-15 gap-1.5">
                  {TEST_QUESTIONS.map((q, idx) => {
                    const isAns = testAnswers[q.id] !== undefined;
                    const isRev = testReview[q.id];
                    const isCurr = idx === currentIdx;

                    let btnCls = 'bg-white border-slate-300 text-slate-700';
                    if (isAns) btnCls = 'bg-emerald-600 border-emerald-700 text-white font-bold';
                    if (isRev) btnCls = 'bg-amber-400 border-amber-500 text-amber-950 font-bold';
                    if (isCurr) btnCls += ' ring-2 ring-emerald-500 ring-offset-1';

                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => setCurrentIdx(idx)}
                        className={`h-8 rounded-lg border text-xs font-bold flex items-center justify-center transition cursor-pointer hover:border-emerald-500 ${btnCls}`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Current Question */}
              {renderTestQuestionCard()}
            </div>
          )}

          {testState === 'results' && renderTestResultsCard()}
        </div>
      </section>

      {/* Submit Confirmation Warning Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="bg-white border-3 border-amber-400 rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-3 text-2xl">
              ⚠️
            </div>
            <h3 className="text-lg font-black text-slate-800 mb-2">Unattempted Questions Warning</h3>
            <p className="text-xs text-slate-600 mb-4 font-hi">
              आपने 30 में से <strong>{Object.keys(testAnswers).length}</strong> प्रश्न हल किए हैं।<br />
              अभी <strong>{30 - Object.keys(testAnswers).length} प्रश्न शेष</strong> हैं। क्या आप अभी सबमिट करना चाहते हैं?
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 rounded-xl transition cursor-pointer"
              >
                Continue Test (हल करते रहें)
              </button>
              <button
                type="button"
                onClick={() => handleFinishExam(false)}
                className="px-3.5 py-2.5 border border-slate-300 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-100 transition cursor-pointer"
              >
                Submit Anyway
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Helper: Render Concept Pair 2-Question Box
  function renderConceptPairBox(startIndex: number, title: string) {
    const pair = CONCEPT_QUESTIONS.slice(startIndex, startIndex + 2);

    return (
      <div className="mt-4 bg-slate-50 border-2 border-emerald-300 rounded-2xl p-4">
        <div className="flex justify-between items-center text-xs font-black text-emerald-800 font-heading mb-3 border-b border-slate-200 pb-2">
          <span>✦ कॉन्सेप्ट अभ्यास: 2 उदाहरण प्रश्न ({title})</span>
          <span className="bg-white border border-slate-300 text-slate-600 px-2 py-0.5 rounded-md text-[11px]">
            Check &amp; Learn
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {pair.map((q) => {
            const uChoice = conceptUserAnswers[q.id];
            const isChk = conceptChecked[q.id];
            const isRight = uChoice === q.ans;

            let cardCls = 'bg-white border-2 border-slate-200';
            if (isChk) {
              cardCls = isRight ? 'bg-emerald-50/70 border-emerald-400' : 'bg-rose-50/70 border-rose-300';
            }

            return (
              <div key={q.id} className={`rounded-xl p-3.5 flex flex-col justify-between text-xs transition ${cardCls}`}>
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[11px] font-bold text-slate-500">Ex Q{q.id}</span>
                    {isChk && (
                      <span className={`text-[11px] font-black ${isRight ? 'text-emerald-700' : 'text-rose-700'}`}>
                        {isRight ? '✓ सही उत्तर' : `✕ सही: (${String.fromCharCode(65 + q.ans)})`}
                      </span>
                    )}
                  </div>

                  <p className="font-bold text-slate-800 text-xs sm:text-sm mb-1 leading-snug">{q.q}</p>
                  <p className="font-hi text-slate-600 text-[11px] mb-3 bg-emerald-50/50 p-1.5 rounded-md border border-emerald-100">
                    {q.hi}
                  </p>

                  <div className="space-y-1.5 mb-3">
                    {q.opts.map((opt, idx) => {
                      let optCls = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';
                      if (uChoice === idx) optCls = 'bg-amber-100 border-amber-400 text-amber-950 font-bold';
                      if (isChk) {
                        if (idx === q.ans) optCls = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                        else if (uChoice === idx && idx !== q.ans) optCls = 'bg-rose-100 border-rose-400 text-rose-950';
                      }

                      return (
                        <div
                          key={idx}
                          onClick={() => handleSelectConcept(q, idx)}
                          className={`p-2 rounded-lg border text-[11.5px] flex items-start gap-2 cursor-pointer transition ${optCls}`}
                        >
                          <span className="w-4 h-4 rounded bg-white border border-slate-300 text-[10px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span className="leading-tight">{opt}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => handleCheckConcept(q.id)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] px-3 py-1 rounded-lg transition cursor-pointer"
                    >
                      Check ✓
                    </button>
                    <button
                      type="button"
                      onClick={() => handleResetConcept(q.id)}
                      className="border border-slate-300 hover:bg-slate-100 text-slate-600 font-bold text-[10.5px] px-2.5 py-1 rounded-lg transition cursor-pointer"
                    >
                      Reset ↺
                    </button>
                  </div>

                  {isChk && (
                    <div className="mt-2.5 p-2 bg-amber-50 border border-amber-200 rounded-lg text-[11px] text-amber-900 leading-snug font-hi">
                      <strong>व्याख्या:</strong> {q.expl}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Helper: Render Single Test Question
  function renderTestQuestionCard() {
    const q = TEST_QUESTIONS[currentIdx];
    const isRev = testReview[q.id];

    return (
      <div className="border-2 border-emerald-300 rounded-2xl p-4 sm:p-6 bg-white shadow-xs">
        <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
          <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            {q.label}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggleReview}
              className={`text-xs font-bold px-2.5 py-1 rounded-lg border transition cursor-pointer flex items-center gap-1 ${
                isRev
                  ? 'bg-amber-100 border-amber-400 text-amber-900'
                  : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Flag className="w-3.5 h-3.5" />
              <span>{isRev ? 'Marked for Review' : 'Mark for Review'}</span>
            </button>
            <span className="text-xs font-black text-slate-500">Q {currentIdx + 1} of 30</span>
          </div>
        </div>

        <h3 className="text-base sm:text-lg font-black text-slate-900 mb-1.5 leading-snug">
          {q.q}
        </h3>
        <p className="font-hi text-xs sm:text-sm text-slate-600 mb-4 bg-emerald-50/60 p-2 rounded-xl border border-emerald-200 leading-relaxed">
          {q.hi}
        </p>

        <div className="space-y-2 mb-6">
          {q.opts.map((opt, idx) => {
            const isSel = testAnswers[q.id] === idx;
            return (
              <div
                key={idx}
                onClick={() => handleSelectTestOpt(q, idx)}
                className={`p-3 rounded-xl border-2 text-xs sm:text-sm font-semibold flex items-center gap-3 cursor-pointer transition ${
                  isSel
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                    : 'bg-slate-50 border-slate-200 hover:bg-emerald-50/40 text-slate-700'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center flex-shrink-0 border ${
                    isSel
                      ? 'bg-emerald-600 text-white border-emerald-700'
                      : 'bg-white text-slate-600 border-slate-300'
                  }`}
                >
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{opt}</span>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-slate-200 flex-wrap gap-2">
          <button
            type="button"
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
            className="px-3 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-xs font-bold text-slate-700 transition disabled:opacity-40 cursor-pointer flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleClearTestAnswer}
              className="px-3 py-2 rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-bold transition cursor-pointer"
            >
              Clear
            </button>

            {currentIdx < 29 ? (
              <button
                type="button"
                onClick={() => setCurrentIdx((prev) => Math.min(29, prev + 1))}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black transition cursor-pointer flex items-center gap-1 shadow-[0_2.5px_0_#047857]"
              >
                <span>Next Question</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowSubmitModal(true)}
                className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-black transition cursor-pointer shadow-[0_2.5px_0_#064e3b]"
              >
                Review &amp; Submit ✓
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Helper: Render Final Results Card
  function renderTestResultsCard() {
    const { correct, percentage, unitStats } = getExamResults();

    return (
      <div className="text-center max-w-3xl mx-auto py-4">
        {isTimeOut && (
          <div className="inline-block bg-rose-100 border border-rose-400 text-rose-800 text-xs font-bold px-3 py-1 rounded-full mb-3">
            ⏱ Time Over! 15:00 Expired - Test Auto Submitted
          </div>
        )}

        <div className="inline-block bg-emerald-100 border border-emerald-400 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-2">
          Exam Completed Successfully
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
          Your Test Scorecard
        </h2>

        <div className="text-5xl font-black text-emerald-700 my-2">
          {correct} / 30
        </div>

        <div className="text-lg font-bold text-slate-700 mb-4">
          {percentage}% — {percentage >= 75 ? 'Grammar Scholar ⭐' : percentage >= 50 ? 'Good Effort 👍' : 'Needs Practice 📖'}
        </div>

        <div className="flex justify-center gap-3 mb-8">
          <button
            type="button"
            onClick={handleStartExam}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm px-6 py-2.5 rounded-2xl shadow-[0_3px_0_#047857] transition cursor-pointer"
          >
            Retake 30-Question Test ↺
          </button>
        </div>

        {/* Diagnostic Unit Grid */}
        <div className="text-left mt-8">
          <h3 className="text-lg font-black text-slate-800 mb-2">
            🎯 Concept Mistake Diagnostics (गलतियों का विश्लेषण):
          </h3>
          <p className="text-xs text-slate-500 mb-3 font-hi">
            जिस यूनिट में गलतियाँ हुई हैं, उसके सामने दिए गए लिंक पर क्लिक करके उस नियम को पुनः पढ़ें:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
            {Object.entries(unitStats).map(([key, u]) => {
              const hasMistake = u.mistakes.length > 0;
              return (
                <div
                  key={key}
                  className={`p-3.5 rounded-2xl border text-xs ${
                    hasMistake ? 'bg-rose-50 border-rose-200' : 'bg-emerald-50 border-emerald-200'
                  }`}
                >
                  <div className="flex justify-between items-center font-bold mb-1">
                    <span>{u.title}</span>
                    <span className={hasMistake ? 'text-rose-700 font-black' : 'text-emerald-700 font-black'}>
                      {u.total - u.mistakes.length} / {u.total}
                    </span>
                  </div>
                  {hasMistake ? (
                    <div>
                      <p className="text-rose-800 text-[11px] mb-1.5">
                        गलतियाँ: प्रश्न #{u.mistakes.join(', #')}
                      </p>
                      <a href={u.anchor} className="text-emerald-800 font-bold underline text-[11px]">
                        Revise Rule in Theory →
                      </a>
                    </div>
                  ) : (
                    <p className="text-emerald-800 text-[11px] font-bold">✓ शत-प्रतिशत सही (No mistakes!)</p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Detailed Question by Question review */}
          <h3 className="text-lg font-black text-slate-800 mb-3">
            📋 Detailed Question Review (1 to 30):
          </h3>
          <div className="space-y-3">
            {TEST_QUESTIONS.map((q, idx) => {
              const uChoice = testAnswers[q.id];
              const isRight = uChoice === q.ans;
              const isSkipped = uChoice === undefined;

              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-2xl border text-xs ${
                    isRight ? 'bg-white border-emerald-200' : 'bg-rose-50/50 border-rose-200'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1 flex-wrap gap-2">
                    <span className="font-bold text-slate-500">{q.label} · Q {idx + 1}</span>
                    <span className={`font-black text-xs ${isRight ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {isRight ? '✓ Correct (+1)' : isSkipped ? '⚪ Skipped (0)' : '✕ Incorrect (0)'}
                    </span>
                  </div>

                  <p className="font-bold text-slate-900 text-sm mb-1">{q.q}</p>
                  <p className="font-hi text-xs text-slate-600 mb-2">{q.hi}</p>

                  <div className="space-y-1 text-xs mb-2">
                    <div>
                      <strong>Your Answer:</strong>{' '}
                      {isSkipped ? (
                        <span className="text-slate-400">Not Attempted</span>
                      ) : (
                        <span className={isRight ? 'text-emerald-800 font-bold' : 'text-rose-700 font-bold'}>
                          ({String.fromCharCode(65 + uChoice)}) {q.opts[uChoice]}
                        </span>
                      )}
                    </div>
                    <div>
                      <strong>Correct Answer:</strong>{' '}
                      <span className="text-emerald-700 font-bold">
                        ({String.fromCharCode(65 + q.ans)}) {q.opts[q.ans]}
                      </span>
                    </div>
                  </div>

                  <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-950 font-hi text-[11px] leading-snug">
                    <strong>व्याख्या:</strong> {q.expl}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
};
