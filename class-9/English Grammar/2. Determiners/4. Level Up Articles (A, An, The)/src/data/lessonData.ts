export interface SentenceItem {
  id: number;
  originalLineNum: number;
  speaker?: string;
  en: string;
  hi: string;
}

export interface VocabItem {
  word: string;
  pos: string;
  hi: string;
  en: string;
  isFootnote?: boolean;
}

export interface QuickQuestion {
  id: number;
  qEn: string;
  qHi: string;
  opts: string[];
  ans: number; // 0, 1, 2, 3
  explEn: string;
  explHi: string;
}

export interface SectionData {
  id: number;
  titleEn: string;
  titleHi: string;
  lineRange: string;
  badge: string;
  contextEn: string;
  contextHi: string;
  sentences: SentenceItem[];
  explHi: string;
  vocab: VocabItem[];
  marginQuestions?: {
    num: number;
    q: string;
    analysisHi: string;
    analysisEn: string;
  }[];
  questions: QuickQuestion[];
}

export interface ExamQuestion {
  id: number;
  cat: string;
  q: string;
  hi: string;
  opts: string[];
  ans: number; // 0=A, 1=B, 2=C, 3=D
  explEn: string;
  explHi: string;
}

export const authorInfo = {
  name: "Rasipuram Krishnaswami Iyer Narayanaswami (R. K. Narayan)",
  life: "1906 – 2001",
  novel: "Swami and Friends (written in 1930)",
  bioEn: "Rasipuram Krishnaswami Iyer Narayanaswami (R. K. Narayan) was a celebrated Indian writer and novelist known for his heartwarming works set in the fictional South Indian town of Malgudi. Swami and Friends, written in 1930, was his first novel and is based on many delightful, humorous incidents from his own childhood.",
  bioHi: "आर. के. नारायण (रासीपुरम कृष्णस्वामी अय्यर नारायणस्वामी) भारत के प्रख्यात लेखक एवं उपन्यासकार थे, जो काल्पनिक दक्षिण भारतीय कस्बे 'मालगुडी' में रची गई अपनी कहानियों के लिए विश्व प्रसिद्ध हैं। 1930 में लिखा गया 'स्वामी एंड फ्रेंड्स' (Swami and Friends) उनका पहला उपन्यास था, जो उनके अपने बचपन की कई रोचक व हास्यप्रद घटनाओं पर आधारित है।"
};

export const historicalSetting = {
  titleEn: "Historical Context: Malgudi in the 1930s (British Raj Era)",
  titleHi: "ऐतिहासिक पृष्ठभूमि: 1930 के दशक का मालगुडी और ब्रिटिश शासन",
  descEn: "This story is set during the British rule of India (circa 1930). British monarch King George V was referred to as 'His Majesty', and India was administered under the British Viceroy. Mahatma Gandhi was leading widespread non-violent protests against oppressive colonial taxes and unjust government laws. Children like Swaminathan and Rajam heard about these political controversies from elders and mixed them amusingly with their plans for cricket!",
  descHi: "यह कहानी ब्रिटिश शासन के समय (लगभग 1930) की है। उस समय ब्रिटिश सम्राट जॉर्ज पंचम को 'हिज़ मेजेस्टी' कहा जाता था और भारत में शासन का प्रमुख 'वायसराय' होता था। महात्मा गांधी सरकार के कड़े टैक्सों और अंग्रेजी कानूनों के खिलाफ आंदोलन चला रहे थे। बच्चों ने बड़ों की इन चर्चाओं को सुन रखा था, इसलिए वे अपनी क्रिकेट टीम शुरू करने में भी सरकार के टैक्स और वायसराय के डर को लेकर गंभीर बहस करने लगे!"
};

export const beforeYouReadClubs = [
  { id: 1, nameEn: "The Book Club", defaultSuggestion: "The Malgudi Page-Turners / शब्द-रत्न क्लब", desc: "For avid story lovers and young readers" },
  { id: 2, nameEn: "The Maths Club", defaultSuggestion: "The Zero-To-Infinity Thinkers / आर्यभट्ट क्लब", desc: "For puzzle solvers and arithmetic explorers" },
  { id: 3, nameEn: "The Football Club", defaultSuggestion: "The Malgudi Thunder Kicks / तूफानी स्ट्राइकर्स", desc: "For energetic runners and goal scorers" },
  { id: 4, nameEn: "The Indian Music Club", defaultSuggestion: "The Raga Waves / सुर-संगम संगीत क्लब", desc: "For melodious singers and instrument players" }
];

