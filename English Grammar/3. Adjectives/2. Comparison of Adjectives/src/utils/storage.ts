import { SessionRecord } from '../types';

const LOCAL_STORAGE_KEY = 'econova_adjectives_session_records_v1';
const MAX_RECORDS = 50;

// Format current time into readable 12-hour AM/PM with seconds
export function formatTimeWithSeconds(date: Date = new Date()): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
}

// Format detailed Prepare Index Time with day, date, and exact seconds
export function formatPrepareIndexTime(date: Date = new Date()): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  };
  return date.toLocaleString('en-US', options);
}

// Convert seconds into human-readable format e.g. "04m 23s"
export function formatDuration(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}s`;
  }
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

// Get standard day name
export function getStandardDayName(date: Date = new Date()): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return `${days[date.getDay()]} (${date.toLocaleDateString('en-GB')})`;
}

export const DEFAULT_PERSISTENT_RECORDS: SessionRecord[] = [
  {
    id: "session_1792214391669_zzgu3n",
    name: "sumit kumar",
    day: "Saturday (17/10/2026)",
    entryTime: "10:49:51 AM",
    prepareIndexTime: "Sat, Oct 17, 2026, 10:49:51 AM",
    prepareIndexTimestamp: 1792214391520,
    screenTimeSeconds: 32,
    screenTimeFormatted: "32s",
    firstAttemptTotal: 0,
    firstAttemptCorrect: 0,
    firstAttemptWrong: 0,
    accuracy: 0,
    sessionStatus: "screen_switched_closed",
    createdAt: "2026-10-17T05:19:51.669Z",
    updatedAt: "2026-10-17T05:20:28.105Z",
    exitTime: "10:50:24 AM",
    exitTrigger: "screen_switch",
    exitTriggerReason: "Screen or window switched (Window blur / switched out)"
  },
  {
    id: "session_1792214378908_glcar9",
    name: "sumit kumar",
    day: "Saturday (17/10/2026)",
    entryTime: "10:49:38 AM",
    prepareIndexTime: "Sat, Oct 17, 2026, 10:49:38 AM",
    prepareIndexTimestamp: 1792214378625,
    screenTimeSeconds: 2,
    screenTimeFormatted: "2s",
    firstAttemptTotal: 0,
    firstAttemptCorrect: 0,
    firstAttemptWrong: 0,
    accuracy: 0,
    sessionStatus: "screen_switched_closed",
    createdAt: "2026-10-17T05:19:38.909Z",
    updatedAt: "2026-10-17T05:19:45.182Z",
    exitTime: "10:49:41 AM",
    exitTrigger: "screen_switch",
    exitTriggerReason: "Screen or window switched (Window blur / switched out)"
  },
  {
    id: "session_1792213893975_uknmux",
    name: "sumit kumar",
    day: "Saturday (17/10/2026)",
    entryTime: "10:41:33 AM",
    prepareIndexTime: "Sat, Oct 17, 2026, 10:41:33 AM",
    prepareIndexTimestamp: 1792213893212,
    screenTimeSeconds: 70,
    screenTimeFormatted: "1m 10s",
    firstAttemptTotal: 2,
    firstAttemptCorrect: 0,
    firstAttemptWrong: 2,
    accuracy: 0,
    sessionStatus: "screen_switched_closed",
    createdAt: "2026-10-17T05:11:33.975Z",
    updatedAt: "2026-10-17T05:12:50.474Z",
    exitTime: "10:42:46 AM",
    exitTrigger: "screen_switch",
    exitTriggerReason: "Screen or window switch detected (Window blur / switched out)"
  }
];

export function getRecordTimestamp(r: any): number {
  if (!r) return 0;
  if (typeof r.prepareIndexTimestamp === 'number' && !isNaN(r.prepareIndexTimestamp)) {
    return r.prepareIndexTimestamp;
  }
  if (r.createdAt) {
    const t = new Date(r.createdAt).getTime();
    if (!isNaN(t)) return t;
  }
  if (r.updatedAt) {
    const t = new Date(r.updatedAt).getTime();
    if (!isNaN(t)) return t;
  }
  if (r.id && typeof r.id === 'string') {
    const match = r.id.match(/session_(\d+)/);
    if (match) return parseInt(match[1], 10);
  }
  return 0;
}

export function mergeRecords(listA: SessionRecord[], listB: SessionRecord[]): SessionRecord[] {
  const map = new Map<string, SessionRecord>();
  [...listA, ...listB].forEach(rec => {
    if (!rec || !rec.id) return;
    const existing = map.get(rec.id);
    if (!existing) {
      map.set(rec.id, rec);
    } else {
      const recTime = getRecordTimestamp(rec);
      const existTime = getRecordTimestamp(existing);
      if (recTime >= existTime) {
        map.set(rec.id, { ...existing, ...rec });
      }
    }
  });

  return Array.from(map.values())
    .sort((a, b) => getRecordTimestamp(b) - getRecordTimestamp(a))
    .slice(0, MAX_RECORDS);
}

// Read from LocalStorage fallback
export function getLocalRecords(): SessionRecord[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return mergeRecords(DEFAULT_PERSISTENT_RECORDS, parsed);
      }
    }
    // New device: seed with default records
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_PERSISTENT_RECORDS));
    return DEFAULT_PERSISTENT_RECORDS;
  } catch (err) {
    return DEFAULT_PERSISTENT_RECORDS;
  }
}

// Save to LocalStorage fallback
export function saveLocalRecords(records: SessionRecord[]) {
  try {
    const sorted = [...records].sort((a, b) => getRecordTimestamp(b) - getRecordTimestamp(a)).slice(0, MAX_RECORDS);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sorted));
  } catch (err) {
    console.error('Failed saving to localStorage:', err);
  }
}

// Fetch all saved records (syncs from API, merges with LocalStorage)
export async function fetchAllRecords(): Promise<SessionRecord[]> {
  let serverRecords: SessionRecord[] = [];
  try {
    const res = await fetch('/api/records', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.records)) {
        serverRecords = data.records;
      }
    }
  } catch (err) {
    console.warn('Backend API unavailable, using local records:', err);
  }

  const localRecords = getLocalRecords();
  const merged = mergeRecords(localRecords, serverRecords);
  saveLocalRecords(merged);
  return merged;
}

// Save or update a single session record permanently
export async function persistSessionRecord(record: SessionRecord): Promise<SessionRecord[]> {
  const local = getLocalRecords();
  const updatedList = mergeRecords(local, [record]);
  saveLocalRecords(updatedList);

  // Send to server API
  try {
    const res = await fetch('/api/records', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedList),
    });
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.records)) {
        const fullyMerged = mergeRecords(updatedList, data.records);
        saveLocalRecords(fullyMerged);
        return fullyMerged;
      }
    }
  } catch (err) {
    console.warn('Could not post record to backend, saved to localStorage only:', err);
  }

  return updatedList;
}
