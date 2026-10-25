export interface TestQuestion {
  id: number;
  unit: string;
  label: string;
  q: string;
  hi: string;
  opts: string[];
  ans: number;
  expl: string;
  visualType?: 'numberline' | 'facttriangle' | 'patterntable' | 'stripes' | 'paintcans' | 'missingaddend' | 'candles' | 'pumpkins';
  visualData?: any;
}

export const test01: TestQuestion[] = [
  {
    id: 1,
    unit: 'countback',
    label: 'Sheet 3-1 · Problem 1',
    q: "Tanya has 12 blocks. She gives 5 away. How can you count back on a number line to find out how many she has now?",
    hi: "तान्या के पास 12 ब्लॉक हैं और वह 5 दे देती है। नंबर लाइन पर गिनकर बताएं कि उसके पास अब कितने ब्लॉक हैं?",
    opts: [
      "Start at 12. Count back 5 to reach 7 (12 - 5 = 7 blocks)",
      "Start at 12. Count back 7 to reach 5 (12 - 7 = 5 blocks)",
      "Start at 5. Count forward 7 to reach 12 (5 + 7 = 12 blocks)",
      "Start at 0. Count forward 5 to reach 5 blocks"
    ],
    ans: 0,
    expl: "वर्कशीट 3-1, प्रश्न 1: 12 से शुरू करें और 5 कदम पीछे गिनें (11, 10, 9, 8, 7)। वह 7 पर पहुँचती है। 12 - 5 = 7 ब्लॉक!",
    visualType: 'numberline',
    visualData: { start: 12, jump: 5, end: 7, label: 'Tanya: 12 - 5 = 7' }
  },
  {
    id: 2,
    unit: 'countback',
    label: 'Sheet 3-1 · Problem 2',
    q: "Ricky has 10 oranges. He uses 6 to make juice. How can you count back to find out how many are left?",
    hi: "रिकी के पास 10 संतरे हैं। वह जूस बनाने के लिए 6 का उपयोग करता है। नंबर लाइन पर गिनकर बताएं कि कितने बचे हैं?",
    opts: [
      "Start at 10. Count back 6 to reach 4 (10 - 6 = 4 oranges left)",
      "Start at 10. Count back 4 to reach 6 (10 - 4 = 6 oranges left)",
      "Start at 6. Count forward 4 to reach 10 oranges",
      "Start at 10. Count back 5 to reach 5 oranges"
    ],
    ans: 0,
    expl: "वर्कशीट 3-1, प्रश्न 2: 10 से शुरू करें, 6 कदम पीछे जाएँ: 10 - 6 = 4 संतरे बचे!",
    visualType: 'numberline',
    visualData: { start: 10, jump: 6, end: 4, label: 'Ricky: 10 - 6 = 4' }
  },
  {
    id: 3,
    unit: 'countback',
    label: 'Sheet 3-1 · Problem 3',
    q: "Madison's class needs to plant 10 trees. They plant 3 trees. Write a number sentence to tell how many trees are left to plant.",
    hi: "मैडिसन की कक्षा को 10 पेड़ लगाने हैं। वे 3 पेड़ लगाते हैं। बचे हुए पेड़ों के लिए सही संख्या वाक्य क्या है?",
    opts: [
      "10 - 3 = 7 trees left to plant",
      "10 - 7 = 3 trees left to plant",
      "10 + 3 = 13 trees left to plant",
      "7 + 3 = 10 trees left to plant"
    ],
    ans: 0,
    expl: "कुल 10 पेड़ चाहिए, 3 लग चुके हैं। 10 - 3 = 7 पेड़ अभी लगाना बाकी हैं।",
    visualType: 'numberline',
    visualData: { start: 10, jump: 3, end: 7, label: 'Madison: 10 - 3 = 7' }
  },
  {
    id: 4,
    unit: 'countback',
    label: 'Sheet 3-1 · Problem 4',
    q: "Hank needs to wash 9 windows. He washes 6 windows. Write a number sentence to tell how many windows are left to wash.",
    hi: "हैंक को 9 खिड़कियाँ धोनी हैं। वह 6 खिड़कियाँ धोता है। बची हुई खिड़कियों के लिए संख्या वाक्य क्या है?",
    opts: [
      "9 - 6 = 3 windows left",
      "9 - 3 = 6 windows left",
      "6 + 3 = 9 windows left",
      "9 + 6 = 15 windows left"
    ],
    ans: 0,
    expl: "वर्कशीट 3-1, प्रश्न 4: 9 खिड़कियों में से 6 धुल गईं ➔ 9 - 6 = 3 खिड़कियाँ बाकी हैं।",
    visualType: 'numberline',
    visualData: { start: 9, jump: 6, end: 3, label: 'Hank: 9 - 6 = 3' }
  },
  {
    id: 5,
    unit: 'countback',
    label: 'Sheet 3-1 · Problem 5',
    q: "Twelve cars and four trucks come to the car wash. How many more cars than trucks are at the car wash?",
    hi: "कार वॉश में 12 कारें और 4 ट्रक आते हैं। ट्रकों की तुलना में कितनी अधिक कारें हैं?",
    opts: [
      "8 more cars (12 - 4 = 8)",
      "16 more cars (12 + 4 = 16)",
      "6 more cars (10 - 4 = 6)",
      "7 more cars (11 - 4 = 7)"
    ],
    ans: 0,
    expl: "वर्कशीट 3-1, प्रश्न 5: तुलनात्मक अंतर 12 - 4 = 8 कारें अधिक हैं!",
    visualType: 'numberline',
    visualData: { start: 12, jump: 4, end: 8, label: 'Car Wash: 12 - 4 = 8' }
  },
  {
    id: 6,
    unit: 'countback',
    label: 'Sheet 3-1 · Problem 8',
    q: "A paper clip holder has twelve clips. Alex uses five paper clips. How many paper clips are left?",
    hi: "पेपर क्लिप होल्डर में 12 क्लिप हैं। एलेक्स 5 क्लिप का उपयोग करता है। कितने पेपर क्लिप बचे हैं?",
    opts: [
      "7 paper clips (12 - 5 = 7)",
      "8 paper clips (13 - 5 = 8)",
      "6 paper clips (11 - 5 = 6)",
      "17 paper clips (12 + 5 = 17)"
    ],
    ans: 0,
    expl: "वर्कशीट 3-1, प्रश्न 8: 12 - 5 = 7 पेपर क्लिप बचे हैं।",
    visualType: 'numberline',
    visualData: { start: 12, jump: 5, end: 7, label: 'Paper Clips: 12 - 5 = 7' }
  },
  {
    id: 7,
    unit: 'countback',
    label: 'Sheet 3-1 · Problem 9',
    q: "Marty buys 11 pencils. She uses 3 pencils. How many pencils does Marty have left?",
    hi: "मार्टी 11 पेंसिल खरीदती है। वह 3 पेंसिल का उपयोग करती है। मार्टी के पास कितनी पेंसिल बची हैं?",
    opts: [
      "8 pencils (11 - 3 = 8)",
      "9 pencils (12 - 3 = 9)",
      "7 pencils (10 - 3 = 7)",
      "14 pencils (11 + 3 = 14)"
    ],
    ans: 0,
    expl: "वर्कशीट 3-1, प्रश्न 9: 11 - 3 = 8 पेंसिल बची हैं।",
    visualType: 'numberline',
    visualData: { start: 11, jump: 3, end: 8, label: 'Marty: 11 - 3 = 8' }
  },
  {
    id: 8,
    unit: 'countback',
    label: 'Sheet 3-1 · Fact 1',
    q: "Solve by counting back: 6 - 2 = ___. What is the step on the number line?",
    hi: "गिनकर घटाएं: 6 - 2 = ___। नंबर लाइन पर सही प्रक्रिया क्या है?",
    opts: [
      "Start at 6. Count back 2 to reach 4",
      "Start at 6. Count back 4 to reach 2",
      "Start at 2. Count forward 4 to reach 6",
      "Start at 6. Count back 3 to reach 3"
    ],
    ans: 0,
    expl: "6 - 2 = 4 (6 से 2 कदम पीछे: 5, 4)।",
    visualType: 'numberline',
    visualData: { start: 6, jump: 2, end: 4, label: '6 - 2 = 4' }
  },
  {
    id: 9,
    unit: 'countback',
    label: 'Sheet 3-1 · Fact 2',
    q: "Solve by counting back: 12 - 4 = ___. What is the step on the number line?",
    hi: "गिनकर घटाएं: 12 - 4 = ___। नंबर लाइन पर सही प्रक्रिया क्या है?",
    opts: [
      "Start at 12. Count back 4 to reach 8",
      "Start at 12. Count back 5 to reach 7",
      "Start at 12. Count back 3 to reach 9",
      "Start at 4. Count forward 8 to reach 12"
    ],
    ans: 0,
    expl: "12 - 4 = 8 (12 से 4 कदम पीछे: 11, 10, 9, 8)।",
    visualType: 'numberline',
    visualData: { start: 12, jump: 4, end: 8, label: '12 - 4 = 8' }
  },
  {
    id: 10,
    unit: 'countback',
    label: 'Sheet 3-1 · Fact 3',
    q: "Solve: 11 - 2 = ___. Where do you start and how many do you count back?",
    hi: "11 - 2 = ___ को हल करने के लिए आप कहाँ से शुरू करते हैं और कितने कदम पीछे गिनते हैं?",
    opts: [
      "Start at 11, count back 2 to reach 9",
      "Start at 11, count back 9 to reach 2",
      "Start at 9, count forward 2 to reach 11",
      "Start at 11, count back 1 to reach 10"
    ],
    ans: 0,
    expl: "11 - 2 = 9 (11 से 2 कदम पीछे जाने पर 9 आता है)।",
    visualType: 'numberline',
    visualData: { start: 11, jump: 2, end: 9, label: '11 - 2 = 9' }
  },
  {
    id: 11,
    unit: 'countback',
    label: 'Sheet 3-1 · Fact 4',
    q: "7 - 2 = ___. Start at ___ and count back ___.",
    hi: "7 - 2 = ___। शुरू करें ___ पर और पीछे गिनें ___।",
    opts: [
      "7 - 2 = 5; Start at 7, Count back 2",
      "7 - 2 = 4; Start at 7, Count back 3",
      "7 - 2 = 5; Start at 2, Count back 7",
      "7 - 2 = 6; Start at 7, Count back 1"
    ],
    ans: 0,
    expl: "7 - 2 = 5; 7 से शुरू करके 2 कदम पीछे गिनते हैं।",
    visualType: 'numberline',
    visualData: { start: 7, jump: 2, end: 5, label: '7 - 2 = 5' }
  },
  {
    id: 12,
    unit: 'countback',
    label: 'Sheet 3-1 · Fact 5',
    q: "9 - 3 = ___. Start at ___ and count back ___.",
    hi: "9 - 3 = ___। कहाँ से शुरू करें और कितने कदम पीछे जाएँ?",
    opts: [
      "9 - 3 = 6; Start at 9, Count back 3",
      "9 - 3 = 7; Start at 9, Count back 2",
      "9 - 3 = 5; Start at 9, Count back 4",
      "9 - 3 = 6; Start at 3, Count forward 6"
    ],
    ans: 0,
    expl: "9 - 3 = 6; 9 से 3 कदम पीछे गिनने पर 6 आता है।",
    visualType: 'numberline',
    visualData: { start: 9, jump: 3, end: 6, label: '9 - 3 = 6' }
  },
  {
    id: 13,
    unit: 'countback',
    label: 'Sheet 3-1 · Fact 6',
    q: "12 - 3 = ___. Start at ___ and count back ___.",
    hi: "12 - 3 = ___। कहाँ से शुरू करें और कितने कदम पीछे जाएँ?",
    opts: [
      "12 - 3 = 9; Start at 12, Count back 3",
      "12 - 3 = 8; Start at 12, Count back 4",
      "12 - 3 = 10; Start at 12, Count back 2",
      "12 - 3 = 9; Start at 3, Count forward 9"
    ],
    ans: 0,
    expl: "12 - 3 = 9; 12 से 3 कदम पीछे: 11, 10, 9।",
    visualType: 'numberline',
    visualData: { start: 12, jump: 3, end: 9, label: '12 - 3 = 9' }
  },
  {
    id: 14,
    unit: 'countback',
    label: 'Sheet 3-1 · Fact 7',
    q: "10 - 1 = ___. Start at ___ and count back ___.",
    hi: "10 - 1 = ___। कहाँ से शुरू करें और कितने कदम पीछे जाएँ?",
    opts: [
      "10 - 1 = 9; Start at 10, Count back 1",
      "10 - 1 = 8; Start at 10, Count back 2",
      "10 - 1 = 10; Start at 10, Count back 0",
      "10 - 1 = 9; Start at 1, Count forward 9"
    ],
    ans: 0,
    expl: "10 - 1 = 9; 10 से 1 कदम पीछे = 9।",
    visualType: 'numberline',
    visualData: { start: 10, jump: 1, end: 9, label: '10 - 1 = 9' }
  },
  {
    id: 15,
    unit: 'zeroall',
    label: 'Sheet 3-2 · Problem 6',
    q: "There are 8 candles on a cake. Javier blows out all 8 candles. How many candles are still burning?",
    hi: "केक पर 8 मोमबत्तियाँ हैं। जेवियर सभी 8 मोमबत्तियाँ बुझा देता है। कितनी मोमबत्तियाँ अभी भी जल रही हैं?",
    opts: [
      "0 candles (8 - 8 = 0)",
      "8 candles (8 - 0 = 8)",
      "1 candle (8 - 7 = 1)",
      "16 candles (8 + 8 = 16)"
    ],
    ans: 0,
    expl: "वर्कशीट 3-2, प्रश्न 6: जब सभी (all) बुझा दी जाती हैं, तो 8 - 8 = 0 मोमबत्तियाँ जल रही हैं!"
  },
  {
    id: 16,
    unit: 'zeroall',
    label: 'Sheet 3-2 · Problem 7',
    q: "Eleven children come to the party. Three leave early. How many children are still at the party?",
    hi: "पार्टी में 11 बच्चे आते हैं। 3 बच्चे जल्दी चले जाते हैं। पार्टी में अभी कितने बच्चे हैं?",
    opts: [
      "8 children (11 - 3 = 8)",
      "9 children (11 - 2 = 9)",
      "7 children (10 - 3 = 7)",
      "14 children (11 + 3 = 14)"
    ],
    ans: 0,
    expl: "वर्कशीट 3-2, प्रश्न 7: 11 - 3 = 8 बच्चे पार्टी में अभी मौजूद हैं।"
  },
  {
    id: 17,
    unit: 'zeroall',
    label: 'Sheet 3-2 · Problem 1',
    q: "3 bees buzz near a flower. None fly away. How many bees are near the flower?",
    hi: "फूल के पास 3 मधुमक्खियाँ भिनभिना रही हैं। एक भी नहीं उड़ती (none = 0)। फूल के पास कितनी मधुमक्खियाँ हैं?",
    opts: [
      "3 bees (3 - 0 = 3)",
      "0 bees (3 - 3 = 0)",
      "2 bees (3 - 1 = 2)",
      "6 bees (3 + 3 = 6)"
    ],
    ans: 0,
    expl: "वर्कशीट 3-2: Subtract zero rule! जब कोई नहीं उड़ती (0), तो 3 - 0 = 3 मधुमक्खियाँ वहीं रहती हैं।"
  },
  {
    id: 18,
    unit: 'zeroall',
    label: 'Sheet 3-2 · Problem 2',
    q: "5 sparrows are in the nest. They all fly away. How many sparrows are still in the nest?",
    hi: "घोंसले में 5 गौरैया हैं। वे सभी उड़ जाती हैं। घोंसले में अभी कितनी गौरैया हैं?",
    opts: [
      "0 sparrows (5 - 5 = 0)",
      "5 sparrows (5 - 0 = 5)",
      "1 sparrow (5 - 4 = 1)",
      "4 sparrows (5 - 1 = 4)"
    ],
    ans: 0,
    expl: "वर्कशीट 3-2: Subtract all rule! जब सभी 5 उड़ जाती हैं, तो 5 - 5 = 0 गौरैया घोंसले में बचती हैं।"
  },
  {
    id: 19,
    unit: 'zeroall',
    label: 'Sheet 3-2 · Problem 3',
    q: "8 ducks are swimming in a pond. They all fly away. Write a number sentence with symbols and solve.",
    hi: "तालाब में 8 बत्तखें तैर रही हैं। वे सभी उड़ जाती हैं। सही संख्या वाक्य और उत्तर क्या है?",
    opts: [
      "8 - 8 = 0 ducks",
      "8 - 0 = 8 ducks",
      "8 + 8 = 16 ducks",
      "8 - 1 = 7 ducks"
    ],
    ans: 0,
    expl: "8 ducks swim, all 8 fly away ➔ 8 - 8 = 0 ducks left."
  },
  {
    id: 20,
    unit: 'zeroall',
    label: 'Sheet 3-2 · Problem 4',
    q: "Mrs. Keen feeds 8 squirrels. None run away. Write a number sentence and solve.",
    hi: "श्रीमती कीन 8 गिलहरियों को दाना देती हैं। एक भी नहीं भागती। सही संख्या वाक्य क्या है?",
    opts: [
      "8 - 0 = 8 squirrels",
      "8 - 8 = 0 squirrels",
      "8 + 0 = 8 squirrels",
      "8 - 1 = 7 squirrels"
    ],
    ans: 0,
    expl: "8 squirrels, none (0) run away ➔ 8 - 0 = 8 squirrels left."
  },
  {
    id: 21,
    unit: 'zeroall',
    label: 'Sheet 3-2 · Problem 5',
    q: "Miguel catches seven spiders. He lets them all go. How many spiders are left?",
    hi: "मिगुएल सात मकड़ियाँ पकड़ता है। वह उन सभी को छोड़ देता है। कितनी मकड़ियाँ बची हैं?",
    opts: [
      "0 spiders (7 - 7 = 0)",
      "7 spiders (7 - 0 = 7)",
      "1 spider (7 - 6 = 1)",
      "14 spiders (7 + 7 = 14)"
    ],
    ans: 0,
    expl: "7 spiders caught, lets all 7 go ➔ 7 - 7 = 0 spiders."
  },
  {
    id: 22,
    unit: 'zeroall',
    label: 'Sheet 3-2 · Problem 6 Story',
    q: "Which story would correctly be solved by the number sentence 5 - 5 = 0?",
    hi: "इनमें से कौन सी कहानी संख्या वाक्य 5 - 5 = 0 द्वारा हल होगी?",
    opts: [
      "Sam has 5 toy cars and gives all 5 to his brother",
      "Sam has 5 toy cars and gives none away",
      "Sam has 5 toy cars and buys 5 more",
      "Sam has 5 toy cars and breaks 1 car"
    ],
    ans: 0,
    expl: "5 - 5 = 0 का अर्थ है 5 में से सभी 5 दे देना, जिससे 0 बचते हैं!"
  },
  {
    id: 23,
    unit: 'doubles',
    label: 'Sheet 3-3 · Problem 5',
    q: "Brian has 18 CDs. He gives 9 CDs to his brother. How many CDs does Brian still have?",
    hi: "ब्रायन के पास 18 सीडी हैं। वह अपने भाई को 9 देता है। ब्रायन के पास अभी कितनी सीडी हैं?",
    opts: [
      "9 CDs (18 - 9 = 9)",
      "8 CDs (18 - 10 = 8)",
      "10 CDs (19 - 9 = 10)",
      "27 CDs (18 + 9 = 27)"
    ],
    ans: 0,
    expl: "वर्कशीट 3-3, प्रश्न 5: Doubles fact: 9 + 9 = 18 ➔ 18 - 9 = 9 सीडी बची हैं!"
  },
  {
    id: 24,
    unit: 'doubles',
    label: 'Sheet 3-3 · Problem 6',
    q: "Anita checks out 14 library books. She reads seven of the books. How many books does she still have to read?",
    hi: "अनीता लाइब्रेरी से 14 किताबें लाती है। वह 7 किताबें पढ़ लेती है। उसे अभी कितनी किताबें पढ़नी बाकी हैं?",
    opts: [
      "7 books (14 - 7 = 7)",
      "6 books (13 - 7 = 6)",
      "8 books (15 - 7 = 8)",
      "21 books (14 + 7 = 21)"
    ],
    ans: 0,
    expl: "वर्कशीट 3-3, प्रश्न 6: Doubles fact: 7 + 7 = 14 ➔ 14 - 7 = 7 किताबें बाकी हैं!"
  },
  {
    id: 25,
    unit: 'doubles',
    label: 'Sheet 3-3 · Problem 1 (PSP)',
    q: "Fran and her grandmother pick 16 pumpkins. They use 8 pumpkins for pie. How many pumpkins are left?",
    hi: "फ्रैन और उसकी दादी 16 कद्दू तोड़ते हैं। वे पाई के लिए 8 का उपयोग करते हैं। कितने कद्दू बचे हैं?",
    opts: [
      "8 pumpkins (16 - 8 = 8)",
      "7 pumpkins (15 - 8 = 7)",
      "9 pumpkins (17 - 8 = 9)",
      "24 pumpkins (16 + 8 = 24)"
    ],
    ans: 0,
    expl: "डबल्स फैक्ट: 8 + 8 = 16 ➔ 16 - 8 = 8 कद्दू बचे हैं!"
  },
  {
    id: 26,
    unit: 'doubles',
    label: 'Sheet 3-3 · Problem 2 (PSP)',
    q: "Luis picks 14 tomatoes. His dad uses 7 tomatoes for salsa. How many tomatoes does Luis have left?",
    hi: "लुइस 14 टमाटर तोड़ता है। उसके पिता सालसा के लिए 7 उपयोग करते हैं। कितने टमाटर बचे हैं?",
    opts: [
      "7 tomatoes (14 - 7 = 7)",
      "6 tomatoes (13 - 7 = 6)",
      "8 tomatoes (15 - 7 = 8)",
      "0 tomatoes (14 - 14 = 0)"
    ],
    ans: 0,
    expl: "डबल्स फैक्ट: 7 + 7 = 14 ➔ 14 - 7 = 7 टमाटर बचे हैं!"
  },
  {
    id: 27,
    unit: 'doubles',
    label: 'Sheet 3-3 · Problem 3 (PSP)',
    q: "Neal has 10 baskets of apples. He gives 5 baskets to his neighbor. How many baskets of apples does Neal keep?",
    hi: "नील के पास सेब की 10 टोकरियाँ हैं। वह 5 अपने पड़ोसी को देता है। नील कितनी टोकरियाँ रखता है?",
    opts: [
      "5 baskets (10 - 5 = 5)",
      "4 baskets (9 - 5 = 4)",
      "6 baskets (11 - 5 = 6)",
      "15 baskets (10 + 5 = 15)"
    ],
    ans: 0,
    expl: "डबल्स फैक्ट: 5 + 5 = 10 ➔ 10 - 5 = 5 टोकरियाँ रखीं!"
  },
  {
    id: 28,
    unit: 'doubles',
    label: 'Sheet 3-3 · Problem 4 (PSP)',
    q: "The Horn family plants 6 rows of corn. They pick 3 rows of corn. How many rows of corn are left to pick?",
    hi: "हॉर्न परिवार मक्के की 6 पंक्तियाँ लगाता है। वे 3 पंक्तियाँ काटते हैं। कितनी पंक्तियाँ बची हैं?",
    opts: [
      "3 rows of corn (6 - 3 = 3)",
      "2 rows of corn (5 - 3 = 2)",
      "4 rows of corn (7 - 3 = 4)",
      "9 rows of corn (6 + 3 = 9)"
    ],
    ans: 0,
    expl: "डबल्स फैक्ट: 3 + 3 = 6 ➔ 6 - 3 = 3 पंक्तियाँ बची हैं!"
  },
  {
    id: 29,
    unit: 'doubles',
    label: 'Sheet 3-3 · Problem 5 (PSP)',
    q: "Delia bakes eighteen cherry pies. She sells some pies. She has nine pies left. How many pies did she sell?",
    hi: "डेलिया 18 चेरी पाई बनाती है। वह कुछ बेचती है और 9 बचती हैं। उसने कितनी पाई बेचीं?",
    opts: [
      "9 cherry pies (18 - 9 = 9)",
      "8 cherry pies (17 - 9 = 8)",
      "10 cherry pies (19 - 9 = 10)",
      "27 cherry pies (18 + 9 = 27)"
    ],
    ans: 0,
    expl: "18 में से 9 बचीं ➔ 18 - 9 = 9 पाई बेची गईं!"
  },
  {
    id: 30,
    unit: 'doubles',
    label: 'Sheet 3-3 · Problem 6 (PSP)',
    q: "Doug brings 12 peppers to market. At the end of the day, he has six peppers. How many peppers did he sell?",
    hi: "डग बाजार में 12 शिमला मिर्च लाता है। दिन के अंत में उसके पास 6 बचती हैं। उसने कितनी मिर्च बेचीं?",
    opts: [
      "6 peppers (12 - 6 = 6)",
      "5 peppers (11 - 6 = 5)",
      "7 peppers (13 - 6 = 7)",
      "18 peppers (12 + 6 = 18)"
    ],
    ans: 0,
    expl: "12 में से 6 बचीं ➔ 12 - 6 = 6 मिर्च बेची गईं!"
  }
];

