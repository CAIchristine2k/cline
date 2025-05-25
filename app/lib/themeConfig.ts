// Theme configuration system for Hydrogen - matches Vue template's theming
import type { LandingPageConfig } from './config';

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export type BrandStyle = "luxury" | "sporty" | "casual" | "technical" | "minimalist" | "vibrant" | "custom";

export interface ThemeConfig {
  colors: ThemeColors;
  brandName: string;
  brandStyle: BrandStyle;
  brandLogo: string;
  influencerName: string;
  influencerTitle?: string;
  influencerImage?: string;
  socialLinks: {
    instagram?: string;
    twitter?: string;
    youtube?: string;
    tiktok?: string;
    facebook?: string;
    website?: string;
  };
}

// Predefined color schemes that match Vue template
export const colorSchemes: Record<Exclude<BrandStyle, "custom">, ThemeColors> = {
  luxury: {
    primary: "#D4AF37", // Gold
    secondary: "#1F1F1F", // Dark gray
    accent: "#FFFFFF", // White
    background: "#000000", // Black
    text: "#FFFFFF", // White
  },
  sporty: {
    primary: "#FF4C29", // Energetic red
    secondary: "#082032", // Navy blue
    accent: "#00A8CC", // Bright blue
    background: "#2C394B", // Dark blue-gray
    text: "#FFFFFF", // White
  },
  casual: {
    primary: "#A5BECC", // Soft blue
    secondary: "#F2F2F2", // Light gray
    accent: "#DF7861", // Coral
    background: "#FFFFFF", // White
    text: "#333333", // Dark gray
  },
  technical: {
    primary: "#00D1FF", // Bright cyan
    secondary: "#1E1E1E", // Very dark gray
    accent: "#FF008C", // Bright pink
    background: "#121212", // Almost black
    text: "#FFFFFF", // White
  },
  minimalist: {
    primary: "#F5F5F5", // Off-white
    secondary: "#E0E0E0", // Light gray
    accent: "#333333", // Dark gray
    background: "#FFFFFF", // White
    text: "#121212", // Near black
  },
  vibrant: {
    primary: "#FF6B6B", // Coral red
    secondary: "#4ECDC4", // Turquoise
    accent: "#FFE66D", // Yellow
    background: "#292F36", // Dark blue-gray
    text: "#F7FFF7", // Off-white
  },
};

// Default theme configuration
const defaultTheme: ThemeConfig = {
  colors: colorSchemes.luxury,
  brandName: "BRAND",
  brandStyle: "luxury",
  brandLogo: "/logo.svg",
  influencerName: "Influencer Name",
  influencerTitle: "Professional Title",
  influencerImage: "/influencer.jpg",
  socialLinks: {
    instagram: "https://instagram.com/",
    twitter: "https://twitter.com/",
    youtube: "https://youtube.com/",
  },
};

// Current theme state
let currentTheme: ThemeConfig = { ...defaultTheme };

// Helper functions to customize theme
export function setTheme(newTheme: Partial<ThemeConfig>): void {
  currentTheme = { ...currentTheme, ...newTheme };

  // If brandStyle is provided and not 'custom', update colors to match the style
  if (
    newTheme.brandStyle &&
    newTheme.brandStyle !== "custom" &&
    newTheme.brandStyle in colorSchemes
  ) {
    currentTheme.colors = colorSchemes[newTheme.brandStyle as Exclude<BrandStyle, "custom">];
  }

  // Update CSS variables to apply theme colors (client-side only)
  if (typeof document !== 'undefined') {
    updateCssVariables(currentTheme.colors);
  }
}

// Set only the color theme
export function setColorTheme(style: BrandStyle | ThemeColors): void {
  if (typeof style === "string") {
    if (style !== "custom" && style in colorSchemes) {
      currentTheme.colors = colorSchemes[style as Exclude<BrandStyle, "custom">];
      currentTheme.brandStyle = style;
    }
  } else if (typeof style === "object") {
    currentTheme.colors = { ...currentTheme.colors, ...style };
    currentTheme.brandStyle = "custom";
  }

  if (typeof document !== 'undefined') {
    updateCssVariables(currentTheme.colors);
  }
}

