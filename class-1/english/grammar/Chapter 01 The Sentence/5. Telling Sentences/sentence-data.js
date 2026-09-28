// Lesson Data for "5. Telling Sentences" (Class 1 English Grammar)

export const characters = [
  {
    name: "Mila",
    role: "मीला (फार्म की खोजी बालिका)",
    avatar: "👧",
    desc: "A cheerful girl who explores the sunny farm and tells everyone what the animals are doing.",
    badge: "Story Teller"
  },
  {
    name: "Leo",
    role: "लियो (पूर्ण विराम जासूस भाई)",
    avatar: "🧒",
    desc: "Mila's brother who checks that every telling sentence wears a Capital letter and ends with a Full stop.",
    badge: "Full Stop Detective"
  },
  {
    name: "Barnaby",
    role: "बार्नाबी (वफ़ादार पालतू कुत्ता)",
    avatar: "🐕",
    desc: "A friendly golden farm dog who barks happily and guards the red barn.",
    badge: "Farm Friend"
  },
  {
    name: "Daisy",
    role: "डेज़ी (प्यारी दुधारू गाय)",
    avatar: "🐄",
    desc: "A gentle cow who chews sweet green grass and gives fresh milk every morning.",
    badge: "Gentle Helper"
  }
];

export const warmupItems = [
  {
    id: 1,
    badge: "Check 01 · Telling Sentence",
    text: "Mila sees a white sheep.",
    pron: "मीला सीज़ अ व्हाइट शीप।",
    mean: "मीला एक सफेद भेड़ देखती है।",
    status: "✅ Telling Sentence (बात बताने वाला वाक्य)",
    statusHi: "यह बताता है कि मीला क्या देखती है और अंत में Full stop (.) है।",
    isTelling: true
  },
  {
    id: 2,
    badge: "Check 02 · Telling Sentence",
    text: "The cow eats green grass.",
    pron: "द काउ ईट्स ग्रीन ग्रास।",
    mean: "गाय हरी घास खाती है।",
    status: "✅ Telling Sentence (कथन / Statement)",
    statusHi: "यह एक सच्ची बात (तथ्य) बताता है और अंत में Full stop (.) है।",
    isTelling: true
  },
  {
    id: 3,
    badge: "Check 03 · Asking Sentence",
    text: "Where is the duck?",
    pron: "व्हेर इज़ द डक?",
    mean: "बत्तख कहाँ है?",
    status: "❓ Asking Sentence (प्रश्न पूछने वाला वाक्य)",
    statusHi: "यह सवाल पूछ रहा है और अंत में '?' है—यह Telling sentence नहीं है!",
    isTelling: false
  }
];

