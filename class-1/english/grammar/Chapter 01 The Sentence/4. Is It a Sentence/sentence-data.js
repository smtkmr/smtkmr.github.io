// Lesson Data for "Is It a Sentence?" (Class 1 English Grammar)

export const characters = [
  {
    name: "Rohan",
    role: "रोहन (जिज्ञासु छात्र)",
    avatar: "🧒",
    desc: "Class 1 explorer who loves discovering words in nature and testing them.",
    badge: "Word Explorer"
  },
  {
    name: "Tara",
    role: "तारा (वाक्य जासूस बहन)",
    avatar: "👧",
    desc: "Rohan's elder sister who carries a checklist to see if words make complete sense.",
    badge: "Sentence Detective"
  },
  {
    name: "Froggy",
    role: "हरा मेंढक (उछलकूद करने वाला)",
    avatar: "🐸",
    desc: "Lives near the pond and loves hopping from rock to rock into the cool water.",
    badge: "Action Jumper"
  },
  {
    name: "Professor Pip",
    role: "पिप (बुद्धिमान बगीचा पक्षी)",
    avatar: "🦉",
    desc: "A wise feathered guide who checks Capital letters and Full stops.",
    badge: "Rule Keeper"
  }
];

export const warmupItems = [
  {
    id: 1,
    badge: "Check 01 · Complete",
    text: "A frog jumps.",
    pron: "अ फ़्रॉग जम्प्स।",
    mean: "एक मेंढक कूदता है।",
    status: "✅ Yes, it is a sentence!",
    statusHi: "हाँ, यह पूरा वाक्य है (कौन + क्या किया)।",
    isSentence: true
  },
  {
    id: 2,
    badge: "Check 02 · Incomplete",
    text: "in the pond",
    pron: "इन द पॉन्ड।",
    mean: "तालाब में।",
    status: "❌ Not a sentence!",
    statusHi: "यह अधूरा है—न कोई नाम है, न कोई काम!",
    isSentence: false
  },
  {
    id: 3,
    badge: "Check 03 · Complete",
    text: "Tara spots a bird.",
    pron: "तारा स्पॉट्स अ बर्ड।",
    mean: "तारा एक चिड़िया देखती है।",
    status: "✅ Yes, it is a sentence!",
    statusHi: "हाँ, पूरा अर्थ और फुल स्टॉप दोनों हैं।",
    isSentence: true
  }
];

