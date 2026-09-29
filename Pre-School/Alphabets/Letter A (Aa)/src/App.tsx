import React, { useState } from 'react';
import {
  ThreeDLetterDisplay,
  LETTER_THEMES,
  ColorTheme,
} from './components/ThreeDLetterDisplay';
import { LetterOverwriteBox, OverwritePattern } from './components/LetterOverwriteBox';
import { tasks } from './questionsData';

interface StudioBoxItem {
  id: string;
  pattern: OverwritePattern;
  label: string;
  labelHi: string;
  speak: string;
}

const STUDIO_BOXES: StudioBoxItem[] = [
  {
    id: 'box-1',
    pattern: 'stroke1',
    label: 'Step 1 · Left Line (/)',
    labelHi: 'तिरछी रेखा 1',
    speak: 'Stroke one! Left slanting line.',
  },
  {
    id: 'box-2',
    pattern: 'stroke2',
    label: 'Step 2 · Right Line (\\)',
    labelHi: 'तिरछी रेखा 2',
    speak: 'Stroke two! Right slanting line.',
  },
  {
    id: 'box-3',
    pattern: 'stroke3',
    label: 'Step 3 · Middle Line (—)',
    labelHi: 'बीच की रेखा 3',
    speak: 'Stroke three! Sleeping line across.',
  },
  {
    id: 'box-4',
    pattern: 'A',
    label: 'Box 4 · Full Capital A',
    labelHi: 'पूरा बड़ा A',
    speak: 'Capital A! A for Apple!',
  },
  {
    id: 'box-5',
    pattern: 'A',
    label: 'Box 5 · Practice Capital A',
    labelHi: 'बड़ा अक्षर A',
    speak: 'Wonderful Capital A!',
  },
  {
    id: 'box-6',
    pattern: 'a',
    label: 'Box 6 · Small Letter a',
    labelHi: 'छोटा अक्षर a',
    speak: 'Small letter a!',
  },
  {
    id: 'box-7',
    pattern: 'a',
    label: 'Box 7 · Practice Small a',
    labelHi: 'छोटा a अभ्यास',
    speak: 'Great job writing small a!',
  },
  {
    id: 'box-8',
    pattern: 'Aa',
    label: 'Box 8 · Both Aa',
    labelHi: 'दोनों अक्षर Aa',
    speak: 'Capital A and small a!',
  },
];