// Helper function to convert hex to RGB
function hexToRgb(hex: string): string {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Convert to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `${r}, ${g}, ${b}`;
}

// Update CSS custom properties (variables) based on theme colors
function updateCssVariables(colors: ThemeColors): void {
  const root = document.documentElement;

  // Set main colors as CSS variables
  root.style.setProperty("--color-primary", colors.primary);
  root.style.setProperty("--color-secondary", colors.secondary);
  root.style.setProperty("--color-accent", colors.accent);
  root.style.setProperty("--color-background", colors.background);
  root.style.setProperty("--color-text", colors.text);
  
  // Set RGB versions for shadows and opacity effects
  root.style.setProperty("--color-primary-rgb", hexToRgb(colors.primary));
  root.style.setProperty("--color-secondary-rgb", hexToRgb(colors.secondary));

  // Set additional variables for Tailwind CSS with shades
  const primaryShades = generateColorShades(colors.primary);
  const secondaryShades = generateColorShades(colors.secondary);

  // Primary color shades
  Object.entries(primaryShades).forEach(([shade, color]) => {
    root.style.setProperty(`--color-primary-${shade}`, color);
    
    // Add RGB versions of each shade
    root.style.setProperty(`--color-primary-${shade}-rgb`, hexToRgb(color));
  });

  // Secondary color shades
  Object.entries(secondaryShades).forEach(([shade, color]) => {
    root.style.setProperty(`--color-secondary-${shade}`, color);
    
    // Add RGB versions of each shade
    root.style.setProperty(`--color-secondary-${shade}-rgb`, hexToRgb(color));
  });

  // Set gold color variables (for luxury theme compatibility)
  if (colors.primary === "#D4AF37") {
    root.style.setProperty("--color-gold-500", colors.primary);
    root.style.setProperty("--color-gold-400", "#E5C158");
    root.style.setProperty("--color-gold-600", "#BF9B2F");
    
    // RGB versions
    root.style.setProperty("--color-gold-500-rgb", hexToRgb(colors.primary));
    root.style.setProperty("--color-gold-400-rgb", hexToRgb("#E5C158"));
    root.style.setProperty("--color-gold-600-rgb", hexToRgb("#BF9B2F"));
  }
}

// Generate color shades for a base color
function generateColorShades(baseColor: string): Record<string, string> {
  const shades: Record<string, string> = {};
  const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  const factors = [0.85, 0.7, 0.55, 0.4, 0.2, 0, -0.2, -0.4, -0.6, -0.8];

  steps.forEach((step, index) => {
    shades[step.toString()] = adjustColorBrightness(baseColor, factors[index]);
  });

  return shades;
}

// Helper function to adjust color brightness
function adjustColorBrightness(hex: string, factor: number): string {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Convert hex to RGB
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Adjust brightness
  r = Math.min(255, Math.max(0, Math.round(r + factor * 255)));
  g = Math.min(255, Math.max(0, Math.round(g + factor * 255)));
  b = Math.min(255, Math.max(0, Math.round(b + factor * 255)));

  // Convert back to hex
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

// Initialize theme from config
export function initThemeFromConfig(config: LandingPageConfig): void {
  setTheme({
    brandName: config.brandName,
    brandStyle: config.brandStyle,
    brandLogo: config.brandLogo,
    influencerName: config.influencerName,
    influencerTitle: config.influencerTitle,
    influencerImage: config.influencerImage,
    socialLinks: config.socialLinks,
  });
}

// Initialize theme on app startup
export function initializeTheme(): void {
  if (typeof document !== 'undefined') {
    updateCssVariables(currentTheme.colors);
  }
}

// Get current theme
export function getTheme(): ThemeConfig {
  return currentTheme;
}

// Get theme colors for CSS
export function getThemeColors(): ThemeColors {
  return currentTheme.colors;
}

// CSS variable names for easy reference
export const cssVars = {
  primary: 'var(--color-primary)',
  secondary: 'var(--color-secondary)', 
  accent: 'var(--color-accent)',
  background: 'var(--color-background)',
  text: 'var(--color-text)',
  gold: {
    400: 'var(--color-gold-400)',
    500: 'var(--color-gold-500)',
    600: 'var(--color-gold-600)',
  }
} as const;

export default currentTheme;