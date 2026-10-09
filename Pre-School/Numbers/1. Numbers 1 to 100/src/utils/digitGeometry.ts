// Pure mathematical font generator for digits 0-9, all letters A-Z, and hyphen '-'
// with generous preschool letter spacing and calibrated 4 handwriting guidelines.

export const Y_TOP_1 = 38;   // Top red line (Line 1)
export const Y_MID_1 = 84;   // Midline (Line 1, dashed blue)
export const Y_BASE_1 = 134; // Baseline (Line 1, solid blue)
export const Y_BOT_1 = 158;  // Bottom red line (Line 1)

export const Y_TOP_2 = 186;  // Top red line (Line 2)
export const Y_MID_2 = 232;  // Midline (Line 2, dashed blue)
export const Y_BASE_2 = 282; // Baseline (Line 2, solid blue)
export const Y_BOT_2 = 306;  // Bottom red line (Line 2)

export interface Point {
  x: number;
  y: number;
  g: number;
}

export function linePoints(x1: number, y1: number, x2: number, y2: number, steps: number, g: number): Point[] {
  const pts: Point[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    pts.push({
      x: Math.round((x1 + (x2 - x1) * t) * 10) / 10,
      y: Math.round((y1 + (y2 - y1) * t) * 10) / 10,
      g,
    });
  }
  return pts;
}

export function ellipsePoints(cx: number, cy: number, rx: number, ry: number, steps: number, g: number): Point[] {
  const pts: Point[] = [];
  for (let i = 0; i < steps; i++) {
    const angle = (i / steps) * Math.PI * 2 - Math.PI / 2;
    pts.push({
      x: Math.round((cx + Math.cos(angle) * rx) * 10) / 10,
      y: Math.round((cy + Math.sin(angle) * ry) * 10) / 10,
      g,
    });
  }
  return pts;
}