export const test02: TestQuestion[] = [
  {
    id: 1,
    unit: 'pattern',
    label: 'Sheet 3-4 · Problem 1',
    q: "Kim plants 3 tulips in row one, 6 tulips in row two, and 9 tulips in row 3. If she keeps the same pattern, how many tulips will she plant in row 6?",
    hi: "किम पंक्ति 1 में 3, पंक्ति 2 में 6, पंक्ति 3 में 9 ट्यूलिप लगाती है। यदि यही पैटर्न रहे, तो पंक्ति 6 में कितने ट्यूलिप होंगे?",
    opts: [
      "18 tulips (Row 4=12, Row 5=15, Row 6=18)",
      "15 tulips (that is row 5)",
      "21 tulips (that is row 7)",
      "12 tulips (that is row 4)"
    ],
    ans: 0,
    expl: "वर्कशीट 3-4, प्रश्न 1: हर पंक्ति में 3 जोड़े जाते हैं (3 × पंक्ति संख्या): 3, 6, 9, 12, 15, 18। पंक्ति 6 = 18 ट्यूलिप!",
    visualType: 'patterntable',
    visualData: {
      headers: ['Row', '1', '2', '3', '4', '5', '6'],
      rows: [['Tulips', 3, 6, 9, 12, 15, 18]],
      highlightCol: 6
    }
  },
  {
    id: 2,
    unit: 'pattern',
    label: 'Sheet 3-4 · Problem 1 Rule',
    q: "What is the pattern rule for the number of tulips Kim plants in each consecutive row?",
    hi: "किम द्वारा प्रत्येक अगली पंक्ति में लगाए गए ट्यूलिप की संख्या का पैटर्न नियम क्या है?",
    opts: [
      "Add 3 each row (+3)",
      "Add 2 each row (+2)",
      "Multiply by 3 each row",
      "Subtract 3 each row (-3)"
    ],
    ans: 0,
    expl: "3 + 3 = 6, 6 + 3 = 9, 9 + 3 = 12। नियम है: हर पंक्ति में 3 जोड़ें (+3)।"
  },
  {
    id: 3,
    unit: 'pattern',
    label: 'Sheet 3-4 · Problem 2',
    q: "Terry and Pat play a game with colored squares. After 1 turn there are 2 squares, after 2 turns 4 squares, after 3 turns 6 squares. How many squares after 8 turns?",
    hi: "1 टर्न के बाद 2 वर्ग, 2 टर्न के बाद 4 वर्ग, 3 टर्न के बाद 6 वर्ग हैं। 8 टर्न के बाद खेल में कितने वर्ग होंगे?",
    opts: [
      "16 squares (2 × 8 = 16 squares)",
      "14 squares (stopping at turn 7)",
      "18 squares (going to turn 9)",
      "12 squares (stopping at turn 6)"
    ],
    ans: 0,
    expl: "वर्कशीट 3-4, प्रश्न 2: टर्न 1=2, 2=4, 3=6, 4=8, 5=10, 6=12, 7=14, 8=16। 8 टर्न बाद 16 वर्ग होंगे!",
    visualType: 'patterntable',
    visualData: {
      headers: ['Turn', '1', '2', '3', '4', '5', '6', '7', '8'],
      rows: [['Squares', 2, 4, 6, 8, 10, 12, 14, 16]],
      highlightCol: 8
    }
  },
  {
    id: 4,
    unit: 'pattern',
    label: 'Sheet 3-4 · Problem 2 Rule',
    q: "In Terry and Pat's game, by how many squares does the total increase on each turn?",
    hi: "टेरी और पैट के खेल में प्रत्येक टर्न पर वर्गों की संख्या कितनी बढ़ती है?",
    opts: [
      "Increases by 2 squares (+2)",
      "Increases by 3 squares (+3)",
      "Increases by 4 squares (+4)",
      "Doubles each turn"
    ],
    ans: 0,
    expl: "हर टर्न पर 2 नए वर्ग जुड़ते हैं (2, 4, 6, 8...)। नियम +2 है।"
  },
  {
    id: 5,
    unit: 'pattern',
    label: 'Sheet 3-4 · Problem 3',
    q: "Beth's Bookstore starts with 20 puzzle books. An hour later, they have 17. After 2 hours there are 14. When will there be only 2 puzzle books left to sell?",
    hi: "बेथ की किताबों की दुकान 20 से शुरू होती है। 1 घंटे बाद 17, 2 घंटे बाद 14। कितने घंटे बाद केवल 2 किताबें बचेंगी?",
    opts: [
      "After 6 hours (20, 17, 14, 11, 8, 5, 2)",
      "After 5 hours (there are 5 books left at 5 hours)",
      "After 7 hours (there would be negative books)",
      "After 4 hours (there are 8 books left at 4 hours)"
    ],
    ans: 0,
    expl: "वर्कशीट 3-4, प्रश्न 3: हर घंटे 3 किताबें बिकती हैं (-3)। Open:20, 1h:17, 2h:14, 3h:11, 4h:8, 5h:5, 6h:2। 6 घंटे बाद 2 किताबें बचेंगी!",
    visualType: 'patterntable',
    visualData: {
      headers: ['Hours', 'Open', '1', '2', '3', '4', '5', '6'],
      rows: [['Books', 20, 17, 14, 11, 8, 5, 2]],
      highlightCol: 7
    }
  },
  {
    id: 6,
    unit: 'pattern',
    label: 'Sheet 3-4 · Problem 3 Detail',
    q: "In Beth's Bookstore, how many puzzle books are left in the store after 3 hours?",
    hi: "बेथ की किताबों की दुकान में 3 घंटे बाद कितनी पहेली किताबें बची हैं?",
    opts: [
      "11 puzzle books",
      "14 puzzle books",
      "8 puzzle books",
      "17 puzzle books"
    ],
    ans: 0,
    expl: "तालिका के अनुसार: Open=20, 1h=17, 2h=14, 3h=11 किताबें।"
  },
  {
    id: 7,
    unit: 'related',
    label: 'Sheet 3-5 · Problem 1A',
    q: "Use the addition fact 7 + 5 = 12 to find the difference: 12 - 5 = ___",
    hi: "जोड़ तथ्य 7 + 5 = 12 का उपयोग करके घटाव ज्ञात करें: 12 - 5 = ___",
    opts: [
      "7",
      "8",
      "6",
      "5"
    ],
    ans: 0,
    expl: "चूँकि 7 + 5 = 12, इसलिए 12 - 5 = 7!"
  },
  {
    id: 8,
    unit: 'related',
    label: 'Sheet 3-5 · Problem 1B',
    q: "Use the addition fact 6 + 9 = 15 to find the difference: 15 - 9 = ___",
    hi: "जोड़ तथ्य 6 + 9 = 15 का उपयोग करके घटाव ज्ञात करें: 15 - 9 = ___",
    opts: [
      "6",
      "7",
      "5",
      "9"
    ],
    ans: 0,
    expl: "चूँकि 6 + 9 = 15, इसलिए 15 - 9 = 6!"
  },
  {
    id: 9,
    unit: 'related',
    label: 'Sheet 3-5 · Problem 1C',
    q: "Use the addition fact 8 + 5 = 13 to find the difference: 13 - 5 = ___",
    hi: "जोड़ तथ्य 8 + 5 = 13 का उपयोग करके घटाव ज्ञात करें: 13 - 5 = ___",
    opts: [
      "8",
      "9",
      "7",
      "5"
    ],
    ans: 0,
    expl: "चूँकि 8 + 5 = 13, इसलिए 13 - 5 = 8!"
  },
  {
    id: 10,
    unit: 'related',
    label: 'Sheet 3-5 · Problem 2A',
    q: "Use the addition fact 4 + 7 = 11 to find the difference: 11 - 7 = ___",
    hi: "जोड़ तथ्य 4 + 7 = 11 का उपयोग करके घटाव ज्ञात करें: 11 - 7 = ___",
    opts: [
      "4",
      "5",
      "3",
      "7"
    ],
    ans: 0,
    expl: "चूँकि 4 + 7 = 11, इसलिए 11 - 7 = 4!"
  },
  {
    id: 11,
    unit: 'related',
    label: 'Sheet 3-5 · Problem 2B',
    q: "Use the addition fact 7 + 3 = 10 to find the difference: 10 - 3 = ___",
    hi: "जोड़ तथ्य 7 + 3 = 10 का उपयोग करके घटाव ज्ञात करें: 10 - 3 = ___",
    opts: [
      "7",
      "6",
      "8",
      "3"
    ],
    ans: 0,
    expl: "चूँकि 7 + 3 = 10, इसलिए 10 - 3 = 7!"
  },
  {
    id: 12,
    unit: 'related',
    label: 'Sheet 3-5 · Problem 2C',
    q: "Use the addition fact 4 + 0 = 4 to find the difference: 4 - 0 = ___",
    hi: "जोड़ तथ्य 4 + 0 = 4 का उपयोग करके घटाव ज्ञात करें: 4 - 0 = ___",
    opts: [
      "4",
      "0",
      "1",
      "8"
    ],
    ans: 0,
    expl: "चूँकि 4 + 0 = 4, इसलिए 4 - 0 = 4!"
  },
  {
    id: 13,
    unit: 'related',
    label: 'Sheet 3-5 · Problem 3A',
    q: "Use the addition fact 9 + 3 = 12 to find the difference: 12 - 3 = ___",
    hi: "जोड़ तथ्य 9 + 3 = 12 का उपयोग करके घटाव ज्ञात करें: 12 - 3 = ___",
    opts: [
      "9",
      "8",
      "10",
      "3"
    ],
    ans: 0,
    expl: "चूँकि 9 + 3 = 12, इसलिए 12 - 3 = 9!"
  },
  {
    id: 14,
    unit: 'related',
    label: 'Sheet 3-5 · Problem 3B',
    q: "Use the addition fact 6 + 6 = 12 to find the difference: 12 - 6 = ___",
    hi: "जोड़ तथ्य 6 + 6 = 12 का उपयोग करके घटाव ज्ञात करें: 12 - 6 = ___",
    opts: [
      "6",
      "7",
      "5",
      "12"
    ],
    ans: 0,
    expl: "चूँकि 6 + 6 = 12, इसलिए 12 - 6 = 6!"
  },
  {
    id: 15,
    unit: 'related',
    label: 'Sheet 3-5 · Problem 3C',
    q: "Use the addition fact 7 + 8 = 15 to find the difference: 15 - 8 = ___",
    hi: "जोड़ तथ्य 7 + 8 = 15 का उपयोग करके घटाव ज्ञात करें: 15 - 8 = ___",
    opts: [
      "7",
      "8",
      "6",
      "9"
    ],
    ans: 0,
    expl: "चूँकि 7 + 8 = 15, इसलिए 15 - 8 = 7!"
  },
  {
    id: 16,
    unit: 'related',
    label: 'Sheet 3-5 · Problem 4',
    q: "If 9 + 8 = 17, then what is 17 - 8?",
    hi: "यदि 9 + 8 = 17 है, तो 17 - 8 का मान क्या होगा?",
    opts: [
      "9",
      "8",
      "7",
      "10"
    ],
    ans: 0,
    expl: "वर्कशीट 3-5: 9 + 8 = 17 ➔ 17 - 8 = 9!"
  },
  {
    id: 17,
    unit: 'related',
    label: 'Sheet 3-5 · Problem 5',
    q: "Dean has 15 books. He reads 8 of them. How many books does Dean have left to read?",
    hi: "डीन के पास 15 किताबें हैं। वह उनमें से 8 पढ़ता है। डीन के पास कितनी किताबें पढ़ना बाकी हैं?",
    opts: [
      "7 books (15 - 8 = 7)",
      "8 books (16 - 8 = 8)",
      "6 books (14 - 8 = 6)",
      "23 books (15 + 8 = 23)"
    ],
    ans: 0,
    expl: "वर्कशीट 3-5, प्रश्न 5: 15 - 8 = 7 किताबें बाकी हैं।"
  },
  {
    id: 18,
    unit: 'related',
    label: 'Sheet 3-5 · Problem 6',
    q: "Fay paints 8 pictures in March. She paints 9 pictures in April. How many pictures does Fay paint in all?",
    hi: "फे मार्च में 8 और अप्रैल में 9 चित्र बनाती है। फे कुल कितने चित्र बनाती है?",
    opts: [
      "17 pictures (8 + 9 = 17)",
      "16 pictures (8 + 8 = 16)",
      "18 pictures (9 + 9 = 18)",
      "1 picture (9 - 8 = 1)"
    ],
    ans: 0,
    expl: "वर्कशीट 3-5, प्रश्न 6: 8 + 9 = 17 चित्र!"
  },
  {
    id: 19,
    unit: 'related',
    label: 'Sheet 3-5 · Problem 1 (PSP)',
    q: "5 children start soccer on Monday. 4 more children start soccer on Wednesday. How many children in all? Then write a related subtraction fact.",
    hi: "सोमवार को 5 बच्चे और बुधवार को 4 बच्चे फुटबॉल शुरू करते हैं। कुल कितने बच्चे हैं? फिर संबंधित घटाव वाक्य लिखें।",
    opts: [
      "5 + 4 = 9 children; Related: 9 - 4 = 5",
      "5 + 4 = 9 children; Related: 9 - 1 = 8",
      "5 + 4 = 10 children; Related: 10 - 4 = 6",
      "5 - 4 = 1 child; Related: 4 + 1 = 5"
    ],
    ans: 0,
    expl: "5 + 4 = 9 बच्चे। संबंधित तथ्य: 9 - 4 = 5 (या 9 - 5 = 4)!"
  },
  {
    id: 20,
    unit: 'related',
    label: 'Sheet 3-5 · Problem 2 (PSP)',
    q: "The tennis team has 16 players. 8 players leave the team. How many players are still on the team? Then write a related addition fact.",
    hi: "टेनिस टीम में 16 खिलाड़ी हैं। 8 खिलाड़ी टीम छोड़ देते हैं। कितने खिलाड़ी अभी टीम में हैं? फिर संबंधित जोड़ तथ्य लिखें।",
    opts: [
      "16 - 8 = 8 players; Related: 8 + 8 = 16",
      "16 - 8 = 8 players; Related: 8 + 7 = 15",
      "16 - 7 = 9 players; Related: 9 + 7 = 16",
      "16 + 8 = 24 players; Related: 24 - 8 = 16"
    ],
    ans: 0,
    expl: "16 - 8 = 8 खिलाड़ी। संबंधित जोड़ तथ्य: 8 + 8 = 16!"
  },
  {
    id: 21,
    unit: 'related',
    label: 'Sheet 3-5 · Problem 3 (PSP)',
    q: "Ten boys join the model train club. Two boys move away. How many boys are in the club? What is the related addition sentence?",
    hi: "मॉडल ट्रेन क्लब में 10 लड़के आते हैं। 2 लड़के चले जाते हैं। कितने लड़के क्लब में हैं? संबंधित जोड़ वाक्य क्या है?",
    opts: [
      "10 - 2 = 8 boys; Related: 8 + 2 = 10",
      "10 - 2 = 8 boys; Related: 7 + 3 = 10",
      "10 + 2 = 12 boys; Related: 12 - 2 = 10",
      "10 - 3 = 7 boys; Related: 7 + 3 = 10"
    ],
    ans: 0,
    expl: "10 - 2 = 8 लड़के। संबंधित जोड़ वाक्य: 8 + 2 = 10!"
  },
  {
    id: 22,
    unit: 'related',
    label: 'Sheet 3-5 · Problem 4 (PSP)',
    q: "Six players start a game club. Nine new players join. How many players are in the game club now? What is the related subtraction fact?",
    hi: "6 खिलाड़ी गेम क्लब शुरू करते हैं। 9 नए खिलाड़ी जुड़ते हैं। क्लब में अब कितने खिलाड़ी हैं? संबंधित घटाव तथ्य क्या है?",
    opts: [
      "6 + 9 = 15 players; Related: 15 - 9 = 6",
      "6 + 9 = 15 players; Related: 15 - 8 = 7",
      "6 + 9 = 14 players; Related: 14 - 9 = 5",
      "9 - 6 = 3 players; Related: 6 + 3 = 9"
    ],
    ans: 0,
    expl: "6 + 9 = 15 खिलाड़ी। संबंधित घटाव तथ्य: 15 - 9 = 6!"
  },
  {
    id: 23,
    unit: 'missing',
    label: 'Sheet 3-6 · Problem 5',
    q: "David and his friends are flying 16 kites. Some kites get trapped in trees. 7 kites are still flying. Solve using related facts: 7 + [ ] = 16, 16 - 7 = [ ]. How many kites in the trees?",
    hi: "डेविड 16 पतंगें उड़ा रहा है। 7 अभी उड़ रही हैं। 7 + [ ] = 16 और 16 - 7 = [ ] का उपयोग करके बताएं कि पेड़ों में कितनी पतंगें फंसी हैं?",
    opts: [
      "9 kites (16 - 7 = 9)",
      "8 kites (16 - 8 = 8)",
      "10 kites (17 - 7 = 10)",
      "23 kites (16 + 7 = 23)"
    ],
    ans: 0,
    expl: "वर्कशीट 3-6, प्रश्न 5: 7 + 9 = 16 ➔ 16 - 7 = 9 पतंगें पेड़ों में फंसी हैं!",
    visualType: 'missingaddend',
    visualData: { addend1: 7, box: 9, total: 16, subtractionSentence: '16 - 7 = 9' }
  },
  {
    id: 24,
    unit: 'missing',
    label: 'Sheet 3-6 · Problem 6',
    q: "The scouts have 15 boats. They put some boats in the pond. 9 boats are left on land. Solve using related facts: 9 + [ ] = 15, 15 - 9 = [ ]. How many boats in the pond?",
    hi: "स्काउट्स के पास 15 नावें हैं। 9 जमीन पर बची हैं। 9 + [ ] = 15 और 15 - 9 = [ ] से बताएं कि तालाब में कितनी नावें डाली गईं?",
    opts: [
      "6 boats (15 - 9 = 6)",
      "7 boats (16 - 9 = 7)",
      "5 boats (14 - 9 = 5)",
      "24 boats (15 + 9 = 24)"
    ],
    ans: 0,
    expl: "वर्कशीट 3-6, प्रश्न 6: 9 + 6 = 15 ➔ 15 - 9 = 6 नावें तालाब में हैं!",
    visualType: 'missingaddend',
    visualData: { addend1: 9, box: 6, total: 15, subtractionSentence: '15 - 9 = 6' }
  },
  {
    id: 25,
    unit: 'missing',
    label: 'Sheet 3-6 · Problem 1 (PSP)',
    q: "Anna buys 7 plants. She wants 12 plants. 7 + [ ] = 12, 12 - 7 = [ ]. How many more plants does Anna need?",
    hi: "अन्ना 7 पौधे खरीदती है। उसे 12 चाहिए। अन्ना को कितने और पौधों की आवश्यकता है?",
    opts: [
      "5 plants (12 - 7 = 5)",
      "6 plants (13 - 7 = 6)",
      "4 plants (11 - 7 = 4)",
      "19 plants (12 + 7 = 19)"
    ],
    ans: 0,
    expl: "7 + 5 = 12 ➔ 12 - 7 = 5 पौधे और चाहिए!",
    visualType: 'missingaddend',
    visualData: { addend1: 7, box: 5, total: 12, subtractionSentence: '12 - 7 = 5' }
  },
  {
    id: 26,
    unit: 'missing',
    label: 'Sheet 3-6 · Problem 2 (PSP)',
    q: "J.J. needs 14 flower boxes. He has 6 flower boxes. 6 + [ ] = 14, 14 - 6 = [ ]. How many more flower boxes does J.J. need?",
    hi: "जे.जे. को 14 फ्लावर बॉक्स चाहिए। उसके पास 6 हैं। जे.जे. को कितने और बॉक्स चाहिए?",
    opts: [
      "8 flower boxes (14 - 6 = 8)",
      "7 flower boxes (13 - 6 = 7)",
      "9 flower boxes (15 - 6 = 9)",
      "20 flower boxes (14 + 6 = 20)"
    ],
    ans: 0,
    expl: "6 + 8 = 14 ➔ 14 - 6 = 8 फ्लावर बॉक्स और चाहिए!",
    visualType: 'missingaddend',
    visualData: { addend1: 6, box: 8, total: 14, subtractionSentence: '14 - 6 = 8' }
  },
  {
    id: 27,
    unit: 'missing',
    label: 'Sheet 3-6 · Problem 3 (PSP)',
    q: "Garden City plans to put 14 trees in a park. The city has 9 trees. 9 + [ ] = 14, 14 - 9 = [ ]. How many more trees does the city need?",
    hi: "गार्डन सिटी पार्क में 14 पेड़ लगाना चाहती है। शहर के पास 9 पेड़ हैं। शहर को कितने और पेड़ों की आवश्यकता है?",
    opts: [
      "5 trees (14 - 9 = 5)",
      "6 trees (15 - 9 = 6)",
      "4 trees (13 - 9 = 4)",
      "23 trees (14 + 9 = 23)"
    ],
    ans: 0,
    expl: "9 + 5 = 14 ➔ 14 - 9 = 5 और पेड़ चाहिए!",
    visualType: 'missingaddend',
    visualData: { addend1: 9, box: 5, total: 14, subtractionSentence: '14 - 9 = 5' }
  },
  {
    id: 28,
    unit: 'missing',
    label: 'Sheet 3-6 · Problem 4 (PSP)',
    q: "Louis has 7 roses. He wants 15 roses. 7 + [ ] = 15, 15 - 7 = [ ]. How many more roses does Louis need?",
    hi: "लुइस के पास 7 गुलाब हैं। वह 15 गुलाब चाहता है। लुइस को कितने और गुलाब चाहिए?",
    opts: [
      "8 roses (15 - 7 = 8)",
      "7 roses (14 - 7 = 7)",
      "9 roses (16 - 7 = 9)",
      "22 roses (15 + 7 = 22)"
    ],
    ans: 0,
    expl: "7 + 8 = 15 ➔ 15 - 7 = 8 और गुलाब चाहिए!",
    visualType: 'missingaddend',
    visualData: { addend1: 7, box: 8, total: 15, subtractionSentence: '15 - 7 = 8' }
  },
  {
    id: 29,
    unit: 'missing',
    label: 'Sheet 3-6 · Problem 2',
    q: "Find the missing number in: 17 - [ ] = 8",
    hi: "17 - [ ] = 8 में लुप्त संख्या ज्ञात करें:",
    opts: [
      "9 (since 17 - 8 = 9)",
      "8 (since 17 - 9 = 8)",
      "11 (since 8 + 3 = 11)",
      "25 (since 17 + 8 = 25)"
    ],
    ans: 0,
    expl: "17 - 8 = 9, इसलिए 17 - [9] = 8!"
  },
  {
    id: 30,
    unit: 'missing',
    label: 'Sheet 3-6 · Problem 2',
    q: "Find the missing number in: 16 - [ ] = 7",
    hi: "16 - [ ] = 7 में लुप्त संख्या ज्ञात करें:",
    opts: [
      "9 (since 16 - 7 = 9)",
      "8 (since 16 - 8 = 8)",
      "10 (since 17 - 7 = 10)",
      "23 (since 16 + 7 = 23)"
    ],
    ans: 0,
    expl: "16 - 7 = 9, इसलिए 16 - [9] = 7!"
  }
];

