import React, { useState, useEffect, useId, useRef } from 'react';

export interface ColorTheme {
  id: string;
  name: string;
  nameHi: string;
  frontStart: string;
  frontEnd: string;
  side3d: string;
  strokeAccent: string;
  glow: string;
}

export const LETTER_THEMES: ColorTheme[] = [
  {
    id: 'apple-red',
    name: 'Apple Red',
    nameHi: 'सेब लाल',
    frontStart: '#ff5f6d',
    frontEnd: '#e11d48',
    side3d: '#881337',
    strokeAccent: '#fde047',
    glow: '#fecdd3',
  },
  {
    id: 'econova-mint',
    name: 'Emerald Mint',
    nameHi: 'हरा मिंट',
    frontStart: '#34d399',
    frontEnd: '#059669',
    side3d: '#064e3b',
    strokeAccent: '#fde047',
    glow: '#a7f3d0',
  },
  {
    id: 'sunshine-gold',
    name: 'Sunshine Gold',
    nameHi: 'सुनहरा पीला',
    frontStart: '#fde047',
    frontEnd: '#eab308',
    side3d: '#854d0e',
    strokeAccent: '#059669',
    glow: '#fef08a',
  },
  {
    id: 'sky-blue',
    name: 'Aeroplane Blue',
    nameHi: 'आसमानी नीला',
    frontStart: '#38bdf8',
    frontEnd: '#0284c7',
    side3d: '#0c4a6e',
    strokeAccent: '#fde047',
    glow: '#bae6fd',
  },
  {
    id: 'royal-purple',
    name: 'Royal Berry',
    nameHi: 'बैंगनी रंग',
    frontStart: '#c084fc',
    frontEnd: '#7e22ce',
    side3d: '#3b0764',
    strokeAccent: '#fde047',
    glow: '#e9d5ff',
  },
];

interface ThreeDLetterDisplayProps {
  letterMode: 'A' | 'a' | 'Aa';
  theme: ColorTheme;
  showStrokeGuides?: boolean;
  onSpeak?: (text: string, lang: string) => void;
}