export const sectionsData: SectionData[] = [
  {
    id: 1,
    titleEn: "Part 1: Swaminathan & The Cricket Fever (Paragraph 1)",
    titleHi: "भाग 1: स्वामीनाथन और क्रिकेट का बुखार (अनुच्छेद 1)",
    lineRange: "Line 1",
    badge: "Hobbs, Bradman & Duleep",
    contextEn: "Swaminathan attempts to imitate his wealthy, confident friend Rajam by collecting scores and pictures of legendary cricketers.",
    contextHi: "स्वामीनाथन अपने दोस्त राजम की तरह बनने की कोशिश करता है, हालाँकि वह खुद क्रिकेट खेलने के बारे में कभी सोच नहीं पाया था।",
    sentences: [
      {
        id: 1,
        originalLineNum: 1,
        en: "Swaminathan had not thought of cricket as something that he himself could play.",
        hi: "स्वामीनाथन ने कभी भी क्रिकेट को ऐसी चीज़ के रूप में नहीं सोचा था जिसे वह स्वयं खेल सकता हो।"
      },
      {
        id: 2,
        originalLineNum: 1,
        en: "He was, of course, familiar with Hobbs, Bradman, and Duleep, and vainly tried to carry their scores in his head, as Rajam did.",
        hi: "वह निश्चित रूप से हॉब्स, ब्रैडमैन और दलीप के नामों से परिचित था, और राजम की तरह उनके स्कोर को अपने दिमाग में याद रखने की व्यर्थ (असफल) कोशिश करता था।"
      },
      {
        id: 3,
        originalLineNum: 1,
        en: "He filched pictures of cricket players, as Rajam did, and pasted them in an album, though he secretly did not very much care for those pictures—there was something monotonous about them.",
        hi: "उसने राजम की देखा-देखी क्रिकेट खिलाड़ियों की तस्वीरें भी चुरा-चुराकर (filched) एक एल्बम में चिपकाईं, हालाँकि गुप्त रूप से उसे उन तस्वीरों की कोई खास परवाह नहीं थी—उनमें कुछ उबाऊ और एकरस (monotonous) सा था।"
      },
      {
        id: 4,
        originalLineNum: 1,
        en: "He sometimes thought that the same picture was pasted in every page of the album.",
        hi: "वह कभी-कभी सोचता था कि एल्बम के हर पन्ने पर मानो एक ही जैसी तस्वीर चिपकी हुई है।"
      }
    ],
    explHi: "स्वामीनाथन को खुद क्रिकेट खेलने का बिल्कुल भरोसा नहीं था। उसका दोस्त राजम बहुत रोबदार था और क्रिकेट के स्कोर याद रखता था। राजम की बराबरी करने के लिए स्वामीनाथन भी जैक हॉब्स, डॉन ब्रैडमैन और दलीपसिंहजी के स्कोर याद करने की असफल कोशिश करता और खिलाड़ियों के चित्र चुराकर एल्बम में चिपकाता। पर सच यह था कि स्वामी को इन तस्वीरों में कोई दिलचस्पी नहीं थी, उसे वे तस्वीरें एक जैसी और उबाऊ लगती थीं।",
    vocab: [
      { word: "Hobbs, Bradman, and Duleep", pos: "Proper Noun", hi: "प्रसिद्ध ऐतिहासिक क्रिकेटर", en: "Jack Hobbs (English cricketer), Sir Donald Bradman (Australian cricketer), and Kumar Shri Duleepsinhji (Indian who played for English team).", isFootnote: true },
      { word: "vainly", pos: "Adverb", hi: "व्यर्थ में / असफलतापूर्वक", en: "Unsuccessfully; without achieving desired result.", isFootnote: true },
      { word: "filched", pos: "Verb (past)", hi: "छोटी-मोटी चीजें चुरा लीं", en: "Stole something of little value.", isFootnote: true },
      { word: "monotonous", pos: "Adjective", hi: "एकरस / उबाऊ / नीरस", en: "Not changing and therefore boring.", isFootnote: true },
      { word: "familiar", pos: "Adjective", hi: "परिचित / जाना-पहचाना", en: "Well-known from long or close association." }
    ],
    marginQuestions: [
      {
        num: 1,
        q: "Look at sentences 2 and 3 in paragraph 1. What do they tell us about what Swaminathan thinks of Rajam?",
        analysisHi: "स्वामीनाथन राजम को अपना आदर्श मानता है और उससे बहुत प्रभावित है। वह राजम की नकल करने की कोशिश करता है (जैसे स्कोर याद करना और तस्वीरें चिपकाना), ताकि वह राजम की नज़रों में कमतर न लगे।",
        analysisEn: "Sentences 2 and 3 reveal that Swaminathan deeply admires Rajam and looks up to him. He tries hard to imitate Rajam's hobbies (memorizing scores, collecting pictures) so he can match Rajam's status, even when he doesn't personally care for them."
      }
    ],
    questions: [
      {
        id: 101,
        qEn: "According to the textbook footnote, which cricketer was an Indian who played for the English cricket team?",
        qHi: "पाठ्यपुस्तक के फुटनोट के अनुसार, कौन सा क्रिकेटर एक भारतीय था जो अंग्रेजी क्रिकेट टीम के लिए खेलता था?",
        opts: [
          "Sir Donald Bradman (सर डॉन ब्रैडमैन - ऑस्ट्रेलियाई दिग्गज बल्लेबाज)",
          "Kumar Shri Duleepsinhji (कुमार श्री दलीपसिंहजी - भारतीय जिन्होंने इंग्लैंड के लिए खेला)",
          "Jack Hobbs (जैक हॉब्स - महान अंग्रेज सलामी बल्लेबाज)",
          "Bishop Waller (बिशप वॉलर - विद्यालय के संस्थापक)"
        ],
        ans: 1, // B
        explEn: "The footnote clarifies: 'Kumar Shri Duleepsinhji, an Indian who played for the English cricket team'.",
        explHi: "पाठ्यपुस्तक का फुटनोट स्पष्ट करता है कि कुमार श्री दलीपसिंहजी एक भारतीय थे जो इंग्लैंड की क्रिकेट टीम के लिए खेलते थे।"
      },
      {
        id: 102,
        qEn: "What does the word 'filched' mean as defined in the textbook glossary?",
        qHi: "पाठ्यपुस्तक के शब्दकोश में 'filched' का क्या अर्थ दिया गया है?",
        opts: [
          "Purchased from a big market (बड़े बाजार से महंगे दामों में खरीदी)",
          "Drew with pencil and colours (पेंसिल और रंगों से स्वयं बनाई)",
          "Stole something of little value (कम कीमत की छोटी-मोटी वस्तु चुरा ली)",
          "Received as an annual sports award (वार्षिक खेल पुरस्कार में प्राप्त की)"
        ],
        ans: 2, // C
        explEn: "The textbook explicitly defines 'filched' as 'stole something of little value'.",
        explHi: "किताब के फुटनोट में 'filched' का अर्थ स्पष्ट लिखा है: 'stole something of little value' (कम मूल्य की कोई चीज़ चुरा लेना)।"
      }
    ]
  },
  {
    id: 2,
    titleEn: "Part 2: Confessions, Confidence & Thrashing the Board School (Lines 2–6)",
    titleHi: "भाग 2: कबूलनामा, हौसला और बोर्ड स्कूल को चुनौती (पंक्तियाँ 2–6)",
    lineRange: "Lines 2 to 6",
    badge: "The Board School Mugs",
    contextEn: "Swami admits he cannot play, only to discover Rajam cannot play either! Buoyed by this, they dream of thrashing rival teams.",
    contextHi: "स्वामी डरते-डरते बताता है कि उसे खेलना नहीं आता, पर राजम के कबूलनामे से उसका हौसला आसमान छूने लगता है।",
    sentences: [
      {
        id: 5,
        originalLineNum: 2,
        speaker: "Swaminathan",
        en: "“No, Rajam, I don’t think I can play. I don’t know how to play.”",
        hi: "“नहीं, राजम, मुझे नहीं लगता कि मैं खेल सकता हूँ। मुझे खेलना नहीं आता।”"
      },
      {
        id: 6,
        originalLineNum: 3,
        speaker: "Rajam",
        en: "“That is what everybody thinks,” said Rajam, “I don’t know how myself, though I collect pictures and scores.”",
        hi: "“सब यही सोचते हैं,” राजम ने कहा, “मुझे खुद खेलना नहीं आता, हालाँकि मैं तस्वीरें और स्कोर इकट्ठा करता हूँ।”"
      },
      {
        id: 7,
        originalLineNum: 4,
        en: "This was very pleasing to hear. Probably Hobbs too was shy and sceptical before he took the bat and swung it.",
        hi: "यह सुनकर स्वामीनाथन को बहुत तसल्ली (आनंद) मिली। शायद महान हॉब्स भी बल्ला पकड़ने और उसे घुमाने से पहले शर्मीले और संशय में (sceptical) रहे होंगे।"
      },
      {
        id: 8,
        originalLineNum: 5,
        speaker: "Swaminathan",
        en: "“We can challenge a lot of teams, including our School Eleven. They think they can’t be beaten,” said Swaminathan.",
        hi: "“हम बहुत सी टीमों को चुनौती दे सकते हैं, यहाँ तक कि अपनी स्कूल इलेवन को भी। वे सोचते हैं कि उन्हें हराया नहीं जा सकता,” स्वामीनाथन ने कहा।"
      },
      {
        id: 9,
        originalLineNum: 6,
        speaker: "Rajam",
        en: "“What! The Board School mugs think that! We shall thrash them. Oh, yes.”",
        hi: "“क्या! बोर्ड स्कूल के वे बुद्धू (mugs) ऐसा सोचते हैं! हम उन्हें बुरी तरह धूल चटाएँगे (thrash them)। हाँ, बिल्कुल!”"
      }
    ],
    explHi: "जब स्वामी ने झिझकते हुए कहा कि उसे क्रिकेट खेलना नहीं आता, तो राजम ने हंसकर कहा कि उसे भी नहीं आता! यह जानकर स्वामी की जान में जान आई—उसे लगा कि जब जैक हॉब्स ने पहली बार बल्ला उठाया होगा, तो वे भी ऐसे ही झिझके होंगे। तुरंत दोनों का आत्मविश्वास इतना बढ़ गया कि वे बोर्ड स्कूल की टीम को 'मूर्ख' (mugs) कहने लगे और उन्हें बुरी तरह हराने (thrash) की डींगें मारने लगे!",
    vocab: [
      { word: "sceptical", pos: "Adjective", hi: "संशयवादी / संदेह करने वाला", en: "Doubting that something is true or useful.", isFootnote: true },
      { word: "mugs", pos: "Noun (Slang)", hi: "बुद्धू / आसानी से बेवकूफ बनने वाले लोग", en: "(Old-fashioned slang) people who are stupid and easily deceived.", isFootnote: true },
      { word: "thrash", pos: "Verb", hi: "बुरी तरह हराना / धूल चटाना", en: "Defeat heavily in a contest or match." },
      { word: "pleasing", pos: "Adjective", hi: "संतोषप्रद / सुखद", en: "Giving a feeling of satisfaction or relief." }
    ],
    marginQuestions: [
      {
        num: 2,
        q: "What do Rajam and Swaminathan think about the Board School team?",
        analysisHi: "वे बोर्ड स्कूल की टीम को बहुत घमंडी और 'बुद्धू' (mugs) मानते हैं। उनका मानना है कि बोर्ड स्कूल वाले गलतफहमी में हैं कि वे अजेय हैं, और उनकी नई टीम उन्हें बुरी तरह हरा देगी।",
        analysisEn: "They look down on the Board School team, calling them 'mugs' (stupid/easily fooled). They believe the Board School boys arrogantly assume they can't be beaten, and they vow to soundly thrash them."
      }
    ],
    questions: [
      {
        id: 201,
        qEn: "Why was Swaminathan immensely relieved and pleased upon hearing Rajam's words in line 3?",
        qHi: "पंक्ति 3 में राजम की बात सुनकर स्वामीनाथन को अत्यधिक राहत और प्रसन्नता क्यों हुई?",
        opts: [
          "Because Rajam offered to buy him a new bat (क्योंकि राजम ने उसे नया बल्ला खरीद कर देने का वादा किया)",
          "Because Rajam confessed that he didn't know how to play either (क्योंकि राजम ने खुद माना कि उसे भी खेलना नहीं आता)",
          "Because the Board School cancelled the match (क्योंकि बोर्ड स्कूल ने आगामी मैच रद्द कर दिया था)",
          "Because the school announced early summer holidays (क्योंकि स्कूल ने गर्मी की छुट्टियों की घोषणा कर दी थी)"
        ],
        ans: 1, // B
        explEn: "Swami was afraid of being mocked for not knowing how to play; learning that even Rajam didn't know made him feel secure.",
        explHi: "स्वामी को डर था कि राजम उसे अनाड़ी समझेगा, लेकिन जब राजम ने खुद कबूला कि उसे भी खेलना नहीं आता, तो स्वामी की झिझक खत्म हो गई।"
      },
      {
        id: 202,
        qEn: "What does the slang word 'mugs' mean according to the lesson footnote?",
        qHi: "पाठ के फुटनोट के अनुसार अपशब्द/स्लैंग 'mugs' का क्या अर्थ है?",
        opts: [
          "Strong professional athletes (मजबूत और पेशेवर धावक खिलाड़ी)",
          "People who drink tea from clay pots (मिट्टी के कुल्हड़ों में चाय पीने वाले लोग)",
          "People who are stupid and easily deceived (मूर्ख और सीधे लोग जिन्हें आसानी से बहकाया जा सके)",
          "Referees who officiate cricket tournaments (क्रिकेट टूर्नामेंट में निर्णय देने वाले अंपायर)"
        ],
        ans: 2, // C
        explEn: "The footnote states: 'mugs: (old-fashioned slang) people who are stupid and easily deceived'.",
        explHi: "किताब के फुटनोट में लिखा है: 'mugs: (old-fashioned slang) people who are stupid and easily deceived'."
      }
    ]
  },
  {
    id: 3,
    titleEn: "Part 3: The Famous Name Debate – M.C.C. vs Court Fears (Lines 7–12)",
    titleHi: "भाग 3: नाम पर बहस – एम.सी.सी. और अदालत का खौफ (पंक्तियाँ 7–12)",
    lineRange: "Lines 7 to 12",
    badge: "Malgudi Cricket Club",
    contextEn: "Rajam proposes the grand name 'M.C.C.', sparking Swaminathan's fear of lawsuits from Hobbs's famous English club.",
    contextHi: "राजम टीम का नाम 'M.C.C.' रखने का प्रस्ताव देता है, पर स्वामी को डर सताता है कि असली क्लब वाले उन पर मुकदमा न कर दें!",
    sentences: [
      {
        id: 10,
        originalLineNum: 7,
        speaker: "Swaminathan",
        en: "“What shall we call it?”",
        hi: "“हम अपनी टीम को क्या नाम देंगे?”"
      },
      {
        id: 11,
        originalLineNum: 8,
        speaker: "Rajam",
        en: "“Don’t you know? It is the M.C.C.” said Rajam.",
        hi: "“तुम्हें नहीं पता? यह एम.सी.सी. (M.C.C.) है,” राजम ने कहा।"
      },
      {
        id: 12,
        originalLineNum: 9,
        speaker: "Swaminathan",
        en: "“That is Hobbs’s team, isn’t it? They may drag us before a court if we take their name.”",
        hi: "“वह तो हॉब्स की टीम है, है ना? अगर हमने उनका नाम चुरा लिया तो वे हमें अदालत में घसीट सकते हैं।”"
      },
      {
        id: 13,
        originalLineNum: 10,
        speaker: "Rajam",
        en: "“Who says that? If we get into any trouble, I shall declare before the judge that M.C.C. stands for Malgudi Cricket Club.”",
        hi: "“यह कौन कहता है? अगर हमें कोई परेशानी हुई, तो मैं जज के सामने साफ ऐलान कर दूँगा कि M.C.C. का मतलब ‘मालगुडी क्रिकेट क्लब’ है।”"
      },
      {
        id: 14,
        originalLineNum: 11,
        en: "Swaminathan was a little disappointed. Though as M.C.C. it sounded imposing, the name was really a bit tame.",
        hi: "स्वामीनाथन थोड़ा निराश हुआ। यद्यपि संक्षेप में M.C.C. सुनने में रोबदार (imposing) लगता था, पर इसका पूरा नाम वास्तव में थोड़ा फीका और साधारण (tame) था।"
      },
      {
        id: 15,
        originalLineNum: 12,
        speaker: "Swaminathan",
        en: "“I think we had better try some other name, Rajam.”",
        hi: "“मुझे लगता है हमें कोई दूसरा नाम आज़माना चाहिए, राजम।”"
      }
    ],
    explHi: "राजम ने तुरंत टीम का नाम 'M.C.C.' (Marylebone Cricket Club की तर्ज पर) प्रस्तावित किया। पर स्वामी घबरा गया कि असली अंग्रेजी टीम उन पर कोर्ट केस कर देगी! राजम ने बहादुरी दिखाते हुए कहा कि वह जज के सामने कह देगा कि M.C.C. का मतलब 'मालगुडी क्रिकेट क्लब' है। स्वामी को लगा कि M.C.C. सुनने में तो रोबदार लगता है, पर मालगुडी क्रिकेट क्लब नाम बहुत सीधा-सादा और फीका (tame) है, इसलिए कोई और धमाकेदार नाम ढूंढना चाहिए।",
    vocab: [
      { word: "imposing", pos: "Adjective", hi: "रोबदार / भव्य / प्रभावशाली", en: "Big and important in a way that people admire.", isFootnote: true },
      { word: "tame", pos: "Adjective", hi: "फीका / नीरस / रोमांचहीन", en: "Here, not interesting or exciting.", isFootnote: true },
      { word: "declare", pos: "Verb", hi: "घोषणा करना / बयान देना", en: "Say something solemnly and officially." },
      { word: "disappointed", pos: "Adjective", hi: "निराश", en: "Unhappy because someone or something did not meet expectations." }
    ],
    questions: [
      {
        id: 301,
        qEn: "How did Rajam plan to defend their team if they were taken to court for using the name M.C.C.?",
        qHi: "यदि M.C.C. नाम के लिए उन्हें अदालत ले जाया जाता, तो राजम ने अपने बचाव की क्या योजना बनाई?",
        opts: [
          "He would apologize and pay a fine from pocket money (वह माफी माँगकर जेबखर्च से जुर्माना भर देगा)",
          "He would run away to Madras and never return (वह भागकर मद्रास चला जाएगा और कभी वापस नहीं आएगा)",
          "He would declare before the judge that M.C.C. stands for Malgudi Cricket Club (वह जज के सामने ऐलान करेगा कि M.C.C. का अर्थ मालगुडी क्रिकेट क्लब है)",
          "He would hire an expensive British lawyer (वह अदालत के लिए एक महंगा ब्रिटिश वकील रखेगा)"
        ],
        ans: 2, // C
        explEn: "Rajam bravely declared: 'I shall declare before the judge that M.C.C. stands for Malgudi Cricket Club.'",
        explHi: "राजम ने विश्वास के साथ कहा कि वह जज के सामने घोषणा करेगा कि M.C.C. का अर्थ मालगुडी क्रिकेट क्लब है।"
      },
      {
        id: 302,
        qEn: "What contrast does Swaminathan note regarding the name M.C.C. in line 11?",
        qHi: "पंक्ति 11 में स्वामीनाथन M.C.C. नाम के बारे में किस विरोधाभास को रेखांकित करता है?",
        opts: [
          "As M.C.C. it sounded imposing, but the full name was really a bit tame (संक्षिप्त में रोबदार पर पूरा नाम फीका व साधारण था)",
          "The letters were too difficult to print on the bats (अक्षरों को लकड़ी के बल्लों पर छापना बहुत मुश्किल था)",
          "The abbreviation could not be translated into Tamil (इस संक्षिप्त नाम का तमिल में अनुवाद नहीं हो सकता था)",
          "It sounded like a government tax department (यह किसी सरकारी टैक्स विभाग जैसा प्रतीत होता था)"
        ],
        ans: 0, // A
        explEn: "The text says: 'Though as M.C.C. it sounded imposing, the name was really a bit tame.'",
        explHi: "पाठ में लिखा है कि M.C.C. के रूप में यह रोबदार (imposing) लगता था, पर इसका अर्थ बहुत फीका (tame) था।"
      }
    ]
  },
  {
    id: 4,
    titleEn: "Part 4: The Jumping Stars & The Headline Vision (Lines 13–20)",
    titleHi: "भाग 4: जंपिंग स्टार्स और अखबार की सुर्खी का सपना (पंक्तियाँ 13–20)",
    lineRange: "Lines 13 to 20",
    badge: "The Glorious Vision",
    contextEn: "Swami suggests 'Jumping Stars', inspiring Rajam to visualize front-page newspaper headlines of crushing their school rivals.",
    contextHi: "स्वामी 'जंपिंग स्टार्स' नाम सुझाता है, जिससे राजम के दिमाग में अखबार की सनसनीखेज सुर्खी घूमने लगती है।",
    sentences: [
      { id: 16, originalLineNum: 13, speaker: "Rajam", en: "“What would you suggest?”", hi: "“तुम क्या सुझाव दोगे?”" },
      { id: 17, originalLineNum: 14, speaker: "Swaminathan", en: "“Well—I am for ‘Friends Eleven’.”", hi: "“खैर—मैं तो ‘फ्रेंड्स इलेवन’ के पक्ष में हूँ।”" },
      { id: 18, originalLineNum: 15, speaker: "Rajam", en: "“ ‘Friends Eleven’?”", hi: "“ ‘फ्रेंड्स इलेवन’?”" },
      { id: 19, originalLineNum: 16, speaker: "Swaminathan", en: "“Or say ‘Jumping Stars’?” said Swaminathan.", hi: "“या फिर कहो ‘जंपिंग स्टार्स’ (उछलते सितारे)?” स्वामीनाथन ने कहा।" },
      { id: 20, originalLineNum: 17, speaker: "Rajam", en: "“Oh, that is not bad, not bad you know.”", hi: "“ओह, यह बुरा नहीं है, बिल्कुल बुरा नहीं है।”" },
      { id: 21, originalLineNum: 18, speaker: "Swaminathan", en: "“I do think it would be glorious to call ourselves ‘Jumping Stars’!”", hi: "“मुझे सचमुच लगता है कि खुद को ‘जंपिंग स्टार्स’ कहना बेहद शानदार (glorious) होगा!”" },
      { id: 22, originalLineNum: 19, en: "Rajam instantly had a vision of a newspaper report:\nTHE JUMPING STARS SOUNDLY THRASHED THE BOARD HIGH SCHOOL ELEVEN.", hi: "राजम के दिमाग में तुरंत अखबार की एक खबर का दृश्य (vision) कौंध गया:\n‘जंपिंग स्टार्स ने बोर्ड हाई स्कूल इलेवन को बुरी तरह धूल चटाई!’" },
      { id: 23, originalLineNum: 20, speaker: "Rajam", en: "“It is a beauty, I think,” he cried, moved by the vision. He pulled out a piece of paper and a pencil, and said, “Come on, Swami, repeat the names that come to your head. It would be better to have a long list to select from. We shall underline ‘Jumping Stars’ and ‘M.C.C.’ and give them special consideration. Come on.”", hi: "“यह तो कमाल का नाम है,” वह उस काल्पनिक दृश्य से गदगद होकर चिल्लाया। उसने तुरंत कागज़ और पेंसिल निकाली और कहा, “शाबाश स्वामी, जो भी नाम तुम्हारे दिमाग में आएं, बोलते जाओ। एक लंबी सूची बनाना बेहतर होगा। हम ‘जंपिंग स्टार्स’ और ‘M.C.C.’ को रेखांकित करेंगे और उन पर विशेष विचार (special consideration) करेंगे। जल्दी बोलो!”" }
    ],
    explHi: "स्वामी ने पहले 'फ्रेंड्स इलेवन' और फिर 'जंपिंग स्टार्स' नाम सुझाया। 'जंपिंग स्टार्स' सुनते ही राजम की कल्पना दौड़ पड़ी! उसने तुरंत अखबार में छपने वाली सुर्खी की कल्पना कर ली—'जंपिंग स्टार्स ने बोर्ड हाई स्कूल इलेवन को बुरी तरह पीटा!' इस काल्पनिक जीत से उत्साहित होकर राजम ने तुरंत कागज़-पेंसिल निकाली ताकि नामों की लंबी लिस्ट बनाई जा सके।",
    vocab: [
      { word: "vision", pos: "Noun", hi: "काल्पनिक दृश्य / मानस-चित्र", en: "A mental image of something.", isFootnote: true },
      { word: "consideration", pos: "Noun", hi: "गंभीर विचार-विमर्श", en: "Careful thought.", isFootnote: true },
      { word: "soundly", pos: "Adverb", hi: "पूरी तरह से / निर्णायक रूप से", en: "Thoroughly and completely." },
      { word: "glorious", pos: "Adjective", hi: "शानदार / गौरवशाली", en: "Having or deserving great fame and admiration." }
    ],
    marginQuestions: [
      {
        num: 3,
        q: "Rajam and Swaminathan are focusing on glory and ... first. Instead, they should first focus on ...",
        analysisHi: "वे पहले महिमा, रोब और टीम के नाम पर ध्यान दे रहे हैं। इसके बजाय, उन्हें पहले क्रिकेट की बुनियादी चीजों पर ध्यान देना चाहिए—जैसे कि बल्ला, गेंद, विकेट जुटाना और वास्तव में खेलना सीखना!",
        analysisEn: "They are focusing on glory, team names, and newspaper headlines first. Instead, they should first focus on practicing, getting equipment (bat, ball, wickets), and actually learning how to play the game!"
      },
      {
        num: 4,
        q: "Is this story set in current times? What are the clues that tell you this?",
        analysisHi: "नहीं, यह कहानी 1930 के ब्रिटिश कालीन भारत की है। इसके प्रमाण हैं: जैक हॉब्स, ब्रैडमैन और दलीप के नाम, पिता का वेतन (500 रुपये), मालगुडी का परिवेश, तथा आगे आने वाले 'हिज़ मेजेस्टी', 'वायसराय' और महात्मा गांधी के संदर्भ।",
        analysisEn: "No, the story is set in the 1930s during colonial India. Clues include: legendary vintage cricketers (Hobbs, Bradman, Duleepsinhji), the father's monthly salary of ₹500, references to 'His Majesty' (King George V), the British Viceroy, and Mahatma Gandhi's anti-government tax protests."
      }
    ],
    questions: [
      {
        id: 401,
        qEn: "What vivid headline flashed across Rajam's imagination in line 19?",
        qHi: "पंक्ति 19 में राजम की कल्पना में कौन सी जीवंत सुर्खी कौंधी?",
        opts: [
          "THE JUMPING STARS WON THE CRICKET WORLD CUP (जंपिंग स्टार्स ने क्रिकेट विश्व कप जीता)",
          "THE JUMPING STARS SOUNDLY THRASHED THE BOARD HIGH SCHOOL ELEVEN (जंपिंग स्टार्स ने बोर्ड हाई स्कूल इलेवन को बुरी तरह धूल चटाई)",
          "THE MALGUDI CLUB ARRESTED BY GOVERNMENT (मालगुडी क्लब को सरकारी अधिकारियों ने गिरफ्तार किया)",
          "BOARD SCHOOL BEATS MALGUDI FRIENDS BY TEN WICKETS (बोर्ड स्कूल ने मालगुडी के दोस्तों को दस विकेट से हराया)"
        ],
        ans: 1, // B
        explEn: "Line 19 explicitly mentions: 'THE JUMPING STARS SOUNDLY THRASHED THE BOARD HIGH SCHOOL ELEVEN.'",
        explHi: "पंक्ति 19 में स्पष्ट लिखा है: 'THE JUMPING STARS SOUNDLY THRASHED THE BOARD HIGH SCHOOL ELEVEN'."
      },
      {
        id: 402,
        qEn: "Which two team names did Rajam decide to underline for 'special consideration'?",
        qHi: "राजम ने किन दो नामों को 'विशेष विचार' के लिए रेखांकित करने का निर्णय लिया?",
        opts: [
          "Friends Eleven and Waller's Cricket Eleven (फ्रेंड्स इलेवन और वॉलर्स क्रिकेट इलेवन)",
          "Excelsior Union and Victory Union Eleven (एक्सेलसियर यूनियन और विक्ट्री यूनियन इलेवन)",
          "‘Jumping Stars’ and ‘M.C.C.’ (‘जंपिंग स्टार्स’ और ‘एम.सी.सी.’)",
          "Board High School and Champion Eleven (बोर्ड हाई स्कूल और चैंपियन इलेवन)"
        ],
        ans: 2, // C
        explEn: "Rajam instructed: 'We shall underline ‘Jumping Stars’ and ‘M.C.C.’ and give them special consideration.'",
        explHi: "राजम ने कहा कि वे 'Jumping Stars' और 'M.C.C.' को अंडरलाइन करेंगे और उन पर विशेष विचार करेंगे।"
      }
    ]
  },
  {
    id: 5,
    titleEn: "Part 5: Brainstorming Team Names & Mani's Absence (Lines 21–30)",
    titleHi: "भाग 5: नामों की बौछार और मणि की गैरमौजूदगी (पंक्तियाँ 21–30)",
    lineRange: "Lines 21 to 30",
    badge: "Excelsiors & Victory Union",
    contextEn: "Swami rattles off a stream of grand names. Rajam gets tired, but feels delighted that their opponents will fear them.",
    contextHi: "स्वामी एक के बाद एक नामों की झड़ी लगा देता है। राजम हैरान और खुश हो जाता है कि लोग उनके नामों से ही कांप उठेंगे!",
    sentences: [
      { id: 24, originalLineNum: 21, speaker: "Swaminathan", en: "Swaminathan remained thoughtful and started, “ ‘Friends Eleven’— ‘Jumping Stars’— ‘Friends Union’...”", hi: "स्वामीनाथन थोड़ा विचारमग्न रहा और शुरू हुआ, “ ‘फ्रेंड्स इलेवन’— ‘जंपिंग स्टार्स’— ‘फ्रेंड्स यूनियन’...”" },
      { id: 25, originalLineNum: 22, speaker: "Rajam", en: "“I have ‘Friends Union’ already here,” Rajam said, pointing to the list.", hi: "“ ‘फ्रेंड्स यूनियन’ मेरे पास यहाँ पहले से लिखा है,” राजम ने सूची की ओर इशारा करते हुए कहा।" },
      { id: 26, originalLineNum: 23, speaker: "Swaminathan", en: "Swaminathan went on: “ ‘Excelsiors’...”", hi: "स्वामीनाथन आगे बोला: “ ‘एक्सेलसियर्स’ (Excelsiors)...”" },
      { id: 27, originalLineNum: 24, speaker: "Rajam", en: "“I have got it.”", hi: "“यह भी मैंने लिख लिया।”" },
      { id: 28, originalLineNum: 25, speaker: "Swaminathan", en: "“ ‘Excelsior Union’...‘Champion Eleven’ ”...A long pause.", hi: "“ ‘एक्सेलसियर यूनियन’... ‘चैंपियन इलेवन’ ”... इसके बाद एक लंबा सन्नाटा।" },
      { id: 29, originalLineNum: 26, speaker: "Rajam", en: "“Are you dried up?” Rajam asked.", hi: "“क्या तुम्हारा दिमाग खाली हो गया (विचार खत्म हो गए)?” राजम ने पूछा।" },
      { id: 30, originalLineNum: 27, speaker: "Swaminathan", en: "“No, if Mani were here, he would have suggested a few more names...‘Champion Eleven’.”", hi: "“नहीं, अगर मणि यहाँ होता, तो उसने कुछ और नाम सुझाए होते... ‘चैंपियन इलेवन’।”" },
      { id: 31, originalLineNum: 28, speaker: "Rajam", en: "“You have just said it.”", hi: "“यह तो तुम अभी-अभी बोल चुके हो।”" },
      { id: 32, originalLineNum: 29, speaker: "Swaminathan", en: "“ ‘Victory Union Eleven’.”", hi: "“ ‘विक्ट्री यूनियन इलेवन’।”" },
      { id: 33, originalLineNum: 30, speaker: "Rajam", en: "“That is very good. I think it is very very good. People would be afraid of us.” He held the list before him and read the names with great satisfaction. He had struggled hard on the previous night to get a few names. But only ‘Friends Union’ and ‘Excelsiors’ kept coming till he felt fatigued. But what a lot of names Swaminathan was able to reel off.", hi: "“यह बहुत बढ़िया है। मुझे लगता है यह बहुत-बहुत बढ़िया है। लोग हमसे डरने लगेंगे।” उसने सूची को सामने रखा और बड़े संतोष के साथ नामों को पढ़ा। उसने पिछली रात कुछ नाम सोचने के लिए कड़ी मशक्कत की थी, लेकिन थकने (fatigued) तक उसके दिमाग में केवल ‘फ्रेंड्स यूनियन’ और ‘एक्सेलसियर्स’ ही आए थे। पर स्वामीनाथन ने तो देखते ही देखते नामों की झड़ी लगा दी थी (reel off)!" }
    ],
    explHi: "स्वामीनाथन ने धड़ाधड़ नाम बोलने शुरू किए—'फ्रेंड्स यूनियन', 'एक्सेलसियर्स', 'एक्सेलसियर यूनियन', 'चैंपियन इलेवन'। थोड़ी देर में जब वह रुका, तो राजम ने पूछा कि क्या तुम्हारे सारे विचार खत्म हो गए (Are you dried up)? स्वामी ने तुरंत 'विक्ट्री यूनियन इलेवन' बोल दिया! राजम बहुत खुश हुआ कि ऐसे भारी-भरकम नाम सुनकर विरोधी टीमें पहले ही डर जाएंगी। राजम खुद कल रात केवल दो नाम सोचकर थक गया था, जबकि स्वामी ने बिना रुके इतने सारे नाम बोल दिए थे।",
    vocab: [
      { word: "Excelsior", pos: "Latin noun / motto", hi: "सदा ऊँचा उठने वाला / सर्वोत्कृष्ट", en: "A Latin word translated into English as a motto meaning 'Ever upward!'.", isFootnote: true },
      { word: "Are you dried up?", pos: "Idiomatic phrase", hi: "क्या तुम्हारे विचार खत्म हो गए?", en: "Have you run out of ideas?", isFootnote: true },
      { word: "fatigued", pos: "Adjective", hi: "थका-मांदा / क्लान्त", en: "Very tired.", isFootnote: true },
      { word: "reel off", pos: "Phrasal Verb", hi: "धाराप्रवाह बोल देना / झड़ी लगाना", en: "Say or recite a long list quickly and easily without hesitation." }
    ],
    marginQuestions: [
      {
        num: 5,
        q: "Tell your partner why this conversation is funny.",
        analysisHi: "यह बातचीत इसलिए हास्यप्रद है क्योंकि दोनों को क्रिकेट खेलना तो आता नहीं, पर वे सोच रहे हैं कि सिर्फ भारी-भरकम नाम ('चैंपियन इलेवन', 'विक्ट्री यूनियन') रखने से ही लोग उनसे डरने लगेंगे! साथ ही, स्वामी दिमाग खाली होने पर एक ही नाम दोबारा बोल देता है।",
        analysisEn: "It is humorous because neither boy actually knows how to play cricket, yet they firmly believe grand names like 'Victory Union' will intimidate rivals! Also, when Swami pauses, he awkwardly repeats 'Champion Eleven'."
      },
      {
        num: 6,
        q: "Rajam is ... with Swaminathan because he thinks Swaminathan is ...",
        analysisHi: "राजम, स्वामीनाथन से 'बहुत प्रभावित और संतुष्ट' (impressed/delighted) है क्योंकि वह सोचता है कि स्वामीनाथन 'बहुत रचनात्मक और नामों का खजाना' (clever / resourceful in reeling off names) है।",
        analysisEn: "Rajam is 'impressed and satisfied' with Swaminathan because he thinks Swaminathan is 'extraordinarily resourceful and creative' at reeling off intimidating names."
      }
    ],
    questions: [
      {
        id: 501,
        qEn: "According to the textbook footnote, what does the Latin motto 'Excelsior' translate to in English?",
        qHi: "पाठ्यपुस्तक के फुटनोट के अनुसार लैटिन शब्द 'Excelsior' का अंग्रेजी में क्या अर्थ होता है?",
        opts: [
          "Victory forever! (सदा सर्वदा विजय!)",
          "‘Ever upward!’ (सदा ऊपर / सदैव ऊँचे उठो!)",
          "Brothers in arms! (मैदान में साथी भाई!)",
          "Master of the pitch! (पिच का असली उस्ताद!)"
        ],
        ans: 1, // B
        explEn: "The footnote clearly states: 'Excelsior: a Latin word translated into English as a motto meaning ‘Ever upward!’'.",
        explHi: "किताब के फुटनोट में स्पष्ट लिखा है: 'Excelsior: a Latin word translated into English as a motto meaning ‘Ever upward!’'."
      },
      {
        id: 502,
        qEn: "Which character from their friend group did Swaminathan mention would have suggested more names?",
        qHi: "स्वामीनाथन ने अपने मित्र समूह के किस साथी का ज़िक्र किया जिसने और भी नाम सुझाए होते?",
        opts: [
          "Mani (मणि - उनका कद्दावर और ताकतवर दोस्त)",
          "Sankar (शंकर - कक्षा का सबसे होशियार बालक)",
          "Somu (सोमू - स्कूल का मॉनिटर)",
          "The Pea (मटर - उनका छोटा नटखट सहपाठी)"
        ],
        ans: 0, // A
        explEn: "Swami remarks in line 27: 'No, if Mani were here, he would have suggested a few more names'.",
        explHi: "पंक्ति 27 में स्वामी कहता है: 'अगर मणि यहाँ होता, तो उसने कुछ और नाम सुझाए होते'."
      }
    ]
  },
  {
    id: 6,
    titleEn: "Part 6: The Government Tax Conundrum & Two Names (Lines 31–38)",
    titleHi: "भाग 6: सरकारी टैक्स का पेच और दो नामों का रहस्य (पंक्तियाँ 31–38)",
    lineRange: "Lines 31 to 38",
    badge: "Government Taxes & Complications",
    contextEn: "Swami raises a shocking question: Will they have to pay taxes to the Government to start a cricket team?",
    contextHi: "स्वामी अचानक एक गंभीर सवाल उठाता है: क्या क्रिकेट टीम शुरू करने के लिए भी सरकार को टैक्स देना पड़ेगा?",
    sentences: [
      { id: 34, originalLineNum: 31, speaker: "Rajam", en: "“Can you meet me tomorrow evening, Swami? I shall get Mani down. Let us select a name.”", hi: "“क्या तुम कल शाम मुझसे मिल सकते हो, स्वामी? मैं मणि को भी बुला लूँगा। फिर हम एक नाम चुनेंगे।”" },
      { id: 35, originalLineNum: 32, speaker: "Swaminathan", en: "After a while Swaminathan asked, “Look here, do you think we shall have to pay tax or something to the Government when we start the team? The Government seems to tax everything in this world.”", hi: "थोड़ी देर बाद स्वामीनाथन ने पूछा, “यह देखो, क्या तुम्हें लगता है कि जब हम टीम शुरू करेंगे तो हमें सरकार को टैक्स या ऐसा ही कुछ देना पड़ेगा? सरकार तो दुनिया की हर चीज़ पर टैक्स लगाती लगती है।”" },
      { id: 36, originalLineNum: 33, speaker: "Rajam", en: "“My father’s pay is about five hundred. But nearly two hundred and over is demanded by the Government. Anyway, what makes you think that we shall have to pay tax?”", hi: "“मेरे पिताजी का वेतन लगभग पाँच सौ है। लेकिन लगभग दो सौ से भी ज़्यादा सरकार माँग लेती है। वैसे, तुम्हें ऐसा क्यों लगता है कि हमें भी टैक्स देना पड़ेगा?”" },
      { id: 37, originalLineNum: 34, speaker: "Swaminathan", en: "“I mean—if we don’t pay tax, the Government may not recognise our team or its name and a hundred other teams may take the same name. It might lead to all sorts of complications.”", hi: "“मेरा मतलब है—अगर हमने टैक्स नहीं दिया, तो हो सकता है सरकार हमारी टीम या उसके नाम को मान्यता ही न दे, और सैकड़ों दूसरी टीमें वही नाम रख लेंगी। इससे कई तरह की उलझनें (complications) पैदा हो सकती हैं।”" },
      { id: 38, originalLineNum: 35, speaker: "Rajam", en: "“Suppose we have two names?” asked Rajam.", hi: "“मान लो अगर हमारे दो नाम हों तो?” राजम ने पूछा।" },
      { id: 39, originalLineNum: 36, speaker: "Swaminathan", en: "“It is not done.”", hi: "“ऐसा कभी नहीं होता।”" },
      { id: 40, originalLineNum: 37, speaker: "Rajam", en: "“I know a lot of teams that have two names. When I was in Bishop Waller’s, we had a cricket team that we called—I don’t remember the name now. I think we called it ‘Cricket Eleven’ and ‘Waller’s Cricket Eleven’. You see, one name is for ordinary use and the other is for matches.”", hi: "“मैं ऐसी कई टीमों को जानता हूँ जिनके दो नाम होते हैं। जब मैं बिशप वॉलर्स स्कूल में था, तब हमारी एक क्रिकेट टीम थी जिसे हम—मुझे अब ठीक से नाम याद नहीं। मुझे लगता है हम उसे ‘क्रिकेट इलेवन’ और ‘वॉलर्स क्रिकेट इलेवन’ कहते थे। समझे, एक नाम आम दिनों के इस्तेमाल के लिए और दूसरा मैचों के लिए होता है।”" },
      { id: 41, originalLineNum: 38, speaker: "Swaminathan", en: "“It is all very well for a rich team like your Wallers. But suppose the Government demands two taxes from us?”", hi: "“तुम्हारी वॉलर्स जैसी अमीर टीम के लिए तो यह ठीक है। पर सोचो अगर सरकार ने हमसे दोहरे टैक्स (दो टैक्स) माँग लिए तो?”" }
    ],
    explHi: "स्वामीनाथन ने एक अजीब चिंता जताई—कि सरकार हर चीज़ पर टैक्स लेती है, तो क्या उनकी टीम पर भी टैक्स लगेगा? अगर टैक्स नहीं दिया तो सरकार मान्यता नहीं देगी और नाम चोरी हो जाएगा! राजम ने अपने पिता की 500 रुपये तनख्वाह में से 200 रुपये से ज्यादा टैक्स कटने की बात बताई। फिर राजम ने तरकीब निकाली कि वे दो नाम रख लेंगे (जैसे उसके पुराने स्कूल बिशप वॉलर्स में था—एक रोज़मर्रा के लिए, एक मैचों के लिए)। इस पर स्वामी ने तुरंत नई मुश्किल खड़ी कर दी—'अगर सरकार ने दो नामों के दो टैक्स माँग लिए तब क्या होगा?'",
    vocab: [
      { word: "tax", pos: "Noun", hi: "कर / सरकारी महसूल", en: "An amount of money paid to the government that is based on your income or the cost of goods and services you have bought.", isFootnote: true },
      { word: "complications", pos: "Noun", hi: "जटिलताएँ / कानूनी उलझनें", en: "Difficult circumstances or complex problems." },
      { word: "recognise", pos: "Verb", hi: "मान्यता देना / पहचानना", en: "Acknowledge the legal existence or validity of something." },
      { word: "ordinary use", pos: "Phrase", hi: "दैनिक / आम उपयोग", en: "Routine, regular everyday practice." }
    ],
    marginQuestions: [
      {
        num: 7,
        q: "Swaminathan's understanding of taxes is ... in sports cricket",
        analysisHi: "स्वामीनाथन की टैक्स की समझ बच्चों जैसी भोली-भाली, गलत और अतिशयोक्तिपूर्ण (innocent, naive, and completely misapplied) है। वह घर-परिवार की टैक्स की बातों को बच्चों के गली-क्रिकेट पर लागू कर रहा है!",
        analysisEn: "Swaminathan's understanding of taxes is 'naive, exaggerated, and comically misplaced' when applied to a neighborhood children's cricket club."
      },
      {
        num: 8,
        q: "What is Swaminathan trying to accomplish by telling Rajam about taxes?",
        analysisHi: "स्वामीनाथन यह दिखाना चाहता है कि वह दुनियादारी की पेचीदगियों और कानूनी समस्याओं को बहुत गहराई से समझता है। वह राजम की तरह ही महत्वपूर्ण और समझदार दिखना चाहता है।",
        analysisEn: "Swami wants to appear mature, worldly-wise, and intellectually cautious in front of Rajam, proving he can foresee complex legal problems that even Rajam overlooked."
      },
      {
        num: 9,
        q: "Underline the sentence that tells you that Swaminathan is trying to bring in his own opinions. What does this tell you about the friendship?",
        analysisHi: "वाक्य: 'It is all very well for a rich team like your Wallers. But suppose the Government demands two taxes from us?' यह दर्शाता है कि स्वामी सिर्फ राजम की हाँ में हाँ नहीं मिलाता; उनकी दोस्ती में वह बेझिझक अपनी राय और चिंताएँ रखता है।",
        analysisEn: "Sentence: 'It is all very well for a rich team like your Wallers. But suppose the Government demands two taxes from us?' This shows their friendship is not purely one-sided; Swami actively asserts his independent opinions and challenges Rajam's ideas."
      }
    ],
    questions: [
      {
        id: 601,
        qEn: "How much did Rajam say his father earned per month, and how much did the Government demand?",
        qHi: "राजम ने अपने पिता का मासिक वेतन कितना बताया, और सरकार उसमें से कितना माँगती थी?",
        opts: [
          "Father earns one thousand, Government takes five hundred (पिताजी ₹1,000 कमाते हैं और सरकार ₹500 लेती है)",
          "Father earns about five hundred, Government demands nearly two hundred and over (पिताजी का वेतन लगभग ₹500 है, सरकार ₹200 से अधिक टैक्स माँगती है)",
          "Father earns one hundred, Government demands ten rupees (पिताजी ₹100 कमाते हैं और सरकार ₹10 माँगती है)",
          "Father earns two thousand, Government demands nothing (पिताजी ₹2,000 कमाते हैं और सरकार कुछ नहीं लेती)"
        ],
        ans: 1, // B
        explEn: "Rajam stated in line 33: 'My father’s pay is about five hundred. But nearly two hundred and over is demanded by the Government.'",
        explHi: "पंक्ति 33 में राजम कहता है: 'मेरे पिताजी का वेतन लगभग 500 है, लेकिन लगभग 200 और उससे ज्यादा सरकार माँग लेती है'।"
      },
      {
        id: 602,
        qEn: "What witty counter-worry did Swaminathan raise against Rajam's idea of having two team names?",
        qHi: "राजम के दो नाम रखने के विचार पर स्वामीनाथन ने कौन सी हास्यप्रद चिंता व्यक्त की?",
        opts: [
          "Both names would be too heavy to write on bats (दोनों नाम बल्लों पर लिखने के लिए बहुत भारी होंगे)",
          "What if the Government demands two taxes from us? (कहीं सरकार हमसे दोहरे टैक्स न वसूलने लगे?)",
          "The umpires would forget which team was batting (अंपायर भूल जाएंगे कि कौन सी टीम बल्लेबाजी कर रही है)",
          "Mani would refuse to play for two different names (मणि दो अलग-अलग नामों के लिए खेलने से मना कर देगा)"
        ],
        ans: 1, // B
        explEn: "Swami objected: 'It is all very well for a rich team like your Wallers. But suppose the Government demands two taxes from us?'",
        explHi: "स्वामी ने तुरंत चिंता जताई: 'अगर सरकार ने हमसे दो टैक्स माँग लिए तब क्या होगा?'"
      }
    ]
  },
  {
    id: 7,
    titleEn: "Part 7: Endless Troubles, Sympathy for Gandhi & Defraud Doubts (Lines 39–42)",
    titleHi: "भाग 7: अंतहीन मुसीबतें, गांधीजी से सहानुभूति और धोखाधड़ी का डर (पंक्तियाँ 39–42)",
    lineRange: "Lines 39 to 42",
    badge: "His Majesty, Viceroy & Gandhi",
    contextEn: "Rajam realizes starting a team is a colossal headache! Swami wonders who the Government actually is and fears getting defrauded.",
    contextHi: "राजम को लगता है कि क्रिकेट टीम शुरू करना दुनिया का सबसे पेचीदा काम है! स्वामी सोचता है कि सरकार आखिर कौन है और पैसे किसे दें?",
    sentences: [
      { id: 42, originalLineNum: 39, en: "(Rajam realised at this point that the starting of a cricket team was the most complicated problem on earth.)", hi: "(राजम को इस मोड़ पर अहसास हुआ कि क्रिकेट टीम शुरू करना इस धरती की सबसे पेचीदा समस्या थी।)" },
      { id: 43, originalLineNum: 39, en: "He had simply expected to gather a dozen fellows on the maidan next to his compound and play, and challenge the world.", hi: "उसने तो बस यह सोचा था कि अपने अहाते (compound) के बगल वाले मैदान में एक दर्जन लड़कों को इकट्ठा करेगा, खेलेगा, और पूरी दुनिया को चुनौती देगा।" },
      { id: 44, originalLineNum: 39, en: "But here were endless troubles, starting with the name that must be unique, Government taxes, and so on.", hi: "लेकिन यहाँ तो अंतहीन मुसीबतें आ खड़ी हुई थीं—अनोखा नाम चुनने से लेकर, सरकारी टैक्सों तक।" },
      { id: 45, originalLineNum: 39, en: "The Government did not seem to know where it ought to interfere and where not.", hi: "सरकार को मानो यह पता ही नहीं था कि उसे कहाँ टाँग अड़ानी चाहिए और कहाँ नहीं।" },
      { id: 46, originalLineNum: 39, en: "He had a momentary sympathy for Gandhi—no wonder he was dead against the Government.", hi: "उसे पल भर के लिए महात्मा गांधी के प्रति गहरी सहानुभूति हुई—कोई अचरज नहीं कि वे सरकार के इतने कट्टर खिलाफ क्यों थे!" },
      { id: 47, originalLineNum: 40, en: "Swaminathan seemed to be an expert in thinking out difficulties.", hi: "स्वामीनाथन तो मानो मुश्किलें खोज निकालने में माहिर (expert) था।" },
      { id: 48, originalLineNum: 41, speaker: "Swaminathan", en: "He said, “Even if we want to pay, whom are we to pay the taxes to?”", hi: "उसने कहा, “अगर हम टैक्स देना भी चाहें, तो आखिर हम टैक्स चुकाएँगे किसे?”" },
      { id: 49, originalLineNum: 42, en: "Swaminathan thought to himself, ‘Certainly not to His Majesty or the Viceroy. Who was the Government? What if somebody should take the money and defraud us?’", hi: "स्वामीनाथन ने मन ही मन सोचा, ‘निश्चित रूप से सम्राट (His Majesty) या वायसराय (Viceroy) को तो नहीं। आखिर सरकार थी कौन? क्या होगा अगर कोई धोखे से हमारे पैसे ले ले और हमें ठग (defraud) ले?’" }
    ],
    explHi: "राजम ने तो सोचा था कि अपने घर के पास वाले मैदान में बारह लड़कों को बुलाकर मैच खेलेंगे और दुनिया को हराएँगे! पर स्वामी के तर्कों से उसे लगा कि क्रिकेट टीम बनाना दुनिया का सबसे मुश्किल काम है। अनोखा नाम, सरकारी टैक्स, कानूनी पचड़े! राजम को पहली बार महात्मा गांधी के आंदोलन की बात समझ आई कि वे सरकार के खिलाफ क्यों थे। उधर स्वामी के दिमाग में एक और खतरा कौंधा—कि अगर टैक्स दिया भी, तो किसे देंगे? क्या किंग जॉर्ज पंचम या वायसराय को? कहीं कोई जालसाज सरकारी अफसर बनकर उनके पैसे ठग (defraud) न ले जाए!",
    vocab: [
      { word: "maidan", pos: "Noun", hi: "खुला मैदान / खेल का मैदान", en: "A large open ground or playfield in a town or village.", isFootnote: true },
      { word: "compound", pos: "Noun", hi: "अहाता / चारदीवारी से घिरा क्षेत्र", en: "An area surrounded by walls that contains a group of buildings.", isFootnote: true },
      { word: "His Majesty", pos: "Proper Noun phrase", hi: "ब्रिटिश सम्राट (जॉर्ज पंचम)", en: "The ruling British monarch of that time, King George V.", isFootnote: true },
      { word: "Viceroy", pos: "Noun", hi: "वायसराय (ब्रिटिश ताज का प्रतिनिधि शासक)", en: "Someone who represented a king or queen and ruled for him or her in another country.", isFootnote: true },
      { word: "defraud", pos: "Verb", hi: "धोखा देकर पैसे हड़पना / ठगना", en: "Take or keep something illegally from a person, company and so on.", isFootnote: true }
    ],
    questions: [
      {
        id: 701,
        qEn: "Why did Rajam feel a 'momentary sympathy for Gandhi' in line 39?",
        qHi: "पंक्ति 39 में राजम को पल भर के लिए महात्मा गांधी से सहानुभूति क्यों महसूस हुई?",
        opts: [
          "Because Gandhi was also looking for team names (क्योंकि गांधीजी भी क्रिकेट टीम के नाम खोज रहे थे)",
          "Because seeing endless government taxes and interference, he understood why Gandhi opposed it (सरकार के हर जगह टैक्स और दखल को देखकर वह समझ गया कि गांधीजी इसके विरोधी क्यों थे)",
          "Because Gandhi loved playing cricket matches in Malgudi (क्योंकि गांधीजी को मालगुडी में मैच खेलना पसंद था)",
          "Because Rajam's father wanted him to join the freedom struggle (क्योंकि राजम के पिता चाहते थे कि वह आंदोलन में शामिल हो)"
        ],
        ans: 1, // B
        explEn: "Experiencing the frustration of taxes and interference, Rajam understood why Gandhi was dead against the British Government.",
        explHi: "टैक्स और सरकारी दखल की उलझनों को देखकर राजम को अहसास हुआ कि गांधीजी सरकार के इतने विरोधी क्यों थे।"
      },
      {
        id: 702,
        qEn: "According to Swaminathan's inner thoughts in line 42, what was his final suspicion about paying taxes?",
        qHi: "पंक्ति 42 में स्वामीनाथन के मन में टैक्स देने के बारे में अंतिम क्या शंका आई?",
        opts: [
          "That the bats would break before the match begins (कि मैच शुरू होने से पहले ही उनके बल्ले टूट जाएंगे)",
          "That King George V would visit Malgudi personally (कि ब्रिटिश सम्राट जॉर्ज पंचम खुद मालगुडी आएंगे)",
          "What if someone should take their money and defraud them? (कहीं कोई धोखे से उनके पैसे लेकर ठग न ले?)",
          "That the Board School boys would steal their score sheet (कि बोर्ड स्कूल के लड़के उनकी स्कोर शीट चुरा लेंगे)"
        ],
        ans: 2, // C
        explEn: "Swami worried: 'Who was the Government? What if somebody should take the money and defraud us?'",
        explHi: "स्वामी ने सोचा कि सरकार कौन है, और क्या होगा अगर कोई उनसे टैक्स के नाम पर पैसे लेकर ठगी (defraud) कर ले!"
      }
    ]
  }
];

