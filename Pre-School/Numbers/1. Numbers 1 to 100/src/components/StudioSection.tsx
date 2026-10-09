import React, { useState, useEffect } from 'react';
import { OverwritingBox } from './OverwritingBox';
import { COLOR_THEMES } from './HeroSection';
import { speakText, playSuccessChime, playDotPopSound } from '../utils/sound';
import { getNumberContext } from '../utils/numberEngine';

interface StudioSectionProps {
  currentNumber: number;
}

export const StudioSection: React.FC<StudioSectionProps> = ({ currentNumber = 1 }) => {
  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>({});
  const ctx = getNumberContext(currentNumber);

  useEffect(() => {
    setCompletedMap({});
  }, [currentNumber]);

  // 2 Master Spacious Overwriting Boards:
  // 1. Big Numeral (e.g. "46")
  // 2. 100% Complete Full Spelling (e.g. "FORTY-SIX", "ONE-HUNDRED")
  const boards = [
    {
      id: 'board-num',
      pattern: 'number-single',
      label: `Board 1 · Numeral Trace (${currentNumber})`,
      labelHi: `अंक ${currentNumber} (${ctx.deva})`,
      speak: `Board 1! Trace Number ${currentNumber}!`,
      theme: COLOR_THEMES[0], // Apple Red
    },
    {
      id: 'board-word',
      pattern: 'number-word-upper',
      label: `Board 2 · Full Spelling Trace (${ctx.wordEnUpper})`,
      labelHi: `पूरी स्पेलिंग: ${ctx.wordEnUpper} · ${ctx.wordHi}`,
      speak: `Board 2! Trace full word spelling: ${ctx.wordEn}!`,
      theme: COLOR_THEMES[1], // Emerald Mint
    },
  ];

  const completedCount = Object.values(completedMap).filter(Boolean).length;

  const handleBoxComplete = (id: string) => {
    setCompletedMap((prev) => ({ ...prev, [id]: true }));
  };

  const handleBoxReset = (id: string) => {
    setCompletedMap((prev) => ({ ...prev, [id]: false }));
  };

  const handleFillAll = () => {
    const next: Record<string, boolean> = {};
    boards.forEach((b) => {
      next[b.id] = true;
    });
    setCompletedMap(next);
    playSuccessChime();
    speakText(`All overwriting complete for Number ${currentNumber}! ${ctx.wordEn}!`, 'en-US');
  };

  const handleResetAll = () => {
    setCompletedMap({});
    playDotPopSound();
  };

  return (
    <section
      className="p-4 sm:p-7 mt-8 md:mt-11 bg-gradient-to-br from-[#ecfdf5] to-[#fffbeb] border-[3px] border-[#10b981] rounded-[26px] shadow-sm"
      id="overwrite-studio"
      aria-labelledby="studio-title"
    >
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div>
          <p className="text-[11px] tracking-[1.4px] font-[800] text-[#059669] uppercase font-['Outfit',sans-serif]">
            Maths Handwriting Board · अंक {currentNumber} और पूरी स्पेलिंग {ctx.wordEnUpper} के ऊपर हाथ फेरें
          </p>
          <h2
            id="studio-title"
            className="text-2xl sm:text-3xl font-[900] text-[#065f46] font-['Outfit',sans-serif] tracking-tight mt-0.5"
          >
            Spacious Overwriting Practice ({currentNumber} · {ctx.wordEnUpper})
          </h2>
        </div>

        {/* Global Action Buttons */}
        <div className="flex gap-2.5 items-center flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#34d399] bg-white text-xs font-[800] text-[#059669]">
            <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
            <span>★ {completedCount} of {boards.length} Boards Filled</span>
          </span>

          <button
            type="button"
            onClick={handleFillAll}
            className="bg-[#10b981] hover:bg-[#059669] text-white px-4 py-2 rounded-xl font-[800] text-xs sm:text-sm shadow-[0_3px_0_#059669] transition-transform active:translate-y-0.5"
          >
            ✨ Fill Both Boards
          </button>
          <button
            type="button"
            onClick={handleResetAll}
            className="border-2 border-[#34d399] bg-white hover:bg-emerald-50 text-[#059669] px-3 py-1.5 rounded-xl font-[800] text-xs transition-colors"
          >
            ↺ Reset
          </button>
        </div>
      </div>

      <p className="text-sm sm:text-base text-[#374151] mt-2.5 leading-relaxed">
        Full spelling is <strong>100% complete and un-truncated: {ctx.wordEnUpper} ({ctx.wordHi})</strong> with generous letter spacing so every letter is separate and easy to trace!{' '}
        <span className="font-[800] text-[#059669] font-['Noto_Sans_Devanagari',sans-serif]">
          (माउस या उंगली से डॉट्स के ऊपर लाइन खींचें, 60% भरते ही पूरा 3D रंग अपने आप खिल उठेगा!)
        </span>
      </p>

      {/* 2 Master Spacious Overwriting Boards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
        {boards.map((b) => (
          <OverwritingBox
            key={`${currentNumber}_${b.id}`}
            id={`${currentNumber}_${b.id}`}
            pattern={b.pattern}
            targetNumber={currentNumber}
            label={b.label}
            labelHi={b.labelHi}
            theme={b.theme}
            speakStr={b.speak}
            isCompleted={Boolean(completedMap[b.id])}
            onComplete={() => handleBoxComplete(b.id)}
            onReset={() => handleBoxReset(b.id)}
          />
        ))}
      </div>
    </section>
  );
};
