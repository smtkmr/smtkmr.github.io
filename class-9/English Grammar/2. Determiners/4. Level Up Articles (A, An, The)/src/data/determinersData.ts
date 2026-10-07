export interface ConceptQuestion {
  id: number;
  sub: string;
  pairTitle: string;
  q: string;
  hi?: string;
  opts: string[];
  ans: number;
  expl: string;
}

export interface ExamQuestion {
  id: number;
  unit: string;
  label: string;
  q: string;
  hi?: string;
  opts: string[];
  ans: number;
  expl: string;
}

export interface TextbookExerciseItem {
  id: number;
  sentence: string;
  blankAnswer: string; // 'a' or 'an'
  ruleExplanationEn: string;
  ruleExplanationHi: string;
}

export const determinersIntro = {
  title: "Determiners (निर्धारक शब्द)",
  definitionEn: "Determiners are words which modify a noun or a noun phrase before which they are placed. They determine, limit, or specify the noun in a sentence.",
  definitionHi: "Determiners (निर्धारक) वे शब्द होते हैं जो किसी संज्ञा (Noun) या संज्ञा-वाक्यांश (Noun Phrase) से पहले आकर उसे सीमित, निर्धारित या विशिष्ट बनाते हैं।",
  examples: [
    { text: "This is an apple.", determiner: "an", noun: "apple", note: "Indefinite article before vowel sound" },
    { text: "He is a doctor.", determiner: "a", noun: "doctor", note: "Indefinite article before consonant sound" },
    { text: "There is some milk in the pot.", determiner: "some", noun: "milk", note: "Quantifier for uncountable noun" },
    { text: "We have many books.", determiner: "many", noun: "books", note: "Quantifier for plural countable noun" },
    { text: "He sold several fans.", determiner: "several", noun: "fans", note: "Indefinite numeral determiner" }
  ],
  mainDeterminersList: [
    "a", "an", "the", "some", "any", "little", "a little", "the little", "few", "a few", "the few",
    "much", "many", "each", "every", "none", "no / not any", "this", "that", "these", "those",
    "both", "all", "either", "neither", "various", "several", "such", "such a", "less", "fewer",
    "enough", "not enough", "lots of", "a lot of", "a great deal of", "a good deal of", "plenty of", "a large number of"
  ],
  articleDefinitionEn: "Determiners 'a', 'an' and 'the' are called Articles. An Article is a kind of Demonstrative Adjective that functions as a Determiner and mostly precedes Nouns.",
  articleDefinitionHi: "Determiners 'a', 'an' और 'the' को Articles (उपपद) कहा जाता है। Article वस्तुतः Demonstrative Adjective (संकेतवाचक विशेषण) का ही एक रूप है जो Noun से पहले आकर Determiner का कार्य करता है।"
};

export const rulesOfA = [
  {
    num: 1,
    ruleEn: "Before a singular countable noun beginning with a consonant sound",
    ruleHi: "व्यंजन ध्वनि (Consonant Sound: क, ख, ग, च, ट, त, प, य, र, ल, व...) से शुरू होने वाली एकवचन गणनीय संज्ञा से पहले",
    examples: ["a man", "a boy", "a book", "a university (starts with /juː/ 'य')", "a useful thing (starts with /juː/ 'य')"]
  },
  {
    num: 2,
    ruleEn: "Before a singular countable noun representing a whole class of things/places/animals",
    ruleHi: "किसी पूरी जाति या वर्ग का प्रतिनिधित्व करने वाली एकवचन संज्ञा से पहले",
    examples: ["a hut", "a book", "a city", "a cow (A cow is a useful animal = All cows)"]
  },
  {
    num: 3,
    ruleEn: "In the situation of Adjective + Noun structure",
    ruleHi: "विशेषण + संज्ञा (Adjective + Noun) की स्थिति में यदि विशेषण की पहली ध्वनि व्यंजन हो",
    examples: ["a big elephant", "a useful book", "a wise teacher", "a cruel king"]
  },
  {
    num: 4,
    ruleEn: "In the numerical sense of 'one'",
    ruleHi: "'एक' (one) के संख्यात्मक भाव में",
    examples: ["He did not say a word to me. (= single word)", "They will be back in a week. (= one week)"]
  },
  {
    num: 5,
    ruleEn: "To show exclamations before singular countable nouns after 'What'",
    ruleHi: "'What' के बाद विस्मयादिबोधक वाक्यों (Exclamations) में एकवचन संज्ञा से पहले",
    examples: ["What a beautiful picture!", "What a cold day!", "What a marvelous scene!"]
  },
  {
    num: 6,
    ruleEn: "In the sense of 'per' (rates, price, speed, frequency)",
    ruleHi: "दर (rate), मूल्य, गति और आवृत्ति में 'प्रति' (per) के अर्थ में",
    examples: ["two rupees a kilo", "sixty rupees a dozen", "ten rupees a meter", "sixty miles an hour", "twice a week"]
  },
  {
    num: 7,
    ruleEn: "Before Mr / Mrs / Miss + surname when the person is unfamiliar to the speaker",
    ruleHi: "Mr / Mrs / Miss + उपनाम से पहले जब वक्ता उस व्यक्ति को व्यक्तिगत रूप से नहीं जानता हो (कोई अपरिचित)",
    examples: ["a Mr Sharma (= कोई मिस्टर शर्मा)", "a Mrs Mathur", "a Miss Gupta"]
  }
];