const BIG_A_OBJECTS = [
  {
    emoji: '🍎',
    word: 'Apple',
    hiName: 'सेब (ऐप्पल)',
    speakEn: 'A for Apple',
    speakHi: 'ए से ऐप्पल, यानी सेब',
    bg: '#fff1f2',
    border: '#fda4af',
  },
  {
    emoji: '🐜',
    word: 'Ant',
    hiName: 'चींटी (ऐन्ट)',
    speakEn: 'A for Ant',
    speakHi: 'ए से ऐन्ट, यानी चींटी',
    bg: '#ecfdf5',
    border: '#6ee7b7',
  },
  {
    emoji: '✈️',
    word: 'Aeroplane',
    hiName: 'हवाई जहाज़ (एरोप्लेन)',
    speakEn: 'A for Aeroplane',
    speakHi: 'ए से एरोप्लेन, यानी हवाई जहाज़',
    bg: '#eff6ff',
    border: '#93c5fd',
  },
  {
    emoji: '🐊',
    word: 'Alligator',
    hiName: 'मगरमच्छ (ऐलिगेटर)',
    speakEn: 'A for Alligator',
    speakHi: 'ए से ऐलिगेटर, यानी मगरमच्छ',
    bg: '#f0fdf4',
    border: '#34d399',
  },
  {
    emoji: '🧑‍🚀',
    word: 'Astronaut',
    hiName: 'अंतरिक्ष यात्री (ऐस्ट्रोनॉट)',
    speakEn: 'A for Astronaut',
    speakHi: 'ए से ऐस्ट्रोनॉट, यानी अंतरिक्ष यात्री',
    bg: '#f5f3ff',
    border: '#c4b5fd',
  },
  {
    emoji: '🚑',
    word: 'Ambulance',
    hiName: 'एम्बुलेंस (अस्पताल गाड़ी)',
    speakEn: 'A for Ambulance',
    speakHi: 'ए से एम्बुलेंस',
    bg: '#fffbeb',
    border: '#fcd34d',
  },
  {
    emoji: '🏹',
    word: 'Arrow',
    hiName: 'तीर (ऐरो)',
    speakEn: 'A for Arrow',
    speakHi: 'ए से ऐरो, यानी तीर',
    bg: '#fefce8',
    border: '#fde047',
  },
  {
    emoji: '🪓',
    word: 'Axe',
    hiName: 'कुल्हाड़ी (ऐक्स)',
    speakEn: 'A for Axe',
    speakHi: 'ए से ऐक्स, यानी कुल्हाड़ी',
    bg: '#fff7ed',
    border: '#fdba74',
  },
  {
    emoji: '⚓',
    word: 'Anchor',
    hiName: 'जहाज़ का लंगर (ऐंकर)',
    speakEn: 'A for Anchor',
    speakHi: 'ए से ऐंकर, यानी लंगर',
    bg: '#f0f9ff',
    border: '#7dd3fc',
  },
  {
    emoji: '🐠',
    word: 'Aquarium',
    hiName: 'मछलीघर (अक्वेरियम)',
    speakEn: 'A for Aquarium',
    speakHi: 'ए से अक्वेरियम, यानी मछलीघर',
    bg: '#ecfeff',
    border: '#67e8f9',
  },
  {
    emoji: '⏰',
    word: 'Alarm Clock',
    hiName: 'अलार्म घड़ी',
    speakEn: 'A for Alarm Clock',
    speakHi: 'ए से अलार्म घड़ी',
    bg: '#fdf2f8',
    border: '#f9a8d4',
  },
  {
    emoji: '🥑',
    word: 'Avocado',
    hiName: 'एवोकाडो फल',
    speakEn: 'A for Avocado',
    speakHi: 'ए से एवोकाडो',
    bg: '#f7fee7',
    border: '#bef264',
  },
];

