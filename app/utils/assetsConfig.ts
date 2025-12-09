/**
 * Centralized Assets Configuration
 * All image paths and asset URLs in one place for easy management
 */

// Payment Method Logos
export const PAYMENT_LOGOS = {
  amex: {
    src: '/images/aamex.png',
    alt: 'American Express',
    fallback: '/images/amex.png',
  },
  applePay: {
    src: '/images/apple-pay.png',
    alt: 'Apple Pay',
    fallback: null,
  },
  googlePay: {
    src: '/images/google-pay.png',
    alt: 'Google Pay',
    fallback: null,
  },
  mastercard: {
    src: '/images/mastercard.png',
    alt: 'Mastercard',
    fallback: null,
  },
  visa: {
    src: '/images/visaa.webp',
    alt: 'Visa',
    fallback: '/images/logo-visa.png',
  },
  shopPay: {
    src: '/images/shopp.webp',
    alt: 'Shop Pay',
    fallback: '/images/shop-pay-logo-color.webp',
  },
} as const;

// Brand Logos
export const BRAND_LOGOS = {
  main: '/images/logo.png',
  footer: '/images/footer-logo.png',
} as const;

// Category Images
export const CATEGORY_IMAGES = {
  bundles: '/images/category-bundles.jpg',
  colored: '/images/category-colored.jpg',
  halfwig: '/images/category-halfwig.jpg',
  hdlace: '/images/category-hdlace.jpg',
  mcap: '/images/category-mcap.jpg',
  newArrivals: '/images/category-newarrivals.jpg',
} as const;

// Avatar/Profile Images
export const AVATAR_IMAGES = {
  default: '/images/default-avatar.png',
  client1: '/images/cline1.jpg',
  client2: '/images/cline2.jpg',
  client3: '/images/cline3.jpg',
  client4: '/images/cline4.jpg',
  client5: '/images/cline5.jpg',
  client6: '/images/cline6.jpg',
  client7: '/images/cline7.jpg',
} as const;

// Marketing Assets
export const MARKETING_ASSETS = {
  freeShipping: '/images/rapidegratuit.png',
  tips: '/images/astuce.png',
  clients50k: '/images/50kclient.png',
  backgroundFete: '/images/bgfete.png',
  enterprise: '/images/entreprise.PNG',
} as const;

// Carousel/Hero Images
export const HERO_IMAGES = {
  card1: '/images/preset/card/card1.PNG',
  card2: '/images/preset/card/card2.PNG',
} as const;

/**
 * Get image with fallback support
 * @param src - Primary image source
 * @param fallback - Fallback image source
 * @returns Object with src and onError handler
 */
export function getImageWithFallback(src: string, fallback?: string | null) {
  return {
    src,
    onError: (e: React.SyntheticEvent<HTMLImageElement>) => {
      if (fallback && e.currentTarget.src !== fallback) {
        e.currentTarget.src = fallback;
      } else {
        // If no fallback or fallback also failed, hide the image
        e.currentTarget.style.display = 'none';
      }
    },
  };
}

/**
 * Default placeholder for missing images
 */
export const PLACEHOLDER_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23f3f4f6"/%3E%3Ctext x="50" y="50" font-family="Arial" font-size="14" fill="%239ca3af" text-anchor="middle" dominant-baseline="middle"%3EImage%3C/text%3E%3C/svg%3E';

/**
 * Check if image exists (client-side only)
 * @param src - Image source to check
 * @returns Promise<boolean>
 */
export async function imageExists(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

/**
 * Preload images for better performance
 * @param srcs - Array of image sources to preload
 */
export function preloadImages(srcs: string[]) {
  srcs.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}