export const machineItems = [
  {
    text: "The horse runs fast.",
    type: "telling",
    verdict: "✅ TELLING SENTENCE! / बात बताने वाला वाक्य!",
    reason: "Tells a clear fact, starts with Capital 'T', and ends with a Full stop (.).",
    reasonHi: "यह एक तथ्य बताता है, बड़ा 'T' है और अंत में Full stop (.) है।",
    pron: "द हॉर्स रन्स फास्ट।",
    mean: "घोड़ा तेज़ दौड़ता है।"
  },
  {
    text: "Do you like horses?",
    type: "asking",
    verdict: "❓ ASKING SENTENCE (QUESTION)! / प्रश्नवाचक वाक्य!",
    reason: "Asks a question and ends with a Question Mark (?). NOT a telling sentence!",
    reasonHi: "यह सवाल पूछ रहा है और अंत में '?' है। यह Telling sentence नहीं है!",
    pron: "डू यू लाइक हॉर्सिज़?",
    mean: "क्या तुम्हें घोड़े पसंद हैं?"
  },
  {
    text: "Barnaby barks at the gate.",
    type: "telling",
    verdict: "✅ TELLING SENTENCE! / बात बताने वाला वाक्य!",
    reason: "Tells what Barnaby does, starts with Capital 'B', and ends with a Full stop (.).",
    reasonHi: "यह बताता है कि बार्नाबी क्या करता है। अंत में Full stop है।",
    pron: "बार्नाबी बार्क्स ऐट द गेट।",
    mean: "बार्नाबी फाटक पर भौंकता है।"
  },
  {
    text: "Where is Barnaby?",
    type: "asking",
    verdict: "❓ ASKING SENTENCE (QUESTION)! / प्रश्नवाचक वाक्य!",
    reason: "Asks where the dog is. Ends with '?'. It is an Asking Sentence.",
    reasonHi: "यह पूछता है कि कुत्ता कहाँ है। यह प्रश्न है, कथन नहीं।",
    pron: "व्हेर इज़ बार्नाबी?",
    mean: "बार्नाबी कहाँ है?"
  },
  {
    text: "The hen lays brown eggs.",
    type: "telling",
    verdict: "✅ TELLING SENTENCE! / बात बताने वाला वाक्य!",
    reason: "Shares information about the hen. Ends with a Full stop (.).",
    reasonHi: "मुर्गी के बारे में जानकारी देता है और अंत में पूर्ण विराम है।",
    pron: "द हेन लेज़ ब्राउन एग्स।",
    mean: "मुर्गी भूरे अंडे देती है।"
  },
  {
    text: "Cows give fresh milk.",
    type: "telling",
    verdict: "✅ TELLING SENTENCE! / बात बताने वाला वाक्य!",
    reason: "Tells a true fact with Capital 'C' and Full stop (.).",
    reasonHi: "एक सत्य तथ्य बताता है—शुरुआत बड़े अक्षर से और अंत फुल स्टॉप से।",
    pron: "काउज़ गिव फ्रेश मिल्क।",
    mean: "गायें ताज़ा दूध देती हैं।"
  },
  {
    text: "runs across the field",
    type: "phrase",
    verdict: "❌ INCOMPLETE PHRASE! / अधूरा शब्द-समूह!",
    reason: "Missing Naming Part! Who runs across the field? Not a complete sentence.",
    reasonHi: "नेमिंग पार्ट गायब है! मैदान में कौन दौड़ता है? पता नहीं।",
    pron: "रन्स अक्रॉस द फील्ड।",
    mean: "मैदान में दौड़ता है (कौन? अधूरा है)।"
  },
  {
    text: "Can ducks swim?",
    type: "asking",
    verdict: "❓ ASKING SENTENCE (QUESTION)! / प्रश्नवाचक वाक्य!",
    reason: "Asks for information and ends with '?'.",
    reasonHi: "सवाल पूछता है कि क्या बत्तखें तैर सकती हैं।",
    pron: "कैन डक्स स्विम?",
    mean: "क्या बत्तखें तैर सकती हैं?"
  },
  {
    text: "Ducks swim in the pond.",
    type: "telling",
    verdict: "✅ TELLING SENTENCE! / बात बताने वाला वाक्य!",
    reason: "Tells what ducks do, with Capital 'D' and Full stop (.).",
    reasonHi: "बताता है कि बत्तखें क्या करती हैं। पूरा और सही वाक्य।",
    pron: "डक्स स्विम इन द पॉन्ड।",
    mean: "बत्तखें तालाब में तैरती हैं।"
  },
  {
    text: "the red barn is big",
    type: "error",
    verdict: "⚠️ PUNCTUATION ERROR! / विराम चिन्ह की गलती!",
    reason: "Missing Capital letter at the start ('t' should be 'T') and missing Full stop (.) at the end!",
    reasonHi: "शुरुआत में बड़ा 'T' और अंत में Full stop (.) होना चाहिए।",
    pron: "द रेड बार्न इज़ बिग।",
    mean: "लाल बाड़ा बड़ा है (नियम: बड़ा T और अंत में . होना चाहिए)।"
  }
];

