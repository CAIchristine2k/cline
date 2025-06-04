/**
 * Smart Storage Manager
 * 
 * Provides a unified API for storing and retrieving data using the best available storage method:
 * 1. IndexedDB - Primary storage (typically 50-250MB limit)
 * 2. localStorage - Only used as fallback when IndexedDB fails (5MB limit)
 * 3. Cloudinary - Last resort for when all local storage methods fail
 */

import { uploadCanvasToCloudinary } from './cloudinaryUpload';

// More reliable browser environment detection
const isBrowser = typeof window !== 'undefined' && 
                 typeof document !== 'undefined' && 
                 window.document === document &&
                 typeof navigator !== 'undefined';

// Get IndexedDB reference (handle vendor prefixes for older browsers)
const getIndexedDB = (): IDBFactory | undefined => {
  if (!isBrowser) return undefined;
  
  try {
    return window.indexedDB || 
           (window as any).mozIndexedDB || 
           (window as any).webkitIndexedDB || 
           (window as any).msIndexedDB;
  } catch (error) {
    console.warn('Error accessing IndexedDB:', error);
    return undefined;
  }
};

// Check if localStorage is available
const isLocalStorageAvailable = (): boolean => {
  if (!isBrowser) return false;
  
  try {
    const testKey = 'storage-test';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

// Storage type identifiers
export type StorageType = 'localStorage' | 'indexedDB' | 'cloudinary';

// Storage reference format: "storageType://key"
const STORAGE_REF_REGEX = /^(localStorage|indexedDB|cloudinary):\/\/(.+)$/;

// Constants
const MAX_LOCALSTORAGE_SIZE = 100 * 1024; // 100KB - very conservative limit
const MAX_INDEXEDDB_SIZE = 200 * 1024 * 1024; // 200MB - typical browser limit (varies by browser and device)
const DB_NAME = 'designStorage';
const DB_VERSION = 1;
const STORE_NAME = 'designs';

// Initialize IndexedDB
let dbPromise: Promise<IDBDatabase> | null = null;

function initIndexedDB(): Promise<IDBDatabase> {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      try {
        // Check for server-side rendering (SSR) environment
        if (!isBrowser) {
          console.warn('Running in SSR environment - IndexedDB not available');
          reject(new Error('IndexedDB not available in server context'));
          return;
        }
        
        const indexedDB = getIndexedDB();
        if (!indexedDB) {
          console.error('IndexedDB is not supported in this browser!');
          reject(new Error('IndexedDB not supported by browser'));
          return;
        }

      // Check for private browsing mode (which often restricts IndexedDB)
      if (!isLocalStorageAvailable()) {
        console.warn('Detected private browsing mode or localStorage restrictions, IndexedDB may be restricted');
      }

      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = (event) => {
        const error = (event.target as IDBRequest).error;
        const errorName = error ? error.name : 'Unknown error';
        const errorMessage = error ? error.message : 'No details available';
        
        console.error(`IndexedDB error (${errorName}): ${errorMessage}`);
        
        // Handle specific error types
        if (errorName === 'QuotaExceededError') {
          console.error('IndexedDB storage quota exceeded. Try clearing browser data.');
        } else if (errorName === 'SecurityError') {
          console.error('IndexedDB security error - likely in private browsing mode.');
        }
        
        reject(new Error(`Failed to open IndexedDB: ${errorName} - ${errorMessage}`));
      };

      request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        console.log(`📦 IndexedDB connected: ${DB_NAME} (version ${db.version})`);
        
        // Log available object stores
        console.log(`📊 Available stores: ${Array.from(db.objectStoreNames).join(', ')}`);
        
        resolve(db);
      };

      request.onupgradeneeded = (event) => {
        console.log(`📈 Upgrading IndexedDB to version ${DB_VERSION}`);
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
          console.log(`🆕 Created object store: ${STORE_NAME}`);
          
          // Add indexes for better querying
          store.createIndex('timestamp', 'timestamp', { unique: false });
          console.log(`📇 Created index: timestamp`);
        } else {
          console.log(`✅ Object store already exists: ${STORE_NAME}`);
        }
      };
      
      request.onblocked = (event) => {
        console.warn('IndexedDB blocked - another connection needs to be closed first');
      };
      } catch (error) {
        console.error('Error initializing IndexedDB:', error);
        reject(new Error(`Failed to initialize IndexedDB: ${error}`));
      }
    });
  }
  return dbPromise;
}

