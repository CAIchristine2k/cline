// Utility functions for applying themed styles consistently across components

// Button styles
export const buttonStyles = {
  // Primary button with theme color
  primary: `bg-primary hover:bg-primary-600 text-black font-bold py-3 px-6 rounded-sm transition-all duration-300 flex items-center justify-center`,
  
  // Secondary/outlined button
  secondary: `bg-transparent border-2 border-white hover:border-primary text-white hover:text-primary font-bold py-3 px-6 rounded-sm transition-all duration-300 flex items-center justify-center`,
  
  // Subtle button
  subtle: `bg-gray-800 hover:bg-primary text-white hover:text-black rounded-sm p-2.5 transition-all duration-300 transform hover:scale-105`,
  
  // Text button
  text: `text-primary hover:text-primary-400 font-medium transition-colors duration-300`
};

// Section styles
export const sectionStyles = {
  // Default padding for sections
  padding: `py-20 md:py-24`,
  
  // Dark background gradient used in multiple places
  darkGradient: `bg-gradient-to-b from-black via-gray-900/95 to-black`,
  
  // Light background for contrast
  lightBackground: `bg-neutral-100 text-black`,
  
  // Container class used in most sections
  container: `container mx-auto px-4 md:px-6`,
  
  // Section heading wrapper
  headingWrapper: `mb-12 md:mb-16 text-center`,
  
  // Tag style used above section headings
  tag: `inline-block px-4 py-1 bg-primary/20 text-primary text-sm font-bold tracking-wider uppercase mb-4 rounded-sm`,
  
  // Main heading style
  heading: `text-3xl md:text-4xl lg:text-5xl font-bold mb-5`,
  
  // Subheading style
  subheading: `text-gray-300 max-w-2xl mx-auto leading-relaxed`,
};

// Card styles
export const cardStyles = {
  // Base card style
  base: `group relative rounded-sm overflow-hidden bg-gray-900/80 backdrop-blur-sm border border-gray-800 hover:border-primary transition-all duration-300 shadow-lg hover:shadow-xl`,
  
  // Stat card used on the landing page
  stat: `bg-black/60 backdrop-blur-sm border border-primary/30 p-4 rounded-sm text-center transform transition-transform hover:scale-105 hover:border-primary/80`,
  
  // Product card style
  product: `group relative rounded-sm overflow-hidden bg-gray-900/80 backdrop-blur-sm border border-gray-800 hover:border-primary transition-all duration-300 shadow-lg hover:shadow-xl`,
};

// Accent elements
export const accentStyles = {
  // Text with theme primary color
  primaryText: `text-primary`,
  
  // Glow effect for text
  glowText: `hero-title-glow`,
  
  // Badge style
  badge: `bg-primary text-black text-xs font-bold py-1 px-3 rounded-sm absolute top-4 right-4`,
  
  // Underline accent
  underline: `relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary`,
  
  // Gradient overlay
  overlay: `bg-gradient-to-b from-black/80 via-black/60 to-black/90`,
};

// Animation classes
export const animationStyles = {
  fadeIn: `animate-pulse`,
  slideUp: `animate-slide-up`,
  slideDown: `animate-slide-down`,
  slideInRight: `animate-slide-in-right`,
  slideInLeft: `animate-slide-in-left`,
  scaleIn: `animate-scale-in`,
};

// Common inline styles that need access to theme colors
export const inlineStyles = {
  // Primary background color
  primaryBackground: { backgroundColor: 'var(--color-primary)' },
  
  // Primary text color
  primaryText: { color: 'var(--color-primary)' },
  
  // Primary border color
  primaryBorder: { borderColor: 'var(--color-primary)' },
  
  // Primary with opacity (for borders, etc)
  primaryWithOpacity: (opacity: number) => ({ 
    borderColor: `rgba(var(--color-primary-rgb), ${opacity})` 
  }),
  
  // Background with primary color
  primaryBackgroundWithText: { 
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-background)'
  },
  
  // Secondary color styles
  secondaryBackground: { backgroundColor: 'var(--color-secondary)' },
  secondaryText: { color: 'var(--color-secondary)' },
  
  // Hover styles for interactive elements
  hoverPrimary: { 
    '--hover-border-color': 'var(--color-primary)',
    '--hover-text-color': 'var(--color-primary)',
  },
}; 