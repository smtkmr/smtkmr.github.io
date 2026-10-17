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

function writeRecords(records: any[]) {
  try {
    // Keep the fresh 50 entries
    const trimmed = records.slice(0, 50);
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

  // API Route: Get all persistent saved records (latest up to 50)
  app.get('/api/records', (req, res) => {
    const records = readRecords();
    res.json({
      success: true,
      count: records.length,
      records: records,
    });
  });

  // API Route: Save or append session entry
  app.post('/api/records', (req, res) => {
    const newEntry = req.body;
    if (!newEntry || !newEntry.name) {
      return res.status(400).json({ success: false, message: 'Name and session details are required' });
    }

    const records = readRecords();
    
    // Check if entry already exists (by unique sessionId)
    const existingIndex = records.findIndex(r => r.id === newEntry.id);
    if (existingIndex >= 0) {
      records[existingIndex] = {
        ...records[existingIndex],
        ...newEntry,
        updatedAt: new Date().toISOString()
      };
    } else {
      // Add fresh entry to beginning
      records.unshift({
        ...newEntry,
        id: newEntry.id || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: newEntry.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }

    writeRecords(records);

    res.json({
      success: true,
      message: 'Record saved permanently',
      records: readRecords()
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