/**
 * Safely access localStorage
 */
function safeLocalStorageGet(key: string): string | null {
  if (!isBrowser || !isLocalStorageAvailable()) return null;
  
  try {
    return localStorage.getItem(key);
  } catch (e) {
    console.error('Error accessing localStorage:', e);
    return null;
  }
}

function safeLocalStorageSet(key: string, value: string): boolean {
  if (!isBrowser || !isLocalStorageAvailable()) return false;
  
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    console.error('Error writing to localStorage:', e);
    return false;
  }
}

/**
 * Stores data using IndexedDB as the primary storage method,
 * only falling back to other methods when IndexedDB is unavailable
 */
export async function storeData(
  key: string,
  data: string,
  options: {
    forceCloudinary?: boolean;
    cloudinaryOptions?: {
      folder?: string;
      filename?: string;
    };
  } = {}
): Promise<{ storageType: StorageType; reference: string; url?: string }> {
  try {
    // Check if running in server context
    if (!isBrowser) {
      console.warn('Storage not available in server context, using direct data reference');
      // If it's a URL or data URL, just return it directly
      if (data.startsWith('http') || data.startsWith('data:')) {
        return {
          storageType: 'cloudinary', // Not actually cloudinary, but indicates external storage
          reference: data,
          url: data.startsWith('http') ? data : undefined
        };
      }
      
      // No storage available and data isn't a URL, attempt Cloudinary upload as last resort
      if (data.startsWith('data:')) {
        try {
          const uploadResult = await uploadCanvasToCloudinary(data, options.cloudinaryOptions);
          if (uploadResult.success && uploadResult.url) {
            console.log(`☁️ Used Cloudinary in server context: ${key}`);
            return {
              storageType: 'cloudinary',
              reference: `cloudinary://${uploadResult.url}`,
              url: uploadResult.url
            };
          }
        } catch (uploadError) {
          console.error('Server-side Cloudinary upload failed:', uploadError);
        }
      }
      
      throw new Error('Storage not available in server context and data is not a URL');
    }

    // Calculate data size
    const dataSize = new Blob([data]).size;
    console.log(`📊 Data size for ${key}: ${(dataSize / 1024).toFixed(2)}KB`);

    // Force Cloudinary only if explicitly requested (should be rare)
    if (options.forceCloudinary) {
      if (data.startsWith('data:')) {
        const uploadResult = await uploadCanvasToCloudinary(data, options.cloudinaryOptions);
        if (uploadResult.success && uploadResult.url) {
          console.log(`☁️ Forced Cloudinary storage: ${key}`);
          return {
            storageType: 'cloudinary',
            reference: `cloudinary://${uploadResult.url}`,
            url: uploadResult.url
          };
        }
      }
    }

    // ALWAYS try IndexedDB first - it has a much larger storage limit (typically 50MB-250MB)
    try {
      const db = await initIndexedDB();
      return await new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.put({ id: key, data, timestamp: Date.now() });

        request.onsuccess = () => {
          console.log(`🗄️ Stored data (${(dataSize / 1024).toFixed(2)}KB) in IndexedDB: ${key}`);
          resolve({
            storageType: 'indexedDB',
            reference: `indexedDB://${key}`
          });
        };

        request.onerror = (event) => {
          console.error('IndexedDB storage error:', event);
          reject(new Error('Failed to store data in IndexedDB'));
        };
      });
    } catch (indexedDBError) {
      console.warn('IndexedDB failed, trying fallback methods:', indexedDBError);
      
      // Only try localStorage if data is small enough
      if (dataSize <= MAX_LOCALSTORAGE_SIZE && isLocalStorageAvailable()) {
        try {
          const success = safeLocalStorageSet(key, data);
          if (success) {
            console.log(`💾 Fallback to localStorage (${(dataSize / 1024).toFixed(2)}KB): ${key}`);
            return {
              storageType: 'localStorage',
              reference: `localStorage://${key}`
            };
          }
        } catch (localStorageError) {
          console.warn('localStorage fallback failed:', localStorageError);
        }
      } else {
        console.warn(`Data too large for localStorage or localStorage not available (${(dataSize / 1024).toFixed(2)}KB > ${MAX_LOCALSTORAGE_SIZE / 1024}KB)`);
      }
      
      // Absolute last resort - Cloudinary
      if (data.startsWith('data:')) {
        const uploadResult = await uploadCanvasToCloudinary(data, options.cloudinaryOptions);
        if (uploadResult.success && uploadResult.url) {
          console.log(`☁️ Last resort fallback to Cloudinary: ${key}`);
          return {
            storageType: 'cloudinary',
            reference: `cloudinary://${uploadResult.url}`,
            url: uploadResult.url
          };
        }
      } else if (data.startsWith('http')) {
        // If it's already a URL, just return it directly
        return {
          storageType: 'cloudinary',
          reference: `cloudinary://${data}`,
          url: data
        };
      }
      
      throw new Error('All storage methods failed');
    }
  } catch (error) {
    console.error('Storage error:', error);
    throw error;
  }
}

