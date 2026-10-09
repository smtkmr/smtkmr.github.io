import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { ColorTheme } from '../types';
import { playDotPopSound, playSuccessChime, speakText } from '../utils/sound';
import {
  Y_TOP_1,
  Y_MID_1,
  Y_BASE_1,
  Y_BOT_1,
  Y_TOP_2,
  Y_MID_2,
  Y_BASE_2,
  Y_BOT_2,
  Point,
  linePoints,
  getNumberSequenceData,
  getWordGeometry,
} from '../utils/digitGeometry';
import { numberToWords } from '../utils/numberEngine';

interface OverwritingBoxProps {
  id: string;
  pattern: string;
  targetNumber?: number;
  label: string;
  labelHi: string;
  emojiIcon?: React.ReactNode;
  theme: ColorTheme;
  speakStr?: string;
  isCompleted?: boolean;
  onComplete?: () => void;
  onReset?: () => void;
}

export function resolvePattern(pattern: string, n = 1): {
  path: string;
  points: Point[];
  widthNeeded: number;
  heightNeeded: number;
} {
  const numStr = String(n);
  const fullWordEn = numberToWords(n).toUpperCase().replace(/\s+/g, '-');

  // Single stroke practice for number 1
  if (n === 1 && pattern === '1-simple') {
    return {
      path: `M 140 ${Y_TOP_1} L 140 ${Y_BASE_1}`,
      points: linePoints(140, Y_TOP_1, 140, Y_BASE_1, 9, 1),
      widthNeeded: 280,
      heightNeeded: 190,
    };
  }

  // 1. Single Numeral (e.g. "46", "2", "20", "100")
  if (pattern === 'number-single' || pattern.includes('single') || pattern.includes('num')) {
    const data = getNumberSequenceData(numStr, 320);
    return {
      path: data.path,
      points: data.points,
      widthNeeded: Math.max(320, numStr.length * 70 + 80),
      heightNeeded: 190,
    };
  }

  // 2. Full Word in Capital Letters (e.g. "TWENTY", "FORTY-SIX", "ONE-HUNDRED")
  if (pattern === 'number-word-upper' || pattern.includes('word') || pattern.includes('upper')) {
    return getWordGeometry(fullWordEn, 360);
  }

  // 3. Fallback
  return getWordGeometry(fullWordEn, 360);
}