/** Digits 0-9 with spacious width and checkpoints */
export function getDigitData(
  digit: string,
  cx: number,
  w = 56,
  groupOffset = 1,
  yTop = Y_TOP_1,
  yBase = Y_BASE_1
): { path: string; points: Point[] } {
  const left = cx - w / 2;
  const right = cx + w / 2;
  const pts: Point[] = [];
  const mid = (yTop + yBase) / 2;

  switch (digit) {
    case '1': {
      const p = `M ${cx - 16} ${yTop + 26} L ${cx} ${yTop} L ${cx} ${yBase} M ${cx - 20} ${yBase} L ${cx + 20} ${yBase}`;
      pts.push(...linePoints(cx - 16, yTop + 26, cx, yTop, 2, groupOffset));
      pts.push(...linePoints(cx, yTop, cx, yBase, 7, groupOffset));
      pts.push(...linePoints(cx - 20, yBase, cx + 20, yBase, 3, groupOffset + 1));
      return { path: p, points: pts };
    }
    case '2': {
      const p = `M ${left} ${yTop + 26} C ${left} ${yTop}, ${right} ${yTop}, ${right} ${yTop + 34} C ${right} ${yTop + 60}, ${left + 4} ${yBase - 18}, ${left} ${yBase} L ${right} ${yBase}`;
      pts.push({ x: left, y: yTop + 26, g: groupOffset });
      pts.push({ x: cx - 12, y: yTop + 8, g: groupOffset });
      pts.push({ x: cx, y: yTop, g: groupOffset });
      pts.push({ x: right - 6, y: yTop + 12, g: groupOffset });
      pts.push({ x: right, y: yTop + 34, g: groupOffset });
      pts.push({ x: right - 8, y: yTop + 56, g: groupOffset });
      pts.push({ x: cx, y: yTop + 76, g: groupOffset });
      pts.push({ x: left + 8, y: yBase - 10, g: groupOffset });
      pts.push({ x: left, y: yBase, g: groupOffset });
      pts.push(...linePoints(left, yBase, right, yBase, 5, groupOffset + 1));
      return { path: p, points: pts };
    }
    case '3': {
      const p = `M ${left} ${yTop + 16} C ${left} ${yTop}, ${right} ${yTop}, ${right} ${yTop + 30} C ${right} ${mid - 4}, ${cx + 6} ${mid}, ${cx} ${mid} C ${right} ${mid}, ${right} ${yBase - 18}, ${right} ${yBase - 12} C ${right} ${yBase}, ${left} ${yBase}, ${left} ${yBase - 12}`;
      pts.push({ x: left, y: yTop + 16, g: groupOffset });
      pts.push({ x: cx, y: yTop, g: groupOffset });
      pts.push({ x: right, y: yTop + 30, g: groupOffset });
      pts.push({ x: cx, y: mid, g: groupOffset });
      pts.push({ x: right, y: yBase - 26, g: groupOffset + 1 });
      pts.push({ x: cx, y: yBase, g: groupOffset + 1 });
      pts.push({ x: left, y: yBase - 12, g: groupOffset + 1 });
      return { path: p, points: pts };
    }
    case '4': {
      const stemX = right - 12;
      const barY = yTop + 68;
      const p = `M ${cx} ${yTop} L ${left} ${barY} L ${right} ${barY} M ${stemX} ${yTop + 8} L ${stemX} ${yBase}`;
      pts.push(...linePoints(cx, yTop, left, barY, 5, groupOffset));
      pts.push(...linePoints(left, barY, right, barY, 4, groupOffset));
      pts.push(...linePoints(stemX, yTop + 8, stemX, yBase, 6, groupOffset + 1));
      return { path: p, points: pts };
    }
    case '5': {
      const p = `M ${right} ${yTop} L ${left + 6} ${yTop} L ${left + 4} ${yTop + 46} C ${left + 10} ${yTop + 42}, ${right} ${yTop + 42}, ${right} ${yTop + 70} C ${right} ${yBase - 2}, ${left + 6} ${yBase}, ${left} ${yBase - 10}`;
      pts.push(...linePoints(right, yTop, left + 6, yTop, 3, groupOffset));
      pts.push(...linePoints(left + 6, yTop, left + 4, yTop + 46, 3, groupOffset));
      pts.push({ x: cx, y: yTop + 44, g: groupOffset + 1 });
      pts.push({ x: right, y: yTop + 68, g: groupOffset + 1 });
      pts.push({ x: cx, y: yBase, g: groupOffset + 1 });
      pts.push({ x: left, y: yBase - 10, g: groupOffset + 1 });
      return { path: p, points: pts };
    }
    case '6': {
      const p = `M ${right - 4} ${yTop + 12} C ${left} ${yTop + 14}, ${left} ${yTop + 72}, ${left} ${yTop + 80} C ${left} ${yBase}, ${right} ${yBase}, ${right} ${yTop + 74} C ${right} ${yTop + 50}, ${left} ${yTop + 50}, ${left} ${yTop + 74}`;
      pts.push({ x: right - 4, y: yTop + 12, g: groupOffset });
      pts.push({ x: left + 6, y: yTop + 32, g: groupOffset });
      pts.push({ x: left, y: yTop + 58, g: groupOffset });
      pts.push({ x: left, y: yTop + 80, g: groupOffset });
      pts.push({ x: cx, y: yBase, g: groupOffset + 1 });
      pts.push({ x: right, y: yTop + 74, g: groupOffset + 1 });
      pts.push({ x: cx, y: yTop + 52, g: groupOffset + 1 });
      pts.push({ x: left, y: yTop + 74, g: groupOffset + 1 });
      return { path: p, points: pts };
    }
    case '7': {
      const p = `M ${left} ${yTop} L ${right} ${yTop} L ${left + 10} ${yBase}`;
      pts.push(...linePoints(left, yTop, right, yTop, 4, groupOffset));
      pts.push(...linePoints(right, yTop, left + 10, yBase, 7, groupOffset + 1));
      return { path: p, points: pts };
    }
    case '8': {
      const p = `M ${cx} ${mid} C ${left} ${mid}, ${left} ${yTop}, ${cx} ${yTop} C ${right} ${yTop}, ${right} ${mid}, ${cx} ${mid} C ${left} ${mid}, ${left} ${yBase}, ${cx} ${yBase} C ${right} ${yBase}, ${right} ${mid}, ${cx} ${mid}`;
      pts.push({ x: cx, y: mid, g: groupOffset });
      pts.push({ x: left + 4, y: yTop + 24, g: groupOffset });
      pts.push({ x: cx, y: yTop, g: groupOffset });
      pts.push({ x: right - 4, y: yTop + 24, g: groupOffset });
      pts.push({ x: cx, y: mid, g: groupOffset });
      pts.push({ x: left + 2, y: yBase - 24, g: groupOffset + 1 });
      pts.push({ x: cx, y: yBase, g: groupOffset + 1 });
      pts.push({ x: right - 2, y: yBase - 24, g: groupOffset + 1 });
      return { path: p, points: pts };
    }
    case '9': {
      const p = `M ${right} ${yTop + 30} C ${right} ${yTop + 6}, ${left} ${yTop + 6}, ${left} ${yTop + 30} C ${left} ${yTop + 56}, ${right} ${yTop + 56}, ${right} ${yTop + 30} L ${right} ${yBase - 12} C ${right} ${yBase}, ${left + 4} ${yBase}, ${left} ${yBase - 12}`;
      pts.push({ x: right, y: yTop + 30, g: groupOffset });
      pts.push({ x: cx, y: yTop + 6, g: groupOffset });
      pts.push({ x: left, y: yTop + 30, g: groupOffset });
      pts.push({ x: cx, y: yTop + 54, g: groupOffset });
      pts.push({ x: right, y: yTop + 30, g: groupOffset });
      pts.push(...linePoints(right, yTop + 36, right, yBase - 12, 4, groupOffset + 1));
      pts.push({ x: cx, y: yBase, g: groupOffset + 1 });
      pts.push({ x: left, y: yBase - 12, g: groupOffset + 1 });
      return { path: p, points: pts };
    }
    case '0':
    default: {
      const rx = w / 2;
      const ry = (yBase - yTop) / 2;
      const cy = (yBase + yTop) / 2;
      const p = `M ${cx} ${yTop} C ${left} ${yTop}, ${left} ${yBase}, ${cx} ${yBase} C ${right} ${yBase}, ${right} ${yTop}, ${cx} ${yTop} Z`;
      pts.push(...ellipsePoints(cx, cy, rx, ry, 9, groupOffset));
      return { path: p, points: pts };
    }
  }
}