export const scenes = [
  {
    id: "scene-1",
    num: "01",
    title: "Morning at the Sunny Farm",
    titleHi: "फार्म पर सुनहरी सुबह · तथ्य और जानकारी बताना",
    emoji: "☀️ 🌾 🚜 🐄",
    aside: "Mila points to everything she sees. Each sentence tells a complete fact with a full stop at the end!",
    lines: [
      {
        speaker: "Mila 👧",
        no: "01",
        en: "The morning sun warms the green grass.",
        pron: "द मॉर्निंग सन वॉर्म्स द ग्रीन ग्रास।",
        mean: "सुबह का सूरज हरी घास को गर्म करता है।",
        type: "Telling Sentence ✓ (Tells a fact · Full stop .)"
      },
      {
        speaker: "Leo 🧒",
        no: "02",
        en: "Daisy the cow chews her breakfast.",
        pron: "डेज़ी द काउ चूज़ हर ब्रेकफ़स्ट।",
        mean: "डेज़ी गाय अपना नाश्ता चबाती है।",
        type: "Telling Sentence ✓ (Tells what Daisy does · Full stop .)"
      },
      {
        speaker: "Mila 👧",
        no: "03",
        en: "Barnaby barks a cheerful hello.",
        pron: "बार्नाबी बार्क्स अ चीरफ़ुल हेलो।",
        mean: "बार्नाबी खुशी से भौंककर नमस्ते करता है।",
        type: "Telling Sentence ✓ (Tells what the dog does · Full stop .)"
      },
      {
        speaker: "Leo 🧒",
        no: "04",
        en: "The farmer drives a blue tractor.",
        pron: "द फ़ार्मर ड्राइव्स अ ब्लू ट्रैक्टर।",
        mean: "किसान नीला ट्रैक्टर चलाता है।",
        type: "Telling Sentence ✓ (Tells what the farmer does · Full stop .)"
      }
    ]
  },
  {
    id: "scene-2",
    num: "02",
    title: "Telling vs. Asking: Dot vs. Question Mark",
    titleHi: "बताना बनाम पूछना · फुल स्टॉप बनाम प्रश्न चिन्ह",
    emoji: "🔍 ❓ 🛑 💡",
    aside: "Leo shows the difference: Telling sentences end with a Full Stop (.), while questions end with a Question Mark (?)!",
    lines: [
      {
        speaker: "Mila 👧",
        no: "05",
        en: "Do sheep give soft wool?",
        pron: "डू शीप गिव सॉफ्ट वूल?",
        mean: "क्या भेड़ें मुलायम ऊन देती हैं?",
        type: "❓ Asking Sentence (Question · Ends with ?)"
      },
      {
        speaker: "Leo 🧒",
        no: "06",
        en: "Sheep give warm and soft wool.",
        pron: "शीप गिव वॉर्म ऐण्ड सॉफ्ट वूल।",
        mean: "भेड़ें गर्म और मुलायम ऊन देती हैं।",
        type: "Telling Sentence ✓ (Answers by telling a fact · Ends with .)"
      },
      {
        speaker: "Mila 👧",
        no: "07",
        en: "Where does the white horse sleep?",
        pron: "व्हेर डज़ द व्हाइट हॉर्स स्लीप?",
        mean: "सफेद घोड़ा कहाँ सोता है?",
        type: "❓ Asking Sentence (Asks where · Ends with ?)"
      },
      {
        speaker: "Leo 🧒",
        no: "08",
        en: "The white horse sleeps in the cozy barn.",
        pron: "द व्हाइट हॉर्स स्लीप्स इन द कोज़ी बार्न।",
        mean: "सफेद घोड़ा आरामदायक बाड़े में सोता है।",
        type: "Telling Sentence ✓ (Tells where · Ends with .)"
      }
    ]
  },
  {
    id: "scene-3",
    num: "03",
    title: "The Golden Full Stop Rule",
    titleHi: "सुनहरा नियम · फुल स्टॉप की शक्ति",
    emoji: "🔤 🛑 ✍️ ✨",
    aside: "Every telling sentence must start with a Capital letter and finish with a neat Full Stop (.)!",
    lines: [
      {
        speaker: "Leo 🧒",
        no: "09",
        en: "We begin with a big capital letter.",
        pron: "वी बिगिन विथ अ बिग कैपिटल लेटर।",
        mean: "हम हमेशा एक बड़े अक्षर (Capital letter) से शुरू करते हैं।",
        type: "Rule 1 ✓ (Capital start like 'W')"
      },
      {
        speaker: "Mila 👧",
        no: "10",
        en: "We always put a full stop at the very end.",
        pron: "वी ऑलवेज़ पुट अ फुल स्टॉप ऐट द वेरी एन्ड।",
        mean: "हम हमेशा सबसे अंत में एक फुल स्टॉप (.) लगाते हैं।",
        type: "Rule 2 ✓ (The dot . tells readers the thought is finished)"
      },
      {
        speaker: "Leo 🧒",
        no: "11",
        en: "Little yellow chicks peck at corn seeds.",
        pron: "लिटिल येलो चिक्स पेक ऐट कॉर्न सीड्स।",
        mean: "छोटे पीले चूज़े मकई के दाने चुगते हैं।",
        type: "Telling Sentence ✓ (Capital 'L' + Full stop .)"
      },
      {
        speaker: "Mila 👧",
        no: "12",
        en: "A telling sentence shares our joyful world.",
        pron: "अ टेलिंग सेन्टेन्स शेअर्स आर जॉयफ़ुल वर्ल्ड।",
        mean: "बात बताने वाला वाक्य हमारी सुंदर दुनिया की जानकारी देता है।",
        type: "Telling Sentence ✓ (Complete and beautiful!)"
      }
    ]
  },
  {
    id: "scene-4",
    num: "04",
    title: "Telling About Farm Friends",
    titleHi: "फार्म के दोस्तों के बारे में बताना",
    emoji: "🐕 🐈 🦆 💖",
    aside: "Practice speaking full telling sentences out loud to describe people, pets, and nature!",
    lines: [
      {
        speaker: "Mila 👧",
        no: "13",
        en: "Barnaby loves running in the tall grass.",
        pron: "बार्नाबी लव्ज़ रनिंग इन द टॉल ग्रास।",
        mean: "बार्नाबी को लंबी घास में दौड़ना बहुत पसंद है।",
        type: "Telling Sentence ✓ (Tells about Barnaby)"
      },
      {
        speaker: "Leo 🧒",
        no: "14",
        en: "A fluffy cat naps on the warm wooden fence.",
        pron: "अ फ्लफ़ी कैट नैप्स ऑन द वॉर्म वुडन फ़ेन्स।",
        mean: "एक रोएंदार बिल्ली गरम लकड़ी की बाड़ पर झपकी लेती है।",
        type: "Telling Sentence ✓ (Tells about the cat)"
      },
      {
        speaker: "Mila 👧",
        no: "15",
        en: "White ducks glide across the silver pond.",
        pron: "व्हाइट डक्स ग्लाइड अक्रॉस द सिल्वर पॉन्ड।",
        mean: "सफेद बत्तखें चाँदी जैसे तालाब में तैरती हैं।",
        type: "Telling Sentence ✓ (Tells about the ducks)"
      },
      {
        speaker: "Leo 🧒",
        no: "16",
        en: "All our farm friends are happy today.",
        pron: "ऑल आर फ़ार्म फ्रेन्ड्स आर हैप्पी टुडे।",
        mean: "हमारे सभी फार्म के दोस्त आज बहुत खुश हैं।",
        type: "Telling Sentence ✓ (Complete statement with .)"
      }
    ]
  }
];

