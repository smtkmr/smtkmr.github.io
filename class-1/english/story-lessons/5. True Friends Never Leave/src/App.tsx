/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useId } from 'react';
import { Volume2, VolumeX, CheckCircle, RotateCcw, ArrowRight, ArrowDown, BookOpen, Heart, Sparkles, Footprints, ShieldCheck, Sun } from 'lucide-react';

interface Question {
  id: number;
  part: 'text' | 'deep' | 'rhymes';
  partTitle: string;
  question: string;
  hindi: string;
  options: string[];
  answer: number; // 0-based index
  explanation: string;
}

const QUESTIONS: Question[] = [
  // Part 1: Text Understanding (1-10)
  {
    id: 1,
    part: 'text',
    partTitle: 'Part 1 · Text Understanding',
    question: 'Who does the child love to walk with in the poem?',
    hindi: 'कविता में बच्चा किसके साथ टहलना पसंद करता है?',
    options: ['Father', 'Grandpa', 'Grandmother', 'Friend'],
    answer: 1,
    explanation: 'The child loves walking with Grandpa: "I like to walk with Grandpa." / बच्चा कविता में दादाजी के साथ चलना पसंद करता है।'
  },
  {
    id: 2,
    part: 'text',
    partTitle: 'Part 1 · Text Understanding',
    question: "How are Grandpa's steps described compared to the child's?",
    hindi: 'दादाजी के कदमों की तुलना बच्चे के कदमों से कैसे की गई है?',
    options: ['Long like mine', 'Quick like mine', 'Short like mine', 'Heavy like mine'],
    answer: 2,
    explanation: 'Line 2 describes: "His steps are short like mine." / उनके कदम बच्चे के कदमों की तरह छोटे हैं।'
  },
  {
    id: 3,
    part: 'text',
    partTitle: 'Part 1 · Text Understanding',
    question: 'What phrase does Grandpa NEVER say to the child?',
    hindi: 'दादाजी बच्चे से कभी क्या नहीं कहते?',
    options: ['"Now slow down!"', '"Now hurry up!"', '"Let\'s stop here!"', '"Walk faster now!"'],
    answer: 1,
    explanation: 'Grandpa never rushes the child: "He doesn\'t say, \'Now hurry up!\'" / दादाजी कभी "अब जल्दी करो!" नहीं कहते।'
  },
  {
    id: 4,
    part: 'text',
    partTitle: 'Part 1 · Text Understanding',
    question: 'What does Grandpa always take according to the poem?',
    hindi: 'कविता के अनुसार दादाजी हमेशा क्या लेते हैं?',
    options: ['His walking stick', 'His rest', 'His time', 'His bag'],
    answer: 2,
    explanation: '"He always takes his time." / वह हमेशा आराम से अपना पूरा समय लेते हैं।'
  },
  {
    id: 5,
    part: 'text',
    partTitle: 'Part 1 · Text Understanding',
    question: 'What do most other people usually have to do?',
    hindi: 'ज़्यादातर अन्य लोगों को आमतौर पर क्या करना पड़ता है?',
    options: ['Wait', 'Hurry', 'Rest', 'Run'],
    answer: 1,
    explanation: '"Most people have to hurry" / अधिकांश लोगों को हमेशा जल्दीबाज़ी करनी पड़ती है।'
  },
  {
    id: 6,
    part: 'text',
    partTitle: 'Part 1 · Text Understanding',
    question: 'What do most people fail to do while walking?',
    hindi: 'अधिकांश लोग चलते समय क्या करने से चूक जाते हैं?',
    options: ['Talk and laugh', 'Stop and see', 'Smile and greet', 'Look and listen'],
    answer: 1,
    explanation: 'Rushed people "do not stop and see" the things around them. / वे रुककर देखना भूल जाते हैं।'
  },
  {
    id: 7,
    part: 'text',
    partTitle: 'Part 1 · Text Understanding',
    question: 'How does the child feel about God creating Grandpa?',
    hindi: 'भगवान द्वारा दादाजी को बनाए जाने पर बच्चे को कैसा महसूस होता है?',
    options: ['Surprised', 'Glad', 'Thankful', 'Proud'],
    answer: 1,
    explanation: '"I\'m glad that God made Grandpa" / बच्चा खुशी और प्रसन्नता (\'glad\') महसूस करता है।'
  },
  {
    id: 8,
    part: 'text',
    partTitle: 'Part 1 · Text Understanding',
    question: 'Which two words describe Grandpa in the final line?',
    hindi: 'अंतिम पंक्ति में दादाजी का वर्णन करने के लिए किन दो शब्दों का उपयोग किया गया है?',
    options: ["'Unrushed' and young", "'Quiet' and old", "'Gentle' and wise", "'Unrushed' and old"],
    answer: 0,
    explanation: "The poem ends with: \"'Unrushed' and young like me.\" / शांत (अनरश्ड) और दिल से युवा (यंग)।"
  },
  {
    id: 9,
    part: 'text',
    partTitle: 'Part 1 · Text Understanding',
    question: 'Who wrote the poem "The Gentle Way"?',
    hindi: '"The Gentle Way" कविता के रचयिता कौन हैं?',
    options: ['Robert Frost', "Rodney O'Hurd", 'William Blake', 'Ruskin Bond'],
    answer: 1,
    explanation: "The poem was composed by Rodney O'Hurd. / इस कविता के लेखक Rodney O'Hurd हैं।"
  },
  {
    id: 10,
    part: 'text',
    partTitle: 'Part 1 · Text Understanding',
    question: 'What is the main theme of the poem?',
    hindi: 'कविता का मुख्य विषय क्या है?',
    options: [
      'A fast race in the park',
      "A child's joy in walking with Grandpa",
      'Learning how to walk properly',
      'Playing games with family'
    ],
    answer: 1,
    explanation: "The poem celebrates the warm companionship and unhurried joy of walking with Grandpa. / दादाजी के साथ शांत और प्यार भरे कदमों से चलने का आनंद।"
  },

  // Part 2: Deep Comprehension (11-20)
  {
    id: 11,
    part: 'deep',
    partTitle: 'Part 2 · Deep Comprehension',
    question: "Why are Grandpa's steps similar to the child's?",
    hindi: 'दादाजी के कदम बच्चे के कदमों जैसे क्यों हैं?',
    options: [
      'Because Grandpa walks very fast',
      "Because Grandpa's steps are short",
      'Because Grandpa takes big leaps',
      'Because the child walks like an adult'
    ],
    answer: 1,
    explanation: "Both Grandpa and the child take short, gentle steps. / दोनों के कदम छोटे हैं।"
  },
  {
    id: 12,
    part: 'deep',
    partTitle: 'Part 2 · Deep Comprehension',
    question: 'Which word in the poem means "happy or pleased"?',
    hindi: 'कविता में किस शब्द का अर्थ "खुश या प्रसन्न" है?',
    options: ['Gentle', 'Glad', 'Young', 'Unrushed'],
    answer: 1,
    explanation: "'Glad' means feeling joyful, delighted or pleased. / 'Glad' का अर्थ खुश या प्रसन्न होता है।"
  },
  {
    id: 13,
    part: 'deep',
    partTitle: 'Part 2 · Deep Comprehension',
    question: 'Which word in the poem means "not in a hurry or calm"?',
    hindi: 'कविता में किस शब्द का अर्थ "बिना किसी जल्दबाजी के या शांत" है?',
    options: ['Short', 'Gentle', 'Unrushed', 'Young'],
    answer: 2,
    explanation: "'Unrushed' means taking things slowly without hurry. / 'Unrushed' का अर्थ बिना जल्दबाजी का और शांत है।"
  },
  {
    id: 14,
    part: 'deep',
    partTitle: 'Part 2 · Deep Comprehension',
    question: 'Why doesn\'t Grandpa tell the child to "hurry up"?',
    hindi: 'दादाजी बच्चे से "जल्दी करो" क्यों नहीं कहते?',
    options: ['He forgets to speak', 'He likes taking his time', 'He wants to run', 'He is in a rush'],
    answer: 1,
    explanation: 'Grandpa is patient and enjoys taking his time. / वह आराम से समय लेकर चलना पसंद करते हैं।'
  },
  {
    id: 15,
    part: 'deep',
    partTitle: 'Part 2 · Deep Comprehension',
    question: 'Who created Grandpa according to the poem?',
    hindi: 'कविता के अनुसार दादाजी को किसने बनाया?',
    options: ['Nature', 'God', 'The family', 'The child'],
    answer: 1,
    explanation: 'The child thanks God: "I\'m glad that God made Grandpa". / बच्चे ने ईश्वर (God) का आभार जताया है।'
  },
  {
    id: 16,
    part: 'deep',
    partTitle: 'Part 2 · Deep Comprehension',
    question: 'In the line "His steps are short like mine," what does \'mine\' refer to?',
    hindi: '"His steps are short like mine" पंक्ति में \'mine\' किसका प्रतीक है?',
    options: ["Grandpa's steps", "The child's steps", "The author's shoes", "Other people's steps"],
    answer: 1,
    explanation: "'Mine' refers to the child's own steps. / 'Mine' बच्चे के अपने कदमों को दर्शाता है।"
  },
  {
    id: 17,
    part: 'deep',
    partTitle: 'Part 2 · Deep Comprehension',
    question: 'What do "most people" miss out on because they hurry?',
    hindi: 'जल्दबाज़ी के कारण अधिकांश लोग क्या देखने से चूक जाते हैं?',
    options: [
      'They miss stopping and seeing things around them',
      'They miss catching the bus',
      'They miss meeting Grandpa',
      'They miss going home'
    ],
    answer: 0,
    explanation: 'Hurrying people do not stop and appreciate the beauty around them. / वे रुककर अपने आसपास की चीजों को देखना भूल जाते हैं।'
  },
  {
    id: 18,
    part: 'deep',
    partTitle: 'Part 2 · Deep Comprehension',
    question: 'Grandpa is described as young like ______ .',
    hindi: 'दादाजी को किसकी तरह युवा कहा गया है?',
    options: ['a bird', 'me (the child)', 'a flower', 'the wind'],
    answer: 1,
    explanation: "Grandpa is described as: 'Unrushed' and young like me (the child). / बच्चे की तरह दिल से युवा।"
  },
  {
    id: 19,
    part: 'deep',
    partTitle: 'Part 2 · Deep Comprehension',
    question: 'What is the complete title of this poem?',
    hindi: 'इस कविता का पूरा शीर्षक क्या है?',
    options: ['Walking in the Park', 'The Gentle Way', 'My Loving Grandpa', 'Short Steps'],
    answer: 1,
    explanation: 'The title of the poem is "The Gentle Way". / कविता का शीर्षक "The Gentle Way" है।'
  },
  {
    id: 20,
    part: 'deep',
    partTitle: 'Part 2 · Deep Comprehension',
    question: 'Which quality best describes Grandpa in the poem?',
    hindi: 'कविता में दादाजी के किस गुण को सबसे अच्छे से दर्शाया गया है?',
    options: ['Strict and fast', 'Patient and calm', 'Loud and active', 'Busy and tired'],
    answer: 1,
    explanation: 'Grandpa embodies patience, sweetness, and calm. / दादाजी धैर्यवान (Patient) और शांत (Calm) हैं।'
  },

  // Part 3: Line Completion & Rhymes (21-30)
  {
    id: 21,
    part: 'rhymes',
    partTitle: 'Part 3 · Line Completion & Rhymes',
    question: 'Complete the line: "He always takes his ______ ."',
    hindi: 'पंक्ति पूरी करें: "He always takes his ______ ."',
    options: ['turns', 'time', 'path', 'rest'],
    answer: 1,
    explanation: 'The correct word is "time": "He always takes his time." / सही शब्द "time" है।'
  },
  {
    id: 22,
    part: 'rhymes',
    partTitle: 'Part 3 · Line Completion & Rhymes',
    question: 'Complete the line: "They do not stop and ______ ."',
    hindi: 'पंक्ति पूरी करें: "They do not stop and ______ ."',
    options: ['talk', 'see', 'play', 'walk'],
    answer: 1,
    explanation: 'The correct word is "see": "They do not stop and see." / सही शब्द "see" है।'
  },
  {
    id: 23,
    part: 'rhymes',
    partTitle: 'Part 3 · Line Completion & Rhymes',
    question: 'Complete the line: "His steps are short like ______ ."',
    hindi: 'पंक्ति पूरी करें: "His steps are short like ______ ."',
    options: ['mine', 'fine', 'line', 'thine'],
    answer: 0,
    explanation: 'The correct line is: "His steps are short like mine." / सही शब्द "mine" है।'
  },
  {
    id: 24,
    part: 'rhymes',
    partTitle: 'Part 3 · Line Completion & Rhymes',
    question: 'Complete the line: "I\'m glad that God made ______ ."',
    hindi: 'पंक्ति पूरी करें: "I\'m glad that God made ______ ."',
    options: ['Father', 'Mother', 'Grandpa', 'Friends'],
    answer: 2,
    explanation: 'The correct word is "Grandpa": "I\'m glad that God made Grandpa" / सही शब्द "Grandpa" है।'
  },
  {
    id: 25,
    part: 'rhymes',
    partTitle: 'Part 3 · Line Completion & Rhymes',
    question: 'Complete the line: "\'Unrushed\' and ______ like me."',
    hindi: 'पंक्ति पूरी करें: "\'Unrushed\' and ______ like me."',
    options: ['old', 'sweet', 'young', 'kind'],
    answer: 2,
    explanation: 'The final line says: "\'Unrushed\' and young like me." / सही शब्द "young" है।'
  },
  {
    id: 26,
    part: 'rhymes',
    partTitle: 'Part 3 · Line Completion & Rhymes',
    question: 'What is the rhyming pair for \'mine\' in the poem?',
    hindi: 'कविता में \'mine\' का तुकांत (rhyming) शब्द कौन सा है?',
    options: ['see', 'time', 'hurry', 'me'],
    answer: 1,
    explanation: 'In stanza 1, "mine" rhymes with "time" (mine - time). / पद 1 में mine और time तुकांत शब्द हैं।'
  },
  {
    id: 27,
    part: 'rhymes',
    partTitle: 'Part 3 · Line Completion & Rhymes',
    question: 'What is the rhyming pair for \'see\' in the poem?',
    hindi: 'कविता में \'see\' का तुकांत (rhyming) शब्द कौन सा है?',
    options: ['mine', 'Grandpa', 'me', 'hurry'],
    answer: 2,
    explanation: 'In stanza 2, "see" rhymes with "me" (see - me). / पद 2 में see और me तुकांत शब्द हैं।'
  },
  {
    id: 28,
    part: 'rhymes',
    partTitle: 'Part 3 · Line Completion & Rhymes',
    question: 'Which word is the OPPOSITE of "hurry"?',
    hindi: '"hurry" (जल्दबाज़ी) का विलोम शब्द कौन सा है?',
    options: ['Fast', 'Unrushed / Slow down', 'Run', 'Quick'],
    answer: 1,
    explanation: 'To hurry means to rush; its opposite is Unrushed or to slow down. / Hurry का विलोम Unrushed या धीमा होना है।'
  },
  {
    id: 29,
    part: 'rhymes',
    partTitle: 'Part 3 · Line Completion & Rhymes',
    question: 'Which word is the OPPOSITE of "glad"?',
    hindi: '"glad" (खुश) का विलोम शब्द कौन सा है?',
    options: ['Happy', 'Sad', 'Joyful', 'Calm'],
    answer: 1,
    explanation: "'Glad' means happy; the opposite is 'Sad' (उदास / दुखी). / Glad का विलोम Sad है।"
  },
  {
    id: 30,
    part: 'rhymes',
    partTitle: 'Part 3 · Line Completion & Rhymes',
    question: 'Which word is the OPPOSITE of "short" as used in "short steps"?',
    hindi: '"short steps" में "short" का विलोम शब्द क्या है?',
    options: ['Small', 'Long', 'Little', 'Tiny'],
    answer: 1,
    explanation: 'The opposite of short steps is long steps. / Short (छोटा) का विलोम Long (लंबा) है।'
  }
];

