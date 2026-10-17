import { ConceptQuestion, TestQuestion } from '../types';

export const CONCEPT_QUESTIONS: ConceptQuestion[] = [
  // Pair 1A: 6 Kinds of Adjectives
  {
    id: 1,
    sub: '1a',
    q: "In 'These mangoes are very sweet', what kind of adjective is 'These'?",
    hi: "'These mangoes are very sweet' में 'These' किस प्रकार का विशेषण है?",
    opts: [
      "Possessive Adjective",
      "Quantitative Adjective",
      "Demonstrative Adjective (संकेतवाचक)",
      "Distributive Adjective"
    ],
    ans: 2,
    expl: "'These' किसी वस्तु/संज्ञा की ओर प्रत्यक्ष संकेत करता है, अतः यह Demonstrative Adjective है।"
  },
  {
    id: 2,
    sub: '1a',
    q: "Which of the following sentences contains an Adjective of Quality (गुणवाचक विशेषण)?",
    hi: "किस वाक्य में गुणवाचक विशेषण (Adjective of Quality) का प्रयोग हुआ है?",
    opts: [
      "Whose bag is this?",
      "I have some money.",
      "Each boy got a prize.",
      "She wore a heavy golden necklace."
    ],
    ans: 3,
    expl: "'Heavy' और 'golden' हार के गुण/विशेषता को बताते हैं, अतः ये Adjectives of Quality हैं।"
  },

  // Pair 1B: Participles (-ing vs -ed)
  {
    id: 3,
    sub: '1b',
    q: "In 'The marathon was tiring', why is the present participle (-ing) used?",
    hi: "'The marathon was tiring' में '-ing' कृदंत क्यों प्रयुक्त हुआ है?",
    opts: [
      "Because the marathon was feeling tired",
      "Because it is an adverb",
      "Because it is active and signifies producing the effect of tiredness",
      "Because tiring is a noun"
    ],
    ans: 2,
    expl: "Present participle (-ing) सक्रिय (Active) होता है और थकान पैदा करने वाले प्रभावक/कारण को दर्शाता है।"
  },
  {
    id: 4,
    sub: '1b',
    q: "'The spectators were completely ___ by the horrifying accident.' Choose the correct form:",
    hi: "'The spectators were completely ___ by the horrifying accident.' सही शब्द चुनें:",
    opts: [
      "horrifying",
      "horrify",
      "horrifies",
      "horrified (affected in this way - passive state)"
    ],
    ans: 3,
    expl: "दर्शकों पर भय का असर हुआ (passive state of being affected), इसलिए Past Participle 'horrified' आएगा।"
  },

  // Pair 2A: Agreement & Demonstratives
  {
    id: 5,
    sub: '2a',
    q: "What happens to the adjective 'clever' in the plural phrase 'clever girls'?",
    hi: "बहुवचन 'clever girls' में विशेषण 'clever' में क्या परिवर्तन आता है?",
    opts: [
      "It remains unchanged: clever (English adjectives never take plural -s)",
      "It becomes 'clevers'",
      "It takes an apostrophe",
      "It adds '-es'"
    ],
    ans: 0,
    expl: "अंग्रेज़ी में विशेषण लिंग या वचन के अनुसार कभी नहीं बदलते (a clever boy, clever boys, clever girls)।"
  },
  {
    id: 6,
    sub: '2a',
    q: "Which are the ONLY adjectives in English that change their form before plural nouns?",
    hi: "अंग्रेज़ी में वे एकमात्र विशेषण कौन से हैं जो बहुवचन संज्ञा के पहले रूप बदलते हैं?",
    opts: [
      "Possessive adjectives",
      "Adjectives of quality",
      "Demonstrative adjectives 'this' and 'that' (to 'these' and 'those')",
      "Distributive adjectives"
    ],
    ans: 2,
    expl: "केवल Demonstratives 'this' और 'that' बहुवचन में 'these' और 'those' बनते हैं।"
  },

  // Pair 2B: Fixed Prepositions
  {
    id: 7,
    sub: '2b',
    q: "'She has always been exceptionally good ___ mathematics.' Select the correct preposition:",
    hi: "'good' के बाद निपुणता दर्शाने के लिए कौन सा Preposition आता है?",
    opts: [
      "in",
      "for",
      "with",
      "at (good at a subject/skill)"
    ],
    ans: 3,
    expl: "किसी विषय, खेल या कला में निपुणता के लिए 'good at' का प्रयोग होता है।"
  },
  {
    id: 8,
    sub: '2b',
    q: "'I am thoroughly tired ___ your repeated excuses.' Fill in the blank:",
    hi: "'tired' (ऊब या तंग आ जाना) के साथ कौन सा preposition लगता है?",
    opts: [
      "from",
      "with",
      "of (tired of excuses)",
      "by"
    ],
    ans: 2,
    expl: "किसी बात से ऊब जाने या तंग आने पर 'tired of' का प्रयोग किया जाता है।"
  },

  // Pair 3A: Attributive vs Predicative
  {
    id: 9,
    sub: '3a',
    q: "In 'a rich merchant' vs 'The merchant became rich', what are the positions of 'rich'?",
    hi: "'a rich merchant' और 'The merchant became rich' में 'rich' की स्थितियाँ क्या हैं?",
    opts: [
      "Attributive (before noun); Predicative (after link verb became)",
      "Predicative; Attributive",
      "Both are adverbs",
      "Both are nouns"
    ],
    ans: 0,
    expl: "संज्ञा से ठीक पहले Attributive होता है; लिंकिंग क्रिया (became) के बाद Predicative होता है।"
  },
  {
    id: 10,
    sub: '3a',
    q: "Which of the following verbs is a Link Verb (Copula) taking an adjective complement?",
    hi: "इनमें से कौन सी लिंकिंग क्रिया (Link Verb) विशेषण पूरक लेती है?",
    opts: [
      "Run",
      "Throw",
      "Seem (e.g. Ann seems happy)",
      "Build"
    ],
    ans: 2,
    expl: "'Seem' एक प्रमुख copula/link verb है जो अपने बाद विशेषण (seem happy) लेता है।"
  },

  // Pair 3B: Link Verb vs Action Verb Trap
  {
    id: 11,
    sub: '3b',
    q: "'He looked ___ at the noisy crowd.' (deliberate physical looking action). Choose the correct word:",
    hi: "'He looked ___ at the noisy crowd.' (सक्रिय शारीरिक क्रिया). सही शब्द चुनें:",
    opts: [
      "calm",
      "calmness",
      "calmer",
      "calmly (deliberate action takes an adverb)"
    ],
    ans: 3,
    expl: "जब 'look' सक्रिय रूप से देखने की क्रिया (deliberate physical action) हो, तो Adverb (calmly) आता है।"
  },
  {
    id: 12,
    sub: '3b',
    q: "'He looked ___ despite the immense pressure.' (He had a calm expression/state). Choose the correct word:",
    hi: "'He looked ___ despite the immense pressure.' (शांत दिख रहा था - Link Verb). सही शब्द चुनें:",
    opts: [
      "calmly",
      "calmness",
      "calm (link verb takes an adjective complement)",
      "calmingly"
    ],
    ans: 2,
    expl: "जब 'look' का अर्थ 'दिखना/प्रतीत होना' (link verb) हो, तो Adjective 'calm' आता है।"
  },

  // Pair 4A: Meaning Shifts & Early/Late/Poor
  {
    id: 13,
    sub: '4a',
    q: "What does 'a small farmer' mean in contrast to 'The farmer is small'?",
    hi: "'a small farmer' और 'The farmer is small' में क्या अंतर है?",
    opts: [
      "Both mean the farmer is poor",
      "A small farmer is young",
      "'A small farmer' has a small farm; 'The farmer is small' is physically short in stature",
      "No difference in meaning"
    ],
    ans: 2,
    expl: "'a small farmer' का अर्थ है छोटे खेत वाला किसान; 'The farmer is small' का अर्थ है वह शारीरिक रूप से नाटा/छोटा है।"
  },
  {
    id: 14,
    sub: '4a',
    q: "In 'We must hurry to catch the early train', what does 'an early train' mean?",
    hi: "'an early train' का यहाँ क्या अर्थ है?",
    opts: [
      "A bullet train",
      "A train running before its scheduled time",
      "A broken train",
      "A train scheduled to run early in the morning/day"
    ],
    ans: 3,
    expl: "'an early/late train' समय सारिणी के अनुसार दिन के शुरुआती या देर रात चलने वाली ट्रेन को कहते हैं।"
  },

  // Pair 4B: Attributive-only vs Predicative-only & 'And'
  {
    id: 15,
    sub: '4b',
    q: "Why is 'an afraid child' grammatically incorrect?",
    hi: "'an afraid child' व्याकरण की दृष्टि से अशुद्ध क्यों है?",
    opts: [
      "'Afraid' is a predicative-only adjective (The child is afraid; use 'a frightened child')",
      "Because children cannot be afraid",
      "Because afraid is an adverb",
      "Because afraid is a verb"
    ],
    ans: 0,
    expl: "'Afraid' केवल क्रिया के बाद predicatively आता है (The child is afraid)। संज्ञा के पहले 'a frightened child' कहना चाहिए।"
  },
  {
    id: 16,
    sub: '4b',
    q: "Which group of adjectives can ONLY be used attributively before a noun?",
    hi: "कौन से विशेषण केवल संज्ञा से पहले attributively ही प्रयुक्त होते हैं?",
    opts: [
      "afraid, asleep, alone, alive",
      "cold, wet, windy",
      "chief, main, principal, sheer, utter",
      "happy, rich, poor"
    ],
    ans: 2,
    expl: "Chief, main, principal, sheer, utter हमेशा संज्ञा से पहले आते हैं (the main reason, sheer luck)।"
  },

  // Pair 5A: OSASCOMP Standard Order & Personality
  {
    id: 17,
    sub: '5a',
    q: "What is the correct order of adjectives in: 'She bought a ___ knife.'?",
    hi: "'She bought a ___ knife.' विशेषणों का सही क्रम चुनें:",
    opts: [
      "sharp long",
      "sharpening long",
      "long and sharp",
      "long sharp (Size + General Description)"
    ],
    ans: 3,
    expl: "नियम के अनुसार Size (आकार: long) पहले और General Description (गुण: sharp) उसके बाद आता है।"
  },
  {
    id: 18,
    sub: '5a',
    q: "Choose the correct order: 'We saw an ___ dog in the garden.'",
    hi: "सही क्रम चुनें: 'We saw an ___ dog in the garden.'",
    opts: [
      "brown inquisitive",
      "brown and inquisitive",
      "inquisitive brown (Personality + Colour)",
      "inquisitively brown"
    ],
    ans: 2,
    expl: "Personality/Emotion (inquisitive) रंग (Colour: brown) से पहले आता है: 'an inquisitive brown dog'।"
  },

  // Pair 5B: Little/Old/Young & Pretty Adverb
  {
    id: 19,
    sub: '5b',
    q: "Which adjective combination is grammatically POSSIBLE in English?",
    hi: "अंग्रेज़ी में कौन सा संयोजन व्याकरण के अनुसार संभव (POSSIBLE) है?",
    opts: [
      "a little young man",
      "a little young lady",
      "a young little boy",
      "a little old lady (little + old + noun is valid)"
    ],
    ans: 3,
    expl: "'little + old + noun' संभव है (a little old lady ✓); परंतु 'little + young' कभी संभव नहीं होता!"
  },
  {
    id: 20,
    sub: '5b',
    q: "In 'She is a pretty tall girl' (with NO comma between pretty and tall), what is the function of 'pretty'?",
    hi: "'She is a pretty tall girl' (बिना कॉमा के) में 'pretty' का क्या कार्य है?",
    opts: [
      "It is an adverb of degree meaning 'quite / very' (काफी लंबी)",
      "It is an adjective meaning beautiful",
      "It is a noun",
      "It is a preposition"
    ],
    ans: 0,
    expl: "जब 'pretty' के बाद बिना कॉमा के कोई अन्य विशेषण आता है, तो वह Adverb of Degree बन जाता है जिसका अर्थ 'quite/very' होता है।"
  }
];