export const examQuestions: ExamQuestion[] = [
  {
    id: 1,
    cat: "Character Psychology & Emulation",
    q: "Why did Swaminathan paste pictures of cricketers in an album and try to memorize their scores in paragraph 1?",
    hi: "अनुच्छेद 1 में स्वामीनाथन क्रिकेटरों के चित्र एल्बम में क्यों चिपकाता था और उनके स्कोर याद करने की कोशिश क्यों करता था?",
    opts: [
      "He wanted to sell the album to school teachers for pocket money (वह एल्बम को शिक्षकों को बेचकर जेबखर्च कमाना चाहता था)",
      "He secretly wished to become a professional cricket commentator (वह मन ही मन पेशेवर क्रिकेट कमेंटेटर बनना चाहता था)",
      "He was blindly imitating his confident, wealthy friend Rajam to match his status (वह अपने अमीर दोस्त राजम की बराबरी करने के लिए उसकी नकल कर रहा था)",
      "His parents forced him to study cricket statistics every evening (उसके माता-पिता उसे रोज़ शाम क्रिकेट के आंकड़े रटने को कहते थे)"
    ],
    ans: 2, // C
    explEn: "The text states Swami did so 'as Rajam did', even though he secretly did not care for the pictures, showing he merely imitated Rajam.",
    explHi: "पाठ में लिखा है कि उसने ऐसा 'राजम की देखा-देखी' किया, हालाँकि उसे खुद उन तस्वीरों की कोई खास परवाह नहीं थी।"
  },
  {
    id: 2,
    cat: "Textbook Footnote Meaning",
    q: "According to the textbook footnote, what does the word 'filched' mean?",
    hi: "पाठ्यपुस्तक के फुटनोट के अनुसार 'filched' शब्द का सटीक अर्थ क्या है?",
    opts: [
      "Stole something of little value (कम कीमत या कम मूल्य की छोटी वस्तु चुरा ली)",
      "Bought expensive goods from a foreign market (विदेशी बाजार से महंगा सामान खरीदा)",
      "Discovered hidden ancient treasures (ज़मीन में गड़ा हुआ प्राचीन खजाना खोज निकाला)",
      "Printed photographs on glossy photo-paper (चमकदार फोटो-पेपर पर तस्वीरें छापीं)"
    ],
    ans: 0, // A
    explEn: "The footnote on page 1 explicitly defines 'filched' as: 'stole something of little value'.",
    explHi: "पेज 1 के फुटनोट में साफ़ लिखा है: 'filched : stole something of little value' (कम मूल्य की चीज़ चुरा लेना)।"
  },
  {
    id: 3,
    cat: "Historical Cricketer Identification",
    q: "Which cricketer mentioned in the lesson was an Indian who played for the English cricket team?",
    hi: "पाठ में उल्लिखित कौन सा क्रिकेटर एक भारतीय था जो इंग्लैंड की क्रिकेट टीम के लिए खेलता था?",
    opts: [
      "Sir Donald Bradman (सर डोनाल्ड ब्रैडमैन - ऑस्ट्रेलियाई दिग्गज बल्लेबाज)",
      "Jack Hobbs (सर जैक हॉब्स - अंग्रेज महान बल्लेबाज)",
      "Kapil Dev (कपिल देव - 1983 के भारतीय विश्व कप कप्तान)",
      "Kumar Shri Duleepsinhji (कुमार श्री दलीपसिंहजी - भारतीय जिन्होंने इंग्लैंड के लिए खेला)"
    ],
    ans: 3, // D
    explEn: "The footnote on page 1 identifies: 'Kumar Shri Duleepsinhji, an Indian who played for the English cricket team'.",
    explHi: "पेज 1 के फुटनोट में बताया गया है कि कुमार श्री दलीपसिंहजी एक भारतीय थे जो इंग्लैंड की क्रिकेट टीम के लिए खेलते थे।"
  },
  {
    id: 4,
    cat: "Emotional Turning Point",
    q: "What confession from Rajam brought tremendous comfort and relief to Swaminathan?",
    hi: "राजम के किस कबूलनामे ने स्वामीनाथन को अत्यधिक राहत और तसल्ली दी?",
    opts: [
      "Rajam admitted that he was terrible at mathematics (राजम ने माना कि वह गणित में बहुत कमजोर है)",
      "Rajam admitted that he himself didn't know how to play cricket either (राजम ने खुद कबूल किया कि उसे भी खेलना नहीं आता)",
      "Rajam promised to give him all his cricket pictures (राजम ने अपनी सारी क्रिकेट तस्वीरें उसे देने का वादा किया)",
      "Rajam said that the Board School was cancelling their team (राजम ने बताया कि बोर्ड स्कूल अपनी टीम रद्द कर रहा है)"
    ],
    ans: 1, // B
    explEn: "Rajam admitted: 'I don't know how myself, though I collect pictures and scores', easing Swami's fear of inadequacy.",
    explHi: "जब राजम ने खुद माना कि 'मुझे खुद खेलना नहीं आता', तो स्वामी का डर और हीनभावना पूरी तरह गायब हो गए।"
  },
  {
    id: 5,
    cat: "Vocabulary in Context",
    q: "In line 4, why does the text mention that Jack Hobbs too was probably 'sceptical'?",
    hi: "पंक्ति 4 में यह क्यों कहा गया है कि जैक हॉब्स भी शुरुआत में संभवतः 'sceptical' रहे होंगे?",
    opts: [
      "Because Hobbs lacked interest in playing with wooden bats (क्योंकि हॉब्स की लकड़ी के बल्लों में कोई दिलचस्पी नहीं थी)",
      "Because Hobbs was angry at his coaches (क्योंकि हॉब्स अपने कोचों से बहुत नाराज़ थे)",
      "Because even legendary champions felt doubtful before first swinging a bat (क्योंकि महान खिलाड़ी भी पहली बार बल्ला उठाने से पहले संशय में रहे होंगे)",
      "Because Hobbs refused to play matches on rainy days (क्योंकि हॉब्स ने बारिश के दिनों में मैच खेलने से मना कर दिया था)"
    ],
    ans: 2, // C
    explEn: "The boys console themselves with the thought that even great champions like Hobbs had initial doubts (were sceptical) before starting.",
    explHi: "लड़के खुद को दिलासा देते हैं कि महान खिलाड़ी हॉब्स भी पहली बार बल्ला उठाने से पहले संशय और हिचकिचाहट (sceptical) में रहे होंगे।"
  },
  {
    id: 6,
    cat: "Slang Meaning",
    q: "According to the textbook footnote, how is the slang word 'mugs' defined?",
    hi: "पाठ्यपुस्तक के फुटनोट के अनुसार अपशब्द 'mugs' का क्या अर्थ दिया गया है?",
    opts: [
      "People who are stupid and easily deceived (मूर्ख और सीधे लोग जिन्हें आसानी से बहकाया जा सके)",
      "Clay cups used for drinking roadside tea (सड़क किनारे चाय पीने के मिट्टी के कुल्हड़)",
      "Tall players who score fast centuries (तेज़ शतक लगाने वाले लंबे कद के खिलाड़ी)",
      "Police constables patrolling the school compound (स्कूल परिसर में गश्त लगाने वाले पुलिस सिपाही)"
    ],
    ans: 0, // A
    explEn: "Page 1 footnote defines 'mugs: (old-fashioned slang) people who are stupid and easily deceived'.",
    explHi: "पेज 1 के फुटनोट के अनुसार 'mugs' का अर्थ है: मूर्ख और सीधे लोग जिन्हें आसानी से छला जा सके।"
  },
  {
    id: 7,
    cat: "Team Acronym Expansion",
    q: "What did Rajam declare that M.C.C. would stand for if they were questioned by a judge in court?",
    hi: "अदालत में जज के पूछने पर राजम ने M.C.C. का क्या पूरा नाम बताने का फैसला किया?",
    opts: [
      "Marylebone Cricket Club (मैरीलेबोन क्रिकेट क्लब - लंदन की ऐतिहासिक टीम)",
      "Madras Champion Cricketers (मद्रास चैंपियन क्रिकेटर्स - प्रेसीडेंसी क्लब)",
      "Malgudi Cricket Club (मालगुडी क्रिकेट क्लब - उनके कस्बे की स्थानीय टीम)",
      "Modern Children's Club (मॉडर्न चिल्ड्रन्स क्लब - आधुनिक बाल क्लब)"
    ],
    ans: 2, // C
    explEn: "Rajam stated: 'I shall declare before the judge that M.C.C. stands for Malgudi Cricket Club.'",
    explHi: "राजम ने कहा कि वह जज के सामने कहेगा कि M.C.C. का मतलब 'मालगुडी क्रिकेट क्लब' है।"
  },
  {
    id: 8,
    cat: "Vocabulary: Antonyms & Nuance",
    q: "Why was Swaminathan disappointed with 'Malgudi Cricket Club', describing it as 'a bit tame'?",
    hi: "स्वामीनाथन 'मालगुडी क्रिकेट क्लब' नाम से निराश क्यों था और इसे 'tame' क्यों माना?",
    opts: [
      "He felt it was too difficult to pronounce in English (उसे लगा कि अंग्रेजी में इसका उच्चारण बहुत कठिन है)",
      "He wanted a name that had only one single letter (वह ऐसा नाम चाहता था जिसमें केवल एक ही अक्षर हो)",
      "He believed it was forbidden by British government (उसका मानना था कि ब्रिटिश सरकार ने इस पर रोक लगा रखी है)",
      "While M.C.C. sounded imposing, the full name was excitingly lacking and ordinary (M.C.C. संक्षिप्त में रोबदार था, पर पूरा नाम साधारण व फीका था)"
    ],
    ans: 3, // D
    explEn: "The footnote notes 'tame: here, not interesting or exciting'. Swami wanted a dramatic, fiery name.",
    explHi: "'Tame' का अर्थ है फीका और रोमांचहीन। स्वामी को लगा कि मालगुडी क्रिकेट क्लब नाम बहुत सीधा-सादा और साधारण है।"
  },
  {
    id: 9,
    cat: "Imagined Headlines",
    q: "What dramatic vision did Rajam have when Swaminathan suggested 'Jumping Stars'?",
    hi: "जब स्वामीनाथन ने 'जंपिंग स्टार्स' नाम सुझाया, तो राजम ने क्या नाटकीय दृश्य देखा?",
    opts: [
      "THE JUMPING STARS SOUNDLY THRASHED THE BOARD HIGH SCHOOL ELEVEN (जंपिंग स्टार्स ने बोर्ड हाई स्कूल इलेवन को बुरी तरह धूल चटाई)",
      "THE JUMPING STARS WON THE WORLD CUP IN LONDON (जंपिंग स्टार्स ने लंदन में विश्व कप जीता)",
      "THE MALGUDI CLUB ARRESTED BY GOVERNMENT OFFICIALS (मालगुडी क्लब को सरकारी अफसरों ने पकड़ा)",
      "BOARD SCHOOL BEATS MALGUDI FRIENDS BY TEN WICKETS (बोर्ड स्कूल ने मालगुडी के दोस्तों को दस विकेट से हराया)"
    ],
    ans: 0, // A
    explEn: "Rajam envisioned a newspaper headline: 'THE JUMPING STARS SOUNDLY THRASHED THE BOARD HIGH SCHOOL ELEVEN.'",
    explHi: "राजम ने अखबार की यह खबर देखी: 'द जंपिंग स्टार्स ने बोर्ड हाई स्कूल इलेवन को बुरी तरह धूल चटाई'।"
  },
  {
    id: 10,
    cat: "Latin Motto Meaning",
    q: "What is the English meaning of the Latin motto 'Excelsior' as defined in the textbook footnote?",
    hi: "पाठ्यपुस्तक के फुटनोट के अनुसार लैटिन शब्द 'Excelsior' का अंग्रेजी अर्थ क्या है?",
    opts: [
      "Always victorious in battle (युद्ध के मैदान में सदा विजयी)",
      "‘Ever upward!’ (सदा ऊपर / सदैव ऊँचे उठो!)",
      "Fast as the wind (हवा की गति जैसा तीव्र)",
      "Friends until the end (अंतिम सांस तक सच्चे मित्र)"
    ],
    ans: 1, // B
    explEn: "The footnote on page 2 defines 'Excelsior: a Latin word translated into English as a motto meaning ‘Ever upward!’'.",
    explHi: "पेज 2 के फुटनोट में लिखा है: 'Excelsior: a Latin word translated into English as a motto meaning ‘Ever upward!’'."
  },
  {
    id: 11,
    cat: "Idiom Analysis",
    q: "What did Rajam mean when he asked Swaminathan, “Are you dried up?” in line 26?",
    hi: "पंक्ति 26 में जब राजम ने पूछा “Are you dried up?”, तो उसका क्या आशय था?",
    opts: [
      "Did your water bottle run out of water? (क्या तुम्हारी पानी की बोतल खाली हो गई?)",
      "Are your clothes completely dry after the rain? (क्या बारिश के बाद तुम्हारे कपड़े पूरी तरह सूख गए?)",
      "Have you run out of ideas? (क्या तुम्हारे विचार समाप्त हो गए / दिमाग खाली हो गया?)",
      "Are your throat and mouth feeling thirsty? (क्या तुम्हारे गले और मुँह में प्यास लग रही है?)"
    ],
    ans: 2, // C
    explEn: "The textbook footnote directly explains: 'Are you dried up?: Have you run out of ideas?'.",
    explHi: "किताब के फुटनोट में स्पष्ट अर्थ दिया गया है: 'Are you dried up?: Have you run out of ideas?' (क्या तुम्हारे विचार खत्म हो गए)।"
  },
  {
    id: 12,
    cat: "Character Dynamics & Friendship",
    q: "Why was Rajam so impressed with Swaminathan at the end of their name-listing session?",
    hi: "नामों की सूची बनाने के अंत में राजम, स्वामीनाथन से इतना प्रभावित क्यों हुआ?",
    opts: [
      "Swami brought fresh sweets from his house (स्वामी अपने घर से ताज़ी मिठाइयाँ लेकर आया था)",
      "Swami agreed to let Rajam be the permanent captain (स्वामी हमेशा के लिए राजम को कप्तान बनाने को तैयार था)",
      "Swami offered to pay all team expenses (स्वामी ने टीम का सारा खर्च उठाने की पेशकश की)",
      "Swami effortlessly reeled off a long list of imposing names (स्वामी ने बिना थके एक के बाद एक कई रोबदार नामों की झड़ी लगा दी थी)"
    ],
    ans: 3, // D
    explEn: "Rajam had struggled the previous night and felt fatigued, whereas Swami easily reeled off a torrent of names.",
    explHi: "राजम पिछली रात केवल दो नाम सोचकर थक गया था, जबकि स्वामी ने बिना रुके ढेर सारे रोबदार नाम धड़ाधड़ बोल दिए।"
  },
  {
    id: 13,
    cat: "Taxes & Political Humor",
    q: "Why was Swaminathan worried that their cricket team would have to pay taxes to the Government?",
    hi: "स्वामीनाथन को यह चिंता क्यों हुई कि उनकी क्रिकेट टीम को सरकार को टैक्स देना पड़ेगा?",
    opts: [
      "He believed Government taxes everything, and without tax they wouldn't get recognition (उसे लगा सरकार हर चीज़ पर टैक्स लेती है और बिना टैक्स टीम को मान्यता नहीं मिलेगी)",
      "His father was a tax inspector who warned him (उसके पिता टैक्स इंस्पेक्टर थे जिन्होंने उसे सावधान किया था)",
      "The Board School team had shown him a tax receipt (बोर्ड स्कूल की टीम ने उसे टैक्स की रसीद दिखाई थी)",
      "He wanted to purchase land for a full-sized stadium (वह पूरे आकार के स्टेडियम के लिए ज़मीन खरीदना चाहता था)"
    ],
    ans: 0, // A
    explEn: "Swami observed that 'The Government seems to tax everything in this world' and feared losing their team name without official recognition.",
    explHi: "स्वामी ने देखा था कि सरकार हर चीज़ पर टैक्स लगाती है; उसे लगा टैक्स न देने पर सरकार मान्यता नहीं देगी और नाम छिन जाएगा।"
  },
  {
    id: 14,
    cat: "Historical & Financial Details",
    q: "In line 33, what financial detail does Rajam share about his father's monthly salary and government deductions?",
    hi: "पंक्ति 33 में राजम अपने पिता के वेतन और सरकारी कटौती के बारे में क्या वित्तीय विवरण साझा करता है?",
    opts: [
      "His father earns ₹100 and pays ₹10 in municipal tax (पिताजी ₹100 कमाते हैं और ₹10 नगरपालिका कर देते हैं)",
      "His father's pay is about ₹500, and nearly ₹200 and over is demanded by Government (पिताजी का वेतन लगभग ₹500 है, और ₹200 से अधिक सरकार टैक्स माँगती है)",
      "His father earns ₹1,000 and pays no tax at all (पिताजी ₹1,000 कमाते हैं और कोई टैक्स नहीं देते)",
      "His father pays ₹500 in tax from an income of ₹2,000 (पिताजी ₹2,000 की आय में से ₹500 टैक्स देते हैं)"
    ],
    ans: 1, // B
    explEn: "Rajam states: 'My father's pay is about five hundred. But nearly two hundred and over is demanded by the Government.'",
    explHi: "राजम कहता है: 'मेरे पिताजी का वेतन लगभग ₹500 है, लेकिन ₹200 से भी ज्यादा सरकार माँग लेती है'।"
  },
  {
    id: 15,
    cat: "School Memory & Dual Names",
    q: "Which previous school did Rajam attend where the cricket team reportedly used two different names?",
    hi: "राजम पहले किस स्कूल में पढ़ता था जहाँ की क्रिकेट टीम के कथित रूप से दो नाम थे?",
    opts: [
      "Albert Mission School (अल्बर्ट मिशन स्कूल - मालगुडी)",
      "Board High School (बोर्ड हाई स्कूल - प्रतिद्वंद्वी स्कूल)",
      "Bishop Waller’s School (बिशप वॉलर्स स्कूल - जहाँ राजम पहले पढ़ता था)",
      "St. John's Academy (सेंट जॉन्स एकेडमी - कॉन्वेंट स्कूल)"
    ],
    ans: 2, // C
    explEn: "Rajam recounts: 'When I was in Bishop Waller's, we had a cricket team that we called... Cricket Eleven and Waller's Cricket Eleven.'",
    explHi: "राजम याद करता है कि जब वह बिशप वॉलर्स (Bishop Waller's) में था, तब उनकी टीम के दो नाम थे।"
  },
  {
    id: 16,
    cat: "Irony & Childhood Logic",
    q: "What humorous objection did Swaminathan raise against having two names for their team?",
    hi: "टीम के दो नाम रखने पर स्वामीनाथन ने कौन सा हास्यप्रद ऐतराज जताया?",
    opts: [
      "The scorecard would be too small to write both names (स्कोरकार्ड दोनों नाम लिखने के लिए बहुत छोटा पड़ जाएगा)",
      "Players would get confused and wear wrong jerseys (खिलाड़ी भ्रमित होकर गलत जर्सी पहन लेंगे)",
      "The cricket ball would bounce differently for each name (गेंद दोनों नामों के लिए अलग-अलग तरह से उछलेगी)",
      "What if the Government demanded two taxes from them? (कहीं सरकार उनसे दोहरे टैक्स न वसूलने लगे?)"
    ],
    ans: 3, // D
    explEn: "Swami reasoned: 'It is all very well for a rich team like your Wallers. But suppose the Government demands two taxes from us?'",
    explHi: "स्वामी ने अपनी बाल-सुलभ चिंता जताई कि अगर दो नाम रखे, तो कहीं सरकार उनसे दोहरे टैक्स न वसूलने लगे!"
  },
  {
    id: 17,
    cat: "Historical Setting & Anti-Colonial Protests",
    q: "Why did Rajam feel a 'momentary sympathy for Gandhi' in line 39?",
    hi: "पंक्ति 39 में राजम को महात्मा गांधी के प्रति पल भर के लिए सहानुभूति क्यों हुई?",
    opts: [
      "Seeing endless taxes and interference, he understood why Gandhi opposed Government (सरकार के अंतहीन टैक्स और दखल को देखकर वह समझ गया कि गांधीजी इसके खिलाफ क्यों थे)",
      "Because Gandhi was a famous cricket batsman in South Africa (क्योंकि गांधीजी दक्षिण अफ्रीका में मशहूर बल्लेबाज थे)",
      "Because Gandhi had written a letter to Malgudi Cricket Club (क्योंकि गांधीजी ने मालगुडी क्रिकेट क्लब को पत्र भेजा था)",
      "Because Rajam wanted Gandhi to coach their team on maidan (क्योंकि राजम चाहता था कि गांधीजी मैदान में उन्हें कोचिंग दें)"
    ],
    ans: 0, // A
    explEn: "Rajam felt the Government poked its nose everywhere and taxed everything, making him understand why Gandhi opposed the colonial regime.",
    explHi: "सरकार के बेवजह दखल और टैक्सों की झंझट देखकर राजम को समझ आया कि गांधीजी अंग्रेजी सरकार के इतने खिलाफ क्यों थे।"
  },
  {
    id: 18,
    cat: "Colonial Figures & Definitions",
    q: "Who was 'His Majesty' referred to in Swaminathan's thoughts during the 1930s British Raj?",
    hi: "1930 के दशक के ब्रिटिश राज के दौरान स्वामीनाथन के विचारों में 'हिज़ मेजेस्टी' किसे कहा गया था?",
    opts: [
      "The school headmaster of Malgudi (मालगुडी स्कूल के मुख्य अध्यापक)",
      "The ruling British monarch of that time, King George V (उस समय के ब्रिटिश सम्राट, किंग जॉर्ज पंचम)",
      "The chief priest of the Malgudi temple (मालगुडी मंदिर के मुख्य पुजारी)",
      "The captain of the Marylebone Cricket Club (मैरीलेबोन क्रिकेट क्लब के कप्तान)"
    ],
    ans: 1, // B
    explEn: "The footnote on page 3 explicitly confirms: 'Swaminathan is referring to the ruling British monarch of that time, King George V.'",
    explHi: "पेज 3 के फुटनोट में स्पष्ट बताया गया है कि यह उस समय के ब्रिटिश सम्राट जॉर्ज पंचम (King George V) के संदर्भ में है।"
  },
  {
    id: 19,
    cat: "Textbook Footnote: Legal Terminology",
    q: "According to the textbook footnote, what does the word 'defraud' mean?",
    hi: "पाठ्यपुस्तक के फुटनोट के अनुसार 'defraud' शब्द का क्या अर्थ है?",
    opts: [
      "Award a medal of honor to brave citizens (बहादुर नागरिकों को सम्मान पदक प्रदान करना)",
      "Calculate mathematical percentages correctly (गणितीय प्रतिशत की सही गणना करना)",
      "Take or keep something illegally from a person or company (किसी व्यक्ति या संस्था से गैरकानूनी रूप से पैसे या संपत्ति हड़प लेना)",
      "Sign an official agreement in front of a judge (जज के सामने आधिकारिक समझौते पर हस्ताक्षर करना)"
    ],
    ans: 2, // C
    explEn: "The footnote on page 3 defines 'defraud: take or keep something illegally from a person, company and so on'.",
    explHi: "पेज 3 के फुटनोट में 'defraud' का अर्थ दिया गया है: किसी व्यक्ति या संस्था से अवैध रूप से पैसे या संपत्ति हड़प लेना या ठगना।"
  },
  {
    id: 20,
    cat: "Character Appraisal",
    q: "In line 40, what particular talent does the narrator humorously attribute to Swaminathan?",
    hi: "पंक्ति 40 में कहानीकार हास्यप्रद अंदाज़ में स्वामीनाथन की किस प्रतिभा का वर्णन करता है?",
    opts: [
      "He was an expert in hitting sixes over compound walls (वह अहाते की दीवार के पार छक्के मारने में माहिर था)",
      "He was an expert in memorizing historical dates (वह ऐतिहासिक तिथियाँ याद रखने में माहिर था)",
      "He was an expert in drawing logos with ink (वह स्याही से लोगो बनाने में माहिर था)",
      "He seemed to be an expert in thinking out difficulties (वह काल्पनिक मुश्किलें और अड़चनें ढूंढ निकालने में माहिर था)"
    ],
    ans: 3, // D
    explEn: "Narrator remarks in line 40: 'Swaminathan seemed to be an expert in thinking out difficulties.'",
    explHi: "कहानीकार लिखता है: 'स्वामीनाथन तो मानो मुश्किलें और अड़चनें खोज निकालने में माहिर (expert) था'।"
  },
  {
    id: 21,
    cat: "Cricket History: Activity 1",
    q: "Why is the year 1983 considered a monumental milestone in the history of Indian cricket (Activity 1)?",
    hi: "भारतीय क्रिकेट के इतिहास में वर्ष 1983 को एक ऐतिहासिक मील का पत्थर क्यों माना जाता है (गतिविधि 1)?",
    opts: [
      "India won its historic first-ever World Cup under Kapil Dev at Lord's (भारत ने कपिल देव के नेतृत्व में लॉर्ड्स में अपना पहला विश्व कप जीता)",
      "The first test match was played in the town of Malgudi (मालगुडी कस्बे में पहला टेस्ट मैच खेला गया था)",
      "Cricket bats were manufactured for first time in India (भारत में पहली बार क्रिकेट के बल्ले बनाए गए थे)",
      "Marylebone Cricket Club played a friendly match in Madras (एम.सी.सी. ने मद्रास में एक दोस्ताना मैच खेला था)"
    ],
    ans: 0, // A
    explEn: "In 1983, Kapil Dev led India to their historic maiden Prudential Cricket World Cup triumph by defeating the mighty West Indies at Lord's.",
    explHi: "1983 में कपिल देव के नेतृत्व में भारत ने लॉर्ड्स के मैदान पर वेस्टइंडीज को हराकर पहली बार क्रिकेट विश्व कप जीता था।"
  },
  {
    id: 22,
    cat: "Grammar: Parts of Speech",
    q: "In the phrase “soundly thrash”, what part of speech is the word 'soundly'?",
    hi: "वाक्यांश “soundly thrash” में 'soundly' शब्द व्याकरण की दृष्टि से क्या है?",
    opts: [
      "Noun (संज्ञा - किसी व्यक्ति, वस्तु या स्थान का नाम)",
      "Adverb (क्रियाविशेषण - जो क्रिया 'thrash' की विशेषता बताता है)",
      "Preposition (संबंधबोधक - जो संज्ञा के पूर्व संबंध दर्शाता है)",
      "Interjection (विस्मयादिबोधक - जो मन के अचानक भाव प्रकट करता है)"
    ],
    ans: 1, // B
    explEn: "'Soundly' modifies the verb 'thrash', describing how the action is performed, which makes it an Adverb.",
    explHi: "'Soundly' क्रिया 'thrash' की विशेषता बता रहा है कि कैसे हराया जाएगा, अतः यह एक क्रियाविशेषण (Adverb) है।"
  },
  {
    id: 23,
    cat: "Grammar: Verb Tense & Form",
    q: "In line 1, which verb form is used in “He ______ pictures of cricket players” to show a past action?",
    hi: "पंक्ति 1 में भूतकाल की क्रिया दर्शाने के लिए कौन सा रूप प्रयुक्त हुआ है?",
    opts: [
      "filching (वर्तमान कृदंत - क्रिया का निरंतर रूप)",
      "filched (सामान्य भूतकाल - Past tense of filch)",
      "filch (मूल क्रिया - Base form of verb)",
      "has filched (पूर्ण वर्तमान काल - Present perfect tense)"
    ],
    ans: 1, // B
    explEn: "The past tense form 'filched' is used in the narrative to describe past habitual action.",
    explHi: "भूतकाल की घटना बताने के लिए क्रिया का Past Tense रूप 'filched' प्रयुक्त हुआ है।"
  },
  {
    id: 24,
    cat: "Literary Contrast & Irony",
    q: "What is the central comic irony in Rajam and Swaminathan's grand plans to start a cricket club?",
    hi: "राजम और स्वामीनाथन की क्रिकेट क्लब शुरू करने की भव्य योजनाओं में मुख्य हास्यप्रद विडंबना क्या है?",
    opts: [
      "They have already won ten tournaments without knowing it (वे बिना जाने पहले ही दस टूर्नामेंट जीत चुके हैं)",
      "The school headmaster is secretly the captain of their team (स्कूल के हेडमास्टर चुपके से उनकी टीम के कप्तान हैं)",
      "They bought all their equipment from London using money (उन्होंने लंदन से सारा सामान पैसे देकर मंगा लिया था)",
      "Neither knows how to play, yet they fret over lawsuits, headlines, and taxes (दोनों को खेलना तक नहीं आता, फिर भी वे कोर्ट केस, सुर्खियों और सरकारी टैक्स को लेकर उलझे हैं)"
    ],
    ans: 3, // D
    explEn: "Neither boy knows how to play or has equipment, yet they earnestly dispute lawsuits from English clubs, two names, and Viceroy taxes!",
    explHi: "दोनों में से किसी को भी खेलना नहीं आता और न ही कोई सामान है, फिर भी वे कोर्ट केस, अखबार की सुर्खियों और सरकारी टैक्सों को लेकर गंभीर बहस कर रहे हैं!"
  },
  {
    id: 25,
    cat: "Author & Origin of Text",
    q: "From which famous novel by R. K. Narayan is this excerpt 'The M.C.C.' taken?",
    hi: "यह पाठ 'The M.C.C.' आर. के. नारायण के किस प्रसिद्ध उपन्यास से लिया गया है?",
    opts: [
      "The Guide (द गाइड - प्रसिद्ध उपन्यास)",
      "Swami and Friends (स्वामी एंड फ्रेंड्स - 1930 में लिखा गया पहला उपन्यास)",
      "Malgudi Days (मालगुडी डेज़ - कहानियों का संग्रह)",
      "The English Teacher (द इंग्लिश टीचर - शिक्षक पर केंद्रित उपन्यास)"
    ],
    ans: 1, // B
    explEn: "As stated in the author box on page 1, this excerpt is from R. K. Narayan's first novel, 'Swami and Friends', written in 1930.",
    explHi: "पेज 1 के लेखक परिचय में स्पष्ट लिखा है कि यह अंश 1930 में लिखे गए उनके पहले उपन्यास 'स्वामी एंड फ्रेंड्स' (Swami and Friends) से लिया गया है।"
  }
];
