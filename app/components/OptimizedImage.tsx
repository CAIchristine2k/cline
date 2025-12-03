import {useState, useEffect, useRef} from 'react';
import {Image as ShopifyImage, type ShopifyImageProps} from '@shopify/hydrogen-react';

interface OptimizedImageProps extends Omit<ShopifyImageProps, 'data'> {
  data: ShopifyImageProps['data'];
  /**
   * Priority loading for above-the-fold images (hero, first product)
   * - true: loading="eager", high fetchpriority
   * - false: loading="lazy", low fetchpriority (default)
   */
  priority?: boolean;
  /**
   * Show blur placeholder while loading
   */
  showPlaceholder?: boolean;
  /**
   * Custom className for the wrapper
   */
  wrapperClassName?: string;
  /**
   * Aspect ratio to maintain (e.g., "16/9", "1/1", "4/3")
   */
  aspectRatio?: string;
}

/**
 * OptimizedImage - Composant d'image optimisé avec:
 * - Lazy loading intelligent (eager pour les images prioritaires)
 * - Blur placeholder pendant le chargement
 * - Transition fade-in fluide
 * - Responsive avec srcSet automatique
 * - CDN Shopify optimisé
 *
 * @example
 * ```tsx
 * // Image héro (prioritaire)
 * <OptimizedImage
 *   data={heroImage}
 *   priority
 *   aspectRatio="16/9"
 *   sizes="100vw"
 * />
 *
 * // Image produit (lazy)
 * <OptimizedImage
 *   data={product.featuredImage}
 *   showPlaceholder
 *   aspectRatio="1/1"
 *   sizes="(min-width: 768px) 33vw, 50vw"
 * />
 * ```
 */
export function OptimizedImage({
  data,
  priority = false,
  showPlaceholder = true,
  wrapperClassName = '',
  aspectRatio,
  loading,
  sizes = '(min-width: 768px) 33vw, 100vw',
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority); // Priority images are always "in view"
  const imgRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [priority]);

  if (!data?.url) {
    return (
      <div
        className={`bg-gray-200 animate-pulse ${wrapperClassName}`}
        style={{aspectRatio}}
      />
    );
  }

  const imageLoading = priority ? 'eager' : (loading || 'lazy');

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${wrapperClassName}`}
      style={{aspectRatio}}
    >
      {/* Blur placeholder */}
      {showPlaceholder && !isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}

      {/* Actual image - only render when in view */}
      {isInView && (
        <ShopifyImage
          data={data}
          sizes={sizes}
          loading={imageLoading}
          {...props}
          className={`
            w-full h-full object-cover transition-opacity duration-500
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
            ${props.className || ''}
          `}
          onLoad={() => setIsLoaded(true)}
        />
      )}

    </div>
  );
}

/**
 * Generates optimized Shopify CDN image URLs
 * @param url - Original Shopify image URL
 * @param width - Desired width
 * @param height - Desired height (optional)
 * @returns Optimized URL with parameters
 */
export function getShopifyImageUrl(
  url: string,
  width: number,
  height?: number
): string {
  if (!url) return '';

  const params = new URLSearchParams();
  params.set('width', width.toString());
  if (height) {
    params.set('height', height.toString());
    params.set('crop', 'center');
  }

  // Add WebP format if supported
  params.set('format', 'pjpg'); // Progressive JPEG as fallback

  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}${params.toString()}`;
}