export const TEST_QUESTIONS: TestQuestion[] = [
  // UNIT 1: Kinds & Participles
  {
    id: 1,
    unit: 'kinds',
    label: 'Unit 01: Kinds of Adjectives',
    q: "Which kind of adjective are 'this', 'that', 'these', and 'those'?",
    hi: "'this', 'that', 'these' और 'those' किस प्रकार के विशेषण हैं?",
    opts: [
      "Possessive Adjectives",
      "Quantitative Adjectives",
      "Demonstrative Adjectives (संकेतवाचक)",
      "Distributive Adjectives"
    ],
    ans: 2,
    expl: "This, that, these, those किसी वस्तु या व्यक्ति की ओर प्रत्यक्ष संकेत करते हैं, इसलिए इन्हें Demonstrative विशेषण कहते हैं।"
  },
  {
    id: 2,
    unit: 'kinds',
    label: 'Unit 01: Participles',
    q: "In 'The play was boring', what does the present participle (-ing) adjective signify?",
    hi: "'The play was boring' में present participle (-ing) का क्या अर्थ है?",
    opts: [
      "It is an adverb of manner",
      "It means the audience felt bored",
      "It is passive and describes the reaction",
      "It is active and signifies having the effect of producing boredom"
    ],
    ans: 3,
    expl: "Present participle (-ing) विशेषण Active (सक्रिय) होता है और इसका अर्थ 'having this effect' होता है।"
  },
  {
    id: 3,
    unit: 'kinds',
    label: 'Unit 01: Participles',
    q: "Fill in the blank: 'The workers worked for ten hours without a break; they were soon ___.'",
    hi: "'The workers worked for ten hours without a break; they were soon ___.' सही शब्द चुनें:",
    opts: [
      "tiredly",
      "tiresome",
      "tired (experiencing exhaustion - passive state)",
      "tiring"
    ],
    ans: 2,
    expl: "मज़दूरों ने थकावट महसूस की (passive state), इसलिए Past Participle 'tired' आएगा।"
  },
  {
    id: 4,
    unit: 'kinds',
    label: 'Unit 01: Participles',
    q: "What is the difference between 'an infuriating woman' and 'an infuriated woman'?",
    hi: "'an infuriating woman' और 'an infuriated woman' में क्या अंतर है?",
    opts: [
      "'Infuriating' means she causes fury in others; 'infuriated' means she is affected by fury",
      "Both mean the woman is angry",
      "There is no difference in modern English",
      "'Infuriating' is a noun"
    ],
    ans: 0,
    expl: "Infuriating महिला दूसरों को क्रोधित करती है; जबकि Infuriated महिला स्वयं किसी बात से बहुत गुस्से में है।"
  },
  {
    id: 5,
    unit: 'kinds',
    label: 'Unit 01: Kinds',
    q: "In 'Whose dog is barking outside?', what kind of adjective is 'Whose'?",
    hi: "'Whose dog is barking outside?' में 'Whose' किस प्रकार का विशेषण है?",
    opts: [
      "Demonstrative Adjective",
      "Adjective of Quality",
      "Distributive Adjective",
      "Interrogative Adjective (प्रश्नवाचक)"
    ],
    ans: 3,
    expl: "Which, what, whose जब संज्ञा के साथ आकर प्रश्न पूछने का काम करते हैं, तो इन्हें Interrogative Adjectives कहते हैं।"
  },
  {
    id: 6,
    unit: 'kinds',
    label: 'Unit 01: Quality',
    q: "Which of the following contains an Adjective of Quality?",
    hi: "किस विकल्प में गुणवाचक विशेषण (Adjective of Quality) का प्रयोग हुआ है?",
    opts: [
      "I want that pen.",
      "Whose bag is this?",
      "She bought a golden ring (material/quality).",
      "Each child got a toy."
    ],
    ans: 2,
    expl: "'Golden' अंगूठी के गुण/सामग्री को व्यक्त करता है, जो Adjective of Quality है।"
  },

  // UNIT 2: Agreement & Prepositions
  {
    id: 7,
    unit: 'agreement',
    label: 'Unit 02: Agreement',
    q: "How does the English adjective 'good' change when modifying plural nouns (e.g. good boys)?",
    hi: "बहुवचन संज्ञाओं की विशेषता बताते समय अंग्रेज़ी विशेषण 'good' में क्या बदलाव आता है?",
    opts: [
      "It adds an '-s' (goods boys)",
      "It takes an apostrophe",
      "It remains unchanged: good boys (adjectives in English never pluralize)",
      "It changes vowel sound"
    ],
    ans: 2,
    expl: "अंग्रेज़ी में विशेषण एकवचन/बहुवचन या स्त्रीलिंग/पुल्लिंग के लिए अपना रूप कभी नहीं बदलते।"
  },
  {
    id: 8,
    unit: 'agreement',
    label: 'Unit 02: Exceptions',
    q: "Which are the ONLY adjectives in English that change their form before plural nouns?",
    hi: "अंग्रेज़ी में वे एकमात्र विशेषण कौन से हैं जो बहुवचन संज्ञा के पहले अपना रूप बदलते हैं?",
    opts: [
      "Possessive adjectives",
      "Adjectives of quality",
      "Distributive adjectives",
      "Demonstrative adjectives 'this' and 'that' (to 'these' and 'those')"
    ],
    ans: 3,
    expl: "केवल Demonstratives 'this' और 'that' बहुवचन में 'these' और 'those' बनते हैं।"
  },
  {
    id: 9,
    unit: 'agreement',
    label: 'Unit 02: Prepositions',
    q: "'She has always been very good ___ mathematics.' Choose the correct preposition:",
    hi: "'She has always been very good ___ mathematics.' सही preposition चुनें:",
    opts: [
      "at (good at a subject/skill)",
      "in",
      "for",
      "with"
    ],
    ans: 0,
    expl: "किसी विषय या खेल में निपुण होने के लिए 'good at' का प्रयोग होता है।"
  },
  {
    id: 10,
    unit: 'agreement',
    label: 'Unit 02: Prepositions',
    q: "'I am thoroughly tired ___ hearing your excuses every single day.' Choose the preposition:",
    hi: "'tired' (ऊब जाना) के साथ सही preposition क्या है?",
    opts: [
      "from",
      "with",
      "of (tired of - ऊब/तंग आ जाना)",
      "by"
    ],
    ans: 2,
    expl: "किसी बात से ऊब या तंग आ जाने के लिए 'tired of' का प्रयोग किया जाता है।"
  },
  {
    id: 11,
    unit: 'agreement',
    label: 'Unit 02: Prepositions',
    q: "'The young child is afraid ___ stray dogs.' Choose the correct preposition:",
    hi: "'afraid' के साथ सही preposition क्या है?",
    opts: [
      "to",
      "from",
      "with",
      "of (afraid of - भयभीत होना)"
    ],
    ans: 3,
    expl: "'Afraid' के साथ हमेशा 'of' preposition आता है।"
  },
  {
    id: 12,
    unit: 'agreement',
    label: 'Unit 02: Prepositions',
    q: "'My grandfather is very fond ___ gardening.' What preposition follows 'fond'?",
    hi: "'fond' के बाद कौन सा preposition आता है?",
    opts: [
      "for",
      "about",
      "of (fond of - शौकीन होना)",
      "in"
    ],
    ans: 2,
    expl: "शौकीन होने के लिए 'fond of' का प्रयोग किया जाता है।"
  },

  // UNIT 3: Position & Link Verbs
  {
    id: 13,
    unit: 'position',
    label: 'Unit 03: Position',
    q: "In 'a rich man', 'rich' is used ___, whereas in 'Tom became rich', 'rich' is used ___:",
    hi: "'a rich man' में 'rich' का प्रयोग ___ है, जबकि 'Tom became rich' में ___ है:",
    opts: [
      "as an adverb; as a noun",
      "predicatively; attributively",
      "comparatively; superlatively",
      "attributively; predicatively"
    ],
    ans: 3,
    expl: "संज्ञा से पहले Attributive होता है; लिंकिंग क्रिया के बाद Predicative होता है।"
  },
  {
    id: 14,
    unit: 'position',
    label: 'Unit 03: Link Verbs',
    q: "'He looked ___ at the angry crowd.' (deliberate physical action). Choose the correct word:",
    hi: "'He looked ___ at the angry crowd.' (सक्रिय क्रिया). सही शब्द चुनें:",
    opts: [
      "calm",
      "calmness",
      "calmly (action verb takes an adverb of manner)",
      "calmer"
    ],
    ans: 2,
    expl: "जब 'look' का अर्थ जानबूझकर देखना (deliberate action) हो, तो Adverb (calmly) लेता है।"
  },
  {
    id: 15,
    unit: 'position',
    label: 'Unit 03: Link Verbs',
    q: "'He looked ___ despite the chaos around him.' (He had a calm expression / state). Choose the correct word:",
    hi: "'He looked ___ despite the chaos around him.' (शांत दिख रहा था - Link verb). सही शब्द चुनें:",
    opts: [
      "calm (link verb takes an adjective complement)",
      "calmly",
      "calmness",
      "calmingly"
    ],
    ans: 0,
    expl: "जब 'look' का अर्थ 'दिखना' (link verb) हो, तो Adjective (calm) आता है।"
  },
  {
    id: 16,
    unit: 'position',
    label: 'Unit 03: Link Verbs',
    q: "'When she heard the tragic news, she turned ___.' (She became pale). Choose the correct word:",
    hi: "'When she heard the tragic news, she turned ___.' सही शब्द चुनें:",
    opts: [
      "paled",
      "palely",
      "pale (turn = become, taking an adjective)",
      "paleness"
    ],
    ans: 2,
    expl: "यहाँ 'turn' का अर्थ 'become' (हो जाना) है, जो Link Verb है। इसलिए Adjective 'pale' आएगा।"
  },
  {
    id: 17,
    unit: 'position',
    label: 'Unit 03: Link Verbs',
    q: "'The detective tasted the mysterious liquid ___.' (deliberate sampling action). Choose the correct word:",
    hi: "'The detective tasted the mysterious liquid ___.' (सक्रिय चखना). सही शब्द:",
    opts: [
      "suspicious",
      "suspicion",
      "suspiciousness",
      "suspiciously (deliberate action takes adverb)"
    ],
    ans: 3,
    expl: "सक्रिय रूप से चखने की क्रिया (action of sampling) के लिए Adverb 'suspiciously' लगेगा।"
  },
  {
    id: 18,
    unit: 'position',
    label: 'Unit 03: Link Verbs',
    q: "'The freshly baked bread smells ___.' Choose the correct word:",
    hi: "'The freshly baked bread smells ___.' सही शब्द चुनें:",
    opts: [
      "delicacy",
      "deliciously",
      "delicious (smell as link verb takes adjective)",
      "delight"
    ],
    ans: 2,
    expl: "'smell' यहाँ Link Verb है, इसलिए Adjective 'delicious' लगेगा।"
  },

  // UNIT 4: Meaning Shifts & Position Traps
  {
    id: 19,
    unit: 'traps',
    label: 'Unit 04: Meaning Shifts',
    q: "What is the difference between 'a small farmer' and 'The farmer is small'?",
    hi: "'a small farmer' और 'The farmer is small' के अर्थ में क्या अंतर है?",
    opts: [
      "Both mean the farmer is poor",
      "A small farmer is a child",
      "'A small farmer' has a small farm; 'The farmer is small' means he is physically short in stature",
      "There is no difference in meaning"
    ],
    ans: 2,
    expl: "'a small farmer' = छोटे खेत वाला किसान; 'The farmer is small' = शारीरिक कद में छोटा व्यक्ति।"
  },
  {
    id: 20,
    unit: 'traps',
    label: 'Unit 04: Meaning Shifts',
    q: "What does 'an old friend' mean compared to 'The friend is old'?",
    hi: "'an old friend' और 'The friend is old' में क्या अंतर है?",
    opts: [
      "Both mean the friend is elderly",
      "An old friend means former friend",
      "Both mean childhood classmates",
      "'An old friend' means a friendship of long standing; 'The friend is old' refers to advanced biological age"
    ],
    ans: 3,
    expl: "'an old friend' = पुराना मित्र; 'The friend is old' = उम्र में वृद्ध।"
  },
  {
    id: 21,
    unit: 'traps',
    label: 'Unit 04: Predicative Only',
    q: "Which of the following adjectives can NEVER be used attributively before a noun (e.g. an ___ child ✗)?",
    hi: "इनमें से कौन सा विशेषण कभी भी संज्ञा से पहले attributively प्रयोग नहीं हो सकता?",
    opts: [
      "afraid (predicative-only: The child is afraid)",
      "frightened",
      "fearful",
      "scared"
    ],
    ans: 0,
    expl: "'Afraid' केवल क्रिया के बाद predicatively आता है (The child is afraid ✓; an afraid child ✗)।"
  },
  {
    id: 22,
    unit: 'traps',
    label: 'Unit 04: Attributive Only',
    q: "Which group of adjectives must ALWAYS precede their nouns (attributive only)?",
    hi: "कौन से विशेषण हमेशा अपनी संज्ञा से पहले ही आते हैं (केवल attributive)?",
    opts: [
      "afraid, asleep, alone, alive",
      "cold, wet, windy, dry",
      "chief, main, principal, sheer, utter",
      "rich, poor, happy, sad"
    ],
    ans: 2,
    expl: "Chief, main, principal, sheer, utter हमेशा संज्ञा से पहले आते हैं।"
  },
  {
    id: 23,
    unit: 'traps',
    label: 'Unit 04: Nuances',
    q: "'We caught an early train.' What does 'an early train' mean here?",
    hi: "'We caught an early train.' यहाँ 'an early train' का क्या अर्थ है?",
    opts: [
      "A train running before its scheduled time",
      "A very fast bullet train",
      "A broken train",
      "A train scheduled to run early in the morning/day (सुबह के समय की ट्रेन)"
    ],
    ans: 3,
    expl: "'an early/late train' समय सारिणी के अनुसार दिन के शुरुआती या देर रात चलने वाली ट्रेन को कहते हैं।"
  },
  {
    id: 24,
    unit: 'traps',
    label: 'Unit 04: Use of And',
    q: "With attributive adjectives, 'and' is used chiefly when there are two or more adjectives of:",
    hi: "संज्ञा से ठीक पहले (attributive) 'and' का प्रयोग मुख्य रूप से किन विशेषणों के बीच होता है?",
    opts: [
      "Size",
      "Colour (e.g. a red, white and blue flag)",
      "Material",
      "Age"
    ],
    ans: 1,
    expl: "Attributive स्थिति में 'and' मुख्य रूप से रंगों के विशेषणों के बीच लगता है।"
  },

  // UNIT 5: Order of Adjectives
  {
    id: 25,
    unit: 'order',
    label: 'Unit 05: Order',
    q: "What is the correct order of adjectives in: 'She bought a ___ knife.'?",
    hi: "'She bought a ___ knife.' विशेषणों का सही क्रम चुनें:",
    opts: [
      "sharp long",
      "sharpening long",
      "long sharp (Size + Description)",
      "long and sharp"
    ],
    ans: 2,
    expl: "Size (long) पहले आता है और General Description (sharp) उसके बाद आता है।"
  },
  {
    id: 26,
    unit: 'order',
    label: 'Unit 05: Order',
    q: "Choose the correct order: 'They installed ___ curtains in the hall.'",
    hi: "सही क्रम चुनें: 'They installed ___ curtains in the hall.'",
    opts: [
      "velvet blue",
      "blue and velvet",
      "velvety blue",
      "blue velvet (Colour + Material)"
    ],
    ans: 3,
    expl: "Colour (blue) पदार्थ (Material: velvet) से पहले आता है।"
  },
  {
    id: 27,
    unit: 'order',
    label: 'Unit 05: Personality',
    q: "Where do adjectives of personality or emotion (e.g. suspicious, patient) stand relative to physical description and colour?",
    hi: "व्यक्तित्व या स्वभाव के विशेषण शारीरिक रूप-रंग और रंगों के संदर्भ में कहाँ आते हैं?",
    opts: [
      "At the very end after the noun",
      "Before size and shape",
      "After physical description (small, pale) but before colours",
      "Always joined by 'and'"
    ],
    ans: 2,
    expl: "Personality/emotion के विशेषण शारीरिक विवरण के बाद, लेकिन रंगों के पहले आते हैं।"
  },
  {
    id: 28,
    unit: 'order',
    label: 'Unit 05: Little Old Young',
    q: "Which combination is grammatically POSSIBLE in English?",
    hi: "अंग्रेज़ी में कौन सा संयोजन व्याकरण के अनुसार संभव (POSSIBLE) है?",
    opts: [
      "a little old lady (little + old + noun is valid)",
      "a little young lady",
      "a little young boy",
      "a young little girl"
    ],
    ans: 0,
    expl: "'little + old + noun' संभव है (a little old lady ✓); परंतु 'little + young' कभी संभव नहीं होता!"
  },
  {
    id: 29,
    unit: 'order',
    label: 'Unit 05: Order',
    q: "Choose the correct phrase describing the clock:",
    hi: "घड़ी का वर्णन करने वाला सही क्रम चुनें:",
    opts: [
      "a French elegant clock",
      "a clock elegant French",
      "an elegant French clock (Description + Origin)",
      "an elegantly French clock"
    ],
    ans: 2,
    expl: "General description / Opinion (elegant) उत्पत्ति/देश (Origin: French) से पहले आता है।"
  },
  {
    id: 30,
    unit: 'order',
    label: 'Unit 05: Pretty Adverb',
    q: "In 'She's a pretty tall girl' (with NO comma between pretty and tall), what does 'pretty' mean?",
    hi: "'She's a pretty tall girl' (बिना कॉमा के) में 'pretty' का क्या अर्थ है?",
    opts: [
      "It is an adjective meaning attractive",
      "It means physically small",
      "It means kind-hearted",
      "It is an adverb of degree meaning 'quite / very tall' (काफी लंबी)"
    ],
    ans: 3,
    expl: "जब 'pretty' के बाद बिना कॉमा के कोई अन्य विशेषण आता है, तो वह Adverb of Degree बन जाता है जिसका अर्थ 'quite/very' होता है।"
  }
];

