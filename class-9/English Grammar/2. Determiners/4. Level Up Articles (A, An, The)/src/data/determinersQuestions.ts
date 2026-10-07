import { ConceptQuestion, ExamQuestion } from './determinersData';

export const conceptPracticeQuestions: ConceptQuestion[] = [
  {
    id: 1,
    sub: '1a',
    pairTitle: '1A. Consonant vs Vowel Sound Rules',
    q: "My cousin is studying at ______ university in Germany and drives ______ European car.",
    opts: ["an / an", "a / a", "an / a", "a / an"],
    ans: 1,
    expl: "'University' and 'European' both begin with the consonant sound /juː/ ('य'). Therefore, both require the article 'a'."
  },
  {
    id: 2,
    sub: '1a',
    pairTitle: '1A. Consonant vs Vowel Sound Rules',
    q: "The shopkeeper returned ______ one-rupee coin and gave me ______ useful receipt.",
    opts: ["an / an", "an / a", "a / a", "the / the"],
    ans: 2,
    expl: "'One-rupee' begins with the consonant sound /w/ ('व') and 'useful' begins with the consonant sound /juː/ ('य'). Hence, 'a' is used for both."
  },
  {
    id: 3,
    sub: '1b',
    pairTitle: '1B. Silent \'h\' Words & Contrasts',
    q: "The young prince was proclaimed as ______ heir to the empire, and he was praised as ______ honourable ruler.",
    opts: ["a / a", "an / an", "an / a", "a / an"],
    ans: 1,
    expl: "In both 'heir' (pronounced /eə/) and 'honourable' (pronounced /ˈɒn.ər.ə.bəl/), the initial 'h' is silent and the words begin with a vowel sound, so 'an' is required."
  },
  {
    id: 4,
    sub: '1b',
    pairTitle: '1B. Silent \'h\' Words & Contrasts',
    q: "We stayed at ______ hotel near the hill and spent ______ hour watching the sunset.",
    opts: ["an / an", "a / an", "an / a", "a / a"],
    ans: 1,
    expl: "'Hotel' has a voiced 'h' (consonant sound /h/), taking 'a'; whereas 'hour' has a silent 'h' (vowel sound /aʊə/), taking 'an'."
  },
  {
    id: 5,
    sub: '1c',
    pairTitle: '1C. Abbreviations with Vowel Sound',
    q: "Ramesh is ______ M.L.A. from our district, while his private secretary is ______ U.D.C.",
    opts: ["an / an", "a / a", "an / a", "the / the"],
    ans: 2,
    expl: "'M.L.A.' begins with the vowel sound /em/, taking 'an'. 'U.D.C.' begins with the consonant sound /juː/, taking 'a'."
  },
  {
    id: 6,
    sub: '1c',
    pairTitle: '1C. Abbreviations with Vowel Sound',
    q: "The victim lodged ______ F.I.R. with ______ S.P. of the city.",
    opts: ["an / an", "a / a", "a / an", "an / a"],
    ans: 0,
    expl: "Both 'F.I.R.' (/ef/) and 'S.P.' (/es/) begin with vowel sounds when their initial letters are pronounced, taking 'an'."
  },
  {
    id: 7,
    sub: '1d',
    pairTitle: '1D. Adjective + Noun & Exclamations',
    q: "What ______ beautiful picture! It illustrates ______ big elephant walking through a forest.",
    opts: ["a / an", "a / a", "an / an", "the / the"],
    ans: 1,
    expl: "In exclamations: 'What a beautiful picture!'. In 'a big elephant', the adjective 'big' begins with consonant sound /b/, requiring 'a'."
  },
  {
    id: 8,
    sub: '1d',
    pairTitle: '1D. Sense of One & Per',
    q: "He did not say ______ word to me, though apples were sold at sixty rupees ______ dozen.",
    opts: ["the / a", "a / a", "one / per", "an / an"],
    ans: 1,
    expl: "'a word' conveys the numerical sense of 'one'. 'sixty rupees a dozen' uses 'a' in the sense of 'per'."
  },
  {
    id: 9,
    sub: '1e',
    pairTitle: '1E. Stranger Mr/Mrs + Surname',
    q: "______ Mr Sharma called to see you while you were out. (The speaker does not know him.)",
    opts: ["A", "An", "The", "No article"],
    ans: 0,
    expl: "When a speaker refers to an unfamiliar stranger by title and surname, 'a Mr Sharma' is used to mean 'a certain Mr Sharma'."
  },
  {
    id: 10,
    sub: '1e',
    pairTitle: '1E. Stranger Mr/Mrs + Surname',
    q: "She introduced herself as ______ Miss Gupta who recently joined the accounting branch.",
    opts: ["the", "a", "an", "no article"],
    ans: 1,
    expl: "'a Miss Gupta' indicates an unfamiliar person who is unknown to the listener/speaker."
  },
  {
    id: 11,
    sub: '2a',
    pairTitle: '2A. Comparing Two Great Persons',
    q: "In Hindi literature, Sumitranandan Pant is regarded as ______ Wordsworth of India.",
    opts: ["a", "the", "an", "no article"],
    ans: 1,
    expl: "When two celebrated historical figures are compared and a proper noun is used as a standard of comparison, 'the' is mandatory: 'the Wordsworth of India'."
  },
  {
    id: 12,
    sub: '2a',
    pairTitle: '2A. Comparing Two Great Persons',
    q: "Historians often call Samudragupta ______ Napoleon of ancient India.",
    opts: ["the", "a", "an", "no article"],
    ans: 0,
    expl: "'the Napoleon of ancient India' - Proper noun used with 'the' to denote qualities of a famous standard."
  },
  {
    id: 13,
    sub: '2b',
    pairTitle: '2B. Historical Buildings & Religious Books',
    q: "Tourists gathered to admire ______ Tajmahal before reciting verses from ______ Geeta.",
    opts: ["a / a", "the / the", "the / a", "no article / the"],
    ans: 1,
    expl: "Both historical monuments ('the Tajmahal') and sacred religious scriptures ('the Geeta') require the definite article 'the'."
  },
  {
    id: 14,
    sub: '2b',
    pairTitle: '2B. Historical Buildings & Religious Books',
    q: "The President addressed the citizens from the ramparts of ______ Red Fort on Independence Day.",
    opts: ["the", "a", "an", "no article"],
    ans: 0,
    expl: "Prominent historical monuments take 'the': 'the Red Fort', 'the Tajmahal'."
  },
  {
    id: 15,
    sub: '2c',
    pairTitle: '2C. Adjectives Used as Nouns',
    q: "In a just and democratic welfare society, ______ rich should always assist ______ poor.",
    opts: ["a / a", "the / the", "the / a", "no article / no article"],
    ans: 1,
    expl: "When adjectives represent an entire social class or category of people, 'the' is used ('the rich', 'the poor') and they take plural verbs."
  },
  {
    id: 16,
    sub: '2c',
    pairTitle: '2C. Adjectives Used as Nouns',
    q: "Ancient proverbs proclaim that fortune favors ______ brave and supports ______ weak.",
    opts: ["the / the", "a / a", "the / a", "no article / the"],
    ans: 0,
    expl: "'the brave' (= brave people) and 'the weak' (= weak people) function as plural collective nouns with 'the'."
  },
  {
    id: 17,
    sub: '2d',
    pairTitle: '2D. Rivers, Oceans, Deserts & Mountain Ranges',
    q: "The sacred waters of ______ Ganga flow into the sea, while ______ Thar desert lies in Rajasthan.",
    opts: ["a / a", "the / the", "the / a", "no article / the"],
    ans: 1,
    expl: "Both rivers ('the Ganga', 'the Yamuna') and deserts ('the Thar', 'the Sahara') take 'the'."
  },
  {
    id: 18,
    sub: '2d',
    pairTitle: '2D. Rivers, Oceans, Deserts & Mountain Ranges',
    q: "Trekkers crossed ______ Himalayas, but their leader advised against scaling ______ Mount Everest without oxygen.",
    opts: ["the / the", "the / no article", "no article / the", "a / the"],
    ans: 1,
    expl: "Mountain chains take 'the' ('the Himalayas', 'the Alps'), but individual mountain peaks take no article ('Mount Everest', 'Mount Abu')."
  },
  {
    id: 19,
    sub: '2e',
    pairTitle: '2E. Heavenly Bodies & Superlatives',
    q: "Astronomers observe that ______ moon shines bright, but ______ sun is ______ richest source of energy.",
    opts: ["the / the / the", "a / a / the", "the / the / a", "no article / the / the"],
    ans: 0,
    expl: "Unique astronomical bodies ('the moon', 'the sun') and superlative adjectives ('the richest') all take 'the'."
  },
  {
    id: 20,
    sub: '2e',
    pairTitle: '2E. Heavenly Bodies & Superlatives',
    q: "The editor published the report in ______ Hindustan Times, calling him ______ best leader of the year.",
    opts: ["the / the", "a / the", "the / a", "no article / the"],
    ans: 0,
    expl: "Prominent newspapers ('the Hindustan Times') and superlative degrees ('the best') require 'the'."
  }
];

