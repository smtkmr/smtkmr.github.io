import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const RECORDS_FILE = path.join(DATA_DIR, 'session_records.json');

// Ensure storage directory and file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(RECORDS_FILE)) {
  fs.writeFileSync(RECORDS_FILE, JSON.stringify([], null, 2), 'utf-8');
}

function readRecords() {
  try {
    if (!fs.existsSync(RECORDS_FILE)) return [];
    const content = fs.readFileSync(RECORDS_FILE, 'utf-8');
    const parsed = JSON.parse(content);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Error reading records file:', err);
    return [];
  }
}

function getRecordTimestamp(r: any): number {
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

function writeRecords(records: any[]) {
  try {
    // Keep the fresh 50 entries sorted chronologically
    const sorted = [...records].sort((a, b) => getRecordTimestamp(b) - getRecordTimestamp(a));
    const trimmed = sorted.slice(0, 50);
    fs.writeFileSync(RECORDS_FILE, JSON.stringify(trimmed, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing records file:', err);
    return false;
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Enable CORS & disable caching so all devices always get real-time data
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  // API Route: Get all persistent saved records (latest up to 50)
  app.get('/api/records', (req, res) => {
    const records = readRecords();
    const sorted = [...records].sort((a, b) => getRecordTimestamp(b) - getRecordTimestamp(a)).slice(0, 50);
    res.json({
      success: true,
      count: sorted.length,
      records: sorted,
    });
  });

  // API Route: Save, append or merge session entries across devices
  app.post('/api/records', (req, res) => {
    const payload = req.body;
    if (!payload) {
      return res.status(400).json({ success: false, message: 'Payload is required' });
    }

    const currentRecords = readRecords();
    const map = new Map<string, any>();
    
    // Existing disk records
    currentRecords.forEach(r => {
      if (r && r.id) map.set(r.id, r);
    });

    const entriesToProcess = Array.isArray(payload) ? payload : [payload];

    for (const newEntry of entriesToProcess) {
      if (!newEntry || !newEntry.name) continue;
      const entryId = newEntry.id || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const existing = map.get(entryId);

      if (existing) {
        map.set(entryId, {
          ...existing,
          ...newEntry,
          updatedAt: new Date().toISOString()
        });
      } else {
        map.set(entryId, {
          ...newEntry,
          id: entryId,
          createdAt: newEntry.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
    }

    // Sort by timestamp descending and keep top 50
    const mergedList = Array.from(map.values())
      .sort((a, b) => getRecordTimestamp(b) - getRecordTimestamp(a))
      .slice(0, 50);

    writeRecords(mergedList);

    res.json({
      success: true,
      message: 'Records permanently saved and merged',
      records: mergedList
    });
  });

  // API Route: System status and prepare index check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      recordsStored: readRecords().length,
      timestamp: new Date().toISOString(),
      serverPrepareIndexTime: new Date().toLocaleString('hi-IN', { timeZone: 'Asia/Kolkata' })
    });
  });

  // Vite middleware in development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