/** Complete A-Z Capital Alphabet + Hyphen '-' with generous letter proportions */
export function getCapitalLetterData(
  char: string,
  cx: number,
  w: number,
  group: number,
  yTop = Y_TOP_1,
  yBase = Y_BASE_1
): { path: string; points: Point[] } {
  const c = char.toUpperCase();
  const left = cx - w / 2;
  const right = cx + w / 2;
  const mid = (yTop + yBase) / 2;
  const pts: Point[] = [];
  let path = '';

  switch (c) {
    case '-':
      path = `M ${left + 4} ${mid} L ${right - 4} ${mid}`;
      pts.push(...linePoints(left + 4, mid, right - 4, mid, 3, group));
      break;
    case 'A':
      path = `M ${left} ${yBase} L ${cx} ${yTop} L ${right} ${yBase} M ${left + w * 0.22} ${mid + 8} L ${right - w * 0.22} ${mid + 8}`;
      pts.push(...linePoints(left, yBase, cx, yTop, 5, group));
      pts.push(...linePoints(cx, yTop, right, yBase, 5, group));
      pts.push(...linePoints(left + w * 0.22, mid + 8, right - w * 0.22, mid + 8, 3, group + 1));
      break;
    case 'B':
      path = `M ${left} ${yTop} L ${left} ${yBase} M ${left} ${yTop} C ${right} ${yTop}, ${right} ${mid}, ${left} ${mid} C ${right + 2} ${mid}, ${right + 2} ${yBase}, ${left} ${yBase}`;
      pts.push(...linePoints(left, yTop, left, yBase, 5, group));
      pts.push(...ellipsePoints(cx, (yTop + mid) / 2, w / 2, (mid - yTop) / 2, 4, group + 1));
      pts.push(...ellipsePoints(cx, (mid + yBase) / 2, w / 2, (yBase - mid) / 2, 4, group + 1));
      break;
    case 'C':
      path = `M ${right} ${yTop + 18} C ${right} ${yTop}, ${left} ${yTop}, ${left} ${mid} C ${left} ${yBase}, ${right} ${yBase}, ${right} ${yBase - 16}`;
      pts.push({ x: right, y: yTop + 18, g: group });
      pts.push({ x: cx, y: yTop, g: group });
      pts.push({ x: left, y: mid, g: group });
      pts.push({ x: cx, y: yBase, g: group });
      pts.push({ x: right, y: yBase - 16, g: group });
      break;
    case 'D':
      path = `M ${left} ${yTop} L ${left} ${yBase} M ${left} ${yTop} C ${right + 3} ${yTop}, ${right + 3} ${yBase}, ${left} ${yBase}`;
      pts.push(...linePoints(left, yTop, left, yBase, 5, group));
      pts.push(...ellipsePoints(cx, mid, w / 2, (yBase - yTop) / 2, 6, group + 1));
      break;
    case 'E':
      path = `M ${left} ${yTop} L ${left} ${yBase} M ${left} ${yTop} L ${right} ${yTop} M ${left} ${mid} L ${right - 6} ${mid} M ${left} ${yBase} L ${right} ${yBase}`;
      pts.push(...linePoints(left, yTop, left, yBase, 5, group));
      pts.push(...linePoints(left, yTop, right, yTop, 3, group));
      pts.push(...linePoints(left, mid, right - 6, mid, 2, group));
      pts.push(...linePoints(left, yBase, right, yBase, 3, group));
      break;
    case 'F':
      path = `M ${left} ${yTop} L ${left} ${yBase} M ${left} ${yTop} L ${right} ${yTop} M ${left} ${mid} L ${right - 6} ${mid}`;
      pts.push(...linePoints(left, yTop, left, yBase, 5, group));
      pts.push(...linePoints(left, yTop, right, yTop, 3, group));
      pts.push(...linePoints(left, mid, right - 6, mid, 2, group));
      break;
    case 'G':
      path = `M ${right} ${yTop + 18} C ${right} ${yTop}, ${left} ${yTop}, ${left} ${mid} C ${left} ${yBase}, ${right} ${yBase}, ${right} ${mid} L ${cx} ${mid}`;
      pts.push({ x: right, y: yTop + 18, g: group });
      pts.push({ x: cx, y: yTop, g: group });
      pts.push({ x: left, y: mid, g: group });
      pts.push({ x: cx, y: yBase, g: group });
      pts.push(...linePoints(right, yBase, right, mid, 3, group + 1));
      pts.push(...linePoints(right, mid, cx, mid, 2, group + 1));
      break;
    case 'H':
      path = `M ${left} ${yTop} L ${left} ${yBase} M ${right} ${yTop} L ${right} ${yBase} M ${left} ${mid} L ${right} ${mid}`;
      pts.push(...linePoints(left, yTop, left, yBase, 5, group));
      pts.push(...linePoints(right, yTop, right, yBase, 5, group));
      pts.push(...linePoints(left, mid, right, mid, 3, group + 1));
      break;
    case 'I':
      path = `M ${cx} ${yTop} L ${cx} ${yBase} M ${left + 4} ${yTop} L ${right - 4} ${yTop} M ${left + 4} ${yBase} L ${right - 4} ${yBase}`;
      pts.push(...linePoints(cx, yTop, cx, yBase, 6, group));
      pts.push(...linePoints(left + 4, yTop, right - 4, yTop, 2, group));
      pts.push(...linePoints(left + 4, yBase, right - 4, yBase, 2, group));
      break;
    case 'J':
      path = `M ${right} ${yTop} L ${right} ${yBase - 18} C ${right} ${yBase}, ${left} ${yBase}, ${left} ${yBase - 18}`;
      pts.push(...linePoints(right, yTop, right, yBase - 18, 5, group));
      pts.push({ x: cx, y: yBase, g: group });
      pts.push({ x: left, y: yBase - 18, g: group });
      break;
    case 'K':
      path = `M ${left} ${yTop} L ${left} ${yBase} M ${right} ${yTop} L ${left} ${mid} L ${right} ${yBase}`;
      pts.push(...linePoints(left, yTop, left, yBase, 5, group));
      pts.push(...linePoints(right, yTop, left, mid, 4, group + 1));
      pts.push(...linePoints(left, mid, right, yBase, 4, group + 1));
      break;
    case 'L':
      path = `M ${left} ${yTop} L ${left} ${yBase} L ${right} ${yBase}`;
      pts.push(...linePoints(left, yTop, left, yBase, 5, group));
      pts.push(...linePoints(left, yBase, right, yBase, 4, group + 1));
      break;
    case 'M':
      path = `M ${left} ${yBase} L ${left} ${yTop} L ${cx} ${mid + 8} L ${right} ${yTop} L ${right} ${yBase}`;
      pts.push(...linePoints(left, yBase, left, yTop, 5, group));
      pts.push(...linePoints(left, yTop, cx, mid + 8, 4, group));
      pts.push(...linePoints(cx, mid + 8, right, yTop, 4, group));
      pts.push(...linePoints(right, yTop, right, yBase, 5, group));
      break;
    case 'N':
      path = `M ${left} ${yBase} L ${left} ${yTop} L ${right} ${yBase} L ${right} ${yTop}`;
      pts.push(...linePoints(left, yBase, left, yTop, 5, group));
      pts.push(...linePoints(left, yTop, right, yBase, 5, group));
      pts.push(...linePoints(right, yBase, right, yTop, 5, group));
      break;
    case 'O':
      path = `M ${cx} ${yTop} C ${left} ${yTop}, ${left} ${yBase}, ${cx} ${yBase} C ${right} ${yBase}, ${right} ${yTop}, ${cx} ${yTop} Z`;
      pts.push(...ellipsePoints(cx, mid, w / 2, (yBase - yTop) / 2, 8, group));
      break;
    case 'P':
      path = `M ${left} ${yTop} L ${left} ${yBase} M ${left} ${yTop} C ${right + 2} ${yTop}, ${right + 2} ${mid}, ${left} ${mid}`;
      pts.push(...linePoints(left, yTop, left, yBase, 5, group));
      pts.push(...ellipsePoints(cx, (yTop + mid) / 2, w / 2, (mid - yTop) / 2, 5, group + 1));
      break;
    case 'Q':
      path = `M ${cx} ${yTop} C ${left} ${yTop}, ${left} ${yBase}, ${cx} ${yBase} C ${right} ${yBase}, ${right} ${yTop}, ${cx} ${yTop} Z M ${cx} ${yBase - 18} L ${right + 4} ${yBase}`;
      pts.push(...ellipsePoints(cx, mid, w / 2, (yBase - yTop) / 2, 8, group));
      pts.push(...linePoints(cx, yBase - 18, right + 4, yBase, 3, group + 1));
      break;
    case 'R':
      path = `M ${left} ${yTop} L ${left} ${yBase} M ${left} ${yTop} C ${right + 3} ${yTop}, ${right + 3} ${mid}, ${left} ${mid} L ${right} ${yBase}`;
      pts.push(...linePoints(left, yTop, left, yBase, 5, group));
      pts.push(...ellipsePoints(cx, (yTop + mid) / 2, w / 2, (mid - yTop) / 2, 4, group + 1));
      pts.push(...linePoints(left, mid, right, yBase, 4, group + 1));
      break;
    case 'S':
      path = `M ${right} ${yTop + 18} C ${right} ${yTop}, ${left} ${yTop}, ${left} ${yTop + 30} C ${left} ${mid}, ${right} ${mid}, ${right} ${yBase - 28} C ${right} ${yBase}, ${left} ${yBase}, ${left} ${yBase - 16}`;
      pts.push({ x: right, y: yTop + 18, g: group });
      pts.push({ x: cx, y: yTop, g: group });
      pts.push({ x: left, y: yTop + 30, g: group });
      pts.push({ x: cx, y: mid, g: group });
      pts.push({ x: right, y: yBase - 28, g: group });
      pts.push({ x: cx, y: yBase, g: group });
      pts.push({ x: left, y: yBase - 16, g: group });
      break;
    case 'T':
      path = `M ${left} ${yTop} L ${right} ${yTop} M ${cx} ${yTop} L ${cx} ${yBase}`;
      pts.push(...linePoints(left, yTop, right, yTop, 4, group));
      pts.push(...linePoints(cx, yTop, cx, yBase, 6, group));
      break;
    case 'U':
      path = `M ${left} ${yTop} L ${left} ${yBase - 18} C ${left} ${yBase}, ${right} ${yBase}, ${right} ${yBase - 18} L ${right} ${yTop}`;
      pts.push(...linePoints(left, yTop, left, yBase - 18, 4, group));
      pts.push({ x: cx, y: yBase, g: group });
      pts.push(...linePoints(right, yBase - 18, right, yTop, 4, group));
      break;
    case 'V':
      path = `M ${left} ${yTop} L ${cx} ${yBase} L ${right} ${yTop}`;
      pts.push(...linePoints(left, yTop, cx, yBase, 5, group));
      pts.push(...linePoints(cx, yBase, right, yTop, 5, group));
      break;
    case 'W':
      path = `M ${left} ${yTop} L ${left + w * 0.28} ${yBase} L ${cx} ${yTop + 24} L ${right - w * 0.28} ${yBase} L ${right} ${yTop}`;
      pts.push(...linePoints(left, yTop, left + w * 0.28, yBase, 4, group));
      pts.push(...linePoints(left + w * 0.28, yBase, cx, yTop + 24, 3, group));
      pts.push(...linePoints(cx, yTop + 24, right - w * 0.28, yBase, 3, group));
      pts.push(...linePoints(right - w * 0.28, yBase, right, yTop, 4, group));
      break;
    case 'X':
      path = `M ${left} ${yTop} L ${right} ${yBase} M ${right} ${yTop} L ${left} ${yBase}`;
      pts.push(...linePoints(left, yTop, right, yBase, 5, group));
      pts.push(...linePoints(right, yTop, left, yBase, 5, group + 1));
      break;
    case 'Y':
      path = `M ${left} ${yTop} L ${cx} ${mid} L ${right} ${yTop} M ${cx} ${mid} L ${cx} ${yBase}`;
      pts.push(...linePoints(left, yTop, cx, mid, 4, group));
      pts.push(...linePoints(right, yTop, cx, mid, 4, group));
      pts.push(...linePoints(cx, mid, cx, yBase, 5, group + 1));
      break;
    case 'Z':
      path = `M ${left} ${yTop} L ${right} ${yTop} L ${left} ${yBase} L ${right} ${yBase}`;
      pts.push(...linePoints(left, yTop, right, yTop, 4, group));
      pts.push(...linePoints(right, yTop, left, yBase, 5, group + 1));
      pts.push(...linePoints(left, yBase, right, yBase, 4, group + 1));
      break;
    default:
      path = `M ${left} ${yTop} L ${left} ${yBase} L ${right} ${yBase} L ${right} ${yTop} Z`;
      pts.push(...linePoints(left, yTop, left, yBase, 4, group));
      pts.push(...linePoints(right, yBase, right, yTop, 4, group));
  }

  return { path, points: pts };
}