export const rulesOfAn = [
  {
    num: 1,
    ruleEn: "Before a singular countable noun beginning with a vowel sound (अ, आ, इ, ई, उ, ऊ, ए, ऐ, ओ, औ)",
    ruleHi: "स्वर ध्वनि से शुरू होने वाली एकवचन गणनीय संज्ञा से पहले",
    examples: ["an elephant", "an orange", "an umbrella", "an apple", "an international game", "an American lady"]
  },
  {
    num: 2,
    ruleEn: "Before a word with a silent 'h' sound (where 'h' is not pronounced)",
    ruleHi: "मूक 'h' (Silent 'h') वाले शब्दों से पहले जहाँ उच्चारण स्वर से शुरू होता है",
    examples: ["an honest man (उच्चारण: 'ऑनेस्ट')", "an honourable man (उच्चारण: 'ऑनरेबल')", "an hour (उच्चारण: 'आवर')", "an heir (उच्चारण: 'एयर' = उत्तराधिकारी)"]
  },
  {
    num: 3,
    ruleEn: "Before abbreviations which begin with a consonant letter but produce a vowel sound",
    ruleHi: "व्यंजन वर्ण से शुरू होने वाले किंतु स्वर ध्वनि (ए, ऐ...) निकालने वाले संक्षिप्त रूपों (Abbreviations) से पहले",
    examples: ["an M.A. (/em/ 'एम')", "an M.Sc.", "an S.P. (/es/ 'एस')", "an S.D.M.", "an M.L.A.", "an F.I.R.", "an X-ray", "an L.L.B."]
  }
];