export const toughExamQuestions: ExamQuestion[] = [
  {
    id: 1,
    unit: 'indefinite',
    label: 'Unit 01: Indefinite Articles',
    q: "Although he is ______ M.A. in English, he could not explain ______ unique grammatical structure.",
    opts: ["an / a", "a / an", "an / an", "a / a"],
    ans: 0,
    expl: "'M.A.' begins with the vowel sound /em/, requiring 'an'. 'Unique' begins with the consonant sound /juː/, requiring 'a'."
  },
  {
    id: 2,
    unit: 'indefinite',
    label: 'Unit 01: Indefinite Articles',
    q: "My father is ______ M.L.A. while his junior colleague works as ______ U.D.C. in the secretariat.",
    opts: ["a / an", "an / a", "an / an", "the / the"],
    ans: 1,
    expl: "Textbook Exercise-2: 'an M.L.A.' (sound /em/) and 'a U.D.C.' (sound /juː/)."
  },
  {
    id: 3,
    unit: 'indefinite',
    label: 'Unit 01: Indefinite Articles',
    q: "The patient had to wait for ______ hour because the surgeon was attending ______ international conference.",
    opts: ["a / an", "an / a", "an / an", "the / the"],
    ans: 2,
    expl: "'Hour' has a silent 'h' (sound /aʊə/) taking 'an'; 'international' begins with vowel sound /ɪ/ taking 'an'."
  },
  {
    id: 4,
    unit: 'indefinite',
    label: 'Unit 01: Indefinite Articles',
    q: "The pedestrian was hit by ______ one-eyed beggar while crossing ______ road near the station.",
    opts: ["an / the", "a / a", "a / the", "an / a"],
    ans: 2,
    expl: "'One-eyed' begins with consonant sound /w/ taking 'a'. The road is specific in context, taking 'the'."
  },
  {
    id: 5,
    unit: 'definite',
    label: 'Unit 02: Definite Article The',
    q: "Critics universally acknowledge that Kalidas is ______ Shakespeare of Indian Sanskrit literature.",
    opts: ["a", "an", "the", "no article"],
    ans: 2,
    expl: "Textbook rule (d): 'Kalidas is the Shakespeare of India'. When a proper noun is used to represent standard greatness, 'the' is required."
  },
  {
    id: 6,
    unit: 'definite',
    label: 'Unit 02: Definite Article The',
    q: "Literary scholars agree that Sumitranandan Pant is ______ Wordsworth of modern Hindi poetry.",
    opts: ["the", "a", "an", "no article"],
    ans: 0,
    expl: "Textbook rule (d): 'Sumitranandan Pant is the Wordsworth of India'."
  },
  {
    id: 7,
    unit: 'definite',
    label: 'Unit 02: Definite Article The',
    q: "The holy pilgrims took a dip in ______ Ganga and offered prayers facing ______ sun.",
    opts: ["a / the", "the / the", "the / a", "no article / the"],
    ans: 1,
    expl: "Sacred rivers ('the Ganga') and celestial bodies ('the sun') both take 'the'."
  },
  {
    id: 8,
    unit: 'definite',
    label: 'Unit 02: Definite Article The',
    q: "The expedition team scaled ______ Himalayas, but pitched their tents at the base of ______ Mount Everest.",
    opts: ["the / the", "the / no article", "no article / the", "a / the"],
    ans: 1,
    expl: "Mountain chains take 'the Himalayas', but individual peaks take no article ('Mount Everest')."
  },
  {
    id: 9,
    unit: 'definite',
    label: 'Unit 02: Definite Article The',
    q: "Ancient monuments like ______ Red Fort and scriptures like ______ Geeta represent our heritage.",
    opts: ["the / the", "a / the", "the / a", "no article / no article"],
    ans: 0,
    expl: "Both historical monuments ('the Red Fort') and religious scriptures ('the Geeta') take 'the'."
  },
  {
    id: 10,
    unit: 'definite',
    label: 'Unit 02: Definite Article The',
    q: "Every civilized administration has an obligation to ensure that ______ rich do not exploit ______ weak.",
    opts: ["a / a", "the / the", "the / a", "no article / the"],
    ans: 1,
    expl: "Adjectives used as plural nouns representing entire groups take 'the': 'the rich', 'the weak'."
  },
  {
    id: 11,
    unit: 'definite',
    label: 'Unit 02: Definite Article The',
    q: "The diplomat reads ______ Hindustan Times daily while staying near ______ Arabian sea.",
    opts: ["a / the", "the / a", "no article / the", "the / the"],
    ans: 3,
    expl: "Prominent newspapers ('the Hindustan Times') and seas ('the Arabian sea') take 'the'."
  },
  {
    id: 12,
    unit: 'definite',
    label: 'Unit 02: Definite Article The',
    q: "Astronomers confirm that ______ earth moves around ______ sun in an elliptical orbit.",
    opts: ["the / the", "an / the", "the / a", "no article / the"],
    ans: 0,
    expl: "Heavenly bodies take 'the': 'the earth', 'the sun'."
  },
  {
    id: 13,
    unit: 'omission',
    label: 'Unit 03: Omission & Traps',
    q: "______ Gold is a precious metal, but ______ gold of South Africa is world famous for its purity.",
    opts: ["The / the", "A / the", "No article / no article", "No article / the"],
    ans: 3,
    expl: "Material nouns in general take no article ('Gold is a precious metal'), but specific qualified instances take 'the' ('The gold of South Africa')."
  },
  {
    id: 14,
    unit: 'omission',
    label: 'Unit 03: Omission & Traps',
    q: "______ English is widely spoken by ______ English across the British Isles.",
    opts: ["The / the", "The / no article", "An / the", "No article / the"],
    ans: 3,
    expl: "Languages take no article ('English is spoken'), but nationalities/people take 'the' ('the English')."
  },
  {
    id: 15,
    unit: 'omission',
    label: 'Unit 03: Omission & Traps',
    q: "______ poet and philosopher ______ arrived to deliver the convocation address. (Single person)",
    opts: ["The / has", "The / have", "A / are", "No article / have"],
    ans: 0,
    expl: "When one article precedes the first noun only ('The poet and philosopher'), it refers to a single individual and takes a singular verb ('has')."
  },
  {
    id: 16,
    unit: 'omission',
    label: 'Unit 03: Omission & Traps',
    q: "The doctor advised: '______ higher you climb the mountain, ______ cooler you will feel.'",
    opts: ["A / a", "The / a", "The / the", "No article / no article"],
    ans: 2,
    expl: "Double comparative structures require 'the' before both comparatives: 'The higher... the cooler'."
  },
  {
    id: 17,
    unit: 'omission',
    label: 'Unit 03: Omission & Traps',
    q: "The injured victim was admitted to ______ hospital, but his lawyer came to ______ hospital to record statements.",
    opts: ["the / the", "the / no article", "a / a", "no article / the"],
    ans: 3,
    expl: "For primary medical purpose, no article is used ('to hospital'); for a visitor or secondary purpose, 'the hospital' is used."
  },
  {
    id: 18,
    unit: 'omission',
    label: 'Unit 03: Omission & Traps',
    q: "The thief was sentenced and locked up in ______ prison, while the social worker visited ______ prison.",
    opts: ["no article / the", "the / the", "a / the", "the / no article"],
    ans: 0,
    expl: "A convicted prisoner goes to 'prison' (primary purpose, no article); an outside visitor visits 'the prison' ('the')."
  },
  {
    id: 19,
    unit: 'omission',
    label: 'Unit 03: Omission & Traps',
    q: "We usually have ______ dinner at 8:30 PM, but yesterday they hosted ______ grand dinner in honor of the guests.",
    opts: ["a / a", "the / the", "no article / no article", "no article / a"],
    ans: 3,
    expl: "Ordinary daily meals take no article ('have dinner'), but meals qualified by an adjective take 'a' ('a grand dinner')."
  },
  {
    id: 20,
    unit: 'omission',
    label: 'Unit 03: Omission & Traps',
    q: "My teacher provided me with ______ valuable advice regarding exam preparation.",
    opts: ["no article", "an", "a", "the"],
    ans: 0,
    expl: "'Advice' is an uncountable noun and cannot be preceded by 'a' or 'an'. It takes no indefinite article."
  },
  {
    id: 21,
    unit: 'exercises',
    label: 'Unit 04: Textbook Exercises Mastery',
    q: "Exercise-1 Q4: '______ burnt child dreads the fire.' Which article completes this proverb?",
    opts: ["A", "An", "The", "No article"],
    ans: 0,
    expl: "Textbook Exercise-1: 'A burnt child dreads the fire' ('burnt' begins with consonant sound /b/)."
  },
  {
    id: 22,
    unit: 'exercises',
    label: 'Unit 04: Textbook Exercises Mastery',
    q: "Exercise-1 Q5 & Q6: 'She spent ______ few months in Mumbai and asked for ______ little more tea.'",
    opts: ["the / the", "a / a", "no article / a", "a / no article"],
    ans: 1,
    expl: "Textbook Exercise-1: 'a few months' (some months) and 'a little more tea' (some small quantity)."
  },
  {
    id: 23,
    unit: 'exercises',
    label: 'Unit 04: Textbook Exercises Mastery',
    q: "Exercise-2 Q2 & Q4: 'Let us rest here for ______ while and then go for ______ walk.'",
    opts: ["the / the", "a / a", "an / a", "no article / a"],
    ans: 1,
    expl: "Textbook Exercise-2: Idiomatic phrases 'for a while' and 'go for a walk'."
  },
  {
    id: 24,
    unit: 'exercises',
    label: 'Unit 04: Textbook Exercises Mastery',
    q: "Exercise-2 Q5: 'She often tells ______ lie, but her sister always speaks ______ truth.'",
    opts: ["the / a", "a / a", "the / the", "a / the"],
    ans: 3,
    expl: "Textbook Exercise-2: Fixed idioms 'tell a lie' and 'speak the truth'."
  },
  {
    id: 25,
    unit: 'determiners',
    label: 'Unit 05: General Determiners',
    q: "In the sentence 'There is some milk in the pot and we have many books', what are 'some' and 'many'?",
    opts: [
      "Adverbs modifying the verb",
      "Determiners modifying nouns 'milk' and 'books'",
      "Prepositions showing location",
      "Conjunctions connecting clauses"
    ],
    ans: 1,
    expl: "Textbook introduction: 'some' and 'many' function as determiners modifying the nouns 'milk' and 'books'."
  },
  {
    id: 26,
    unit: 'determiners',
    label: 'Unit 05: General Determiners',
    q: "Which of the following complete sets of words represents Determiners as taught in Chapter Determiners?",
    opts: [
      "run, walk, speak, write, sing",
      "beautifully, quickly, softly, loudly",
      "a, an, the, some, any, little, few, this, that, each, every, several",
      "and, but, although, because, since"
    ],
    ans: 2,
    expl: "Main determiners listed in textbook: a, an, the, some, any, little, few, each, every, this, that, etc."
  },
  {
    id: 27,
    unit: 'indefinite',
    label: 'Unit 01: Indefinite Articles',
    q: "The patient is in critical condition and needs ______ oxygen cylinder within ______ half an hour.",
    opts: ["an / a", "an / no article", "a / a", "the / the"],
    ans: 1,
    expl: "'an oxygen cylinder' (vowel sound /ɒ/); 'half an hour' does not take an extra article before 'half'."
  },
  {
    id: 28,
    unit: 'definite',
    label: 'Unit 02: Definite Article The',
    q: "The cargo ship safely navigated through ______ Persian gulfs and sailed into ______ Indian ocean.",
    opts: ["the / the", "a / the", "the / an", "no article / the"],
    ans: 0,
    expl: "Textbook rule (h): 'the Persian gulfs' (gulf) and 'the Indian ocean' (ocean)."
  },
  {
    id: 29,
    unit: 'definite',
    label: 'Unit 02: Definite Article The',
    q: "Which of the following historical monuments and scriptures DOES NOT require the definite article 'the'?",
    opts: [
      "Tajmahal",
      "Red Fort",
      "Geeta",
      "Homer's Iliad"
    ],
    ans: 3,
    expl: "When an author's name precedes in the possessive case ('Homer's Iliad', 'Valmiki's Ramayan'), 'the' is omitted."
  },
  {
    id: 30,
    unit: 'definite',
    label: 'Unit 02: Definite Article The',
    q: "Identify the sentence that contains a GRAMMATICAL ERROR regarding article usage:",
    opts: [
      "Kalidas is the Shakespeare of India.",
      "The Himalayas are the highest mountains in the world.",
      "The Mount Everest is the highest peak in the world.",
      "The sun rises in the east and sets in the west."
    ],
    ans: 2,
    expl: "Mount Everest is an individual mountain peak and takes NO article. Saying 'The Mount Everest' is a grammatical error."
  }
];
