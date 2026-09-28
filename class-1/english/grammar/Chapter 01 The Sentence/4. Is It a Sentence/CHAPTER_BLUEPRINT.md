# Econova Class 1 Chapter Blueprint & Instructions

This document records the exact specifications and standard architecture for generating each Class 1 chapter lesson.

---

## 1. Exact Header & Footer (Never Change)
- **Header:**
  - Sticky top header, `background: #2dd4bf`, `border-bottom: 4px solid #10b981`, `min-height: 112px`.
  - Brand Mark: Yellow rounded tile (`#fde047`) tilted -8° with star `✦`.
  - Brand Name: `Econova.vip` in `Outfit` (900 weight, 44px).
  - Navigation Links: `Our classes`, `Explore & learn`, `Services` (20px `Quicksand`), plus `Let’s learn ↗` CTA button (`#10b981`).
  - No extraneous top switcher or chapter banner above this header.
- **Footer:**
  - Clean white background (`#ffffff`), `border-top: 2px solid #a7f3d0`.
  - Brand text: `Econova.vip ✦` in green (`#059669`, 30px).
  - Tagline: `© 2026 Econova.vip · Made for little minds with big ideas.`
  - Links: `Classes`, `Explore`, `Services`, `Contact`, `Back to top ↑`.

---

## 2. Typography & Color System
- **Fonts:**
  - Body: `'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif`
  - Headings & Badges: `'Outfit', 'Quicksand', sans-serif`
  - Hindi Scripts: `'Noto Sans Devanagari', sans-serif`
- **Colors:**
  - Background: Soft mint `#f0fdf4` / `#f2fbf5`
  - Brand Primary: Emerald green `#059669`
  - Accent / Buttons: Mint `#10b981` (hover `#059669`)
  - Accent Teal: `#2dd4bf`
  - Sunshine Yellow: `#fde047`
  - Cards: White `.mint-card` (border `#34d399`), Soft yellow `.amber-card` (border `#fcd34d`)

---

## 3. Structure of Every Chapter Page
1. **Hero Section:**
   - Badge pill: `Class 1 English · Chapter X · Story Play`
   - Title with curved green underline (`underline` yellow streak)
   - Hindi title & tagline
   - Summary description
   - Quick action buttons: `Read Story Play →` and `Try the questions ↘`
   - Custom thematic vector SVG artwork representing the story
2. **Characters / Cast Grid:**
   - 4 illustrated character cards with custom SVGs
   - English name, Hindi role (`अमृता (पेड़-प्रेमी बालिका)`), and description
3. **Story Tools Bar:**
   - Scene jump links
   - Toggle button: `Hide / Show pronunciation & meaning`
4. **Before You Read (if present):**
   - Preliminary sentences with English, Hindi pronunciation, and Hindi meaning
5. **Story Scenes (Acts):**
   - Sticky illustration / scene card with sequence badge
   - Dialogue cards:
     - Speaker tag & sentence number
     - Clean English sentence
     - Audio buttons (`🔊 Eng` and `🗣️ हिन्दी` via SpeechSynthesis)
     - Collapsible/togglable language support:
       - `बोलें` : Hindi phonetic pronunciation
       - `अर्थ` : Hindi translation/meaning
6. **Key Message / Advice Box:**
   - Thematic takeaway (e.g., Water Safety or Nature Protection)
7. **Word Corner (Vocabulary):**
   - Grid of word cards
   - English word, English audio button, Hindi pronunciation, Hindi audio button, and Hindi meaning
8. **Interactive Practice Questions:**
   - Section A: Multiple Choice Questions (MCQs)
   - Section B: Fill in the Blanks
   - Every question prompt MUST have English + Hindi translation:
     `Prompt in English / हिंदी अनुवाद`
   - Hint for every question with English explanation + `(हिंदी संदर्भ/अर्थ)`
   - Filter tabs: `All`, `MCQs`, `Fill in Blanks`
   - Progress bar (`X of N answers correct`)
   - "Check all answers ✓" & "↺ Reset answers" buttons

---

## 4. Workflow for New Content
When new chapter text, dialogue, vocabulary, and questions are provided:
1. Parse the chapter title, characters, scenes, and sentences.
2. Provide precise Hindi pronunciation and meanings for all sentences.
3. Keep the exact header, footer, CSS, fonts, and layout intact.
4. Format all questions with bilingual prompts and bilingual hints.