export default function App() {
  const [focusLetter, setFocusLetter] = useState<'A' | 'a' | 'Aa'>('A');
  const [selectedTheme, setSelectedTheme] = useState<ColorTheme>(LETTER_THEMES[0]);

  const [studioCompleted, setStudioCompleted] = useState<Record<string, boolean>>({});
  const [studioResetKey, setStudioResetKey] = useState(0);

  const [overwriteDone, setOverwriteDone] = useState<Record<number, boolean>>({});
  const [checkedResults, setCheckedResults] = useState<Record<number, 'correct' | 'empty'>>({});
  const [openHints, setOpenHints] = useState<Record<number, boolean>>({});
  const [showSnapshot, setShowSnapshot] = useState(false);
  const [tasksResetKey, setTasksResetKey] = useState(0);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const speakText = (text: string, lang = 'en-US') => {
    try {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = 0.85;
        window.speechSynthesis.speak(utterance);
      }
    } catch {
      // Ignore speech synthesis errors on restricted webviews
    }
  };

  const studioDoneCount = Object.values(studioCompleted).filter(Boolean).length;

  const fillAllStudioBoxes = () => {
    const all: Record<string, boolean> = {};
    STUDIO_BOXES.forEach((b) => {
      all[b.id] = true;
    });
    setStudioCompleted(all);
    speakText('All boxes filled with color! Great job learning Letter A!', 'en-US');
  };

  const resetStudioBoxes = () => {
    setStudioCompleted({});
    setStudioResetKey((k) => k + 1);
  };

  const checkSingleTask = (num: number) => {
    const done = Boolean(overwriteDone[num]);
    if (!done) {
      setCheckedResults((prev) => ({ ...prev, [num]: 'empty' }));
      return false;
    }
    setCheckedResults((prev) => ({ ...prev, [num]: 'correct' }));
    setOpenHints((prev) => ({ ...prev, [num]: true }));
    setShowSnapshot(false);
    return true;
  };

  const handleOverwriteTaskComplete = (num: number) => {
    setOverwriteDone((prev) => ({ ...prev, [num]: true }));
    setCheckedResults((prev) => ({ ...prev, [num]: 'correct' }));
    setOpenHints((prev) => ({ ...prev, [num]: true }));
  };

  const handleOverwriteTaskReset = (num: number) => {
    setOverwriteDone((prev) => {
      const next = { ...prev };
      delete next[num];
      return next;
    });
    setCheckedResults((prev) => {
      const next = { ...prev };
      delete next[num];
      return next;
    });
  };

  const checkAllTasks = () => {
    const nextResults: Record<number, 'correct' | 'empty'> = {};
    const nextHints: Record<number, boolean> = { ...openHints };
    tasks.forEach((t) => {
      if (overwriteDone[t.num]) {
        nextResults[t.num] = 'correct';
        nextHints[t.num] = true;
      } else {
        nextResults[t.num] = 'empty';
      }
    });
    setCheckedResults(nextResults);
    setOpenHints(nextHints);
    setShowSnapshot(true);
  };

  const resetAllTasks = () => {
    setOverwriteDone({});
    setCheckedResults({});
    setOpenHints({});
    setShowSnapshot(false);
    setTasksResetKey((k) => k + 1);
  };

  const totalCorrectCount = Object.values(overwriteDone).filter(Boolean).length;

  return (
    <div>
      {/* Exact Econova Sticky Header */}
      <header className="econova-site-header">
        <div className="econova-site-header__inner">
          <a
            className="econova-site-brand"
            href="#main"
            onClick={(e) => scrollToSection(e, 'main')}
            aria-label="Econova home"
          >
            <span className="econova-site-brand__mark" aria-hidden="true">✦</span>
            <span>Econova<em>.vip</em></span>
          </a>
          <nav className="econova-site-nav" aria-label="Main navigation">
            <a href="#big-objects" onClick={(e) => scrollToSection(e, 'big-objects')}>
              Our classes
            </a>
            <a href="#overwrite-studio" onClick={(e) => scrollToSection(e, 'overwrite-studio')}>
              Explore &amp; learn
            </a>
            <a href="#practice" onClick={(e) => scrollToSection(e, 'practice')}>
              Services
            </a>
            <a
              className="econova-site-nav__cta"
              href="#practice"
              onClick={(e) => scrollToSection(e, 'practice')}
            >
              <span>Let’s learn</span> <span aria-hidden="true">↗</span>
            </a>
          </nav>
        </div>
      </header>

      <main id="main" className="wrap">
        {/* Simple, Kid-Friendly Hero Section */}
        <section className="hero" aria-labelledby="chapter-title">
          <div>
            <div className="pill">
              <span>Pre-School · Alphabet Overwriting · Letter A (Aa)</span>
            </div>
            <h1 id="chapter-title">
              Learn &amp; Overwrite<br />
              <span className="green">
                <span className="underline">Letter A (Aa)</span>
              </span>
            </h1>
            <p className="hero-hindi hi" lang="hi">
              अक्षर A के ऊपर उंगली चलाएं, रंग भरें और A से शुरू होने वाले नाम सीखें!
            </p>
            <p className="hero-description">
              Look at the big <strong>3D Letter A</strong>, see big colourful pictures starting with{' '}
              <strong>A</strong>, and trace inside the simple overwriting boxes below!
            </p>

            <div className="hero-actions">
              <a
                className="mint-btn"
                href="#big-objects"
                onClick={(e) => scrollToSection(e, 'big-objects')}
              >
                See Big Letter A Pictures →
              </a>
              <a
                className="text-link"
                href="#practice"
                onClick={(e) => scrollToSection(e, 'practice')}
              >
                15 Simple Overwriting Tasks ↘
              </a>
            </div>

            <div className="hero-note">
              <span>✦ Big 3D Letter A</span>
              <span>✦ Big Picture Objects</span>
              <span>✦ 15 Simple Overwriting Tasks</span>
            </div>
          </div>

          {/* Right Hero Card: Big 3D Colored Letter A Showcase */}
          <div className="hero-art">
            <p className="eyebrow" style={{ textAlign: 'center', marginBottom: '8px' }}>
              Look at Big 3D Colored Letter A · बड़ा 3D रंगीन अक्षर देखें
            </p>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '8px',
                marginBottom: '12px',
                flexWrap: 'wrap',
              }}
            >
              <button
                type="button"
                className="filter-btn"
                aria-pressed={focusLetter === 'A'}
                onClick={() => setFocusLetter('A')}
                style={{ minHeight: '36px', padding: '6px 14px' }}
              >
                Capital A (बड़ा A)
              </button>
              <button
                type="button"
                className="filter-btn"
                aria-pressed={focusLetter === 'a'}
                onClick={() => setFocusLetter('a')}
                style={{ minHeight: '36px', padding: '6px 14px' }}
              >
                Small a (छोटा a)
              </button>
              <button
                type="button"
                className="filter-btn"
                aria-pressed={focusLetter === 'Aa'}
                onClick={() => setFocusLetter('Aa')}
                style={{ minHeight: '36px', padding: '6px 14px' }}
              >
                Both Aa (दोनों Aa)
              </button>
            </div>

            <ThreeDLetterDisplay
              letterMode={focusLetter}
              theme={selectedTheme}
              showStrokeGuides={true}
              onSpeak={speakText}
            />

            {/* Crayon Color Theme Selector */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                marginTop: '12px',
                flexWrap: 'wrap',
              }}
            >
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#065f46' }}>3D Color:</span>
              {LETTER_THEMES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedTheme(t)}
                  title={`${t.name} (${t.nameHi})`}
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${t.frontStart}, ${t.frontEnd})`,
                    border: selectedTheme.id === t.id ? '3px solid #111827' : '2px solid #ffffff',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  }}
                  aria-label={`Choose ${t.name} color`}
                />
              ))}
            </div>

            {/* Bilingual Audio Bar */}
            <div
              style={{
                background: 'white',
                padding: '12px 14px',
                borderRadius: '16px',
                border: '2px solid var(--line)',
                textAlign: 'center',
                marginTop: '12px',
              }}
            >
              <p className="english" style={{ fontSize: '20px' }}>
                <strong className="who-part">A a</strong> — <span className="action-part">🍎 A for Apple (सेब)</span>
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '8px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="listen-btn"
                  onClick={() => speakText('Letter A! A for Apple!', 'en-US')}
                >
                  🔊 Listen English
                </button>
                <button
                  type="button"
                  className="listen-btn listen-btn-hi"
                  onClick={() => speakText('अक्षर ए। ए फॉर ऐप्पल, यानी सेब।', 'hi-IN')}
                >
                  🗣️ हिन्दी में सुनें
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* BIG OBJECTS STARTING WITH LETTER A (Extra Large Visual Cards for Kids) */}
        <section className="section" id="big-objects" aria-labelledby="big-objects-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Big Picture Objects · A से शुरू होने वाले नाम</p>
              <h2 id="big-objects-title">Big Objects Starting with Letter A</h2>
            </div>
            <p>Tap any big picture to hear its name in English and Hindi!</p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
              gap: '20px',
            }}
          >
            {BIG_A_OBJECTS.map((item) => (
              <div
                key={item.word}
                style={{
                  background: '#ffffff',
                  border: '3px solid #34d399',
                  borderRadius: '26px',
                  padding: '22px 18px',
                  textAlign: 'center',
                  boxShadow: '0 7px 0 #d1fae5',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <div
                  onClick={() => speakText(item.speakEn, 'en-US')}
                  style={{
                    width: '156px',
                    height: '156px',
                    borderRadius: '32px',
                    background: item.bg,
                    border: `3.5px solid ${item.border}`,
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: '96px',
                    lineHeight: 1,
                    cursor: 'pointer',
                    boxShadow: '0 6px 14px rgba(0,0,0,0.06)',
                  }}
                  title={`Tap to hear ${item.word}`}
                >
                  <span role="img" aria-label={item.word}>
                    {item.emoji}
                  </span>
                </div>

                <div style={{ fontSize: '32px', fontWeight: 900, fontFamily: 'var(--heading)', lineHeight: 1.15 }}>
                  <span style={{ color: '#e11d48', textDecoration: 'underline' }}>
                    {item.word.charAt(0)}
                  </span>
                  <span style={{ color: '#1f2937' }}>{item.word.slice(1)}</span>
                </div>

                <p className="hi" style={{ fontSize: '18px', fontWeight: 800, color: '#059669' }}>
                  {item.hiName}
                </p>

                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2px' }}>
                  <button
                    type="button"
                    className="listen-btn"
                    onClick={() => speakText(item.speakEn, 'en-US')}
                  >
                    🔊 {item.word}
                  </button>
                  <button
                    type="button"
                    className="listen-btn listen-btn-hi"
                    onClick={() => speakText(item.speakHi, 'hi-IN')}
                  >
                    🗣️ नाम सुनें
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* INTERACTIVE OVERWRITING STUDIO */}
        <section className="studio-box" id="overwrite-studio" aria-labelledby="studio-title">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div>
              <p className="eyebrow">Practice Board · अक्षर A के ऊपर हाथ फेरें</p>
              <h2 id="studio-title" style={{ fontSize: 'clamp(20px, 3vw, 28px)', color: '#065f46' }}>
                Quick Overwriting Practice Boxes (A &amp; a)
              </h2>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <span className="pill" style={{ margin: 0 }}>
                <span>★ {studioDoneCount} of {STUDIO_BOXES.length} Colored</span>
              </span>
              <button
                type="button"
                className="mint-btn"
                onClick={fillAllStudioBoxes}
                style={{ padding: '9px 16px', fontSize: '13px' }}
              >
                ✨ Fill All Boxes
              </button>
              <button type="button" className="quiet-btn" onClick={resetStudioBoxes}>
                ↺ Reset
              </button>
            </div>
          </div>

          <p style={{ fontSize: '14px', color: '#374151', marginTop: '8px' }}>
            Trace over all the dots of each letter to fill it with complete 3D color!{' '}
            <span className="hi" style={{ color: '#059669', fontWeight: 'bold' }}>
              (बॉक्स में दिए हल्के अक्षर के ऊपर उंगली या माउस चलाकर पूरा रंग भरें!)
            </span>
          </p>

          <div className="overwrite-grid" key={studioResetKey}>
            {STUDIO_BOXES.map((box) => (
              <LetterOverwriteBox
                key={box.id}
                pattern={box.pattern}
                label={box.label}
                labelHi={box.labelHi}
                theme={selectedTheme}
                size="medium"
                isCompletedExternal={Boolean(studioCompleted[box.id])}
                onComplete={() =>
                  setStudioCompleted((prev) => ({
                    ...prev,
                    [box.id]: true,
                  }))
                }
                onReset={() =>
                  setStudioCompleted((prev) => {
                    const next = { ...prev };
                    delete next[box.id];
                    return next;
                  })
                }
                onSpeak={speakText}
                speakWord={box.speak}
              />
            ))}
          </div>
        </section>

        {/* 15 SIMPLE OVERWRITING TASKS WITH BIG OBJECTS */}
        <section className="mint-card practice-intro" id="practice">
          <p className="eyebrow">15 Simple Overwriting Tasks · 15 सरल ओवरराइटिंग अभ्यास</p>
          <h2>Overwrite Letter A &amp; Learn Object Names (Tasks 1 to 15)</h2>
          <p>
            Look at the <strong>big picture object</strong> in each card, say its name aloud, and{' '}
            <strong>overwrite the letter inside the box</strong>!
          </p>

          <div className="progress-row">
            <div style={{ fontWeight: 800, color: '#059669', fontSize: '15px' }}>
              ✦ Simple Overwriting Only (Tasks 1–15) · Big Objects Starting with A
            </div>
            <div className="progress-meta">
              <span id="progress-text">{totalCorrectCount} of 15 tasks completed</span>
              <progress id="progress" max={15} value={totalCorrectCount} />
            </div>
          </div>
        </section>

        {/* 15 Overwriting Tasks Grid */}
        <div className="questions-grid" id="questions-container" key={tasksResetKey}>
          {tasks.map((q) => {
            const num = q.num;
            const status = checkedResults[num];
            const isHintOpen = Boolean(openHints[num]);
            const taskTheme = LETTER_THEMES[q.themeIndex % LETTER_THEMES.length];

            return (
              <article className="mint-card question-card" id={`question-${num}`} key={num}>
                <div className="qtop">
                  <span className="eyebrow">Overwrite Task {num < 10 ? '0' + num : num} of 15</span>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <button
                      type="button"
                      className="listen-btn"
                      style={{ padding: '4px 10px', fontSize: '12px' }}
                      onClick={() => speakText(q.speakWord, 'en-US')}
                    >
                      🔊 Listen
                    </button>
                    <span className="qstate">
                      {overwriteDone[num]
                        ? '✓ Completed'
                        : status === 'empty'
                        ? 'Overwrite first'
                        : 'Your turn'}
                    </span>
                  </div>
                </div>

                {/* EXTRA LARGE OBJECT SHOWCASE BANNER INSIDE EACH TASK */}
                <div
                  style={{
                    background: '#fffbeb',
                    border: '3px solid #fcd34d',
                    borderRadius: '22px',
                    padding: '16px 18px',
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '18px',
                  }}
                >
                  <div
                    onClick={() => speakText(q.speakWord, 'en-US')}
                    style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: '26px',
                      background: '#ffffff',
                      border: '3px solid #34d399',
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: '76px',
                      lineHeight: 1,
                      flexShrink: 0,
                      cursor: 'pointer',
                      boxShadow: '0 5px 0 #d1fae5',
                    }}
                    title={`Tap to hear ${q.objectName}`}
                  >
                    <span role="img" aria-label={q.objectName}>
                      {q.emoji}
                    </span>
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 'clamp(24px, 3vw, 30px)',
                        fontWeight: 900,
                        fontFamily: 'var(--heading)',
                        lineHeight: 1.15,
                        color: '#1f2937',
                      }}
                    >
                      <span style={{ color: '#e11d48', textDecoration: 'underline' }}>
                        {q.objectName.charAt(0)}
                      </span>
                      <span>{q.objectName.slice(1)}</span>
                    </div>
                    <p className="hi" style={{ fontSize: '18px', fontWeight: 800, color: '#059669', marginTop: '4px' }}>
                      {q.objectNameHi}
                    </p>
                    <p className="hi" style={{ fontSize: '13px', color: '#4b5563', marginTop: '2px' }}>
                      {q.objectDescHi}
                    </p>
                  </div>
                </div>

                <h3>{q.title}</h3>
                <p className="qprompt">{q.prompt}</p>

                {/* Centered Interactive Overwriting Box (No overlapping word suffix inside SVG) */}
                <div style={{ marginBottom: '12px' }}>
                  <LetterOverwriteBox
                    pattern={q.overwritePattern}
                    emoji={q.emoji}
                    label={`Overwrite Letter (${q.objectName})`}
                    labelHi="अक्षर के ऊपर लिखें"
                    theme={taskTheme}
                    size="medium"
                    isCompletedExternal={Boolean(overwriteDone[num])}
                    onComplete={() => handleOverwriteTaskComplete(num)}
                    onReset={() => handleOverwriteTaskReset(num)}
                    onSpeak={speakText}
                    speakWord={q.speakWord}
                  />
                </div>

                <div className="question-bottom">
                  <button
                    className="mint-btn check-btn"
                    type="button"
                    onClick={() => checkSingleTask(num)}
                  >
                    <span>
                      {overwriteDone[num]
                        ? '✓ Letter Filled in Complete Color!'
                        : 'Check answer ✓'}
                    </span>
                  </button>

                  <p
                    className="feedback"
                    data-state={status === 'correct' ? 'correct' : status ? 'retry' : undefined}
                    style={{ display: status ? 'block' : 'none' }}
                  >
                    {status === 'correct'
                      ? '✓ Correct! Super star! / बिल्कुल सही! शाबाश! 🌟'
                      : status === 'empty'
                      ? 'Please overwrite the full letter inside the box first! / पहले बॉक्स में पूरे अक्षर के ऊपर हाथ फेरें।'
                      : ''}
                  </p>

                  <div className="hint-box">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenHints((prev) => ({
                          ...prev,
                          [num]: !prev[num],
                        }))
                      }
                      style={{
                        background: 'none',
                        border: 0,
                        padding: 0,
                        width: '100%',
                        textAlign: 'left',
                        fontWeight: 'bold',
                        color: '#92400e',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <span>{isHintOpen ? '▾' : '▸'}</span>
                      <span>
                        Parent Hint <span lang="hi" className="hi">· सरल संकेत</span>
                      </span>
                    </button>
                    <p style={{ display: isHintOpen ? 'block' : 'none' }}>{q.hint}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Check All 15 Tasks Bar */}
        <section className="amber-card check-all-bar">
          <div>
            <h2>Check all 15 Overwriting Tasks!</h2>
            <p>Review your child’s progress across all 15 simple Letter A overwriting tasks.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <button className="mint-btn" type="button" onClick={checkAllTasks}>
              Check all 15 tasks ✓
            </button>
            <button className="quiet-btn" type="button" onClick={resetAllTasks}>
              ↺ Reset all tasks
            </button>
          </div>
        </section>

        {/* Results Box */}
        <section
          className="mint-card results-box"
          id="results"
          tabIndex={-1}
          style={{ display: showSnapshot ? 'block' : 'none' }}
        >
          <h2>Your Letter A Overwriting Progress</h2>
          <p style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '10px' }}>
            <span>
              {totalCorrectCount} out of 15 tasks completed ({Math.round((totalCorrectCount / 15) * 100)}%)!
            </span>
          </p>
          <p style={{ color: '#047857', marginTop: '8px', fontWeight: 700 }}>
            <span>
              {totalCorrectCount === 15
                ? '🌟 Champion! You completed all 15 Letter A overwriting tasks! / बधाई हो! बच्चे ने अक्षर A के सभी 15 ओवरराइटिंग अभ्यास पूरे कर लिए हैं!'
                : 'Keep tracing the letters inside the boxes—every try makes your handwriting stronger! / अभ्यास जारी रखें!'}
            </span>
          </p>
        </section>

        {/* Lesson End Navigation */}
        <nav className="lesson-end-nav" aria-label="Lesson navigation">
          <a
            className="mint-btn"
            href="#big-objects"
            onClick={(e) => scrollToSection(e, 'big-objects')}
          >
            See Big Letter A Pictures ↑
          </a>
          <a
            className="text-link"
            href="#main"
            onClick={(e) => scrollToSection(e, 'main')}
          >
            Back to top ↑
          </a>
        </nav>
      </main>

      {/* Exact Econova Footer */}
      <footer className="econova-site-footer" id="top">
        <div className="econova-site-footer__inner">
          <a
            className="econova-site-footer__brand"
            href="#main"
            onClick={(e) => scrollToSection(e, 'main')}
          >
            Econova.vip ✦
          </a>
          <p className="econova-site-footer__copy">
            © 2026 Econova.vip · Made for little minds with big ideas.
          </p>
          <nav className="econova-site-footer__links" aria-label="Footer navigation">
            <a href="#big-objects" onClick={(e) => scrollToSection(e, 'big-objects')}>
              Classes
            </a>
            <a href="#overwrite-studio" onClick={(e) => scrollToSection(e, 'overwrite-studio')}>
              Explore
            </a>
            <a href="#practice" onClick={(e) => scrollToSection(e, 'practice')}>
              Services
            </a>
            <a href="mailto:econovavip@gmail.com">Contact</a>
            <a
              href="#main"
              onClick={(e) => scrollToSection(e, 'main')}
              className="econova-back-to-top"
            >
              Back to top ↑
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
