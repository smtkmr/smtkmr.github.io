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

// Read from LocalStorage fallback
export function getLocalRecords(): SessionRecord[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Failed reading localStorage records:', err);
    return [];
  }
}

// Save to LocalStorage fallback
export function saveLocalRecords(records: SessionRecord[]) {
  try {
    const trimmed = records.slice(0, MAX_RECORDS);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(trimmed));
  } catch (err) {
    console.error('Failed saving to localStorage:', err);
  }
}

// Fetch all saved records (syncs from API, merges with LocalStorage)
export async function fetchAllRecords(): Promise<SessionRecord[]> {
  let serverRecords: SessionRecord[] = [];
  try {
    const res = await fetch('/api/records');
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
  
  // Merge and deduplicate by ID, prioritizing latest updatedAt
  const map = new Map<string, SessionRecord>();
  [...serverRecords, ...localRecords].forEach((rec) => {
    if (!map.has(rec.id)) {
      map.set(rec.id, rec);
    } else {
      const existing = map.get(rec.id)!;
      const recTime = new Date(rec.updatedAt || rec.createdAt).getTime();
      const existTime = new Date(existing.updatedAt || existing.createdAt).getTime();
      if (recTime > existTime) {
        map.set(rec.id, rec);
      }
    }
  });

  const merged = Array.from(map.values())
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, MAX_RECORDS);

  // Sync back to local storage
  saveLocalRecords(merged);
  return merged;
}

// Save or update a single session record permanently
export async function persistSessionRecord(record: SessionRecord): Promise<SessionRecord[]> {
  // Update local storage immediately
  const local = getLocalRecords();
  const existingIdx = local.findIndex((r) => r.id === record.id);
  if (existingIdx >= 0) {
    local[existingIdx] = record;
  } else {
    local.unshift(record);
  }
  saveLocalRecords(local);

  // Send to server API
  try {
    const res = await fetch('/api/records', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
    });
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.records)) {
        saveLocalRecords(data.records);
        return data.records;
      }
    }
  } catch (err) {
    console.warn('Could not post record to backend, saved to localStorage only:', err);
  }

  return getLocalRecords();
}