export const comparisonTable = [
  {
    telling: "The sheep has soft wool.",
    tellingMean: "भेड़ का ऊन मुलायम होता है।",
    asking: "Does the sheep have soft wool?",
    askingMean: "क्या भेड़ का ऊन मुलायम होता है?",
    note: "Telling sentence gives the fact (.) / Asking sentence asks a question (?)"
  },
  {
    telling: "Leo rides a brown pony.",
    tellingMean: "लियो भूरे टट्टू की सवारी करता है।",
    asking: "Can Leo ride a brown pony?",
    askingMean: "क्या लियो भूरे टट्टू की सवारी कर सकता है?",
    note: "Telling tells what Leo does (.) / Asking asks if he can (?)"
  },
  {
    telling: "Daisy eats sweet green grass.",
    tellingMean: "डेज़ी मीठी हरी घास खाती है।",
    asking: "What does Daisy eat?",
    askingMean: "डेज़ी क्या खाती है?",
    note: "Telling gives the answer (.) / Asking asks what (?)"
  },
  {
    telling: "Ducks swim in the cool pond.",
    tellingMean: "बत्तखें ठंडे तालाब में तैरती हैं।",
    asking: "Where do ducks swim?",
    askingMean: "बत्तखें कहाँ तैरती हैं?",
    note: "Telling tells the place (.) / Asking asks where (?)"
  },
  {
    telling: "Barnaby guards the red barn.",
    tellingMean: "बार्नाबी लाल बाड़े की रखवाली करता है।",
    asking: "Who guards the red barn?",
    askingMean: "लाल बाड़े की रखवाली कौन करता है?",
    note: "Telling names the dog and action (.) / Asking asks who (?)"
  },
  {
    telling: "The sun warms the whole farm.",
    tellingMean: "सूरज पूरे फार्म को गर्म करता है।",
    asking: "Is the sun warm today?",
    askingMean: "क्या आज धूप गर्म है?",
    note: "Telling shares information (.) / Asking asks for confirmation (?)"
  }
];