export const machineItems = [
  {
    text: "A big frog jumps off a rock.",
    isSentence: true,
    verdict: "✅ COMPLETE SENTENCE! / पूरा वाक्य है!",
    reason: "Starts with Capital 'A', has who (A big frog) + action (jumps off a rock), and ends with Full Stop (.).",
    reasonHi: "बड़ा अक्षर 'A' है, कर्ता और क्रिया दोनों हैं, और अंत में पूर्ण विराम (.) है।",
    pron: "अ बिग फ़्रॉग जम्प्स ऑफ़ अ रॉक।",
    mean: "एक बड़ा मेंढक चट्टान से कूदता है।"
  },
  {
    text: "jumps off a rock",
    isSentence: false,
    verdict: "❌ NOT A SENTENCE! / वाक्य नहीं है!",
    reason: "Missing Naming Part! Who jumps off a rock? We do not know!",
    reasonHi: "नेमिंग पार्ट गायब है! कौन कूदा? यह नहीं बताया गया।",
    pron: "जम्प्स ऑफ़ अ रॉक।",
    mean: "चट्टान से कूदता है (कौन कूदा? पता नहीं)।"
  },
  {
    text: "A big green frog",
    isSentence: false,
    verdict: "❌ NOT A SENTENCE! / वाक्य नहीं है!",
    reason: "Missing Action Part! What did the big green frog do? There is no action verb.",
    reasonHi: "ऐक्शन पार्ट गायब है! मेंढक ने क्या किया? कोई काम नहीं बताया।",
    pron: "अ बिग ग्रीन फ़्रॉग।",
    mean: "एक बड़ा हरा मेंढक (उसने क्या किया? कुछ नहीं बताया)।"
  },
  {
    text: "The sun is warm.",
    isSentence: true,
    verdict: "✅ COMPLETE SENTENCE! / पूरा वाक्य है!",
    reason: "Makes complete sense, starts with Capital 'T', and ends with a Full Stop (.).",
    reasonHi: "पूरा अर्थ देता है, 'T' बड़ा है और अंत में फुल स्टॉप है।",
    pron: "द सन इज़ वॉर्म।",
    mean: "सूरज गर्म है।"
  },
  {
    text: "the sun is warm",
    isSentence: false,
    verdict: "❌ NOT A SENTENCE! (Punctuation Error) / विराम चिन्ह की गलती!",
    reason: "Missing Capital letter at the start ('t' should be 'T') and missing Full Stop at the end!",
    reasonHi: "शुरुआत में बड़ा 'T' नहीं है और अंत में Full Stop (.) गायब है।",
    pron: "द सन इज़ वॉर्म।",
    mean: "सूरज गर्म है (नियम: बड़ा अक्षर और फुल स्टॉप होना चाहिए)।"
  },
  {
    text: "Rohan reads a story.",
    isSentence: true,
    verdict: "✅ COMPLETE SENTENCE! / पूरा वाक्य है!",
    reason: "Naming part (Rohan) + Action part (reads a story) + Capital 'R' + Full Stop (.).",
    reasonHi: "रोहन (नाम) + किताब पढ़ता है (काम) + बड़ा 'R' + फुल स्टॉप।",
    pron: "रोहन रीड्स अ स्टोरी।",
    mean: "रोहन एक कहानी पढ़ता है।"
  },
  {
    text: "in the green garden",
    isSentence: false,
    verdict: "❌ NOT A SENTENCE! / वाक्य नहीं है!",
    reason: "Only a phrase! Who is in the garden? What is happening? No complete thought.",
    reasonHi: "केवल एक अधूरा टुकड़ा है। कौन बगीचे में है? कुछ पता नहीं।",
    pron: "इन द ग्रीन गार्डन।",
    mean: "हरे बगीचे में।"
  },
  {
    text: "Fish swim in the pond.",
    isSentence: true,
    verdict: "✅ COMPLETE SENTENCE! / पूरा वाक्य है!",
    reason: "Tells who (Fish) and what they do (swim in the pond) with Capital 'F' and Full Stop (.).",
    reasonHi: "मछलियाँ तालाब में तैरती हैं - पूरा और सही वाक्य।",
    pron: "फ़िश स्विम इन द पॉन्ड।",
    mean: "मछलियाँ तालाब में तैरती हैं।"
  },
  {
    text: "splashes in cool water",
    isSentence: false,
    verdict: "❌ NOT A SENTENCE! / वाक्य नहीं है!",
    reason: "No naming part! Who splashes in cool water?",
    reasonHi: "नेमिंग पार्ट गायब है! ठंडे पानी में कौन छपछपाया?",
    pron: "स्प्लैशिस इन कूल वॉटर।",
    mean: "ठंडे पानी में छपछपाता है।"
  },
  {
    text: "We protect our nature.",
    isSentence: true,
    verdict: "✅ COMPLETE SENTENCE! / पूरा वाक्य है!",
    reason: "Clear naming subject (We), action (protect our nature), Capital 'W', and Full Stop (.).",
    reasonHi: "हम अपनी प्रकृति की रक्षा करते हैं - सम्पूर्ण और सार्थक वाक्य।",
    pron: "वी प्रोटेक्ट आर नेचर।",
    mean: "हम अपनी प्रकृति की रक्षा करते हैं।"
  }
];