export const test03: TestQuestion[] = [
  {
    id: 1,
    unit: 'factfamily',
    label: 'Sheet 3-7 · Problem 1',
    q: "A fact triangle has 10 at the top, and 5 and 5 at the bottom corners. What are the two equations in this fact family?",
    hi: "एक फैक्ट ट्रायंगल के शीर्ष पर 10, और नीचे 5 व 5 हैं। इस परिवार के दो समीकरण क्या हैं?",
    opts: [
      "5 + 5 = 10 and 10 - 5 = 5",
      "5 + 5 = 10 and 10 - 0 = 10",
      "10 + 5 = 15 and 15 - 5 = 10",
      "5 - 5 = 0 and 0 + 5 = 5"
    ],
    ans: 0,
    expl: "डबल्स फैक्ट ट्रायंगल (10; 5, 5) में दो अद्वितीय समीकरण बनते हैं: 5 + 5 = 10 और 10 - 5 = 5!",
    visualType: 'facttriangle',
    visualData: { top: 10, left: 5, right: 5 }
  },
  {
    id: 2,
    unit: 'factfamily',
    label: 'Sheet 3-7 · Problem 2',
    q: "A fact triangle has 12 at the top, and 6 and 6 at the bottom corners. What are the two equations in this fact family?",
    hi: "फैक्ट ट्रायंगल में ऊपर 12, और नीचे 6 व 6 हैं। इस परिवार के दो समीकरण क्या हैं?",
    opts: [
      "6 + 6 = 12 and 12 - 6 = 6",
      "6 + 6 = 12 and 12 - 12 = 0",
      "12 + 6 = 18 and 18 - 6 = 12",
      "6 - 6 = 0 and 12 + 0 = 12"
    ],
    ans: 0,
    expl: "डबल्स फैक्ट ट्रायंगल (12; 6, 6) में 6 + 6 = 12 और 12 - 6 = 6 होते हैं!",
    visualType: 'facttriangle',
    visualData: { top: 12, left: 6, right: 6 }
  },
  {
    id: 3,
    unit: 'factfamily',
    label: 'Sheet 3-7 · Problem 3',
    q: "A fact triangle has 15 at the top, and 9 and 6 at the bottom. Which set of four number sentences makes this complete fact family?",
    hi: "फैक्ट ट्रायंगल में ऊपर 15, नीचे 9 और 6 हैं। कौन सा सेट इस फैक्ट फैमिली के सभी 4 संख्या वाक्यों को सही दर्शाता है?",
    opts: [
      "6 + 9 = 15, 9 + 6 = 15, 15 - 9 = 6, 15 - 6 = 9",
      "6 + 9 = 15, 15 + 6 = 21, 15 - 9 = 6, 9 - 6 = 3",
      "9 - 6 = 3, 6 + 3 = 9, 15 - 6 = 9, 9 + 6 = 15",
      "15 - 9 = 6, 15 - 6 = 9, 15 + 9 = 24, 15 + 6 = 21"
    ],
    ans: 0,
    expl: "फैक्ट ट्रायंगल (15; 9, 6): दो जोड़ वाक्य (6+9=15, 9+6=15) और दो घटाव वाक्य (15-9=6, 15-6=9)!",
    visualType: 'facttriangle',
    visualData: { top: 15, left: 9, right: 6 }
  },
  {
    id: 4,
    unit: 'factfamily',
    label: 'Sheet 3-7 · Problem 4',
    q: "A fact triangle has 14 at the top, and 9 and 5 at the bottom. Which set of four number sentences makes this complete fact family?",
    hi: "फैक्ट ट्रायंगल में ऊपर 14, नीचे 9 और 5 हैं। कौन से चार वाक्य इस परिवार को पूरा करते हैं?",
    opts: [
      "5 + 9 = 14, 9 + 5 = 14, 14 - 9 = 5, 14 - 5 = 9",
      "5 + 9 = 14, 14 + 5 = 19, 14 - 9 = 5, 9 - 5 = 4",
      "9 - 5 = 4, 5 + 4 = 9, 14 - 5 = 9, 9 + 5 = 14",
      "14 - 9 = 5, 14 - 5 = 9, 14 + 9 = 23, 14 + 5 = 19"
    ],
    ans: 0,
    expl: "फैक्ट ट्रायंगल (14; 9, 5): 5+9=14, 9+5=14, 14-9=5, 14-5=9!",
    visualType: 'facttriangle',
    visualData: { top: 14, left: 9, right: 5 }
  },
  {
    id: 5,
    unit: 'factfamily',
    label: 'Sheet 3-7 · Problem 5',
    q: "A fact triangle has 12 at top, and 7 and 5 at bottom. Complete: 7 + [ ] = 12, [ ] + 7 = 12, 12 - [ ] = 7, 12 - [ ] = 5.",
    hi: "फैक्ट ट्रायंगल में ऊपर 12, नीचे 7 और 5 हैं। खाली स्थानों को भरने के लिए कौन सी संख्याएँ सही हैं?",
    opts: [
      "5, 5, 5, 7 (Equations: 7+5=12, 5+7=12, 12-5=7, 12-7=5)",
      "7, 7, 5, 5",
      "6, 6, 6, 6",
      "5, 7, 7, 5"
    ],
    ans: 0,
    expl: "वर्कशीट 3-7, प्रश्न 5: 7 + 5 = 12, 5 + 7 = 12, 12 - 5 = 7, और 12 - 7 = 5!",
    visualType: 'facttriangle',
    visualData: { top: 12, left: 7, right: 5 }
  },
  {
    id: 6,
    unit: 'factfamily',
    label: 'Sheet 3-7 · Problem 6',
    q: "A fact triangle has 13 at top, and 7 and 6 at bottom. Which number goes in the blank for [ ] + 7 = 13 and 13 - [ ] = 6?",
    hi: "फैक्ट ट्रायंगल (13; 7, 6) में [ ] + 7 = 13 और 13 - [ ] = 6 में कौन सी संख्याएँ आएँगी?",
    opts: [
      "6 in the first blank, and 7 in the second blank",
      "7 in both blanks",
      "6 in both blanks",
      "8 in the first blank, and 6 in the second blank"
    ],
    ans: 0,
    expl: "6 + 7 = 13 (अतः पहला खाली स्थान 6) और 13 - 7 = 6 (अतः दूसरा खाली स्थान 7)!",
    visualType: 'facttriangle',
    visualData: { top: 13, left: 7, right: 6 }
  },
  {
    id: 7,
    unit: 'factfamily',
    label: 'Sheet 3-7 · Problem 7',
    q: "Lori made 7 bracelets. Then, she made 9 more. How many total bracelets did Lori make? What is the fact family triangle for this problem?",
    hi: "लोरी ने 7 कंगन बनाए, फिर 9 और बनाए। लोरी ने कुल कितने कंगन बनाए? इसका फैक्ट फैमिली ट्रायंगल क्या है?",
    opts: [
      "16 bracelets in all; Triangle has 16 at top, 7 and 9 at bottom",
      "15 bracelets in all; Triangle has 15 at top, 7 and 8 at bottom",
      "17 bracelets in all; Triangle has 17 at top, 8 and 9 at bottom",
      "16 bracelets in all; Triangle has 7 at top, 9 and 16 at bottom"
    ],
    ans: 0,
    expl: "7 + 9 = 16 कंगन। फैक्ट ट्रायंगल के शीर्ष पर 16 और नीचे 7 व 9 होते हैं!",
    visualType: 'facttriangle',
    visualData: { top: 16, left: 7, right: 9 }
  },
  {
    id: 8,
    unit: 'factfamily',
    label: 'Sheet 3-7 · Problem 1 (PSP)',
    q: "Mr. Sims has to fix 14 cars. He has 5 cars left to fix. In the fact triangle with 14 at top and 5 at bottom left, what is the missing bottom-right number, and how many cars has Mr. Sims fixed?",
    hi: "मिस्टर सिम्स को 14 कारें ठीक करनी हैं, 5 बची हैं। ट्रायंगल में ऊपर 14, नीचे 5 है, लुप्त संख्या क्या है और कितनी कारें ठीक हो चुकी हैं?",
    opts: [
      "Missing number is 9; Mr. Sims has fixed 9 cars (14 - 5 = 9)",
      "Missing number is 8; Mr. Sims has fixed 8 cars (14 - 6 = 8)",
      "Missing number is 19; Mr. Sims has fixed 19 cars (14 + 5 = 19)",
      "Missing number is 7; Mr. Sims has fixed 7 cars"
    ],
    ans: 0,
    expl: "वर्कशीट 3-7, प्रश्न 1: 5 + 9 = 14 ➔ 14 - 5 = 9 कारें ठीक कर ली गईं!",
    visualType: 'facttriangle',
    visualData: { top: 14, left: 5, right: 9, missing: 'right' }
  },
  {
    id: 9,
    unit: 'factfamily',
    label: 'Sheet 3-7 · Problem 2 (PSP)',
    q: "Officer Smith visits 17 schools each month. He has 9 schools left to visit. How many schools has he already visited? (Fact triangle has 17 at top, 9 at bottom right).",
    hi: "अधिकारी स्मिथ 17 स्कूलों का दौरा करते हैं, 9 बचे हैं। उन्होंने कितने स्कूलों का दौरा कर लिया है?",
    opts: [
      "He has visited 8 schools (17 - 9 = 8)",
      "He has visited 7 schools (16 - 9 = 7)",
      "He has visited 9 schools (18 - 9 = 9)",
      "He has visited 26 schools (17 + 9 = 26)"
    ],
    ans: 0,
    expl: "वर्कशीट 3-7, प्रश्न 2: 9 + 8 = 17 ➔ 17 - 9 = 8 स्कूलों का दौरा किया!",
    visualType: 'facttriangle',
    visualData: { top: 17, left: 8, right: 9, missing: 'left' }
  },
  {
    id: 10,
    unit: 'factfamily',
    label: 'Sheet 3-7 · Problem 3 (PSP)',
    q: "Ms. Grimes is a firefighter. She plans 15 fire drills each month. She has 8 drills left to plan. How many fire drills has she already planned?",
    hi: "सुश्री ग्रिम्स 15 फायर ड्रिल की योजना बनाती हैं, 8 बाकी हैं। उन्होंने कितनी फायर ड्रिल की योजना बना ली है?",
    opts: [
      "7 fire drills (15 - 8 = 7)",
      "8 fire drills (16 - 8 = 8)",
      "6 fire drills (14 - 8 = 6)",
      "23 fire drills (15 + 8 = 23)"
    ],
    ans: 0,
    expl: "वर्कशीट 3-7, प्रश्न 3: 15 - 8 = 7 फायर ड्रिल की योजना बन चुकी है!",
    visualType: 'facttriangle',
    visualData: { top: 15, left: 7, right: 8 }
  },
  {
    id: 11,
    unit: 'factfamily',
    label: 'Sheet 3-7 · Problem 4 (PSP)',
    q: "Doug & Son deliver lunches to 16 schools a day. Today, they have 9 schools left to go to. How many deliveries did they make?",
    hi: "डग एंड सन 16 स्कूलों में लंच पहुंचाते हैं, आज 9 बचे हैं। उन्होंने कितनी डिलीवरी की हैं?",
    opts: [
      "7 deliveries (16 - 9 = 7)",
      "8 deliveries (17 - 9 = 8)",
      "6 deliveries (15 - 9 = 6)",
      "25 deliveries (16 + 9 = 25)"
    ],
    ans: 0,
    expl: "वर्कशीट 3-7, प्रश्न 4: 16 - 9 = 7 डिलीवरी कर ली गईं!",
    visualType: 'facttriangle',
    visualData: { top: 16, left: 7, right: 9 }
  },
  {
    id: 12,
    unit: 'strategy',
    label: 'Sheet 3-8 · Problem 1',
    q: "Ray is painting red, yellow, and blue stripes. He paints a yellow stripe next to the blue stripe. The red stripe is not first. He paints a red stripe next to the blue stripe. What is the order of the stripes?",
    hi: "रे लाल, पीली और नीली धारियाँ बनाता है। लाल पहली नहीं है। पीली नीली के बगल में है, लाल नीली के बगल में है। धारियों का क्रम क्या है?",
    opts: [
      "Yellow, Blue, Red",
      "Red, Blue, Yellow",
      "Blue, Yellow, Red",
      "Yellow, Red, Blue"
    ],
    ans: 0,
    expl: "वर्कशीट 3-8, प्रश्न 1: ब्लू के दोनों तरफ येलो और रेड हैं, इसलिए ब्लू बीच में है। रेड पहली नहीं हो सकती, अतः पहला येलो, दूसरा ब्लू, तीसरा रेड!",
    visualType: 'stripes',
    visualData: { order: ['Yellow', 'Blue', 'Red'] }
  },
  {
    id: 13,
    unit: 'strategy',
    label: 'Sheet 3-8 · Problem 1 Logic',
    q: "In Ray's stripe puzzle, why CANNOT the blue stripe be first in line?",
    hi: "रे की धारी पहेली में, नीली धारी पहली क्यों नहीं हो सकती?",
    opts: [
      "Because both Yellow and Red must be next to Blue, so Blue must be in the middle",
      "Because the problem says Blue is last",
      "Because Yellow is always first in rainbow colors",
      "Because Red must be in the middle"
    ],
    ans: 0,
    expl: "तार्किक कारण: येलो और रेड दोनों को ब्लू के बगल में होना है। 3 धारियों में केवल बीच वाली स्थिति ही दोनों रंगों के बगल में हो सकती है!"
  },
  {
    id: 14,
    unit: 'strategy',
    label: 'Sheet 3-8 · Problem 2',
    q: "Mrs. Ash buys 16 rolls of wallpaper. Nine rolls are for the downstairs. The rest are for the bedrooms. How many rolls of wallpaper are for the bedrooms?",
    hi: "श्रीमती ऐश वॉलपेपर के 16 रोल खरीदती हैं। 9 रोल नीचे के लिए हैं, बाकी बेडरूम के लिए। बेडरूम के लिए कितने रोल हैं?",
    opts: [
      "7 rolls (16 - 9 = 7)",
      "8 rolls (17 - 9 = 8)",
      "6 rolls (15 - 9 = 6)",
      "25 rolls (16 + 9 = 25)"
    ],
    ans: 0,
    expl: "वर्कशीट 3-8, प्रश्न 2: 16 - 9 = 7 रोल बेडरूम के लिए हैं।"
  },
  {
    id: 15,
    unit: 'strategy',
    label: 'Sheet 3-8 · Problem 3',
    q: "Sue buys 17 cans of paint. Four cans are blue. Three cans are green. Two cans are red. The rest of the cans are white. How many cans of paint are white?",
    hi: "सू 17 कैन पेंट खरीदती है। 4 नीली, 3 हरी, 2 लाल हैं। बाकी सफेद हैं। सफेद पेंट की कितनी कैन हैं?",
    opts: [
      "8 cans of white paint (17 - (4 + 3 + 2) = 17 - 9 = 8)",
      "9 cans of white paint (counting colored cans instead)",
      "7 cans of white paint (17 - 10 = 7)",
      "10 cans of white paint"
    ],
    ans: 0,
    expl: "वर्कशीट 3-8, प्रश्न 3: रंगीन कैन = 4 + 3 + 2 = 9 कैन। सफेद कैन = 17 - 9 = 8 कैन!",
    visualType: 'paintcans',
    visualData: { blue: 4, green: 3, red: 2, white: 8 }
  },
  {
    id: 16,
    unit: 'strategy',
    label: 'Sheet 3-8 · Problem 3 Step 1',
    q: "In Sue's paint cans problem, what is the combined number of blue, green, and red paint cans before finding the white cans?",
    hi: "सू की पेंट समस्या में, सफेद कैन निकालने से पहले नीली, हरी और लाल कैन का कुल जोड़ कितना है?",
    opts: [
      "9 cans (4 + 3 + 2 = 9)",
      "8 cans (4 + 2 + 2 = 8)",
      "10 cans (4 + 3 + 3 = 10)",
      "7 cans (4 + 3 = 7)"
    ],
    ans: 0,
    expl: "4 + 3 + 2 = 9 रंगीन कैन हैं।"
  },
  {
    id: 17,
    unit: 'factfamily',
    label: 'Sheet 3-7 · Family Check',
    q: "Which of the following equations does NOT belong to the fact family of {8, 5, 13}?",
    hi: "इनमें से कौन सा समीकरण {8, 5, 13} की फैक्ट फैमिली का सदस्य नहीं है?",
    opts: [
      "8 - 5 = 3 (Uses 3 which is not in the family)",
      "8 + 5 = 13",
      "13 - 5 = 8",
      "13 - 8 = 5"
    ],
    ans: 0,
    expl: "{8, 5, 13} परिवार में 8+5=13, 5+8=13, 13-5=8, और 13-8=5 होते हैं। 8-5=3 इस परिवार का हिस्सा नहीं है!"
  },
  {
    id: 18,
    unit: 'factfamily',
    label: 'Sheet 3-7 · Family Check',
    q: "Which of the following equations does NOT belong to the fact family of {9, 7, 16}?",
    hi: "इनमें से कौन सा समीकरण {9, 7, 16} की फैक्ट फैमिली का सदस्य नहीं है?",
    opts: [
      "16 + 7 = 23 (Outside the family)",
      "7 + 9 = 16",
      "16 - 9 = 7",
      "16 - 7 = 9"
    ],
    ans: 0,
    expl: "16 + 7 = 23 इस फैक्ट फैमिली में नहीं आता है।"
  },
  {
    id: 19,
    unit: 'factfamily',
    label: 'Sheet 3-7 · Double Families',
    q: "Why does a fact triangle with doubles like (12; 6, 6) only produce TWO distinct number sentences instead of FOUR?",
    hi: "डबल्स वाले फैक्ट ट्रायंगल (12; 6, 6) में 4 के बजाय केवल 2 अलग समीकरण क्यों बनते हैं?",
    opts: [
      "Because both addends are the same number (6 + 6 = 12 and 12 - 6 = 6)",
      "Because subtraction is not allowed with doubles",
      "Because 12 is an even number",
      "Because zero is subtracted"
    ],
    ans: 0,
    expl: "चूँकि दोनों जोड़ने वाली संख्याएँ समान (6 और 6) हैं, क्रम बदलने पर नया समीकरण नहीं बनता (6+6=12 और 12-6=6)।"
  },
  {
    id: 20,
    unit: 'related',
    label: 'Chapter 3 Mastery',
    q: "A student writes: '16 - 7 = 9'. Which related addition fact can the student use to check if the answer is correct?",
    hi: "एक छात्र लिखता है: '16 - 7 = 9'। उत्तर की जाँच करने के लिए छात्र किस संबंधित जोड़ तथ्य का उपयोग कर सकता है?",
    opts: [
      "9 + 7 = 16",
      "16 + 7 = 23",
      "16 + 9 = 25",
      "7 - 9 = 2"
    ],
    ans: 0,
    expl: "घटाव 16 - 7 = 9 की जाँच संबंधित जोड़ 9 + 7 = 16 (या 7 + 9 = 16) से की जाती है!"
  },
  {
    id: 21,
    unit: 'missing',
    label: 'Chapter 3 Mastery',
    q: "If [ ] + 6 = 14, which subtraction sentence directly solves for the missing addend in one step?",
    hi: "यदि [ ] + 6 = 14 है, तो कौन सा घटाव वाक्य सीधे एक चरण में लुप्त संख्या निकालता है?",
    opts: [
      "14 - 6 = 8",
      "14 + 6 = 20",
      "6 - 14 = -8",
      "14 - 8 = 6"
    ],
    ans: 0,
    expl: "जोड़ का उल्टा घटाव होता है: [ ] = 14 - 6 = 8!"
  },
  {
    id: 22,
    unit: 'missing',
    label: 'Chapter 3 Tough',
    q: "Find the two missing numbers: 9 + [ A ] = 12 and 12 - [ B ] = 8. What are A and B?",
    hi: "दो लुप्त संख्याएँ ज्ञात करें: 9 + [ A ] = 12 और 12 - [ B ] = 8। A और B क्या हैं?",
    opts: [
      "A = 3 and B = 4",
      "A = 4 and B = 3",
      "A = 3 and B = 3",
      "A = 4 and B = 4"
    ],
    ans: 0,
    expl: "9 + 3 = 12 (A = 3) और 12 - 4 = 8 (B = 4)!"
  },
  {
    id: 23,
    unit: 'pattern',
    label: 'Chapter 3 Extension',
    q: "In Kim's tulip pattern (Row 1=3, Row 2=6, Row 3=9, Row 6=18), if she planted a 7th row, how many tulips would row 7 have?",
    hi: "किम के ट्यूलिप पैटर्न में यदि वह 7वीं पंक्ति लगाए, तो उसमें कितने ट्यूलिप होंगे?",
    opts: [
      "21 tulips (18 + 3 = 21)",
      "20 tulips",
      "24 tulips (18 + 6 = 24)",
      "19 tulips"
    ],
    ans: 0,
    expl: "हर पंक्ति में +3 होता है। पंक्ति 6 = 18 ➔ पंक्ति 7 = 18 + 3 = 21 ट्यूलिप!"
  },
  {
    id: 24,
    unit: 'doubles',
    label: 'Chapter 3 Strategy Comparison',
    q: "Why is using doubles to solve 18 - 9 faster than counting back 9 on a number line?",
    hi: "नंबर लाइन पर 9 कदम पीछे गिनने की तुलना में डबल्स का उपयोग करके 18 - 9 हल करना अधिक तेज़ क्यों है?",
    opts: [
      "Because you instantly remember 9 + 9 = 18, so 18 - 9 must be 9 without counting 9 steps",
      "Because 18 is an odd number",
      "Because counting back always gives the wrong answer",
      "Because doubles are only for addition"
    ],
    ans: 0,
    expl: "डबल्स रणनीति में ज्ञात जोड़ तथ्य (9 + 9 = 18) तुरंत 18 - 9 = 9 का उत्तर दे देता है, 9 बार पीछे गिनने की आवश्यकता नहीं होती।"
  },
  {
    id: 25,
    unit: 'zeroall',
    label: 'Chapter 3 Logic Trap',
    q: "6 bees are on a flower. If 6 fly away, 0 are left. What if NONE (0) fly away instead?",
    hi: "फूल पर 6 मधुमक्खियाँ हैं। यदि 6 उड़ती हैं तो 0 बचती हैं। यदि एक भी नहीं (0) उड़ती, तो क्या होगा?",
    opts: [
      "All 6 bees remain (6 - 0 = 6)",
      "0 bees remain (6 - 6 = 0)",
      "12 bees arrive (6 + 6 = 12)",
      "1 bee remains"
    ],
    ans: 0,
    expl: "जब कोई नहीं उड़ती (0), तो पूरी 6 मधुमक्खियाँ बची रहती हैं: 6 - 0 = 6!"
  },
  {
    id: 26,
    unit: 'factfamily',
    label: 'Chapter 3 Inverse Fact',
    q: "If 17 - 8 = 9, what is the value of 17 - 9 from the same fact family?",
    hi: "यदि 17 - 8 = 9 है, तो उसी फैक्ट फैमिली से 17 - 9 का मान क्या होगा?",
    opts: [
      "8",
      "7",
      "9",
      "10"
    ],
    ans: 0,
    expl: "उसी फैक्ट फैमिली {8, 9, 17} में 17 - 8 = 9 और 17 - 9 = 8 होते हैं!"
  },
  {
    id: 27,
    unit: 'doubles',
    label: 'Sheet 3-3 · Problem 7',
    q: "In Worksheet 3-3, you had to find a difference less than 3. Which of the following problems has a difference less than 3?",
    hi: "वर्कशीट 3-3 में 3 से कम अंतर खोजना था। इनमें से किसका अंतर 3 से कम है?",
    opts: [
      "5 - 3 = 2 (Difference is 2, which is less than 3)",
      "10 - 5 = 5 (Difference is 5)",
      "18 - 9 = 9 (Difference is 9)",
      "8 - 4 = 4 (Difference is 4)"
    ],
    ans: 0,
    expl: "5 - 3 = 2, और 2 संख्या 3 से कम है!"
  },
  {
    id: 28,
    unit: 'missing',
    label: 'Chapter 3 Student Trap',
    q: "To solve [ ] + 6 = 15, a student answers 21. What mistake did the student make?",
    hi: "[ ] + 6 = 15 को हल करते हुए एक छात्र 21 उत्तर देता है। छात्र ने क्या गलती की?",
    opts: [
      "The student mistakenly added 15 + 6 instead of subtracting 15 - 6 = 9",
      "The student counted back 6",
      "The student multiplied 15 by 6",
      "The student made no mistake"
    ],
    ans: 0,
    expl: "लुप्त एडेंड निकालने के लिए 15 - 6 = 9 करना था, लेकिन छात्र ने गलती से 15 और 6 को जोड़कर 21 निकाल दिया!"
  },
  {
    id: 29,
    unit: 'strategy',
    label: 'Sheet 3-8 · Strategy Choice',
    q: "In Sue's paint problem (17 cans total, 4 blue, 3 green, 2 red, rest white), which strategy from the worksheet toolbox was used?",
    hi: "सू की पेंट समस्या में वर्कशीट टूलबॉक्स से किस रणनीति का उपयोग किया गया?",
    opts: [
      "Write a number sentence (17 - 4 - 3 - 2 = 8)",
      "Find a Pattern",
      "Make a Model of 100",
      "Guess and Check"
    ],
    ans: 0,
    expl: "वर्कशीट 3-8: इस प्रश्न को हल करने के लिए 'Write a Number Sentence' (संख्या वाक्य लिखना) रणनीति का उपयोग किया गया!"
  },
  {
    id: 30,
    unit: 'strategy',
    label: 'Chapter 3 Grand Finale',
    q: "Review: A farmer has 16 eggs. He uses a double fact to bake cakes (uses 8 eggs). Then 0 eggs crack. How many eggs are left?",
    hi: "समीक्षा: एक किसान के पास 16 अंडे हैं। वह केक बनाने के लिए डबल्स तथ्य (8 अंडे) का उपयोग करता है। फिर 0 अंडे टूटते हैं। कितने अंडे बचे हैं?",
    opts: [
      "8 eggs (16 - 8 = 8, then 8 - 0 = 8)",
      "0 eggs (16 - 16 = 0)",
      "7 eggs",
      "16 eggs"
    ],
    ans: 0,
    expl: "16 - 8 = 8 (डबल्स घटाव), फिर 8 - 0 = 8 (शून्य घटाव)। अंत में 8 अंडे बचते हैं!"
  }
];