export const rulesOfThe = [
  {
    code: "(a)",
    titleEn: "Before the superlative degree of an adjective",
    titleHi: "विशेषण की Superlative Degree (सर्वोत्तम अवस्था) से पहले",
    examples: ["the best", "the richest", "the smallest", "the most intelligent", "the highest peak"]
  },
  {
    code: "(b)",
    titleEn: "Before nouns which indicate the whole community, class, or religious race",
    titleHi: "संपूर्ण जाति, वर्ग या धार्मिक समुदाय का बोध कराने वाली संज्ञाओं से पहले",
    examples: ["the Muslims", "the Hindus", "the Christians", "the Sikhs"]
  },
  {
    code: "(c)",
    titleEn: "Before the names of prominent newspapers",
    titleHi: "प्रसिद्ध समाचार पत्रों के नामों से पहले",
    examples: ["the Hindustan Times", "the Nav Bharat Times", "the Times of India", "the Indian Express"]
  },
  {
    code: "(d)",
    titleEn: "When two great persons are compared (Proper noun used as Common noun with 'the')",
    titleHi: "जब दो महान व्यक्तियों की तुलना की जाए (कालिदास भारत के शेक्सपियर हैं)",
    examples: [
      "Kalidas is the Shakespeare of India. (कालिदास भारत के शेक्सपियर हैं)",
      "Sumitranandan Pant is the Wordsworth of India. (सुमित्रानंदन पंत भारत के वर्ड्सवर्थ हैं)",
      "Ahmedabad is the Manchester of India."
    ]
  },
  {
    code: "(e)",
    titleEn: "Before the names of historical monuments, buildings and dynasties",
    titleHi: "ऐतिहासिक इमारतों, स्मारकों और प्रसिद्ध भवनों के नामों से पहले",
    examples: ["the Tajmahal", "the Red Fort", "the Qutub Minar", "the Golden Temple"]
  },
  {
    code: "(f)",
    titleEn: "Before the names of holy scriptures and religious books",
    titleHi: "पवित्र धार्मिक ग्रंथों और पुस्तकों के नामों से पहले",
    examples: ["the Geeta", "the Ramayan", "the Bible", "the Quran", "the Mahabharata"]
  },
  {
    code: "(g)",
    titleEn: "Before adjectives used as nouns representing a whole group of people",
    titleHi: "संज्ञा के रूप में प्रयुक्त विशेषणों से पहले जो पूरे वर्ग का बोध कराते हैं (बहुवचन क्रिया लेते हैं)",
    examples: [
      "the rich (= अमीर लोग)",
      "the brave (= बहादुर लोग)",
      "the weak (= कमजोर लोग)",
      "the poor (= गरीब लोग)"
    ]
  },
  {
    code: "(h)",
    titleEn: "Before the names of rivers, oceans, seas, deserts, mountain chains and gulfs",
    titleHi: "नदियों, महासागरों, सागरों, मरुस्थलों, पर्वत श्रृंखलाओं और खाड़ियों के नामों से पहले",
    examples: [
      "Rivers: the Ganga, the Yamuna, the Nile",
      "Oceans & Seas: the Indian ocean, the Arabian sea, the Pacific ocean",
      "Deserts: the Thar, the Sahara, the Kalahari",
      "Mountains: the Himalayas, the Aravalli Mountains, the Alps",
      "Gulfs & Bays: the Persian gulfs, the gulf of Mexico, the Bay of Bengal"
    ]
  },
  {
    code: "(i)",
    titleEn: "Before heavenly bodies and unique objects of nature",
    titleHi: "खगोलीय पिंडों और प्रकृति की अद्वितीय वस्तुओं से पहले",
    examples: ["the sun", "the moon", "the earth", "the sky", "the equator", "the universe"]
  }
];

export const textbookExercise1: TextbookExerciseItem[] = [
  { id: 1, sentence: "He was ______ wise teacher.", blankAnswer: "a", ruleExplanationEn: "'wise' begins with consonant sound /w/ ('व').", ruleExplanationHi: "'wise' का उच्चारण व्यंजन ध्वनि 'व' से होता है, अतः 'a' लगेगा।" },
  { id: 2, sentence: "It was ______ long way to the forest.", blankAnswer: "a", ruleExplanationEn: "'long' begins with consonant sound /l/ ('ल').", ruleExplanationHi: "'long' की पहली ध्वनि 'ल' (व्यंजन) है।" },
  { id: 3, sentence: "The meeting was held in ______ big hall.", blankAnswer: "a", ruleExplanationEn: "'big' begins with consonant sound /b/ ('ब').", ruleExplanationHi: "'big' का उच्चारण 'ब' व्यंजन ध्वनि से होता है।" },
  { id: 4, sentence: "______ burnt child dreads the fire.", blankAnswer: "A", ruleExplanationEn: "Proverb representing a class; 'burnt' begins with /b/ ('ब').", ruleExplanationHi: "कहावत: 'A burnt child dreads the fire' (दूध का जला छाछ भी फूँक-फूँक कर पीता है)।" },
  { id: 5, sentence: "She spent ______ few months in Mumbai last year.", blankAnswer: "a", ruleExplanationEn: "Idiomatic quantifier 'a few' means 'some' (positive quantity).", ruleExplanationHi: "'a few' एक मुहावरेदार प्रयोग है जिसका अर्थ 'कुछ महीने' होता है।" },
  { id: 6, sentence: "Would you like to take ______ little more tea?", blankAnswer: "a", ruleExplanationEn: "Polite invitation using 'a little' meaning 'some small quantity'.", ruleExplanationHi: "'a little' का अर्थ थोड़ी सी मात्रा में होता है।" },
  { id: 7, sentence: "Now cricket has become ______ international game.", blankAnswer: "an", ruleExplanationEn: "'international' begins with vowel sound /ɪ/ ('इ').", ruleExplanationHi: "'international' स्वर ध्वनि 'इ' से शुरू होता है, इसलिए 'an' लगेगा।" },
  { id: 8, sentence: "They will be back in ______ week.", blankAnswer: "a", ruleExplanationEn: "'week' begins with consonant sound /w/ ('व') and denotes 'one'.", ruleExplanationHi: "'week' व्यंजन ध्वनि 'व' से शुरू होता है और 'एक सप्ताह' का बोध कराता है।" },
  { id: 9, sentence: "I will finish this work within ______ hour.", blankAnswer: "an", ruleExplanationEn: "'hour' has silent 'h' and begins with vowel sound /aʊə/ ('आवर').", ruleExplanationHi: "'hour' में 'h' silent है और उच्चारण 'आवर' (स्वर) से होता है, अतः 'an' आएगा।" },
  { id: 10, sentence: "She is ______ American lady.", blankAnswer: "an", ruleExplanationEn: "'American' begins with vowel sound /ə/ ('अ').", ruleExplanationHi: "'American' स्वर ध्वनि 'अ' से शुरू होता है, अतः 'an' लगेगा।" }
];

