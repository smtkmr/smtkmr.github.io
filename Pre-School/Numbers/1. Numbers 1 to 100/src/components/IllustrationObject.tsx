import React from 'react';
import { ObjectType } from '../types';

interface IllustrationProps {
  type: ObjectType;
  size?: number | string;
  className?: string;
  animate?: boolean;
}

export const IllustrationObject: React.FC<IllustrationProps> = ({
  type,
  size = 80,
  className = '',
  animate = false,
}) => {
  const pixelSize = typeof size === 'number' ? `${size}px` : size;

  return (
    <div
      style={{ width: pixelSize, height: pixelSize }}
      className={`inline-flex items-center justify-center select-none ${
        animate ? 'transition-transform duration-300 hover:scale-110 active:scale-95' : ''
      } ${className}`}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-md overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Apple Gradients */}
          <radialGradient id="apple-body" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ff7b89" />
            <stop offset="45%" stopColor="#ef4444" />
            <stop offset="90%" stopColor="#b91c1c" />
            <stop offset="100%" stopColor="#7f1d1d" />
          </radialGradient>
          <linearGradient id="apple-leaf" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#86efac" />
            <stop offset="60%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>

          {/* Sun Gradients */}
          <radialGradient id="sun-core" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="25%" stopColor="#fef08a" />
            <stop offset="70%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </radialGradient>

          {/* Milk Gradients */}
          <linearGradient id="glass-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="milk-liquid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="85%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>

          {/* Heart Gradients */}
          <radialGradient id="heart-glow" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#fda4af" />
            <stop offset="40%" stopColor="#f43f5e" />
            <stop offset="85%" stopColor="#be123c" />
            <stop offset="100%" stopColor="#881337" />
          </radialGradient>

          {/* Banana Gradients */}
          <linearGradient id="banana-body" x1="20%" y1="10%" x2="80%" y2="90%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#facc15" />
            <stop offset="85%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>

          {/* Carrot Gradients */}
          <linearGradient id="carrot-body" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fed7aa" />
            <stop offset="35%" stopColor="#fb923c" />
            <stop offset="80%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#c2410c" />
          </linearGradient>

          {/* Water Gradients */}
          <radialGradient id="water-drop" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#e0f2fe" />
            <stop offset="30%" stopColor="#38bdf8" />
            <stop offset="80%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" />
          </radialGradient>

          {/* Orange Gradients */}
          <radialGradient id="orange-grad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fed7aa" />
            <stop offset="40%" stopColor="#fb923c" />
            <stop offset="85%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#9a3412" />
          </radialGradient>

          {/* Earth Gradients */}
          <radialGradient id="earth-ocean" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#7dd3fc" />
            <stop offset="50%" stopColor="#0284c7" />
            <stop offset="90%" stopColor="#0369a1" />
            <stop offset="100%" stopColor="#075985" />
          </radialGradient>

          {/* Moon Gradients */}
          <radialGradient id="moon-grad" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#fef9c3" />
            <stop offset="60%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#eab308" />
          </radialGradient>

          {/* Trophy Gold */}
          <linearGradient id="gold-shine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="30%" stopColor="#facc15" />
            <stop offset="70%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>
        </defs>

        {/* ================= APPLE ================= */}
        {type === 'apple' && (
          <g>
            {/* Soft Shadow */}
            <ellipse cx="50" cy="92" rx="32" ry="7" fill="#00000018" />
            {/* Apple Stalk */}
            <path
              d="M50 30 C51 18, 59 13, 62 10"
              stroke="#78350f"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Apple Leaf */}
            <path
              d="M52 26 C64 16, 78 20, 80 28 C74 36, 58 32, 52 26 Z"
              fill="url(#apple-leaf)"
              stroke="#166534"
              strokeWidth="1.5"
            />
            {/* Leaf Vein */}
            <path d="M54 27 Q66 25 76 28" stroke="#bbf7d0" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            {/* Apple Body with twin curves */}
            <path
              d="M50 34 C30 31, 14 44, 15 63 C16 83, 34 90, 50 86 C66 90, 84 83, 85 63 C86 44, 70 31, 50 34 Z"
              fill="url(#apple-body)"
            />
            {/* Specular 3D Highlight curve */}
            <path
              d="M30 42 C23 48, 23 60, 27 68"
              stroke="#ffffff"
              strokeWidth="4"
              strokeLinecap="round"
              strokeOpacity="0.65"
              fill="none"
            />
            <circle cx="34" cy="40" r="3.2" fill="#ffffff" fillOpacity="0.8" />
            {/* Little shiny star sparkle */}
            <path d="M68 50 L70 54 L74 55 L70 57 L68 61 L67 57 L63 55 L67 54 Z" fill="#ffffff" fillOpacity="0.75" />
          </g>
        )}

        {/* ================= SUN ================= */}
        {type === 'sun' && (
          <g>
            {/* Radiant Sunbeams */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <line
                key={deg}
                x1="50"
                y1="12"
                x2="50"
                y2="20"
                transform={`rotate(${deg} 50 50)`}
                stroke="#f59e0b"
                strokeWidth="5.5"
                strokeLinecap="round"
              />
            ))}
            {/* Glow Circle */}
            <circle cx="50" cy="50" r="32" fill="#fde047" fillOpacity="0.4" />
            {/* Sun Core */}
            <circle cx="50" cy="50" r="28" fill="url(#sun-core)" stroke="#f59e0b" strokeWidth="2.5" />
            {/* Shiny Highlight */}
            <path
              d="M35 34 C42 27, 54 27, 63 32"
              stroke="#ffffff"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeOpacity="0.75"
              fill="none"
            />
            {/* Happy Eyes and Smile */}
            <circle cx="41" cy="48" r="3.5" fill="#78350f" />
            <circle cx="59" cy="48" r="3.5" fill="#78350f" />
            <circle cx="42.5" cy="46.5" r="1.3" fill="#ffffff" />
            <circle cx="60.5" cy="46.5" r="1.3" fill="#ffffff" />
            {/* Rosy Cheeks */}
            <circle cx="35" cy="54" r="3.5" fill="#f87171" fillOpacity="0.65" />
            <circle cx="65" cy="54" r="3.5" fill="#f87171" fillOpacity="0.65" />
            {/* Big Friendly Smile */}
            <path d="M43 56 Q50 63 57 56" stroke="#78350f" strokeWidth="2.8" strokeLinecap="round" fill="none" />
          </g>
        )}

        {/* ================= MILK ================= */}
        {type === 'milk' && (
          <g>
            {/* Shadow */}
            <ellipse cx="50" cy="91" rx="26" ry="6" fill="#00000018" />
            {/* Glass Body */}
            <path
              d="M30 25 L35 84 C36 88, 64 88, 65 84 L70 25 Z"
              fill="url(#glass-grad)"
              stroke="#38bdf8"
              strokeWidth="2.5"
            />
            {/* Milk Inside */}
            <path
              d="M32 38 L36 83 C37 86, 63 86, 64 83 L68 38 Q50 42 32 38 Z"
              fill="url(#milk-liquid)"
            />
            {/* Milk Wave Top Surface */}
            <ellipse cx="50" cy="38" rx="18" ry="4.5" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
            {/* Cute Cartoon Straw */}
            <path
              d="M56 10 L56 34"
              stroke="#ef4444"
              strokeWidth="4.5"
              strokeLinecap="round"
              fill="none"
            />
            <line x1="53" y1="18" x2="59" y2="18" stroke="#ffffff" strokeWidth="2" />
            <line x1="53" y1="24" x2="59" y2="24" stroke="#ffffff" strokeWidth="2" />
            {/* Glass Shine */}
            <path d="M37 45 L39 78" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.75" />
            {/* Healthy Milk Badge / Splash */}
            <circle cx="50" cy="60" r="10" fill="#38bdf8" fillOpacity="0.2" />
            <text x="50" y="63" textAnchor="middle" fontSize="10" fontWeight="900" fill="#0284c7">1</text>
          </g>
        )}

        {/* ================= HEART ================= */}
        {type === 'heart' && (
          <g>
            <ellipse cx="50" cy="91" rx="28" ry="6" fill="#00000018" />
            <path
              d="M50 86 C22 68, 12 50, 14 36 C16 22, 32 17, 46 26 L50 30 L54 26 C68 17, 84 22, 86 36 C88 50, 78 68, 50 86 Z"
              fill="url(#heart-glow)"
              stroke="#9f1239"
              strokeWidth="2"
            />
            {/* 3D Highlight Curvature */}
            <path
              d="M26 34 C25 27, 34 23, 42 27"
              stroke="#ffffff"
              strokeWidth="4"
              strokeLinecap="round"
              strokeOpacity="0.75"
              fill="none"
            />
            <circle cx="28" cy="40" r="3" fill="#ffffff" fillOpacity="0.7" />
            {/* Twinkle */}
            <path d="M68 38 L70 41 L73 42 L70 43 L68 46 L67 43 L64 42 L67 41 Z" fill="#ffffff" fillOpacity="0.8" />
          </g>
        )}

        {/* ================= NOSE ================= */}
        {type === 'nose' && (
          <g>
            <ellipse cx="50" cy="88" rx="24" ry="6" fill="#00000015" />
            {/* Cute Face Contour Area */}
            <circle cx="50" cy="50" r="40" fill="#fff7ed" stroke="#fdba74" strokeWidth="2.5" />
            {/* Rosy Cheeks */}
            <circle cx="26" cy="56" r="8" fill="#fda4af" fillOpacity="0.6" />
            <circle cx="74" cy="56" r="8" fill="#fda4af" fillOpacity="0.6" />
            {/* The Cute 1 Nose */}
            <path
              d="M48 28 C48 38, 41 46, 42 56 C43 62, 57 62, 58 56 C59 50, 52 48, 52 28"
              fill="#fb923c"
              stroke="#ea580c"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Nostrils */}
            <ellipse cx="44" cy="57" rx="2.5" ry="3.5" fill="#c2410c" />
            <ellipse cx="56" cy="57" rx="2.5" ry="3.5" fill="#c2410c" />
            {/* Nose bridge highlight */}
            <path d="M49 34 L49 46" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.85" />
            {/* Big Friendly Smile underneath */}
            <path d="M40 70 Q50 78 60 70" stroke="#ea580c" strokeWidth="3" strokeLinecap="round" fill="none" />
          </g>
        )}

        {/* ================= BANANA ================= */}
        {type === 'banana' && (
          <g>
            <ellipse cx="52" cy="88" rx="30" ry="6" fill="#00000015" />
            {/* Banana Stalk */}
            <path d="M22 28 L28 22" stroke="#65a30d" strokeWidth="6" strokeLinecap="round" />
            {/* Banana Body */}
            <path
              d="M26 24 C40 30, 72 45, 78 72 C78 78, 72 82, 65 80 C50 68, 28 50, 20 30 C18 26, 22 22, 26 24 Z"
              fill="url(#banana-body)"
              stroke="#ca8a04"
              strokeWidth="2.5"
            />
            {/* Ridge Line */}
            <path
              d="M25 27 C42 36, 68 52, 73 74"
              stroke="#eab308"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Highlights */}
            <path
              d="M32 32 C45 42, 60 55, 68 68"
              stroke="#ffffff"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeOpacity="0.75"
              fill="none"
            />
            {/* Bottom Tip */}
            <circle cx="73" cy="77" r="3.5" fill="#854d0e" />
          </g>
        )}

        {/* ================= TWO BANANAS (Game card) ================= */}
        {type === 'two-bananas' && (
          <g>
            <g transform="translate(-10, -5) scale(0.8)">
              <path d="M26 24 C40 30, 72 45, 78 72 C78 78, 72 82, 65 80 C50 68, 28 50, 20 30 Z" fill="url(#banana-body)" stroke="#ca8a04" strokeWidth="2.5" />
            </g>
            <g transform="translate(18, 12) scale(0.8)">
              <path d="M26 24 C40 30, 72 45, 78 72 C78 78, 72 82, 65 80 C50 68, 28 50, 20 30 Z" fill="url(#banana-body)" stroke="#ca8a04" strokeWidth="2.5" />
            </g>
          </g>
        )}

        {/* ================= THREE STRAWBERRIES (Game card) ================= */}
        {type === 'three-strawberries' && (
          <g>
            {[
              { x: 18, y: 35, s: 0.65 },
              { x: 52, y: 25, s: 0.7 },
              { x: 35, y: 55, s: 0.68 },
            ].map((st, i) => (
              <g key={i} transform={`translate(${st.x}, ${st.y}) scale(${st.s})`}>
                <path d="M25 15 C10 15, 5 30, 25 50 C45 30, 40 15, 25 15 Z" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
                <path d="M15 15 Q25 22 35 15 Q25 8 15 15 Z" fill="#22c55e" />
                <circle cx="20" cy="28" r="1.5" fill="#fef08a" />
                <circle cx="30" cy="28" r="1.5" fill="#fef08a" />
                <circle cx="25" cy="38" r="1.5" fill="#fef08a" />
              </g>
            ))}
          </g>
        )}

        {/* ================= CARROT ================= */}
        {type === 'carrot' && (
          <g>
            <ellipse cx="50" cy="91" rx="22" ry="5" fill="#00000015" />
            {/* Carrot Greens Top */}
            <path d="M50 32 C42 16, 32 14, 28 10 C36 18, 44 26, 48 30 Z" fill="#22c55e" />
            <path d="M50 32 C50 12, 54 8, 52 4 C54 14, 52 24, 50 32 Z" fill="#16a34a" />
            <path d="M50 32 C58 16, 68 14, 72 10 C64 18, 56 26, 52 30 Z" fill="#22c55e" />
            {/* Carrot Body (Tapering) */}
            <path
              d="M34 32 C38 30, 62 30, 66 32 C68 45, 58 74, 52 88 C50 91, 48 91, 46 88 C40 74, 32 45, 34 32 Z"
              fill="url(#carrot-body)"
              stroke="#ea580c"
              strokeWidth="2.5"
            />
            {/* Horizontal Grooves */}
            <path d="M38 42 Q46 44 54 42" stroke="#c2410c" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M42 56 Q50 58 58 56" stroke="#c2410c" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M44 70 Q50 71 54 70" stroke="#c2410c" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            {/* Shiny Highlight */}
            <path d="M38 35 L44 80" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.65" />
          </g>
        )}

        {/* ================= TOOTHBRUSH ================= */}
        {type === 'toothbrush' && (
          <g>
            <ellipse cx="50" cy="90" rx="25" ry="6" fill="#00000015" />
            {/* Handle */}
            <path
              d="M78 82 C74 88, 68 88, 64 84 L26 42 C22 38, 24 30, 30 32 L38 38 L76 76 C80 80, 80 84, 78 82 Z"
              fill="#06b6d4"
              stroke="#0891b2"
              strokeWidth="2.5"
            />
            {/* Handle Grip Inlay */}
            <path d="M56 64 L66 74" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.8" />
            {/* Bristles Head */}
            <rect x="20" y="24" width="22" height="13" rx="4" transform="rotate(-40 28 28)" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            {/* Mint Toothpaste Swirl on top */}
            <path
              d="M20 20 C24 14, 34 16, 38 22 C42 28, 48 24, 46 18"
              stroke="#34d399"
              strokeWidth="4.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Toothpaste bubbles */}
            <circle cx="28" cy="14" r="2.5" fill="#a7f3d0" />
            <circle cx="44" cy="22" r="2" fill="#a7f3d0" />
            <circle cx="18" cy="26" r="1.5" fill="#ffffff" />
          </g>
        )}

        {/* ================= SALAD BOWL ================= */}
        {type === 'salad' && (
          <g>
            <ellipse cx="50" cy="89" rx="32" ry="7" fill="#00000015" />
            {/* Salad Greens Mound */}
            <ellipse cx="50" cy="50" rx="34" ry="20" fill="#22c55e" />
            <circle cx="34" cy="44" r="14" fill="#16a34a" />
            <circle cx="66" cy="44" r="14" fill="#4ade80" />
            <circle cx="50" cy="38" r="12" fill="#22c55e" />
            {/* Cherry Tomatoes */}
            <circle cx="42" cy="46" r="6" fill="#ef4444" stroke="#b91c1c" strokeWidth="1.2" />
            <circle cx="62" cy="44" r="6" fill="#ef4444" stroke="#b91c1c" strokeWidth="1.2" />
            {/* Cucumber Slices */}
            <circle cx="52" cy="42" r="7" fill="#86efac" stroke="#15803d" strokeWidth="1.5" />
            {/* Beautiful Wooden Salad Bowl */}
            <path
              d="M16 52 C16 78, 30 86, 50 86 C70 86, 84 78, 84 52 Z"
              fill="#b45309"
              stroke="#78350f"
              strokeWidth="3"
            />
            {/* Bowl Rim */}
            <ellipse cx="50" cy="52" rx="34" ry="7" fill="#d97706" stroke="#78350f" strokeWidth="2.5" />
            {/* Bowl highlight */}
            <path d="M26 62 C34 76, 66 76, 74 62" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.4" fill="none" />
          </g>
        )}

        {/* ================= MOON ================= */}
        {type === 'moon' && (
          <g>
            {/* Ambient Night Stars */}
            <path d="M22 24 L24 28 L28 29 L24 31 L22 35 L20 31 L16 29 L20 28 Z" fill="#fde047" />
            <path d="M78 20 L79 23 L82 24 L79 25 L78 28 L77 25 L74 24 L77 23 Z" fill="#fef08a" />
            <path d="M74 72 L75 74 L78 75 L75 76 L74 79 L73 76 L70 75 L73 74 Z" fill="#fde047" />
            {/* Crescent Moon */}
            <path
              d="M62 14 C36 14, 18 36, 18 62 C18 78, 26 84, 38 88 C26 76, 26 50, 42 34 C52 24, 66 22, 74 24 C72 17, 68 14, 62 14 Z"
              fill="url(#moon-grad)"
              stroke="#ca8a04"
              strokeWidth="2.5"
            />
            {/* Cute Sleepy Face */}
            <path d="M28 54 Q32 58 36 54" stroke="#854d0e" strokeWidth="2" strokeLinecap="round" fill="none" />
            <circle cx="38" cy="62" r="3" fill="#f87171" fillOpacity="0.6" />
            <path d="M30 65 Q36 70 40 66" stroke="#854d0e" strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>
        )}

        {/* ================= EARTH ================= */}
        {type === 'earth' && (
          <g>
            <ellipse cx="50" cy="91" rx="30" ry="6" fill="#00000018" />
            {/* Planet Globe */}
            <circle cx="50" cy="50" r="38" fill="url(#earth-ocean)" stroke="#0284c7" strokeWidth="2.5" />
            {/* Continents */}
            <path
              d="M36 28 C42 24, 48 30, 44 38 C40 44, 30 42, 28 36 Z"
              fill="#22c55e"
              stroke="#15803d"
              strokeWidth="1.2"
            />
            <path
              d="M52 32 C64 28, 76 34, 78 44 C80 54, 70 58, 62 52 C56 46, 50 48, 52 32 Z"
              fill="#22c55e"
              stroke="#15803d"
              strokeWidth="1.2"
            />
            <path
              d="M34 56 C44 54, 52 64, 48 76 C40 82, 32 74, 34 56 Z"
              fill="#22c55e"
              stroke="#15803d"
              strokeWidth="1.2"
            />
            {/* Cloud Swirls */}
            <path d="M22 46 Q34 40 46 44" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.75" fill="none" />
            <path d="M52 66 Q66 60 76 68" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.75" fill="none" />
            {/* Atmosphere Sheen */}
            <path d="M20 34 C26 22, 42 16, 56 18" stroke="#bae6fd" strokeWidth="3.5" strokeLinecap="round" strokeOpacity="0.8" fill="none" />
          </g>
        )}

        {/* ================= FINGER (1 UP) ================= */}
        {type === 'finger' && (
          <g>
            <ellipse cx="50" cy="91" rx="26" ry="6" fill="#00000015" />
            {/* Star Sparkle on Finger Tip */}
            <path d="M50 8 L52 14 L58 15 L53 18 L55 24 L50 20 L45 24 L47 18 L42 15 L48 14 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
            {/* Hand Palm & Folded Fingers */}
            <path
              d="M32 52 C32 46, 38 46, 40 52 L40 68 C40 72, 60 72, 60 68 L60 54 C60 48, 66 48, 66 54 L66 70 C66 84, 58 88, 48 88 C38 88, 30 84, 30 70 Z"
              fill="#fed7aa"
              stroke="#ea580c"
              strokeWidth="2.5"
            />
            {/* Index Finger Standing Proud (Number 1) */}
            <path
              d="M44 22 C44 16, 56 16, 56 22 L56 66 L44 66 Z"
              fill="#fed7aa"
              stroke="#ea580c"
              strokeWidth="2.8"
            />
            {/* Nail */}
            <ellipse cx="50" cy="24" rx="4" ry="5" fill="#ffedd5" stroke="#fdba74" strokeWidth="1.2" />
            {/* Knuckle Creases */}
            <line x1="46" y1="38" x2="54" y2="38" stroke="#ea580c" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="46" y1="50" x2="54" y2="50" stroke="#ea580c" strokeWidth="1.8" strokeLinecap="round" />
          </g>
        )}

        {/* ================= BROCCOLI ================= */}
        {type === 'broccoli' && (
          <g>
            <ellipse cx="50" cy="90" rx="20" ry="5" fill="#00000015" />
            {/* Broccoli Stalk */}
            <path
              d="M42 56 L40 86 C40 88, 60 88, 60 86 L58 56 Z"
              fill="#86efac"
              stroke="#15803d"
              strokeWidth="2.5"
            />
            {/* Fluffy Curly Floret Clouds */}
            <circle cx="34" cy="44" r="16" fill="#15803d" />
            <circle cx="66" cy="44" r="16" fill="#15803d" />
            <circle cx="50" cy="32" r="18" fill="#22c55e" stroke="#166534" strokeWidth="1.5" />
            <circle cx="36" cy="38" r="13" fill="#4ade80" />
            <circle cx="64" cy="38" r="13" fill="#4ade80" />
            <circle cx="50" cy="46" r="14" fill="#16a34a" />
            {/* Texture dots */}
            <circle cx="46" cy="32" r="2" fill="#86efac" />
            <circle cx="56" cy="36" r="2" fill="#86efac" />
          </g>
        )}

        {/* ================= ORANGE ================= */}
        {type === 'orange' && (
          <g>
            <ellipse cx="50" cy="91" rx="30" ry="6" fill="#00000015" />
            {/* Orange Body */}
            <circle cx="50" cy="54" r="34" fill="url(#orange-grad)" stroke="#c2410c" strokeWidth="2.5" />
            {/* Citrus Leaf */}
            <path
              d="M50 22 C58 12, 72 14, 76 20 C70 28, 56 26, 50 22 Z"
              fill="#22c55e"
              stroke="#15803d"
              strokeWidth="1.5"
            />
            {/* Orange Stem */}
            <circle cx="50" cy="22" r="3" fill="#78350f" />
            {/* Specular Highlight */}
            <path
              d="M32 36 C26 44, 26 56, 30 66"
              stroke="#ffffff"
              strokeWidth="4"
              strokeLinecap="round"
              strokeOpacity="0.75"
              fill="none"
            />
            {/* Slice texture dots */}
            <circle cx="62" cy="48" r="2" fill="#ea580c" />
            <circle cx="58" cy="62" r="2" fill="#ea580c" />
            <circle cx="48" cy="70" r="2" fill="#ea580c" />
          </g>
        )}

        {/* ================= WATER BOTTLE / DROP ================= */}
        {type === 'water' && (
          <g>
            <ellipse cx="50" cy="91" rx="25" ry="6" fill="#00000015" />
            {/* Big 3D Water Droplet */}
            <path
              d="M50 14 C50 14, 20 50, 20 66 C20 82, 34 88, 50 88 C66 88, 80 82, 80 66 C80 50, 50 14, 50 14 Z"
              fill="url(#water-drop)"
              stroke="#0284c7"
              strokeWidth="2.5"
            />
            {/* Curved Specular 3D highlight */}
            <path
              d="M34 50 C30 58, 30 70, 36 78"
              stroke="#ffffff"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeOpacity="0.8"
              fill="none"
            />
            <circle cx="40" cy="42" r="3" fill="#ffffff" fillOpacity="0.85" />
            {/* Little bubble inside */}
            <circle cx="60" cy="68" r="4.5" fill="#ffffff" fillOpacity="0.4" />
          </g>
        )}

        {/* ================= SOUP ================= */}
        {type === 'soup' && (
          <g>
            <ellipse cx="50" cy="90" rx="30" ry="6" fill="#00000015" />
            {/* Steam Curls */}
            <path d="M42 22 Q40 14 44 8" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
            <path d="M52 24 Q54 16 50 10" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
            <path d="M62 22 Q60 14 64 8" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
            {/* Soup Bowl */}
            <path
              d="M18 48 C18 78, 32 86, 50 86 C68 86, 82 78, 82 48 Z"
              fill="#fb923c"
              stroke="#c2410c"
              strokeWidth="3"
            />
            {/* Bowl Rim */}
            <ellipse cx="50" cy="48" rx="32" ry="9" fill="#f97316" stroke="#c2410c" strokeWidth="2.5" />
            {/* Soup Liquid */}
            <ellipse cx="50" cy="49" rx="28" ry="7" fill="#fef08a" stroke="#eab308" strokeWidth="1.5" />
            {/* Veggie Bits in soup */}
            <circle cx="42" cy="49" r="2.5" fill="#ef4444" />
            <circle cx="58" cy="48" r="2.5" fill="#22c55e" />
            <circle cx="50" cy="51" r="2" fill="#ea580c" />
            {/* Spoon */}
            <path d="M68 34 L78 20" stroke="#94a3b8" strokeWidth="4.5" strokeLinecap="round" />
          </g>
        )}

        {/* ================= TROPHY ================= */}
        {type === 'trophy' && (
          <g>
            <ellipse cx="50" cy="91" rx="28" ry="6" fill="#00000015" />
            {/* Trophy Pedestal Base */}
            <rect x="34" y="78" width="32" height="10" rx="3" fill="#78350f" stroke="#451a03" strokeWidth="2" />
            <path d="M44 68 L44 78 L56 78 L56 68 Z" fill="url(#gold-shine)" stroke="#ca8a04" strokeWidth="2" />
            {/* Trophy Handles */}
            <path
              d="M26 30 C12 30, 12 52, 28 54"
              stroke="#eab308"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M74 30 C88 30, 88 52, 72 54"
              stroke="#eab308"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            {/* Trophy Cup */}
            <path
              d="M26 22 L74 22 L70 54 C66 66, 58 70, 50 70 C42 70, 34 66, 30 54 Z"
              fill="url(#gold-shine)"
              stroke="#b45309"
              strokeWidth="2.5"
            />
            {/* Trophy Rim */}
            <ellipse cx="50" cy="22" rx="24" ry="5" fill="#fef9c3" stroke="#b45309" strokeWidth="2" />
            {/* Big Star and "1" on Trophy */}
            <circle cx="50" cy="44" r="13" fill="#ffffff" fillOpacity="0.9" stroke="#b45309" strokeWidth="1.5" />
            <text x="50" y="50" textAnchor="middle" fontSize="17" fontWeight="900" fill="#b45309" fontFamily="Outfit, Quicksand, sans-serif">1</text>
            {/* Golden Sparkles */}
            <path d="M22 16 L24 20 L28 21 L24 22 L22 26 L20 22 L16 21 L20 20 Z" fill="#facc15" />
            <path d="M78 14 L80 17 L83 18 L80 19 L78 22 L76 19 L73 18 L76 17 Z" fill="#facc15" />
          </g>
        )}
      </svg>
    </div>
  );
};