export const testSuitesMetadata = {
  1: {
    id: 1,
    title: 'Test 01 · Count Back, Subtract All & Zero, and Doubles',
    badge: '30 Questions · Sheets 3-1, 3-2, 3-3',
    desc: 'Worksheets 3-1, 3-2 & 3-3: Tanya\'s blocks, Ricky\'s oranges, Madison\'s trees, Hank\'s windows, Car wash cars & trucks, Alex\'s paper clips, Marty\'s pencils, Javier\'s 8 candles, party children, bees, sparrows, ducks, squirrels, spiders, Brian\'s CDs, Anita\'s library books, Fran\'s pumpkins, Luis\'s tomatoes, Neal\'s apple baskets, Horn family corn rows, Delia\'s cherry pies, और Doug\'s peppers पर 30 गहन प्रश्न।',
    qs: test01
  },
  2: {
    id: 2,
    title: 'Test 02 · Find a Pattern, Relate Addition & Subtraction, Missing Addends',
    badge: '30 Questions · Sheets 3-4, 3-5, 3-6',
    desc: 'Worksheets 3-4, 3-5 & 3-6: Kim\'s tulips (row 6), Terry & Pat\'s colored squares (turn 8), Beth\'s Bookstore countdown, Dean\'s 15 books, Fay\'s pictures, soccer team, tennis team, model train club, game club, David\'s 16 kites, Scouts\' 15 boats, Anna\'s 12 plants, J.J.\'s 14 flower boxes, Garden City 14 trees, और Louis\'s 15 roses पर 30 प्रामाणिक प्रश्न।',
    qs: test02
  },
  3: {
    id: 3,
    title: 'Test 03 · Fact Families & Problem-Solving Investigation (Tough Comprehensive)',
    badge: '30 Questions · Sheets 3-7, 3-8 & Mastery',
    desc: 'Worksheets 3-7 & 3-8: Fact triangles [10,5,5], [12,6,6], [15,9,6], [14,9,5], [12,7,5], [13,7,6]; Lori\'s bracelets, Mr. Sims\' 14 cars, Officer Smith\'s 17 schools, Ms. Grimes\' 15 fire drills, Doug & Son 16 school lunches; Ray\'s stripes logic puzzle (Yellow-Blue-Red), Mrs. Ash 16 rolls of wallpaper, Sue\'s 17 cans of paint, और अध्याय 3 के चुनौतीपूर्ण विश्लेषणात्मक प्रश्न।',
    qs: test03
  }
};
