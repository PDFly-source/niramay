// lib/db.ts - 100% Client-Side IndexedDB Storage Layer
// Caches full remedy database, 50+ plant species, and stores private Aita's Diha journal entries

export interface JournalEntry {
  id: string;
  title: string;
  contributor: string; // e.g., "Aita (Grandmother)", "Boruah Maam", "Self"
  content: string;
  category: string;
  createdAt: number;
  hasAudio: boolean;
  audioBlob?: Blob;
  audioMimeType?: string;
  tags: string[];
}

const DB_NAME = "niramay_offline_db";
const DB_VERSION = 1;

class NiramayDB {
  private dbPromise: Promise<IDBDatabase> | null = null;

  private getDB(): Promise<IDBDatabase> {
    if (typeof window === "undefined") {
      return Promise.reject(new Error("IndexedDB is only available in browser"));
    }

    if (!this.dbPromise) {
      this.dbPromise = new Promise((resolve, reject) => {
        const request = window.indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
          const db = (event.target as IDBOpenDBRequest).result;

          // Store for offline cached remedies
          if (!db.objectStoreNames.contains("remedies")) {
            db.createObjectStore("remedies", { keyPath: "id" });
          }

          // Store for offline cached plant library (50+ species)
          if (!db.objectStoreNames.contains("plants")) {
            db.createObjectStore("plants", { keyPath: "id" });
          }

          // Store for Aita's Diha personal wisdom journal
          if (!db.objectStoreNames.contains("journal")) {
            const journalStore = db.createObjectStore("journal", { keyPath: "id" });
            journalStore.createIndex("createdAt", "createdAt", { unique: false });
          }

          // Store for metadata flags
          if (!db.objectStoreNames.contains("meta")) {
            db.createObjectStore("meta", { keyPath: "key" });
          }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    }

    return this.dbPromise;
  }

  // Prepopulate / Cache remedies and plants into IndexedDB for offline instant read
  async cacheCatalog(remedies: any[], plants: any[]): Promise<boolean> {
    try {
      const db = await this.getDB();
      const tx = db.transaction(["remedies", "plants", "meta"], "readwrite");

      const remedyStore = tx.objectStore("remedies");
      for (const remedy of remedies) {
        remedyStore.put(remedy);
      }

      const plantStore = tx.objectStore("plants");
      for (const plant of plants) {
        plantStore.put(plant);
      }

      const metaStore = tx.objectStore("meta");
      metaStore.put({ key: "lastCatalogCachedAt", value: Date.now() });

      return new Promise((resolve, reject) => {
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject(tx.error);
      });
    } catch (err) {
      console.warn("IndexedDB caching error:", err);
      return false;
    }
  }

  // Check if offline catalog has been cached
  async isCatalogCached(): Promise<boolean> {
    try {
      const db = await this.getDB();
      const tx = db.transaction("meta", "readonly");
      const store = tx.objectStore("meta");
      const req = store.get("lastCatalogCachedAt");
      return new Promise((resolve) => {
        req.onsuccess = () => resolve(Boolean(req.result));
        req.onerror = () => resolve(false);
      });
    } catch {
      return false;
    }
  }

  // Journal (Aita's Diha) operations
  async saveJournalEntry(entry: JournalEntry): Promise<boolean> {
    try {
      const db = await this.getDB();
      const tx = db.transaction("journal", "readwrite");
      const store = tx.objectStore("journal");
      store.put(entry);
      return new Promise((resolve, reject) => {
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject(tx.error);
      });
    } catch (err) {
      console.error("Failed to save journal entry:", err);
      return false;
    }
  }

  async getAllJournalEntries(): Promise<JournalEntry[]> {
    try {
      const db = await this.getDB();
      const tx = db.transaction("journal", "readonly");
      const store = tx.objectStore("journal");
      const req = store.getAll();
      return new Promise((resolve, reject) => {
        req.onsuccess = () => {
          const list = req.result as JournalEntry[];
          list.sort((a, b) => b.createdAt - a.createdAt);
          resolve(list);
        };
        req.onerror = () => reject(req.error);
      });
    } catch (err) {
      console.warn("Failed to load journal entries:", err);
      return [];
    }
  }

  async deleteJournalEntry(id: string): Promise<boolean> {
    try {
      const db = await this.getDB();
      const tx = db.transaction("journal", "readwrite");
      const store = tx.objectStore("journal");
      store.delete(id);
      return new Promise((resolve, reject) => {
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject(tx.error);
      });
    } catch (err) {
      console.error("Failed to delete journal entry:", err);
      return false;
    }
  }
}

export const niramayDB = new NiramayDB();