/**
 * Retrieves data from the appropriate storage based on the reference string
 * Reference format: "storageType://key"
 */
export async function retrieveData(reference: string): Promise<string | null> {
  // Check for server-side rendering context
  if (!isBrowser) {
    console.warn('Cannot retrieve indexedDB data in server context:', reference);
    
    // Special handling for server context - if the reference looks like a URL without the storage prefix,
    // we can treat it as such
    if (reference.startsWith('http')) {
      return reference; // Return the URL directly
    }
    
    // If it's a cloudinary reference, extract the URL
    if (reference.startsWith('cloudinary://')) {
      const cloudinaryUrl = reference.replace('cloudinary://', '');
      if (cloudinaryUrl.startsWith('http')) {
        return cloudinaryUrl;
      }
    }
    
    // No way to retrieve data in SSR context
    return null;
  }

  // Not a valid reference format
  const match = reference.match(STORAGE_REF_REGEX);
  if (!match) {
    // Check if this is a URL or a data URL and return it directly
    if (reference.startsWith('http') || reference.startsWith('data:')) {
      return reference;
    }
    
    console.warn(`Invalid storage reference format: ${reference}`);
    return null;
  }

  const [, storageType, key] = match;

  try {
    if (storageType === 'localStorage') {
      // Retrieve from localStorage
      const data = safeLocalStorageGet(key);
      return data;
    } else if (storageType === 'indexedDB') {
      try {
        // Retrieve from IndexedDB
        const db = await initIndexedDB();
        return await new Promise((resolve, reject) => {
          const transaction = db.transaction([STORE_NAME], 'readonly');
          const store = transaction.objectStore(STORE_NAME);
          const request = store.get(key);

          request.onsuccess = () => {
            const result = request.result;
            if (result && result.data) {
              resolve(result.data);
            } else {
              resolve(null);
            }
          };

          request.onerror = (event) => {
            reject(new Error(`Failed to retrieve data from IndexedDB: ${(event.target as IDBRequest).error}`));
          };
        });
      } catch (error) {
        console.error('IndexedDB retrieval error:', error);
        
        // Fall back to localStorage
        console.log('Falling back to localStorage');
        const data = safeLocalStorageGet(key);
        return data;
      }
    } else if (storageType === 'cloudinary') {
      // Cloudinary reference - the key is the URL
      return key.startsWith('http') ? key : null;
    }
  } catch (error) {
    console.error(`Error retrieving data from ${storageType}:`, error);
    return null;
  }

  return null;
}

/**
 * Cleans up old data to prevent storage exhaustion
 */
export async function cleanupOldData(maxAgeMs: number = 7 * 24 * 60 * 60 * 1000): Promise<void> {
  if (!isBrowser) {
    // Skip cleanup in server context
    return;
  }
  
  const now = Date.now();
  const cutoff = now - maxAgeMs;

  // Clean localStorage
  if (isLocalStorageAvailable()) {
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('design_') || key.startsWith('ai_photo_'))) {
          // Try to get timestamp from key format
          const timestampMatch = key.match(/.*_(\d+)$/);
          if (timestampMatch) {
            const timestamp = parseInt(timestampMatch[1], 10);
            if (timestamp < cutoff) {
              localStorage.removeItem(key);
              console.log(`🧹 Removed old item from localStorage: ${key}`);
            }
          }
        }
      }
    } catch (error) {
      console.warn('Error cleaning localStorage:', error);
    }
  }

  // Clean IndexedDB
  try {
    const db = await initIndexedDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    const request = store.openCursor();
    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest).result as IDBCursorWithValue;
      if (cursor) {
        const item = cursor.value;
        if (item.timestamp && item.timestamp < cutoff) {
          cursor.delete();
          console.log(`🧹 Removed old item from IndexedDB: ${item.id}`);
        }
        cursor.continue();
      }
    };
  } catch (error) {
    console.warn('Error cleaning IndexedDB:', error);
  }
}

