// Theme configuration system for Hydrogen - matches Vue template's theming
import type {LandingPageConfig} from '~/utils/config';

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export type BrandStyle =
  | 'luxury'
  | 'sporty'
  | 'casual'
  | 'technical'
  | 'minimalist'
  | 'vibrant'
  | 'custom';

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

// Predefined color schemes
export const colorSchemes: Record<
  Exclude<BrandStyle, 'custom'>,
  ThemeColors
> = {
  luxury: {
    primary: '#D4AF37', // Gold
    secondary: '#1F1F1F', // Dark gray
    accent: '#FFFFFF', // White
    background: '#000000', // Black
    text: '#FFFFFF', // White
  },
  sporty: {
    primary: '#FF4C29', // Energetic red
    secondary: '#082032', // Navy blue
    accent: '#00A8CC', // Bright blue
    background: '#2C394B', // Dark blue-gray
    text: '#FFFFFF', // White
  },
  casual: {
    primary: '#A5BECC', // Soft blue
    secondary: '#F2F2F2', // Light gray
    accent: '#DF7861', // Coral
    background: '#FFFFFF', // White
    text: '#333333', // Dark gray
  },
  technical: {
    primary: '#00D1FF', // Bright cyan
    secondary: '#1E1E1E', // Very dark gray
    accent: '#FF008C', // Bright pink
    background: '#121212', // Almost black
    text: '#FFFFFF', // White
  },
  minimalist: {
    primary: '#F5F5F5', // Off-white
    secondary: '#E0E0E0', // Light gray
    accent: '#333333', // Dark gray
    background: '#FFFFFF', // White
    text: '#121212', // Near black
  },
  vibrant: {
    primary: '#FF6B6B', // Coral red
    secondary: '#4ECDC4', // Turquoise
    accent: '#FFE66D', // Yellow
    background: '#292F36', // Dark blue-gray
    text: '#F7FFF7', // Off-white
  },
};

// Default theme configuration
const defaultTheme: ThemeConfig = {
  colors: colorSchemes.luxury,
  brandName: 'BRAND',
  brandStyle: 'luxury',
  brandLogo: '/logo.svg',
  influencerName: 'Influencer Name',
  influencerTitle: 'Professional Title',
  influencerImage: '/influencer.jpeg',
  socialLinks: {
    instagram: 'https://instagram.com/',
    twitter: 'https://twitter.com/',
    youtube: 'https://youtube.com/',
  },
};

// Current theme state
let currentTheme: ThemeConfig = {...defaultTheme};

// Helper functions to customize theme
export function setTheme(newTheme: Partial<ThemeConfig>): void {
  currentTheme = {...currentTheme, ...newTheme};

  // If brandStyle is provided and not 'custom', update colors to match the style
  if (
    newTheme.brandStyle &&
    newTheme.brandStyle !== 'custom' &&
    newTheme.brandStyle in colorSchemes
  ) {
    currentTheme.colors =
      colorSchemes[newTheme.brandStyle as Exclude<BrandStyle, 'custom'>];
  }

  // Update CSS variables to apply theme colors (client-side only)
  if (typeof document !== 'undefined') {
    updateCssVariables(currentTheme.colors);
  }
}

// Set only the color theme
export function setColorTheme(style: BrandStyle | ThemeColors): void {
  if (typeof style === 'string') {
    if (style !== 'custom' && style in colorSchemes) {
      currentTheme.colors =
        colorSchemes[style as Exclude<BrandStyle, 'custom'>];
      currentTheme.brandStyle = style;
    }
  } else if (typeof style === 'object') {
    currentTheme.colors = {...currentTheme.colors, ...style};
    currentTheme.brandStyle = 'custom';
  }

  if (typeof document !== 'undefined') {
    updateCssVariables(currentTheme.colors);
  }
}

// Update CSS custom properties (variables) based on theme colors
function updateCssVariables(colors: ThemeColors): void {
  const root = document.documentElement;

  // Set main colors as CSS variables
  root.style.setProperty('--color-primary', colors.primary);
  root.style.setProperty('--color-secondary', colors.secondary);
  root.style.setProperty('--color-accent', colors.accent);
  root.style.setProperty('--color-background', colors.background);
  root.style.setProperty('--color-text', colors.text);

  // Set additional variables for Tailwind CSS
  root.style.setProperty(
    '--color-primary-50',
    adjustColorBrightness(colors.primary, 0.85),
  );
  root.style.setProperty(
    '--color-primary-100',
    adjustColorBrightness(colors.primary, 0.7),
  );
  root.style.setProperty(
    '--color-primary-200',
    adjustColorBrightness(colors.primary, 0.55),
  );
  root.style.setProperty(
    '--color-primary-300',
    adjustColorBrightness(colors.primary, 0.4),
  );
  root.style.setProperty(
    '--color-primary-400',
    adjustColorBrightness(colors.primary, 0.2),
  );
  root.style.setProperty('--color-primary-500', colors.primary);
  root.style.setProperty(
    '--color-primary-600',
    adjustColorBrightness(colors.primary, -0.2),
  );
  root.style.setProperty(
    '--color-primary-700',
    adjustColorBrightness(colors.primary, -0.4),
  );
  root.style.setProperty(
    '--color-primary-800',
    adjustColorBrightness(colors.primary, -0.6),
  );
  root.style.setProperty(
    '--color-primary-900',
    adjustColorBrightness(colors.primary, -0.8),
  );

  // Do the same for secondary colors
  root.style.setProperty(
    '--color-secondary-50',
    adjustColorBrightness(colors.secondary, 0.85),
  );
  root.style.setProperty(
    '--color-secondary-100',
    adjustColorBrightness(colors.secondary, 0.7),
  );
  root.style.setProperty(
    '--color-secondary-200',
    adjustColorBrightness(colors.secondary, 0.55),
  );
  root.style.setProperty(
    '--color-secondary-300',
    adjustColorBrightness(colors.secondary, 0.4),
  );
  root.style.setProperty(
    '--color-secondary-400',
    adjustColorBrightness(colors.secondary, 0.2),
  );
  root.style.setProperty('--color-secondary-500', colors.secondary);
  root.style.setProperty(
    '--color-secondary-600',
    adjustColorBrightness(colors.secondary, -0.2),
  );
  root.style.setProperty(
    '--color-secondary-700',
    adjustColorBrightness(colors.secondary, -0.4),
  );
  root.style.setProperty(
    '--color-secondary-800',
    adjustColorBrightness(colors.secondary, -0.6),
  );
  root.style.setProperty(
    '--color-secondary-900',
    adjustColorBrightness(colors.secondary, -0.8),
  );
}