interface PoemLine {
  id: number;
  english: string;
  hindiPronunciation: string;
  hindiMeaning: string;
  sceneTitle: string;
  sceneNote: string;
  artCaption: string;
}

const POEM_LINES: PoemLine[] = [
  {
    id: 1,
    english: 'I like to walk with Grandpa,',
    hindiPronunciation: 'आई लाइक टू वॉक विद ग्रैंडपा,',
    hindiMeaning: 'मुझे दादाजी के साथ चलना पसंद है।',
    sceneTitle: 'Walking Together',
    sceneNote: 'The gentle journey begins hand in hand.',
    artCaption: 'LOVING COMPANIONSHIP · हाथ में हाथ'
  },
  {
    id: 2,
    english: 'His steps are short like mine.',
    hindiPronunciation: 'हिज़ स्टेप्स आर शॉर्ट लाइक माइन।',
    hindiMeaning: 'उनके कदम मेरे जैसे ही छोटे हैं।',
    sceneTitle: 'Matching Steps',
    sceneNote: 'Small, gentle paces that match perfectly.',
    artCaption: 'SHORT, GENTLE PACES · छोटे-छोटे कदम'
  },
  {
    id: 3,
    english: 'He doesn\'t say, "Now hurry up!"',
    hindiPronunciation: 'ही डज़ंट से, "नाउ हरी अप!"',
    hindiMeaning: 'वह यह नहीं कहते, "अब जल्दी करो!"',
    sceneTitle: 'No Rush, No Stress',
    sceneNote: 'Grandpa never urges the child to hurry.',
    artCaption: 'PATIENCE & PEACE · कोई हड़बड़ी नहीं'
  },
  {
    id: 4,
    english: 'He always takes his time.',
    hindiPronunciation: 'ही ऑलवेज़ टेक्स हिज़ टाइम।',
    hindiMeaning: 'वह हमेशा आराम से अपना समय लेते हैं।',
    sceneTitle: 'Taking His Time',
    sceneNote: 'Enjoying every single moment along the way.',
    artCaption: 'UNHURRIED MOMENTS · आराम से समय लेना'
  },
  {
    id: 5,
    english: 'Most people have to hurry,',
    hindiPronunciation: 'मोस्ट पीपल हैव टू हरी,',
    hindiMeaning: 'ज़्यादातर लोगों को जल्दीबाज़ी करनी पड़ती है।',
    sceneTitle: 'The Rushing World',
    sceneNote: 'Grown-ups rush past, busy in their daily race.',
    artCaption: 'THE BUSY CROWD · भागदौड़ भरी दुनिया'
  },
  {
    id: 6,
    english: 'They do not stop and see.',
    hindiPronunciation: 'दे डू नॉट स्टॉप एंड सी।',
    hindiMeaning: 'वे रुककर देखते नहीं हैं।',
    sceneTitle: 'Stop and See',
    sceneNote: 'Pausing to notice butterflies, clouds and daisies.',
    artCaption: 'PAUSING TO ADMIRE · रुककर देखना'
  },
  {
    id: 7,
    english: 'I\'m glad that God made Grandpa',
    hindiPronunciation: 'आईम ग्लैड दैट गॉड मेड ग्रैंडपा',
    hindiMeaning: 'मुझे खुशी है कि ईश्वर ने दादाजी को बनाया।',
    sceneTitle: 'A Grateful Heart',
    sceneNote: 'A blessing of love, gentleness and pure comfort.',
    artCaption: 'THANKFUL FOR GRANDPA · ईश्वर का धन्यवाद'
  },
  {
    id: 8,
    english: '\'Unrushed\' and young like me.',
    hindiPronunciation: '\'अनरश्ड\' एंड यंग लाइक मी।',
    hindiMeaning: 'बिना किसी जल्दबाजी के (शांत) और मेरी तरह दिल से युवा।',
    sceneTitle: 'Young at Heart',
    sceneNote: 'Age is just a number when two hearts walk as one.',
    artCaption: 'UNRUSHED & PLAYFUL · दिल से युवा'
  }
];