/**
 * Gets an estimate of current storage usage and available space
 * @returns Object with usage information
 */
export async function getStorageEstimate(): Promise<{
  indexedDB: {
    usage: number; // bytes
    quota: number; // bytes
    percentUsed: number; // 0-100
  };
  localStorage: {
    usage: number; // bytes
    quota: number; // bytes
    percentUsed: number; // 0-100
  };
  count: {
    indexedDB: number;
    localStorage: number;
  };
}> {
  // Default values
  const result = {
    indexedDB: { 
      usage: 0, 
      quota: MAX_INDEXEDDB_SIZE, 
      percentUsed: 0 
    },
    localStorage: { 
      usage: 0, 
      quota: MAX_LOCALSTORAGE_SIZE, 
      percentUsed: 0 
    },
    count: {
      indexedDB: 0,
      localStorage: 0
    }
  };

  // Early return for server-side
  if (!isBrowser) {
    console.warn('Storage estimation not available in server context');
    return result;
  }

  // Get storage estimate for browser storage overall
  if (navigator.storage && navigator.storage.estimate) {
    try {
      const estimate = await navigator.storage.estimate();
      // This estimate covers all storage types, but we'll use it as an approximation for IndexedDB
      if (estimate.usage !== undefined && estimate.quota !== undefined) {
        result.indexedDB.usage = estimate.usage;
        result.indexedDB.quota = estimate.quota;
        result.indexedDB.percentUsed = Math.round((estimate.usage / estimate.quota) * 100);
      }
    } catch (error) {
      console.warn('Failed to get storage estimate:', error);
    }
  }

  // Count items in IndexedDB
  try {
    const db = await initIndexedDB();
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    
    // Get count
    const countRequest = store.count();
    await new Promise<void>((resolve) => {
      countRequest.onsuccess = () => {
        result.count.indexedDB = countRequest.result;
        resolve();
      };
      countRequest.onerror = () => {
        console.error('Error counting IndexedDB items:', countRequest.error);
        resolve();
      };
    });

    // Calculate total size by adding up all items
    let totalSize = 0;
    const cursorRequest = store.openCursor();
    await new Promise<void>((resolve) => {
      cursorRequest.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest).result as IDBCursorWithValue;
        if (cursor) {
          if (cursor.value && cursor.value.data) {
            // Calculate size of this item
            const itemSize = new Blob([cursor.value.data]).size;
            totalSize += itemSize;
          }
          cursor.continue();
        } else {
          // Done
          // If we have a better estimate from iterating through items, use it
          if (totalSize > 0) {
            result.indexedDB.usage = totalSize;
            result.indexedDB.percentUsed = Math.min(100, Math.round((totalSize / result.indexedDB.quota) * 100));
          }
          resolve();
        }
      };
      cursorRequest.onerror = () => {
        console.error('Error accessing IndexedDB items:', cursorRequest.error);
        resolve();
      };
    });
  } catch (error) {
    console.warn('Failed to estimate IndexedDB usage:', error);
  }

  // Estimate localStorage usage
  if (isLocalStorageAvailable()) {
    try {
      // Count items
      let lsCount = 0;
      let totalSize = 0;
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          lsCount++;
          // Calculate size
          const value = localStorage.getItem(key) || '';
          totalSize += new Blob([key, value]).size;
        }
      }
      
      result.count.localStorage = lsCount;
      result.localStorage.usage = totalSize;
      result.localStorage.percentUsed = Math.min(100, Math.round((totalSize / result.localStorage.quota) * 100));
    } catch (error) {
      console.warn('Failed to estimate localStorage usage:', error);
    }
  }

  console.log('📊 Storage usage estimate:', result);
  return result;
}

// Run cleanup on module load
if (isBrowser) {
  // Use a timeout to not interfere with initial page load
  setTimeout(() => {
    cleanupOldData().catch(console.error);
    // Also get storage estimate
    getStorageEstimate().catch(console.error);
  }, 30000); // 30 seconds after page load
} 