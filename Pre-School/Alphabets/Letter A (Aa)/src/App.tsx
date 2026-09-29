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
    label: 'Box 1 · Left Slant (/)',
    labelHi: 'तिरछी रेखा 1',
    speak: 'Stroke one! Left slanting line.',
  },
  {
    id: 'box-2',
    pattern: 'stroke2',
    label: 'Box 2 · Right Slant (\\)',
    labelHi: 'तिरछी रेखा 2',
    speak: 'Stroke two! Right slanting line.',
  },
  {
    id: 'box-3',
    pattern: 'stroke3',
    label: 'Box 3 · Middle Bridge (—)',
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
    label: 'Box 8 · Capital & Small Aa',
    labelHi: 'दोनों अक्षर Aa',
    speak: 'Capital A and small a! Complete!',
  },
];

interface SceneLine {
  no: string;
  speaker: string;
  emoji: string;
  word: string;
  englishRest: string;
  fullEn: string;
  pronunciationHi: string;
  meaningHi: string;
  parentTip: string;
}

const SCENE_DATA: {
  id: string;
  eyebrow: string;
  title: string;
  titleHi: string;
  nextId: string;
  nextLabel: string;
  asideEmoji: string;
  asideText: string;
  badgeNum: string;
  badgeText: string;
  lines: SceneLine[];
}[] = [
  {
    id: 'scene-1',
    eyebrow: 'Scene 01 · Everyday Words Starting with A',
    title: 'A for Apple & A for Ant',
    titleHi: 'A से सेब (Apple) और A से चींटी (Ant)',
    nextId: 'scene-2',
    nextLabel: 'Next scene ↓',
    asideEmoji: '🍎 🐜 🌳',
    asideText: 'Point to the red letter A at the start of Apple and Ant. Say the short /æ/ ("ऐ") sound aloud!',
    badgeNum: '1',
    badgeText: 'Scene 1 · Apple & Ant',
    lines: [
      {
        no: '01',
        speaker: '🍎 Word 1 · Apple',
        emoji: '🍎',
        word: 'Apple',
        englishRest: 'is a sweet red fruit.',
        fullEn: 'A for Apple. Apple is a sweet red fruit.',
        pronunciationHi: 'ए फ़ॉर ऐप्पल। ऐप्पल इज़ अ स्वीट रेड फ्रूट।',
        meaningHi: 'A से सेब (Apple)। सेब एक मीठा लाल फल है।',
        parentTip: 'Ask your child to point to the first letter "A" in Apple and trace it in the air with their finger. (बच्चे से Apple के पहले अक्षर A पर उंगली रखवाएं।)',
      },
      {
        no: '02',
        speaker: '🐜 Word 2 · Ant',
        emoji: '🐜',
        word: 'Ant',
        englishRest: 'works hard all day.',
        fullEn: 'A for Ant. The little ant works hard all day.',
        pronunciationHi: 'ए फ़ॉर ऐन्ट। द लिटिल ऐन्ट वर्क्स हार्ड ऑल डे।',
        meaningHi: 'A से चींटी (Ant)। नन्हीं चींटी पूरे दिन मेहनत करती है।',
        parentTip: 'Ant has only 3 letters: A - N - T. Sound it out slowly: /æ/ - /n/ - /t/. (A-N-T की स्पेलिंग बहुत छोटी और सरल है।)',
      },
      {
        no: '03',
        speaker: '💪 Word 3 · Arm',
        emoji: '💪',
        word: 'Arm',
        englishRest: 'helps me write and play.',
        fullEn: 'A for Arm. My strong arm helps me write and play.',
        pronunciationHi: 'ए फ़ॉर आर्म। माई स्ट्रॉन्ग आर्म हेल्प्स मी राइट एंड प्ले।',
        meaningHi: 'A से बांह (Arm)। मेरी मज़बूत बांह मुझे लिखने और खेलने में मदद करती है।',
        parentTip: 'Have your child lift their arm while saying "A for Arm!" (बच्चे से अपनी बांह उठाकर "A for Arm" बोलने को कहें।)',
      },
    ],
  },
  {
    id: 'scene-2',
    eyebrow: 'Scene 02 · Sky & Space Adventures with A',
    title: 'A for Aeroplane & Astronaut',
    titleHi: 'A से हवाई जहाज़ (Aeroplane) और अंतरिक्ष यात्री (Astronaut)',
    nextId: 'scene-3',
    nextLabel: 'Next scene ↓',
    asideEmoji: '✈️ 🧑‍🚀 🌟',
    asideText: 'Look up at the sky! Both Aeroplane and Astronaut begin with Capital Letter A.',
    badgeNum: '2',
    badgeText: 'Scene 2 · Sky & Space',
    lines: [
      {
        no: '04',
        speaker: '✈️ Word 4 · Aeroplane',
        emoji: '✈️',
        word: 'Aeroplane',
        englishRest: 'flies high in the sky.',
        fullEn: 'A for Aeroplane. The aeroplane flies high in the sky.',
        pronunciationHi: 'ए फ़ॉर एरोप्लेन। द एरोप्लेन फ्लाइज़ हाई इन द स्काई।',
        meaningHi: 'A से हवाई जहाज़ (Aeroplane)। हवाई जहाज़ आसमान में ऊँचा उड़ता है।',
        parentTip: 'Spread arms like wings and zoom around while saying "A for Aeroplane!" (दोनों हाथ पंख की तरह फैलाकर बच्चे को A सिखाएं।)',
      },
      {
        no: '05',
        speaker: '🧑‍🚀 Word 5 · Astronaut',
        emoji: '🧑‍🚀',
        word: 'Astronaut',
        englishRest: 'travels to the stars.',
        fullEn: 'A for Astronaut. The astronaut travels to the stars.',
        pronunciationHi: 'ए फ़ॉर ऐस्ट्रोनॉट। द ऐस्ट्रोनॉट ट्रैवल्स टू द स्टार्स।',
        meaningHi: 'A से अंतरिक्ष यात्री (Astronaut)। अंतरिक्ष यात्री तारों की सैर करता है।',
        parentTip: 'Explain in Hindi that an Astronaut (अंतरिक्ष यात्री) goes into space in a rocket. (बच्चे को बताएं कि अंतरिक्ष में जाने वाले को Astronaut कहते हैं।)',
      },
      {
        no: '06',
        speaker: '🏹 Word 6 · Arrow',
        emoji: '🏹',
        word: 'Arrow',
        englishRest: 'points the right way.',
        fullEn: 'A for Arrow. The sharp arrow points the right way.',
        pronunciationHi: 'ए फ़ॉर ऐरो। द शार्प ऐरो पॉइंट्स द राइट वे।',
        meaningHi: 'A से तीर (Arrow)। नुकीला तीर सही दिशा दिखाता है।',
        parentTip: 'Show how the top peak of Capital A (/\\) looks just like the tip of an Arrow! (बच्चे को दिखाएं कि A का ऊपरी सिरा तीर की नोक जैसा होता है।)',
      },
    ],
  },
  {
    id: 'scene-3',
    eyebrow: 'Scene 03 · Animals & Helpers Starting with A',
    title: 'A for Alligator & Ambulance',
    titleHi: 'A से मगरमच्छ (Alligator) और एम्बुलेंस (Ambulance)',
    nextId: 'scene-4',
    nextLabel: 'Next scene ↓',
    asideEmoji: '🐊 🚑 🐠',
    asideText: 'Notice how some words have Capital A at the start AND small a inside them!',
    badgeNum: '3',
    badgeText: 'Scene 3 · Animals & Helpers',
    lines: [
      {
        no: '07',
        speaker: '🐊 Word 7 · Alligator',
        emoji: '🐊',
        word: 'Alligator',
        englishRest: 'swims in the green river.',
        fullEn: 'A for Alligator. The alligator swims in the green river.',
        pronunciationHi: 'ए फ़ॉर ऐलिगेटर। द ऐलिगेटर स्विम्स इन द ग्रीन रिवर।',
        meaningHi: 'A से मगरमच्छ / घड़ियाल (Alligator)। मगरमच्छ हरी नदी में तैरता है।',
        parentTip: 'Spot both Capital A at the beginning and small "a" inside Allig-a-tor! (इसमें शुरू में बड़ा A और बीच में छोटा a दोनों दिखाएं।)',
      },
      {
        no: '08',
        speaker: '🚑 Word 8 · Ambulance',
        emoji: '🚑',
        word: 'Ambulance',
        englishRest: 'rushes to help sick people.',
        fullEn: 'A for Ambulance. The ambulance rushes to help sick people.',
        pronunciationHi: 'ए फ़ॉर ऐम्बुलेंस। द ऐम्बुलेंस रशेज़ टू हेल्प सिक पीपल।',
        meaningHi: 'A से एम्बुलेंस (Ambulance)। एम्बुलेंस बीमार लोगों की मदद के लिए तेज़ी से जाती है।',
        parentTip: 'Teach children that an ambulance is an emergency helper vehicle starting with A. (बच्चों को बताएं कि एम्बुलेंस अस्पताल की गाड़ी है।)',
      },
      {
        no: '09',
        speaker: '🐠 Word 9 · Aquarium',
        emoji: '🐠',
        word: 'Aquarium',
        englishRest: 'holds colorful fish.',
        fullEn: 'A for Aquarium. The glass aquarium holds colorful fish.',
        pronunciationHi: 'ए फ़ॉर अक्वेरियम। द ग्लास अक्वेरियम होल्ड्स कलरफुल फ़िश।',
        meaningHi: 'A से मछलीघर (Aquarium)। काँच के मछलीघर में रंग-बिरंगी मछलियाँ रहती हैं।',
        parentTip: 'Aquarium starts with A and ends with m! (Aquarium यानी काँच का मछलीघर।)',
      },
    ],
  },
  {
    id: 'scene-4',
    eyebrow: 'Scene 04 · Tools, Ships & Nature with A',
    title: 'A for Axe, Anchor & Acorn',
    titleHi: 'A से कुल्हाड़ी (Axe), लंगर (Anchor) और शाहबलूत (Acorn)',
    nextId: 'parent-guide',
    nextLabel: 'Parent guide ↓',
    asideEmoji: '🪓 ⚓ 🎨',
    asideText: 'Read and listen to these final Letter A words before trying all 50 tasks!',
    badgeNum: '4',
    badgeText: 'Scene 4 · More A Words',
    lines: [
      {
        no: '10',
        speaker: '🪓 Word 10 · Axe',
        emoji: '🪓',
        word: 'Axe',
        englishRest: 'cuts the dry wood.',
        fullEn: 'A for Axe. The strong axe cuts the dry wood.',
        pronunciationHi: 'ए फ़ॉर ऐक्स। द स्ट्रॉन्ग ऐक्स कट्स द ड्राई वुड।',
        meaningHi: 'A से कुल्हाड़ी (Axe)। मज़बूत कुल्हाड़ी सूखी लकड़ी काटती है।',
        parentTip: 'Axe is a short 3-letter word: A - X - E. Easy for Class 1 kids to spell! (A-X-E तीन अक्षरों का छोटा शब्द है।)',
      },
      {
        no: '11',
        speaker: '⚓ Word 11 · Anchor',
        emoji: '⚓',
        word: 'Anchor',
        englishRest: 'keeps the big ship safe.',
        fullEn: 'A for Anchor. The heavy anchor keeps the big ship safe.',
        pronunciationHi: 'ए फ़ॉर ऐंकर। द हेवी ऐंकर कीप्स द बिग शिप सेफ़।',
        meaningHi: 'A से लंगर (Anchor)। भारी लंगर बड़े जहाज़ को पानी में सुरक्षित रोककर रखता है।',
        parentTip: 'Anchor starts with Letter A. (पानी के जहाज़ को रोकने वाले लोहे के हुक को लंगर / Anchor कहते हैं।)',
      },
      {
        no: '12',
        speaker: '🎨 Word 12 · Art',
        emoji: '🎨',
        word: 'Art',
        englishRest: 'fills our world with colors!',
        fullEn: 'A for Art. Coloring Letter A is fun art!',
        pronunciationHi: 'ए फ़ॉर आर्ट। कलरिंग लेटर ए इज़ फ़न आर्ट!',
        meaningHi: 'A से कला / चित्रकला (Art)। अक्षर A में रंग भरना एक मज़ेदार कला है!',
        parentTip: 'A - R - T spells Art! Overwriting letters with colors makes learning joyful. (A-R-T यानी चित्रकला।)',
      },
    ],
  },
];

