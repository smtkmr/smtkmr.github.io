// Comprehensive engine for numbers 1 to 100: English words, Hindi words, Devanagari numerals, real-world object contexts

export const ALL_HINDI_WORDS: string[] = [
  '',
  'एक', 'दो', 'तीन', 'चार', 'पाँच', 'छह', 'सात', 'आठ', 'नौ', 'दस',
  'ग्यारह', 'बारह', 'तेरह', 'चौदह', 'पंद्रह', 'सोलह', 'सत्रह', 'अठारह', 'उन्नीस', 'बीस',
  'इक्कीस', 'बाईस', 'तेईस', 'चौबीस', 'पच्चीस', 'छब्बीस', 'सत्ताईस', 'अट्ठाईस', 'उनतीस', 'तीस',
  'इकत्तीस', 'बत्तीस', 'तैंतीस', 'चौंतीस', 'पैंतीस', 'छत्तीस', 'सैंतीस', 'अड़तीस', 'उनतालीस', 'चालीस',
  'इकतालीस', 'बयालीस', 'तैंतालीस', 'चवालीस', 'पैंतालीस', 'छियालीस', 'सैंतालीस', 'अड़तालीस', 'उनचास', 'पचास',
  'इक्यावन', 'बावन', 'तिरपन', 'चौवन', 'पचपन', 'छप्पन', 'सत्तावन', 'अट्ठावन', 'उनसठ', 'साठ',
  'इकसठ', 'बासठ', 'तिरसठ', 'चौंसठ', 'पैंसठ', 'छियासठ', 'सरसठ', 'अड़सठ', 'उनहत्तर', 'सत्तर',
  'इकहत्तर', 'बहत्तर', 'तिहत्तर', 'चौहत्तर', 'पचहत्तर', 'छिहत्तर', 'सतहत्तर', 'अठहत्तर', 'उन्यासी', 'अस्सी',
  'इक्यासी', 'बयासी', 'तिरासी', 'चौरासी', 'पचासी', 'छियासी', 'सत्तासी', 'अट्ठासी', 'नवासी', 'नब्बे',
  'इक्यानवे', 'बानवे', 'तिरानवे', 'चौरानवे', 'पचानवे', 'छियानवे', 'सत्तानवे', 'अट्ठानवे', 'निन्यानवे', 'सौ'
];

const ONES_WORDS = [
  '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
  'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
  'Seventeen', 'Eighteen', 'Nineteen'
];

const TENS_WORDS = [
  '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
];

/** Return grammatically correct, un-truncated full English word (e.g. 46 -> "Forty-Six", 100 -> "One Hundred") */
export function numberToWords(n: number): string {
  if (n === 100) return 'One Hundred';
  if (n < 20) return ONES_WORDS[n] || String(n);
  const tens = Math.floor(n / 10);
  const rem = n % 10;
  if (rem === 0) return TENS_WORDS[tens];
  return `${TENS_WORDS[tens]}-${ONES_WORDS[rem]}`;
}

export function numberToDevanagari(n: number): string {
  const digits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  return String(n).split('').map(d => digits[Number(d)] || d).join('');
}

export function getHindiData(n: number): { wordHi: string; deva: string; countPhraseHi: string } {
  const deva = numberToDevanagari(n);
  const wordHi = ALL_HINDI_WORDS[n] || `संख्या ${n}`;
  return {
    wordHi,
    deva,
    countPhraseHi: `गिनती: ${n} वस्तुएं (${wordHi} · ${deva})`
  };
}

export interface SelectableObject {
  id: 'apple' | 'banana' | 'carrot' | 'orange' | 'heart' | 'sun' | 'milk' | 'toothbrush' | 'salad' | 'moon' | 'earth' | 'trophy';
  nameEn: string;
  namePluralEn: string;
  nameHi: string;
  color: string;
}

export const SELECTABLE_OBJECTS: SelectableObject[] = [
  { id: 'apple', nameEn: 'Apple', namePluralEn: 'Apples', nameHi: 'सेब', color: '#ef4444' },
  { id: 'banana', nameEn: 'Banana', namePluralEn: 'Bananas', nameHi: 'केले', color: '#eab308' },
  { id: 'carrot', nameEn: 'Carrot', namePluralEn: 'Carrots', nameHi: 'गाजरें', color: '#f97316' },
  { id: 'orange', nameEn: 'Orange', namePluralEn: 'Oranges', nameHi: 'संतरे', color: '#ea580c' },
  { id: 'heart', nameEn: 'Heart', namePluralEn: 'Hearts', nameHi: 'दिल', color: '#f43f5e' },
  { id: 'sun', nameEn: 'Sun', namePluralEn: 'Suns', nameHi: 'सूरज', color: '#f59e0b' },
  { id: 'milk', nameEn: 'Milk Glass', namePluralEn: 'Milk Glasses', nameHi: 'दूध गिलास', color: '#38bdf8' },
  { id: 'toothbrush', nameEn: 'Toothbrush', namePluralEn: 'Toothbrushes', nameHi: 'टूथब्रश', color: '#06b6d4' },
  { id: 'salad', nameEn: 'Salad Bowl', namePluralEn: 'Salad Bowls', nameHi: 'सलाद कटोरे', color: '#22c55e' },
  { id: 'moon', nameEn: 'Moon', namePluralEn: 'Moons', nameHi: 'चाँद', color: '#a855f7' },
  { id: 'earth', nameEn: 'Earth', namePluralEn: 'Earths', nameHi: 'धरती', color: '#0284c7' },
  { id: 'trophy', nameEn: 'Trophy', namePluralEn: 'Trophies', nameHi: 'ट्रॉफियां', color: '#ca8a04' },
];

export interface NumberContextData {
  number: number;
  wordEn: string;
  wordEnUpper: string;
  wordEnLower: string;
  wordHi: string;
  deva: string;
  tens: number;
  ones: number;
}

export function getNumberContext(n: number): NumberContextData {
  const wordEn = numberToWords(n);
  const wordEnUpper = wordEn.toUpperCase();
  const wordEnLower = wordEn.toLowerCase();
  const hi = getHindiData(n);

  const tens = Math.floor(n / 10);
  const ones = n % 10;

  return {
    number: n,
    wordEn,
    wordEnUpper,
    wordEnLower,
    wordHi: hi.wordHi,
    deva: hi.deva,
    tens,
    ones,
  };
}
