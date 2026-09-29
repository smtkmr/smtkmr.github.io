import React, { useRef, useState, useEffect, useCallback, useId, useMemo } from 'react';
import { ColorTheme } from './ThreeDLetterDisplay';

export type OverwritePattern =
  | 'A'
  | 'a'
  | 'Aa'
  | 'stroke1'
  | 'stroke2'
  | 'stroke3'
  | 'A-trio';

interface Point {
  x: number;
  y: number;
  strokeGroup: number;
}

interface LetterOverwriteBoxProps {
  pattern: OverwritePattern;
  label?: string;
  labelHi?: string;
  wordSuffix?: string;
  wordPrefix?: string;
  emoji?: string;
  theme: ColorTheme;
  size?: 'large' | 'medium' | 'compact';
  isCompletedExternal?: boolean;
  onComplete?: () => void;
  onReset?: () => void;
  onSpeak?: (text: string, lang?: string) => void;
  speakWord?: string;
}

// Well-spaced checkpoints without overlapping at corners/junctions
function getCheckpointsForPattern(pattern: OverwritePattern): Point[] {
  const rawPts: Point[] = [];

  const addLine = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    steps: number,
    strokeGroup: number
  ) => {
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      rawPts.push({
        x: Math.round((x1 + (x2 - x1) * t) * 10) / 10,
        y: Math.round((y1 + (y2 - y1) * t) * 10) / 10,
        strokeGroup,
      });
    }
  };

  if (pattern === 'A') {
    addLine(110, 32, 62, 140, 7, 1); // Left slant
    addLine(110, 32, 158, 140, 7, 2); // Right slant
    addLine(84, 104, 136, 104, 4, 3); // Middle bar (inset so endpoints don't collide with slants)
  } else if (pattern === 'stroke1') {
    addLine(110, 32, 62, 140, 8, 1);
  } else if (pattern === 'stroke2') {
    addLine(110, 32, 158, 140, 8, 1);
  } else if (pattern === 'stroke3') {
    addLine(74, 104, 146, 104, 7, 1);
  } else if (pattern === 'a') {
    const curvePts: [number, number][] = [
      [128, 90],
      [114, 78],
      [94, 78],
      [78, 90],
      [74, 108],
      [80, 126],
      [96, 137],
      [116, 135],
    ];
    curvePts.forEach(([x, y]) => rawPts.push({ x, y, strokeGroup: 1 }));
    addLine(132, 76, 132, 140, 6, 2);
  } else if (pattern === 'Aa') {
    addLine(68, 34, 34, 140, 6, 1);
    addLine(68, 34, 102, 140, 6, 2);
    addLine(52, 104, 84, 104, 3, 3);
    const smallCurvePts: [number, number][] = [
      [174, 90],
      [156, 80],
      [138, 88],
      [132, 108],
      [140, 128],
      [160, 135],
    ];
    smallCurvePts.forEach(([x, y]) => rawPts.push({ x, y, strokeGroup: 4 }));
    addLine(180, 80, 180, 140, 5, 5);
  } else if (pattern === 'A-trio') {
    [45, 110, 175].forEach((cx, gIdx) => {
      addLine(cx, 42, cx - 22, 138, 5, gIdx * 3 + 1);
      addLine(cx, 42, cx + 22, 138, 5, gIdx * 3 + 2);
      addLine(cx - 10, 102, cx + 10, 102, 2, gIdx * 3 + 3);
    });
  }

  // Filter out any points that are too close (< 10px) to an existing point so dots never overlap visually
  const filtered: Point[] = [];
  for (const pt of rawPts) {
    const tooClose = filtered.some((existing) => Math.hypot(existing.x - pt.x, existing.y - pt.y) < 10);
    if (!tooClose) {
      filtered.push(pt);
    }
  }
  return filtered;
}