const VOCAB_WORDS = [
  { word: 'Apple', sound: 'ऐप्पल', meaning: '🍎 सेब (एक मीठा लाल फल)', hiSpeak: 'सेब' },
  { word: 'Ant', sound: 'ऐन्ट', meaning: '🐜 चींटी (मेहनती नन्हा कीट)', hiSpeak: 'चींटी' },
  { word: 'Aeroplane', sound: 'एरोप्लेन', meaning: '✈️ हवाई जहाज़', hiSpeak: 'हवाई जहाज़' },
  { word: 'Alligator', sound: 'ऐलिगेटर', meaning: '🐊 मगरमच्छ / घड़ियाल', hiSpeak: 'मगरमच्छ' },
  { word: 'Astronaut', sound: 'ऐस्ट्रोनॉट', meaning: '🧑‍🚀 अंतरिक्ष यात्री', hiSpeak: 'अंतरिक्ष यात्री' },
  { word: 'Arrow', sound: 'ऐरो', meaning: '🏹 तीर (दिशा बताने वाला चिह्न)', hiSpeak: 'तीर' },
  { word: 'Axe', sound: 'ऐक्स', meaning: '🪓 कुल्हाड़ी', hiSpeak: 'कुल्हाड़ी' },
  { word: 'Ambulance', sound: 'ऐम्बुलेंस', meaning: '🚑 रोगी वाहन (अस्पताल की गाड़ी)', hiSpeak: 'एम्बुलेंस' },
  { word: 'Anchor', sound: 'ऐंकर', meaning: '⚓ जहाज़ का लंगर', hiSpeak: 'लंगर' },
  { word: 'Arm', sound: 'आर्म', meaning: '💪 बांह / भुजा', hiSpeak: 'बांह' },
  { word: 'Art', sound: 'आर्ट', meaning: '🎨 कला / चित्रकारी', hiSpeak: 'कला' },
  { word: 'Aquarium', sound: 'अक्वेरियम', meaning: '🐠 मछलीघर (काँच का टैंक)', hiSpeak: 'मछलीघर' },
];