export default function App() {
  const [showSupport, setShowSupport] = useState<boolean>(true);
  const [activeFilter, setActiveFilter] = useState<'all' | 'text' | 'deep' | 'rhymes'>('all');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [checkedQuestions, setCheckedQuestions] = useState<Record<number, boolean>>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);
  const [speakingId, setSpeakingId] = useState<number | null>(null);

  // Read aloud helper using SpeechSynthesis API
  const speakText = (text: string, id: number) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85; // gentle, clear pace for kids
      utterance.pitch = 1.05;
      utterance.onstart = () => setSpeakingId(id);
      utterance.onend = () => setSpeakingId(null);
      utterance.onerror = () => setSpeakingId(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    // Reset check state when changed
    if (checkedQuestions[questionId] !== undefined) {
      setCheckedQuestions(prev => {
        const next = { ...prev };
        delete next[questionId];
        return next;
      });
    }
    setShowResults(false);
  };

  const handleCheckQuestion = (questionId: number) => {
    const q = QUESTIONS.find(item => item.id === questionId);
    if (!q) return;
    const selected = selectedAnswers[questionId];
    if (selected === undefined) {
      alert('Please choose one answer first! / पहले एक उत्तर चुनें।');
      return;
    }
    const isCorrect = selected === q.answer;
    setCheckedQuestions(prev => ({ ...prev, [questionId]: isCorrect }));
    setShowResults(false);
  };

  const handleCheckAll = () => {
    const newChecked: Record<number, boolean> = {};
    QUESTIONS.forEach(q => {
      const selected = selectedAnswers[q.id];
      if (selected !== undefined) {
        newChecked[q.id] = selected === q.answer;
      } else {
        newChecked[q.id] = false;
      }
    });
    setCheckedQuestions(newChecked);
    setShowResults(true);
    // Smooth scroll to results
    setTimeout(() => {
      document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCheckedQuestions({});
    setShowResults(false);
    setShowResetConfirm(false);
    setActiveFilter('all');
  };

  const filteredQuestions = QUESTIONS.filter(q => {
    if (activeFilter === 'all') return true;
    return q.part === activeFilter;
  });

  const correctCount = Object.values(checkedQuestions).filter(Boolean).length;
  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div>
      <a href="#main" className="skip">Skip to content</a>

      {/* Econova Sticky Header */}
      <header className="econova-site-header">
        <div className="wrap nav">
          <a className="logo" href="#main" aria-label="Econova lesson top">
            <span className="logo-mark" aria-hidden="true">✦</span>
            <span>Econova<em>.vip</em></span>
          </a>
          <nav aria-label="Main navigation">
            <a href="#poem-lines">Poem Lines</a>
            <a href="#vocabulary">Vocabulary</a>
            <a href="#practice">Practise (30 MCQs)</a>
            <a className="mint-btn" href="#practice">Start Quiz ↘</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main id="main" className="wrap">
        {/* Hero Section */}
        <section className="hero" aria-labelledby="poem-title">
          <div>
            <div className="pill">Class 1 English · Poem Lesson</div>
            <h1 id="poem-title">
              The Gentle<br />
              <span className="green"><span className="underline">Way.</span></span>
            </h1>
            <p className="hero-author">Author: Rodney O'Hurd</p>
            <p className="hero-hindi hi" lang="hi">शांत और प्यार भरा सफर (धीमी राह)</p>
            <p className="hero-description">
              A tender, heartwarming poem celebrating the sweet companionship between a grandchild and Grandpa. 
              With small steps, no hurry, and calm joy, discover the beauty of taking your time to stop and see the world.
            </p>

            <div className="hero-actions">
              <a className="mint-btn" href="#poem-lines">
                Let’s read together <ArrowRight size={18} />
              </a>
              <a className="text-link" href="#practice">
                Try the 30 tricky questions <ArrowDown size={18} />
              </a>
            </div>

            <div className="hero-note">
              <span>✦ 8 Illustrated poem lines</span>
              <span>✦ Hindi pronunciation &amp; meaning</span>
              <span>✦ 30 Interactive MCQs</span>
            </div>
          </div>

          {/* Hero Art SVG */}
          <div className="hero-art">
            <svg className="scene-svg" viewBox="0 0 700 370" role="img" aria-label="Grandpa and child walking together in a sunny park with walking stick and short steps.">
              {/* Sky and gentle hills */}
              <rect width="700" height="370" rx="22" fill="#ecfdf5" />
              <circle cx="620" cy="65" r="34" fill="#fde047" opacity="0.9" />
              <g fill="#fef08a" opacity="0.6">
                <circle cx="620" cy="65" r="46" />
              </g>

              {/* Gentle Clouds */}
              <g fill="#ffffff" opacity="0.85">
                <ellipse cx="140" cy="55" rx="55" ry="18" />
                <ellipse cx="120" cy="45" rx="28" ry="22" />
                <ellipse cx="380" cy="70" rx="60" ry="16" />
                <ellipse cx="360" cy="60" rx="30" ry="20" />
              </g>

              {/* Park Rolling Hills */}
              <path d="M0 200q130-70 260-15 140-80 290-15 85-30 150-5v205H0" fill="#a7f3d0" />
              <path d="M0 255q220-60 410 5 155-30 290 8v102H0" fill="#6ee7b7" />

              {/* Cobblestone / Earthy Path */}
              <path d="M40 370 Q 220 280, 480 370" fill="none" stroke="#fed7aa" strokeWidth="65" strokeLinecap="round" />
              <path d="M80 340 Q 240 285, 450 345" fill="none" stroke="#fbcfe8" strokeWidth="3" strokeDasharray="8 8" opacity="0.6" />

              {/* Park Trees in background */}
              <g>
                <rect x="75" y="160" width="18" height="70" rx="4" fill="#92400e" />
                <ellipse cx="84" cy="140" rx="48" ry="40" fill="#10b981" />
                <ellipse cx="94" cy="130" rx="38" ry="32" fill="#34d399" />

                <rect x="580" y="150" width="16" height="70" rx="4" fill="#92400e" />
                <ellipse cx="588" cy="130" rx="44" ry="36" fill="#059669" />
                <ellipse cx="598" cy="120" rx="34" ry="28" fill="#34d399" />
              </g>

              {/* Footprints on path (short steps!) */}
              <g fill="#d97706" opacity="0.6">
                {/* Child steps */}
                <ellipse cx="170" cy="335" rx="6" ry="9" transform="rotate(15 170 335)" />
                <ellipse cx="205" cy="328" rx="6" ry="9" transform="rotate(10 205 328)" />
                <ellipse cx="240" cy="322" rx="6" ry="9" transform="rotate(15 240 322)" />
                {/* Grandpa steps (also short!) */}
                <ellipse cx="280" cy="338" rx="8" ry="12" transform="rotate(12 280 338)" />
                <ellipse cx="315" cy="332" rx="8" ry="12" transform="rotate(10 315 332)" />
                <ellipse cx="350" cy="328" rx="8" ry="12" transform="rotate(12 350 328)" />
              </g>

              {/* GRANDPA Figure */}
              <g id="grandpa-character">
                {/* Legs and brown trousers */}
                <line x1="285" y1="240" x2="285" y2="295" stroke="#78350f" strokeWidth="12" strokeLinecap="round" />
                <line x1="310" y1="240" x2="310" y2="295" stroke="#78350f" strokeWidth="12" strokeLinecap="round" />
                {/* Shoes */}
                <path d="M275 295 h 18 a 4 4 0 0 1 4 4 v 4 h -26 z" fill="#1f2937" />
                <path d="M302 295 h 18 a 4 4 0 0 1 4 4 v 4 h -26 z" fill="#1f2937" />

                {/* Torso: Cozy Knit Cardigan / Sweater */}
                <rect x="272" y="165" width="52" height="75" rx="14" fill="#0284c7" />
                {/* Cardigan buttons */}
                <circle cx="298" cy="180" r="3" fill="#fde047" />
                <circle cx="298" cy="195" r="3" fill="#fde047" />
                <circle cx="298" cy="210" r="3" fill="#fde047" />

                {/* Grandpa Left Arm holding walking stick */}
                <path d="M275 175 Q 248 190, 252 230" fill="none" stroke="#0284c7" strokeWidth="12" strokeLinecap="round" />
                {/* Hand */}
                <circle cx="252" cy="232" r="7" fill="#fed7aa" />
                {/* Walking Stick */}
                <path d="M246 220 q -4 -16 12 -16 q 12 0 10 14 l -12 95" fill="none" stroke="#78350f" strokeWidth="5" strokeLinecap="round" />

                {/* Grandpa Right Arm reaching down to hold child's hand */}
                <path d="M320 180 Q 345 205, 360 225" fill="none" stroke="#0284c7" strokeWidth="12" strokeLinecap="round" />
                <circle cx="362" cy="226" r="7" fill="#fed7aa" />

                {/* Grandpa Head & Friendly Face */}
                <circle cx="298" cy="132" r="23" fill="#fed7aa" />
                {/* Grey Hair */}
                <path d="M275 130 q 0 -22 23 -22 q 23 0 23 22 c 0 6 -4 8 -8 7 q -15 -8 -30 0 z" fill="#cbd5e1" />
                {/* Warm smile & rosy cheeks */}
                <path d="M292 140 q 6 6 12 0" fill="none" stroke="#9a3412" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="288" cy="136" r="3" fill="#fca5a5" opacity="0.7" />
                <circle cx="308" cy="136" r="3" fill="#fca5a5" opacity="0.7" />
                {/* Spectacles / Glasses */}
                <circle cx="291" cy="130" r="6" fill="none" stroke="#78350f" strokeWidth="2" />
                <circle cx="305" cy="130" r="6" fill="none" stroke="#78350f" strokeWidth="2" />
                <line x1="297" y1="130" x2="299" y2="130" stroke="#78350f" strokeWidth="2" />
                {/* Eyes behind glasses */}
                <circle cx="291" cy="130" r="2" fill="#1f2937" />
                <circle cx="305" cy="130" r="2" fill="#1f2937" />
              </g>

              {/* CHILD Figure */}
              <g id="child-character">
                {/* Child Legs */}
                <line x1="375" y1="260" x2="375" y2="296" stroke="#1d4ed8" strokeWidth="8" strokeLinecap="round" />
                <line x1="392" y1="260" x2="392" y2="296" stroke="#1d4ed8" strokeWidth="8" strokeLinecap="round" />
                {/* Red sneakers */}
                <path d="M368 296 h 14 a 3 3 0 0 1 3 3 v 3 h -20 z" fill="#ef4444" />
                <path d="M386 296 h 14 a 3 3 0 0 1 3 3 v 3 h -20 z" fill="#ef4444" />

                {/* Child Yellow Hoodie / Shirt */}
                <rect x="366" y="210" width="36" height="52" rx="10" fill="#f59e0b" />

                {/* Child Left Arm reaching to Grandpa's hand */}
                <path d="M368 220 Q 360 224, 362 226" fill="none" stroke="#f59e0b" strokeWidth="8" strokeLinecap="round" />
                {/* Child Right Arm swinging happily */}
                <path d="M400 220 Q 415 235, 410 248" fill="none" stroke="#f59e0b" strokeWidth="8" strokeLinecap="round" />
                <circle cx="410" cy="249" r="5" fill="#fed7aa" />

                {/* Child Head */}
                <circle cx="384" cy="186" r="17" fill="#fed7aa" />
                {/* Brown Kid Hair */}
                <path d="M367 184 q 0 -17 17 -17 q 17 0 17 17 c 0 4 -2 6 -6 4 q -11 -7 -22 0 z" fill="#78350f" />
                {/* Child Eyes & Big Happy Smile */}
                <circle cx="379" cy="184" r="2" fill="#1f2937" />
                <circle cx="390" cy="184" r="2" fill="#1f2937" />
                <path d="M380 192 q 4 5 9 0" fill="none" stroke="#b91c1c" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="376" cy="189" r="3" fill="#fca5a5" opacity="0.6" />
                <circle cx="393" cy="189" r="3" fill="#fca5a5" opacity="0.6" />
              </g>

              {/* Colorful Butterflies (Stop and see!) */}
              <g transform="translate(480, 210)">
                <path d="M0 0 C -12 -14, -18 6, 0 10 C 18 6, 12 -14, 0 0" fill="#ec4899" />
                <path d="M0 10 C -10 14, -12 24, 0 20 C 12 24, 10 14, 0 10" fill="#f43f5e" />
                <circle cx="0" cy="5" r="2" fill="#1f2937" />
              </g>
              <g transform="translate(200, 180)">
                <path d="M0 0 C -10 -12, -14 5, 0 8 C 14 5, 10 -12, 0 0" fill="#38bdf8" />
                <path d="M0 8 C -8 11, -10 18, 0 16 C 10 18, 8 11, 0 8" fill="#0284c7" />
              </g>

              {/* Flowers by the roadside */}
              <g transform="translate(140, 310)">
                <circle cx="0" cy="0" r="5" fill="#fde047" />
                <circle cx="-6" cy="0" r="4" fill="#ffffff" />
                <circle cx="6" cy="0" r="4" fill="#ffffff" />
                <circle cx="0" cy="-6" r="4" fill="#ffffff" />
                <circle cx="0" cy="6" r="4" fill="#ffffff" />
              </g>
              <g transform="translate(440, 335)">
                <circle cx="0" cy="0" r="5" fill="#f59e0b" />
                <circle cx="-6" cy="0" r="4" fill="#fb7185" />
                <circle cx="6" cy="0" r="4" fill="#fb7185" />
                <circle cx="0" cy="-6" r="4" fill="#fb7185" />
                <circle cx="0" cy="6" r="4" fill="#fb7185" />
              </g>
            </svg>
            <p className="art-caption">SHORT STEPS · NO HURRY · STOP &amp; SEE</p>
          </div>
        </section>

        {/* Meet the Poem Elements & Themes */}
        <section aria-labelledby="themes-title" className="section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Meet our gentle companions</p>
              <h2 id="themes-title">Four thoughts to cherish.</h2>
            </div>
            <p>Look for these four ideas as you read the lines. Who takes small steps? Who stops and sees?</p>
          </div>

          <div className="cast">
            <article className="mint-card cast-card">
              <svg viewBox="0 0 110 110" role="img" aria-label="Grandpa icon">
                <circle cx="55" cy="55" r="48" fill="#ecfdf5" stroke="#34d399" strokeWidth="2" />
                <circle cx="55" cy="46" r="20" fill="#fed7aa" />
                <path d="M35 44 q 0 -18 20 -18 q 20 0 20 18" fill="#cbd5e1" />
                <circle cx="48" cy="44" r="5" fill="none" stroke="#78350f" strokeWidth="2" />
                <circle cx="62" cy="44" r="5" fill="none" stroke="#78350f" strokeWidth="2" />
                <line x1="53" y1="44" x2="57" y2="44" stroke="#78350f" strokeWidth="2" />
                <path d="M50 54 q 5 5 10 0" fill="none" stroke="#9a3412" strokeWidth="2" />
                <rect x="34" y="68" width="42" height="30" rx="8" fill="#0284c7" />
              </svg>
              <h3>Grandpa</h3>
              <p className="hi" lang="hi">दादाजी (स्नेही व शांत)</p>
              <p className="cast-detail">Walks with short steps, never says 'hurry up', and always takes his time.</p>
            </article>

            <article className="amber-card cast-card">
              <svg viewBox="0 0 110 110" role="img" aria-label="The Child icon">
                <circle cx="55" cy="55" r="48" fill="#fffbeb" stroke="#fcd34d" strokeWidth="2" />
                <circle cx="55" cy="48" r="18" fill="#fed7aa" />
                <path d="M37 46 q 0 -16 18 -16 q 18 0 18 16" fill="#78350f" />
                <circle cx="49" cy="46" r="2.5" fill="#1f2937" />
                <circle cx="61" cy="46" r="2.5" fill="#1f2937" />
                <path d="M50 54 q 5 6 10 0" fill="none" stroke="#dc2626" strokeWidth="2.5" />
                <rect x="36" y="68" width="38" height="28" rx="8" fill="#f59e0b" />
              </svg>
              <h3>The Child ('Me')</h3>
              <p className="hi" lang="hi">नन्हा बच्चा (हर्षित)</p>
              <p className="cast-detail">Loves walking with Grandpa, feels grateful, and shares the same short steps.</p>
            </article>

            <article className="mint-card cast-card">
              <svg viewBox="0 0 110 110" role="img" aria-label="Rushing people icon">
                <circle cx="55" cy="55" r="48" fill="#ecfdf5" stroke="#34d399" strokeWidth="2" />
                {/* Running stick figure rushing with watch */}
                <circle cx="58" cy="34" r="10" fill="#64748b" />
                <path d="M56 45 l -8 18 l 14 6 l 10 22" fill="none" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
                <path d="M48 63 l -14 18" fill="none" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
                <path d="M50 48 l -16 -6" fill="none" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
                {/* Little clock */}
                <circle cx="30" cy="40" r="8" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5" />
                <line x1="30" y1="40" x2="30" y2="35" stroke="#fff" strokeWidth="1.5" />
                <line x1="30" y1="40" x2="34" y2="40" stroke="#fff" strokeWidth="1.5" />
              </svg>
              <h3>Most People</h3>
              <p className="hi" lang="hi">जल्दबाज़ लोग (भागदौड़)</p>
              <p className="cast-detail">Always in a hurry, caught up in rush, missing the wonders around them.</p>
            </article>

            <article className="amber-card cast-card">
              <svg viewBox="0 0 110 110" role="img" aria-label="Stop and See nature icon">
                <circle cx="55" cy="55" r="48" fill="#fffbeb" stroke="#fcd34d" strokeWidth="2" />
                {/* Flower and butterfly */}
                <circle cx="55" cy="62" r="8" fill="#f59e0b" />
                <circle cx="45" cy="62" r="6" fill="#fbbf24" />
                <circle cx="65" cy="62" r="6" fill="#fbbf24" />
                <circle cx="55" cy="52" r="6" fill="#fbbf24" />
                <circle cx="55" cy="72" r="6" fill="#fbbf24" />
                <path d="M55 70 q 0 18 -6 22" fill="none" stroke="#10b981" strokeWidth="3" />
                {/* Flying butterfly */}
                <path d="M52 28 C 42 18, 40 32, 52 35 C 64 32, 62 18, 52 28" fill="#ec4899" />
              </svg>
              <h3>'Stop and See'</h3>
              <p className="hi" lang="hi">प्रकृति और नज़ारे (शांति)</p>
              <p className="cast-detail">Pausing to appreciate nature, birds, flowers, and gentle companionship.</p>
            </article>
          </div>
        </section>

        {/* Story Tools Bar */}
        <div className="mint-card story-tools" id="poem-lines">
          <nav className="scene-links" aria-label="Quick poem navigation">
            <a href="#line-1">Lines 1–4</a>
            <a href="#line-5">Lines 5–8</a>
            <a href="#vocabulary">Word Corner</a>
            <a href="#practice">Practise (30 MCQs)</a>
          </nav>
          <button
            id="support-toggle"
            className="quiet-btn"
            type="button"
            aria-pressed={showSupport}
            onClick={() => setShowSupport(!showSupport)}
          >
            {showSupport ? 'Hide pronunciation & meaning' : 'Show pronunciation & meaning'}
          </button>
        </div>

        <p className="reading-tip">
          Read each English line, listen using the sound button 🔊, say it with the Hindi pronunciation guide, and understand its meaning. 
          <span lang="hi" className="hi"> एक बार में थोड़ा पढ़ें। फिर अपने दादा-दादी के साथ अपनी सैर को याद करें!</span>
        </p>

        {/* 1. Line-by-Line Translation & Pronunciation */}
        <div id="story-content" className={!showSupport ? 'hide-support' : ''}>
          {/* Stanza 1 (Lines 1 to 4) */}
          <section className="story-scene section" id="stanza-1" aria-labelledby="stanza-title-1">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Stanza 01 · Hand in Hand</p>
                <h2 id="stanza-title-1">Short Steps &amp; No Hurry</h2>
                <p className="hi scene-hindi" lang="hi">छोटे कदम और बिना किसी जल्दबाजी का साथ</p>
              </div>
              <a className="text-link" href="#stanza-2">Next stanza ↓</a>
            </div>

            <div className="scene-layout">
              {/* Scene Picture Sidebar */}
              <aside className="scene-picture">
                <svg className="scene-svg" viewBox="0 0 320 220" role="img" aria-label="Grandpa and child matching their short steps on a flower path">
                  <rect width="320" height="220" rx="16" fill="#ecfdf5" />
                  <path d="M0 130 q 90 -40 180 0 t 140 -10 v 100 H 0 Z" fill="#a7f3d0" />
                  <path d="M20 220 Q 140 160, 280 220" fill="none" stroke="#fed7aa" strokeWidth="44" strokeLinecap="round" />
                  {/* Grandpa & Child silhouettes / figures */}
                  <circle cx="120" cy="85" r="15" fill="#fed7aa" />
                  <path d="M106 82 q 0 -14 14 -14 q 14 0 14 14" fill="#cbd5e1" />
                  <rect x="105" y="102" width="30" height="45" rx="8" fill="#0284c7" />
                  <line x1="112" y1="147" x2="112" y2="185" stroke="#78350f" strokeWidth="7" strokeLinecap="round" />
                  <line x1="126" y1="147" x2="126" y2="185" stroke="#78350f" strokeWidth="7" strokeLinecap="round" />
                  {/* Walking cane */}
                  <line x1="94" y1="120" x2="90" y2="188" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />

                  {/* Child */}
                  <circle cx="170" cy="115" r="12" fill="#fed7aa" />
                  <rect x="158" y="128" width="24" height="34" rx="6" fill="#f59e0b" />
                  <line x1="164" y1="162" x2="164" y2="186" stroke="#1d4ed8" strokeWidth="5" strokeLinecap="round" />
                  <line x1="174" y1="162" x2="174" y2="186" stroke="#1d4ed8" strokeWidth="5" strokeLinecap="round" />

                  {/* Holding hands */}
                  <path d="M132 115 Q 146 128, 158 132" fill="none" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" />
                </svg>
                <p>Gentle steps, hand in hand, with plenty of time to smile.</p>
                <div className="sequence-badge">
                  <span>1</span> Stanza 1 · Lines 1–4
                </div>
              </aside>

              {/* Story Lines 1-4 */}
              <div className="story-lines">
                {POEM_LINES.slice(0, 4).map(line => (
                  <article key={line.id} id={`line-${line.id}`} className="story-line featured" aria-label={`Poem Line ${line.id}`}>
                    <div className="line-top">
                      <span className="speaker">
                        <Heart size={14} className="text-emerald-600 inline" />
                        Little Child <span className="hi" lang="hi">· नन्हा बच्चा</span>
                      </span>
                      <span className="sentence-no">Line 0{line.id}</span>
                    </div>

                    <div className="english-row">
                      <p className="english" lang="en">"{line.english}"</p>
                      <button
                        type="button"
                        className="speak-btn"
                        onClick={() => speakText(line.english, line.id)}
                        aria-label={`Listen to line ${line.id}`}
                      >
                        {speakingId === line.id ? <VolumeX size={15} /> : <Volume2 size={15} />}
                        Listen
                      </button>
                    </div>

                    <div className="language-support">
                      <p className="pronunciation hi" lang="hi">
                        <span className="line-label">बोलें</span>
                        {line.hindiPronunciation}
                      </p>
                      <p className="translation hi" lang="hi">
                        <span className="line-label">अर्थ</span>
                        {line.hindiMeaning}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Stanza 2 (Lines 5 to 8) */}
          <section className="story-scene section" id="stanza-2" aria-labelledby="stanza-title-2">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Stanza 02 · Stop, See &amp; Love</p>
                <h2 id="stanza-title-2">Unrushed &amp; Young Like Me</h2>
                <p className="hi scene-hindi" lang="hi">बिना जल्दबाजी के, शांत और दिल से युवा</p>
              </div>
              <a className="text-link" href="#vocabulary">Word corner ↓</a>
            </div>

            <div className="scene-layout">
              {/* Scene Picture Sidebar */}
              <aside className="scene-picture">
                <svg className="scene-svg" viewBox="0 0 320 220" role="img" aria-label="Grandpa and child stopping to see a colourful butterfly while busy crowds rush past">
                  <rect width="320" height="220" rx="16" fill="#ecfdf5" />
                  <path d="M0 140 q 120 -35 240 5 t 80 5 v 70 H 0 Z" fill="#6ee7b7" />

                  {/* Silhouettes of rushing crowd in grey background */}
                  <g fill="#94a3b8" opacity="0.4">
                    <circle cx="35" cy="115" r="9" />
                    <rect x="28" y="125" width="14" height="26" rx="4" />
                    <circle cx="65" cy="110" r="9" />
                    <rect x="58" y="120" width="14" height="26" rx="4" />
                  </g>

                  {/* Grandpa and child kneeling/stopping to look at nature */}
                  <circle cx="180" cy="110" r="15" fill="#fed7aa" />
                  <path d="M166 108 q 0 -13 14 -13 q 14 0 14 13" fill="#cbd5e1" />
                  <circle cx="174" cy="110" r="4" fill="none" stroke="#78350f" strokeWidth="1.5" />
                  <circle cx="184" cy="110" r="4" fill="none" stroke="#78350f" strokeWidth="1.5" />
                  <rect x="168" y="126" width="30" height="40" rx="8" fill="#0284c7" />

                  {/* Child pointing at butterfly */}
                  <circle cx="230" cy="125" r="12" fill="#fed7aa" />
                  <rect x="220" y="138" width="22" height="32" rx="6" fill="#f59e0b" />
                  {/* Pointing arm */}
                  <line x1="240" y1="145" x2="265" y2="135" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />

                  {/* Bright Butterfly */}
                  <path d="M272 130 C 265 120, 260 135, 272 138 C 284 135, 280 120, 272 130" fill="#ec4899" />
                  <circle cx="272" cy="134" r="2" fill="#1f2937" />
                </svg>
                <p>Most people rush, but Grandpa and I stop to enjoy the world.</p>
                <div className="sequence-badge">
                  <span>2</span> Stanza 2 · Lines 5–8
                </div>
              </aside>

              {/* Story Lines 5-8 */}
              <div className="story-lines">
                {POEM_LINES.slice(4, 8).map(line => (
                  <article key={line.id} id={`line-${line.id}`} className="story-line featured" aria-label={`Poem Line ${line.id}`}>
                    <div className="line-top">
                      <span className="speaker">
                        <Sparkles size={14} className="text-amber-500 inline" />
                        Little Child <span className="hi" lang="hi">· नन्हा बच्चा</span>
                      </span>
                      <span className="sentence-no">Line 0{line.id}</span>
                    </div>

                    <div className="english-row">
                      <p className="english" lang="en">"{line.english}"</p>
                      <button
                        type="button"
                        className="speak-btn"
                        onClick={() => speakText(line.english, line.id)}
                        aria-label={`Listen to line ${line.id}`}
                      >
                        {speakingId === line.id ? <VolumeX size={15} /> : <Volume2 size={15} />}
                        Listen
                      </button>
                    </div>

                    <div className="language-support">
                      <p className="pronunciation hi" lang="hi">
                        <span className="line-label">बोलें</span>
                        {line.hindiPronunciation}
                      </p>
                      <p className="translation hi" lang="hi">
                        <span className="line-label">अर्थ</span>
                        {line.hindiMeaning}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Thought & Moral Box */}
        <section className="amber-card moral-box" aria-labelledby="moral-title">
          <div>
            <p className="eyebrow">A thought to take with you</p>
            <h2 id="moral-title">The Gentle Way</h2>
            <p className="hi" lang="hi">
              धीमी और प्यारी राह: दादाजी का शांत और स्नेहमयी साथ।<br />
              <strong>"He always takes his time... 'Unrushed' and young like me."</strong>
            </p>
            <p>
              In a world where everyone seems to be running, Grandpa teaches us the joy of being patient, loving, and noticing all the little wonders around us.
            </p>
          </div>
          <div className="kindness">
            <h3>Let’s talk with kindness.</h3>
            <p>
              Walking with our elders gives us a chance to listen, learn, and slow down. Patience is not weakness—it is love in action!
            </p>
            <p lang="hi" className="hi">
              दादा-दादी के साथ समय बिताएं। उनका हाथ पकड़कर धीरे-धीरे चलें और उनकी प्यार भरी बातों को सुनें।
            </p>
          </div>
        </section>

        {/* 2. Hard Words & Vocabulary */}
        <section id="vocabulary" className="section" aria-labelledby="vocab-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Read · Say · Understand</p>
              <h2 id="vocab-title">Hard words &amp; vocabulary.</h2>
            </div>
            <p>Listen and pronounce each word carefully. Notice how it is used in the poem!</p>
          </div>

          <dl className="vocab-grid">
            <div className="mint-card vocab-card">
              <dt>
                <span>Grandpa</span>
                <button
                  type="button"
                  className="text-emerald-700 hover:text-emerald-900"
                  onClick={() => speakText('Grandpa', 101)}
                  aria-label="Pronounce Grandpa"
                >
                  <Volume2 size={18} />
                </button>
              </dt>
              <dd className="sound hi" lang="hi">ग्रैंडपा</dd>
              <dd className="hi" lang="hi">दादाजी / नानाजी (A loving grandfather)</dd>
            </div>

            <div className="amber-card vocab-card">
              <dt>
                <span>Steps</span>
                <button
                  type="button"
                  className="text-amber-700 hover:text-amber-900"
                  onClick={() => speakText('Steps', 102)}
                  aria-label="Pronounce Steps"
                >
                  <Volume2 size={18} />
                </button>
              </dt>
              <dd className="sound hi" lang="hi">स्टेप्स</dd>
              <dd className="hi" lang="hi">कदम (Paces or walking distance)</dd>
            </div>

            <div className="mint-card vocab-card">
              <dt>
                <span>Hurry</span>
                <button
                  type="button"
                  className="text-emerald-700 hover:text-emerald-900"
                  onClick={() => speakText('Hurry', 103)}
                  aria-label="Pronounce Hurry"
                >
                  <Volume2 size={18} />
                </button>
              </dt>
              <dd className="sound hi" lang="hi">हरी</dd>
              <dd className="hi" lang="hi">जल्दीबाज़ी करना (To rush or move fast)</dd>
            </div>

            <div className="amber-card vocab-card">
              <dt>
                <span>Glad</span>
                <button
                  type="button"
                  className="text-amber-700 hover:text-amber-900"
                  onClick={() => speakText('Glad', 104)}
                  aria-label="Pronounce Glad"
                >
                  <Volume2 size={18} />
                </button>
              </dt>
              <dd className="sound hi" lang="hi">ग्लैड</dd>
              <dd className="hi" lang="hi">खुश / प्रसन्न (Happy, pleased and thankful)</dd>
            </div>

            <div className="mint-card vocab-card">
              <dt>
                <span>Unrushed</span>
                <button
                  type="button"
                  className="text-emerald-700 hover:text-emerald-900"
                  onClick={() => speakText('Unrushed', 105)}
                  aria-label="Pronounce Unrushed"
                >
                  <Volume2 size={18} />
                </button>
              </dt>
              <dd className="sound hi" lang="hi">अनरश्ड</dd>
              <dd className="hi" lang="hi">बिना जल्दबाजी का / शांत (Calm and peaceful)</dd>
            </div>

            <div className="amber-card vocab-card">
              <dt>
                <span>Gentle</span>
                <button
                  type="button"
                  className="text-amber-700 hover:text-amber-900"
                  onClick={() => speakText('Gentle', 106)}
                  aria-label="Pronounce Gentle"
                >
                  <Volume2 size={18} />
                </button>
              </dt>
              <dd className="sound hi" lang="hi">जेंटल</dd>
              <dd className="hi" lang="hi">कोमल / शांत (Soft, mild and tender)</dd>
            </div>

            <div className="mint-card vocab-card">
              <dt>
                <span>Mine</span>
                <button
                  type="button"
                  className="text-emerald-700 hover:text-emerald-900"
                  onClick={() => speakText('Mine', 107)}
                  aria-label="Pronounce Mine"
                >
                  <Volume2 size={18} />
                </button>
              </dt>
              <dd className="sound hi" lang="hi">माइन</dd>
              <dd className="hi" lang="hi">मेरे / मेरा (Belonging to me)</dd>
            </div>

            <div className="amber-card vocab-card">
              <dt>
                <span>Stop &amp; See</span>
                <button
                  type="button"
                  className="text-amber-700 hover:text-amber-900"
                  onClick={() => speakText('Stop and see', 108)}
                  aria-label="Pronounce Stop and see"
                >
                  <Volume2 size={18} />
                </button>
              </dt>
              <dd className="sound hi" lang="hi">स्टॉप एंड सी</dd>
              <dd className="hi" lang="hi">रुकना और देखना (To pause and admire)</dd>
            </div>
          </dl>

          {/* Word Journey Flow */}
          <div className="journey" aria-label="Poem flow journey">
            <div>
              <span aria-hidden="true">👣</span>
              <b>1. Short Steps</b>
              <span className="hi" lang="hi" style={{ fontSize: '13px', display: 'block', marginTop: '4px' }}>छोटे-छोटे कदम</span>
            </div>
            <div>
              <span aria-hidden="true">⏳</span>
              <b>2. No Hurry</b>
              <span className="hi" lang="hi" style={{ fontSize: '13px', display: 'block', marginTop: '4px' }}>कोई जल्दबाज़ी नहीं</span>
            </div>
            <div>
              <span aria-hidden="true">🌸</span>
              <b>3. Stop &amp; See</b>
              <span className="hi" lang="hi" style={{ fontSize: '13px', display: 'block', marginTop: '4px' }}>रुकना और देखना</span>
            </div>
            <div>
              <span aria-hidden="true">❤️</span>
              <b>4. Young Like Me</b>
              <span className="hi" lang="hi" style={{ fontSize: '13px', display: 'block', marginTop: '4px' }}>दिल से युवा</span>
            </div>
          </div>
        </section>

        {/* 3. Practice Questions (30 Tricky 4-Option MCQs) */}
        <section id="practice" className="mint-card practice-intro" aria-labelledby="practice-title">
          <p className="eyebrow">Little readers. Big discoveries.</p>
          <h2 id="practice-title">Practice Questions (30 Tricky 4-Option MCQs)</h2>
          <p>
            Test your understanding across three specialized parts: Text Understanding, Deep Comprehension, and Line Completion &amp; Rhymes.
            Answer each question and click <strong>Check answer ✓</strong>.
          </p>
          <p lang="hi" className="hi">
            सभी 30 प्रश्नों का अभ्यास करें। सही उत्तर चुनें और तुरंत अपनी प्रगति जांचें!
          </p>

          {/* Filter Navigation & Progress Bar */}
          <div className="progress-row">
            <nav className="filter-nav" aria-label="Exercise group filters">
              <button
                className="filter-btn"
                type="button"
                aria-pressed={activeFilter === 'all'}
                onClick={() => setActiveFilter('all')}
              >
                All 30
              </button>
              <button
                className="filter-btn"
                type="button"
                aria-pressed={activeFilter === 'text'}
                onClick={() => setActiveFilter('text')}
              >
                Part 1 · Text (10)
              </button>
              <button
                className="filter-btn"
                type="button"
                aria-pressed={activeFilter === 'deep'}
                onClick={() => setActiveFilter('deep')}
              >
                Part 2 · Deep (10)
              </button>
              <button
                className="filter-btn"
                type="button"
                aria-pressed={activeFilter === 'rhymes'}
                onClick={() => setActiveFilter('rhymes')}
              >
                Part 3 · Rhymes (10)
              </button>
            </nav>

            <div className="progress-meta">
              <span id="progress-text" role="status">
                {correctCount} of 30 answers correct ({answeredCount} answered)
              </span>
              <progress
                id="progress"
                value={correctCount}
                max={30}
                aria-label="Correct answers out of thirty"
              ></progress>
            </div>
          </div>
        </section>

        {/* Questions Grid */}
        <section className="exercise-section" aria-label="Questions list">
          <div className="question-grid">
            {filteredQuestions.map(q => {
              const selected = selectedAnswers[q.id];
              const isChecked = checkedQuestions[q.id] !== undefined;
              const isCorrect = checkedQuestions[q.id] === true;

              return (
                <article
                  key={q.id}
                  className="mint-card question"
                  id={`question-${q.id}`}
                  aria-labelledby={`qtitle-${q.id}`}
                >
                  <div className="question-top">
                    <span className="eyebrow">
                      {q.partTitle.split('·')[0].trim()} · Q{q.id < 10 ? `0${q.id}` : q.id}
                    </span>
                    <span
                      className={`question-state ${isChecked ? (isCorrect ? 'correct' : 'retry') : ''}`}
                    >
                      {isChecked ? (isCorrect ? '✓ Correct' : 'Try again') : (selected !== undefined ? 'Selected' : 'Your turn')}
                    </span>
                  </div>

                  <h3 id={`qtitle-${q.id}`}>{q.question}</h3>
                  <p className="question-hindi hi" lang="hi">{q.hindi}</p>

                  <fieldset className="choices">
                    <legend className="sr-only">Choose an option for question {q.id}</legend>
                    {q.options.map((opt, optIndex) => {
                      const letter = String.fromCharCode(65 + optIndex);
                      return (
                        <label key={optIndex} className="choice">
                          <input
                            type="radio"
                            name={`q_${q.id}`}
                            value={optIndex}
                            checked={selected === optIndex}
                            onChange={() => handleSelectOption(q.id, optIndex)}
                          />
                          <span className="choice-letter" aria-hidden="true">{letter}</span>
                          <span>{opt}</span>
                        </label>
                      );
                    })}
                  </fieldset>

                  <div className="question-bottom">
                    <button
                      className="mint-btn check-button"
                      type="button"
                      onClick={() => handleCheckQuestion(q.id)}
                      aria-label={`Check question ${q.id}`}
                    >
                      Check answer ✓
                    </button>

                    {isChecked && (
                      <p
                        className="feedback"
                        data-state={isCorrect ? 'correct' : 'retry'}
                        role="status"
                      >
                        {isCorrect
                          ? '✓ Correct! Wonderful answer, little reader! / बिल्कुल सही उत्तर! शाबाश।'
                          : 'Not quite yet. Read the explanation below and try again. / सही उत्तर समझने के लिए नीचे व्याख्या देखें।'}
                      </p>
                    )}

                    <details className="answer-help" open={isChecked}>
                      <summary>
                        Short explanation <span lang="hi" className="hi">· व्याख्या</span>
                      </summary>
                      <p>{q.explanation}</p>
                    </details>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Check All 30 Answers Section */}
        <section className="amber-card check-all">
          <div>
            <h2>Ready to see your total score?</h2>
            <p>Check all 30 answers across all sections at once!</p>
          </div>
          <button className="mint-btn" type="button" onClick={handleCheckAll}>
            Check all 30 answers ✓
          </button>
        </section>

        {/* Results Modal/Card */}
        {showResults && (
          <section id="results-section" className="mint-card results" tabIndex={-1} aria-labelledby="result-title">
            <h2 id="result-title">Your Reading &amp; Comprehension Snapshot</h2>
            <p id="result-text" role="status">
              You scored <strong>{correctCount} out of 30</strong> ({Math.round((correctCount / 30) * 100)}%).
            </p>

            <div className="result-counts">
              <span>
                Part 1 (Text): {QUESTIONS.slice(0, 10).filter(q => checkedQuestions[q.id]).length} / 10
              </span>
              <span>
                Part 2 (Deep): {QUESTIONS.slice(10, 20).filter(q => checkedQuestions[q.id]).length} / 10
              </span>
              <span>
                Part 3 (Rhymes): {QUESTIONS.slice(20, 30).filter(q => checkedQuestions[q.id]).length} / 10
              </span>
            </div>

            <p style={{ marginTop: '14px', fontWeight: 700, color: '#047857' }}>
              {correctCount === 30
                ? '🌟 Brilliant! You have completely mastered "The Gentle Way"!'
                : correctCount >= 20
                ? 'Great effort! Take a look at the explanations and try again for 30/30!'
                : 'Good start! Re-read the poem lines and try once more. You can do it!'}
            </p>
          </section>
        )}

        {/* Reset Area */}
        <div className="reset-area">
          {!showResetConfirm ? (
            <button
              className="quiet-btn"
              type="button"
              onClick={() => setShowResetConfirm(true)}
            >
              <RotateCcw size={16} className="inline mr-2" /> Start the exercises again
            </button>
          ) : (
            <div className="amber-card reset-confirm">
              <p>Clear all your answers and start fresh? The poem will stay here.</p>
              <button className="mint-btn" type="button" onClick={handleReset}>
                Yes, start again
              </button>
              <button
                className="quiet-btn"
                type="button"
                onClick={() => setShowResetConfirm(false)}
              >
                Keep my answers
              </button>
            </div>
          )}
        </div>

        {/* Lesson End Navigation */}
        <nav className="lesson-end" aria-label="Lesson navigation">
          <a className="mint-btn" href="#poem-lines">
            Read the poem again ↑
          </a>
          <a className="text-link" href="#practice">
            Practice questions ↘
          </a>
        </nav>
      </main>

      {/* Econova Footer */}
      <footer>
        <div className="wrap footer-inner">
          <a className="footer-brand" href="#main">Econova.vip ✦</a>
          <p>© {new Date().getFullYear()} Econova.vip · Class 1 English · "The Gentle Way" by Rodney O'Hurd</p>
          <div className="footer-links">
            <a href="#vocabulary">Vocabulary</a>
            <a href="#practice">Practise</a>
            <a href="#main">Top ↑</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
