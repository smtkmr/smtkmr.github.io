import React from 'react';

// Number Line with jump arc
export function NumberLineDiagram({
  start,
  jump,
  end,
  max = 12,
  label = ''
}: {
  start?: number;
  jump?: number;
  end?: number;
  max?: number;
  label?: string;
}) {
  const points = [];
  for (let i = 0; i <= max; i++) points.push(i);

  // Calculate coordinates for SVG
  const width = 560;
  const padding = 35;
  const lineY = 55;
  const stepWidth = (width - padding * 2) / max;
  const getX = (val: number) => padding + val * stepWidth;

  const startX = start !== undefined ? getX(start) : 0;
  const endX = end !== undefined ? getX(end) : 0;
  const midX = (startX + endX) / 2;
  const arcHeight = Math.min(45, Math.abs(startX - endX) * 0.35 + 15);

  return (
    <div className="number-line-container">
      {label && (
        <div style={{ fontSize: '12px', fontWeight: 800, color: '#059669', marginBottom: '6px', textTransform: 'uppercase' }}>
          {label}
        </div>
      )}
      <div style={{ overflowX: 'auto', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <svg viewBox={`0 0 ${width} 90`} style={{ maxWidth: '100%', height: 'auto', minWidth: '380px' }}>
          {/* Main Axis Line with Arrows */}
          <line x1={padding - 15} y1={lineY} x2={width - padding + 15} y2={lineY} stroke="#1f2937" strokeWidth="2.5" />
          <polygon points={`${padding - 18},${lineY} ${padding - 8},${lineY - 4} ${padding - 8},${lineY + 4}`} fill="#1f2937" />
          <polygon points={`${width - padding + 18},${lineY} ${width - padding + 8},${lineY - 4} ${width - padding + 8},${lineY + 4}`} fill="#1f2937" />

          {/* Ticks and Numbers */}
          {points.map((pt) => {
            const x = getX(pt);
            const isHighlight = pt === start || pt === end;
            return (
              <g key={pt}>
                <line x1={x} y1={lineY - 7} x2={x} y2={lineY + 7} stroke="#374151" strokeWidth="2" />
                <text
                  x={x}
                  y={lineY + 22}
                  textAnchor="middle"
                  fontFamily="'Outfit', sans-serif"
                  fontWeight={isHighlight ? '900' : '600'}
                  fontSize={isHighlight ? '15' : '13'}
                  fill={pt === start ? '#dc2626' : pt === end ? '#059669' : '#4b5563'}
                >
                  {pt}
                </text>
              </g>
            );
          })}

          {/* Backward Jump Arc */}
          {start !== undefined && end !== undefined && jump !== undefined && (
            <g>
              <path
                d={`M ${startX} ${lineY - 8} Q ${midX} ${lineY - 8 - arcHeight} ${endX} ${lineY - 8}`}
                fill="none"
                stroke="#059669"
                strokeWidth="2.5"
                strokeDasharray="4,2"
              />
              {/* Arrow Head pointing left (backward) */}
              <polygon
                points={`${endX},${lineY - 8} ${endX + 8},${lineY - 14} ${endX + 6},${lineY - 7}`}
                fill="#059669"
              />
              {/* Label above arc */}
              <rect x={midX - 28} y={lineY - 8 - arcHeight - 14} width="56" height="18" rx="4" fill="#059669" />
              <text
                x={midX}
                y={lineY - 8 - arcHeight - 1}
                textAnchor="middle"
                fontSize="11"
                fontWeight="900"
                fontFamily="'Outfit', sans-serif"
                fill="#ffffff"
              >
                -{jump} back
              </text>
            </g>
          )}
        </svg>
      </div>
      {start !== undefined && end !== undefined && jump !== undefined && (
        <div style={{ fontSize: '12px', color: '#1f2937', marginTop: '4px', textAlign: 'center' }}>
          Start at <strong style={{ color: '#dc2626' }}>{start}</strong> ➔ Count back{' '}
          <strong style={{ color: '#059669' }}>{jump}</strong> to reach{' '}
          <strong style={{ color: '#059669' }}>{end}</strong> (Sentence:{' '}
          <strong style={{ fontFamily: "'Outfit', sans-serif" }}>
            {start} - {jump} = {end}
          </strong>
          )
        </div>
      )}
    </div>
  );
}

// Fact Family Triangle
export function FactTriangleDiagram({
  top,
  left,
  right,
  missing = null,
  showEquations = true
}: {
  top: number | string;
  left: number | string;
  right: number | string;
  missing?: 'top' | 'left' | 'right' | null;
  showEquations?: boolean;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '8px 0' }}>
      <svg width="220" height="170" viewBox="0 0 220 170" style={{ maxWidth: '100%' }}>
        {/* Triangle Outer */}
        <polygon points="110,25 25,145 195,145" fill="#f0fdf4" stroke="#059669" strokeWidth="3" strokeLinejoin="round" />

        {/* Inner dividers */}
        <line x1="68" y1="85" x2="152" y2="85" stroke="#a7f3d0" strokeWidth="2" strokeDasharray="3,3" />

        {/* Operation Symbols */}
        <text x="110" y="115" textAnchor="middle" fontSize="18" fontWeight="900" fill="#10b981">
          +
        </text>
        <text x="60" y="80" textAnchor="middle" fontSize="18" fontWeight="900" fill="#059669">
          -
        </text>
        <text x="160" y="80" textAnchor="middle" fontSize="18" fontWeight="900" fill="#059669">
          -
        </text>

        {/* Top Node (Total / Sum) */}
        <circle cx="110" cy="45" r="22" fill="#ffffff" stroke={missing === 'top' ? '#f59e0b' : '#059669'} strokeWidth="2.5" />
        <text
          x="110"
          y="52"
          textAnchor="middle"
          fontSize="18"
          fontWeight="900"
          fontFamily="'Outfit', sans-serif"
          fill={missing === 'top' ? '#d97706' : '#111827'}
        >
          {missing === 'top' ? '?' : top}
        </text>

        {/* Bottom Left Node */}
        <circle cx="50" cy="135" r="20" fill="#ffffff" stroke={missing === 'left' ? '#f59e0b' : '#059669'} strokeWidth="2" />
        <text
          x="50"
          y="142"
          textAnchor="middle"
          fontSize="17"
          fontWeight="900"
          fontFamily="'Outfit', sans-serif"
          fill={missing === 'left' ? '#d97706' : '#111827'}
        >
          {missing === 'left' ? '?' : left}
        </text>

        {/* Bottom Right Node */}
        <circle cx="170" cy="135" r="20" fill="#ffffff" stroke={missing === 'right' ? '#f59e0b' : '#059669'} strokeWidth="2" />
        <text
          x="170"
          y="142"
          textAnchor="middle"
          fontSize="17"
          fontWeight="900"
          fontFamily="'Outfit', sans-serif"
          fill={missing === 'right' ? '#d97706' : '#111827'}
        >
          {missing === 'right' ? '?' : right}
        </text>
      </svg>

      {showEquations && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: left === right ? '1fr' : 'repeat(2, 1fr)',
            gap: '6px 14px',
            background: '#ffffff',
            border: '1.5px solid #a7f3d0',
            borderRadius: '10px',
            padding: '8px 14px',
            fontSize: '13px',
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            color: '#065f46',
            marginTop: '4px'
          }}
        >
          {left === right ? (
            <>
              <div>{left} + {right} = {top}</div>
              <div>{top} - {left} = {right}</div>
            </>
          ) : (
            <>
              <div>{left} + {right} = {top}</div>
              <div>{top} - {left} = {right}</div>
              <div>{right} + {left} = {top}</div>
              <div>{top} - {right} = {left}</div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// Pattern Table Diagram
export function PatternTableDiagram({
  headers,
  rows,
  highlightCol
}: {
  headers: string[];
  rows: (string | number)[][];
  highlightCol?: number;
}) {
  return (
    <div style={{ overflowX: 'auto', margin: '8px 0' }}>
      <table
        style={{
          borderCollapse: 'collapse',
          margin: 'auto',
          background: '#ffffff',
          border: '2px solid #059669',
          borderRadius: '10px',
          overflow: 'hidden'
        }}
      >
        <thead>
          <tr style={{ background: '#10b981', color: '#ffffff' }}>
            {headers.map((h, i) => (
              <th
                key={i}
                style={{
                  padding: '7px 14px',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '12.5px',
                  border: '1px solid #059669',
                  textAlign: 'center'
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rIdx) => (
            <tr key={rIdx} style={{ background: rIdx % 2 === 0 ? '#f0fdf4' : '#ffffff' }}>
              {row.map((cell, cIdx) => {
                const isHl = highlightCol !== undefined && cIdx === highlightCol;
                return (
                  <td
                    key={cIdx}
                    style={{
                      padding: '8px 14px',
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '15px',
                      fontWeight: isHl ? 900 : 700,
                      color: isHl ? '#047857' : '#1f2937',
                      background: isHl ? '#d1fae5' : undefined,
                      border: '1px solid #a7f3d0',
                      textAlign: 'center'
                    }}
                  >
                    {cell}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Ray's Colored Stripes Logical Reasoning Diagram
export function StripesLogicDiagram({ order }: { order: string[] }) {
  const colorMap: Record<string, { bg: string; border: string; text: string }> = {
    Yellow: { bg: '#fef08a', border: '#eab308', text: '#854d0e' },
    Blue: { bg: '#bfdbfe', border: '#3b82f6', text: '#1e40af' },
    Red: { bg: '#fecaca', border: '#ef4444', text: '#991b1b' }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', margin: '8px 0' }}>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        {order.map((colorName, idx) => {
          const c = colorMap[colorName] || { bg: '#f1f5f9', border: '#94a3b8', text: '#334155' };
          return (
            <div
              key={idx}
              style={{
                width: '74px',
                height: '80px',
                background: c.bg,
                border: `3px solid ${c.border}`,
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.06)'
              }}
            >
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748b' }}>Stripe #{idx + 1}</span>
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '15px', fontWeight: 900, color: c.text }}>
                {colorName}
              </span>
            </div>
          );
        })}
      </div>
      <div style={{ fontSize: '11.5px', color: '#475569', background: '#f8fafc', padding: '4px 10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
        Clues: Red is NOT first · Yellow next to Blue · Red next to Blue ➔ <strong>Yellow, Blue, Red</strong>
      </div>
    </div>
  );
}

// Sue's Paint Cans Visual Diagram
export function PaintCansDiagram({
  blue = 4,
  green = 3,
  red = 2,
  white = 8
}: {
  blue?: number;
  green?: number;
  red?: number;
  white?: number;
}) {
  return (
    <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '10px 14px', margin: '8px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '4px' }}>
        <span style={{ fontSize: '12px', fontWeight: 800, color: '#059669' }}>Total 17 Cans of Paint:</span>
        <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#4b5563' }}>4 Blue + 3 Green + 2 Red = 9 Colored Cans</span>
      </div>
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {Array.from({ length: blue }).map((_, i) => (
          <span key={`b-${i}`} title="Blue Paint" style={{ padding: '4px 8px', background: '#dbeafe', border: '1.5px solid #3b82f6', borderRadius: '6px', fontSize: '12px', fontWeight: 800, color: '#1d4ed8' }}>
            🥫 Blue
          </span>
        ))}
        {Array.from({ length: green }).map((_, i) => (
          <span key={`g-${i}`} title="Green Paint" style={{ padding: '4px 8px', background: '#dcfce7', border: '1.5px solid #22c55e', borderRadius: '6px', fontSize: '12px', fontWeight: 800, color: '#15803d' }}>
            🥫 Green
          </span>
        ))}
        {Array.from({ length: red }).map((_, i) => (
          <span key={`r-${i}`} title="Red Paint" style={{ padding: '4px 8px', background: '#fee2e2', border: '1.5px solid #ef4444', borderRadius: '6px', fontSize: '12px', fontWeight: 800, color: '#b91c1c' }}>
            🥫 Red
          </span>
        ))}
        {Array.from({ length: white }).map((_, i) => (
          <span key={`w-${i}`} title="White Paint" style={{ padding: '4px 8px', background: '#ffffff', border: '1.5px dashed #94a3b8', borderRadius: '6px', fontSize: '12px', fontWeight: 800, color: '#475569' }}>
            🥫 White
          </span>
        ))}
      </div>
      <div style={{ marginTop: '8px', textAlign: 'center', fontSize: '12px', color: '#065f46', fontWeight: 800 }}>
        17 - 9 = <strong>8 White Cans of Paint</strong>
      </div>
    </div>
  );
}

// Missing Addend Equation Box
export function MissingAddendEquation({
  addend1,
  box,
  total,
  subtractionSentence
}: {
  addend1?: number | string;
  box?: number | string;
  total?: number | string;
  subtractionSentence?: string;
}) {
  return (
    <div style={{ background: '#ecfdf5', border: '1.5px solid #34d399', borderRadius: '10px', padding: '10px 14px', margin: '8px 0', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', fontSize: '20px', fontWeight: 900, fontFamily: "'Outfit', sans-serif" }}>
        <span>{addend1}</span>
        <span>+</span>
        <span style={{ width: '40px', height: '36px', border: '2.5px solid #059669', background: '#fff', borderRadius: '6px', display: 'grid', placeItems: 'center', color: '#059669' }}>
          {box ?? '?'}
        </span>
        <span>=</span>
        <span>{total}</span>
      </div>
      {subtractionSentence && (
        <div style={{ fontSize: '12.5px', color: '#047857', fontWeight: 800, marginTop: '6px' }}>
          Related Subtraction: <strong>{subtractionSentence}</strong>
        </div>
      )}
    </div>
  );
}