/**
 * Universal Word Geometry:
 * - EXTRA SPACIOUS letter width (48px) and generous letter gap (28px)!
 * - Letters never touch each other!
 * - Single word: renders on 1 clean handwriting line.
 * - Compound word (e.g. "FORTY-SIX", "ONE-HUNDRED"): renders on TWO spacious lines!
 * Always returns a pure SVG path 'd' string (no raw HTML tags!).
 */
export function getWordGeometry(word: string, minWidth = 360): {
  path: string;
  points: Point[];
  widthNeeded: number;
  heightNeeded: number;
} {
  const cleanWord = word.toUpperCase().replace(/\s+/g, '-');
  const parts = cleanWord.split('-').filter(Boolean);

  const charWidth = 46;
  const gap = 28; // GENEROUS GAP: 28px center-to-center clearance!

  // SINGLE WORD (e.g. "ONE", "TWO", "TWELVE", "SIXTY")
  if (parts.length <= 1) {
    const chars = cleanWord.split('');
    const count = chars.length;
    const blockWidth = count * charWidth + (count - 1) * gap;
    const widthNeeded = Math.max(minWidth, blockWidth + 60);
    const startX = (widthNeeded - blockWidth) / 2 + charWidth / 2;

    let combinedPath = '';
    const combinedPoints: Point[] = [];

    chars.forEach((char, i) => {
      const cx = startX + i * (charWidth + gap);
      const { path, points } = getCapitalLetterData(char, cx, char === '-' ? 20 : charWidth, (i + 1) * 2, Y_TOP_1, Y_BASE_1);
      combinedPath += (combinedPath ? ' ' : '') + path;
      combinedPoints.push(...points);
    });

    return { path: combinedPath, points: combinedPoints, widthNeeded, heightNeeded: 190 };
  }

  // TWO WORDS ON TWO SPACIOUS LINES (e.g. "FORTY" on line 1, "SIX" on line 2)
  const word1 = parts[0];
  const word2 = parts.slice(1).join('-');

  const chars1 = word1.split('');
  const chars2 = word2.split('');

  const w1Block = chars1.length * charWidth + (chars1.length - 1) * gap;
  const w2Block = chars2.length * charWidth + (chars2.length - 1) * gap;

  const widthNeeded = Math.max(minWidth, Math.max(w1Block, w2Block) + 70);

  const startX1 = (widthNeeded - w1Block) / 2 + charWidth / 2;
  const startX2 = (widthNeeded - w2Block) / 2 + charWidth / 2;

  let combinedPath = '';
  const combinedPoints: Point[] = [];

  // Line 1
  chars1.forEach((char, i) => {
    const cx = startX1 + i * (charWidth + gap);
    const { path, points } = getCapitalLetterData(char, cx, charWidth, (i + 1) * 2, Y_TOP_1, Y_BASE_1);
    combinedPath += (combinedPath ? ' ' : '') + path;
    combinedPoints.push(...points);
  });

  // Line 2
  chars2.forEach((char, i) => {
    const cx = startX2 + i * (charWidth + gap);
    const { path, points } = getCapitalLetterData(char, cx, charWidth, (chars1.length + i + 1) * 2, Y_TOP_2, Y_BASE_2);
    combinedPath += (combinedPath ? ' ' : '') + path;
    combinedPoints.push(...points);
  });

  return { path: combinedPath, points: combinedPoints, widthNeeded, heightNeeded: 330 };
}

/** Multi-digit sequence e.g. "46", "100" with generous spacing */
export function getNumberSequenceData(numStr: string, totalWidth = 300): { path: string; points: Point[] } {
  const digits = numStr.split('');
  const count = digits.length;

  let digitWidth = 56;
  let gap = 26;

  if (count === 3) {
    digitWidth = 48;
    gap = 20;
  } else if (count === 2) {
    digitWidth = 56;
    gap = 26;
  } else {
    digitWidth = 64;
  }

  const blockWidth = count * digitWidth + (count - 1) * gap;
  const widthNeeded = Math.max(totalWidth, blockWidth + 60);
  const startX = (widthNeeded - blockWidth) / 2 + digitWidth / 2;

  let combinedPath = '';
  const combinedPoints: Point[] = [];

  digits.forEach((d, i) => {
    const cx = startX + i * (digitWidth + gap);
    const { path, points } = getDigitData(d, cx, digitWidth, (i + 1) * 3);
    combinedPath += (combinedPath ? ' ' : '') + path;
    combinedPoints.push(...points);
  });

  return { path: combinedPath, points: combinedPoints };
}
