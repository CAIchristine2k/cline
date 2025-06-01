import {clsx, type ClassValue} from 'clsx';

/**
 * Utility function for combining class names
 * Uses clsx for conditional classes and can be extended with twMerge later if needed
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Utility for responsive text sizes
 */
export function responsiveText(
  size:
    | 'xs'
    | 'sm'
    | 'base'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | '8xl'
    | '9xl',
) {
  const sizes = {
    xs: 'text-xs md:text-sm',
    sm: 'text-sm md:text-base',
    base: 'text-base md:text-lg',
    lg: 'text-lg md:text-xl',
    xl: 'text-xl md:text-2xl',
    '2xl': 'text-2xl md:text-3xl',
    '3xl': 'text-3xl md:text-4xl',
    '4xl': 'text-4xl md:text-5xl',
    '5xl': 'text-5xl md:text-6xl',
    '6xl': 'text-6xl md:text-7xl',
    '7xl': 'text-7xl md:text-8xl',
    '8xl': 'text-8xl md:text-9xl',
    '9xl': 'text-9xl',
  };
  return sizes[size];
}

/**
 * Utility for spacing classes
 */
export function spacing(
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl',
) {
  const sizes = {
    xs: 'p-2 md:p-4',
    sm: 'p-4 md:p-6',
    md: 'p-6 md:p-8',
    lg: 'p-8 md:p-12',
    xl: 'p-12 md:p-16',
    '2xl': 'p-16 md:p-20',
    '3xl': 'p-20 md:p-24',
  };
  return sizes[size];
}

/**
 * Utility for container classes
 */
export function container(
  maxWidth?:
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl',
) {
  const base = 'container mx-auto px-4';
  if (!maxWidth) return base;

  const maxWidths = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
  };

  return cn(base, maxWidths[maxWidth]);
}