export const vocabularyWords = [
  {
    word: "telling sentence",
    pron: "टेलिंग सेन्टेन्स",
    mean: "बात बताने वाला वाक्य (Statement)",
    example: "A telling sentence tells something."
  },
  {
    word: "statement",
    pron: "स्टेटमेन्ट",
    mean: "कथन / साधारण जानकारी",
    example: "A statement ends with a period."
  },
  {
    word: "full stop",
    pron: "फुल स्टॉप",
    mean: "पूर्ण विराम चिन्ह (.)",
    example: "Put a full stop at the end."
  },
  {
    word: "capital",
    pron: "कैपिटल",
    mean: "बड़ा अक्षर (A, B, C...)",
    example: "Start with a capital letter."
  },
  {
    word: "fact",
    pron: "फ़ैक्ट",
    mean: "सत्य बात या सच्चाई",
    example: "The cow gives milk is a fact."
  },
  {
    word: "farm",
    pron: "फ़ार्म",
    mean: "खेत या पशुशाला",
    example: "We visit the sunny farm."
  },
  {
    word: "horse",
    pron: "हॉर्स",
    mean: "घोड़ा (दौड़ने वाला जानवर)",
    example: "The horse runs fast."
  },
  {
    word: "sheep",
    pron: "शीप",
    mean: "भेड़ (ऊन देने वाली)",
    example: "The sheep has warm wool."
  },
  {
    word: "cow",
    pron: "काउ",
    mean: "गाय (दूध देने वाली)",
    example: "The cow eats sweet grass."
  },
  {
    word: "barks",
    pron: "बार्क्स",
    mean: "भौंकता है (कुत्ते की आवाज़)",
    example: "Barnaby barks at the gate."
  },
  {
    word: "fresh",
    pron: "फ्रेश",
    mean: "ताज़ा और शुद्ध",
    example: "She drinks fresh milk."
  },
  {
    word: "morning",
    pron: "मॉर्निंग",
    mean: "सुबह / प्रभात",
    example: "Birds sing in the morning."
  }
];