export const LetterOverwriteBox: React.FC<LetterOverwriteBoxProps> = ({
  pattern,
  label,
  labelHi,
  emoji,
  theme,
  size = 'medium',
  isCompletedExternal,
  onComplete,
  onReset,
  onSpeak,
  speakWord,
}) => {
  const uniqueId = useId().replace(/[^a-zA-Z0-9]/g, '');
  const gradId = `boxGrad_${pattern}_${theme.id}_${uniqueId}`;

  const svgRef = useRef<SVGSVGElement | null>(null);
  const userOuterPathRef = useRef<SVGPathElement | null>(null);
  const userInnerPathRef = useRef<SVGPathElement | null>(null);
  const progressBadgeRef = useRef<HTMLSpanElement | null>(null);
  const checkpointElsRef = useRef<(SVGCircleElement | null)[]>([]);

  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const pathDataRef = useRef<string>('');
  const coveredSetRef = useRef<Set<number>>(new Set());
  const completedRef = useRef<boolean>(Boolean(isCompletedExternal));

  const [isCompleted, setIsCompleted] = useState<boolean>(Boolean(isCompletedExternal));

  const checkpoints = useMemo(
    () => getCheckpointsForPattern(pattern),
    [pattern]
  );

  const resetVisualsDom = useCallback(() => {
    pathDataRef.current = '';
    if (userOuterPathRef.current) {
      userOuterPathRef.current.setAttribute('d', '');
    }
    if (userInnerPathRef.current) {
      userInnerPathRef.current.setAttribute('d', '');
    }
    if (progressBadgeRef.current) {
      progressBadgeRef.current.textContent = '0% Overwritten';
    }
    checkpointElsRef.current.forEach((el) => {
      if (el) {
        el.setAttribute('fill', '#94a3b8');
        el.setAttribute('r', '3');
      }
    });
  }, []);

  useEffect(() => {
    if (isCompletedExternal !== undefined) {
      completedRef.current = isCompletedExternal;
      setIsCompleted(isCompletedExternal);
      if (isCompletedExternal) {
        if (progressBadgeRef.current) {
          progressBadgeRef.current.textContent = '★ 100% Colored!';
        }
      } else {
        coveredSetRef.current = new Set();
        resetVisualsDom();
      }
    }
  }, [isCompletedExternal, resetVisualsDom]);

  const triggerComplete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    if (progressBadgeRef.current) {
      progressBadgeRef.current.textContent = '★ 100% Colored!';
    }
    setIsCompleted(true);
    if (onComplete) {
      onComplete();
    }
    if (onSpeak) {
      try {
        onSpeak(speakWord || (pattern === 'a' ? 'Small a!' : 'Capital A!'), 'en-US');
      } catch {
        // Ignore speech synthesis errors
      }
    }
  }, [onComplete, onSpeak, speakWord, pattern]);

  const evaluateCompletion = useCallback(() => {
    if (completedRef.current) return;
    const covered = coveredSetRef.current;
    const total = checkpoints.length;
    if (total === 0) return;

    const rawRatio = covered.size / total;
    const pct = Math.min(99, Math.round(rawRatio * 100));

    const groupTotals = new Map<number, number>();
    const groupCovered = new Map<number, number>();

    checkpoints.forEach((pt, idx) => {
      groupTotals.set(pt.strokeGroup, (groupTotals.get(pt.strokeGroup) || 0) + 1);
      if (covered.has(idx)) {
        groupCovered.set(pt.strokeGroup, (groupCovered.get(pt.strokeGroup) || 0) + 1);
      }
    });

    let allGroupsSatisfied = true;
    groupTotals.forEach((gTotal, gId) => {
      const gCov = groupCovered.get(gId) || 0;
      if (gCov / gTotal < 0.75) {
        allGroupsSatisfied = false;
      }
    });

    if (rawRatio >= 0.85 && allGroupsSatisfied) {
      triggerComplete();
    } else if (progressBadgeRef.current) {
      progressBadgeRef.current.textContent = `${pct}% Overwritten`;
    }
  }, [checkpoints, triggerComplete]);

  const markSegmentCheckpoints = useCallback(
    (from: { x: number; y: number }, to: { x: number; y: number }) => {
      if (completedRef.current) return;
      const hitRadius = pattern === 'A-trio' ? 17 : 21;
      const distTotal = Math.hypot(to.x - from.x, to.y - from.y);
      const steps = Math.max(1, Math.ceil(distTotal / 4));

      let addedAny = false;
      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const px = from.x + (to.x - from.x) * t;
        const py = from.y + (to.y - from.y) * t;

        for (let idx = 0; idx < checkpoints.length; idx++) {
          if (!coveredSetRef.current.has(idx)) {
            const pt = checkpoints[idx];
            if (Math.hypot(pt.x - px, pt.y - py) <= hitRadius) {
              coveredSetRef.current.add(idx);
              addedAny = true;
              const dotEl = checkpointElsRef.current[idx];
              if (dotEl) {
                dotEl.setAttribute('fill', '#10b981');
                dotEl.setAttribute('r', '4.2');
              }
            }
          }
        }
      }

      if (addedAny) {
        evaluateCompletion();
      }
    },
    [checkpoints, pattern, evaluateCompletion]
  );

  const getSvgCoords = (e: React.PointerEvent<SVGSVGElement>): { x: number; y: number } => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const rect = svg.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return { x: 0, y: 0 };
    return {
      x: Math.round((((e.clientX - rect.left) / rect.width) * 220) * 10) / 10,
      y: Math.round((((e.clientY - rect.top) / rect.height) * 180) * 10) / 10,
    };
  };

  const appendStrokeSegment = (pt: { x: number; y: number }, isStart: boolean) => {
    if (isStart || !pathDataRef.current) {
      pathDataRef.current = `${pathDataRef.current} M ${pt.x} ${pt.y} L ${pt.x + 0.1} ${pt.y + 0.1}`;
    } else {
      pathDataRef.current = `${pathDataRef.current} L ${pt.x} ${pt.y}`;
    }
    if (userOuterPathRef.current) {
      userOuterPathRef.current.setAttribute('d', pathDataRef.current);
    }
    if (userInnerPathRef.current) {
      userInnerPathRef.current.setAttribute('d', pathDataRef.current);
    }
  };

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (completedRef.current) return;
    const pt = getSvgCoords(e);
    isDrawingRef.current = true;
    lastPointRef.current = pt;
    appendStrokeSegment(pt, true);
    markSegmentCheckpoints(pt, pt);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDrawingRef.current || completedRef.current) return;
    const pt = getSvgCoords(e);
    const prev = lastPointRef.current || pt;
    appendStrokeSegment(pt, false);
    markSegmentCheckpoints(prev, pt);
    lastPointRef.current = pt;
  };

  const handlePointerUp = () => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
  };

  const handleClear = () => {
    completedRef.current = false;
    isDrawingRef.current = false;
    lastPointRef.current = null;
    coveredSetRef.current = new Set();
    setIsCompleted(false);
    resetVisualsDom();
    if (onReset) onReset();
  };

  const boxHeight = size === 'large' ? 200 : size === 'compact' ? 165 : 180;
  const strokeW = pattern === 'A-trio' ? 14 : 22;

  return (
    <div
      className={`overwrite-cell ${isCompleted ? 'completed' : ''}`}
      style={{
        width: '100%',
        padding: size === 'compact' ? '10px' : '14px',
      }}
    >
      {/* Top Label Row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          marginBottom: '8px',
          gap: '8px',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
          {emoji && <span style={{ fontSize: '18px', flexShrink: 0 }}>{emoji}</span>}
          {label && (
            <span
              style={{
                fontFamily: 'var(--heading)',
                fontWeight: 800,
                fontSize: '13px',
                color: '#065f46',
              }}
            >
              {label}
            </span>
          )}
          {labelHi && (
            <span className="hi" style={{ fontSize: '12px', color: '#059669', fontWeight: 700 }}>
              ({labelHi})
            </span>
          )}
        </div>
        <span
          ref={progressBadgeRef}
          style={{
            fontSize: '11px',
            fontWeight: 800,
            padding: '2px 9px',
            borderRadius: '12px',
            background: isCompleted ? '#dcfce7' : '#fef9c3',
            color: isCompleted ? '#065f46' : '#854d0e',
            border: `1px solid ${isCompleted ? '#34d399' : '#fde047'}`,
            whiteSpace: 'nowrap',
          }}
        >
          {isCompleted ? '★ 100% Colored!' : '0% Overwritten'}
        </span>
      </div>

      {/* Centered Pure SVG 4-Line Notebook Tracing Box (No overlapping text!) */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: `${boxHeight}px`,
          background: isCompleted
            ? 'radial-gradient(circle at 50% 50%, #ffffff 0%, #ecfdf5 100%)'
            : '#ffffff',
          borderRadius: '16px',
          border: isCompleted ? '2.5px solid #10b981' : '2px solid #cbd5e1',
          overflow: 'hidden',
          touchAction: 'none',
          userSelect: 'none',
          WebkitUserSelect: 'none',
        }}
      >
        <svg
          ref={svgRef}
          viewBox="0 0 220 180"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            touchAction: 'none',
            cursor: isCompleted ? 'default' : 'crosshair',
          }}
        >
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={theme.frontStart} />
              <stop offset="100%" stopColor={theme.frontEnd} />
            </linearGradient>
          </defs>

          {/* 4-Line Notebook Lines */}
          <line x1="10" y1="32" x2="210" y2="32" stroke="#fca5a5" strokeWidth="1.5" />
          <line x1="10" y1="74" x2="210" y2="74" stroke="#93c5fd" strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1="10" y1="140" x2="210" y2="140" stroke="#60a5fa" strokeWidth="2" />
          <line x1="10" y1="166" x2="210" y2="166" stroke="#fca5a5" strokeWidth="1.5" />

          {/* LAYER 1: CENTERED PARTIALLY VISIBLE LETTER + USER LIVE STROKE */}
          <g style={{ opacity: isCompleted ? 0 : 1, transition: 'opacity 0.2s ease' }}>
            {pattern === 'A' && (
              <g>
                <g
                  stroke="#e2e8f0"
                  strokeWidth="22"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                >
                  <path d="M110 32 L62 140" />
                  <path d="M110 32 L158 140" />
                  <path d="M76 104 L144 104" />
                </g>
                <g
                  stroke="#94a3b8"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray="5 7"
                  fill="none"
                >
                  <path d="M110 32 L62 140" />
                  <path d="M110 32 L158 140" />
                  <path d="M76 104 L144 104" />
                </g>
              </g>
            )}

            {pattern === 'stroke1' && (
              <g>
                <path d="M110 32 L158 140 M76 104 L144 104" stroke="#f1f5f9" strokeWidth="18" strokeLinecap="round" fill="none" />
                <path d="M110 32 L62 140" stroke="#e2e8f0" strokeWidth="22" strokeLinecap="round" fill="none" />
                <path d="M110 32 L62 140" stroke="#059669" strokeWidth="3.5" strokeDasharray="5 7" strokeLinecap="round" fill="none" />
              </g>
            )}

            {pattern === 'stroke2' && (
              <g>
                <path d="M110 32 L62 140" stroke={theme.frontEnd} strokeWidth="20" strokeLinecap="round" fill="none" opacity="0.45" />
                <path d="M110 32 L158 140" stroke="#e2e8f0" strokeWidth="22" strokeLinecap="round" fill="none" />
                <path d="M110 32 L158 140" stroke="#059669" strokeWidth="3.5" strokeDasharray="5 7" strokeLinecap="round" fill="none" />
              </g>
            )}

            {pattern === 'stroke3' && (
              <g>
                <path d="M110 32 L62 140 M110 32 L158 140" stroke={theme.frontEnd} strokeWidth="20" strokeLinecap="round" fill="none" opacity="0.45" />
                <path d="M74 104 L146 104" stroke="#e2e8f0" strokeWidth="22" strokeLinecap="round" fill="none" />
                <path d="M74 104 L146 104" stroke="#059669" strokeWidth="3.5" strokeDasharray="5 7" strokeLinecap="round" fill="none" />
              </g>
            )}

            {pattern === 'a' && (
              <g>
                <g stroke="#e2e8f0" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" fill="none">
                  <path d="M130 92 C118 72, 74 74, 74 108 C74 140, 118 142, 130 122" />
                  <path d="M132 76 L132 140" />
                </g>
                <g stroke="#94a3b8" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="5 7" fill="none">
                  <path d="M130 92 C118 72, 74 74, 74 108 C74 140, 118 142, 130 122" />
                  <path d="M132 76 L132 140" />
                </g>
              </g>
            )}

            {pattern === 'Aa' && (
              <g>
                <g stroke="#e2e8f0" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" fill="none">
                  <path d="M68 34 L34 140 M68 34 L102 140 M46 104 L90 104" />
                  <path d="M178 94 C168 76, 132 78, 132 108 C132 138, 168 140, 178 122 M180 80 L180 140" />
                </g>
                <g stroke="#94a3b8" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="5 6" fill="none">
                  <path d="M68 34 L34 140 M68 34 L102 140 M46 104 L90 104" />
                  <path d="M178 94 C168 76, 132 78, 132 108 C132 138, 168 140, 178 122 M180 80 L180 140" />
                </g>
              </g>
            )}

            {pattern === 'A-trio' && (
              <g>
                {[45, 110, 175].map((cx) => (
                  <g key={cx}>
                    <path
                      d={`M${cx} 42 L${cx - 22} 138 M${cx} 42 L${cx + 22} 138 M${cx - 14} 102 L${cx + 14} 102`}
                      stroke="#e2e8f0"
                      strokeWidth="13"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d={`M${cx} 42 L${cx - 22} 138 M${cx} 42 L${cx + 22} 138 M${cx - 14} 102 L${cx + 14} 102`}
                      stroke="#94a3b8"
                      strokeWidth="3"
                      strokeDasharray="4 5"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </g>
                ))}
              </g>
            )}

            {/* User's Live Drawn SVG Stroke Path */}
            <path
              ref={userOuterPathRef}
              d=""
              stroke={theme.frontEnd}
              strokeWidth={strokeW}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity="0.88"
            />
            <path
              ref={userInnerPathRef}
              d=""
              stroke={theme.frontStart}
              strokeWidth={Math.max(5, Math.round(strokeW * 0.4))}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />

            {/* Clean, non-overlapping Checkpoint Guide Dots */}
            <g>
              {checkpoints.map((pt, idx) => (
                <circle
                  key={idx}
                  ref={(el) => {
                    checkpointElsRef.current[idx] = el;
                  }}
                  cx={pt.x}
                  cy={pt.y}
                  r="3"
                  fill="#94a3b8"
                  stroke="#ffffff"
                  strokeWidth="1"
                />
              ))}
            </g>
          </g>

          {/* LAYER 2: COMPLETED 3D FULL-COLORED LETTER STATE (Centered) */}
          <g style={{ opacity: isCompleted ? 1 : 0, transition: 'opacity 0.25s ease' }}>
            {(pattern === 'A' || pattern === 'stroke1' || pattern === 'stroke2' || pattern === 'stroke3') && (
              <g>
                {[6, 4, 2].map((off) => (
                  <g
                    key={off}
                    transform={`translate(${off}, ${off})`}
                    stroke={theme.side3d}
                    strokeWidth="22"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  >
                    <path d="M110 32 L62 140" />
                    <path d="M110 32 L158 140" />
                    <path d="M76 104 L144 104" />
                  </g>
                ))}
                <g
                  stroke={`url(#${gradId})`}
                  strokeWidth="22"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                >
                  <path d="M110 32 L62 140" />
                  <path d="M110 32 L158 140" />
                  <path d="M76 104 L144 104" />
                </g>
                <path
                  d="M108 36 L65 134 M112 36 L155 134 M80 102 L140 102"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>
            )}

            {pattern === 'a' && (
              <g>
                {[6, 4, 2].map((off) => (
                  <g
                    key={off}
                    transform={`translate(${off}, ${off})`}
                    stroke={theme.side3d}
                    strokeWidth="20"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  >
                    <path d="M130 92 C118 72, 74 74, 74 108 C74 140, 118 142, 130 122" />
                    <path d="M132 76 L132 140" />
                  </g>
                ))}
                <g
                  stroke={`url(#${gradId})`}
                  strokeWidth="20"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                >
                  <path d="M130 92 C118 72, 74 74, 74 108 C74 140, 118 142, 130 122" />
                  <path d="M132 76 L132 140" />
                </g>
                <path
                  d="M126 88 C114 76, 78 78, 78 108 M132 80 L132 136"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>
            )}

            {pattern === 'Aa' && (
              <g>
                {[5, 3, 1].map((off) => (
                  <g
                    key={off}
                    transform={`translate(${off}, ${off})`}
                    stroke={theme.side3d}
                    strokeWidth="18"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  >
                    <path d="M68 34 L34 140 M68 34 L102 140 M46 104 L90 104" />
                    <path d="M178 94 C168 76, 132 78, 132 108 C132 138, 168 140, 178 122 M180 80 L180 140" />
                  </g>
                ))}
                <g
                  stroke={`url(#${gradId})`}
                  strokeWidth="18"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                >
                  <path d="M68 34 L34 140 M68 34 L102 140 M46 104 L90 104" />
                  <path d="M178 94 C168 76, 132 78, 132 108 C132 138, 168 140, 178 122 M180 80 L180 140" />
                </g>
              </g>
            )}

            {pattern === 'A-trio' && (
              <g>
                {[45, 110, 175].map((cx) => (
                  <g key={cx}>
                    <path
                      d={`M${cx + 3} 45 L${cx - 19} 141 M${cx + 3} 45 L${cx + 25} 141 M${cx - 11} 105 L${cx + 17} 105`}
                      stroke={theme.side3d}
                      strokeWidth="14"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d={`M${cx} 42 L${cx - 22} 138 M${cx} 42 L${cx + 22} 138 M${cx - 14} 102 L${cx + 14} 102`}
                      stroke={`url(#${gradId})`}
                      strokeWidth="14"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </g>
                ))}
              </g>
            )}
          </g>
        </svg>
      </div>

      {/* Controls Row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          marginTop: '8px',
          gap: '6px',
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,
            color: isCompleted ? '#059669' : '#64748b',
          }}
        >
          {isCompleted
            ? '✓ Full Letter Overwritten! / पूरा रंग भर गया!'
            : '✍️ Trace over the letter / पूरे अक्षर पर हाथ फेरें'}
        </span>
        <button
          type="button"
          className="quiet-btn"
          style={{ minHeight: '30px', padding: '4px 10px', fontSize: '11px' }}
          onClick={handleClear}
        >
          ↺ Clear / साफ़ करें
        </button>
      </div>
    </div>
  );
};