export const scenes = [
  {
    id: "scene-1",
    num: "01",
    title: "At the Pond: Finding Complete Ideas",
    titleHi: "तालाब के किनारे · पूरे विचार की पहचान",
    emoji: "🐸 🪨 💧 🌿",
    aside: "Watch the frog and look at each group of words. Does it tell a complete idea?",
    lines: [
      {
        speaker: "Rohan 🧒",
        no: "01",
        en: "Look at the big grey rock!",
        pron: "लुक ऐट द बिग ग्रे रॉक!",
        mean: "उस बड़ी धूसर चट्टान को देखो!",
        type: "Sentence ✓ (Complete command / पूरा वाक्य)"
      },
      {
        speaker: "Tara 👧",
        no: "02",
        en: "A green frog sits on the rock.",
        pron: "अ ग्रीन फ़्रॉग सिट्स ऑन द रॉक।",
        mean: "एक हरा मेंढक चट्टान पर बैठता है।",
        type: "Sentence ✓ (Who + Action + Full stop)"
      },
      {
        speaker: "Rohan 🧒",
        no: "03",
        en: "The frog jumps into the water.",
        pron: "द फ़्रॉग जम्प्स इन्टू द वॉटर।",
        mean: "मेंढक पानी में कूदता है।",
        type: "Sentence ✓ (Who + Action + Full stop)"
      },
      {
        speaker: "Tara 👧",
        no: "04",
        en: "Cool water splashes all around.",
        pron: "कूल वॉटर स्प्लैशिस ऑल अराउन्ड।",
        mean: "ठंडा पानी चारों ओर छपछपाता है।",
        type: "Sentence ✓ (Complete thought / पूरा विचार)"
      }
    ]
  },
  {
    id: "scene-2",
    num: "02",
    title: "Sentence Detective: Whole vs Piece",
    titleHi: "वाक्य जासूस · पूरा वाक्य बनाम अधूरा टुकड़ा",
    emoji: "🔍 📋 💡 🧐",
    aside: "Tara uses her detective magnifying glass. If a piece is missing, it is NOT a sentence!",
    lines: [
      {
        speaker: "Rohan 🧒",
        no: "05",
        en: "off the grey rock",
        pron: "ऑफ़ द ग्रे रॉक।",
        mean: "धूसर चट्टान से।",
        type: "❌ Not a sentence! (Missing who and action!)"
      },
      {
        speaker: "Tara 👧",
        no: "06",
        en: "Froggy jumps off the grey rock.",
        pron: "फ़्रॉगी जम्प्स ऑफ़ द ग्रे रॉक।",
        mean: "मेंढक धूसर चट्टान से कूदता है।",
        type: "Sentence ✓ (Now we know who and what happened!)"
      },
      {
        speaker: "Rohan 🧒",
        no: "07",
        en: "swims in the cool pond",
        pron: "स्विम्स इन द कूल पॉन्ड।",
        mean: "ठंडे तालाब में तैरता है।",
        type: "❌ Not a sentence! (Who swims? Naming part missing!)"
      },
      {
        speaker: "Tara 👧",
        no: "08",
        en: "The little duck swims in the cool pond.",
        pron: "द लिटिल डक स्विम्स इन द कूल पॉन्ड।",
        mean: "छोटी बत्तख ठंडे तालाब में तैरती है।",
        type: "Sentence ✓ (Complete and beautiful!)"
      }
    ]
  },
  {
    id: "scene-3",
    num: "03",
    title: "Capital Letter & Full Stop Clues",
    titleHi: "बड़ा अक्षर और पूर्ण विराम के नियम",
    emoji: "🔤 🛑 ✍️ 🦉",
    aside: "Professor Pip reminds us: A sentence wears a Capital hat at the front and a Full Stop shoe at the back!",
    lines: [
      {
        speaker: "Prof. Pip 🦉",
        no: "09",
        en: "Every sentence begins with a capital letter.",
        pron: "एवरी सेन्टेन्स बिगिन्स विथ अ कैपिटल लेटर।",
        mean: "हर वाक्य एक बड़े अक्षर (Capital Letter) से शुरू होता है।",
        type: "Rule 1 ✓ (A, B, C... at the start)"
      },
      {
        speaker: "Tara 👧",
        no: "10",
        en: "Every telling sentence ends with a full stop.",
        pron: "एवरी टेलिंग सेन्टेन्स एन्ड्स विथ अ फुल स्टॉप।",
        mean: "हर साधारण वाक्य के अंत में एक फुल स्टॉप (.) आता है।",
        type: "Rule 2 ✓ (The dot . at the end)"
      },
      {
        speaker: "Rohan 🧒",
        no: "11",
        en: "The bright sun warms the lily pad.",
        pron: "द ब्राइट सन वॉर्म्स द लिली पैड।",
        mean: "तेज सूरज कुमुदिनी के पत्ते को गर्म करता है।",
        type: "Sentence ✓ (Capital T + Full stop .)"
      },
      {
        speaker: "Prof. Pip 🦉",
        no: "12",
        en: "Now the sentence is complete and happy.",
        pron: "नाउ द सेन्टेन्स इज़ कम्प्लीट ऐण्ड हैप्पी।",
        mean: "अब यह वाक्य पूर्ण और सही है।",
        type: "Sentence ✓ (Perfect grammar!)"
      }
    ]
  },
  {
    id: "scene-4",
    num: "04",
    title: "Word Order: Walking in Step",
    titleHi: "शब्दों का सही क्रम · कदम से कदम",
    emoji: "🚶 🧩 🎯 ✨",
    aside: "Words cannot jump randomly. They must stand in the right order to make sense!",
    lines: [
      {
        speaker: "Rohan 🧒",
        no: "13",
        en: "jumps high frog the",
        pron: "जम्प्स हाई फ़्रॉग द।",
        mean: "कूदता ऊँचा मेंढक यह।",
        type: "❌ Jumbled! Does not make sense."
      },
      {
        speaker: "Tara 👧",
        no: "14",
        en: "The frog jumps high.",
        pron: "द फ़्रॉग जम्प्स हाई।",
        mean: "मेंढक ऊँचा कूदता है।",
        type: "Sentence ✓ (Words in correct order!)"
      },
      {
        speaker: "Rohan 🧒",
        no: "15",
        en: "Words must walk in the right order.",
        pron: "वर्ड्स मस्ट वॉक इन द राइट ऑर्डर।",
        mean: "शब्दों को सही क्रम में चलना चाहिए।",
        type: "Sentence ✓ (Meaning is crystal clear)"
      },
      {
        speaker: "Tara 👧",
        no: "16",
        en: "Together, words tell a complete story.",
        pron: "टुगेदर, वर्ड्स टेल अ कम्प्लीट स्टोरी।",
        mean: "साथ मिलकर शब्द एक पूरी बात बताते हैं।",
        type: "Sentence ✓ (Well done!)"
      }
    ]
  }
];