// Helper function to adjust color brightness
function adjustColorBrightness(hex: string, factor: number): string {
  // Convert hex to RGB
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);

  // Adjust brightness
  r = Math.min(255, Math.max(0, Math.round(r + factor * 255)));
  g = Math.min(255, Math.max(0, Math.round(g + factor * 255)));
  b = Math.min(255, Math.max(0, Math.round(b + factor * 255)));

  // Convert back to hex
  return `#${r.toString(16).padStart(2, '0')}${g
    .toString(16)
    .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// Helper function to convert hex to RGB
export function hexToRgb(hex: string): string {
  // Remove # if present
  hex = hex.replace('#', '');

  // Convert to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `${r}, ${g}, ${b}`;
}

// CSS variables for easy access in components - with safety checks
export const cssVars = {
  get primary() {
    if (typeof document === 'undefined') return currentTheme.colors.primary;
    return (
      getComputedStyle(document.documentElement)
        .getPropertyValue('--color-primary')
        .trim() || currentTheme.colors.primary
    );
  },
  get secondary() {
    if (typeof document === 'undefined') return currentTheme.colors.secondary;
    return (
      getComputedStyle(document.documentElement)
        .getPropertyValue('--color-secondary')
        .trim() || currentTheme.colors.secondary
    );
  },
  get accent() {
    if (typeof document === 'undefined') return currentTheme.colors.accent;
    return (
      getComputedStyle(document.documentElement)
        .getPropertyValue('--color-accent')
        .trim() || currentTheme.colors.accent
    );
  },
  get background() {
    if (typeof document === 'undefined') return currentTheme.colors.background;
    return (
      getComputedStyle(document.documentElement)
        .getPropertyValue('--color-background')
        .trim() || currentTheme.colors.background
    );
  },
  get text() {
    if (typeof document === 'undefined') return currentTheme.colors.text;
    return (
      getComputedStyle(document.documentElement)
        .getPropertyValue('--color-text')
        .trim() || currentTheme.colors.text
    );
  },
};

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

  // Update layout CSS variables if layout config is provided
  if (config.layout && typeof document !== 'undefined') {
    updateLayoutVariables(config.layout);
  }
}

// Update layout CSS variables from config
function updateLayoutVariables(layout: LandingPageConfig['layout']): void {
  if (!layout || typeof document === 'undefined') return;

  const root = document.documentElement;
  // Cart variables
  if (layout.cart) {
    root.style.setProperty('--cart-width-mobile', layout.cart.width.mobile);
    root.style.setProperty('--cart-width-tablet', layout.cart.width.tablet);
    root.style.setProperty('--cart-width-desktop', layout.cart.width.desktop);
    root.style.setProperty(
      '--cart-max-width-mobile',
      layout.cart.maxWidth.mobile,
    );
    root.style.setProperty(
      '--cart-max-width-tablet',
      layout.cart.maxWidth.tablet,
    );
    root.style.setProperty(
      '--cart-max-width-desktop',
      layout.cart.maxWidth.desktop,
    );
    root.style.setProperty('--cart-min-width', layout.cart.minWidth);
    root.style.setProperty(
      '--cart-items-max-height',
      layout.cart.itemsAreaMaxHeight,
    );
    root.style.setProperty(
      '--cart-items-min-height',
      layout.cart.itemsAreaMinHeight,
    );
    root.style.setProperty(
      '--cart-summary-min-height',
      layout.cart.summaryMinHeight,
    );
  }

  // Header variables
  if (layout.header) {
    root.style.setProperty(
      '--header-height-mobile',
      layout.header.height.mobile,
    );
    root.style.setProperty(
      '--header-height-desktop',
      layout.header.height.desktop,
    );
  }

  // Spacing variables
  if (layout.spacing) {
    root.style.setProperty(
      '--container-padding',
      layout.spacing.containerPadding,
    );
    root.style.setProperty('--section-spacing', layout.spacing.sectionSpacing);
    root.style.setProperty('--card-spacing', layout.spacing.cardSpacing);
  }
}

// Initialize theme on app startup
export function initializeTheme(): void {
  if (typeof document !== 'undefined') {
    updateCssVariables(currentTheme.colors);

    // Set RGB versions for shadows and opacity
    const root = document.documentElement;
    root.style.setProperty(
      '--color-primary-rgb',
      hexToRgb(currentTheme.colors.primary),
    );
    root.style.setProperty(
      '--color-secondary-rgb',
      hexToRgb(currentTheme.colors.secondary),
    );
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

export default currentTheme;