export default function App() {
  const [focusLetter, setFocusLetter] = useState<'A' | 'a' | 'Aa'>('A');
  const [selectedTheme, setSelectedTheme] = useState<ColorTheme>(LETTER_THEMES[0]);
  const [hideSupport, setHideSupport] = useState(false);

  const [studioCompleted, setStudioCompleted] = useState<Record<string, boolean>>({});
  const [studioResetKey, setStudioResetKey] = useState(0);

  const [activeFilter, setActiveFilter] = useState<'all' | 'A' | 'B' | 'C' | 'D'>('all');
  const [mcqSelections, setMcqSelections] = useState<Record<number, number>>({});
  const [fillInputs, setFillInputs] = useState<Record<number, string>>({});
  const [overwriteDone, setOverwriteDone] = useState<Record<number, boolean>>({});
  const [checkedResults, setCheckedResults] = useState<Record<number, 'correct' | 'retry' | 'empty'>>({});
  const [openHints, setOpenHints] = useState<Record<number, boolean>>({});
  const [showSnapshot, setShowSnapshot] = useState(false);
  const [tasksResetKey, setTasksResetKey] = useState(0);

  // Safe scroll helper so clicking links never causes iframe URL navigation issues
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
    speakText('All boxes filled with complete 3D color! Great job learning Letter A!', 'en-US');
  };

  const resetStudioBoxes = () => {
    setStudioCompleted({});
    setStudioResetKey((k) => k + 1);
  };

  const isTaskAnswerCorrect = (num: number): { complete: boolean; correct: boolean } => {
    const t = tasks[num - 1];
    if (t.kind === 'overwrite') {
      const done = Boolean(overwriteDone[num]);
      return { complete: done, correct: done };
    }
    if (t.kind === 'mcq') {
      const sel = mcqSelections[num];
      const hasSel = sel !== undefined;
      return { complete: hasSel, correct: hasSel && sel === t.answer };
    }
    const val = (fillInputs[num] || '').trim().toLowerCase().replace(/\s+/g, ' ');
    return {
      complete: Boolean(val),
      correct: Boolean(val) && (t.accepted || []).map((a) => a.toLowerCase()).includes(val),
    };
  };

  const checkSingleTask = (num: number) => {
    const res = isTaskAnswerCorrect(num);
    if (!res.complete) {
      setCheckedResults((prev) => ({ ...prev, [num]: 'empty' }));
      return false;
    }
    setCheckedResults((prev) => ({ ...prev, [num]: res.correct ? 'correct' : 'retry' }));
    setOpenHints((prev) => ({ ...prev, [num]: true }));
    setShowSnapshot(false);
    return res.correct;
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

  const clearTaskFeedback = (num: number) => {
    setCheckedResults((prev) => {
      const next = { ...prev };
      delete next[num];
      return next;
    });
    setShowSnapshot(false);
  };

  const checkAllTasks = () => {
    const nextResults: Record<number, 'correct' | 'retry' | 'empty'> = {};
    const nextHints: Record<number, boolean> = { ...openHints };
    tasks.forEach((t) => {
      const res = isTaskAnswerCorrect(t.num);
      if (!res.complete) {
        nextResults[t.num] = 'empty';
      } else {
        nextResults[t.num] = res.correct ? 'correct' : 'retry';
        nextHints[t.num] = true;
      }
    });
    setCheckedResults(nextResults);
    setOpenHints(nextHints);
    setShowSnapshot(true);
  };

  const resetAllTasks = () => {
    setMcqSelections({});
    setFillInputs({});
    setOverwriteDone({});
    setCheckedResults({});
    setOpenHints({});
    setShowSnapshot(false);
    setTasksResetKey((k) => k + 1);
  };

  const totalCorrectCount = Object.values(checkedResults).filter((v) => v === 'correct').length;
  const visibleTasks =
    activeFilter === 'all' ? tasks : tasks.filter((t) => t.section === activeFilter);

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
            <a href="#learn" onClick={(e) => scrollToSection(e, 'learn')}>
              Our classes
            </a>
            <a href="#overwrite-studio" onClick={(e) => scrollToSection(e, 'overwrite-studio')}>
              Explore &amp; learn
            </a>
            <a href="#parent-guide" onClick={(e) => scrollToSection(e, 'parent-guide')}>
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
        {/* Hero Section */}
        <section className="hero" aria-labelledby="chapter-title">
          <div>
            <div className="pill">Class 1 &amp; Pre-Primary · Alphabet Overwriting · Letter 01</div>
            <h1 id="chapter-title">
              Alphabet Overwriting<br />
              <span className="green">
                <span className="underline">Letter A (Aa)</span>
              </span>
            </h1>
            <p className="hero-hindi hi" lang="hi">
              अक्षर A के ऊपर लिखें और पूरा रंग भरें (English &amp; Hindi Parent-Child Lesson)
            </p>
            <p className="hero-description">
              First look at the big <strong>3D Full-Color Letter A</strong>! Then trace and overwrite on the
              partially visible letters in the boxes below—once your child traces the full letter, it magically
              fills with complete 3D color!
              <br />
              <span className="hi" style={{ color: '#059669', fontWeight: 'bold' }}>
                माता-पिता के लिए सरल निर्देश: पहले बच्चे को ऊपर बड़ा रंगीन 3D अक्षर A दिखाएं, फिर नीचे बॉक्स में बने हल्के (आधे दिख रहे) अक्षरों के सभी बिंदुओं पर उंगली या माउस चलवाएं। पूरा अक्षर लिखते ही वह 3D रंग से भर जाएगा!
              </span>
            </p>

            <div className="hero-actions">
              <a
                className="mint-btn"
                href="#overwrite-studio"
                onClick={(e) => scrollToSection(e, 'overwrite-studio')}
              >
                Start Overwriting Box Studio →
              </a>
              <a
                className="text-link"
                href="#practice"
                onClick={(e) => scrollToSection(e, 'practice')}
              >
                Try all 50 Letter A Tasks ↘
              </a>
            </div>

            <div className="hero-note">
              <span>✦ Big 3D Colored Letter A</span>
              <span>✦ Partially Visible Overwrite Boxes</span>
              <span>✦ English + Hindi for Parents</span>
              <span>✦ 50 Interactive Tasks</span>
            </div>
          </div>

          {/* Right Hero Card: Big 3D Colored Letter A Showcase */}
          <div className="hero-art">
            <p className="eyebrow" style={{ textAlign: 'center', marginBottom: '8px' }}>
              Step 1 · Look at Big 3D Colored Letter A · बड़ा 3D रंगीन अक्षर देखें
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
              <p className="english" style={{ fontSize: '19px' }}>
                <strong className="who-part">A a</strong> — <span className="action-part">🍎 A for Apple (सेब)</span>
              </p>
              <p className="hi" style={{ fontSize: '13px', color: '#047857', fontWeight: 'bold', marginTop: '4px' }}>
                उच्चारण: &ldquo;ए&rdquo; (फ़ोनिक्स ध्वनि: &ldquo;ऐ&rdquo; जैसे ऐप्पल, ऐन्ट)
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '8px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="listen-btn"
                  onClick={() => speakText('Letter A! A says aah, A for Apple!', 'en-US')}
                >
                  🔊 Listen English
                </button>
                <button
                  type="button"
                  className="listen-btn listen-btn-hi"
                  onClick={() => speakText('अक्षर ए। ए से ऐप्पल, यानी सेब।', 'hi-IN')}
                >
                  🗣️ हिन्दी में सुनें
                </button>
              </div>
            </div>

            <p className="art-caption">3D FULL COLOR LETTER A · FIRST SEE, THEN OVERWRITE BELOW</p>
          </div>
        </section>

        {/* SECTION 1: One Letter at a Time — Step-by-Step Bilingual Parent & Child Guide */}
        <section className="section" id="learn" aria-labelledby="learn-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Section 1 · One Letter at a Time · एक समय में एक अक्षर</p>
              <h2 id="learn-heading">How to Write Letter A Step by Step (English &amp; Hindi)</h2>
            </div>
            <p>
              Simple instructions in English and Hindi so parents can easily guide their child’s hand!
            </p>
          </div>

          <div className="rules-grid">
            <article className="mint-card lesson">
              <p className="eyebrow">First Letter · Capital Letter A · बड़ा अक्षर A</p>
              <h3 style={{ fontSize: '22px', color: 'var(--brand)', margin: '6px 0 10px' }}>
                1. Capital &ldquo;A&rdquo; Has 3 Simple Lines (बड़ा A तीन रेखाओं से बनता है)
              </h3>
              <p style={{ fontSize: '14px', color: '#374151' }}>
                Show your child how Capital <strong>A</strong> looks like a pointed roof or tent with a bridge in the middle:
              </p>

              <div style={{ display: 'grid', gap: '10px', margin: '14px 0' }}>
                <div
                  style={{
                    background: '#f0fdf4',
                    padding: '12px 16px',
                    borderRadius: '14px',
                    border: '2px solid #34d399',
                  }}
                >
                  <strong>1️⃣ Stroke 1: Left Slanting Line ( / )</strong>
                  <p className="hi" style={{ fontSize: '13px', color: '#065f46', marginTop: '2px' }}>
                    <strong>कदम 1 (बाईं तिरछी रेखा):</strong> सबसे ऊपर की लाल लाइन पर पेंसिल रखें और नीचे बाईं ओर तीसरी (नीली) लाइन तक तिरछी रेखा खींचें।
                  </p>
                </div>

                <div
                  style={{
                    background: '#f0fdf4',
                    padding: '12px 16px',
                    borderRadius: '14px',
                    border: '2px solid #34d399',
                  }}
                >
                  <strong>2️⃣ Stroke 2: Right Slanting Line ( \ )</strong>
                  <p className="hi" style={{ fontSize: '13px', color: '#065f46', marginTop: '2px' }}>
                    <strong>कदम 2 (दाईं तिरछी रेखा):</strong> वापस ऊपर के उसी बिंदु पर जाएं और नीचे दाईं ओर तीसरी (नीली) लाइन तक दूसरी तिरछी रेखा खींचें।
                  </p>
                </div>

                <div
                  style={{
                    background: '#f0fdf4',
                    padding: '12px 16px',
                    borderRadius: '14px',
                    border: '2px solid #34d399',
                  }}
                >
                  <strong>3️⃣ Stroke 3: Middle Sleeping Bridge ( — )</strong>
                  <p className="hi" style={{ fontSize: '13px', color: '#065f46', marginTop: '2px' }}>
                    <strong>कदम 3 (बीच की आड़ी रेखा):</strong> अब बीच की नीली लाइन पर बाएं से दाएं एक छोटी सोती हुई (आड़ी) रेखा खींचकर दोनों सिरों को जोड़ दें!
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="listen-btn"
                  onClick={() =>
                    speakText(
                      'To write Capital A: First, slant down left. Second, slant down right. Third, draw a sleeping line across the middle.',
                      'en-US'
                    )
                  }
                >
                  🔊 Listen English Guide
                </button>
                <button
                  type="button"
                  className="listen-btn listen-btn-hi"
                  onClick={() =>
                    speakText(
                      'बड़ा अक्षर ए लिखने के लिए: पहले ऊपर से बाईं तिरछी रेखा खींचें, फिर दाईं तिरछी रेखा खींचें, और अंत में बीच में आड़ी रेखा से जोड़ दें।',
                      'hi-IN'
                    )
                  }
                >
                  🗣️ माता-पिता निर्देश सुनें
                </button>
              </div>
            </article>

            <article className="amber-card lesson">
              <p className="eyebrow">Second Letter · Small Letter a · छोटा अक्षर a</p>
              <h3 style={{ fontSize: '22px', color: '#92400e', margin: '6px 0 10px' }}>
                2. Small &ldquo;a&rdquo; Has 2 Simple Movements (छोटा a दो चरणों में बनता है)
              </h3>
              <p style={{ fontSize: '14px', color: '#451a03' }}>
                Once your child knows Capital <strong>A</strong>, introduce its little partner: small letter{' '}
                <strong>a</strong>! It stays neatly inside the two middle blue lines:
              </p>

              <div style={{ display: 'grid', gap: '10px', margin: '14px 0' }}>
                <div
                  style={{
                    background: 'white',
                    padding: '12px 16px',
                    borderRadius: '14px',
                    border: '2px solid #fde047',
                  }}
                >
                  <strong>1️⃣ Step 1: Round Curve Like &ldquo;c&rdquo; ( ↺ )</strong>
                  <p className="hi" style={{ fontSize: '13px', color: '#451a03', marginTop: '2px' }}>
                    <strong>कदम 1 (गोल घेरा):</strong> बीच की दोनों नीली लाइनों के अंदर बाईं ओर घुमाते हुए एक गोल पेट (छोटा गोला) बनाएं।
                  </p>
                </div>

                <div
                  style={{
                    background: 'white',
                    padding: '12px 16px',
                    borderRadius: '14px',
                    border: '2px solid #fde047',
                  }}
                >
                  <strong>2️⃣ Step 2: Short Standing Line Down ( ↓ )</strong>
                  <p className="hi" style={{ fontSize: '13px', color: '#451a03', marginTop: '2px' }}>
                    <strong>कदम 2 (छोटी खड़ी लकीर):</strong> गोले के दाईं ओर ऊपर की नीली लाइन से नीचे की नीली लाइन तक एक सीधी खड़ी रेखा खींचें।
                  </p>
                </div>

                <div
                  style={{
                    background: '#fff',
                    padding: '12px 16px',
                    borderRadius: '14px',
                    border: '1px dashed #f59e0b',
                  }}
                >
                  <p style={{ fontSize: '13px', fontWeight: 'bold', color: '#b45309' }}>
                    📓 4-Line Notebook Secret for Parents (4-लाइन कॉपी का नियम):
                  </p>
                  <p className="hi" style={{ fontSize: '13px', color: '#374151', marginTop: '3px' }}>
                    • <strong>Capital A (बड़ा A):</strong> ऊपर की 3 लाइनों में (लाल लाइन से तीसरी नीली लाइन तक)।<br />
                    • <strong>Small a (छोटा a):</strong> केवल बीच की 2 नीली लाइनों के अंदर।
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="listen-btn"
                  onClick={() =>
                    speakText(
                      'To write small a: Make a round curve between the middle blue lines, then draw a short standing line down.',
                      'en-US'
                    )
                  }
                >
                  🔊 Listen English Guide
                </button>
                <button
                  type="button"
                  className="listen-btn listen-btn-hi"
                  onClick={() =>
                    speakText(
                      'छोटा अक्षर ए बीच की दो नीली लाइनों में बनता है। पहले गोल घेरा बनाएं, फिर दाईं तरफ छोटी खड़ी रेखा खींचें।',
                      'hi-IN'
                    )
                  }
                >
                  🗣️ हिन्दी में सुनें
                </button>
              </div>
            </article>
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
              <p className="eyebrow">Interactive Overwriting Board · अक्षर के ऊपर लिखकर रंग भरें</p>
              <h2 id="studio-title" style={{ fontSize: 'clamp(20px, 3vw, 28px)', color: '#065f46' }}>
                See Big 3D Letter A Above &amp; Overwrite in the Boxes Below!
              </h2>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <span className="pill" style={{ margin: 0 }}>
                <span>★ {studioDoneCount} of {STUDIO_BOXES.length} Boxes Colored</span>
              </span>
              <button type="button" className="mint-btn" onClick={fillAllStudioBoxes} style={{ padding: '9px 16px', fontSize: '13px' }}>
                ✨ Fill All Boxes with Color
              </button>
              <button type="button" className="quiet-btn" onClick={resetStudioBoxes}>
                ↺ Reset Boxes
              </button>
            </div>
          </div>

          <p style={{ fontSize: '14px', color: '#374151', marginTop: '8px' }}>
            <strong>How it works (कैसे अभ्यास करें):</strong> Below the big 3D colored Letter{' '}
            <strong>A</strong>, partially visible dotted letters appear inside 8 practice boxes. Use your finger,
            mouse, or stylus to <strong>overwrite on all dots of each partially visible letter</strong>—once you
            complete all strokes, the letter fills with complete 3D color!
            <br />
            <span className="hi" style={{ color: '#059669', fontWeight: 'bold' }}>
              नीचे दिए गए 8 बॉक्स में हल्के बिंदु वाले अक्षरों के पूरे आकार पर उंगली या माउस फेरें। जब पूरा अक्षर लिखा जाएगा, तभी वह पूरे 3D रंग से भरेगा!
            </span>
          </p>

          {/* Top Visual Reference Banner inside Studio */}
          <div
            style={{
              background: '#ffffff',
              border: '3px solid #34d399',
              borderRadius: '20px',
              padding: '14px 18px',
              marginTop: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <div
                style={{
                  width: '96px',
                  height: '84px',
                  background: '#fffbeb',
                  border: '2px solid #fcd34d',
                  borderRadius: '16px',
                  display: 'grid',
                  placeItems: 'center',
                  boxShadow: '0 4px 0 #fde047',
                  flexShrink: 0,
                }}
              >
                <svg viewBox="0 0 120 110" width="80" height="72">
                  <g stroke={selectedTheme.side3d} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none" transform="translate(4,4)">
                    <path d="M42 18 L16 90 M42 18 L68 90 M24 68 L60 68" />
                    <path d="M102 58 C95 46, 74 48, 74 68 C74 88, 95 90, 102 78 M104 48 L104 90" />
                  </g>
                  <g stroke={selectedTheme.frontEnd} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none">
                    <path d="M42 18 L16 90 M42 18 L68 90 M24 68 L60 68" />
                    <path d="M102 58 C95 46, 74 48, 74 68 C74 88, 95 90, 102 78 M104 48 L104 90" />
                  </g>
                </svg>
              </div>
              <div style={{ minWidth: 0 }}>
                <span className="eyebrow">3D Model Reference · आदर्श अक्षर</span>
                <h3 style={{ fontSize: 'clamp(17px, 2.2vw, 21px)', color: '#111827', marginTop: '2px' }}>
                  Letter A &amp; a — Overwrite All Dots Below to Fill 3D Color!
                </h3>
                <p className="hi" style={{ fontSize: '13px', color: '#047857', fontWeight: 'bold' }}>
                  पसंदीदा रंग चुनें और नीचे हर बॉक्स में पूरे अक्षर के ऊपर हाथ फेरकर रंग भरें:
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              {LETTER_THEMES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedTheme(t)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 10px',
                    borderRadius: '12px',
                    border: selectedTheme.id === t.id ? '2.5px solid #111827' : '1.5px solid #cbd5e1',
                    background: selectedTheme.id === t.id ? '#fffbeb' : '#ffffff',
                    fontWeight: 800,
                    fontSize: '12px',
                  }}
                >
                  <span
                    style={{
                      width: '13px',
                      height: '13px',
                      borderRadius: '50%',
                      background: t.frontEnd,
                      display: 'inline-block',
                    }}
                  />
                  <span>{t.nameHi}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 8 Partially Visible Letter Overwriting Boxes Grid */}
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

        {/* Story Tools Navigation Bar */}
        <div className="mint-card story-tools" id="story">
          <nav className="scene-links" aria-label="Phonics scenes">
            <a href="#scene-1" onClick={(e) => scrollToSection(e, 'scene-1')}>
              Scene 1 · Apple &amp; Ant
            </a>
            <a href="#scene-2" onClick={(e) => scrollToSection(e, 'scene-2')}>
              Scene 2 · Sky &amp; Space
            </a>
            <a href="#scene-3" onClick={(e) => scrollToSection(e, 'scene-3')}>
              Scene 3 · Alligator &amp; Ambulance
            </a>
            <a href="#scene-4" onClick={(e) => scrollToSection(e, 'scene-4')}>
              Scene 4 · Axe &amp; Anchor
            </a>
            <a href="#vocabulary" onClick={(e) => scrollToSection(e, 'vocabulary')}>
              Word Corner (12 Words)
            </a>
            <a
              className="mint-btn"
              href="#practice"
              onClick={(e) => scrollToSection(e, 'practice')}
              style={{ fontSize: '12px', padding: '8px 14px', boxShadow: 'none' }}
            >
              50 Practice Tasks ↘
            </a>
          </nav>
          <button
            id="support-toggle"
            className="quiet-btn"
            type="button"
            aria-pressed={!hideSupport}
            onClick={() => setHideSupport((h) => !h)}
          >
            <span>{hideSupport ? 'Show pronunciation & meaning' : 'Hide pronunciation & meaning'}</span>
          </button>
        </div>

        <p className="reading-tip">
          Click 🔊 to listen in English or 🗣️ in Hindi. Every word starts with Letter <strong>A</strong>!{' '}
          <span lang="hi" className="hi">
            हर शब्द का उच्चारण और हिंदी अर्थ साथ दिया गया है ताकि माता-पिता आसानी से पढ़ा सकें।
          </span>
        </p>

        {/* 4 Illustrated Phonics & Word Scenes */}
        <div id="story-content" className={hideSupport ? 'hide-support' : ''}>
          {SCENE_DATA.map((scene) => (
            <section className="section" id={scene.id} key={scene.id}>
              <div className="section-heading">
                <div>
                  <p className="eyebrow">{scene.eyebrow}</p>
                  <h2>{scene.title}</h2>
                  <p className="hi" lang="hi">
                    {scene.titleHi}
                  </p>
                </div>
                <a
                  className="text-link"
                  href={`#${scene.nextId}`}
                  onClick={(e) => scrollToSection(e, scene.nextId)}
                >
                  {scene.nextLabel}
                </a>
              </div>

              <div className="scene-layout">
                <aside className="scene-picture">
                  <div className="scene-emoji" aria-hidden="true">
                    {scene.asideEmoji}
                  </div>
                  <p>{scene.asideText}</p>
                  <div className="sequence-badge">
                    <span>{scene.badgeNum}</span> <span>{scene.badgeText}</span>
                  </div>
                </aside>

                <div className="story-lines">
                  {scene.lines.map((line) => (
                    <article className="story-line" key={line.no}>
                      <div className="line-top">
                        <span className="speaker">{line.speaker}</span>
                        <span className="sentence-no">{line.no}</span>
                      </div>
                      <div className="line-content-row">
                        <p className="english">
                          <span style={{ marginRight: '8px' }}>{line.emoji}</span>
                          <strong className="who-part">
                            <span style={{ color: '#e11d48', textDecoration: 'underline' }}>
                              {line.word.charAt(0)}
                            </span>
                            <span>{line.word.slice(1)}</span>
                          </strong>{' '}
                          <span className="action-part">{line.englishRest}</span>
                        </p>
                        <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                          <button
                            type="button"
                            className="listen-btn"
                            onClick={() => speakText(line.fullEn, 'en-US')}
                          >
                            🔊 Eng
                          </button>
                          <button
                            type="button"
                            className="listen-btn listen-btn-hi"
                            onClick={() => speakText(line.meaningHi, 'hi-IN')}
                          >
                            🗣️ हिन्दी
                          </button>
                        </div>
                      </div>

                      <div className="language-support">
                        <p className="pronunciation hi">
                          <span className="line-label">बोलें</span>
                          <span>{line.pronunciationHi}</span>
                        </p>
                        <p className="translation hi">
                          <span className="line-label">अर्थ</span>
                          <span>{line.meaningHi}</span>
                        </p>
                      </div>

                      <details className="hint-box" style={{ marginTop: '8px' }}>
                        <summary>Parent Guide / अभिभावक सुझाव</summary>
                        <p>{line.parentTip}</p>
                      </details>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Parent's Guide & Handwriting Advice Box */}
        <section className="amber-card safety-box" id="parent-guide" aria-labelledby="parent-guide-title">
          <span className="safety-icon" aria-hidden="true">
            👨‍👩‍👧
          </span>
          <div>
            <p className="eyebrow">For Parents &amp; Teachers · माता-पिता और शिक्षकों के लिए विशेष मार्गदर्शन</p>
            <h2 id="parent-guide-title">3 Easy Steps to Help Your Child Master Letter A</h2>
            <p className="hi" lang="hi">
              <strong>बच्चे को अक्षर A सिखाने के 3 सबसे आसान तरीके:</strong>
            </p>
            <p style={{ marginTop: '8px' }}>
              1. <strong>See the 3D Shape First (पहले 3D आकार दिखाएं):</strong> Let your child trace the big 3D
              Letter A with their index finger and notice the pointed roof and middle bridge.<br />
              2. <strong>Overwrite All Dots on the Faded Letter (हल्के अक्षरों के सभी बिंदुओं पर हाथ चलवाएं):</strong>{' '}
              Guide your child to trace all strokes completely from start to end so the letter fills with bright 3D
              color.<br />
              3. <strong>Say the Sound Aloud (बोल-बोल कर लिखवाएं):</strong> Every time they finish overwriting{' '}
              <strong>A</strong>, say <em>&ldquo;A for Apple — ए से सेब!&rdquo;</em> together to link writing with
              phonics!
            </p>
            <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="listen-btn"
                onClick={() =>
                  speakText(
                    'Parents, let your child trace the 3D letter first, then overwrite inside the boxes while saying A for Apple aloud!',
                    'en-US'
                  )
                }
              >
                🔊 Listen Parent Tip (Eng)
              </button>
              <button
                type="button"
                className="listen-btn listen-btn-hi"
                onClick={() =>
                  speakText(
                    'माता-पिता ध्यान दें: बच्चे को पहले बड़ा थ्री-डी अक्षर दिखाएं, फिर बॉक्स में दिए हल्के अक्षरों के ऊपर उंगली चलवाकर रंग भरवाएं और साथ में ए फॉर ऐप्पल बोलें।',
                    'hi-IN'
                  )
                }
              >
                🗣️ माता-पिता सुझाव सुनें (हिन्दी)
              </button>
            </div>
          </div>
        </section>

        {/* Vocabulary Corner (12 Words Starting with A) */}
        <section className="section" id="vocabulary" aria-labelledby="vocab-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Word Corner · अक्षर A शब्द वाटिका</p>
              <h2 id="vocab-title">12 Picture Words Starting with Letter A</h2>
            </div>
            <p>Listen in English and Hindi, practice pronunciation, and spot Letter A at the start of every word!</p>
          </div>
          <dl className="vocab-grid">
            {VOCAB_WORDS.map((item, idx) => (
              <div
                key={item.word}
                className={`${idx % 2 === 0 ? 'mint-card' : 'amber-card'} vocab-card`}
              >
                <dt>
                  <span>
                    <strong style={{ color: '#e11d48', textDecoration: 'underline' }}>
                      {item.word.charAt(0)}
                    </strong>
                    <span>{item.word.slice(1)}</span>
                  </span>
                  <button
                    type="button"
                    className="listen-btn"
                    onClick={() => speakText(`A for ${item.word}`, 'en-US')}
                  >
                    🔊
                  </button>
                </dt>
                <dd className="sound hi">
                  <span>उच्चारण: {item.sound} </span>
                  <button
                    type="button"
                    className="listen-btn listen-btn-hi"
                    style={{ padding: '2px 6px', fontSize: '11px' }}
                    onClick={() => speakText(item.hiSpeak, 'hi-IN')}
                  >
                    🗣️
                  </button>
                </dd>
                <dd className="hi">{item.meaning}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* 50 INTERACTIVE PRACTICE TASKS FOR LETTER A */}
        <section className="mint-card practice-intro" id="practice">
          <p className="eyebrow">50 Interactive Tasks for Letter A · अक्षर A के 50 अभ्यास कार्य</p>
          <h2>Complete 50 Letter A Overwriting &amp; Phonics Tasks!</h2>
          <p>
            Includes <strong>15 Live Overwriting Box Tasks</strong> (where partially visible letters fill with complete
            3D color once your child overwrites the entire letter), plus{' '}
            <strong>35 Bilingual Recognition, Phonics &amp; Writing Tasks</strong> in English and Hindi!
          </p>

          <div className="progress-row">
            <nav className="filter-nav" aria-label="Task section filters">
              <button
                className="filter-btn"
                type="button"
                aria-pressed={activeFilter === 'all'}
                onClick={() => setActiveFilter('all')}
              >
                All 50 Tasks
              </button>
              <button
                className="filter-btn"
                type="button"
                aria-pressed={activeFilter === 'A'}
                onClick={() => setActiveFilter('A')}
              >
                Section A: Overwrite in Box (1–15)
              </button>
              <button
                className="filter-btn"
                type="button"
                aria-pressed={activeFilter === 'B'}
                onClick={() => setActiveFilter('B')}
              >
                Section B: Letter &amp; Stroke Rules (16–30)
              </button>
              <button
                className="filter-btn"
                type="button"
                aria-pressed={activeFilter === 'C'}
                onClick={() => setActiveFilter('C')}
              >
                Section C: Phonics &amp; A-Words (31–40)
              </button>
              <button
                className="filter-btn"
                type="button"
                aria-pressed={activeFilter === 'D'}
                onClick={() => setActiveFilter('D')}
              >
                Section D: Write &amp; Complete (41–50)
              </button>
            </nav>

            <div className="progress-meta">
              <span id="progress-text">{totalCorrectCount} of 50 tasks completed</span>
              <progress id="progress" max={50} value={totalCorrectCount} />
            </div>
          </div>

          <p id="filter-status" className="reading-tip">
            Showing {visibleTasks.length} task(s). Trace inside the boxes or choose/type your answer!
          </p>
        </section>

        {/* 50 Tasks Grid */}
        <div className="questions-grid" id="questions-container" key={tasksResetKey}>
          {visibleTasks.map((q) => {
            const num = q.num;
            const status = checkedResults[num];
            const isHintOpen = Boolean(openHints[num]);
            const taskTheme = LETTER_THEMES[(q.themeIndex ?? 0) % LETTER_THEMES.length];

            return (
              <article
                className="mint-card question-card"
                id={`question-${num}`}
                key={num}
                data-section={q.section}
              >
                <div className="qtop">
                  <span className="eyebrow">
                    {q.kind === 'overwrite'
                      ? `Overwrite Task ${num < 10 ? '0' + num : num}`
                      : q.kind === 'fill'
                      ? `Write Task ${num}`
                      : `Task ${num < 10 ? '0' + num : num}`}
                  </span>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <button
                      type="button"
                      className="listen-btn"
                      style={{ padding: '3px 8px', fontSize: '11px' }}
                      onClick={() => speakText(q.title, 'en-US')}
                    >
                      🔊
                    </button>
                    <span className="qstate">
                      {status === 'correct'
                        ? '✓ Completed'
                        : status === 'retry'
                        ? 'Try again'
                        : status === 'empty'
                        ? 'Trace / Answer first'
                        : 'Your turn'}
                    </span>
                  </div>
                </div>

                <h3>{q.title}</h3>
                <p className="qprompt">{q.prompt}</p>

                {/* Task Kind 1: Interactive Overwriting Box inside Card (Tasks 1-15) */}
                {q.kind === 'overwrite' && q.overwritePattern && (
                  <div style={{ marginBottom: '14px' }}>
                    <LetterOverwriteBox
                      pattern={q.overwritePattern}
                      emoji={q.emoji}
                      wordSuffix={q.wordSuffix}
                      label={q.wordSuffix ? `Overwrite A in A${q.wordSuffix}` : `Trace & Overwrite ${q.overwritePattern}`}
                      labelHi="पूरे अक्षर पर लिखें"
                      theme={taskTheme}
                      size="compact"
                      isCompletedExternal={Boolean(overwriteDone[num])}
                      onComplete={() => handleOverwriteTaskComplete(num)}
                      onReset={() => handleOverwriteTaskReset(num)}
                      onSpeak={speakText}
                      speakWord={q.speakWord}
                    />
                  </div>
                )}

                {/* Task Kind 2: Multiple Choice (Tasks 16-40) */}
                {q.kind === 'mcq' && q.choices && (
                  <div className="choices">
                    {q.choices.map((c, cIdx) => (
                      <label className="choice" key={cIdx}>
                        <input
                          type="radio"
                          name={`q${num}`}
                          checked={mcqSelections[num] === cIdx}
                          onChange={() => {
                            setMcqSelections((prev) => ({ ...prev, [num]: cIdx }));
                            clearTaskFeedback(num);
                          }}
                        />
                        <span>
                          <b>{String.fromCharCode(65 + cIdx)}.</b> {c}
                        </span>
                      </label>
                    ))}
                  </div>
                )}

                {/* Task Kind 3: Fill / Write with Kid-Friendly Quick-Tap Chips (Tasks 41-50) */}
                {q.kind === 'fill' && (
                  <div>
                    {q.quickChips && (
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
                        <span style={{ fontSize: '12px', color: '#059669', fontWeight: 'bold', alignSelf: 'center' }}>
                          Quick Tap / चुनें:
                        </span>
                        {q.quickChips.map((chip) => (
                          <button
                            key={chip}
                            type="button"
                            className="quiet-btn"
                            style={{
                              minHeight: '34px',
                              padding: '4px 12px',
                              fontSize: '14px',
                              background: fillInputs[num] === chip ? '#fde047' : '#ffffff',
                              borderColor: '#10b981',
                            }}
                            onClick={() => {
                              setFillInputs((prev) => ({ ...prev, [num]: chip }));
                              clearTaskFeedback(num);
                            }}
                          >
                            {chip}
                          </button>
                        ))}
                      </div>
                    )}
                    <input
                      className="fill-input"
                      type="text"
                      value={fillInputs[num] || ''}
                      placeholder="Type letter A or word here..."
                      autoComplete="off"
                      onChange={(e) => {
                        const val = e.target.value;
                        setFillInputs((prev) => ({ ...prev, [num]: val }));
                        clearTaskFeedback(num);
                      }}
                    />
                  </div>
                )}

                <div className="question-bottom">
                  <button
                    className="mint-btn check-btn"
                    type="button"
                    onClick={() => checkSingleTask(num)}
                  >
                    <span>
                      {q.kind === 'overwrite'
                        ? overwriteDone[num]
                          ? '✓ Letter Filled in Complete Color!'
                          : 'Check answer ✓'
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
                      : status === 'retry'
                      ? 'Not quite yet. Read the hint and try again! / संकेत पढ़ें और फिर कोशिश करें।'
                      : status === 'empty'
                      ? 'Please overwrite the full letter in the box (or choose an answer) first! / पहले बॉक्स में पूरे अक्षर के ऊपर हाथ फेरें (या उत्तर चुनें)।'
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
                        Short explanation / Parent Hint <span lang="hi" className="hi">· समझें</span>
                      </span>
                    </button>
                    <p style={{ display: isHintOpen ? 'block' : 'none' }}>{q.hint}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Check All Bar */}
        <section className="amber-card check-all-bar">
          <div>
            <h2>Check all 50 Letter A Tasks!</h2>
            <p>
              Review your child’s progress across all 50 overwriting, recognition, phonics, and writing tasks.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <button className="mint-btn" type="button" onClick={checkAllTasks}>
              Check all 50 tasks ✓
            </button>
            <button className="quiet-btn" type="button" onClick={resetAllTasks}>
              ↺ Reset all tasks
            </button>
          </div>
        </section>

        {/* Results Box (Always mounted, toggled via display) */}
        <section
          className="mint-card results-box"
          id="results"
          tabIndex={-1}
          style={{ display: showSnapshot ? 'block' : 'none' }}
        >
          <h2>Your Letter A Mastery Snapshot</h2>
          <p style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '10px' }}>
            <span>
              {totalCorrectCount} out of 50 tasks completed ({Math.round((totalCorrectCount / 50) * 100)}%)!
            </span>
          </p>
          <p style={{ color: '#047857', marginTop: '8px', fontWeight: 700 }}>
            <span>
              {totalCorrectCount === 50
                ? '🌟 Champion! You mastered overwriting Capital A and small a with all 50 tasks! / बधाई हो! बच्चे ने अक्षर A के सभी 50 अभ्यास पूरे कर लिए हैं!'
                : 'Keep overwriting the partially visible letters and checking the hints—every stroke makes your handwriting stronger! / अभ्यास जारी रखें, हर कोशिश के साथ बच्चे की लिखावट और सुंदर होगी!'}
            </span>
          </p>
        </section>

        {/* Lesson End Navigation */}
        <nav className="lesson-end-nav" aria-label="Lesson navigation">
          <a
            className="mint-btn"
            href="#overwrite-studio"
            onClick={(e) => scrollToSection(e, 'overwrite-studio')}
          >
            Practice Overwriting Studio again ↑
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
            <a href="#learn" onClick={(e) => scrollToSection(e, 'learn')}>
              Classes
            </a>
            <a href="#overwrite-studio" onClick={(e) => scrollToSection(e, 'overwrite-studio')}>
              Explore
            </a>
            <a href="#parent-guide" onClick={(e) => scrollToSection(e, 'parent-guide')}>
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