export const textbookExercise2: TextbookExerciseItem[] = [
  { id: 1, sentence: "He is ______ honest man of our city.", blankAnswer: "an", ruleExplanationEn: "'honest' has silent 'h'; sound is /ˈɒn.ɪst/ ('ऑनेस्ट' - vowel sound).", ruleExplanationHi: "'honest' में 'h' silent है, उच्चारण 'ऑनेस्ट' स्वर से होता है।" },
  { id: 2, sentence: "Let us rest here for ______ while.", blankAnswer: "a", ruleExplanationEn: "Idiomatic phrase 'for a while' meaning 'for a short time'.", ruleExplanationHi: "'for a while' (थोड़ी देर के लिए) एक निश्चित मुहावरेदार वाक्यांश है।" },
  { id: 3, sentence: "Can you give ______ example of a cruel king?", blankAnswer: "an", ruleExplanationEn: "'example' begins with vowel sound /ɪɡ/ ('इ').", ruleExplanationHi: "'example' का पहला उच्चारण स्वर 'इ' से होता है।" },
  { id: 4, sentence: "We shall go for ______ walk now.", blankAnswer: "a", ruleExplanationEn: "Verb 'walk' used as singular countable noun in 'go for a walk'.", ruleExplanationHi: "'go for a walk' (टहलने जाना) में क्रिया संज्ञा की तरह 'a' लेती है।" },
  { id: 5, sentence: "She often tells ______ lie.", blankAnswer: "a", ruleExplanationEn: "Fixed English idiom 'tell a lie' (contrast with 'speak the truth').", ruleExplanationHi: "अंग्रेजी का स्थापित मुहावरा: 'tell a lie' (झूठ बोलना) और 'speak the truth' (सच बोलना)।" },
  { id: 6, sentence: "Certainly, it is ______ very interesting story.", blankAnswer: "a", ruleExplanationEn: "'very' begins with consonant sound /v/ ('व').", ruleExplanationHi: "विशेषण वाक्यांश की पहली ध्वनि 'very' ('व' व्यंजन) है।" },
  { id: 7, sentence: "My father is ______ M.L.A.", blankAnswer: "an", ruleExplanationEn: "'M' is pronounced as /em/ (vowel sound 'एम').", ruleExplanationHi: "'M.L.A.' में 'M' को अलग बोलने पर स्वर ध्वनि 'एम' निकलती है।" },
  { id: 8, sentence: "My friend's father is ______ U.D.C.", blankAnswer: "a", ruleExplanationEn: "'U.D.C.' (Upper Division Clerk) starts with consonant sound /juː/ ('यू').", ruleExplanationHi: "'U.D.C.' में 'U' का उच्चारण व्यंजन ध्वनि 'यू' (/juː/) से होता है, अतः 'a' लगेगा।" }
];