export const SUB_PAIRS = [
  { id: 'pair-1a', title: '1A. Six Kinds of Adjectives (विशेषण के 6 भेद)', start: 0 },
  { id: 'pair-1b', title: '1B. Participles (-ing vs -ed) (सक्रिय बनाम निष्क्रिय)', start: 2 },
  { id: 'pair-2a', title: '2A. Agreement & Demonstratives (अपरिवर्तनशीलता)', start: 4 },
  { id: 'pair-2b', title: '2B. Fixed Prepositions (निश्चित Prepositions)', start: 6 },
  { id: 'pair-3a', title: '3A. Attributive vs Predicative (स्थिति के भेद)', start: 8 },
  { id: 'pair-3b', title: '3B. Link Verbs vs Action Verbs (Adjective vs Adverb का जाल)', start: 10 },
  { id: 'pair-4a', title: '4A. Meaning Shifts & Early/Late/Poor (अर्थ में बदलाव)', start: 12 },
  { id: 'pair-4b', title: '4B. Attributive-Only & Predicative-Only (विशेषणों की बाध्यता)', start: 14 },
  { id: 'pair-5a', title: '5A. OSASCOMP Standard Order (क्रम का नियम)', start: 16 },
  { id: 'pair-5b', title: '5B. Little/Old/Young & Pretty Adverb (विशेष संयोजन)', start: 18 }
];