export const ThreeDLetterDisplay: React.FC<ThreeDLetterDisplayProps> = ({
  letterMode,
  theme,
  showStrokeGuides = true,
  onSpeak,
}) => {
  const uniqueId = useId().replace(/[^a-zA-Z0-9]/g, '');
  const [animatingStroke, setAnimatingStroke] = useState<number | null>(null);
  const timersRef = useRef<number[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };

  useEffect(() => {
    clearTimers();
    setAnimatingStroke(null);
    return () => clearTimers();
  }, [letterMode]);

  const playStrokeAnimation = () => {
    clearTimers();
    if (onSpeak) {
      try {
        if (letterMode === 'A') {
          onSpeak('Capital A. Stroke 1 slant down left. Stroke 2 slant down right. Stroke 3 sleeping line across.', 'en-US');
        } else if (letterMode === 'a') {
          onSpeak('Small a. Stroke 1 curve around left. Stroke 2 straight line down.', 'en-US');
        } else {
          onSpeak('Capital A and small a. A says aah as in Apple.', 'en-US');
        }
      } catch {
        // Ignore speech synthesis errors
      }
    }
    setAnimatingStroke(1);
    timersRef.current.push(window.setTimeout(() => setAnimatingStroke(2), 900));
    timersRef.current.push(window.setTimeout(() => setAnimatingStroke(3), 1800));
    timersRef.current.push(window.setTimeout(() => setAnimatingStroke(null), 3000));
  };

  const gradId = `grad3d_${theme.id}_${uniqueId}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '380px',
          aspectRatio: '360 / 245',
          background: 'radial-gradient(circle at 50% 45%, #ffffff 0%, #f0fdf4 75%, #dcfce7 100%)',
          border: '3px solid #34d399',
          borderRadius: '24px',
          boxShadow: `0 8px 0 #10b981, inset 0 0 24px ${theme.glow}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <svg
          viewBox="0 0 360 250"
          style={{ width: '100%', height: '100%', display: 'block' }}
          role="img"
          aria-label={`Big 3D Colored Letter ${letterMode}`}
        >
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={theme.frontStart} />
              <stop offset="100%" stopColor={theme.frontEnd} />
            </linearGradient>
          </defs>

          {/* 4-line notebook guidelines */}
          <line x1="20" y1="42" x2="340" y2="42" stroke="#fca5a5" strokeWidth="2" strokeDasharray="6 4" />
          <line x1="20" y1="102" x2="340" y2="102" stroke="#93c5fd" strokeWidth="2" strokeDasharray="6 4" />
          <line x1="20" y1="185" x2="340" y2="185" stroke="#93c5fd" strokeWidth="2.5" />
          <line x1="20" y1="225" x2="340" y2="225" stroke="#fca5a5" strokeWidth="2" strokeDasharray="6 4" />

          {/* Capital A Group (Always mounted, toggled via display) */}
          <g style={{ display: letterMode === 'A' ? 'block' : 'none' }}>
            {[12, 10, 8, 6, 4, 2].map((offset) => (
              <g
                key={offset}
                transform={`translate(${offset}, ${offset})`}
                stroke={theme.side3d}
                strokeWidth="34"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              >
                <path d="M180 46 L108 184" />
                <path d="M180 46 L252 184" />
                <path d="M130 142 L230 142" />
              </g>
            ))}

            <g
              stroke={`url(#${gradId})`}
              strokeWidth="34"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            >
              <path
                d="M180 46 L108 184"
                opacity={animatingStroke && animatingStroke < 1 ? 0.25 : 1}
              />
              <path
                d="M180 46 L252 184"
                opacity={animatingStroke && animatingStroke < 2 ? 0.25 : 1}
              />
              <path
                d="M130 142 L230 142"
                opacity={animatingStroke && animatingStroke < 3 ? 0.25 : 1}
              />
            </g>

            <g
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
              transform="translate(-4, -4)"
            >
              <path d="M178 52 L112 178" />
              <path d="M182 52 L248 178" />
              <path d="M136 140 L224 140" />
            </g>

            <g style={{ display: showStrokeGuides ? 'block' : 'none' }}>
              <circle cx="145" cy="70" r="13" fill="#fde047" stroke="#059669" strokeWidth="2.5" />
              <text x="145" y="75" textAnchor="middle" fontSize="13" fontWeight="900" fill="#065f46">1</text>
              <path d="M158 84 L132 134" stroke="#ffffff" strokeWidth="3" strokeDasharray="4 4" />

              <circle cx="215" cy="70" r="13" fill="#fde047" stroke="#059669" strokeWidth="2.5" />
              <text x="215" y="75" textAnchor="middle" fontSize="13" fontWeight="900" fill="#065f46">2</text>
              <path d="M202 84 L228 134" stroke="#ffffff" strokeWidth="3" strokeDasharray="4 4" />

              <circle cx="180" cy="142" r="13" fill="#fde047" stroke="#059669" strokeWidth="2.5" />
              <text x="180" y="147" textAnchor="middle" fontSize="13" fontWeight="900" fill="#065f46">3</text>
            </g>
          </g>

          {/* Small a Group (Always mounted, toggled via display) */}
          <g style={{ display: letterMode === 'a' ? 'block' : 'none' }}>
            {[12, 10, 8, 6, 4, 2].map((offset) => (
              <g
                key={offset}
                transform={`translate(${offset}, ${offset})`}
                stroke={theme.side3d}
                strokeWidth="30"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              >
                <path d="M214 125 C195 96, 130 98, 130 144 C130 188, 195 190, 214 160" />
                <path d="M216 104 L216 184" />
              </g>
            ))}

            <g
              stroke={`url(#${gradId})`}
              strokeWidth="30"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            >
              <path
                d="M214 125 C195 96, 130 98, 130 144 C130 188, 195 190, 214 160"
                opacity={animatingStroke && animatingStroke < 1 ? 0.25 : 1}
              />
              <path
                d="M216 104 L216 184"
                opacity={animatingStroke && animatingStroke < 2 ? 0.25 : 1}
              />
            </g>

            <g
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
              transform="translate(-3, -3)"
            >
              <path d="M206 118 C185 102, 136 106, 136 144 C136 176, 185 182, 206 164" />
              <path d="M216 110 L216 178" />
            </g>

            <g style={{ display: showStrokeGuides ? 'block' : 'none' }}>
              <circle cx="132" cy="112" r="13" fill="#fde047" stroke="#059669" strokeWidth="2.5" />
              <text x="132" y="117" textAnchor="middle" fontSize="13" fontWeight="900" fill="#065f46">1</text>

              <circle cx="242" cy="112" r="13" fill="#fde047" stroke="#059669" strokeWidth="2.5" />
              <text x="242" y="117" textAnchor="middle" fontSize="13" fontWeight="900" fill="#065f46">2</text>
            </g>
          </g>

          {/* Combined Aa Group (Always mounted, toggled via display) */}
          <g style={{ display: letterMode === 'Aa' ? 'block' : 'none' }}>
            {[10, 8, 6, 4, 2].map((offset) => (
              <g
                key={offset}
                transform={`translate(${offset}, ${offset})`}
                stroke={theme.side3d}
                strokeWidth="26"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              >
                <path d="M115 50 L58 184" />
                <path d="M115 50 L172 184" />
                <path d="M75 144 L155 144" />
                <path d="M292 126 C276 100, 222 102, 222 144 C222 186, 276 188, 292 162" />
                <path d="M295 106 L295 184" />
              </g>
            ))}

            <g
              stroke={`url(#${gradId})`}
              strokeWidth="26"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            >
              <path d="M115 50 L58 184" />
              <path d="M115 50 L172 184" />
              <path d="M75 144 L155 144" />
              <path d="M292 126 C276 100, 222 102, 222 144 C222 186, 276 188, 292 162" />
              <path d="M295 106 L295 184" />
            </g>

            <g
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
              transform="translate(-3, -3)"
            >
              <path d="M115 55 L62 178" />
              <path d="M115 55 L168 178" />
              <path d="M80 144 L150 144" />
              <path d="M286 120 C270 105, 226 108, 226 144" />
              <path d="M295 112 L295 178" />
            </g>
          </g>
        </svg>

        {/* Top-left 3D Badge */}
        <span
          style={{
            position: 'absolute',
            top: '10px',
            left: '12px',
            background: '#fde047',
            color: '#065f46',
            fontWeight: 900,
            fontSize: '11px',
            padding: '3px 9px',
            borderRadius: '12px',
            border: '2px solid #059669',
            fontFamily: 'var(--heading)',
          }}
        >
          <span>3D FULL COLOR · </span>
          <span>{letterMode}</span>
        </span>
      </div>

      {/* Action bar under the 3D letter */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '10px' }}>
        <button
          type="button"
          className="listen-btn"
          onClick={playStrokeAnimation}
          style={{ padding: '7px 14px', fontSize: '12px' }}
        >
          ▶ Watch 3D Stroke Order / लिखने का क्रम देखें
        </button>
      </div>
    </div>
  );
};
