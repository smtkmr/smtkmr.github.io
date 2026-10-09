import React, { useState } from 'react';
import { getNumberContext } from '../utils/numberEngine';
import { playSuccessChime, playDotPopSound, speakText } from '../utils/sound';

interface NumberSelectorBarProps {
  currentNumber: number;
  onSelectNumber: (n: number) => void;
}

const POPULAR_NUMBERS = [1, 2, 3, 5, 10, 20, 46, 50, 99, 100];

export const NumberSelectorBar: React.FC<NumberSelectorBarProps> = ({
  currentNumber,
  onSelectNumber,
}) => {
  const [showAllModal, setShowAllModal] = useState<boolean>(false);
  const [customInput, setCustomInput] = useState<string>('');
  const context = getNumberContext(currentNumber);

  const handleSelect = (n: number) => {
    if (n < 1 || n > 100) return;
    onSelectNumber(n);
    setShowAllModal(false);
    playSuccessChime();
    const info = getNumberContext(n);
    speakText(`Number ${n}! ${info.wordEn}! ${info.wordHi}!`, 'en-US');
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(customInput, 10);
    if (!isNaN(val) && val >= 1 && val <= 100) {
      handleSelect(val);
      setCustomInput('');
    }
  };

  return (
    <section className="w-full bg-white border-b-2 border-[#a7f3d0] py-3 px-3 sm:px-6 shadow-sm sticky top-[80px] md:top-[110px] z-40">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3 flex-wrap">
        {/* Left: Active Number Stepper & 1-100 Modal Trigger */}
        <div className="flex items-center gap-2.5 flex-wrap justify-center sm:justify-start">
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentNumber <= 1}
              onClick={() => handleSelect(currentNumber - 1)}
              className="w-9 h-9 rounded-xl border-2 border-[#34d399] bg-[#ecfdf5] hover:bg-[#d1fae5] disabled:opacity-40 disabled:cursor-not-allowed text-[#059669] font-[900] text-sm flex items-center justify-center transition-all active:scale-95 shadow-sm"
              title="Previous Number"
            >
              ←
            </button>

            <div className="flex items-center gap-2 bg-[#f0fdf4] border-2 border-[#10b981] px-3.5 py-1.5 rounded-2xl shadow-sm">
              <span className="w-8 h-8 rounded-full bg-[#fde047] text-[#065f46] font-['Outfit',sans-serif] font-[900] text-lg grid place-items-center border border-[#059669]">
                {currentNumber}
              </span>
              <div className="leading-tight">
                <div className="font-['Outfit',sans-serif] font-[900] text-sm sm:text-base text-[#111827]">
                  Number {currentNumber} ({context.wordEn})
                </div>
                <div className="text-xs font-[800] text-[#059669] font-['Noto_Sans_Devanagari',sans-serif]">
                  {context.wordHi} ({context.deva})
                </div>
              </div>
            </div>

            <button
              type="button"
              disabled={currentNumber >= 100}
              onClick={() => handleSelect(currentNumber + 1)}
              className="w-9 h-9 rounded-xl border-2 border-[#34d399] bg-[#ecfdf5] hover:bg-[#d1fae5] disabled:opacity-40 disabled:cursor-not-allowed text-[#059669] font-[900] text-sm flex items-center justify-center transition-all active:scale-95 shadow-sm"
              title="Next Number"
            >
              →
            </button>
          </div>

          {/* Direct Input Field */}
          <form onSubmit={handleCustomSubmit} className="flex items-center gap-1">
            <input
              type="number"
              min={1}
              max={100}
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="1-100"
              className="w-16 px-2 py-1.5 rounded-xl border-2 border-[#34d399] bg-white text-xs font-[900] text-[#065f46] text-center focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <button
              type="submit"
              className="bg-[#10b981] hover:bg-[#059669] text-white px-2.5 py-1.5 rounded-xl font-[800] text-xs transition-colors shadow-sm"
            >
              Go
            </button>
          </form>

          {/* All 1-100 Modal Trigger */}
          <button
            type="button"
            onClick={() => {
              playDotPopSound();
              setShowAllModal(true);
            }}
            className="bg-[#fde047] hover:bg-[#facc15] text-[#065f46] px-3.5 py-1.5 rounded-xl font-['Outfit',sans-serif] font-[900] text-xs sm:text-sm border-2 border-[#059669] shadow-sm transition-transform active:scale-95 flex items-center gap-1.5"
          >
            <span>🔢 Choose 1 – 100</span>
            <span className="text-[10px] bg-white px-1.5 py-0.5 rounded-md font-bold">Grid</span>
          </button>
        </div>

        {/* Right: Quick Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 md:pb-0 scrollbar-none">
          <span className="text-[11px] font-[800] text-[#047857] uppercase tracking-wider font-['Outfit',sans-serif] hidden lg:inline-block mr-1">
            Quick:
          </span>
          {POPULAR_NUMBERS.map((n) => {
            const isCurrent = n === currentNumber;
            return (
              <button
                key={n}
                type="button"
                onClick={() => handleSelect(n)}
                className={`px-2.5 py-1 rounded-xl text-xs font-[800] font-['Outfit',sans-serif] transition-all flex-shrink-0 ${
                  isCurrent
                    ? 'bg-[#10b981] text-white shadow-sm ring-2 ring-emerald-300 scale-105'
                    : 'bg-white text-[#065f46] border border-[#a7f3d0] hover:bg-emerald-50'
                }`}
              >
                {n}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Modal for all 100 numbers */}
      {showAllModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in">
          <div className="bg-white rounded-3xl border-[3px] border-[#34d399] max-w-[680px] w-full max-h-[85vh] flex flex-col p-4 sm:p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-3 pb-2 border-b border-emerald-100">
              <div>
                <h3 className="font-['Outfit',sans-serif] font-[900] text-xl text-[#065f46]">
                  Choose Any Number (1 to 100)
                </h3>
                <p className="text-xs text-[#059669] font-[700] font-['Noto_Sans_Devanagari',sans-serif]">
                  1 से 100 तक कोई भी संख्या चुनें — ठीक उतनी वस्तुएं और पूरी स्पेलिंग आ जाएगी!
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAllModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-[#475569] font-[900] text-sm grid place-items-center"
              >
                ✕
              </button>
            </div>

            {/* Numbers 1-100 Grid */}
            <div className="flex-1 overflow-y-auto grid grid-cols-5 sm:grid-cols-10 gap-2 p-1">
              {Array.from({ length: 100 }, (_, i) => i + 1).map((n) => {
                const isSelected = n === currentNumber;
                return (
                  <button
                    key={n}
                    type="button"
                    onClick={() => handleSelect(n)}
                    className={`aspect-square rounded-xl font-['Outfit',sans-serif] font-[900] text-sm sm:text-base flex flex-col items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-[#10b981] text-white shadow-md scale-105 ring-2 ring-emerald-300'
                        : 'bg-[#f0fdf4] hover:bg-[#dcfce7] text-[#065f46] border border-[#a7f3d0]'
                    }`}
                  >
                    <span>{n}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-3 pt-2 text-center text-xs text-[#64748b] border-t border-slate-100">
              Tip: Click any number to instantly load the full counting lab and full word overwriting boards!
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
