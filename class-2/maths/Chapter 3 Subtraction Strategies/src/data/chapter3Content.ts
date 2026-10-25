export interface ConceptCheckQuestion {
  id: number;
  pairId: string;
  q: string;
  hi: string;
  opts: string[];
  ans: number;
  expl: string;
}

export const conceptCheckQuestions: ConceptCheckQuestion[] = [
  // Pair 1: Unit 1 (3-1 Count Back to Subtract)
  {
    id: 1,
    pairId: 'pair-1',
    q: "Worksheet 3-1: Tanya has 12 blocks and gives 5 away. To solve using a number line, what is the exact step?",
    hi: "तान्या के पास 12 ब्लॉक हैं और वह 5 दे देती है। नंबर लाइन पर सही कदम क्या होगा?",
    opts: [
      "Start at 12, count back 5 to reach 7 (12 - 5 = 7)",
      "Start at 12, count back 7 to reach 5 (12 - 7 = 5)",
      "Start at 5, count forward 7 to reach 12",
      "Start at 0, count forward 5 to reach 5"
    ],
    ans: 0,
    expl: "वर्कशीट 3-1: 'Start at 12. Count back 5 to 7. 12 - 5 = 7 blocks.'"
  },
  {
    id: 2,
    pairId: 'pair-1',
    q: "Worksheet 3-1: Twelve cars and four trucks come to the car wash. How many more cars than trucks are at the car wash?",
    hi: "कार वॉश पर 12 कारें और 4 ट्रक आते हैं। ट्रकों की तुलना में कितनी अधिक कारें हैं?",
    opts: [
      "8 cars (12 - 4 = 8)",
      "16 cars (12 + 4 = 16)",
      "6 cars (10 - 4 = 6)",
      "7 cars (11 - 4 = 7)"
    ],
    ans: 0,
    expl: "वर्कशीट 3-1, प्रश्न 5: तुलना करने के लिए 12 - 4 = 8 cars अधिक हैं।"
  },

  // Pair 2: Unit 2 (3-2 Subtract All & Zero)
  {
    id: 3,
    pairId: 'pair-2',
    q: "Worksheet 3-2: 8 ducks are swimming in a pond. They all fly away. Which number sentence correctly shows how many ducks are left?",
    hi: "तालाब में 8 बत्तखें तैर रही हैं। वे सभी उड़ जाती हैं। बची हुई बत्तखों के लिए सही वाक्य क्या है?",
    opts: [
      "8 - 8 = 0 ducks",
      "8 - 0 = 8 ducks",
      "8 + 0 = 8 ducks",
      "8 - 1 = 7 ducks"
    ],
    ans: 0,
    expl: "वर्कशीट 3-2, प्रश्न 3: जब सभी (all) उड़ जाती हैं, तो 8 - 8 = 0 बत्तखें तालाब में बचती हैं!"
  },
  {
    id: 4,
    pairId: 'pair-2',
    q: "Worksheet 3-2: Mrs. Keen feeds 8 squirrels. None run away. How many squirrels are left?",
    hi: "श्रीमती कीन 8 गिलहरियों को खाना खिलाती हैं। एक भी नहीं भागती। कितनी गिलहरियाँ बची हैं?",
    opts: [
      "8 squirrels (8 - 0 = 8)",
      "0 squirrels (8 - 8 = 0)",
      "7 squirrels (8 - 1 = 7)",
      "16 squirrels (8 + 8 = 16)"
    ],
    ans: 0,
    expl: "वर्कशीट 3-2, प्रश्न 4: जब कोई नहीं भागता (none = 0), तो 8 - 0 = 8 गिलहरियाँ बचती हैं!"
  },

  // Pair 3: Unit 3 (3-3 Use Doubles to Subtract)
  {
    id: 5,
    pairId: 'pair-3',
    q: "Worksheet 3-3: Brian has 18 CDs. He gives 9 CDs to his brother. Which doubles subtraction fact solves this?",
    hi: "ब्रायन के पास 18 सीडी हैं। वह अपने भाई को 9 देता है। कौन सा डबल्स घटाव तथ्य इसे हल करता है?",
    opts: [
      "18 - 9 = 9 (since 9 + 9 = 18)",
      "18 - 8 = 10",
      "18 - 10 = 8",
      "9 + 8 = 17"
    ],
    ans: 0,
    expl: "वर्कशीट 3-3, प्रश्न 5: डबल्स तथ्य 9 + 9 = 18 से 18 - 9 = 9 सीडी प्राप्त होती हैं!"
  },
  {
    id: 6,
    pairId: 'pair-3',
    q: "Worksheet 3-3: Delia bakes 18 cherry pies and has 9 pies left at the end of the market. Doug brings 12 peppers and has 6 left. How many did each sell?",
    hi: "डेलिया 18 में से 9 बचाती है, डग 12 में से 6 बचाता है। दोनों ने क्रमशः कितने बेचे?",
    opts: [
      "Delia sold 9 pies, Doug sold 6 peppers",
      "Delia sold 8 pies, Doug sold 5 peppers",
      "Delia sold 10 pies, Doug sold 7 peppers",
      "Delia sold 18 pies, Doug sold 12 peppers"
    ],
    ans: 0,
    expl: "18 - 9 = 9 पाई और 12 - 6 = 6 मिर्च! दोनों प्रश्न डबल्स सबट्रैक्शन (18 - 9 = 9 और 12 - 6 = 6) पर आधारित हैं।"
  },

  // Pair 4: Unit 4 (3-4 Find a Pattern)
  {
    id: 7,
    pairId: 'pair-4',
    q: "Worksheet 3-4: Kim plants 3 tulips in row 1, 6 in row 2, and 9 in row 3. If she continues, how many tulips in row 6?",
    hi: "किम पंक्ति 1 में 3, पंक्ति 2 में 6, पंक्ति 3 में 9 ट्यूलिप लगाती है। पंक्ति 6 में कितने ट्यूलिप होंगे?",
    opts: [
      "18 tulips (Rule: add 3 each row; 3, 6, 9, 12, 15, 18)",
      "15 tulips (stopping at row 5)",
      "21 tulips (adding 3 to 18)",
      "12 tulips (stopping at row 4)"
    ],
    ans: 0,
    expl: "पैटर्न नियम: हर पंक्ति में +3 ट्यूलिप। पंक्ति 4 = 12, पंक्ति 5 = 15, पंक्ति 6 = 18 ट्यूलिप!"
  },
  {
    id: 8,
    pairId: 'pair-4',
    q: "Worksheet 3-4: Beth's Bookstore starts with 20 puzzle books. In 1 hr they have 17, in 2 hrs they have 14. After how many hours will there be only 2 books left?",
    hi: "बेथ की किताबों की दुकान 20 से शुरू होती है। 1 घंटे बाद 17, 2 घंटे बाद 14। कितने घंटे बाद केवल 2 किताबें बचेंगी?",
    opts: [
      "After 6 hours (20, 17, 14, 11, 8, 5, 2)",
      "After 5 hours (at 5 hours there are 5 books)",
      "After 7 hours (reaches below 0)",
      "After 4 hours (at 4 hours there are 8 books)"
    ],
    ans: 0,
    expl: "पैटर्न नियम: हर घंटे -3 किताबें। 0h:20, 1h:17, 2h:14, 3h:11, 4h:8, 5h:5, 6h:2। अतः 6 घंटे बाद!"
  },

  // Pair 5: Unit 5 (3-5 & 3-6 Related Facts & Missing Addends)
  {
    id: 9,
    pairId: 'pair-5',
    q: "Worksheet 3-5: If 8 + 5 = 13, which related subtraction sentence helps you subtract 13 - 5?",
    hi: "यदि 8 + 5 = 13 है, तो 13 - 5 को हल करने में कौन सा संबंधित तथ्य मदद करता है?",
    opts: [
      "13 - 5 = 8",
      "13 - 8 = 6",
      "13 + 5 = 18",
      "8 - 5 = 3"
    ],
    ans: 0,
    expl: "वर्कशीट 3-5: जोड़ तथ्य 8 + 5 = 13 सीधे संबंधित घटाव 13 - 5 = 8 देता है!"
  },
  {
    id: 10,
    pairId: 'pair-5',
    q: "Worksheet 3-6: David's friends are flying 16 kites. 7 kites are still flying, rest trapped in trees. What is the missing addend in 7 + [ ] = 16?",
    hi: "16 में से 7 पतंगें उड़ रही हैं। 7 + [ ] = 16 में लुप्त संख्या क्या है?",
    opts: [
      "9 (16 - 7 = 9 kites)",
      "8 (16 - 8 = 8 kites)",
      "11 (18 - 7 = 11 kites)",
      "23 (16 + 7 = 23 kites)"
    ],
    ans: 0,
    expl: "वर्कशीट 3-6, प्रश्न 5: 7 + [9] = 16 ➔ 16 - 7 = 9 पतंगें पेड़ों में फंसी हैं!"
  },

  // Pair 6: Unit 6 (3-7 & 3-8 Fact Families & Choose a Strategy)
  {
    id: 11,
    pairId: 'pair-6',
    q: "Worksheet 3-7: A fact triangle has 15 at top, and 9 and 6 at bottom. Which of these is NOT a member of this fact family?",
    hi: "फैक्ट ट्रायंगल में ऊपर 15, नीचे 9 और 6 हैं। इनमें से कौन इस फैक्ट फैमिली का सदस्य नहीं है?",
    opts: [
      "15 + 6 = 21 (Not in family!)",
      "6 + 9 = 15",
      "15 - 9 = 6",
      "15 - 6 = 9"
    ],
    ans: 0,
    expl: "फैक्ट फैमिली (15, 9, 6) में केवल 6+9=15, 9+6=15, 15-9=6, और 15-6=9 होते हैं। 15+6=21 बाहर का वाक्य है!"
  },
  {
    id: 12,
    pairId: 'pair-6',
    q: "Worksheet 3-8: Ray paints red, yellow, and blue stripes. Red is not first. Yellow is next to blue. Red is next to blue. What is the correct order?",
    hi: "रे लाल, पीली और नीली धारियाँ बनाता है। लाल पहली नहीं है। पीली नीली के बगल में है, लाल नीली के बगल में है। सही क्रम क्या है?",
    opts: [
      "Yellow, Blue, Red",
      "Red, Blue, Yellow",
      "Blue, Yellow, Red",
      "Yellow, Red, Blue"
    ],
    ans: 0,
    expl: "वर्कशीट 3-8, प्रश्न 1: चूँकि पीली और लाल दोनों नीली के बगल में हैं, इसलिए नीली बीच में होगी। लाल पहली नहीं हो सकती, अतः क्रम Yellow, Blue, Red है!"
  }
];
