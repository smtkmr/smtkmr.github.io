import React, { useState } from 'react';
import { ColorTheme } from '../types';
import { IllustrationObject } from './IllustrationObject';
import { speakText, playSuccessChime } from '../utils/sound';
import { getNumberContext, SelectableObject } from '../utils/numberEngine';
import { getNumberSequenceData, getWordGeometry } from '../utils/digitGeometry';

export const COLOR_THEMES: ColorTheme[] = [
  { id: 'apple-red', name: 'Apple Red', frontStart: '#ff5f6d', frontEnd: '#e11d48', side3d: '#881337' },
  { id: 'econova-mint', name: 'Emerald Mint', frontStart: '#34d399', frontEnd: '#059669', side3d: '#064e3b' },
  { id: 'sunshine-gold', name: 'Sunshine Gold', frontStart: '#fde047', frontEnd: '#eab308', side3d: '#854d0e' },
  { id: 'sky-blue', name: 'Sky Blue', frontStart: '#38bdf8', frontEnd: '#0284c7', side3d: '#0c4a6e' },
  { id: 'royal-purple', name: 'Royal Berry', frontStart: '#c084fc', frontEnd: '#7e22ce', side3d: '#3b0764' },
];

interface HeroSectionProps {
  currentNumber: number;
  selectedObject: SelectableObject;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ currentNumber = 1, selectedObject }) => {
  const [heroMode, setHeroMode] = useState<'NUM' | 'WORD' | 'BOTH'>('BOTH');
  const [activeTheme, setActiveTheme] = useState<ColorTheme>(COLOR_THEMES[0]);

  const ctx = getNumberContext(currentNumber);

  const handleModeChange = (mode: 'NUM' | 'WORD' | 'BOTH') => {
    setHeroMode(mode);
    playSuccessChime();
  };

  const numData = getNumberSequenceData(String(currentNumber), 260);
  const wordData = getWordGeometry(ctx.wordEnUpper, 360);

  // SVG Canvas dimensions: 400 x 240
  const canvasW = 400;
  const canvasH = 240;

  // Mode NUM: Center number in full canvas
  const numScale = Math.min(300 / 260, 180 / 180);
  const numOffsetX = (canvasW - 260 * numScale) / 2;
  const numOffsetY = (canvasH - 180 * numScale) / 2;

  // Mode WORD: Center word in full canvas
  const wordScale = Math.min(360 / wordData.widthNeeded, 200 / wordData.heightNeeded);
  const wordOffsetX = (canvasW - wordData.widthNeeded * wordScale) / 2;
  const wordOffsetY = (canvasH - wordData.heightNeeded * wordScale) / 2;

  // Mode BOTH: Left for Number, Right for Word with ZERO overlap!
  const bothNumScale = 0.58;
  const bothNumX = 10;
  const bothNumY = (canvasH - 180 * bothNumScale) / 2;

  const bothWordScale = Math.min(230 / wordData.widthNeeded, 190 / wordData.heightNeeded);
  const bothWordX = 155;
  const bothWordY = (canvasH - wordData.heightNeeded * bothWordScale) / 2;

  return (
    <section className="py-6 md:py-10 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 md:gap-9 items-center" aria-labelledby="chapter-title">
      {/* Left Column */}
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border-2 border-[#34d399] bg-white text-[#059669] font-[800] text-xs max-w-full">
          <span className="w-2 h-2 rounded-full bg-[#10b981] inline-block animate-pulse"></span>
          <span>Pre-School Maths · Counting &amp; Overwriting · Number {currentNumber} ({ctx.wordEn})</span>
        </div>

        <h1
          id="chapter-title"
          className="text-4xl sm:text-5xl lg:text-[56px] leading-[1.08] tracking-[-1px] font-[900] text-[#1f2937] mt-3.5 mb-2.5 font-['Outfit',sans-serif]"
        >
          Count &amp; Overwrite<br />
          <span className="text-[#059669] relative inline-block">
            <span className="relative z-10">Number {currentNumber} ({ctx.wordEn})</span>
            <span className="absolute bottom-1.5 left-0 right-0 h-3 bg-[#fde047] -rotate-1 rounded-sm -z-0"></span>
          </span>
        </h1>

        <p className="text-base sm:text-xl text-[#059669] font-[800] mb-2.5 leading-relaxed font-['Noto_Sans_Devanagari',sans-serif]">
          अंक {currentNumber} और पूरी स्पेलिंग {ctx.wordEnUpper} ({ctx.wordHi}) के ऊपर उंगली चलाएं, ठीक {currentNumber} वस्तुएं गिनें और 3D रंग भरें!
        </p>

        <p className="max-w-[560px] text-sm sm:text-base leading-relaxed text-[#374151]">
          Look at the big <strong>3D Number {currentNumber} and full word {ctx.wordEnUpper}</strong>, count{' '}
          <strong>exactly {currentNumber} {currentNumber === 1 ? selectedObject.nameEn : selectedObject.namePluralEn}</strong> in the Counting Lab, and trace the full letters below!
        </p>

        <div className="flex items-center flex-wrap gap-3.5 my-4">
          <a
            href="#exact-objects-lab"
            className="inline-flex items-center justify-center gap-2 bg-[#10b981] hover:bg-[#059669] text-white border-0 rounded-2xl px-5 py-3 font-[800] text-sm sm:text-base shadow-[0_4px_0_#059669] hover:-translate-y-0.5 transition-all font-['Outfit',sans-serif]"
          >
            Count Exactly {currentNumber} Objects →
          </a>
          <a
            href="#overwrite-studio"
            className="text-sm sm:text-base font-[800] text-[#059669] hover:underline inline-flex items-center gap-1 font-['Outfit',sans-serif]"
          >
            Full Spelling Overwriting ↘
          </a>
        </div>

        <div className="text-xs text-[#059669] flex gap-3.5 flex-wrap font-[800]">
          <span className="bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">✦ Big 3D Number {currentNumber}</span>
          <span className="bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">✦ Full Spelling: {ctx.wordEnUpper}</span>
          <span className="bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">✦ Exactly {currentNumber} Objects</span>
        </div>
      </div>

      {/* Right Column: Hero Art Card */}
      <div className="w-full p-4 sm:p-5 bg-[#fffbeb] border-[3px] border-[#fcd34d] rounded-3xl shadow-[0_6px_0_#d1fae5]">
        {/* Header Strip with Badge OUTSIDE the canvas so nothing is covered! */}
        <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
          <span className="bg-[#fde047] text-[#065f46] font-[900] text-xs px-3 py-1 rounded-xl border-2 border-[#059669] font-['Outfit',sans-serif] shadow-xs">
            ✨ 3D FULL COLOR · {currentNumber} = {ctx.wordEnUpper}
          </span>
          <span className="text-[11px] font-[800] text-[#059669] uppercase font-['Outfit',sans-serif]">
            अंक {currentNumber} &amp; {ctx.wordHi}
          </span>
        </div>

        {/* Mode Switcher */}
        <div className="flex justify-center gap-2 mb-3 flex-wrap">
          <button
            type="button"
            onClick={() => handleModeChange('NUM')}
            className={`px-3.5 py-1.5 border-2 rounded-xl text-xs font-[800] transition-colors ${
              heroMode === 'NUM'
                ? 'bg-[#10b981] text-white border-[#10b981]'
                : 'bg-white text-[#059669] border-[#34d399] hover:bg-emerald-50'
            }`}
          >
            Number {currentNumber}
          </button>
          <button
            type="button"
            onClick={() => handleModeChange('WORD')}
            className={`px-3.5 py-1.5 border-2 rounded-xl text-xs font-[800] transition-colors ${
              heroMode === 'WORD'
                ? 'bg-[#10b981] text-white border-[#10b981]'
                : 'bg-white text-[#059669] border-[#34d399] hover:bg-emerald-50'
            }`}
          >
            Full Word: {ctx.wordEnUpper}
          </button>
          <button
            type="button"
            onClick={() => handleModeChange('BOTH')}
            className={`px-3.5 py-1.5 border-2 rounded-xl text-xs font-[800] transition-colors ${
              heroMode === 'BOTH'
                ? 'bg-[#10b981] text-white border-[#10b981]'
                : 'bg-white text-[#059669] border-[#34d399] hover:bg-emerald-50'
            }`}
          >
            Both ({currentNumber} &amp; {ctx.wordEnUpper})
          </button>
        </div>

        {/* 3D Showcase Box: Clean, 100% Unobstructed Canvas with ZERO Overlays! */}
        <div className="relative w-full max-w-[440px] mx-auto h-[230px] sm:h-[250px] bg-[radial-gradient(circle_at_50%_45%,#ffffff_0%,#f0fdf4_75%,#dcfce7_100%)] border-[3px] border-[#34d399] rounded-3xl shadow-[0_8px_0_#10b981] overflow-hidden p-1">
          <svg
            viewBox={`0 0 ${canvasW} ${canvasH}`}
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-full block"
            role="img"
            aria-label={`Big 3D Colored Number ${currentNumber}`}
          >
            <defs>
              <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={activeTheme.frontStart} />
                <stop offset="100%" stopColor={activeTheme.frontEnd} />
              </linearGradient>
            </defs>

            {/* Handwriting Guidelines */}
            <line x1="12" y1="36" x2="388" y2="36" stroke="#fca5a5" strokeWidth="1.8" />
            <line x1="12" y1="96" x2="388" y2="96" stroke="#93c5fd" strokeWidth="1.6" strokeDasharray="6 4" />
            <line x1="12" y1="172" x2="388" y2="172" stroke="#60a5fa" strokeWidth="2.2" />
            <line x1="12" y1="210" x2="388" y2="210" stroke="#fca5a5" strokeWidth="1.8" strokeDasharray="6 4" />

            {/* Mode: Number Only */}
            {heroMode === 'NUM' && (
              <g transform={`translate(${numOffsetX}, ${numOffsetY}) scale(${numScale})`}>
                <path
                  d={numData.path}
                  transform="translate(6, 6)"
                  stroke={activeTheme.side3d}
                  strokeWidth="24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <path
                  d={numData.path}
                  stroke="url(#heroGradient)"
                  strokeWidth="24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <path
                  d={numData.path}
                  transform="translate(-3, -3)"
                  stroke="#ffffff"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeOpacity={0.65}
                  fill="none"
                />
              </g>
            )}

            {/* Mode: Word Only */}
            {heroMode === 'WORD' && (
              <g transform={`translate(${wordOffsetX}, ${wordOffsetY}) scale(${wordScale})`}>
                <path
                  d={wordData.path}
                  transform="translate(5, 5)"
                  stroke={activeTheme.side3d}
                  strokeWidth="15"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <path
                  d={wordData.path}
                  stroke="url(#heroGradient)"
                  strokeWidth="15"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <path
                  d={wordData.path}
                  transform="translate(-2, -2)"
                  stroke="#ffffff"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeOpacity={0.65}
                  fill="none"
                />
              </g>
            )}

            {/* Mode: Both (Number on Left, Word on Right — Completely visible & separate!) */}
            {heroMode === 'BOTH' && (
              <g>
                {/* Number Part (Left) */}
                <g transform={`translate(${bothNumX}, ${bothNumY}) scale(${bothNumScale})`}>
                  <path
                    d={numData.path}
                    transform="translate(6, 6)"
                    stroke={activeTheme.side3d}
                    strokeWidth="24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <path
                    d={numData.path}
                    stroke="url(#heroGradient)"
                    strokeWidth="24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <path
                    d={numData.path}
                    transform="translate(-3, -3)"
                    stroke="#ffffff"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeOpacity={0.65}
                    fill="none"
                  />
                </g>

                {/* Word Part (Right) */}
                <g transform={`translate(${bothWordX}, ${bothWordY}) scale(${bothWordScale})`}>
                  <path
                    d={wordData.path}
                    transform="translate(5, 5)"
                    stroke={activeTheme.side3d}
                    strokeWidth="15"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <path
                    d={wordData.path}
                    stroke="url(#heroGradient)"
                    strokeWidth="15"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <path
                    d={wordData.path}
                    transform="translate(-2, -2)"
                    stroke="#ffffff"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeOpacity={0.65}
                    fill="none"
                  />
                </g>
              </g>
            )}
          </svg>
        </div>

        {/* Dedicated Object & Count Strip (Completely OUTSIDE the canvas so letters are never blocked!) */}
        <div className="mt-3 bg-white border-2 border-[#34d399] rounded-2xl p-2.5 shadow-sm flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#ecfdf5] border border-[#a7f3d0] grid place-items-center flex-shrink-0">
              <IllustrationObject type={selectedObject.id} size={32} animate />
            </div>
            <div className="min-w-0 leading-tight">
              <div className="text-xs sm:text-sm font-[900] text-[#065f46] font-['Outfit',sans-serif] truncate">
                COUNT = Exactly {currentNumber} {currentNumber === 1 ? selectedObject.nameEn : selectedObject.namePluralEn}
              </div>
              <div className="text-[11px] font-[800] text-[#059669] font-['Noto_Sans_Devanagari',sans-serif] truncate">
                {currentNumber} {selectedObject.nameHi} ({ctx.wordHi})
              </div>
            </div>
          </div>

          <span className="bg-[#dcfce7] text-[#065f46] border border-[#86efac] text-xs font-[900] px-2.5 py-1 rounded-xl flex-shrink-0 font-['Outfit',sans-serif]">
            #{currentNumber}
          </span>
        </div>

        {/* Color Palette Switcher */}
        <div className="flex justify-center items-center gap-2.5 mt-3 flex-wrap">
          <span className="text-[11px] font-[800] text-[#065f46] font-['Outfit',sans-serif]">3D Color:</span>
          {COLOR_THEMES.map((theme) => {
            const isSelected = theme.id === activeTheme.id;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => setActiveTheme(theme)}
                title={theme.name}
                style={{
                  background: `linear-gradient(135deg, ${theme.frontStart}, ${theme.frontEnd})`,
                }}
                className={`w-7 h-7 rounded-full shadow-sm transition-transform ${
                  isSelected ? 'scale-125 border-[3px] border-[#111827] ring-2 ring-emerald-300' : 'border-2 border-white hover:scale-110'
                }`}
              />
            );
          })}
        </div>

        {/* Audio Bar */}
        <div className="bg-white p-3 rounded-2xl border-2 border-[#34d399] text-center mt-3 shadow-sm">
          <p className="text-base sm:text-lg font-[800] font-['Outfit',sans-serif] flex items-center justify-center gap-2 flex-wrap">
            <span className="bg-[#dcfce7] text-[#065f46] px-2 py-0.5 rounded-lg border border-[#86efac]">
              {currentNumber} · {ctx.wordEnUpper}
            </span>
            <span>—</span>
            <span className="bg-[#fef9c3] text-[#854d0e] px-2 py-0.5 rounded-lg border border-[#fde047] inline-flex items-center gap-1.5">
              <IllustrationObject type={selectedObject.id} size={22} />
              Count {currentNumber} {currentNumber === 1 ? selectedObject.nameEn : selectedObject.namePluralEn} ({currentNumber} {ctx.wordHi})
            </span>
          </p>

          <div className="flex justify-center gap-2.5 mt-2 flex-wrap">
            <button
              type="button"
              onClick={() => speakText(`Number ${currentNumber}! ${ctx.wordEn}! Count ${currentNumber} ${currentNumber === 1 ? selectedObject.nameEn : selectedObject.namePluralEn}!`, 'en-US')}
              className="border border-[#34d399] bg-[#ecfdf5] hover:bg-[#d1fae5] rounded-xl px-3 py-1.5 text-xs text-[#059669] font-[800] inline-flex items-center gap-1.5 transition-colors"
            >
              🔊 Listen English
            </button>
            <button
              type="button"
              onClick={() => speakText(`नंबर ${currentNumber}! ${ctx.wordHi}! गिनें: ${currentNumber} ${selectedObject.nameHi}!`, 'hi-IN')}
              className="border border-[#fcd34d] bg-[#fef3c7] hover:bg-[#fde68a] rounded-xl px-3 py-1.5 text-xs text-[#92400e] font-[800] inline-flex items-center gap-1.5 transition-colors"
            >
              🗣️ हिन्दी में सुनें
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
