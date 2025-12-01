/**
 * Color Mapping Utility
 * Maps hair extension/wig color codes to their hex values
 */

export interface ColorMapping {
  hex: string;
  name: string;
  textColor?: 'light' | 'dark'; // For contrast on the button
}

/**
 * Common hair color codes used in C'Line Hair products
 * Based on standard hair extension color codes
 */
export const HAIR_COLOR_MAP: Record<string, ColorMapping> = {
  // Blacks
  '1': { hex: '#000000', name: 'Jet Black', textColor: 'light' },
  '1B': { hex: '#1a1a1a', name: 'Off Black', textColor: 'light' },
  '2': { hex: '#2b2421', name: 'Darkest Brown', textColor: 'light' },

  // Dark Browns
  '4': { hex: '#3d2314', name: 'Dark Brown', textColor: 'light' },
  '6': { hex: '#583d2e', name: 'Chestnut Brown', textColor: 'light' },
  '8': { hex: '#6b4423', name: 'Ash Brown', textColor: 'light' },

  // Medium Browns
  '10': { hex: '#8b5a2b', name: 'Medium Brown', textColor: 'light' },
  '12': { hex: '#a67c52', name: 'Light Brown', textColor: 'dark' },
  '14': { hex: '#c19a6b', name: 'Dark Blonde', textColor: 'dark' },

  // Blondes
  '16': { hex: '#d4a76a', name: 'Honey Blonde', textColor: 'dark' },
  '18': { hex: '#e5be9e', name: 'Ash Blonde', textColor: 'dark' },
  '20': { hex: '#f0dcc2', name: 'Light Blonde', textColor: 'dark' },
  '22': { hex: '#f5e6d3', name: 'Platinum Blonde', textColor: 'dark' },
  '24': { hex: '#faf0e6', name: 'Golden Blonde', textColor: 'dark' },
  '27': { hex: '#f4c430', name: 'Strawberry Blonde', textColor: 'dark' },
  '30': { hex: '#d2691e', name: 'Auburn', textColor: 'light' },

  // Reds
  '33': { hex: '#8b4513', name: 'Dark Auburn', textColor: 'light' },
  '35': { hex: '#b5651d', name: 'Red', textColor: 'light' },
  '130': { hex: '#cd853f', name: 'Copper', textColor: 'dark' },
  '350': { hex: '#dc143c', name: 'Bright Red', textColor: 'light' },

  // Greys
  '51': { hex: '#808080', name: 'Grey', textColor: 'light' },
  '56': { hex: '#c0c0c0', name: 'Silver Grey', textColor: 'dark' },
  '60': { hex: '#dcdcdc', name: 'Platinum', textColor: 'dark' },

  // Naturals & Mixed
  'NATURAL': { hex: '#4a3728', name: 'Natural Brown', textColor: 'light' },
  'NOIR': { hex: '#000000', name: 'Black', textColor: 'light' },
  'BRUN': { hex: '#654321', name: 'Brown', textColor: 'light' },
  'CHÂTAIN': { hex: '#8b4513', name: 'Chestnut', textColor: 'light' },
  'BLOND': { hex: '#f0e68c', name: 'Blonde', textColor: 'dark' },
  'ROUX': { hex: '#cd5c5c', name: 'Red', textColor: 'light' },

  // Special colors (Fashion colors)
  'BURGUNDY': { hex: '#800020', name: 'Burgundy', textColor: 'light' },
  'PURPLE': { hex: '#800080', name: 'Purple', textColor: 'light' },
  'BLUE': { hex: '#0000ff', name: 'Blue', textColor: 'light' },
  'PINK': { hex: '#ff69b4', name: 'Pink', textColor: 'dark' },
  'GREEN': { hex: '#008000', name: 'Green', textColor: 'light' },
  'ORANGE': { hex: '#ff8c00', name: 'Orange', textColor: 'dark' },

  // Ombré & Balayage patterns (using gradient approximation)
  'T1B/27': { hex: '#8b6914', name: 'Black to Honey Blonde Ombré', textColor: 'light' },
  'T1B/30': { hex: '#a0522d', name: 'Black to Auburn Ombré', textColor: 'light' },
  'T1B/99J': { hex: '#722f37', name: 'Black to Burgundy Ombré', textColor: 'light' },
  'T4/27': { hex: '#a67c52', name: 'Brown to Honey Blonde Ombré', textColor: 'light' },
  'T4/30': { hex: '#964b00', name: 'Brown to Auburn Ombré', textColor: 'light' },
  'P1B/27': { hex: '#8b6914', name: 'Black to Honey Blonde Piano', textColor: 'light' },
  'P1B/30': { hex: '#a0522d', name: 'Black to Auburn Piano', textColor: 'light' },
  'P2/27': { hex: '#7b5e3f', name: 'Dark Brown to Honey Blonde Piano', textColor: 'light' },
  'P4/27': { hex: '#a67c52', name: 'Brown to Honey Blonde Piano', textColor: 'light' },
  'P4/30': { hex: '#964b00', name: 'Brown to Auburn Piano', textColor: 'light' },
  '4/27': { hex: '#a67c52', name: 'Brown to Honey Blonde', textColor: 'light' },
  '4/30': { hex: '#964b00', name: 'Brown to Auburn', textColor: 'light' },
  '1B/27': { hex: '#8b6914', name: 'Black to Honey Blonde', textColor: 'light' },
  '1B/30': { hex: '#a0522d', name: 'Black to Auburn', textColor: 'light' },
  '99J': { hex: '#722f37', name: 'Wine Red', textColor: 'light' },
};