export const OverwritingBox: React.FC<OverwritingBoxProps> = ({
  id,
  pattern,
  targetNumber = 1,
  label,
  labelHi,
  emojiIcon,
  theme,
  speakStr,
  isCompleted: externalCompleted,
  onComplete,
  onReset,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [covered, setCovered] = useState<Set<number>>(new Set());
  const [userPath, setUserPath] = useState<string>('');
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [internalCompleted, setInternalCompleted] = useState<boolean>(false);
  const lastPtRef = useRef<{ x: number; y: number } | null>(null);

  // Memoize resolved pattern so it does not recompute during pointer movement
  const { path: patternPath, points: rawCheckpoints, widthNeeded, heightNeeded } = useMemo(
    () => resolvePattern(pattern, targetNumber),
    [pattern, targetNumber]
  );

  // Filter checkpoints to avoid duplicate cluster points
  const checkpoints = useMemo(() => {
    const filtered: Point[] = [];
    rawCheckpoints.forEach((pt) => {
      if (!filtered.some((e) => Math.hypot(e.x - pt.x, e.y - pt.y) < 9)) {
        filtered.push(pt);
      }
    });
    return filtered.length > 0 ? filtered : [{ x: widthNeeded / 2, y: Y_MID_1, g: 1 }];
  }, [rawCheckpoints, widthNeeded]);

  // Reset local drawing when number or pattern changes
  useEffect(() => {
    setCovered(new Set());
    setUserPath('');
    setInternalCompleted(false);
    setIsDrawing(false);
    lastPtRef.current = null;
  }, [pattern, targetNumber]);

  const strokeWidth = 14;
  const isDone = externalCompleted || internalCompleted;
  const gradId = `grad_${id}_${targetNumber}`.replace(/[^a-zA-Z0-9_-]/g, '_');
  const isMultiLine = heightNeeded > 220;

  const triggerCompletion = useCallback(() => {
    setInternalCompleted(true);
    playSuccessChime();
    if (speakStr) {
      speakText(speakStr, 'en-US');
    }
    if (onComplete) {
      onComplete();
    }
  }, [speakStr, onComplete]);

  /**
   * STRICT COMPLETION LOGIC:
   * Only complete when:
   * 1. Overall coverage is at least 88% (no premature completion on just a few strokes!)
   * 2. AND every character/digit part has at least 72% coverage so no digit/letter is skipped!
   */
  useEffect(() => {
    if (isDone || checkpoints.length === 0) return;

    const groupTotal: Record<number, number> = {};
    const groupCovered: Record<number, number> = {};

    checkpoints.forEach((pt, idx) => {
      groupTotal[pt.g] = (groupTotal[pt.g] || 0) + 1;
      if (covered.has(idx)) {
        groupCovered[pt.g] = (groupCovered[pt.g] || 0) + 1;
      }
    });

    const allPartsTraced = Object.keys(groupTotal).every((g) => {
      const gNum = Number(g);
      return (groupCovered[gNum] || 0) / groupTotal[gNum] >= 0.72;
    });

    const overallRatio = covered.size / checkpoints.length;

    // Full overwrite requirement: 88%+ overall AND all digits/letters traced!
    if (overallRatio >= 0.88 && allPartsTraced) {
      triggerCompletion();
    }
  }, [covered, isDone, checkpoints, triggerCompletion]);

  /**
   * 100% Reliable Coordinate Calculation:
   * First tries native CTM. If not available or in iframe, uses strict letterbox-aware fallback.
   */
  const getSvgCoords = useCallback(
    (clientX: number, clientY: number): { x: number; y: number } => {
      const svg = svgRef.current;
      if (!svg) return { x: 0, y: 0 };

      // 1. Native SVG Matrix
      try {
        const pt = svg.createSVGPoint();
        pt.x = clientX;
        pt.y = clientY;
        const ctm = svg.getScreenCTM();
        if (ctm) {
          const trans = pt.matrixTransform(ctm.inverse());
          if (Number.isFinite(trans.x) && Number.isFinite(trans.y)) {
            return {
              x: Math.round(trans.x * 10) / 10,
              y: Math.round(trans.y * 10) / 10,
            };
          }
        }
      } catch {}

      // 2. Strict letterbox-aware fallback
      const rect = svg.getBoundingClientRect();
      const vbW = widthNeeded;
      const vbH = heightNeeded;
      const boxAspect = rect.width / rect.height;
      const vbAspect = vbW / vbH;

      let actualW = rect.width;
      let actualH = rect.height;
      let offX = 0;
      let offY = 0;

      if (boxAspect > vbAspect) {
        actualW = rect.height * vbAspect;
        offX = (rect.width - actualW) / 2;
      } else {
        actualH = rect.width / vbAspect;
        offY = (rect.height - actualH) / 2;
      }

      const clampedX = Math.max(rect.left + offX, Math.min(rect.left + offX + actualW, clientX));
      const clampedY = Math.max(rect.top + offY, Math.min(rect.top + offY + actualH, clientY));

      const x = ((clampedX - (rect.left + offX)) / actualW) * vbW;
      const y = ((clampedY - (rect.top + offY)) / actualH) * vbH;

      return {
        x: Math.round(x * 10) / 10,
        y: Math.round(y * 10) / 10,
      };
    },
    [widthNeeded, heightNeeded]
  );

  // Exact stroke-width aligned hit detection (radius = 15px)
  const markHits = useCallback(
    (from: { x: number; y: number }, to: { x: number; y: number }) => {
      const rad = 15; // Calibrated radius matching the stroke so child actually traces the letter
      const dist = Math.hypot(to.x - from.x, to.y - from.y);
      const steps = Math.max(1, Math.ceil(dist / 3.5));

      setCovered((prev) => {
        const next = new Set(prev);
        let hitNew = false;
        for (let s = 0; s <= steps; s++) {
          const t = s / steps;
          const px = from.x + (to.x - from.x) * t;
          const py = from.y + (to.y - from.y) * t;
          checkpoints.forEach((pt, idx) => {
            if (!next.has(idx) && Math.hypot(pt.x - px, pt.y - py) <= rad) {
              next.add(idx);
              hitNew = true;
            }
          });
        }
        if (hitNew) {
          playDotPopSound();
        }
        return next;
      });
    },
    [checkpoints]
  );

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (isDone) return;
    e.preventDefault();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}

    const pt = getSvgCoords(e.clientX, e.clientY);
    setIsDrawing(true);
    lastPtRef.current = pt;
    setUserPath((prev) => prev + ` M ${pt.x} ${pt.y} L ${pt.x + 0.1} ${pt.y + 0.1}`);
    markHits(pt, pt);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDrawing || isDone) return;
    e.preventDefault();
    const pt = getSvgCoords(e.clientX, e.clientY);
    const prev = lastPtRef.current || pt;
    setUserPath((p) => p + ` L ${pt.x} ${pt.y}`);
    markHits(prev, pt);
    lastPtRef.current = pt;
  };

  const handlePointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDrawing) return;
    setIsDrawing(false);
    lastPtRef.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  const handleReset = () => {
    setInternalCompleted(false);
    setCovered(new Set());
    setUserPath('');
    setIsDrawing(false);
    lastPtRef.current = null;
    playDotPopSound();
    if (onReset) onReset();
  };

  const handleForceComplete = () => {
    const all = new Set<number>();
    checkpoints.forEach((_, i) => all.add(i));
    setCovered(all);
    triggerCompletion();
  };

  const totalPts = checkpoints.length || 1;
  const percent = isDone ? 100 : Math.min(99, Math.round((covered.size / totalPts) * 100));

  return (
    <div
      className={`w-full bg-white rounded-2xl p-4 sm:p-5 flex flex-col items-center min-w-0 transition-all ${
        isDone
          ? 'border-[3px] border-[#10b981] bg-[#f0fdf4] shadow-[0_6px_0_#a7f3d0]'
          : 'border-[3px] border-dashed border-[#6ee7b7] shadow-sm'
      }`}
    >
      {/* Header Info */}
      <div className="flex justify-between items-center w-full mb-2 gap-2 flex-wrap">
        <div className="flex items-center gap-2 min-w-0">
          {emojiIcon}
          <span className="font-['Outfit',sans-serif] font-[900] text-base sm:text-lg text-[#065f46] truncate">
            {label}
          </span>
          <span className="text-xs sm:text-sm text-[#059669] font-[800] font-['Noto_Sans_Devanagari',sans-serif] truncate">
            ({labelHi})
          </span>
        </div>

        {/* Live Percentage Status */}
        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-[900] px-3.5 py-1 rounded-full border transition-colors ${
              isDone
                ? 'bg-[#dcfce7] text-[#065f46] border-[#34d399]'
                : percent >= 80
                ? 'bg-[#ecfdf5] text-[#059669] border-[#6ee7b7]'
                : 'bg-[#fef9c3] text-[#854d0e] border-[#fde047]'
            }`}
          >
            {isDone ? '★ 100% 3D Filled!' : `${percent}% Traced (Trace all parts completely)`}
          </span>
        </div>
      </div>

      {/* Visual Live Progress Bar */}
      <div className="w-full bg-slate-100 h-2 rounded-full mb-3 overflow-hidden border border-slate-200">
        <div
          className={`h-full transition-all duration-150 rounded-full ${
            isDone ? 'bg-[#10b981]' : percent >= 80 ? 'bg-[#34d399]' : 'bg-[#f59e0b]'
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* SVG Canvas Board with Adaptive Height (No squishing!) */}
      <div
        style={{
          height: isMultiLine ? '320px' : '200px',
          touchAction: 'none',
        }}
        className="relative w-full bg-white rounded-2xl border-2 border-[#cbd5e1] overflow-hidden select-none shadow-inner"
      >
        <svg
          ref={svgRef}
          viewBox={`0 0 ${widthNeeded} ${heightNeeded}`}
          preserveAspectRatio="xMidYMid meet"
          style={{ width: '100%', height: '100%', display: 'block', touchAction: 'none' }}
          className="cursor-crosshair select-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={theme.frontStart} />
              <stop offset="100%" stopColor={theme.frontEnd} />
            </linearGradient>
          </defs>

          {/* Guidelines Line 1 */}
          <g style={{ pointerEvents: 'none' }}>
            <line x1="10" y1={Y_TOP_1} x2={widthNeeded - 10} y2={Y_TOP_1} stroke="#fca5a5" strokeWidth="2" />
            <line x1="10" y1={Y_MID_1} x2={widthNeeded - 10} y2={Y_MID_1} stroke="#93c5fd" strokeWidth="1.8" strokeDasharray="6 5" />
            <line x1="10" y1={Y_BASE_1} x2={widthNeeded - 10} y2={Y_BASE_1} stroke="#60a5fa" strokeWidth="2.4" />
            <line x1="10" y1={Y_BOT_1} x2={widthNeeded - 10} y2={Y_BOT_1} stroke="#fca5a5" strokeWidth="2" />
          </g>

          {/* Guidelines Line 2 if multi-line */}
          {isMultiLine && (
            <g style={{ pointerEvents: 'none' }}>
              <line x1="10" y1={Y_TOP_2} x2={widthNeeded - 10} y2={Y_TOP_2} stroke="#fca5a5" strokeWidth="2" />
              <line x1="10" y1={Y_MID_2} x2={widthNeeded - 10} y2={Y_MID_2} stroke="#93c5fd" strokeWidth="1.8" strokeDasharray="6 5" />
              <line x1="10" y1={Y_BASE_2} x2={widthNeeded - 10} y2={Y_BASE_2} stroke="#60a5fa" strokeWidth="2.4" />
              <line x1="10" y1={Y_BOT_2} x2={widthNeeded - 10} y2={Y_BOT_2} stroke="#fca5a5" strokeWidth="2" />
            </g>
          )}

          {/* Guide + Checkpoints + User Painted Path */}
          {!isDone && (
            <g style={{ pointerEvents: 'none' }}>
              {/* Thick background shape guide */}
              <path
                d={patternPath}
                stroke="#f1f5f9"
                strokeWidth={strokeWidth + 2}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />

              {/* Dashed line guide */}
              <path
                d={patternPath}
                stroke="#94a3b8"
                strokeWidth={3}
                strokeLinecap="round"
                strokeDasharray="6 6"
                fill="none"
              />

              {/* Interactive Target Dots */}
              {checkpoints.map((pt, i) => (
                <circle
                  key={i}
                  cx={pt.x}
                  cy={pt.y}
                  r={covered.has(i) ? 5 : 3.5}
                  fill={covered.has(i) ? '#10b981' : '#94a3b8'}
                />
              ))}

              {/* User Painted Path - Real-time Drawing */}
              <path
                d={userPath}
                stroke={theme.side3d}
                strokeWidth={strokeWidth + 4}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                opacity={0.35}
              />
              <path
                d={userPath}
                stroke={`url(#${gradId})`}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </g>
          )}

          {/* When Completed: Full 3D Extruded Colored Geometry */}
          {isDone && (
            <g style={{ pointerEvents: 'none' }} className="animate-in fade-in zoom-in-95 duration-300">
              <path
                d={patternPath}
                transform="translate(5, 5)"
                stroke={theme.side3d}
                strokeWidth={strokeWidth + 2}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d={patternPath}
                stroke={`url(#${gradId})`}
                strokeWidth={strokeWidth + 2}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d={patternPath}
                transform="translate(-2, -2)"
                stroke="#ffffff"
                strokeWidth={strokeWidth * 0.3}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity={0.7}
                fill="none"
              />
            </g>
          )}

          {/* Dedicated transparent event capture rect on top of all SVG elements */}
          <rect
            x={0}
            y={0}
            width={widthNeeded}
            height={heightNeeded}
            fill="transparent"
            style={{ pointerEvents: isDone ? 'none' : 'all', cursor: 'crosshair' }}
          />
        </svg>
      </div>

      {/* Footer controls */}
      <div className="flex justify-between items-center w-full mt-3 gap-2 flex-wrap">
        <span className="text-xs sm:text-sm font-[800] text-[#475569]">
          {isDone ? (
            <span className="text-[#059669] font-[900]">🎉 Poora letter 100% trace ho gaya! Shabaash!</span>
          ) : (
            <span>✏️ Poora letter/ank trace karein — jab poora hoga tabhi complete hoga!</span>
          )}
        </span>

        <div className="flex items-center gap-2">
          {!isDone && (
            <button
              type="button"
              onClick={handleForceComplete}
              className="text-xs font-[800] px-3 py-1.5 rounded-xl border border-[#34d399] bg-[#ecfdf5] hover:bg-[#d1fae5] text-[#059669] transition-colors"
            >
              ✨ Auto-Fill
            </button>
          )}
          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-[800] px-3 py-1.5 rounded-xl border border-[#cbd5e1] bg-[#f8fafc] hover:bg-slate-100 text-[#334155] transition-colors"
          >
            ↺ Clear
          </button>
        </div>
      </div>
    </div>
  );
};
