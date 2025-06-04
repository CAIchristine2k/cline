// Local storage utilities for persisting design data across sessions

export interface StoredDesign {
  id: string;
  productId: string;
  variantId: string;
  productTitle: string;
  elements: any[]; // CustomElement array with zIndex
  uploadedImages: {id: string; src: string; name: string}[];
  stageSize: {width: number; height: number};
  backgroundImage: string;
  selectedCustomImage?: string | null; // Track which specific customizable image this design is for
  designImageBase64?: string; // Base64 image of the design (for performance, avoid Cloudinary)
  lastModified: string;
  name?: string;
}

export interface DesignStorage {
  designs: {[key: string]: StoredDesign};
  currentDesign?: string;
}

const STORAGE_KEY = 'product-customizer-designs';
const MAX_DESIGNS = 10; // Limit to prevent storage bloat
const MAX_AGE_DAYS = 30; // Auto-cleanup after 30 days

// Get all stored designs
export function getStoredDesigns(): DesignStorage {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return {designs: {}};

    const data = JSON.parse(stored) as DesignStorage;

    // Clean up old designs
    const now = new Date();
    const cutoff = new Date(now.getTime() - MAX_AGE_DAYS * 24 * 60 * 60 * 1000);

    Object.keys(data.designs).forEach((key) => {
      const design = data.designs[key];
      if (new Date(design.lastModified) < cutoff) {
        delete data.designs[key];
      }
    });

    return data;
  } catch (error) {
    console.error('Error loading stored designs:', error);
    return {designs: {}};
  }
}

// Save a design to localStorage
export function saveDesignToStorage(
  design: Omit<StoredDesign, 'id' | 'lastModified'>,
): string {
  try {
    const storage = getStoredDesigns();
    const designId = `design-${Date.now()}`;
    const timestamp = new Date().toISOString();

    const newDesign: StoredDesign = {
      ...design,
      id: designId,
      lastModified: timestamp,
    };

    storage.designs[designId] = newDesign;
    storage.currentDesign = designId;

    // Limit number of stored designs
    const designKeys = Object.keys(storage.designs).sort((a, b) => {
      return (
        new Date(storage.designs[b].lastModified).getTime() -
        new Date(storage.designs[a].lastModified).getTime()
      );
    });

    if (designKeys.length > MAX_DESIGNS) {
      const toDelete = designKeys.slice(MAX_DESIGNS);
      toDelete.forEach((key) => delete storage.designs[key]);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
    return designId;
  } catch (error) {
    console.error('Error saving design to storage:', error);
    throw new Error('Failed to save design locally');
  }
}

// Update an existing design
export function updateDesignInStorage(
  designId: string,
  updates: Partial<StoredDesign>,
): void {
  try {
    const storage = getStoredDesigns();
    const existingDesign = storage.designs[designId];

    if (!existingDesign) {
      throw new Error('Design not found');
    }

    storage.designs[designId] = {
      ...existingDesign,
      ...updates,
      lastModified: new Date().toISOString(),
    };

    storage.currentDesign = designId;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
  } catch (error) {
    console.error('Error updating design in storage:', error);
    throw new Error('Failed to update design locally');
  }
}

// Get a specific design by ID
export function getDesignFromStorage(designId: string): StoredDesign | null {
  try {
    const storage = getStoredDesigns();
    return storage.designs[designId] || null;
  } catch (error) {
    console.error('Error loading design from storage:', error);
    return null;
  }
}

// Delete a design from storage
export function deleteDesignFromStorage(designId: string): void {
  try {
    const storage = getStoredDesigns();
    delete storage.designs[designId];

    if (storage.currentDesign === designId) {
      delete storage.currentDesign;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
  } catch (error) {
    console.error('Error deleting design from storage:', error);
    throw new Error('Failed to delete design locally');
  }
}

// Get designs for a specific product
export function getDesignsForProduct(productId: string): StoredDesign[] {
  try {
    const storage = getStoredDesigns();
    return Object.values(storage.designs)
      .filter((design) => design.productId === productId)
      .sort(
        (a, b) =>
          new Date(b.lastModified).getTime() -
          new Date(a.lastModified).getTime(),
      );
  } catch (error) {
    console.error('Error loading designs for product:', error);
    return [];
  }
}

// Get designs for a specific product and customizable image
export function getDesignForProductAndImage(productId: string, imageUrl: string | null): StoredDesign | null {
  try {
    if (!imageUrl) return null;
    
    const storage = getStoredDesigns();
    const matchingDesigns = Object.values(storage.designs)
      .filter(
        (design) => 
          design.productId === productId && 
          design.selectedCustomImage === imageUrl
      )
      .sort(
        (a, b) =>
          new Date(b.lastModified).getTime() -
          new Date(a.lastModified).getTime(),
      );
    
    // Return the most recent design for this product and image
    return matchingDesigns.length > 0 ? matchingDesigns[0] : null;
  } catch (error) {
    console.error('Error finding design for product and image:', error);
    return null;
  }
}

// Delete all designs for a specific product
export function resetDesignsForProduct(productId: string): void {
  try {
    const storage = getStoredDesigns();
    let designsDeleted = false;
    
    // Find and remove all designs for this product
    Object.keys(storage.designs).forEach(key => {
      const design = storage.designs[key];
      if (design.productId === productId) {
        delete storage.designs[key];
        designsDeleted = true;
        
        // Also reset current design if it matches
        if (storage.currentDesign === key) {
          delete storage.currentDesign;
        }
      }
    });
    
    if (designsDeleted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
      console.log(`✓ All designs for product ${productId} have been reset`);
    }
  } catch (error) {
    console.error('Error resetting designs for product:', error);
    throw new Error('Failed to reset designs for product');
  }
}

// Auto-save functionality
export function createAutoSave(
  getCurrentDesignState: () => Omit<StoredDesign, 'id' | 'lastModified'>,
  interval: number = 10000, // 10 seconds
) {
  let currentDesignId: string | null = null;
  let autoSaveTimer: NodeJS.Timeout;

  const save = () => {
    try {
      const designState = getCurrentDesignState();

      if (currentDesignId) {
        updateDesignInStorage(currentDesignId, designState);
      } else {
        currentDesignId = saveDesignToStorage(designState);
      }
    } catch (error) {
      console.error('Auto-save failed:', error);
    }
  };

  const start = () => {
    autoSaveTimer = setInterval(save, interval);
    return () => stop(); // Return cleanup function
  };

  const stop = () => {
    if (autoSaveTimer) {
      clearInterval(autoSaveTimer);
    }
  };

  const saveNow = () => {
    save();
  };

  const setDesignId = (id: string) => {
    currentDesignId = id;
  };

  return { start, stop, saveNow, setDesignId, currentDesignId };
}

// Clear all designs from storage (for debugging/development)
export function clearAllDesigns(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log('All designs cleared from storage');
  } catch (error) {
    console.error('Error clearing designs:', error);
  }
}
