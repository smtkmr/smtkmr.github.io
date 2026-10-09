import React, { useState, useEffect } from 'react';
import { SELECTABLE_OBJECTS, SelectableObject, getNumberContext } from '../utils/numberEngine';
import { IllustrationObject } from './IllustrationObject';
import { speakText, playDotPopSound, playSuccessChime } from '../utils/sound';

interface ExactObjectsLabProps {
  currentNumber: number;
  selectedObject: SelectableObject;
  onSelectObject: (obj: SelectableObject) => void;
}

export const ExactObjectsLab: React.FC<ExactObjectsLabProps> = ({
  currentNumber,
  selectedObject,
  onSelectObject,
}) => {
  const [countedSet, setCountedSet] = useState<Set<number>>(new Set());
  const ctx = getNumberContext(currentNumber);

  // Reset counted set when number or object changes
  useEffect(() => {
    setCountedSet(new Set());
  }, [currentNumber, selectedObject.id]);

  const handleTapItem = (idx: number) => {
    const num = idx + 1;
    setCountedSet((prev) => {
      const next = new Set(prev);
      if (next.has(num)) {
        next.delete(num);
      } else {
        next.add(num);
        playDotPopSound();
        if (num === currentNumber) {
          playSuccessChime();
          speakText(`All ${currentNumber} counted! Great job!`, 'en-US');
        } else {
          speakText(String(num), 'en-US');
        }
      }
      return next;
    });
  };

  const handleCountAll = () => {
    const all = new Set<number>();
    for (let i = 1; i <= currentNumber; i++) {
      all.add(i);
    }
    setCountedSet(all);
    playSuccessChime();
    speakText(`Exactly ${currentNumber} ${currentNumber === 1 ? selectedObject.nameEn : selectedObject.namePluralEn}! ${ctx.wordEn}!`, 'en-US');
  };

  const handleResetCount = () => {
    setCountedSet(new Set());
    playDotPopSound();
  };

  // Group items into rows of 10 for crystal-clear mathematical tens and units
  const totalRows = Math.ceil(currentNumber / 10);
  const rows: Array<number[]> = [];
  for (let r = 0; r < totalRows; r++) {
    const rowItems: number[] = [];
    const start = r * 10;
    const end = Math.min(start + 10, currentNumber);
    for (let i = start; i < end; i++) {
      rowItems.push(i);
    }
    rows.push(rowItems);
  }

  const countedCount = countedSet.size;

  return (
    <section className="pt-7 md:pt-11" id="exact-objects-lab" aria-labelledby="exact-lab-title">
      <div className="flex justify-between items-end flex-wrap gap-3 mb-4">
        <div>
          <p className="text-[11px] tracking-[1.4px] font-[800] text-[#059669] uppercase font-['Outfit',sans-serif]">
            Exact Quantity Counting Lab · ठीक {currentNumber} वस्तुएं गिनें
          </p>
          <h2
            id="exact-lab-title"
            className="text-2xl sm:text-3xl font-[900] text-[#111827] mt-1 tracking-[-0.5px] font-['Outfit',sans-serif]"
          >
            Count Exactly {currentNumber} {currentNumber === 1 ? selectedObject.nameEn : selectedObject.namePluralEn} ({ctx.wordEnUpper})
          </h2>
        </div>
        <p className="text-[#047857] font-[700] text-sm md:text-base">
          Screen par poori <strong>{currentNumber} {selectedObject.nameHi}</strong> hain. Har object par tap karke ginein!
        </p>
      </div>

      {/* Main Container */}
      <div className="bg-white border-[3px] border-[#34d399] rounded-[24px] p-4.5 sm:p-6 shadow-[0_6px_0_#d1fae5] flex flex-col gap-5">
        {/* 1. Object Selector Bar (choose any object like color swatches) */}
        <div className="bg-[#fffbeb] border-[2.5px] border-[#fcd34d] rounded-2xl p-3.5 sm:p-4">
          <div className="flex justify-between items-center flex-wrap gap-2 mb-2.5">
            <span className="text-xs font-[900] text-[#065f46] font-['Outfit',sans-serif] uppercase tracking-wider">
              ✦ Choose Object to Count ({currentNumber} {selectedObject.namePluralEn}):
            </span>
            <span className="text-xs text-[#92400e] font-[800] font-['Noto_Sans_Devanagari',sans-serif]">
              पसंदीदा वस्तु चुनें (स्क्रीन पर ठीक {currentNumber} वस्तुएं दिखेंगी)
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {SELECTABLE_OBJECTS.map((obj) => {
              const isSelected = obj.id === selectedObject.id;
              return (
                <button
                  key={obj.id}
                  type="button"
                  onClick={() => onSelectObject(obj)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-[800] transition-all flex-shrink-0 font-['Outfit',sans-serif] ${
                    isSelected
                      ? 'bg-[#10b981] text-white shadow-md ring-2 ring-emerald-300 scale-105'
                      : 'bg-white text-[#1f2937] border border-[#a7f3d0] hover:bg-emerald-50'
                  }`}
                >
                  <IllustrationObject type={obj.id} size={24} />
                  <span>{obj.nameEn}</span>
                  <span className="opacity-80 text-[11px]">({obj.nameHi})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Tens & Ones Mathematical Breakdown Banner */}
        <div className="bg-[#f0fdf4] border-2 border-[#10b981] rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 rounded-2xl bg-[#dcfce7] border-2 border-[#059669] grid place-items-center text-xl font-[900] text-[#065f46] font-['Outfit',sans-serif]">
              {currentNumber}
            </span>
            <div>
              <div className="font-['Outfit',sans-serif] font-[900] text-base sm:text-lg text-[#111827]">
                Total: Exactly {currentNumber} {currentNumber === 1 ? selectedObject.nameEn : selectedObject.namePluralEn}
                {currentNumber > 10 && (
                  <span className="text-[#059669] ml-2 text-sm font-[800]">
                    ({ctx.tens} Tens + {ctx.ones} Ones)
                  </span>
                )}
              </div>
              <div className="text-xs sm:text-sm font-[800] text-[#059669] font-['Noto_Sans_Devanagari',sans-serif]">
                पूरी संख्या: {ctx.wordHi} ({ctx.deva}) — {currentNumber > 10 ? `${ctx.tens} दहाई (${ctx.tens * 10}) + ${ctx.ones} इकाई (${ctx.ones}) = ${currentNumber}` : `कुल ${currentNumber} वस्तुएं`}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-white border border-[#a7f3d0] px-3 py-1.5 rounded-xl text-xs font-[800] text-[#065f46]">
              Counted: {countedCount} / {currentNumber}
            </span>
            <button
              type="button"
              onClick={handleCountAll}
              className="bg-[#10b981] hover:bg-[#059669] text-white px-3.5 py-1.5 rounded-xl text-xs font-[800] shadow-sm transition-transform active:scale-95"
            >
              ✓ Count All
            </button>
            <button
              type="button"
              onClick={handleResetCount}
              className="border border-[#cbd5e1] bg-white hover:bg-slate-50 text-[#475569] px-2.5 py-1.5 rounded-xl text-xs font-[700]"
            >
              ↺ Reset
            </button>
          </div>
        </div>

        {/* 3. The Visual Objects Board: EXACTLY `currentNumber` Objects! */}
        <div className="flex flex-col gap-4 max-h-[550px] overflow-y-auto pr-1">
          {rows.map((row, rIdx) => {
            const rowLabel = currentNumber > 10 ? `Group ${rIdx + 1} (${rIdx * 10 + 1} to ${Math.min((rIdx + 1) * 10, currentNumber)})` : `All ${currentNumber} Items`;
            return (
              <div
                key={rIdx}
                className="bg-[#fafaf9] border-2 border-dashed border-[#e7e5e4] rounded-2xl p-3 sm:p-4 flex flex-col gap-2"
              >
                {currentNumber > 10 && (
                  <div className="flex justify-between items-center text-[11px] font-[800] text-[#78716c] uppercase font-['Outfit',sans-serif]">
                    <span>{rowLabel}</span>
                    <span>{row.length} {selectedObject.namePluralEn}</span>
                  </div>
                )}

                {/* 10-column or responsive flex grid */}
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 sm:gap-2.5">
                  {row.map((itemIdx) => {
                    const itemNum = itemIdx + 1;
                    const isCounted = countedSet.has(itemNum);
                    return (
                      <button
                        key={itemNum}
                        type="button"
                        onClick={() => handleTapItem(itemIdx)}
                        className={`aspect-square rounded-2xl p-1.5 flex flex-col items-center justify-center transition-all relative ${
                          isCounted
                            ? 'bg-[#dcfce7] border-[2.5px] border-[#10b981] shadow-md scale-105'
                            : 'bg-white border-2 border-[#cbd5e1] hover:border-[#10b981] hover:scale-102'
                        }`}
                        title={`Item #${itemNum}`}
                      >
                        <IllustrationObject type={selectedObject.id} size={38} />
                        {/* Number badge on bottom */}
                        <span
                          className={`text-[10px] font-[900] font-['Outfit',sans-serif] px-1 rounded-md mt-0.5 leading-none ${
                            isCounted ? 'bg-[#059669] text-white' : 'bg-slate-100 text-[#475569]'
                          }`}
                        >
                          #{itemNum}
                        </span>

                        {isCounted && (
                          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#10b981] text-white text-[10px] grid place-items-center font-bold">
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Pronunciation bar */}
        <div className="border-t border-[#d1fae5] pt-3 flex items-center justify-between flex-wrap gap-2">
          <p className="text-xs sm:text-sm font-[800] text-[#065f46]">
            Tip: Click any item to count it aloud! Total visible objects: <strong>{currentNumber}</strong>.
          </p>
          <button
            type="button"
            onClick={() => speakText(`There are exactly ${currentNumber} ${currentNumber === 1 ? selectedObject.nameEn : selectedObject.namePluralEn}! ${ctx.wordEn}!`, 'en-US')}
            className="border border-[#34d399] bg-[#ecfdf5] hover:bg-[#d1fae5] rounded-xl px-3 py-1.5 text-xs text-[#059669] font-[800] flex items-center gap-1.5"
          >
            🔊 Say "{currentNumber} {selectedObject.namePluralEn}"
          </button>
        </div>
      </div>
    </section>
  );
};