export const comparisonTable = [
  {
    phrase: "a green frog",
    phraseMean: "एक हरा मेंढक (काम गायब है)",
    sentence: "A green frog hops.",
    sentenceMean: "एक हरा मेंढक फुदकता है। (पूरा वाक्य)",
    why: "Sentence adds the action 'hops', starts with capital 'A', and ends with '.'"
  },
  {
    phrase: "in the deep pond",
    phraseMean: "गहरे तालाब में (कौन? क्या?)",
    sentence: "Fish swim in the deep pond.",
    sentenceMean: "मछलियाँ गहरे तालाब में तैरती हैं।",
    why: "Sentence tells WHO (Fish) does WHAT (swim in the pond)."
  },
  {
    phrase: "jumps off a rock",
    phraseMean: "चट्टान से कूदता है (कौन?)",
    sentence: "Froggy jumps off a rock.",
    sentenceMean: "मेंढक चट्टान से कूदता है।",
    why: "Sentence gives the naming subject 'Froggy'."
  },
  {
    phrase: "the warm sun",
    phraseMean: "गरम सूरज (क्या हुआ?)",
    sentence: "The warm sun shines bright.",
    sentenceMean: "गरम सूरज तेज़ी से चमकता है।",
    why: "Sentence tells the action 'shines bright' with full stop."
  },
  {
    phrase: "reads a book",
    phraseMean: "किताब पढ़ता है (किसने पढ़ी?)",
    sentence: "Tara reads a book.",
    sentenceMean: "तारा एक किताब पढ़ती है।",
    why: "Sentence names the person 'Tara' doing the action."
  },
  {
    phrase: "singing sweetly",
    phraseMean: "मीठा गाते हुए (कौन?)",
    sentence: "Birds are singing sweetly.",
    sentenceMean: "पक्षी मीठा गा रहे हैं।",
    why: "Sentence provides who (Birds) with proper capital and period."
  }
];

export const vocabularyWords = [
  {
    word: "sentence",
    pron: "सेन्टेन्स",
    mean: "वाक्य (सार्थक शब्दों का समूह)",
    example: "A sentence makes complete sense."
  },
  {
    word: "capital",
    pron: "कैपिटल",
    mean: "बड़ा अक्षर (जैसे A, B, C)",
    example: "Start with a capital letter."
  },
  {
    word: "full stop",
    pron: "फुल स्टॉप",
    mean: "पूर्ण विराम चिन्ह (.)",
    example: "Put a full stop at the end."
  },
  {
    word: "words",
    pron: "वर्ड्स",
    mean: "शब्द (अक्षरों से बने)",
    example: "Words make a sentence."
  },
  {
    word: "order",
    pron: "ऑर्डर",
    mean: "सही क्रम / व्यवस्था",
    example: "Put words in proper order."
  },
  {
    word: "sense",
    pron: "सेन्स",
    mean: "स्पष्ट और सही अर्थ",
    example: "A sentence must make sense."
  },
  {
    word: "complete",
    pron: "कम्प्लीट",
    mean: "पूरा / सम्पूर्ण",
    example: "It tells a complete thought."
  },
  {
    word: "jumps",
    pron: "जम्प्स",
    mean: "कूदता है या छलांग लगाता है",
    example: "A green frog jumps."
  },
  {
    word: "rock",
    pron: "रॉक",
    mean: "चट्टान या बड़ा पत्थर",
    example: "He sits on a grey rock."
  },
  {
    word: "pond",
    pron: "पॉन्ड",
    mean: "तालाब / छोटा जलाशय",
    example: "Ducks swim in the pond."
  },
  {
    word: "splashes",
    pron: "स्प्लैशिस",
    mean: "पानी में छपछपाता है",
    example: "Cool water splashes."
  },
  {
    word: "naming part",
    pron: "नेमिंग पार्ट",
    mean: "नाम बताने वाला भाग (Who/What)",
    example: "Froggy is the naming part."
  }
];
