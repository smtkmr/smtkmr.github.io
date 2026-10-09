import React, { useState, useEffect } from 'react';
import { playSuccessChime, playDotPopSound, speakText } from '../utils/sound';
import { getNumberContext } from '../utils/numberEngine';

interface CheckAllBarProps {
  currentNumber: number;
  completedTasks: Record<number, boolean>;
  onCheckAll: () => void;
  onResetAll: () => void;
}

export const CheckAllBar: React.FC<CheckAllBarProps> = ({
  currentNumber = 1,
  completedTasks,
  onCheckAll,
  onResetAll,
}) => {
  const [showResults, setShowResults] = useState<boolean>(false);
  const ctx = getNumberContext(currentNumber);

  useEffect(() => {
    setShowResults(false);
  }, [currentNumber]);

  const doneCount = Object.values(completedTasks).filter(Boolean).length;
  const percentage = Math.round((doneCount / 2) * 100);

  const handleCheckAllClick = () => {
    onCheckAll();
    setShowResults(true);
    playSuccessChime();
    speakText(`Congratulations! You mastered Number ${currentNumber}! ${ctx.wordEn}! You are a Maths Superstar!`, 'en-US');
  };

  const handleResetAllClick = () => {
    onResetAll();
    setShowResults(false);
    playDotPopSound();
  };

  return (
    <>
      {/* Check All Bar */}
      <section className="bg-[#fffbeb] border-[3px] border-[#fcd34d] rounded-[22px] p-4.5 sm:p-6 mt-7 flex justify-between items-center flex-wrap gap-4 shadow-sm">
        <div>
          <h2 className="text-xl sm:text-2xl font-[900] text-[#111827] font-['Outfit',sans-serif]">
            Review &amp; Verify Mastery for Number {currentNumber} ({ctx.wordEnUpper})!
          </h2>
          <p className="text-sm text-[#4b5563] mt-0.5">
            Review your child’s progress for Number {currentNumber} ({ctx.wordEn}) and full spelling {ctx.wordEnUpper}.
          </p>
        </div>

        <div className="flex gap-3 flex-wrap items-center">
          <button
            type="button"
            onClick={handleCheckAllClick}
            className="bg-[#10b981] hover:bg-[#059669] text-white px-5 py-3 rounded-2xl font-[800] text-sm sm:text-base shadow-[0_4px_0_#059669] transition-transform active:translate-y-0.5 font-['Outfit',sans-serif]"
          >
            Verify all boards ✓
          </button>
          <button
            type="button"
            onClick={handleResetAllClick}
            className="border-2 border-[#34d399] bg-white hover:bg-emerald-50 text-[#059669] px-4 py-2.5 rounded-2xl font-[800] text-sm transition-colors"
          >
            ↺ Reset
          </button>
        </div>
      </section>

      {/* Results Box */}
      {showResults && (
        <section
          id="results"
          className="bg-white border-[3px] border-[#34d399] rounded-[22px] p-5 sm:p-6 mt-5 text-center shadow-[0_6px_0_#d1fae5] animate-in fade-in zoom-in-95 duration-300"
        >
          <h2 className="text-2xl font-[900] text-[#065f46] font-['Outfit',sans-serif]">
            🎉 Number {currentNumber} ({ctx.wordEnUpper}) Mastery Certificate
          </h2>
          <p className="text-lg font-[800] text-[#111827] mt-2 font-['Outfit',sans-serif]">
            {doneCount} of 2 Overwriting Boards Completed ({percentage}%)!
          </p>
          <p className="text-base text-[#047857] mt-2 font-[700] font-['Noto_Sans_Devanagari',sans-serif]">
            🌟 शाबाश! आपने अंक {currentNumber} और पूरी स्पेलिंग {ctx.wordEnUpper} ({ctx.wordHi}) को सही तरीके से लिखना और ठीक {currentNumber} वस्तुएं गिनना सीख लिया है!
          </p>
        </section>
      )}

      {/* Lesson End Nav */}
      <nav className="flex justify-between items-center flex-wrap gap-3.5 py-6 sm:py-8" aria-label="Lesson navigation">
        <a
          href="#exact-objects-lab"
          className="bg-[#10b981] hover:bg-[#059669] text-white px-5 py-2.5 rounded-xl font-[800] text-sm shadow-[0_3px_0_#059669] transition-transform active:translate-y-0.5 font-['Outfit',sans-serif]"
        >
          Count Exactly {currentNumber} Objects ↑
        </a>
        <a
          href="#main"
          className="text-sm font-[800] text-[#059669] hover:underline font-['Outfit',sans-serif]"
        >
          Back to Top ↑
        </a>
      </nav>
    </>
  );
};
