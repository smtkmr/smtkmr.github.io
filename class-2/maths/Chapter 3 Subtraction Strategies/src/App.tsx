import React, { useState, useEffect, useRef } from 'react';
import {
  test01,
  test02,
  test03,
  testSuitesMetadata,
  TestQuestion
} from './data/testQuestions';
import { conceptCheckQuestions } from './data/chapter3Content';
import { InteractiveConceptPair } from './components/InteractiveConceptPair';
import {
  NumberLineDiagram,
  FactTriangleDiagram,
  PatternTableDiagram,
  StripesLogicDiagram,
  PaintCansDiagram,
  MissingAddendEquation
} from './components/VisualDiagrams';

export default function App() {
  // Test State
  const [activeSuiteNum, setActiveSuiteNum] = useState<number>(1);
  const [testState, setTestState] = useState<'idle' | 'running' | 'results'>('idle');
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [chosenMinutes, setChosenMinutes] = useState<number>(15);
  const [secondsLeft, setSecondsLeft] = useState<number>(15 * 60);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [markedReview, setMarkedReview] = useState<Record<number, boolean>>({});
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [autoSubmitted, setAutoSubmitted] = useState<boolean>(false);

  const timerRef = useRef<any>(null);

  const activeSuite = testSuitesMetadata[activeSuiteNum as 1 | 2 | 3];
  const activeQuestions = activeSuite.qs;

  // Timer Effect
  useEffect(() => {
    if (testState === 'running') {
      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            finishExam(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [testState]);

  const selectAndStartTestSuite = (num: number) => {
    switchTestSuite(num);
    scrollToTest();
  };

  const switchTestSuite = (num: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setActiveSuiteNum(num);
    setTestState('idle');
    setUserAnswers({});
    setMarkedReview({});
    setCurrentIdx(0);
  };

  const scrollToTest = () => {
    const el = document.getElementById('test-arena');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const startExam = () => {
    setUserAnswers({});
    setMarkedReview({});
    setCurrentIdx(0);
    setSecondsLeft(chosenMinutes * 60);
    setAutoSubmitted(false);
    setTestState('running');
    scrollToTest();
  };

  const finishExam = (isAuto: boolean = false) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setShowSubmitModal(false);
    setAutoSubmitted(isAuto);
    setTestState('results');
    scrollToTest();
  };

  const handleSelectOpt = (qId: number, optIdx: number) => {
    setUserAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const clearCurrentAnswer = (qId: number) => {
    setUserAnswers((prev) => {
      const next = { ...prev };
      delete next[qId];
      return next;
    });
  };

  const toggleReviewCurrent = (qId: number) => {
    setMarkedReview((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const nextQuestion = () => {
    if (currentIdx < activeQuestions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      confirmSubmit();
    }
  };

  const prevQuestion = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const confirmSubmit = () => {
    const attemptedCount = Object.keys(userAnswers).length;
    if (attemptedCount < activeQuestions.length) {
      setShowSubmitModal(true);
    } else {
      finishExam(false);
    }
  };

  // Timer formatting
  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const timeDisplay = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  const isTimerUrgent = secondsLeft <= 120;

  // Calculation for results
  const score = activeQuestions.reduce((acc, q) => {
    return userAnswers[q.id] === q.ans ? acc + 1 : acc;
  }, 0);
  const accuracy = Math.round((score / activeQuestions.length) * 100);
  const timeTakenSec = chosenMinutes * 60 - secondsLeft;
  const timeTakenStr = `${Math.floor(timeTakenSec / 60)}m ${timeTakenSec % 60}s`;

  // Section Diagnostics
  const unitStats: Record<string, { name: string; anchor: string; total: number; correct: number; mistakes: number[] }> = {
    countback: { name: 'Worksheet 3-1: Count Back to Subtract', anchor: 'topic-1', total: 0, correct: 0, mistakes: [] },
    zeroall: { name: 'Worksheet 3-2: Subtract All & Subtract Zero', anchor: 'topic-2', total: 0, correct: 0, mistakes: [] },
    doubles: { name: 'Worksheet 3-3: Use Doubles to Subtract', anchor: 'topic-3', total: 0, correct: 0, mistakes: [] },
    pattern: { name: 'Worksheet 3-4: Problem Solving - Find a Pattern', anchor: 'topic-4', total: 0, correct: 0, mistakes: [] },
    related: { name: 'Worksheet 3-5: Relate Addition to Subtraction', anchor: 'topic-5', total: 0, correct: 0, mistakes: [] },
    missing: { name: 'Worksheet 3-6: Missing Addends', anchor: 'topic-5', total: 0, correct: 0, mistakes: [] },
    factfamily: { name: 'Worksheet 3-7: Fact Families & Fact Triangles', anchor: 'topic-6', total: 0, correct: 0, mistakes: [] },
    strategy: { name: 'Worksheet 3-8: Choose a Strategy (Stripes & Paint)', anchor: 'topic-6', total: 0, correct: 0, mistakes: [] }
  };

  activeQuestions.forEach((q) => {
    const u = userAnswers[q.id];
    const cat = unitStats[q.unit] ? q.unit : 'countback';
    unitStats[cat].total++;
    if (u === q.ans) {
      unitStats[cat].correct++;
    } else {
      unitStats[cat].mistakes.push(q.id);
    }
  });

  // Render question visual
  const renderQuestionVisual = (q: TestQuestion) => {
    if (q.visualType === 'numberline' && q.visualData) {
      return <NumberLineDiagram {...q.visualData} />;
    }
    if (q.visualType === 'facttriangle' && q.visualData) {
      return <FactTriangleDiagram {...q.visualData} />;
    }
    if (q.visualType === 'patterntable' && q.visualData) {
      return <PatternTableDiagram {...q.visualData} />;
    }
    if (q.visualType === 'stripes' && q.visualData) {
      return <StripesLogicDiagram {...q.visualData} />;
    }
    if (q.visualType === 'paintcans' && q.visualData) {
      return <PaintCansDiagram {...q.visualData} />;
    }
    if (q.visualType === 'missingaddend' && q.visualData) {
      return <MissingAddendEquation {...q.visualData} />;
    }
    return null;
  };

  const currentQ = activeQuestions[currentIdx];

  return (
    <div>
      {/* Mobile Floating Test Quick Launcher Bar */}
      <div className="mobile-test-float-bar">
        <span style={{ fontSize: '11px', fontWeight: 900, color: 'var(--brand)', whiteSpace: 'nowrap' }}>
          Tests:
        </span>
        <button type="button" className="mt-chip" onClick={() => selectAndStartTestSuite(1)}>
          📝 Test 01
        </button>
        <button type="button" className="mt-chip" onClick={() => selectAndStartTestSuite(2)}>
          ⚡ Test 02
        </button>
        <button type="button" className="mt-chip" onClick={() => selectAndStartTestSuite(3)}>
          🎯 Test 03
        </button>
      </div>

      {/* Header */}
      <header>
        <div className="wrap nav">
          <a className="logo" href="#main">
            <span className="logo-mark">✦</span>
            <span>
              Econova<span>.vip</span>
            </span>
          </a>

          <nav className="main-nav">
            <a href="#topic-1">1. Count Back</a>
            <a href="#topic-2">2. Zero &amp; All</a>
            <a href="#topic-3">3. Doubles</a>
            <a href="#topic-4">4. Find Pattern</a>
            <a href="#topic-5">5. Related Facts</a>
            <a href="#topic-6">6. Fact Families</a>
          </nav>

          <div className="header-actions">
            <a className="yt-btn" href="https://youtu.be/FkKoei0AjBo" target="_blank" rel="noopener noreferrer">
              <svg width="15" height="11" viewBox="0 0 20 14" fill="currentColor">
                <path d="M19.56 2.18a2.5 2.5 0 0 0-1.76-1.77C16.24 0 10 0 10 0S3.76 0 2.2.41A2.5 2.5 0 0 0 .44 2.18C0 3.74 0 7 0 7s0 3.26.44 4.82a2.5 2.5 0 0 0 1.76 1.77C3.76 14 10 14 10 14s6.24 0 7.8-.41a2.5 2.5 0 0 0 1.76-1.77C20 10.26 20 7 20 7s0-3.26-.44-4.82zM8 10V4l5.2 3L8 10z" />
              </svg>
              <span>YouTube</span>
            </a>
            <button className="nav-test-btn" type="button" onClick={scrollToTest}>
              <span>Tests (01, 02, 03) ↓</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main id="main" className="wrap">
        {/* Hero Section */}
        <section className="hero">
          <div>
            <div className="pill">
              <span></span>
              Class 2 Mathematics · Subtraction Strategies · Fact Families &amp; Patterns
            </div>

            <h1>
              Master <span className="green">Subtraction Strategies</span><br />
              <span className="underline-hl">Fact Families &amp; Patterns.</span>
            </h1>

            <p style={{ color: '#4b5563', fontSize: '14px', lineHeight: 1.75, marginBottom: '12px' }}>
              Class 2 के प्यारे बच्चों! आपकी 14 वर्कशीट्स (अध्याय 3: घटाव की रणनीतियाँ) के सभी मूल प्रश्नों पर आधारित यह संपूर्ण सचित्र पाठ तैयार किया गया है:
              <strong> Count Back to Subtract (नंबर लाइन पर 12-5, 10-6, 12-4, 9-6)</strong>,
              <strong> Tanya's 12 blocks, Ricky's 10 oranges, Madison's trees, Car wash (12-4)</strong>,
              <strong> Subtract All &amp; Zero (Javier's 8 candles, party children, 3 bees, 5 sparrows, 8 ducks, 8 squirrels)</strong>,
              <strong> Use Doubles to Subtract (18-9, 16-8, 14-7; Brian's CDs, Anita's books, Fran's pumpkins, Luis's tomatoes)</strong>,
              <strong> Problem-Solving: Find a Pattern (Kim's tulips, Terry's squares, Beth's Bookstore countdown)</strong>,
              <strong> Relate Addition &amp; Subtraction (7+5=12 ➔ 12-5=7; David's kites, Scouts' boats, Anna's plants)</strong>,
              तथा <strong> Fact Triangles &amp; Logic Investigation (Ray's stripes, Mrs. Ash wallpaper, Sue's 17 paint cans)</strong> — साथ ही <strong>Test 01, Test 02, और Test 03 (कुल 90 कठिन प्रश्न)</strong>!
            </p>

            {/* Direct Test Chooser Tabs */}
            <div className="hero-test-cards">
              <div
                style={{
                  fontSize: '11.5px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: 'var(--brand)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>⚡ Start Any Test (30 Questions Each):</span>
                <span style={{ fontSize: '10.5px', color: '#64748b', fontWeight: 600 }}>Choose Any Test First</span>
              </div>
              <div className="hero-test-grid">
                <button
                  className={`hero-test-btn ${activeSuiteNum === 1 ? 'active-hero-btn' : ''}`}
                  type="button"
                  onClick={() => selectAndStartTestSuite(1)}
                >
                  <div className="htb-top">
                    <span className="htb-num">📝 Test 01</span>
                    <span className="htb-badge">30 Q</span>
                  </div>
                  <div className="htb-title">Count Back, Zero/All &amp; Doubles</div>
                  <div className="htb-cta">Start Test 01 →</div>
                </button>
                <button
                  className={`hero-test-btn ${activeSuiteNum === 2 ? 'active-hero-btn' : ''}`}
                  type="button"
                  onClick={() => selectAndStartTestSuite(2)}
                >
                  <div className="htb-top">
                    <span className="htb-num">⚡ Test 02</span>
                    <span className="htb-badge">30 Q</span>
                  </div>
                  <div className="htb-title">Patterns &amp; Missing Addends</div>
                  <div className="htb-cta">Start Test 02 →</div>
                </button>
                <button
                  className={`hero-test-btn ${activeSuiteNum === 3 ? 'active-hero-btn' : ''}`}
                  type="button"
                  onClick={() => selectAndStartTestSuite(3)}
                >
                  <div className="htb-top">
                    <span className="htb-num">🎯 Test 03</span>
                    <span className="htb-badge">30 Q</span>
                  </div>
                  <div className="htb-title">Fact Families &amp; Logic Stripes</div>
                  <div className="htb-cta">Start Test 03 →</div>
                </button>
              </div>
            </div>

            <div className="hero-actions">
              <a className="mint-btn" href="#topic-1">
                Read Worksheet Lessons &amp; Rules →
              </a>
              <button className="quiet-btn" type="button" onClick={scrollToTest}>
                ⏱ Jump to Test Arena ↓
              </button>
            </div>
          </div>

          <div className="amber-card" style={{ padding: '18px', textAlign: 'center' }}>
            <p style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--brand)', fontFamily: 'var(--heading)' }}>
              Worksheet Strategy Summary
            </p>
            <div style={{ fontFamily: 'var(--heading)', fontSize: '26px', fontWeight: 900, color: 'var(--brand)', margin: '4px 0' }}>
              6 Subtraction Laws!
            </div>
            <div style={{ textAlign: 'left', fontSize: '12.5px', lineHeight: 1.65, background: '#fff', padding: '10px', borderRadius: '10px', border: '1px solid #fde68a' }}>
              • <strong>1. Count Back Rule:</strong> बड़ी संख्या (Minuend) से शुरू करें और छोटी संख्या (Subtrahend) जितने कदम नंबर लाइन पर पीछे गिनें।<br />
              • <strong>2. Subtract Zero ($a - 0 = a$):</strong> 0 घटाने पर संख्या वही रहती है (3 bees - 0 = 3 bees)।<br />
              • <strong>3. Subtract All ($a - a = 0$):</strong> पूरी संख्या घटाने पर शून्य (0) बचता है (8 candles - 8 = 0)।<br />
              • <strong>4. Doubles Strategy:</strong> $8 + 8 = 16 \implies 16 - 8 = 8$ (Brian's CDs, Fran's pumpkins)।<br />
              • <strong>5. Related Fact Rule:</strong> जोड़ और घटाव एक दूसरे के विपरीत होते हैं ($7 + 5 = 12 \iff 12 - 5 = 7$)।<br />
              • <strong>6. Fact Family Rule:</strong> 3 संख्याएं मिलकर 4 गणितीय वाक्य बनाती हैं (2 जोड़ और 2 घटाव)।
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* UNIT 01: COUNT BACK TO SUBTRACT (3-1) */}
        {/* ========================================== */}
        <section id="topic-1" className="section">
          <div style={{ marginBottom: '12px' }}>
            <span className="badge">Worksheet 3-1 · Count Back to Subtract</span>
            <h2 style={{ fontSize: '24px', fontWeight: 900, marginTop: '4px' }}>
              1. Count Back to Subtract: Using the Number Line (संख्या रेखा पर पीछे गिनना)
            </h2>
          </div>

          <article className="rule-card">
            <div className="rule-header">
              <h3 style={{ fontSize: '16px', fontWeight: 800 }}>
                A. How to Count Back: Start at [X], Count back [Y] steps to reach [Z]
              </h3>
              <span className="badge">Standard 2NS2.2</span>
            </div>
            <p style={{ fontSize: '13px', color: '#4b5563', lineHeight: 1.7 }}>
              संख्या रेखा (Number Line) पर घटाने के लिए हम <strong>बड़ी संख्या (Minuend) से शुरू करते हैं</strong> और बाईं ओर (पीछे) कूदते हैं:
            </p>

            <NumberLineDiagram start={12} jump={5} end={7} label="Tanya's Blocks: 12 - 5 = 7" />

            <div className="easy-hi">
              👉 <strong>सरल हिंदी व्याख्या (वर्कशीट 3-1):</strong><br />
              • <strong>12 - 5:</strong> संख्या 12 से शुरू करें और 5 कदम पीछे कूदें (11, 10, 9, 8, 7)। आप <strong>7</strong> पर पहुँचते हैं! वाक्य: <code>12 - 5 = 7</code>.<br />
              • <strong>10 - 6 (रिकी के संतरे):</strong> 10 से 6 कदम पीछे कूदने पर <strong>4</strong> आता है। वाक्य: <code>10 - 6 = 4</code>.<br />
              • <strong>12 - 4 (कार वॉश तुलना):</strong> 12 कारें और 4 ट्रक ➔ 12 - 4 = <strong>8 कारें अधिक</strong>!
            </div>

            <div className="trap-box">
              <b>⚠️ सावधान! सामान्य गलती (Student Trap):</b>
              शुरुआती संख्या को ही पहला कदम न गिनें! यदि आप 12 से शुरू कर रहे हैं, तो पहला कदम 11 पर होगा, 12 पर नहीं!
            </div>

            <InteractiveConceptPair
              title="Worksheet 3-1: Tanya's Blocks & Car Wash"
              q1={conceptCheckQuestions[0]}
              q2={conceptCheckQuestions[1]}
            />
          </article>
        </section>

        {/* ========================================== */}
        {/* UNIT 02: SUBTRACT ALL & ZERO (3-2) */}
        {/* ========================================== */}
        <section id="topic-2" className="section">
          <div style={{ marginBottom: '12px' }}>
            <span className="badge">Worksheet 3-2 · Subtract All and Zero</span>
            <h2 style={{ fontSize: '24px', fontWeight: 900, marginTop: '4px' }}>
              2. Subtract All and Subtract Zero (सभी को घटाना और शून्य घटाना)
            </h2>
          </div>

          <article className="rule-card">
            <div className="rule-header">
              <h3 style={{ fontSize: '16px', fontWeight: 800 }}>
                A. The Two Fundamental Identity Rules (दो स्वर्णिम नियम)
              </h3>
              <span className="badge">2NS2.2, 2MR1.2</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px', margin: '14px 0' }}>
              <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: '12px', padding: '14px' }}>
                <span className="badge" style={{ background: '#dcfce7', color: '#15803d' }}>Rule 1: Subtract Zero</span>
                <div style={{ fontFamily: 'var(--heading)', fontSize: '22px', fontWeight: 900, color: '#065f46', margin: '6px 0' }}>
                  Number - 0 = Same Number
                </div>
                <p style={{ fontSize: '12.5px', color: '#374151', lineHeight: 1.6 }}>
                  जब आप किसी संख्या में से <strong>0 (कुछ नहीं)</strong> घटाते हैं, तो वह संख्या वैसी ही रहती है!<br />
                  • 3 bees buzz, none fly away: <strong>3 - 0 = 3</strong><br />
                  • Mrs. Keen feeds 8 squirrels, none run away: <strong>8 - 0 = 8</strong><br />
                  • Facts: 6 - 0 = 6, 9 - 0 = 9, 4 - 0 = 4, 7 - 0 = 7, 8 - 0 = 8.
                </p>
              </div>

              <div style={{ background: '#fef2f2', border: '1.5px solid #fca5a5', borderRadius: '12px', padding: '14px' }}>
                <span className="badge" style={{ background: '#fee2e2', color: '#991b1b' }}>Rule 2: Subtract All</span>
                <div style={{ fontFamily: 'var(--heading)', fontSize: '22px', fontWeight: 900, color: '#991b1b', margin: '6px 0' }}>
                  Number - Same Number = 0
                </div>
                <p style={{ fontSize: '12.5px', color: '#374151', lineHeight: 1.6 }}>
                  जब आप किसी संख्या में से <strong>सभी (All)</strong> घटा देते हैं, तो केवल <strong>0</strong> बचता है!<br />
                  • 8 candles on cake, Javier blows out all 8: <strong>8 - 8 = 0</strong><br />
                  • 5 sparrows in nest, they all fly away: <strong>5 - 5 = 0</strong><br />
                  • 8 ducks in pond, all fly away: <strong>8 - 8 = 0</strong><br />
                  • Miguel catches 7 spiders, lets all go: <strong>7 - 7 = 0</strong>
                </p>
              </div>
            </div>

            <InteractiveConceptPair
              title="Worksheet 3-2: Ducks in Pond & Mrs. Keen's Squirrels"
              q1={conceptCheckQuestions[2]}
              q2={conceptCheckQuestions[3]}
            />
          </article>
        </section>

        {/* ========================================== */}
        {/* UNIT 03: USE DOUBLES TO SUBTRACT (3-3) */}
        {/* ========================================== */}
        <section id="topic-3" className="section">
          <div style={{ marginBottom: '12px' }}>
            <span className="badge">Worksheet 3-3 · Use Doubles to Subtract</span>
            <h2 style={{ fontSize: '24px', fontWeight: 900, marginTop: '4px' }}>
              3. Use Doubles to Subtract (डबल्स जोड़ से घटाव हल करना)
            </h2>
          </div>

          <article className="rule-card">
            <div className="rule-header">
              <h3 style={{ fontSize: '16px', fontWeight: 800 }}>
                A. The Doubles Mental Ladder (डबल्स सोचने की त्वरित रणनीति)
              </h3>
              <span className="badge">2NS2.2, 2MR1.2</span>
            </div>
            <p style={{ fontSize: '13px', color: '#4b5563', lineHeight: 1.7 }}>
              यदि आपको <strong>डबल्स जोड़ तथ्य (Addition Doubles)</strong> याद हैं, तो उनसे आधा घटाना बहुत आसान हो जाता है!
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '8px', margin: '14px 0' }}>
              <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '10px', padding: '10px', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: '#64748b' }}>9 + 9 = 18 ➔</div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#059669' }}>18 - 9 = 9</div>
                <div style={{ fontSize: '10.5px', color: '#475569' }}>Brian's CDs &amp; Delia's pies</div>
              </div>
              <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '10px', padding: '10px', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: '#64748b' }}>8 + 8 = 16 ➔</div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#059669' }}>16 - 8 = 8</div>
                <div style={{ fontSize: '10.5px', color: '#475569' }}>Fran's pumpkins</div>
              </div>
              <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '10px', padding: '10px', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: '#64748b' }}>7 + 7 = 14 ➔</div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#059669' }}>14 - 7 = 7</div>
                <div style={{ fontSize: '10.5px', color: '#475569' }}>Anita's books &amp; Luis's tomatoes</div>
              </div>
              <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '10px', padding: '10px', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: '#64748b' }}>6 + 6 = 12 ➔</div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#059669' }}>12 - 6 = 6</div>
                <div style={{ fontSize: '10.5px', color: '#475569' }}>Doug's peppers</div>
              </div>
              <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '10px', padding: '10px', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: '#64748b' }}>5 + 5 = 10 ➔</div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#059669' }}>10 - 5 = 5</div>
                <div style={{ fontSize: '10.5px', color: '#475569' }}>Neal's apple baskets</div>
              </div>
              <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '10px', padding: '10px', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: '#64748b' }}>3 + 3 = 6 ➔</div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#059669' }}>6 - 3 = 3</div>
                <div style={{ fontSize: '10.5px', color: '#475569' }}>Horn family's corn rows</div>
              </div>
            </div>

            <InteractiveConceptPair
              title="Worksheet 3-3: Brian's CDs, Delia's Pies & Doug's Peppers"
              q1={conceptCheckQuestions[4]}
              q2={conceptCheckQuestions[5]}
            />
          </article>
        </section>

        {/* ========================================== */}
        {/* UNIT 04: FIND A PATTERN (3-4) */}
        {/* ========================================== */}
        <section id="topic-4" className="section">
          <div style={{ marginBottom: '12px' }}>
            <span className="badge">Worksheet 3-4 · Problem-Solving: Find a Pattern</span>
            <h2 style={{ fontSize: '24px', fontWeight: 900, marginTop: '4px' }}>
              4. Problem-Solving Strategy: Find a Pattern (पैटर्न खोजकर हल करना)
            </h2>
          </div>

          <article className="rule-card">
            <div className="rule-header">
              <h3 style={{ fontSize: '16px', fontWeight: 800 }}>
                A. The Three Master Worksheet Patterns
              </h3>
              <span className="badge">2SDAP2.1, 2MR1.0</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', margin: '12px 0' }}>
              <div style={{ background: '#fff', border: '1.5px solid #a7f3d0', borderRadius: '12px', padding: '12px' }}>
                <div style={{ fontWeight: 800, color: '#065f46', fontSize: '13px' }}>1. Kim's Tulips (Row 1 to 6)</div>
                <p style={{ fontSize: '12px', color: '#475569', margin: '4px 0' }}>
                  नियम: प्रत्येक पंक्ति में <strong>+3 ट्यूलिप</strong> जोड़े जाते हैं।
                </p>
                <PatternTableDiagram
                  headers={['Row', '1', '2', '3', '4', '5', '6']}
                  rows={[['Tulips', 3, 6, 9, 12, 15, 18]]}
                  highlightCol={6}
                />
                <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#059669', textAlign: 'center', marginTop: '4px' }}>
                  ➔ पंक्ति 6 में कुल 18 ट्यूलिप होंगे!
                </div>
              </div>

              <div style={{ background: '#fff', border: '1.5px solid #a7f3d0', borderRadius: '12px', padding: '12px' }}>
                <div style={{ fontWeight: 800, color: '#065f46', fontSize: '13px' }}>2. Terry &amp; Pat's Squares (Turns 1 to 8)</div>
                <p style={{ fontSize: '12px', color: '#475569', margin: '4px 0' }}>
                  नियम: प्रत्येक टर्न पर <strong>+2 वर्ग</strong> जुड़ते हैं।
                </p>
                <PatternTableDiagram
                  headers={['Turn', '1', '2', '3', '4', '5', '6', '7', '8']}
                  rows={[['Squares', 2, 4, 6, 8, 10, 12, 14, 16]]}
                  highlightCol={8}
                />
                <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#059669', textAlign: 'center', marginTop: '4px' }}>
                  ➔ 8 टर्न बाद 16 वर्ग होंगे!
                </div>
              </div>

              <div style={{ background: '#fff', border: '1.5px solid #fde68a', borderRadius: '12px', padding: '12px', gridColumn: '1 / -1' }}>
                <div style={{ fontWeight: 800, color: '#92400e', fontSize: '13px' }}>3. Beth's Bookstore Countdown (हर घंटे -3 किताबें)</div>
                <p style={{ fontSize: '12px', color: '#475569', margin: '4px 0' }}>
                  शुरुआत 20 किताबों से होती है। हर घंटे 3 किताबें बिकती हैं (-3)। केवल 2 किताबें कब बचेंगी?
                </p>
                <PatternTableDiagram
                  headers={['Hours', 'Open', '1', '2', '3', '4', '5', '6']}
                  rows={[['Books', 20, 17, 14, 11, 8, 5, 2]]}
                  highlightCol={7}
                />
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#b45309', textAlign: 'center', marginTop: '6px' }}>
                  ➔ ठीक 6 घंटे बाद केवल 2 पहेली किताबें बचेंगी!
                </div>
              </div>
            </div>

            <InteractiveConceptPair
              title="Worksheet 3-4: Kim's Tulips & Beth's Bookstore"
              q1={conceptCheckQuestions[6]}
              q2={conceptCheckQuestions[7]}
            />
          </article>
        </section>

        {/* ========================================== */}
        {/* UNIT 05: RELATE ADDITION TO SUBTRACTION (3-5 & 3-6) */}
        {/* ========================================== */}
        <section id="topic-5" className="section">
          <div style={{ marginBottom: '12px' }}>
            <span className="badge">Worksheets 3-5 &amp; 3-6 · Inverse Facts &amp; Missing Addends</span>
            <h2 style={{ fontSize: '24px', fontWeight: 900, marginTop: '4px' }}>
              5. Relate Addition to Subtraction &amp; Missing Addends (जोड़ से घटाव और लुप्त संख्या)
            </h2>
          </div>

          <article className="rule-card">
            <div className="rule-header">
              <h3 style={{ fontSize: '16px', fontWeight: 800 }}>
                A. Inverse Relationship: Addition Helps You Subtract!
              </h3>
              <span className="badge">2NS2.1, 2MR3.0</span>
            </div>
            <p style={{ fontSize: '13px', color: '#4b5563', lineHeight: 1.7 }}>
              जोड़ और घटाव एक-दूसरे के विपरीत (Inverse) होते हैं। यदि आप <code>7 + 5 = 12</code> जानते हैं, तो <code>12 - 5 = 7</code> अपने आप ज्ञात हो जाता है!
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px', margin: '14px 0' }}>
              <div style={{ background: '#f0fdf4', border: '1.5px solid #a7f3d0', borderRadius: '10px', padding: '10px' }}>
                <div style={{ fontWeight: 800, color: '#065f46', fontSize: '12.5px' }}>David's Kites (16 कुल, 7 उड़ रहीं)</div>
                <MissingAddendEquation addend1={7} box={9} total={16} subtractionSentence="16 - 7 = 9 पतंगें पेड़ों में हैं" />
              </div>
              <div style={{ background: '#f0fdf4', border: '1.5px solid #a7f3d0', borderRadius: '10px', padding: '10px' }}>
                <div style={{ fontWeight: 800, color: '#065f46', fontSize: '12.5px' }}>Scouts' Boats (15 कुल, 9 जमीन पर)</div>
                <MissingAddendEquation addend1={9} box={6} total={15} subtractionSentence="15 - 9 = 6 नावें तालाब में हैं" />
              </div>
              <div style={{ background: '#f0fdf4', border: '1.5px solid #a7f3d0', borderRadius: '10px', padding: '10px' }}>
                <div style={{ fontWeight: 800, color: '#065f46', fontSize: '12.5px' }}>Anna's Plants (7 हैं, 12 चाहिए)</div>
                <MissingAddendEquation addend1={7} box={5} total={12} subtractionSentence="12 - 7 = 5 पौधे और चाहिए" />
              </div>
              <div style={{ background: '#f0fdf4', border: '1.5px solid #a7f3d0', borderRadius: '10px', padding: '10px' }}>
                <div style={{ fontWeight: 800, color: '#065f46', fontSize: '12.5px' }}>J.J.'s Flower Boxes (6 हैं, 14 चाहिए)</div>
                <MissingAddendEquation addend1={6} box={8} total={14} subtractionSentence="14 - 6 = 8 बॉक्स और चाहिए" />
              </div>
            </div>

            <InteractiveConceptPair
              title="Worksheets 3-5 & 3-6: Related Facts & David's Kites"
              q1={conceptCheckQuestions[8]}
              q2={conceptCheckQuestions[9]}
            />
          </article>
        </section>

        {/* ========================================== */}
        {/* UNIT 06: FACT FAMILIES & STRATEGY (3-7 & 3-8) */}
        {/* ========================================== */}
        <section id="topic-6" className="section">
          <div style={{ marginBottom: '12px' }}>
            <span className="badge">Worksheets 3-7 &amp; 3-8 · Fact Families &amp; Choose a Strategy</span>
            <h2 style={{ fontSize: '24px', fontWeight: 900, marginTop: '4px' }}>
              6. Fact Families &amp; Logical Problem Solving (फैक्ट ट्रायंगल और पहेली रणनीति)
            </h2>
          </div>

          <article className="rule-card">
            <div className="rule-header">
              <h3 style={{ fontSize: '16px', fontWeight: 800 }}>
                A. Fact Triangles (3 Numbers Make 4 Number Sentences)
              </h3>
              <span className="badge">2NS2.1, 2AF1.2</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', margin: '14px 0' }}>
              <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '10px', textAlign: 'center' }}>
                <span className="badge">Triangle 15, 9, 6</span>
                <FactTriangleDiagram top={15} left={9} right={6} />
              </div>
              <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '10px', textAlign: 'center' }}>
                <span className="badge">Triangle 14, 9, 5</span>
                <FactTriangleDiagram top={14} left={9} right={5} />
              </div>
              <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '10px', textAlign: 'center' }}>
                <span className="badge">Lori's Bracelets (16, 7, 9)</span>
                <FactTriangleDiagram top={16} left={7} right={9} />
              </div>
            </div>

            <div className="rule-header" style={{ marginTop: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800 }}>
                B. Worksheet 3-8 Strategies: Ray's Stripes &amp; Sue's Paint Cans
              </h3>
              <span className="badge">Logical Reasoning &amp; Multi-Step</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px', margin: '12px 0' }}>
              <div style={{ background: '#fff', border: '1.5px solid #a7f3d0', borderRadius: '12px', padding: '12px' }}>
                <div style={{ fontWeight: 800, color: '#065f46', fontSize: '13px' }}>Ray's Stripes Puzzle (Logical Reasoning)</div>
                <p style={{ fontSize: '12px', color: '#475569', margin: '4px 0' }}>
                  • Clue 1: Red stripe is NOT first.<br />
                  • Clue 2: Yellow stripe is next to Blue.<br />
                  • Clue 3: Red stripe is next to Blue.<br />
                  ➔ चूँकि दोनों रंग नीले के बगल में हैं, नीला बीच में होगा!
                </p>
                <StripesLogicDiagram order={['Yellow', 'Blue', 'Red']} />
              </div>

              <div style={{ background: '#fff', border: '1.5px solid #a7f3d0', borderRadius: '12px', padding: '12px' }}>
                <div style={{ fontWeight: 800, color: '#065f46', fontSize: '13px' }}>Sue's 17 Paint Cans (Write a Number Sentence)</div>
                <p style={{ fontSize: '12px', color: '#475569', margin: '4px 0' }}>
                  17 कुल कैन: 4 नीली + 3 हरी + 2 लाल = 9 रंगीन कैन। बाकी सफेद कैन हैं:
                </p>
                <PaintCansDiagram blue={4} green={3} red={2} white={8} />
              </div>
            </div>

            <InteractiveConceptPair
              title="Worksheets 3-7 & 3-8: Fact Families & Ray's Stripes"
              q1={conceptCheckQuestions[10]}
              q2={conceptCheckQuestions[11]}
            />
          </article>
        </section>

        {/* ========================================== */}
        {/* TEST ARENA (TEST 01 / TEST 02 / TEST 03) */}
        {/* ========================================== */}
        <section id="test-arena" className="mint-card test-section">
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '6px' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--brand)' }}>
                Select Test to Attempt / टेस्ट चुनें (30 Questions Each):
              </span>
              <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>
                Any test can be chosen in any order
              </span>
            </div>

            <div className="test-selection-grid">
              <button
                className={`test-select-card ${activeSuiteNum === 1 ? 'active' : ''}`}
                type="button"
                onClick={() => switchTestSuite(1)}
              >
                <div className="tsc-top">
                  <span className="tsc-title">📝 Test 01</span>
                  <span className="tsc-badge">30 Q</span>
                </div>
                <div className="tsc-topic">Count Back, Zero/All &amp; Doubles</div>
                <div className="tsc-tag">{activeSuiteNum === 1 ? '● Selected Active' : 'Tap to Select'}</div>
              </button>

              <button
                className={`test-select-card ${activeSuiteNum === 2 ? 'active' : ''}`}
                type="button"
                onClick={() => switchTestSuite(2)}
              >
                <div className="tsc-top">
                  <span className="tsc-title">⚡ Test 02</span>
                  <span className="tsc-badge">30 Q</span>
                </div>
                <div className="tsc-topic">Patterns &amp; Missing Addends</div>
                <div className="tsc-tag">{activeSuiteNum === 2 ? '● Selected Active' : 'Tap to Select'}</div>
              </button>

              <button
                className={`test-select-card ${activeSuiteNum === 3 ? 'active' : ''}`}
                type="button"
                onClick={() => switchTestSuite(3)}
              >
                <div className="tsc-top">
                  <span className="tsc-title">🎯 Test 03</span>
                  <span className="tsc-badge">30 Q</span>
                </div>
                <div className="tsc-topic">Fact Families &amp; Logic Stripes (Tough)</div>
                <div className="tsc-tag">{activeSuiteNum === 3 ? '● Selected Active' : 'Tap to Select'}</div>
              </button>
            </div>
          </div>

          {/* IDLE VIEW */}
          {testState === 'idle' && (
            <div style={{ textAlign: 'center', maxWidth: '680px', margin: 'auto' }}>
              <span className="badge" style={{ fontSize: '12.5px', padding: '4px 12px', marginBottom: '8px' }}>
                {activeSuite.badge}
              </span>
              <h2 style={{ fontSize: '26px', fontWeight: 900, margin: '8px 0' }}>
                {activeSuite.title}
              </h2>
              <p style={{ fontSize: '13.5px', color: '#4b5563', lineHeight: 1.7, marginBottom: '18px' }}>
                {activeSuite.desc}
              </p>

              {/* Timer Duration Picker */}
              <div style={{ background: '#f0fdf4', border: '1.5px solid #a7f3d0', borderRadius: '12px', padding: '12px', marginBottom: '16px', textAlign: 'left' }}>
                <strong style={{ fontSize: '12.5px', color: '#065f46', display: 'block', marginBottom: '8px' }}>
                  ⏱ Choose Timer Duration (समय चुनें):
                </strong>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {[10, 15, 20, 30].map((m) => (
                    <button
                      key={m}
                      className="quiet-btn"
                      type="button"
                      onClick={() => setChosenMinutes(m)}
                      style={{
                        background: chosenMinutes === m ? '#10b981' : '#ffffff',
                        color: chosenMinutes === m ? '#ffffff' : 'var(--brand)',
                        borderColor: chosenMinutes === m ? '#059669' : 'var(--line)'
                      }}
                    >
                      {m} Min {m === 15 ? '(Recommended)' : ''}
                    </button>
                  ))}
                </div>
              </div>

              <button
                className="mint-btn"
                type="button"
                onClick={startExam}
                style={{ fontSize: '14.5px', padding: '12px 24px', width: '100%', maxWidth: '380px' }}
              >
                🚀 Start Test 0{activeSuiteNum} Now ({chosenMinutes}:00 Timer)
              </button>
            </div>
          )}

          {/* RUNNING VIEW */}
          {testState === 'running' && (
            <div>
              <div className="test-timer-bar">
                <div className={`timer-pill ${isTimerUrgent ? 'urgent' : ''}`}>{timeDisplay}</div>
                <div style={{ fontSize: '12.5px', fontWeight: 'bold', color: 'var(--brand)' }}>
                  Attempted: {Object.keys(userAnswers).length} / 30 · Left:{' '}
                  {activeQuestions.length - Object.keys(userAnswers).length}
                </div>
                <button
                  className="mint-btn"
                  type="button"
                  onClick={confirmSubmit}
                  style={{ fontSize: '11.5px', padding: '6px 14px' }}
                >
                  Submit Test ✓
                </button>
              </div>

              {/* Palette (1 to 30) */}
              <div style={{ background: '#fff', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '10px', marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', fontWeight: 'bold', color: '#475569', marginBottom: '6px', flexWrap: 'wrap', gap: '6px' }}>
                  <span>Question Palette (1 to 30):</span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span>🟢 Attempted</span>
                    <span>🟡 Review</span>
                    <span>⚪ Left</span>
                  </div>
                </div>
                <div className="palette-grid">
                  {activeQuestions.map((q, idx) => {
                    const isAns = userAnswers[q.id] !== undefined;
                    const isRev = markedReview[q.id];
                    const isCur = currentIdx === idx;
                    let pClass = 'pal-btn';
                    if (isAns) pClass += ' attempted';
                    if (isRev) pClass += ' review';
                    if (isCur) pClass += ' active';
                    return (
                      <div key={q.id} className={pClass} onClick={() => setCurrentIdx(idx)}>
                        {q.id}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Single Question Card */}
              <div className="test-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '6px' }}>
                  <span className="badge">{currentQ.label}</span>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <span style={{ fontSize: '11.5px', fontWeight: 'bold', color: '#64748b' }}>
                      Q {currentQ.id} of {activeQuestions.length}
                    </span>
                    <button
                      className="quiet-btn"
                      type="button"
                      onClick={() => toggleReviewCurrent(currentQ.id)}
                      style={{
                        padding: '3px 8px',
                        fontSize: '11px',
                        background: markedReview[currentQ.id] ? '#fef3c7' : '#fff'
                      }}
                    >
                      {markedReview[currentQ.id] ? '🚩 Marked for Review' : '🚩 Mark for Review'}
                    </button>
                  </div>
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: 900, marginBottom: '6px', lineHeight: 1.4 }}>
                  Q{currentQ.id}. {currentQ.q}
                </h3>
                <p className="font-hi" style={{ fontSize: '13.5px', color: '#2563eb', background: '#eff6ff', padding: '8px 10px', borderRadius: '8px', marginBottom: '12px' }}>
                  👉 {currentQ.hi}
                </p>

                {/* Question Visual Diagram */}
                {renderQuestionVisual(currentQ)}

                {/* Multiple-Choice Options */}
                <div style={{ marginTop: '12px' }}>
                  {currentQ.opts.map((opt, idx) => {
                    const isSelected = userAnswers[currentQ.id] === idx;
                    return (
                      <div
                        key={idx}
                        className={`choice-lg ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleSelectOpt(currentQ.id, idx)}
                      >
                        <span
                          className="choice-badge-sm"
                          style={{
                            width: '22px',
                            height: '22px',
                            fontSize: '11px',
                            background: isSelected ? 'var(--button)' : '#fff',
                            color: isSelected ? '#fff' : '#1f2937',
                            borderColor: isSelected ? 'var(--brand)' : '#94a3b8'
                          }}
                        >
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="test-actions-bar">
                  <button className="quiet-btn" type="button" onClick={() => clearCurrentAnswer(currentQ.id)}>
                    Clear Selection
                  </button>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="quiet-btn" type="button" onClick={prevQuestion} disabled={currentIdx === 0}>
                      ← Previous
                    </button>
                    <button
                      className="mint-btn"
                      type="button"
                      onClick={nextQuestion}
                      style={{ padding: '7px 16px', fontSize: '12.5px' }}
                    >
                      {currentIdx === activeQuestions.length - 1 ? 'Finish & Submit' : 'Next Question →'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* RESULTS VIEW */}
          {testState === 'results' && (
            <div className="results-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', borderBottom: '2px solid #a7f3d0', paddingBottom: '14px', marginBottom: '18px' }}>
                <div>
                  <span className="badge" style={{ fontSize: '11.5px' }}>{activeSuite.title} Results</span>
                  <h2 style={{ fontSize: '26px', fontWeight: 900, margin: '4px 0' }}>
                    Your Score: <span className="score-circle">{score}</span> / 30
                  </h2>
                  <p style={{ fontSize: '12px', color: '#475569' }}>
                    Accuracy: <strong>{accuracy}%</strong> · Time Taken: <strong>{timeTakenStr}</strong>
                    {autoSubmitted && (
                      <span style={{ color: '#dc2626', fontWeight: 'bold' }}> (Auto Submitted at 00:00 Time Limit)</span>
                    )}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button className="mint-btn" type="button" onClick={startExam}>
                    🔄 Retake Test 0{activeSuiteNum}
                  </button>
                  {activeSuiteNum !== 1 && (
                    <button className="quiet-btn" type="button" onClick={() => selectAndStartTestSuite(1)}>
                      📝 Take Test 01 (30 Q)
                    </button>
                  )}
                  {activeSuiteNum !== 2 && (
                    <button className="quiet-btn" type="button" onClick={() => selectAndStartTestSuite(2)}>
                      ⚡ Take Test 02 (30 Q)
                    </button>
                  )}
                  {activeSuiteNum !== 3 && (
                    <button className="quiet-btn" type="button" onClick={() => selectAndStartTestSuite(3)}>
                      🎯 Take Test 03 (30 Q)
                    </button>
                  )}
                </div>
              </div>

              {/* Mistakes Diagnostics */}
              <div style={{ background: '#fffbeb', border: '2px solid #fcd34d', borderRadius: '14px', padding: '14px', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#92400e', marginBottom: '4px' }}>
                  🔍 गलतियों का वर्कशीट-आधारित विश्लेषण (Worksheet Concept Mistake Diagnostics)
                </h3>
                <p style={{ fontSize: '11.5px', color: '#78350f', marginBottom: '10px' }}>
                  जिस वर्कशीट में गलती हुई हो, उसके लिंक पर क्लिक करके सीधे उस नियम को दोबारा पढ़ें:
                </p>
                <div className="concept-diag-grid">
                  {Object.entries(unitStats).map(([key, item]) => {
                    if (item.total === 0) return null;
                    const hasMistakes = item.mistakes.length > 0;
                    return (
                      <div key={key} className={`diag-card ${hasMistakes ? 'mistake' : ''}`}>
                        <div style={{ fontWeight: 'bold', fontSize: '12.5px', marginBottom: '4px', color: hasMistakes ? '#b91c1c' : '#059669' }}>
                          {item.name}
                        </div>
                        <div style={{ fontSize: '11.5px', marginBottom: '5px' }}>
                          {item.correct} / {item.total} Correct ({Math.round((item.correct / item.total) * 100)}%)
                        </div>
                        {hasMistakes ? (
                          <div style={{ fontSize: '11px', color: '#991b1b', marginBottom: '6px' }}>
                            ⚠️ Mistakes in Q: <strong>{item.mistakes.join(', ')}</strong>
                          </div>
                        ) : (
                          <div style={{ fontSize: '11px', color: '#15803d', fontWeight: 'bold', marginBottom: '6px' }}>
                            ✓ All worksheet concepts mastered!
                          </div>
                        )}
                        <a href={`#${item.anchor}`} style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--brand)', textDecoration: 'underline' }}>
                          Revise Worksheet Rule in Theory →
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Detailed 1-to-30 Question Review */}
              <h3 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '10px' }}>
                Detailed Question Review (1 to 30)
              </h3>
              <div>
                {activeQuestions.map((q) => {
                  const u = userAnswers[q.id];
                  const isRight = u === q.ans;
                  const isSkipped = u === undefined;
                  return (
                    <div key={q.id} className={`review-q-card ${!isRight ? 'wrong' : ''}`}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '11.5px' }}>
                        <span className="badge">{q.label}</span>
                        <span style={{ fontWeight: 'bold', color: isRight ? '#15803d' : '#b91c1c' }}>
                          {isRight ? '✓ Correct (+1)' : isSkipped ? '⚪ Skipped (0)' : '✕ Incorrect (0)'}
                        </span>
                      </div>
                      <div style={{ fontWeight: 'bold', fontSize: '13px', marginBottom: '2px' }}>
                        Q{q.id}. {q.q}
                      </div>
                      <div className="font-hi" style={{ fontSize: '11.5px', color: '#475569', marginBottom: '6px' }}>
                        👉 {q.hi}
                      </div>
                      {renderQuestionVisual(q)}
                      <div style={{ fontSize: '11.5px', margin: '6px 0' }}>
                        <strong>Correct Answer:</strong>{' '}
                        <span style={{ color: '#15803d', fontWeight: 'bold' }}>
                          ({String.fromCharCode(65 + q.ans)}) {q.opts[q.ans]}
                        </span>
                        {!isRight && !isSkipped && (
                          <div style={{ color: '#b91c1c', marginTop: '2px' }}>
                            <strong>Your Choice:</strong> ({String.fromCharCode(65 + u)}) {q.opts[u]}
                          </div>
                        )}
                      </div>
                      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '6px 8px', fontSize: '11.5px', color: '#334155' }}>
                        <strong>📖 Worksheet Explanation:</strong> {q.expl}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Confirmation Modal */}
      {showSubmitModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#b45309', marginBottom: '8px' }}>
              ⚠️ Confirm Test Submission
            </h3>
            <p style={{ fontSize: '13px', color: '#475569', marginBottom: '16px' }}>
              आपने 30 में से केवल <strong>{Object.keys(userAnswers).length} प्रश्न हल किए हैं</strong> (
              {activeQuestions.length - Object.keys(userAnswers).length} प्रश्न अभी शेष हैं)। क्या आप सचमुच टेस्ट सबमिट करना चाहते हैं?
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button className="quiet-btn" type="button" onClick={() => setShowSubmitModal(false)}>
                Continue Test (हल करते रहें)
              </button>
              <button className="mint-btn" type="button" onClick={() => finishExam(false)}>
                Submit Now (सबमिट करें)
              </button>
            </div>
          </div>
        </div>
      )}

      <footer>
        <div className="wrap" style={{ textAlign: 'center', fontSize: '12.5px', color: '#64748b' }}>
          <p>Class 2 Mathematics · Subtraction Strategies &amp; Fact Families · 3 Timed Tests (90 Questions)</p>
          <p style={{ marginTop: '4px' }}>
            Strictly Crafted from the 14 McGraw-Hill California Mathematics Chapter 3 Worksheet Attachments · Econova.vip
          </p>
        </div>
      </footer>
    </div>
  );
}
