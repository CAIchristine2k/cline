/**
 * Color Extractor Utility
 * Extracts dominant color from product variant images
 */

/**
 * Extract dominant color from an image URL
 * Uses a canvas-based approach to analyze pixel data
 */
export async function extractDominantColor(imageUrl: string): Promise<string | null> {
  if (typeof window === 'undefined') {
    // Server-side rendering - can't extract colors
    return null;
  }

  try {
    // Create an image element
    const img = new Image();
    img.crossOrigin = 'Anonymous'; // Handle CORS for Shopify CDN images

    // Load the image
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = imageUrl;
    });

    // Create a canvas to analyze the image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) return null;

    // Use smaller dimensions for faster processing
    const size = 100;
    canvas.width = size;
    canvas.height = size;

    // Draw the image on the canvas
    ctx.drawImage(img, 0, 0, size, size);

    // Get image data
    const imageData = ctx.getImageData(0, 0, size, size);
    const data = imageData.data;

    // Calculate average color (excluding very light/white pixels which might be background)
    let r = 0, g = 0, b = 0, count = 0;

    for (let i = 0; i < data.length; i += 4) {
      const red = data[i];
      const green = data[i + 1];
      const blue = data[i + 2];
      const alpha = data[i + 3];

      // Skip transparent or very light pixels (likely background)
      if (alpha < 128 || (red > 240 && green > 240 && blue > 240)) {
        continue;
      }

      r += red;
      g += green;
      b += blue;
      count++;
    }

    if (count === 0) return null;

    // Calculate average
    r = Math.round(r / count);
    g = Math.round(g / count);
    b = Math.round(b / count);

    // Convert to hex
    const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;

    return hex;
  } catch (error) {
    console.error('Error extracting color from image:', error);
    return null;
  }
}

/**
 * Cache for extracted colors to avoid reprocessing
 */
const colorCache = new Map<string, string>();

/**
 * Get dominant color from image with caching
 */
export async function getDominantColorCached(imageUrl: string): Promise<string | null> {
  if (!imageUrl) return null;

  // Check cache first
  if (colorCache.has(imageUrl)) {
    return colorCache.get(imageUrl) || null;
  }

  // Extract and cache
  const color = await extractDominantColor(imageUrl);
  if (color) {
    colorCache.set(imageUrl, color);
  }

  return color;
}

/**
 * Get text color (black or white) for optimal contrast
 */
export function getContrastColor(hexColor: string): 'light' | 'dark' {
  // Remove # if present
  const hex = hexColor.replace('#', '');

  // Convert to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return dark text for light backgrounds, light text for dark backgrounds
  return luminance > 0.5 ? 'dark' : 'light';
}
