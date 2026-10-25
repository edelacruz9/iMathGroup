// Per-device settings in IndexedDB. Keys never leave this browser except to the agent's own
// AI provider and own MLS proxy. Falls back to memory when storage is blocked (private windows).
const DB = "imath-studio";
const STORE = "settings";
const memory = new Map();

function open() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function tx(mode, fn) {
  const db = await open();
  return new Promise((resolve, reject) => {
    const t = db.transaction(STORE, mode);
    const req = fn(t.objectStore(STORE));
    t.oncomplete = () => resolve(req && req.result);
    t.onerror = () => reject(t.error);
  });
}

export const settings = {
  async get(key) {
    try {
      return await tx("readonly", (s) => s.get(key));
    } catch {
      return memory.get(key);
    }
  },
  async set(key, value) {
    memory.set(key, value);
    try {
      await tx("readwrite", (s) => s.put(value, key));
    } catch {}
  },
  async clear() {
    memory.clear();
    try {
      await tx("readwrite", (s) => s.clear());
    } catch {}
  },
};