/**
 * Get color information from a color code or name
 * @param colorValue - The color code/name from Shopify (e.g., "1B", "BLOND", "2#", "P4/27", etc.)
 * @returns ColorMapping object or null if not found
 */
export function getColorInfo(colorValue: string): ColorMapping | null {
  if (!colorValue) return null;

  // Normalize the input - remove # suffix and trim
  let normalizedValue = colorValue.toString().toUpperCase().trim();

  // Remove trailing # if present (e.g., "2#" → "2", "4#" → "4")
  normalizedValue = normalizedValue.replace(/#$/, '');

  // Direct match
  if (HAIR_COLOR_MAP[normalizedValue]) {
    return HAIR_COLOR_MAP[normalizedValue];
  }

  // Try partial matches for ombré patterns (e.g., "1B/27", "T1B/27", "P4/27", "P1B/30")
  // Pattern can start with T or P (or nothing)
  const ombrePattern = /^[TP]?(\d+[A-Z]?)\/(\d+[A-Z]?)$/i;
  const match = normalizedValue.match(ombrePattern);
  if (match) {
    const fullPattern = normalizedValue;
    const baseColor = match[1];
    const secondColor = match[2];

    // Try to find exact pattern first (with T or P prefix)
    if (HAIR_COLOR_MAP[fullPattern]) {
      return HAIR_COLOR_MAP[fullPattern];
    }

    // Try without prefix (e.g., "P4/27" → "4/27")
    const withoutPrefix = `${baseColor}/${secondColor}`;
    if (HAIR_COLOR_MAP[withoutPrefix]) {
      return HAIR_COLOR_MAP[withoutPrefix];
    }

    // Try with T prefix (e.g., "P4/27" → "T4/27")
    const withT = `T${baseColor}/${secondColor}`;
    if (HAIR_COLOR_MAP[withT]) {
      return HAIR_COLOR_MAP[withT];
    }

    // Fallback to base color
    if (HAIR_COLOR_MAP[baseColor]) {
      return HAIR_COLOR_MAP[baseColor];
    }

    // Create a gradient approximation if we have both colors
    if (HAIR_COLOR_MAP[baseColor] && HAIR_COLOR_MAP[secondColor]) {
      // Use the darker/first color as the base for ombré
      return HAIR_COLOR_MAP[baseColor];
    }
  }

  // If it looks like a hex color, return it as-is
  if (/^#[0-9A-F]{6}$/i.test(normalizedValue)) {
    return {
      hex: normalizedValue,
      name: colorValue,
      textColor: getContrastTextColor(normalizedValue),
    };
  }

  return null;
}

/**
 * Check if an option name represents a color
 * @param optionName - The name of the product option
 * @returns boolean
 */
export function isColorOption(optionName: string): boolean {
  const normalized = optionName.toLowerCase().trim();
  return (
    normalized === 'color' ||
    normalized === 'colour' ||
    normalized === 'couleur' ||
    normalized === 'colore' ||
    normalized === 'farbe' ||
    normalized.includes('color') ||
    normalized.includes('couleur')
  );
}

/**
 * Get text color (black or white) based on background color for optimal contrast
 * @param hexColor - Hex color code
 * @returns 'light' (white text) or 'dark' (black text)
 */
export function getContrastTextColor(hexColor: string): 'light' | 'dark' {
  // Remove # if present
  const hex = hexColor.replace('#', '');

  // Convert to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate luminance (using relative luminance formula)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return dark text for light backgrounds, light text for dark backgrounds
  return luminance > 0.5 ? 'dark' : 'light';
}
